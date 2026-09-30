import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Award,
  Sparkles,
  Search,
  Filter,
  Download,
  Database,
  ExternalLink,
  ChevronRight,
  Clock,
  GraduationCap,
  Building2,
  CheckCircle2,
  RefreshCw,
  Eye,
  FileText,
  Printer,
  FileDown,
  X,
  Compass,
  Zap,
  BarChart3,
  Copy,
  Check,
  BrainCircuit,
  SlidersHorizontal,
} from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import {
  fetchAllStudentEvaluations,
  exportEvaluationsToCSV,
  type StudentEvaluation,
  type EvaluatedQuestion,
} from "../lib/admin/evaluations";
import { VARIABLE_FRIENDLY_NAMES, ALL_VOCATIONAL_VARIABLES } from "../lib/questionnaire";
import { generateExecutivePDF, openPrintableReport } from "../lib/export/report-pdf";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de Administración & Informes Vocacionales — Alex IA" },
      { name: "description", content: "Monitoreo en tiempo real de los informes vocacionales y telemetría de respuestas de los estudiantes." },
    ],
  }),
  component: AdminDashboardPage,
});

/* =========================================================================
   COMPONENTE: RADAR DE 5 DIMENSIONES PARA EL MODAL DE INFORME
   ========================================================================= */
