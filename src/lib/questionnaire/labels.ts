/**
 * Catálogo amigable de nombres de variables vocacionales para la interfaz de usuario.
 * 
 * Regla de Oro: El estudiante nunca debe ver códigos técnicos internos como INT_R, PER_INI o MATCHING_V1.
 * En su lugar, se presentan nombres claros, empáticos y motivadores.
 */

export interface VariableFriendlyInfo {
  code: string;
  name: string;
  short: string;
  dimension: string;
  description: string;
}

export const VARIABLE_FRIENDLY_NAMES: Record<string, VariableFriendlyInfo> = {
  // INTERESES (6)
  INT_R: {
    code: 'INT_R',
    name: 'Interés Práctico y Operativo',
    short: 'Práctico',
    dimension: 'Intereses',
    description: 'Afinidad por actividades concretas, herramientas y resolución tangible.',
  },
  INT_I: {
    code: 'INT_I',
    name: 'Investigación y Análisis Científico',
    short: 'Investigación',
    dimension: 'Intereses',
    description: 'Curiosidad por entender cómo funcionan las cosas y resolver enigmas.',
  },
  INT_A: {
    code: 'INT_A',
    name: 'Creatividad y Expresión Artística',
    short: 'Creatividad',
    dimension: 'Intereses',
    description: 'Gusto por el diseño, la originalidad y la creación sin moldes fijos.',
  },
  INT_S: {
    code: 'INT_S',
    name: 'Servicio y Apoyo a los Demás',
    short: 'Servicio Social',
    dimension: 'Intereses',
    description: 'Vocación por ayudar, enseñar y generar bienestar en las personas.',
  },
  INT_E: {
    code: 'INT_E',
    name: 'Liderazgo e Iniciativa Emprendedora',
    short: 'Emprendimiento',
    dimension: 'Intereses',
    description: 'Interés por gestionar proyectos, convencer e impulsar metas.',
  },
  INT_C: {
    code: 'INT_C',
    name: 'Organización y Metodología',
    short: 'Organización',
    dimension: 'Intereses',
    description: 'Preferencia por procesos claros, orden y seguimiento sistemático.',
  },

  // APTITUDES (8)
  APT_LOG: {
    code: 'APT_LOG',
    name: 'Razonamiento Lógico',
    short: 'Lógica',
    dimension: 'Aptitudes',
    description: 'Facilidad para identificar patrones racionales y deducir conclusiones.',
  },
  APT_NUM: {
    code: 'APT_NUM',
    name: 'Habilidad Cuantitativa',
    short: 'Cálculo',
    dimension: 'Aptitudes',
    description: 'Destreza para trabajar con números, estimaciones y métricas.',
  },
  APT_VER: {
    code: 'APT_VER',
    name: 'Comunicación y Expresión Verbal',
    short: 'Comunicación',
    dimension: 'Aptitudes',
    description: 'Capacidad para estructurar ideas, redactar y argumentar con claridad.',
  },
  APT_ANA: {
    code: 'APT_ANA',
    name: 'Pensamiento Analítico',
    short: 'Análisis',
    dimension: 'Aptitudes',
    description: 'Descomponer problemas complejos en componentes comprensibles.',
  },
  APT_ESP: {
    code: 'APT_ESP',
    name: 'Visión y Razonamiento Espacial',
    short: 'Espacial',
    dimension: 'Aptitudes',
    description: 'Visualización mental tridimensional de formas, estructuras y planos.',
  },
  APT_CRE: {
    code: 'APT_CRE',
    name: 'Innovación y Originalidad',
    short: 'Innovación',
    dimension: 'Aptitudes',
    description: 'Generación de soluciones fuera de lo común y pensamiento lateral.',
  },
  APT_SOC: {
    code: 'APT_SOC',
    name: 'Inteligencia Interpersonal',
    short: 'Habilidad Social',
    dimension: 'Aptitudes',
    description: 'Comprensión de dinámicas grupales, empatía y resolución de conflictos.',
  },
  APT_ORG: {
    code: 'APT_ORG',
    name: 'Planificación y Estructura',
    short: 'Planificación',
    dimension: 'Aptitudes',
    description: 'Capacidad para priorizar tareas, coordinar recursos y cumplir metas.',
  },

  // PERSONALIDAD (8)
  PER_SOC: {
    code: 'PER_SOC',
    name: 'Sociabilidad y Conexión Humana',
    short: 'Sociabilidad',
    dimension: 'Personalidad',
    description: 'Facilidad y entusiasmo para interactuar con distintas personas.',
  },
  PER_INI: {
    code: 'PER_INI',
    name: 'Iniciativa y Proactividad',
    short: 'Iniciativa',
    dimension: 'Personalidad',
    description: 'Disposición para actuar primero y no esperar instrucciones.',
  },
  PER_PER: {
    code: 'PER_PER',
    name: 'Perseverancia y Constancia',
    short: 'Perseverancia',
    dimension: 'Personalidad',
    description: 'Tenacidad para mantener el esfuerzo ante dificultades o retos largos.',
  },
  PER_ADA: {
    code: 'PER_ADA',
    name: 'Flexibilidad y Adaptabilidad',
    short: 'Adaptabilidad',
    dimension: 'Personalidad',
    description: 'Apertura para desenvolverse con comodidad en situaciones cambiantes.',
  },
  PER_COL: {
    code: 'PER_COL',
    name: 'Colaboración y Trabajo en Equipo',
    short: 'Colaboración',
    dimension: 'Personalidad',
    description: 'Preferencia por construir colectivamente y sumar talentos.',
  },
  PER_AUT: {
    code: 'PER_AUT',
    name: 'Autonomía e Independencia',
    short: 'Autonomía',
    dimension: 'Personalidad',
    description: 'Capacidad para trabajar eficazmente con mínima supervisión externa.',
  },
  PER_LID: {
    code: 'PER_LID',
    name: 'Capacidad de Liderazgo',
    short: 'Liderazgo',
    dimension: 'Personalidad',
    description: 'Facilidad para motivar, guiar e inspirar a un grupo hacia un objetivo.',
  },
  PER_EST: {
    code: 'PER_EST',
    name: 'Estabilidad y Temple Emocional',
    short: 'Estabilidad',
    dimension: 'Personalidad',
    description: 'Calma y claridad mental para tomar decisiones bajo presión.',
  },

  // VALORES (8)
  VAL_EST: {
    code: 'VAL_EST',
    name: 'Seguridad y Estabilidad',
    short: 'Estabilidad',
    dimension: 'Valores',
    description: 'Prioridad por carreras previsibles, sólidas y con bajo riesgo.',
  },
  VAL_ING: {
    code: 'VAL_ING',
    name: 'Orientación al Logro Económico',
    short: 'Logro Económico',
    dimension: 'Valores',
    description: 'Valoración del retorno financiero, ingresos competitivos y prosperidad.',
  },
  VAL_IMP: {
    code: 'VAL_IMP',
    name: 'Impacto Social y Trascendencia',
    short: 'Impacto Social',
    dimension: 'Valores',
    description: 'Deseo de mejorar la vida de otros y aportar al desarrollo del país.',
  },
  VAL_REC: {
    code: 'VAL_REC',
    name: 'Reconocimiento y Prestigio',
    short: 'Reconocimiento',
    dimension: 'Valores',
    description: 'Aprecio por la valoración del entorno, reputación y prestigio profesional.',
  },
  VAL_CRE: {
    code: 'VAL_CRE',
    name: 'Crecimiento y Superación',
    short: 'Crecimiento',
    dimension: 'Valores',
    description: 'Búsqueda constante de superarse a uno mismo y asumir nuevos desafíos.',
  },
  VAL_APR: {
    code: 'VAL_APR',
    name: 'Curiosidad y Aprendizaje Continuo',
    short: 'Aprendizaje',
    dimension: 'Valores',
    description: 'Placer por aprender cosas nuevas y actualizarse permanentemente.',
  },
  VAL_AUT: {
    code: 'VAL_AUT',
    name: 'Independencia Profesional',
    short: 'Independencia',
    dimension: 'Valores',
    description: 'Libertad de horarios, criterios y forma de ejercer la profesión.',
  },
  VAL_EQV: {
    code: 'VAL_EQV',
    name: 'Equilibrio de Vida y Bienestar',
    short: 'Equilibrio',
    dimension: 'Valores',
    description: 'Balance saludable entre el trabajo, la familia y el tiempo personal.',
  },

  // PREFERENCIAS (8)
  PRE_PER: {
    code: 'PRE_PER',
    name: 'Preferencia por Trabajar con Personas',
    short: 'Con Personas',
    dimension: 'Preferencias',
    description: 'Disfrute por ambientes basados en el trato interpersonal diario.',
  },
  PRE_DAT: {
    code: 'PRE_DAT',
    name: 'Preferencia por Trabajar con Datos',
    short: 'Con Datos',
    dimension: 'Preferencias',
    description: 'Afinidad por información cuantificada, estadísticas y bases de datos.',
  },
  PRE_PRA: {
    code: 'PRE_PRA',
    name: 'Preferencia por Tareas Prácticas',
    short: 'Práctico',
    dimension: 'Preferencias',
    description: 'Preferencia por construir, probar y ver resultados de forma tangible.',
  },
  PRE_VAR: {
    code: 'PRE_VAR',
    name: 'Gusto por Entornos Dinámicos',
    short: 'Dinamismo',
    dimension: 'Preferencias',
    description: 'Atracción por la variedad, proyectos variados y baja monotonía.',
  },
  PRE_EST: {
    code: 'PRE_EST',
    name: 'Preferencia por Ambientes Estructurados',
    short: 'Estructura',
    dimension: 'Preferencias',
    description: 'Comodidad con reglas claras, procesos definidos y predictibilidad.',
  },
  PRE_CAM: {
    code: 'PRE_CAM',
    name: 'Gusto por Trabajo en Terreno y Campo',
    short: 'En Terreno',
    dimension: 'Preferencias',
    description: 'Atracción por espacios abiertos, obras, laboratorios o viajes.',
  },
  PRE_TEC: {
    code: 'PRE_TEC',
    name: 'Uso de Tecnología de Vanguardia',
    short: 'Tecnología',
    dimension: 'Preferencias',
    description: 'Entusiasmo por software, herramientas digitales y soluciones tecnológicas.',
  },
  PRE_EXP: {
    code: 'PRE_EXP',
    name: 'Exploración de Nuevas Rutas',
    short: 'Exploración',
    dimension: 'Preferencias',
    description: 'Gusto por caminos no tradicionales, innovación y retos sin libreto previo.',
  },
};

export function getVariableFriendlyName(code: string, useShort = false): string {
  const item = VARIABLE_FRIENDLY_NAMES[code];
  if (!item) return code;
  return useShort ? item.short : item.name;
}
