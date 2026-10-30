import { T, type Lang } from './translations'
import { HOUSE_IMAGES } from './houses'
import { TRAILS, trailKm } from './trails'
import { LANDINGS } from './landing'
import { HOUSE_GALLERIES } from './housePhotos'
import { CLOSED_SEASONS } from './season'
import type { HouseSlug } from './availability'
import { SOCIAL } from './social'

export const LOCALES: Lang[] = ['et', 'en', 'ru', 'de', 'es', 'sv', 'fi', 'lv']
export const DEFAULT_LOCALE: Lang = 'et'

export const SITE = 'https://www.oanduaia.ee'

/** BCP-47 tags used for hreflang. */
export const HREFLANG: Record<Lang, string> = {
  et: 'et-EE',
  en: 'en',
  ru: 'ru',
  de: 'de',
  es: 'es',
  sv: 'sv',
  fi: 'fi',
  lv: 'lv',
}

export function isLocale(v: string | undefined): v is Lang {
  return !!v && (LOCALES as string[]).includes(v)
}

/**
 * Per-locale metadata. Kept here rather than in translations.ts so it stays SEO-shaped.
 *
 * **Descriptions are capped at ~150 characters.** They ran 159-172 and Google truncated the
 * closing sentence in EN, RU and DE — which was exactly where the Booking.com score sat. The
 * score is now dropped rather than half-shown: a third-party rating is the weakest thing in
 * a snippet anyway. What leads instead is the offer nobody else here makes, whole-house
 * rental with a wood-fired sauna, and the price, which earns clicks.
 */
export const META: Record<Lang, { title: string; description: string; ogLocale: string }> = {
  /*
   * Words chosen for what people type, not for density. The English pages already say
   * sauna, forest, Estonia and Lahemaa dozens of times in their own copy — repeating
   * them here would be stuffing. What was genuinely missing was different:
   *
   * - "sauna" was absent from the English TITLE, the most valuable slot on the page,
   *   on a property whose main house is a sauna house.
   * - "cabin" appeared nowhere at all, in any language. It is how English speakers
   *   search for this ("forest cabin Estonia", "cabin with sauna"), and log cabin is
   *   what these buildings literally are.
   * - Russian had no "баня". "Сауна" is the loanword; баня is what Russian speakers
   *   type, and it is accurate for a wood-fired sauna.
   * - Estonian had "metsaspaa", which nobody searches, and no "saunaga puhkemaja",
   *   which is the standard phrase for renting a place like this.
   */
  et: {
    title: 'Oanduaia — saunaga puhkemajad ja majutus Lahemaal',
    description:
      'Kolm eraldi palkmaja puuküttega sauna ja tiigiga Lahemaa rahvuspargis. Terve maja ainult sinule, Oandu külas. Hinnad alates 100 € öö.',
    ogLocale: 'et_EE',
  },
  en: {
    title: 'Oanduaia — sauna and forest cabins in Lahemaa, Estonia',
    description:
      'Three private log cabins with a wood-fired sauna and pond in Lahemaa National Park, Estonia. Rent the whole house. Oandu village, from 100 € a night.',
    ogLocale: 'en_GB',
  },
  ru: {
    title: 'Oanduaia — баня и лесные дома в Лахемаа, Эстония',
    description:
      'Три отдельных дома с дровяной баней и прудом в парке Лахемаа, Эстония. Весь дом только для вас, деревня Оанду. От 100 € за ночь.',
    ogLocale: 'ru_RU',
  },
  /*
   * German follows the same rule as the others: the words a German speaker actually
   * types. "Ferienhaus" is the standard term for a whole house rented to one party —
   * not "Hütte", which reads as a mountain refuge — and "Sauna" needs no translating.
   */
  de: {
    title: 'Oanduaia — Ferienhäuser mit Sauna in Lahemaa, Estland',
    description:
      'Drei Blockhäuser mit Holzsauna und Teich im Nationalpark Lahemaa, Estland. Das ganze Haus für sich, Dorf Oandu. Ab 100 € pro Nacht.',
    ogLocale: 'de_DE',
  },
  /*
   * Spanish: "cabañas" is what a Spanish speaker searches for a log house in the woods, and
   * "sauna de leña" says wood-fired without needing an explanation.
   */
  es: {
    title: 'Oanduaia — cabañas con sauna en Lahemaa, Estonia',
    description:
      'Tres cabañas de troncos con sauna de leña y estanque en el Parque Nacional de Lahemaa, Estonia. La casa entera para ti. Desde 100 € la noche.',
    ogLocale: 'es_ES',
  },
  /*
   * Swedish "stuga" is the word for a rented cabin; "vedeldad bastu" says wood-fired. Finnish
   * "mökki" and "puusauna" are what Finns type; Latvian "brīvdienu māja ar pirti" likewise.
   */
  sv: {
    title: 'Oanduaia — stugor med bastu i Lahemaa, Estland',
    description:
      'Tre timmerstugor med vedeldad bastu och damm i Lahemaa nationalpark, Estland. Hela huset för dig, byn Oandu. Från 100 € per natt.',
    ogLocale: 'sv_SE',
  },
  fi: {
    title: 'Oanduaia — mökit saunalla Lahemaalla, Virossa',
    description:
      'Kolme hirsimökkiä puusaunalla ja lammella Lahemaan kansallispuistossa, Virossa. Koko talo vain sinulle, Oandun kylä. Alkaen 100 € yö.',
    ogLocale: 'fi_FI',
  },
  lv: {
    title: 'Oanduaia — brīvdienu mājas ar pirti Lahemā, Igaunijā',
    description:
      'Trīs guļbaļķu mājas ar malkas pirti un dīķi Lahemā nacionālajā parkā, Igaunijā. Visa māja tikai jums, Oandu ciemā. No 100 € par nakti.',
    ogLocale: 'lv_LV',
  },
}

export const GALLERY_META: Record<Lang, { title: string; description: string }> = {
  et: {
    title: 'Galerii — saunaga puhkemajad Lahemaal | Oanduaia',
    description:
      'Üle saja foto Oanduaia kolmest palkmajast, puuküttega saunast, tiigist ja Lahemaa rahvuspargist – suvest talveni, Oandu külas Lääne-Virumaal.',
  },
  en: {
    title: 'Photo gallery — sauna and forest cabins in Lahemaa | Oanduaia',
    description:
      'Over a hundred photographs of the three Oanduaia log cabins, the wood-fired sauna, the pond and Lahemaa National Park, Estonia — summer through winter.',
  },
  ru: {
    title: 'Галерея — дома с баней в Лахемаа, Эстония | Oanduaia',
    description:
      'Более ста фотографий трёх домов Oanduaia, дровяной бани, пруда и национального парка Лахемаа — от лета до зимы, деревня Оанду, Эстония.',
  },
  de: {
    title: 'Bildergalerie — Ferienhäuser mit Sauna in Lahemaa | Oanduaia',
    description:
      'Über hundert Fotos der drei Blockhäuser von Oanduaia, der Holzsauna, des Teichs und des Nationalparks Lahemaa in Estland — vom Sommer bis zum Winter.',
  },
  es: {
    title: 'Galería de fotos — cabañas con sauna en Lahemaa | Oanduaia',
    description:
      'Más de cien fotos de las tres cabañas de Oanduaia, la sauna de leña, el estanque y el Parque Nacional de Lahemaa, Estonia — del verano al invierno.',
  },
  sv: {
    title: 'Bildgalleri — stugor med bastu i Lahemaa | Oanduaia',
    description:
      'Över hundra fotografier av Oanduaias tre timmerstugor, den vedeldade bastun, dammen och Lahemaa nationalpark — från sommar till vinter, i byn Oandu, Estland.',
  },
  fi: {
    title: 'Kuvagalleria — mökit saunalla Lahemaalla | Oanduaia',
    description:
      'Yli sata valokuvaa Oanduaian kolmesta hirsimökistä, puusaunasta, lammesta ja Lahemaan kansallispuistosta — kesästä talveen, Oandun kylässä, Virossa.',
  },
  lv: {
    title: 'Fotogalerija — brīvdienu mājas ar pirti Lahemā | Oanduaia',
    description:
      'Vairāk nekā simts fotogrāfiju ar Oanduaia trim guļbaļķu mājām, malkas pirti, dīķi un Lahemā nacionālo parku — no vasaras līdz ziemai, Oandu ciemā, Igaunijā.',
  },
}

/**
 * The bare domain is the x-default for the homepage: it redirects each visitor to their own
 * language, which is what x-default means. Pointing it at /et instead made Google treat
 * /en as a duplicate of "/" (Search Console, 26 Oct 2026), since "/" 307s to /en for Googlebot.
 */
export function xDefault(suffix = '') {
  return suffix ? `${SITE}/${DEFAULT_LOCALE}${suffix}` : `${SITE}/`
}

