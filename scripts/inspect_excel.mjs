import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
console.log('Loading file:', filePath);

const workbook = XLSX.readFile(filePath);
console.log('Sheet names:', workbook.SheetNames);

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
  console.log(`\n--- Sheet: ${sheetName} ---`);
  console.log(`Range: ${sheet['!ref']}, Rows: ${range.e.r + 1}, Cols: ${range.e.c + 1}`);
  
  // Read first 5 rows
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  console.log('First 5 rows:');
  for (let i = 0; i < Math.min(5, jsonData.length); i++) {
    console.log(`Row ${i}:`, JSON.stringify(jsonData[i]));
  }
}