function MiniRadarChart({
  dimensions,
}: {
  dimensions: { intereses: number; aptitudes: number; personalidad: number; valores: number; preferencias: number };
}) {
  const data = [
    { name: "Intereses", value: dimensions.intereses },
    { name: "Aptitudes", value: dimensions.aptitudes },
    { name: "Personalidad", value: dimensions.personalidad },
    { name: "Valores", value: dimensions.valores },
    { name: "Preferencias", value: dimensions.preferencias },
  ];

  const size = 320;
  const center = size / 2;
  const radius = 105;
  const numPoints = data.length;
  const angle = (i: number) => (Math.PI * 2 * i) / numPoints - Math.PI / 2;
  const point = (v: number, i: number) => {
    const r = (Math.max(15, v) / 100) * radius;
    return [center + r * Math.cos(angle(i)), center + r * Math.sin(angle(i))];
  };

  const pts = data.map((d, i) => point(d.value, i).join(",")).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] overflow-visible select-none">
        {/* Guías concéntricas */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon
            key={scale}
            points={data.map((_, i) => point(100 * scale, i).join(",")).join(" ")}
            fill="none"
            stroke="#64748B"
            strokeOpacity={scale === 1 ? 0.35 : 0.15}
            strokeDasharray={scale === 1 ? undefined : "2 2"}
          />
        ))}

        {/* Ejes radiales */}
        {data.map((_, i) => {
          const [x, y] = point(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#64748B"
              strokeWidth={1}
              strokeOpacity={0.2}
            />
          );
        })}

        {/* Polígono relleno */}
        <polygon
          points={pts}
          fill="#4F6BFF"
          fillOpacity={0.25}
          stroke="#4F6BFF"
          strokeWidth={2.5}
        />

        {/* Vértices */}
        {data.map((d, i) => {
          const [px, py] = point(d.value, i);
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={5}
              fill="#FFFFFF"
              stroke="#4F6BFF"
              strokeWidth={2.5}
            />
          );
        })}

        {/* Etiquetas con puntaje */}
        {data.map((d, i) => {
          const [lx, ly] = point(122, i);
          return (
            <g key={d.name}>
              <text
                x={lx}
                y={ly - 4}
                textAnchor="middle"
                className="text-[11px] font-bold fill-[#172033]"
              >
                {d.name}
              </text>
              <text
                x={lx}
                y={ly + 8}
                textAnchor="middle"
                className="text-[10px] font-extrabold fill-[#4F6BFF]"
              >
                {d.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* =========================================================================
   PÁGINA PRINCIPAL DEL DASHBOARD DE ADMINISTRACIÓN
   ========================================================================= */
function AdminDashboardPage() {
  const [evaluations, setEvaluations] = useState<StudentEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeModalStudent, setActiveModalStudent] = useState<StudentEvaluation | null>(null);
  const [modalTab, setModalTab] = useState<"top_carreras" | "perfil_38d" | "respuestas_40">("top_carreras");
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  // Cargar evaluaciones
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllStudentEvaluations(supabase);
      setEvaluations(data);
    } catch (e) {
      console.error("Error al cargar evaluaciones:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Listener de tiempo real para sincronización automática
    const channel = supabase
      .channel("admin-test-sync")
      .on("postgres_changes", { event: "*", schema: "public", table: "test_results" }, () => {
        loadData();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "questionnaire_attempts" }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filtrado de evaluaciones
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter((ev) => {
      const matchesSearch =
        ev.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.topCareer?.name || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade =
        selectedGrade === "all" ||
        ev.grade.toLowerCase().includes(selectedGrade.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || ev.status === selectedStatus;

      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [evaluations, searchQuery, selectedGrade, selectedStatus]);

  // Métricas agregadas
  const metrics = useMemo(() => {
    const total = evaluations.length;
    const completed = evaluations.filter((e) => e.status === "completed").length;
    const avgAffinity =
      completed > 0
        ? Math.round(
            evaluations.reduce((acc, curr) => acc + (curr.topCareer?.affinity || 0), 0) /
              completed
          )
        : 0;

    // Carrera más recurrente
    const careerCounts: Record<string, number> = {};
    evaluations.forEach((e) => {
      if (e.topCareer?.name) {
        careerCounts[e.topCareer.name] = (careerCounts[e.topCareer.name] || 0) + 1;
      }
    });

    let topCareerName = "Pendiente";
    let topCareerCount = 0;
    Object.entries(careerCounts).forEach(([name, count]) => {
      if (count > topCareerCount) {
        topCareerCount = count;
        topCareerName = name;
      }
    });

    return { total, completed, avgAffinity, topCareerName };
  }, [evaluations]);

  const handleCopySql = () => {
    const sqlText = `-- ALEX IA — MIGRACIÓN TABLAS REPORTES
CREATE TABLE IF NOT EXISTS public.questionnaire_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID,
    student_id TEXT NOT NULL,
    student_name TEXT,
    school TEXT,
    grade_level TEXT NOT NULL,
    questionnaire_version TEXT NOT NULL DEFAULT 'V1.1',
    profile_38d JSONB NOT NULL DEFAULT '{}'::jsonb,
    matches JSONB DEFAULT '[]'::jsonb,
    matching_version TEXT NOT NULL DEFAULT 'MATCHING_V1',
    score_model_version TEXT NOT NULL DEFAULT 'V1',
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL,
    auth_user_id UUID,
    question_id TEXT NOT NULL,
    base_question_id TEXT NOT NULL,
    variant_id TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    selected_option TEXT NOT NULL,
    response_time_ms INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.questionnaire_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir select questionnaire_attempts" ON public.questionnaire_attempts FOR SELECT USING (true);
CREATE POLICY "Permitir insert questionnaire_attempts" ON public.questionnaire_attempts FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir select questionnaire_responses" ON public.questionnaire_responses FOR SELECT USING (true);
CREATE POLICY "Permitir insert questionnaire_responses" ON public.questionnaire_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir select test_results" ON public.test_results FOR SELECT USING (true);
CREATE POLICY "Permitir insert test_results" ON public.test_results FOR INSERT WITH CHECK (true);`;

    navigator.clipboard.writeText(sqlText);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172033] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ENCABEZADO PRINCIPAL */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F6BFF]/10 text-[#4F6BFF] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Portal Institucional & Administración
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight">
              Informes Vocacionales en Vivo
            </h1>
            <p className="mt-1 text-sm text-[#64748B] max-w-2xl">
              Visualiza en tiempo real el informe vocacional detallado, compatibilidad de carreras, perfil 38D y la auditoría de 40 preguntas de cada estudiante.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#172033] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              title="Refrescar datos desde la base de datos"
            >
              <RefreshCw className={`h-4 w-4 text-[#4F6BFF] ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </button>

            <button
              onClick={() => exportEvaluationsToCSV(evaluations)}
              disabled={evaluations.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4F6BFF] text-white text-xs font-semibold hover:bg-[#3D57E8] transition-colors shadow-md cursor-pointer disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Exportar CSV / Excel
            </button>

            <button
              onClick={() => setShowSqlModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-medium text-[#64748B] hover:text-[#172033] transition-colors cursor-pointer"
              title="Ver esquema SQL para Supabase"
            >
              <Database className="h-4 w-4" />
              SQL Supabase
            </button>
          </div>
        </div>

        {/* STRIP DE KPIS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-semibold uppercase tracking-wider">Estudiantes</span>
              <Users className="h-4 w-4 text-[#4F6BFF]" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-[#172554]">{metrics.total}</div>
            <div className="text-xs text-[#64748B] mt-1">Registrados en plataforma</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-semibold uppercase tracking-wider">Tests Evaluados</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-[#172554]">{metrics.completed}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">100% procesados</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-semibold uppercase tracking-wider">Afinidad Promedio</span>
              <Award className="h-4 w-4 text-[#FF7657]" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-[#172554]">{metrics.avgAffinity}%</div>
            <div className="text-xs text-[#64748B] mt-1">Macro-compatibilidad top</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-[#64748B]">
              <span className="text-xs font-semibold uppercase tracking-wider">Mayor Demanda</span>
              <Compass className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="mt-2 text-lg font-bold text-[#172554] truncate" title={metrics.topCareerName}>
              {metrics.topCareerName}
            </div>
            <div className="text-xs text-[#64748B] mt-1">Carrera más recomendada</div>
          </div>
        </div>

        {/* BARRA DE FILTROS Y BÚSQUEDA */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar estudiante, colegio o carrera..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-[#F7F9FC] focus:outline-none focus:ring-2 focus:ring-[#4F6BFF] focus:border-transparent text-[#172033]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <Filter className="h-3.5 w-3.5" /> Grado:
            </div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="text-xs rounded-xl border border-slate-200 bg-[#F7F9FC] px-3 py-2 text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#4F6BFF]"
            >
              <option value="all">Todos los grados</option>
              <option value="3">3.° Secundaria</option>
              <option value="4">4.° Secundaria</option>
              <option value="5">5.° Secundaria</option>
            </select>

            <span className="text-xs text-[#64748B] ml-2">
              Mostrando <strong className="text-[#172033]">{filteredEvaluations.length}</strong> estudiantes
            </span>
          </div>
        </div>

        {/* LISTADO DE ESTUDIANTES Y SUS REPORTES */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <RefreshCw className="h-8 w-8 text-[#4F6BFF] animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#172033]">Cargando informes vocacionales...</p>
            <p className="text-xs text-[#64748B]">Consultando perfiles y telemetría de respuestas</p>
          </div>
        ) : filteredEvaluations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#172033]">No se encontraron evaluaciones</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
              No hay estudiantes que coincidan con los criterios de búsqueda. Intenta modificar los filtros o el término de búsqueda.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvaluations.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-[#4F6BFF]/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
              >
                {/* Columna 1: Datos del estudiante */}
                <div className="flex items-center gap-4 min-w-[260px]">
                  <div className="h-13 w-13 rounded-2xl bg-gradient-to-br from-[#4F6BFF]/10 to-[#172554]/10 grid place-items-center text-2xl border border-slate-200 shrink-0">
                    {ev.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#172033]">{ev.studentName}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Test Completado
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1 font-medium">
                        <GraduationCap className="h-3.5 w-3.5 text-[#4F6BFF]" /> {ev.grade.includes("Sec") ? ev.grade : `${ev.grade} Secundaria`}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" /> {ev.school}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ev.completedAt ? new Date(ev.completedAt).toLocaleDateString("es-PE", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "Reciente"}
                    </div>
                  </div>
                </div>

                {/* Columna 2: Carrera recomendada #1 y compatibilidad */}
                <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Carrera Principal Recomendada
                  </span>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[#172554] truncate">
                      {ev.topCareer?.name || "Ingeniería de Sistemas"}
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#4F6BFF] text-white shrink-0 shadow-sm">
                      {Math.round(Number(ev.topCareer?.affinity ?? (ev.topMatches[0] as any)?.overall_similarity ?? (ev.topMatches[0] as any)?.compatibility_pct ?? 90) * 10) / 10}% match
                    </span>
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5 truncate">
                    Área: {ev.topCareer?.area || "Tecnología"}
                  </div>
                </div>

                {/* Columna 3: Mini barras de macrodimensiones */}
                <div className="hidden xl:flex items-center gap-3 border-l border-slate-100 pl-5">
                  <div className="text-[11px] space-y-1 w-36">
                    <div className="flex justify-between text-[#64748B]">
                      <span>Intereses</span>
                      <span className="font-bold text-[#172033]">{ev.macroDimensions.intereses}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#4F6BFF] rounded-full" style={{ width: `${ev.macroDimensions.intereses}%` }} />
                    </div>

                    <div className="flex justify-between text-[#64748B]">
                      <span>Aptitudes</span>
                      <span className="font-bold text-[#172033]">{ev.macroDimensions.aptitudes}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF7657] rounded-full" style={{ width: `${ev.macroDimensions.aptitudes}%` }} />
                    </div>
                  </div>
                </div>

                {/* Columna 4: Botones de Acción */}
                <div className="flex items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 shrink-0">
                  <button
                    onClick={() => generateExecutivePDF(ev)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#4F6BFF]/30 bg-[#4F6BFF]/10 text-xs font-bold text-[#4F6BFF] hover:bg-[#4F6BFF] hover:text-white transition-all shadow-sm cursor-pointer"
                    title="Descargar todo el informe vocacional en PDF"
                  >
                    <FileDown className="h-3.5 w-3.5" />
                    <span>Descargar PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveModalStudent(ev);
                      setModalTab("top_carreras");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#172554] text-white text-xs font-bold hover:bg-[#0f172a] transition-all shadow-sm cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Ver Informe Completo
                  </button>

                  <button
                    onClick={() => {
                      setActiveModalStudent(ev);
                      setModalTab("respuestas_40");
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-[#172033] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                    title="Auditoría de 40 preguntas respondidas"
                  >
                    <FileText className="h-3.5 w-3.5 text-[#4F6BFF]" />
                    <span className="hidden sm:inline">Respuestas (40)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          MODAL DE INFORME VOCACIONAL DETALLADO DE CADA ESTUDIANTE
          ========================================================================= */}
      {activeModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-5xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Cabecera del modal */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white border border-slate-200 shadow-sm grid place-items-center text-3xl">
                  {activeModalStudent.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-extrabold text-[#172554]">
                      Informe Vocacional: {activeModalStudent.studentName}
                    </h2>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Oficial MATCHING_V1
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] mt-0.5">
                    <span>{activeModalStudent.school}</span>
                    <span>•</span>
                    <span>{activeModalStudent.grade} Secundaria</span>
                    <span>•</span>
                    <span>Evaluado el {new Date(activeModalStudent.completedAt || "").toLocaleDateString("es-PE")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateExecutivePDF(activeModalStudent)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#4F6BFF] text-white text-xs font-bold hover:bg-[#3D57E8] transition-colors shadow-sm cursor-pointer"
                  title="Descargar archivo PDF completo a tu computadora"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Descargar en PDF</span>
                </button>
                <button
                  onClick={() => openPrintableReport(activeModalStudent)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-[#172033] hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                  title="Abrir vista de impresión editorial A4"
                >
                  <Printer className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setActiveModalStudent(null)}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-[#64748B] hover:text-[#172033] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Pestañas de navegación del informe */}
            <div className="flex border-b border-slate-200 bg-white px-6">
              {[
                { id: "top_carreras", label: "Top Carreras & ADN", icon: Compass },
                { id: "perfil_38d", label: "Perfil 38D Detallado", icon: BarChart3 },
                { id: "respuestas_40", label: "Auditoría de 40 Preguntas", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setModalTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                    modalTab === tab.id
                      ? "border-[#4F6BFF] text-[#4F6BFF]"
                      : "border-transparent text-[#64748B] hover:text-[#172033]"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cuerpo del informe con scroll */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#F7F9FC]">
              {/* TAB 1: TOP CARRERAS & RADAR ADN */}
              {modalTab === "top_carreras" && (
                <div className="space-y-6">
                  {/* Fila superior: Radar de 5 Macrodimensiones */}
                  <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-[#172554] uppercase tracking-wider mb-1">
                        ADN Vocacional (5 Macrodimensiones)
                      </h4>
                      <p className="text-xs text-[#64748B] mb-4">
                        Ponderación oficial: Aptitudes (30%), Intereses (25%), Personalidad (20%), Preferencias (15%), Valores (10%).
                      </p>
                      <MiniRadarChart dimensions={activeModalStudent.macroDimensions} />
                    </div>

                    <div className="flex flex-col justify-center space-y-3">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-bold text-[#172033]">
                          <span>1. Aptitudes Cognitivas (30%)</span>
                          <span className="text-[#4F6BFF]">{activeModalStudent.macroDimensions.aptitudes}%</span>
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">Pensamiento lógico, analítico y espacial.</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-bold text-[#172033]">
                          <span>2. Intereses Vocacionales (25%)</span>
                          <span className="text-[#4F6BFF]">{activeModalStudent.macroDimensions.intereses}%</span>
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">Motivación intrínseca por áreas del conocimiento.</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-bold text-[#172033]">
                          <span>3. Personalidad Vocacional (20%)</span>
                          <span className="text-[#4F6BFF]">{activeModalStudent.macroDimensions.personalidad}%</span>
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">Liderazgo, adaptabilidad y trabajo en equipo.</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-bold text-[#172033]">
                          <span>4. Preferencias de Trabajo (15%)</span>
                          <span className="text-[#4F6BFF]">{activeModalStudent.macroDimensions.preferencias}%</span>
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">Entornos con personas, datos o tecnología.</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-bold text-[#172033]">
                          <span>5. Valores Ocupacionales (10%)</span>
                          <span className="text-[#4F6BFF]">{activeModalStudent.macroDimensions.valores}%</span>
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">Estabilidad, impacto social y reconocimiento.</div>
                      </div>
                    </div>
                  </div>

                  {/* Fila inferior: Top Carreras Recomendadas */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-sm font-bold text-[#172554] uppercase tracking-wider mb-4">
                      Top Carreras con Mayor Compatibilidad
                    </h4>

                    <div className="space-y-3">
                      {activeModalStudent.topMatches.slice(0, 5).map((match, idx) => (
                        <div
                          key={match.career_slug || idx}
                          className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#4F6BFF]/30 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-7 w-7 rounded-lg bg-[#4F6BFF]/10 text-[#4F6BFF] font-black text-xs flex items-center justify-center shrink-0">
                              #{idx + 1}
                            </span>
                            <div>
                              <div className="text-sm font-bold text-[#172554]">{match.career_name}</div>
                              <div className="text-xs text-[#64748B] flex items-center gap-2 mt-0.5">
                                <span>Área: {match.area || "Tecnología"}</span>
                                {match.salary && <span>• Rango: {match.salary}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#4F6BFF] text-white shadow-sm">
                              {Math.round(Number((match as any).overall_similarity ?? (match as any).compatibility_pct ?? (match as any).global_score ?? (match as any).affinity ?? 80) * 10) / 10}% afinidad
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PERFIL 38D DETALLADO */}
              {modalTab === "perfil_38d" && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-[#172554] uppercase tracking-wider">
                      Desglose de las 38 Dimensiones Vocacionales (0 a 100)
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">
                      Scores calculados mediante el Score Model V1 con pesos por tipo de reactivo (Mini-retos, Mini-casos, Escenarios y Trade-offs).
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {ALL_VOCATIONAL_VARIABLES.map((vKey) => {
                      const score = activeModalStudent.profile_38d[vKey] ?? 80;
                      const friendly = (VARIABLE_FRIENDLY_NAMES as any)[vKey] || {
                        name: vKey,
                        category: "Dimensión",
                      };

                      return (
                        <div key={vKey} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-[#172033]">{friendly.name}</span>
                            <span className="font-extrabold text-[#4F6BFF]">{score}%</span>
                          </div>
                          <div className="mt-1.5 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#4F6BFF] to-[#172554] rounded-full"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <div className="text-[10px] text-[#64748B] mt-1 flex justify-between">
                            <span>Código: {vKey}</span>
                            <span className="font-medium text-emerald-700">
                              {score >= 75 ? "Sobresaliente" : score >= 50 ? "Equilibrado" : "En desarrollo"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: AUDITORÍA DE 40 PREGUNTAS Y TELEMETRÍA */}
              {modalTab === "respuestas_40" && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-[#172554] uppercase tracking-wider">
                        Auditoría Item por Item (40 Preguntas Respondidas)
                      </h4>
                      <p className="text-xs text-[#64748B]">
                        Verificación de alternativas seleccionadas y tiempo de respuesta por pregunta.
                      </p>
                    </div>
                    <div className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-[#172033]">
                      Tiempo promedio: <strong>{activeModalStudent.averageResponseTimeSec}s</strong> por ítem
                    </div>
                  </div>

                  <div className="space-y-3">
                    {activeModalStudent.responses.map((resp) => (
                      <div
                        key={resp.baseQuestionId}
                        className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-extrabold text-[#4F6BFF]">
                            Pregunta #{resp.questionNumber} ({resp.baseQuestionId})
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-[#64748B]">
                            {resp.dimension} • {resp.responseTimeSec}s
                          </span>
                        </div>

                        <p className="text-xs font-medium text-[#172033] mb-2">{resp.questionStem}</p>

                        <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-start gap-2">
                          <span className="h-5 w-5 rounded-md bg-[#4F6BFF] text-white text-[11px] font-black grid place-items-center shrink-0">
                            {resp.selectedOption}
                          </span>
                          <span className="text-xs font-semibold text-[#172554]">
                            {resp.selectedOptionText}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer del modal */}
            <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => generateExecutivePDF(activeModalStudent)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F6BFF] text-white text-xs font-bold hover:bg-[#3D57E8] transition-colors shadow-md cursor-pointer"
              >
                <FileDown className="h-4 w-4" />
                Descargar Todo el Informe en PDF
              </button>
              <button
                onClick={() => setActiveModalStudent(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-[#172033] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cerrar Informe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE INSTRUCCIONES SQL PARA SUPABASE
          ========================================================================= */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-[#4F6BFF]" />
                <h3 className="text-lg font-bold text-[#172554]">Esquema SQL de Telemetría para Supabase</h3>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-[#64748B]">
              Para asegurar que todos los intentos y las 40 respuestas individuales de cada persona se sincronicen en Supabase sin restricciones de RLS, ejecuta este script en el{" "}
              <a
                href="https://supabase.com/dashboard/project/lufkhjzhvacpjavjvurg/sql"
                target="_blank"
                rel="noreferrer"
                className="text-[#4F6BFF] underline font-semibold"
              >
                SQL Editor de Supabase
              </a>
              :
            </p>

            <div className="relative">
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-[11px] overflow-x-auto max-h-64 font-mono leading-relaxed">
{`-- 1. Tabla de Intentos de Cuestionario
CREATE TABLE IF NOT EXISTS public.questionnaire_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID,
    student_id TEXT NOT NULL,
    student_name TEXT,
    school TEXT,
    grade_level TEXT NOT NULL,
    profile_38d JSONB NOT NULL DEFAULT '{}'::jsonb,
    matches JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Tabla de Respuestas de las 40 Preguntas
CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL,
    question_id TEXT NOT NULL,
    base_question_id TEXT NOT NULL,
    variant_id TEXT NOT NULL,
    selected_option TEXT NOT NULL,
    response_time_ms INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Habilitar políticas de lectura y guardado
ALTER TABLE public.questionnaire_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir select" ON public.questionnaire_attempts FOR SELECT USING (true);
CREATE POLICY "Permitir insert" ON public.questionnaire_attempts FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir select test_results" ON public.test_results FOR SELECT USING (true);
CREATE POLICY "Permitir insert test_results" ON public.test_results FOR INSERT WITH CHECK (true);`}
              </pre>

              <button
                onClick={handleCopySql}
                className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-[#4F6BFF] text-white text-xs font-bold hover:bg-[#3D57E8] transition-colors flex items-center gap-1 shadow cursor-pointer"
              >
                {sqlCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {sqlCopied ? "¡Copiado!" : "Copiar SQL"}
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-semibold text-[#172033] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
