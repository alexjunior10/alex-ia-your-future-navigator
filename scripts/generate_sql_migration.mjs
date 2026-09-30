import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const filePath = path.resolve('ADN_Vocacional_v1_1_Final_Revision (1).xlsx');
const workbook = XLSX.readFile(filePath);

// 1. Load Matriz Rediseñada
const sheetMatriz = workbook.Sheets['Matriz Rediseñada'];
const rowsMatriz = XLSX.utils.sheet_to_json(sheetMatriz, { header: 1, defval: null });

const headerRow = rowsMatriz[2];
const rawCareerNames = headerRow.slice(3).filter(Boolean);
const dataRows = rowsMatriz.slice(3).filter(r => r && r[0]);

// 2. Load Carreras Catalog for families/types
const sheetCarreras = workbook.Sheets['Carreras'];
const rowsCarreras = XLSX.utils.sheet_to_json(sheetCarreras, { header: 1 });
const catalogEntries = rowsCarreras.slice(1).filter(r => r && r[0]).map(r => ({
  name: String(r[0]).trim(),
  type: String(r[1] || 'General').trim()
}));

function norm(str) {
  return String(str || '')
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '');
}

const catalogMap = new Map();
catalogEntries.forEach(c => {
  catalogMap.set(norm(c.name), c);
});

// Map of canonical display names for the 10 Gold careers
const goldSetCanonicalNames = {
  'IngSoftware': 'Ingeniería de Software',
  'Medicina': 'Medicina',
  'Psicologia': 'Psicología',
  'Derecho': 'Derecho',
  'Administracion': 'Administración',
  'Marketing': 'Marketing',
  'Arquitectura': 'Arquitectura',
  'Contabilidad': 'Contabilidad',
  'Educacion': 'Educación',
  'DisenoGrafico': 'Diseño Gráfico'
};

const goldSetKeys = new Set(Object.keys(goldSetCanonicalNames));

function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function assignArea(name) {
  const n = name.toLowerCase();

  // Salud
  if (
    n.includes('medicina') || n.includes('salud') || n.includes('odontolog') ||
    n.includes('enfermer') || n.includes('nutrici') || n.includes('obstetric') ||
    n.includes('farmacia') || n.includes('terapia') || n.includes('fisioterapia') ||
    n.includes('biomédic') || n.includes('bioingenier') || n.includes('genómic') ||
    n.includes('genétic') || n.includes('neurociencia') || n.includes('biotecnolog')
  ) {
    return 'Salud';
  }

  // Arte
  if (
    n.includes('diseño') || n.includes('arte') || n.includes('música') ||
    n.includes('animación') || n.includes('arquitectura')
  ) {
    if (n.includes('videojuego') || n.includes('juegos') || n.includes('ux') || n.includes('interacción') || n.includes('digital') || n.includes('producto') || n.includes('medios')) return 'Tecnología';
    return 'Arte';
  }

  // Negocios
  if (
    n.includes('administra') || n.includes('marketing') || n.includes('contabil') ||
    n.includes('negocio') || n.includes('finanz') || n.includes('economía') ||
    n.includes('turismo') || n.includes('hoteler') || n.includes('gastronom') ||
    n.includes('emprendimiento') || n.includes('fintech')
  ) {
    return 'Negocios';
  }

  // Ciencias Sociales
  if (
    n.includes('psicolog') || n.includes('derecho') || n.includes('educaci') ||
    n.includes('sociolog') || n.includes('antropolog') || n.includes('historia') ||
    n.includes('filosof') || n.includes('política') || n.includes('relaciones internacionales') ||
    n.includes('comunicación') || n.includes('periodismo') || n.includes('publicidad')
  ) {
    return 'Ciencias Sociales';
  }

  // Tecnología
  if (
    n.includes('software') || n.includes('computac') || n.includes('sistemas') ||
    n.includes('datos') || n.includes('inteligencia artificial') || n.includes('ciberseguridad') ||
    n.includes('robótica') || n.includes('automatización') || n.includes('tecnolog') ||
    n.includes('digital') || n.includes('telecomunicac') || n.includes('mecatrónica') ||
    n.includes('videojuegos') || n.includes('juegos') || n.includes('virtual') ||
    n.includes('interactivos') || n.includes('informática') || n.includes('interacción')
  ) {
    return 'Tecnología';
  }

  // Ingeniería
  if (
    n.includes('ingenier') || n.includes('civil') || n.includes('mecánic') ||
    n.includes('eléctric') || n.includes('electrónic') || n.includes('químic') ||
    n.includes('ambiental') || n.includes('minas') || n.includes('geológic') ||
    n.includes('agrícol') || n.includes('agronóm') || n.includes('aeroespacial') ||
    n.includes('aeronáutic') || n.includes('espacial') || n.includes('energía') ||
    n.includes('materiales') || n.includes('forestal') || n.includes('alimentos') ||
    n.includes('nanotecnología') || n.includes('hídricos') || n.includes('naturales') ||
    n.includes('sostenibilidad') || n.includes('astronáutica')
  ) {
    return 'Ingeniería';
  }

  // Ciencias puras
  if (
    n.includes('biolog') || n.includes('física') || n.includes('matemátic') ||
    n.includes('estadístic') || n.includes('química') || n.includes('astro') ||
    n.includes('clima') || n.includes('ambientales')
  ) {
    return 'Tecnología';
  }

  return 'Tecnología';
}

// Prepare 38 variables
const variables = dataRows.map((r, idx) => ({
  code: String(r[0]).trim(),
  dimension: String(r[1]).trim(),
  name: String(r[2]).trim(),
  sort_order: idx + 1
}));

// Prepare careers list
const careers = rawCareerNames.map((rawName, idx) => {
  const isGold = goldSetKeys.has(rawName);
  const displayName = goldSetCanonicalNames[rawName] || rawName.trim();
  const catalogEntry = catalogMap.get(norm(displayName)) || catalogMap.get(norm(rawName));
  const family = catalogEntry ? catalogEntry.type : 'Carreras tradicionales';
  const slug = slugify(displayName);
  const area = assignArea(displayName);

  return {
    rawName,
    name: displayName,
    slug,
    area,
    family,
    is_gold_set: isGold,
    matrix_col_index: idx + 3
  };
});

// Extract scores
const adnRecords = [];
careers.forEach(career => {
  variables.forEach((variable, vIdx) => {
    const row = dataRows[vIdx];
    const scoreVal = row[career.matrix_col_index];
    const score = Number(scoreVal);
    adnRecords.push({
      career_slug: career.slug,
      career_name: career.name,
      variable_code: variable.code,
      score: score,
      version: 'ADN_V1',
      is_gold_set: career.is_gold_set
    });
  });
});

console.log(`Generated:`);
console.log(`- Variables: ${variables.length}`);
console.log(`- Careers: ${careers.length}`);
console.log(`- ADN Records: ${adnRecords.length}`);

// Save JSON export
if (!fs.existsSync('scripts/data')) {
  fs.mkdirSync('scripts/data', { recursive: true });
}

fs.writeFileSync('scripts/data/adn_v1_export.json', JSON.stringify({
  version: 'ADN_V1',
  source: 'ADN_Vocacional_v1_1_Final_Revision (1).xlsx',
  generated_at: new Date().toISOString(),
  variable_count: variables.length,
  career_count: careers.length,
  adn_record_count: adnRecords.length,
  variables,
  careers,
  adnRecords
}, null, 2));

console.log('JSON export updated in scripts/data/adn_v1_export.json');
