# Alex IA — Documento Maestro del Prototipo (Lovable / Antigravity)

> Nota: este documento es para generar un **prototipo visual/navegable**. Por ahora no hay base de datos real (sin Supabase) — el login y los datos pueden simularse con lógica simple en el frontend (roles fijos, datos mock por perfil).

---

## 1. CONTEXTO Y MISIÓN

Alex IA es una startup peruana de orientación vocacional impulsada por inteligencia artificial. Su misión es ayudar a estudiantes de secundaria a descubrir qué carrera estudiar de manera objetiva, moderna y personalizada.

La plataforma **no está afiliada a universidades** y no busca vender una universidad específica. Acompaña al estudiante durante toda la secundaria para que tome una mejor decisión de vida.

**Concepto principal:** "El Spotify de la orientación vocacional" — así como Spotify conoce tus gustos musicales, Alex IA conoce tus intereses, personalidad, habilidades y sueños para recomendar carreras, cursos y experiencias.

### Disclaimer obligatorio
Debe aparecer de forma visible (footer, pantalla de resultados, examen de admisión):

> "Alex IA es una herramienta de orientación y autoconocimiento. No constituye un diagnóstico psicológico ni reemplaza la evaluación de un psicólogo u orientador vocacional certificado. Los resultados son estimaciones referenciales basadas en tus respuestas, no mediciones exactas de habilidad o éxito futuro."

---

## 2. PÚBLICO OBJETIVO Y PERFILES DE ACCESO

- Estudiantes de 14 a 18 años.
- Padres de familia.
- Colegios privados y públicos (B2B).

**País inicial:** Perú.

### 2.1 Sistema de Login (3 perfiles)

Para el prototipo, el login es simulado: una pantalla donde el usuario elige su tipo de perfil (sin backend real, solo enrutamiento condicional al perfil correspondiente).

**Perfil 1 — Estudiante**
Acceso a:
- Test Vocacional
- Pantalla de Resultados (su propio resultado)
- Explorador de Carreras
- Examen Tipo Admisión (nuevo)
- Alex IA Coach

**Perfil 2 — Padre/Apoderado**
Acceso a:
- Portal para Padres (resumen del perfil de su hijo/a, carreras recomendadas, consejos)
- No debe ver el detalle del Examen Tipo Admisión del hijo en números crudos — solo un resumen cualitativo (ej. "Tu hijo va por buen camino"), para mantener el tono no punitivo también hacia los padres.

**Perfil 3 — Colegio**
Acceso a:
- Portal para Colegios (vista institucional agregada, sin datos individuales sensibles)

Cada perfil ve **solo su menú de navegación correspondiente** — el resto de secciones no deben aparecer en su sidebar/navbar.

Link visual a "Política de Privacidad" en el footer (contenido legal real se redacta después).

---

## 3. DISEÑO VISUAL

- Moderna, minimalista, inspiradora, profesional pero juvenil.
- Mucho espacio en blanco, ilustraciones vectoriales, bordes redondeados, animaciones suaves.
- Responsive (móvil y desktop).

**Inspiración:** Spotify, Duolingo, Notion, Coursera, Khan Academy, Headspace.

**Paleta de colores:**
| Uso | Color |
|---|---|
| Primario | #5B5CF6 (morado moderno) |
| Secundario | #6D9EFF (azul claro) |
| Fondo | #F7F8FC |
| Texto | #1A1A1A |
| Acentos | #FFB84D |

Tarjetas con sombras suaves y efecto hover. Iconos modernos.

---

## 4. ESTRUCTURA DE LA WEB

### 4.1 HOME

- Hero: "Descubre la carrera ideal para ti con Inteligencia Artificial"
- Subtítulo: "Alex IA analiza tu personalidad, intereses y habilidades para ayudarte a tomar una de las decisiones más importantes de tu vida."
- Botones: [Realizar Test] [Explorar Carreras]
- Ilustración: estudiante viendo dashboard con afinidades.
- Sección "¿Cómo funciona?": 4 pasos con iconos grandes.

