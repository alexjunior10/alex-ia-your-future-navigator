import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2, UserCircle2 } from "lucide-react";

export const Route = createFileRoute("/registro/estudiante")({
  head: () => ({ meta: [{ title: "Registro Estudiante — Alex IA" }] }),
  component: RegistroEstudiante,
});

function RegistroEstudiante() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  // Form state
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [icebreaker, setIcebreaker] = useState("");
  const [password, setPassword] = useState("");

  const handleNext = () => {
    if (step < 4) {
      setTransitioning(true);
      setTimeout(() => {
        setTransitioning(false);
        setStep(step + 1);
      }, 600);
    } else {
      // Finish
      login("student");
      navigate({ to: "/test" });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate({ to: "/login" });
    }
  };

  const avatars = ["🦊", "🐼", "🦁", "🐙", "🦖", "🦄", "🐶", "🐱", "🐰"];

  const stepTitles = ["Tu Avatar", "Tus Datos", "Rompehielo", "Seguridad"];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Barra de progreso */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                s < step ? "bg-primary" : s === step ? "bg-gradient-to-r from-primary to-secondary" : ""
              }`}
              style={{ width: s <= step ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
          Paso {step}: {stepTitles[step - 1]}
        </span>
      </div>

      <div className={`rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm transition-opacity duration-500 ${transitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Elige tu avatar</h2>
            <p className="text-muted-foreground mb-8">Selecciona el personaje que mejor te represente.</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {avatars.map(a => (
                <button
                  key={a}
                  onClick={() => { setAvatar(a); handleNext(); }}
                  className={`text-5xl p-6 rounded-3xl border-2 transition-all hover:scale-105 ${avatar === a ? 'border-primary bg-primary/10' : 'border-border bg-background'}`}
                >
                  {a}
                </button>
              ))}
            </div>
            {!avatar && <p className="text-sm text-muted-foreground/60">Selecciona uno para continuar</p>}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-5">
            <h2 className="text-2xl font-bold text-center mb-6">Cuéntanos sobre ti</h2>
            
            <div>
              <label className="mb-2 block text-sm font-medium">¿Cómo te gusta que te llamen?</label>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre o apodo" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Correo electrónico</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Colegio</label>
                <select required value={school} onChange={e => setSchool(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2">
                  <option value="" disabled>Selecciona...</option>
                  <option value="Col 1">Saco Oliveros</option>
                  <option value="Col 2">Innova Schools</option>
                  <option value="Col 3">Trilce</option>
                  <option value="Col 4">Otro</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Grado</label>
                <select required value={grade} onChange={e => setGrade(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2">
                  <option value="" disabled>Selecciona...</option>
                  <option value="3ro">3ro Secundaria</option>
                  <option value="4to">4to Secundaria</option>
                  <option value="5to">5to Secundaria</option>
                  <option value="egresado">Egresado</option>
                </select>
              </div>
            </div>

            <button type="submit" className="mt-8 w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]">
              Siguiente <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary/20 text-secondary mx-auto mb-6">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Una pregunta rápida...</h2>
            <p className="text-muted-foreground mb-8">Si fueras un superhéroe, ¿cuál sería tu superpoder?</p>
            
            <div className="flex flex-col gap-3">
              {[
                { emoji: "⚡", text: "Súper velocidad" },
                { emoji: "🧠", text: "Leer la mente" },
                { emoji: "🕰️", text: "Viajar en el tiempo" },
                { emoji: "🛡️", text: "Fuerza imparable" }
              ].map(opt => (
                <button
                  key={opt.text}
                  onClick={() => { setIcebreaker(opt.text); handleNext(); }}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 text-left font-medium text-foreground transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-md"
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground opacity-60">
              * Tranquilo/a, esto no afecta tus resultados. ¡Es solo para romper el hielo!
            </p>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-5 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent mx-auto mb-6">
              <UserCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Casi listo, {name || "crack"}!</h2>
            <p className="text-muted-foreground mb-8 text-sm">Crea una contraseña segura para guardar tu progreso y resultados.</p>

            <div className="text-left">
              <label className="mb-2 block text-sm font-medium">Contraseña</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" minLength={6} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2" />
            </div>

            <button type="submit" className="mt-8 w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-4 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]">
              Comenzar mi viaje vocacional <CheckCircle2 className="h-5 w-5" />
            </button>
          </form>
        )}

      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handlePrev}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {step === 1 ? "Volver al Login" : "Anterior"}
        </button>
      </div>
    </div>
  );
}
