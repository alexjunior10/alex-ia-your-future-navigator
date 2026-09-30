/**
 * Preguntas y Banco de Opciones para ONBOARDING DISCOVERY V1
 * Alex IA — Capa de descubrimiento
 * 
 * Lenguaje de UX: Cercano, humano y natural para adolescentes.
 * Sin tecnicismos psicométricos ni sesgos directos hacia carreras específicas.
 */

import { DiscoveryQuestion } from "./types";

export const DISCOVERY_QUESTIONS_V1: DiscoveryQuestion[] = [
  {
    id: "P1",
    questionNumber: 1,
    badge: "Curiosidad Escolar",
    prompt: "¿Qué materias o temas del cole hacen que la clase se te pase más rápido o te den más curiosidad?",
    subtitle: "No tiene que ser en lo que saques mejor nota, sino lo que de verdad disfrutas o te parece interesante.",
    options: [
      {
        id: "p1_math_logic",
        emoji: "🔢",
        label: "Resolver problemas con números, lógica o fórmulas",
        subtitle: "Matemática, Física, resolver retos paso a paso",
        signal_key: "interest_analytical_logic"
      },
      {
        id: "p1_nature_bio",
        emoji: "🔬",
        label: "Entender la naturaleza, los seres vivos o el cuerpo humano",
        subtitle: "Biología, Química, cómo funciona la vida y el entorno",
        signal_key: "interest_nature_biology"
      },
      {
        id: "p1_writing_humanities",
        emoji: "✍️",
        label: "Escribir historias, debatir temas o aprender otros idiomas",
        subtitle: "Comunicación, Literatura, Inglés, expresar ideas",
        signal_key: "interest_humanities_communication"
      },
      {
        id: "p1_arts_design",
        emoji: "🎨",
        label: "Dibujar, crear cosas visuales, componer o hacer música",
        subtitle: "Arte, Diseño, Música, proyectos creativos",
        signal_key: "interest_creative_arts"
      },
      {
        id: "p1_social_history",
        emoji: "🌍",
        label: "Aprender sobre historia, cómo vive la gente y la sociedad",
        subtitle: "Ciencias Sociales, Filosofía, entender el mundo",
        signal_key: "interest_social_civic"
      },
      {
        id: "p1_tech_digital",
        emoji: "💻",
        label: "Computadoras, herramientas digitales o tecnología",
        subtitle: "Informática, robótica, apps o internet",
        signal_key: "interest_technology_digital"
      },
      {
        id: "p1_sports_motion",
        emoji: "🏃",
        label: "Moverme, hacer deporte o actividades con el cuerpo",
        subtitle: "Educación física, movimiento y trabajo en equipo",
        signal_key: "interest_physical_sports"
      },
      {
        id: "p1_self_learner",
        emoji: "💡",
        label: "Sinceramente, aprendo mejor explorando cosas por mi cuenta",
        subtitle: "Temas propios fuera de la estructura del colegio",
        signal_key: "interest_self_directed_learning"
      }
    ]
  },
  {
    id: "P2",
    questionNumber: 2,
    badge: "Energía Espontánea",
    prompt: "Cuando tienes tiempo libre para ti y cero obligaciones, ¿hacia qué tipo de cosas te vas sin pensarlo?",
    subtitle: "Lo que haces de forma natural cuando nadie te está diciendo qué hacer.",
    options: [
      {
        id: "p2_hands_maker",
        emoji: "🛠️",
        label: "Construir, reparar o crear cosas con mis manos o herramientas",
        subtitle: "Materializar ideas, manualidades o ensamblaje",
        signal_key: "instinct_hands_on_maker"
      },
      {
        id: "p2_strategy_solver",
        emoji: "🧩",
        label: "Jugar retos de estrategia, descifrar acertijos o resolver misterios",
        subtitle: "Juegos mentales, puzles y pensar jugadas",
        signal_key: "instinct_strategic_problem_solving"
      },
      {
        id: "p2_people_connector",
        emoji: "💬",
        label: "Platicar con amigos, escuchar a alguien o dar consejos",
        subtitle: "Conectar con personas y apoyar a los demás",
        signal_key: "instinct_empathic_connector"
      },
      {
        id: "p2_deep_explorer",
        emoji: "🔍",
        label: "Ver videos o leer sobre teorías, curiosidades o misterios",
        subtitle: "Horas descubriendo cosas raras o fascinantes",
        signal_key: "instinct_deep_explorer"
      },
      {
        id: "p2_group_organizer",
        emoji: "📋",
        label: "Organizar salidas, ordenar proyectos o coordinar actividades",
        subtitle: "Tomar la iniciativa y armar los planes",
        signal_key: "instinct_organizer_leader"
      },
      {
        id: "p2_gamer_tech",
        emoji: "🎮",
        label: "Jugar videojuegos competitivos, explorar apps o trastear tecnología",
        subtitle: "Mundos virtuales, software y dispositivos",
        signal_key: "instinct_digital_gamer"
      },
      {
        id: "p2_outdoors_nature",
        emoji: "🌿",
        label: "Estar al aire libre, hacer deporte o cuidar animales y plantas",
        subtitle: "Contacto con la naturaleza y movimiento",
        signal_key: "instinct_outdoors_naturalist"
      },
      {
        id: "p2_reflective_creative",
        emoji: "🎧",
        label: "Poner música, pensar en mis cosas y tener un momento a solas",
        subtitle: "Reflexión, espacio personal y creatividad íntima",
        signal_key: "instinct_reflective_creative"
      }
    ]
  },
  {
    id: "P3",
    questionNumber: 3,
    badge: "Tu Proyecto Ideal",
    prompt: "Si te dieran un mes entero para trabajar en un reto o proyecto personal, ¿qué te gustaría que tuviera?",
    subtitle: "Elige lo que más te motivaría experimentar en el día a día durante esas semanas.",
    options: [
      {
        id: "p3_create_scratch",
        emoji: "✨",
        label: "Crear algo completamente desde cero",
        subtitle: "Un invento, una obra, un concepto propio que antes no existía",
        signal_key: "project_creation_from_scratch"
      },
      {
        id: "p3_solve_hard",
        emoji: "🧠",
        label: "Resolver un problema difícil o complejo",
        subtitle: "Un reto intelectual o práctico que nadie ha resuelto fácilmente",
        signal_key: "project_complex_problem_solving"
      },
      {
        id: "p3_help_others",
        emoji: "🤝",
        label: "Ayudar o mejorar la vida de otras personas",
        subtitle: "Un proyecto con impacto social directo y beneficio para la comunidad",
        signal_key: "project_helping_people"
      },
      {
        id: "p3_investigate_unknown",
        emoji: "🔎",
        label: "Investigar a fondo algo que no conozco",
        subtitle: "Explorar un misterio, recopilar datos y descubrir hallazgos nuevos",
        signal_key: "project_curious_investigation"
      },
      {
        id: "p3_visual_design",
        emoji: "🎨",
        label: "Diseñar algo visual y estético",
        subtitle: "Darle forma, color, identidad visual y armonía a un producto o espacio",
        signal_key: "project_visual_aesthetic_design"
      },
      {
        id: "p3_organize_teams",
        emoji: "📋",
        label: "Organizar personas, ideas o planes",
        subtitle: "Gestionar recursos, liderar la coordinación y hacer que todo funcione",
        signal_key: "project_organization_and_planning"
      },
      {
        id: "p3_tech_experiment",
        emoji: "🚀",
        label: "Experimentar con tecnología o herramientas digitales",
        subtitle: "Construir con software, dispositivos o prototipos tecnológicos",
        signal_key: "project_technology_experimentation"
      },
      {
        id: "p3_nature_animals",
        emoji: "🌱",
        label: "Trabajar con la naturaleza, el medio ambiente o animales",
        subtitle: "Estar en campo, cuidar seres vivos o proteger el ecosistema",
        signal_key: "project_nature_and_animals"
      }
    ]
  }
];
