import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envConfig = fs.readFileSync('.env', 'utf-8');
const env = {};
for (const line of envConfig.split('\n')) {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    if (key) env[key] = val;
  }
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function verifyDb() {
  console.log('=== VERIFICANDO BASE DE DATOS EN SUPABASE ===');

  const { count: varCount, error: varErr } = await supabase
    .from('vocational_variables')
    .select('*', { count: 'exact', head: true });
  console.log(`- Variables vocacionales: ${varCount} (Error: ${varErr?.message || 'ninguno'})`);

  const { count: careerCount, error: carErr } = await supabase
    .from('careers')
    .select('*', { count: 'exact', head: true });
  console.log(`- Carreras totales en DB: ${careerCount} (Error: ${carErr?.message || 'ninguno'})`);

  const { count: goldCount } = await supabase
    .from('careers')
    .select('*', { count: 'exact', head: true })
    .eq('is_gold_set', true);
  console.log(`- Carreras Gold Set: ${goldCount}`);

  const { count: adnCount, error: adnErr } = await supabase
    .from('career_adn')
    .select('*', { count: 'exact', head: true })
    .eq('version', 'ADN_V1');
  console.log(`- Registros de ADN (versión ADN_V1): ${adnCount} (Error: ${adnErr?.message || 'ninguno'})`);

  // Sample check for a Gold Set career (e.g. Medicina)
  const { data: medCareer } = await supabase
    .from('careers')
    .select('id, name, slug, is_gold_set, area')
    .eq('slug', 'medicina')
    .single();
  console.log('\nMuestra carrera Medicina:', medCareer);

  if (medCareer) {
    const { data: medAdn } = await supabase
      .from('career_adn')
      .select('score, vocational_variables(code, name, dimension)')
      .eq('career_id', medCareer.id)
      .eq('version', 'ADN_V1')
      .limit(5);
    console.log('Muestra ADN de Medicina (primeros 5):', JSON.stringify(medAdn, null, 2));
  }
}

verifyDb();
