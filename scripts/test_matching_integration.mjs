import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import { VocationalMatchingService } from '../src/lib/matching/service.ts';
import { MATCHING_CONFIG_V1 } from '../src/lib/matching/config.ts';
import { ALL_VOCATIONAL_VARIABLES, QuestionnaireEngine } from '../src/lib/questionnaire/engine.ts';
import { getQuestionsForGrade } from '../src/lib/questionnaire/bank.ts';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FALLÓ: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

console.log('======================================================================');
console.log('TEST DE INTEGRACIÓN: UNIFICACIÓN MATCHING_V1 EN QUESTIONNAIRE ENGINE');
console.log('======================================================================\n');

// 1. Cargar catálogo de 132 carreras y ADN_V1
const exportData = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));
const allVariables = exportData.variables.map(v => v.code);

const careerProfiles = exportData.careers.map(c => {
  const scores = {};
  exportData.variables.forEach(v => {
    const rec = exportData.adnRecords.find(r => r.career_slug === c.slug && r.variable_code === v.code);
    scores[v.code] = rec ? rec.score : 0;
  });
  return {
    id: c.slug,
    career_id: c.slug,
    name: c.name,
    slug: c.slug,
    career_slug: c.slug,
    area: c.area,
    is_gold_set: c.is_gold_set,
    scores
  };
});

assert(careerProfiles.length === 132, 'Catálogo tiene exactamente 132 carreras');
assert(allVariables.length === 38, 'Variables son exactamente 38');

// 2. Preparar los 5 perfiles obligatorios
const softwareCareer = careerProfiles.find(c => c.slug === 'ingenieria-de-software');
const medicinaCareer = careerProfiles.find(c => c.slug === 'medicina');
const disenoCareer = careerProfiles.find(c => c.slug.includes('diseno-grafico')) || careerProfiles.find(c => c.slug.includes('diseno'));

const softwareProfile = { ...softwareCareer.scores };
const medicinaProfile = { ...medicinaCareer.scores };
const disenoProfile = { ...disenoCareer.scores };

const balancedProfile = {};
allVariables.forEach(v => {
  balancedProfile[v] = 60;
});

const randomProfile = {};
allVariables.forEach((v, i) => {
  randomProfile[v] = (i * 23 + 47) % 101;
});

const profilesToTest = [
  { name: '1. Perfil idéntico a Ingeniería de Software', profile: softwareProfile, expectedTop1: 'Ingeniería de Software', expectedPct: 100.0 },
  { name: '2. Perfil idéntico a Medicina', profile: medicinaProfile, expectedTop1: 'Medicina', expectedPct: 100.0 },
  { name: '3. Perfil idéntico a Diseño Gráfico', profile: disenoProfile, expectedTop1: disenoCareer.name, expectedPct: 100.0 },
  { name: '4. Perfil balanceado (60 en todas las 38 variables)', profile: balancedProfile, expectedTop1: null, expectedPct: null },
  { name: '5. Perfil aleatorio válido (38 variables en [0, 100])', profile: randomProfile, expectedTop1: null, expectedPct: null },
];

console.log('--- FASE A: COMPARACIÓN 1:1 ENTRE MOTORES EN LOS 5 PERFILES ---');

