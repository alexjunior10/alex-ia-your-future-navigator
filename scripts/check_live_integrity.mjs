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

async function checkIntegrity() {
  // Query career_adn with pagination to count occurrences per career
  let allRows = [];
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from('career_adn')
      .select('career_id')
      .eq('version', 'ADN_V1')
      .range(from, from + pageSize - 1);
    if (error) {
      console.error('Error fetching range:', error);
      break;
    }
    allRows = allRows.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  console.log(`Total career_adn fetched from Supabase: ${allRows.length}`);

  const countsByCareer = {};
  allRows.forEach(r => {
    countsByCareer[r.career_id] = (countsByCareer[r.career_id] || 0) + 1;
  });

  const careerIds = Object.keys(countsByCareer);
  console.log(`Total careers with ADN: ${careerIds.length}`);

  const incomplete = careerIds.filter(id => countsByCareer[id] !== 38);
  console.log(`Careers with <> 38 variables: ${incomplete.length}`);

  if (incomplete.length === 0 && careerIds.length === 132 && allRows.length === 5016) {
    console.log('🎉 INTEGRIDAD COMPROBADA EN VIVO: 132 carreras × 38 variables = 5,016 registros exactos.');
  }
}

checkIntegrity();
