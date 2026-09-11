import type { Lang } from '@/lib/translations'

/**
 * The locales this file knows how to route to.
 *
 * Deliberately a literal and not an import of LOCALES from '@/lib/i18n': keeping this module
 * free of runtime imports is what lets scripts/test-locale.mjs load it directly and prove the
 * country rules, which cannot be reached over HTTP (see that file). The exhaustiveness check
 * below makes TypeScript name any locale added to `Lang` but forgotten here, so the two lists
 * cannot drift apart silently.
 */
const SUPPORTED = ['et', 'en', 'ru', 'de'] as const
type Missing = Exclude<Lang, (typeof SUPPORTED)[number]>
const _exhaustive: [Missing] extends [never] ? true : ['locale missing from SUPPORTED', Missing] = true
void _exhaustive

/**
 * Country → language.
 *
 * Austria and Switzerland are here because they read German, not because anyone asked for
 * them by name. The same reasoning is deliberately NOT extended to Belarus or Latvia for
 * Russian: there the browser-language step below already catches Russian speakers without
 * overriding everybody else in the country.
 */
export const COUNTRY_LANG: Record<string, Lang> = {
  EE: 'et',
  RU: 'ru',
  DE: 'de', AT: 'de', CH: 'de',
}

function isLocale(v: string | undefined | null): v is Lang {
  return !!v && (SUPPORTED as readonly string[]).includes(v)
}

/**
 * Which language a visitor lands in when they arrive at a URL with no locale in it.
 *
 * The order is deliberate:
 *
 *  1. **An explicit choice always wins.** Once someone picks a language in the nav the
 *     `oa-lang` cookie is written (contexts/LanguageContext.tsx) and nothing below can
 *     override it, on this visit or any future one. That is what makes step 2 safe.
 *  2. **Country decides.** Estonia opens in Estonian, Russia in Russian, the German-speaking
 *     countries in German. COUNTRY, not browser language, on purpose: a large share of
 *     Estonian devices run an English-language OS, and keying off the browser sent those
 *     visitors to the English site — exactly backwards in the home market. The cost is that
 *     an English-speaking visitor browsing from inside Estonia lands on Estonian; they get
 *     one click in the nav, and it is then remembered for a year.
 *  3. **Browser language**, for every country not named above — someone in France or Latvia
 *     whose browser asks for German or Russian is better served in it than in English.
 *  4. **English** otherwise.
 */
export function detectLocale(opts: {
  cookie?: string | null
  acceptLanguage?: string | null
  country?: string | null
}): Lang {
  if (isLocale(opts.cookie)) return opts.cookie

  const country = (opts.country ?? '').toUpperCase()
  if (COUNTRY_LANG[country]) return COUNTRY_LANG[country]

  // Only the FIRST tag. That is the visitor's own stated order of preference.
  const primary = (opts.acceptLanguage ?? '').toLowerCase().split(/[,;]/)[0].trim().slice(0, 2)
  if (isLocale(primary)) return primary

  return 'en'
}
