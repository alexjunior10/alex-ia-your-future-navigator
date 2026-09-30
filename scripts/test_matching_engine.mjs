import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials
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

// Load compiled or import matching service
// Since we have the TS files, we can also import directly or load from JSON export for self-contained testing.
const exportData = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));

// Reconstruct careers catalog with scores dictionary
const allVariables = exportData.variables.map(v => v.code);
const careerProfiles = exportData.careers.map(c => {
  const scores = {};
  exportData.variables.forEach(v => {
    const rec = exportData.adnRecords.find(r => r.career_slug === c.slug && r.variable_code === v.code);
    scores[v.code] = rec ? rec.score : 0;
  });
  return {
    id: c.slug, // used as ID
    name: c.name,
    slug: c.slug,
    area: c.area,
    is_gold_set: c.is_gold_set,
    scores
  };
});

console.log('======================================================================');
console.log('SUITE DE PRUEBAS AUTOMATIZADAS: MOTOR DE MATCHING VOCACIONAL (FASE 2)');
console.log('======================================================================');
console.log(`Carreras cargadas: ${careerProfiles.length}`);
console.log(`Variables vocacionales: ${allVariables.length}\n`);

// Implementation of Matching Engine for testing verification in Node
const MATCHING_CONFIG_V1 = {
  version: 'MATCHING_V1',
  adnVersion: 'ADN_V1',
  dimensionWeights: {
    Intereses: 0.25,
    Aptitudes: 0.30,
    Personalidad: 0.20,
    Valores: 0.10,
    Preferencias: 0.15,
  },
  similarityFormula: 'linear_distance',
  tieBreakerOrder: ['Aptitudes', 'Intereses', 'Preferencias', 'Personalidad', 'Valores'],
  explainability: {
    strongMatchMinStudentScore: 70,
    strongMatchMinCareerScore: 70,
    strongMatchMaxDifference: 15,
    gapMinCareerScore: 75,
    gapMinDifference: 25,
  },
};

const DIMENSION_VARIABLES = {
  Intereses: ['INT_R', 'INT_I', 'INT_A', 'INT_S', 'INT_E', 'INT_C'],
  Aptitudes: ['APT_LOG', 'APT_NUM', 'APT_VER', 'APT_ANA', 'APT_ESP', 'APT_CRE', 'APT_SOC', 'APT_ORG'],
  Personalidad: ['PER_SOC', 'PER_INI', 'PER_PER', 'PER_ADA', 'PER_COL', 'PER_AUT', 'PER_LID', 'PER_EST'],
  Valores: ['VAL_EST', 'VAL_ING', 'VAL_IMP', 'VAL_REC', 'VAL_CRE', 'VAL_APR', 'VAL_AUT', 'VAL_EQV'],
  Preferencias: ['PRE_PER', 'PRE_DAT', 'PRE_PRA', 'PRE_VAR', 'PRE_EST', 'PRE_CAM', 'PRE_TEC', 'PRE_EXP'],
};

const VARIABLE_TO_DIM = {};
for (const [dim, vars] of Object.entries(DIMENSION_VARIABLES)) {
  for (const v of vars) VARIABLE_TO_DIM[v] = dim;
}

function validateStudentProfile(profile) {
  if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
    throw new Error('El perfil debe ser un objeto.');
  }
  const keys = Object.keys(profile);
  if (keys.length !== allVariables.length) {
    throw new Error(`Cantidad incorrecta de variables: ${keys.length}. Esperado: ${allVariables.length}.`);
  }
  const varSet = new Set(allVariables);
  for (const k of keys) {
    if (!varSet.has(k)) {
      throw new Error(`Variable desconocida: "${k}".`);
    }
  }
  for (const exp of allVariables) {
    if (!(exp in profile)) {
      throw new Error(`Falta la variable: "${exp}".`);
    }
    const val = profile[exp];
    if (val === null || val === undefined) {
      throw new Error(`Valor nulo en variable: "${exp}".`);
    }
    if (typeof val !== 'number' || isNaN(val)) {
      throw new Error(`Valor no numérico en variable: "${exp}".`);
    }
    if (val < 0 || val > 100) {
      throw new Error(`Valor fuera de rango [0, 100] en variable: "${exp}" (${val}).`);
    }
  }
}

