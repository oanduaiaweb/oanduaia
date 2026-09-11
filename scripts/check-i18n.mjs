/**
 * Fails the build if a change did not land in every language.
 *
 * TypeScript already refuses a `Record<Lang, string>` that is missing a locale, which is
 * what makes adding a language tractable at all. But it cannot see three things, and all
 * three have actually happened on this site:
 *
 *   1. An English string pasted into the German slot. Typed fine, ships untranslated.
 *   2. A helper that branches `lang === 'et' ? 'et' : 'en-GB'`, so every locale it does
 *      not name falls through to English. That shipped "4.7 km" and "9.7" on German pages.
 *   3. Plain files with no types at all — public/llms.txt lists every locale by hand.
 *
 * Run by `npm run build` via prebuild, so a half-translated change cannot be deployed.
 */
import { readFileSync } from 'node:fs'

const LOCALES = ['et', 'en', 'ru', 'de']

const DATA_FILES = [
  'lib/translations.ts', 'lib/trails.ts', 'lib/landing.ts', 'lib/hero.ts',
  'lib/houses.ts', 'lib/services.ts', 'lib/housePhotos.ts', 'lib/i18n.ts',
  'lib/gallery.ts',
]

/**
 * Strings that are legitimately identical in two languages. Proper nouns, units and
 * international words — not placeholders. Add to this list only when a word really is
 * the same in both languages, never to silence a missing translation.
 */
const SAME_IS_FINE = new Set([
  'Sauna', 'km', 'Name', 'Navigation', 'Google Maps', 'Lahemaa', 'Estonia',
  'Oandu · Lahemaa · 59°26′N', 'Oanduaia', 'E-mail', 'Email', 'WiFi',
])

const errors = []
const note = (file, msg) => errors.push(`${file}: ${msg}`)

