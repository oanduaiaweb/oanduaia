import type { Lang } from './translations'

export type TrailLink = {
  href: string
  label: Record<Lang, string>
  /** Shown beside the label. Say the format and the weight before someone taps it. */
  meta: string
}

export type Trail = {
  slug: string
  /** Matches the Estonian name in T.trails.items, which is how the list finds its page. */
  key: string
  name: Record<Lang, string>
  /** RMK's figure, verbatim. Never our own estimate. */
  km: string
  difficulty: Record<Lang, string>
  /** Ours, derived from the distance — labelled as an estimate wherever it is shown. */
  hours: Record<Lang, string>
  start: Record<Lang, string>
  /** Two or three paragraphs. Everything here comes from RMK's own page for the trail. */
  body: Record<Lang, string>[]
  season: Record<Lang, string>
  /** RMK's page for this trail — the authority, and where the detail lives. */
  rmk: string
  /** A Lahemaa photograph, honestly captioned. See the note in components/Trail.tsx. */
  photo: string
  photoAlt: Record<Lang, string>
  link?: TrailLink
}

const FOREST = {
  et: 'Lahemaa mets Oandu lähedal',
  en: 'Lahemaa forest near Oandu',
  ru: 'Лес Лахемаа близ Оанду',
}

export const TRAILS: Trail[] = [
  {
    slug: 'oandu-aegviidu-ikla',
    key: 'Oandu–Aegviidu–Ikla matkatee',
    name: {
      et: 'RMK Oandu–Aegviidu–Ikla matkatee',
      en: 'RMK Oandu–Aegviidu–Ikla hiking route',
      ru: 'Маршрут RMK Оанду–Аэгвийду–Икла',
    },
    km: '370',
    difficulty: { et: 'Pikkajaline', en: 'Long-distance', ru: 'Дальний' },
    hours: { et: 'Nädalaid, etappide kaupa', en: 'Weeks, walked in sections', ru: 'Недели, по этапам' },
    start: {
      et: 'RMK Oandu külastuskeskus, jalutuskäigu kaugusel Oanduaiast',
      en: 'The RMK Oandu visitor centre, walking distance from Oanduaia',
      ru: 'Центр посетителей RMK в Оанду, в пешей доступности от Oanduaia',
    },
    body: [
      {
        et: 'Matkatee algab RMK Oandu külastuskeskuse juurest ja kulgeb 370 kilomeetrit läbi Eesti põhjast lõunasse: Lahemaa rahvuspargist läbi Kõrvemaa maastikukaitseala ja Soomaa rahvuspargi – ühe Euroopa suurima rabamaastiku – edasi Pärnumaa metsade, edelaranniku kalurikülade ja Liivi lahe liivarandadeni Ikla juures Läti piiril.',
        en: 'The route starts at the RMK Oandu visitor centre and runs 370 kilometres from the north of Estonia to the south: out of Lahemaa National Park, through the Kõrvemaa Landscape Reserve and Soomaa National Park — one of Europe’s largest bog landscapes — then through the forests of Pärnu County to the fishing villages of the south-west coast and the sandy beaches of the Gulf of Riga, ending at Ikla on the Latvian border.',
        ru: 'Маршрут начинается у центра посетителей RMK в Оанду и идёт 370 километров с севера Эстонии на юг: из национального парка Лахемаа через ландшафтный заказник Кырвемаа и национальный парк Соомаа — один из крупнейших болотных ландшафтов Европы — далее через леса Пярнумаа к рыбацким деревням юго-западного побережья и песчаным пляжам Рижского залива, до Икла на латвийской границе.',
      },
      {
        et: 'Vähesed läbivad seda ühe korraga. Enamik käib etappide kaupa, ja esimene etapp – Oandu–Võsu, 9,5 km – algab siitsamast. Oanduaia on esimese päeva loomulik alguspunkt: maja on külastuskeskusest jalutuskäigu kaugusel, saun on köetav ja hommikusöök tuleb enne väljaminekut.',
        en: 'Few walk it in one go. Most take it in sections, and the first section — Oandu–Võsu, 9.5 km — starts here. Oanduaia is the natural place to begin day one: the houses are a walk from the visitor centre, the sauna can be lit for the evening you come back, and breakfast is there before you set out.',
        ru: 'Мало кто проходит его целиком за один раз. Большинство идёт по этапам, и первый этап — Оанду–Высу, 9,5 км — начинается прямо отсюда. Oanduaia — естественная точка старта первого дня: дома в нескольких минутах ходьбы от центра посетителей, баню можно натопить к возвращению, а завтрак будет до выхода.',
      },
      {
        et: 'NB: see ei ole Eesti pikim matkatee. Pikim on Peraküla–Aegviidu–Ähijärve matkatee, 820 km, mis Oandust läbi ei lähe. Oandust algab 370-kilomeetrine haru.',
        en: 'A note on the numbers: this is not Estonia’s longest trail. The longest is the Peraküla–Aegviidu–Ähijärve route at 820 km, which does not pass Oandu. The branch that starts here is the 370-kilometre one.',
        ru: 'О цифрах: это не самый длинный маршрут Эстонии. Самый длинный — Пераküla–Аэгвийду–Ähijärve, 820 км, и он не проходит через Оанду. Отсюда начинается ветка длиной 370 километров.',
      },
    ],
    season: {
      et: 'Aasta läbi, etappide kaupa. Talvel on osa lõike suusarajana.',
      en: 'All year, in sections. Some stretches are ski tracks in winter.',
      ru: 'Круглый год, по этапам. Зимой часть отрезков — лыжня.',
    },
    rmk: 'https://rmk.ee/en/exploring-nature/hiking-route/oandu-aegviidu-ikla-370-km-2/',
    photo: '/galerii/metsarada.jpeg',
    photoAlt: FOREST,
    link: {
      href: 'https://rmk.ee/wp-content/uploads/2024/10/oanduIklaKaardivihik_20.05.pdf',
      label: { et: 'RMK kaardivihik', en: 'RMK map booklet', ru: 'Карты RMK' },
      meta: 'PDF · 0,9 MB',
    },
  },
  {
    slug: 'oandu-loodusmetsarada',
    key: 'Oandu loodusmetsarada',
    name: {
      et: 'Oandu loodusmetsarada',
      en: 'Oandu old-growth forest nature trail',
      ru: 'Природная тропа старого леса Оанду',
    },
    km: '4,7',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий' },
    hours: { et: 'Umbes 1,5–2 tundi', en: 'About 1.5–2 hours', ru: 'Около 1,5–2 часов' },
    start: {
      et: 'RMK Oandu külastuskeskus – ringrada, mis lõpeb seal, kus algas',
      en: 'The RMK Oandu visitor centre — a loop, ending where it began',
      ru: 'Центр посетителей RMK в Оанду — кольцо, заканчивается там же, где начинается',
    },
    body: [
      {
        et: 'Rada laskub Koljaku–Oandu pangalt niiskesse soometsa ja tõuseb tagasi valgusküllasesse kuivadesse männikutesse. Vanade luidete lähedal vahelduvad kuusikud, haavikud ja sanglepikud; kõrgematel nõlvadel kasvavad vanad männid, mille koor on paks ja soomuseline.',
        en: 'The trail drops off the Koljaku–Oandu escarpment into moist peatland forest and climbs back into light-filled dry pine. Near the ancient dunes it moves between spruce, aspen and common alder; on the higher slopes stand old pines whose bark is thick and scaly.',
        ru: 'Тропа спускается с уступа Кольяку–Оанду во влажный болотный лес и снова поднимается в светлый сухой сосняк. У древних дюн чередуются ельники, осинники и черноольшаники; на верхних склонах стоят старые сосны с толстой чешуйчатой корой.',
      },
      {
        et: 'See on loodusmets: langenud puud jäetakse maha ja neis elavad haruldased seened, samblikud, samblad ja putukad. Pinnasel on näha põdra, metssea, karu ja ilvese jälgi. Rajal on laudtee, märgemates kohtades hakkepuiduga kaetud lõigud, trepid, pingid, viidad ja infotahvlid. Teel on allikas.',
        en: 'This is old-growth: fallen trees are left where they fall, and rare fungi, lichens, mosses and insects live in them. On the ground you can find the tracks of elk, wild boar, bear and lynx. The path has boardwalk, woodchip through the wetter stretches, stairs, benches, signposts and information boards, and there is a spring along the way.',
        ru: 'Это старый лес: упавшие деревья остаются лежать, и в них живут редкие грибы, лишайники, мхи и насекомые. На земле встречаются следы лося, кабана, медведя и рыси. На тропе есть настил, участки со щепой в сырых местах, лестницы, скамьи, указатели и информационные щиты, а по пути — родник.',
      },
      {
        et: 'Külastuskeskuses on näitus «Rada põlismetsa». Parklas on kohti kümnele autole või kahele bussile ja joogivesi. Oandu telkimisala jääb 250 meetri kaugusele.',
        en: 'The visitor centre holds an exhibition called “Path to the Virgin Forest”. The car park takes ten cars or two buses and there is drinking water. The Oandu campsite is 250 metres away.',
        ru: 'В центре посетителей работает выставка «Тропа в девственный лес». На парковке место для десяти машин или двух автобусов, есть питьевая вода. Кемпинг Оанду — в 250 метрах.',
      },
    ],
    season: {
      et: 'Aasta läbi, hooldatud igal aastaajal.',
      en: 'All year, maintained in every season.',
      ru: 'Круглый год, поддерживается в любой сезон.',
    },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/oandu-old-growth-forest-nature-trail-4-7-km/',
    photo: '/galerii/046.jpeg',
    photoAlt: {
      et: 'Langenud puud sammaldunud ürgmetsas Lahemaal',
      en: 'Fallen trees in mossy old-growth forest in Lahemaa',
      ru: 'Поваленные деревья во мшистом старом лесу Лахемаа',
    },
  },
  {
    slug: 'oandu-vosu',
    key: 'Oandu–Võsu matkarada',
    name: { et: 'Oandu–Võsu matkarada', en: 'Oandu–Võsu hiking trail', ru: 'Тропа Оанду–Высу' },
    km: '9,5',
    difficulty: { et: 'Keskmine', en: 'Medium', ru: 'Средний' },
    hours: { et: 'Umbes 2,5–3 tundi ühes suunas', en: 'About 2.5–3 hours one way', ru: 'Около 2,5–3 часов в одну сторону' },
    start: {
      et: 'RMK Oandu külastuskeskuse parkla, lõpeb Võsu telkimisalal',
      en: 'The RMK Oandu visitor centre car park, ending at Võsu campsite',
      ru: 'Парковка центра посетителей RMK в Оанду, заканчивается у кемпинга Высу',
    },
    body: [
      {
        et: 'See on Oandu–Aegviidu–Ikla matkatee esimene lõik ja ainus, mis algab otse siit. Rada kulgeb läbi põlismetsa mööda muinasaegset Seljaku teed, Koljaku–Oandu pangast allpool, ja läbib mitmesuguseid pinnavorme ja metsakooslusi.',
        en: 'This is the first section of the Oandu–Aegviidu–Ikla route, and the only one that starts directly from here. It runs through primeval forest along the prehistoric Seljaku road, beneath the Koljaku–Oandu terrace, crossing a range of landforms and forest communities.',
        ru: 'Это первый отрезок маршрута Оанду–Аэгвийду–Икла и единственный, начинающийся прямо отсюда. Тропа идёт через древний лес по доисторической дороге Селъяку, под уступом Кольяку–Оанду, пересекая разные формы рельефа и лесные сообщества.',
      },
      {
        et: 'Rada on läbitav jalgsi ja jalgrattaga ning märgistatud kogu ulatuses; laudteed on 25 meetrit. Mõlemas otsas on telkimisala parkla, veevõtukoha ja lõkkekohaga, nii et päeva saab käia kummastki otsast. Tagasi tullakse sama teed.',
        en: 'It is passable on foot and by bicycle and marked throughout; there is 25 metres of boardwalk. There is a campsite at each end with parking, water and a fireplace, so the day can be walked from either direction. It is a there-and-back route.',
        ru: 'Тропа проходима пешком и на велосипеде, промаркирована по всей длине; настила — 25 метров. На обоих концах кемпинг с парковкой, водой и кострищем, так что день можно пройти с любой стороны. Обратно идут тем же путём.',
      },
    ],
    season: {
      et: 'Aasta läbi. Talvel on rada suusarajaks lükatud – palun ärge lõhkuge suusarada.',
      en: 'All year. In winter it is set as a cross-country ski track — please do not break up the tracks.',
      ru: 'Круглый год. Зимой здесь лыжня — пожалуйста, не разбивайте её.',
    },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/rmk-hiking-route-oandu-aegviidu-ikla-oandu-vosu-9-5-km/',
    photo: '/galerii/088.jpeg',
    photoAlt: {
      et: 'Kaks matkajat metsarajal päikesekiirte all Lahemaal',
      en: 'Two walkers on a forest trail in shafts of sunlight in Lahemaa',
      ru: 'Двое на лесной тропе в лучах солнца в Лахемаа',
    },
  },
  {
    slug: 'koprarada',
    key: 'Koprarada',
    name: { et: 'Koprarada', en: 'Beaver trail', ru: 'Бобровая тропа' },
    km: '1',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий' },
    hours: { et: 'Umbes pool tundi', en: 'About half an hour', ru: 'Около получаса' },
    start: { et: 'Oandu, RMK külastuskeskuse juurest', en: 'Oandu, from the RMK visitor centre', ru: 'Оанду, от центра посетителей RMK' },
    body: [
      {
        et: 'Kilomeeter, mis viib koprapaisude ja vaatluspunktideni. Lühim rada Oandus ja ainus, mille jaoks ei pea päeva plaanima – see mahub hommikusöögi ja lõuna vahele, ja lastega on see enamasti esimene rada, mida käiakse.',
        en: 'A kilometre out to beaver dams and the observation points above them. The shortest trail at Oandu and the only one you need not plan a day around — it fits between breakfast and lunch, and with children it is usually the first one anybody walks.',
        ru: 'Километр до бобровых плотин и смотровых точек над ними. Самая короткая тропа в Оанду и единственная, ради которой не нужно планировать день — она укладывается между завтраком и обедом, а с детьми обычно становится первой.',
      },
      {
        et: 'Koprad on öised. Paisud, näritud puutüved ja üleujutatud mets on aga kogu aeg näha, ja just neid rada näitabki.',
        en: 'Beavers are nocturnal. The dams, the gnawed trunks and the flooded forest behind them are there at any hour, and those are what the trail is for.',
        ru: 'Бобры ведут ночной образ жизни. Но плотины, обгрызенные стволы и затопленный за ними лес видны в любое время — ради них тропа и проложена.',
      },
    ],
    season: { et: 'Aasta läbi. Kevadel on vesi kõrgeim.', en: 'All year. The water is highest in spring.', ru: 'Круглый год. Весной вода самая высокая.' },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/oandu-visitor-center/',
    photo: '/galerii/083.jpeg',
    photoAlt: {
      et: 'Veekogu läbi suvise niidu ja lehtpuude Lahemaal',
      en: 'Water winding through summer meadow and broadleaf trees in Lahemaa',
      ru: 'Вода среди летнего луга и лиственных деревьев в Лахемаа',
    },
  },
  {
    slug: 'oandu-parimusrada',
    key: 'Oandu pärimusrada',
    name: { et: 'Oandu pärimusrada', en: 'Oandu heritage trail', ru: 'Тропа наследия Оанду' },
    km: '3,4',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий' },
    hours: { et: 'Umbes tund', en: 'About an hour', ru: 'Около часа' },
    start: { et: 'Oandu, RMK külastuskeskuse juurest', en: 'Oandu, from the RMK visitor centre', ru: 'Оанду, от центра посетителей RMK' },
    body: [
      {
        et: 'Kolm ja pool kilomeetrit Lahemaa külade pärimusloo jälgedel: mis siin kasvas, mida sellest tehti ja mida sellest räägiti. Rada käsitleb inimest metsas, mitte metsa ilma inimeseta – see on Oandu radadest kõige lähemal sellele, kuidas siin tegelikult elati.',
        en: 'Three and a half kilometres following the heritage story of the Lahemaa villages: what grew here, what was made from it and what was told about it. This trail is about people in the forest rather than the forest without them — of the Oandu trails it is the one closest to how life here was actually lived.',
        ru: 'Три с половиной километра по следам преданий деревень Лахемаа: что здесь росло, что из этого делали и что об этом рассказывали. Эта тропа — о человеке в лесу, а не о лесе без человека; из троп Оанду она ближе всего к тому, как здесь жили на самом деле.',
      },
    ],
    season: { et: 'Aasta läbi.', en: 'All year.', ru: 'Круглый год.' },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/oandu-visitor-center/',
    photo: '/galerii/metsarada.jpeg',
    photoAlt: FOREST,
  },
  {
    slug: 'altja',
    key: 'Altja loodus- ja kultuuriajaloorada',
    name: {
      et: 'Altja loodus- ja kultuuriajaloorada',
      en: 'Altja nature and culture historical trail',
      ru: 'Природно-историческая тропа Алтья',
    },
    km: '3',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий' },
    hours: { et: 'Umbes tund', en: 'About an hour', ru: 'Около часа' },
    start: { et: 'Altja kaluriküla, lühike sõit Oandust põhja poole', en: 'Altja fishing village, a short drive north of Oandu', ru: 'Рыбацкая деревня Алтья, короткий переезд к северу от Оанду' },
    body: [
      {
        et: 'Kolm kilomeetrit läbi Altja kaluriküla ja mööda rannikut. Altja on üks Lahemaa säilinuimaid külasid – võrgukuurid kivisel rannal, kiik küla keskel ja kõrts tee ääres. Rada seob küla, ranniku ja metsa ühte tunniajasesse ringi.',
        en: 'Three kilometres through Altja fishing village and along the coast. Altja is one of the best-preserved villages in Lahemaa — net sheds on the stony shore, the village swing, and the inn by the road. The trail ties the village, the coast and the forest into one hour-long round.',
        ru: 'Три километра через рыбацкую деревню Алтья и вдоль побережья. Алтья — одна из наиболее сохранившихся деревень Лахемаа: сетевые сараи на каменистом берегу, деревенские качели и корчма у дороги. Тропа связывает деревню, побережье и лес в один часовой круг.',
      },
    ],
    season: { et: 'Aasta läbi. Rannikul on tuul ka suvel.', en: 'All year. There is wind on that coast even in summer.', ru: 'Круглый год. На этом побережье ветрено даже летом.' },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/oandu-visitor-center/',
    photo: '/galerii/kivid-ja-tiik.jpeg',
    photoAlt: {
      et: 'Rändrahnud vee ääres Lahemaal',
      en: 'Boulders at the water’s edge in Lahemaa',
      ru: 'Валуны у воды в Лахемаа',
    },
  },
]

/**
 * RMK writes 4,7; English writes 4.7. The stored value is Estonian, so English swaps the
 * separator. Worth the three lines — "4,7 km" in an English title reads like a typo, and
 * the title is the first thing a search result shows.
 */
export function trailKm(trail: Trail, lang: Lang): string {
  return lang === 'en' ? trail.km.replace(',', '.') : trail.km
}

export const TRAIL_SLUGS = TRAILS.map(t => t.slug)

/** The trail list on the home page finds a trail's page by its Estonian name. */
export const TRAIL_BY_KEY: Record<string, Trail> = Object.fromEntries(
  TRAILS.map(t => [t.key, t]),
)

/** Kept for the existing link on the Oandu–Ikla row of the home-page list. */
export const TRAIL_LINKS: Record<string, TrailLink> = Object.fromEntries(
  TRAILS.filter(t => t.link).map(t => [t.key, t.link!]),
)