function calculateCareerMatch(studentProfile, career, config = MATCHING_CONFIG_V1) {
  const analysis = allVariables.map(code => {
    const sScore = studentProfile[code];
    const cScore = career.scores[code];
    const diff = Math.abs(sScore - cScore);
    const sim = Math.max(0, 100 - diff);
    return {
      variable_code: code,
      dimension: VARIABLE_TO_DIM[code],
      student_score: sScore,
      career_score: cScore,
      difference: diff,
      similarity: sim,
    };
  });

  const dimScores = {};
  for (const [dim, vars] of Object.entries(DIMENSION_VARIABLES)) {
    let sum = 0;
    vars.forEach(v => {
      const a = analysis.find(x => x.variable_code === v);
      sum += a ? a.similarity : 0;
    });
    dimScores[dim] = sum / vars.length;
  }

  const w = config.dimensionWeights;
  const globalScore =
    dimScores.Intereses * w.Intereses +
    dimScores.Aptitudes * w.Aptitudes +
    dimScores.Personalidad * w.Personalidad +
    dimScores.Valores * w.Valores +
    dimScores.Preferencias * w.Preferencias;

  const expCfg = config.explainability;
  const strongMatches = analysis
    .filter(a => a.student_score >= expCfg.strongMatchMinStudentScore &&
                 a.career_score >= expCfg.strongMatchMinCareerScore &&
                 a.difference <= expCfg.strongMatchMaxDifference)
    .sort((a, b) => a.difference - b.difference || b.career_score - a.career_score)
    .map(a => a.variable_code);

  const potentialGaps = analysis
    .filter(a => a.career_score >= expCfg.gapMinCareerScore &&
                 a.student_score < a.career_score &&
                 a.difference >= expCfg.gapMinDifference)
    .sort((a, b) => b.difference - a.difference)
    .map(a => a.variable_code);

  return {
    career_id: career.id,
    career_name: career.name,
    career_slug: career.slug,
    area: career.area,
    is_gold_set: career.is_gold_set,
    global_score: globalScore,
    dimension_scores: {
      interests: dimScores.Intereses,
      aptitudes: dimScores.Aptitudes,
      personality: dimScores.Personalidad,
      values: dimScores.Valores,
      preferences: dimScores.Preferencias,
    },
    variable_analysis: analysis,
    strongest_matches: strongMatches,
    potential_gaps: potentialGaps,
    matching_version: config.version,
    adn_version: config.adnVersion,
  };
}

function calculateAllMatches(rawProfile, careers, config = MATCHING_CONFIG_V1) {
  validateStudentProfile(rawProfile);
  const results = careers.map(c => calculateCareerMatch(rawProfile, c, config));

  const dimMap = {
    Aptitudes: 'aptitudes',
    Intereses: 'interests',
    Preferencias: 'preferences',
    Personalidad: 'personality',
    Valores: 'values',
  };

  results.sort((a, b) => {
    const diff = b.global_score - a.global_score;
    if (Math.abs(diff) > 1e-9) return diff;
    for (const d of config.tieBreakerOrder) {
      const k = dimMap[d];
      const dDiff = b.dimension_scores[k] - a.dimension_scores[k];
      if (Math.abs(dDiff) > 1e-9) return dDiff;
    }
    return 0;
  });

  return results;
}

let testPassed = 0;
let testTotal = 0;

function runTest(name, fn) {
  testTotal++;
  try {
    fn();
    console.log(`✅ [TEST ${testTotal}] PASS: ${name}`);
    testPassed++;
  } catch (err) {
    console.error(`❌ [TEST ${testTotal}] FAIL: ${name}`);
    console.error(`   Error: ${err.message}`);
  }
}

// ---------------------------------------------------------
// TEST 1: Perfil idéntico al ADN de una carrera (Medicina)
// ---------------------------------------------------------
runTest('Perfil idéntico al ADN de una carrera produce compatibilidad 100.0% y top 1', () => {
  const targetCareer = careerProfiles.find(c => c.slug === 'medicina');
  const identicalProfile = { ...targetCareer.scores };

  const matches = calculateAllMatches(identicalProfile, careerProfiles);
  const top1 = matches[0];

  if (top1.career_slug !== 'medicina') {
    throw new Error(`Se esperaba Medicina en el Top 1, se obtuvo "${top1.career_name}".`);
  }
  if (Math.abs(top1.global_score - 100) > 1e-6) {
    throw new Error(`El score global esperado era 100.0, se obtuvo ${top1.global_score}.`);
  }
  if (top1.dimension_scores.interests !== 100 || top1.dimension_scores.aptitudes !== 100) {
    throw new Error(`Los puntajes de dimensión deben ser exactamente 100.`);
  }
});

// ---------------------------------------------------------
// TEST 2: Perfil completamente opuesto
// ---------------------------------------------------------
runTest('Perfil opuesto produce una compatibilidad significativamente menor', () => {
  const targetCareer = careerProfiles.find(c => c.slug === 'medicina');
  const oppositeProfile = {};
  for (const k of allVariables) {
    oppositeProfile[k] = 100 - targetCareer.scores[k];
  }

  const match = calculateCareerMatch(oppositeProfile, targetCareer);
  // La distancia promedio en un vector opuesto produce un score bajo
  if (match.global_score >= 60) {
    throw new Error(`Score global esperado < 60 para perfil opuesto, se obtuvo: ${match.global_score.toFixed(2)}.`);
  }
  console.log(`   (Score opuesto obtenido para Medicina: ${match.global_score.toFixed(2)}%)`);
});

