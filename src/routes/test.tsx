import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Loader2,
  GraduationCap,
  Clock,
  Compass,
  Check,
  Trophy,
  Brain,
  Lock,
  Zap,
} from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useAuth } from "../hooks/use-auth";
import { DiscoveryLayer } from "../components/discovery/DiscoveryLayer";
import { getDiscoveryLocal } from "../lib/discovery";
import {
  getQuestionsForGrade,
  QuestionnaireEngine,
  QuestionnaireStorage,
  type GradeLevel,
  type QuestionItem,
  type QuestionOptionKey,
  type QuestionResponseItem
} from "../lib/questionnaire";
import { loadCareersFromSupabase, type CareerProfile } from "../lib/matching";

export const Route = createFileRoute("/test")({
  head: () => ({ meta: [{ title: "Test Vocacional Oficial — Alex IA" }] }),
  component: TestPage,
});

// Gamificación: 4 niveles de progresión hasta desbloquear el ADN completo
const STAGES = [
  { id: 1, name: "Intereses", icon: Sparkles, range: "P1 – P10", desc: "Tus pasiones y áreas de curiosidad" },
  { id: 2, name: "Habilidades", icon: Brain, range: "P11 – P20", desc: "Retos y destrezas cognitivas" },
  { id: 3, name: "Personalidad", icon: Compass, range: "P21 – P30", desc: "Estilo y dinámica de trabajo" },
  { id: 4, name: "Valores & ADN", icon: GraduationCap, range: "P31 – P40", desc: "Prioridades e integración final" },
];

function getQuestionTypeFriendlyBadge(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("espacial")) return "🧩 Reto Espacial";
  if (t.includes("objetivo")) return "🎯 Reto Lógico";
  if (t.includes("verbal")) return "📚 Expresión Verbal";
  if (t.includes("caso")) return "💼 Caso Práctico";
  if (t.includes("scenario") || t.includes("dilemma")) return "🧭 Situación Real";
  if (t.includes("forced-choice") || t.includes("trade-off")) return "⚖️ Preferencia Clave";
  if (t.includes("consistency") || t.includes("integraci")) return "🔍 Reflexión de Futuro";
  if (t.includes("creativo")) return "💡 Exploración Creativa";
  return "Pregunta de Exploración";
}

function TestPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 1. Estado del Onboarding Discovery
  const [discoveryDone, setDiscoveryDone] = useState(() => {
    const local = getDiscoveryLocal();
    return !!local && Object.keys(local.raw_answers || {}).length >= 3;
  });

  // 2. Estado de Grado Escolar (3S, 4S, 5S)
  const [gradeLevel, setGradeLevel] = useState<GradeLevel | null>(() => {
    // Si el usuario ya tiene su grado en metadata de registro, precargar
    const userGrade = user?.user_metadata?.grade;
    if (userGrade === "3ro" || userGrade === "3S") return "3S";
    if (userGrade === "4to" || userGrade === "4S") return "4S";
    if (userGrade === "5to" || userGrade === "5S") return "5S";
    return null;
  });

  // 3. Catálogo de preguntas adaptadas al grado
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [qIdx, setQIdx] = useState(0);

  // 4. Registro de respuestas y telemetría de tiempos
  const [responses, setResponses] = useState<Record<string, QuestionResponseItem>>({});
  const [selectedOption, setSelectedOption] = useState<QuestionOptionKey | null>(null);
  const questionStartTimeRef = useRef<number>(Date.now());

  // 5. Carreras activas para matching determinístico
  const [careers, setCareers] = useState<CareerProfile[]>([]);
  const [isLoadingCareers, setIsLoadingCareers] = useState(false);

  // 6. Estado de procesamiento y guardado final
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");

  // 7. Gamificación: Modal de nivel desbloqueado cada 10 preguntas
  const [unlockedLevelModal, setUnlockedLevelModal] = useState<number | null>(null);

  // Cargar catálogo de carreras en segundo plano
  useEffect(() => {
    let isMounted = true;
    async function fetchCareers() {
      try {
        setIsLoadingCareers(true);
        const data = await loadCareersFromSupabase(supabase);
        if (isMounted) setCareers(data);
      } catch (err) {
        console.warn("No se pudieron cargar carreras de Supabase (se usará respaldo local):", err);
      } finally {
        if (isMounted) setIsLoadingCareers(false);
      }
    }
    fetchCareers();
    return () => {
      isMounted = false;
    };
  }, []);

  // Actualizar preguntas cuando se seleccione o cambie el grado
  useEffect(() => {
    if (gradeLevel) {
      const qList = getQuestionsForGrade(gradeLevel);
      setQuestions(qList);
      setQIdx(0);
      questionStartTimeRef.current = Date.now();
    }
  }, [gradeLevel]);

  // Reiniciar temporizador al cambiar de pregunta
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
    if (questions[qIdx]) {
      const existing = responses[questions[qIdx].base_question_id];
      setSelectedOption(existing ? existing.selected_option : null);
    }
  }, [qIdx, questions]);

  // Selección de opción y avance con gamificación
  const handleSelectOption = (key: QuestionOptionKey) => {
    if (isProcessing) return;
    const currentQ = questions[qIdx];
    if (!currentQ) return;

    const timeSpent = Math.max(100, Date.now() - questionStartTimeRef.current);
    setSelectedOption(key);

    const newResponseItem: QuestionResponseItem = {
      question_id: currentQ.question_id,
      base_question_id: currentQ.base_question_id,
      variant_id: currentQ.variant_id,
      selected_option: key,
      response_time_ms: timeSpent,
    };

    const updatedResponses = {
      ...responses,
      [currentQ.base_question_id]: newResponseItem,
    };
    setResponses(updatedResponses);

    // Retardo suave para feedback visual y check de hito por nivel
    setTimeout(() => {
      if (qIdx + 1 < questions.length) {
        // Cada 10 preguntas (P10 en idx 9, P20 en idx 19, P30 en idx 29), celebrar nivel
        if ((qIdx + 1) % 10 === 0) {
          const completedLevel = (qIdx + 1) / 10;
          setUnlockedLevelModal(completedLevel);
        } else {
          setQIdx((prev) => prev + 1);
          setSelectedOption(null);
        }
      } else {
        // Fin del cuestionario -> procesar intento
        handleFinishQuestionnaire(updatedResponses);
      }
    }, 240);
  };

  const handlePrev = () => {
    if (qIdx > 0 && !isProcessing) {
      setQIdx((prev) => prev - 1);
    }
  };

  // Procesamiento y generación del Perfil 38D y Recomendaciones
  const handleFinishQuestionnaire = async (finalResponses: Record<string, QuestionResponseItem>) => {
    if (!gradeLevel) return;
    setIsProcessing(true);
    setProcessingStatus("Analizando tus respuestas...");

    try {
      const responseList = Object.values(finalResponses);
      const studentId = user?.id || "anon_" + Math.random().toString(36).substring(2, 9);

      setProcessingStatus("Mapeando tus 38 dimensiones vocacionales...");
      await new Promise((r) => setTimeout(r, 450));

      setProcessingStatus("Calculando afinidad con el catálogo de 132 carreras...");
      const scoringResult = QuestionnaireEngine.processAttempt(
        studentId,
        gradeLevel,
        1,
        responseList,
        careers
      );

      setProcessingStatus("Consolidando tu ADN vocacional oficial...");
      await QuestionnaireStorage.saveAttempt(supabase, scoringResult, user?.id, {
        name: user?.user_metadata?.name || (user?.email ? user.email.split('@')[0] : 'Estudiante Piloto'),
        school: user?.user_metadata?.school || 'Colegio Piloto',
        grade: user?.user_metadata?.grade || (gradeLevel === '3S' ? '3ro' : gradeLevel === '4S' ? '4to' : '5to'),
      });

      setProcessingStatus("¡Listo! Mostrando tu reporte de resultados...");
      await new Promise((r) => setTimeout(r, 350));

      navigate({ to: "/resultados" });
    } catch (err) {
      console.error("Error al procesar el cuestionario vocacional:", err);
      navigate({ to: "/resultados" });
    } finally {
      setIsProcessing(false);
    }
  };

  // 1. Mostrar capa de descubrimiento si aún no está completa
  if (!discoveryDone) {
    return (
      <DiscoveryLayer
        userId={user?.id}
        onComplete={() => {
          setDiscoveryDone(true);
        }}
      />
    );
  }

  // 2. Pantalla de Bienvenida y Confirmación de Grado Escolar
  if (!gradeLevel) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm text-center animate-in fade-in duration-500">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary mb-6">
            <GraduationCap className="h-8 w-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            Test Vocacional Oficial
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            Personalicemos tu experiencia
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Para ofrecerte situaciones y retos que se sientan naturales y cercanos a tu momento formativo, confírmanos tu grado de secundaria:
          </p>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <button
              onClick={() => setGradeLevel("3S")}
              className="group flex items-center justify-between p-5 rounded-2xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <div>
                <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  3.º de secundaria
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Aproximadamente 14 – 15 años · Etapa de exploración inicial
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setGradeLevel("4S")}
              className="group flex items-center justify-between p-5 rounded-2xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <div>
                <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  4.º de secundaria
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Aproximadamente 15 – 16 años · Etapa de profundización
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setGradeLevel("5S")}
              className="group flex items-center justify-between p-5 rounded-2xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <div>
                <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  5.º de secundaria
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Aproximadamente 16 – 17 años · Transición preuniversitaria y profesional
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Evaluación vocacional integral con 38 dimensiones adaptada especialmente a tu grado escolar.</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Pantalla de Procesamiento Final
  if (isProcessing) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center animate-in fade-in duration-500">
        <div className="relative mb-6">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-primary animate-bounce" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          Generando tu ADN Vocacional
        </h2>

        <p className="text-muted-foreground text-base mb-6 font-medium animate-pulse">
          {processingStatus || "Procesando tus 40 respuestas..."}
        </p>

        <div className="w-full max-w-md h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse w-full" />
        </div>
      </div>
    );
  }

  // 4. Pantalla del Cuestionario (40 Preguntas con Gamificación)
  const currentQ = questions[qIdx];
  if (!currentQ) return null;

  const progressPct = ((qIdx + 1) / questions.length) * 100;
  const isSelected = (key: QuestionOptionKey) => selectedOption === key;

  // Nivel actual en la gamificación (1 a 4)
  const currentStageId = Math.min(4, Math.floor(qIdx / 10) + 1);
  const currentStage = STAGES[currentStageId - 1];
  const questionInStageNumber = (qIdx % 10) + 1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 sm:px-6">
      {/* Tracker de Gamificación Superior: 4 Niveles */}
      <div className="mb-8 rounded-3xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {STAGES.map((st) => {
            const isCompleted = currentStageId > st.id;
            const isCurrent = currentStageId === st.id;
            return (
              <div
                key={st.id}
                className={`rounded-2xl p-2.5 text-center transition-all ${
                  isCurrent
                    ? "bg-primary/10 border-2 border-primary text-primary shadow-sm"
                    : isCompleted
                    ? "bg-muted/60 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted/20 border border-transparent text-muted-foreground/60 opacity-60"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : isCurrent ? (
                    <st.icon className="h-4 w-4 animate-pulse text-primary" />
                  ) : (
                    <Lock className="h-3.5 w-3.5" />
                  )}
                  <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">
                    Nivel {st.id}
                  </span>
                </div>
                <p className="text-xs font-bold truncate">{st.name}</p>
              </div>
            );
          })}
        </div>

        {/* Barra de Progreso y Datos del Nivel */}
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
          <span className="flex items-center gap-1.5 text-foreground">
            <Compass className="h-4 w-4 text-primary" />
            Nivel {currentStageId} de 4: <strong className="text-primary font-bold">{currentStage.name}</strong>
            <span className="text-muted-foreground font-normal hidden sm:inline">
              (Pregunta {questionInStageNumber} de 10)
            </span>
          </span>
          <span className="font-semibold text-primary">
            Pregunta {qIdx + 1} de {questions.length} · {Math.round(progressPct)}%
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Tarjeta de la Pregunta */}
      <div
        key={currentQ.question_id}
        className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-400"
      >
        {/* Encabezado amigable y motivador */}
        <div className="flex items-center justify-between mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-3.5 py-1 text-xs font-semibold text-foreground">
            {getQuestionTypeFriendlyBadge(currentQ.question_type)}
          </span>
          {currentQ.is_experimental ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Reto Creativo Especial
            </span>
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              Nivel {currentStageId} · {currentStage.range}
            </span>
          )}
        </div>

        {/* Enunciado de la Pregunta */}
        <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug mb-6">
          {currentQ.stem}
        </h2>

        {/* Estímulo Visual para Q33 (Cubo Espacial) */}
        {currentQ.visual_asset && (
          <div className="my-6 rounded-2xl border border-border bg-muted/20 p-4 text-center">
            <img
              src={currentQ.visual_asset}
              alt="Estímulo visual espacial: Cubo 3D en rotación"
              className="mx-auto max-h-72 w-auto object-contain rounded-xl shadow-sm"
              loading="eager"
            />
            <p className="mt-2 text-xs text-muted-foreground italic">
              Observa con atención el cubo de referencia y su orientación resultante tras el giro de 90°.
            </p>
          </div>
        )}

        {/* Opciones A, B, C, D */}
        <div className="grid grid-cols-1 gap-3.5 mb-8">
          {currentQ.options.map((opt) => {
            const active = isSelected(opt.key);
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleSelectOption(opt.key)}
                className={`group relative flex items-start gap-3.5 rounded-2xl border p-4 text-left font-medium transition-all duration-200 ${
                  active
                    ? "border-primary bg-primary/10 shadow-sm text-foreground"
                    : "border-border bg-background/60 hover:border-primary/50 hover:bg-muted/30 text-foreground/90"
                }`}
              >
                <div
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl font-bold text-xs transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  }`}
                >
                  {active ? <Check className="h-4 w-4" /> : opt.key}
                </div>
                <span className="text-sm sm:text-base leading-relaxed pt-0.5">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controles de Navegación */}
        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <button
            type="button"
            disabled={qIdx === 0}
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors px-2 py-1 rounded-lg"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Anterior
          </button>

          <span className="text-xs text-muted-foreground">
            Grado: <strong className="text-foreground">{gradeLevel === "3S" ? "3.º" : gradeLevel === "4S" ? "4.º" : "5.º"} de secundaria</strong>
          </span>
        </div>
      </div>

      {/* MODAL DE CELEBRACIÓN DE NIVEL DESBLOQUEADO (CADA 10 PREGUNTAS) */}
      {unlockedLevelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-card p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/25">
              <Trophy className="h-8 w-8 animate-bounce" />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-3">
              ¡Hito de ADN Desbloqueado!
            </span>

            <h3 className="text-2xl font-black text-foreground mb-2">
              {unlockedLevelModal === 1 && "¡Nivel 1 Completado: Intereses!"}
              {unlockedLevelModal === 2 && "¡Nivel 2 Completado: Habilidades!"}
              {unlockedLevelModal === 3 && "¡Nivel 3 Completado: Personalidad!"}
            </h3>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {unlockedLevelModal === 1 &&
                "Has completado tus primeras 10 preguntas. Tus principales motivaciones y pasiones vocacionales ya han sido mapeadas."}
              {unlockedLevelModal === 2 &&
                "Completaste las 20 preguntas de habilidad y retos. Ya registramos tu forma de razonar y resolver desafíos cognitivos."}
              {unlockedLevelModal === 3 &&
                "¡30 preguntas listas! Ya identificamos cómo te relacionas, trabajas en equipo y lideras en distintos entornos."}
            </p>

            <div className="rounded-2xl bg-muted/60 border border-border p-3.5 mb-6 text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Progreso de tu ADN:</span>
              <span className="font-extrabold text-primary text-sm">
                {unlockedLevelModal * 25}% completado
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setUnlockedLevelModal(null);
                setQIdx((prev) => prev + 1);
                setSelectedOption(null);
              }}
              className="w-full rounded-2xl bg-primary py-3.5 px-6 font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-transform hover:scale-102 flex items-center justify-center gap-2"
            >
              Continuar al Nivel {unlockedLevelModal + 1}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}