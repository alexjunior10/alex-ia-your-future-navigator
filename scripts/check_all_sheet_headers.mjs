import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

for (const sName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  console.log(`Sheet: ${sName}, Rows: ${rows.length}, Header:`, rows[0] || rows[1] || rows[2]);
}
