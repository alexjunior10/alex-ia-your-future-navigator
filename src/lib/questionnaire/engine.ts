import { getOptionMappings } from './matrix.ts';
import { VocationalMatchingService } from '../matching/service.ts';
import { MATCHING_CONFIG_V1 } from '../matching/config.ts';
import type {
  GradeLevel,
  QuestionnaireAttempt,
  QuestionnaireScoringResult,
  QuestionResponseItem,
  StudentProfile,
  VariableCode
} from './types.ts';

/** Catálogo oficial de las 38 variables vocacionales */
export const ALL_VOCATIONAL_VARIABLES: readonly VariableCode[] = [
  // Intereses (6)
  'INT_R', 'INT_I', 'INT_A', 'INT_S', 'INT_E', 'INT_C',
  // Aptitudes (8)
  'APT_LOG', 'APT_NUM', 'APT_VER', 'APT_ANA', 'APT_ESP', 'APT_CRE', 'APT_SOC', 'APT_ORG',
  // Personalidad (8)
  'PER_SOC', 'PER_INI', 'PER_PER', 'PER_ADA', 'PER_COL', 'PER_AUT', 'PER_LID', 'PER_EST',
  // Valores (8)
  'VAL_EST', 'VAL_ING', 'VAL_IMP', 'VAL_REC', 'VAL_CRE', 'VAL_APR', 'VAL_AUT', 'VAL_EQV',
  // Preferencias (8)
  'PRE_PER', 'PRE_DAT', 'PRE_PRA', 'PRE_VAR', 'PRE_EST', 'PRE_CAM', 'PRE_TEC', 'PRE_EXP',
] as const;

/**
 * EVIDENCE ENGINE & SCORE MODEL V1 (ALEX IA)
 * 
 * Implementa la especificación congelada de scoring:
 * - Escala de evidencia: -2, -1, 0, +1, +2
 * - Pesos por formato: Mini-reto = 1.25, Mini-caso = 1.10, Escenario = 1.00, Trade-off = 0.90, Consistencia = 0.75, Q34 = 0
 * - E(V) = Σ(evidence_i × weight_i) / Σ(weight_i)
 * - Score(V) = round(50 + 25 × E(V)), acotado a [0, 100]
 * - Prior neutro = 50 para variables sin evidencia directa
 * - Q34 es experimental (weight = 0, evidence = 0, no altera APT_CRE)
 * - Perfil resultante contiene exactamente las 38 variables canónicas.
 */
export class QuestionnaireEngine {
  /**
   * Valida estrictamente el perfil del estudiante:
   * exactamente 38 variables, numéricas, en rango [0, 100].
   */
  public static validateStudentProfile(profile: unknown): asserts profile is StudentProfile {
    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
      throw new Error('El perfil del estudiante debe ser un objeto con las 38 variables.');
    }
    const rawObj = profile as Record<string, unknown>;
    const keys = Object.keys(rawObj);

    if (keys.length !== ALL_VOCATIONAL_VARIABLES.length) {
      throw new Error(
        `El perfil debe contener exactamente ${ALL_VOCATIONAL_VARIABLES.length} variables. Se recibieron ${keys.length}.`
      );
    }

