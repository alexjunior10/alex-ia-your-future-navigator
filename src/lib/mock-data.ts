export type Career = {
  slug: string;
  name: string;
  area: string;
  affinity: number;
  salary: string;
  employability: string;
  duration: string;
  description: string;
  fields: string[];
  curriculum: string[];
  universities: string[];
  trend: string;
};

export const careers: Career[] = [
  {
    slug: "ingenieria-de-sistemas",
    name: "Ingeniería de Sistemas",
    area: "Tecnología",
    affinity: 92,
    salary: "S/ 4,500 — S/ 12,000",
    employability: "Alta",
    duration: "5 años",
    description:
      "Diseña, construye y mantiene sistemas de software que resuelven problemas reales. Combina lógica, creatividad y trabajo en equipo.",
    fields: ["Desarrollo de software", "Datos e IA", "Ciberseguridad", "Cloud"],
    curriculum: ["Algoritmos", "Bases de Datos", "Redes", "IA & ML", "Arquitectura de Software"],
    universities: ["PUCP", "UPC", "UNI", "Universidad de Lima"],
    trend: "+18% demanda en los próximos 5 años",
  },
  {
    slug: "diseno-grafico",
    name: "Diseño Gráfico",
    area: "Arte",
    affinity: 87,
    salary: "S/ 2,800 — S/ 7,500",
    employability: "Media-Alta",
    duration: "4 años",
    description:
      "Comunica ideas a través de la imagen. Marca, editorial, digital y motion para empresas que necesitan destacar.",
    fields: ["Branding", "UX/UI", "Editorial", "Motion"],
    curriculum: ["Tipografía", "Color", "UX Research", "Identidad de Marca", "Animación"],
    universities: ["Toulouse Lautrec", "PUCP", "UPC"],
    trend: "Crecimiento sostenido en mercado digital",
  },
  {
    slug: "marketing",
    name: "Marketing",
    area: "Negocios",
    affinity: 81,
    salary: "S/ 3,000 — S/ 10,000",
    employability: "Alta",
    duration: "5 años",
    description:
      "Conecta marcas con personas. Estrategia, contenido, data y creatividad para hacer crecer negocios.",
    fields: ["Digital", "Branding", "Growth", "Analytics"],
    curriculum: ["Comportamiento del consumidor", "Investigación de mercado", "Estrategia digital", "Analítica"],
    universities: ["UPC", "Universidad de Lima", "UPN"],
    trend: "+12% empleos en marketing digital",
  },
  {
    slug: "medicina",
    name: "Medicina Humana",
    area: "Salud",
    affinity: 74,
    salary: "S/ 5,000 — S/ 18,000",
    employability: "Muy Alta",
    duration: "7 años",
    description:
      "Cuida la vida y la salud de las personas. Requiere vocación, disciplina y aprendizaje constante.",
    fields: ["Clínica", "Cirugía", "Investigación", "Salud Pública"],
    curriculum: ["Anatomía", "Fisiología", "Patología", "Farmacología", "Internado"],
    universities: ["UPCH", "USMP", "UNMSM"],
    trend: "Demanda estable y creciente",
  },
  {
    slug: "psicologia",
    name: "Psicología",
    area: "Ciencias Sociales",
    affinity: 78,
    salary: "S/ 2,500 — S/ 8,000",
    employability: "Media",
    duration: "5 años",
    description:
      "Comprende el comportamiento humano y acompaña procesos de bienestar emocional y desarrollo personal.",
    fields: ["Clínica", "Educativa", "Organizacional", "Investigación"],
    curriculum: ["Psicología General", "Neurociencia", "Terapia", "Evaluación Psicológica"],
    universities: ["PUCP", "UPCH", "UPC"],
    trend: "Creciente interés en salud mental",
  },
  {
    slug: "ingenieria-industrial",
    name: "Ingeniería Industrial",
    area: "Ingeniería",
    affinity: 76,
    salary: "S/ 4,000 — S/ 11,000",
    employability: "Alta",
    duration: "5 años",
    description:
      "Optimiza procesos, personas y recursos para que las organizaciones funcionen mejor.",
    fields: ["Operaciones", "Logística", "Calidad", "Consultoría"],
    curriculum: ["Investigación de operaciones", "Cadena de suministro", "Gestión de proyectos"],
    universities: ["PUCP", "UPC", "UNI"],
    trend: "Alta empleabilidad transversal",
  },
];

export const testQuestions = [
  { q: "Cuando tengo tiempo libre prefiero…", opts: ["Crear o diseñar algo", "Resolver problemas o acertijos", "Conversar con amigos", "Aprender algo nuevo"] },
  { q: "En un trabajo en grupo suelo…", opts: ["Liderar al equipo", "Aportar ideas creativas", "Analizar datos", "Mediar conflictos"] },
  { q: "Me motiva más…", opts: ["Ayudar a otros", "Construir cosas", "Comunicar ideas", "Investigar"] },
  { q: "Mi materia favorita es…", opts: ["Matemática", "Comunicación", "Arte", "Ciencias"] },
  { q: "Cuando algo me frustra…", opts: ["Persisto hasta lograrlo", "Pido ayuda", "Cambio de estrategia", "Tomo un descanso"] },
];

export const skills = [
  { name: "Liderazgo", value: 78 },
  { name: "Creatividad", value: 88 },
  { name: "Empatía", value: 82 },
  { name: "Análisis", value: 74 },
  { name: "Comunicación", value: 85 },
  { name: "Innovación", value: 80 },
];