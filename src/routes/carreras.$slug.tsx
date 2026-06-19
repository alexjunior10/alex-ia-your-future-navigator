import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, Clock, TrendingUp, GraduationCap, DollarSign } from "lucide-react";
import { careers, type Career } from "../lib/mock-data";

export const Route = createFileRoute("/carreras/$slug")({
  component: CareerDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Carrera no encontrada</h1>
      <Link to="/carreras" className="mt-4 inline-block text-primary hover:underline">← Volver a carreras</Link>
    </div>
  ),
  loader: ({ params }): Career => {
    const c = careers.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.name} — Alex IA` }, { name: "description", content: loaderData.description }]
      : [{ title: "Carrera — Alex IA" }],
  }),
});

function CareerDetail() {
  const c = Route.useLoaderData() as Career;
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Link to="/carreras" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-primary-foreground shadow-xl">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">{c.area}</span>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{c.name}</h1>
        <p className="mt-3 max-w-2xl text-primary-foreground/90">{c.description}</p>
        <div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
          {c.affinity}% de afinidad estimada
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {[
          { icon: DollarSign, label: "Salario", value: c.salary },
          { icon: Briefcase, label: "Empleabilidad", value: c.employability },
          { icon: Clock, label: "Duración", value: c.duration },
          { icon: TrendingUp, label: "Tendencia", value: c.trend },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <s.icon className="h-5 w-5 text-primary" />
            <div className="mt-2 text-xs text-muted-foreground">{s.label}</div>
            <div className="text-sm font-semibold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Áreas de trabajo</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.fields.map((f) => (
              <span key={f} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{f}</span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Malla curricular</h3>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {c.curriculum.map((m) => <li key={m}>• {m}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Universidades en Perú</h3>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {c.universities.map((u) => (
              <span key={u} className="rounded-2xl border border-border bg-background px-3 py-2 text-sm">{u}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">Datos ilustrativos para fines del prototipo.</p>
    </div>
  );
}