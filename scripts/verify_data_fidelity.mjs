import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

const sheetMatriz = workbook.Sheets['Matriz Rediseñada'];
const rowsMatriz = XLSX.utils.sheet_to_json(sheetMatriz, { header: 1, defval: null });

const headerRow = rowsMatriz[2];
const rawCareerNames = headerRow.slice(3).filter(Boolean);
const dataRows = rowsMatriz.slice(3).filter(r => r && r[0]);

const exportedData = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));

console.log('=== VERIFICANDO FIDELIDAD AL 100% CONTRA EL EXCEL ===');

let mismatches = 0;
let checkedScores = 0;

exportedData.careers.forEach((career, cIdx) => {
  const colIndex = cIdx + 3;
  const careerExcelName = rawCareerNames[cIdx];

  exportedData.variables.forEach((variable, vIdx) => {
    const excelRow = dataRows[vIdx];
    const excelVarCode = String(excelRow[0]).trim();
    const excelVal = Number(excelRow[colIndex]);

    const adnEntry = exportedData.adnRecords.find(
      r => r.career_slug === career.slug && r.variable_code === variable.code
    );

    if (!adnEntry) {
      console.error(`FALTA REGISTRO: Carrera ${career.name} (${career.slug}), Variable: ${variable.code}`);
      mismatches++;
    } else if (adnEntry.score !== excelVal) {
      console.error(`SCORE DISCORDANTE: Carrera ${career.name}, Variable: ${variable.code} -> Excel: ${excelVal}, Export: ${adnEntry.score}`);
      mismatches++;
    }

    checkedScores++;
  });
});

console.log(`\nResultados del chequeo:`);
console.log(`- Scores comparados: ${checkedScores}`);
console.log(`- Discordancias encontradas: ${mismatches}`);

if (mismatches === 0) {
  console.log('✅ ÉXITO TOTAL: Ningún score fue modificado. 100% de coincidencia exacta con el Excel.');
} else {
  console.error(`❌ FALLA: Se detectaron ${mismatches} discrepancias.`);
  process.exit(1);
}
