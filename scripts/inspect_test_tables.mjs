import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envConfig = fs.readFileSync('.env', 'utf-8');
const env = {};
for (const line of envConfig.split('\n')) {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    if (key) env[key] = val;
  }
}

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function inspectTables() {
  console.log('--- test_answers sample ---');
  const { data: aData, error: aErr } = await supabase.from('test_answers').select('*').limit(1);
  console.log('test_answers:', { aData, aErr });

  console.log('--- test_results sample ---');
  const { data: rData, error: rErr } = await supabase.from('test_results').select('*').limit(1);
  console.log('test_results:', { rData, rErr });
}

inspectTables();
