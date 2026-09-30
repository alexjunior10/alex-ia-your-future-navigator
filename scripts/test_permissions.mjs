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

async function testPermissions() {
  console.log('Testing RPC or SQL execution with anon key...');
  
  // Test if an exec_sql or sql function exists
  const { data: rpcData, error: rpcErr } = await supabase.rpc('exec_sql', { sql: 'SELECT 1;' });
  console.log('RPC exec_sql result:', { rpcData, rpcErr });

  // Test insert into careers
  const testCareer = {
    slug: 'test-permission-check',
    name: 'Test Permission Check',
    area: 'Tecnología',
    description: 'Temporary test row to verify write permissions',
    salary: 'S/ 0',
    employability: 'Baja',
    duration: '1 año',
    fields: ['Test'],
    curriculum: ['Test'],
    universities: ['Test']
  };

  const { data: insertData, error: insertErr } = await supabase
    .from('careers')
    .insert([testCareer])
    .select();
  
  console.log('Insert into careers result:', { insertData, insertErr });

  if (insertData && insertData.length > 0) {
    console.log('Cleaning up test row...');
    const { error: delErr } = await supabase
      .from('careers')
      .delete()
      .eq('slug', 'test-permission-check');
    console.log('Delete test row result:', { delErr });
  }
}

testPermissions();
