import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, GraduationCap, Sparkles, Target, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/bienvenida")({
  head: () => ({ meta: [{ title: "Bienvenido — Alex IA" }] }),
  component: BienvenidaPage,
});

function BienvenidaPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          👋 Hola Alex.<br/>
          <span className="text-muted-foreground font-semibold text-3xl sm:text-4xl">Qué bueno tenerte aquí.</span>
        </h1>
        <p className="mt-6 text-xl text-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          Hoy no tienes que decidir tu futuro.<br/>
          <span className="text-primary font-bold">Solo descubrir un poco más sobre ti.</span>
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 text-center">
          En Alex IA puedes:
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">TEST VOCACIONAL</h3>
            </div>
            <p className="text-muted-foreground mb-6 flex-1">
              Descubre tus intereses, habilidades y personalidad.
            </p>
            <Link to="/test" className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-transform group-hover:scale-[1.02]">
              Comenzar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">CARRERAS</h3>
            </div>
            <p className="text-muted-foreground mb-6 flex-1">
              Explora carreras, especialidades y universidades.
            </p>
            <Link to="/carreras" className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground transition-transform group-hover:scale-[1.02]">
              Explorar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-purple-500 hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/10 text-purple-500">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">COACH IA</h3>
            </div>
            <p className="text-muted-foreground mb-6 flex-1">
              Pregunta cualquier duda sobre tu futuro profesional.
            </p>
            <Link to="/coach" className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-purple-500 px-4 py-3 text-sm font-bold text-white transition-transform group-hover:scale-[1.02]">
              Hablar con Alex <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">SIMULADOR</h3>
            </div>
            <p className="text-muted-foreground mb-6 flex-1">
              Pon a prueba tu nivel y descubre cómo mejorar.
            </p>
            <Link to="/examen" className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-accent-foreground transition-transform group-hover:scale-[1.02]">
              Practicar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </div>

      <div className="mt-16 text-center animate-in fade-in duration-1000 delay-300">
        <p className="text-lg font-medium text-muted-foreground mb-8 italic">
          "Las grandes decisiones comienzan con el autoconocimiento."
        </p>
        <Link to="/test" className="inline-flex justify-center items-center gap-2 rounded-full bg-foreground px-8 py-4 font-extrabold text-background shadow-xl transition-transform hover:scale-110">
          🚀 Empezar mi camino
        </Link>
      </div>
    </div>
  );
}
