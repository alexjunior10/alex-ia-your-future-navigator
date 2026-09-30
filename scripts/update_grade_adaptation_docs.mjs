import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import mammoth from 'mammoth';

// Helper to escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function p(text, isBold = false, isHeading = false, isBullet = false) {
  let styleXml = '';
  if (isHeading) {
    styleXml = '<w:pPr><w:pStyle w:val="Heading1"/></w:pPr>';
  } else if (isBullet) {
    styleXml = '<w:pPr><w:pStyle w:val="ListBullet"/></w:pPr>';
  }
  
  let rPrXml = '';
  if (isBold) {
    rPrXml = '<w:rPr><w:b/><w:bCs/></w:rPr>';
  }

  return `<w:p>${styleXml}<w:r>${rPrXml}<w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
}

async function updateDocx(filePath, newParagraphsXml, label) {
  console.log(`Updating ${label}: ${filePath}...`);
  const zip = new AdmZip(filePath);
  let xml = zip.readAsText('word/document.xml');
  
  const sectIdx = xml.lastIndexOf('<w:sectPr');
  if (sectIdx === -1) {
    throw new Error(`No <w:sectPr found in ${filePath}`);
  }

  const updatedXml = xml.substring(0, sectIdx) + newParagraphsXml + xml.substring(sectIdx);
  zip.updateFile('word/document.xml', Buffer.from(updatedXml, 'utf-8'));
  zip.writeZip(filePath);
  
  // Verify with mammoth
  const verifyRes = await mammoth.extractRawText({ path: filePath });
  console.log(`✓ ${label} updated successfully. New extracted length: ${verifyRes.value.length}`);
}

async function main() {
  console.log('=== ACTUALIZACIÓN DOCUMENTAL: ADAPTACIÓN POR GRADO ===\n');

  // 1. Questionnaire_Design_V1.docx -> Capítulo 19: Adaptación por etapa educativa
  const designParas = [
    p('19. Adaptación por etapa educativa', true, true),
    p('Este capítulo formaliza la metodología de adaptación del cuestionario según la etapa educativa del estudiante (3.º, 4.º y 5.º de secundaria), garantizando un único modelo vocacional normativo y comparable.'),
    p('1. El grado escolar es la variable principal de adaptación: Se adopta grade_level (3S, 4S, 5S) como eje segmentador, ya que refleja fidedignamente la etapa de desarrollo cognitivo, la autonomía escolar y el horizonte temporal de la toma de decisiones vocacionales. La edad cronológica se descarta como variable primaria. La categoría eventual de "egresado" se tratará como cohorte independiente y no asimilada a 5S.'),
    p('2. El constructo vocacional permanece estrictamente constante: Cada pregunta evalúa exactamente la misma variable canónica del ADN Vocacional (las 38 variables oficiales). No se crean variables fragmentadas por grado (queda terminantemente prohibido crear constructos ficticios como APT_ORG_3S o VAL_EST_5S).'),
    p('3. Variación de lenguaje y contexto situacional: Las adaptaciones contextuales adecúan el vocabulario, las metáforas y los escenarios. En 3S los problemas se sitúan en dinámicas cotidianas del aula y tareas guiadas; en 5S se ubican en proyectos autónomos con fechas límite, restricciones de recursos e interacción con actores externos.'),
    p('4. Control y variación de dificultad en aptitudes cognitivas: En los mini-retos objetivos (APT_LOG, APT_NUM, APT_VER, APT_ANA, APT_ESP, APT_ORG, APT_SOC) se modula la complejidad cognitiva (difficulty_level: 1, 2, 3) para evitar efectos techo en 5.º o efectos piso en 3.º, asegurando máxima discriminación psicométrica.'),
    p('5. Parsimonia psicométrica (no todos los ítems requieren variantes): Aquellas preguntas cuya validez de constructo, claridad léxica y discriminación son transversales se mantienen como versión base universal (Qxx_BASE). Solo se generan variantes específicas (Qxx_3S, Qxx_4S, Qxx_5S) cuando existe justificación metodológica evidente.'),
    p('6. Comparabilidad longitudinal e invariancia de escala 38D: Todos los estudiantes, independientemente de la variante de pregunta que hayan resuelto, obtienen un vector estandarizado de 38 scores en escala 0–100. Esto habilita el seguimiento evolutivo del perfil a lo largo de los años escolares.'),
    p('7. Unicidad del Motor de Matching (MATCHING_V1): El algoritmo de recomendación vocacional, las 132 carreras del Gold Set y las ponderaciones por dimensión operan con idéntica lógica matemática para todos los grados.'),
    p('8. Registro de grado como metadato del intento: Cada intento de evaluación registra de forma inmutable el grade_level, habilitando analítica de cohortes, calibración de ítems y monitoreo de sesgos.'),
    p('9. Versionamiento formal de preguntas y variantes: Cada reactivo se codifica mediante la estructura normalizada: question_id, base_question_id, variant_id, grade_level, difficulty_level, dimension y question_type.')
  ].join('');

  await updateDocx('Preguntas-Diseño/Questionnaire_Design_V1.docx', designParas, 'Questionnaire_Design_V1.docx');

  // 2. Questionnaire_Blueprint_38xEvidencia_V1.docx -> Sección 10: Adaptación por etapa educativa (38 variables)
  const blueprintParas = [
    p('10. Adaptación por etapa educativa (3S, 4S, 5S)', true, true),
    p('A continuación se define la matriz conceptual de adaptación de evidencia para las 38 variables vocacionales del ADN según el nivel educativo:'),
    
    p('DIMENSIÓN 1: INTERESES (INT_R, INT_I, INT_A, INT_S, INT_E, INT_C)', true),
    p('• Evidencia base: Atracción intrínseca hacia tipos de actividades (construir, investigar, crear, ayudar, liderar, organizar) sin requerir conocimiento de carreras específicas.'),
    p('• Contexto 3S: Experiencias de aula, proyectos escolares personales, pasatiempos y vida cotidiana.'),
    p('• Contexto 4S: Ferias de ciencias, talleres interdisciplinarios, iniciativas escolares intermedias.'),
    p('• Contexto 5S: Proyectos de impacto en la comunidad, iniciativas con mayor trascendencia y exploración pre-profesional.'),
    p('• Dificultad potencial: Nula (mide interés afectivo/motivacional, no capacidad resolutiva).'),
    p('• Necesidad de adaptación: Baja. La mayoría de ítems (Q01, Q02, Q03, Q04, Q06) operan idénticamente en Qxx_BASE. En Q05 se adapta el contexto para ampliar el marco hacia la comunidad en 5S.'),

    p('DIMENSIÓN 2: PREFERENCIAS (PRE_PER, PRE_DAT, PRE_PRA, PRE_VAR, PRE_EST, PRE_CAM, PRE_TEC, PRE_EXP)', true),
    p('• Evidencia base: Estilo de trabajo y ergonomía del entorno (personas, datos, objetos tangibles, rutina vs cambio, herramientas digitales, experimentación).'),
    p('• Contexto 3S: Formas de aprender en el colegio, talleres de cómputo, manualidades y ritmo escolar.'),
    p('• Contexto 4S: Trabajos asignados con mayor margen de elección de métodos.'),
    p('• Contexto 5S: Ambientes de proyectos simulados, laboratorios, entornos autodirigidos.'),
    p('• Dificultad potencial: Nula.'),
    p('• Necesidad de adaptación: Media-baja. Los ítems operan en BASE, requiriendo aclaración de vocabulario en Q39 para 3S ("incertidumbre" explicitado como "sin saber con certeza qué pasará").'),

    p('DIMENSIÓN 3: PERSONALIDAD (PER_SOC, PER_INI, PER_PER, PER_ADA, PER_COL, PER_AUT, PER_LID, PER_EST)', true),
    p('• Evidencia base: Disposiciones conductuales ante situaciones de reto, presión de tiempo, desacuerdos, cambio de reglas y supervisión.'),
    p('• Contexto 3S: Situaciones de trabajo en equipo escolar guiado por profesores, grupos de amigos de aula.'),
    p('• Contexto 4S: Trabajos grupales con menor intervención del docente.'),
    p('• Contexto 5S: Preparación preuniversitaria/autodirigida, grupos con personas desconocidas (talleres intercolegiales), plazos formales estrictos.'),
    p('• Dificultad potencial: Media (evitar que la falta de autonomía atribuible a la edad se clasifique como déficit de iniciativa).'),
    p('• Necesidad de adaptación: Media. Adaptación contextual en Q13 (iniciativa), Q15 (socialización con desconocidos), Q17 y Q19 (autonomía sin supervisión) y Q21 (reacción ante presión de tiempo).'),

    p('DIMENSIÓN 4: VALORES (VAL_EST, VAL_ING, VAL_IMP, VAL_REC, VAL_CRE, VAL_APR, VAL_AUT, VAL_EQV)', true),
    p('• Evidencia base: Criterios éticos y prioridades axiológicas en dilemas de compensación, aprendizaje, reconocimiento, seguridad y libertad.'),
    p('• Contexto 3S: Elecciones extracurriculares y recompensas tangibles o reconocimiento entre pares escolares.'),
    p('• Contexto 4S: Balance entre metas personales y expectativas.'),
    p('• Contexto 5S: Toma de decisiones con proyección a la vida laboral, remuneración financiera, balance de vida y autonomía profesional.'),
    p('• Dificultad potencial: Media (madurez conceptual sobre el valor del dinero y contratos de trabajo).'),
    p('• Necesidad de adaptación: Media-baja. Se adapta Q23 para 3S (recompensas/ingresos concretos explicados de forma cercana) y Q26 (libertad de método vs desobediencia escolar).'),

    p('DIMENSIÓN 5: APTITUDES (APT_LOG, APT_NUM, APT_VER, APT_ANA, APT_ESP, APT_CRE, APT_SOC, APT_ORG)', true),
    p('• Evidencia base: Rendimiento objetivo ante secuencias lógicas, cómputos cuantitativos, inferencias verbales, rotación mental tridimensional, casos analíticos, escucha activa empática y planificación organizativa.'),
    p('• Contexto 3S: Problemas estructurados, números enteros accesibles, casos escolares directos, equipos pequeños de 4-6 alumnos.'),
    p('• Contexto 4S: Problemas semiestructurados con pasos intermedios.'),
    p('• Contexto 5S: Enunciados de mayor densidad inferencial, optimización de recursos y eventos de escala relevante (30 personas, múltiples restricciones).'),
    p('• Dificultad potencial: Alta. Riesgo de efecto techo en 5S en series lógicas/numéricas elementales (Q29, Q30) y riesgo de saturación cognitiva en 3S en problemas de gestión masiva (Q35).'),
    p('• Necesidad de adaptación: Alta. Control estricto de difficulty_level (1 a 3) en pilotaje. Q33 mantiene estímulo visual idéntico con recomendación de calibración; Q34 se preserva como experimental sin scoring; Q35 adapta la escala del equipo para 3S.')
  ].join('');

  await updateDocx('Preguntas-Diseño/Questionnaire_Blueprint_38xEvidencia_V1.docx', blueprintParas, 'Questionnaire_Blueprint_38xEvidencia_V1.docx');

  // 3. Score_Model_V1_Alex_IA.docx -> Sección 22: Metadatos de adaptación por grado y comparabilidad longitudinal
  const scoreModelParas = [
    p('22. Metadatos de adaptación por grado y comparabilidad longitudinal', true, true),
    p('Este apartado especifica cómo el Score Model V1 preserva su integridad matemática al interactuar con las variantes adaptadas por grado (3S, 4S, 5S):'),
    p('1. Invarianza del cálculo de scoring: La normalización de evidencia y la transformación a la escala 0–100 [Score(V) = 50 + 25 × E(V)] se ejecuta idénticamente para todos los estudiantes, sin importar el grado cursado ni la variante de pregunta resuelta. No existen fórmulas ni ponderaciones diferenciadas por grado.'),
    p('2. Esquema de metadatos por respuesta: Cada respuesta capturada almacena: question_id, base_question_id, variant_id, grade_level, difficulty_level, selected_option y response_time_ms.'),
    p('3. Modelo de persistencia para tracking longitudinal: Alex IA permite registrar la trayectoria vocacional del estudiante a lo largo de su etapa escolar bajo el esquema de entidad de intento: student_id, grade_level, questionnaire_version, questionnaire_attempt, profile_38d y matching_version.'),
    p('4. Indicadores psicométricos para el piloto de calibración: El sistema de telemetría recopilará por cada cohorte de grado: índice de dificultad clásico (p-value = proporción de aciertos), índice de discriminación biserial puntual (r_pbis), curvas características del ítem (ICC) y varianza de los 38 scores finales para verificar la ausencia de perfiles planos o efectos techo.')
  ].join('');

  await updateDocx('Preguntas-Diseño/Score_Model_V1_Alex_IA.docx', scoreModelParas, 'Score_Model_V1_Alex_IA.docx');

  // 4. Update extracted markdown files to keep them perfectly synchronised
  console.log('\nSincronizando archivos markdown en scripts/extracted_docs/...\n');
  
  // 4.1 Questionnaire_Design_V1.md
  let desMd = fs.readFileSync('scripts/extracted_docs/Questionnaire_Design_V1.md', 'utf-8');
  if (!desMd.includes('19\\. Adaptación por etapa educativa')) {
    desMd += `\n\n__19\\. Adaptación por etapa educativa__\n\nEste capítulo formaliza la metodología de adaptación del cuestionario según la etapa educativa del estudiante (3.º, 4.º y 5.º de secundaria), garantizando un único modelo vocacional normativo y comparable.\n\n1. __El grado escolar es la variable principal de adaptación:__ Se adopta grade_level (3S, 4S, 5S) como eje segmentador. La edad cronológica se descarta como variable primaria. Egresados se tratará posteriormente como cohorte independiente.\n2. __El constructo vocacional permanece estrictamente constante:__ Cada pregunta evalúa exactamente la misma variable canónica del ADN Vocacional (las 38 variables oficiales). No se crean variables fragmentadas por grado.\n3. __Variación de lenguaje y contexto situacional:__ En 3S los problemas se sitúan en dinámicas cotidianas del aula; en 5S en proyectos autónomos con fechas límite y actores externos.\n4. __Control y variación de dificultad en aptitudes cognitivas:__ En los mini-retos objetivos se modula la complejidad cognitiva (difficulty_level: 1, 2, 3) para evitar efectos techo en 5.º o efectos piso en 3.º.\n5. __Parsimonia psicométrica:__ Se utiliza Qxx_BASE universal para las preguntas de validez transversal. Solo se generan variantes específicas (Qxx_3S, Qxx_4S, Qxx_5S) bajo justificación metodológica.\n6. __Comparabilidad longitudinal e invariancia de escala 38D:__ Todos los estudiantes obtienen un vector estandarizado de 38 scores en escala 0–100.\n7. __Unicidad del Motor de Matching (MATCHING_V1):__ El algoritmo y las 132 carreras operan de manera idéntica e independiente del grado.\n8. __Registro de grado como metadato del intento:__ Cada intento registra grade_level para habilitar analítica de cohortes y calibración.\n9. __Versionamiento formal de preguntas y variantes:__ Codificación normalizada con question_id, base_question_id, variant_id, grade_level y difficulty_level.\n`;
    fs.writeFileSync('scripts/extracted_docs/Questionnaire_Design_V1.md', desMd, 'utf-8');
    console.log('✓ scripts/extracted_docs/Questionnaire_Design_V1.md actualizado.');
  }

  // 4.2 Questionnaire_Blueprint_38xEvidencia_V1.md
  let bpMd = fs.readFileSync('scripts/extracted_docs/Questionnaire_Blueprint_38xEvidencia_V1.md', 'utf-8');
  if (!bpMd.includes('10\\. Adaptación por etapa educativa')) {
    bpMd += `\n\n# 10\\. Adaptación por etapa educativa (3S, 4S, 5S)\n\nMatriz conceptual de adaptación de evidencia para las 38 variables vocacionales del ADN según el nivel educativo:\n\n__DIMENSIÓN 1: INTERESES (INT_R, INT_I, INT_A, INT_S, INT_E, INT_C)__\n- Evidencia base: Atracción intrínseca hacia tipos de actividades.\n- Contexto 3S: Experiencias de aula y pasatiempos.\n- Contexto 4S: Ferias de ciencias y proyectos grupales.\n- Contexto 5S: Proyectos de impacto en la comunidad y exploración pre-profesional.\n- Dificultad potencial: Nula.\n- Necesidad de adaptación: Baja (Q01, Q02, Q03, Q04, Q06 en BASE; Q05 contextualiza a comunidad en 5S).\n\n__DIMENSIÓN 2: PREFERENCIAS (PRE_PER, PRE_DAT, PRE_PRA, PRE_VAR, PRE_EST, PRE_CAM, PRE_TEC, PRE_EXP)__\n- Evidencia base: Estilo de trabajo y ergonomía del entorno.\n- Contexto 3S: Formas de aprender en el colegio y talleres guiados.\n- Contexto 4S: Trabajos escolares con mayor margen metodológico.\n- Contexto 5S: Ambientes de proyectos simulados y entornos autodirigidos.\n- Dificultad potencial: Nula.\n- Necesidad de adaptación: Media-baja (aclaración léxica de incertidumbre en Q39 para 3S).\n\n__DIMENSIÓN 3: PERSONALIDAD (PER_SOC, PER_INI, PER_PER, PER_ADA, PER_COL, PER_AUT, PER_LID, PER_EST)__\n- Evidencia base: Disposiciones conductuales ante situaciones de reto, presión de tiempo y supervisión.\n- Contexto 3S: Dinámicas de aula con supervisión docente activa.\n- Contexto 4S: Trabajos grupales con menor intervención del docente.\n- Contexto 5S: Preparación preuniversitaria/autodirigida, interacción con desconocidos y plazos estrictos.\n- Dificultad potencial: Media.\n- Necesidad de adaptación: Media (Q13, Q15, Q17, Q19, Q21 adaptan autonomía y supervisión).\n\n__DIMENSIÓN 4: VALORES (VAL_EST, VAL_ING, VAL_IMP, VAL_REC, VAL_CRE, VAL_APR, VAL_AUT, VAL_EQV)__\n- Evidencia base: Criterios éticos y prioridades axiológicas en dilemas de compensación y libertad.\n- Contexto 3S: Recompensas concretas y reconocimiento entre pares.\n- Contexto 4S: Balance entre metas personales y expectativas familiares.\n- Contexto 5S: Toma de decisiones con proyección laboral, ingresos financieros y autonomía profesional.\n- Dificultad potencial: Media.\n- Necesidad de adaptación: Media-baja (Q23 ingresos explicados de forma cercana para 3S; Q26 autonomía).\n\n__DIMENSIÓN 5: APTITUDES (APT_LOG, APT_NUM, APT_VER, APT_ANA, APT_ESP, APT_CRE, APT_SOC, APT_ORG)__\n- Evidencia base: Rendimiento objetivo ante secuencias lógicas, cálculos, inferencias verbales, rotación mental visoespacial, análisis de casos y organización.\n- Contexto 3S: Problemas estructurados, números enteros sencillos, grupos de 4-6 alumnos.\n- Contexto 4S: Problemas semiestructurados con pasos intermedios.\n- Contexto 5S: Mayor densidad inferencial, optimización de recursos y eventos de escala relevante.\n- Dificultad potencial: Alta (riesgo de efecto techo en 5S en Q29/Q30; desborde cognitivo en 3S en Q35).\n- Necesidad de adaptación: Alta (calibración de difficulty_level; Q33 visual preservada; Q34 experimental).\n`;
    fs.writeFileSync('scripts/extracted_docs/Questionnaire_Blueprint_38xEvidencia_V1.md', bpMd, 'utf-8');
    console.log('✓ scripts/extracted_docs/Questionnaire_Blueprint_38xEvidencia_V1.md actualizado.');
  }

  // 4.3 Score_Model_V1_Alex_IA.md
  let smMd = fs.readFileSync('scripts/extracted_docs/Score_Model_V1_Alex_IA.md', 'utf-8');
  if (!smMd.includes('22\\. Metadatos de adaptación por grado')) {
    smMd += `\n\n# 22\\. Metadatos de adaptación por grado y comparabilidad longitudinal\n\n1. __Invarianza del cálculo de scoring:__ La normalización de evidencia y la transformación a 0–100 [Score(V) = 50 + 25 × E(V)] se ejecuta idénticamente para 3S, 4S y 5S. No existen fórmulas ni ponderaciones diferenciadas por grado.\n2. __Esquema de metadatos por respuesta:__ question_id, base_question_id, variant_id, grade_level, difficulty_level, selected_option y response_time_ms.\n3. __Modelo de persistencia longitudinal:__ student_id, grade_level, questionnaire_version, questionnaire_attempt, profile_38d y matching_version.\n4. __Indicadores psicométricos para piloto:__ Dificultad clásica (p-value), discriminación biserial puntual (r_pbis), curvas características del ítem (ICC) y varianza de los 38 scores finales por cohorte.\n`;
    fs.writeFileSync('scripts/extracted_docs/Score_Model_V1_Alex_IA.md', smMd, 'utf-8');
    console.log('✓ scripts/extracted_docs/Score_Model_V1_Alex_IA.md actualizado.');
  }

  console.log('\n=== ACTUALIZACIÓN COMPLETADA CON ÉXITO ===');
}

main().catch(err => {
  console.error('Error durante la actualización:', err);
  process.exit(1);
});
