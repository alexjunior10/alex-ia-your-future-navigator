import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as LogIn, i as UserPlus, r as Users, x as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as useAuth } from "./use-auth-BDmG_A7B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DiTzzpYw.js
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
		if (role === "student") navigate({ to: "/test" });
		if (role === "parent") navigate({ to: "/padres" });
		if (role === "school") navigate({ to: "/colegios" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full rounded-3xl border border-border bg-card p-8 shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-extrabold tracking-tight",
							children: "Iniciar Sesión"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Ingresa a tu cuenta para continuar."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-xl bg-muted p-1 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("student"),
							className: `flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all ${activeTab === "student" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4" }), " Estudiante"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("parent"),
							className: `flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all ${activeTab === "parent" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), " Padre/Madre"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => handleLogin(e, activeTab),
						className: "space-y-4",
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
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
								className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-4 flex flex-col gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-5 w-5" }), " Iniciar Sesión"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: activeTab === "student" ? "/registro/estudiante" : "/registro/padre",
									className: "w-full flex justify-center items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-5 w-5" }), " Crear cuenta"]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: (e) => handleLogin(e, "school"),
					className: "text-xs font-medium text-muted-foreground hover:text-foreground underline decoration-muted-foreground/30 underline-offset-4",
					children: "Acceso exclusivo para Colegios"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs text-muted-foreground/60 text-center max-w-sm",
				children: "* Para fines del prototipo, ingresa cualquier usuario y contraseña. No se validan credenciales reales."
			})
		]
	});
}
//#endregion
export { LoginPage as component };
