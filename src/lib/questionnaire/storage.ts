import type { SupabaseClient } from '@supabase/supabase-js';
import type { QuestionnaireAttempt, QuestionnaireScoringResult } from './types.ts';

const LOCAL_STORAGE_KEY = 'alex_ia_questionnaire_v1_1_latest';

export interface StudentTestMetadata {
  name?: string;
  school?: string;
  grade?: string;
}

const ALL_ATTEMPTS_STORAGE_KEY = 'alex_ia_all_attempts';

/**
 * Servicio de almacenamiento y persistencia para Questionnaire V1.1
 */
export class QuestionnaireStorage {
  /**
   * Guarda el intento y sus respuestas tanto en Supabase como en localStorage.
   */
  public static async saveAttempt(
    supabase: SupabaseClient,
    scoringResult: QuestionnaireScoringResult,
    userId?: string,
    metadata?: StudentTestMetadata
  ): Promise<void> {
    const attempt = scoringResult.attempt;

    // 1. Guardar localmente como respaldo inmediato (último y lista histórica)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scoringResult));

        // Acumular en lista histórica para panel de administrador
        const rawHistory = window.localStorage.getItem(ALL_ATTEMPTS_STORAGE_KEY);
        const history: any[] = rawHistory ? JSON.parse(rawHistory) : [];
        const entry = {
          ...scoringResult,
          studentMetadata: metadata || {
            name: 'Estudiante',
            school: 'Colegio Piloto',
            grade: attempt.grade_level,
          },
          savedAt: new Date().toISOString(),
        };

        const filtered = history.filter(
          (h) => h.attempt?.attempt_id !== attempt.attempt_id
        );
        filtered.unshift(entry);
        window.localStorage.setItem(
          ALL_ATTEMPTS_STORAGE_KEY,
          JSON.stringify(filtered.slice(0, 100))
        );
      }
    } catch (e) {
      console.warn('No se pudo guardar intento en localStorage:', e);
    }

    // 2. Persistir en Supabase
    try {
      const isUUID = (str?: string) =>
        Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str));

      const attemptPayload: Record<string, any> = {
        auth_user_id: userId || null,
        student_id: attempt.student_id,
        student_name: metadata?.name || null,
        school: metadata?.school || null,
        grade_level: attempt.grade_level,
        questionnaire_version: attempt.questionnaire_version,
        questionnaire_attempt: attempt.questionnaire_attempt,
        profile_38d: attempt.profile_38d,
        matches: scoringResult.matches || [],
        matching_version: attempt.matching_version,
        score_model_version: attempt.score_model_version,
        status: 'completed',
        created_at: attempt.created_at,
        completed_at: attempt.completed_at
      };

      if (isUUID(attempt.attempt_id)) {
        attemptPayload.id = attempt.attempt_id;
      }

      const { data: attemptRow, error: attemptErr } = await supabase
        .from('questionnaire_attempts')
        .insert(attemptPayload)
        .select('id')
        .maybeSingle();

      if (!attemptErr && attemptRow) {
        // Insertar telemetría de respuestas individuales
        if (attempt.responses && attempt.responses.length > 0) {
          const respRows = attempt.responses.map((r) => ({
            attempt_id: attemptRow.id,
            auth_user_id: userId || null,
            question_id: r.question_id,
            base_question_id: r.base_question_id,
            variant_id: r.variant_id,
            grade_level: attempt.grade_level,
            selected_option: r.selected_option,
            response_time_ms: r.response_time_ms,
          }));

          await supabase.from('questionnaire_responses').insert(respRows);
        }
      }

      // 2.2 Guardar también en tabla test_results con toda la telemetría para compatibilidad
      if (userId) {
        await supabase.from('test_results').insert({
          auth_user_id: userId,
          result_data: {
            version: 'V1.1',
            attempt_id: attempt.attempt_id,
            student_name: metadata?.name,
            school: metadata?.school,
            grade_level: attempt.grade_level,
            profile_38d: attempt.profile_38d,
            top_matches: (scoringResult.matches || attempt.matches || []).slice(0, 10),
            responses: attempt.responses || [],
            created_at: attempt.created_at,
            completed_at: attempt.completed_at
          }
        });
      }
    } catch (err) {
      console.warn('Aviso de persistencia remota (guardado en fallback local activo):', err);
    }
  }

  /**
   * Obtiene el último intento registrado del estudiante.
   */
  public static async getLatestAttempt(
    supabase: SupabaseClient,
    userId?: string
  ): Promise<QuestionnaireScoringResult | null> {
    // 1. Intentar obtener desde Supabase si hay usuario
    if (userId) {
      try {
        const { data: remoteData, error } = await supabase
          .from('questionnaire_attempts')
          .select('*')
          .eq('auth_user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && remoteData && remoteData.profile_38d) {
          return {
            profile_38d: remoteData.profile_38d,
            coverage: {} as any,
            matches: remoteData.matches || [],
            attempt: {
              attempt_id: remoteData.id,
              student_id: remoteData.student_id,
              grade_level: remoteData.grade_level,
              questionnaire_version: remoteData.questionnaire_version,
              questionnaire_attempt: remoteData.questionnaire_attempt,
              created_at: remoteData.created_at,
              responses: [],
              profile_38d: remoteData.profile_38d,
              matching_version: remoteData.matching_version,
              score_model_version: remoteData.score_model_version,
            }
          };
        }
      } catch (e) {
        // Continuar a fallback
      }
    }

    // 2. Fallback a localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (raw) {
          return JSON.parse(raw) as QuestionnaireScoringResult;
        }
      }
    } catch (e) {
      console.warn('Error leyendo localStorage:', e);
    }

    return null;
  }
}
