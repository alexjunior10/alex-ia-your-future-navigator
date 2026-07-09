import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Users, BookOpen, BarChart3, CheckCircle2, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

export const Route = createFileRoute("/colegios")({
  head: () => ({ meta: [{ title: "Para Colegios — Alex IA" }, { name: "description", content: "Orientación vocacional escalable para todos tus estudiantes." }] }),
  component: ColegiosPage,
});

function ColegiosPage() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role && role !== "school") {
      navigate({ to: "/bienvenida", replace: true });
    }
  }, [role, navigate]);

  const grades = [
    { grade: "3ro Secundaria", students: 124, progress: 78 },
    { grade: "4to Secundaria", students: 118, progress: 62 },
    { grade: "5to Secundaria", students: 109, progress: 91 },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 text-primary-foreground shadow-xl flex-1 w-full">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Orientación vocacional escalable</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/90">
            Acompaña a cada estudiante con datos, reportes y herramientas modernas. Ideal para colegios que quieren elevar su propuesta de tutoría.
          </p>
        </div>
        <button onClick={logout} className="shrink-0 flex items-center gap-2 rounded-xl border-2 border-border bg-background px-5 py-3 font-semibold text-foreground hover:border-destructive hover:text-destructive transition-colors">
          <LogOut className="h-5 w-5" /> Cerrar Sesión
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Users, label: "Estudiantes activos", value: "351" },
          { icon: BookOpen, label: "Tests completados", value: "264" },
          { icon: BarChart3, label: "Promedio afinidad", value: "84%" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <s.icon className="h-5 w-5 text-primary" />
            <div className="mt-3 text-2xl font-extrabold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Progreso por grado (ejemplo)</h3>
        <div className="mt-4 space-y-4">
          {grades.map((g) => (
            <div key={g.grade}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{g.grade}</span>
                <span className="text-muted-foreground">{g.progress}% · {g.students} estudiantes</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${g.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Lo que ofrecemos</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {["Test vocacional con IA para cada estudiante", "Reportes agregados por aula y grado", "Capacitación a tutores y orientadores", "Dashboard institucional en tiempo real"].map((f) => (
              <li key={f} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {f}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-accent/30 to-secondary/20 p-6">
          <h3 className="text-lg font-semibold">¿Quieres una demo?</h3>
          <p className="mt-2 text-sm text-muted-foreground">Conversemos sobre cómo Alex IA puede integrarse en tu programa de tutoría.</p>
          <a href="mailto:hola@alexia.pe" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:scale-105 transition-transform">Solicitar demo</a>
        </div>
      </div>
    </div>
  );
}