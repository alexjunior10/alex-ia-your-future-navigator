import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import pkg from 'xlsx';
const { readFile, utils, writeFile } = pkg;
import mammoth from 'mammoth';

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

async function updateDocxSection(filePath, searchMarker, newContentXml, label) {
  console.log(`Actualizando ${label}: ${filePath}...`);
  const zip = new AdmZip(filePath);
  let xml = zip.readAsText('word/document.xml');
  
  const markerIdx = xml.indexOf(searchMarker);
  const sectIdx = xml.lastIndexOf('<w:sectPr');

  let updatedXml = '';
  if (markerIdx !== -1) {
    // Reemplazar la sección anterior que empezaba en markerIdx hasta <w:sectPr
    // Buscamos el inicio del párrafo <w:p que contiene searchMarker
    const pStartIdx = xml.lastIndexOf('<w:p', markerIdx);
    updatedXml = xml.substring(0, pStartIdx) + newContentXml + xml.substring(sectIdx);
    console.log(`  ✓ Sección previa localizada en índice ${markerIdx}, reemplazada limpiamente.`);
  } else {
    // Si no existía, insertar antes de <w:sectPr
    updatedXml = xml.substring(0, sectIdx) + newContentXml + xml.substring(sectIdx);
    console.log(`  ✓ Nueva sección insertada antes de <w:sectPr.`);
  }

  zip.updateFile('word/document.xml', Buffer.from(updatedXml, 'utf-8'));
  zip.writeZip(filePath);

  const verifyRes = await mammoth.extractRawText({ path: filePath });
  console.log(`  ✓ ${label} verificado con Mammoth. Longitud de texto extraído: ${verifyRes.value.length}`);
}

