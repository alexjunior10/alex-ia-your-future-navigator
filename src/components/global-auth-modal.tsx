import { useNavigate } from "@tanstack/react-router";
import { Sparkles, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "../hooks/use-auth";

export function GlobalAuthModal() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl animate-in zoom-in-95 duration-300 mx-4">
        <button
          onClick={() => setShowAuthModal(false)}
          className="absolute right-6 top-6 rounded-full bg-muted/50 p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-center mb-6 mt-2">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">🚀 Descubre tu futuro</h2>
          <p className="mt-2 text-sm text-muted-foreground">Para acceder a esta sección crea tu cuenta gratuita.</p>
        </div>

        <div className="space-y-3 mb-8 bg-muted/50 p-5 rounded-2xl">
          {[
            "Test vocacional completo.",
            "Carreras y especialidades.",
            "Coach IA personalizado.",
            "Simulador de admisión."
          ].map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-primary" /> {benefit}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => { setShowAuthModal(false); navigate({ to: "/login" }); }}
            className="w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            Crear cuenta
          </button>
          <button
            onClick={() => { setShowAuthModal(false); navigate({ to: "/login" }); }}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Ya tengo cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
