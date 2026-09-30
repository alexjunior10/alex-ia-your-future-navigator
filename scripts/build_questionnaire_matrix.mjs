import pkg from 'xlsx';
import fs from 'fs';
const { readFile, utils } = pkg;

const wb = readFile('Preguntas-Diseño/Question_Option_Variable_Matrix_V1_1.xlsx');
const rows = utils.sheet_to_json(wb.Sheets['Matrix']);

const cleanRows = rows.map(r => ({
  question_id: r.question_id,
  base_question_id: r.base_question_id || r.question_id,
  variant_id: r.variant_id || (r.question_id + '_BASE'),
  grade_level: r.grade_level || 'ALL',
  difficulty_level: r.difficulty_level ?? null,
  option: r.option,
  question_type: r.question_type,
  dimension: r.dimension,
  variable: r.variable || null,
  evidence: Number(r.evidence),
  question_weight: Number(r.question_weight),
  weighted_evidence: Number(r.weighted_evidence),
  mapping_status: r.mapping_status || 'PROPOSED_STRUCTURED',
  objective_correct: Boolean(r.objective_correct)
}));

const tsContent = `// ARCHIVO AUTOGENERADO DESDE Question_Option_Variable_Matrix_V1_1.xlsx
// FUENTE OPERATIVA OFICIAL DE SCORING CONGELADA (ALEX IA QUESTIONNAIRE V1.1)
// TOTAL MAPPINGS: ${cleanRows.length}

import type { QuestionOptionMapping, QuestionOptionKey } from './types';

export const QUESTION_OPTION_MATRIX: QuestionOptionMapping[] = ${JSON.stringify(cleanRows, null, 2)};

/**
 * Obtiene los mappings de evidencia para una pregunta y opción seleccionada.
 */
export function getOptionMappings(
  baseQuestionId: string,
  option: QuestionOptionKey
): QuestionOptionMapping[] {
  return QUESTION_OPTION_MATRIX.filter(
    (m) => m.base_question_id === baseQuestionId && m.option === option
  );
}
`;

fs.writeFileSync('src/lib/questionnaire/matrix.ts', tsContent, 'utf-8');
console.log('matrix.ts written with', cleanRows.length, 'mappings.');
