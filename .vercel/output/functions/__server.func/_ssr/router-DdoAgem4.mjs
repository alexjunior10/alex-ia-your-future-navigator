import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowRight, S as Instagram, g as LogOut, j as CircleCheck, k as CircleUser, l as Sparkles, n as X, t as Youtube, y as Linkedin } from "../_libs/lucide-react.mjs";
import { t as Route$16 } from "./carreras._slug-BR0oIb4b.mjs";
import { n as useAuth, t as AuthProvider } from "./use-auth-CKsLygXF.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DdoAgem4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C5skssKR.css";
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
var allItems = [
	{
		to: "/test",
		label: "Test Vocacional",
		isProtected: true
	},
	{
		to: "/carreras",
		label: "Carreras",
		isProtected: false
	},
	{
		to: "/coach",
		label: "Coach IA",
		isProtected: false
	},
	{
		to: "/examen",
		label: "Simulador",
		isProtected: true
	},
	{
		to: "/padres",
		label: "Para Padres",
		isProtected: true
	},
	{
		to: "/colegios",
		label: "Para Colegios",
		isProtected: true
	}
];
function SiteHeader() {
	const { role, logout, showAuthModal, setShowAuthModal } = useAuth();
	useNavigate();
	const handleLinkClick = (e, item) => {
		if (item.isProtected && !role) {
			e.preventDefault();
			setShowAuthModal(true);
		}
	};
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: allItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						onClick: (e) => handleLinkClick(e, item),
						className: "rounded-full px-3 py-2 text-[13px] font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
						activeProps: { className: "rounded-full px-3 py-2 text-[13px] bg-muted text-foreground font-bold shadow-sm" },
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
	const { role, setShowAuthModal } = useAuth();
	const handleLinkClick = (e, isProtected) => {
		if (isProtected && !role) {
			e.preventDefault();
			setShowAuthModal(true);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border/60 bg-background relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border/60 bg-muted/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold tracking-tight mb-4 text-foreground",
						children: "¿Y si tu carrera ideal aún no la has descubierto?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto",
						children: "Miles de estudiantes ya comenzaron a explorar su futuro con Alex IA."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/test",
						onClick: (e) => handleLinkClick(e, true),
						className: "inline-flex justify-center items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105",
						children: ["Realizar Test ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-bold mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
									children: "Alex IA"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm text-sm text-muted-foreground leading-relaxed",
								children: "Transformando decisiones de vida con Inteligencia Artificial. No te diremos qué estudiar, te ayudaremos a descubrir quién puedes llegar a ser."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex gap-4 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										"aria-label": "Instagram",
										className: "hover:text-primary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										"aria-label": "LinkedIn",
										className: "hover:text-primary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										"aria-label": "YouTube",
										className: "hover:text-primary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, { className: "h-5 w-5" })
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-bold text-foreground tracking-wider uppercase mb-6",
						children: "Producto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-4 text-sm font-medium text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/test",
								onClick: (e) => handleLinkClick(e, true),
								className: "hover:text-primary transition-colors",
								children: "Test Vocacional"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/carreras",
								onClick: (e) => handleLinkClick(e, false),
								className: "hover:text-primary transition-colors",
								children: "Carreras"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/coach",
								onClick: (e) => handleLinkClick(e, false),
								className: "hover:text-primary transition-colors",
								children: "Coach IA"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/examen",
								onClick: (e) => handleLinkClick(e, true),
								className: "hover:text-primary transition-colors",
								children: "Simulador"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-bold text-foreground tracking-wider uppercase mb-6",
						children: "Compañía"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-4 text-sm font-medium text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-primary transition-colors",
								children: "Nosotros"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/padres",
								onClick: (e) => handleLinkClick(e, true),
								className: "hover:text-primary transition-colors",
								children: "Para Padres"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/colegios",
								onClick: (e) => handleLinkClick(e, true),
								className: "hover:text-primary transition-colors",
								children: "Para Colegios"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-primary transition-colors",
								children: "Privacidad"
							}) })
						]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground font-medium",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Alex IA · Hecho en Perú"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground/60 max-w-lg text-center md:text-right",
					children: "Alex IA es una plataforma de autoconocimiento, no reemplaza la evaluación de un profesional certificado."
				})]
			})]
		})]
	});
}
function GlobalAuthModal() {
	const { showAuthModal, setShowAuthModal } = useAuth();
	const navigate = useNavigate();
	if (!showAuthModal) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl animate-in zoom-in-95 duration-300 mx-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowAuthModal(false),
					className: "absolute right-6 top-6 rounded-full bg-muted/50 p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
					"aria-label": "Cerrar modal",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-6 mt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-7 w-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold tracking-tight",
							children: "🚀 Descubre tu futuro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Para acceder a esta sección crea tu cuenta gratuita."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 mb-8 bg-muted/50 p-5 rounded-2xl",
					children: [
						"Test vocacional completo.",
						"Carreras y especialidades.",
						"Coach IA personalizado.",
						"Simulador de admisión."
					].map((benefit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-sm font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary" }),
							" ",
							benefit
						]
					}, benefit))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setShowAuthModal(false);
							navigate({ to: "/login" });
						},
						className: "w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02] shadow-md hover:shadow-lg",
						children: "Crear cuenta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setShowAuthModal(false);
							navigate({ to: "/login" });
						},
						className: "w-full rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted",
						children: "Ya tengo cuenta"
					})]
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
var Route$15 = createRootRouteWithContext()({
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
	const { queryClient } = Route$15.useRouteContext();
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalAuthModal, {})
			]
		}) })
	});
}
var $$splitComponentImporter$14 = () => import("./test-CA5_sgn8.mjs");
var Route$14 = createFileRoute("/test")({
	head: () => ({ meta: [{ title: "Test Vocacional — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./resultados-DF_Wkbfo.mjs");
var Route$13 = createFileRoute("/resultados")({
	head: () => ({ meta: [{ title: "Tu ADN Profesional — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./recuperar-clave-BSl6HSxt.mjs");
var Route$12 = createFileRoute("/recuperar-clave")({
	head: () => ({ meta: [{ title: "Recuperar Contraseña — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./privacidad-DhNOwGoR.mjs");
var Route$11 = createFileRoute("/privacidad")({
	head: () => ({ meta: [{ title: "Política de Privacidad — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./padres-B0p6Ivc7.mjs");
var Route$10 = createFileRoute("/padres")({
	head: () => ({ meta: [{ title: "Portal para Padres — Alex IA" }, {
		name: "description",
		content: "Acompaña el futuro vocacional de tu hijo con Alex IA."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./login-BCVMxH1J.mjs");
var Route$9 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Iniciar Sesión — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./examen-BWMWZEnP.mjs");
var Route$8 = createFileRoute("/examen")({
	head: () => ({ meta: [{ title: "Examen Tipo Admisión — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./colegios-CiX-QAh5.mjs");
var Route$7 = createFileRoute("/colegios")({
	head: () => ({ meta: [{ title: "Para Colegios — Alex IA" }, {
		name: "description",
		content: "Orientación vocacional escalable para todos tus estudiantes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./coach-DPH6AZx1.mjs");
var Route$6 = createFileRoute("/coach")({
	head: () => ({ meta: [{ title: "Alex IA Coach" }, {
		name: "description",
		content: "Conversa con Alex IA Coach sobre tus dudas vocacionales."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./carreras-BNbHs6nX.mjs");
var Route$5 = createFileRoute("/carreras")({
	head: () => ({ meta: [{ title: "Explorar Carreras — Alex IA" }, {
		name: "description",
		content: "Explora carreras universitarias, salarios, demanda y mallas curriculares."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./bienvenida-Bvu4U4XG.mjs");
var Route$4 = createFileRoute("/bienvenida")({
	head: () => ({ meta: [{ title: "Bienvenido — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./actualizar-clave-Bak3XxiE.mjs");
var Route$3 = createFileRoute("/actualizar-clave")({
	head: () => ({ meta: [{ title: "Actualizar Contraseña — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./routes-DEW8FDqd.mjs");
var Route$2 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./registro.padre-zW_RI4xJ.mjs");
var Route$1 = createFileRoute("/registro/padre")({
	head: () => ({ meta: [{ title: "Registro Padres — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./registro.estudiante-BCzvnv3g.mjs");
var Route = createFileRoute("/registro/estudiante")({
	head: () => ({ meta: [{ title: "Registro Estudiante — Alex IA" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TestRoute = Route$14.update({
	id: "/test",
	path: "/test",
	getParentRoute: () => Route$15
});
var ResultadosRoute = Route$13.update({
	id: "/resultados",
	path: "/resultados",
	getParentRoute: () => Route$15
});
var RecuperarClaveRoute = Route$12.update({
	id: "/recuperar-clave",
	path: "/recuperar-clave",
	getParentRoute: () => Route$15
});
var PrivacidadRoute = Route$11.update({
	id: "/privacidad",
	path: "/privacidad",
	getParentRoute: () => Route$15
});
var PadresRoute = Route$10.update({
	id: "/padres",
	path: "/padres",
	getParentRoute: () => Route$15
});
var LoginRoute = Route$9.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$15
});
var ExamenRoute = Route$8.update({
	id: "/examen",
	path: "/examen",
	getParentRoute: () => Route$15
});
var ColegiosRoute = Route$7.update({
	id: "/colegios",
	path: "/colegios",
	getParentRoute: () => Route$15
});
var CoachRoute = Route$6.update({
	id: "/coach",
	path: "/coach",
	getParentRoute: () => Route$15
});
var CarrerasRoute = Route$5.update({
	id: "/carreras",
	path: "/carreras",
	getParentRoute: () => Route$15
});
var BienvenidaRoute = Route$4.update({
	id: "/bienvenida",
	path: "/bienvenida",
	getParentRoute: () => Route$15
});
var ActualizarClaveRoute = Route$3.update({
	id: "/actualizar-clave",
	path: "/actualizar-clave",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var RegistroPadreRoute = Route$1.update({
	id: "/registro/padre",
	path: "/registro/padre",
	getParentRoute: () => Route$15
});
var RegistroEstudianteRoute = Route.update({
	id: "/registro/estudiante",
	path: "/registro/estudiante",
	getParentRoute: () => Route$15
});
var CarrerasRouteChildren = { CarrerasSlugRoute: Route$16.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => CarrerasRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	ActualizarClaveRoute,
	BienvenidaRoute,
	CarrerasRoute: CarrerasRoute._addFileChildren(CarrerasRouteChildren),
	CoachRoute,
	ColegiosRoute,
	ExamenRoute,
	LoginRoute,
	PadresRoute,
	PrivacidadRoute,
	RecuperarClaveRoute,
	ResultadosRoute,
	TestRoute,
	RegistroEstudianteRoute,
	RegistroPadreRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
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