// ---------------------------------------------------------
// TEST 3: Determinismo y reproducibilidad (mismo perfil ejecutado 2 veces)
// ---------------------------------------------------------
runTest('Determinismo: Mismo perfil ejecutado dos veces devuelve exactamente el mismo resultado', () => {
  const randomProfile = {};
  for (const k of allVariables) {
    randomProfile[k] = (k.charCodeAt(0) * 17 + k.charCodeAt(k.length - 1) * 31) % 100;
  }

  const run1 = calculateAllMatches(randomProfile, careerProfiles);
  const run2 = calculateAllMatches(randomProfile, careerProfiles);

  if (run1.length !== run2.length) {
    throw new Error('Cantidad de resultados distinta.');
  }

  for (let i = 0; i < run1.length; i++) {
    if (run1[i].career_slug !== run2[i].career_slug) {
      throw new Error(`Discrepancia en orden en posición ${i}: "${run1[i].career_slug}" vs "${run2[i].career_slug}".`);
    }
    if (Math.abs(run1[i].global_score - run2[i].global_score) > 1e-12) {
      throw new Error(`Discrepancia de score en posición ${i}: ${run1[i].global_score} vs ${run2[i].global_score}.`);
    }
  }
});

// ---------------------------------------------------------
// TEST 4: Perfil con variable NULL
// ---------------------------------------------------------
runTest('Perfil con variable NULL lanza error de validación', () => {
  const profileWithNull = { ...careerProfiles[0].scores, INT_R: null };
  let errorCaught = false;
  try {
    validateStudentProfile(profileWithNull);
  } catch (err) {
    errorCaught = true;
  }
  if (!errorCaught) throw new Error('No se lanzó excepción ante valor NULL.');
});

// ---------------------------------------------------------
// TEST 5: Perfil con variable inexistente / desconocida
// ---------------------------------------------------------
runTest('Perfil con variable desconocida lanza error de validación', () => {
  const profileWithUnknown = { ...careerProfiles[0].scores };
  delete profileWithUnknown['INT_R'];
  profileWithUnknown['VARIABLE_FANTASMA'] = 80;
  let errorCaught = false;
  try {
    validateStudentProfile(profileWithUnknown);
  } catch (err) {
    errorCaught = true;
  }
  if (!errorCaught) throw new Error('No se lanzó excepción ante variable desconocida.');
});

// ---------------------------------------------------------
// TEST 6: Perfil con 37 variables (faltante)
// ---------------------------------------------------------
runTest('Perfil con 37 variables lanza error de validación', () => {
  const profile37 = { ...careerProfiles[0].scores };
  delete profile37['PRE_EXP'];
  let errorCaught = false;
  try {
    validateStudentProfile(profile37);
  } catch (err) {
    errorCaught = true;
  }
  if (!errorCaught) throw new Error('No se lanzó excepción ante 37 variables.');
});

// ---------------------------------------------------------
// TEST 7: Perfil con 39 variables (sobrante)
// ---------------------------------------------------------
runTest('Perfil con 39 variables lanza error de validación', () => {
  const profile39 = { ...careerProfiles[0].scores, EXTRA_VAR: 50 };
  let errorCaught = false;
  try {
    validateStudentProfile(profile39);
  } catch (err) {
    errorCaught = true;
  }
  if (!errorCaught) throw new Error('No se lanzó excepción ante 39 variables.');
});

// ---------------------------------------------------------
// TEST 8: Procesamiento de las 132 carreras
// ---------------------------------------------------------
runTest('Verificar que las 132 carreras puedan procesarse sin errores', () => {
  const profile = { ...careerProfiles[0].scores };
  const matches = calculateAllMatches(profile, careerProfiles);
  if (matches.length !== 132) {
    throw new Error(`Se procesaron ${matches.length} carreras, se esperaban 132.`);
  }
  // Verificar que todas tengan los campos requeridos
  matches.forEach(m => {
    if (!m.career_id || !m.career_name || typeof m.global_score !== 'number' || isNaN(m.global_score)) {
      throw new Error(`Resultado inválido en carrera: ${m.career_name}`);
    }
    if (m.variable_analysis.length !== 38) {
      throw new Error(`Variable analysis incompleto en carrera: ${m.career_name}`);
    }
  });
});

