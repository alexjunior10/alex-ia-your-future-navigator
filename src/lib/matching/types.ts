/**
 * Definiciones de tipos para el Motor de Matching Vocacional (Alex IA)
 * Versión de ADN: ADN_V1
 * Versión de Matching: MATCHING_V1
 */

export type DimensionName =
  | 'Intereses'
  | 'Aptitudes'
  | 'Personalidad'
  | 'Valores'
  | 'Preferencias';

export type VariableCode =
  // Intereses (6)
  | 'INT_R'
  | 'INT_I'
  | 'INT_A'
  | 'INT_S'
  | 'INT_E'
  | 'INT_C'
  // Aptitudes (8)
  | 'APT_LOG'
  | 'APT_NUM'
  | 'APT_VER'
  | 'APT_ANA'
  | 'APT_ESP'
  | 'APT_CRE'
  | 'APT_SOC'
  | 'APT_ORG'
  // Personalidad (8)
  | 'PER_SOC'
  | 'PER_INI'
  | 'PER_PER'
  | 'PER_ADA'
  | 'PER_COL'
  | 'PER_AUT'
  | 'PER_LID'
  | 'PER_EST'
  // Valores (8)
  | 'VAL_EST'
  | 'VAL_ING'
  | 'VAL_IMP'
  | 'VAL_REC'
  | 'VAL_CRE'
  | 'VAL_APR'
  | 'VAL_AUT'
  | 'VAL_EQV'
  // Preferencias (8)
  | 'PRE_PER'
  | 'PRE_DAT'
  | 'PRE_PRA'
  | 'PRE_VAR'
  | 'PRE_EST'
  | 'PRE_CAM'
  | 'PRE_TEC'
  | 'PRE_EXP';

/** Perfil del estudiante: exactamente 38 variables con valores numéricos entre 0 y 100 */
export type StudentProfile = Record<VariableCode, number>;

/** Perfil de ADN de una carrera cargado desde base de datos / catálogo */
export interface CareerProfile {
  id: string;
  name: string;
  slug: string;
  area?: string;
  is_gold_set?: boolean;
  scores: Record<VariableCode, number>;
}

/** Configuración versionada y desacoplada del motor de matching */
export interface MatchingConfig {
  version: string;
  adnVersion: string;
  dimensionWeights: Record<DimensionName, number>;
  variableWeights?: Partial<Record<VariableCode, number>>;
  similarityFormula: 'linear_distance' | 'euclidean_distance';
  tieBreakerOrder: DimensionName[];
  explainability: {
    strongMatchMinStudentScore: number;
    strongMatchMinCareerScore: number;
    strongMatchMaxDifference: number;
    gapMinCareerScore: number;
    gapMinDifference: number;
  };
}

/** Análisis detallado por variable individual */
export interface VariableAnalysis {
  variable_code: VariableCode;
  dimension: DimensionName;
  student_score: number;
  career_score: number;
  difference: number;
  similarity: number;
}

/** Puntajes desagregados por cada una de las 5 dimensiones */
export interface DimensionScores {
  interests: number;
  aptitudes: number;
  personality: number;
  values: number;
  preferences: number;
}

/** Resultado cuantitativo completo de compatibilidad con una carrera */
export interface CareerMatchResult {
  career_id: string;
  career_name: string;
  career_slug: string;
  area?: string;
  is_gold_set?: boolean;
  global_score: number; // Precisión decimal completa (0 - 100)
  dimension_scores: DimensionScores;
  variable_analysis: VariableAnalysis[];
  strongest_matches: VariableCode[];
  potential_gaps: VariableCode[];
  similar_careers?: string[];
  matching_version: string;
  adn_version: string;
}

/** Resultado del ranking con metadatos de ejecución */
export interface MatchingRankingResult {
  student_profile_hash?: string;
  matching_version: string;
  adn_version: string;
  total_careers_evaluated: number;
  top_matches: CareerMatchResult[];
  all_matches: CareerMatchResult[];
}
