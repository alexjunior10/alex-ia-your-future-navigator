import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as LogIn, i as UserPlus, j as Building2, l as Sparkles, r as Users, x as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./use-auth-BDmG_A7B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CLed1msz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("student");
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const handleLogin = (e, role) => {
		e.preventDefault();
		login(role);
		if (role === "student") navigate({ to: "/bienvenida" });
		if (role === "parent") navigate({ to: "/padres" });
		if (role === "school") navigate({ to: "/colegios" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[85vh] flex items-center justify-center p-4 sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-2xl flex flex-col md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative md:w-5/12 bg-gradient-to-br from-primary to-secondary p-10 text-primary-foreground flex flex-col justify-between overflow-hidden hidden sm:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex items-center gap-2 font-bold mb-12 hover:opacity-80 transition-opacity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 place-items-center rounded-xl bg-white text-primary shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alex IA" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex-1 flex flex-col justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-6xl mb-6 filter drop-shadow-md",
								children: "🧭"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-3xl font-extrabold leading-tight mb-4",
								children: [
									"\"No te diremos qué estudiar.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Te ayudaremos a descubrir quién puedes llegar a ser.\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-primary-foreground/80 font-medium",
								children: "Únete a miles de estudiantes que ya están diseñando su futuro con propósito."
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center md:text-left mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-extrabold tracking-tight",
							children: "Qué bueno verte nuevamente 👋"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Selecciona tu perfil y accede a tu cuenta."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row rounded-xl bg-muted p-1 mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("student"),
								className: `flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${activeTab === "student" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4" }), " Estudiante"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("parent"),
								className: `flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${activeTab === "parent" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " Padres"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveTab("school"),
								className: `flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${activeTab === "school" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }), " Colegios"]
							})
						]
					}),
					activeTab !== "school" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => handleLogin(e, activeTab),
						className: "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium text-foreground",
								children: activeTab === "student" ? "Usuario o Correo" : "Correo Electrónico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								value: username,
								onChange: (e) => setUsername(e.target.value),
								placeholder: activeTab === "student" ? "ej. alex123" : "ej. padre@correo.com",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium text-foreground",
								children: "Contraseña"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 flex flex-col sm:flex-row gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "flex-1 flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-5 w-5" }), " Ingresar"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: activeTab === "student" ? "/registro/estudiante" : "/registro/padre",
									className: "flex-1 flex justify-center items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5" }), " Crear cuenta"]
								})]
							})
						]
					}),
					activeTab === "school" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => handleLogin(e, "school"),
						className: "space-y-4 animate-in fade-in slide-in-from-left-4 duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-accent/10 p-5 mb-6 text-center border border-accent/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-8 w-8 text-accent mx-auto mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-accent-foreground leading-relaxed",
									children: "Más de 50 colegios utilizan herramientas de orientación vocacional para acompañar mejor a sus estudiantes."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium text-foreground",
								children: "Correo Institucional"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: username,
								onChange: (e) => setUsername(e.target.value),
								placeholder: "admin@colegio.edu.pe",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium text-foreground",
								children: "Contraseña"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "w-full flex justify-center items-center gap-2 rounded-xl bg-accent px-4 py-3 font-bold text-accent-foreground shadow-md transition-transform hover:scale-[1.02]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-5 w-5" }), " Ingresar al Dashboard"]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-xs text-muted-foreground/60 text-center",
						children: "* Prototipo: ingresa cualquier valor para simular el inicio de sesión."
					})
				]
			})]
		})
	});
}
//#endregion
export { LoginPage as component };
