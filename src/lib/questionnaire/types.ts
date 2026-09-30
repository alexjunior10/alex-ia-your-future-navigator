export type GradeLevel = '3S' | '4S' | '5S';

export type QuestionOptionKey = 'A' | 'B' | 'C' | 'D';

export type VariableCode =
  // Intereses (6)
  | 'INT_R' | 'INT_I' | 'INT_A' | 'INT_S' | 'INT_E' | 'INT_C'
  // Aptitudes (8)
  | 'APT_LOG' | 'APT_NUM' | 'APT_VER' | 'APT_ANA' | 'APT_ESP' | 'APT_CRE' | 'APT_SOC' | 'APT_ORG'
  // Personalidad (8)
  | 'PER_SOC' | 'PER_INI' | 'PER_PER' | 'PER_ADA' | 'PER_COL' | 'PER_AUT' | 'PER_LID' | 'PER_EST'
  // Valores (8)
  | 'VAL_EST' | 'VAL_ING' | 'VAL_IMP' | 'VAL_REC' | 'VAL_CRE' | 'VAL_APR' | 'VAL_AUT' | 'VAL_EQV'
  // Preferencias (8)
  | 'PRE_PER' | 'PRE_DAT' | 'PRE_PRA' | 'PRE_VAR' | 'PRE_EST' | 'PRE_CAM' | 'PRE_TEC' | 'PRE_EXP';

export type StudentProfile = Record<string, number>;

export interface QuestionOption {
  key: QuestionOptionKey;
  text: string;
}

export interface QuestionItem {
  question_id: string;        // e.g. "Q01", "Q05_5S"
  base_question_id: string;   // e.g. "Q01", "Q05"
  variant_id: string;        // e.g. "Q01_BASE", "Q05_5S"
  grade_level: GradeLevel | 'ALL';
  difficulty_level: number | null; // 1, 2, 3 or null
  dimension: 'Intereses' | 'Aptitudes' | 'Personalidad' | 'Valores' | 'Preferencias' | 'Consistencia' | 'Integración';
  question_type: string;     // "Elección forzada", "Mini-caso", "Mini-reto", etc.
  stem: string;              // Question prompt/statement
  options: QuestionOption[];
  visual_asset?: string;     // e.g. "/assets/mini-retos/q33_cubo_espacial.svg"
  is_experimental?: boolean; // true for Q34
}

export interface QuestionOptionMapping {
  question_id: string;
  base_question_id: string;
  variant_id: string;
  grade_level: string;
  difficulty_level: number | null;
  option: QuestionOptionKey;
  question_type: string;
  dimension: string;
  variable: string | null;
  evidence: number;          // -2..+2
  question_weight: number;   // 1.25, 1.10, 1.00, 0.90, 0.75, 0
  weighted_evidence: number;
  mapping_status?: string;
  objective_correct?: boolean;
}

export interface QuestionResponseItem {
  question_id: string;
  base_question_id: string;
  variant_id: string;
  selected_option: QuestionOptionKey;
  response_time_ms: number;
}

export interface QuestionnaireAttempt {
  attempt_id: string;
  student_id: string;
  grade_level: GradeLevel;
  questionnaire_version: 'V1.1';
  questionnaire_attempt: number;
  created_at: string;
  completed_at?: string;
  responses: QuestionResponseItem[];
  profile_38d: StudentProfile;
  matching_version: 'MATCHING_V1';
  score_model_version: 'V1';
  matches?: any[];
}

export interface QuestionnaireScoringResult {
  profile_38d: StudentProfile;
  coverage: Record<string, {
    count: number;
    status: 'INSUFICIENTE' | 'PARCIAL' | 'SUFICIENTE' | 'ROBUSTA';
  }>;
  matches: any[];
  attempt: QuestionnaireAttempt;
}
