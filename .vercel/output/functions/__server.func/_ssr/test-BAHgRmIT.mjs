import { t as supabase } from "./client-C7mgT9XD.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/test-BAHgRmIT.js
var $$splitComponentImporter = () => import("./test-6u9yUUlZ.mjs");
var Route = createFileRoute("/test")({
	head: () => ({ meta: [{ title: "Test Vocacional — Alex IA" }] }),
	loader: async () => {
		const { data, error } = await supabase.from("test_questions").select("*");
		if (error) throw error;
		const dimensionsMap = /* @__PURE__ */ new Map();
		data.forEach((row) => {
			if (!dimensionsMap.has(row.dimension_id)) dimensionsMap.set(row.dimension_id, {
				id: row.dimension_id,
				title: row.dimension_title,
				subtitle: row.dimension_subtitle,
				type: row.dimension_type,
				questions: []
			});
			const dim = dimensionsMap.get(row.dimension_id);
			if (row.dimension_type === "slider") dim.questions.push({
				q: row.q,
				left: row.left_label,
				right: row.right_label
			});
			else if (row.dimension_type === "scenario") dim.questions.push({
				q: row.q,
				scenario: row.scenario,
				options: row.opts
			});
			else dim.questions.push({
				q: row.q,
				opts: row.opts
			});
		});
		return Array.from(dimensionsMap.values());
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
