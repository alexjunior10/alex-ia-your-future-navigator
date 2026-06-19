import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { testQuestions } from "../lib/mock-data";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/test")({
  head: () => ({ meta: [{ title: "Test Vocacional — Alex IA" }, { name: "description", content: "Responde el test vocacional de Alex IA y descubre tus carreras compatibles." }] }),
  component: TestPage,
});

function TestPage() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const total = 40;
  const q = testQuestions[idx % testQuestions.length];
  const progress = ((idx) / total) * 100;

  const select = (opt: number) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (idx + 1 >= total) {
      navigate({ to: "/resultados" });
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Pregunta {idx + 1} de {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div key={idx} className="mt-10 rounded-3xl border border-border bg-card p-8 shadow-sm animate-fade-in">
        <h2 className="text-2xl font-bold text-foreground">{q.q}</h2>
        <div className="mt-6 space-y-3">
          {q.opts.map((opt, i) => (
            <button
              key={opt}
              onClick={() => select(i)}
              className="group flex w-full items-center justify-between rounded-2xl border border-border bg-background px-5 py-4 text-left text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:shadow-md"
            >
              <span>{opt}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          disabled={idx === 0}
          onClick={() => { setIdx(Math.max(0, idx - 1)); setAnswers(answers.slice(0, -1)); }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Anterior
        </button>
        <button onClick={() => navigate({ to: "/resultados" })} className="text-sm text-muted-foreground hover:text-foreground">
          Ver resultados de ejemplo →
        </button>
      </div>
    </div>
  );
}