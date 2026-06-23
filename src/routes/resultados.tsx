import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles, BrainCircuit, Target, AlertTriangle, BookOpen, GraduationCap } from "lucide-react";
import { careers, mockAdnProfile } from "../lib/mock-data";

export const Route = createFileRoute("/resultados")({
  head: () => ({ meta: [{ title: "Tus Resultados Narrativos — Alex IA" }] }),
  component: ResultsPage,
});

function Radar({ data }: { data: { name: string; value: number }[] }) {
  const size = 260;
  const center = size / 2;
  const radius = 100;
  const angle = (i: number) => (Math.PI * 2 * i) / data.length - Math.PI / 2;
  const point = (v: number, i: number) => {
    const r = (v / 100) * radius;
    return [center + r * Math.cos(angle(i)), center + r * Math.sin(angle(i))];
  };
  const pts = data.map((d, i) => point(d.value, i).join(",")).join(" ");
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={data.map((_, i) => point(100 * s, i).join(",")).join(" ")}
          fill="none"
          stroke="oklch(0.92 0.01 270)"
        />
      ))}
      <polygon points={pts} fill="oklch(0.59 0.21 285 / 0.25)" stroke="oklch(0.59 0.21 285)" strokeWidth={2} />
      {data.map((d, i) => {
        const [x, y] = point(115, i);
        return (
          <text key={d.name} x={x} y={y} textAnchor="middle" className="fill-foreground text-[10px] font-medium">
            {d.name}
          </text>
        );
      })}
    </svg>
  );
}

function ResultsPage() {
  const topCareers = careers.slice(0, 5); // Tomamos el top 5
  const top1 = topCareers[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          <Sparkles className="h-4 w-4" /> Tu Perfil Vocacional
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
          Tu ADN Profesional es:<br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {mockAdnProfile.arquetipo}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {mockAdnProfile.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 mb-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20 text-accent-foreground">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold">Tus Superpoderes</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Basado en tus respuestas, estas son tus fortalezas naturales.
          </p>
          <div className="grid place-items-center">
            <Radar data={mockAdnProfile.superpoderes} />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/20 text-secondary">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-bold">Tu Entorno Ideal</h3>
          </div>
          <ul className="space-y-4 mt-6">
            {mockAdnProfile.entornoIdeal.map((entorno) => (
              <li key={entorno} className="flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-secondary/20 text-secondary shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                <span className="font-medium text-foreground">{entorno}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Tu Top 5 de Carreras</h2>
        <div className="space-y-6">
          {topCareers.map((c, i) => (
            <div key={c.slug} className={`rounded-3xl border ${i === 0 ? 'border-primary shadow-md' : 'border-border shadow-sm'} bg-card overflow-hidden`}>
              <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      Top {i + 1}
                    </span>
                    <h3 className="text-2xl font-bold">{c.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{c.description}</p>
                </div>
                <div className="text-left md:text-right w-full md:w-auto">
                  <div className="text-3xl font-extrabold text-primary mb-1">{c.affinity}%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Afinidad</div>
                </div>
              </div>
              
              {/* Si es el top 1, mostramos las especialidades */}
              {i === 0 && c.branches && (
                <div className="bg-muted/30 border-t border-border p-6 sm:p-8">
                  <h4 className="font-semibold text-foreground mb-4">Especialidades que encajan contigo:</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {c.branches.map(b => (
                      <div key={b.name} className="rounded-2xl bg-background border border-border p-4">
                        <h5 className="font-bold text-primary mb-2">{b.name}</h5>
                        <p className="text-xs text-muted-foreground mb-3">{b.description}</p>
                        <div className="text-xs space-y-1">
                          <p><strong>Salario:</strong> {b.salary}</p>
                          <p><strong>Tiempo:</strong> {b.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mb-16">
        <div className="rounded-3xl border border-accent bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎁</span>
            <h3 className="text-xl font-bold">Carrera Sorpresa</h3>
          </div>
          <h4 className="font-bold text-accent mb-2">{mockAdnProfile.carreraSorpresa.name} ({mockAdnProfile.carreraSorpresa.affinity}%)</h4>
          <p className="text-sm text-muted-foreground">{mockAdnProfile.carreraSorpresa.reason}</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h3 className="text-xl font-bold">Tu Mayor Desafío</h3>
          </div>
          <h4 className="font-semibold text-foreground mb-2">{mockAdnProfile.mayorDesafio.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{mockAdnProfile.mayorDesafio.description}</p>
          <div className="rounded-xl bg-primary/10 p-3 text-xs font-medium text-primary">
            💡 {mockAdnProfile.mayorDesafio.advice}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold">Plan de Acción</h3>
          </div>
          <ul className="space-y-3">
            {mockAdnProfile.planAccion.map((plan, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="font-bold text-primary">{i+1}.</span>
                <span>{plan}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA AL EXAMEN DE ADMISION */}
      <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 sm:p-12 text-center text-primary-foreground shadow-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/20 mb-6 backdrop-blur-md">
          <GraduationCap className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-extrabold mb-4">¿Quieres medir tu nivel actual?</h2>
        <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-lg">
          Te hemos recomendado <strong>{top1.name}</strong>. Intenta un examen de práctica corto (15 preguntas) basado en el estilo de las mejores universidades para esta carrera.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/examen"
            className="rounded-full bg-background px-8 py-4 font-bold text-primary shadow-lg transition-transform hover:scale-105"
          >
            Sí, quiero intentarlo
          </Link>
          <Link
            to="/"
            className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            Tal vez después
          </Link>
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground text-center">
        Alex IA es una herramienta de orientación y autoconocimiento. No constituye un diagnóstico psicológico ni reemplaza la evaluación de un psicólogo u orientador vocacional certificado. Los resultados son estimaciones referenciales basadas en tus respuestas, no mediciones exactas de habilidad o éxito futuro.
      </div>
    </div>
  );
}