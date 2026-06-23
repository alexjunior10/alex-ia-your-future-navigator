import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as Send, s as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-DPH6AZx1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = [
	{
		role: "ai",
		text: "¡Hola! Soy Alex, tu coach vocacional. ¿En qué puedo ayudarte hoy? 😊"
	},
	{
		role: "user",
		text: "Estoy entre Ingeniería de Sistemas y Marketing. No sé qué elegir."
	},
	{
		role: "ai",
		text: "Excelente que estés explorando ambas. Según tu perfil, tienes 92% de afinidad con Sistemas (destacas en lógica y creatividad técnica) y 81% con Marketing (comunicación y análisis). ¿Te gustaría que comparemos malla, salarios y estilo de vida de cada una?"
	},
	{
		role: "user",
		text: "Sí, por favor. Y también quisiera saber si tengo el nivel para ingresar a la universidad a Sistemas."
	},
	{
		role: "ai",
		text: "Sistemas suele tener trabajo más estructurado y técnico; Marketing es más dinámico. Sobre tu nivel, ¡claro que puedes lograrlo! De hecho, si quieres medir tu conocimiento actual, te sugiero realizar nuestro **Simulador de Admisión** de 15 preguntas, está en tu menú principal y te dará un plan de refuerzo."
	}
];
function CoachPage() {
	const [msgs, setMsgs] = (0, import_react.useState)(initial);
	const [input, setInput] = (0, import_react.useState)("");
	const send = () => {
		if (!input.trim()) return;
		setMsgs([
			...msgs,
			{
				role: "user",
				text: input
			},
			{
				role: "ai",
				text: "Esa es una gran pregunta. Cuéntame qué actividades te emocionan más en una semana típica y exploremos juntos."
			}
		]);
		setInput("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-extrabold",
					children: "Alex IA Coach"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Tu acompañante vocacional con IA"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-3xl border border-border bg-card p-4 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex max-h-[60vh] flex-col gap-3 overflow-y-auto p-2",
					children: msgs.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `max-w-[85%] rounded-2xl px-4 py-3 text-sm animate-fade-in ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted text-foreground"}`,
						children: m.text
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-2 rounded-full border border-border bg-background p-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => e.key === "Enter" && send(),
						placeholder: "Escribe tu pregunta...",
						className: "flex-1 bg-transparent px-4 py-2 text-sm outline-none"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: send,
						className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "Alex IA es una herramienta orientadora, no un servicio de terapia ni diagnóstico clínico."
			})
		]
	});
}
//#endregion
export { CoachPage as component };
