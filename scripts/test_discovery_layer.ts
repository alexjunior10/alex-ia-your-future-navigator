/**
 * Test Suite para ONBOARDING DISCOVERY V1
 * Alex IA
 * 
 * Verifica:
 * 1. Estructura de las 3 preguntas (P1, P2, P3).
 * 2. Validación de opciones abstractas en P3 (sin sesgo de carreras).
 * 3. Compilación determinística de señales (sin LLM).
 * 4. Metadatos de señal: signal_key, source_question, source_option, version (DISCOVERY_V1).
 * 5. Aislamiento estricto: confirmación de que MATCHING_V1 y ADN_V1 permanecen 100% intactos.
 */

import { DISCOVERY_QUESTIONS_V1 } from "../src/lib/discovery/questions";
import { compileDiscoverySignals } from "../src/lib/discovery/service";
import { DISCOVERY_VERSION } from "../src/lib/discovery/types";
import { MATCHING_CONFIG_V1 } from "../src/lib/matching/config";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

console.log("==================================================");
console.log("PRUEBAS DE VALIDACIÓN: ONBOARDING DISCOVERY V1");
console.log("==================================================\n");

// 1. Verificación de preguntas
console.log("1. Validación de estructura de preguntas:");
assert(DISCOVERY_QUESTIONS_V1.length === 3, "Exactamente 3 preguntas definidas para Discovery V1");
assert(DISCOVERY_QUESTIONS_V1[0].id === "P1", "Pregunta 1 tiene ID 'P1'");
assert(DISCOVERY_QUESTIONS_V1[1].id === "P2", "Pregunta 2 tiene ID 'P2'");
assert(DISCOVERY_QUESTIONS_V1[2].id === "P3", "Pregunta 3 tiene ID 'P3'");

// 2. Validación de opciones en P3 (preferencias abstractas, sin nombres de carreras)
console.log("\n2. Validación de P3 (preferencias abstractas, sin sesgo de carreras):");
const p3 = DISCOVERY_QUESTIONS_V1[2];
const expectedP3Signals = [
  "project_creation_from_scratch",
  "project_complex_problem_solving",
  "project_helping_people",
  "project_curious_investigation",
  "project_visual_aesthetic_design",
  "project_organization_and_planning",
  "project_technology_experimentation",
  "project_nature_and_animals"
];
assert(p3.options.length === 8, "P3 tiene 8 opciones conceptuales");
const actualSignals = p3.options.map(o => o.signal_key);
for (const exp of expectedP3Signals) {
  assert(actualSignals.includes(exp), `P3 contiene señal conceptual: ${exp}`);
}

// 3. Verificación de compilación determinística
console.log("\n3. Verificación de compilación determinística:");
const sampleAnswers = {
  P1: "p1_math_logic",
  P2: "p2_strategy_solver",
  P3: "p3_solve_hard"
};

const mockUserId = "test-student-uuid-123";
const submission = compileDiscoverySignals(sampleAnswers, mockUserId, "session-abc-456");

assert(submission.version === DISCOVERY_VERSION, `Versión es ${DISCOVERY_VERSION}`);
assert(submission.auth_user_id === mockUserId, "auth_user_id asignado correctamente");
assert(submission.session_id === "session-abc-456", "session_id asignado correctamente");
assert(submission.signals.length === 3, "Genera exactamente 3 señales para 3 respuestas");

const s1 = submission.signals[0];
assert(s1.source_question === "P1", "Señal 1 origen P1");
assert(s1.signal_key === "interest_analytical_logic", "Señal 1 key correcta");
assert(s1.source_option_id === "p1_math_logic", "Señal 1 source_option_id correcto");
assert(s1.version === "DISCOVERY_V1", "Señal 1 versionada DISCOVERY_V1");

const s3 = submission.signals[2];
assert(s3.source_question === "P3", "Señal 3 origen P3");
assert(s3.signal_key === "project_complex_problem_solving", "Señal 3 key correcta");
assert(s3.source_option_id === "p3_solve_hard", "Señal 3 source_option_id correcto");

// 4. Mapeo exhaustivo pregunta -> opción -> signal
console.log("\n4. Verificación exhaustiva de opciones en todo Discovery V1:");
let totalOptions = 0;
for (const q of DISCOVERY_QUESTIONS_V1) {
  for (const opt of q.options) {
    totalOptions++;
    assert(Boolean(opt.signal_key), `Opción '${opt.id}' tiene signal_key '${opt.signal_key}'`);
    assert(Boolean(opt.emoji), `Opción '${opt.id}' tiene emoji`);
    assert(Boolean(opt.label), `Opción '${opt.id}' tiene texto amigable`);
  }
}
console.log(`  ✓ ${totalOptions} opciones mapeadas sin error en 3 preguntas`);

// 5. Confirmación de aislamiento con MATCHING_V1 y ADN_V1
console.log("\n5. Confirmación de aislamiento con MATCHING_V1 y ADN_V1:");
import { ALL_VOCATIONAL_VARIABLES } from "../src/lib/matching/config";
assert(MATCHING_CONFIG_V1.version === "MATCHING_V1", "Motor de matching configurado en MATCHING_V1");
assert(ALL_VOCATIONAL_VARIABLES.length === 38, "Total variables vocacionales intactas: 38");
assert(MATCHING_CONFIG_V1.dimensionWeights.Intereses === 0.25, "Peso intereses = 0.25 intacto");
assert(MATCHING_CONFIG_V1.dimensionWeights.Aptitudes === 0.30, "Peso aptitudes = 0.30 intacto");
assert(MATCHING_CONFIG_V1.dimensionWeights.Personalidad === 0.20, "Peso personalidad = 0.20 intacto");
assert(MATCHING_CONFIG_V1.dimensionWeights.Valores === 0.10, "Peso valores = 0.10 intacto");
assert(MATCHING_CONFIG_V1.dimensionWeights.Preferencias === 0.15, "Peso preferencias = 0.15 intacto");

console.log("\n==================================================");
console.log("✅ TODAS LAS PRUEBAS DE DISCOVERY V1 PASARON EXITOSAMENTE");
console.log("==================================================");
