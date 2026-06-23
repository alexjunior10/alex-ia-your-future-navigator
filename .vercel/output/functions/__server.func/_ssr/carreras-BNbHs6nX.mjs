import { r as __toESM } from "../_runtime.mjs";
import { n as careers } from "./mock-data-cwiuQowp.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Search, w as Clock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/carreras-BNbHs6nX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var areas = [
	"Todas",
	"Ingeniería",
	"Salud",
	"Negocios",
	"Arte",
	"Ciencias Sociales",
	"Tecnología"
];
function CareersPage() {
	const [area, setArea] = (0, import_react.useState)("Todas");
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = careers.filter((c) => (area === "Todas" || c.area === area) && c.name.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold tracking-tight sm:text-4xl",
				children: "Explora carreras"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Filtra por área y descubre qué carreras se ajustan a ti."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-col gap-3 sm:flex-row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Buscar carrera...",
						className: "h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: areas.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setArea(a),
					className: `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${area === a ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
					children: a
				}, a))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/carreras/$slug",
					params: { slug: c.slug },
					className: "group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground",
								children: c.area
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-accent px-2 py-1 bg-accent/10 rounded-lg",
								children: [c.employability, " Demanda"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-xl font-bold",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-2 text-sm text-muted-foreground flex-1",
							children: c.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 pt-5 border-t border-border grid grid-cols-2 gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mb-1",
								children: "Salario aprox."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: c.salary
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mb-1",
								children: "Duración"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
									" ",
									c.duration
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 text-xs text-muted-foreground bg-muted/50 p-3 rounded-xl line-clamp-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Puestos:" }),
								" ",
								c.fields.join(", ")
							]
						})
					]
				}, c.slug))
			})
		]
	});
}
//#endregion
export { CareersPage as component };
