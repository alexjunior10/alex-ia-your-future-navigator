import { t as supabase } from "./client-C7mgT9XD.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/examen-DXI9VJhe.js
var $$splitComponentImporter = () => import("./examen-g7IMWLZY.mjs");
var Route = createFileRoute("/examen")({
	head: () => ({ meta: [{ title: "Examen Tipo Admisión — Alex IA" }] }),
	loader: async () => {
		const [careersRes, examsRes] = await Promise.all([supabase.from("careers").select("slug, name, universities").order("name"), supabase.from("admission_exams").select("*")]);
		if (careersRes.error) throw careersRes.error;
		if (examsRes.error) throw examsRes.error;
		const examsMap = /* @__PURE__ */ new Map();
		examsRes.data.forEach((row) => {
			if (!examsMap.has(row.career_slug)) examsMap.set(row.career_slug, []);
			examsMap.get(row.career_slug).push({
				q: row.q,
				opts: row.opts,
				answer: row.answer,
				area: row.area
			});
		});
		return {
			careers: careersRes.data,
			admissionExams: Object.fromEntries(examsMap)
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
