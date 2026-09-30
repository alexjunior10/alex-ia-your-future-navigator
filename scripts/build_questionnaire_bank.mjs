import fs from 'fs';

const scriptContent = `import type { QuestionItem, GradeLevel } from './types';

// Definición canónica del Banco de 40 Preguntas con Variantes por Grado (Questionnaire V1.1)

interface QuestionDefinition {
  base_id: string;
  dimension: 'Intereses' | 'Aptitudes' | 'Personalidad' | 'Valores' | 'Preferencias' | 'Consistencia' | 'Integración';
  question_type: string;
  visual_asset?: string;
  is_experimental?: boolean;
  difficulty_level?: number | null;
  base: {
    stem: string;
    options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  };
  variants?: Partial<Record<GradeLevel, {
    variant_id: string;
    stem: string;
    options?: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  }>>;
}

export const QUESTION_DEFINITIONS: QuestionDefinition[] = [
  {
    base_id: 'Q01',
    dimension: 'Intereses',
    question_type: 'Elección forzada',
    base: {
      stem: 'Imagínate que tienes una tarde libre y puedes elegir solo una actividad para un proyecto personal. ¿Cuál te daría más ganas de empezar?',
      options: [
        { key: 'A', text: 'Armar, reparar o construir algo que funcione' },
        { key: 'B', text: 'Investigar por qué ocurre algo que no entiendes' },
        { key: 'C', text: 'Crear una historia, diseño, video o pieza visual' },
        { key: 'D', text: 'Ayudar a alguien a resolver un problema que tiene' }
      ]
    }
  },
  {
    base_id: 'Q02',
    dimension: 'Intereses',
    question_type: 'Elección forzada',
    base: {
      stem: "En un trabajo grupal les dicen: 'Pueden convertir esta idea en cualquier proyecto'. ¿Qué parte te llamaría más la atención?",
      options: [
        { key: 'A', text: 'Pensar cómo hacerlo realidad y conseguir que funcione' },
        { key: 'B', text: 'Investigar el problema y encontrar información útil' },
        { key: 'C', text: 'Diseñar cómo se verá y cómo lo vivirá la gente' },
        { key: 'D', text: 'Organizar al equipo y conseguir que la idea avance' }
      ]
    }
  },
  {
    base_id: 'Q03',
    dimension: 'Intereses',
    question_type: 'Escenario',
    base: {
      stem: 'Encuentras un aparato que dejó de funcionar y nadie sabe exactamente qué pasó. ¿Qué te sale más natural hacer primero?',
      options: [
        { key: 'A', text: 'Abrirlo o probar partes para encontrar el problema' },
        { key: 'B', text: 'Buscar información sobre cómo funciona' },
        { key: 'C', text: 'Imaginar una forma distinta de usarlo' },
        { key: 'D', text: 'Preguntar a alguien cómo le afectó el problema y qué necesita' }
      ]
    }
  },
  {
    base_id: 'Q04',
    dimension: 'Intereses',
    question_type: 'Elección forzada',
    base: {
      stem: 'Si pudieras participar durante un mes en uno de estos proyectos, ¿cuál escogerías?',
      options: [
        { key: 'A', text: 'Construir un prototipo con materiales' },
        { key: 'B', text: 'Hacer una investigación y comprobar una hipótesis' },
        { key: 'C', text: 'Crear una experiencia visual o audiovisual' },
        { key: 'D', text: 'Diseñar una campaña para convencer a otras personas de participar' }
      ]
    }
  },
  {
    base_id: 'Q05',
    dimension: 'Intereses',
    question_type: 'Situación',
    base: {
      stem: 'Una profesora te dice que puedes mejorar un problema de tu colegio. ¿Qué tipo de problema te interesaría más resolver?',
      options: [
        { key: 'A', text: 'Algo que requiere organizar información y mejorar un proceso' },
        { key: 'B', text: 'Algo que afecta a estudiantes y necesita acompañamiento' },
        { key: 'C', text: 'Algo que requiere una solución nueva y diferente' },
        { key: 'D', text: 'Algo que necesita convencer a varias personas para que cambien' }
      ]
    },
    variants: {
      '5S': {
        variant_id: 'Q05_5S',
        stem: 'Te proponen liderar una iniciativa para resolver un problema de tu colegio o de tu comunidad. ¿Qué tipo de problema te interesaría más resolver?',
        options: [
          { key: 'A', text: 'Algo que requiere organizar información y optimizar un proceso' },
          { key: 'B', text: 'Algo que afecta a las personas y requiere acompañamiento social' },
          { key: 'C', text: 'Algo que requiere una solución innovadora y diferente' },
          { key: 'D', text: 'Algo que requiere convencer e involucrar a la comunidad para lograr un cambio' }
        ]
      }
    }
  },
  {
    base_id: 'Q06',
    dimension: 'Intereses',
    question_type: 'Preferencia',
    base: {
      stem: '¿Cuál de estos planes te parecería más entretenido, aunque no hubiera una nota de por medio?',
      options: [
        { key: 'A', text: 'Ordenar y clasificar información hasta encontrar un patrón' },
        { key: 'B', text: 'Hacer pruebas para descubrir qué cambia el resultado' },
        { key: 'C', text: 'Crear algo visual, musical o narrativo desde cero' },
        { key: 'D', text: 'Coordinar personas para lograr una meta' }
      ]
    }
  },
  {
    base_id: 'Q07',
    dimension: 'Preferencias',
    question_type: 'Escenario',
    base: {
      stem: 'Piensa en una semana de actividades. ¿Qué combinación te mantendría más interesado/a?',
      options: [
        { key: 'A', text: 'Muchas tareas distintas y problemas nuevos' },
        { key: 'B', text: 'Un proyecto largo con tiempo para perfeccionarlo' },
        { key: 'C', text: 'Actividades donde puedas usar herramientas digitales' },
        { key: 'D', text: 'Actividades principalmente con personas' }
      ]
    }
  },
  {
    base_id: 'Q08',
    dimension: 'Preferencias',
    question_type: 'Elección forzada',
    base: {
      stem: 'Si tuvieras que aprender algo nuevo, ¿qué forma te atraería más?',
      options: [
        { key: 'A', text: 'Probarlo haciendo algo desde el primer momento' },
        { key: 'B', text: 'Entender primero la información y luego practicar' },
        { key: 'C', text: 'Experimentar sin saber exactamente cuál será el resultado' },
        { key: 'D', text: 'Seguir un método claro paso a paso' }
      ]
    }
  },
  {
    base_id: 'Q09',
    dimension: 'Preferencias',
    question_type: 'Escenario',
    base: {
      stem: 'En un proyecto puedes elegir el ambiente de trabajo. ¿Cuál te resultaría más cómodo?',
      options: [
        { key: 'A', text: 'Horario y pasos bastante definidos' },
        { key: 'B', text: 'Problemas distintos cada día' },
        { key: 'C', text: 'Mucho uso de herramientas digitales' },
        { key: 'D', text: 'Cambiar de lugar o contexto con frecuencia' }
      ]
    }
  },
  {
    base_id: 'Q10',
    dimension: 'Preferencias',
    question_type: 'Elección forzada',
    base: {
      stem: 'Cuando imaginas una actividad que te gustaría repetir durante varios meses, ¿qué te importa más?',
      options: [
        { key: 'A', text: 'Que tenga contacto frecuente con personas' },
        { key: 'B', text: 'Que permita trabajar con datos, cifras o evidencia' },
        { key: 'C', text: 'Que puedas hacer cosas concretas y ver resultados' },
        { key: 'D', text: 'Que puedas descubrir posibilidades nuevas' }
      ]
    }
  },
  {
    base_id: 'Q11',
    dimension: 'Preferencias',
    question_type: 'Escenario',
    base: {
      stem: 'Te ofrecen dos proyectos. ¿Cuál te atrae más?',
      options: [
        { key: 'A', text: 'Mejorar un proceso que ya existe y hacerlo más ordenado' },
        { key: 'B', text: 'Empezar con una pregunta y descubrir qué hay detrás' },
        { key: 'C', text: 'Crear una propuesta completamente nueva' },
        { key: 'D', text: 'Trabajar con personas para cambiar una situación' }
      ]
    }
  },
  {
    base_id: 'Q12',
    dimension: 'Preferencias',
    question_type: 'Preferencia',
    base: {
      stem: 'Si pudieras elegir una herramienta principal para un proyecto, ¿cuál te gustaría usar más?',
      options: [
        { key: 'A', text: 'Una herramienta digital para crear, analizar o automatizar' },
        { key: 'B', text: 'Materiales y herramientas para construir/probar' },
        { key: 'C', text: 'Información, documentos y datos para analizar' },
        { key: 'D', text: 'Un espacio de trabajo con personas para conversar y coordinar' }
      ]
    }
  },
  {
    base_id: 'Q13',
    dimension: 'Personalidad',
    question_type: 'Escenario',
    base: {
      stem: 'En un equipo nadie empieza una tarea y el tiempo se está acabando. ¿Qué harías probablemente?',
      options: [
        { key: 'A', text: 'Empezaría una parte y propondría cómo avanzar' },
        { key: 'B', text: 'Preguntaría quién puede hacer cada cosa y coordinaría el reparto' },
        { key: 'C', text: 'Esperaría a que indiquen exactamente qué debo hacer' },
        { key: 'D', text: 'Intentaría primero entender por qué nadie ha empezado' }
      ]
    },
    variants: {
      '5S': {
        variant_id: 'Q13_5S',
        stem: 'En un proyecto grupal con entregables y fecha límite estricta, el equipo no arranca y el plazo se acerca. ¿Qué harías probablemente?',
        options: [
          { key: 'A', text: 'Empezaría una parte clave del trabajo y propondría la ruta de avance' },
          { key: 'B', text: 'Coordinaría el reparto formal de responsabilidades y tiempos de entrega' },
          { key: 'C', text: 'Esperaría a que el grupo defina formalmente qué parte me corresponde' },
          { key: 'D', text: 'Conversaría primero con el equipo para identificar qué está frenando el inicio' }
        ]
      }
    }
  },
  {
    base_id: 'Q14',
    dimension: 'Personalidad',
    question_type: 'Dilema',
    base: {
      stem: 'Tu primera solución no funciona después de varios intentos. ¿Qué te representa más?',
      options: [
        { key: 'A', text: 'Cambio de estrategia y vuelvo a probar' },
        { key: 'B', text: 'Sigo con el mismo método hasta dominarlo' },
        { key: 'C', text: 'Pido ayuda y pruebo una alternativa con otra persona' },
        { key: 'D', text: 'Lo dejo por un tiempo y busco otra actividad' }
      ]
    }
  },
  {
    base_id: 'Q15',
    dimension: 'Personalidad',
    question_type: 'Escenario',
    base: {
      stem: 'Llegas a un grupo donde casi no conoces a nadie y deben trabajar juntos. ¿Qué harías normalmente?',
      options: [
        { key: 'A', text: 'Rompería el hielo y empezaría a conversar' },
        { key: 'B', text: 'Esperaría un poco para observar cómo es el grupo' },
        { key: 'C', text: 'Buscaría una tarea concreta y empezaría a trabajar' },
        { key: 'D', text: 'Intentaría que todos acuerden primero cómo organizarse' }
      ]
    },
    variants: {
      '5S': {
        variant_id: 'Q15_5S',
        stem: 'Llegas a un taller intercolegial o actividad externa con jóvenes de distintos colegios donde no conoces a nadie y deben realizar un proyecto juntos. ¿Qué harías normalmente?',
        options: [
          { key: 'A', text: 'Rompería el hielo y empezaría a conversar con los demás' },
          { key: 'B', text: 'Observaría la dinámica del grupo antes de intervenir' },
          { key: 'C', text: 'Me concentraría en una tarea concreta del proyecto para empezar' },
          { key: 'D', text: 'Propondría que definamos primero las reglas de organización y trabajo' }
        ]
      }
    }
  },
  {
    base_id: 'Q16',
    dimension: 'Personalidad',
    question_type: 'Escenario',
    base: {
      stem: 'A mitad de un proyecto cambian una regla importante. ¿Qué reacción se parece más a ti?',
      options: [
        { key: 'A', text: 'Ajusto el plan y sigo' },
        { key: 'B', text: 'Me cuesta al principio, pero pruebo la nueva forma' },
        { key: 'C', text: 'Prefiero mantener el plan original si todavía funciona' },
        { key: 'D', text: 'Pregunto por qué cambió antes de decidir qué hacer' }
      ]
    }
  },
  {
    base_id: 'Q17',
    dimension: 'Personalidad',
    question_type: 'Elección',
    base: {
      stem: 'Cuando tienes que hacer un proyecto importante, ¿qué suele pasar?',
      options: [
        { key: 'A', text: 'Me organizo y avanzo sin que tengan que recordármelo' },
        { key: 'B', text: 'Me ayuda que alguien me marque los siguientes pasos' },
        { key: 'C', text: 'Empiezo rápido y voy ajustando sobre la marcha' },
        { key: 'D', text: 'Prefiero que otra persona coordine y yo me concentro en mi parte' }
      ]
    },
    variants: {
      '5S': {
        variant_id: 'Q17_5S',
        stem: 'Cuando tienes que encarar una preparación o proyecto importante sin recordatorios de profesores ni padres, ¿qué suele pasar?',
        options: [
          { key: 'A', text: 'Defino mi propio horario y avanzo de forma autodirigida' },
          { key: 'B', text: 'Me resulta difícil avanzar si no tengo un seguimiento externo que me guíe' },
          { key: 'C', text: 'Empiezo a trabajar de inmediato y voy ordenando el proceso en el camino' },
          { key: 'D', text: 'Prefiero que alguien más asuma la coordinación general y yo me enfoco en mi entrega' }
        ]
      }
    }
  },
  {
    base_id: 'Q18',
    dimension: 'Personalidad',
    question_type: 'Dilema',
    base: {
      stem: 'En un equipo dos personas tienen opiniones muy distintas. ¿Qué harías primero?',
      options: [
        { key: 'A', text: 'Intentaría entender qué necesita cada una y buscar un punto común' },
        { key: 'B', text: 'Propondría una decisión para que el equipo pueda avanzar' },
        { key: 'C', text: 'Dejaría que ellas lo resuelvan' },
        { key: 'D', text: 'Buscaría datos o información que ayuden a decidir' }
      ]
    }
  },
  {
    base_id: 'Q19',
    dimension: 'Personalidad',
    question_type: 'Escenario',
    base: {
      stem: 'Tienes una tarea difícil y nadie está revisando si la haces. ¿Qué te resulta más probable?',
      options: [
        { key: 'A', text: 'Defino mi propio plan y avanzo' },
        { key: 'B', text: 'Me cuesta mantener el ritmo si no hay seguimiento' },
        { key: 'C', text: 'Busco una forma distinta de resolverla' },
        { key: 'D', text: 'Primero pregunto a alguien qué espera exactamente' }
      ]
    },
    variants: {
      '5S': {
        variant_id: 'Q19_5S',
        stem: 'Tienes que cumplir con un plan de estudio o proyecto personal complejo donde nadie te exige un seguimiento diario. ¿Qué te resulta más probable?',
        options: [
          { key: 'A', text: 'Establezco mis propias metas de avance y las cumplo' },
          { key: 'B', text: 'Me cuesta mantener la constancia si no existe una supervisión regular' },
          { key: 'C', text: 'Busco métodos alternativos para avanzar de manera más dinámica' },
          { key: 'D', text: 'Busco consultar primero con alguien experimentado para confirmar expectativas' }
        ]
      }
    }
  },
  {
    base_id: 'Q20',
    dimension: 'Personalidad',
    question_type: 'Escenario',
    base: {
      stem: 'Tienes que presentar una idea y el grupo está en desacuerdo contigo. ¿Qué harías?',
      options: [
        { key: 'A', text: 'Explicaría mi punto y defendería la propuesta' },
        { key: 'B', text: 'Preguntaría qué cambiarían y adaptaría la idea' },
        { key: 'C', text: 'Dejaría que otra persona la presente' },
        { key: 'D', text: 'Buscaría un acuerdo y repartiría responsabilidades' }
      ]
    }
  },
  {
    base_id: 'Q21',
    dimension: 'Personalidad',
    question_type: 'Escenario',
    base: {
      stem: 'Durante una actividad con bastante presión de tiempo, ¿qué suele pasar contigo?',
      options: [
        { key: 'A', text: 'Mantengo la calma y sigo con el plan' },
        { key: 'B', text: 'Necesito parar un momento para ordenar mis ideas' },
        { key: 'C', text: 'Me activo y tomo decisiones rápidas' },
        { key: 'D', text: 'Prefiero dividir el problema en pasos antes de continuar' }
      ]
    },
    variants: {
      '5S': {
        variant_id: 'Q21_5S',
        stem: 'Durante una evaluación o simulación con tiempo cronometrado estricto y resultados de alta consecuencia, ¿qué suele pasar contigo?',
        options: [
          { key: 'A', text: 'Mantengo la calma, controlo el estrés y sigo mi estrategia' },
          { key: 'B', text: 'Necesito pausar unos segundos para no bloquearme y reordenar mis ideas' },
          { key: 'C', text: 'La presión me activa y acelero el ritmo tomando decisiones con rapidez' },
          { key: 'D', text: 'Divido mentalmente el tiempo y el problema en etapas antes de continuar' }
        ]
      }
    }
  },
  {
    base_id: 'Q22',
    dimension: 'Personalidad',
    question_type: 'Elección',
    base: {
      stem: 'Si el equipo logra una meta difícil, ¿qué papel te sale más natural asumir?',
      options: [
        { key: 'A', text: 'Coordinar para que todos sepan qué hacer' },
        { key: 'B', text: 'Aportar ideas y empezar una parte del trabajo' },
        { key: 'C', text: 'Asegurar que todos puedan aportar' },
        { key: 'D', text: 'Concentrarme en mi tarea y entregar un resultado sólido' }
      ]
    }
  },
  {
    base_id: 'Q23',
    dimension: 'Valores',
    question_type: 'Trade-off',
    base: {
      stem: 'Si tuvieras que elegir entre dos proyectos igualmente interesantes, ¿qué te haría inclinarte por uno?',
      options: [
        { key: 'A', text: 'Que te permita aprender muchísimo' },
        { key: 'B', text: 'Que tenga ingresos y resultados económicos concretos' },
        { key: 'C', text: 'Que genere un impacto positivo en otras personas' },
        { key: 'D', text: 'Que te dé libertad para decidir cómo trabajar' }
      ]
    },
    variants: {
      '3S': {
        variant_id: 'Q23_3S',
        stem: 'Si tuvieras que elegir entre dos proyectos igualmente interesantes, ¿qué te haría inclinarte por uno?',
        options: [
          { key: 'A', text: 'Que te permita aprender muchísimo' },
          { key: 'B', text: 'Que tenga ganancias, premios o resultados concretos' },
          { key: 'C', text: 'Que genere un impacto positivo en otras personas' },
          { key: 'D', text: 'Que te dé libertad para decidir cómo trabajar' }
        ]
      }
    }
  },
  {
    base_id: 'Q24',
    dimension: 'Valores',
    question_type: 'Trade-off',
    base: {
      stem: 'Un proyecto puede ser muy creativo, pero también puede ser menos predecible. Otro es más seguro, pero tiene menos espacio para crear. ¿Qué priorizarías?',
      options: [
        { key: 'A', text: 'Creatividad y nuevas ideas' },
        { key: 'B', text: 'Seguridad y estabilidad' },
        { key: 'C', text: 'Un equilibrio entre ambas' },
        { key: 'D', text: 'Dependería de cuánto pueda aprender' }
      ]
    }
  },
  {
    base_id: 'Q25',
    dimension: 'Valores',
    question_type: 'Trade-off',
    base: {
      stem: 'Tu equipo debe decidir entre una solución rápida que funciona bastante bien y una solución más completa que tardará más. ¿Qué priorizarías?',
      options: [
        { key: 'A', text: 'Terminar rápido y avanzar' },
        { key: 'B', text: 'Hacerla más completa aunque tome más tiempo' },
        { key: 'C', text: 'Elegir según el impacto que tenga en las personas' },
        { key: 'D', text: 'Buscar una tercera alternativa' }
      ]
    }
  },
  {
    base_id: 'Q26',
    dimension: 'Valores',
    question_type: 'Trade-off',
    base: {
      stem: 'Imagina que puedes elegir entre recibir instrucciones claras del profesor o tener libertad para decidir cómo hacer tu trabajo. ¿Qué te importa más?',
      options: [
        { key: 'A', text: 'Tener mucha libertad para decidir' },
        { key: 'B', text: 'Tener instrucciones claras y estructura' },
        { key: 'C', text: 'Tener libertad, pero con objetivos claros' },
        { key: 'D', text: 'Poder aprender nuevas formas de hacerlo' }
      ]
    },
    variants: {
      '5S': {
        variant_id: 'Q26_5S',
        stem: 'Imagina que en un proyecto puedes elegir entre seguir un procedimiento predefinido y estructurado o tener autonomía para decidir cómo lograr los objetivos. ¿Qué te importa más?',
        options: [
          { key: 'A', text: 'Tener autonomía completa sobre cómo ejecutarlo' },
          { key: 'B', text: 'Tener un procedimiento claro, seguro y estructurado' },
          { key: 'C', text: 'Tener libertad metodológica, pero con metas y entregables claros' },
          { key: 'D', text: 'Tener la oportunidad de explorar y aprender nuevas formas de trabajar' }
        ]
      }
    }
  },
  {
    base_id: 'Q27',
    dimension: 'Valores',
    question_type: 'Trade-off',
    base: {
      stem: 'En una decisión importante, ¿qué criterio pesa más para ti?',
      options: [
        { key: 'A', text: 'Que sea justo para las personas involucradas' },
        { key: 'B', text: 'Que sea eficiente y dé buenos resultados' },
        { key: 'C', text: 'Que ayude a aprender algo nuevo' },
        { key: 'D', text: 'Que mantenga un buen equilibrio con la vida personal' }
      ]
    }
  },
  {
    base_id: 'Q28',
    dimension: 'Valores',
    question_type: 'Escenario',
    base: {
      stem: 'Si una actividad te da mucho reconocimiento, pero no te permite aprender ni crear, ¿qué tan atractiva te resultaría?',
      options: [
        { key: 'A', text: 'Mucho, el reconocimiento importa bastante' },
        { key: 'B', text: 'Poco, preferiría aprender' },
        { key: 'C', text: 'Poco, preferiría crear algo' },
        { key: 'D', text: 'Dependería de si también genera un impacto útil' }
      ]
    }
  },
  {
    base_id: 'Q29',
    dimension: 'Aptitudes',
    question_type: 'Mini-reto',
    difficulty_level: 1,
    base: {
      stem: 'Una secuencia sigue este patrón: 3, 6, 12, 24, __. ¿Qué número continúa?',
      options: [
        { key: 'A', text: '30' },
        { key: 'B', text: '36' },
        { key: 'C', text: '48' },
        { key: 'D', text: '54' }
      ]
    }
  },
  {
    base_id: 'Q30',
    dimension: 'Aptitudes',
    question_type: 'Mini-reto',
    difficulty_level: 1,
    base: {
      stem: 'Una tienda tiene 4 cajas. Cada caja procesa 15 pedidos por hora. Si todas trabajan durante 2 horas, ¿cuántos pedidos procesan en total?',
      options: [
        { key: 'A', text: '60' },
        { key: 'B', text: '90' },
        { key: 'C', text: '120' },
        { key: 'D', text: '150' }
      ]
    }
  },
  {
    base_id: 'Q31',
    dimension: 'Aptitudes',
    question_type: 'Mini-reto verbal',
    difficulty_level: 2,
    base: {
      stem: "Lee con atención: 'Una solución puede ser rápida, pero si no resuelve la causa del problema, el problema puede reaparecer.' ¿Cuál conclusión está mejor respaldada?",
      options: [
        { key: 'A', text: 'Las soluciones rápidas nunca sirven' },
        { key: 'B', text: 'Resolver la causa puede evitar que el problema vuelva' },
        { key: 'C', text: 'Todo problema tiene una sola causa' },
        { key: 'D', text: 'Una solución lenta siempre es mejor' }
      ]
    }
  },
  {
    base_id: 'Q32',
    dimension: 'Aptitudes',
    question_type: 'Mini-caso',
    difficulty_level: 2,
    base: {
      stem: 'Tres estudiantes llegan tarde. Ana dice que perdió el bus. Luis dice que se quedó dormido. Marta dice que el bus pasó antes de la hora habitual. ¿Qué información ayudaría más a saber si hubo un cambio en el servicio del bus?',
      options: [
        { key: 'A', text: 'La opinión de otros estudiantes' },
        { key: 'B', text: 'El horario habitual y el horario real del bus' },
        { key: 'C', text: 'Si los estudiantes estaban cansados' },
        { key: 'D', text: 'Qué estudiante llegó más tarde' }
      ]
    }
  },
  {
    base_id: 'Q33',
    dimension: 'Aptitudes',
    question_type: 'Mini-reto espacial',
    visual_asset: '/assets/mini-retos/q33_cubo_espacial.svg',
    difficulty_level: 2,
    base: {
      stem: 'Observa el cubo de la imagen y su flecha de referencia. Si el cubo gira 90° hacia la derecha en la dirección indicada, ¿cuál de las siguientes opciones muestra la orientación resultante correcta?',
      options: [
        { key: 'A', text: 'Figura A (La flecha apunta en sentido contrario al giro)' },
        { key: 'B', text: 'Figura B (La flecha sigue la orientación correcta del giro de 90°)' },
        { key: 'C', text: 'Figura C (La flecha desaparece de la cara observable)' },
        { key: 'D', text: 'Figura D (La cara permanece invertida sin rotación)' }
      ]
    }
  },
  {
    base_id: 'Q34',
    dimension: 'Aptitudes',
    question_type: 'Mini-reto creativo',
    is_experimental: true,
    difficulty_level: null,
    base: {
      stem: 'Tienes una botella vacía, una cuerda y una hoja de papel. ¿Cuál propuesta muestra más posibilidades de uso diferentes?',
      options: [
        { key: 'A', text: 'Usar la botella solo como recipiente' },
        { key: 'B', text: 'Usar la botella como recipiente y la hoja para una etiqueta' },
        { key: 'C', text: 'Pensar varios usos posibles y elegir uno que resuelva un problema concreto' },
        { key: 'D', text: 'No usar la botella porque no fue diseñada para eso' }
      ]
    }
  },
  {
    base_id: 'Q35',
    dimension: 'Aptitudes',
    question_type: 'Mini-caso',
    difficulty_level: 2,
    base: {
      stem: 'Un equipo debe organizar una actividad con 30 personas, tres tareas y dos horas. ¿Qué paso sería más útil primero?',
      options: [
        { key: 'A', text: 'Empezar sin plan para ahorrar tiempo' },
        { key: 'B', text: 'Dividir tareas, responsables y tiempos' },
        { key: 'C', text: 'Esperar a que alguien organice todo' },
        { key: 'D', text: 'Elegir primero el diseño del afiche' }
      ]
    },
    variants: {
      '3S': {
        variant_id: 'Q35_3S',
        stem: 'Tu equipo de 6 compañeros debe organizar un stand para una feria escolar con tres tareas distintas en dos horas. ¿Qué paso sería más útil primero?',
        options: [
          { key: 'A', text: 'Empezar sin plan para ahorrar tiempo' },
          { key: 'B', text: 'Dividir tareas, responsables y tiempos' },
          { key: 'C', text: 'Esperar a que alguien organice todo' },
          { key: 'D', text: 'Elegir primero el diseño del afiche' }
        ]
      }
    }
  },
  {
    base_id: 'Q36',
    dimension: 'Aptitudes',
    question_type: 'Mini-caso social',
    difficulty_level: 2,
    base: {
      stem: 'Una persona de tu equipo está molesta porque siente que su idea fue ignorada. ¿Cuál respuesta ayuda más a comprender la situación antes de decidir?',
      options: [
        { key: 'A', text: 'Decirle que debe aceptar la decisión' },
        { key: 'B', text: 'Preguntarle qué parte de su idea considera importante y escuchar su explicación' },
        { key: 'C', text: 'Cambiar inmediatamente la decisión' },
        { key: 'D', text: 'Ignorar el tema para evitar conflicto' }
      ]
    }
  },
  {
    base_id: 'Q37',
    dimension: 'Consistencia',
    question_type: 'Elección forzada',
    base: {
      stem: 'Volvamos a una idea parecida a la del inicio. Si tuvieras que elegir ahora un proyecto para varias semanas, ¿qué te atraería más?',
      options: [
        { key: 'A', text: 'Investigar una pregunta hasta entenderla' },
        { key: 'B', text: 'Construir/probar una solución concreta' },
        { key: 'C', text: 'Crear una experiencia visual o narrativa' },
        { key: 'D', text: 'Trabajar directamente con personas para ayudarlas o enseñarles' }
      ]
    }
  },
  {
    base_id: 'Q38',
    dimension: 'Consistencia',
    question_type: 'Escenario',
    base: {
      stem: 'Si un proyecto que te gustaba cambia de dirección a mitad de camino, ¿qué opción se parece más a lo que harías?',
      options: [
        { key: 'A', text: 'Me adapto y pruebo el nuevo camino' },
        { key: 'B', text: 'Intento mantener el plan original' },
        { key: 'C', text: 'Busco una alternativa que combine ambas cosas' },
        { key: 'D', text: 'Prefiero abandonar y empezar otra cosa' }
      ]
    }
  },
  {
    base_id: 'Q39',
    dimension: 'Consistencia',
    question_type: 'Trade-off',
    base: {
      stem: 'Si pudieras elegir entre un proyecto muy estructurado y otro con mucha libertad pero más incertidumbre, ¿cuál escogerías?',
      options: [
        { key: 'A', text: 'El estructurado' },
        { key: 'B', text: 'El de mayor libertad' },
        { key: 'C', text: 'Dependería del propósito del proyecto' },
        { key: 'D', text: 'El que permita experimentar más' }
      ]
    },
    variants: {
      '3S': {
        variant_id: 'Q39_3S',
        stem: 'Si pudieras elegir entre un proyecto muy ordenado paso a paso y otro con mucha libertad, pero sin saber con certeza qué pasará, ¿cuál escogerías?',
        options: [
          { key: 'A', text: 'El que tiene pasos claros y ordenados' },
          { key: 'B', text: 'El que da más libertad para decidir' },
          { key: 'C', text: 'Dependería del objetivo del proyecto' },
          { key: 'D', text: 'El que permita experimentar más' }
        ]
      }
    }
  },
  {
    base_id: 'Q40',
    dimension: 'Integración',
    question_type: 'Escenario',
    base: {
      stem: "Al terminar una actividad, ¿qué señal te haría pensar 'esto sí fue una buena experiencia para mí'?",
      options: [
        { key: 'A', text: 'Entendí algo que antes no entendía' },
        { key: 'B', text: 'Creé o mejoré algo que puedo mostrar' },
        { key: 'C', text: 'Ayudé a que otra persona avanzara' },
        { key: 'D', text: 'Resolví un problema difícil o encontré cómo hacerlo funcionar' }
      ]
    }
  }
];

/**
 * Obtiene el banco de 40 preguntas adaptado específicamente al grado del estudiante (3S, 4S o 5S).
 * - Garantiza exactamente 40 preguntas ordenadas Q01 a Q40.
 * - Aplica las variantes contextuales de grado cuando están definidas, o retrocede a la versión BASE.
 * - Conserva metadatos completos (variant_id, difficulty_level, visual_asset, etc.).
 */
export function getQuestionsForGrade(grade: GradeLevel): QuestionItem[] {
  return QUESTION_DEFINITIONS.map((def) => {
    const variantConfig = def.variants?.[grade];
    const isVariant = !!variantConfig;

    const variantId = isVariant && variantConfig.variant_id
      ? variantConfig.variant_id
      : \`\${def.base_id}_BASE\`;

    const stem = isVariant && variantConfig.stem
      ? variantConfig.stem
      : def.base.stem;

    const options = isVariant && variantConfig.options
      ? variantConfig.options
      : def.base.options;

    return {
      question_id: isVariant ? variantId : def.base_id,
      base_question_id: def.base_id,
      variant_id: variantId,
      grade_level: isVariant ? grade : 'ALL',
      difficulty_level: def.difficulty_level ?? null,
      dimension: def.dimension,
      question_type: def.question_type,
      stem,
      options,
      visual_asset: def.visual_asset,
      is_experimental: def.is_experimental
    };
  });
}
`;

fs.writeFileSync('src/lib/questionnaire/bank.ts', scriptContent, 'utf-8');
console.log('src/lib/questionnaire/bank.ts generated successfully.');