/** Builds the canonical + hreflang alternates block for a given path suffix ('' or '/gallery'). */
export function alternates(lang: Lang, suffix = '') {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE}/${l}${suffix}`
  languages['x-default'] = xDefault(suffix)
  return { canonical: `${SITE}/${lang}${suffix}`, languages }
}

/**
 * Per-house metadata and structured data for /{lang}/majad/{slug}.
 *
 * Everything is composed from copy already published on the site — the house name, its
 * tagline, its first detail line and its lowest published rate. The three houses are the
 * sellable product and until now had no page of their own to rank.
 */
export function houseMeta(lang: Lang, slug: string) {
  const h = T.feature.houses.find(x => x.slug === slug)
  if (!h) return null
  const p = T.housePage
  const from = Math.min(...h.prices.map(x => x.eur))
  /*
   * "Sauna House — lodging in Lahemaa, Estonia" was unique but said nothing about which
   * house it was. Each now names its own kind — sauna cabin, waterside cabin, forest
   * cabin — which is both the difference between them and the phrase people search.
   */
  const kind = h.seoKind ? h.seoKind[lang] : null
  // Google cuts near 60 characters; the longer languages drop the country rather than the kind.
  const full = kind ? `${h.name[lang]} — ${kind}, ${p.titlePlace[lang]}, ${p.titleCountry[lang]} | Oanduaia` : ''
  return {
    title: kind
      ? (full.length <= 60 ? full : `${h.name[lang]} — ${kind}, ${p.titlePlace[lang]} | Oanduaia`)
      : `${h.name[lang]} — ${p.titleSuffix[lang]}`,
    /*
     * No tagline here any more. That is a gain, not a loss: "Saun, köök, seltskond — kõik
     * olemas" was occupying the front of a 155-character description with nothing anyone
     * searches for, ahead of the bed count, the capacity and the price, which are what
     * people actually type. The interpuncts become commas because this is read as a
     * sentence in a search result, not scanned as a list on a page.
     */
    description: `${h.name[lang]} — ${h.items[0][lang].replace(/ · /g, ', ')}. ${p.descFrom[lang]} ${from} ${p.descUnit[lang]}`,
  }
}

/** Accommodation markup for one house, tied back to the property by `containedInPlace`. */
/*
 * The park's name, once. It was written out as a ternary in the LodgingBusiness schema and
 * as a separate Record in each of the two trail functions — and the ternary sent German to
 * the ESTONIAN string, so the German pages told crawlers the property is in "Lahemaa
 * rahvuspark". Keyed by locale, the compiler will not let that happen again.
 */
export const PARK_NAME: Record<Lang, string> = {
  et: 'Lahemaa rahvuspark',
  en: 'Lahemaa National Park',
  ru: 'Национальный парк Лахемаа',
  de: 'Nationalpark Lahemaa',
  es: 'Parque Nacional de Lahemaa',
  sv: 'Lahemaa nationalpark',
  fi: 'Lahemaan kansallispuisto',
  lv: 'Lahemā nacionālais parks',
}

/**
 * Amenities as published on the house pages, in every language the site serves.
 *
 * The SAUNA is deliberately not in here. It belongs to the Sauna House alone, and this list is
 * attached to all three houses' JSON-LD — leaving it in told Google, machine-readably, that the
 * Pond House and the Forest House each have one. A guest who books on the strength of a search
 * result that says "sauna" and arrives to find none is a complaint we would deserve.
 */
const HOUSE_AMENITIES: Record<Lang, string[]> = {
  et: ['Tiik', 'Mets', 'Matkarajad'],
  en: ['Pond', 'Forest', 'Hiking trails'],
  ru: ['Пруд', 'Лес', 'Туристические тропы'],
  de: ['Teich', 'Wald', 'Wanderwege'],
  es: ['Estanque', 'Bosque', 'Senderos'],
  sv: ['Damm', 'Skog', 'Vandringsleder'],
  fi: ['Lampi', 'Metsä', 'Retkeilyreitit'],
  lv: ['Dīķis', 'Mežs', 'Pārgājienu takas'],
}

/** The one house that actually has it. */
const SAUNA_AMENITY: Record<Lang, string> = {
  et: 'Saun', en: 'Sauna', ru: 'Сауна', de: 'Sauna', es: 'Sauna',
  sv: 'Bastu', fi: 'Sauna', lv: 'Pirts',
}

export function houseJsonLd(lang: Lang, slug: string) {
  const h = T.feature.houses.find(x => x.slug === slug)
  if (!h) return null
  const img = HOUSE_IMAGES[slug]
  const from = Math.min(...h.prices.map(x => x.eur))
  const to = Math.max(...h.prices.map(x => x.eur))

  return {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    '@id': `${SITE}/${lang}/majad/${slug}#accommodation`,
    name: h.name[lang],
    description: h.items.map(i => i[lang].replace(/ · /g, ', ')).join('. ') + '.',
    url: `${SITE}/${lang}/majad/${slug}`,
    /*
     * Every photograph on the house's page, not just the cover. Image search and the
     * assistants both take this list; there are between nine and eighteen per house and
     * they were all described in three languages, which is wasted if only one is offered.
     */
    image: [
      ...(img ? [`${SITE}${img.src}`] : []),
      ...(HOUSE_GALLERIES[slug as keyof typeof HOUSE_GALLERIES] ?? []).map(p => `${SITE}${p.src}`),
    ],
    /*
     * `sleeps`, not the top price tier. The tiers cap at four, so the schema had been
     * telling every crawler that the Sauna House sleeps four while the page beside it
     * said five. A capacity is exactly the kind of fact an assistant repeats verbatim.
     */
    occupancy: {
      '@type': 'QuantitativeValue',
      value: h.sleeps,
      unitText: 'guests',
    },
    /*
     * The published rate as an Offer. The prices are on the page already; giving them a
     * currency and a unit is what lets a search engine or an assistant say "from €150 a
     * night" instead of guessing. `unitCode: DAY` because these are per night for the
     * whole house, not per person.
     */
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: from,
        priceCurrency: 'EUR',
        unitCode: 'DAY',
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' },
      },
      url: `${SITE}/${lang}/majad/${slug}`,
    },
    numberOfBedrooms: slug === 'metsamaja' ? 2 : undefined,
    containedInPlace: { '@id': `${SITE}/#lodging` },
    /*
     * Keyed, not a ternary chain. It was `et ? … : ru ? … : [English]`, which quietly sent
     * German down the English branch — the live German house pages were publishing "Pond"
     * and "Hiking trails" in their structured data. A fall-through fallback is fine until
     * the day a locale is added, and then it is a silent bug. Same shape as `amenities`
     * in jsonLd() above, so the compiler now demands a value for every language.
     */
    amenityFeature: [
      ...(slug === 'saunamaja' ? [SAUNA_AMENITY[lang]] : []),
      ...HOUSE_AMENITIES[lang],
    ].map(n => ({
      '@type': 'LocationFeatureSpecification',
      name: n,
      value: true,
    })),
    /*
     * Tiigimaja and Metsamaja shut from 1 December to 31 March. Published so a search
     * result cannot offer a night in a house that is closed — the site already refuses
     * those dates in the calendar, and the schema should say the same thing.
     */
    ...(CLOSED_SEASONS[slug as HouseSlug]
      ? {
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            validFrom: '--04-01',
            validThrough: '--11-30',
          },
        }
      : {}),
    potentialAction: {
      '@type': 'ReserveAction',
      target: `${SITE}/${lang}/majad/${slug}#broneeri`,
    },
    priceRange: from === to ? `€${from}` : `€${from}–€${to}`,
  }
}

/**
 * LodgingBusiness structured data. Only facts verifiable from the site itself are
 * included — no invented phone number, price band or rating. Third-party review
 * scores are deliberately not marked up as aggregateRating.
 */
export function jsonLd(lang: Lang) {
  const houses: Record<Lang, string[]> = {
    et: ['Saunamaja', 'Tiigimaja', 'Metsamaja'],
    en: ['Sauna House', 'Pond House', 'Forest House'],
    ru: ['Банный дом', 'Прудовой дом', 'Лесной дом'],
    de: ['Saunahaus', 'Teichhaus', 'Waldhaus'],
    es: ['Casa de la Sauna', 'Casa del Estanque', 'Casa del Bosque'],
    sv: ['Bastuhuset', 'Dammhuset', 'Skogshuset'],
    fi: ['Saunatalo', 'Lampitalo', 'Metsätalo'],
    lv: ['Pirts māja', 'Dīķa māja', 'Meža māja'],
  }
  const amenities: Record<Lang, string[]> = {
    et: ['Saun', 'Tiik', 'Mets', 'Matkarajad'],
    en: ['Sauna', 'Pond', 'Forest', 'Hiking trails'],
    ru: ['Сауна', 'Пруд', 'Лес', 'Туристические тропы'],
    de: ['Sauna', 'Teich', 'Wald', 'Wanderwege'],
    es: ['Sauna', 'Estanque', 'Bosque', 'Senderos'],
    sv: ['Bastu', 'Damm', 'Skog', 'Vandringsleder'],
    fi: ['Sauna', 'Lampi', 'Metsä', 'Retkeilyreitit'],
    lv: ['Pirts', 'Dīķis', 'Mežs', 'Pārgājienu takas'],
  }
  /*
   * Parking true and WiFi FALSE. Marking an absent amenity `false` is the point of the
   * boolean — a filter that hides places without WiFi should hide this one, and a guest
   * who needs to work should learn it here rather than on arrival. Leaving it out
   * entirely says "unknown", which is the one answer that helps nobody.
   */
  const facilities: Record<Lang, [string, boolean][]> = {
    et: [['Tasuta parkimine', true], ['WiFi', false], ['Mobiilne andmeside', true]],
    en: [['Free parking', true], ['WiFi', false], ['Mobile data coverage', true]],
    ru: [['Бесплатная парковка', true], ['Wi-Fi', false], ['Мобильная связь', true]],
    de: [['Kostenlose Parkplätze', true], ['WLAN', false], ['Mobilfunkempfang', true]],
    es: [['Aparcamiento gratuito', true], ['WiFi', false], ['Cobertura móvil', true]],
    sv: [['Gratis parkering', true], ['WiFi', false], ['Mobiltäckning', true]],
    fi: [['Ilmainen pysäköinti', true], ['WiFi', false], ['Mobiiliverkon kuuluvuus', true]],
    lv: [['Bezmaksas autostāvvieta', true], ['WiFi', false], ['Mobilo sakaru pārklājums', true]],
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE}/#lodging`,
    name: 'Oanduaia',
    url: `${SITE}/${lang}`,
    description: META[lang].description,
    email: 'info@oanduaia.ee',
    image: [`${SITE}/images/og.jpg`, `${SITE}/images/saunamaja.jpg`, `${SITE}/images/metsamaja.jpg`],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Oandu',
      postalCode: '45432',
      addressRegion: 'Lääne-Virumaa',
      addressCountry: 'EE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 59.5601919, longitude: 26.1067858 },
    containedInPlace: {
      '@type': 'Place',
      name: PARK_NAME[lang],
    },
    numberOfRooms: 3,
    // 4 + 2 + 4. A child's extra bed can be added to any house but is not a standing place.
    maximumAttendeeCapacity: 10,
    // Published nightly rates for the whole house: 100 € (Metsamaja 1–2)
    // to 300 € (Saunamaja 3–4). Nothing inferred beyond the numbers on the page.
    priceRange: '€100–€300',
    currenciesAccepted: 'EUR',
    checkinTime: '14:00',
    checkoutTime: '12:00',
    // Published on the booking section: pets welcome, 20 € fee. Do not assert
    // any policy here that is not stated on the page.
    petsAllowed: true,
    amenityFeature: [
      ...amenities[lang].map(name => ({
        '@type': 'LocationFeatureSpecification',
        name,
        value: true,
      })),
      ...facilities[lang].map(([name, value]) => ({
        '@type': 'LocationFeatureSpecification',
        name,
        value,
      })),
    ],
    containsPlace: houses[lang].map((name, i) => ({
      '@type': 'Accommodation',
      name,
      // Occupancy figures are the ones stated in the site copy, nothing inferred.
      occupancy: { '@type': 'QuantitativeValue', value: [4, 2, 4][i], unitText: 'guests' },
      numberOfBedrooms: [undefined, undefined, 2][i],
      amenityFeature: amenities[lang].map(n => ({
        '@type': 'LocationFeatureSpecification', name: n, value: true,
      })),
    })),
    /*
     * The host's number, as published on the Google Business Profile. Name, address and
     * phone are cross-checked between sources; a number that lives on the profile and
     * nowhere else is a weaker signal than one that appears in both.
     */
    telephone: '+3725202044',
    hasMap: 'https://maps.google.com/?cid=9811987788853274564',
    /*
     * Facebook belongs here, not only on the WebSite node. This is the entity a search
     * engine ties a knowledge panel to, and sameAs is how it confirms that the profile
     * and the business are the same organisation.
     */
    sameAs: [
      'https://www.instagram.com/oanduaia/',
      'https://www.facebook.com/Oanduaia/',
      'https://www.booking.com/hotel/ee/oanduaia-saunamaja.html',
      'https://www.booking.com/hotel/ee/metsamaja.html',
      SOCIAL.mapsPlace,
    ],
    inLanguage: LOCALES.map(l => HREFLANG[l]),
  }
}

