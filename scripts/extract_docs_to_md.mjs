import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import pkg from 'xlsx';
const { readFile, utils } = pkg;

const baseDir = path.resolve('Preguntas-Diseño');
const outDir = path.resolve('scripts/extracted_docs');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function convertDocx(fileName) {
  const docxPath = path.join(baseDir, fileName);
  const outPath = path.join(outDir, fileName.replace(/\.docx$/, '.md'));
  
  console.log(`Converting ${fileName}...`);
  const result = await mammoth.convertToMarkdown({ path: docxPath });
  fs.writeFileSync(outPath, result.value, 'utf-8');
  console.log(`Saved markdown: ${outPath} (${result.value.length} chars)`);
  if (result.messages && result.messages.length > 0) {
    console.log(`Messages for ${fileName}:`, result.messages.length);
  }
}

function convertXlsx(fileName) {
  const xlsxPath = path.join(baseDir, fileName);
  console.log(`Reading Excel: ${fileName}...`);
  const wb = readFile(xlsxPath);
  
  const result = {};
  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const data = utils.sheet_to_json(ws, { defval: null });
    result[sheetName] = data;
    console.log(`Sheet "${sheetName}": ${data.length} rows`);
  }

  const outJsonPath = path.join(outDir, fileName.replace(/\.xlsx$/, '.json'));
  fs.writeFileSync(outJsonPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Saved Excel JSON: ${outJsonPath}`);
}

async function main() {
  const docxFiles = [
    'Questionnaire_Design_V1.docx',
    'Questionnaire_Blueprint_38xEvidencia_V1.docx',
    'Question_Bank_V1_Alex_IA.docx',
    'Score_Model_V1_Alex_IA.docx'
  ];

  for (const f of docxFiles) {
    await convertDocx(f);
  }

  convertXlsx('Question_Option_Variable_Matrix_V1_1.xlsx');
  console.log('All files converted successfully!');
}

main().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});
