# Alex IA — Prototipo Web de Orientación Vocacional (Prompt para Lovable)

> Nota: este prompt es para generar un **prototipo visual/navegable** en Lovable. No incluye requerimientos técnicos, de base de datos ni de autenticación real — todo el contenido (resultados, carreras, perfiles) puede usar **datos de ejemplo (mock)** fijos o aleatorios dentro de la interfaz.

## 1. CONTEXTO Y MISIÓN

Alex IA es una startup peruana de orientación vocacional impulsada por inteligencia artificial. Su misión es ayudar a estudiantes de secundaria a descubrir qué carrera estudiar de manera objetiva, moderna y personalizada.

La plataforma **no está afiliada a universidades** y no busca vender una universidad específica. Acompaña al estudiante durante toda la secundaria para que tome una mejor decisión de vida.

**Concepto principal:** "El Spotify de la orientación vocacional" — así como Spotify conoce tus gustos musicales, Alex IA conoce tus intereses, personalidad, habilidades y sueños para recomendar carreras, cursos y experiencias.

### Disclaimer obligatorio (nuevo)
Debe aparecer de forma visible (footer, pantalla de resultados, T&C):

> "Alex IA es una herramienta de orientación y autoconocimiento. No constituye un diagnóstico psicológico ni reemplaza la evaluación de un psicólogo u orientador vocacional certificado. Los porcentajes de afinidad son estimaciones referenciales basadas en tus respuestas, no mediciones exactas de habilidad o éxito futuro."

Esto es especialmente importante porque el público objetivo incluye menores de edad.

---

## 2. PÚBLICO OBJETIVO

- Estudiantes de 14 a 18 años.
- Padres de familia.
- Psicólogos y orientadores.
- Colegios privados y públicos (B2B).

**País inicial:** Perú.

Dado que el público incluye menores de edad, basta con incluir en el footer un link visual a "Política de Privacidad" (el contenido legal real se redacta después, fuera del alcance del prototipo).

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
- Ilustración: estudiante viendo dashboard con afinidades (Ingeniería, Medicina, Diseño, Marketing, Psicología).
- Sección "¿Cómo funciona?": 4 pasos (responder preguntas → IA analiza → recibe carreras compatibles → explora universidades), con iconos grandes.

### 4.2 TEST VOCACIONAL
- Barra de progreso + contador ("Pregunta 4 de 40").
- Preguntas en tarjetas, opción múltiple.
- Para el prototipo, los resultados pueden generarse con valores de ejemplo (fijos o aleatorios) — no es necesario definir un algoritmo de scoring real.
- Animaciones al seleccionar respuesta.

### 4.3 PANTALLA DE RESULTADOS
- Título: "Este es tu perfil vocacional"
- Ilustración del estudiante + compatibilidad general (ej. 87%, con nota de que es referencial).
- Top 3 carreras con % de afinidad y descripción breve + botón "Explorar carrera".
- Radar de habilidades (Liderazgo, Creatividad, Empatía, Análisis, Comunicación, Innovación).
- Fortalezas (lista con check).
- Oportunidades de mejora — **redactar con tono constructivo, no clínico** (ej. "Sigue desarrollando tu disciplina" en vez de términos como "gestionar ansiedad", que puede sonar a diagnóstico de salud mental).

### 4.4 EXPLORADOR DE CARRERAS
- Buscador + filtros por área (Ingeniería, Salud, Negocios, Arte, Ciencias Sociales, Tecnología).
- Tarjeta de carrera: compatibilidad, salario promedio, empleabilidad, duración, áreas de trabajo, botón "Ver más".
- Vista detalle: descripción, malla curricular, salario por años de experiencia, universidades, institutos, especializaciones, videos, tendencia laboral, demanda futura.
- Para el prototipo, estos datos pueden ser de ejemplo/ilustrativos (no es necesario conectarlos a fuentes oficiales reales todavía).

### 4.5 PORTAL PARA PADRES
- "Acompaña el futuro de tu hijo": resumen del perfil, carreras recomendadas, fortalezas, riesgos, recomendaciones.
- Consejos (no presionar, explorar extracurriculares, hablar de expectativas, valorar el proceso).
- Línea de tiempo: 3ro secundaria (exploración), 4to (profundización), 5to (decisión).

### 4.6 PORTAL PARA COLEGIOS (nuevo)
- Vista institucional simple: progreso general del test por aula/grado, perfiles agregados a modo de ejemplo, propuesta de valor para el colegio (orientación vocacional escalable para todos sus estudiantes).

### 4.7 PANEL DE IA — "Alex IA Coach"
- Diseño tipo chat conversacional.
- Ejemplo de conversación (alumno duda entre Ingeniería y Marketing, IA compara fortalezas).
- El tono del coach debe ser informativo/orientador, evitando sonar a terapia psicológica, en línea con el disclaimer de la sección 1.

### 4.8 FOOTER
- Logo + tagline: "Transformando decisiones de vida con Inteligencia Artificial."
- Links: Nosotros, Test Vocacional, Carreras, Para Colegios, Blog, Contacto.
- Redes sociales.
- Link a "Política de Privacidad" (visual, dado el público menor de edad).

---

## 5. TONO GENERAL

Emocional, inspirador, moderno, profesional, muy visual — nivel de una startup EdTech con buen funding. El usuario debe sentir: *"Esto no es un simple test vocacional. Es mi compañero para descubrir mi futuro."*