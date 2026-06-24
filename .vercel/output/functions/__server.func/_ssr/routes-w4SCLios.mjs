import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Compass, I as ArrowRight, N as Brain, l as Sparkles, x as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as careers } from "./mock-data-cwiuQowp.mjs";
import { n as useAuth } from "./use-auth-PAiYZATh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-w4SCLios.js
var import_jsx_runtime = require_jsx_runtime();
var hero_default = "/assets/hero-0G_cQFM5.jpg";
function Index() {
	const { role, setShowAuthModal } = useAuth();
	const handleTestClick = (e) => {
		if (!role) {
			e.preventDefault();
			setShowAuthModal(true);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative pb-16 pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-secondary/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 md:grid-cols-2 md:py-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-fade-in",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-primary shadow-sm mb-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " El Spotify de la orientación vocacional"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl",
									children: [
										"Descubre la ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
											children: "carrera ideal"
										}),
										" para ti con IA"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-lg text-base text-muted-foreground sm:text-lg",
									children: "Alex IA analiza tu personalidad, intereses y habilidades para ayudarte a tomar una de las decisiones más importantes de tu vida."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-7 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/test",
										onClick: handleTestClick,
										className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 hover:bg-primary/90",
										children: ["Realizar Test ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/carreras",
										className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors",
										children: "Explorar Carreras"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-xs text-muted-foreground",
									children: "+ de 12,000 estudiantes peruanos ya descubrieron su camino."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative animate-fade-in hidden md:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-accent/30 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hero_default,
								alt: "Estudiante explorando carreras con Alex IA",
								width: 1280,
								height: 960,
								className: "rounded-3xl shadow-2xl shadow-primary/10 object-cover aspect-[4/3]"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-6xl px-4 mt-8 sm:px-6 relative z-10 animate-fade-in",
						style: { animationDelay: "0.2s" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "group rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-orange-500/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl filter drop-shadow-sm transition-transform group-hover:scale-110",
											children: "🟧"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-3xl font-black bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent mb-1",
											children: "60%"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium leading-tight text-foreground",
											children: "de jóvenes en Perú no termina ejerciendo la carrera que estudió."
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "group rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl filter drop-shadow-sm transition-transform group-hover:scale-110",
											children: "🟦"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-3xl font-black bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent mb-1",
											children: "1 de 3"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium leading-tight text-foreground",
											children: "estudiantes cambia de carrera o universidad en sus primeros años."
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "group rounded-3xl border border-border/50 bg-card/60 backdrop-blur-md p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-purple-500/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl filter drop-shadow-sm transition-transform group-hover:scale-110",
											children: "🟪"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-3xl font-black bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text text-transparent mb-1",
											children: "80%"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium leading-tight text-foreground",
											children: "reduce el riesgo de deserción usando herramientas de autoconocimiento."
										})] })]
									})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-20 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold tracking-tight sm:text-4xl",
						children: "¿Cómo funciona?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Cuatro pasos para descubrir tu vocación."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						{
							icon: Brain,
							title: "Responde el test",
							text: "40 preguntas sobre tus intereses, personalidad y habilidades."
						},
						{
							icon: Sparkles,
							title: "Alex IA analiza",
							text: "Nuestro motor cruza tus respuestas con cientos de perfiles."
						},
						{
							icon: Compass,
							title: "Recibe carreras",
							text: "Top 3 carreras compatibles con porcentaje referencial."
						},
						{
							icon: GraduationCap,
							title: "Explora universidades",
							text: "Mallas, salarios, demanda y oportunidades reales."
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-xs font-semibold text-primary",
								children: ["Paso ", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-lg font-semibold text-foreground",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: s.text
							})
						]
					}, s.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-10 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold tracking-tight sm:text-3xl",
						children: "Carreras populares"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/carreras",
						className: "text-sm font-medium text-primary hover:underline",
						children: "Ver todas →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: careers.slice(0, 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/carreras/$slug",
						params: { slug: c.slug },
						className: "group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground",
									children: c.area
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-lg font-semibold",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
								children: c.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-2 text-sm font-medium text-primary",
								children: ["Ver carrera ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						]
					}, c.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto mt-16 max-w-6xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 text-center text-primary-foreground shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-bold sm:text-4xl",
							children: "Tu futuro empieza con una mejor pregunta."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-primary-foreground/90",
							children: "No es solo un test. Es tu compañero para descubrir quién quieres ser."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/test",
							onClick: handleTestClick,
							className: "mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-lg hover:scale-105 transition-transform",
							children: ["Comenzar mi test gratis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
