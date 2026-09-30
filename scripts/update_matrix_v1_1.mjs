import fs from 'fs';
import path from 'path';
import pkg from 'xlsx';
const { readFile, utils, writeFile } = pkg;

const filePath = path.resolve('Preguntas-Diseño/Question_Option_Variable_Matrix_V1_1.xlsx');
console.log('Reading Excel from:', filePath);
const wb = readFile(filePath);

// 1. UPDATE README
const readmeRows = utils.sheet_to_json(wb.Sheets['README'], { defval: '' });
readmeRows.push({
  item: 'ESTADO OFICIAL',
  definition: 'FUENTE OPERATIVA OFICIAL DE SCORING V1 DE ALEX IA'
});
readmeRows.push({
  item: 'REGLA DE PREVALENCIA',
  definition: 'En caso de discrepancia con cualquier documento narrativo o histórico, prevalece Question_Option_Variable_Matrix_V1_1.xlsx.'
});
wb.Sheets['README'] = utils.json_to_sheet(readmeRows);

// 2. UPDATE MATRIX SHEET
const matrixRows = utils.sheet_to_json(wb.Sheets['Matrix'], { defval: null });
console.log('Original Matrix rows count:', matrixRows.length);

const cleanedMatrix = [];
const seenKeys = new Set();

for (const r of matrixRows) {
  // If Q26 B PROPOSED_STRUCTURED, skip it (keeping REVISED_STRUCTURED)
  if (r.question_id === 'Q26' && r.option === 'B' && r.mapping_status === 'PROPOSED_STRUCTURED') {
    console.log('Skipping duplicate Q26 B PROPOSED_STRUCTURED row');
    continue;
  }

  // Deduplicate empty variable rows (like duplicate Q25 B, Q34 C, Q39 B)
  const dedupKey = `${r.question_id}|${r.option}|${r.variable || ''}`;
  if (seenKeys.has(dedupKey) && (!r.variable || r.variable === '')) {
    console.log('Skipping duplicate empty variable row:', dedupKey);
    continue;
  }
  seenKeys.add(dedupKey);

  // Update Q34 to EXPERIMENTAL_RECORD_ONLY
  if (r.question_id === 'Q34') {
    r.question_type = 'Mini-reto creativo (Experimental)';
    r.variable = '';
    r.evidence = 0;
    r.question_weight = 0;
    r.weighted_evidence = 0;
    r.mapping_status = 'EXPERIMENTAL_RECORD_ONLY';
    r.objective_correct = false;
    r.rubric_note = 'EXPERIMENTAL V1: Registrada para análisis posterior. No computa en APT_CRE para V1.';
  }

  // Update Q33 with visual asset note
  if (r.question_id === 'Q33') {
    r.rubric_note = 'Estímulo visual: q33_cubo_espacial.svg. Clave B (+2 APT_ESP). Distractores A, C, D (-1 APT_ESP).';
  }

  cleanedMatrix.push(r);
}

console.log('Cleaned Matrix rows count:', cleanedMatrix.length);
wb.Sheets['Matrix'] = utils.json_to_sheet(cleanedMatrix);

// 3. UPDATE SCORING_CONFIG
const scoringConfig = utils.sheet_to_json(wb.Sheets['Scoring_Config'], { defval: '' });
for (const sc of scoringConfig) {
  if (sc.parameter === 'Q34') {
    sc.value = 'Experimental (Record only)';
    sc.note = 'Registrada para análisis posterior; no computa en APT_CRE para V1.';
  }
}
scoringConfig.push({
  parameter: 'Q33_VISUAL_ASSET',
  value: 'q33_cubo_espacial.svg',
  note: 'Recurso visual integrado en /assets/mini-retos/'
});
scoringConfig.push({
  parameter: 'OFFICIAL_SOURCE_STATUS',
  value: 'CONGELADA_OFICIAL',
  note: 'Fuente operativa de verdad prevalente sobre cualquier texto descriptivo.'
});
wb.Sheets['Scoring_Config'] = utils.json_to_sheet(scoringConfig);

// 4. UPDATE REVIEW_FLAGS
const reviewFlags = utils.sheet_to_json(wb.Sheets['Review_Flags'], { defval: '' });
for (const rf of reviewFlags) {
  if (rf.question_id === 'Q34') {
    rf.decision = 'CERRADO';
    rf.resolution = 'Pregunta experimental en V1. Se captura respuesta pero no computa en APT_CRE. No requiere rúbrica en V1.';
  }
}
reviewFlags.push({
  question_id: 'Q26',
  option: 'B',
  decision: 'CERRADO',
  resolution: 'Duplicado eliminado en Matriz V1.1. Una sola asignación B = VAL_EST +2.'
});
reviewFlags.push({
  question_id: 'Q33',
  option: 'ALL',
  decision: 'CERRADO',
  resolution: 'Estímulo visual integrado (q33_cubo_espacial.svg). Evalúa razonamiento espacial limpio con Clave B.'
});
wb.Sheets['Review_Flags'] = utils.json_to_sheet(reviewFlags);

// 5. RECOMPUTE VARIABLE COVERAGE
const coverageMap = {};
for (const r of cleanedMatrix) {
  if (r.variable && r.variable.trim()) {
    const v = r.variable.trim();
    if (!coverageMap[v]) coverageMap[v] = new Set();
    coverageMap[v].add(r.question_id);
  }
}

const coverageRows = utils.sheet_to_json(wb.Sheets['Variable_Coverage'], { defval: '' });
for (const row of coverageRows) {
  const v = row.variable;
  if (coverageMap[v]) {
    const qs = [...coverageMap[v]].sort();
    row.revised_question_coverage = qs.join(',');
    row.revised_count = qs.length;
    row.status = qs.length >= 3 ? 'Adecuada' : 'REVISAR — <3 evidencias';
  }
}
wb.Sheets['Variable_Coverage'] = utils.json_to_sheet(coverageRows);

// Save back to Excel
writeFile(wb, filePath);
console.log('Successfully updated Question_Option_Variable_Matrix_V1_1.xlsx!');
