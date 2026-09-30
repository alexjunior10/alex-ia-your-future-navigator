import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

const sheet = workbook.Sheets['Matriz Rediseñada'];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });

const dataRows = rows.slice(3).filter(r => r && r[0]);

console.log('Total variable rows:', dataRows.length);
console.log('| # | Code | Dimension | Variable Name |');
console.log('|---|---|---|---|');
dataRows.forEach((r, i) => {
  console.log(`| ${i + 1} | ${r[0]} | ${r[1]} | ${r[2]} |`);
});
