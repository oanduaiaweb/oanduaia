import { T, type Lang } from './translations'
import { HOUSE_IMAGES } from './houses'
import { TRAILS, trailKm } from './trails'
import { LANDINGS } from './landing'
import { HOUSE_GALLERIES } from './housePhotos'

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
      ? `${h.name[lang]} — ${kind}, ${p.titlePlace[lang]}, ${p.titleCountry[lang]} | Oanduaia`
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
    // 4 + 2 + 4. A child's extra bed can be added to any house but is not a standing place.
    maximumAttendeeCapacity: 10,
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
      occupancy: { '@type': 'QuantitativeValue', value: [4, 2, 4][i], unitText: 'guests' },
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
     'Kolm eraldi maja kokku 10 külalisele: Saunamaja 4, Metsamaja 4 ja Tiigimaja 2 inimesele. Igasse majja saab lisaks lapse lisavoodi.'],
    ['Kui palju öömaja maksab?',
     'Hinnad on terve maja kohta öö kohta: Tiigimaja ja Metsamaja alates 150 €, Saunamaja alates 200 €. Kõrghooajal, pühade ajal ja pikemate broneeringute puhul võivad hinnad erineda — küsi pakkumist.'],
    ['Mis kell on saabumine ja lahkumine?',
     'Saabumine alates kell 14.00, lahkumine kell 12.00. Lühim broneering on üks öö.'],
    ['Kuidas maksta?',
     'Otse broneerides käib makse pangaülekandega või sularahas kohapeal. Sellel lehel ei ole online-makset ega kaardivormi ja me ei küsi kaardiandmeid e-postiga. Booking.com-i kaudu broneerides võtab makse vastu Booking.com – otse meiega on see meie vahel.'],
    ['Kas siin saab pidu või sündmust pidada?',
     'Jah, kokkuleppel. Kindlat reeglistikku ei ole – kirjuta, mida plaanid, ja me ütleme, kas see sobib. Mõõdupuu on lihtne: et see ei segaks teisi külalisi ega kahjustaks kohta. Pidulik pikk laud kaetakse ette tellides kahele kuni kümnele, suvel väliköögis kuni kahekümnele. Kirjuta info@oanduaia.ee.'],
    ['Kas lisavoodeid saab?',
     'Jah. Igasse majja saab lapsele lisavoodi, kokkuleppel broneerides. Täiskasvanute kohti on Saunamajas neli, Metsamajas neli ja Tiigimajas kaks. Kirjuta info@oanduaia.ee.'],
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
     'Three separate houses for 10 guests in total: the Sauna House sleeps 4, the Forest House 4 and the Pond House 2. An extra bed for a child can be added in any of them.'],
    ['What does a night cost?',
     'Prices are for the whole house, per night: the Pond House and Forest House from €150, the Sauna House from €200. Rates can differ in high season, over holidays and for longer stays — ask for an offer.'],
    ['What are the check-in and check-out times?',
     'Check-in is from 2 pm and check-out is at 12 noon. The minimum stay is one night.'],
    ['How do I pay?',
     'Booking directly, you pay by bank transfer or in cash on arrival. There is no online payment or card form on this site, and we will never ask for card details by e-mail. If you book through Booking.com, Booking.com takes the payment; booking with us directly, it stays between us.'],
    ['Can we hold a celebration or an event here?',
     'Yes, by arrangement. There is no fixed rulebook — tell us what you have in mind and we will say whether it works. The test is simple: that it disturbs neither the other guests on the property nor the place itself. The festive long table is laid to order for two to ten people, and in summer for up to twenty in the outdoor kitchen. Write to info@oanduaia.ee.'],
    ['Can you add extra beds?',
     'Yes. An extra bed for a child can be added in any of the three houses, by arrangement when you book. The adult places are four in the Sauna House, four in the Forest House and two in the Pond House. Write to info@oanduaia.ee.'],
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
     'Три отдельных дома всего на 10 гостей: Банный дом — 4, Лесной — 4, Прудовой — 2 человека. В любой из них можно добавить детскую кровать.'],
    ['Сколько стоит ночь?',
     'Цены указаны за весь дом за ночь: Прудовой и Лесной дом от 150 €, Банный дом от 200 €. В высокий сезон, в праздники и при длительном проживании цены могут отличаться — запросите предложение.'],
    ['Во сколько заезд и выезд?',
     'Заезд с 14.00, выезд до 12.00. Минимальный срок — одна ночь.'],
    ['Как оплатить?',
     'При прямом бронировании оплата банковским переводом или наличными на месте. На этом сайте нет онлайн-оплаты и формы карты, и мы никогда не спрашиваем данные карты по электронной почте. При бронировании через Booking.com оплату принимает Booking.com; напрямую у нас — это остаётся между нами.'],
    ['Можно ли провести здесь праздник или мероприятие?',
     'Да, по договорённости. Жёстких правил нет — напишите, что вы задумали, и мы скажем, подходит ли это. Критерий простой: чтобы это не мешало другим гостям и не вредило самому месту. Праздничный длинный стол накрывают по предварительному заказу на двух-десять человек, летом в летней кухне — до двадцати. Напишите на info@oanduaia.ee.'],
    ['Можно ли добавить кровати?',
     'Да. В любой из трёх домов можно поставить детскую дополнительную кровать, по договорённости при бронировании. Взрослых мест: четыре в Банном доме, четыре в Лесном и два в Прудовом. Напишите на info@oanduaia.ee.'],
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

/**
 * Per-trail metadata. The title carries the length, because "how long is it" is the
 * question people type — "Oandu nature trail 4.7 km" is closer to a real search than
 * any adjective would be.
 */
export function trailMeta(lang: Lang, slug: string) {
  const t = TRAILS.find(x => x.slug === slug)
  if (!t) return null
  const place: Record<Lang, string> = {
    et: 'Lahemaa rahvuspark',
    en: 'Lahemaa National Park',
    ru: 'Национальный парк Лахемаа',
  }
  const lead: Record<Lang, string> = {
    et: `${t.km} km, ${t.difficulty.et.toLowerCase()}. Algab: ${t.start.et}.`,
    en: `${trailKm(t, 'en')} km, ${t.difficulty.en.toLowerCase()}. Starts at ${t.start.en}.`,
    ru: `${t.km} км, ${t.difficulty.ru.toLowerCase()}. Начало: ${t.start.ru}.`,
  }
  // Cyrillic takes the Cyrillic unit; "4,7 km" in a Russian title is half-translated.
  const unit: Record<Lang, string> = { et: 'km', en: 'km', ru: 'км' }
  return {
    title: `${t.name[lang]} — ${trailKm(t, lang)} ${unit[lang]}, ${place[lang]} | Oanduaia`,
    description: `${lead[lang]} ${t.body[0][lang].slice(0, 150)}`.slice(0, 300),
  }
}

/**
 * A trail as a place, tied back to Lahemaa and to us. schema.org has no HikingTrail, so
 * TouristAttraction is the honest nearest type — it is a thing people travel to see.
 */
export function trailJsonLd(lang: Lang, slug: string) {
  const t = TRAILS.find(x => x.slug === slug)
  if (!t) return null
  const park: Record<Lang, string> = {
    et: 'Lahemaa rahvuspark',
    en: 'Lahemaa National Park',
    ru: 'Национальный парк Лахемаа',
  }
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
    containedInPlace: { '@type': 'Place', name: park[lang] },
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
  const nature: Record<Lang, string> = { et: 'Loodus', en: 'Nature', ru: 'Природа' }
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
