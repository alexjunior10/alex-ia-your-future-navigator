import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

const sheet = workbook.Sheets['Matriz Rediseñada'];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });
const careerNames = rows[2].slice(3).filter(Boolean);
const dataRows = rows.slice(3).filter(r => r && r[0]);

const careerProfiles = {};
careerNames.forEach((cName, cIdx) => {
  const colIdx = cIdx + 3;
  careerProfiles[cName] = dataRows.map(r => Number(r[colIdx]));
});

// Check if any two careers have exact same scores
const exactDuplicates = [];
for (let i = 0; i < careerNames.length; i++) {
  for (let j = i + 1; j < careerNames.length; j++) {
    const c1 = careerNames[i];
    const c2 = careerNames[j];
    const p1 = careerProfiles[c1];
    const p2 = careerProfiles[c2];
    
    let isIdentical = true;
    for (let k = 0; k < p1.length; k++) {
      if (p1[k] !== p2[k]) {
        isIdentical = false;
        break;
      }
    }
    if (isIdentical) {
      exactDuplicates.push([c1, c2]);
    }
  }
}

console.log('Exact duplicate ADN profiles:', exactDuplicates);

// Calculate Euclidean distance & Pearson correlation between all pairs to find closest ones
function pearsonCorr(x, y) {
  const n = x.length;
  const mx = x.reduce((a, b) => a + b, 0) / n;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den1 = 0;
  let den2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;
    num += dx * dy;
    den1 += dx * dx;
    den2 += dy * dy;
  }
  return num / Math.sqrt(den1 * den2);
}

const highestCorrs = [];
for (let i = 0; i < careerNames.length; i++) {
  for (let j = i + 1; j < careerNames.length; j++) {
    const c1 = careerNames[i];
    const c2 = careerNames[j];
    const corr = pearsonCorr(careerProfiles[c1], careerProfiles[c2]);
    if (corr >= 0.95) {
      highestCorrs.push({ c1, c2, corr: corr.toFixed(4) });
    }
  }
}

highestCorrs.sort((a, b) => b.corr - a.corr);
console.log(`\nPairs with correlation >= 0.95 (Total: ${highestCorrs.length}):`);
highestCorrs.forEach(p => console.log(`  ${p.c1} <--> ${p.c2}: r = ${p.corr}`));
