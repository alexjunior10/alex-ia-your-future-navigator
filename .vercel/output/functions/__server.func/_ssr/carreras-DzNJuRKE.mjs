import { t as supabase } from "./client-C7mgT9XD.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/carreras-DzNJuRKE.js
var $$splitComponentImporter = () => import("./carreras-CFDSbuBK.mjs");
var Route = createFileRoute("/carreras")({
	head: () => ({ meta: [{ title: "Explorar Carreras — Alex IA" }, {
		name: "description",
		content: "Explora carreras universitarias, salarios, demanda y mallas curriculares."
	}] }),
	loader: async () => {
		const { data, error } = await supabase.from("careers").select("*").order("name");
		if (error) throw error;
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
