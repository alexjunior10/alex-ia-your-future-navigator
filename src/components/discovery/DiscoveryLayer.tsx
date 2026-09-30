import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";
import { 
  DISCOVERY_QUESTIONS_V1, 
  DiscoveryQuestionId, 
  DiscoverySubmission, 
  compileDiscoverySignals, 
  saveDiscoveryLocal, 
  saveDiscoveryToSupabase 
} from "../../lib/discovery";
import { supabase } from "../../integrations/supabase/client";

interface DiscoveryLayerProps {
  userId?: string | null;
  onComplete: (submission: DiscoverySubmission) => void;
}

export function DiscoveryLayer({ userId, onComplete }: DiscoveryLayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<DiscoveryQuestionId, string>>>({});
  const [isFinishing, setIsFinishing] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const question = DISCOVERY_QUESTIONS_V1[currentIdx];
  const selectedOptionId = question ? answers[question.id] : undefined;

  const handleSelectOption = (optionId: string) => {
    if (!question) return;

    const newAnswers = {
      ...answers,
      [question.id]: optionId
    };
    setAnswers(newAnswers);

    // Pequeño retardo natural para dar retroalimentación visual antes de avanzar
    setTimeout(() => {
      if (currentIdx + 1 < DISCOVERY_QUESTIONS_V1.length) {
        setTransitioning(true);
        setTimeout(() => {
          setCurrentIdx(prev => prev + 1);
          setTransitioning(false);
        }, 250);
      } else {
        // Completó las 3 preguntas
        handleCompleteDiscovery(newAnswers);
      }
    }, 280);
  };

  const handleCompleteDiscovery = async (finalAnswers: Partial<Record<DiscoveryQuestionId, string>>) => {
    setIsFinishing(true);

    // Compilación determinística (sin LLM)
    const submission = compileDiscoverySignals(finalAnswers, userId);

    // 1. Guardar en localStorage para disponibilidad inmediata en el cliente
    saveDiscoveryLocal(submission);

    // 2. Guardar en Supabase (no bloqueante)
    if (userId) {
      saveDiscoveryToSupabase(submission, supabase).catch(err => {
        console.warn("Error background al guardar discovery:", err);
      });
    }

    // Pequeña pausa con mensaje cálido y motivador
    setTimeout(() => {
      onComplete(submission);
    }, 1200);
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIdx(prev => prev - 1);
        setTransitioning(false);
      }, 200);
    }
  };

  if (isFinishing) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center animate-in fade-in duration-500">
        <div className="relative mb-6">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary shadow-inner">
            <Sparkles className="h-10 w-10 animate-pulse text-primary" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
            ✓
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
          ¡Genial! Ya te conocemos un poco más 🙌
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-md">
          Con estas pistas sobre ti, ahora sí pasamos al test vocacional. Responde con calma y con total sinceridad.
        </p>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* Barra de progreso de Discovery */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
          <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Paso previo: Conocerte un poco
          </span>
          <span>Pregunta {currentIdx + 1} de {DISCOVERY_QUESTIONS_V1.length}</span>
        </div>
        <div className="flex items-center gap-2">
          {DISCOVERY_QUESTIONS_V1.map((q, idx) => (
            <div key={q.id} className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  idx < currentIdx 
                    ? "bg-primary" 
                    : idx === currentIdx 
                    ? "bg-gradient-to-r from-primary to-secondary" 
                    : ""
                }`}
                style={{ width: idx <= currentIdx ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Encabezado de la pregunta */}
      <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
          {question.badge}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-snug">
          {question.prompt}
        </h2>
        <p className="mt-2.5 text-sm text-muted-foreground max-w-lg mx-auto">
          {question.subtitle}
        </p>
      </div>

      {/* Lista de opciones en grid de 2 columnas */}
      <div className={`grid gap-3 sm:grid-cols-2 transition-all duration-200 ${transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              className={`group relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20 -translate-y-0.5"
                  : "border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-2xl" role="img" aria-label={option.label}>
                  {option.emoji}
                </span>
                <div className={`grid h-5 w-5 place-items-center rounded-full border transition-colors ${
                  isSelected ? "border-primary bg-primary text-white" : "border-muted-foreground/30 opacity-0 group-hover:opacity-100"
                }`}>
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              </div>
              <span className={`text-sm font-bold leading-snug mb-1 transition-colors ${
                isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
              }`}>
                {option.label}
              </span>
              {option.subtitle && (
                <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {option.subtitle}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Botón de retroceso */}
      {currentIdx > 0 && (
        <div className="mt-8 flex justify-start">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Pregunta anterior
          </button>
        </div>
      )}
    </div>
  );
}
