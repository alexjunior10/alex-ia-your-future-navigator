-- ==============================================================================
-- MIGRACIÓN: QUESTIONNAIRE V1.1 — ALEX IA
-- Tablas para Intentos de Cuestionario, Telemetría de Respuestas y RLS Estricto
-- ==============================================================================

-- 1. Tabla de Intentos del Cuestionario (Questionnaire Attempts)
CREATE TABLE IF NOT EXISTS public.questionnaire_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL,
    grade_level TEXT NOT NULL CHECK (grade_level IN ('3S', '4S', '5S')),
    questionnaire_version TEXT NOT NULL DEFAULT 'V1.1',
    questionnaire_attempt INTEGER NOT NULL DEFAULT 1,
    profile_38d JSONB NOT NULL DEFAULT '{}'::jsonb,
    matching_version TEXT NOT NULL DEFAULT 'MATCHING_V1',
    score_model_version TEXT NOT NULL DEFAULT 'V1',
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Índices de consulta rápida
CREATE INDEX IF NOT EXISTS idx_questionnaire_attempts_user ON public.questionnaire_attempts(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_attempts_grade ON public.questionnaire_attempts(grade_level);
CREATE INDEX IF NOT EXISTS idx_questionnaire_attempts_version ON public.questionnaire_attempts(questionnaire_version);
CREATE INDEX IF NOT EXISTS idx_questionnaire_attempts_created ON public.questionnaire_attempts(created_at DESC);

-- Habilitar RLS
ALTER TABLE public.questionnaire_attempts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS estrictas (el estudiante solo accede a sus propios intentos)
DROP POLICY IF EXISTS "Students can insert own questionnaire attempts" ON public.questionnaire_attempts;
CREATE POLICY "Students can insert own questionnaire attempts"
    ON public.questionnaire_attempts
    FOR INSERT
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = auth_user_id)
        OR (auth.uid() IS NULL AND auth_user_id IS NULL)
    );

DROP POLICY IF EXISTS "Students can view own questionnaire attempts" ON public.questionnaire_attempts;
CREATE POLICY "Students can view own questionnaire attempts"
    ON public.questionnaire_attempts
    FOR SELECT
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = auth_user_id)
        OR (auth.uid() IS NULL AND auth_user_id IS NULL)
    );

-- 2. Tabla de Telemetría de Respuestas (Questionnaire Responses)
CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.questionnaire_attempts(id) ON DELETE CASCADE,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    base_question_id TEXT NOT NULL,
    variant_id TEXT NOT NULL,
    grade_level TEXT NOT NULL CHECK (grade_level IN ('3S', '4S', '5S', 'ALL')),
    selected_option TEXT NOT NULL CHECK (selected_option IN ('A', 'B', 'C', 'D')),
    response_time_ms INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Índices de telemetría y análisis de ítems
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_attempt ON public.questionnaire_responses(attempt_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_question ON public.questionnaire_responses(base_question_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_variant ON public.questionnaire_responses(variant_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_grade ON public.questionnaire_responses(grade_level);

-- Habilitar RLS
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Políticas RLS estrictas para respuestas
DROP POLICY IF EXISTS "Students can insert own questionnaire responses" ON public.questionnaire_responses;
CREATE POLICY "Students can insert own questionnaire responses"
    ON public.questionnaire_responses
    FOR INSERT
    WITH CHECK (
        (auth.uid() IS NOT NULL AND auth.uid() = auth_user_id)
        OR (auth.uid() IS NULL AND auth_user_id IS NULL)
    );

DROP POLICY IF EXISTS "Students can view own questionnaire responses" ON public.questionnaire_responses;
CREATE POLICY "Students can view own questionnaire responses"
    ON public.questionnaire_responses
    FOR SELECT
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = auth_user_id)
        OR (auth.uid() IS NULL AND auth_user_id IS NULL)
    );
