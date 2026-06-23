import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CircleCheck, E as CircleUserRound, I as ArrowRight, L as ArrowLeft, l as Sparkles } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./use-auth-BDmG_A7B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registro.estudiante-BcE_15X2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegistroEstudiante() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(1);
	const [transitioning, setTransitioning] = (0, import_react.useState)(false);
	const [avatar, setAvatar] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [school, setSchool] = (0, import_react.useState)("");
	const [grade, setGrade] = (0, import_react.useState)("");
	const [icebreaker, setIcebreaker] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const handleNext = () => {
		if (step < 4) {
			setTransitioning(true);
			setTimeout(() => {
				setTransitioning(false);
				setStep(step + 1);
			}, 600);
		} else {
			login("student");
			navigate({ to: "/bienvenida" });
		}
	};
	const handlePrev = () => {
		if (step > 1) setStep(step - 1);
		else navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 mb-8",
				children: [
					1,
					2,
					3,
					4
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 flex-1 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-full rounded-full transition-all duration-500 ${s < step ? "bg-primary" : s === step ? "bg-gradient-to-r from-primary to-secondary" : ""}`,
						style: { width: s <= step ? "100%" : "0%" }
					})
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider",
					children: [
						"Paso ",
						step,
						": ",
						[
							"Tu Avatar",
							"Tus Datos",
							"Rompehielo",
							"Seguridad"
						][step - 1]
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm transition-opacity duration-500 ${transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`,
				children: [
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold mb-2",
								children: "Elige tu avatar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mb-8",
								children: "Selecciona el personaje que mejor te represente."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-4 mb-8",
								children: [
									"🦊",
									"🐼",
									"🦁",
									"🐙",
									"🦖",
									"🦄",
									"🐶",
									"🐱",
									"🐰"
								].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setAvatar(a);
										handleNext();
									},
									className: `text-5xl p-6 rounded-3xl border-2 transition-all hover:scale-105 ${avatar === a ? "border-primary bg-primary/10" : "border-border bg-background"}`,
									children: a
								}, a))
							}),
							!avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground/60",
								children: "Selecciona uno para continuar"
							})
						]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							handleNext();
						},
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold text-center mb-6",
								children: "Cuéntanos sobre ti"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium",
								children: "¿Cómo te gusta que te llamen?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Tu nombre o apodo",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium",
								children: "Correo electrónico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "tucorreo@ejemplo.com",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-medium",
									children: "Colegio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: school,
									onChange: (e) => setSchool(e.target.value),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: "Selecciona..."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Col 1",
											children: "Saco Oliveros"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Col 2",
											children: "Innova Schools"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Col 3",
											children: "Trilce"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Col 4",
											children: "Otro"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-medium",
									children: "Grado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: grade,
									onChange: (e) => setGrade(e.target.value),
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: "Selecciona..."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "3ro",
											children: "3ro Secundaria"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "4to",
											children: "4to Secundaria"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "5to",
											children: "5to Secundaria"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "egresado",
											children: "Egresado"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "mt-8 w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]",
								children: ["Siguiente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-16 place-items-center rounded-2xl bg-secondary/20 text-secondary mx-auto mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold mb-2",
								children: "Una pregunta rápida..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mb-8",
								children: "Si fueras un superhéroe, ¿cuál sería tu superpoder?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: [
									{
										emoji: "⚡",
										text: "Súper velocidad"
									},
									{
										emoji: "🧠",
										text: "Leer la mente"
									},
									{
										emoji: "🕰️",
										text: "Viajar en el tiempo"
									},
									{
										emoji: "🛡️",
										text: "Fuerza imparable"
									}
								].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setIcebreaker(opt.text);
										handleNext();
									},
									className: "flex items-center gap-4 rounded-2xl border border-border bg-background p-4 text-left font-medium text-foreground transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: opt.emoji
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.text })]
								}, opt.text))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-xs text-muted-foreground opacity-60",
								children: "* Tranquilo/a, esto no afecta tus resultados. ¡Es solo para romper el hielo!"
							})
						]
					}),
					step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							handleNext();
						},
						className: "space-y-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent mx-auto mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUserRound, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-2xl font-bold mb-2",
								children: [
									"¡Casi listo, ",
									name || "crack",
									"!"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground mb-8 text-sm",
								children: "Crea una contraseña segura para guardar tu progreso y resultados."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-medium",
									children: "Contraseña"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "Mínimo 6 caracteres",
									minLength: 6,
									className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "mt-8 w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-4 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]",
								children: ["Comenzar mi viaje vocacional ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handlePrev,
					className: "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
						" ",
						step === 1 ? "Volver al Login" : "Anterior"
					]
				})
			})
		]
	});
}
//#endregion
export { RegistroEstudiante as component };
