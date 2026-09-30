import fs from 'fs';
import path from 'path';

// 1. Cargar perfiles de las 132 carreras del ADN_V1
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
    family: c.family,
    is_gold_set: c.is_gold_set,
    scores
  };
});

// Importar catálogo de similares
const similarCareersMap = JSON.parse(fs.readFileSync('src/lib/matching/similar-careers.ts', 'utf-8')
  .match(/export const SIMILAR_CAREERS_MAP: Record<string, string\[\]> = (\{[\s\S]*?\});/)[1]);

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

// 2. Definición de los 6 perfiles sintéticos de prueba
const syntheticProfiles = {
  'A_Tecnologico_Analitico': {
    name: 'Perfil Tecnológico / Analítico',
    description: 'Alta orientación a la abstracción lógica, ciencia de datos, desarrollo técnico y autonomía.',
    scores: {
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
    }
  },
  'B_Salud_Social': {
    name: 'Perfil Salud / Social',
    description: 'Fuerte vocación de servicio humano, empatía, impacto social y rigor biológico-médico.',
    scores: {
      // Intereses
      INT_R: 45, INT_I: 85, INT_A: 40, INT_S: 100, INT_E: 45, INT_C: 60,
      // Aptitudes
      APT_LOG: 75, APT_NUM: 60, APT_VER: 85, APT_ANA: 80, APT_ESP: 50, APT_CRE: 55, APT_SOC: 95, APT_ORG: 80,
      // Personalidad
      PER_SOC: 90, PER_INI: 80, PER_PER: 90, PER_ADA: 85, PER_COL: 95, PER_AUT: 60, PER_LID: 70, PER_EST: 85,
      // Valores
      VAL_EST: 80, VAL_ING: 70, VAL_IMP: 100, VAL_REC: 65, VAL_CRE: 50, VAL_APR: 90, VAL_AUT: 60, VAL_EQV: 75,
      // Preferencias
      PRE_PER: 95, PRE_DAT: 55, PRE_PRA: 75, PRE_VAR: 80, PRE_EST: 60, PRE_CAM: 50, PRE_TEC: 65, PRE_EXP: 45,
    }
  },
  'C_Creativo': {
    name: 'Perfil Creativo / Artístico',
    description: 'Orientación a la ideación visual, diseño, divergencia conceptual, estética y libertad.',
    scores: {
      // Intereses
      INT_R: 40, INT_I: 65, INT_A: 100, INT_S: 50, INT_E: 60, INT_C: 25,
      // Aptitudes
      APT_LOG: 50, APT_NUM: 30, APT_VER: 80, APT_ANA: 60, APT_ESP: 90, APT_CRE: 100, APT_SOC: 65, APT_ORG: 45,
      // Personalidad
      PER_SOC: 65, PER_INI: 90, PER_PER: 75, PER_ADA: 90, PER_COL: 70, PER_AUT: 90, PER_LID: 55, PER_EST: 65,
      // Valores
      VAL_EST: 40, VAL_ING: 65, VAL_IMP: 70, VAL_REC: 80, VAL_CRE: 100, VAL_APR: 85, VAL_AUT: 95, VAL_EQV: 75,
      // Preferencias
      PRE_PER: 60, PRE_DAT: 25, PRE_PRA: 75, PRE_VAR: 90, PRE_EST: 20, PRE_CAM: 55, PRE_TEC: 75, PRE_EXP: 70,
    }
  },
  'D_Negocios_Liderazgo': {
    name: 'Perfil Negocios / Liderazgo',
    description: 'Enfoque directivo, persuasión, finanzas, visión estratégica, negociación y reconocimiento.',
    scores: {
      // Intereses
      INT_R: 30, INT_I: 65, INT_A: 40, INT_S: 70, INT_E: 100, INT_C: 75,
      // Aptitudes
      APT_LOG: 75, APT_NUM: 70, APT_VER: 90, APT_ANA: 80, APT_ESP: 40, APT_CRE: 65, APT_SOC: 90, APT_ORG: 85,
      // Personalidad
      PER_SOC: 90, PER_INI: 95, PER_PER: 85, PER_ADA: 85, PER_COL: 80, PER_AUT: 75, PER_LID: 100, PER_EST: 80,
      // Valores
      VAL_EST: 75, VAL_ING: 100, VAL_IMP: 70, VAL_REC: 90, VAL_CRE: 65, VAL_APR: 80, VAL_AUT: 75, VAL_EQV: 55,
      // Preferencias
      PRE_PER: 90, PRE_DAT: 75, PRE_PRA: 40, PRE_VAR: 85, PRE_EST: 50, PRE_CAM: 45, PRE_TEC: 65, PRE_EXP: 90,
    }
  },
  'E_Practico_Campo': {
    name: 'Perfil Práctico / Campo',
    description: 'Preferencia por trabajo al aire libre, entornos físicos, agro, recursos naturales y ejecución.',
    scores: {
      // Intereses
      INT_R: 100, INT_I: 70, INT_A: 30, INT_S: 35, INT_E: 50, INT_C: 60,
      // Aptitudes
      APT_LOG: 80, APT_NUM: 70, APT_VER: 55, APT_ANA: 75, APT_ESP: 85, APT_CRE: 50, APT_SOC: 50, APT_ORG: 80,
      // Personalidad
      PER_SOC: 45, PER_INI: 75, PER_PER: 90, PER_ADA: 85, PER_COL: 70, PER_AUT: 85, PER_LID: 55, PER_EST: 80,
      // Valores
      VAL_EST: 85, VAL_ING: 75, VAL_IMP: 70, VAL_REC: 55, VAL_CRE: 45, VAL_APR: 80, VAL_AUT: 70, VAL_EQV: 75,
      // Preferencias
      PRE_PER: 40, PRE_DAT: 50, PRE_PRA: 100, PRE_VAR: 75, PRE_EST: 50, PRE_CAM: 100, PRE_TEC: 60, PRE_EXP: 25,
    }
  },
  'F_Equilibrado': {
    name: 'Perfil Equilibrado / Generalista',
    description: 'Puntuaciones medias homogéneas (~55-65) en todas las variables sin sesgo marcado.',
    scores: {
      // Intereses
      INT_R: 55, INT_I: 60, INT_A: 55, INT_S: 60, INT_E: 55, INT_C: 55,
      // Aptitudes
      APT_LOG: 60, APT_NUM: 60, APT_VER: 65, APT_ANA: 65, APT_ESP: 55, APT_CRE: 60, APT_SOC: 65, APT_ORG: 60,
      // Personalidad
      PER_SOC: 60, PER_INI: 65, PER_PER: 65, PER_ADA: 65, PER_COL: 65, PER_AUT: 60, PER_LID: 60, PER_EST: 60,
      // Valores
      VAL_EST: 65, VAL_ING: 65, VAL_IMP: 65, VAL_REC: 60, VAL_CRE: 60, VAL_APR: 65, VAL_AUT: 60, VAL_EQV: 70,
      // Preferencias
      PRE_PER: 60, PRE_DAT: 60, PRE_PRA: 60, PRE_VAR: 60, PRE_EST: 55, PRE_CAM: 50, PRE_TEC: 60, PRE_EXP: 50,
    }
  }
};

