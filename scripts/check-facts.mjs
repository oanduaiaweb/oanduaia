/**
 * Every language must state the same facts. For each translated text, the numbers in it
 * (prices, distances, times, dates, phone) are compared across all locales; a group where
 * one language says "150 €" and another "100 €" fails the build.
 *
 * Added 24 Oct 2026 after the Metsamaja price drop left "from €150" on the landing pages
 * and in llms.txt while the house pages already said 100.
 *
 *   node --no-warnings --experimental-strip-types scripts/check-facts.mjs
 */
const { T } = await import('../lib/translations.ts')
const { LANDINGS } = await import('../lib/landing.ts')
const { TRAILS } = await import('../lib/trails.ts')
const { FAQ, META, GALLERY_META, LOCALES } = await import('../lib/i18n.ts')

/*
 * Numbers a language legitimately writes differently: ordinals and years inside dates
 * survive, but "2 pm" vs "14:00" does not, so 12-hour English times are normalised first.
 * Words for small numbers ("two", "kaks") are not compared — only digits are.
 */
function numbers(s) {
  const t = s
    .replace(/(\d+)\s*pm\b/gi, (_, h) => String(Number(h) === 12 ? 12 : Number(h) + 12))
    .replace(/12 noon/gi, '12')
    .replace(/\b(\d{1,2})[.:]00\b/g, '$1')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/(\d)\s(\d{3})\b/g, '$1$2')
  return (t.match(/\d+(?:\.\d+)?/g) || []).filter(n => n !== '00').sort().join(' ')
}

const problems = []
function compare(where, group) {
  const sets = Object.fromEntries(LOCALES.map(l => [l, numbers(group[l] ?? '')]))
  const distinct = new Set(Object.values(sets))
  if (distinct.size > 1) {
    const base = sets.en
    const odd = LOCALES.filter(l => sets[l] !== base).map(l => `${l}=[${sets[l]}]`)
    problems.push(`${where}: en=[${base}] but ${odd.join(' ')}  — "${String(group.en).slice(0, 60)}"`)
  }
}

function walk(node, path) {
  if (!node || typeof node !== 'object') return
  if (LOCALES.every(l => typeof node[l] === 'string')) return compare(path, node)
  for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`)
}

walk(T, 'T')
walk(LANDINGS, 'LANDINGS')
walk(TRAILS, 'TRAILS')
walk(META, 'META')
walk(GALLERY_META, 'GALLERY_META')
const n = FAQ.en.length
for (let i = 0; i < n; i++) {
  compare(`FAQ[${i}] answer`, Object.fromEntries(LOCALES.map(l => [l, FAQ[l][i]?.[1]])))
}

if (problems.length) {
  console.error(`\n✗ facts differ between languages — ${problems.length}:\n`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}
console.log(`✓ facts check passed — numbers agree across ${LOCALES.length} languages`)
