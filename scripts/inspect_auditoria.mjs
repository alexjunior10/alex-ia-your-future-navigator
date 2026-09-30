import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

const sheet = workbook.Sheets['Auditoria_Nuevas_Carreras'];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
console.log('Auditoria_Nuevas_Carreras total rows:', rows.length);
console.log('Headers:', rows[0]);
console.log('First 5 rows:');
for (let i = 1; i <= 5; i++) {
  console.log(rows[i]);
}
console.log('Last 5 rows:');
for (let i = rows.length - 5; i < rows.length; i++) {
  console.log(rows[i]);
}
