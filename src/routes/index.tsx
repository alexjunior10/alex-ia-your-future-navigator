import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Brain, Compass, GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import heroImg from "../assets/hero.jpg";
import { careers } from "../lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex IA — Descubre la carrera ideal para ti" },
      { name: "description", content: "Plataforma de orientación vocacional con IA para estudiantes de secundaria en Perú." },
      { property: "og:title", content: "Alex IA — Orientación vocacional con IA" },
      { property: "og:description", content: "Descubre carreras compatibles con tu personalidad, intereses y habilidades." },
    ],
  }),
  component: Index,
});

function Index() {
  const steps = [
    { icon: Brain, title: "Responde el test", text: "40 preguntas sobre tus intereses, personalidad y habilidades." },
    { icon: Sparkles, title: "Alex IA analiza", text: "Nuestro motor cruza tus respuestas con cientos de perfiles." },
    { icon: Compass, title: "Recibe carreras", text: "Top 3 carreras compatibles con porcentaje referencial." },
    { icon: GraduationCap, title: "Explora universidades", text: "Mallas, salarios, demanda y oportunidades reales." },
  ];
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> El Spotify de la orientación vocacional
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Descubre la <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">carrera ideal</span> para ti con IA
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Alex IA analiza tu personalidad, intereses y habilidades para ayudarte a tomar una de las decisiones más importantes de tu vida.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/test" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105">
                Realizar Test <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/carreras" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted">
                Explorar Carreras
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">+ de 12,000 estudiantes peruanos ya descubrieron su camino.</p>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-accent/30 blur-2xl" />
            <img src={heroImg} alt="Estudiante explorando carreras con Alex IA" width={1280} height={960} className="rounded-3xl shadow-2xl shadow-primary/10" />
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Cómo funciona?</h2>
          <p className="mt-3 text-muted-foreground">Cuatro pasos para descubrir tu vocación.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title} className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-xs font-semibold text-primary">Paso {i + 1}</div>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Carreras destacadas */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Carreras populares</h2>
          <Link to="/carreras" className="text-sm font-medium text-primary hover:underline">Ver todas →</Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {careers.slice(0, 3).map((c) => (
            <Link key={c.slug} to="/carreras/$slug" params={{ slug: c.slug }} className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{c.area}</span>
                <span className="text-sm font-bold text-primary">{c.affinity}%</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{c.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                Ver carrera <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 text-center text-primary-foreground shadow-xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Tu futuro empieza con una mejor pregunta.</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">No es solo un test. Es tu compañero para descubrir quién quieres ser.</p>
          <Link to="/test" className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-lg hover:scale-105 transition-transform">
            Comenzar mi test gratis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