/**
 * WebSite + Organization block. Tells search and AI assistants that the three locale
 * URLs are one site, and which social profiles are authoritative.
 */
export function siteJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    name: 'Oanduaia',
    url: `${SITE}/${lang}`,
    description: META[lang].description,
    inLanguage: HREFLANG[lang],
    publisher: { '@id': `${SITE}/#lodging` },
    sameAs: [
      'https://www.instagram.com/oanduaia/',
      'https://www.facebook.com/Oanduaia/',
      'https://www.booking.com/hotel/ee/oanduaia-saunamaja.html',
      'https://www.booking.com/hotel/ee/metsamaja.html',
      SOCIAL.mapsPlace,
    ],
  }
}

/**
 * The questions people actually ask before booking, answered from copy already published
 * on this site — check-in times, the pet fee, the winter closures, the fact that there is
 * no instant booking.
 *
 * This is aimed at assistants more than at Google. An AI answering "can I bring a dog to
 * Oanduaia" has to find that sentence somewhere; a FAQPage node states it as a fact tied
 * to this business rather than leaving it as a line of body copy to be inferred from.
 *
 * Every answer here must stay traceable to something on the page. Nothing about deposits or
 * cleaning fees — none of that is published, and inventing it in schema would be worse than
 * silence. Cancellation IS published (Mikk, 23 Oct 2026): free up to 7 days before arrival,
 * no refund after; it also appears under the booking intro, on the pay page and in the
 * payment-link letter.
 */
