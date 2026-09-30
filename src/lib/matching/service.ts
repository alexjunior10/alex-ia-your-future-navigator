import {
  ALL_VOCATIONAL_VARIABLES,
  DIMENSION_VARIABLES,
  MATCHING_CONFIG_V1,
  VARIABLE_TO_DIMENSION,
} from './config.ts';
import { getSimilarCareers } from './similar-careers.ts';
import type {
  CareerMatchResult,
  CareerProfile,
  DimensionName,
  DimensionScores,
  MatchingConfig,
  StudentProfile,
  VariableAnalysis,
  VariableCode,
} from './types.ts';

/** Error específico lanzado ante fallos de validación en el perfil del estudiante */
export class VocationalProfileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VocationalProfileValidationError';
  }
}

/**
 * Servicio determinístico de matching vocacional (Alex IA)
 * Compara matemáticamente el vector de 38 variables del estudiante contra los perfiles del ADN.
 */
export class VocationalMatchingService {
  /**
   * Valida estrictamente el perfil del estudiante.
   * - Debe contener exactamente 38 variables reconocidas.
   * - Sin variables desconocidas, duplicadas ni faltantes.
   * - Sin valores null, undefined o NaN.
   * - Todos los valores deben estar en el rango [0, 100].
   */
  public static validateStudentProfile(profile: unknown): asserts profile is StudentProfile {
    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
      throw new VocationalProfileValidationError(
        'El perfil del estudiante debe ser un objeto con las 38 variables vocacionales.'
      );
    }

    const rawObj = profile as Record<string, unknown>;
    const keys = Object.keys(rawObj);

    // 1. Validar conteo total de variables
    if (keys.length !== ALL_VOCATIONAL_VARIABLES.length) {
      throw new VocationalProfileValidationError(
        `El perfil debe contener exactamente ${ALL_VOCATIONAL_VARIABLES.length} variables. Se recibieron ${keys.length}.`
      );
    }

    // 2. Validar que no existan variables desconocidas
    const validVarSet = new Set<string>(ALL_VOCATIONAL_VARIABLES);
    for (const key of keys) {
      if (!validVarSet.has(key)) {
        throw new VocationalProfileValidationError(
          `Variable desconocida en el perfil del estudiante: "${key}".`
        );
      }
    }

