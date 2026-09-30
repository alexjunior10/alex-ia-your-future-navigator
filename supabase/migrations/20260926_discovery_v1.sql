-- ==============================================================================
-- MIGRACIÓN: ONBOARDING DISCOVERY V1
-- Alex IA — Capa de descubrimiento previo al Test Vocacional
-- Versión: DISCOVERY_V1
-- ==============================================================================

-- 1. Tabla para persistir las señales de descubrimiento
CREATE TABLE IF NOT EXISTS public.discovery_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT,
    version TEXT NOT NULL DEFAULT 'DISCOVERY_V1',
    raw_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    signals JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Índices para consultas eficientes
CREATE INDEX IF NOT EXISTS idx_discovery_answers_user ON public.discovery_answers(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_discovery_answers_version ON public.discovery_answers(version);
CREATE INDEX IF NOT EXISTS idx_discovery_answers_created ON public.discovery_answers(created_at DESC);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.discovery_answers ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Acceso (RLS)
-- Permitir inserción tanto para usuarios autenticados como anónimos/invitados con clave pública
DROP POLICY IF EXISTS "Allow insert discovery_answers" ON public.discovery_answers;
CREATE POLICY "Allow insert discovery_answers" 
    ON public.discovery_answers 
    FOR INSERT 
    WITH CHECK (true);

-- Permitir lectura de sus propias respuestas
DROP POLICY IF EXISTS "Allow select own discovery_answers" ON public.discovery_answers;
CREATE POLICY "Allow select own discovery_answers" 
    ON public.discovery_answers 
    FOR SELECT 
    USING (auth.uid() = auth_user_id OR auth_user_id IS NULL);