export const FAQ: Record<Lang, [string, string][]> = {
  et: [
    ['Kui palju maju ja kohti on?',
     'Kolm eraldi maja kokku 10 külalisele: Saunamaja 4, Metsamaja 4 ja Tiigimaja 2 inimesele. Igasse majja saab lisaks lapse lisavoodi.'],
    ['Kui palju öömaja maksab?',
     'Hinnad on terve maja kohta öö kohta: Metsamaja alates 100 €, Tiigimaja alates 150 €, Saunamaja alates 200 €. Kõrghooajal, pühade ajal ja pikemate broneeringute puhul võivad hinnad erineda — küsi pakkumist.'],
    ['Kas ma rendin toa või terve maja?',
     'Terve maja. Iga maja renditakse tervikuna – ühiseid koridore ega teisi külalisi majas ei ole.'],
    ['Millises majas on saun?',
     'Saun on ainult Saunamajas ja kuulub selle maja hinna sisse. Tiigimaja ja Metsamaja hinnas saun ei sisaldu. Kui ööbid neist ühes ja soovid sauna kasutada, kirjuta meile – räägime, mis on võimalik. Tiik on kümne sammu kaugusel, talvel raiutakse jäässe auk.'],
    ['Kuidas broneerida?',
     'Kohest veebibroneeringut ei ole. Vaata saadavust kalendrist ja saada päring vormiga või kirjuta info@oanduaia.ee — vastame 24 tunni jooksul. Oleme ka Booking.comis.'],
    ['Milline maja sobib paarile ja milline perele?',
     'Tiigimaja on kahele – vaikseim kolmest, oma tiigi kaldal. Metsamaja sobib perele või kahele paarile: kaks eraldi magamistuba, neli kohta. Saunamaja on seltskonnale, neli kohta – ja see on ainus kolmest majast, kus on saun.'],
    ['Mis kell on saabumine ja lahkumine?',
     'Saabumine alates kell 14.00, lahkumine kell 12.00. Lühim broneering on üks öö.'],
    ['Kuidas maksta?',
     'Otse broneerides saab maksta sularahas kohapeal või kaardiga. Kaardivormi sellel lehel ei ole: kui oleme kuupäevad kinnitanud, saadame turvalise makselingi ja kaardiandmed sisestatakse Stripe\u2019i enda lehel – mitte meie omal ja mitte kunagi e-postiga. Toimivad kaart, Apple Pay ja Google Pay. Booking.comi kaudu broneerides võtab makse vastu Booking.com, otse broneerides maksad meile. Tasuda tuleb 14 päeva enne saabumist; makselink kehtib 4 päeva ja tasumata kuupäevad vabastatakse uuesti.'],
    ['Mis saab, kui pean broneeringu tühistama?',
     'Tühistamine on tasuta kuni 7 päeva enne saabumist – siis tagastame makstud summa täies ulatuses. Hiljem tühistades raha ei tagastata. Tühistamiseks kirjuta info@oanduaia.ee. Booking.comi kaudu tehtud broneeringutele kehtivad Booking.comi tingimused.'],
    ['Kas hommikusööki saab?',
     'Jah. Hommikusöök on 20 € inimese kohta hommikus — munad, peekon, puder, kohv. Lõuna, õhtusöök ja pidulik pikk laud tellitakse ette; küsi menüüd e-postiga.'],
    ['Kas lemmikloomad on lubatud?',
     'Jah. Lemmiklooma tasu on 20 € broneeringu kohta, mitte öö kohta. Kui majas on samal ajal ka teisi külalisi, palume koera hoida rihma otsas.'],
    ['Kas kõik majad on talvel avatud?',
     'Saunamaja on avatud aasta läbi. Tiigimaja ja Metsamaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill.'],
    ['Kas majades on WiFi?',
     'Ei ole — üheski majas WiFi-t ei ole. Mobiillevi on hea, nii et telefoni andmeside töötab. Parkimine on tasuta.'],
    ['Millest majad on ehitatud?',
     'Jämedatest palkidest massiivsed seinad, materjal Eesti metsast. Kipsplaati majades ei ole. Osal hoonetest on pilliroost katus.'],
    ['Kas tiigis saab ujuda?',
     'Jah, suvel. Talvel raiutakse sauna kõrvale jäässe auk.'],
    ['Kas läheduses saab väljas süüa?',
     'Palmse, Sagadi ja Vihula mõis ning Altja kõrts on lühikese sõidu kaugusel. Kohapeal valmistab perenaine hommikusöögi, lõuna või piduliku pika laua – need tuleb ette tellida.'],
    ['Kust matkarajad algavad?',
     'RMK Oandu külastuskeskusest, mis on jalutuskäigu kaugusel. Sealt algab kuus märgistatud rada, nende seas 370 km pikkune Oandu–Aegviidu–Ikla matkatee.'],
    ['Kas siin saab pidu või sündmust pidada?',
     'Jah, kokkuleppel. Kindlat reeglistikku ei ole – kirjuta, mida plaanid, ja me ütleme, kas see sobib. Mõõdupuu on lihtne: et see ei segaks teisi külalisi ega kahjustaks kohta. Pidulik pikk laud kaetakse ette tellides kahele kuni kümnele, suvel väliköögis kuni kahekümnele. Kirjuta info@oanduaia.ee.'],
    ['Kas lisavoodeid saab?',
     'Jah. Igasse majja saab lapsele lisavoodi, kokkuleppel broneerides. Täiskasvanute kohti on Saunamajas neli, Metsamajas neli ja Tiigimajas kaks. Kirjuta info@oanduaia.ee.'],
    ['Kui kaugel on Tallinn?',
     'Umbes 90 kilomeetrit, veidi üle tunni autoga. Tallinnast tuleb sõita Narva suunas ja Viitna juures põhja poole Lahemaale. Ühistranspordiga on tulek keeruline – enamik külalisi tuleb autoga.'],
    ['Kus Oanduaia asub?',
     'Oandu külas Lääne-Virumaal, Lahemaa rahvuspargis, metsa ja mere vahel — kolme mõisa, Palmse, Sagadi ja Vihula vahel.'],
    ['Kuidas teiega ühendust saada?',
     'Kirjuta info@oanduaia.ee või helista +372 5202 044. Vastame 24 tunni jooksul.'],
  ],
  en: [
    ['How many houses are there, and for how many guests?',
     'Three separate houses for 10 guests in total: the Sauna House sleeps 4, the Forest House 4 and the Pond House 2. An extra bed for a child can be added in any of them.'],
    ['What does a night cost?',
     'Prices are for the whole house, per night: the Forest House from €100, the Pond House from €150, the Sauna House from €200. Rates can differ in high season, over holidays and for longer stays — ask for an offer.'],
    ['Do I rent a room or the whole house?',
     'The whole house. Each house is rented whole — no shared corridors and no other guests inside.'],
    ['Which house has the sauna?',
     'Only the Sauna House has a sauna, and it is included in that house\u2019s price. It is not included with the Pond House or the Forest House. If you are staying in one of those and would like to use it, write to us and we will tell you what is possible. The pond is ten steps away, and in winter a hole is cut in the ice.'],
    ['How do I book?',
     'There is no instant online booking. Check the availability calendar, send an enquiry through the form or write to info@oanduaia.ee — we reply within 24 hours. We are also listed on Booking.com.'],
    ['Which house suits a couple, and which a family?',
     'The Pond House is for two — the quietest of the three, on the bank of its own pond. The Forest House suits a family or two couples: two separate bedrooms, four places. The Sauna House is for a group, four places \u2014 and it is the only one of the three with a sauna.'],
    ['What are the check-in and check-out times?',
     'Check-in is from 2 pm and check-out is at 12 noon. The minimum stay is one night.'],
    ['How do I pay?',
     'Booking directly, you can pay in cash on arrival or by card. There is no card form on this site: once we have confirmed your dates we send you a secure payment link, and the card details are entered on Stripe\u2019s own page — never on ours, and never by e-mail. Card, Apple Pay and Google Pay all work. If you book through Booking.com, Booking.com takes the payment; booking with us directly, it stays between us. Payment is due 14 days before arrival; the link is valid for 4 days, and unpaid dates are released again.'],
    ['What if I need to cancel?',
     'Cancellation is free up to 7 days before arrival, and we refund what you paid in full. After that, there is no refund. To cancel, write to info@oanduaia.ee. Bookings made through Booking.com follow Booking.com\u2019s terms.'],
    ['Is breakfast available?',
     'Yes. Breakfast is €20 per person per morning — eggs, bacon, porridge and coffee. Lunch, dinner and the festive long table are pre-ordered; ask for the menu by e-mail.'],
    ['Are pets allowed?',
     'Yes. The pet fee is €20 per stay, not per night. If other guests are on the property at the same time, dogs must be kept on a leash.'],
    ['Are all the houses open in winter?',
     'The Sauna House is open all year. The Pond House and the Forest House close for the winter, from 1 December to 31 March; their first night of the new season is 1 April.'],
    ['Is there WiFi?',
     'No — there is no WiFi in any of the houses. Mobile coverage is good, so a phone will work. Parking is free.'],
    ['What are the houses built of?',
     'Solid walls of thick, heavy logs, the timber from Estonian forest. There is no drywall in any of them. Several of the buildings carry a reed roof.'],
    ['Can I swim in the pond?',
     'Yes, in summer. In winter a hole is cut in the ice beside the sauna.'],
    ['Is there anywhere to eat nearby?',
     'Palmse, Sagadi and Vihula manors and the inn at Altja are a short drive away. Here, the host cooks breakfast, lunch or a festive long table — all ordered in advance.'],
    ['Where do the hiking trails start?',
     'At the RMK Oandu visitor centre, which is within walking distance. Six marked trails begin there, among them the 370 km Oandu–Aegviidu–Ikla route.'],
    ['Can we hold a celebration or an event here?',
     'Yes, by arrangement. There is no fixed rulebook — tell us what you have in mind and we will say whether it works. The test is simple: that it disturbs neither the other guests on the property nor the place itself. The festive long table is laid to order for two to ten people, and in summer for up to twenty in the outdoor kitchen. Write to info@oanduaia.ee.'],
    ['Can you add extra beds?',
     'Yes. An extra bed for a child can be added in any of the three houses, by arrangement when you book. There are places for four adults in the Sauna House, four in the Forest House and two in the Pond House. Write to info@oanduaia.ee.'],
    ['How far is Tallinn?',
     'About 90 kilometres, a little over an hour by car. From Tallinn you drive towards Narva and turn north into Lahemaa at Viitna. Public transport is awkward — most guests arrive by car.'],
    ['Where is Oanduaia?',
     'In Oandu village, Lääne-Virumaa, inside Lahemaa National Park in Estonia — between forest and sea, among three manors: Palmse, Sagadi and Vihula.'],
    ['How do I reach you?',
     'Write to info@oanduaia.ee or call +372 5202 044. We reply within 24 hours.'],
  ],
  ru: [
    ['Сколько домов и на сколько гостей?',
     'Три отдельных дома всего на 10 гостей: Банный дом — 4, Лесной — 4, Прудовой — 2 человека. В любой из них можно добавить детскую кровать.'],
    ['Сколько стоит ночь?',
     'Цены указаны за весь дом за ночь: Лесной дом от 100 €, Прудовой дом от 150 €, Банный дом от 200 €. В высокий сезон, в праздники и при длительном проживании цены могут отличаться — запросите предложение.'],
    ['Я снимаю комнату или весь дом?',
     'Весь дом. Каждый дом сдаётся целиком — общих коридоров и других гостей внутри нет.'],
    ['В каком доме есть баня?',
     'Баня есть только в Банном доме и входит в стоимость именно этого дома. В стоимость Прудового и Лесного дома баня не входит. Если вы остановились в одном из них и хотите воспользоваться баней, напишите нам — расскажем, что возможно. Пруд в десяти шагах, а зимой во льду прорубается прорубь.'],
    ['Как забронировать?',
     'Мгновенного онлайн-бронирования нет. Посмотрите календарь, отправьте запрос через форму или напишите на info@oanduaia.ee — отвечаем в течение 24 часов. Мы также есть на Booking.com.'],
    ['Какой дом подойдёт паре, а какой семье?',
     'Прудовой дом — для двоих, самый тихий из трёх, на берегу собственного пруда. Лесной дом подойдёт семье или двум парам: две отдельные спальни, четыре места. Банный дом — для компании, четыре места, и это единственный из трёх домов с баней.'],
    ['Во сколько заезд и выезд?',
     'Заезд с 14.00, выезд до 12.00. Минимальный срок — одна ночь.'],
    ['Как оплатить?',
     'При прямом бронировании оплатить можно наличными на месте или картой. Формы для ввода данных карты на этом сайте нет: после подтверждения дат мы отправляем защищённую ссылку на оплату, и данные карты вводятся на странице самого Stripe — не на нашей и никогда по электронной почте. Работают карта, Apple Pay и Google Pay. При бронировании через Booking.com оплату принимает Booking.com; напрямую у нас — это остаётся между нами. Оплата вносится за 14 дней до заезда; ссылка действительна 4 дня, неоплаченные даты снова освобождаются.'],
    ['Что если нужно отменить бронирование?',
     'Отмена бесплатна не позднее чем за 7 дней до заезда — тогда мы полностью возвращаем оплату. При более поздней отмене деньги не возвращаются. Чтобы отменить, напишите на info@oanduaia.ee. Для бронирований через Booking.com действуют условия Booking.com.'],
    ['Есть ли завтрак?',
     'Да. Завтрак — 20 € с человека за утро: яйца, бекон, каша, кофе. Обед, ужин и праздничный стол заказываются заранее — запросите меню по электронной почте.'],
    ['Можно ли с питомцами?',
     'Да. Плата за питомца — 20 € за проживание, а не за ночь. Если на территории одновременно находятся другие гости, собаку просим держать на поводке.'],
    ['Все ли дома открыты зимой?',
     'Банный дом открыт круглый год. Прудовой и Лесной дома закрыты на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля.'],
    ['Есть ли Wi-Fi?',
     'Нет — Wi-Fi нет ни в одном из домов. Мобильная связь хорошая, так что телефон работает. Парковка бесплатная.'],
    ['Из чего построены дома?',
     'Массивные стены из толстых брёвен, дерево из эстонского леса. Гипсокартона в домах нет. На части построек — камышовая крыша.'],
    ['Можно ли купаться в пруду?',
     'Да, летом. Зимой рядом с баней во льду прорубается прорубь.'],
    ['Есть ли поблизости где поесть?',
     'Мызы Палмсе, Сагади и Вихула и корчма в Алтья — в нескольких минутах езды. На месте хозяйка готовит завтрак, обед или праздничный длинный стол — по предварительному заказу.'],
    ['Откуда начинаются туристические тропы?',
     'От центра посетителей RMK в Оанду, до которого можно дойти пешком. Оттуда начинаются шесть маркированных троп, среди них 370-километровый маршрут Оанду–Аэгвийду–Икла.'],
    ['Можно ли провести здесь праздник или мероприятие?',
     'Да, по договорённости. Жёстких правил нет — напишите, что вы задумали, и мы скажем, подходит ли это. Критерий простой: чтобы это не мешало другим гостям и не вредило самому месту. Праздничный длинный стол накрывают по предварительному заказу от двух до десяти человек, летом в летней кухне — до двадцати. Напишите на info@oanduaia.ee.'],
    ['Можно ли добавить кровати?',
     'Да. В любой из трёх домов можно поставить детскую дополнительную кровать, по договорённости при бронировании. Взрослых мест: четыре в Банном доме, четыре в Лесном и два в Прудовом. Напишите на info@oanduaia.ee.'],
    ['Далеко ли до Таллинна?',
     'Около 90 километров, чуть больше часа на машине. Из Таллинна нужно ехать в сторону Нарвы и у Вийтна свернуть на север, в Лахемаа. Общественным транспортом добираться неудобно — большинство гостей приезжают на машине.'],
    ['Где находится Oanduaia?',
     'В деревне Оанду, Ляэне-Вирумаа, в национальном парке Лахемаа в Эстонии — между лесом и морем, среди трёх мыз: Палмсе, Сагади и Вихула.'],
    ['Как с вами связаться?',
     'Напишите на info@oanduaia.ee или позвоните +372 5202 044. Мы отвечаем в течение 24 часов.'],
  ],
  de: [
    ['Wie viele Häuser gibt es, und für wie viele Gäste?',
     'Drei separate Häuser für insgesamt 10 Gäste: das Saunahaus bietet 4 Personen Platz, das Waldhaus 4 und das Teichhaus 2. In jedem von ihnen kann ein Zusatzbett für ein Kind aufgestellt werden.'],
    ['Was kostet eine Nacht?',
     'Die Preise gelten für das ganze Haus pro Nacht: Waldhaus ab 100 €, Teichhaus ab 150 €, Saunahaus ab 200 €. In der Hochsaison, an Feiertagen und bei längeren Aufenthalten können die Preise abweichen – fragen Sie nach einem Angebot.'],
    ['Miete ich ein Zimmer oder das ganze Haus?',
     'Das ganze Haus. Jedes Haus wird als Ganzes vermietet — keine gemeinsamen Flure und keine anderen Gäste im Haus.'],
    ['In welchem Haus ist die Sauna?',
     'Nur das Saunahaus hat eine Sauna, und sie ist im Preis dieses Hauses enthalten. Im Preis von Teichhaus und Waldhaus ist sie nicht enthalten. Wenn Sie in einem davon wohnen und die Sauna nutzen m\u00f6chten, schreiben Sie uns \u2013 wir sagen Ihnen, was m\u00f6glich ist. Der Teich ist zehn Schritte entfernt, im Winter wird ein Loch ins Eis geschnitten.'],
    ['Wie buche ich?',
     'Es gibt keine sofortige Online-Buchung. Sehen Sie im Belegungskalender nach, senden Sie eine Anfrage über das Formular oder schreiben Sie an info@oanduaia.ee – wir antworten innerhalb von 24 Stunden. Sie finden uns auch auf Booking.com.'],
    ['Welches Haus passt für ein Paar, welches für eine Familie?',
     'Das Teichhaus ist für zwei — das ruhigste der drei, am Ufer des eigenen Teichs. Das Waldhaus passt für eine Familie oder zwei Paare: zwei getrennte Schlafzimmer, vier Plätze. Das Saunahaus ist für eine Gruppe, vier Plätze – und es ist das einzige der drei Häuser mit Sauna.'],
    ['Wann sind Anreise und Abreise?',
     'Anreise ab 14.00 Uhr, Abreise bis 12.00 Uhr. Die Mindestaufenthaltsdauer beträgt eine Nacht.'],
    ['Wie wird bezahlt?',
     'Bei einer Direktbuchung können Sie bar bei der Anreise oder mit Karte zahlen. Auf dieser Website gibt es kein Kartenformular: Sobald wir Ihren Aufenthalt bestätigt haben, senden wir Ihnen einen sicheren Zahlungslink, und die Kartendaten werden auf der Seite von Stripe eingegeben – nicht auf unserer und niemals per E-Mail. Karte, Apple Pay und Google Pay funktionieren. Buchen Sie über Booking.com, wickelt Booking.com die Zahlung ab; buchen Sie direkt bei uns, bleibt es zwischen uns. Die Zahlung ist 14 Tage vor der Anreise fällig; der Link gilt 4 Tage, unbezahlte Termine werden wieder freigegeben.'],
    ['Was ist, wenn ich stornieren muss?',
     'Die Stornierung ist bis 7 Tage vor der Anreise kostenlos – dann erstatten wir den gezahlten Betrag vollständig. Danach gibt es keine Erstattung. Zum Stornieren schreiben Sie an info@oanduaia.ee. Für Buchungen über Booking.com gelten die Bedingungen von Booking.com.'],
    ['Gibt es Frühstück?',
     'Ja. Das Frühstück kostet 20 € pro Person und Morgen – Eier, Speck, Porridge und Kaffee. Mittag- und Abendessen sowie die festliche lange Tafel werden vorbestellt; fragen Sie die Karte per E-Mail an.'],
    ['Sind Haustiere erlaubt?',
     'Ja. Die Gebühr beträgt 20 € pro Aufenthalt, nicht pro Nacht. Wenn gleichzeitig andere Gäste auf dem Grundstück sind, müssen Hunde an der Leine bleiben.'],
    ['Sind im Winter alle Häuser geöffnet?',
     'Das Saunahaus ist ganzjährig geöffnet. Teichhaus und Waldhaus sind im Winter vom 1. Dezember bis 31. März geschlossen; die erste Nacht der neuen Saison ist der 1. April.'],
    ['Gibt es WLAN?',
     'Nein – in keinem der Häuser gibt es WLAN. Der Mobilfunkempfang ist gut, das Telefon funktioniert also. Das Parken ist kostenlos.'],
    ['Woraus sind die Häuser gebaut?',
     'Massive Wände aus dicken, schweren Stämmen, das Holz aus estnischem Wald. Rigips gibt es in keinem davon. Mehrere der Gebäude tragen ein Reetdach.'],
    ['Kann man im Teich schwimmen?',
     'Ja, im Sommer. Im Winter wird neben der Sauna ein Loch ins Eis geschnitten.'],
    ['Gibt es in der Nähe etwas zu essen?',
     'Die Gutshöfe Palmse, Sagadi und Vihula und der Gasthof in Altja sind eine kurze Fahrt entfernt. Vor Ort kocht die Gastgeberin Frühstück, Mittagessen oder die festliche lange Tafel — alles auf Vorbestellung.'],
    ['Wo beginnen die Wanderwege?',
     'Am RMK-Besucherzentrum Oandu, das zu Fuß erreichbar ist. Dort beginnen sechs markierte Wege, darunter die 370 km lange Route Oandu–Aegviidu–Ikla.'],
    ['Können wir hier eine Feier oder Veranstaltung ausrichten?',
     'Ja, nach Absprache. Es gibt kein festes Regelwerk – sagen Sie uns, was Sie vorhaben, und wir sagen Ihnen, ob es geht. Der Maßstab ist einfach: Es darf weder die anderen Gäste auf dem Grundstück noch den Ort selbst stören. Die festliche lange Tafel wird auf Bestellung für zwei bis zehn Personen gedeckt, im Sommer in der Außenküche für bis zu zwanzig. Schreiben Sie an info@oanduaia.ee.'],
    ['Können Zusatzbetten aufgestellt werden?',
     'Ja. In jedem der drei Häuser kann nach Absprache bei der Buchung ein Zusatzbett für ein Kind aufgestellt werden. Für Erwachsene gibt es vier Plätze im Saunahaus, vier im Waldhaus und zwei im Teichhaus. Schreiben Sie an info@oanduaia.ee.'],
    ['Wie weit ist Tallinn entfernt?',
     'Etwa 90 Kilometer, gut eine Stunde mit dem Auto. Von Tallinn fährt man Richtung Narva und biegt bei Viitna nach Norden in den Lahemaa-Nationalpark ab. Mit öffentlichen Verkehrsmitteln ist die Anreise umständlich – die meisten Gäste kommen mit dem Auto.'],
    ['Wo liegt Oanduaia?',
     'Im Dorf Oandu, Kreis Lääne-Virumaa, im Nationalpark Lahemaa in Estland – zwischen Wald und Meer, zwischen den drei Gutshöfen Palmse, Sagadi und Vihula.'],
    ['Wie erreiche ich Sie?',
     'Schreiben Sie an info@oanduaia.ee oder rufen Sie +372 5202 044 an. Wir antworten innerhalb von 24 Stunden.'],
  ],
  es: [
    ['¿Cuántas casas hay y para cuántas personas?',
     'Tres casas independientes para 10 huéspedes en total: la Casa de la Sauna para 4, la Casa del Bosque para 4 y la Casa del Estanque para 2. En cualquiera de ellas se puede añadir una cama supletoria para un niño.'],
    ['¿Cuánto cuesta una noche?',
     'Los precios son por la casa entera y por noche: la Casa del Bosque desde 100 €, la Casa del Estanque desde 150 € y la Casa de la Sauna desde 200 €. En temporada alta, en festivos y en estancias largas los precios pueden variar : pide una oferta.'],
    ['¿Alquilo una habitación o la casa entera?',
     'La casa entera. Cada casa se alquila completa — sin pasillos compartidos ni otros huéspedes dentro.'],
    ['¿Qué casa tiene sauna?',
     'Solo la Casa de la Sauna tiene sauna, y está incluida en el precio de esa casa. No está incluida con la Casa del Estanque ni con la Casa del Bosque. Si te alojas en una de ellas y quieres usarla, escríbenos y te diremos qué es posible. El estanque está a diez pasos, y en invierno se abre un agujero en el hielo.'],
    ['¿Cómo reservo?',
     'No hay reserva instantánea en línea. Consulta el calendario de disponibilidad, envía una solicitud con el formulario o escribe a info@oanduaia.ee — respondemos en 24 horas. También estamos en Booking.com.'],
    ['¿Qué casa es para una pareja y cuál para una familia?',
     'La Casa del Estanque es para dos — la más tranquila de las tres, a orillas de su propio estanque. La Casa del Bosque es para una familia o dos parejas: dos dormitorios separados, cuatro plazas. La Casa de la Sauna es para un grupo, cuatro plazas — y es la única de las tres con sauna.'],
    ['¿A qué hora son la entrada y la salida?',
     'La entrada es a partir de las 14:00 y la salida a las 12:00. La estancia mínima es de una noche.'],
    ['¿Cómo se paga?',
     'Reservando directamente, puedes pagar en efectivo a la llegada o con tarjeta. En esta web no hay formulario de tarjeta: cuando confirmamos tus fechas te enviamos un enlace de pago seguro, y los datos de la tarjeta se introducen en la propia página de Stripe — nunca en la nuestra ni por correo. Funcionan tarjeta, Apple Pay y Google Pay. Si reservas por Booking.com, el pago lo gestiona Booking.com; reservando directamente con nosotros, queda entre nosotros. El pago vence 14 días antes de la llegada; el enlace es válido 4 días y las fechas sin pagar vuelven a quedar libres.'],
    ['¿Y si necesito cancelar?',
     'La cancelación es gratuita hasta 7 días antes de la llegada, y te devolvemos íntegramente lo pagado. Después no hay reembolso. Para cancelar, escribe a info@oanduaia.ee. Las reservas hechas por Booking.com siguen las condiciones de Booking.com.'],
    ['¿Hay desayuno?',
     'Sí. El desayuno cuesta 20 € por persona y mañana — huevos, beicon, gachas y café. La comida, la cena y la mesa larga de celebración se encargan con antelación; pide el menú por correo.'],
    ['¿Se admiten mascotas?',
     'Sí. La tarifa por mascota es de 20 € por estancia, no por noche. Si hay otros huéspedes en la finca al mismo tiempo, los perros deben ir con correa.'],
    ['¿Están todas las casas abiertas en invierno?',
     'La Casa de la Sauna abre todo el año. La Casa del Estanque y la Casa del Bosque cierran en invierno, del 1 de diciembre al 31 de marzo; su primera noche de la nueva temporada es el 1 de abril.'],
    ['¿Hay WiFi?',
     'No — no hay WiFi en ninguna de las casas. La cobertura móvil es buena, así que el teléfono funciona. El aparcamiento es gratuito.'],
    ['¿De qué están hechas las casas?',
     'Muros macizos de troncos gruesos, con madera de los bosques de Estonia. No hay pladur en ninguna. Varios de los edificios tienen tejado de junco.'],
    ['¿Se puede nadar en el estanque?',
     'Sí, en verano. En invierno se abre un agujero en el hielo junto a la sauna.'],
    ['¿Hay dónde comer cerca?',
     'Las casas señoriales de Palmse, Sagadi y Vihula y la taberna de Altja están a poca distancia en coche. Aquí, la anfitriona prepara desayuno, comida o una mesa larga de celebración — todo por encargo.'],
    ['¿Dónde empiezan los senderos?',
     'En el centro de visitantes RMK de Oandu, a un paseo de distancia. Allí empiezan seis senderos señalizados, entre ellos la ruta Oandu–Aegviidu–Ikla de 370 km.'],
    ['¿Podemos celebrar una fiesta o un evento aquí?',
     'Sí, previo acuerdo. No hay reglas fijas — cuéntanos lo que tienes en mente y te diremos si encaja. La medida es sencilla: que no moleste a los demás huéspedes ni dañe el lugar. La mesa larga de celebración se prepara por encargo para dos a diez personas, y en verano hasta veinte en la cocina exterior. Escribe a info@oanduaia.ee.'],
    ['¿Se pueden añadir camas supletorias?',
     'Sí. En cualquiera de las tres casas se puede añadir una cama supletoria para un niño, previo acuerdo al reservar. Las plazas de adulto son cuatro en la Casa de la Sauna, cuatro en la Casa del Bosque y dos en la Casa del Estanque. Escribe a info@oanduaia.ee.'],
    ['¿A qué distancia está Tallin?',
     'Unos 90 kilómetros, algo más de una hora en coche. Desde Tallin se va en dirección a Narva y en Viitna se gira al norte hacia Lahemaa. En transporte público es complicado — la mayoría de los huéspedes llega en coche.'],
    ['¿Dónde está Oanduaia?',
     'En el pueblo de Oandu, en Lääne-Virumaa, dentro del Parque Nacional de Lahemaa en Estonia — entre el bosque y el mar, entre tres casas señoriales: Palmse, Sagadi y Vihula.'],
    ['¿Cómo os contacto?',
     'Escribe a info@oanduaia.ee o llama al +372 5202 044. Respondemos en 24 horas.'],
  ],
  sv: [
    ['Hur många hus finns det, och för hur många gäster?',
     'Tre separata hus för totalt 10 gäster: Bastuhuset har plats för 4, Skogshuset för 4 och Dammhuset för 2. En extrasäng för ett barn kan ställas in i vilket av dem som helst.'],
    ['Vad kostar en natt?',
     'Priserna gäller hela huset per natt: Skogshuset från 100 €, Dammhuset från 150 €, Bastuhuset från 200 €. Under högsäsong, helgdagar och vid längre vistelser kan priserna skilja sig — be om en offert.'],
    ['Hyr jag ett rum eller hela huset?',
     'Hela huset. Varje hus hyrs ut i sin helhet — inga delade korridorer och inga andra gäster inne i huset.'],
    ['Vilket hus har bastu?',
     'Bara Bastuhuset har bastu, och den ingår i det husets pris. Den ingår inte i Dammhuset eller Skogshuset. Om du bor i något av dem och vill använda bastun, skriv till oss så berättar vi vad som är möjligt. Dammen ligger tio steg bort, och på vintern huggs en vak i isen.'],
    ['Hur bokar jag?',
     'Det finns ingen direktbokning online. Kolla tillgänglighetskalendern, skicka en förfrågan via formuläret eller skriv till info@oanduaia.ee — vi svarar inom 24 timmar. Vi finns också på Booking.com.'],
    ['Vilket hus passar ett par, och vilket en familj?',
     'Dammhuset är för två — det lugnaste av de tre, på stranden av sin egen damm. Skogshuset passar en familj eller två par: två separata sovrum, fyra platser. Bastuhuset är för ett sällskap, fyra platser — och det är det enda av de tre med bastu.'],
    ['När är incheckning och utcheckning?',
     'Incheckning från kl. 14.00 och utcheckning kl. 12.00. Kortaste vistelse är en natt.'],
    ['Hur betalar jag?',
     'Bokar du direkt kan du betala kontant vid ankomst eller med kort. Det finns fortfarande inget kortformulär på den här webbplatsen: när vi har bekräftat dina datum skickar vi en säker betalningslänk, och kortuppgifterna anges på Stripes egen sida — aldrig på vår och aldrig via e-post. Kort, Apple Pay och Google Pay fungerar. Bokar du via Booking.com tar Booking.com emot betalningen; bokar du direkt hos oss stannar det mellan oss. Betalningen ska vara gjord 14 dagar före ankomst; länken gäller i 4 dagar, och obetalda datum släpps igen.'],
    ['Vad händer om jag måste avboka?',
     'Avbokning är kostnadsfri fram till 7 dagar före ankomst, och då återbetalar vi hela beloppet. Därefter sker ingen återbetalning. Skriv till info@oanduaia.ee för att avboka. För bokningar via Booking.com gäller Booking.coms villkor.'],
    ['Serveras frukost?',
     'Ja. Frukost kostar 20 € per person och morgon — ägg, bacon, gröt och kaffe. Lunch, middag och det festliga långbordet beställs i förväg; be om menyn via e-post.'],
    ['Är husdjur tillåtna?',
     'Ja. Avgiften för husdjur är 20 € per vistelse, inte per natt. Om andra gäster finns på gården samtidigt ska hundar hållas kopplade.'],
    ['Är alla hus öppna på vintern?',
     'Bastuhuset är öppet året runt. Dammhuset och Skogshuset stänger för vintern, från 1 december till 31 mars; deras första natt för den nya säsongen är 1 april.'],
    ['Finns det wifi?',
     'Nej — det finns inget wifi i något av husen. Mobiltäckningen är god, så telefonen fungerar. Parkeringen är gratis.'],
    ['Vad är husen byggda av?',
     'Massiva väggar av grova, tunga timmerstockar, virket från estnisk skog. Det finns inga gipsskivor i något av dem. Flera av byggnaderna har vasstak.'],
    ['Kan man bada i dammen?',
     'Ja, på sommaren. På vintern huggs en vak i isen bredvid bastun.'],
    ['Finns det någonstans att äta i närheten?',
     'Herrgårdarna Palmse, Sagadi och Vihula och krogen i Altja ligger en kort bilresa bort. Här lagar värdinnan frukost, lunch eller ett festligt långbord — allt beställs i förväg.'],
    ['Var börjar vandringslederna?',
     'Vid RMK:s besökscenter i Oandu, som ligger på gångavstånd. Där börjar sex markerade leder, bland dem den 370 km långa leden Oandu–Aegviidu–Ikla.'],
    ['Kan vi ha en fest eller ett evenemang här?',
     'Ja, efter överenskommelse. Det finns inget fast regelverk — berätta vad du har i tankarna så säger vi om det fungerar. Måttstocken är enkel: att det varken stör de andra gästerna på gården eller själva platsen. Det festliga långbordet dukas på beställning för två till tio personer, och på sommaren för upp till tjugo i utomhusköket. Skriv till info@oanduaia.ee.'],
    ['Kan ni ställa in extrasängar?',
     'Ja. En extrasäng för ett barn kan ställas in i vilket som helst av de tre husen, efter överenskommelse när du bokar. Platserna för vuxna är fyra i Bastuhuset, fyra i Skogshuset och två i Dammhuset. Skriv till info@oanduaia.ee.'],
    ['Hur långt är det till Tallinn?',
     'Omkring 90 kilometer, drygt en timme med bil. Från Tallinn kör du mot Narva och svänger norrut in i Lahemaa vid Viitna. Kollektivtrafiken är krånglig — de flesta gäster kommer med bil.'],
    ['Var ligger Oanduaia?',
     'I byn Oandu i Lääne-Virumaa, i Lahemaa nationalpark i Estland — mellan skog och hav, bland tre herrgårdar: Palmse, Sagadi och Vihula.'],
    ['Hur når jag er?',
     'Skriv till info@oanduaia.ee eller ring +372 5202 044. Vi svarar inom 24 timmar.'],
  ],
  fi: [
    ['Montako taloa on ja kuinka monelle vieraalle?',
     'Kolme erillistä taloa yhteensä 10 vieraalle: Saunatalossa on tilaa 4:lle, Metsätalossa 4:lle ja Lampitalossa 2:lle. Mihin tahansa niistä voi lisätä lapselle lisävuoteen.'],
    ['Mitä yö maksaa?',
     'Hinnat ovat koko talosta yöltä: Metsätalo alkaen 100 €, Lampitalo alkaen 150 €, Saunatalo alkaen 200 €. Sesonkiaikana, pyhinä ja pidemmillä majoituksilla hinnat voivat poiketa — pyydä tarjous.'],
    ['Vuokraanko huoneen vai koko talon?',
     'Koko talon. Jokainen talo vuokrataan kokonaan — ei yhteisiä käytäviä eikä muita vieraita talossa.'],
    ['Missä talossa on sauna?',
     'Sauna on vain Saunatalossa, ja se sisältyy kyseisen talon hintaan. Lampitalon ja Metsätalon hintaan sauna ei sisälly. Jos majoitut jommassakummassa ja haluaisit käyttää saunaa, kirjoita meille, niin kerromme, mikä on mahdollista. Lampi on kymmenen askeleen päässä, ja talvella jäähän hakataan avanto.'],
    ['Miten varaan?',
     'Välitöntä verkkovarausta ei ole. Katso saatavuus kalenterista ja lähetä tiedustelu lomakkeella tai kirjoita osoitteeseen info@oanduaia.ee — vastaamme 24 tunnin kuluessa. Löydät meidät myös Booking.comista.'],
    ['Mikä talo sopii pariskunnalle, mikä perheelle?',
     'Lampitalo on kahdelle — kolmesta rauhallisin, oman lampensa rannalla. Metsätalo sopii perheelle tai kahdelle pariskunnalle: kaksi erillistä makuuhuonetta, neljä paikkaa. Saunatalo on seurueelle, neljä paikkaa — ja se on kolmesta ainoa, jossa on sauna.'],
    ['Mihin aikaan on tulo ja lähtö?',
     'Tulo klo 14.00 alkaen ja lähtö klo 12.00. Lyhin varaus on yksi yö.'],
    ['Miten maksan?',
     'Suoraan varatessasi voit maksaa käteisellä paikan päällä tai kortilla. Tällä sivustolla ei edelleenkään ole korttilomaketta: kun olemme vahvistaneet päivämääräsi, lähetämme sinulle turvallisen maksulinkin, ja kortin tiedot syötetään Stripen omalla sivulla — ei koskaan meidän sivullamme eikä sähköpostitse. Kortti, Apple Pay ja Google Pay toimivat. Jos varaat Booking.comin kautta, maksun ottaa vastaan Booking.com; suoraan meiltä varatessasi se jää meidän välillemme. Maksu erääntyy 14 päivää ennen saapumista; linkki on voimassa 4 päivää, ja maksamattomat päivät vapautetaan uudelleen.'],
    ['Entä jos minun täytyy perua varaus?',
     'Peruutus on maksuton viimeistään 7 päivää ennen saapumista, ja palautamme maksamasi summan kokonaan. Sen jälkeen maksua ei palauteta. Peruaksesi kirjoita osoitteeseen info@oanduaia.ee. Booking.comin kautta tehtyihin varauksiin sovelletaan Booking.comin ehtoja.'],
    ['Saako aamiaista?',
     'Kyllä. Aamiainen maksaa 20 € hengeltä aamua kohden — munia, pekonia, puuroa ja kahvia. Lounas, illallinen ja juhlava pitkä pöytä tilataan etukäteen; pyydä ruokalista sähköpostitse.'],
    ['Ovatko lemmikit sallittuja?',
     'Kyllä. Lemmikkimaksu on 20 € majoitusta kohden, ei yötä kohden. Jos alueella on samaan aikaan muita vieraita, koirat on pidettävä kytkettyinä.'],
    ['Ovatko kaikki talot auki talvella?',
     'Saunatalo on auki ympäri vuoden. Lampitalo ja Metsätalo ovat talven ajan kiinni 1. joulukuuta–31. maaliskuuta; uuden kauden ensimmäinen yö on 1. huhtikuuta.'],
    ['Onko taloissa WiFi?',
     'Ei — missään talossa ei ole WiFiä. Mobiiliverkko kuuluu hyvin, joten puhelin toimii. Pysäköinti on ilmainen.'],
    ['Mistä talot on rakennettu?',
     'Massiiviset seinät paksuista, raskaista hirsistä, puu virolaisesta metsästä. Kipsilevyä ei ole yhdessäkään niistä. Useassa rakennuksessa on ruokokatto.'],
    ['Voiko lammessa uida?',
     'Kyllä, kesällä. Talvella saunan viereen hakataan jäähän avanto.'],
    ['Missä lähistöllä voi syödä?',
     'Palmsen, Sagadin ja Vihulan kartanot sekä Altjan kievari ovat lyhyen ajomatkan päässä. Paikan päällä emäntä valmistaa aamiaisen, lounaan tai juhlavan pitkän pöydän — kaikki ennakkotilauksesta.'],
    ['Mistä retkeilyreitit alkavat?',
     'RMK:n Oandun luontokeskukselta, jonne on kävelymatka. Sieltä alkaa kuusi merkittyä reittiä, niiden joukossa 370 km pitkä Oandu–Aegviidu–Ikla-reitti.'],
    ['Voimmeko järjestää täällä juhlat tai tapahtuman?',
     'Kyllä, sopimuksen mukaan. Kiinteitä sääntöjä ei ole — kerro, mitä sinulla on mielessä, niin kerromme, sopiiko se. Mittapuu on yksinkertainen: ettei se häiritse muita alueen vieraita eikä itse paikkaa. Juhlava pitkä pöytä katetaan tilauksesta kahdesta kymmeneen hengelle, ja kesällä ulkokeittiöön jopa kahdellekymmenelle. Kirjoita osoitteeseen info@oanduaia.ee.'],
    ['Voiko lisävuoteita saada?',
     'Kyllä. Mihin tahansa kolmesta talosta voi lisätä lapselle lisävuoteen, kun siitä sovitaan varauksen yhteydessä. Aikuisten paikkoja on neljä Saunatalossa, neljä Metsätalossa ja kaksi Lampitalossa. Kirjoita osoitteeseen info@oanduaia.ee.'],
    ['Kuinka kaukana Tallinna on?',
     'Noin 90 kilometriä, vähän yli tunti autolla. Tallinnasta ajetaan Narvan suuntaan ja Viitnan kohdalla käännytään pohjoiseen Lahemaalle. Julkisilla kulkuneuvoilla matka on hankala — useimmat vieraat tulevat autolla.'],
    ['Missä Oanduaia sijaitsee?',
     'Oandun kylässä Länsi-Virumaalla, Lahemaan kansallispuistossa Virossa — metsän ja meren välissä, kolmen kartanon, Palmsen, Sagadin ja Vihulan, keskellä.'],
    ['Miten tavoitan teidät?',
     'Kirjoita osoitteeseen info@oanduaia.ee tai soita +372 5202 044. Vastaamme 24 tunnin kuluessa.'],
  ],
  lv: [
    ['Cik ir māju un cik viesiem?',
     'Trīs atsevišķas mājas kopā 10 viesiem: Pirts mājā ir vieta 4, Meža mājā 4 un Dīķa mājā 2 cilvēkiem. Jebkurā no tām var pievienot papildu gultu bērnam.'],
    ['Cik maksā nakts?',
     'Cenas ir par visu māju par nakti: Meža māja no 100 €, Dīķa māja no 150 €, Pirts māja no 200 €. Augstajā sezonā, svētku laikā un ilgākai uzturēšanās reizei cenas var atšķirties — pieprasiet piedāvājumu.'],
    ['Vai es īrēju istabu vai visu māju?',
     'Visu māju. Katra māja tiek izīrēta pilnībā — nav kopīgu gaiteņu un nav citu viesu mājā.'],
    ['Kurā mājā ir pirts?',
     'Pirts ir tikai Pirts mājā, un tā ir iekļauta šīs mājas cenā. Dīķa mājas un Meža mājas cenā pirts nav iekļauta. Ja apmetaties kādā no tām un vēlaties izmantot pirti, uzrakstiet mums — pastāstīsim, kas ir iespējams. Dīķis ir desmit soļu attālumā, un ziemā ledū izcērt āliņģi.'],
    ['Kā rezervēt?',
     'Tūlītējas tiešsaistes rezervācijas nav. Apskatiet pieejamības kalendāru, nosūtiet pieprasījumu ar veidlapu vai rakstiet uz info@oanduaia.ee — atbildam 24 stundu laikā. Mūs var atrast arī Booking.com.'],
    ['Kura māja piemērota pārim un kura ģimenei?',
     'Dīķa māja ir diviem — klusākā no trim, sava dīķa krastā. Meža māja piemērota ģimenei vai diviem pāriem: divas atsevišķas guļamistabas, četras vietas. Pirts māja ir kompānijai, četras vietas — un tā ir vienīgā no trim ar pirti.'],
    ['Cikos ir ierašanās un izbraukšana?',
     'Ierašanās no plkst. 14.00, izbraukšana plkst. 12.00. Īsākā uzturēšanās ir viena nakts.'],
    ['Kā samaksāt?',
     'Rezervējot tieši, varat maksāt skaidrā naudā uz vietas vai ar karti. Kartes veidlapas šajā vietnē joprojām nav: kad esam apstiprinājuši jūsu datumus, nosūtām jums drošu maksājuma saiti, un kartes dati tiek ievadīti pašā Stripe lapā — nekad ne mūsējā un nekad pa e-pastu. Darbojas karte, Apple Pay un Google Pay. Ja rezervējat caur Booking.com, maksājumu pieņem Booking.com; rezervējot tieši pie mums, tas paliek starp mums. Maksājums jāveic 14 dienas pirms ierašanās; saite ir derīga 4 dienas, un neapmaksātie datumi atkal tiek atbrīvoti.'],
    ['Ko darīt, ja jāatceļ rezervācija?',
     'Atcelšana ir bez maksas līdz 7 dienām pirms ierašanās, un mēs pilnībā atmaksājam samaksāto summu. Vēlāk atceļot, nauda netiek atmaksāta. Lai atceltu, rakstiet uz info@oanduaia.ee. Rezervācijām, kas veiktas caur Booking.com, piemēro Booking.com noteikumus.'],
    ['Vai ir pieejamas brokastis?',
     'Jā. Brokastis maksā 20 € vienai personai par rītu — olas, bekons, putra un kafija. Pusdienas, vakariņas un svētku garais galds jāpasūta iepriekš; ēdienkarti pieprasiet pa e-pastu.'],
    ['Vai drīkst ņemt līdzi mājdzīvniekus?',
     'Jā. Maksa par mājdzīvnieku ir 20 € par uzturēšanos, nevis par nakti. Ja teritorijā vienlaikus ir arī citi viesi, suņi jātur pie pavadas.'],
    ['Vai ziemā visas mājas ir atvērtas?',
     'Pirts māja ir atvērta visu gadu. Dīķa māja un Meža māja ziemā ir slēgtas no 1. decembra līdz 31. martam; jaunās sezonas pirmā nakts ir 1. aprīlī.'],
    ['Vai ir WiFi?',
     'Nē — nevienā no mājām nav WiFi. Mobilo sakaru pārklājums ir labs, tāpēc telefons darbojas. Autostāvvieta ir bez maksas.'],
    ['No kā mājas ir uzceltas?',
     'Masīvas sienas no resniem, smagiem baļķiem, koks no Igaunijas mežiem. Ģipškartona nav nevienā no tām. Vairākām ēkām ir niedru jumts.'],
    ['Vai dīķī var peldēties?',
     'Jā, vasarā. Ziemā blakus pirtij ledū izcērt āliņģi.'],
    ['Vai tuvumā var paēst?',
     'Palmses, Sagadi un Vihulas muižas un Altjas krogs ir neliela brauciena attālumā. Uz vietas saimniece gatavo brokastis, pusdienas vai svētku garo galdu — viss pēc iepriekšēja pasūtījuma.'],
    ['Kur sākas pārgājienu takas?',
     'Pie RMK Oandu apmeklētāju centra, līdz kuram var aiziet kājām. Tur sākas sešas marķētas takas, to vidū 370 km garais maršruts Oandu–Aegviidu–Ikla.'],
    ['Vai šeit var rīkot svinības vai pasākumu?',
     'Jā, pēc vienošanās. Stingru noteikumu nav — pastāstiet, ko esat iecerējuši, un mēs pateiksim, vai tas ir iespējams. Kritērijs ir vienkāršs: lai tas netraucētu citiem viesiem teritorijā un nekaitētu pašai vietai. Svētku garo galdu klāj pēc pasūtījuma no diviem līdz desmit cilvēkiem, bet vasarā āra virtuvē līdz divdesmit. Rakstiet uz info@oanduaia.ee.'],
    ['Vai var pievienot papildu gultas?',
     'Jā. Jebkurā no trim mājām pēc vienošanās, rezervējot, var pievienot papildu gultu bērnam. Pieaugušo vietas ir četras Pirts mājā, četras Meža mājā un divas Dīķa mājā. Rakstiet uz info@oanduaia.ee.'],
    ['Cik tālu ir Tallina?',
     'Apmēram 90 kilometri, nedaudz vairāk par stundu ar automašīnu. No Tallinas jābrauc Narvas virzienā un pie Viitnas jānogriežas uz ziemeļiem, Lahemā. Ar sabiedrisko transportu nokļūt ir neērti — lielākā daļa viesu ierodas ar automašīnu.'],
    ['Kur atrodas Oanduaia?',
     'Oandu ciemā, Lääne-Virumaa apriņķī, Lahemā nacionālajā parkā Igaunijā — starp mežu un jūru, trīs muižu — Palmses, Sagadi un Vihulas — vidū.'],
    ['Kā ar jums sazināties?',
     'Rakstiet uz info@oanduaia.ee vai zvaniet +372 5202 044. Mēs atbildam 24 stundu laikā.'],
  ],
}

