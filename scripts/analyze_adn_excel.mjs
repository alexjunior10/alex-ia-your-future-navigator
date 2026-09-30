import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

console.log('=== SHEETS IN WORKBOOK ===');
console.log(workbook.SheetNames);

const expectedVariables = [
  // INTERESES (6)
  'INT_R', 'INT_I', 'INT_A', 'INT_S', 'INT_E', 'INT_C',
  // APTITUDES (8)
  'APT_LOG', 'APT_NUM', 'APT_VER', 'APT_ANA', 'APT_ESP', 'APT_CRE', 'APT_SOC', 'APT_ORG',
  // PERSONALIDAD (8)
  'PER_SOC', 'PER_INI', 'PER_PER', 'PER_ADA', 'PER_COL', 'PER_AUT', 'PER_LID', 'PER_EST',
  // VALORES (8)
  'VAL_EST', 'VAL_ING', 'VAL_IMP', 'VAL_REC', 'VAL_CRE', 'VAL_APR', 'VAL_AUT', 'VAL_EQV',
  // PREFERENCIAS (8)
  'PRE_PER', 'PRE_DAT', 'PRE_PRA', 'PRE_VAR', 'PRE_EST', 'PRE_CAM', 'PRE_TEC', 'PRE_EXP'
];

console.log('\nExpected variables count:', expectedVariables.length);

// Analyze sheet: Matriz Rediseñada
const sheet = workbook.Sheets['Matriz Rediseñada'];
if (!sheet) {
  console.error('Sheet "Matriz Rediseñada" NOT FOUND!');
  process.exit(1);
}

// Convert to 2D array of rows
const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null });
console.log(`Total raw rows in "Matriz Rediseñada": ${rawRows.length}`);

// Let's inspect the first 5 rows to locate header row
for (let i = 0; i < Math.min(10, rawRows.length); i++) {
  console.log(`Row index ${i}: [${rawRows[i].slice(0, 8).map(x => JSON.stringify(x)).join(', ')}...] (length: ${rawRows[i].length})`);
}

// Check row index 2 where "ID", "Dimension", "Variable" appears
const headerRowIdx = rawRows.findIndex(r => r && (r[0] === 'ID' || r.includes('ID')));
console.log(`\nHeader row index: ${headerRowIdx}`);
const headerRow = rawRows[headerRowIdx];
console.log(`Header row total columns: ${headerRow.length}`);

const col0 = headerRow[0]; // ID
const col1 = headerRow[1]; // Dimension
const col2 = headerRow[2]; // Variable
console.log(`Meta columns: [0]: ${col0}, [1]: ${col1}, [2]: ${col2}`);

const careerNames = headerRow.slice(3).filter(c => c !== null && c !== undefined && String(c).trim() !== '');
console.log(`Total careers in header: ${careerNames.length}`);

// Data rows
const dataRows = rawRows.slice(headerRowIdx + 1).filter(r => r && r[0] && String(r[0]).trim() !== '');
console.log(`Total data rows (variables): ${dataRows.length}`);

const foundVariables = dataRows.map(r => String(r[0]).trim());
console.log('\nFound variables in rows:');
console.log(foundVariables);

// Check variables matching
const missingVars = expectedVariables.filter(v => !foundVariables.includes(v));
const unexpectedVars = foundVariables.filter(v => !expectedVariables.includes(v));
const duplicateVars = foundVariables.filter((item, index) => foundVariables.indexOf(item) !== index);

console.log('\n--- VARIABLE CHECKS ---');
console.log('Missing variables:', missingVars);
console.log('Unexpected variables:', unexpectedVars);
console.log('Duplicate variables:', duplicateVars);

// Check careers
const duplicateCareers = careerNames.filter((item, index) => careerNames.indexOf(item) !== index);
console.log('\n--- CAREER CHECKS ---');
console.log('Total career count:', careerNames.length);
console.log('Duplicate careers:', duplicateCareers);

// Check scores for each career
const validationIssues = [];
const careerStats = {};

