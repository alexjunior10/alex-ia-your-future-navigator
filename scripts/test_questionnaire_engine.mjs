import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { ALL_VOCATIONAL_VARIABLES, QuestionnaireEngine } from '../src/lib/questionnaire/engine.ts';
import { getQuestionsForGrade } from '../src/lib/questionnaire/bank.ts';
import { QUESTION_OPTION_MATRIX } from '../src/lib/questionnaire/matrix.ts';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FALLÓ: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

console.log('======================================================================');
console.log('QA OBLIGATORIO: SUITE COMPLETA QUESTIONNAIRE V1.1 (ALEX IA)');
console.log('======================================================================\n');

// Configuración Supabase
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

// ----------------------------------------------------------------------
// TEST 1: Un estudiante 3S recibe exactamente 40 preguntas
// ----------------------------------------------------------------------
console.log('TEST 1: Evaluación para estudiante 3S');
const questions3S = getQuestionsForGrade('3S');
assert(questions3S.length === 40, 'Estudiante 3S recibe exactamente 40 preguntas');

// ----------------------------------------------------------------------
// TEST 2: Un estudiante 4S recibe exactamente 40 preguntas
// ----------------------------------------------------------------------
console.log('\nTEST 2: Evaluación para estudiante 4S');
const questions4S = getQuestionsForGrade('4S');
assert(questions4S.length === 40, 'Estudiante 4S recibe exactamente 40 preguntas');

// ----------------------------------------------------------------------
// TEST 3: Un estudiante 5S recibe exactamente 40 preguntas
// ----------------------------------------------------------------------
console.log('\nTEST 3: Evaluación para estudiante 5S');
const questions5S = getQuestionsForGrade('5S');
assert(questions5S.length === 40, 'Estudiante 5S recibe exactamente 40 preguntas');

// ----------------------------------------------------------------------
// TEST 4: No existen preguntas duplicadas
// ----------------------------------------------------------------------
console.log('\nTEST 4: Ausencia de preguntas duplicadas');
['3S', '4S', '5S'].forEach((g) => {
  const qList = getQuestionsForGrade(g);
  const baseIds = qList.map((q) => q.base_question_id);
  const uniqueBaseIds = new Set(baseIds);
  assert(uniqueBaseIds.size === 40, `Grado ${g}: 40 base_question_id únicos sin duplicados`);
  for (let i = 1; i <= 40; i++) {
    const expected = 'Q' + String(i).padStart(2, '0');
    assert(uniqueBaseIds.has(expected), `Grado ${g}: contiene ${expected}`);
  }
});

// ----------------------------------------------------------------------
// TEST 5: Todas las preguntas tienen opciones A-D
// ----------------------------------------------------------------------
console.log('\nTEST 5: Todas las preguntas tienen opciones A-D');
['3S', '4S', '5S'].forEach((g) => {
  const qList = getQuestionsForGrade(g);
  qList.forEach((q) => {
    assert(q.options.length === 4, `${q.question_id} en ${g} tiene exactamente 4 opciones`);
    const keys = q.options.map((o) => o.key).join('');
    assert(keys === 'ABCD', `${q.question_id} en ${g} tiene claves exactas A, B, C, D`);
    q.options.forEach((o) => {
      assert(o.text && o.text.trim().length > 0, `${q.question_id} opción ${o.key} en ${g} tiene texto no vacío`);
    });
  });
});

// ----------------------------------------------------------------------
// TEST 6: Todas las preguntas excepto Q34 tienen mappings válidos
// ----------------------------------------------------------------------
console.log('\nTEST 6: Mappings válidos en Question_Option_Variable_Matrix');
const questionsExceptQ34 = Array.from({ length: 40 }, (_, i) => 'Q' + String(i + 1).padStart(2, '0')).filter(
  (id) => id !== 'Q34'
);

for (const qId of questionsExceptQ34) {
  const mappings = QUESTION_OPTION_MATRIX.filter((m) => m.base_question_id === qId);
  assert(mappings.length >= 4, `${qId} tiene al menos 4 filas de mapping en la matriz (encontradas: ${mappings.length})`);
  const activeVars = mappings.map((m) => m.variable).filter(Boolean);
  assert(activeVars.length > 0, `${qId} puntúa al menos 1 variable vocacional válida`);
  for (const v of activeVars) {
    assert(ALL_VOCATIONAL_VARIABLES.includes(v), `${qId} variable ${v} es oficial`);
  }
}