export function faqJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/${lang}#faq`,
    inLanguage: HREFLANG[lang],
    about: { '@id': `${SITE}/#lodging` },
    mainEntity: FAQ[lang].map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

/** Home > Majad > this house. Gives search a path to show instead of a bare URL. */
export function breadcrumbJsonLd(lang: Lang, slug: string) {
  const h = T.feature.houses.find(x => x.slug === slug)
  if (!h) return null
  const majad: Record<Lang, string> = { et: 'Majad', en: 'Houses', ru: 'Дома', de: 'Häuser', es: 'Casas', sv: 'Hus', fi: 'Talot', lv: 'Mājas' }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Oanduaia', item: `${SITE}/${lang}` },
      { '@type': 'ListItem', position: 2, name: majad[lang], item: `${SITE}/${lang}#majad` },
      { '@type': 'ListItem', position: 3, name: h.name[lang], item: `${SITE}/${lang}/majad/${slug}` },
    ],
  }
}

/**
 * Per-trail metadata. The title carries the length, because "how long is it" is the
 * question people type — "Oandu nature trail 4.7 km" is closer to a real search than
 * any adjective would be.
 */
export function trailMeta(lang: Lang, slug: string) {
  const t = TRAILS.find(x => x.slug === slug)
  if (!t) return null
  const lead: Record<Lang, string> = {
    et: `${t.km} km, ${t.difficulty.et.toLowerCase()}. Algab: ${t.start.et}.`,
    en: `${trailKm(t, 'en')} km, ${t.difficulty.en.toLowerCase()}. Starts at ${t.start.en}.`,
    ru: `${t.km} км, ${t.difficulty.ru.toLowerCase()}. Начало: ${t.start.ru}.`,
    de: `${trailKm(t, 'de')} km, ${t.difficulty.de.toLowerCase()}. Start: ${t.start.de}.`,
    es: `${trailKm(t, 'es')} km, ${t.difficulty.es.toLowerCase()}. Inicio: ${t.start.es}.`,
    sv: `${trailKm(t, 'sv')} km, ${t.difficulty.sv.toLowerCase()}. Start: ${t.start.sv}.`,
    fi: `${trailKm(t, 'fi')} km, ${t.difficulty.fi.toLowerCase()}. Lähtö: ${t.start.fi}.`,
    lv: `${trailKm(t, 'lv')} km, ${t.difficulty.lv.toLowerCase()}. Sākums: ${t.start.lv}.`,
  }
  // Cyrillic takes the Cyrillic unit; "4,7 km" in a Russian title is half-translated.
  const unit: Record<Lang, string> = { et: 'km', en: 'km', ru: 'км', de: 'km', es: 'km', sv: 'km', fi: 'km', lv: 'km' }
  // Google cuts titles near 60 characters and descriptions near 155, mid-word. The park name
  // goes first when a long trail name leaves no room for it; the description ends on a word.
  const base = `${t.name[lang]} — ${trailKm(t, lang)} ${unit[lang]}`
  const withPark = `${base}, ${PARK_NAME[lang]} | Oanduaia`
  const full = `${lead[lang]} ${t.body[0][lang]}`
  const cut = full.length <= 155 ? full : `${full.slice(0, 154).replace(/[\s,;:.—–-]+\S*$/, '')}…`
  return {
    title: withPark.length <= 60 ? withPark : `${base} | Oanduaia`,
    description: cut,
  }
}