careerNames.forEach((careerName, cIdx) => {
  const colIndex = cIdx + 3;
  let scoresCount = 0;
  let nullCount = 0;
  let outOfRangeCount = 0;
  let notMultipleOf5Count = 0;
  const careerScores = {};

  dataRows.forEach((row, rIdx) => {
    const varCode = String(row[0]).trim();
    const val = row[colIndex];

    if (val === null || val === undefined || val === '') {
      nullCount++;
      validationIssues.push({
        type: 'NULL_VALUE',
        career: careerName,
        variable: varCode,
        value: val,
        row: headerRowIdx + 1 + rIdx,
        col: colIndex
      });
    } else {
      const numVal = Number(val);
      if (isNaN(numVal)) {
        validationIssues.push({
          type: 'NON_NUMERIC',
          career: careerName,
          variable: varCode,
          value: val
        });
      } else {
        if (numVal < 0 || numVal > 100) {
          outOfRangeCount++;
          validationIssues.push({
            type: 'OUT_OF_RANGE',
            career: careerName,
            variable: varCode,
            value: numVal
          });
        }
        if (numVal % 5 !== 0) {
          notMultipleOf5Count++;
          validationIssues.push({
            type: 'NOT_MULTIPLE_OF_5',
            career: careerName,
            variable: varCode,
            value: numVal
          });
        }
        careerScores[varCode] = numVal;
        scoresCount++;
      }
    }
  });

  careerStats[careerName] = {
    scoresCount,
    nullCount,
    outOfRangeCount,
    notMultipleOf5Count,
    hasCompleteADN: scoresCount === expectedVariables.length && nullCount === 0
  };
});

console.log('\n--- VALIDATION ISSUES SUMMARY ---');
console.log(`Total issues found: ${validationIssues.length}`);
if (validationIssues.length > 0) {
  console.log('Sample of issues (up to 20):');
  console.log(validationIssues.slice(0, 20));
}

// Incomplete careers
const incompleteCareers = Object.entries(careerStats).filter(([name, s]) => !s.hasCompleteADN);
console.log(`Incomplete careers count: ${incompleteCareers.length}`);
if (incompleteCareers.length > 0) {
  console.log('Incomplete careers:', incompleteCareers);
}

// Check Carreras sheet
console.log('\n=== SHEET "Carreras" ANALYSIS ===');
const carrerasSheet = workbook.Sheets['Carreras'];
const carrerasRaw = XLSX.utils.sheet_to_json(carrerasSheet, { header: 1 });
console.log('Header in "Carreras":', carrerasRaw[0]);
console.log('Total rows in "Carreras":', carrerasRaw.length - 1);
const carrerasList = carrerasRaw.slice(1).map(r => ({
  name: r[0],
  tipo: r[1],
  validado: r[2]
})).filter(c => c.name);

console.log('Sample from Carreras sheet (first 10):', carrerasList.slice(0, 10));

// Compare career names in Matriz Rediseñada vs Carreras sheet
const matrixCareerSet = new Set(careerNames.map(c => c.trim().toLowerCase()));
const sheetCareerSet = new Set(carrerasList.map(c => c.name.trim().toLowerCase()));

const inMatrixNotInSheet = careerNames.filter(c => !sheetCareerSet.has(c.trim().toLowerCase()));
const inSheetNotInMatrix = carrerasList.filter(c => !matrixCareerSet.has(c.name.trim().toLowerCase()));

console.log('In Matrix but not in Carreras sheet:', inMatrixNotInSheet);
console.log('In Carreras sheet but not in Matrix:', inSheetNotInMatrix);

// Check Gold Set
console.log('\n=== GOLD SET CHECK ===');
const origSheet = workbook.Sheets['Matriz Original'];
const origRaw = XLSX.utils.sheet_to_json(origSheet, { header: 1, defval: null });
const origHeader = origRaw[2];
const goldCareers = origHeader.slice(3).filter(Boolean);
console.log('Gold careers (from Matriz Original):', goldCareers);

// Compare Gold Set scores in Matriz Original vs Matriz Rediseñada
console.log('\nComparing Gold Set scores between Matriz Original and Matriz Rediseñada:');
const goldDifferences = [];
goldCareers.forEach(goldName => {
  // Find col in Matriz Original
  const origColIdx = origHeader.indexOf(goldName);
  // Find col in Matriz Rediseñada
  let redisColIdx = headerRow.indexOf(goldName);
  if (redisColIdx === -1) {
    // maybe slight name difference?
    const match = headerRow.find(c => c && c.toLowerCase() === goldName.toLowerCase());
    if (match) redisColIdx = headerRow.indexOf(match);
  }

  console.log(`Gold career: ${goldName} -> Orig Col: ${origColIdx}, Redis Col: ${redisColIdx} (${headerRow[redisColIdx]})`);

  if (redisColIdx !== -1) {
    expectedVariables.forEach(v => {
      const origRow = origRaw.slice(3).find(r => r && String(r[0]).trim() === v);
      const redisRow = dataRows.find(r => r && String(r[0]).trim() === v);
      const origVal = origRow ? origRow[origColIdx] : null;
      const redisVal = redisRow ? redisRow[redisColIdx] : null;
      if (origVal !== redisVal) {
        goldDifferences.push({
          career: goldName,
          variable: v,
          origVal,
          redisVal
        });
      }
    });
  }
});

console.log(`Total differences in Gold Set between Matriz Original and Matriz Rediseñada: ${goldDifferences.length}`);
if (goldDifferences.length > 0) {
  console.log('Differences sample (up to 10):', goldDifferences.slice(0, 10));
}