**Bullets de impacto (nuevo):**
Sección visualmente llamativa con datos grandes tipo "dato shock", en tarjetas con tipografía grande y color de acento. Ejemplo de formato (los números son placeholders — deben verificarse con fuente real como Ponte en Carrera / INEI antes de publicar):

> 📊 "Una alta proporción de jóvenes en Perú no termina ejerciendo la carrera que estudió."
> 📊 "Muchos estudiantes cambian de carrera en los primeros años de universidad."
> 📊 "La elección correcta de carrera reduce significativamente la deserción universitaria."

Mostrar con nota pequeña "*Dato referencial — fuente por confirmar*" hasta tener la cifra exacta y su fuente.

### 4.2 TEST VOCACIONAL (motor rediseñado)

**Reglas generales:**
- Máximo 50 preguntas, duración máxima 7 minutos.
- No debe sentirse como examen — debe sentirse como un quiz interactivo (estilo BuzzFeed/Duolingo).
- Cada pregunta con ilustraciones, emojis o tarjetas visuales.
- Microanimaciones y feedback inmediato al seleccionar.
- Barra de progreso segmentada por dimensión (no una sola barra genérica) para que el estudiante vea que está explorando distintos aspectos de sí mismo, no solo respondiendo trivia.

**6 dimensiones (subsecciones visibles, con su propio mini-encabezado e icono):**

1. **Intereses vocacionales (10 preguntas)** — basado en RIASEC. Formato: tarjetas de imagen/emoji para elegir.
   - Ej: "¿Qué actividad te emociona más?" 🧪 Hacer experimentos / 🎨 Crear ilustraciones / 🤝 Ayudar personas / 📈 Liderar un negocio / 🛠 Construir o reparar cosas / 📋 Organizar información

2. **Personalidad (8 preguntas)** — introversión/extroversión, curiosidad, organización, tolerancia al riesgo, empatía, creatividad. Formato: escala interactiva deslizable.
   - Ej: "¿Te gusta improvisar?" Nunca ○────● Siempre

3. **Aptitudes (10 preguntas)** — razonamiento lógico, comunicación, creatividad, liderazgo, resolución de problemas, atención al detalle. Formato: mini-situaciones/escenarios.
   - Ej: "Tienes que organizar un evento escolar. ¿Qué harías primero?" A. Cronograma / B. Buscar patrocinadores / C. Diseñar campaña / D. Coordinar al equipo

4. **Valores personales (7 preguntas)** — qué busca en su vida profesional. Formato: tarjetas con emoji.
   - 💰 Ganar mucho dinero / 🌎 Generar impacto / ⚖ Equilibrio vida-trabajo / 🚀 Innovar / 🏆 Prestigio / ❤️ Ayudar personas

5. **Estilo de vida ideal (7 preguntas)** — oficina o campo, viajar o quedarse, remoto o presencial, estabilidad o aventura.
   - Ej: "¿Dónde te imaginas trabajando?" 🏥 Hospital / 🏢 Oficina / 🌳 Campo / 🌍 Diferentes países / 🏠 Desde casa

6. **Contexto y realidad (5 preguntas)** — si trabajará mientras estudia, si puede mudarse, si desea posgrado, si cuenta con apoyo familiar.

Transición visual entre cada dimensión (ej. una pantalla corta tipo "¡Vas muy bien! Ahora exploremos tu personalidad 🎯") para romper la monotonía y reforzar que es un viaje, no un examen.

### 4.3 PANTALLA DE RESULTADOS (rediseño completo)

El resultado nunca debe sentirse como una etiqueta plana tipo "Eres Medicina". Debe sentirse épico y narrativo.

**1. Tu ADN Profesional**
Un arquetipo con nombre evocador, no un nombre de carrera. Ejemplos: "Curador Estratégico", "Arquitecto del Futuro", "Innovador Humanista", "Creador Visionario".
Explicar: cómo piensa, qué lo motiva, cómo aprende, cómo trabaja.