/* ---- 1. every translation group carries every locale ---- */
for (const file of DATA_FILES) {
  const src = readFileSync(file, 'utf8')
  // Both quote styles: one English string uses double quotes because it contains an
  // apostrophe, and a single-quote-only scan silently misreads that group as malformed.
  const toks = [...src.matchAll(/\b(et|en|ru|de): (?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g)]
    .map(m => ({ key: m[1], value: m[2] ?? m[3], index: m.index }))

  let i = 0
  while (i < toks.length) {
    if (toks[i].key !== 'et') { i++; continue }
    const group = toks.slice(i, i + LOCALES.length)
    const keys = group.map(t => t.key)
    if (keys.join(',') !== LOCALES.join(',')) {
      const line = src.slice(0, toks[i].index).split('\n').length
      note(file, `line ${line}: translation group is [${keys}], expected [${LOCALES}] — "${group[0].value.slice(0, 50)}"`)
      i++
      continue
    }
    const by = Object.fromEntries(group.map(t => [t.key, t.value]))
    for (const l of LOCALES) {
      if (l === 'en') continue
      if (by[l] === by.en && by.en !== '' && !SAME_IS_FINE.has(by.en)) {
        const line = src.slice(0, toks[i].index).split('\n').length
        note(file, `line ${line}: ${l} is identical to en — "${by.en.slice(0, 60)}" (untranslated?)`)
      }
      if (by[l] === '' && by.en !== '' && by.et !== '') {
        const line = src.slice(0, toks[i].index).split('\n').length
        note(file, `line ${line}: ${l} is empty but en is not — "${by.en.slice(0, 50)}"`)
      }
    }
    i += LOCALES.length
  }
}

/* ---- 2. gallery photo tuples carry every locale ---- */
{
  const src = readFileSync('lib/gallery.ts', 'utf8')
  for (const [n, line] of src.split('\n').entries()) {
    if (!/^ {2}\[/.test(line)) continue
    const strings = [...line.matchAll(/'((?:[^'\\]|\\.)*)'/g)].length
    // [file, et, en, ru, de]
    if (strings !== 1 + LOCALES.length) {
      note('lib/gallery.ts', `line ${n + 1}: photo has ${strings - 1} descriptions, expected ${LOCALES.length}`)
    }
  }
}

/* ---- 3. no helper may fall through to one language ---- */
/*
 * A ternary chain that names some locales and ends in a literal sends every locale it did
 * NOT name down that last branch. This shipped twice: once as "4.7 km" on German pages,
 * and once as English amenity names inside the German structured data — where nothing
 * visible on the page was wrong, so only a crawler would ever have seen it.
 *
 * Whitespace is collapsed first because these chains are usually written across several
 * lines. A fallback of `lang` itself is fine (it passes the locale through); a fallback
 * that is a literal string or array is the bug.
 */
for (const file of ['lib/pricing.ts', 'lib/reviews.ts', 'lib/trails.ts', 'lib/i18n.ts', 'components/Availability.tsx']) {
  const src = readFileSync(file, 'utf8')
  const flat = src.replace(/\s+/g, ' ')
  // Anchored tightly so the window cannot run past the end of the expression into an
  // unrelated statement — an earlier, looser version reported three ternaries that were
  // fine because it had wandered into the next line's object literal.
  const chain = /lang === '(\w+)'\s*\?[^;{}]{0,300}?:\s*(?:'[^']*'|\[[^\]]{0,200}\])\s*(?:[,;)}]|\.map)/g
  for (const m of flat.matchAll(chain)) {
    const named = new Set([...m[0].matchAll(/lang === '(\w+)'/g)].map(x => x[1]))
    if (named.size < LOCALES.length - 1) {
      note(file, `a locale ternary names only [${[...named]}] and falls through to a literal for the rest — key it by locale instead: ${m[0].slice(0, 95).trim()}…`)
    }
  }
}

/* ---- 4. the FAQ arrays must stay the same length in every language ---- */
/*
 * FAQ is `Record<Lang, [string, string][]>` — plain arrays, so the group check above cannot
 * see it. If one language gains a question and another does not, the page and the FAQPage
 * schema quietly disagree, and nothing else in the build would notice.
 */
{
  const src = readFileSync('lib/i18n.ts', 'utf8')
  const decl = src.indexOf('export const FAQ')
  const block = src.slice(decl, src.indexOf('\n}\n', decl))
  const counts = {}
  for (const l of LOCALES) {
    const m = block.match(new RegExp('\\n  ' + l + ': \\[([\\s\\S]*?)\\n  \\],'))
    counts[l] = m ? (m[1].match(/\[\s*'/g) || []).length : 0
  }
  const uniq = new Set(Object.values(counts))
  if (uniq.size !== 1) {
    note('lib/i18n.ts', `FAQ lengths differ between languages: ${JSON.stringify(counts)}`)
  } else if (counts[LOCALES[0]] === 0) {
    note('lib/i18n.ts', 'FAQ appears empty — the block may have been damaged')
  }
}

/* ---- 5. hand-written files that list the locales ---- */
{
  const llms = readFileSync('public/llms.txt', 'utf8')
  for (const l of LOCALES) {
    if (!llms.includes(`https://www.oanduaia.ee/${l}`)) {
      note('public/llms.txt', `does not list the /${l} pages`)
    }
  }
}

/* ---- 6. the language switcher offers every locale ---- */
{
  const nav = readFileSync('components/Nav.tsx', 'utf8')
  for (const l of LOCALES) {
    if (!new RegExp(`code: '${l}'`).test(nav)) note('components/Nav.tsx', `LANGS is missing '${l}'`)
  }
}

if (errors.length) {
  console.error(`\n✗ i18n check failed — ${errors.length} problem${errors.length > 1 ? 's' : ''}:\n`)
  for (const e of errors) console.error('  ' + e)
  console.error('\nEvery user-facing string must exist in all four languages: ' + LOCALES.join(', ') + '\n')
  process.exit(1)
}
console.log(`✓ i18n check passed — ${LOCALES.join(', ')} complete across ${DATA_FILES.length} files`)
