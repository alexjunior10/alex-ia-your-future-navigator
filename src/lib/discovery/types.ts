/**
 * Tipos e Interfaces para ONBOARDING DISCOVERY V1
 * Alex IA — Capa de descubrimiento previo al Test Vocacional
 * Version: DISCOVERY_V1
 * 
 * Reglas fundamentales:
 * - Determinístico (sin LLM)
 * - Extensible: preparado para futuras fases (Exploration Engine, signal strength, etc.)
 * - Aislado: No modifica el ADN Vocacional V1 ni el motor de matching.
 */

export const DISCOVERY_VERSION = "DISCOVERY_V1" as const;

export type DiscoveryQuestionId = "P1" | "P2" | "P3";

export interface DiscoveryOption {
  id: string;
  emoji: string;
  label: string;
  subtitle?: string;
  signal_key: string;
}

export interface DiscoveryQuestion {
  id: DiscoveryQuestionId;
  questionNumber: number;
  badge: string;
  prompt: string;
  subtitle: string;
  options: DiscoveryOption[];
}

/**
 * Metadata por señal individual de descubrimiento.
 * Diseñado para permitir futura metadata como 'strength' sin romper contratos.
 */
export interface DiscoverySignalItem {
  signal_key: string;
  source_question: DiscoveryQuestionId;
  source_option_id: string;
  source_option_label: string;
  version: typeof DISCOVERY_VERSION;
  strength?: number; // Reservado para versiones futuras (DISCOVERY_V1.1+)
}

/**
 * Payload completo de respuestas y señales emitidas por un estudiante.
 */
export interface DiscoverySubmission {
  version: typeof DISCOVERY_VERSION;
  completed_at: string;
  session_id?: string;
  auth_user_id?: string | null;
  raw_answers: Record<DiscoveryQuestionId, {
    option_id: string;
    option_label: string;
  }>;
  signals: DiscoverySignalItem[];
}
