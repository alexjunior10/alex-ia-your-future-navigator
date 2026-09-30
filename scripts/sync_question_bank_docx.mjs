import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const docxPath = path.resolve('Preguntas-Diseño/Question_Bank_V1_Alex_IA.docx');
console.log('Loading docx from:', docxPath);

const zip = new AdmZip(docxPath);
let xml = zip.readAsText('word/document.xml');
console.log('Original document.xml length:', xml.length);

// Helper for safe XML replacements
function replaceOrWarn(searchStr, replaceStr, label) {
  if (xml.includes(searchStr)) {
    xml = xml.replace(searchStr, replaceStr);
    console.log(`✓ Replaced: ${label}`);
  } else {
    console.warn(`⚠ Pattern NOT found for: ${label}`);
  }
}

// 1. Governance notice after title
const titleTarget = 'Propósito: convertir el Blueprint 38×Evidencia V1 en un primer banco concreto de preguntas para estudiantes de 13–19 años.';
const titleReplace = 'Propósito: convertir el Blueprint 38×Evidencia V1 en un primer banco concreto de preguntas para estudiantes de 13–19 años. [NOTA DE GOBERNANZA OFICIAL: La fuente operativa y vinculante de scoring es Question_Option_Variable_Matrix_V1_1.xlsx. En caso de cualquier discrepancia, prevalece la Matriz V1.1.]';
replaceOrWarn(titleTarget, titleReplace, 'Governance notice');

// 2. Q02
replaceOrWarn('INT_R +1/+ INT_I +1; INT_A +2; INT_E +2', 'A: INT_R +1; B: INT_I +1; C: INT_A +2; D: INT_E +2', 'Q02 scoring');

// 3. Q07
replaceOrWarn('PRE_VAR +2; PRE_EST +1/PRE_EXP +1; PRE_TEC +2; PRE_PER +2', 'A: PRE_VAR +2; B: PRE_EST +1; C: PRE_TEC +2; D: PRE_PER +2', 'Q07 scoring');

// 4. Q08
replaceOrWarn('PRE_PRA +2; PRE_DAT +1; PRE_EXP +2; PRE_EST +2', 'A: PRE_PRA +2; B: 0 (Neutro); C: PRE_EXP +2; D: PRE_EST +2', 'Q08 scoring');

// 5. Q13 (including typo PER_ANA -> APT_ANA)
replaceOrWarn('PER_INI +2; PER_LID +2; PER_AUT -1; PER_ANA +1', 'A: PER_INI +2; B: PER_LID +2; C: 0 (Neutro); D: APT_ANA +1', 'Q13 scoring & typo fix');

// 6. Q14
replaceOrWarn('PER_ADA +2; PER_PER +2; PER_COL +1; PER_PER -2', 'A: PER_ADA +2; B: PER_PER +2; C: PER_COL +1; D: PER_PER -1', 'Q14 scoring');

// 7. Q15
replaceOrWarn('PER_SOC +2; PER_SOC -1/PER_ADA +1; PER_AUT +1/PER_INI +1; PER_LID +2', 'A: PER_SOC +2; B: 0 (Neutro); C: PER_AUT +1, PER_INI +1; D: PER_LID +2', 'Q15 scoring');

// 8. Q16
replaceOrWarn('PER_ADA +2; PER_ADA +1; PRE_EST +1; APT_ANA +1', 'A: PER_ADA +2; B: PER_ADA +1; C: PRE_EST +1; D: 0 (Neutro)', 'Q16 scoring');

// 9. Q17 (including typo PER_ORG -> APT_ORG)
replaceOrWarn('PER_AUT +2/PER_ORG +1; PER_AUT -1; PER_INI +2; PER_COL +1', 'A: APT_ORG +1, PER_AUT +2; B: 0 (Neutro); C: PER_INI +2; D: PER_COL +1', 'Q17 scoring & typo fix');

// 10. Q21
replaceOrWarn('PER_EST +2; PER_EST +1; PER_INI +1; APT_ANA +1', 'A: PER_EST +2; B: 0 (Neutro); C: PER_INI +1; D: APT_ANA +1', 'Q21 scoring');

// 11. Q25
replaceOrWarn('VAL_REC +1; VAL_EST +1/VAL_APR +1; VAL_IMP +2; VAL_CRE +2', 'A: 0 (Neutro); B: 0 (Neutro); C: VAL_IMP +2; D: VAL_CRE +2', 'Q25 scoring');

// 12. Q26
replaceOrWarn('VAL_AUT +2; VAL_EST +2; VAL_AUT +1; VAL_APR +2', 'A: VAL_AUT +2; B: VAL_EST +2; C: VAL_AUT +1; D: VAL_APR +2', 'Q26 scoring');

// 13. Q27
replaceOrWarn('VAL_EQV +2; VAL_REC +2; VAL_APR +2; VAL_EQV +2', 'A: VAL_EQV +2; B: 0 (Neutro); C: VAL_APR +2; D: VAL_EQV +2', 'Q27 scoring');

// 14. Q33 text and scoring
const q33Search = 'Un cubo tiene una flecha dibujada en una de sus caras. Si giras el cubo 90° hacia la derecha, ¿qué ocurre con la flecha respecto a la cara que ocupa?';
const q33Replace = 'Observa el cubo en el recurso visual (/assets/mini-retos/q33_cubo_espacial.svg). Tiene una flecha en su cara frontal. Si el cubo realiza un giro de 90° hacia la derecha en la dirección indicada, ¿qué orientación tiene la flecha?';
replaceOrWarn(q33Search, q33Replace, 'Q33 prompt text');

const q33Scoring = 'APT_ESP +2';
const q33ScoringNew = 'Correcta B: APT_ESP +2; Distractores A, C, D: APT_ESP -1 [Estímulo visual: q33_cubo_espacial.svg]';
replaceOrWarn(q33Scoring, q33ScoringNew, 'Q33 scoring with visual asset');

// 15. Q34 text and scoring (Experimental)
const q34Title = 'Q34 · Mini-reto creativo · Aptitud';
const q34TitleNew = 'Q34 · Mini-reto creativo · Aptitud [EXPERIMENTAL V1]';
replaceOrWarn(q34Title, q34TitleNew, 'Q34 title');

const q34Scoring = 'APT_CRE +2; INT_A +1';
const q34ScoringNew = 'A, B, C, D: 0 (Experimental - Record only). Se registra la respuesta del estudiante para análisis posterior, pero NO computa en el score de APT_CRE para V1.';
replaceOrWarn(q34Scoring, q34ScoringNew, 'Q34 experimental scoring');

// 16. Q38
replaceOrWarn('PER_ADA +2; PRE_EST +1; APT_CRE +1/PER_ADA +1; PRE_CAM +1', 'A: PER_ADA +2; B: 0 (Neutro); C: APT_CRE +1, PER_ADA +1; D: PRE_CAM +1', 'Q38 scoring');

// 17. Q39
replaceOrWarn('PRE_EST +2; VAL_AUT +1/PRE_CAM +1; VAL_IMP +1; PRE_EXP +2', 'A: PRE_EST +2; B: 0 (Neutro); C: VAL_IMP +1; D: PRE_EXP +2', 'Q39 scoring');

// Write updated XML back into docx
zip.updateFile('word/document.xml', Buffer.from(xml, 'utf-8'));
zip.writeZip(docxPath);
console.log('Successfully synchronized Question_Bank_V1_Alex_IA.docx!');
