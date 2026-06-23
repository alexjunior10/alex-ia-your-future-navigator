import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/carreras._slug-CIqmZlod.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mx-auto max-w-2xl px-4 py-20 text-center",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-bold",
		children: "Carrera no encontrada"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/carreras",
		className: "mt-4 inline-block text-primary hover:underline",
		children: "← Volver a carreras"
	})]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