// 3. Funciones del motor MATCHING_V1
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
    family: career.family,
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
    similar_careers: similarCareersMap[career.slug] || [],
    matching_version: config.version,
    adn_version: config.adnVersion,
  };
}

function calculateAllMatches(rawProfile, careers, config = MATCHING_CONFIG_V1) {
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

// 4. Ejecución del Laboratorio para los 6 Perfiles
const labResults = {};
const careerAppearanceTracker = {};
careerProfiles.forEach(c => {
  careerAppearanceTracker[c.name] = {
    career: c.name,
    slug: c.slug,
    area: c.area,
    positions: [],
    times_in_top_5: 0,
    times_in_top_10: 0,
    times_in_top_20: 0,
  };
});

for (const [pKey, pData] of Object.entries(syntheticProfiles)) {
  const allRanked = calculateAllMatches(pData.scores, careerProfiles);
  const top20 = allRanked.slice(0, 20);

  // Registro de apariciones
  allRanked.forEach((m, idx) => {
    const pos = idx + 1;
    const t = careerAppearanceTracker[m.career_name];
    t.positions.push(pos);
    if (pos <= 5) t.times_in_top_5++;
    if (pos <= 10) t.times_in_top_10++;
    if (pos <= 20) t.times_in_top_20++;
  });

  // Métricas de concentración
  const sTop1 = top20[0].global_score;
  const sTop2 = top20[1].global_score;
  const sTop3 = top20[2].global_score;
  const sTop5 = top20[4].global_score;
  const sTop10 = top20[9].global_score;

  const diff1_2 = sTop1 - sTop2;
  const diff1_5 = sTop1 - sTop5;
  const diff1_10 = sTop1 - sTop10;

  const countWithin1 = allRanked.filter(m => (sTop1 - m.global_score) <= 1.0).length;
  const countWithin3 = allRanked.filter(m => (sTop1 - m.global_score) <= 3.0).length;
  const countWithin5 = allRanked.filter(m => (sTop1 - m.global_score) <= 5.0).length;

  const isCluster = (diff1_2 <= 2.0) || (diff1_5 <= 5.0) || (diff1_10 <= 8.0);

  // Causas para las Top 5
  const top5CausalAnalysis = top20.slice(0, 5).map(c => {
    // Variables que más contribuyeron (menor diferencia / mayor similitud)
    const sortedBySim = [...c.variable_analysis].sort((a, b) => b.similarity - a.similarity);
    const topContributingVars = sortedBySim.slice(0, 5).map(v => ({
      code: v.variable_code,
      dimension: v.dimension,
      similarity: v.similarity,
      diff: v.difference
    }));

    // Variables con mayor diferencia
    const sortedByDiff = [...c.variable_analysis].sort((a, b) => b.difference - a.difference);
    const topDivergentVars = sortedByDiff.slice(0, 5).map(v => ({
      code: v.variable_code,
      dimension: v.dimension,
      similarity: v.similarity,
      diff: v.difference
    }));

    // Dimensión más favorecida y menos favorecida
    const dimEntries = Object.entries(c.dimension_scores);
    dimEntries.sort((a, b) => b[1] - a[1]);
    const bestDimension = { dimension: dimEntries[0][0], score: dimEntries[0][1] };
    const worstDimension = { dimension: dimEntries[dimEntries.length - 1][0], score: dimEntries[dimEntries.length - 1][1] };

    return {
      career_name: c.career_name,
      global_score: c.global_score,
      bestDimension,
      worstDimension,
      topContributingVars,
      topDivergentVars,
    };
  });

  labResults[pKey] = {
    profileKey: pKey,
    name: pData.name,
    description: pData.description,
    scores_concentration: {
      top1_score: sTop1,
      top2_score: sTop2,
      top3_score: sTop3,
      top5_score: sTop5,
      top10_score: sTop10,
      diff_top1_top2: diff1_2,
      diff_top1_top5: diff1_5,
      diff_top1_top10: diff1_10,
      count_within_1pt: countWithin1,
      count_within_3pts: countWithin3,
      count_within_5pts: countWithin5,
      cluster_classification: isCluster ? 'high_similarity_cluster' : 'differentiated_distribution',
      cluster_criteria: {
        diff1_2_le_2: diff1_2 <= 2.0,
        diff1_5_le_5: diff1_5 <= 5.0,
        diff1_10_le_8: diff1_10 <= 8.0,
      }
    },
    top5_causes: top5CausalAnalysis,
    top20: top20.map((m, idx) => ({
      position: idx + 1,
      career_id: m.career_id,
      career_name: m.career_name,
      career_slug: m.career_slug,
      area: m.area,
      family: m.family,
      is_gold_set: m.is_gold_set,
      global_score: m.global_score,
      dimension_scores: m.dimension_scores,
      strongest_matches: m.strongest_matches,
      potential_gaps: m.potential_gaps,
      similar_careers: m.similar_careers,
    }))
  };
}

// 5. Análisis de Carreras Dominantes
const dominantAnalysis = Object.values(careerAppearanceTracker).map(t => {
  const avgPos = t.positions.reduce((a, b) => a + b, 0) / t.positions.length;
  return {
    career: t.career,
    slug: t.slug,
    area: t.area,
    average_position: Number(avgPos.toFixed(1)),
    times_in_top_5: t.times_in_top_5,
    times_in_top_10: t.times_in_top_10,
    times_in_top_20: t.times_in_top_20,
  };
});

// Carreras que aparecen con mayor frecuencia en top 10 o top 20
dominantAnalysis.sort((a, b) => b.times_in_top_10 - a.times_in_top_10 || a.average_position - b.average_position);

console.log('--- RESUMEN DEL LABORATORIO DE CALIBRACIÓN ---');
for (const [pKey, res] of Object.entries(labResults)) {
  console.log(`\nPERFIL: ${res.name}`);
  console.log(`Top 1: ${res.top20[0].career_name} (${res.top20[0].global_score.toFixed(2)}%)`);
  console.log(`Top 2: ${res.top20[1].career_name} (${res.top20[1].global_score.toFixed(2)}%)`);
  console.log(`Top 3: ${res.top20[2].career_name} (${res.top20[2].global_score.toFixed(2)}%)`);
  console.log(`Top 5: ${res.top20[4].career_name} (${res.top20[4].global_score.toFixed(2)}%)`);
  console.log(`Top 10: ${res.top20[9].career_name} (${res.top20[9].global_score.toFixed(2)}%)`);
  console.log(`Diff 1-2: ${res.scores_concentration.diff_top1_top2.toFixed(2)} | Diff 1-5: ${res.scores_concentration.diff_top1_top5.toFixed(2)} | Diff 1-10: ${res.scores_concentration.diff_top1_top10.toFixed(2)}`);
  console.log(`Dentro de 1 pt: ${res.scores_concentration.count_within_1pt} | Dentro de 3 pts: ${res.scores_concentration.count_within_3pts} | Dentro de 5 pts: ${res.scores_concentration.count_within_5pts}`);
  console.log(`Clasificación: ${res.scores_concentration.cluster_classification}`);
}

console.log('\n--- CARRERAS MÁS FRECUENTES EN TOP 10 / TOP 20 ---');
dominantAnalysis.slice(0, 15).forEach((d, i) => {
  console.log(`${i + 1}. ${d.career.padEnd(35)} | Top 5: ${d.times_in_top_5} | Top 10: ${d.times_in_top_10} | Top 20: ${d.times_in_top_20} | Pos Prom: ${d.average_position}`);
});

// Guardar resultado JSON estructurado
fs.writeFileSync('scripts/data/calibration_results_v1.json', JSON.stringify({
  generated_at: new Date().toISOString(),
  config: MATCHING_CONFIG_V1,
  profiles: syntheticProfiles,
  results: labResults,
  dominant_careers: dominantAnalysis
}, null, 2));

console.log('\nDatos estructurados guardados en scripts/data/calibration_results_v1.json');
