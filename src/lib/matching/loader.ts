import type { SupabaseClient } from '@supabase/supabase-js';
import { CareerProfile, VariableCode } from './types';

/**
 * Carga el catálogo de carreras con sus 38 variables desde Supabase (versión version = 'ADN_V1').
 */
export async function loadCareersFromSupabase(
  supabase: SupabaseClient,
  adnVersion = 'ADN_V1'
): Promise<CareerProfile[]> {
  // 1. Obtener carreras activas
  const { data: careers, error: cErr } = await supabase
    .from('careers')
    .select('id, name, slug, area, is_gold_set')
    .eq('status', 'active')
    .order('name');

  if (cErr) throw cErr;
  if (!careers || careers.length === 0) return [];

  // 2. Obtener los 5,016 puntajes de ADN_V1 junto con el código de la variable usando paginación
  let adnRows: any[] = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data: chunk, error: adnErr } = await supabase
      .from('career_adn')
      .select('career_id, score, vocational_variables(code)')
      .eq('version', adnVersion)
      .range(from, from + pageSize - 1);

    if (adnErr) throw adnErr;
    adnRows = adnRows.concat(chunk || []);
    if (!chunk || chunk.length < pageSize) break;
    from += pageSize;
  }

  // 3. Agrupar puntajes por carrera
  const scoresByCareer = new Map<string, Record<VariableCode, number>>();
  for (const row of adnRows || []) {
    const cid = row.career_id;
    const vCode = (row.vocational_variables as { code: string } | null)?.code as VariableCode;
    const score = row.score;

    if (!scoresByCareer.has(cid)) {
      scoresByCareer.set(cid, {} as Record<VariableCode, number>);
    }
    if (vCode) {
      scoresByCareer.get(cid)![vCode] = score;
    }
  }

  // 4. Mapear a CareerProfile
  const profiles: CareerProfile[] = careers
    .map((c) => {
      const scores = scoresByCareer.get(c.id);
      if (!scores) return null;
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        area: c.area,
        is_gold_set: c.is_gold_set,
        scores,
      };
    })
    .filter((p): p is CareerProfile => p !== null);

  return profiles;
}
