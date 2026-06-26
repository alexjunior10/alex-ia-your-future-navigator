import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C7mgT9XD.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as ArrowLeft, j as CircleCheck, l as Sparkles, m as Mail, v as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recuperar-clave-BSl6HSxt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecuperarClavePage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/actualizar-clave` });
			if (resetError) throw resetError;
			setIsSuccess(true);
		} catch (err) {
			setError(err.message || "Error al solicitar la recuperación.");
		} finally {
			setIsLoading(false);
		}
	};
	if (isSuccess) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-xl text-center animate-in fade-in slide-in-from-bottom-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold mb-3",
					children: "Revisa tu correo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground mb-8",
					children: [
						"Si ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: email
						}),
						" está registrado, te hemos enviado un enlace para restablecer tu contraseña."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/login" }),
					className: "w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]",
					children: "Volver al Login"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex items-center gap-2 font-bold mb-8 hover:opacity-80 transition-opacity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alex IA" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold tracking-tight",
							children: "Recuperar contraseña"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Ingresa tu correo y te enviaremos un enlace mágico para crear una nueva clave."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-2 block text-sm font-medium text-foreground",
							children: "Correo electrónico"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "ejemplo@correo.com",
								className: "w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
							})]
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive animate-in fade-in",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isLoading,
							className: "mt-6 w-full flex justify-center items-center gap-2 rounded-xl bg-foreground px-4 py-3 font-bold text-background shadow-md transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : "Enviar enlace de recuperación"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Volver al inicio de sesión"]
					})
				})
			]
		})
	});
}
//#endregion
export { RecuperarClavePage as component };
