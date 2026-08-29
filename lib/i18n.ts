import { T, type Lang } from './translations'
import { HOUSE_IMAGES } from './houses'

export const LOCALES: Lang[] = ['et', 'en', 'ru']
export const DEFAULT_LOCALE: Lang = 'et'

export const SITE = 'https://www.oanduaia.ee'

/** BCP-47 tags used for hreflang. */
export const HREFLANG: Record<Lang, string> = {
  et: 'et-EE',
  en: 'en',
  ru: 'ru',
}

export function isLocale(v: string | undefined): v is Lang {
  return !!v && (LOCALES as string[]).includes(v)
}

/** Per-locale metadata. Kept here rather than in translations.ts so it stays SEO-shaped. */
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
      'Kolm palkmaja puuküttega sauna ja tiigiga Lahemaa rahvuspargis, metsa ja mere vahel. Saunamaja, Tiigimaja ja Metsamaja Oandu külas. Booking.com hinnang 9.6/10.',
    ogLocale: 'et_EE',
  },
  en: {
    title: 'Oanduaia — sauna and forest cabins in Lahemaa, Estonia',
    description:
      'Three Estonian log cabins with a wood-fired sauna in Lahemaa National Park, between forest and sea. Sauna House, Pond House and Forest House. Rated 9.6/10 on Booking.com.',
    ogLocale: 'en_GB',
  },
  ru: {
    title: 'Oanduaia — баня и лесные дома в Лахемаа, Эстония',
    description:
      'Три деревянных дома с дровяной баней в национальном парке Лахемаа, Эстония — между лесом и морем. Банный, Прудовой и Лесной дом в деревне Оанду. 9.6/10 на Booking.com.',
    ogLocale: 'ru_RU',
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
      'Over a hundred photographs of the three Oanduaia log cabins, the wood-fired sauna, the pond and Lahemaa National Park — summer through winter, in Oandu village, Estonia.',
  },
  ru: {
    title: 'Галерея — дома с баней в Лахемаа, Эстония | Oanduaia',
    description:
      'Более ста фотографий трёх домов Oanduaia, дровяной бани, пруда и национального парка Лахемаа — от лета до зимы, деревня Оанду, Эстония.',
  },
}

/** Builds the canonical + hreflang alternates block for a given path suffix ('' or '/gallery'). */
export function alternates(lang: Lang, suffix = '') {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) languages[HREFLANG[l]] = `${SITE}/${l}${suffix}`
  languages['x-default'] = `${SITE}/${DEFAULT_LOCALE}${suffix}`
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
  return {
    title: kind
      ? `${h.name[lang]} — ${kind}, Lahemaa, ${p.titleCountry[lang]} | Oanduaia`
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
    image: img ? `${SITE}${img.src}` : undefined,
    // The priced tiers cap at 4; Saunamaja sleeps 5, which the page says in its own words.
    occupancy: {
      '@type': 'QuantitativeValue',
      value: Math.max(...h.prices.map(x => x.upTo)),
      unitText: 'guests',
    },
    numberOfBedrooms: slug === 'metsamaja' ? 2 : undefined,
    containedInPlace: { '@id': `${SITE}/#lodging` },
    amenityFeature: (lang === 'et'
      ? ['Saun', 'Tiik', 'Mets', 'Matkarajad']
      : lang === 'ru'
        ? ['Сауна', 'Пруд', 'Лес', 'Туристические тропы']
        : ['Sauna', 'Pond', 'Forest', 'Hiking trails']
    ).map(n => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
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
  }
  const amenities: Record<Lang, string[]> = {
    et: ['Saun', 'Tiik', 'Mets', 'Matkarajad'],
    en: ['Sauna', 'Pond', 'Forest', 'Hiking trails'],
    ru: ['Сауна', 'Пруд', 'Лес', 'Туристические тропы'],
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
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE}/#lodging`,
    name: 'Oanduaia',
    url: `${SITE}/${lang}`,
    description: META[lang].description,
    email: 'info@oanduaia.ee',
    image: [`${SITE}/images/tiik.jpg`, `${SITE}/images/saunamaja.jpg`, `${SITE}/images/metsamaja.jpg`],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Oandu',
      addressRegion: 'Lääne-Virumaa',
      addressCountry: 'EE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 59.5601919, longitude: 26.1067858 },
    containedInPlace: {
      '@type': 'Place',
      name: lang === 'ru' ? 'Национальный парк Лахемаа' : lang === 'en' ? 'Lahemaa National Park' : 'Lahemaa rahvuspark',
    },
    numberOfRooms: 3,
    maximumAttendeeCapacity: 11,
    // Published nightly rates for the whole house: 150 € (Tiigimaja, Metsamaja 1–2)
    // to 300 € (Saunamaja 3–4). Nothing inferred beyond the numbers on the page.
    priceRange: '€150–€300',
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
      occupancy: { '@type': 'QuantitativeValue', value: [5, 2, 4][i], unitText: 'guests' },
      numberOfBedrooms: [undefined, undefined, 2][i],
      amenityFeature: amenities[lang].map(n => ({
        '@type': 'LocationFeatureSpecification', name: n, value: true,
      })),
    })),
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
 * Every answer here must stay traceable to something on the page. Nothing about deposits,
 * cancellation or cleaning fees — none of that is published, and inventing it in schema
 * would be worse than silence.
 */
