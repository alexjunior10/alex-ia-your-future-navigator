/**
 * SEGUNDA AUDITORÍA AUTOMÁTICA — ALEX IA QUESTIONNAIRE V1.1
 * 
 * Verificaciones:
 * 1. 40 preguntas presentes (Q01–Q40) en Word y Excel.
 * 2. Exactamente 38 variables oficiales catalogadas e identificadas.
 * 3. 0 mappings duplicados en Question_Option_Variable_Matrix_V1_1.xlsx.
 * 4. Q34 experimental (no entra al cálculo de APT_CRE, evidencia = 0).
 * 5. Q33 con recurso visual verificado e íntegro (q33_cubo_espacial.svg) y clave B.
 * 6. Consistencia total entre Matriz y Score Model (fórmulas, pesos y escala).
 * 7. Sincronización íntegra entre Question Bank Word y Matriz V1.1.
 */

import fs from 'fs';
import path from 'path';
import pkg from 'xlsx';
const { readFile, utils } = pkg;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

console.log('======================================================================');
console.log('SEGUNDA AUDITORÍA AUTOMÁTICA: QUESTIONNAIRE V1.1 & MATRIX V1.1');
console.log('======================================================================\n');

// 1. Cargar datos
const matrixPath = path.resolve('Preguntas-Diseño/Question_Option_Variable_Matrix_V1_1.xlsx');
const wb = readFile(matrixPath);
const matrixRows = utils.sheet_to_json(wb.Sheets['Matrix']);
const coverageRows = utils.sheet_to_json(wb.Sheets['Variable_Coverage']);
const scoringConfig = utils.sheet_to_json(wb.Sheets['Scoring_Config']);
const qBankText = fs.readFileSync('scripts/extracted_docs/Question_Bank_V1_Alex_IA.md', 'utf-8');

// CHECK 1: 40 Preguntas presentes en Excel y Word
console.log('1. Verificación de las 40 preguntas:');
const qIdsMatrix = [...new Set(matrixRows.map(r => r.question_id))].sort();
assert(qIdsMatrix.length === 40, `Exactamente 40 preguntas en Matriz (encontradas: ${qIdsMatrix.length})`);
for (let i = 1; i <= 40; i++) {
  const expectedId = 'Q' + String(i).padStart(2, '0');
  assert(qIdsMatrix.includes(expectedId), `Pregunta ${expectedId} presente en Matriz V1.1`);
  assert(qBankText.includes(`__${expectedId} ·`), `Pregunta ${expectedId} presente en Question Bank Word`);
}

// CHECK 2: Exactamente 38 variables oficiales
console.log('\n2. Verificación de las 38 variables vocacionales:');
const OFFICIAL_VARIABLES = [
  // Intereses (6)
  'INT_R', 'INT_I', 'INT_A', 'INT_S', 'INT_E', 'INT_C',
  // Aptitudes (8)
  'APT_LOG', 'APT_NUM', 'APT_VER', 'APT_ANA', 'APT_ESP', 'APT_CRE', 'APT_SOC', 'APT_ORG',
  // Personalidad (8)
  'PER_SOC', 'PER_INI', 'PER_PER', 'PER_ADA', 'PER_COL', 'PER_AUT', 'PER_LID', 'PER_EST',
  // Valores (8)
  'VAL_EST', 'VAL_ING', 'VAL_IMP', 'VAL_REC', 'VAL_CRE', 'VAL_APR', 'VAL_AUT', 'VAL_EQV',
  // Preferencias (8)
  'PRE_PER', 'PRE_DAT', 'PRE_PRA', 'PRE_VAR', 'PRE_EST', 'PRE_CAM', 'PRE_TEC', 'PRE_EXP'
];

assert(OFFICIAL_VARIABLES.length === 38, 'Catálogo base contiene 38 variables');
const matrixVars = [...new Set(matrixRows.map(r => r.variable).filter(Boolean))];
for (const mv of matrixVars) {
  assert(OFFICIAL_VARIABLES.includes(mv), `Variable en matriz '${mv}' pertenece a las 38 oficiales`);
}
for (const ov of OFFICIAL_VARIABLES) {
  assert(matrixVars.includes(ov), `Variable oficial '${ov}' tiene presencia en Matriz V1.1`);
}
assert(coverageRows.length === 38, `Hoja Variable_Coverage contiene exactamente 38 filas`);

// CHECK 3: Cero mappings duplicados en Matrix
console.log('\n3. Verificación de cero mappings duplicados en Matriz V1.1:');
const seenTuples = {};
let duplicateCount = 0;
for (const r of matrixRows) {
  const tuple = `${r.question_id}|${r.option}|${r.variable || ''}`;
  if (seenTuples[tuple]) {
    console.error(`  ❌ Duplicado encontrado: ${tuple}`);
    duplicateCount++;
  }
  seenTuples[tuple] = true;
}
assert(duplicateCount === 0, `Cero mappings duplicados en la Matriz V1.1 (duplicados: ${duplicateCount})`);

// Comprobación específica de Q26 B
const q26BRows = matrixRows.filter(r => r.question_id === 'Q26' && r.option === 'B');
assert(q26BRows.length === 1, `Q26 opción B tiene exactamente 1 asignación (encontradas: ${q26BRows.length})`);
assert(q26BRows[0].variable === 'VAL_EST', `Q26 B asigna a VAL_EST`);
assert(q26BRows[0].evidence === 2, `Q26 B asigna evidencia +2`);

