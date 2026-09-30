import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

const sheet = workbook.Sheets['Matriz Rediseñada'];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });
const careerNames = rows[2].slice(3).filter(Boolean);

console.log('Total careers:', careerNames.length);

const sheetCarreras = workbook.Sheets['Carreras'];
const rowsCarreras = XLSX.utils.sheet_to_json(sheetCarreras, { header: 1 });
const carrerasCatalog = rowsCarreras.slice(1).filter(r => r && r[0]).map(r => ({
  name: r[0],
  type: r[1]
}));

console.log('\nList of all 132 careers with index:');
careerNames.forEach((c, idx) => {
  console.log(`${idx + 1}. ${c}`);
});

// Check equivalent or very similar career names
console.log('\n--- Checking Similar Career Names ---');
function simplify(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(de|la|el|y|en|e|\/)\b/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim().replace(/\s+/g, ' ');
}

for (let i = 0; i < careerNames.length; i++) {
  for (let j = i + 1; j < careerNames.length; j++) {
    const s1 = simplify(careerNames[i]);
    const s2 = simplify(careerNames[j]);
    if (s1 === s2 || s1.includes(s2) || s2.includes(s1)) {
      console.log(`Potential overlap/similarity: "${careerNames[i]}" <==> "${careerNames[j]}"`);
    }
  }
}
