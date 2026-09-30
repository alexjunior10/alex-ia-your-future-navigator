import type { DimensionName, MatchingConfig, VariableCode } from './types.ts';

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

/** Agrupación oficial de variables por dimensión */
export const DIMENSION_VARIABLES: Record<DimensionName, readonly VariableCode[]> = {
  Intereses: ['INT_R', 'INT_I', 'INT_A', 'INT_S', 'INT_E', 'INT_C'],
  Aptitudes: ['APT_LOG', 'APT_NUM', 'APT_VER', 'APT_ANA', 'APT_ESP', 'APT_CRE', 'APT_SOC', 'APT_ORG'],
  Personalidad: ['PER_SOC', 'PER_INI', 'PER_PER', 'PER_ADA', 'PER_COL', 'PER_AUT', 'PER_LID', 'PER_EST'],
  Valores: ['VAL_EST', 'VAL_ING', 'VAL_IMP', 'VAL_REC', 'VAL_CRE', 'VAL_APR', 'VAL_AUT', 'VAL_EQV'],
  Preferencias: ['PRE_PER', 'PRE_DAT', 'PRE_PRA', 'PRE_VAR', 'PRE_EST', 'PRE_CAM', 'PRE_TEC', 'PRE_EXP'],
} as const;

/** Mapa inverso: variable -> dimensión */
export const VARIABLE_TO_DIMENSION: Record<VariableCode, DimensionName> = (function () {
  const map = {} as Record<VariableCode, DimensionName>;
  for (const [dimension, vars] of Object.entries(DIMENSION_VARIABLES) as [DimensionName, readonly VariableCode[]][]) {
    for (const v of vars) {
      map[v] = dimension;
    }
  }
  return map;
})();

/**
 * CONFIGURACIÓN VERSIONADA: MATCHING_CONFIG_V1
 * Basada en la hipótesis inicial:
 * Intereses: 25% | Aptitudes: 30% | Personalidad: 20% | Valores: 10% | Preferencias: 15%
 */
export const MATCHING_CONFIG_V1: Readonly<MatchingConfig> = Object.freeze({
  version: 'MATCHING_V1',
  adnVersion: 'ADN_V1',
  dimensionWeights: {
    Intereses: 0.25,
    Aptitudes: 0.30,
    Personalidad: 0.20,
    Valores: 0.10,
    Preferencias: 0.15,
  },
  similarityFormula: 'linear_distance',
  tieBreakerOrder: ['Aptitudes', 'Intereses', 'Preferencias', 'Personalidad', 'Valores'],
  explainability: {
    strongMatchMinStudentScore: 70, // El estudiante debe tener afición/habilidad alta
    strongMatchMinCareerScore: 70,  // La carrera debe exigir nivel alto
    strongMatchMaxDifference: 15,   // La discrepancia debe ser pequeña (alta coincidencia)
    gapMinCareerScore: 75,          // La carrera exige un nivel alto en esta variable
    gapMinDifference: 25,           // Brecha sustancial entre lo que la carrera exige y el score del estudiante
  },
});

/**
 * Factory para crear configuraciones personalizadas sin modificar la original
 */
export function createMatchingConfig(overrides?: Partial<MatchingConfig>): MatchingConfig {
  if (!overrides) return { ...MATCHING_CONFIG_V1 };
  return {
    ...MATCHING_CONFIG_V1,
    ...overrides,
    dimensionWeights: {
      ...MATCHING_CONFIG_V1.dimensionWeights,
      ...(overrides.dimensionWeights || {}),
    },
    explainability: {
      ...MATCHING_CONFIG_V1.explainability,
      ...(overrides.explainability || {}),
    },
  };
}