    // 3. Validar que todas las variables requeridas estén presentes y tengan valores válidos
    for (const expectedVar of ALL_VOCATIONAL_VARIABLES) {
      if (!(expectedVar in rawObj)) {
        throw new VocationalProfileValidationError(
          `Variable obligatoria faltante en el perfil: "${expectedVar}".`
        );
      }

      const val = rawObj[expectedVar];

      if (val === null || val === undefined) {
        throw new VocationalProfileValidationError(
          `Valor nulo o indefinido en la variable "${expectedVar}".`
        );
      }

      if (typeof val !== 'number' || Number.isNaN(val)) {
        throw new VocationalProfileValidationError(
          `El valor de la variable "${expectedVar}" debe ser un número válido.`
        );
      }

      if (val < 0 || val > 100) {
        throw new VocationalProfileValidationError(
          `El valor de la variable "${expectedVar}" (${val}) está fuera del rango permitido [0, 100].`
        );
      }
    }
  }

  /**
   * Calcula la similitud entre el puntaje del estudiante y el puntaje de la carrera para una variable.
   * Fórmula estándar de distancia lineal:
   * difference = abs(student_score - career_score)
   * similarity = max(0, 100 - difference)
   */
  public static calculateVariableSimilarity(
    studentScore: number,
    careerScore: number,
    formula: MatchingConfig['similarityFormula'] = 'linear_distance'
  ): { difference: number; similarity: number } {
    const difference = Math.abs(studentScore - careerScore);

    let similarity: number;
    if (formula === 'linear_distance') {
      similarity = Math.max(0, 100 - difference);
    } else {
      // euclidean distance / quadratic penalty
      similarity = Math.max(0, 100 - (difference * difference) / 100);
    }

    return { difference, similarity };
  }

  /**
   * Calcula los puntajes desagregados por cada una de las 5 dimensiones.
   * Promedia ponderadamente las similitudes de las variables pertenecientes a cada dimensión.
   */
  public static calculateDimensionScores(
    analysis: VariableAnalysis[],
    config: MatchingConfig
  ): DimensionScores {
    const analysisByVar = new Map<VariableCode, VariableAnalysis>();
    for (const a of analysis) {
      analysisByVar.set(a.variable_code, a);
    }

    const calcDimension = (dimName: DimensionName): number => {
      const vars = DIMENSION_VARIABLES[dimName];
      let weightedSum = 0;
      let totalWeight = 0;

      for (const vCode of vars) {
        const varAnalysis = analysisByVar.get(vCode);
        const similarity = varAnalysis ? varAnalysis.similarity : 0;
        const weight = config.variableWeights?.[vCode] ?? 1.0;

        weightedSum += similarity * weight;
        totalWeight += weight;
      }

      return totalWeight > 0 ? weightedSum / totalWeight : 0;
    };

    return {
      interests: calcDimension('Intereses'),
      aptitudes: calcDimension('Aptitudes'),
      personality: calcDimension('Personalidad'),
      values: calcDimension('Valores'),
      preferences: calcDimension('Preferencias'),
    };
  }

  /**
   * Calcula el puntaje global ponderado a partir de los puntajes por dimensión.
   * global_score = sum(dimension_score * dimension_weight)
   * Conserva total precisión de coma flotante.
   */
  public static calculateGlobalScore(
    dimScores: DimensionScores,
    config: MatchingConfig
  ): number {
    const w = config.dimensionWeights;
    const global =
      dimScores.interests * w.Intereses +
      dimScores.aptitudes * w.Aptitudes +
      dimScores.personality * w.Personalidad +
      dimScores.values * w.Valores +
      dimScores.preferences * w.Preferencias;

    return global;
  }

  /**
   * Identifica variables de máxima coincidencia (strongest_matches) y brechas potenciales (potential_gaps).
   */
  public static extractExplainability(
    analysis: VariableAnalysis[],
    config: MatchingConfig
  ): { strongest_matches: VariableCode[]; potential_gaps: VariableCode[] } {
    const expCfg = config.explainability;

    // Strongest matches: estudiante alto, carrera alta, diferencia baja
    const strongCandidates = analysis.filter(
      (a) =>
        a.student_score >= expCfg.strongMatchMinStudentScore &&
        a.career_score >= expCfg.strongMatchMinCareerScore &&
        a.difference <= expCfg.strongMatchMaxDifference
    );

    // Ordenar por menor diferencia y mayor exigencia de la carrera
    strongCandidates.sort((a, b) => {
      if (a.difference !== b.difference) return a.difference - b.difference;
      return b.career_score - a.career_score;
    });

    // Potential gaps: carrera exige alto y estudiante puntuó considerablemente menor
    const gapCandidates = analysis.filter(
      (a) =>
        a.career_score >= expCfg.gapMinCareerScore &&
        a.student_score < a.career_score &&
        a.difference >= expCfg.gapMinDifference
    );

    // Ordenar por mayor brecha
    gapCandidates.sort((a, b) => b.difference - a.difference);

    return {
      strongest_matches: strongCandidates.map((c) => c.variable_code),
      potential_gaps: gapCandidates.map((c) => c.variable_code),
    };
  }

  /**
   * Calcula la compatibilidad individual entre el estudiante y una carrera específica.
   */
  public static calculateCareerMatch(
    studentProfile: StudentProfile,
    career: CareerProfile,
    config: MatchingConfig = MATCHING_CONFIG_V1
  ): CareerMatchResult {
    // Análisis celda por celda de las 38 variables
    const variableAnalysis: VariableAnalysis[] = ALL_VOCATIONAL_VARIABLES.map((code) => {
      const studentScore = studentProfile[code];
      const careerScore = career.scores[code] ?? 0;
      const { difference, similarity } = this.calculateVariableSimilarity(
        studentScore,
        careerScore,
        config.similarityFormula
      );

      return {
        variable_code: code,
        dimension: VARIABLE_TO_DIMENSION[code],
        student_score: studentScore,
        career_score: careerScore,
        difference,
        similarity,
      };
    });

    // Puntajes por dimensión
    const dimensionScores = this.calculateDimensionScores(variableAnalysis, config);

    // Puntaje global
    const globalScore = this.calculateGlobalScore(dimensionScores, config);

    // Explicabilidad estructurada
    const { strongest_matches, potential_gaps } = this.extractExplainability(
      variableAnalysis,
      config
    );

    // Carreras similares detectadas por correlación de ADN
    const similar_careers = getSimilarCareers(career.slug);

    return {
      career_id: career.id,
      career_name: career.name,
      career_slug: career.slug,
      area: career.area,
      is_gold_set: career.is_gold_set ?? false,
      global_score: globalScore,
      dimension_scores: dimensionScores,
      variable_analysis: variableAnalysis,
      strongest_matches,
      potential_gaps,
      similar_careers,
      matching_version: config.version,
      adn_version: config.adnVersion,
    };
  }

  /**
   * Evalúa el perfil del estudiante contra todas las carreras proporcionadas,
   * aplicando validación previa y ordenamiento por ranking con desempate configurable.
   */
  public static calculateAllMatches(
    rawProfile: unknown,
    careers: CareerProfile[],
    config: MatchingConfig = MATCHING_CONFIG_V1
  ): CareerMatchResult[] {
    // 1. Validación estricta
    this.validateStudentProfile(rawProfile);
    const validProfile = rawProfile as StudentProfile;

    // 2. Cálculo para cada carrera
    const results: CareerMatchResult[] = careers.map((c) =>
      this.calculateCareerMatch(validProfile, c, config)
    );

    // 3. Ordenamiento determinístico con reglas de desempate
    results.sort((a, b) => this.compareMatches(a, b, config));

    return results;
  }

  /**
   * Compara dos resultados para el ranking aplicando los criterios de desempate:
   * 1. global_score DESC
   * 2. Orden de dimensiones configurado (por defecto: Aptitudes -> Intereses -> Preferencias -> Personalidad -> Valores)
   * 3. Si persiste el empate exacto, mantiene el empate sin inventar ganador.
   */
  public static compareMatches(
    a: CareerMatchResult,
    b: CareerMatchResult,
    config: MatchingConfig = MATCHING_CONFIG_V1
  ): number {
    // Umbral de precisión para considerar empate exacto en coma flotante
    const EPSILON = 1e-9;
    const diff = b.global_score - a.global_score;

    if (Math.abs(diff) > EPSILON) {
      return diff;
    }

    // Reglas de desempate por dimensión
    const dimensionKeyMap: Record<DimensionName, keyof DimensionScores> = {
      Intereses: 'interests',
      Aptitudes: 'aptitudes',
      Personalidad: 'personality',
      Valores: 'values',
      Preferencias: 'preferences',
    };

    for (const dim of config.tieBreakerOrder) {
      const key = dimensionKeyMap[dim];
      const dimDiff = b.dimension_scores[key] - a.dimension_scores[key];
      if (Math.abs(dimDiff) > EPSILON) {
        return dimDiff;
      }
    }

    // Empate exacto en todas las dimensiones: no favorecer arbitrariamente
    return 0;
  }

  /**
   * Devuelve el Top N carreras del ranking (ej. Top 3, Top 5, Top 10)
   */
  public static getTopMatches(matches: CareerMatchResult[], count = 5): CareerMatchResult[] {
    return matches.slice(0, count);
  }
}
