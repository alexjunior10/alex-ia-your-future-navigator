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

async function inspectColumns() {
  // Let's test a single row from careers with all keys
  const { data, error } = await supabase.from('careers').select('*').limit(1);
  if (error) {
    console.error('Error fetching career:', error);
  } else {
    console.log('Columns in careers:');
    if (data && data[0]) {
      Object.keys(data[0]).forEach(k => {
        console.log(`- ${k}: typeof = ${typeof data[0][k]}, isArray = ${Array.isArray(data[0][k])}, value =`, data[0][k]);
      });
    }
  }
}

inspectColumns();
