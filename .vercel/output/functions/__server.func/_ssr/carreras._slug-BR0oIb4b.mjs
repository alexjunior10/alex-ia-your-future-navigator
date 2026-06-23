import { f as lazyRouteComponent, j as notFound, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as careers } from "./mock-data-cwiuQowp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/carreras._slug-BR0oIb4b.js
var $$splitNotFoundComponentImporter = () => import("./carreras._slug-CIqmZlod.mjs");
var $$splitComponentImporter = () => import("./carreras._slug-DL7o-swG.mjs");
var Route = createFileRoute("/carreras/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	loader: ({ params }) => {
		const c = careers.find((x) => x.slug === params.slug);
		if (!c) throw notFound();
		return c;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — Alex IA` }, {
		name: "description",
		content: loaderData.description
	}] : [{ title: "Carrera — Alex IA" }] })
});
//#endregion
export { Route as t };
