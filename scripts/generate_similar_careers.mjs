import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/data/adn_v1_export.json', 'utf-8'));

function pearsonCorr(x, y) {
  const n = x.length;
  const mx = x.reduce((a, b) => a + b, 0) / n;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den1 = 0;
  let den2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;
    num += dx * dy;
    den1 += dx * dx;
    den2 += dy * dy;
  }
  return num / Math.sqrt(den1 * den2);
}

const careerVectors = {};
data.careers.forEach(c => {
  const scores = data.variables.map(v => {
    const r = data.adnRecords.find(x => x.career_slug === c.slug && x.variable_code === v.code);
    return r ? r.score : 0;
  });
  careerVectors[c.slug] = scores;
});

const similarMap = {};
const slugs = data.careers.map(c => c.slug);

slugs.forEach(s1 => {
  const corrs = [];
  slugs.forEach(s2 => {
    if (s1 !== s2) {
      const r = pearsonCorr(careerVectors[s1], careerVectors[s2]);
      if (r >= 0.95) {
        corrs.push({ slug: s2, r: Number(r.toFixed(4)) });
      }
    }
  });
  corrs.sort((a, b) => b.r - a.r);
  if (corrs.length > 0) {
    similarMap[s1] = corrs.slice(0, 3).map(c => c.slug);
  }
});

console.log(`Generated similar map for ${Object.keys(similarMap).length} careers.`);

const code = `/**
 * Catálogo de carreras similares basado en correlación estadística del ADN Vocacional (r >= 0.95).
 * Esta capa es informativa y se utiliza para "También podrías explorar...",
 * sin alterar el puntaje principal ni modificar los perfiles individuales.
 */

export const SIMILAR_CAREERS_MAP: Record<string, string[]> = ${JSON.stringify(similarMap, null, 2)};

export function getSimilarCareers(careerSlug: string): string[] {
  return SIMILAR_CAREERS_MAP[careerSlug] || [];
}
`;

fs.writeFileSync('src/lib/matching/similar-careers.ts', code);
console.log('Saved src/lib/matching/similar-careers.ts');
