import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { KeyRound, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/actualizar-clave")({
  head: () => ({ meta: [{ title: "Actualizar Contraseña — Alex IA" }] }),
  component: ActualizarClavePage,
});

function ActualizarClavePage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al actualizar la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-xl text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500/10 text-green-500 mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold mb-3">¡Contraseña actualizada!</h1>
          <p className="text-muted-foreground mb-8">
            Tu contraseña se ha cambiado con éxito. Ya puedes ingresar a tu cuenta de Alex IA.
          </p>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="w-full flex justify-center items-center gap-2 rounded-xl bg-foreground px-4 py-3 font-bold text-background shadow-md transition-transform hover:scale-[1.02]"
          >
            Ir al Login <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center mb-8">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary mb-4">
            <KeyRound className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Crea una nueva contraseña</h1>
          <p className="mt-2 text-sm text-muted-foreground">Por seguridad, asegúrate de que tenga al menos 6 caracteres.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Nueva Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive animate-in fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Guardar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}