/**
 * A trail as a place, tied back to Lahemaa and to us. schema.org has no HikingTrail, so
 * TouristAttraction is the honest nearest type — it is a thing people travel to see.
 */
export function trailJsonLd(lang: Lang, slug: string) {
  const t = TRAILS.find(x => x.slug === slug)
  if (!t) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${SITE}/${lang}/rajad/${slug}#trail`,
    name: t.name[lang],
    description: t.body[0][lang],
    url: `${SITE}/${lang}/rajad/${slug}`,
    image: `${SITE}${t.photo}`,
    inLanguage: HREFLANG[lang],
    isAccessibleForFree: true,
    publicAccess: true,
    containedInPlace: { '@type': 'Place', name: PARK_NAME[lang] },
    // The length, as RMK publishes it. Comma decimals are Estonian; schema wants a dot.
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Length',
      value: t.km.replace(',', '.'),
      unitCode: 'KMT',
    },
    sameAs: t.rmk,
  }
}

/** Home > Loodus > this trail. */
export function trailBreadcrumb(lang: Lang, slug: string) {
  const t = TRAILS.find(x => x.slug === slug)
  if (!t) return null
  const nature: Record<Lang, string> = { et: 'Loodus', en: 'Nature', ru: 'Природа', de: 'Natur', es: 'Naturaleza', sv: 'Natur', fi: 'Luonto', lv: 'Daba' }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Oanduaia', item: `${SITE}/${lang}` },
      { '@type': 'ListItem', position: 2, name: nature[lang], item: `${SITE}/${lang}#loodus` },
      { '@type': 'ListItem', position: 3, name: t.name[lang], item: `${SITE}/${lang}/rajad/${slug}` },
    ],
  }
}

