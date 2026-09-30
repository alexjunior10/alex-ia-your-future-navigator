import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

const sheetResumen = workbook.Sheets['Resumen del Rediseño'];
const rowsResumen = XLSX.utils.sheet_to_json(sheetResumen, { header: 1 });
console.log('=== RESUMEN DEL REDISEÑO ===');
rowsResumen.forEach(r => console.log(r));

const sheetJust = workbook.Sheets['Justificación de Cambios'];
const rowsJust = XLSX.utils.sheet_to_json(sheetJust, { header: 1 });
console.log('\n=== JUSTIFICACIÓN DE CAMBIOS (Total rows: ' + rowsJust.length + ') ===');
console.log('Header:', rowsJust[2]);
console.log('Sample rows:');
for (let i = 3; i < Math.min(10, rowsJust.length); i++) {
  console.log(rowsJust[i]);
}
