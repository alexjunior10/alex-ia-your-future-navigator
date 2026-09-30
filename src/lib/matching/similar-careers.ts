/**
 * Catálogo de carreras similares basado en correlación estadística del ADN Vocacional (r >= 0.95).
 * Esta capa es informativa y se utiliza para "También podrías explorar...",
 * sin alterar el puntaje principal ni modificar los perfiles individuales.
 */

export const SIMILAR_CAREERS_MAP: Record<string, string[]> = {
  "ingenieria-mecanica": [
    "ingenieria-electrica"
  ],
  "ingenieria-electrica": [
    "ingenieria-electronica",
    "ingenieria-quimica",
    "ingenieria-electronica-y-automatizacion"
  ],
  "ingenieria-electronica": [
    "ingenieria-electronica-y-automatizacion",
    "ingenieria-de-automatizacion-y-control",
    "ingenieria-electrica"
  ],
  "ingenieria-quimica": [
    "ingenieria-de-telecomunicaciones",
    "ingenieria-electrica",
    "ingenieria-de-sistemas-energeticos"
  ],
  "ingenieria-de-sistemas-computacion": [
    "ingenieria-de-sistemas-inteligentes",
    "ingenieria-de-computacion",
    "ingenieria-de-inteligencia-artificial"
  ],
  "ingenieria-de-telecomunicaciones": [
    "ingenieria-quimica",
    "ingenieria-de-automatizacion-y-control",
    "ingenieria-electronica"
  ],
  "ingenieria-ambiental": [
    "ingenieria-de-sistemas-ambientales",
    "ingenieria-ambiental-y-energetica",
    "ingenieria-de-recursos-hidricos"
  ],
  "ingenieria-agricola": [
    "ingenieria-agronomica"
  ],
  "ingenieria-agronomica": [
    "ingenieria-forestal",
    "ingenieria-de-recursos-naturales",
    "ingenieria-agricola"
  ],
  "enfermeria": [
    "obstetricia",
    "fisioterapia-terapia-fisica"
  ],
  "obstetricia": [
    "enfermeria",
    "fisioterapia-terapia-fisica"
  ],
  "fisioterapia-terapia-fisica": [
    "obstetricia",
    "enfermeria"
  ],
  "quimica": [
    "biologia-molecular",
    "ciencia-de-materiales",
    "biotecnologia-molecular"
  ],
  "fisica": [
    "astronomia",
    "ciencias-espaciales",
    "astrofisica"
  ],
  "matematica": [
    "astrofisica",
    "fisica",
    "astronomia"
  ],
  "estadistica": [
    "biologia-computacional",
    "bioinformatica",
    "economia-computacional"
  ],
  "finanzas": [
    "finanzas-y-ciencia-de-datos"
  ],
  "ciencia-de-datos": [
    "economia-computacional",
    "economia-y-ciencia-de-datos",
    "ingenieria-de-inteligencia-artificial"
  ],
  "ingenieria-de-inteligencia-artificial": [
    "ingenieria-de-sistemas-inteligentes",
    "ciencia-de-datos",
    "economia-computacional"
  ],
  "ingenieria-de-ciberseguridad": [
    "ingenieria-en-ciberseguridad-y-analisis-forense-digital",
    "ingenieria-de-datos",
    "ingenieria-de-sistemas-inteligentes"
  ],
  "ingenieria-de-robotica": [
    "ingenieria-en-inteligencia-artificial-y-robotica",
    "ingenieria-mecatronica"
  ],
  "ingenieria-de-automatizacion-y-control": [
    "ingenieria-electronica-y-automatizacion",
    "ingenieria-electronica",
    "ingenieria-de-energia"
  ],
  "ingenieria-de-computacion": [
    "ingenieria-en-inteligencia-artificial-y-robotica",
    "ingenieria-de-sistemas-computacion",
    "nanotecnologia"
  ],
  "ingenieria-de-datos": [
    "economia-computacional",
    "ciencia-de-datos",
    "ingenieria-de-ciberseguridad"
  ],
  "ingenieria-de-sistemas-inteligentes": [
    "ingenieria-de-inteligencia-artificial",
    "ciencia-de-datos",
    "ingenieria-de-sistemas-computacion"
  ],
  "ingenieria-mecatronica": [
    "ingenieria-electronica-y-automatizacion",
    "ingenieria-de-robotica",
    "ingenieria-de-automatizacion-y-control"
  ],
  "ingenieria-electronica-y-automatizacion": [
    "ingenieria-de-automatizacion-y-control",
    "ingenieria-electronica",
    "ingenieria-mecatronica"
  ],
  "ingenieria-en-inteligencia-artificial-y-robotica": [
    "ingenieria-de-robotica",
    "ingenieria-de-computacion"
  ],
  "ingenieria-en-ciberseguridad-y-analisis-forense-digital": [
    "ingenieria-de-ciberseguridad",
    "ingenieria-de-datos",
    "economia-computacional"
  ],
  "interaccion-humano-computadora": [
    "diseno-uxui",
    "diseno-de-experiencia",
    "diseno-de-interaccion"
  ],
  "computacion-grafica": [
    "realidad-virtual-y-realidad-aumentada"
  ],
  "desarrollo-de-videojuegos": [
    "realidad-virtual-y-realidad-aumentada"
  ],
  "diseno-de-videojuegos": [
    "diseno-y-desarrollo-de-juegos",
    "diseno-digital",
    "diseno-de-experiencias-inmersivas"
  ],
  "diseno-y-desarrollo-de-juegos": [
    "diseno-de-videojuegos",
    "diseno-de-experiencias-inmersivas",
    "diseno-digital"
  ],
  "medios-interactivos": [
    "diseno-de-medios-interactivos"
  ],
  "biotecnologia": [
    "biotecnologia-molecular",
    "ingenieria-genetica",
    "genomica"
  ],
  "bioinformatica": [
    "biologia-computacional",
    "economia-computacional",
    "genomica"
  ],
  "biologia-computacional": [
    "bioinformatica",
    "economia-computacional",
    "estadistica"
  ],
  "ingenieria-biomedica": [
    "bioingenieria"
  ],
  "bioingenieria": [
    "ingenieria-biomedica",
    "biotecnologia"
  ],
  "ingenieria-genetica": [
    "biotecnologia-molecular",
    "biotecnologia",
    "genomica"
  ],
  "biologia-molecular": [
    "biotecnologia-molecular",
    "ingenieria-genetica",
    "genomica"
  ],
  "genomica": [
    "biotecnologia-molecular",
    "ingenieria-genetica",
    "biotecnologia"
  ],
  "biotecnologia-molecular": [
    "ingenieria-genetica",
    "biotecnologia",
    "biologia-molecular"
  ],
  "nanotecnologia": [
    "ciencia-de-materiales",
    "ingenieria-de-materiales",
    "ingenieria-de-computacion"
  ],
  "ingenieria-de-materiales": [
    "ciencia-de-materiales",
    "nanotecnologia",
    "ingenieria-aeroespacial"
  ],
  "ciencia-de-materiales": [
    "ingenieria-de-materiales",
    "nanotecnologia",
    "quimica"
  ],
  "neurociencia": [
    "ciencias-biomedicas",
    "genomica",
    "biologia-molecular"
  ],
  "ciencias-biomedicas": [
    "neurociencia"
  ],
  "ingenieria-de-energias-renovables": [
    "ingenieria-de-energia-sostenible",
    "ingenieria-de-sistemas-energeticos",
    "ingenieria-ambiental-y-energetica"
  ],
  "ingenieria-de-energia": [
    "ingenieria-de-sistemas-energeticos",
    "ingenieria-de-automatizacion-y-control",
    "ingenieria-electronica-y-automatizacion"
  ],
  "ingenieria-de-energia-sostenible": [
    "ingenieria-de-energias-renovables",
    "ingenieria-ambiental-y-energetica"
  ],
  "ingenieria-de-sistemas-energeticos": [
    "ingenieria-de-energia",
    "ingenieria-de-automatizacion-y-control",
    "ingenieria-de-energias-renovables"
  ],
  "ingenieria-ambiental-y-energetica": [
    "ingenieria-de-energia-sostenible",
    "ingenieria-de-sistemas-ambientales",
    "ingenieria-de-recursos-hidricos"
  ],
  "ingenieria-de-recursos-hidricos": [
    "ingenieria-de-recursos-naturales",
    "ingenieria-ambiental-y-energetica",
    "ingenieria-ambiental"
  ],
  "ingenieria-de-recursos-naturales": [
    "ingenieria-de-recursos-hidricos",
    "ingenieria-agronomica",
    "ingenieria-forestal"
  ],
  "ingenieria-de-sostenibilidad": [
    "ingenieria-de-economia-circular"
  ],
  "ingenieria-de-economia-circular": [
    "ingenieria-de-sostenibilidad"
  ],
  "ingenieria-de-sistemas-ambientales": [
    "ingenieria-ambiental-y-energetica",
    "ingenieria-ambiental",
    "ingenieria-de-recursos-hidricos"
  ],
  "ingenieria-forestal": [
    "ingenieria-agronomica",
    "ingenieria-de-recursos-naturales"
  ],
  "ingenieria-aeroespacial": [
    "ingenieria-astronautica",
    "ingenieria-espacial",
    "ingenieria-aeronautica"
  ],
  "ingenieria-aeronautica": [
    "ingenieria-aeroespacial",
    "ingenieria-astronautica",
    "ingenieria-electronica-y-automatizacion"
  ],
  "ingenieria-espacial": [
    "ingenieria-astronautica",
    "ingenieria-aeroespacial",
    "nanotecnologia"
  ],
  "ingenieria-astronautica": [
    "ingenieria-espacial",
    "ingenieria-aeroespacial",
    "ingenieria-aeronautica"
  ],
  "ciencias-espaciales": [
    "astrofisica",
    "astronomia",
    "fisica"
  ],
  "astrofisica": [
    "astronomia",
    "ciencias-espaciales",
    "matematica"
  ],
  "astronomia": [
    "astrofisica",
    "ciencias-espaciales",
    "fisica"
  ],
  "diseno-uxui": [
    "diseno-de-interaccion",
    "diseno-de-experiencia",
    "diseno-de-productos-digitales"
  ],
  "diseno-de-experiencia": [
    "diseno-uxui",
    "diseno-de-interaccion",
    "interaccion-humano-computadora"
  ],
  "diseno-de-interaccion": [
    "diseno-uxui",
    "diseno-de-productos-digitales",
    "diseno-de-experiencia"
  ],
  "diseno-digital": [
    "diseno-de-experiencias-inmersivas",
    "diseno-de-videojuegos",
    "diseno-de-medios-interactivos"
  ],
  "diseno-de-productos-digitales": [
    "diseno-de-interaccion",
    "diseno-uxui"
  ],
  "diseno-de-experiencias-inmersivas": [
    "diseno-digital",
    "diseno-y-desarrollo-de-juegos",
    "diseno-de-videojuegos"
  ],
  "animacion-digital": [
    "arte-digital"
  ],
  "arte-digital": [
    "animacion-digital"
  ],
  "diseno-de-medios-interactivos": [
    "medios-interactivos",
    "diseno-digital",
    "diseno-de-videojuegos"
  ],
  "realidad-virtual-y-realidad-aumentada": [
    "desarrollo-de-videojuegos",
    "computacion-grafica"
  ],
  "economia-y-ciencia-de-datos": [
    "economia-computacional",
    "ciencia-de-datos",
    "finanzas-y-ciencia-de-datos"
  ],
  "economia-computacional": [
    "economia-y-ciencia-de-datos",
    "ciencia-de-datos",
    "ingenieria-de-datos"
  ],
  "finanzas-y-ciencia-de-datos": [
    "economia-y-ciencia-de-datos",
    "finanzas",
    "analitica-de-negocios"
  ],
  "analitica-de-negocios": [
    "economia-digital",
    "finanzas-y-ciencia-de-datos"
  ],
  "negocios-digitales": [
    "tecnologia-y-negocios",
    "transformacion-digital"
  ],
  "transformacion-digital": [
    "tecnologia-y-negocios",
    "negocios-digitales"
  ],
  "economia-digital": [
    "economia-y-ciencia-de-datos",
    "analitica-de-negocios",
    "fintech"
  ],
  "fintech": [
    "economia-digital"
  ],
  "tecnologia-y-negocios": [
    "negocios-digitales",
    "transformacion-digital"
  ]
};

export function getSimilarCareers(careerSlug: string): string[] {
  return SIMILAR_CAREERS_MAP[careerSlug] || [];
}