**2. Superpoderes**
Radar/gráfico con: Empatía, Liderazgo, Creatividad, Análisis, Comunicación, Resiliencia — con porcentajes.

**3. Tu Entorno Ideal**
Ej: "Trabajas mejor: en equipo / en ambientes dinámicos / resolviendo problemas / aprendiendo constantemente."

**4. Top 5 Carreras** (no solo una)
Cada una con afinidad %, y el **por qué** explicado en términos del perfil (ej. "Porque tienes alta empatía, interés científico, buen manejo emocional, capacidad analítica").
Para la carrera líder, mostrar **especialidades ideales dentro de ella** (ej. en Medicina: ❤️ Cardiología, 🧠 Neurología, 👶 Pediatría, 💬 Psiquiatría) con salario promedio, tiempo de especialización, demanda laboral y estilo de vida.

**5. Carrera Sorpresa**
Una carrera no obvia con alta afinidad, explicando por qué. Ej: "No habías considerado Bioingeniería. Pero tu perfil tiene una afinidad del 86%."

**6. Tu Mayor Desafío**
Un reto personal con tono constructivo, no clínico (ej. "Tiendes a sobreanalizar las decisiones" + recomendación práctica). Evitar términos que suenen a diagnóstico de salud mental.

**7. Plan de Acción**
Qué hacer este año: cursos recomendados, actividades extracurriculares, canales de YouTube, libros, voluntariados/experiencias.

**CTA final (nuevo — conecta con el examen de admisión):**
Al cierre del resultado, ofrecer: *"¿Quieres medir tu nivel actual frente al examen de admisión de la carrera que más te gustó?"* → [Sí, quiero intentarlo] [Tal vez después]. Si acepta, redirige a la sección 4.4 precargada con la carrera/universidad relacionada.

### 4.4 EXAMEN TIPO ADMISIÓN (nuevo)

**Propósito:** dar una referencia del nivel académico actual del estudiante frente al estilo de examen de las universidades más reconocidas del Perú (San Marcos, UNI, Católica, Cayetano Heredia) — **no es un examen real ni determina nada sobre el futuro del estudiante.**

**Formato:** 15 preguntas, tiempo limitado opcional, estilo similar al examen real de la universidad asociada a la carrera recomendada.

**Áreas evaluadas:** Razonamiento Verbal (RV), Razonamiento Matemático (RM), Comprensión Lectora (CL), Matemática (MAT), Física (FIS), Química (QUI), Biología (BIO), Ciencias Sociales (HGC), Actualidad (ACT).

**Distribución de las 15 preguntas según la carrera/universidad recomendada (para el prototipo: bancos de preguntas fijos por carrera, sin cálculo dinámico real):**

| Carrera (estilo de examen) | Distribución |
|---|---|
| Medicina / Salud (Cayetano) | BIO 5, QUI 3, CL 3, RM 2, ACT 2 |
| Ingeniería (UNI) | MAT 5, FIS 4, RM 4, CL 2 |
| Derecho / Sociales (San Marcos) | RV 5, CL 4, HGC 3, ACT 2, RM 1 |
| Negocios / Economía (Católica) | RM 4, CL 3, RV 3, ACT 3, MAT 2 |
| Psicología / Sociales | CL 4, RV 4, BIO 2, ACT 3, RM 2 |
| Arte / Diseño / Comunicación | CL 4, RV 3, ACT 4, RM 2, Cultura General 2 |

**Resultado — tono obligatoriamente motivador, NUNCA punitivo:**
- Nunca usar palabras como "desaprobado", "fallaste", "reprobaste".
- Usar 3 niveles de resultado:
  - **Nivel avanzado (≥70%):** mensaje de validación + invitación a intentarlo pronto, siempre recomendando seguir preparándose.
  - **Nivel en desarrollo (40-69%):** mensaje de aliento + señalar el área específica a reforzar.
  - **Nivel inicial (<40%):** mensaje explícito de que el examen no mide su potencial ni define su futuro, reconectar con el resultado del test vocacional (esa carrera sí conecta con quién es), y entregar un plan de refuerzo en las áreas débiles.
