import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as ChartColumn, j as CircleCheck, r as Users, z as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/colegios-CiX-QAh5.js
var import_jsx_runtime = require_jsx_runtime();
function ColegiosPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 text-primary-foreground shadow-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-extrabold sm:text-4xl",
					children: "Orientación vocacional escalable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-primary-foreground/90",
					children: "Acompaña a cada estudiante con datos, reportes y herramientas modernas. Ideal para colegios que quieren elevar su propuesta de tutoría."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					{
						icon: Users,
						label: "Estudiantes activos",
						value: "351"
					},
					{
						icon: BookOpen,
						label: "Tests completados",
						value: "264"
					},
					{
						icon: ChartColumn,
						label: "Promedio afinidad",
						value: "84%"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-2xl font-extrabold",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: "Progreso por grado (ejemplo)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-4",
					children: [
						{
							grade: "3ro Secundaria",
							students: 124,
							progress: 78
						},
						{
							grade: "4to Secundaria",
							students: 118,
							progress: 62
						},
						{
							grade: "5to Secundaria",
							students: 109,
							progress: 91
						}
					].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: g.grade
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								g.progress,
								"% · ",
								g.students,
								" estudiantes"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 h-2 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-gradient-to-r from-primary to-secondary",
							style: { width: `${g.progress}%` }
						})
					})] }, g.grade))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-card p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold",
						children: "Lo que ofrecemos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: [
							"Test vocacional con IA para cada estudiante",
							"Reportes agregados por aula y grado",
							"Capacitación a tutores y orientadores",
							"Dashboard institucional en tiempo real"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary" }),
								" ",
								f
							]
						}, f))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-gradient-to-br from-accent/30 to-secondary/20 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold",
							children: "¿Quieres una demo?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Conversemos sobre cómo Alex IA puede integrarse en tu programa de tutoría."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:hola@alexia.pe",
							className: "mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:scale-105 transition-transform",
							children: "Solicitar demo"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { ColegiosPage as component };
