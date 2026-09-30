import fs from 'fs';
import path from 'path';

const data = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));

const outDir = 'supabase/migrations';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sqlPath = path.join(outDir, '20260926_vocational_dna_v1.sql');

let sql = `-- ==============================================================
-- ALEX IA: MIGRACIÓN ADN VOCACIONAL V1
-- Fuente: ADN_Vocacional_v1_1_Final_Revision (1).xlsx
-- Versión: ADN_V1
-- Fecha de generación: ${new Date().toISOString()}
-- ==============================================================

-- 1. TABLA DE FAMILIAS / CATEGORÍAS DE CARRERAS
CREATE TABLE IF NOT EXISTS public.career_families (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABLA DE VARIABLES VOCACIONALES (38 variables exactas)
CREATE TABLE IF NOT EXISTS public.vocational_variables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    dimension VARCHAR(50) NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. AJUSTE NO DESTRUCTIVO A TABLA 'careers' EXISTENTE
-- Permite que las columnas sean opcionales para evitar violaciones NOT NULL
DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN area DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN description DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN salary DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN employability DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN duration DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN fields DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN curriculum DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN universities DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN trend DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE public.careers ALTER COLUMN affinity DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Nuevas columnas requeridas para el modelo de ADN
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS distinctive_competency TEXT;
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS family_id UUID REFERENCES public.career_families(id);
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS is_gold_set BOOLEAN DEFAULT false;
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Asegurar constraint UNIQUE en slug si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'careers_slug_key'
    ) THEN
        ALTER TABLE public.careers ADD CONSTRAINT careers_slug_key UNIQUE (slug);
    END IF;
END $$;

-- 4. TABLA DE ADN VOCACIONAL CON VERSIONADO
CREATE TABLE IF NOT EXISTS public.career_adn (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_id UUID NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
    variable_id UUID NOT NULL REFERENCES public.vocational_variables(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100 AND score % 5 = 0),
    version VARCHAR(20) NOT NULL DEFAULT 'ADN_V1',
    is_gold_set BOOLEAN DEFAULT false,
    source VARCHAR(100) NOT NULL DEFAULT 'ADN_Vocacional_v1_1_Final_Revision (1).xlsx',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_career_variable_version UNIQUE (career_id, variable_id, version)
);

-- Índices para optimizar consultas del futuro motor de matching
CREATE INDEX IF NOT EXISTS idx_career_adn_version ON public.career_adn(version);
CREATE INDEX IF NOT EXISTS idx_career_adn_career_version ON public.career_adn(career_id, version);
CREATE INDEX IF NOT EXISTS idx_career_adn_variable_version ON public.career_adn(variable_id, version);

-- 5. POLÍTICAS DE ACCESO (RLS) - LECTURA PÚBLICA PARA MOTOR Y FRONTEND
ALTER TABLE public.career_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocational_variables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_adn ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'career_families' AND policyname = 'Allow public read career_families') THEN
        CREATE POLICY "Allow public read career_families" ON public.career_families FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'vocational_variables' AND policyname = 'Allow public read vocational_variables') THEN
        CREATE POLICY "Allow public read vocational_variables" ON public.vocational_variables FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'careers' AND policyname = 'Allow public read careers') THEN
        CREATE POLICY "Allow public read careers" ON public.careers FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'career_adn' AND policyname = 'Allow public read career_adn') THEN
        CREATE POLICY "Allow public read career_adn" ON public.career_adn FOR SELECT USING (true);
    END IF;
END $$;

-- ==============================================================
-- POBLADO DE DATOS (SEEDS)
-- ==============================================================

-- A. POBLAR FAMILIAS DE CARRERAS
INSERT INTO public.career_families (name) VALUES
    ('Carreras tradicionales'),
    ('Carreras digitales / tecnológicas'),
    ('Carreras emergentes / futuro'),
    ('Carreras tradicionales / evolución'),
    ('Carreras científicas / futuro'),
    ('Carreras emergentes / híbridas'),
    ('Carreras interdisciplinarias')
ON CONFLICT (name) DO NOTHING;

-- B. POBLAR LAS 38 VARIABLES VOCACIONALES
INSERT INTO public.vocational_variables (code, dimension, name, sort_order) VALUES
`;

const varValues = data.variables.map(v => 
  `    ('${v.code}', '${v.dimension}', '${v.name.replace(/'/g, "''")}', ${v.sort_order})`
).join(',\n');

sql += varValues + `\nON CONFLICT (code) DO UPDATE SET\n    dimension = EXCLUDED.dimension,\n    name = EXCLUDED.name,\n    sort_order = EXCLUDED.sort_order;\n\n`;

// C. POBLAR LAS 132 CARRERAS
sql += `-- C. POBLAR LAS 132 CARRERAS (con área asignada y compatibilidad con el frontend)
`;

