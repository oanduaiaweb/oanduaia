/**
 * Which language a visitor lands in.
 *
 * This exists because the country branch CANNOT be reached over HTTP from a developer
 * machine: Vercel overwrites any client-supplied `x-vercel-ip-country` with the real edge
 * geo, so curl from California can only ever prove the US path. Without this file the rule
 * Mikk actually asked for — Estonia opens in Estonian — is untested until a guest reports it.
 *
 *   node scripts/test-locale.mjs
 */
import { detectLocale } from '../lib/detectLocale.ts'

const CASES = [
  // [what this is, cookie, accept-language, country, expected]
  ['Estonia, Estonian browser',        null, 'et-EE,et;q=0.9',   'EE', 'et'],
  ['Estonia, ENGLISH browser',         null, 'en-US,en;q=0.9',   'EE', 'et'],
  ['Estonia, Russian browser',         null, 'ru-RU,ru;q=0.9',   'EE', 'et'],
  ['Russia',                           null, 'ru-RU,ru;q=0.9',   'RU', 'ru'],
  ['Russia, English browser',          null, 'en-US,en;q=0.9',   'RU', 'ru'],
  ['Germany',                          null, 'de-DE,de;q=0.9',   'DE', 'de'],
  ['Germany, English browser',         null, 'en-GB,en;q=0.9',   'DE', 'de'],
  ['Austria',                          null, 'de-AT,de;q=0.9',   'AT', 'de'],
  ['Switzerland',                      null, 'fr-CH,fr;q=0.9',   'CH', 'de'],
  ['USA',                              null, 'en-US,en;q=0.9',   'US', 'en'],
  ['Finland',                          null, 'fi-FI,fi;q=0.9',   'FI', 'fi'],
  ['Finland, English browser',         null, 'en-US,en;q=0.9',   'FI', 'fi'],
  ['Sweden',                           null, 'sv-SE,sv;q=0.9',   'SE', 'sv'],
  ['Spain',                            null, 'es-ES,es;q=0.9',   'ES', 'es'],
  ['Latvia, Latvian browser',          null, 'lv-LV,lv;q=0.9',   'LV', 'lv'],
  ['Japan',                            null, 'ja-JP,ja;q=0.9',   'JP', 'en'],
  ['Latvia, Russian browser',          null, 'ru-LV,ru;q=0.9',   'LV', 'ru'],
  ['France, German browser',           null, 'de-DE,de;q=0.9',   'FR', 'de'],
  ['UK, Estonian browser',             null, 'et-EE,et;q=0.9',   'GB', 'et'],
  ['no country header at all',         null, 'de-DE,de;q=0.9',   null, 'de'],
  ['no headers at all',                null, null,               null, 'en'],
  // The explicit choice must beat every one of the above.
  ['chose EN, sitting in Estonia',     'en', 'et-EE,et;q=0.9',   'EE', 'en'],
  ['chose ET, sitting in Germany',     'et', 'de-DE,de;q=0.9',   'DE', 'et'],
  ['chose RU, sitting in USA',         'ru', 'en-US,en;q=0.9',   'US', 'ru'],
  ['junk cookie is ignored',           'zz', 'en-US,en;q=0.9',   'EE', 'et'],
  ['lower-case country header',        null, 'en-US,en;q=0.9',   'ee', 'et'],
]

let bad = 0
for (const [name, cookie, acceptLanguage, country, want] of CASES) {
  const got = detectLocale({ cookie, acceptLanguage, country })
  const ok = got === want
  if (!ok) bad++
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${name.padEnd(30)} → /${got}${ok ? '' : `   expected /${want}`}`)
}
console.log(bad ? `\n${bad} of ${CASES.length} FAILED` : `\nall ${CASES.length} passed`)
process.exit(bad ? 1 : 0)
