import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as LogOut, f as Linkedin, m as Instagram, s as Sparkles, t as Youtube, x as CircleUser } from "../_libs/lucide-react.mjs";
import { t as Route$11 } from "./carreras._slug-BR0oIb4b.mjs";
import { n as useAuth, t as AuthProvider } from "./use-auth-BDmG_A7B.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D9pZfF8g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-WRT2iygZ.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var studentItems = [
	{
		to: "/test",
		label: "Test Vocacional"
	},
	{
		to: "/carreras",
		label: "Carreras"
	},
	{
		to: "/coach",
		label: "Coach IA"
	},
	{
		to: "/examen",
		label: "Simulador Admisión"
	}
];
var parentItems = [{
	to: "/padres",
	label: "Para Padres"
}];
var schoolItems = [{
	to: "/colegios",
	label: "Para Colegios"
}];
function SiteHeader() {
	const { role, logout } = useAuth();
	let navItems = [];
	if (role === "student") navItems = studentItems;
	if (role === "parent") navItems = parentItems;
	if (role === "school") navItems = schoolItems;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 font-bold group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105 group-hover:-rotate-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
						children: "Alex IA"
					})]
				}),
				role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
						activeProps: { className: "rounded-full px-4 py-2 text-sm bg-muted text-foreground font-semibold shadow-sm" },
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-4",
					children: !role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-105 hover:shadow-lg hover:bg-primary/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleUser, { className: "h-4 w-4" }), " Ingresar"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-muted-foreground capitalize hidden sm:inline-block",
							children: ["Perfil: ", role === "student" ? "Estudiante" : role === "parent" ? "Padre" : "Colegio"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: logout,
							className: "inline-flex items-center justify-center rounded-full border border-border bg-card p-2 text-muted-foreground shadow-sm transition-all hover:bg-destructive hover:text-destructive-foreground hover:border-destructive",
							title: "Cerrar sesión",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
						})]
					})
				})
			]
		})
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t border-border/60 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: "Alex IA"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-sm text-sm text-muted-foreground",
									children: "Transformando decisiones de vida con Inteligencia Artificial."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex gap-3 text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#",
											"aria-label": "Instagram",
											className: "hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#",
											"aria-label": "LinkedIn",
											className: "hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#",
											"aria-label": "YouTube",
											className: "hover:text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "h-5 w-5" })
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "Producto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/test",
									className: "hover:text-foreground transition-colors",
									children: "Test Vocacional"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/carreras",
									className: "hover:text-foreground transition-colors",
									children: "Carreras"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/coach",
									className: "hover:text-foreground transition-colors",
									children: "Coach IA"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold text-foreground",
							children: "Compañía"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/padres",
									className: "hover:text-foreground transition-colors",
									children: "Para Padres"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/colegios",
									className: "hover:text-foreground transition-colors",
									children: "Para Colegios"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/privacidad",
									className: "hover:text-foreground transition-colors",
									children: "Política de Privacidad"
								}) })
							]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: "Aviso importante:"
					}), " Alex IA es una herramienta de orientación y autoconocimiento. No constituye un diagnóstico psicológico ni reemplaza la evaluación de un psicólogo u orientador vocacional certificado. Los porcentajes de afinidad son estimaciones referenciales basadas en tus respuestas, no mediciones exactas de habilidad o éxito futuro."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Alex IA · Hecho en Perú"
					]
				})
			]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col font-sans",
			style: { fontFamily: "\"Plus Jakarta Sans\", system-ui, sans-serif" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		}) })
	});
}
var $$splitComponentImporter$9 = () => import("./test-CTPyxu-j.mjs");
var Route$9 = createFileRoute("/test")({
	head: () => ({ meta: [{ title: "Test Vocacional — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./resultados-Cnou2YAJ.mjs");
var Route$8 = createFileRoute("/resultados")({
	head: () => ({ meta: [{ title: "Tus Resultados Narrativos — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./privacidad-DhNOwGoR.mjs");
var Route$7 = createFileRoute("/privacidad")({
	head: () => ({ meta: [{ title: "Política de Privacidad — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./padres-B0p6Ivc7.mjs");
var Route$6 = createFileRoute("/padres")({
	head: () => ({ meta: [{ title: "Portal para Padres — Alex IA" }, {
		name: "description",
		content: "Acompaña el futuro vocacional de tu hijo con Alex IA."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./login-Ci0IdKwk.mjs");
var Route$5 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Iniciar Sesión — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./examen-DACp-FVN.mjs");
var Route$4 = createFileRoute("/examen")({
	head: () => ({ meta: [{ title: "Examen Tipo Admisión — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./colegios-CiX-QAh5.mjs");
var Route$3 = createFileRoute("/colegios")({
	head: () => ({ meta: [{ title: "Para Colegios — Alex IA" }, {
		name: "description",
		content: "Orientación vocacional escalable para todos tus estudiantes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./coach-DPH6AZx1.mjs");
var Route$2 = createFileRoute("/coach")({
	head: () => ({ meta: [{ title: "Alex IA Coach" }, {
		name: "description",
		content: "Conversa con Alex IA Coach sobre tus dudas vocacionales."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./carreras-BNbHs6nX.mjs");
var Route$1 = createFileRoute("/carreras")({
	head: () => ({ meta: [{ title: "Explorar Carreras — Alex IA" }, {
		name: "description",
		content: "Explora carreras universitarias, salarios, demanda y mallas curriculares."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-D_hjx1Sr.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Alex IA — Descubre la carrera ideal para ti" },
		{
			name: "description",
			content: "Plataforma de orientación vocacional con IA para estudiantes de secundaria en Perú."
		},
		{
			property: "og:title",
			content: "Alex IA — Orientación vocacional con IA"
		},
		{
			property: "og:description",
			content: "Descubre carreras compatibles con tu personalidad, intereses y habilidades."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TestRoute = Route$9.update({
	id: "/test",
	path: "/test",
	getParentRoute: () => Route$10
});
var ResultadosRoute = Route$8.update({
	id: "/resultados",
	path: "/resultados",
	getParentRoute: () => Route$10
});
var PrivacidadRoute = Route$7.update({
	id: "/privacidad",
	path: "/privacidad",
	getParentRoute: () => Route$10
});
var PadresRoute = Route$6.update({
	id: "/padres",
	path: "/padres",
	getParentRoute: () => Route$10
});
var LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$10
});
var ExamenRoute = Route$4.update({
	id: "/examen",
	path: "/examen",
	getParentRoute: () => Route$10
});
var ColegiosRoute = Route$3.update({
	id: "/colegios",
	path: "/colegios",
	getParentRoute: () => Route$10
});
var CoachRoute = Route$2.update({
	id: "/coach",
	path: "/coach",
	getParentRoute: () => Route$10
});
var CarrerasRoute = Route$1.update({
	id: "/carreras",
	path: "/carreras",
	getParentRoute: () => Route$10
});
var IndexRoute = Route.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var CarrerasRouteChildren = { CarrerasSlugRoute: Route$11.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => CarrerasRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	CarrerasRoute: CarrerasRoute._addFileChildren(CarrerasRouteChildren),
	CoachRoute,
	ColegiosRoute,
	ExamenRoute,
	LoginRoute,
	PadresRoute,
	PrivacidadRoute,
	ResultadosRoute,
	TestRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
