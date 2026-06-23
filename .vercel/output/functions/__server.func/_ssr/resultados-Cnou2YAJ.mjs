import { n as careers, r as mockAdnProfile } from "./mock-data-cwiuQowp.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as BookOpen, C as Check, _ as GraduationCap, i as TriangleAlert, k as BrainCircuit, o as Target, s as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resultados-Cnou2YAJ.js
var import_jsx_runtime = require_jsx_runtime();
function Radar({ data }) {
	const size = 260;
	const center = size / 2;
	const radius = 100;
	const angle = (i) => Math.PI * 2 * i / data.length - Math.PI / 2;
	const point = (v, i) => {
		const r = v / 100 * radius;
		return [center + r * Math.cos(angle(i)), center + r * Math.sin(angle(i))];
	};
	const pts = data.map((d, i) => point(d.value, i).join(",")).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${size} ${size}`,
		className: "w-full max-w-sm",
		children: [
			[
				.25,
				.5,
				.75,
				1
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: data.map((_, i) => point(100 * s, i).join(",")).join(" "),
				fill: "none",
				stroke: "oklch(0.92 0.01 270)"
			}, s)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: pts,
				fill: "oklch(0.59 0.21 285 / 0.25)",
				stroke: "oklch(0.59 0.21 285)",
				strokeWidth: 2
			}),
			data.map((d, i) => {
				const [x, y] = point(115, i);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x,
					y,
					textAnchor: "middle",
					className: "fill-foreground text-[10px] font-medium",
					children: d.name
				}, d.name);
			})
		]
	});
}
function ResultsPage() {
	const topCareers = careers.slice(0, 5);
	const top1 = topCareers[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Tu Perfil Vocacional"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground",
						children: [
							"Tu ADN Profesional es:",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
								children: mockAdnProfile.arquetipo
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed",
						children: mockAdnProfile.description
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2 mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-card p-8 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 place-items-center rounded-xl bg-accent/20 text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-bold",
								children: "Tus Superpoderes"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-6",
							children: "Basado en tus respuestas, estas son tus fortalezas naturales."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { data: mockAdnProfile.superpoderes })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-card p-8 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-secondary/20 text-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-2xl font-bold",
							children: "Tu Entorno Ideal"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-4 mt-6",
						children: mockAdnProfile.entornoIdeal.map((entorno) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 rounded-2xl bg-muted/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-6 w-6 place-items-center rounded-full bg-secondary/20 text-secondary shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: entorno
							})]
						}, entorno))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold text-center mb-10",
					children: "Tu Top 5 de Carreras"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: topCareers.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-3xl border ${i === 0 ? "border-primary shadow-md" : "border-border shadow-sm"} bg-card overflow-hidden`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `rounded-full px-3 py-1 text-xs font-bold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
										children: ["Top ", i + 1]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-2xl font-bold",
										children: c.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: c.description
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left md:text-right w-full md:w-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-3xl font-extrabold text-primary mb-1",
									children: [c.affinity, "%"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold",
									children: "Afinidad"
								})]
							})]
						}), i === 0 && c.branches && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-muted/30 border-t border-border p-6 sm:p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-semibold text-foreground mb-4",
								children: "Especialidades que encajan contigo:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid sm:grid-cols-3 gap-4",
								children: c.branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-background border border-border p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "font-bold text-primary mb-2",
											children: b.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mb-3",
											children: b.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Salario:" }),
												" ",
												b.salary
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Tiempo:" }),
												" ",
												b.duration
											] })]
										})
									]
								}, b.name))
							})]
						})]
					}, c.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3 mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-accent bg-card p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl",
									children: "🎁"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold",
									children: "Carrera Sorpresa"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-bold text-accent mb-2",
								children: [
									mockAdnProfile.carreraSorpresa.name,
									" (",
									mockAdnProfile.carreraSorpresa.affinity,
									"%)"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: mockAdnProfile.carreraSorpresa.reason
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold",
									children: "Tu Mayor Desafío"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-semibold text-foreground mb-2",
								children: mockAdnProfile.mayorDesafio.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-3",
								children: mockAdnProfile.mayorDesafio.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-primary/10 p-3 text-xs font-medium text-primary",
								children: ["💡 ", mockAdnProfile.mayorDesafio.advice]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold",
								children: "Plan de Acción"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: mockAdnProfile.planAccion.map((plan, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold text-primary",
									children: [i + 1, "."]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plan })]
							}, i))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 sm:p-12 text-center text-primary-foreground shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/20 mb-6 backdrop-blur-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold mb-4",
						children: "¿Quieres medir tu nivel actual?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-lg",
						children: [
							"Te hemos recomendado ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: top1.name }),
							". Intenta un examen de práctica corto (15 preguntas) basado en el estilo de las mejores universidades para esta carrera."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-4 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/examen",
							className: "rounded-full bg-background px-8 py-4 font-bold text-primary shadow-lg transition-transform hover:scale-105",
							children: "Sí, quiero intentarlo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/20",
							children: "Tal vez después"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground text-center",
				children: "Alex IA es una herramienta de orientación y autoconocimiento. No constituye un diagnóstico psicológico ni reemplaza la evaluación de un psicólogo u orientador vocacional certificado. Los resultados son estimaciones referenciales basadas en tus respuestas, no mediciones exactas de habilidad o éxito futuro."
			})
		]
	});
}
//#endregion
export { ResultsPage as component };
