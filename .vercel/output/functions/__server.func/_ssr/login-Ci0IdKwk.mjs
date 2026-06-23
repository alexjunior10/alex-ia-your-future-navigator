import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Building2, _ as GraduationCap, j as ArrowRight, n as Users } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./use-auth-BDmG_A7B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Ci0IdKwk.js
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const handleLogin = (role) => {
		login(role);
		if (role === "student") navigate({ to: "/test" });
		if (role === "parent") navigate({ to: "/padres" });
		if (role === "school") navigate({ to: "/colegios" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-extrabold tracking-tight sm:text-4xl",
					children: "¿Quién eres?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Selecciona tu perfil para ingresar a la plataforma."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid w-full gap-6 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleLogin("student"),
						className: "group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-xl font-bold",
								children: "Soy Estudiante"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Quiero descubrir mi carrera ideal y prepararme para el futuro."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100",
								children: ["Ingresar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleLogin("parent"),
						className: "group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-16 place-items-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-xl font-bold",
								children: "Soy Padre/Madre"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Quiero acompañar y entender el perfil vocacional de mi hijo/a."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-2 text-sm font-semibold text-secondary opacity-0 transition-opacity group-hover:opacity-100",
								children: ["Ingresar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleLogin("school"),
						className: "group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-16 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-xl font-bold",
								children: "Soy Colegio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Quiero ver el progreso vocacional agregado de mis estudiantes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-2 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100",
								children: ["Ingresar ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-12 text-sm text-muted-foreground",
				children: "* Para fines de este prototipo, el login es simulado y no requiere contraseña."
			})
		]
	});
}
//#endregion
export { LoginPage as component };