export const FAQ: Record<Lang, [string, string][]> = {
  et: [
    ['Kui kaugel on Tallinn?',
     'Umbes 90 kilomeetrit, veidi üle tunni autoga. Tallinnast tuleb sõita Narva suunas ja Viitna juures põhja poole Lahemaale. Ühistranspordiga on tulek keeruline – enamik külalisi tuleb autoga.'],
    ['Kus Oanduaia asub?',
     'Oandu külas Lääne-Virumaal, Lahemaa rahvuspargis, metsa ja mere vahel — kolme mõisa, Palmse, Sagadi ja Vihula vahel.'],
    ['Kui palju maju ja kohti on?',
     'Kolm eraldi maja kokku 11 külalisele: Saunamaja kuni 5, Metsamaja 4 ja Tiigimaja 2 inimesele.'],
    ['Kui palju öömaja maksab?',
     'Hinnad on terve maja kohta öö kohta: Tiigimaja ja Metsamaja alates 150 €, Saunamaja alates 200 €. Kõrghooajal, pühade ajal ja pikemate broneeringute puhul võivad hinnad erineda — küsi pakkumist.'],
    ['Mis kell on saabumine ja lahkumine?',
     'Saabumine alates kell 14.00, lahkumine kell 12.00. Lühim broneering on üks öö.'],
    ['Kas lemmikloomad on lubatud?',
     'Jah. Lemmiklooma tasu on 20 € broneeringu kohta, mitte öö kohta. Kui majas on samal ajal ka teisi külalisi, palume koera hoida rihma otsas.'],
    ['Kas hommikusööki saab?',
     'Jah. Hommikusöök on 20 € inimese kohta hommikus — munad, peekon, puder, kohv. Lõuna, õhtusöök ja pidulik pikk laud tellitakse ette; küsi menüüd e-postiga.'],
    ['Kas kõik majad on talvel avatud?',
     'Saunamaja on avatud aasta läbi. Tiigimaja ja Metsamaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill.'],
    ['Kas majades on WiFi?',
     'Ei ole — üheski majas WiFi-t ei ole. Mobiillevi on hea, nii et telefoni andmeside töötab. Parkimine on tasuta.'],
    ['Kuidas broneerida?',
     'Kohest veebibroneeringut ei ole. Vaata saadavust kalendrist ja saada päring vormiga või kirjuta info@oanduaia.ee — vastame 24 tunni jooksul. Oleme ka Booking.comis.'],
  ],
  en: [
    ['How far is Tallinn?',
     'About 90 kilometres, a little over an hour by car. From Tallinn you drive towards Narva and turn north into Lahemaa at Viitna. Public transport is awkward — most guests arrive by car.'],
    ['Where is Oanduaia?',
     'In Oandu village, Lääne-Virumaa, inside Lahemaa National Park in Estonia — between forest and sea, among three manors: Palmse, Sagadi and Vihula.'],
    ['How many houses are there, and for how many guests?',
     'Three separate houses for 11 guests in total: the Sauna House sleeps up to 5, the Forest House 4 and the Pond House 2.'],
    ['What does a night cost?',
     'Prices are for the whole house, per night: the Pond House and Forest House from €150, the Sauna House from €200. Rates can differ in high season, over holidays and for longer stays — ask for an offer.'],
    ['What are the check-in and check-out times?',
     'Check-in is from 2 pm and check-out is at 12 noon. The minimum stay is one night.'],
    ['Are pets allowed?',
     'Yes. The pet fee is €20 per stay, not per night. If other guests are on the property at the same time, dogs must be kept on a leash.'],
    ['Is breakfast available?',
     'Yes. Breakfast is €20 per person per morning — eggs, bacon, porridge and coffee. Lunch, dinner and the festive long table are pre-ordered; ask for the menu by e-mail.'],
    ['Are all the houses open in winter?',
     'The Sauna House is open all year. The Pond House and the Forest House close for the winter, from 1 December to 31 March; their first night of the new season is 1 April.'],
    ['Is there WiFi?',
     'No — there is no WiFi in any of the houses. Mobile coverage is good, so a phone will work. Parking is free.'],
    ['How do I book?',
     'There is no instant online booking. Check the availability calendar, send an enquiry through the form or write to info@oanduaia.ee — we reply within 24 hours. We are also listed on Booking.com.'],
  ],
  ru: [
    ['Далеко ли до Таллинна?',
     'Около 90 километров, чуть больше часа на машине. Из Таллинна нужно ехать в сторону Нарвы и у Вийтна свернуть на север, в Лахемаа. Общественным транспортом добираться неудобно — большинство гостей приезжают на машине.'],
    ['Где находится Oanduaia?',
     'В деревне Оанду, Ляэне-Вирумаа, в национальном парке Лахемаа в Эстонии — между лесом и морем, среди трёх мыз: Палмсе, Сагади и Вихула.'],
    ['Сколько домов и на сколько гостей?',
     'Три отдельных дома всего на 11 гостей: Банный дом — до 5, Лесной дом — 4, Прудовой дом — 2 человека.'],
    ['Сколько стоит ночь?',
     'Цены указаны за весь дом за ночь: Прудовой и Лесной дом от 150 €, Банный дом от 200 €. В высокий сезон, в праздники и при длительном проживании цены могут отличаться — запросите предложение.'],
    ['Во сколько заезд и выезд?',
     'Заезд с 14.00, выезд до 12.00. Минимальный срок — одна ночь.'],
    ['Можно ли с питомцами?',
     'Да. Плата за питомца — 20 € за проживание, а не за ночь. Если на территории одновременно находятся другие гости, собаку просим держать на поводке.'],
    ['Есть ли завтрак?',
     'Да. Завтрак — 20 € с человека за утро: яйца, бекон, каша, кофе. Обед, ужин и праздничный стол заказываются заранее — запросите меню по электронной почте.'],
    ['Все ли дома открыты зимой?',
     'Банный дом открыт круглый год. Прудовой и Лесной дом закрыты на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля.'],
    ['Есть ли Wi-Fi?',
     'Нет — Wi-Fi нет ни в одном из домов. Мобильная связь хорошая, так что телефон работает. Парковка бесплатная.'],
    ['Как забронировать?',
     'Мгновенного онлайн-бронирования нет. Посмотрите календарь, отправьте запрос через форму или напишите на info@oanduaia.ee — отвечаем в течение 24 часов. Мы также есть на Booking.com.'],
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
  const majad: Record<Lang, string> = { et: 'Majad', en: 'Houses', ru: 'Дома' }
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
