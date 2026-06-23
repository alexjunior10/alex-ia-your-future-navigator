import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/coach")({
  head: () => ({ meta: [{ title: "Alex IA Coach" }, { name: "description", content: "Conversa con Alex IA Coach sobre tus dudas vocacionales." }] }),
  component: CoachPage,
});

type Msg = { role: "user" | "ai"; text: string };

const initial: Msg[] = [
  { role: "ai", text: "¡Hola! Soy Alex, tu coach vocacional. ¿En qué puedo ayudarte hoy? 😊" },
  { role: "user", text: "Estoy entre Ingeniería de Sistemas y Marketing. No sé qué elegir." },
  { role: "ai", text: "Excelente que estés explorando ambas. Según tu perfil, tienes 92% de afinidad con Sistemas (destacas en lógica y creatividad técnica) y 81% con Marketing (comunicación y análisis). ¿Te gustaría que comparemos malla, salarios y estilo de vida de cada una?" },
  { role: "user", text: "Sí, por favor. Y también quisiera saber si tengo el nivel para ingresar a la universidad a Sistemas." },
  { role: "ai", text: "Sistemas suele tener trabajo más estructurado y técnico; Marketing es más dinámico. Sobre tu nivel, ¡claro que puedes lograrlo! De hecho, si quieres medir tu conocimiento actual, te sugiero realizar nuestro **Simulador de Admisión** de 15 preguntas, está en tu menú principal y te dará un plan de refuerzo." },
];

function CoachPage() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { role: "user", text: input }, { role: "ai", text: "Esa es una gran pregunta. Cuéntame qué actividades te emocionan más en una semana típica y exploremos juntos." }]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg">
          <Sparkles className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold">Alex IA Coach</h1>
          <p className="text-sm text-muted-foreground">Tu acompañante vocacional con IA</p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-sm">
        <div className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto p-2">
          {msgs.map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm animate-fade-in ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted text-foreground"}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background p-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
          />
          <button onClick={send} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Alex IA es una herramienta orientadora, no un servicio de terapia ni diagnóstico clínico.
      </p>
    </div>
  );
}