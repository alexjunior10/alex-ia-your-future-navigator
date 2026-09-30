/**
 * Servicio de Lógica y Persistencia para ONBOARDING DISCOVERY V1
 * Alex IA
 * 
 * Reglas:
 * - 100% determinístico (sin LLM)
 * - Mapeo directo de opción seleccionada a DiscoverySignalItem
 * - Persistencia dual: localStorage (inmediata/offline/guest) y Supabase
 * - Aislado de ADN_V1 y MATCHING_V1
 */

import { DISCOVERY_QUESTIONS_V1 } from "./questions";
import { 
  DiscoveryQuestionId, 
  DiscoverySubmission, 
  DiscoverySignalItem, 
  DISCOVERY_VERSION 
} from "./types";

const LOCAL_STORAGE_KEY = "alex_discovery_signals_v1";

/**
 * Compila las respuestas del estudiante en señales determinísticas estructuradas.
 */
export function compileDiscoverySignals(
  answers: Partial<Record<DiscoveryQuestionId, string>>,
  authUserId?: string | null,
  sessionId?: string
): DiscoverySubmission {
  const signals: DiscoverySignalItem[] = [];
  const raw_answers: DiscoverySubmission["raw_answers"] = {} as any;

  for (const q of DISCOVERY_QUESTIONS_V1) {
    const selectedOptionId = answers[q.id];
    if (!selectedOptionId) continue;

    const opt = q.options.find(o => o.id === selectedOptionId);
    if (!opt) continue;

    raw_answers[q.id] = {
      option_id: opt.id,
      option_label: opt.label
    };

    signals.push({
      signal_key: opt.signal_key,
      source_question: q.id,
      source_option_id: opt.id,
      source_option_label: opt.label,
      version: DISCOVERY_VERSION
      // Nota: 'strength' puede incluirse en versiones futuras
    });
  }

  return {
    version: DISCOVERY_VERSION,
    completed_at: new Date().toISOString(),
    session_id: sessionId || (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined),
    auth_user_id: authUserId || null,
    raw_answers,
    signals
  };
}

/**
 * Guarda las señales en localStorage para acceso inmediato en el cliente.
 */
export function saveDiscoveryLocal(submission: DiscoverySubmission): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submission));
    }
  } catch (err) {
    console.warn("No se pudo guardar discovery en localStorage:", err);
  }
}

/**
 * Recupera las señales guardadas en localStorage si existen.
 */
export function getDiscoveryLocal(): DiscoverySubmission | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.version === DISCOVERY_VERSION) {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn("No se pudo leer discovery desde localStorage:", err);
  }
  return null;
}

/**
 * Limpia las señales de localStorage.
 */
export function clearDiscoveryLocal(): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch (err) {
    console.warn("No se pudo limpiar discovery de localStorage:", err);
  }
}

/**
 * Persiste las señales en Supabase (tabla discovery_answers).
 * Diseñado con manejo de errores no bloqueante para resiliencia offline/guest.
 */
export async function saveDiscoveryToSupabase(
  submission: DiscoverySubmission,
  supabaseClient: any
): Promise<{ success: boolean; error?: any }> {
  try {
    if (!supabaseClient) return { success: false, error: "No supabase client" };

    const payload = {
      auth_user_id: submission.auth_user_id || null,
      session_id: submission.session_id || null,
      version: submission.version,
      raw_answers: submission.raw_answers,
      signals: submission.signals
    };

    const { error } = await supabaseClient
      .from("discovery_answers")
      .insert(payload);

    if (error) {
      console.warn("Advertencia al guardar discovery_answers en Supabase:", error.message);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.warn("Excepción al guardar en Supabase discovery_answers:", err);
    return { success: false, error: err };
  }
}
