import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "../assets/hero-students.png";
import { careers } from "../lib/mock-data";
import { useAuth } from "../hooks/use-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex IA — Orientación vocacional para tu futuro" },
      {
        name: "description",
        content:
          "Descubre qué caminos encajan contigo. Alex IA analiza tu perfil desde 38 dimensiones vocacionales para ayudarte a explorar carreras que resuenan con tus fortalezas reales.",
      },
      { property: "og:title", content: "Alex IA — Orientación vocacional para tu futuro" },
      {
        property: "og:description",
        content:
          "Descubre carreras compatibles con tus intereses, habilidades, personalidad y valores.",
      },
    ],
  }),
  component: Index,
});

/* =========================================================================
   COMPONENTE: MINI RADAR EDITORIAL DEL ADN VOCACIONAL (38 DIMENSIONES)
   ========================================================================= */
function HomeRadarPreview() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const pillars = [
    { name: "Aptitudes", weight: "30%", val: 88, desc: "Lógica, analítica, numérica, espacial, creativa..." },
    { name: "Intereses", weight: "25%", val: 92, desc: "Modelo RIASEC: Realista, Investigativo, Artístico..." },
    { name: "Personalidad", weight: "20%", val: 84, desc: "Iniciativa, perseverancia, colaboración, estabilidad..." },
    { name: "Preferencias", weight: "15%", val: 78, desc: "Entorno de trabajo, datos, personas, campo..." },
    { name: "Valores", weight: "10%", val: 86, desc: "Impacto, reconocimiento, autonomía, equilibrio..." },
  ];

  const size = 300;
  const center = size / 2;
  const radius = 95;
  const total = pillars.length;

  const point = (pct: number, i: number) => {
    const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
    const r = (radius * pct) / 100;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };

  const polygonPoints = pillars
    .map((p, i) => point(p.val, i).join(","))
    .join(" ");

  return (
    <div className="flex flex-col items-center select-none">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[270px] overflow-visible">
        {/* Anillos concéntricos */}
        {[0.33, 0.66, 1].map((scale) => (
          <polygon
            key={scale}
            points={pillars.map((_, i) => point(100 * scale, i).join(",")).join(" ")}
            fill="none"
            stroke="#12213B"
            strokeOpacity={scale === 1 ? 0.25 : 0.09}
            strokeDasharray={scale === 1 ? undefined : "3 3"}
          />
        ))}

        {/* Ejes radiales */}
        {pillars.map((_, i) => {
          const [x, y] = point(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#12213B"
              strokeOpacity={hoveredIdx === i ? 0.45 : 0.15}
              strokeWidth={hoveredIdx === i ? 1.5 : 1}
            />
          );
        })}

        {/* Polígono de perfil vocacional */}
        <polygon
          points={polygonPoints}
          fill="#E8A33D"
          fillOpacity={0.22}
          stroke="#E8A33D"
          strokeWidth={2.2}
          className="transition-all duration-300"
        />

        {/* Vértices interactivos */}
        {pillars.map((p, i) => {
          const [px, py] = point(p.val, i);
          const [lx, ly] = point(122, i);
          const isHovered = hoveredIdx === i;

          return (
            <g
              key={p.name}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <circle
                cx={px}
                cy={py}
                r={isHovered ? 6 : 4}
                fill={isHovered ? "#12213B" : "#E8A33D"}
                stroke="#FFFFFF"
                strokeWidth={1.5}
                className="transition-all duration-200"
              />
              <text
                x={lx}
                y={ly - 2}
                textAnchor="middle"
                className={`text-[11px] font-bold transition-all duration-200 ${
                  isHovered ? "fill-[#E8A33D] font-extrabold" : "fill-[#12213B]"
                }`}
              >
                {p.name}
              </text>
              <text
                x={lx}
                y={ly + 10}
                textAnchor="middle"
                className="text-[10px] font-medium fill-[#5C6B73]"
              >
                {p.weight}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mini detalle del pilar seleccionado */}
      <div className="mt-3 text-center min-h-[38px] px-3">
        {hoveredIdx !== null ? (
          <p className="text-xs text-[#12213B]">
            <span className="font-bold text-[#E8A33D]">{pillars[hoveredIdx].name} ({pillars[hoveredIdx].weight}):</span>{" "}
            <span className="text-[#5C6B73]">{pillars[hoveredIdx].desc}</span>
          </p>
        ) : (
          <p className="text-[11px] text-[#5C6B73]">
            Pasa el cursor sobre los 5 ejes para conocer las 38 variables.
          </p>
        )}
      </div>
    </div>
  );
}

function Index() {
  const { role, setShowAuthModal } = useAuth();

  const handleTestClick = (e: React.MouseEvent) => {
    if (!role) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  const steps = [
    {
      num: "01",
      title: "Conócete",
      text: "Responde situaciones cotidianas y mini-retos diseñados para mapear tus fortalezas, sin respuestas correctas o incorrectas.",
    },
    {
      num: "02",
      title: "Explora",
      text: "Conoce las carreras universitarias y técnicas que mayor afinidad guardan con tu perfil en base a datos reales.",
    },
    {
      num: "03",
      title: "Compara",
      text: "Entiende la compatibilidad en detalle a través de explicabilidad transparente en 38 dimensiones vocacionales.",
    },
    {
      num: "04",
      title: "Decide",
      text: "Construye tu siguiente paso con criterio informado, conociendo mallas, proyección y campos laborales afines.",
    },
  ];

  return (
    <div className="bg-[#F6F4EF] text-[#12213B] min-h-screen">
      {/* =====================================================================
          1. HERO PRINCIPAL (FOTOGRAFÍA REAL + CONTENIDO EDITORIAL)
          ===================================================================== */}
      <section className="relative border-b border-[#12213B]/8 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Columna Textual (aprox. 45% en desktop) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-[#E8A33D]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
                  Orientación vocacional para tu futuro
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-tight text-[#12213B]">
                Descubre qué caminos{" "}
                <span className="text-[#E8A33D] font-normal italic">encajan contigo</span>
              </h1>

              {/* Subheadline */}
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#5C6B73]">
                Conoce tus intereses, habilidades, personalidad y valores. Alex IA convierte
                todo eso en un perfil vocacional que te ayuda a explorar carreras que podrían
                encajar contigo.
              </p>

              {/* Botones de Acción */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/test"
                  onClick={handleTestClick}
                  className="inline-flex items-center justify-center rounded-lg bg-[#E8A33D] px-7 py-3.5 text-sm font-bold text-[#12213B] shadow-sm hover:bg-[#d9942e] transition-colors"
                >
                  Realizar mi test
                </Link>
                <Link
                  to="/carreras"
                  className="inline-flex items-center justify-center rounded-lg border border-[#12213B]/20 bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#12213B] hover:bg-white hover:border-[#12213B]/40 transition-colors"
                >
                  Explorar carreras
                </Link>
              </div>

              {/* Nota verídica y sobria */}
              <p className="mt-6 text-xs text-[#5C6B73] leading-normal">
                Metodología vocacional adaptada para estudiantes de 3.°, 4.° y 5.° de secundaria en Perú.
              </p>
            </div>

            {/* Columna Fotográfica (aprox. 55% en desktop) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl border border-[#12213B]/10 bg-white shadow-sm">
                <img
                  src={heroImg}
                  alt="Estudiantes peruanos colaborando en su orientación vocacional con Alex IA"
                  width={1024}
                  height={434}
                  className="w-full h-auto object-cover object-[center_right] transition-transform duration-700 hover:scale-[1.01]"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FRANJA EDITORIAL DE ESTADÍSTICAS (NO CARDS, SIN COLORINES)
          ===================================================================== */}
      <section className="border-b border-[#12213B]/8 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 divide-y divide-[#12213B]/10 md:grid-cols-3 md:gap-12 md:divide-y-0 md:divide-x">
            
            {/* Stat 1 */}
            <div className="flex flex-col pt-6 md:pt-0 md:pr-8">
              <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#12213B]">
                60<span className="text-[#E8A33D]">%</span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-[#5C6B73] leading-snug">
                de jóvenes en Perú no termina ejerciendo la carrera que estudió.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col pt-6 md:pt-0 md:px-8">
              <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#12213B]">
                1 <span className="text-2xl sm:text-3xl font-normal text-[#5C6B73]">de</span> 3
              </div>
              <p className="mt-2 text-sm sm:text-base text-[#5C6B73] leading-snug">
                estudiantes cambia de carrera o universidad en sus primeros años.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col pt-6 md:pt-0 md:pl-8">
              <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#12213B]">
                80<span className="text-[#E8A33D]">%</span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-[#5C6B73] leading-snug">
                reduce el riesgo de deserción al utilizar herramientas fundamentadas de autoconocimiento.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SECCIÓN CENTRAL: ADN VOCACIONAL (EL DIFERENCIAL REAL)
          ===================================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[#12213B]/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Columna Informativa */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8A33D]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
                  Diferencial Metodológico
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#12213B]">
                No somos solo un test vocacional.
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#5C6B73] leading-relaxed">
                Alex IA analiza tu perfil desde <strong className="text-[#12213B] font-semibold">38 dimensiones</strong> para ayudarte a entender tus intereses, habilidades, personalidad, valores y preferencias.
              </p>

              {/* Desglose de los 5 Pilares */}
              <div className="mt-8 space-y-3.5">
                <div className="rounded-xl border border-[#12213B]/10 bg-white/80 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#12213B]">Aptitudes (30%)</span>
                    <span className="text-xs text-[#E8A33D] font-bold">8 variables</span>
                  </div>
                  <p className="text-xs text-[#5C6B73] mt-1">
                    Lógica, numérica, verbal, analítica, espacial, creativa, social y organizacional.
                  </p>
                </div>

                <div className="rounded-xl border border-[#12213B]/10 bg-white/80 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#12213B]">Intereses (25%)</span>
                    <span className="text-xs text-[#E8A33D] font-bold">6 variables</span>
                  </div>
                  <p className="text-xs text-[#5C6B73] mt-1">
                    Modelo RIASEC: Realista, Investigativo, Artístico, Social, Emprendedor y Convencional.
                  </p>
                </div>

                <div className="rounded-xl border border-[#12213B]/10 bg-white/80 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#12213B]">Personalidad (20%)</span>
                    <span className="text-xs text-[#E8A33D] font-bold">8 variables</span>
                  </div>
                  <p className="text-xs text-[#5C6B73] mt-1">
                    Sociabilidad, iniciativa, perseverancia, adaptabilidad, colaboración, autonomía, liderazgo y estabilidad.
                  </p>
                </div>

                <div className="rounded-xl border border-[#12213B]/10 bg-white/80 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#12213B]">Preferencias y Valores (25%)</span>
                    <span className="text-xs text-[#E8A33D] font-bold">16 variables</span>
                  </div>
                  <p className="text-xs text-[#5C6B73] mt-1">
                    Entornos de trabajo, datos vs. personas, impacto social, ingresos, autonomía y equilibrio de vida.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Visual: Radar real del producto */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-md rounded-2xl border border-[#12213B]/10 bg-white p-6 shadow-sm">
                <div className="border-b border-[#12213B]/8 pb-4 mb-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C6B73]">
                    Visualización de Perfil Integral
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-[#12213B] mt-0.5">
                    ADN Vocacional V1
                  </h3>
                </div>

                <HomeRadarPreview />

                <div className="mt-4 pt-3 border-t border-[#12213B]/8 text-center">
                  <p className="text-[11px] text-[#5C6B73]">
                    Compatibilidad calculada determinísticamente contra las <strong>132 carreras</strong> del catálogo nacional.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CÓMO FUNCIONA (RECORRIDO SECUENCIAL / LÍNEA DE RUTA)
          ===================================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[#12213B]/8 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12 lg:mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
              El Proceso
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#12213B] mt-2">
              ¿Cómo funciona?
            </h2>
            <p className="mt-3 text-base text-[#5C6B73]">
              Cuatro etapas que transforman tus respuestas espontáneas en decisiones vocacionales con respaldo.
            </p>
          </div>

          {/* Secuencia editorial tipo recorrido */}
          <div className="relative">
            {/* Línea horizontal continua en desktop */}
            <div className="hidden lg:block absolute top-7 left-8 right-8 h-[1px] bg-[#12213B]/15 -z-0" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col">
                  {/* Número editorial destacado */}
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-[#12213B]/15 text-[#12213B] font-editorial text-xl font-bold mb-4 shadow-2xs">
                    {s.num}
                  </div>
                  
                  <h3 className="font-editorial text-xl font-bold text-[#12213B]">
                    {s.title}
                  </h3>
                  
                  <p className="mt-2 text-sm text-[#5C6B73] leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          5. EXPLORAR CARRERAS (NO ECOMMERCE, ENFOQUE VOCACIONAL)
          ===================================================================== */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[#12213B]/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
                Catálogo Nacional
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl tracking-tight text-[#12213B] mt-1">
                Explora las 132 carreras
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5C6B73] max-w-xl">
                Un mapa completo de opciones universitarias y técnicas en Perú, con datos de empleabilidad, áreas y proyección real.
              </p>
            </div>

            <Link
              to="/carreras"
              className="inline-flex items-center text-sm font-bold text-[#12213B] hover:text-[#E8A33D] transition-colors self-start md:self-end"
            >
              Ver las 132 carreras →
            </Link>
          </div>

          {/* Muestra representativa de carreras */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careers.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                to="/carreras/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col justify-between rounded-xl border border-[#12213B]/10 bg-white p-6 transition-all hover:border-[#12213B]/30 hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6B73]">
                      {c.area}
                    </span>
                    <span className="text-xs font-bold text-[#12213B]">
                      {c.duration}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#12213B] group-hover:text-[#E8A33D] transition-colors">
                    {c.name}
                  </h3>

                  <p className="mt-3 text-sm text-[#5C6B73] line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#12213B]/8 flex items-center justify-between text-xs text-[#5C6B73]">
                  <span>Salario ref: <strong className="text-[#12213B] font-semibold">{c.salary.split("—")[0].trim()}</strong></span>
                  <span className="font-semibold text-[#12213B] group-hover:underline">
                    Conocer carrera
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/carreras"
              className="inline-flex items-center justify-center rounded-lg border border-[#12213B]/20 bg-white px-7 py-3 text-sm font-semibold text-[#12213B] hover:bg-[#F6F4EF] hover:border-[#12213B]/40 transition-colors"
            >
              Ver todas las 132 carreras
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================================
          6. SECCIÓN FINAL / CTA (SOBRIO, FONDO NAVY #12213B, SIN GRADIENTES)
          ===================================================================== */}
      <section className="bg-[#12213B] text-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Tu futuro no tiene una sola ruta.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">
            Empieza por conocerte y descubre qué caminos podrían encajar contigo.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/test"
              onClick={handleTestClick}
              className="inline-flex items-center justify-center rounded-lg bg-[#E8A33D] px-8 py-4 text-base font-bold text-[#12213B] shadow-sm hover:bg-[#d9942e] transition-colors"
            >
              Descubrir mi perfil
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/50">
            Cuestionario vocacional estructurado de 40 preguntas · 38 dimensiones vocacionales
          </p>

        </div>
      </section>
    </div>
  );
}
