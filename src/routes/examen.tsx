import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Trophy, Target, HeartHandshake, BookOpen, Building2, BrainCircuit, Activity, Clock } from "lucide-react";
import { supabase } from "../integrations/supabase/client";

export const Route = createFileRoute("/examen")({
  head: () => ({ meta: [{ title: "Examen Tipo Admisión — Alex IA" }] }),
  loader: async () => {
    const [careersRes, examsRes] = await Promise.all([
      supabase.from('careers').select('slug, name, universities').order('name'),
      supabase.from('admission_exams').select('*')
    ]);
    
    if (careersRes.error) throw careersRes.error;
    if (examsRes.error) throw examsRes.error;
    
    const examsMap = new Map<string, any[]>();
    examsRes.data.forEach((row: any) => {
      if (!examsMap.has(row.career_slug)) {
        examsMap.set(row.career_slug, []);
      }
      examsMap.get(row.career_slug)!.push({
        q: row.q,
        opts: row.opts,
        answer: row.answer,
        area: row.area
      });
    });
    
    return {
      careers: careersRes.data,
      admissionExams: Object.fromEntries(examsMap)
    };
  },
  component: ExamenPage,
});

function ExamenPage() {
  const { careers, admissionExams } = Route.useLoaderData() as any;
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 min en segundos

  useEffect(() => {
    if (started && !finished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && started && !finished) {
      setFinished(true); // Terminar auto cuando llega a 0
    }
  }, [timeLeft, started, finished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const [selectedCareer, setSelectedCareer] = useState(careers[0].slug);
  const [selectedUni, setSelectedUni] = useState(careers[0].universities[0]);

  const targetCareer = careers.find((c: any) => c.slug === selectedCareer) || careers[0];
  const examBank = admissionExams[targetCareer.slug] || Object.values(admissionExams)[0] || [];

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
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Simulador de Admisión
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mide tus conocimientos actuales de manera segura y confidencial. No es un examen real, es un diagnóstico para ayudarte a mejorar.
          </p>
        </div>

        {/* Anti-anxiety stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Activity className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold mb-2">Entorno Seguro</h3>
            <p className="text-sm text-muted-foreground">Más de 5,000 estudiantes practican aquí sin miedo a equivocarse.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Target className="h-6 w-6 text-secondary mb-3" />
            <h3 className="font-bold mb-2">Simulación Realista</h3>
            <p className="text-sm text-muted-foreground">Preguntas basadas en exámenes pasados de las top 10 universidades del Perú.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <HeartHandshake className="h-6 w-6 text-accent mb-3" />
            <h3 className="font-bold mb-2">Cero Presión</h3>
            <p className="text-sm text-muted-foreground">Conocer tu nivel hoy es el primer paso para diseñar tu plan de estudio mañana.</p>
          </div>
        </div>

        {/* Step-by-step visual */}
        <div className="rounded-3xl bg-muted/30 p-8 mb-16">
          <h3 className="text-center font-bold text-lg mb-8">¿Cómo funciona?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 text-primary mb-3 font-bold">1</div>
              <p className="text-sm font-medium">Eliges Carrera</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 text-primary mb-3 font-bold">2</div>
              <p className="text-sm font-medium">Eliges Universidad</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 text-primary mb-3 font-bold">3</div>
              <p className="text-sm font-medium">15 Preguntas</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 text-primary mb-3 font-bold">4</div>
              <p className="text-sm font-medium">Recibes Feedback</p>
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="max-w-xl mx-auto rounded-3xl border border-border bg-card p-8 shadow-md">
          <h3 className="text-2xl font-bold text-center mb-6">Configura tu simulacro</h3>
          
          <div className="space-y-5 mb-8">
            <div>
              <label className="mb-2 block text-sm font-medium flex items-center gap-2"><BookOpen className="h-4 w-4" /> Carrera a postular</label>
              <select value={selectedCareer} onChange={e => { setSelectedCareer(e.target.value); setSelectedUni(careers.find((c: any) => c.slug === e.target.value)?.universities[0] || ""); }} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2">
                {careers.map((c: any) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium flex items-center gap-2"><Building2 className="h-4 w-4" /> Universidad objetivo</label>
              <select value={selectedUni} onChange={e => setSelectedUni(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2">
                {targetCareer.universities.map((u: string) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
          >
            Iniciar Simulacro
          </button>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            * Esto es un simulacro de práctica. No es el examen real de admisión.
          </p>
        </div>
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
      feedbackTitle = "Necesitas prepararte más 🚀";
      feedbackDesc = "Si estás seguro de querer esta carrera, debes prepararte más y estudiar áreas clave. También puedes volver a realizar el Test Vocacional para estar 100% seguro de que esta ruta se alinea contigo y descubrir en qué puedes mejorar.";
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
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1.5 font-mono text-lg font-bold ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-primary'}`}>
            <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
          </div>
          <span className="hidden sm:inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground">Área: {currentQ.area}</span>
        </div>
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