/** A landing page as a WebPage about the property, so the entity stays one entity. */
export function landingJsonLd(lang: Lang, id: string) {
  const l = LANDINGS.find(x => x.id === id)
  if (!l) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE}/${lang}/${l.slug[lang]}#page`,
    name: l.h1[lang],
    description: l.description[lang],
    url: `${SITE}/${lang}/${l.slug[lang]}`,
    inLanguage: HREFLANG[lang],
    primaryImageOfPage: `${SITE}${l.photo}`,
    about: { '@id': `${SITE}/#lodging` },
    isPartOf: { '@id': `${SITE}/#website` },
  }
}

/**
 * The page's own questions as an FAQPage. Separate from the site-wide FAQ: these answer
 * "where should I stay in Lahemaa", which is a different question from "what time is
 * check-in", and they belong to this page rather than to every page.
 */
export function landingFaqJsonLd(lang: Lang, id: string) {
  const l = LANDINGS.find(x => x.id === id)
  if (!l || !l.qa.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE}/${lang}/${l.slug[lang]}#faq`,
    inLanguage: HREFLANG[lang],
    about: { '@id': `${SITE}/#lodging` },
    mainEntity: l.qa.map(x => ({
      '@type': 'Question',
      name: x.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: x.a[lang] },
    })),
  }
}