    const validSet = new Set<string>(ALL_VOCATIONAL_VARIABLES);
    for (const k of keys) {
      if (!validSet.has(k)) {
        throw new Error(`Variable no reconocida en el perfil: '${k}'`);
      }
      const val = rawObj[k];
      if (typeof val !== 'number' || isNaN(val)) {
        throw new Error(`El score para la variable '${k}' debe ser un número válido.`);
      }
      if (val < 0 || val > 100) {
        throw new Error(`El score para la variable '${k}' (${val}) debe estar en el rango [0, 100].`);
      }
    }
  }

  /**
   * Calcula el perfil vocacional de 38 variables a partir de las respuestas del cuestionario.
   */
  public static calculateProfile38D(responses: QuestionResponseItem[]): {
    profile_38d: StudentProfile;
    coverage: Record<
      string,
      { count: number; status: 'INSUFICIENTE' | 'PARCIAL' | 'SUFICIENTE' | 'ROBUSTA' }
    >;
  } {
    // Acumuladores por variable
    const sumWeightedEvidence: Record<string, number> = {};
    const sumWeights: Record<string, number> = {};
    const evidenceCount: Record<string, number> = {};

    for (const v of ALL_VOCATIONAL_VARIABLES) {
      sumWeightedEvidence[v] = 0;
      sumWeights[v] = 0;
      evidenceCount[v] = 0;
    }

    // Procesar cada respuesta del estudiante
    for (const resp of responses) {
      const mappings = getOptionMappings(resp.base_question_id, resp.selected_option);

      for (const m of mappings) {
        // Ignorar mappings sin variable (como Q34 o distractores neutros sin variable)
        if (!m.variable) continue;

        const v = m.variable;
        const e = m.evidence;
        const w = m.question_weight;

        if (v in sumWeightedEvidence) {
          sumWeightedEvidence[v] += e * w;
          sumWeights[v] += w;
          evidenceCount[v] += 1;
        }
      }
    }

    // Calcular Score(V) = 50 + 25 × E(V)
    const rawProfile: Record<string, number> = {};
    const coverage: Record<
      string,
      { count: number; status: 'INSUFICIENTE' | 'PARCIAL' | 'SUFICIENTE' | 'ROBUSTA' }
    > = {};

    for (const v of ALL_VOCATIONAL_VARIABLES) {
      const wTotal = sumWeights[v];
      const count = evidenceCount[v];

      let score: number;
      if (wTotal > 0) {
        const E_V = sumWeightedEvidence[v] / wTotal;
        score = Math.round(50 + 25 * E_V);
        score = Math.max(0, Math.min(100, score));
      } else {
        // Prior neutro = 50 si no hubo evidencia
        score = 50;
      }

      rawProfile[v] = score;

      // Estado de cobertura según Score Model V1
      let status: 'INSUFICIENTE' | 'PARCIAL' | 'SUFICIENTE' | 'ROBUSTA';
      if (count <= 1) status = 'INSUFICIENTE';
      else if (count === 2) status = 'PARCIAL';
      else if (count === 3) status = 'SUFICIENTE';
      else status = 'ROBUSTA';

      coverage[v] = { count, status };
    }

    // Validar perfil resultante contra invariantes estrictos
    this.validateStudentProfile(rawProfile);

    return {
      profile_38d: rawProfile,
      coverage,
    };
  }

  /**
   * Ejecuta el pipeline completo de evaluación:
   * Respuestas -> Evidence Engine -> Score Model V1 -> Perfil 38D -> MATCHING_V1 -> Resultados
   */
  public static processAttempt(
    studentId: string,
    gradeLevel: GradeLevel,
    attemptNumber: number,
    responses: QuestionResponseItem[],
    careers: any[]
  ): QuestionnaireScoringResult {
    // 1. Evidence Engine y Score Model
    const { profile_38d, coverage } = this.calculateProfile38D(responses);

    // 2. MATCHING_V1 determinístico (si hay catálogo de carreras cargado)
    let matches: any[] = [];
    if (careers && careers.length > 0) {
      // Cálculo determinístico directo de compatibilidad euclidiana ponderada
      matches = this.runMatchingV1(profile_38d, careers);
    }

    // 3. Empaquetar intento para persistencia y auditoría
    const attempt: QuestionnaireAttempt = {
      attempt_id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'att_' + Date.now(),
      student_id: studentId,
      grade_level: gradeLevel,
      questionnaire_version: 'V1.1',
      questionnaire_attempt: attemptNumber,
      created_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
      responses,
      profile_38d,
      matching_version: 'MATCHING_V1',
      score_model_version: 'V1',
      matches,
    };

    return {
      profile_38d,
      coverage,
      matches,
      attempt,
    };
  }

  /**
   * Ejecuta MATCHING_V1 canónico delegando a VocationalMatchingService.
   * Utiliza la especificación oficial:
   * - Similitud lineal: max(0, 100 - abs(student - career))
   * - Pesos oficiales: Intereses 25%, Aptitudes 30%, Personalidad 20%, Valores 10%, Preferencias 15%
   * - Tie-breaker oficial y ranking determinístico de 132 carreras.
   */
  public static runMatchingV1(studentProfile: StudentProfile, careers: any[]): any[] {
    const rawMatches = VocationalMatchingService.calculateAllMatches(
      studentProfile,
      careers,
      MATCHING_CONFIG_V1
    );

    // Adaptador de formato para garantizar compatibilidad con todos los consumidores
    return rawMatches.map((m) => ({
      career_id: m.career_id,
      name: m.career_name,
      career_name: m.career_name,
      slug: m.career_slug,
      career_slug: m.career_slug,
      area: m.area || 'General',
      is_gold_set: m.is_gold_set ?? false,
      global_score: m.global_score,
      compatibility_pct: Math.round(m.global_score * 100) / 100,
      dimension_scores: {
        Intereses: m.dimension_scores.interests,
        Aptitudes: m.dimension_scores.aptitudes,
        Personalidad: m.dimension_scores.personality,
        Valores: m.dimension_scores.values,
        Preferencias: m.dimension_scores.preferences,
        ...m.dimension_scores,
      },
      variable_analysis: {
        strongest_matches: m.strongest_matches,
        potential_gaps: m.potential_gaps,
        variable_details: m.variable_analysis.map((va) => ({
          variable: va.variable_code,
          student_score: va.student_score,
          career_score: va.career_score,
          difference: va.difference,
          similarity: va.similarity,
        })),
      },
      strongest_matches: m.strongest_matches,
      potential_gaps: m.potential_gaps,
      similar_careers: m.similar_careers,
      matching_version: m.matching_version,
      adn_version: m.adn_version,
    }));
  }
}