async function main() {
  console.log('======================================================================');
  console.log('APLICANDO REFINAMIENTOS METODOLÓGICOS Y CONGELAMIENTO DOCUMENTAL');
  console.log('======================================================================\n');

  // 1. Questionnaire_Design_V1.docx -> Capítulo 19
  const designParas = [
    p('19. Adaptación por etapa educativa', true, true),
    p('Este capítulo formaliza la metodología de adaptación del cuestionario según la etapa educativa del estudiante (3.º, 4.º y 5.º de secundaria), garantizando la invariancia del constructo y un diseño para comparabilidad psicométrica.'),
    p('REGLA METODOLÓGICA FUNDAMENTAL:', true),
    p('"Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."'),
    p('1. El grado escolar es la variable principal de adaptación: Se adopta grade_level (3S, 4S, 5S) como eje segmentador, ya que refleja con mucha mayor fidelidad la madurez formativa, las dinámicas de aula y el horizonte de decisión vocacional que la edad cronológica. La condición de egresado se tratará posteriormente como cohorte independiente y no asimilada automáticamente a 5S.'),
    p('2. Invariancia del constructo: Cada pregunta evalúa estrictamente la misma variable canónica del ADN Vocacional (las 38 variables oficiales). No se fragmentan variables por grado (queda terminantemente prohibido crear constructos artificiales como APT_ORG_3S o VAL_EST_5S).'),
    p('3. Diseño para comparabilidad psicométrica y evaluación empírica en piloto: El cuestionario se diseña conceptual y operacionalmente para maximizar la comparabilidad entre 3S, 4S y 5S. Se deja formalmente explícito que la invariancia psicométrica estricta (métrica y escalar) entre los grados no se asume como un hecho demostrado a priori, sino que será evaluada y validada rigurosamente con los datos empíricos recopilados durante el piloto.'),
    p('4. Despliegue de V1 con las 40 preguntas actuales: La versión V1 utilizará exactamente las 40 preguntas actuales del banco en su versión base (incorporando las adaptaciones contextuales correspondientes a las 10 preguntas identificadas). No se crearán variantes adicionales de dificultad antes del piloto; las posibles variantes de dificultad (como Q29_5S o Q30_5S) quedan formalmente registradas únicamente como hipótesis técnicas para calibración posterior.'),
    p('5. Ámbitos de adaptación contextual: Las variantes por grado adecúan el vocabulario, las metáforas y el nivel de autonomía. En 3S los problemas se sitúan en dinámicas cotidianas del aula y tareas guiadas; en 5S se ubican en proyectos autónomos con fechas límite, restricciones de recursos e interacción con actores externos.'),
    p('6. Parsimonia psicométrica y proporción de adaptación: 28 preguntas (70%) operan en versión universal BASE (incluyendo Q34 experimental sin scoring), 10 preguntas (25%) incorporan adaptación contextual o léxica (Q05, Q13, Q15, Q17, Q19, Q21, Q23, Q26, Q35, Q39), y 2 preguntas de aptitud (5%) quedan bajo observación de calibración en piloto (Q29, Q30) junto con la calibración perceptual de Q33.'),
    p('7. Unicidad del Motor de Matching (MATCHING_V1): El algoritmo de recomendación vocacional, las 132 carreras del Gold Set y las ponderaciones por dimensión operan con idéntica lógica matemática para todos los grados.'),
    p('8. Registro de metadatos del intento: Cada evaluación registra de forma inmutable el grade_level, student_id, attempt_id y variant_id para habilitar analítica psicométrica de cohortes.'),
    p('9. Versionamiento formal: Estructura normalizada de reactivos con question_id, base_question_id, variant_id, grade_level, difficulty_level, dimension y question_type.')
  ].join('');

  await updateDocxSection(
    'Preguntas-Diseño/Questionnaire_Design_V1.docx',
    '19. Adaptación por etapa educativa',
    designParas,
    'Questionnaire_Design_V1.docx'
  );

  // 2. Questionnaire_Blueprint_38xEvidencia_V1.docx -> Sección 10
  const blueprintParas = [
    p('10. Adaptación por etapa educativa (3S, 4S, 5S)', true, true),
    p('Regla rectora de adaptación por etapa educativa:'),
    p('"Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."'),
    p('Principio de diseño: Se busca la invariancia del constructo y el diseño para comparabilidad psicométrica, dejando explícito que la invariancia psicométrica empírica entre 3S, 4S y 5S será evaluada y contrastada posteriormente con los datos del piloto.'),
    p('Confirmación V1: El cuestionario V1 mantendrá exactamente las 40 preguntas actuales. No se crearán variantes adicionales de dificultad antes del piloto; las hipótesis sobre discriminación en Q29_5S y Q30_5S se evaluarán con la telemetría del piloto.'),
    
    p('DIMENSIÓN 1: INTERESES (INT_R, INT_I, INT_A, INT_S, INT_E, INT_C)', true),
    p('• Evidencia base: Atracción intrínseca hacia tipos de actividades sin requerir conocimiento de carreras específicas.'),
    p('• Contexto 3S: Experiencias de aula, pasatiempos y vida escolar cotidiana.'),
    p('• Contexto 4S: Ferias de ciencias, talleres interdisciplinarios e iniciativas grupales intermedias.'),
    p('• Contexto 5S: Proyectos de impacto en la comunidad y exploración pre-profesional.'),
    p('• Dificultad potencial: Nula (preferencia intrínseca).'),
    p('• Necesidad de adaptación: Baja. Q01, Q02, Q03, Q04 y Q06 se mantienen idénticas en versión BASE. Q05 adapta el contexto ampliando el alcance hacia la comunidad en 5S.'),

    p('DIMENSIÓN 2: PREFERENCIAS (PRE_PER, PRE_DAT, PRE_PRA, PRE_VAR, PRE_EST, PRE_CAM, PRE_TEC, PRE_EXP)', true),
    p('• Evidencia base: Estilo de trabajo y ergonomía del entorno (personas, datos, objetos tangibles, rutina vs cambio, tecnología).'),
    p('• Contexto 3S: Dinámicas de aprendizaje escolar y talleres prácticos guiados.'),
    p('• Contexto 4S: Trabajos escolares con mayor margen de decisión metodológica.'),
    p('• Contexto 5S: Ambientes de proyectos simulados y entornos autodirigidos.'),
    p('• Dificultad potencial: Nula.'),
    p('• Necesidad de adaptación: Media-baja. Q07, Q08, Q09, Q10, Q11 y Q12 en BASE. Q39 adapta el vocabulario léxico para 3S clarificando el término "incertidumbre".'),

    p('DIMENSIÓN 3: PERSONALIDAD (PER_SOC, PER_INI, PER_PER, PER_ADA, PER_COL, PER_AUT, PER_LID, PER_EST)', true),
    p('• Evidencia base: Disposiciones conductuales ante situaciones de reto, presión de tiempo, desacuerdos, cambio de reglas y supervisión.'),
    p('• Contexto 3S: Dinámicas de aula bajo supervisión docente activa.'),
    p('• Contexto 4S: Trabajos grupales con menor intervención del docente.'),
    p('• Contexto 5S: Preparación preuniversitaria/autodirigida, interacción con pares desconocidos en talleres intercolegiales y plazos estrictos.'),
    p('• Dificultad potencial: Media (evitar que la menor autonomía propia de la edad escolar temprana se confunda con déficit de iniciativa).'),
    p('• Necesidad de adaptación: Media. Adaptación contextual en 5 ítems: Q13 (iniciativa), Q15 (socialización con desconocidos), Q17 y Q19 (autonomía sin supervisión) y Q21 (estabilidad ante presión de tiempo). Q14, Q16, Q18, Q20 y Q22 operan en BASE.'),

    p('DIMENSIÓN 4: VALORES (VAL_EST, VAL_ING, VAL_IMP, VAL_REC, VAL_CRE, VAL_APR, VAL_AUT, VAL_EQV)', true),
    p('• Evidencia base: Criterios éticos y prioridades axiológicas en dilemas de compensación, aprendizaje, reconocimiento, seguridad y libertad.'),
    p('• Contexto 3S: Elecciones extracurriculares y recompensas tangibles o reconocimiento entre pares.'),
    p('• Contexto 4S: Balance entre metas personales y expectativas familiares.'),
    p('• Contexto 5S: Toma de decisiones con proyección a la vida laboral, remuneración financiera, balance de vida y autonomía profesional.'),
    p('• Dificultad potencial: Media (madurez conceptual sobre el valor del dinero y contratos laborales).'),
    p('• Necesidad de adaptación: Media-baja. Se adapta Q23 para 3S (recompensas/ganancias concretas explicadas de forma cercana) y Q26 para 5S (libertad metodológica vs desobediencia escolar). Q24, Q25, Q27 y Q28 operan en BASE.'),

    p('DIMENSIÓN 5: APTITUDES (APT_LOG, APT_NUM, APT_VER, APT_ANA, APT_ESP, APT_CRE, APT_SOC, APT_ORG)', true),
    p('• Evidencia base: Rendimiento objetivo ante secuencias lógicas, cálculos, inferencias verbales, rotación mental tridimensional, análisis de casos y organización.'),
    p('• Contexto 3S: Problemas estructurados, números enteros accesibles, casos escolares directos, equipos de 4-6 alumnos.'),
    p('• Contexto 4S: Problemas semiestructurados con pasos intermedios.'),
    p('• Contexto 5S: Mayor densidad inferencial, optimización de recursos y eventos de escala relevante (30 personas).'),
    p('• Dificultad potencial: Alta. Se confirma que V1 mantiene las preguntas actuales (Q29 y Q30 con difficulty_level: 1). Las variantes de mayor dificultad para 5S (Q29_5S, Q30_5S) quedan estrictamente como hipótesis para calibración posterior en piloto.'),
    p('• Estado de ítems: Q31, Q32 y Q36 operan idénticos en BASE; Q33 mantiene su recurso visual vectorial del cubo; Q34 permanece como experimental sin puntuación; Q35 adapta el contexto de escala organizativa para 3S (equipo de 6 alumnos en feria).')
  ].join('');

  await updateDocxSection(
    'Preguntas-Diseño/Questionnaire_Blueprint_38xEvidencia_V1.docx',
    '10. Adaptación por etapa educativa',
    blueprintParas,
    'Questionnaire_Blueprint_38xEvidencia_V1.docx'
  );

  // 3. Score_Model_V1_Alex_IA.docx -> Sección 22
  const scoreModelParas = [
    p('22. Metadatos de adaptación por grado y comparabilidad longitudinal', true, true),
    p('Este apartado especifica cómo el Score Model V1 preserva su integridad matemática al interactuar con las variantes adaptadas por grado (3S, 4S, 5S):'),
    p('REGLA FUNDAMENTAL DE INVARIANZA DE SCORING:', true),
    p('"Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."'),
    p('1. Invarianza del cálculo de scoring: La normalización de evidencia y la transformación a la escala 0–100 [Score(V) = 50 + 25 × E(V)] se ejecuta idénticamente para todos los estudiantes, sin importar el grado cursado ni la variante de pregunta resuelta. No existen fórmulas ni ponderaciones diferenciadas por grado.'),
    p('2. Invariancia del constructo y diseño para comparabilidad: El modelo asume invariancia conceptual del constructo. La invariancia psicométrica empírica (métrica y escalar) entre 3S, 4S y 5S será evaluada formalmente con los datos del piloto mediante análisis factorial confirmatorio multigrupo (MGCFA) y análisis de funcionamiento diferencial de los ítems (DIF).'),
    p('3. Confirmación de V1 sin variantes prematuras de dificultad: El cuestionario V1 se ejecuta con las 40 preguntas actuales del banco. Las posibles variantes de dificultad para 5S (como Q29_5S o Q30_5S) quedan reservadas exclusivamente como hipótesis de calibración posterior.'),
    p('4. Esquema de metadatos por respuesta: Cada respuesta capturada almacena: question_id, base_question_id, variant_id, grade_level, difficulty_level, selected_option y response_time_ms.'),
    p('5. Modelo de persistencia para tracking longitudinal: Alex IA registra la trayectoria vocacional del estudiante a lo largo de su etapa escolar bajo la entidad de intento: student_id, grade_level, questionnaire_version, questionnaire_attempt, profile_38d y matching_version.'),
    p('6. Indicadores psicométricos para el piloto: La telemetría recopilará por cada grado: índice de dificultad clásico (p-value), índice de discriminación biserial puntual (r_pbis), curvas características del ítem (ICC) y varianza de los 38 scores finales para verificar la ausencia de perfiles planos o efectos techo.')
  ].join('');

  await updateDocxSection(
    'Preguntas-Diseño/Score_Model_V1_Alex_IA.docx',
    '22. Metadatos de adaptación por grado',
    scoreModelParas,
    'Score_Model_V1_Alex_IA.docx'
  );

  // 4. Actualizar Question_Option_Variable_Matrix_V1_1.xlsx
  console.log('\nActualizando metadatos y gobernanza en Question_Option_Variable_Matrix_V1_1.xlsx...');
  const wb = readFile('Preguntas-Diseño/Question_Option_Variable_Matrix_V1_1.xlsx');
  
  // README update
  const readme = utils.sheet_to_json(wb.Sheets['README']);
  readme.push(
    {
      item: 'REGLA RECTORA DE VARIANTES POR GRADO',
      definition: 'Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables.'
    },
    {
      item: 'INVARIANCIA Y COMPARABILIDAD',
      definition: 'Invariancia del constructo y diseño para comparabilidad psicométrica; la invariancia psicométrica empírica entre 3S/4S/5S será evaluada posteriormente con datos del piloto.'
    },
    {
      item: 'CONFIRMACIÓN V1 DE 40 PREGUNTAS',
      definition: 'V1 desplegará las 40 preguntas actuales. No se crearán variantes adicionales de dificultad antes del piloto. Q29_5S y Q30_5S permanecen únicamente como hipótesis para calibración posterior.'
    }
  );
  wb.Sheets['README'] = utils.json_to_sheet(readme);

  // Scoring_Config update
  const scoringConfig = utils.sheet_to_json(wb.Sheets['Scoring_Config']);
  scoringConfig.push(
    {
      parameter: 'GRADE_RULE',
      value: 'Modifican contexto/autonomía/dificultad, jamás constructo ni evidencia',
      note: 'Regla metodológica obligatoria'
    },
    {
      parameter: 'PSYCHOMETRIC_INVARIANCE_STATUS',
      value: 'DESIGNED_FOR_COMPARABILITY_PILOT_VALIDATION_PENDING',
      note: 'Invariancia psicométrica empírica sujeta a evaluación con datos del piloto'
    },
    {
      parameter: 'V1_ITEMS_CONFIRMATION',
      value: '40_ITEMS_CURRENT_NO_PREMATURE_VARIANTS',
      note: 'V1 despliega las 40 preguntas actuales sin variantes de dificultad adicionales previas al piloto'
    }
  );
  wb.Sheets['Scoring_Config'] = utils.json_to_sheet(scoringConfig);

  writeFile(wb, 'Preguntas-Diseño/Question_Option_Variable_Matrix_V1_1.xlsx');
  console.log('✓ Question_Option_Variable_Matrix_V1_1.xlsx actualizado.');

  // 5. Sincronizar extracted_docs markdown
  console.log('\nSincronizando archivos markdown en scripts/extracted_docs/...\n');
  
  // 5.1 Questionnaire_Design_V1.md
  let desMd = fs.readFileSync('scripts/extracted_docs/Questionnaire_Design_V1.md', 'utf-8');
  const desMarker = '__19\\. Adaptación por etapa educativa__';
  const desIdx = desMd.indexOf(desMarker);
  const desNewText = `__19\\. Adaptación por etapa educativa__\n\nEste capítulo formaliza la metodología de adaptación del cuestionario según la etapa educativa del estudiante (3.º, 4.º y 5.º de secundaria), garantizando la invariancia del constructo y un diseño para comparabilidad psicométrica.\n\n__REGLA METODOLÓGICA FUNDAMENTAL:__\n> "Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."\n\n1. __El grado escolar es la variable principal de adaptación:__ Se adopta grade_level (3S, 4S, 5S) como eje segmentador. La edad cronológica se descarta como variable primaria. Egresados se tratará posteriormente como cohorte independiente.\n2. __Invariancia del constructo:__ Cada pregunta evalúa rigurosamente la misma variable canónica del ADN Vocacional (las 38 variables oficiales). No se crean variables fragmentadas por grado.\n3. __Diseño para comparabilidad psicométrica y evaluación en piloto:__ El cuestionario se diseña conceptual y operacionalmente para maximizar la comparabilidad. La invariancia psicométrica empírica entre 3S, 4S y 5S será evaluada y contrastada posteriormente con los datos del piloto.\n4. __Confirmación de V1 con las 40 preguntas actuales:__ V1 utilizará exactamente las 40 preguntas actuales del banco. No se crearán variantes adicionales de dificultad antes del piloto; las posibles variantes Q29_5S o Q30_5S quedan formalmente registradas únicamente como hipótesis técnicas para calibración posterior.\n5. __Ámbitos de adaptación contextual:__ En 3S los problemas se sitúan en dinámicas cotidianas del aula y tareas guiadas; en 5S en proyectos autónomos con fechas límite, restricciones de recursos e interacción comunitaria.\n6. __Parsimonia psicométrica y proporción de adaptación:__ 28 preguntas (70%) operan en versión BASE universal (incluyendo Q34 experimental sin scoring), 10 preguntas (25%) incorporan adaptación contextual o léxica (Q05, Q13, Q15, Q17, Q19, Q21, Q23, Q26, Q35, Q39), y 2 preguntas de aptitud (5%) quedan bajo observación de calibración en piloto (Q29, Q30) junto con la calibración perceptual de Q33.\n7. __Unicidad del Motor de Matching (MATCHING_V1):__ El algoritmo y las 132 carreras operan de manera idéntica e independiente del grado.\n8. __Registro de metadatos del intento:__ Cada intento registra grade_level, student_id, attempt_id y variant_id para analítica psicométrica.\n9. __Versionamiento formal:__ Codificación normalizada con question_id, base_question_id, variant_id, grade_level y difficulty_level.\n`;
  
  if (desIdx !== -1) {
    desMd = desMd.substring(0, desIdx) + desNewText;
  } else {
    desMd += '\n\n' + desNewText;
  }
  fs.writeFileSync('scripts/extracted_docs/Questionnaire_Design_V1.md', desMd, 'utf-8');
  console.log('✓ scripts/extracted_docs/Questionnaire_Design_V1.md sincronizado.');

  // 5.2 Questionnaire_Blueprint_38xEvidencia_V1.md
  let bpMd = fs.readFileSync('scripts/extracted_docs/Questionnaire_Blueprint_38xEvidencia_V1.md', 'utf-8');
  const bpMarker = '# 10\\. Adaptación por etapa educativa';
  const bpIdx = bpMd.indexOf(bpMarker);
  const bpNewText = `# 10\\. Adaptación por etapa educativa (3S, 4S, 5S)\n\n__REGLA METODOLÓGICA FUNDAMENTAL:__\n> "Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."\n\n__Invariancia y comparabilidad:__ Se establece la invariancia del constructo y el diseño para comparabilidad psicométrica, dejando explícito que la invariancia psicométrica empírica entre 3S, 4S y 5S será evaluada posteriormente con datos del piloto.\n\n__Confirmación V1:__ V1 utilizará las 40 preguntas actuales. No se crearán variantes adicionales de dificultad antes del piloto. Las hipótesis de discriminación en Q29_5S y Q30_5S quedan para calibración posterior.\n\n__DIMENSIÓN 1: INTERESES (INT_R, INT_I, INT_A, INT_S, INT_E, INT_C)__\n- Evidencia base: Atracción intrínseca hacia actividades sin requerir conocimiento de carreras.\n- Contexto 3S: Aula y pasatiempos.\n- Contexto 4S: Ferias de ciencias y proyectos grupales.\n- Contexto 5S: Proyectos comunitarios y exploración pre-profesional.\n- Dificultad potencial: Nula.\n- Necesidad de adaptación: Baja (Q01, Q02, Q03, Q04, Q06 en BASE; Q05 contextualiza a comunidad en 5S).\n\n__DIMENSIÓN 2: PREFERENCIAS (PRE_PER, PRE_DAT, PRE_PRA, PRE_VAR, PRE_EST, PRE_CAM, PRE_TEC, PRE_EXP)__\n- Evidencia base: Estilo de trabajo y ergonomía del entorno.\n- Contexto 3S: Aula y talleres guiados.\n- Contexto 4S: Proyectos con margen metodológico.\n- Contexto 5S: Ambientes simulados y entornos autodirigidos.\n- Dificultad potencial: Nula.\n- Necesidad de adaptación: Media-baja (Q39 clarifica léxicamente incertidumbre en 3S).\n\n__DIMENSIÓN 3: PERSONALIDAD (PER_SOC, PER_INI, PER_PER, PER_ADA, PER_COL, PER_AUT, PER_LID, PER_EST)__\n- Evidencia base: Disposiciones conductuales ante situaciones de reto, presión de tiempo y supervisión.\n- Contexto 3S: Dinámicas guiadas por docentes.\n- Contexto 4S: Grupos con menor intervención docente.\n- Contexto 5S: Preparación preuniversitaria, pares desconocidos y plazos estrictos.\n- Dificultad potencial: Media.\n- Necesidad de adaptación: Media (10 preguntas en total en cuestionario; en personalidad Q13, Q15, Q17, Q19, Q21 adaptan autonomía y supervisión).\n\n__DIMENSIÓN 4: VALORES (VAL_EST, VAL_ING, VAL_IMP, VAL_REC, VAL_CRE, VAL_APR, VAL_AUT, VAL_EQV)__\n- Evidencia base: Criterios éticos y prioridades axiológicas en dilemas de compensación y libertad.\n- Contexto 3S: Recompensas tangibles y reconocimiento entre pares.\n- Contexto 4S: Balance entre metas y expectativas.\n- Contexto 5S: Proyección laboral, ingresos financieros y autonomía profesional.\n- Dificultad potencial: Media.\n- Necesidad de adaptación: Media-baja (Q23 ganancias/recompensas concretas para 3S; Q26 autonomía metodológica para 5S).\n\n__DIMENSIÓN 5: APTITUDES (APT_LOG, APT_NUM, APT_VER, APT_ANA, APT_ESP, APT_CRE, APT_SOC, APT_ORG)__\n- Evidencia base: Rendimiento objetivo ante secuencias lógicas, cálculos, inferencias verbales, rotación mental visoespacial, análisis de casos y organización.\n- Contexto 3S: Problemas estructurados, números enteros sencillos, grupos de 4-6 alumnos.\n- Contexto 4S: Problemas semiestructurados con pasos intermedios.\n- Contexto 5S: Mayor densidad inferencial, optimización de recursos y eventos de escala relevante.\n- Dificultad potencial: Alta. Se confirma que V1 mantiene las preguntas actuales (Q29 y Q30 con difficulty_level: 1). Las variantes Q29_5S y Q30_5S quedan estrictamente como hipótesis para calibración en piloto.\n- Estado de ítems: Q31, Q32 y Q36 en BASE; Q33 mantiene su recurso visual; Q34 experimental sin scoring; Q35 adapta contexto de escala para 3S.\n`;

  if (bpIdx !== -1) {
    bpMd = bpMd.substring(0, bpIdx) + bpNewText;
  } else {
    bpMd += '\n\n' + bpNewText;
  }
  fs.writeFileSync('scripts/extracted_docs/Questionnaire_Blueprint_38xEvidencia_V1.md', bpMd, 'utf-8');
  console.log('✓ scripts/extracted_docs/Questionnaire_Blueprint_38xEvidencia_V1.md sincronizado.');

  // 5.3 Score_Model_V1_Alex_IA.md
  let smMd = fs.readFileSync('scripts/extracted_docs/Score_Model_V1_Alex_IA.md', 'utf-8');
  const smMarker = '# 22\\. Metadatos de adaptación por grado';
  const smIdx = smMd.indexOf(smMarker);
  const smNewText = `# 22\\. Metadatos de adaptación por grado y comparabilidad longitudinal\n\n__REGLA METODOLÓGICA FUNDAMENTAL:__\n> "Las variantes por grado pueden modificar contexto, vocabulario, autonomía, escala situacional o dificultad, pero nunca el constructo evaluado, el significado de la evidencia ni su mapeo a las 38 variables."\n\n1. __Invarianza del cálculo de scoring:__ La normalización de evidencia y la transformación a 0–100 [Score(V) = 50 + 25 × E(V)] se ejecuta idénticamente para 3S, 4S y 5S. No existen fórmulas ni ponderaciones diferenciadas por grado.\n2. __Invariancia del constructo y diseño para comparabilidad:__ El modelo se fundamenta en la invariancia del constructo y el diseño para comparabilidad psicométrica. Se deja explícito que la invariancia psicométrica empírica entre 3S, 4S y 5S será evaluada posteriormente con los datos del piloto.\n3. __Confirmación de V1 sin variantes prematuras:__ V1 se ejecutará con las 40 preguntas actuales del banco. Las posibles variantes de dificultad (como Q29_5S o Q30_5S) quedan reservadas exclusivamente como hipótesis para calibración posterior.\n4. __Esquema de metadatos por respuesta:__ question_id, base_question_id, variant_id, grade_level, difficulty_level, selected_option y response_time_ms.\n5. __Modelo de persistencia longitudinal:__ student_id, grade_level, questionnaire_version, questionnaire_attempt, profile_38d y matching_version.\n6. __Indicadores psicométricos para piloto:__ Dificultad clásica (p-value), discriminación biserial puntual (r_pbis), curvas características del ítem (ICC) y varianza de los 38 scores finales por cohorte.\n`;

  if (smIdx !== -1) {
    smMd = smMd.substring(0, smIdx) + smNewText;
  } else {
    smMd += '\n\n' + smNewText;
  }
  fs.writeFileSync('scripts/extracted_docs/Score_Model_V1_Alex_IA.md', smMd, 'utf-8');
  console.log('✓ scripts/extracted_docs/Score_Model_V1_Alex_IA.md sincronizado.');

  console.log('\n======================================================================');
  console.log('✅ REFINAMIENTOS APLICADOS Y DOCUMENTACIÓN FORMALMENTE CONGELADA');
  console.log('======================================================================\n');
}

main().catch(err => {
  console.error('Error durante la aplicación de refinamientos:', err);
  process.exit(1);
});
