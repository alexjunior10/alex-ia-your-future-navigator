import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ArrowRight, L as ArrowLeft, u as ShieldCheck, y as Heart } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./use-auth-PAiYZATh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registro.padre-d0jnuumZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RegistroPadre() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(1);
	const [studentCode, setStudentCode] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [goal, setGoal] = (0, import_react.useState)("");
	const handleNext = (e) => {
		if (e) e.preventDefault();
		if (step < 3) setStep(step + 1);
		else {
			login("parent");
			navigate({ to: "/padres" });
		}
	};
	const handlePrev = () => {
		if (step > 1) setStep(step - 1);
		else navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-secondary/10 text-secondary mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-extrabold tracking-tight",
						children: "Portal para Padres"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Acompaña a tu hijo/a en su decisión más importante."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm transition-all duration-300",
				children: [
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleNext,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-center",
								children: "Vincular cuenta"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground text-center",
								children: "Ingresa el código que aparece en la cuenta de tu hijo/a, o búscalo por su correo."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium",
								children: "Código de estudiante o correo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: studentCode,
								onChange: (e) => setStudentCode(e.target.value),
								placeholder: "Ej. ALEX-1234 o juan@colegio.edu.pe",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "w-full flex justify-center items-center gap-2 rounded-xl bg-secondary px-4 py-3 font-bold text-secondary-foreground shadow-md transition-transform hover:scale-[1.02]",
								children: ["Verificar estudiante ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["¿Tu hijo aún no tiene cuenta? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/registro/estudiante",
										className: "text-secondary font-medium hover:underline",
										children: "Regístralo aquí"
									})]
								})
							})
						]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleNext,
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-center mb-6",
								children: "Tus datos personales"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium",
								children: "Nombre completo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Tu nombre",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2"
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
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium",
								children: "Crea una contraseña"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Mínimo 6 caracteres",
								minLength: 6,
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-2"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "mt-6 w-full flex justify-center items-center gap-2 rounded-xl bg-secondary px-4 py-3 font-bold text-secondary-foreground shadow-md transition-transform hover:scale-[1.02]",
								children: ["Siguiente ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold mb-2",
								children: "Para terminar..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-8",
								children: "¿Qué te gustaría lograr acompañando a tu hijo/a en este proceso?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: [
									"Que descubra su pasión de forma natural",
									"Que tome una decisión informada y segura",
									"Que no se sienta presionado/a al elegir",
									"Entender mejor cuáles son sus habilidades"
								].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setGoal(opt);
										handleNext();
									},
									className: "flex items-center gap-4 rounded-xl border border-border bg-background p-4 text-left font-medium text-foreground transition-all hover:border-secondary hover:shadow-md hover:bg-secondary/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary/10 text-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: opt
									})]
								}, opt))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-xs text-muted-foreground opacity-70",
								children: "Esto nos ayudará a adaptar los consejos que te mostraremos en el portal."
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
export { RegistroPadre as component };
