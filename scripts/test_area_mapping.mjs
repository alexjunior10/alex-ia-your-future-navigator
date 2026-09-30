import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));

function assignArea(career) {
  const name = career.name.toLowerCase();

  // Salud
  if (
    name.includes('medicina') || name.includes('salud') || name.includes('odontolog') ||
    name.includes('enfermer') || name.includes('nutrici') || name.includes('obstetric') ||
    name.includes('farmacia') || name.includes('terapia') || name.includes('fisioterapia') ||
    name.includes('biomédic') || name.includes('bioingenier') || name.includes('genómic') ||
    name.includes('genétic') || name.includes('neurociencia') || name.includes('biotecnolog')
  ) {
    return 'Salud';
  }

  // Arte
  if (
    name.includes('diseño') || name.includes('arte') || name.includes('música') ||
    name.includes('animación') || name.includes('arquitectura')
  ) {
    if (name.includes('videojuego') || name.includes('juegos') || name.includes('ux') || name.includes('interacción') || name.includes('digital') || name.includes('producto')) return 'Tecnología';
    return 'Arte';
  }

  // Negocios
  if (
    name.includes('administra') || name.includes('marketing') || name.includes('contabil') ||
    name.includes('negocio') || name.includes('finanz') || name.includes('economía') ||
    name.includes('turismo') || name.includes('hoteler') || name.includes('gastronom') ||
    name.includes('emprendimiento') || name.includes('fintech')
  ) {
    return 'Negocios';
  }

  // Ciencias Sociales
  if (
    name.includes('psicolog') || name.includes('derecho') || name.includes('educaci') ||
    name.includes('sociolog') || name.includes('antropolog') || name.includes('historia') ||
    name.includes('filosof') || name.includes('política') || name.includes('relaciones internacionales') ||
    name.includes('comunicación') || name.includes('periodismo') || name.includes('publicidad')
  ) {
    return 'Ciencias Sociales';
  }

  // Tecnología
  if (
    name.includes('software') || name.includes('computac') || name.includes('sistemas') ||
    name.includes('datos') || name.includes('inteligencia artificial') || name.includes('ciberseguridad') ||
    name.includes('robótica') || name.includes('automatización') || name.includes('tecnolog') ||
    name.includes('digital') || name.includes('telecomunicac') || name.includes('mecatrónica') ||
    name.includes('videojuegos') || name.includes('juegos') || name.includes('virtual') ||
    name.includes('interactivos') || name.includes('informática')
  ) {
    return 'Tecnología';
  }

  // Ingeniería
  if (
    name.includes('ingenier') || name.includes('civil') || name.includes('mecánic') ||
    name.includes('eléctric') || name.includes('electrónic') || name.includes('químic') ||
    name.includes('ambiental') || name.includes('minas') || name.includes('geológic') ||
    name.includes('agrícol') || name.includes('agronóm') || name.includes('aeroespacial') ||
    name.includes('aeronáutic') || name.includes('espacial') || name.includes('energía') ||
    name.includes('materiales') || name.includes('forestal') || name.includes('alimentos') ||
    name.includes('nanotecnología') || name.includes('hídricos') || name.includes('naturales') ||
    name.includes('sostenibilidad') || name.includes('astronáutica')
  ) {
    return 'Ingeniería';
  }

  // Ciencias puras -> Ciencias Sociales / Tecnología / Ingeniería
  if (
    name.includes('biolog') || name.includes('física') || name.includes('matemátic') ||
    name.includes('estadístic') || name.includes('química') || name.includes('astro') ||
    name.includes('clima') || name.includes('ambientales')
  ) {
    return 'Tecnología';
  }

  return 'General';
}

const generals = data.careers.filter(c => assignArea(c) === 'General');
console.log('Remaining general careers:', generals.map(c => c.name));