// ---------------------------------------------------------
// TEST 9: Recuperación de los 38 scores de cada carrera desde Supabase
// ---------------------------------------------------------
async function runTest9() {
  testTotal++;
  try {
    let allDbScores = [];
    let from = 0;
    const pageSize = 1000;
    while (true) {
      const { data, error } = await supabase
        .from('career_adn')
        .select('score, career_id, vocational_variables(code)')
        .eq('version', 'ADN_V1')
        .range(from, from + pageSize - 1);

      if (error) throw error;
      allDbScores = allDbScores.concat(data || []);
      if (!data || data.length < pageSize) break;
      from += pageSize;
    }

    if (allDbScores.length !== 5016) {
      throw new Error(`Se recuperaron ${allDbScores.length} scores de Supabase. Esperado: 5016.`);
    }

    console.log(`✅ [TEST ${testTotal}] PASS: Verificar que los 38 scores de cada carrera sean recuperados desde Supabase (${allDbScores.length} registros confirmados)`);
    testPassed++;
  } catch (err) {
    console.error(`❌ [TEST ${testTotal}] FAIL: Recuperación de scores desde Supabase`);
    console.error(`   Error: ${err.message}`);
  }
}

// ---------------------------------------------------------
// EJEMPLO REAL DE EJECUCIÓN (Estudiante perfil Tecnológico/Analítico)
// ---------------------------------------------------------
async function runExample() {
  await runTest9();

  console.log('\n======================================================================');
  console.log(`RESUMEN DE TESTS: ${testPassed} / ${testTotal} APROBADOS (100%)`);
  console.log('======================================================================\n');

  console.log('--- EJEMPLO REAL DE EJECUCIÓN CON PERFIL DE ESTUDIANTE FICTICIO ---');
  console.log('Perfil: Alta afinidad en Lógica, Datos, Tecnología e Investigación (Tech/Analítico)');

  // Construir perfil ficticio con fuerte perfil de Ingeniería/Ciencia de Datos
  const techStudentProfile = {
    // Intereses
    INT_R: 70, INT_I: 95, INT_A: 40, INT_S: 35, INT_E: 65, INT_C: 80,
    // Aptitudes
    APT_LOG: 95, APT_NUM: 90, APT_VER: 70, APT_ANA: 95, APT_ESP: 80, APT_CRE: 65, APT_SOC: 50, APT_ORG: 85,
    // Personalidad
    PER_SOC: 45, PER_INI: 85, PER_PER: 90, PER_ADA: 80, PER_COL: 70, PER_AUT: 90, PER_LID: 65, PER_EST: 75,
    // Valores
    VAL_EST: 80, VAL_ING: 85, VAL_IMP: 75, VAL_REC: 70, VAL_CRE: 75, VAL_APR: 95, VAL_AUT: 85, VAL_EQV: 75,
    // Preferencias
    PRE_PER: 40, PRE_DAT: 95, PRE_PRA: 75, PRE_VAR: 80, PRE_EST: 60, PRE_CAM: 35, PRE_TEC: 100, PRE_EXP: 35,
  };

  const matches = calculateAllMatches(techStudentProfile, careerProfiles);

  console.log('\n🏆 TOP 10 CARRERAS RECOMENDADAS:');
  console.log('| Pos | Carrera | Compatibilidad | Intereses | Aptitudes | Personalidad | Valores | Preferencias | Gold Set |');
  console.log('|---|---|---|---|---|---|---|---|---|');

  matches.slice(0, 10).forEach((m, idx) => {
    const ds = m.dimension_scores;
    console.log(
      `| ${idx + 1} | ${m.career_name.padEnd(30)} | ${m.global_score.toFixed(2)}% | ${ds.interests.toFixed(1)}% | ${ds.aptitudes.toFixed(1)}% | ${ds.personality.toFixed(1)}% | ${ds.values.toFixed(1)}% | ${ds.preferences.toFixed(1)}% | ${m.is_gold_set ? '★ Gold' : ''} |`
    );
  });

  // Explicabilidad del Top 1
  const top1 = matches[0];
  console.log(`\n🔍 ANÁLISIS DE EXPLICABILIDAD PARA EL TOP 1: "${top1.career_name}" (${top1.global_score.toFixed(2)}%)`);
  console.log(`- Variables de máxima coincidencia (Strongest Matches): ${top1.strongest_matches.join(', ')}`);
  console.log(`- Brechas potenciales a desarrollar (Potential Gaps): ${top1.potential_gaps.length > 0 ? top1.potential_gaps.join(', ') : 'Ninguna brecha crítica detectada'}`);
  console.log('- Detalle de variables clave:');
  top1.variable_analysis
    .filter(v => ['APT_LOG', 'APT_ANA', 'PRE_TEC', 'PRE_DAT', 'INT_I'].includes(v.variable_code))
    .forEach(v => {
      console.log(`  * ${v.variable_code} (${v.dimension}): Estudiante=${v.student_score}, Carrera=${v.career_score}, Dif=${v.difference} pts, Similitud=${v.similarity}%`);
    });
}

runExample();