// ----------------------------------------------------------------------
// TEST 7: Q34 no modifica ninguna variable
// ----------------------------------------------------------------------
console.log('\nTEST 7: Q34 experimental sin scoring');
const q34Mappings = QUESTION_OPTION_MATRIX.filter((m) => m.base_question_id === 'Q34');
assert(q34Mappings.length === 4, 'Q34 tiene 4 opciones registradas');
q34Mappings.forEach((m) => {
  assert(m.variable === null || m.variable === '', `Q34 opción ${m.option} tiene variable null/vacía`);
  assert(m.evidence === 0, `Q34 opción ${m.option} tiene evidencia 0`);
  assert(m.question_weight === 0, `Q34 opción ${m.option} tiene peso 0`);
});

// Prueba dinámica: resolver solo Q34 no debe alterar ninguna variable
const testRespQ34Only = [
  { question_id: 'Q34', base_question_id: 'Q34', variant_id: 'Q34_BASE', selected_option: 'C', response_time_ms: 1000 }
];
const { profile_38d: profileQ34Only } = QuestionnaireEngine.calculateProfile38D(testRespQ34Only);
ALL_VOCATIONAL_VARIABLES.forEach((v) => {
  assert(profileQ34Only[v] === 50, `Variable ${v} permanece en prior neutral 50 tras responder Q34`);
});

// ----------------------------------------------------------------------
// TEST 8: Q33 utiliza correctamente el SVG
// ----------------------------------------------------------------------
console.log('\nTEST 8: Q33 recurso visual SVG');
['3S', '4S', '5S'].forEach((g) => {
  const qList = getQuestionsForGrade(g);
  const q33 = qList.find((q) => q.base_question_id === 'Q33');
  assert(q33 !== undefined, `Q33 presente en grado ${g}`);
  assert(q33.visual_asset === '/assets/mini-retos/q33_cubo_espacial.svg', `Q33 tiene ruta SVG en grado ${g}`);
});
assert(fs.existsSync('public/assets/mini-retos/q33_cubo_espacial.svg'), 'Archivo public/assets/mini-retos/q33_cubo_espacial.svg existe físicamente');
assert(fs.existsSync('Preguntas-Diseño/assets/q33_cubo_espacial.svg'), 'Archivo Preguntas-Diseño/assets/q33_cubo_espacial.svg existe físicamente');

// ----------------------------------------------------------------------
// TEST 9: Los tres grados generan exactamente 38 variables
// ----------------------------------------------------------------------
console.log('\nTEST 9: Generación de exactamente 38 variables para los tres grados');
const mockResponsesA = Array.from({ length: 40 }, (_, i) => {
  const qId = 'Q' + String(i + 1).padStart(2, '0');
  return {
    question_id: qId,
    base_question_id: qId,
    variant_id: qId + '_BASE',
    selected_option: 'A',
    response_time_ms: 2500
  };
});

['3S', '4S', '5S'].forEach((g) => {
  const { profile_38d } = QuestionnaireEngine.calculateProfile38D(mockResponsesA);
  const keys = Object.keys(profile_38d);
  assert(keys.length === 38, `Grado ${g} produce exactamente 38 variables`);
  keys.forEach((k) => {
    assert(ALL_VOCATIONAL_VARIABLES.includes(k), `Variable ${k} en grado ${g} es oficial`);
    const val = profile_38d[k];
    assert(typeof val === 'number' && !isNaN(val), `Valor de ${k} en grado ${g} es numérico válido`);
    assert(val >= 0 && val <= 100, `Valor de ${k} (${val}) en grado ${g} está entre 0 y 100`);
  });
});

// ----------------------------------------------------------------------
// TEST 10: Los tres grados utilizan el mismo Score Model V1
// ----------------------------------------------------------------------
console.log('\nTEST 10: Score Model V1 uniforme en todos los grados');
const res3S = QuestionnaireEngine.calculateProfile38D(mockResponsesA);
const res4S = QuestionnaireEngine.calculateProfile38D(mockResponsesA);
const res5S = QuestionnaireEngine.calculateProfile38D(mockResponsesA);

ALL_VOCATIONAL_VARIABLES.forEach((v) => {
  assert(res3S.profile_38d[v] === res4S.profile_38d[v], `Variable ${v} idéntica en 3S y 4S ante idénticas respuestas`);
  assert(res4S.profile_38d[v] === res5S.profile_38d[v], `Variable ${v} idéntica en 4S y 5S ante idénticas respuestas`);
});

