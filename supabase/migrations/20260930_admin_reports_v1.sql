-- ==============================================================================
-- ALEX IA — MIGRACIÓN PARA PANEL DE ADMINISTRACIÓN Y REPORTES EN VIVO
-- Ejecutar en el SQL Editor de Supabase (https://supabase.com/dashboard/project/lufkhjzhvacpjavjvurg/sql)
-- ==============================================================================

-- 1. Tabla de Intentos de Cuestionario Vocacional (Questionnaire Attempts)
CREATE TABLE IF NOT EXISTS public.questionnaire_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID,
    student_id TEXT NOT NULL,
    student_name TEXT,
    school TEXT,
    grade_level TEXT NOT NULL,
    questionnaire_version TEXT NOT NULL DEFAULT 'V1.1',
    questionnaire_attempt INTEGER NOT NULL DEFAULT 1,
    profile_38d JSONB NOT NULL DEFAULT '{}'::jsonb,
    matches JSONB DEFAULT '[]'::jsonb,
    matching_version TEXT NOT NULL DEFAULT 'MATCHING_V1',
    score_model_version TEXT NOT NULL DEFAULT 'V1',
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Tabla de Telemetría de Respuestas Individuales (40 Preguntas)
CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL,
    auth_user_id UUID,
    question_id TEXT NOT NULL,
    base_question_id TEXT NOT NULL,
    variant_id TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    selected_option TEXT NOT NULL,
    response_time_ms INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Índices para consultas de alta velocidad en el Dashboard de Administrador
CREATE INDEX IF NOT EXISTS idx_q_attempts_user ON public.questionnaire_attempts(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_q_attempts_grade ON public.questionnaire_attempts(grade_level);
CREATE INDEX IF NOT EXISTS idx_q_attempts_created ON public.questionnaire_attempts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_q_responses_attempt ON public.questionnaire_responses(attempt_id);

-- 4. Habilitar RLS
ALTER TABLE public.questionnaire_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- 5. Políticas RLS para lectura y escritura desde la aplicación (Estudiantes y Administradores)
DROP POLICY IF EXISTS "Permitir select questionnaire_attempts" ON public.questionnaire_attempts;
CREATE POLICY "Permitir select questionnaire_attempts"
    ON public.questionnaire_attempts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir insert questionnaire_attempts" ON public.questionnaire_attempts;
CREATE POLICY "Permitir insert questionnaire_attempts"
    ON public.questionnaire_attempts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir update questionnaire_attempts" ON public.questionnaire_attempts;
CREATE POLICY "Permitir update questionnaire_attempts"
    ON public.questionnaire_attempts FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir select questionnaire_responses" ON public.questionnaire_responses;
CREATE POLICY "Permitir select questionnaire_responses"
    ON public.questionnaire_responses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir insert questionnaire_responses" ON public.questionnaire_responses;
CREATE POLICY "Permitir insert questionnaire_responses"
    ON public.questionnaire_responses FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir select test_results" ON public.test_results;
CREATE POLICY "Permitir select test_results"
    ON public.test_results FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir insert test_results" ON public.test_results;
CREATE POLICY "Permitir insert test_results"
    ON public.test_results FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir select profiles" ON public.profiles;
CREATE POLICY "Permitir select profiles"
    ON public.profiles FOR SELECT USING (true);
