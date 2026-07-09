import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { ArrowRight, ArrowLeft, Heart, ShieldCheck, Loader2, MailCheck } from "lucide-react";
import { supabase } from "../integrations/supabase/client";

export const Route = createFileRoute("/registro/padre")({
  head: () => ({ meta: [{ title: "Registro Padres — Alex IA" }] }),
  component: RegistroPadre,
});

function RegistroPadre() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [studentCode, setStudentCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState("");

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleRegister = async (goalSelected: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "parent",
            name,
            studentCode,
            goal: goalSelected
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          throw new Error("Este correo ya está registrado. Por favor, dirígete al Login para iniciar sesión.");
        }
        throw signUpError;
      }
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al registrar la cuenta.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate({ to: "/login" });
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-secondary/10 text-secondary mb-8">
          <MailCheck className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-extrabold mb-4">¡Ya casi estamos! 📩</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Hemos enviado un correo a <span className="font-semibold text-foreground">{email}</span>. 
          Haz clic en el enlace que encontrarás allí para verificar tu cuenta y poder ingresar al Portal para Padres.
        </p>
        <button
          onClick={() => navigate({ to: "/login" })}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-bold text-secondary-foreground shadow-md transition-transform hover:scale-105"
        >
          Volver al Login <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <div className="text-center mb-8">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary/10 text-secondary mb-4">
          <Heart className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Portal para Padres</h1>
        <p className="mt-2 text-muted-foreground">Acompaña a tu hijo/a en su decisión más importante.</p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm transition-all duration-300">
        
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <h2 className="text-xl font-bold text-center">Vincular cuenta</h2>
            <p className="text-sm text-muted-foreground text-center">Ingresa el código que aparece en la cuenta de tu hijo/a, o búscalo por su correo.</p>
            
            <div>
              <label className="mb-2 block text-sm font-medium">Código de estudiante o correo</label>
              <input required value={studentCode} onChange={e => setStudentCode(e.target.value)} placeholder="Ej. ALEX-1234 o juan@colegio.edu.pe" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2" />
            </div>

            <button type="submit" className="w-full flex justify-center items-center gap-2 rounded-xl bg-secondary px-4 py-3 font-bold text-secondary-foreground shadow-md transition-transform hover:scale-[1.02]">
              Verificar estudiante <ArrowRight className="h-4 w-4" />
            </button>
            <div className="text-center">
              <span className="text-xs text-muted-foreground">¿Tu hijo aún no tiene cuenta? <Link to="/registro/estudiante" className="text-secondary font-medium hover:underline">Regístralo aquí</Link></span>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-5">
            <h2 className="text-xl font-bold text-center mb-6">Tus datos personales</h2>
            
            <div>
              <label className="mb-2 block text-sm font-medium">Nombre completo</label>
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Correo electrónico</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Crea una contraseña</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" minLength={6} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2" />
            </div>

            <button type="submit" className="mt-6 w-full flex justify-center items-center gap-2 rounded-xl bg-secondary px-4 py-3 font-bold text-secondary-foreground shadow-md transition-transform hover:scale-[1.02]">
              Siguiente <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Para terminar...</h2>
            <p className="text-sm text-muted-foreground mb-8">¿Qué te gustaría lograr acompañando a tu hijo/a en este proceso?</p>
            
            <div className="flex flex-col gap-3">
              {[
                "Que descubra su pasión de forma natural",
                "Que tome una decisión informada y segura",
                "Que no se sienta presionado/a al elegir",
                "Entender mejor cuáles son sus habilidades"
              ].map(opt => (
                <button
                  key={opt}
                  disabled={isLoading}
                  onClick={() => { setGoal(opt); handleRegister(opt); }}
                  className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 text-left font-medium text-foreground transition-all hover:border-secondary hover:shadow-md hover:bg-secondary/5 disabled:opacity-70 disabled:hover:shadow-none"
                >
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary/10 text-secondary">
                    {isLoading && goal === opt ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">{opt}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground opacity-70">
              Esto nos ayudará a adaptar los consejos que te mostraremos en el portal.
            </p>
            {error && (
              <div className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive animate-in fade-in">
                {error}
              </div>
            )}
          </div>
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
