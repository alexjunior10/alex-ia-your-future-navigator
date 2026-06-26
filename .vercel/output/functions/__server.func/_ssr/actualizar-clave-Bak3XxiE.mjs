import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C7mgT9XD.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowRight, j as CircleCheck, v as LoaderCircle, x as KeyRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actualizar-clave-Bak3XxiE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActualizarClavePage() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		try {
			const { error: updateError } = await supabase.auth.updateUser({ password });
			if (updateError) throw updateError;
			setIsSuccess(true);
		} catch (err) {
			setError(err.message || "Error al actualizar la contraseña.");
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
					className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500/10 text-green-500 mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold mb-3",
					children: "¡Contraseña actualizada!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-8",
					children: "Tu contraseña se ha cambiado con éxito. Ya puedes ingresar a tu cuenta de Alex IA."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/login" }),
					className: "w-full flex justify-center items-center gap-2 rounded-xl bg-foreground px-4 py-3 font-bold text-background shadow-md transition-transform hover:scale-[1.02]",
					children: ["Ir al Login ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl bg-card border border-border p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Crea una nueva contraseña"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Por seguridad, asegúrate de que tenga al menos 6 caracteres."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-sm font-medium text-foreground",
						children: "Nueva Contraseña"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						required: true,
						minLength: 6,
						value: password,
						onChange: (e) => setPassword(e.target.value),
						placeholder: "••••••••",
						className: "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
					})] }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl bg-destructive/10 p-3 text-sm font-semibold text-destructive animate-in fade-in",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: isLoading,
						className: "mt-6 w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : "Guardar contraseña"
					})
				]
			})]
		})
	});
}
//#endregion
export { ActualizarClavePage as component };