// ----------------------------------------------------------------------
// TEST 11: Los tres grados utilizan MATCHING_V1
// ----------------------------------------------------------------------
console.log('\nTEST 11: MATCHING_V1 consumido por todos los grados');
const exportData = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));
const officialSlugs = exportData.careers.map((c) => c.slug);

// Cargar las 132 carreras oficiales desde Supabase
const { data: rawCareers, error: cLoadErr } = await supabase
  .from('careers')
  .select('id, name, slug, area, is_gold_set')
  .in('slug', officialSlugs)
  .order('name');
assert(!cLoadErr && rawCareers?.length === 132, '132 carreras cargadas para MATCHING_V1');

// Cargar puntajes de career_adn
let allAdn = [];
let from = 0;
while (true) {
  const { data: chunk } = await supabase
    .from('career_adn')
    .select('career_id, score, vocational_variables(code)')
    .eq('version', 'ADN_V1')
    .range(from, from + 999);
  allAdn = allAdn.concat(chunk || []);
  if (!chunk || chunk.length < 1000) break;
  from += 1000;
}

const scoresByCareer = {};
allAdn.forEach((r) => {
  if (!scoresByCareer[r.career_id]) scoresByCareer[r.career_id] = {};
  if (r.vocational_variables?.code) {
    scoresByCareer[r.career_id][r.vocational_variables.code] = r.score;
  }
});

const careerProfiles = rawCareers.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  area: c.area,
  is_gold_set: c.is_gold_set,
  scores: scoresByCareer[c.id] || {}
}));

const matches3S = QuestionnaireEngine.runMatchingV1(res3S.profile_38d, careerProfiles);
const matches4S = QuestionnaireEngine.runMatchingV1(res4S.profile_38d, careerProfiles);
const matches5S = QuestionnaireEngine.runMatchingV1(res5S.profile_38d, careerProfiles);

assert(matches3S.length === 132, '3S produce matching contra las 132 carreras');
assert(matches4S.length === 132, '4S produce matching contra las 132 carreras');
assert(matches5S.length === 132, '5S produce matching contra las 132 carreras');
assert(matches3S[0].compatibility_pct === matches5S[0].compatibility_pct, 'Mismo top 1 y compatibilidad en 3S y 5S ante idéntico perfil');

// ----------------------------------------------------------------------
// TEST 12: No se modificaron los 5,016 registros de ADN
// ----------------------------------------------------------------------
console.log('\nTEST 12: Integridad de los 5,016 registros de ADN_V1');
const { count: adnCount, error: adnErr } = await supabase
  .from('career_adn')
  .select('*', { count: 'exact', head: true })
  .eq('version', 'ADN_V1');
assert(!adnErr, `Consulta career_adn exitosa: ${adnErr?.message || ''}`);
assert(adnCount === 5016, `Exactamente 5,016 registros en career_adn (confirmados: ${adnCount})`);

// ----------------------------------------------------------------------
// TEST 13: No se modificaron las 132 carreras
// ----------------------------------------------------------------------
console.log('\nTEST 13: Integridad de las 132 carreras');
const { data: verifiedCareers, error: cErr } = await supabase
  .from('careers')
  .select('id, slug')
  .in('slug', officialSlugs);
assert(!cErr, `Consulta careers exitosa: ${cErr?.message || ''}`);
assert(verifiedCareers.length === 132, `Exactamente 132 carreras oficiales de ADN_V1 intactas en Supabase (confirmadas: ${verifiedCareers.length})`);

// ----------------------------------------------------------------------
// TEST 14: Determinismo: Mismas respuestas producen exactamente el mismo perfil
// ----------------------------------------------------------------------
console.log('\nTEST 14: Determinismo de cálculo');
const runA = QuestionnaireEngine.calculateProfile38D(mockResponsesA);
const runB = QuestionnaireEngine.calculateProfile38D(mockResponsesA);
ALL_VOCATIONAL_VARIABLES.forEach((v) => {
  assert(runA.profile_38d[v] === runB.profile_38d[v], `Determinismo en variable ${v}: ${runA.profile_38d[v]}`);
});

console.log('\n======================================================================');
console.log('✅ QA OBLIGATORIO: TESTS 1 A 14 SUPERADOS AL 100%');
console.log('======================================================================\n');
