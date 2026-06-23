import { r as __toESM } from "../_runtime.mjs";
import { n as careers, t as admissionExams } from "./mock-data-cwiuQowp.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as HeartHandshake, o as Target, r as Trophy } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/examen-DACp-FVN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExamenPage() {
	const [started, setStarted] = (0, import_react.useState)(false);
	const [qIdx, setQIdx] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const targetCareer = careers[0];
	const examBank = admissionExams[targetCareer.slug] || admissionExams["ingenieria"];
	const currentQ = examBank[qIdx];
	const handleAnswer = (idx) => {
		setAnswers([...answers, idx]);
		if (qIdx + 1 < examBank.length) setQIdx(qIdx + 1);
		else setFinished(true);
	};
	if (!started) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-extrabold tracking-tight sm:text-5xl mb-6",
				children: "Simulador de Admisión"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-lg text-muted-foreground mb-8",
				children: [
					"Te presentaremos un mini-examen tipo admisión enfocado en el área de ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: targetCareer.name }),
					". Mide tus conocimientos actuales de manera segura y confidencial."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setStarted(true),
				className: "rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105",
				children: "Iniciar Simulacro"
			})
		]
	});
	if (finished) {
		const score = answers.reduce((acc, curr, i) => acc + (curr === examBank[i].answer ? 1 : 0), 0);
		const percentage = Math.round(score / examBank.length * 100);
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
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card p-8 sm:p-12 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-24 w-24 place-items-center rounded-full bg-muted mb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedbackIcon, { className: `h-12 w-12 ${colorClass}` })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold mb-4",
						children: feedbackTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-5xl font-extrabold mb-6",
						children: [percentage, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed",
						children: feedbackDesc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-left max-w-md mx-auto bg-muted/30 p-6 rounded-2xl mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold border-b border-border pb-2",
							children: "Plan de Refuerzo Sugerido:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "text-sm space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Busca ejercicios resueltos en YouTube de las áreas donde dudaste." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Arma un grupo de estudio con amigos." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• No te desanimes: la universidad se trata de constancia, no de nacer sabiendo." })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/carreras",
							className: "rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105 shadow-md",
							children: "Explorar más carreras"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground text-center",
				children: "Alex IA es una herramienta referencial. Este simulacro no reemplaza a los exámenes de admisión oficiales ni predice tu éxito en la universidad. Su único propósito es ayudarte a identificar áreas de estudio."
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm font-bold text-muted-foreground",
				children: [
					"Pregunta ",
					qIdx + 1,
					" de ",
					examBank.length
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground",
				children: ["Área: ", currentQ.area]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold text-foreground mb-8",
				children: currentQ.q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: currentQ.opts.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => handleAnswer(i),
					className: "flex items-center gap-4 rounded-2xl border border-border bg-background p-4 text-left font-medium text-foreground transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted font-bold text-muted-foreground",
						children: String.fromCharCode(65 + i)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt })]
				}, opt))
			})]
		})]
	});
}
//#endregion
export { ExamenPage as component };
