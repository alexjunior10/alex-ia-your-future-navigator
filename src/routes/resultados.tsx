import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  BrainCircuit,
  Target,
  AlertTriangle,
  BookOpen,
  GraduationCap,
  X,
  MessageCircle,
  Award,
  Search,
  Compass,
  Users,
  Building2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  Shield,
  HelpCircle,
  Smile,
  Meh,
  Frown,
  Check,
  Brain,
  Lightbulb,
  Heart,
  Scale,
  Zap,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { careers as mockCareers, mockAdnProfile } from "../lib/mock-data";
import {
  QuestionnaireStorage,
  type QuestionnaireScoringResult,
  getVariableFriendlyName,
  VARIABLE_FRIENDLY_NAMES,
} from "../lib/questionnaire";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../hooks/use-auth";

export const Route = createFileRoute("/resultados")({
  head: () => ({ meta: [{ title: "Resultados Vocacionales Oficiales — Alex IA" }] }),
  component: ResultsPage,
});

/* =========================================================================
   COMPONENTE: RADAR DINÁMICO DE 5 DIMENSIONES (INTERACTIVO CON HOVER)
   ========================================================================= */
function DynamicRadarChart({
  data,
}: {
  data: { name: string; value: number; desc?: string }[];
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const size = 420;
  const center = size / 2;
  const radius = 130;
  const numPoints = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / numPoints - Math.PI / 2;
  const point = (v: number, i: number) => {
    const r = (Math.max(15, v) / 100) * radius;
    return [center + r * Math.cos(angle(i)), center + r * Math.sin(angle(i))];
  };

  const pts = data.map((d, i) => point(d.value, i).join(",")).join(" ");

  return (
    <div className="relative flex flex-col items-center w-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[420px] drop-shadow-sm overflow-visible select-none transition-all duration-300"
      >
        <defs>
          <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.59 0.21 285)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="oklch(0.65 0.24 330)" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* Polígonos concéntricos guía (25%, 50%, 75%, 100%) */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon
            key={scale}
            points={data.map((_, i) => point(100 * scale, i).join(",")).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity={scale === 1 ? 0.28 : 0.12}
            strokeDasharray={scale === 1 ? undefined : "3 3"}
          />
        ))}

        {/* Ejes radiales con interactividad al pasar el mouse */}
        {data.map((_, i) => {
          const [x, y] = point(100, i);
          const isHovered = hoveredIdx === i;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isHovered ? "oklch(0.59 0.21 285)" : "currentColor"}
              strokeWidth={isHovered ? 2.5 : 1}
              strokeOpacity={isHovered ? 0.9 : 0.16}
              className="transition-all duration-200"
            />
          );
        })}

        {/* Polígono relleno con gradiente dinámico */}
        <polygon
          points={pts}
          fill="url(#radarFillGrad)"
          stroke="oklch(0.59 0.21 285)"
          strokeWidth={hoveredIdx !== null ? 2.2 : 2.5}
          className="transition-all duration-300 ease-out"
        />

        {/* Vértices / Puntos interactivos con animación al pasar el mouse */}
        {data.map((d, i) => {
          const [px, py] = point(d.value, i);
          const isHovered = hoveredIdx === i;
          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Anillo de pulso cuando está en hover */}
              {isHovered && (
                <>
                  <circle
                    cx={px}
                    cy={py}
                    r={18}
                    fill="oklch(0.59 0.21 285)"
                    fillOpacity={0.25}
                    className="animate-ping"
                  />
                  <circle
                    cx={px}
                    cy={py}
                    r={12}
                    fill="none"
                    stroke="oklch(0.59 0.21 285)"
                    strokeWidth={2}
                    strokeDasharray="2 2"
                  />
                </>
              )}

              {/* Punto central */}
              <circle
                cx={px}
                cy={py}
                r={isHovered ? 7.5 : 5.5}
                fill={isHovered ? "#ffffff" : "oklch(0.59 0.21 285)"}
                stroke="oklch(0.59 0.21 285)"
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-200"
              />

              {/* Área invisible amplia para captura de mouse */}
              <circle
                cx={px}
                cy={py}
                r={28}
                fill="transparent"
                className="cursor-pointer"
              />
            </g>
          );
        })}

        {/* Etiquetas en los extremos con interacción al pasar el mouse */}
        {data.map((d, i) => {
          const isHovered = hoveredIdx === i;
          const [lx, ly] = point(122, i);

          return (
            <g
              key={d.name}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {isHovered && (
                <rect
                  x={lx - 48}
                  y={ly - 18}
                  width={96}
                  height={36}
                  rx={10}
                  fill="oklch(0.59 0.21 285)"
                  className="transition-all duration-200 shadow-md"
                />
              )}
              <text
                x={lx}
                y={ly - (isHovered ? 2 : 4)}
                textAnchor="middle"
                className={`text-[12px] font-bold transition-all duration-200 ${
                  isHovered ? "fill-white font-black" : "fill-foreground"
                }`}
              >
                {d.name}
              </text>
              <text
                x={lx}
                y={ly + (isHovered ? 12 : 9)}
                textAnchor="middle"
                className={`text-[11px] font-black transition-all duration-200 ${
                  isHovered ? "fill-white" : "fill-primary"
                }`}
              >
                {d.value}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mini tarjeta de detalle interactivo */}
      <div className="w-full max-w-md mt-2 min-h-[50px] transition-all duration-300">
        {hoveredIdx !== null ? (
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-3 flex items-center justify-between gap-3 shadow-sm transition-all duration-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-primary text-primary-foreground font-black text-sm flex items-center justify-center shadow">
                {data[hoveredIdx].value}%
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span className="truncate">{data[hoveredIdx].name}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary shrink-0">
                    Pilar {hoveredIdx + 1}/5
                  </span>
                </div>
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {data[hoveredIdx].desc || "Dimensión del ADN vocacional"}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-background/80 border border-border/60 text-primary">
                {data[hoveredIdx].value >= 75 ? "Sobresaliente" : data[hoveredIdx].value >= 55 ? "Equilibrado" : "En desarrollo"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-dashed border-border/70 bg-muted/20 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
            <span>Pasa el cursor sobre los vértices o selecciona una píldora para explorar cada pilar</span>
          </div>
        )}
      </div>

      {/* Píldoras interactivas */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
        {data.map((d, i) => (
          <button
            key={d.name}
            type="button"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => setHoveredIdx(hoveredIdx === i ? null : i)}
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
              hoveredIdx === i
                ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                : "bg-muted/40 text-muted-foreground border-border/60 hover:bg-muted hover:text-foreground"
            }`}
          >
            {d.name} <span className="font-bold opacity-80">{d.value}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   PÁGINA PRINCIPAL DE RESULTADOS
   ========================================================================= */
function ResultsPage() {
  const { user } = useAuth();
  const [showCoachPopup, setShowCoachPopup] = useState(false);
  const [scoringResult, setScoringResult] = useState<QuestionnaireScoringResult | null>(null);
  const [isLoadingAttempt, setIsLoadingAttempt] = useState(true);

  // Estados interactivos para nuevas secciones
  const [expandedWhyCareer, setExpandedWhyCareer] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchCareerSlug, setSelectedSearchCareerSlug] = useState<string | null>(null);

  // Estados de feedback de usuario para el piloto (NO altera matching)
  const [feedbackSentiment, setFeedbackSentiment] = useState<"high" | "medium" | "low" | null>(null);
  const [feedbackExpected, setFeedbackExpected] = useState("");
  const [feedbackUnexpected, setFeedbackUnexpected] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadAttempt() {
      try {
        const result = await QuestionnaireStorage.getLatestAttempt(supabase, user?.id);
        if (isMounted && result) {
          setScoringResult(result);
        }
      } catch (e) {
        console.warn("No se pudo cargar intento previo:", e);
      } finally {
        if (isMounted) setIsLoadingAttempt(false);
      }
    }
    loadAttempt();

    const timer = setTimeout(() => {
      setShowCoachPopup(true);
    }, 4000);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [user]);

  // Si existe resultado real del Cuestionario + Matching, derivar lista de todas las carreras
  const hasRealMatches = !!(scoringResult && scoringResult.matches && scoringResult.matches.length > 0);

  // Catálogo completo de coincidencias (132 carreras reales o mock)
  const allMatches = useMemo(() => {
    if (hasRealMatches) {
      return scoringResult!.matches.map((m, idx) => {
        const strongestVars = m.variable_analysis?.strongest_matches || [];
        const gapsVars = m.variable_analysis?.potential_gaps || [];
        const traitsList = strongestVars
          .slice(0, 4)
          .map((code: string) => getVariableFriendlyName(code, true))
          .filter(Boolean);

        return {
          rank: idx + 1,
          careerId: m.career_id,
          name: m.name,
          slug: m.slug || m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          area: m.area || "General",
          affinity: Math.round(m.compatibility_pct * 10) / 10,
          rawAffinity: m.compatibility_pct,
          isGold: !!m.is_gold_set,
          strongestVars,
          gapsVars,
          traitsSummary: traitsList.join(" · ") || "Análisis de perfil integral",
          description: `Área: ${m.area}. Alta compatibilidad con tus respuestas en el cuestionario vocacional.`,
          branches: mockCareers.find((c) => c.slug === m.slug)?.branches,
        };
      });
    }

    return mockCareers.map((c, idx) => ({
      rank: idx + 1,
      careerId: idx + 1,
      name: c.name,
      slug: c.slug,
      area: c.area,
      affinity: c.affinity,
      rawAffinity: c.affinity,
      isGold: false,
      strongestVars: ["INT_S", "APT_ANA", "PER_COL", "VAL_IMP"],
      gapsVars: ["PRE_CAM"],
      traitsSummary: "Personas · Análisis · Colaboración · Impacto",
      description: c.description,
      branches: c.branches,
    }));
  }, [hasRealMatches, scoringResult]);

  // Top 5 de Carreras
  const topCareers = allMatches.slice(0, 5);
  const top1 = topCareers[0] || allMatches[0];
  const top2 = topCareers[1] || allMatches[1];

  // Regla 3: Empate o cercanía en afinidad (diferencia <= 3 puntos entre Top 1 y Top 2)
  const diffTop1Top2 = top2 ? Math.abs(top1.affinity - top2.affinity) : 999;
  const isCloseTie = diffTop1Top2 <= 0.5;
  const isSimilarAffinity = diffTop1Top2 <= 3.0;

  // Regla 7: Carrera Sorpresa FUERA DEL TOP 5
  const surpriseMatch = useMemo(() => {
    // Tomar estrictamente del puesto 6 en adelante (slice 5)
    const candidatesOutsideTop5 = allMatches.slice(5);
    if (candidatesOutsideTop5.length === 0) return null;

    // Buscar una con afinidad relevante (>= 50%) de un área distinta a Top 1
    const differentArea = candidatesOutsideTop5.find(
      (c) => c.area.toLowerCase() !== top1.area.toLowerCase() && c.affinity >= 50
    );

    const chosen = differentArea || candidatesOutsideTop5[0];
    if (!chosen) return null;

    const highlightTraits = chosen.strongestVars
      .slice(0, 3)
      .map((code) => getVariableFriendlyName(code, true))
      .join(", ");

    return {
      rank: chosen.rank,
      name: chosen.name,
      area: chosen.area,
      slug: chosen.slug,
      affinity: chosen.affinity,
      traits: highlightTraits || "talentos analíticos y prácticos",
      reason: `No apareció entre tus primeras 5 afinidades (ocupa el puesto #${chosen.rank} con ${chosen.affinity}%), pero encontramos coincidencias destacadas en: ${highlightTraits || "habilidades complementarias"}. Es una ruta alternativa que podría sorprenderte gratamente al explorarla.`,
    };
  }, [allMatches, top1]);

  // Regla 6: Carrera explorada mediante el buscador de 132 carreras
  const exploredCareer = useMemo(() => {
    if (!selectedSearchCareerSlug) return null;
    return allMatches.find((c) => c.slug === selectedSearchCareerSlug) || null;
  }, [allMatches, selectedSearchCareerSlug]);

  // Filtro de búsqueda en tiempo real
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allMatches
      .filter((c) => c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q))
      .slice(0, 8);
  }, [allMatches, searchQuery]);

  // Las 5 Macro Dimensiones para el Radar
  const dimensionRadarData = hasRealMatches && scoringResult?.profile_38d
    ? [
        {
          name: "Intereses",
          value: Math.round(
            ["INT_R", "INT_I", "INT_A", "INT_S", "INT_E", "INT_C"].reduce(
              (sum, k) => sum + (scoringResult.profile_38d[k] || 50),
              0
            ) / 6
          ),
          desc: "Tus pasiones vocacionales y áreas de curiosidad",
        },
        {
          name: "Aptitudes",
          value: Math.round(
            ["APT_LOG", "APT_NUM", "APT_VER", "APT_ANA", "APT_ESP", "APT_CRE", "APT_SOC", "APT_ORG"].reduce(
              (sum, k) => sum + (scoringResult.profile_38d[k] || 50),
              0
            ) / 8
          ),
          desc: "Tus destrezas cognitivas y resolución de retos",
        },
        {
          name: "Personalidad",
          value: Math.round(
            ["PER_SOC", "PER_INI", "PER_PER", "PER_ADA", "PER_COL", "PER_AUT", "PER_LID", "PER_EST"].reduce(
              (sum, k) => sum + (scoringResult.profile_38d[k] || 50),
              0
            ) / 8
          ),
          desc: "Tu estilo de trabajo, liderazgo e iniciativa",
        },
        {
          name: "Valores",
          value: Math.round(
            ["VAL_EST", "VAL_ING", "VAL_IMP", "VAL_REC", "VAL_CRE", "VAL_APR", "VAL_AUT", "VAL_EQV"].reduce(
              (sum, k) => sum + (scoringResult.profile_38d[k] || 50),
              0
            ) / 8
          ),
          desc: "Tus prioridades de vida y proyección",
        },
        {
          name: "Preferencias",
          value: Math.round(
            ["PRE_PER", "PRE_DAT", "PRE_PRA", "PRE_VAR", "PRE_EST", "PRE_CAM", "PRE_TEC", "PRE_EXP"].reduce(
              (sum, k) => sum + (scoringResult.profile_38d[k] || 50),
              0
            ) / 8
          ),
          desc: "Tu modalidad y ambiente laboral deseado",
        },
      ]
    : [
        { name: "Intereses", value: 85, desc: "Curiosidad vocacional" },
        { name: "Aptitudes", value: 68, desc: "Capacidades de resolución" },
        { name: "Personalidad", value: 92, desc: "Estilo y dinamismo" },
        { name: "Valores", value: 74, desc: "Prioridades de vida" },
        { name: "Preferencias", value: 81, desc: "Ambiente de trabajo" },
      ];

  // Síntesis Cualitativa del Perfil (Sin redundancia numérica, Regla 10)
  const profileSynthesis = useMemo(() => {
    if (!hasRealMatches || !scoringResult?.profile_38d) {
      return {
        dominante: "Muestras un equilibrio armónico entre vocación de servicio, curiosidad analítica e iniciativa.",
        cognitivo: "Destacas en razonamiento estructurado y resolución práctica de problemas.",
        valores: "Tus decisiones priorizan el aprendizaje continuo, el impacto social y la calidad de vida.",
      };
    }
    const p = scoringResult.profile_38d;

    const items: string[] = [];
    if ((p["INT_S"] || 0) >= 60 || (p["PER_COL"] || 0) >= 60) {
      items.push("una marcada orientación hacia el trabajo colaborativo y el bienestar de las personas");
    }
    if ((p["APT_ANA"] || 0) >= 60 || (p["APT_LOG"] || 0) >= 60) {
      items.push("facilidad para analizar situaciones con rigor lógico y descomponer problemas complejos");
    }
    if ((p["APT_CRE"] || 0) >= 60 || (p["INT_A"] || 0) >= 60) {
      items.push("pensamiento creativo y original para proponer soluciones no convencionales");
    }
    if ((p["PRE_PRA"] || 0) >= 60 || (p["INT_R"] || 0) >= 60) {
      items.push("preferencia por proyectos aplicados, tangibles y de resultado visible");
    }
    if ((p["VAL_IMP"] || 0) >= 60) {
      items.push("deseo genuino de que tu profesión tenga un impacto positivo en la sociedad");
    }

    const dom = items.length > 0 ? items.slice(0, 3).join(", ") : "una combinación balanceada de intereses y talentos";

    return {
      dominante: `Tu perfil vocacional destaca por ${dom}.`,
      cognitivo:
        (p["APT_ANA"] || 0) >= (p["APT_CRE"] || 0)
          ? "Abordas los desafíos con un enfoque metódico y estructurado, buscando evidencia y fundamentos antes de concluir."
          : "Abordas los retos con flexibilidad e intuición creativa, explorando múltiples alternativas antes de decidirte.",
      valores:
        "Tus prioridades reflejan interés por desarrollarte continuamente en un entorno que respete tu autonomía y bienestar personal.",
    };
  }, [hasRealMatches, scoringResult]);

  // Tu Entorno Ideal (Con íconos representativos de atributos, NO checks de tarea, Regla 15)
  const dynamicEntornoItems = useMemo(() => {
    if (!hasRealMatches || !scoringResult?.profile_38d) {
      return [
        {
          title: "Cultura Colaborativa y Horizontal",
          text: "Equipos multidisciplinarios con comunicación abierta, donde puedas sumar talentos y compartir ideas.",
          badge: "Trabajo en Equipo",
          icon: Users,
        },
        {
          title: "Decisiones Basadas en Fundamentos y Claridad",
          text: "Procesos estructurados con metas comprensibles donde se valore el rigor y el cumplimiento de objetivos.",
          badge: "Metodología",
          icon: Target,
        },
        {
          title: "Espacios de Innovación y Flexibilidad",
          text: "Ambientes donde se aliente probar nuevos enfoques, proponer mejoras y pensar fuera de la caja.",
          badge: "Innovación",
          icon: Sparkles,
        },
        {
          title: "Equilibrio y Autonomía Profesional",
          text: "Confianza en tu criterio para gestionar tus tiempos de forma autodirigida, cuidando tu bienestar personal.",
          badge: "Autonomía",
          icon: Compass,
        },
      ];
    }

    const p = scoringResult.profile_38d;
    const candidates: {
      title: string;
      text: string;
      score: number;
      badge: string;
      icon: typeof Users;
    }[] = [];

    if ((p["PER_COL"] || 0) >= 55 || (p["PRE_PER"] || 0) >= 55) {
      candidates.push({
        title: "Cultura Colaborativa y Multidisciplinaria",
        text: "Equipos con comunicación abierta y horizontal, donde el trabajo en conjunto y el apoyo mutuo impulsen los proyectos.",
        score: Math.max(p["PER_COL"] || 0, p["PRE_PER"] || 0),
        badge: "Trabajo en Equipo",
        icon: Users,
      });
    }

    if ((p["PER_AUT"] || 0) >= 55 || (p["VAL_AUT"] || 0) >= 55) {
      candidates.push({
        title: "Autonomía y Confianza Profesional",
        text: "Libertad de criterio para tomar decisiones y gestionar tus tiempos de forma autodirigida, sin microgestión asfixiante.",
        score: Math.max(p["PER_AUT"] || 0, p["VAL_AUT"] || 0),
        badge: "Autonomía",
        icon: Compass,
      });
    }

    if ((p["APT_CRE"] || 0) >= 55 || (p["INT_A"] || 0) >= 55 || (p["PRE_VAR"] || 0) >= 55) {
      candidates.push({
        title: "Espacios de Creación e Innovación Abierta",
        text: "Ambientes dinámicos donde se premien las ideas originales, la experimentación y el diseño de soluciones novedosas.",
        score: Math.max(p["APT_CRE"] || 0, p["INT_A"] || 0, p["PRE_VAR"] || 0),
        badge: "Innovación",
        icon: Sparkles,
      });
    }

    if ((p["PRE_TEC"] || 0) >= 55) {
      candidates.push({
        title: "Ecosistema Tecnológico de Vanguardia",
        text: "Acceso a plataformas digitales avanzadas, automatización y herramientas modernas para optimizar tu trabajo.",
        score: p["PRE_TEC"] || 0,
        badge: "Tecnología",
        icon: BrainCircuit,
      });
    }

    if ((p["PRE_PRA"] || 0) >= 55 || (p["INT_R"] || 0) >= 55) {
      candidates.push({
        title: "Proyectos Aplicados y Tangibles",
        text: "Laboratorios, talleres u obras donde puedas poner manos a la obra y ver el resultado concreto de lo que construyes.",
        score: Math.max(p["PRE_PRA"] || 0, p["INT_R"] || 0),
        badge: "Práctico",
        icon: Target,
      });
    }

    if ((p["VAL_IMP"] || 0) >= 55 || (p["INT_S"] || 0) >= 55) {
      candidates.push({
        title: "Propósito e Impacto Social Directo",
        text: "Organizaciones con vocación de servicio donde tu esfuerzo diario aporte activamente al bienestar de la comunidad.",
        score: Math.max(p["VAL_IMP"] || 0, p["INT_S"] || 0),
        badge: "Impacto Humano",
        icon: Heart,
      });
    }

    if ((p["APT_ANA"] || 0) >= 55 || (p["PRE_DAT"] || 0) >= 55) {
      candidates.push({
        title: "Decisiones Basadas en Evidencia y Datos",
        text: "Metodologías estructuradas con objetivos claros, análisis riguroso de información y fundamentos comprobables.",
        score: Math.max(p["APT_ANA"] || 0, p["PRE_DAT"] || 0),
        badge: "Análisis y Datos",
        icon: Brain,
      });
    }

    if ((p["VAL_EQV"] || 0) >= 55) {
      candidates.push({
        title: "Equilibrio entre Crecimiento y Calidad de Vida",
        text: "Ambientes con horarios respetuosos que te permitan compatibilizar el crecimiento profesional con tu vida personal.",
        score: p["VAL_EQV"] || 0,
        badge: "Bienestar",
        icon: Scale,
      });
    }

    candidates.sort((a, b) => b.score - a.score);
    return candidates.slice(0, 4);
  }, [hasRealMatches, scoringResult]);

  // Envío de feedback para el piloto (Regla 13: NO modifica matching)
  const handleSendFeedback = async () => {
    if (!feedbackSentiment && !feedbackExpected.trim() && !feedbackUnexpected.trim()) return;
    setIsSubmittingFeedback(true);
    try {
      const feedbackPayload = {
        sentiment: feedbackSentiment,
        expected_career: feedbackExpected.trim(),
        unexpected_career: feedbackUnexpected.trim(),
        attempt_id: scoringResult?.attempt?.attempt_id || null,
        user_id: user?.id || null,
        created_at: new Date().toISOString(),
      };
      localStorage.setItem("alex_pilot_results_feedback", JSON.stringify(feedbackPayload));
      if (user?.id) {
        await supabase.from("results_feedback").insert([feedbackPayload]).catch(() => {});
      }
      setFeedbackSubmitted(true);
    } catch (e) {
      console.warn("Feedback save fallback:", e);
      setFeedbackSubmitted(true);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* =========================================================================
          1. ENCABEZADO DEL RESULTADO (HONESTIDAD Y PRINCIPIO CENTRAL)
          ========================================================================= */}
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <Sparkles className="h-4 w-4" /> Resultados de Afinidad Vocacional · Alex IA V1.1
        </span>

        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Carreras con mayor afinidad con tu perfil
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Alex IA evaluó tus 40 respuestas en las 38 dimensiones del ADN vocacional para identificar qué rutas
          profesionales conectan de forma más natural con tus intereses, destrezas cognitivas y estilo de trabajo.
        </p>

        {/* Declaración de Honestidad y Autonomía */}
        <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-muted/50 border border-border/70 px-4 py-2 text-xs text-muted-foreground max-w-xl mx-auto">
          <HelpCircle className="h-4 w-4 text-primary shrink-0" />
          <span>
            <strong>Nota de orientación:</strong> Este resultado es exploratorio. Alex IA no decide tu futuro ni predice
            éxito laboral; te ofrece un mapa honesto para reflexionar e investigar con criterio propio.
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. TOP 5 DE CARRERAS (PRIMERA RESPUESTA PRINCIPAL)
          ========================================================================= */}
      <div className="mb-14" id="top-5-carreras">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Tu Top 5 de Carreras Afines
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Las 5 carreras del catálogo oficial de 132 opciones con mayor cercanía a tu perfil
            </p>
          </div>

          {/* Banner de Empate o Afinidad Similar si aplica (Regla 3) */}
          {isSimilarAffinity && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 self-start sm:self-auto">
              <Scale className="h-4 w-4 shrink-0" />
              <span>
                {isCloseTie ? "Empate técnico en afinidad" : "Afinidad muy cercana entre las primeras opciones"}
              </span>
            </div>
          )}
        </div>

        {/* Lista de las 5 Tarjetas con Estructura Consistente */}
        <div className="space-y-4">
          {topCareers.map((c, i) => {
            const isTop1Or2Equivalent = isSimilarAffinity && (i === 0 || i === 1);
            const isExpanded = expandedWhyCareer === c.slug;

            return (
              <div
                key={c.slug || i}
                className={`rounded-3xl border bg-card p-5 sm:p-6 transition-all duration-200 shadow-sm ${
                  isTop1Or2Equivalent
                    ? "border-border hover:border-primary/40"
                    : i === 0 && !isSimilarAffinity
                    ? "border-primary/40 bg-gradient-to-b from-card to-primary/[0.02]"
                    : "border-border hover:border-border/80"
                }`}
              >
                {/* Cabecera Principal de la Tarjeta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {/* Posición honesta */}
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-black ${
                          i === 0 && !isSimilarAffinity
                            ? "bg-primary text-primary-foreground"
                            : isTop1Or2Equivalent
                            ? "bg-muted font-bold text-foreground border border-border"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        Top {i + 1}
                      </span>

                      {/* Empate explícito si i=0 o i=1 y son similares */}
                      {isTop1Or2Equivalent && isCloseTie && (
                        <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                          (Empate en afinidad)
                        </span>
                      )}

                      {/* Área */}
                      <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary">
                        {c.area}
                      </span>

                      {/* Carrera emblemática si aplica */}
                      {c.isGold && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 text-[11px] font-semibold">
                          <Award className="h-3 w-3" /> Emblemática
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {c.name}
                    </h3>

                    {/* Rasgos y áreas coincidentes */}
                    <div className="mt-1.5 flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/80">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{c.traitsSummary}</span>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {c.description}
                    </p>
                  </div>

                  {/* Porcentaje y Acciones */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-border/50 gap-2 shrink-0">
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-extrabold text-primary">
                        {c.affinity}%
                      </div>
                      <div className="text-[11px] text-muted-foreground font-semibold">
                        Afinidad vocacional
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {/* Botón ¿Por qué aparece? */}
                      <button
                        type="button"
                        onClick={() => setExpandedWhyCareer(isExpanded ? null : c.slug)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 px-2.5 py-1.5 rounded-xl hover:bg-primary/10 transition-colors"
                      >
                        {isExpanded ? (
                          <>Menos detalles <ChevronUp className="h-3.5 w-3.5" /></>
                        ) : (
                          <>¿Por qué aparece? <ChevronDown className="h-3.5 w-3.5" /></>
                        )}
                      </button>

                      {/* CTA Consistente: Explorar carrera */}
                      <Link
                        to="/carreras/$slug"
                        params={{ slug: c.slug }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-3.5 py-2 rounded-xl transition-transform hover:scale-102 shadow-sm"
                      >
                        Explorar carrera <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sección Desplegable: ¿Por qué aparece esta carrera? (Regla 5) */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-border/60 animate-in fade-in duration-300">
                    <h4 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4 text-primary" />
                      ¿Por qué aparece {c.name}?
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      El motor determinístico de Alex IA encontró que tus respuestas se alinean estrechamente con las
                      siguientes dimensiones del perfil ocupacional de esta carrera:
                    </p>

                    {/* Desglose de variables en lenguaje amigable para adolescentes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
                      {c.strongestVars.slice(0, 3).map((code: string) => {
                        const info = VARIABLE_FRIENDLY_NAMES[code];
                        return (
                          <div
                            key={code}
                            className="rounded-2xl border border-border/80 bg-muted/30 p-3 text-left"
                          >
                            <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
                              {info?.dimension || "Pilar Vocacional"}
                            </div>
                            <div className="text-xs font-bold text-foreground mt-0.5">
                              {info?.name || getVariableFriendlyName(code, false)}
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-1 leading-snug">
                              {info?.description || "Afinidad significativa con tus preferencias."}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Caminos y Especialidades dentro de esta carrera (Regla 11) */}
                    <div className="rounded-2xl bg-muted/40 p-3.5 border border-border/70 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-foreground flex items-center gap-1.5">
                          <Compass className="h-3.5 w-3.5 text-secondary" />
                          Rutas y especializaciones dentro de {c.name}
                        </span>
                        <span className="text-[10px] font-semibold text-muted-foreground bg-background px-2 py-0.5 rounded-full border">
                          Fase exploratoria
                        </span>
                      </div>
                      {c.branches && c.branches.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                          {c.branches.map((b) => (
                            <div key={b.name} className="rounded-xl bg-background border p-2.5">
                              <div className="font-bold text-primary text-xs">{b.name}</div>
                              <div className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                                {b.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-[11px] leading-relaxed">
                          Esta carrera cuenta con diversas ramas ocupacionales y especialidades de posgrado que podrás
                          profundizar en la vista de detalle.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          3. EXPLORAR OTRA CARRERA (BUSCADOR DENTRO DE LAS 132 OPCIONES, Regla 6)
          ========================================================================= */}
      <div className="mb-14 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm" id="explorar-carrera">
        <div className="flex items-center gap-3 mb-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              ¿Hay otra carrera que quieras explorar?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Busca cualquier opción dentro del catálogo oficial de 132 carreras para consultar su nivel de afinidad con tu perfil.
            </p>
          </div>
        </div>

        {/* Input de Búsqueda */}
        <div className="relative mt-4 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Escribe el nombre de una carrera (ej. Psicología, Arquitectura, Economía)..."
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 pl-11 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground text-xs"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Resultados de Búsqueda Dinámica */}
        {searchResults.length > 0 && (
          <div className="mb-5 rounded-2xl border border-border/80 bg-background/90 p-2 divide-y divide-border/60 max-h-60 overflow-y-auto">
            {searchResults.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setSelectedSearchCareerSlug(item.slug);
                  setSearchQuery("");
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/60 transition-colors text-left"
              >
                <div>
                  <div className="text-sm font-bold text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Área: {item.area} · Puesto #{item.rank} de 132
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-extrabold text-primary">{item.affinity}%</span>
                  <span className="block text-[10px] text-muted-foreground">afinidad</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tarjeta de la Carrera Explorada si fue seleccionada */}
        {exploredCareer && (
          <div className="rounded-2xl border border-primary/40 bg-primary/[0.04] p-5 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary mb-1">
                  Consulta de exploración · Puesto #{exploredCareer.rank} de 132
                </span>
                <h4 className="text-xl font-extrabold text-foreground">{exploredCareer.name}</h4>
                <p className="text-xs text-muted-foreground">Área: {exploredCareer.area}</p>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-3xl font-extrabold text-primary">{exploredCareer.affinity}%</div>
                <div className="text-xs text-muted-foreground font-semibold">Afinidad calculada</div>
              </div>
            </div>

            <div className="rounded-xl bg-background/80 border p-3 text-xs text-foreground/90 mb-4">
              <strong className="text-primary font-bold">¿Por qué obtuvo este resultado? </strong>
              Tus respuestas muestran coincidencias en{" "}
              <em>{exploredCareer.traitsSummary}</em>.
              {exploredCareer.gapsVars.length > 0 && (
                <span>
                  {" "}Por otro lado, esta disciplina demanda mayor énfasis en factores donde tus preferencias tuvieron
                  menor peso relativo.
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
              <span className="text-muted-foreground text-[11px]">
                * Esta búsqueda informativa no modifica tu Top 5 original.
              </span>
              <Link
                to="/carreras/$slug"
                params={{ slug: exploredCareer.slug }}
                className="font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                Ver ficha completa <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}

        {!exploredCareer && !searchQuery && (
          <p className="text-xs text-muted-foreground italic text-center mt-2">
            Puedes consultar cualquier carrera de ingeniería, salud, negocios, humanidades, artes o ciencias sociales.
          </p>
        )}
      </div>

      {/* =========================================================================
          4. TU ADN VOCACIONAL / EXPLICACIÓN DEL PERFIL (Reglas 8, 9 y 10)
          ========================================================================= */}
      <div className="mb-14 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary/15 text-secondary">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Tu ADN Vocacional
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              El mapa de 38 dimensiones que sintetiza tus intereses, destrezas, personalidad y valores
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Radar Dinámico con 5 Ejes */}
          <div className="flex flex-col items-center">
            <DynamicRadarChart data={dimensionRadarData} />
          </div>

          {/* Explicación del Perfil (Elimina redundancia, no repite los mismos números 3 veces) */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/80 bg-muted/20 p-5">
              <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                ¿Qué significa tu perfil vocacional?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {profileSynthesis.dominante}
              </p>
              <div className="space-y-2 text-xs text-foreground/90">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary shrink-0">• Estilo cognitivo:</span>
                  <span className="text-muted-foreground">{profileSynthesis.cognitivo}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary shrink-0">• Prioridades de vida:</span>
                  <span className="text-muted-foreground">{profileSynthesis.valores}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-muted/40 p-4 border border-border/60 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">¿Cómo lee Alex IA este mapa? </strong>
              Las carreras que ves recomendadas no se eligieron al azar: son aquellas cuyas mallas formativas y
              actividades cotidianas presentan mayor correlación con los 5 pilares de tu radar vocacional.
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. TU ENTORNO IDEAL (CON ÍCONOS DE ATRIBUTOS, NO CHECKS, Regla 15)
          ========================================================================= */}
      <div className="mb-14 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Tu Entorno Ideal</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Condiciones de estudio y trabajo donde tu energía y motivación se potencian
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-6 leading-relaxed">
          A partir de tus respuestas en personalidad y preferencias de trabajo, Alex IA identificó los atributos de
          cultura y dinámica profesional más propicios para tu bienestar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {dynamicEntornoItems.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-border/80 bg-background/80 p-4 hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <ItemIcon className="h-4 w-4" />
                    </span>
                    <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground shrink-0 border border-border/60">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-9">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          6. CARRERA SORPRESA (FUERA DEL TOP 5, Regla 7)
          7. MAYOR DESAFÍO
          8. PLAN DE ACCIÓN
          ========================================================================= */}
      <div className="grid gap-6 lg:grid-cols-3 mb-14">
        {/* 6. CARRERA SORPRESA (ESTRICTAMENTE FUERA DEL TOP 5) */}
        {surpriseMatch ? (
          <div className="rounded-3xl border border-accent/40 bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
                  🎁 Carrera Sorpresa
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  Puesto #{surpriseMatch.rank}
                </span>
              </div>

              <h4 className="text-xl font-bold text-foreground mb-1">
                {surpriseMatch.name}
              </h4>
              <div className="text-xs text-primary font-bold mb-3">
                {surpriseMatch.affinity}% de afinidad · {surpriseMatch.area}
              </div>

              <div className="text-xs text-foreground/90 font-medium mb-2">
                ¿Por qué podría sorprenderte?
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {surpriseMatch.reason}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-border/60">
              <Link
                to="/carreras/$slug"
                params={{ slug: surpriseMatch.slug }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                Explorar carrera sorpresa <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex items-center justify-center text-center text-xs text-muted-foreground">
            No se identificaron carreras sorpresa fuera del Top 5 con afinidad suficiente en esta evaluación.
          </div>
        )}

        {/* 7. MAYOR DESAFÍO */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-bold text-foreground">Tu Mayor Desafío</h3>
            </div>
            <h4 className="font-semibold text-sm text-foreground mb-2">
              {mockAdnProfile.mayorDesafio.title}
            </h4>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {mockAdnProfile.mayorDesafio.description}
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs font-medium text-foreground">
            💡 <strong>Recomendación:</strong> {mockAdnProfile.mayorDesafio.advice}
          </div>
        </div>

        {/* 8. PLAN DE ACCIÓN */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">Plan de Acción</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Tres pasos concretos para validar tus opciones:
            </p>
            <ul className="space-y-2.5 text-xs text-foreground/90">
              {mockAdnProfile.planAccion.map((plan, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-[11px]">
                    {i + 1}
                  </span>
                  <span className="leading-snug text-muted-foreground">{plan}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 mt-4 border-t border-border/60 text-right">
            <Link
              to="/examen"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              Comenzar con un simulacro <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          9. CTA FINAL (¿QUÉ QUIERES HACER AHORA?, Regla 12)
          ========================================================================= */}
      <div className="mb-14 rounded-3xl border border-border/80 bg-gradient-to-br from-card via-background to-muted/40 p-6 sm:p-10 shadow-sm text-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
          ¿Qué quieres hacer ahora?
        </h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-8">
          Continúa explorando tu vocación eligiendo el siguiente paso que mejor se adapte a tu momento:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Opción 1: Explorar una carrera */}
          <a
            href="#explorar-carrera"
            className="group flex flex-col items-center p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-md transition-all text-center"
          >
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-3 group-hover:scale-105 transition-transform">
              <Search className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-1">Explorar otra carrera</h4>
            <p className="text-xs text-muted-foreground">
              Revisa afinidades entre las 132 opciones evaluadas
            </p>
          </a>

          {/* Opción 2: Hablar con Alex */}
          <Link
            to="/coach"
            className="group flex flex-col items-center p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-md transition-all text-center"
          >
            <div className="h-12 w-12 rounded-2xl bg-secondary/15 text-secondary grid place-items-center mb-3 group-hover:scale-105 transition-transform">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-1">Hablar con Alex Coach</h4>
            <p className="text-xs text-muted-foreground">
              Despeja dudas en privado sobre tu perfil vocacional
            </p>
          </Link>

          {/* Opción 3: Crear mi plan / simulacro */}
          <Link
            to="/examen"
            className="group flex flex-col items-center p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-md transition-all text-center"
          >
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-3 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-1">Medir mi nivel</h4>
            <p className="text-xs text-muted-foreground">
              Intenta un simulacro académico de 15 preguntas
            </p>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          10. FEEDBACK DEL RESULTADO PARA EL PILOTO (Reglas 13 y 14)
          ========================================================================= */}
      <div className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Smile className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              ¿Qué te pareció tu resultado?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tus respuestas nos ayudan a calibrar el motor de afinidad para el piloto con usuarios reales.
            </p>
          </div>
        </div>

        {feedbackSubmitted ? (
          <div className="mt-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center text-sm font-semibold text-emerald-700 dark:text-emerald-400 animate-in fade-in duration-300">
            ✓ ¡Muchas gracias por tu feedback! Nos ayuda a mejorar la precisión y claridad de Alex IA para todos los estudiantes.
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {/* Opciones de Percepción */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFeedbackSentiment("high")}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all ${
                  feedbackSentiment === "high"
                    ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 shadow-sm"
                    : "border-border bg-background hover:bg-muted/40 text-foreground"
                }`}
              >
                <span>🟢</span> Me representa bastante
              </button>

              <button
                type="button"
                onClick={() => setFeedbackSentiment("medium")}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all ${
                  feedbackSentiment === "medium"
                    ? "border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-400 shadow-sm"
                    : "border-border bg-background hover:bg-muted/40 text-foreground"
                }`}
              >
                <span>🟡</span> Algunas sí, otras no
              </button>

              <button
                type="button"
                onClick={() => setFeedbackSentiment("low")}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all ${
                  feedbackSentiment === "low"
                    ? "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-400 shadow-sm"
                    : "border-border bg-background hover:bg-muted/40 text-foreground"
                }`}
              >
                <span>🔴</span> No me representa
              </button>
            </div>

            {/* Preguntas opcionales abiertas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  ¿Había alguna carrera que esperabas encontrar? (opcional)
                </label>
                <input
                  type="text"
                  value={feedbackExpected}
                  onChange={(e) => setFeedbackExpected(e.target.value)}
                  placeholder="Ej. Medicina Veterinaria, Psicología..."
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  ¿Hay alguna carrera que no esperabas ver pero te gustaría explorar? (opcional)
                </label>
                <input
                  type="text"
                  value={feedbackUnexpected}
                  onChange={(e) => setFeedbackUnexpected(e.target.value)}
                  placeholder="Ej. Ingeniería Biomédica, Ciencia de Datos..."
                  className="w-full rounded-xl border border-border bg-background p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                disabled={isSubmittingFeedback || (!feedbackSentiment && !feedbackExpected.trim() && !feedbackUnexpected.trim())}
                onClick={handleSendFeedback}
                className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-40 transition-all cursor-pointer"
              >
                {isSubmittingFeedback ? "Guardando..." : "Enviar comentarios"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          DESCARGO INSTITUCIONAL Y TRANSPARENCIA (Regla 16)
          ========================================================================= */}
      <div className="mt-8 rounded-2xl bg-muted/40 p-4 text-[11px] leading-relaxed text-muted-foreground text-center border border-border/60">
        Alex IA es una plataforma de orientación vocacional y autoconocimiento. Las recomendaciones y porcentajes
        reflejan compatibilidad metodológica entre tus respuestas y los perfiles de 132 carreras; no garantizan admisión,
        remuneración ni éxito laboral futuro. No reemplaza el acompañamiento psicopedagógico profesional.
      </div>

      {/* Popup Asistente Coach IA */}
      {showCoachPopup && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl max-w-[300px]">
            <button
              onClick={() => setShowCoachPopup(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm">Alex IA Coach</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              👋 Vi tus resultados de afinidad con {top1.name}. ¿Quieres conversar sobre qué significa este perfil para tus metas?
            </p>
            <Link
              to="/coach"
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-102 shadow-sm"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Conversar ahora
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}