import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
   COMPONENTE: RADAR DEL ADN VOCACIONAL (38 DIMENSIONES - PALETA TECH MODERNA)
   ========================================================================= */
function HomeRadarPreview() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const pillars = [
    { name: "Aptitudes", weight: "30%", val: 88, desc: "Lógica, analítica, numérica, espacial, verbal, creativa, social, organizacional." },
    { name: "Intereses", weight: "25%", val: 92, desc: "Modelo RIASEC: Realista, Investigativo, Artístico, Social, Emprendedor, Convencional." },
    { name: "Personalidad", weight: "20%", val: 84, desc: "Iniciativa, perseverancia, sociabilidad, adaptabilidad, autonomía, liderazgo." },
    { name: "Preferencias", weight: "15%", val: 78, desc: "Entorno laboral, datos vs. personas, práctica, tecnología, expresión." },
    { name: "Valores", weight: "10%", val: 86, desc: "Impacto social, ingresos, estabilidad, creatividad, reconocimiento, equilibrio." },
  ];

  const size = 320;
  const center = size / 2;
  const radius = 100;
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
    <div className="flex flex-col items-center select-none w-full">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[300px] overflow-visible">
        {/* Polígonos concéntricos guía */}
        {[0.33, 0.66, 1].map((scale) => (
          <polygon
            key={scale}
            points={pillars.map((_, i) => point(100 * scale, i).join(",")).join(" ")}
            fill="none"
            stroke="#CBD5E1"
            strokeOpacity={scale === 1 ? 0.7 : 0.4}
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
              stroke="#CBD5E1"
              strokeOpacity={hoveredIdx === i ? 0.9 : 0.5}
              strokeWidth={hoveredIdx === i ? 1.5 : 1}
            />
          );
        })}

        {/* Polígono de afinidad vocacional (Primary Blue #4F6BFF) */}
        <polygon
          points={polygonPoints}
          fill="#4F6BFF"
          fillOpacity={0.18}
          stroke="#4F6BFF"
          strokeWidth={2.4}
          className="transition-all duration-300"
        />

        {/* Vértices interactivos */}
        {pillars.map((p, i) => {
          const [px, py] = point(p.val, i);
          const [lx, ly] = point(124, i);
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
                r={isHovered ? 7 : 4.5}
                fill={isHovered ? "#172554" : "#4F6BFF"}
                stroke="#FFFFFF"
                strokeWidth={2}
                className="transition-all duration-200"
              />
              <text
                x={lx}
                y={ly - 2}
                textAnchor="middle"
                className={`text-[12px] font-bold transition-all duration-200 ${
                  isHovered ? "fill-[#4F6BFF] font-extrabold" : "fill-[#172033]"
                }`}
              >
                {p.name}
              </text>
              <text
                x={lx}
                y={ly + 11}
                textAnchor="middle"
                className="text-[10px] font-semibold fill-[#64748B]"
              >
                {p.weight}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mini detalle del pilar */}
      <div className="mt-4 text-center min-h-[46px] px-3 max-w-sm">
        {hoveredIdx !== null ? (
          <p className="text-xs text-[#172033] leading-relaxed">
            <span className="font-bold text-[#4F6BFF]">{pillars[hoveredIdx].name} ({pillars[hoveredIdx].weight}):</span>{" "}
            <span className="text-[#64748B]">{pillars[hoveredIdx].desc}</span>
          </p>
        ) : (
          <p className="text-xs text-[#64748B]">
            Pasa el cursor sobre los 5 ejes para explorar el peso de cada dimensión.
          </p>
        )}
      </div>
    </div>
  );
}

