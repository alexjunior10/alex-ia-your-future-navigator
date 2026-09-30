import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

const sheetMatriz = workbook.Sheets['Matriz Rediseñada'];
const rowsMatriz = XLSX.utils.sheet_to_json(sheetMatriz, { header: 1, defval: null });
const matrixCareers = rowsMatriz[2].slice(3).filter(Boolean);

const sheetCarreras = workbook.Sheets['Carreras'];
const rowsCarreras = XLSX.utils.sheet_to_json(sheetCarreras, { header: 1 });
const carrerasEntries = rowsCarreras.slice(1).filter(r => r && r[0]);

console.log(`Careers in Matriz Rediseñada: ${matrixCareers.length}`);
console.log(`Careers in Carreras sheet: ${carrerasEntries.length}`);

// Normalize names for comparison
function norm(str) {
  return String(str || '')
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '');
}

const matrixNormMap = new Map();
matrixCareers.forEach(c => matrixNormMap.set(norm(c), c));

const sheetNormMap = new Map();
carrerasEntries.forEach(r => sheetNormMap.set(norm(r[0]), r[0]));

console.log('\n--- Normalization Match Check ---');
const notInSheet = [];
matrixCareers.forEach(c => {
  const n = norm(c);
  if (!sheetNormMap.has(n)) {
    notInSheet.push(c);
  }
});
console.log('Matrix careers with no normalized match in Carreras sheet:', notInSheet);

const notInMatrix = [];
carrerasEntries.forEach(r => {
  const n = norm(r[0]);
  if (!matrixNormMap.has(n)) {
    notInMatrix.push(r[0]);
  }
});
console.log('Carreras sheet items with no normalized match in Matrix:', notInMatrix);

console.log('\n--- Career types / categories in Carreras sheet ---');
const typeCounts = {};
carrerasEntries.forEach(r => {
  const t = r[1] || 'Sin tipo';
  typeCounts[t] = (typeCounts[t] || 0) + 1;
});
console.log(typeCounts);

// Check if any career in Carreras sheet is duplicate
const sheetNames = carrerasEntries.map(r => r[0]);
const duplicatesInSheet = sheetNames.filter((item, index) => sheetNames.indexOf(item) !== index);
console.log('Duplicates in Carreras sheet:', duplicatesInSheet);
