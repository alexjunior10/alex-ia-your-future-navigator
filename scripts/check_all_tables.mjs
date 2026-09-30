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

async function listAllTables() {
  const known = [
    'test_questions',
    'test_answers',
    'test_results',
    'careers',
    'career_adn',
    'career_families',
    'vocational_variables',
    'admission_exams',
    'profiles',
    'students',
    'onboarding',
    'onboarding_answers',
    'user_preferences',
    'discovery_answers',
    'student_profiles'
  ];

  console.log('Checking existence of potential tables in public schema:');
  for (const t of known) {
    const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
    if (!error) {
      console.log(`  ✓ Table '${t}' EXISTS (rows: ${count})`);
    } else {
      // If error is 42P01 / PGRST205 (does not exist)
      if (error.message.includes('Could not find') || error.code === 'PGRST205') {
        // Table doesn't exist
      } else {
        console.log(`  ? Table '${t}' returned: ${error.message} (code: ${error.code})`);
      }
    }
  }
}

listAllTables();