- Cierre siempre con: nota de que es un examen de práctica/referencial, plan de acción de estudio (temas a reforzar, recursos), y mensaje motivador final ligado a su "ADN Profesional".

**Flujo de entrada:** se ofrece al terminar el Test Vocacional (sección 4.3) o como acceso directo desde el menú del perfil Estudiante.

### 4.5 EXPLORADOR DE CARRERAS (actualizado)

- Buscador + filtros por área (Ingeniería, Salud, Negocios, Arte, Ciencias Sociales, Tecnología).
- **Se elimina el "% de afinidad" genérico de esta sección** (ese dato vive en la Pantalla de Resultados, no aquí).
- Cada tarjeta de carrera debe mostrar, con mayor especificidad (inspirado en la lógica de "Ponte en Carrera" del Estado peruano):
  - Sueldo promedio (monto en soles, ej. "S/ 3,500 - S/ 5,000").
  - Posibles puestos de trabajo (ej. para Ingeniería Industrial: Jefe de Operaciones, Analista de Procesos, Consultor de Mejora Continua).
  - Duración de la carrera.
  - Empleabilidad/demanda.
- **Especificidad por ramas:** las carreras "madre" deben desagregarse en sus ramas reales en la vista detalle (ej. Medicina → Medicina General, y dentro de ella las especialidades; Ingeniería → Industrial, Civil, de Sistemas, Mecánica, etc. como tarjetas o sub-secciones distintas, no una sola tarjeta genérica de "Ingeniería").
- Vista detalle: descripción, malla curricular, salario por años de experiencia, universidades, institutos, especializaciones, videos, tendencia laboral, demanda futura.
- Para el prototipo, estos datos pueden ser de ejemplo/ilustrativos (el contenido fino se completará después con ayuda de IA, según mencionaste).

### 4.6 PORTAL PARA PADRES

- "Acompaña el futuro de tu hijo": resumen del perfil, carreras recomendadas, fortalezas, recomendaciones.
- Resumen cualitativo del Examen Tipo Admisión (sin exponer el número crudo de forma fría) — ej. "Tu hijo/a va por buen camino" en lugar de "Obtuvo 38%".
- Consejos (no presionar, explorar extracurriculares, hablar de expectativas, valorar el proceso).
- Línea de tiempo: 3ro secundaria (exploración), 4to (profundización), 5to (decisión).

### 4.7 PORTAL PARA COLEGIOS

- Vista institucional simple: progreso general del test por aula/grado, perfiles agregados a modo de ejemplo, propuesta de valor para el colegio (orientación vocacional escalable para todos sus estudiantes).

### 4.8 PANEL DE IA — "Alex IA Coach"

- Diseño tipo chat conversacional.
- Ejemplo de conversación (alumno duda entre dos carreras, IA compara fortalezas).
- Puede sugerir proactivamente el Examen Tipo Admisión cuando el estudiante pregunte sobre su nivel o posibilidades de ingreso.
- Tono informativo/orientador, evitando sonar a terapia psicológica, en línea con el disclaimer de la sección 1.

### 4.9 FOOTER

- Logo + tagline: "Transformando decisiones de vida con Inteligencia Artificial."
- Links: Nosotros, Test Vocacional, Carreras, Para Colegios, Blog, Contacto.
- Redes sociales.
- Link a "Política de Privacidad" (visual, dado el público menor de edad).

---

## 5. TONO GENERAL

Emocional, inspirador, moderno, profesional, muy visual — nivel de una startup EdTech con buen funding. El usuario debe terminar pensando:

*"Esto no me dio una carrera. Me ayudó a entender quién soy y quién puedo llegar a ser."*