function Index() {
  const { role, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleTestClick = (e: React.MouseEvent) => {
    const isPilotMode = import.meta.env.VITE_PILOT_MODE === 'true';
    if (!role) {
      e.preventDefault();
      if (isPilotMode) {
        navigate({ to: "/registro/estudiante" });
      } else {
        setShowAuthModal(true);
      }
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
    <div className="bg-[#FFFFFF] text-[#172033] min-h-screen font-sans">
      
      {/* =====================================================================
          1. HERO PRINCIPAL (FONDO BLANCO, AZUL #4F6BFF, TRATAMIENTO ANCHO COMPLETO)
          ===================================================================== */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-[#FFFFFF]">
        
        {/* Imagen de fondo / lateral derecho para Desktop */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[58%] xl:w-[60%] pointer-events-none select-none">
          <img
            src={heroImg}
            alt="Estudiantes peruanos colaborando en su orientación vocacional con Alex IA"
            className="w-full h-full object-cover object-[78%_center]"
            loading="eager"
          />
          {/* Fusión sutil de la fotografía hacia el fondo blanco izquierdo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/80 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 min-h-[520px] lg:min-h-[580px] flex items-center">
          
          {/* Columna de Contenido Textual (40–45% en desktop) */}
          <div className="relative z-10 w-full lg:max-w-[46%] flex flex-col justify-center">
            
            {/* Eyebrow Azul #4F6BFF */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#4F6BFF]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F6BFF]">
                Orientación vocacional para tu futuro
              </span>
            </div>

            {/* Headline Moderno */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.10] tracking-tight text-[#172033]">
              Descubre qué caminos{" "}
              <span className="text-[#4F6BFF]">encajan contigo</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#64748B] max-w-lg">
              Conoce tus intereses, habilidades, personalidad y valores. Alex IA convierte
              todo eso en un perfil vocacional que te ayuda a explorar carreras que podrían
              encajar contigo.
            </p>

            {/* Imagen visible en pantallas pequeñas (Mobile y Tablet) */}
            <div className="block lg:hidden my-6 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
              <img
                src={heroImg}
                alt="Estudiantes peruanos colaborando en su orientación vocacional"
                className="w-full h-auto object-cover object-center"
              />
            </div>

            {/* Llamados a la Acción */}
            <div className="mt-4 sm:mt-7 flex flex-wrap items-center gap-3.5">
              {/* CTA Principal: Azul #4F6BFF con texto blanco */}
              <Link
                to="/test"
                onClick={handleTestClick}
                className="inline-flex items-center justify-center rounded-xl bg-[#4F6BFF] px-8 py-4 text-base font-bold text-[#FFFFFF] shadow-sm hover:bg-[#3d59e8] transition-colors"
              >
                Realizar mi test
              </Link>
              {/* CTA Secundario: Fondo blanco, borde #172554, texto #172554 */}
              <Link
                to="/carreras"
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#172554] bg-[#FFFFFF] px-7 py-3.5 text-base font-bold text-[#172554] hover:bg-[#F7F9FC] transition-colors"
              >
                Explorar carreras
              </Link>
            </div>

            {/* Subtexto verificable y honesto */}
            <p className="mt-6 text-xs text-[#64748B] leading-normal">
              Metodología vocacional adaptada para estudiantes de 3.°, 4.° y 5.° de secundaria en Perú.
            </p>

          </div>

        </div>
      </section>

      {/* =====================================================================
          2. FRANJA DE ESTADÍSTICAS (FONDO BLANCO, NÚMEROS #172554, ACENTO #4F6BFF)
          ===================================================================== */}
      <section className="border-b border-[#E2E8F0] bg-[#FFFFFF] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 divide-y divide-[#E2E8F0] md:grid-cols-3 md:gap-12 md:divide-y-0 md:divide-x">
            
            {/* Stat 1 */}
            <div className="flex flex-col pt-6 md:pt-0 md:pr-10">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#172554] tracking-tight">
                60<span className="text-[#4F6BFF]">%</span>
              </div>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xs">
                de jóvenes en Perú no termina ejerciendo la carrera que estudió.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col pt-8 md:pt-0 md:px-10">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#172554] tracking-tight">
                1 <span className="text-3xl sm:text-4xl font-normal text-[#64748B]">de</span> 3
              </div>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xs">
                estudiantes cambia de carrera o universidad en sus primeros años.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col pt-8 md:pt-0 md:pl-10">
              <div className="text-5xl sm:text-6xl font-extrabold text-[#172554] tracking-tight">
                80<span className="text-[#4F6BFF]">%</span>
              </div>
              <p className="mt-3 text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xs">
                reduce el riesgo de deserción al utilizar herramientas fundamentadas de autoconocimiento.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SECCIÓN CENTRAL: ADN VOCACIONAL (FONDO #F7F9FC SOFT GRAY)
          ===================================================================== */}
      <section className="py-16 sm:py-20 lg:py-28 border-b border-[#E2E8F0] bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Columna Informativa */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-2 w-2 rounded-full bg-[#4F6BFF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#4F6BFF]">
                  Diferencial Metodológico
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172033] leading-tight">
                No somos solo un test vocacional.
              </h2>

              <p className="mt-5 text-base sm:text-lg text-[#64748B] leading-relaxed">
                Alex IA analiza tu perfil desde <strong className="text-[#172033] font-semibold">38 dimensiones</strong> para ayudarte a entender tus intereses, habilidades, personalidad, valores y preferencias.
              </p>

              {/* Desglose estructurado de las macrodimensiones con acento azul #4F6BFF */}
              <div className="mt-8 space-y-3">
                <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 transition-colors hover:border-[#4F6BFF]/40 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#172033]">Aptitudes (30%)</span>
                    <span className="text-xs text-[#4F6BFF] font-bold bg-[#4F6BFF]/10 px-2.5 py-0.5 rounded-full">8 variables</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 leading-normal">
                    Lógica, numérica, verbal, analítica, espacial, creativa, social y organizacional.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 transition-colors hover:border-[#4F6BFF]/40 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#172033]">Intereses (25%)</span>
                    <span className="text-xs text-[#4F6BFF] font-bold bg-[#4F6BFF]/10 px-2.5 py-0.5 rounded-full">6 variables</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 leading-normal">
                    Modelo RIASEC: Realista, Investigativo, Artístico, Social, Emprendedor y Convencional.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 transition-colors hover:border-[#4F6BFF]/40 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#172033]">Personalidad (20%)</span>
                    <span className="text-xs text-[#4F6BFF] font-bold bg-[#4F6BFF]/10 px-2.5 py-0.5 rounded-full">8 variables</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 leading-normal">
                    Sociabilidad, iniciativa, perseverancia, adaptabilidad, colaboración, autonomía, liderazgo y estabilidad.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 transition-colors hover:border-[#4F6BFF]/40 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#172033]">Preferencias y Valores (25%)</span>
                    <span className="text-xs text-[#4F6BFF] font-bold bg-[#4F6BFF]/10 px-2.5 py-0.5 rounded-full">16 variables</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-1 leading-normal">
                    Entornos de trabajo, datos vs. personas, impacto social, ingresos, autonomía y equilibrio de vida.
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Visual: Radar real del producto con azul #4F6BFF */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 sm:p-8 shadow-sm">
                <div className="border-b border-[#E2E8F0] pb-4 mb-4 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Visualización de Perfil Integral
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#172033] mt-0.5">
                    ADN Vocacional V1
                  </h3>
                </div>

                <HomeRadarPreview />

                <div className="mt-5 pt-4 border-t border-[#E2E8F0] text-center">
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Compatibilidad calculada determinísticamente contra las <strong className="text-[#172033]">132 carreras</strong> del catálogo nacional.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CÓMO FUNCIONA (FONDO BLANCO, NÚMEROS #4F6BFF, LÍNEA #CBD5E1)
          ===================================================================== */}
      <section className="py-16 sm:py-20 lg:py-28 border-b border-[#E2E8F0] bg-[#FFFFFF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14 lg:mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F6BFF]">
              El Proceso
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172033] mt-2">
              ¿Cómo funciona?
            </h2>
            <p className="mt-3 text-base text-[#64748B] leading-relaxed">
              Cuatro etapas que transforman tus respuestas espontáneas en decisiones vocacionales con respaldo.
            </p>
          </div>

          {/* Secuencia de 4 pasos con línea #CBD5E1 */}
          <div className="relative">
            {/* Línea horizontal continua en desktop #CBD5E1 */}
            <div className="hidden lg:block absolute top-7 left-10 right-10 h-[2px] bg-[#CBD5E1] -z-0" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col">
                  {/* Número azul #4F6BFF destacado */}
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFFFFF] border-2 border-[#CBD5E1] text-[#4F6BFF] text-xl font-extrabold mb-5 shadow-xs">
                    {s.num}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#172033]">
                    {s.title}
                  </h3>
                  
                  <p className="mt-2.5 text-sm text-[#64748B] leading-relaxed">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          5. EXPLORAR CARRERAS (FONDO #F7F9FC, CARDS BLANCAS, HOVER #4F6BFF)
          ===================================================================== */}
      <section className="py-16 sm:py-20 lg:py-28 border-b border-[#E2E8F0] bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4F6BFF]">
                Catálogo Nacional
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172033] mt-1">
                Explora las 132 carreras
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-xl leading-relaxed">
                Un mapa completo de opciones universitarias y técnicas en Perú, con datos de empleabilidad, áreas y proyección real.
              </p>
            </div>

            <Link
              to="/carreras"
              className="inline-flex items-center text-sm font-bold text-[#4F6BFF] hover:text-[#3d59e8] transition-colors self-start md:self-end"
            >
              Ver las 132 carreras →
            </Link>
          </div>

          {/* Cards blancas con bordes #E2E8F0 y hover #4F6BFF */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careers.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                to="/carreras/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 sm:p-7 transition-all hover:border-[#4F6BFF] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4F6BFF] bg-[#4F6BFF]/10 px-2.5 py-1 rounded-full">
                      {c.area}
                    </span>
                    <span className="text-xs font-semibold text-[#64748B]">
                      {c.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#172033] group-hover:text-[#4F6BFF] transition-colors">
                    {c.name}
                  </h3>

                  <p className="mt-3 text-sm text-[#64748B] line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                  <span>Salario ref: <strong className="text-[#172033] font-semibold">{c.salary.split("—")[0].trim()}</strong></span>
                  <span className="font-bold text-[#4F6BFF] group-hover:underline">
                    Conocer carrera
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/carreras"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#E2E8F0] bg-[#FFFFFF] px-8 py-3.5 text-sm font-bold text-[#172554] hover:border-[#4F6BFF] hover:text-[#4F6BFF] transition-colors"
            >
              Ver todas las 132 carreras
            </Link>
          </div>

        </div>
      </section>

      {/* =====================================================================
          6. SECCIÓN FINAL / CTA (FONDO NAVY #172554, BOTÓN CORAL #FF7657)
          ===================================================================== */}
      <section className="bg-[#172554] text-[#FFFFFF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#FFFFFF] leading-tight">
            Tu futuro no tiene una sola ruta.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-[#FFFFFF]/80 leading-relaxed">
            Empieza por conocerte y descubre qué caminos podrían encajar contigo.
          </p>

          <div className="mt-8 flex justify-center">
            {/* Botón Coral #FF7657 con texto blanco */}
            <Link
              to="/test"
              onClick={handleTestClick}
              className="inline-flex items-center justify-center rounded-xl bg-[#FF7657] px-8 py-4 text-base font-extrabold text-[#FFFFFF] shadow-md hover:bg-[#e86446] transition-colors"
            >
              Descubrir mi perfil
            </Link>
          </div>

          <p className="mt-5 text-xs text-[#FFFFFF]/60">
            Cuestionario vocacional estructurado de 40 preguntas · 38 dimensiones vocacionales
          </p>

        </div>
      </section>
    </div>
  );
}
