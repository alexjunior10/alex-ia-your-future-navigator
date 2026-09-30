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

const tables = ['careers', 'test_questions', 'test_answers', 'test_results', 'admission_exams'];

for (const t of tables) {
  const { data, count, error } = await supabase.from(t).select('*', { count: 'exact' }).limit(2);
  if (error) {
    console.log(`Table ${t}: Error ->`, error.message);
  } else {
    console.log(`Table ${t}: Exists, count: ${count}, sample:`, data);
  }
}
