import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as ArrowLeft, j as CircleCheck, l as Sparkles } from "../_libs/lucide-react.mjs";
import { i as testDimensions } from "./mock-data-cwiuQowp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/test-CA5_sgn8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TestPage() {
	const navigate = useNavigate();
	const [dimIdx, setDimIdx] = (0, import_react.useState)(0);
	const [qIdx, setQIdx] = (0, import_react.useState)(0);
	const [transitioning, setTransitioning] = (0, import_react.useState)(false);
	const [sliderVal, setSliderVal] = (0, import_react.useState)(50);
	const [selectedOption, setSelectedOption] = (0, import_react.useState)(null);
	const dim = testDimensions[dimIdx];
	const handleNext = (opt) => {
		if (opt) {
			setSelectedOption(opt);
			setTimeout(() => proceedToNext(), 400);
		} else proceedToNext();
	};
	const proceedToNext = () => {
		setSelectedOption(null);
		if (qIdx + 1 < dim.questions.length) {
			setQIdx(qIdx + 1);
			setSliderVal(50);
		} else if (dimIdx + 1 < testDimensions.length) {
			setTransitioning(true);
			setTimeout(() => {
				setTransitioning(false);
				setDimIdx(dimIdx + 1);
				setQIdx(0);
				setSliderVal(50);
			}, 2e3);
		} else navigate({ to: "/resultados" });
	};
	const handlePrev = () => {
		if (qIdx > 0) setQIdx(qIdx - 1);
		else if (dimIdx > 0) {
			setDimIdx(dimIdx - 1);
			setQIdx(testDimensions[dimIdx - 1].questions.length - 1);
		}
	};
	if (transitioning) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-20 w-20 place-items-center rounded-3xl bg-primary/10 text-primary mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-10 w-10 animate-pulse" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-bold text-foreground",
				children: "¡Vas muy bien! 🎯"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-lg text-muted-foreground",
				children: ["Ahora exploremos: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "text-foreground",
					children: testDimensions[dimIdx + 1].title
				})]
			})
		]
	});
	if (!dim || !dim.questions[qIdx]) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 mb-8",
				children: testDimensions.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 flex-1 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-full rounded-full transition-all duration-300 ${i < dimIdx ? "bg-primary" : i === dimIdx ? "bg-gradient-to-r from-primary to-secondary" : ""}`,
						style: { width: i < dimIdx ? "100%" : i === dimIdx ? `${(qIdx + 1) / d.questions.length * 100}%` : "0%" }
					})
				}, d.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider",
					children: dim.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: dim.subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold text-foreground text-center mb-2",
						children: dim.questions[qIdx].q
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-muted-foreground mb-8 font-medium",
						children: "¿Qué actividad te emociona más?"
					}),
					dim.type === "emoji-cards" && (() => {
						const q = dim.questions[qIdx];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: q.opts.map((opt) => {
								const isSelected = selectedOption === opt;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleNext(opt),
									className: `group relative flex items-center gap-3 rounded-2xl border p-4 text-left font-medium transition-all duration-300
                      ${isSelected ? "border-primary bg-primary/5 text-primary scale-[1.02] shadow-md" : "border-border bg-background text-foreground hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:scale-[1.01]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: opt
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-30 group-hover:scale-100"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: `h-5 w-5 ${isSelected ? "text-primary animate-in zoom-in" : "text-muted-foreground"}` })
									})]
								}, opt);
							})
						});
					})(),
					dim.type === "scenario" && (() => {
						const q = dim.questions[qIdx];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [q.scenario && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 text-muted-foreground text-center",
								children: q.scenario
							}), q.options.map((opt) => {
								const isSelected = selectedOption === opt;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleNext(opt),
									className: `group flex items-center gap-4 rounded-2xl border p-4 text-left text-sm font-medium transition-all duration-300
                      ${isSelected ? "border-secondary bg-secondary/5 text-secondary scale-[1.02] shadow-md" : "border-border bg-background text-foreground hover:bg-muted hover:border-secondary/30 hover:shadow-lg hover:scale-[1.01]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${isSelected ? "bg-secondary/20 text-secondary" : "bg-primary/10 text-primary group-hover:bg-secondary/10 group-hover:text-secondary"}`,
										children: isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 animate-in zoom-in" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold",
											children: opt.charAt(0)
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1",
										children: opt.substring(2)
									})]
								}, opt);
							})]
						});
					})(),
					dim.type === "slider" && (() => {
						const q = dim.questions[qIdx];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "0",
									max: "100",
									value: sliderVal,
									onChange: (e) => setSliderVal(parseInt(e.target.value)),
									className: "w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between mt-4 text-sm font-medium text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: q.left }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: q.right })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleNext(),
									className: "mt-10 w-full flex justify-center items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03] hover:bg-primary/90",
									children: ["Confirmar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })]
								})
							]
						});
					})()
				]
			}, `${dimIdx}-${qIdx}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: dimIdx === 0 && qIdx === 0,
					onClick: handlePrev,
					className: "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Anterior"]
				})
			})
		]
	});
}
//#endregion
export { TestPage as component };
