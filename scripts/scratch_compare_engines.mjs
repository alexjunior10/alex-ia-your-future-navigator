import fs from 'fs';

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
    name: c.name,
    slug: c.slug,
    area: c.area,
    is_gold_set: c.is_gold_set,
    scores
  };
});

const DIMENSION_VARS = {
  Intereses: ['INT_R', 'INT_I', 'INT_A', 'INT_S', 'INT_E', 'INT_C'],
  Aptitudes: ['APT_LOG', 'APT_NUM', 'APT_VER', 'APT_ANA', 'APT_ESP', 'APT_CRE', 'APT_SOC', 'APT_ORG'],
  Personalidad: ['PER_SOC', 'PER_INI', 'PER_PER', 'PER_ADA', 'PER_COL', 'PER_AUT', 'PER_LID', 'PER_EST'],
  Valores: ['VAL_EST', 'VAL_ING', 'VAL_IMP', 'VAL_REC', 'VAL_CRE', 'VAL_APR', 'VAL_AUT', 'VAL_EQV'],
  Preferencias: ['PRE_PER', 'PRE_DAT', 'PRE_PRA', 'PRE_VAR', 'PRE_EST', 'PRE_CAM', 'PRE_TEC', 'PRE_EXP']
};

// 1. MOTOR CANÓNICO (src/lib/matching/service.ts)
function runCanonicalMatching(studentProfile, careers) {
  const CANONICAL_WEIGHTS = {
    Intereses: 0.25,
    Aptitudes: 0.30,
    Personalidad: 0.20,
    Valores: 0.10,
    Preferencias: 0.15
  };
  const tieBreakerOrder = ['Aptitudes', 'Intereses', 'Preferencias', 'Personalidad', 'Valores'];

  const results = careers.map(career => {
    const dimScores = {};
    for (const [dim, vars] of Object.entries(DIMENSION_VARS)) {
      let sum = 0;
      for (const v of vars) {
        const sVal = studentProfile[v] ?? 50;
        const cVal = career.scores?.[v] ?? 50;
        const sim = Math.max(0, 100 - Math.abs(sVal - cVal));
        sum += sim;
      }
      dimScores[dim] = sum / vars.length;
    }

    const globalScore =
      dimScores.Intereses * CANONICAL_WEIGHTS.Intereses +
      dimScores.Aptitudes * CANONICAL_WEIGHTS.Aptitudes +
      dimScores.Personalidad * CANONICAL_WEIGHTS.Personalidad +
      dimScores.Valores * CANONICAL_WEIGHTS.Valores +
      dimScores.Preferencias * CANONICAL_WEIGHTS.Preferencias;

    return {
      name: career.name,
      slug: career.slug,
      area: career.area,
      global_score: globalScore,
      compatibility_pct: Math.round(globalScore * 100) / 100,
      dimension_scores: dimScores
    };
  });

  results.sort((a, b) => {
    const EPSILON = 1e-9;
    const diff = b.global_score - a.global_score;
    if (Math.abs(diff) > EPSILON) return diff;
    for (const dim of tieBreakerOrder) {
      const dimDiff = b.dimension_scores[dim] - a.dimension_scores[dim];
      if (Math.abs(dimDiff) > EPSILON) return dimDiff;
    }
    return 0;
  });

  return results;
}

// 2. MOTOR DIVERGENTE ACTUAL (src/lib/questionnaire/engine.ts)
function runDivergentMatching(studentProfile, careers) {
  const DIVERGENT_WEIGHTS = {
    Intereses: 0.30,
    Aptitudes: 0.25,
    Personalidad: 0.20,
    Valores: 0.15,
    Preferencias: 0.10
  };

  const results = careers.map(career => {
    const dimScores = {};
    let overallSim = 0;

    for (const [dim, vars] of Object.entries(DIMENSION_VARS)) {
      let sumSquaredDiff = 0;
      for (const v of vars) {
        const sVal = studentProfile[v] ?? 50;
        const cVal = career.scores?.[v] ?? 50;
        sumSquaredDiff += (sVal - cVal) ** 2;
      }
      const dist = Math.sqrt(sumSquaredDiff);
      const maxDist = Math.sqrt(vars.length * (100 ** 2));
      const dimSim = Math.max(0, 100 * (1 - dist / maxDist));
      dimScores[dim] = Math.round(dimSim * 10) / 10;
      overallSim += dimSim * DIVERGENT_WEIGHTS[dim];
    }

    return {
      name: career.name,
      slug: career.slug,
      area: career.area,
      global_score: overallSim,
      compatibility_pct: Math.round(overallSim * 100) / 100,
      dimension_scores: dimScores
    };
  });

  results.sort((a, b) => b.compatibility_pct - a.compatibility_pct);
  return results;
}

// PERFILES DE PRUEBA
const softwareProfile = careerProfiles.find(c => c.slug === 'ingenieria-de-software').scores;
const medicinaProfile = careerProfiles.find(c => c.slug === 'medicina').scores;
const disenoProfile = (careerProfiles.find(c => c.slug.includes('diseno-grafico')) || careerProfiles.find(c => c.slug.includes('diseno'))).scores;

const balancedProfile = {};
allVariables.forEach(v => balancedProfile[v] = 60);

const randomProfile = {};
allVariables.forEach((v, i) => randomProfile[v] = (i * 17 + 23) % 101);

const profilesToTest = [
  { name: 'Perfil Idéntico a Ingeniería de Software', profile: softwareProfile },
  { name: 'Perfil Idéntico a Medicina', profile: medicinaProfile },
  { name: 'Perfil Idéntico a Diseño', profile: disenoProfile },
  { name: 'Perfil Balanceado (60 en todo)', profile: balancedProfile },
  { name: 'Perfil Pseudorandom Válido', profile: randomProfile }
];

console.log('======================================================================');
console.log('COMPARACIÓN: MOTOR CANÓNICO (OFICIAL) vs. MOTOR DIVERGENTE (ACTUAL)');
console.log('======================================================================\n');

for (const pt of profilesToTest) {
  console.log(`>>> ${pt.name}`);
  const canon = runCanonicalMatching(pt.profile, careerProfiles);
  const diverg = runDivergentMatching(pt.profile, careerProfiles);

  console.log('  [CANÓNICO OFICIAL: Lineal | 25/30/20/10/15 | TieBreaker]');
  for (let i = 0; i < 3; i++) {
    console.log(`    #${i+1} ${canon[i].name} (${canon[i].compatibility_pct}%) [I:${canon[i].dimension_scores.Intereses.toFixed(1)} A:${canon[i].dimension_scores.Aptitudes.toFixed(1)}]`);
  }

  console.log('  [DIVERGENTE ACTUAL: Euclidiano | 30/25/20/15/10 | Sin TieBreaker]');
  for (let i = 0; i < 3; i++) {
    console.log(`    #${i+1} ${diverg[i].name} (${diverg[i].compatibility_pct}%) [I:${diverg[i].dimension_scores.Intereses.toFixed(1)} A:${diverg[i].dimension_scores.Aptitudes.toFixed(1)}]`);
  }

  const sameTop1 = canon[0].slug === diverg[0].slug;
  const scoreDiff = Math.abs(canon[0].compatibility_pct - diverg[0].compatibility_pct);
  console.log(`  -> ¿Mismo Top 1? ${sameTop1 ? 'SÍ' : 'NO'} | Diferencia de score Top 1: ${scoreDiff.toFixed(2)} pts\n`);
}
