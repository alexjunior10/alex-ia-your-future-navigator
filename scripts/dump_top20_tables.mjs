import fs from 'fs';

const calib = JSON.parse(fs.readFileSync('scripts/data/calibration_results_v1.json', 'utf-8'));

for (const [pKey, res] of Object.entries(calib.results)) {
  console.log(`\n=======================================================`);
  console.log(`### ${res.name.toUpperCase()}`);
  console.log(`*${res.description}*\n`);
  console.log(`| Pos | Carrera | Score Global | Intereses | Aptitudes | Personalidad | Valores | Preferencias | Gold Set | Cluster |`);
  console.log(`|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|`);
  res.top20.forEach(c => {
    const ds = c.dimension_scores;
    console.log(
      `| ${c.position} | ${c.career_name} | **${c.global_score.toFixed(2)}%** | ${ds.interests.toFixed(1)}% | ${ds.aptitudes.toFixed(1)}% | ${ds.personality.toFixed(1)}% | ${ds.values.toFixed(1)}% | ${ds.preferences.toFixed(1)}% | ${c.is_gold_set ? '★ Gold' : ''} | ${c.similar_careers.length > 0 ? c.similar_careers.slice(0, 2).join(', ') : '-'} |`
    );
  });
}
