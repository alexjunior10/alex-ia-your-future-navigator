import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { ArrowLeft, Mail, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/recuperar-clave")({
  head: () => ({ meta: [{ title: "Recuperar Contraseña — Alex IA" }] }),
  component: RecuperarClavePage,
});

function RecuperarClavePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/actualizar-clave`,
      });

      if (resetError) throw resetError;

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al solicitar la recuperación.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-xl text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Revisa tu correo</h1>
          <p className="text-muted-foreground mb-8">
            Si <span className="font-semibold text-foreground">{email}</span> está registrado, te hemos enviado un enlace para restablecer tu contraseña.
          </p>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
          >
            Volver al Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-bold mb-8 hover:opacity-80 transition-opacity">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Alex IA</span>
          </Link>
          
          <h1 className="text-2xl font-bold tracking-tight">Recuperar contraseña</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ingresa tu correo y te enviaremos un enlace mágico para crear una nueva clave.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Correo electrónico</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive animate-in fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full flex justify-center items-center gap-2 rounded-xl bg-foreground px-4 py-3 font-bold text-background shadow-md transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Enviar enlace de recuperación"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