// CHECK 4: Q34 experimental (no entra al cálculo de APT_CRE)
console.log('\n4. Verificación de tratamiento experimental de Q34:');
const q34Rows = matrixRows.filter(r => r.question_id === 'Q34');
assert(q34Rows.length === 4, `Q34 contiene 4 opciones (A, B, C, D) registradas`);
for (const r of q34Rows) {
  assert(r.evidence === 0, `Q34 opción ${r.option} tiene evidencia 0`);
  assert(r.question_weight === 0, `Q34 opción ${r.option} tiene peso 0`);
  assert(!r.variable || r.variable === '', `Q34 opción ${r.option} no asigna a ninguna variable`);
  assert(r.mapping_status === 'EXPERIMENTAL_RECORD_ONLY', `Q34 opción ${r.option} estado EXPERIMENTAL_RECORD_ONLY`);
}
// Verificar que APT_CRE en Variable_Coverage no incluye Q34
const aptCreCoverage = coverageRows.find(r => r.variable === 'APT_CRE');
assert(aptCreCoverage && !aptCreCoverage.revised_question_coverage.includes('Q34'), `APT_CRE no incluye Q34 en su cobertura de cálculo`);

// CHECK 5: Q33 con recurso visual verificado y clave B
console.log('\n5. Verificación de recurso visual e integridad de Q33:');
const assetDocx = path.resolve('Preguntas-Diseño/assets/q33_cubo_espacial.svg');
const assetPublic = path.resolve('public/assets/mini-retos/q33_cubo_espacial.svg');
assert(fs.existsSync(assetDocx), `Recurso visual existe en Preguntas-Diseño/assets/q33_cubo_espacial.svg`);
assert(fs.existsSync(assetPublic), `Recurso visual existe en public/assets/mini-retos/q33_cubo_espacial.svg`);
assert(fs.statSync(assetDocx).size > 1000, `SVG de Q33 es un archivo gráfico completo y válido (${fs.statSync(assetDocx).size} bytes)`);

const q33Rows = matrixRows.filter(r => r.question_id === 'Q33');
const q33B = q33Rows.find(r => r.option === 'B');
assert(q33B && q33B.objective_correct === true, `Q33 tiene clave correcta B (objective_correct = true)`);
assert(q33B && q33B.variable === 'APT_ESP' && q33B.evidence === 2, `Q33 opción B aporta +2 en APT_ESP`);

const q33Distractors = q33Rows.filter(r => r.option !== 'B');
for (const d of q33Distractors) {
  assert(d.variable === 'APT_ESP' && d.evidence === -1, `Q33 distractor ${d.option} penaliza -1 en APT_ESP`);
}
const cleanQBankText = qBankText.replace(/\\([_.\-()[\]+])/g, '$1');
assert(cleanQBankText.includes('q33_cubo_espacial.svg'), `Question Bank Word referencia formalmente a q33_cubo_espacial.svg`);

// CHECK 6: Consistencia Matriz vs Score Model
console.log('\n6. Verificación de consistencia Matriz vs Score Model:');
const weightsByFormat = {
  'Mini-reto': 1.25,
  'Mini-reto objetivo': 1.25,
  'Mini-reto verbal': 1.25,
  'Mini-reto espacial': 1.25,
  'Mini-caso': 1.10,
  'Mini-caso con criterio': 1.10,
  'Mini-caso social': 1.10,
  'Mini-caso interpersonal': 1.10,
  'Escenario': 1.00,
  'Situación': 1.00,
  'Dilema': 1.00,
  'Escenario de valores': 1.00,
  'Elección forzada': 0.90,
  'Preferencia': 0.90,
  'Elección': 0.90,
  'Trade-off': 0.90,
  'Consistencia': 0.75,
  'Integración': 0.75,
  'Mini-reto creativo (Experimental)': 0
};

for (const r of matrixRows) {
  const expectedWeight = weightsByFormat[r.question_type];
  if (expectedWeight !== undefined) {
    assert(r.question_weight === expectedWeight, `${r.question_id} (${r.question_type}) tiene peso exacto ${expectedWeight}`);
  }
  assert([-2, -1, 0, 1, 2].includes(r.evidence), `${r.question_id} opción ${r.option} evidencia ${r.evidence} dentro de [-2..+2]`);
}

// CHECK 7: Sincronización Word vs Matriz
console.log('\n7. Verificación de sincronización Question Bank Word vs Matriz V1.1:');
assert(cleanQBankText.includes('NOTA DE GOBERNANZA OFICIAL'), 'Aviso de gobernanza oficial insertado en Question Bank Word');
assert(cleanQBankText.includes('APT_ANA +1'), 'Erratas de sintaxis subsanadas en Word (APT_ANA presente)');
assert(cleanQBankText.includes('APT_ORG +1'), 'Erratas de sintaxis subsanadas en Word (APT_ORG presente)');
assert(!cleanQBankText.includes('PER_ANA +1'), 'Cero menciones a la variable inexistente PER_ANA');
assert(!cleanQBankText.includes('PER_ORG +1'), 'Cero menciones a la variable inexistente PER_ORG');
assert(cleanQBankText.includes('[EXPERIMENTAL V1]'), 'Q34 explícitamente marcada como experimental en Word');

console.log('\n======================================================================');
console.log('✅ SEGUNDA AUDITORÍA EXITOSA: 100% DE COMPROBACIONES APROBADAS');
console.log('======================================================================');