for (const p of profilesToTest) {
  console.log(`\nProbando: ${p.name}`);

  // Ejecución canónica directa
  const canonicalMatches = VocationalMatchingService.calculateAllMatches(
    p.profile,
    careerProfiles,
    MATCHING_CONFIG_V1
  );

  // Ejecución a través de QuestionnaireEngine.runMatchingV1
  const engineMatches = QuestionnaireEngine.runMatchingV1(
    p.profile,
    careerProfiles
  );

  assert(canonicalMatches.length === 132, 'Motor canónico procesó 132 carreras');
  assert(engineMatches.length === 132, 'QuestionnaireEngine devolvió 132 carreras');

  // Si había Top 1 esperado con 100%
  if (p.expectedTop1) {
    assert(canonicalMatches[0].career_name === p.expectedTop1, `Canónico Top 1 es ${p.expectedTop1}`);
    assert(canonicalMatches[0].global_score === p.expectedPct, `Canónico compatibilidad es ${p.expectedPct}%`);
    assert(engineMatches[0].name === p.expectedTop1, `Engine Top 1 es ${p.expectedTop1}`);
    assert(engineMatches[0].compatibility_pct === p.expectedPct, `Engine compatibilidad es ${p.expectedPct}%`);
  }

  // Verificar ranking completo de las 132 carreras posición por posición
  let mismatches = 0;
  for (let i = 0; i < 132; i++) {
    const c = canonicalMatches[i];
    const e = engineMatches[i];

    if (c.career_slug !== e.slug) {
      console.error(`Discrepancia en posición #${i + 1}: Canónico=${c.career_slug} vs Engine=${e.slug}`);
      mismatches++;
    }
    const cPct = Math.round(c.global_score * 100) / 100;
    if (cPct !== e.compatibility_pct) {
      console.error(`Discrepancia en porcentaje #${i + 1}: Canónico=${cPct} vs Engine=${e.compatibility_pct}`);
      mismatches++;
    }
    if (e.matching_version !== 'MATCHING_V1') {
      console.error(`Versión de matching incorrecta en #${i + 1}: ${e.matching_version}`);
      mismatches++;
    }
    if (e.adn_version !== 'ADN_V1') {
      console.error(`Versión de adn incorrecta en #${i + 1}: ${e.adn_version}`);
      mismatches++;
    }
  }

  assert(mismatches === 0, `Ranking completo 1..132, compatibilidad y versiones son 100% IDÉNTICOS`);

  // Determinismo: segunda ejecución idéntica
  const engineRun2 = QuestionnaireEngine.runMatchingV1(p.profile, careerProfiles);
  let detMismatches = 0;
  for (let i = 0; i < 132; i++) {
    if (engineMatches[i].slug !== engineRun2[i].slug || engineMatches[i].compatibility_pct !== engineRun2[i].compatibility_pct) {
      detMismatches++;
    }
  }
  assert(detMismatches === 0, 'Determinismo verificado: 2da ejecución idéntica al bit');

  console.log(`  Top 3 resultante:`);
  console.log(`    #1 ${engineMatches[0].name} (${engineMatches[0].compatibility_pct}%)`);
  console.log(`    #2 ${engineMatches[1].name} (${engineMatches[1].compatibility_pct}%)`);
  console.log(`    #3 ${engineMatches[2].name} (${engineMatches[2].compatibility_pct}%)`);
}

// ----------------------------------------------------------------------
// FASE B: TEST DE INTEGRACIÓN VÍA QuestionnaireEngine.processAttempt()
// ----------------------------------------------------------------------
console.log('\n--- FASE B: INTEGRACIÓN COMPLETA VIA processAttempt() ---');

const sampleQuestions = getQuestionsForGrade('5S');
const sampleResponses = sampleQuestions.map(q => ({
  question_id: q.id,
  base_question_id: q.base_question_id,
  selected_option: 'A',
  response_time_ms: 3200
}));

const attemptResult = QuestionnaireEngine.processAttempt(
  'test_student_integration',
  '5S',
  1,
  sampleResponses,
  careerProfiles
);

assert(attemptResult.profile_38d !== undefined, 'Perfil 38D calculado con éxito');
assert(Object.keys(attemptResult.profile_38d).length === 38, 'Perfil 38D tiene exactamente 38 variables');
assert(attemptResult.matches.length === 132, 'Intento generó 132 matches');
assert(attemptResult.attempt.matching_version === 'MATCHING_V1', 'attempt.matching_version es MATCHING_V1');
assert(attemptResult.attempt.score_model_version === 'V1', 'attempt.score_model_version es V1');

// Comparar intento contra cálculo canónico directo con el mismo perfil 38D resultante
const directCanonicalMatches = VocationalMatchingService.calculateAllMatches(
  attemptResult.profile_38d,
  careerProfiles,
  MATCHING_CONFIG_V1
);

let pipelineMismatches = 0;
for (let i = 0; i < 132; i++) {
  const d = directCanonicalMatches[i];
  const m = attemptResult.matches[i];
  if (d.career_slug !== m.slug) pipelineMismatches++;
  if (Math.round(d.global_score * 100) / 100 !== m.compatibility_pct) pipelineMismatches++;
}

assert(pipelineMismatches === 0, 'processAttempt() produce resultados 100% idénticos a VocationalMatchingService.calculateAllMatches()');

console.log('\n======================================================================');
console.log('✅ TEST DE INTEGRACIÓN SUPERADO EXITOSAMENTE');
console.log('======================================================================');
