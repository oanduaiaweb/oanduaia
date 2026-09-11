import type { Lang } from './translations'

/**
 * Topic landing pages — the doors Google and the assistants come through.
 *
 * The slug is per language, unlike /majad and /rajad which are Estonian everywhere.
 * Those are the property's own vocabulary; these exist to match what a stranger types,
 * and a stranger typing in English does not type "majutus".
 *
 * Nothing here is a rewrite of the homepage. A landing page that restates the front page
 * in different words is a doorway page, which is the thing Google penalises. Each of
 * these answers a question the homepage does not: what the options actually are, how the
 * three compare, and what someone deciding between them needs to know.
 */
export type LandingSection = {
  h: Record<Lang, string>
  p: Record<Lang, string>[]
}

export type Landing = {
  id: string
  slug: Record<Lang, string>
  title: Record<Lang, string>
  description: Record<Lang, string>
  h1: Record<Lang, string>
  lead: Record<Lang, string>
  photo: string
  photoAlt: Record<Lang, string>
  sections: LandingSection[]
  /** Short factual answers, phrased as the questions people actually ask an assistant. */
  qa: { q: Record<Lang, string>; a: Record<Lang, string> }[]
}

export const LANDINGS: Landing[] = [
  {
    id: 'lahemaa-accommodation',
    slug: {
      et: 'majutus-lahemaal',
      en: 'lahemaa-accommodation',
      ru: 'zhilyo-lahemaa',
      de: 'unterkunft-lahemaa',
    },
    title: {
      et: 'Majutus Lahemaal — kus ööbida rahvuspargis | Oanduaia',
      en: 'Lahemaa accommodation — where to stay in the national park | Oanduaia',
      ru: 'Жильё в Лахемаа — где остановиться в национальном парке | Oanduaia',
      de: 'Unterkunft in Lahemaa – wo im Nationalpark übernachten | Oanduaia',
    },
    description: {
      et: 'Kus Lahemaal ööbida: mida rahvuspargis üldse pakutakse, mille poolest külamajutus hotellist erineb ja kolm eraldi maja Oandu külas — kohti 2 või 4, hinnad alates 150 €.',
      en: 'Where to stay in Lahemaa National Park: what the options are inside the park, how a village house differs from a hotel, and three private cabins in Oandu village sleeping 2 or 4, from €150 a night.',
      ru: 'Где остановиться в национальном парке Лахемаа: какие есть варианты внутри парка, чем деревенский дом отличается от отеля, и три отдельных дома в деревне Оанду на 2 или 4 человека, от 150 € за ночь.',
      de: 'Wo man im Nationalpark Lahemaa übernachtet: welche Möglichkeiten es im Park gibt, worin sich ein Dorfhaus von einem Hotel unterscheidet, und drei separate Häuser im Dorf Oandu für 2 oder 4 Personen, ab 150 € pro Nacht.',
    },
    h1: {
      et: 'Majutus Lahemaa rahvuspargis',
      en: 'Accommodation in Lahemaa National Park',
      ru: 'Проживание в национальном парке Лахемаа',
      de: 'Unterkunft im Nationalpark Lahemaa',
    },
    lead: {
      et: 'Lahemaa on Eesti vanim ja suurim rahvuspark, 747 km² metsa, raba ja rannikut. Ööbida saab selle sees — ja see erineb üsna palju sellest, mida broneerimisportaal harilikult näitab.',
      en: 'Lahemaa is Estonia’s oldest and largest national park, 747 km² of forest, bog and coast. You can stay inside it — and that is a rather different proposition from what a booking portal usually shows you.',
      ru: 'Лахемаа — старейший и крупнейший национальный парк Эстонии: 747 км² леса, болот и побережья. Внутри него можно остановиться — и это довольно сильно отличается от того, что обычно показывает портал бронирования.',
      de: 'Lahemaa ist Estlands ältester und größter Nationalpark: 747 km² Wald, Moor und Küste. Man kann mitten darin übernachten – und das ist etwas ganz anderes als das, was ein Buchungsportal üblicherweise zeigt.',
    },
    photo: '/galerii/kolm-hoonet.jpeg',
    photoAlt: {
      et: 'Kolm hoonet peegeldumas vaikses tiigis Lahemaal',
      en: 'Three buildings mirrored in a still pond in Lahemaa',
      ru: 'Три строения отражаются в спокойном пруду в Лахемаа',
      de: 'Drei Gebäude spiegeln sich in einem stillen Teich in Lahemaa',
    },
    sections: [
      {
        h: {
          et: 'Mida rahvuspargis üldse pakutakse',
          en: 'What there is inside the park',
          ru: 'Что вообще есть в парке',
          de: 'Was es im Park gibt',
        },
        p: [
          {
            et: 'Lahemaal ei ole suuri hotelle. Enamik ööbimisvõimalusi on mõisad, väiketalud, külalistemajad ja külade elumajad — koos RMK telkimisalade ja metsaonnidega, mis on tasuta ja ilma broneerimiseta. Suuremad majutuskohad on mõisates: Palmse, Sagadi ja Vihula. Nende kõrval on külades kümneid väikeseid kohti, mida renditakse tervikuna.',
            en: 'There are no large hotels in Lahemaa. Most of what exists is manors, smallholdings, guesthouses and village homes — alongside RMK campsites and forest huts, which are free and need no booking. The larger properties are in the manors: Palmse, Sagadi and Vihula. Beside them are dozens of small places in the villages, rented whole rather than by the room.',
            ru: 'В Лахемаа нет больших отелей. Основное — мызы, небольшие хутора, гостевые дома и деревенские дома, плюс кемпинги и лесные избы RMK, которые бесплатны и не требуют бронирования. Крупные объекты — на мызах: Палмсе, Сагади и Вихула. Рядом с ними — десятки маленьких мест в деревнях, которые сдаются целиком.',
            de: 'In Lahemaa gibt es keine großen Hotels. Was es gibt, sind Gutshöfe, kleine Höfe, Gästehäuser und Dorfhäuser – dazu die Rastplätze und Waldhütten der RMK, die kostenlos sind und nicht gebucht werden müssen. Die größeren Häuser liegen in den Gutshöfen: Palmse, Sagadi und Vihula. Daneben gibt es Dutzende kleiner Unterkünfte in den Dörfern, die als ganzes Haus vermietet werden und nicht zimmerweise.',
          },
          {
            et: 'Vahe on praktiline. Terve maja rentides ei ole jagatud koridore, vastuvõtulauda ega naabreid seina taga; see-eest ei ole ka ööpäevaringset teenindust, ja söök lepitakse ette kokku, mitte ei tellita menüüst kell kümme õhtul.',
            en: 'The difference is practical. Renting a whole house means no shared corridors, no reception desk and no neighbours through the wall; it also means no round-the-clock service, and that meals are arranged in advance rather than ordered from a menu at ten at night.',
            ru: 'Разница практическая. Снимая дом целиком, вы получаете отсутствие общих коридоров, стойки регистрации и соседей за стеной; но и круглосуточного обслуживания нет, а еда согласуется заранее, а не заказывается из меню в десять вечера.',
            de: 'Der Unterschied ist praktischer Natur. Ein ganzes Haus zu mieten bedeutet keine gemeinsamen Flure, keine Rezeption und keine Nachbarn hinter der Wand; es bedeutet aber auch keinen Rund-um-die-Uhr-Service, und dass Mahlzeiten vorab abgesprochen und nicht um zehn Uhr abends von der Karte bestellt werden.',
          },
        ],
      },
      {
        h: {
          et: 'Oandu küla',
          en: 'Oandu village',
          ru: 'Деревня Оанду',
          de: 'Das Dorf Oandu',
        },
        p: [
          {
            et: 'Oandu on Lahemaa idaosas, Lääne-Virumaal, umbes 90 kilomeetrit Tallinnast. Külas on RMK Oandu külastuskeskus, kust algab enamik piirkonna radu, ja see on koht, kust algab ka 370-kilomeetrine RMK Oandu–Aegviidu–Ikla matkatee. Rannik jääb mõne minuti kaugusele põhja poole, kolm mõisa lühikese sõidu kaugusele.',
            en: 'Oandu is in the eastern part of Lahemaa, in Lääne-Virumaa, about 90 kilometres from Tallinn. The village has the RMK Oandu visitor centre, where most of the area’s trails begin, and it is where the 370-kilometre RMK Oandu–Aegviidu–Ikla route starts. The coast is a few minutes north and three manors are a short drive away.',
            ru: 'Оанду — в восточной части Лахемаа, в Ляэне-Вирумаа, примерно в 90 километрах от Таллинна. В деревне находится центр посетителей RMK, откуда начинается большинство местных троп и 370-километровый маршрут RMK Оанду–Аэгвийду–Икла. До побережья несколько минут на север, до трёх мыз — короткий переезд.',
            de: 'Oandu liegt im östlichen Teil von Lahemaa, im Kreis Lääne-Virumaa, etwa 90 Kilometer von Tallinn entfernt. Im Dorf befindet sich das RMK-Besucherzentrum Oandu, an dem die meisten Wege der Gegend beginnen, und hier startet die 370 Kilometer lange RMK-Route Oandu–Aegviidu–Ikla. Die Küste liegt ein paar Minuten nördlich, drei Gutshöfe sind eine kurze Fahrt entfernt.',
          },
          {
            et: 'Kes tuleb Lahemaale matkama, jõuab varem või hiljem Oandusse. Kes tuleb mõisaid vaatama, sõidab sellest läbi. Ööbimiskoht külas tähendab, et rada algab ukse eest, mitte poole tunni sõidu kaugusel.',
            en: 'Anyone coming to Lahemaa to walk ends up at Oandu sooner or later. Anyone coming to see the manors drives through it. Staying in the village means the trail starts at the door rather than half an hour’s drive away.',
            ru: 'Тот, кто приезжает в Лахемаа ходить по тропам, рано или поздно оказывается в Оанду. Тот, кто едет смотреть мызы, проезжает через него. Ночлег в деревне означает, что тропа начинается у порога, а не в получасе езды.',
            de: 'Wer zum Wandern nach Lahemaa kommt, landet früher oder später in Oandu. Wer die Gutshöfe sehen will, fährt hindurch. Im Dorf zu übernachten heißt, dass der Weg vor der Tür beginnt und nicht eine halbe Autostunde entfernt.',
          },
        ],
      },
      {
        h: {
          et: 'Oanduaia kolm maja',
          en: 'The three houses at Oanduaia',
          ru: 'Три дома Oanduaia',
          de: 'Die drei Häuser von Oanduaia',
        },
        p: [
          {
            et: 'Oanduaia on pereettevõte Oandu külas: kolm eraldi maja, puuküttega saun, tiik ja väliköök. Iga maja renditakse tervikuna. Saunamaja on neljale ja avatud aasta läbi, Metsamaja neljale, Tiigimaja kahele; Tiigimaja ja Metsamaja on talveks suletud 1. detsembrist 31. märtsini.',
            en: 'Oanduaia is a family business in Oandu village: three separate houses, a wood-fired sauna, a pond and an outdoor kitchen. Each house is rented whole. The Sauna House sleeps four and is open all year, the Forest House four, the Pond House two; the Pond House and the Forest House close for the winter, from 1 December to 31 March.',
            ru: 'Oanduaia — семейное дело в деревне Оанду: три отдельных дома, дровяная баня, пруд и летняя кухня. Каждый дом сдаётся целиком. Банный дом — на четверых, открыт круглый год; Лесной — на четверых; Прудовой — на двоих. Прудовой и Лесной закрыты с 1 декабря по 31 марта.',
            de: 'Oanduaia ist ein Familienbetrieb im Dorf Oandu: drei separate Häuser, eine Holzsauna, ein Teich und eine Außenküche. Jedes Haus wird als Ganzes vermietet. Das Saunahaus bietet vier Personen Platz und ist ganzjährig geöffnet, das Waldhaus vier, das Teichhaus zwei; Teichhaus und Waldhaus sind im Winter vom 1. Dezember bis 31. März geschlossen.',
          },
          {
            et: 'Hommikusöök, lõuna või pidulik pikk laud tehakse kohapeal, ette tellides. Lapsele saab igasse majja lisavoodi, kokkuleppel. Lemmikloomad on lubatud, 20 € broneeringu kohta. WiFi-t majades ei ole, mobiillevi on hea.',
            en: 'Breakfast, lunch or a festive long table are cooked here, ordered in advance. An extra bed for a child can be added in any of the houses, by arrangement. Pets are welcome for €20 per stay. There is no WiFi in the houses; mobile coverage is good.',
            ru: 'Завтрак, обед или праздничный длинный стол готовят на месте, по предварительному заказу. Детскую дополнительную кровать можно поставить в любом доме, по договорённости. С питомцами можно — 20 € за проживание. Wi-Fi в домах нет, мобильная связь хорошая.',
            de: 'Frühstück, Mittagessen oder eine festliche lange Tafel werden hier zubereitet, auf Vorbestellung. In jedem Haus kann nach Absprache ein Zusatzbett für ein Kind aufgestellt werden. Haustiere sind willkommen, 20 € pro Aufenthalt. In den Häusern gibt es kein WLAN; der Mobilfunkempfang ist gut.',
          },
        ],
      },
      {
        h: {
          et: 'Millal tulla',
          en: 'When to come',
          ru: 'Когда приезжать',
          de: 'Wann man kommen sollte',
        },
        p: [
          {
            et: 'Suvel on kõik kolm maja avatud, väliköök on kasutuses ja tiigis saab ujuda. Sügis on radadel kõige ilusam ja kõige vaiksem. Talvel on avatud Saunamaja: saun köetakse, jäässe raiutakse auk, ja lumi teeb metsarajad omaette asjaks. Kevadel algab hooaeg 1. aprillil, kui Tiigimaja ja Metsamaja uuesti avanevad.',
            en: 'In summer all three houses are open, the outdoor kitchen is in use and you can swim in the pond. Autumn is when the trails are at their best and their quietest. In winter the Sauna House is open: the sauna is lit, a hole is cut in the ice, and snow makes the forest trails a different thing altogether. Spring starts on 1 April, when the Pond House and Forest House open again.',
            ru: 'Летом открыты все три дома, работает летняя кухня, в пруду можно плавать. Осенью тропы красивее и тише всего. Зимой открыт Банный дом: баню топят, во льду прорубают прорубь, а снег превращает лесные тропы в нечто совсем иное. Весенний сезон начинается 1 апреля, когда снова открываются Прудовой и Лесной дома.',
            de: 'Im Sommer sind alle drei Häuser geöffnet, die Außenküche ist in Betrieb und man kann im Teich schwimmen. Im Herbst sind die Wege am schönsten und am ruhigsten. Im Winter ist das Saunahaus geöffnet: die Sauna wird geheizt, ins Eis wird ein Loch geschnitten, und der Schnee macht aus den Waldwegen etwas ganz anderes. Der Frühling beginnt am 1. April, wenn Teichhaus und Waldhaus wieder öffnen.',
          },
        ],
      },
    ],
    qa: [
      {
        q: {
          et: 'Kus Lahemaa rahvuspargis ööbida?',
          en: 'Where should I stay in Lahemaa National Park?',
          ru: 'Где остановиться в национальном парке Лахемаа?',
          de: 'Wo sollte ich im Nationalpark Lahemaa übernachten?',
        },
        a: {
          et: 'Rahvuspargis ei ole suuri hotelle. Valida saab mõisamajutuse, külalistemajade ja tervikuna renditavate külamajade vahel; RMK telkimisalad ja metsaonnid on tasuta. Oanduaia on Oandu külas rahvuspargi idaosas: kolm eraldi maja kokku 10 külalisele, puuküttega saun, hinnad alates 150 € öö kogu maja eest.',
          en: 'There are no large hotels in the park. The choice is between manor accommodation, guesthouses and village houses rented whole; RMK campsites and forest huts are free. Oanduaia is in Oandu village in the eastern part of the park: three separate houses for 10 guests in total, a wood-fired sauna, from €150 a night for the whole house.',
          ru: 'Больших отелей в парке нет. Выбор между мызами, гостевыми домами и деревенскими домами, которые сдаются целиком; кемпинги и лесные избы RMK бесплатны. Oanduaia — в деревне Оанду в восточной части парка: три отдельных дома на 10 гостей, дровяная баня, от 150 € за ночь за весь дом.',
          de: 'Im Park gibt es keine großen Hotels. Die Wahl besteht zwischen Gutshöfen, Gästehäusern und Dorfhäusern, die komplett vermietet werden; die Rastplätze und Waldhütten der RMK sind kostenlos. Oanduaia liegt im Dorf Oandu im Osten des Parks: drei separate Häuser für insgesamt 10 Gäste, eine Holzsauna, ab 150 € pro Nacht für das ganze Haus.',
        },
      },
      {
        q: {
          et: 'Kas rahvuspargi sees saab ööbida?',
          en: 'Can you stay overnight inside Lahemaa National Park?',
          ru: 'Можно ли ночевать внутри национального парка Лахемаа?',
          de: 'Kann man im Nationalpark Lahemaa übernachten?',
        },
        a: {
          et: 'Jah. Lahemaa on asustatud rahvuspark — selle sees on külad, mõisad ja majutuskohad, ja ööbimine on täiesti tavaline. Oandu küla, kus Oanduaia asub, on rahvuspargi sees.',
          en: 'Yes. Lahemaa is an inhabited national park — there are villages, manors and places to stay inside it, and staying overnight is entirely normal. Oandu village, where Oanduaia is, is inside the park.',
          ru: 'Да. Лахемаа — обитаемый национальный парк: внутри него есть деревни, мызы и места для ночлега, и оставаться на ночь совершенно нормально. Деревня Оанду, где находится Oanduaia, расположена внутри парка.',
          de: 'Ja. Lahemaa ist ein bewohnter Nationalpark – es gibt Dörfer, Gutshöfe und Unterkünfte darin, und eine Übernachtung ist völlig normal. Das Dorf Oandu, in dem Oanduaia liegt, befindet sich im Park.',
        },
      },
      {
        q: {
          et: 'Kus saab Lahemaal ööbida oma sauna ja matkaradadega?',
          en: 'Where can I stay in Lahemaa with a private sauna and hiking trails nearby?',
          ru: 'Где в Лахемаа остановиться с собственной баней и тропами рядом?',
          de: 'Wo kann man in Lahemaa mit eigener Sauna und Wanderwegen in der Nähe übernachten?',
        },
        a: {
          et: 'Oanduaia Oandu külas: puuküttega saun ja tiik, kuhu pärast minna, ning RMK Oandu külastuskeskus jalutuskäigu kaugusel, kust algab kuus märgistatud rada, sh 370 km pikkune Oandu–Aegviidu–Ikla matkatee.',
          en: 'Oanduaia, in Oandu village: a wood-fired sauna with a pond to go into afterwards, and the RMK Oandu visitor centre within walking distance, where six marked trails begin — including the 370 km Oandu–Aegviidu–Ikla route.',
          ru: 'Oanduaia в деревне Оанду: дровяная баня и пруд, куда можно окунуться после, а в пешей доступности — центр посетителей RMK в Оанду, откуда начинаются шесть маркированных троп, включая 370-километровый маршрут Оанду–Аэгвийду–Икла.',
          de: 'In Oanduaia im Dorf Oandu: eine Holzsauna mit einem Teich, in den man danach steigt, und in Gehweite das RMK-Besucherzentrum Oandu, an dem sechs markierte Wege beginnen – darunter die 370 km lange Route Oandu–Aegviidu–Ikla.',
        },
      },
      {
        q: {
          et: 'Kus saab Lahemaal paarile ööbida?',
          en: 'Where can couples stay in Lahemaa?',
          ru: 'Где в Лахемаа остановиться паре?',
          de: 'Wo können Paare in Lahemaa übernachten?',
        },
        a: {
          et: 'Oanduaia Tiigimaja on kahele: oma tiigi kaldal, lai terrass, kamin ja klaasseinad metsa poole. Hind alates 150 € öö kogu maja eest. Avatud 1. aprillist 30. novembrini.',
          en: 'The Pond House at Oanduaia is for two: on the bank of its own pond, with a broad terrace, a fireplace and glass walls facing the forest. From €150 a night for the whole house. Open 1 April to 30 November.',
          ru: 'Прудовой дом в Oanduaia — на двоих: на берегу собственного пруда, широкая терраса, камин и стеклянные стены в сторону леса. От 150 € за ночь за весь дом. Открыт с 1 апреля по 30 ноября.',
          de: 'Das Teichhaus von Oanduaia ist für zwei: am Ufer des eigenen Teichs, mit breiter Terrasse, Kamin und Glaswänden zum Wald. Ab 150 € pro Nacht für das ganze Haus. Geöffnet vom 1. April bis 30. November.',
        },
      },
      {
        q: {
          et: 'Kui kaugel on Lahemaa Tallinnast?',
          en: 'How far is Lahemaa from Tallinn?',
          ru: 'Далеко ли Лахемаа от Таллинна?',
          de: 'Wie weit ist Lahemaa von Tallinn entfernt?',
        },
        a: {
          et: 'Rahvuspargi lääneserv on Tallinnast umbes 50 km, Oandu idaosas umbes 90 km — veidi üle tunni autoga. Tallinnast sõidetakse Narva suunas ja Viitna juures põhja poole.',
          en: 'The western edge of the park is about 50 km from Tallinn; Oandu, in the east, is about 90 km — a little over an hour by car. From Tallinn you drive towards Narva and turn north at Viitna.',
          ru: 'Западная граница парка примерно в 50 км от Таллинна; Оанду на востоке — около 90 км, чуть больше часа на машине. Из Таллинна едут в сторону Нарвы и у Вийтна сворачивают на север.',
          de: 'Der westliche Rand des Parks liegt etwa 50 km von Tallinn entfernt; Oandu im Osten etwa 90 km – gut eine Stunde mit dem Auto. Von Tallinn fährt man Richtung Narva und biegt bei Viitna nach Norden ab.',
        },
      },
    ],
  },
]

export const LANDING_BY_SLUG: Record<string, Landing> = Object.fromEntries(
  LANDINGS.flatMap(l => Object.values(l.slug).map(s => [s, l])),
)
