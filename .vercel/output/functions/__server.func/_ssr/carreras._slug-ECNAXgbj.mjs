import { t as supabase } from "./client-C7mgT9XD.mjs";
import { f as lazyRouteComponent, j as notFound, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/carreras._slug-ECNAXgbj.js
var $$splitNotFoundComponentImporter = () => import("./carreras._slug-CIqmZlod.mjs");
var $$splitComponentImporter = () => import("./carreras._slug-ZuaSBiU2.mjs");
var Route = createFileRoute("/carreras/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	loader: async ({ params }) => {
		const { data: career, error } = await supabase.from("careers").select("*, branches:career_branches(*)").eq("slug", params.slug).single();
		if (error || !career) throw notFound();
		return career;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.name} — Alex IA` }, {
		name: "description",
		content: loaderData.description
	}] : [{ title: "Carrera — Alex IA" }] })
});
//#endregion
export { Route as t };
