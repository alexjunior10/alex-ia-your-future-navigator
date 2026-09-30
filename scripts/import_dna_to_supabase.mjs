import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Load .env
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

const supabaseUrl = env.VITE_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY;

if (!env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('⚠️  AVISO: No se encontró SUPABASE_SERVICE_ROLE_KEY en .env.');
  console.log('Se utilizará la ANON_KEY actual para intentar la operación.');
  console.log('Nota: Si las tablas aún no han sido creadas en Supabase, debes ejecutar el script SQL:');
  console.log('  supabase/migrations/20260926_vocational_dna_v1.sql');
  console.log('en el SQL Editor del panel de Supabase.\n');
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false }
});

const data = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));

async function importData() {
  console.log('1. Verificando tabla vocational_variables...');
  const { data: testVar, error: varCheckErr } = await supabase.from('vocational_variables').select('id').limit(1);
  if (varCheckErr) {
    console.error('❌ Error al acceder a vocational_variables:', varCheckErr.message);
    console.log('\n👉 POR FAVOR EJECUTA LA MIGRACIÓN EN EL SQL EDITOR DE SUPABASE:');
    console.log('   Archivo: supabase/migrations/20260926_vocational_dna_v1.sql');
    return;
  }
  console.log('✓ Tabla vocational_variables detectada.');

  console.log('2. Insertando/actualizando 38 variables vocacionales...');
  const { error: upsertVarErr } = await supabase.from('vocational_variables').upsert(
    data.variables.map(v => ({
      code: v.code,
      dimension: v.dimension,
      name: v.name,
      sort_order: v.sort_order
    })),
    { onConflict: 'code' }
  );
  if (upsertVarErr) {
    console.error('Error insertando variables:', upsertVarErr);
    return;
  }
  console.log('✓ 38 variables vocacionales sincronizadas.');

  console.log('3. Sincronizando carreras...');
  const careersPayload = data.careers.map(c => ({
    slug: c.slug,
    name: c.name,
    is_gold_set: c.is_gold_set,
    status: 'active'
  }));
  const { error: careersErr } = await supabase.from('careers').upsert(careersPayload, { onConflict: 'slug' });
  if (careersErr) {
    console.error('Error insertando carreras:', careersErr);
    return;
  }
  console.log(`✓ ${data.careers.length} carreras sincronizadas.`);

  // Fetch variable IDs and career IDs
  const { data: dbVars } = await supabase.from('vocational_variables').select('id, code');
  const { data: dbCareers } = await supabase.from('careers').select('id, slug');

  const varMap = new Map(dbVars.map(v => [v.code, v.id]));
  const careerMap = new Map(dbCareers.map(c => [c.slug, c.id]));

  console.log('4. Insertando 5,016 registros de ADN Vocacional (versión ADN_V1)...');
  const adnPayload = data.adnRecords.map(r => ({
    career_id: careerMap.get(r.career_slug),
    variable_id: varMap.get(r.variable_code),
    score: r.score,
    version: r.version,
    is_gold_set: r.is_gold_set,
    source: data.source
  })).filter(r => r.career_id && r.variable_id);

  console.log(`Total registros listos para insertar: ${adnPayload.length}`);

  // Insert in batches of 500
  const batchSize = 500;
  for (let i = 0; i < adnPayload.length; i += batchSize) {
    const batch = adnPayload.slice(i, i + batchSize);
    const { error: batchErr } = await supabase.from('career_adn').upsert(batch, {
      onConflict: 'career_id,variable_id,version'
    });
    if (batchErr) {
      console.error(`Error en lote ${i} - ${i + batch.length}:`, batchErr);
      return;
    }
    console.log(`  Progreso: ${Math.min(i + batchSize, adnPayload.length)} / ${adnPayload.length} registros insertados.`);
  }

  console.log('\n🎉 ¡IMPORTACIÓN COMPLETADA EXITOSAMENTE EN SUPABASE!');
}

importData();