data.careers.forEach(c => {
  const isGoldVal = c.is_gold_set ? 'true' : 'false';
  const nameSafe = c.name.replace(/'/g, "''");
  const familySafe = c.family.replace(/'/g, "''");
  const areaSafe = (c.area || 'Tecnología').replace(/'/g, "''");
  
  sql += `INSERT INTO public.careers (slug, name, area, is_gold_set, status, family_id, fields, curriculum, universities, duration, employability, salary)
SELECT 
    '${c.slug}', 
    '${nameSafe}', 
    '${areaSafe}', 
    ${isGoldVal}, 
    'active', 
    id, 
    ARRAY[]::text[], 
    ARRAY[]::text[], 
    ARRAY[]::text[], 
    '5 años', 
    'Alta', 
    'S/ 3,500 — S/ 8,000'
FROM public.career_families WHERE name = '${familySafe}'
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    area = COALESCE(public.careers.area, EXCLUDED.area),
    is_gold_set = EXCLUDED.is_gold_set,
    family_id = EXCLUDED.family_id,
    updated_at = now();
`;
});

sql += `\n-- D. POBLAR LOS 5,016 REGISTROS DE ADN VOCACIONAL (VERSIÓN 'ADN_V1')\n`;
sql += `DO $$
DECLARE
    rec RECORD;
BEGIN
`;

// Insert ADN records in chunks using a temporary table for maximum performance in PostgreSQL
sql += `    CREATE TEMP TABLE tmp_adn_import (
        career_slug TEXT,
        variable_code TEXT,
        score INTEGER,
        version TEXT,
        is_gold_set BOOLEAN
    ) ON COMMIT DROP;

    INSERT INTO tmp_adn_import (career_slug, variable_code, score, version, is_gold_set) VALUES
`;

const chunkSize = 500;
const chunks = [];
for (let i = 0; i < data.adnRecords.length; i += chunkSize) {
  chunks.push(data.adnRecords.slice(i, i + chunkSize));
}

chunks.forEach((chunk, chunkIdx) => {
  const lines = chunk.map(r => 
    `        ('${r.career_slug}', '${r.variable_code}', ${r.score}, '${r.version}', ${r.is_gold_set ? 'true' : 'false'})`
  ).join(',\n');

  if (chunkIdx > 0) {
    sql += `    INSERT INTO tmp_adn_import (career_slug, variable_code, score, version, is_gold_set) VALUES\n`;
  }
  sql += lines + ';\n';
});

sql += `
    -- Insertar en career_adn relacionando careers y vocational_variables
    INSERT INTO public.career_adn (career_id, variable_id, score, version, is_gold_set, source)
    SELECT 
        c.id,
        v.id,
        t.score,
        t.version,
        t.is_gold_set,
        'ADN_Vocacional_v1_1_Final_Revision (1).xlsx'
    FROM tmp_adn_import t
    JOIN public.careers c ON c.slug = t.career_slug
    JOIN public.vocational_variables v ON v.code = t.variable_code
    ON CONFLICT (career_id, variable_id, version) DO UPDATE SET
        score = EXCLUDED.score,
        is_gold_set = EXCLUDED.is_gold_set,
        updated_at = now();

END $$;

-- ==============================================================
-- VALIDACIÓN FINAL POST-INSERCIÓN
-- ==============================================================
DO $$
DECLARE
    v_total_variables INT;
    v_total_careers INT;
    v_total_adn INT;
    v_incomplete_careers INT;
BEGIN
    SELECT COUNT(*) INTO v_total_variables FROM public.vocational_variables;
    SELECT COUNT(*) INTO v_total_careers FROM public.careers WHERE status = 'active';
    SELECT COUNT(*) INTO v_total_adn FROM public.career_adn WHERE version = 'ADN_V1';
    
    SELECT COUNT(*) INTO v_incomplete_careers FROM (
        SELECT career_id, COUNT(*) as cnt 
        FROM public.career_adn 
        WHERE version = 'ADN_V1' 
        GROUP BY career_id 
        HAVING COUNT(*) <> 38
    ) sq;

    RAISE NOTICE '=== REPORTE DE INTEGRIDAD EN BASE DE DATOS ===';
    RAISE NOTICE 'Variables registradas: % (Esperado: 38)', v_total_variables;
    RAISE NOTICE 'Carreras activas: % (Esperado: 132)', v_total_careers;
    RAISE NOTICE 'Registros ADN_V1: % (Esperado: 5016)', v_total_adn;
    RAISE NOTICE 'Carreras con ADN incompleto (<> 38 vars): % (Esperado: 0)', v_incomplete_careers;

    IF v_total_variables <> 38 OR v_total_adn < 5016 OR v_incomplete_careers > 0 THEN
        RAISE EXCEPTION 'Fallo en la validación de integridad referencial del ADN';
    END IF;
END $$;
`;

fs.writeFileSync(sqlPath, sql);
console.log(`Generated migration: ${sqlPath} (${(fs.statSync(sqlPath).size / 1024).toFixed(1)} KB)`);
