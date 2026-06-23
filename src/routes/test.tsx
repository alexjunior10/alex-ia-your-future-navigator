import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { testDimensions } from "../lib/mock-data";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/test")({
  head: () => ({ meta: [{ title: "Test Vocacional — Alex IA" }] }),
  component: TestPage,
});

function TestPage() {
  const navigate = useNavigate();
  const [dimIdx, setDimIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);

  const dim = testDimensions[dimIdx];

  const handleNext = () => {
    if (qIdx + 1 < dim.questions.length) {
      setQIdx(qIdx + 1);
      setSliderVal(50);
    } else {
      if (dimIdx + 1 < testDimensions.length) {
        setTransitioning(true);
        setTimeout(() => {
          setTransitioning(false);
          setDimIdx(dimIdx + 1);
          setQIdx(0);
          setSliderVal(50);
        }, 2000); // Transition screen duration
      } else {
        navigate({ to: "/resultados" });
      }
    }
  };

  const handlePrev = () => {
    if (qIdx > 0) {
      setQIdx(qIdx - 1);
    } else if (dimIdx > 0) {
      setDimIdx(dimIdx - 1);
      setQIdx(testDimensions[dimIdx - 1].questions.length - 1);
    }
  };

  if (transitioning) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center animate-in fade-in duration-500">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary mb-6">
          <Sparkles className="h-10 w-10 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">¡Vas muy bien! 🎯</h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Ahora exploremos: <strong className="text-foreground">{testDimensions[dimIdx + 1].title}</strong>
        </p>
      </div>
    );
  }

  if (!dim || !dim.questions[qIdx]) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Segmented Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {testDimensions.map((d, i) => (
          <div key={d.id} className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                i < dimIdx ? "bg-primary" : i === dimIdx ? "bg-gradient-to-r from-primary to-secondary" : ""
              }`}
              style={{ width: i < dimIdx ? "100%" : i === dimIdx ? `${((qIdx + 1) / d.questions.length) * 100}%` : "0%" }}
            />
          </div>
        ))}
      </div>

      <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
          {dim.title}
        </span>
        <p className="mt-3 text-sm text-muted-foreground">{dim.subtitle}</p>
      </div>

      <div key={`${dimIdx}-${qIdx}`} className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{dim.questions[qIdx].q}</h2>

        {dim.type === "emoji-cards" && (() => {
          const q = dim.questions[qIdx];
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.opts.map((opt) => (
                <button
                  key={opt}
                  onClick={handleNext}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left font-medium text-foreground transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          );
        })()}

        {dim.type === "scenario" && (() => {
          const q = dim.questions[qIdx];
          return (
            <div className="flex flex-col gap-3">
              {q.scenario && <p className="mb-4 text-muted-foreground text-center">{q.scenario}</p>}
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={handleNext}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4 text-left text-sm font-medium text-foreground transition-all hover:bg-muted"
                >
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {opt.charAt(0)}
                  </div>
                  <span>{opt.substring(2)}</span>
                </button>
              ))}
            </div>
          );
        })()}

        {dim.type === "slider" && (() => {
          const q = dim.questions[qIdx];
          return (
            <div className="py-8">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-4 text-sm font-medium text-muted-foreground">
                <span>{q.left}</span>
                <span>{q.right}</span>
              </div>
              <button
                onClick={handleNext}
                className="mt-10 w-full flex justify-center items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-[1.02] hover:bg-primary/90"
              >
                Confirmar <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          );
        })()}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          disabled={dimIdx === 0 && qIdx === 0}
          onClick={handlePrev}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" /> Anterior
        </button>
      </div>
    </div>
  );
}