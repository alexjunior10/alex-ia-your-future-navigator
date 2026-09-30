import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// parse .env manually or with dotenv
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

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

console.log('Connecting to Supabase at:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  // Let's check careers
  const { data: careers, error: cErr } = await supabase.from('careers').select('*').limit(5);
  console.log('--- careers sample ---');
  if (cErr) console.error('careers error:', cErr);
  else {
    console.log(`careers count sample (${careers.length}):`, careers);
  }

  // Check if vocational_variables exists
  const { data: vVars, error: vErr } = await supabase.from('vocational_variables').select('*').limit(5);
  console.log('--- vocational_variables ---');
  if (vErr) console.log('vocational_variables error/not found:', vErr.message);
  else console.log('vocational_variables exists:', vVars);

  // Check if career_adn exists
  const { data: cAdn, error: adnErr } = await supabase.from('career_adn').select('*').limit(5);
  console.log('--- career_adn ---');
  if (adnErr) console.log('career_adn error/not found:', adnErr.message);
  else console.log('career_adn exists:', cAdn);

  // Check total careers count in DB
  const { count, error: countErr } = await supabase.from('careers').select('*', { count: 'exact', head: true });
  console.log('Total careers in DB:', count);
}

checkTables();
