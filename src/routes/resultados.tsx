import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { careers, skills } from "../lib/mock-data";

export const Route = createFileRoute("/resultados")({
  head: () => ({ meta: [{ title: "Tus resultados — Alex IA" }, { name: "description", content: "Tu perfil vocacional con carreras recomendadas y radar de habilidades." }] }),
  component: Results,
});

function Radar({ data }: { data: typeof skills }) {
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

function Results() {
  const top = careers.slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Resultado del test
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Este es tu perfil vocacional</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Compatibilidad general estimada: <span className="font-semibold text-foreground">87%</span> · valor referencial basado en tus respuestas.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {top.map((c, i) => (
          <Link key={c.slug} to="/carreras/$slug" params={{ slug: c.slug }} className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">Top {i + 1}</span>
              <span className="text-2xl font-extrabold text-primary">{c.affinity}%</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">{c.name}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c.description}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Explorar carrera <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Radar de habilidades</h3>
          <p className="text-sm text-muted-foreground">Una vista referencial de tus dimensiones más fuertes.</p>
          <div className="mt-4 grid place-items-center">
            <Radar data={skills} />
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Tus fortalezas</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {["Creatividad para proponer ideas nuevas", "Comunicación clara y empática", "Pensamiento analítico", "Adaptabilidad ante cambios"].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Oportunidades de crecimiento</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Sigue desarrollando tu disciplina con metas semanales pequeñas.</li>
              <li>• Practica hablar en público en contextos seguros.</li>
              <li>• Explora cursos cortos de tecnología para ampliar opciones.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
        Estos resultados son referenciales. Alex IA no constituye un diagnóstico psicológico ni reemplaza la evaluación de un psicólogo u orientador vocacional certificado.
      </div>
    </div>
  );
}