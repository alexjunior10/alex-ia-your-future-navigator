import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { admissionExams, careers } from "../lib/mock-data";
import { CheckCircle2, XCircle, Trophy, Target, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/examen")({
  head: () => ({ meta: [{ title: "Examen Tipo Admisión — Alex IA" }] }),
  component: ExamenPage,
});

function ExamenPage() {
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  // Usamos el top 1 como la carrera para el simulacro
  const targetCareer = careers[0];
  const examBank = admissionExams[targetCareer.slug] || admissionExams["ingenieria"];

  const currentQ = examBank[qIdx];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);

    if (qIdx + 1 < examBank.length) {
      setQIdx(qIdx + 1);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
          Simulador de Admisión
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Te presentaremos un mini-examen tipo admisión enfocado en el área de <strong>{targetCareer.name}</strong>. Mide tus conocimientos actuales de manera segura y confidencial.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
        >
          Iniciar Simulacro
        </button>
      </div>
    );
  }

  if (finished) {
    const score = answers.reduce((acc, curr, i) => acc + (curr === examBank[i].answer ? 1 : 0), 0);
    const percentage = Math.round((score / examBank.length) * 100);

    let FeedbackIcon = Trophy;
    let feedbackTitle = "";
    let feedbackDesc = "";
    let colorClass = "";

    if (percentage >= 70) {
      FeedbackIcon = Trophy;
      feedbackTitle = "¡Excelente nivel inicial! 🌟";
      feedbackDesc = "Tienes bases sólidas para esta carrera. Sigue puliendo tus conocimientos y estarás listo para enfrentar el examen real pronto.";
      colorClass = "text-primary";
    } else if (percentage >= 40) {
      FeedbackIcon = Target;
      feedbackTitle = "Vas por buen camino 🎯";
      feedbackDesc = "Tienes conocimientos en desarrollo. Con un poco de refuerzo y dedicación en áreas clave, alcanzarás el nivel necesario. ¡Tú puedes!";
      colorClass = "text-secondary";
    } else {
      FeedbackIcon = HeartHandshake;
      feedbackTitle = "Punto de partida 🚀";
      feedbackDesc = "Este examen mide conocimiento actual, no tu potencial. Tienes total afinidad con esta carrera, solo necesitas un plan de estudio estructurado desde cero. ¡Todos empezamos en algún punto!";
      colorClass = "text-accent";
    }

    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted mb-8">
            <FeedbackIcon className={`h-12 w-12 ${colorClass}`} />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">{feedbackTitle}</h2>
          <div className="text-5xl font-extrabold mb-6">{percentage}%</div>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            {feedbackDesc}
          </p>

          <div className="space-y-4 text-left max-w-md mx-auto bg-muted/30 p-6 rounded-2xl mb-10">
            <h4 className="font-bold border-b border-border pb-2">Plan de Refuerzo Sugerido:</h4>
            <ul className="text-sm space-y-2">
              <li>• Busca ejercicios resueltos en YouTube de las áreas donde dudaste.</li>
              <li>• Arma un grupo de estudio con amigos.</li>
              <li>• No te desanimes: la universidad se trata de constancia, no de nacer sabiendo.</li>
            </ul>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              to="/carreras"
              className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105 shadow-md"
            >
              Explorar más carreras
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground text-center">
          Alex IA es una herramienta referencial. Este simulacro no reemplaza a los exámenes de admisión oficiales ni predice tu éxito en la universidad. Su único propósito es ayudarte a identificar áreas de estudio.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-sm font-bold text-muted-foreground">Pregunta {qIdx + 1} de {examBank.length}</span>
        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground">Área: {currentQ.area}</span>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-bold text-foreground mb-8">{currentQ.q}</h2>

        <div className="flex flex-col gap-3">
          {currentQ.opts.map((opt, i) => (
            <button
              key={opt}
              onClick={() => handleAnswer(i)}
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 text-left font-medium text-foreground transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted font-bold text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </div>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
