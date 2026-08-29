export type Lang = 'et' | 'en' | 'ru'

export const T = {
  nav: {
    meist:    { et: 'Lugu',     en: 'Story',   ru: 'История' },
    majutus:  { et: 'Majad',    en: 'Houses',  ru: 'Дома' },
    teenused: { et: 'Toit',     en: 'Food',    ru: 'Еда' },
    matkad:   { et: 'Loodus',   en: 'Nature',  ru: 'Природа' },
    broneeri: { et: 'Broneeri', en: 'Book',    ru: 'Бронь' },
    galerii:  { et: 'Galerii',  en: 'Gallery', ru: 'Галерея' },
  },
  hero: {
    line1:  { et: 'Kaugel',            en: 'Far',              ru: 'Вдали' },
    line2:  { et: 'kõigest.',          en: 'from all.',        ru: 'от всего.' },
    line3:  { et: 'Puhka päriselt.',   en: 'Rest for real.',   ru: 'По\u2011настоящему.' },
    eyebrow:{ et: 'Lahemaa rahvuspark · Oandu · Est', en: 'Lahemaa National Park · Oandu · Est', ru: 'Нац. парк Лахемаа · Оанду · Est' },
    /*
     * The strapline now says plainly what this is — forest cabins, a private wood-fired
     * sauna, Lahemaa, Estonia — instead of only where it is.
     *
     * That sentence belongs HERE and not in the headline. "Kaugel kõigest / Far from all"
     * is the poster line, the reason someone stays on the page; replacing it with a
     * keyword string would cost the thing the site is good at and gain a phrase Google
     * can read perfectly well one line lower. The <h1> keeps the poetry, the sentence
     * under it carries the meaning, and both are in the server HTML.
     */
    desc:   {
      et: 'Metsamajad ja oma puuküttega saun Lahemaa rahvuspargis – kolme mõisa vahel, mere lähedal.',
      en: 'Forest cabins and a private wood-fired sauna in Lahemaa National Park, Estonia – between three manors, near the sea.',
      ru: 'Лесные дома и своя дровяная баня в национальном парке Лахемаа, Эстония – между тремя мызами, у моря.',
    },
    cta:    { et: 'Küsi pakkumist', en: 'Request an offer', ru: 'Запросить предложение' },
    alt:    { et: 'Lahemaa mets', en: 'Lahemaa forest', ru: 'Лес Лахемаа' },
  },
  intro: {
    label: { et: 'Lugu', en: 'Story', ru: 'История' },
    h1:    { et: 'Metsas', en: 'In the forest,', ru: 'В лесу' },
    h2:    { et: '', en: '', ru: '' },
    h2em:  { et: 'ärkas', en: 'beauty', ru: 'проснулась' },
    h3:    { et: 'ilu.', en: 'awoke.', ru: 'красота.' },
    p1: {
      et: 'Peremees leidis kunagi metsatuka, kus keskel voolas oja. Vana talukoht – roheluse alla mattunud, aeg seisma jäänud. Ta hakkas võsa niitma. Mida rohkem niitis, seda rohkem ilu avanes – nagu mets oleks oodanud, et keegi lõpuks tuleb.',
      en: 'The owner once found a forest grove with a stream running through the middle. An old farmstead – buried under greenery, time standing still. He started clearing the scrub. The more he cleared, the more beauty opened up – as if the forest had been waiting for someone to finally come.',
      ru: 'Хозяин однажды нашёл лесную поляну с ручьём посередине. Старый хутор – утонувший в зелени, время остановилось. Он начал расчищать кустарник. Чем больше расчищал, тем больше красоты открывалось – словно лес ждал, что кто-то наконец придёт.',
    },
    p2: {
      et: 'Kõigepealt kerkis saunamaja. Siis peamaja. Esimesed külalised olid sõbrad. Sõbrad rääkisid edasi. Nii see läks. Nii kasvab Oanduaia siiani – mitte reklaamist, vaid soovitustest. Mitte plaanist, vaid armastusest koha vastu.',
      en: 'First the sauna house rose. Then the main house. The first guests were friends. Friends told others. That is how it went. Oanduaia still grows this way – not from advertising, but from recommendations. Not from a plan, but from love for this place.',
      ru: 'Сначала построили банный домик. Потом главный дом. Первые гости были друзьями. Друзья рассказывали дальше. Так и пошло. Oanduaia растёт и сейчас – не через рекламу, а через рекомендации. Не по плану, а из любви к этому месту.',
    },
    p3: {
      et: 'Oanduaia asub Oandu külas Lääne-Virumaal, Lahemaa rahvuspargis – Eesti vanimas ja suurimas rahvuspargis, mis 1971. aastal asutatuna oli esimene kogu Nõukogude Liidus. Läänemere rannik jääb mõne minuti kaugusele põhja poole. Palmse, Sagadi ja Vihula mõis on kõik lühikese sõidu kaugusel. Tallinnasse on umbes 90 kilomeetrit, veidi üle tunni autoga.',
      en: 'Oanduaia stands in Oandu village in Lääne-Virumaa, inside Lahemaa National Park — the oldest and largest in Estonia, and when it was founded in 1971 the first national park in the whole Soviet Union. The Baltic coast is a few minutes north. The manors of Palmse, Sagadi and Vihula are each a short drive away. Tallinn is about 90 kilometres west, a little over an hour by car.',
      ru: 'Oanduaia находится в деревне Оанду в Ляэне-Вирумаа, в национальном парке Лахемаа — старейшем и крупнейшем в Эстонии, а в 1971 году, при основании, первом во всём Советском Союзе. До балтийского побережья несколько минут на север. Мызы Палмсе, Сагади и Вихула — каждая в коротком переезде. До Таллинна около 90 километров, чуть больше часа на машине.',
    },
    p4: {
      et: 'Siin on puuküttega saun, tiik, kus ujuda, allikavesi ja linnulaul. Pole protseduuride nimekirja ega broneerimisportaali. Külast algab või möödub kuus märgistatud matkarada, nende seas Oandu–Ikla matkatee – Eesti pikim, mis algab siit ja kulgeb 822 kilomeetrit Läti piirini.',
      en: 'What is here is a wood-fired sauna, a pond to swim in, spring water and birdsong. There is no list of treatments and no booking portal. Six marked hiking trails start at or pass through the village, among them the Oandu–Ikla trail – the longest in Estonia, which begins here and runs 822 kilometres to the Latvian border.',
      ru: 'Здесь дровяная баня, пруд, в котором можно плавать, родниковая вода и пение птиц. Никаких списков процедур и порталов бронирования. От деревни начинаются или через неё проходят шесть маркированных троп, среди них Оанду–Икла – самый длинный маршрут Эстонии, он начинается здесь и идёт 822 километра до латвийской границы.',
    },
    p5: {
      et: 'See sobib paarile, kes tahab maja endale, perele, kes tahab lapsed õue, ja väiksele seltskonnale, kes tahab üht pikka lauda ja mitte kedagi teist majja. Iga maja renditakse tervikuna – jagama ei pea. Koerad on teretulnud. Talvel on Saunamaja avatud, saun köetud ja jäässe raiutud auk.',
      en: 'It suits a couple who want a house to themselves, a family who want the children outdoors, and a small group who want one long table and nobody else in the building. Each house is rented whole – you will not be sharing it. Dogs are welcome. In winter the Sauna House stays open, the sauna is lit, and there is a hole cut in the ice.',
      ru: 'Это подходит паре, которая хочет дом целиком, семье, которая хочет, чтобы дети были на улице, и небольшой компании, которой нужен один длинный стол и никого больше в доме. Каждый дом сдаётся целиком – делить его не придётся. Собаки желанны. Зимой Банный дом открыт, баня топится, а во льду прорублена прорубь.',
    },
    p6: {
      et: 'Söögi teeb perenaine ise, värskest toorainest – hommikusöök, lõuna või pidulikult kaetud pikk laud. Oanduaia on pereettevõte ja on kasvanud soovituste, mitte reklaami toel.',
      en: 'The food is cooked by the host herself, from fresh ingredients – breakfast, lunch, or a long table laid for a celebration. Oanduaia is a family business, and it grew from recommendations rather than advertising.',
      ru: 'Еду готовит сама хозяйка, из свежих продуктов – завтрак, обед или празднично накрытый длинный стол. Oanduaia — семейное дело, выросшее на рекомендациях, а не на рекламе.',
    },
  },
  services: {
    label: { et: 'Toit', en: 'Food', ru: 'Еда' },
    arrow: { et: 'Küsi menüü →', en: 'Ask for menu →', ru: 'Запросить меню →' },
    s1: {
      t1: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак' },
      t2: { et: 'Lõuna', en: 'Lunch', ru: 'Обед' },
      desc: {
        et: 'Hommikusöök, lõuna, pidulik pikk laud või kodusem supilõuna – kõik värskest toorainest, kõik perenaise enda tehtud.',
        en: 'Breakfast, lunch, a festive long table or a homier soup lunch – all from fresh ingredients, all made by the host herself.',
        ru: 'Завтрак, обед, торжественный стол или домашний суп – всё из свежих продуктов, всё приготовлено хозяйкой лично.',
      },
      price: {
        line:   { et: 'Hommikusöök 20 € inimese kohta hommikus', en: 'Breakfast 20 € per person, per morning', ru: 'Завтрак 20 € с человека в утро' },
        detail: { et: 'Munad, peekon, puder, kohv', en: 'Eggs, bacon, porridge, coffee', ru: 'Яйца, бекон, каша, кофе' },
        note:   { et: 'Lõuna- ja õhtusöögi valikute jaoks võta meiega ühendust.', en: 'Contact us for lunch and dinner options.', ru: 'Свяжитесь с нами, чтобы узнать варианты обеда и ужина.' },
      },
    },
    s2: {
      t1: { et: 'Pidulik pikk laud', en: 'Festive long table', ru: 'Праздничный стол' },
      t2: { et: '', en: '', ru: '' },
      desc: {
        et: 'Ette tellides kahele kuni kümnele. Suvel väliköögis kuni kahekümnele.',
        en: 'Pre-ordered for two to ten. In summer, up to twenty in the outdoor kitchen.',
        ru: 'По предварительному заказу для двух–десяти человек. Летом – до двадцати на открытой кухне.',
      },
      price: null,
    },
  },
  feature: {
    label: { et: 'Majad', en: 'Houses', ru: 'Дома' },
    // Eyebrow stays "Majad"; the headline is the accommodation offer.
    // Estonian is one compound word, so it takes no second line.
    h1:   { et: 'Majutusvõimalused', en: 'Accommodation', ru: 'Варианты' },
    h2:   { et: '', en: 'options.', ru: 'размещения.' },
    houses: [
      {
        slug: 'saunamaja',
        /*
         * Prose for the house page. The three cabins had 220-250 indexable words each
         * and leaned on photographs; a search engine cannot read a photograph. Written
         * from what is already true of the house — the build, who it suits, what is
         * around it — not padded to a word count.
         */
        seoKind: { et: 'saunaga palkmaja', en: 'sauna cabin', ru: 'сруб с дровяной баней' },
        body: [
          {
            et: 'Saunamaja on roogkatusega palkmaja Oandu külas, Lahemaa rahvuspargi sees. Kaks korrust, avatud toad, paeplaatidest põrand ja kamin, mille kohal on sepistatud tammeokstega rõdupiire. Köök on täisvarustatud, köögisaar telliskivijalal ja puuküttega pliit. Magamiskohti on kuni viiele, kolm kahekohalist voodit üle kahe korruse.',
            en: 'The Sauna House is a thatched log cabin in Oandu village, inside Lahemaa National Park. Two floors, open rooms, a flagstone floor and a fireplace, with a loft above it behind a balustrade of forged oak branches. The kitchen is fully equipped — an island on a brick base and a wood-fired range. It sleeps up to five, three double beds across two floors.',
            ru: 'Банный дом — бревенчатый дом с камышовой крышей в деревне Оанду, в национальном парке Лахемаа. Два этажа, открытые комнаты, каменный пол и камин, а над ним антресоль за коваными дубовыми ветвями ограждения. Кухня полностью оборудована: остров на кирпичном основании и дровяная плита. Спальных мест до пяти — три двуспальные кровати на двух этажах.',
          },
          {
            et: 'Süda on puuküttega saun. Köetakse puudega, mitte lülitiga, ja tiik on kümne sammu kaugusel – suvel ujumiseks, talvel on jäässe raiutud auk. Saunamaja on ainus kolmest, mis on avatud aasta läbi.',
            en: 'The heart of it is the wood-fired sauna. It is heated with wood, not a switch, and the pond is ten steps away — for swimming in summer, and in winter there is a hole cut in the ice. The Sauna House is the only one of the three open all year round.',
            ru: 'Сердце дома — дровяная баня. Она топится дровами, а не выключателем, и пруд в десяти шагах: летом для купания, зимой во льду прорублена прорубь. Банный дом — единственный из трёх, открытый круглый год.',
          },
          {
            et: 'See sobib seltskonnale, kes tahab ühte lauda ja oma sauna: sõpradele, kahele perele, väiksele tähistamisele. Maja renditakse tervikuna. Ümberringi on Lahemaa – Palmse, Sagadi ja Vihula mõis lühikese sõidu kaugusel, Altja kaluriküla ja rannik põhja pool, Oandu külastuskeskus ja loodusmetsarada jalutuskäigu kaugusel. Tallinnasse on umbes 90 kilomeetrit.',
            en: 'It suits a group who want one table and a sauna of their own: friends, two families, a small celebration. The house is rented whole. Around it is Lahemaa — the manors of Palmse, Sagadi and Vihula a short drive away, Altja fishing village and the coast to the north, the Oandu visitor centre and the old-growth forest trail within walking distance. Tallinn is about 90 kilometres away.',
            ru: 'Подходит компании, которой нужен один стол и своя баня: друзьям, двум семьям, небольшому празднику. Дом сдаётся целиком. Вокруг — Лахемаа: мызы Палмсе, Сагади и Вихула в коротком переезде, рыбацкая деревня Алтья и побережье к северу, центр посетителей Оанду и тропа древнего леса в пешей доступности. До Таллинна около 90 километров.',
          },
        ],
        name: { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом' },
        tag:  { et: 'Saun, köök, seltskond – kõik olemas.', en: 'Sauna, kitchen, company – all there.', ru: 'Сауна, кухня, компания – всё есть.' },
        items: [
          { et: 'Kuni 5 ööbijat · 2 kahekohalist voodit · 2 korrust', en: 'Up to 5 guests · 2 double beds · 2 floors', ru: 'До 5 гостей · 2 двухместные кровати · 2 этажа' },
          { et: 'Avatud toad, puuküttega saun, täisvarustatud köök, kamin', en: 'Open rooms, wood-fired sauna, fully equipped kitchen, fireplace', ru: 'Открытые комнаты, дровяная сауна, оборудованная кухня, камин' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя' }, eur: 200, upTo: 2 },
          { guests: { et: '3–4 inimest', en: '3–4 guests', ru: '3–4 гостя' }, eur: 300, upTo: 4 },
        ],
        priceExtra: {
          et: 'Rohkem magamiskohti on saadaval – võta meiega otse ühendust.',
          en: 'More sleeping options are available – please contact us directly.',
          ru: 'Возможны дополнительные спальные места – свяжитесь с нами напрямую.',
        },
      },
      {
        slug: 'tiigimaja',
        seoKind: { et: 'majake tiigi ääres', en: 'waterside cabin', ru: 'домик на берегу пруда' },
        body: [
          {
            et: 'Tiigimaja seisab vee ääres, oma tiigi kaldal. Sees on üks avatud ruum: elutuba rohelise diivani ja nikerdatud katusetalaga, kamin uivpuust skulptuuri all ja klaasseinad, mis avanevad murule ja metsale. Kööginurgas on gaasipliit ja retrokülmik. Magamistoal on põrandast laeni aknad niidule.',
            en: 'The Pond House stands at the water, on the bank of its own pond. Inside is one open room: a living room with a green sofa and a carved roof beam, a fireplace beneath a driftwood sculpture, and glass walls that open onto lawn and forest. The kitchen corner has a gas hob and a retro fridge. The bedroom has floor-to-ceiling windows onto the meadow.',
            ru: 'Прудовой дом стоит у воды, на берегу собственного пруда. Внутри одно открытое пространство: гостиная с зелёным диваном и резной балкой, камин под скульптурой из коряги и стеклянные стены, открытые на газон и лес. В кухонном углу газовая плита и ретро-холодильник. В спальне окна в пол, выходящие на луг.',
          },
          {
            et: 'Ees on lai puitterrass lamamistoolide ja pergola all istumisalaga – hommikukohv vee kohal, õhtu välja. Maja on kahele.',
            en: 'In front is a broad timber deck with loungers and seating under a pergola — morning coffee over the water, the evening outdoors. The house is for two.',
            ru: 'Перед домом широкая деревянная терраса с шезлонгами и зоной отдыха под перголой — утренний кофе над водой, вечер на улице. Дом рассчитан на двоих.',
          },
          {
            et: 'See on kolmest kõige vaiksem ja sobib paarile. Saun on Saunamajas, mõne sammu kaugusel. Tiigimaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill. Lahemaa matkarajad, mõisad ja rannik on samamoodi lähedal nagu ülejäänud majadel.',
            en: 'It is the quietest of the three and suits a couple. The sauna is in the Sauna House, a few steps away. The Pond House closes for the winter, from 1 December to 31 March; the first night of the new season is 1 April. The Lahemaa trails, manors and coast are as near as they are from the other houses.',
            ru: 'Это самый тихий из трёх домов, он подходит паре. Баня — в Банном доме, в нескольких шагах. Прудовой дом закрыт на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля. Тропы Лахемаа, мызы и побережье так же близко, как и от остальных домов.',
          },
        ],
        name: { et: 'Tiigimaja', en: 'Pond House', ru: 'Прудовой дом' },
        tag:  { et: 'Tule kaheks päevaks. Jää kaheks nädalaks.', en: 'Come for two days. Stay for two weeks.', ru: 'Приедь на два дня. Останься на две недели.' },
        items: [
          { et: 'Kahele · suur terrass · kamin', en: 'For two · large terrace · fireplace', ru: 'На двоих · большая терраса · камин' },
          { et: 'Kööginurk, vannituba', en: 'Kitchenette, bathroom', ru: 'Кухонный угол, ванная' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя' }, eur: 150, upTo: 2 },
        ],
        priceExtra: null,
      },
      {
        slug: 'metsamaja',
        seoKind: { et: 'palkmaja metsa serval', en: 'forest cabin', ru: 'дом среди елей' },
        body: [
          {
            et: 'Metsamaja seisab kõrgete kuuskede vahel, muru serval. Kaks magamistuba 180 cm voodiga, kamin, miniköök, WC ja dušš. Elutoas on tepitud diivan lambanahkade all, ruuduline vaip ja rippkiik akna all; magamistoa palkseinte vahel valgustatud pullipea voodi kohal.',
            en: 'The Forest House stands among tall spruce at the edge of the lawn. Two bedrooms with 180 cm beds, a fireplace, a mini kitchen, a WC and a shower. In the living room a buttoned sofa under sheepskins, a checked rug and a hanging chair at the window; in the bedroom, between log walls, a lit bull’s head above the bed.',
            ru: 'Лесной дом стоит среди высоких елей на краю газона. Две спальни с кроватями 180 см, камин, мини-кухня, санузел с душем. В гостиной стёганый диван под овчинами, клетчатый ковёр и подвесное кресло у окна; в спальне между бревенчатыми стенами — подсвеченная голова быка над кроватью.',
          },
          {
            et: 'See on neljale ja sobib perele või kahele paarile: kaks eraldi magamistuba, oma kamin ja mets akna taga. Maja renditakse tervikuna.',
            en: 'It is for four and suits a family or two couples: two separate bedrooms, a fireplace of its own and forest outside the window. The house is rented whole.',
            ru: 'Дом на четверых, подходит семье или двум парам: две отдельные спальни, собственный камин и лес за окном. Дом сдаётся целиком.',
          },
          {
            et: 'Saun on Saunamajas, mõne sammu kaugusel üle muru. Metsamaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill. Matkarajad algavad külast, Palmse, Sagadi ja Vihula mõis ning Altja rannik on lühikese sõidu kaugusel, Tallinnasse umbes 90 kilomeetrit.',
            en: 'The sauna is in the Sauna House, a few steps across the lawn. The Forest House closes for the winter, from 1 December to 31 March; the first night of the new season is 1 April. The trails start from the village, the manors of Palmse, Sagadi and Vihula and the coast at Altja are a short drive away, and Tallinn is about 90 kilometres.',
            ru: 'Баня — в Банном доме, в нескольких шагах через газон. Лесной дом закрыт на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля. Тропы начинаются от деревни, мызы Палмсе, Сагади и Вихула и побережье в Алтья — в коротком переезде, до Таллинна около 90 километров.',
          },
        ],
        name: { et: 'Metsamaja', en: 'Forest House', ru: 'Лесной дом' },
        tag:  { et: 'Neli inimest. Kaks tuba. Üks mets.', en: 'Four people. Two rooms. One forest.', ru: 'Четыре человека. Две комнаты. Один лес.' },
        items: [
          { et: 'Neljale · 2 magamistuba (180 cm voodid)', en: 'For four · 2 bedrooms (180 cm beds)', ru: 'На четверых · 2 спальни (кровати 180 см)' },
          { et: 'Kamin, mini köök, WC ja dušš', en: 'Fireplace, mini kitchen, WC and shower', ru: 'Камин, мини-кухня, туалет и душ' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя' }, eur: 150, upTo: 2 },
          { guests: { et: '3–4 inimest', en: '3–4 guests', ru: '3–4 гостя' }, eur: 200, upTo: 4 },
        ],
        priceExtra: null,
      },
    ],
    priceLabel:  { et: 'Hind', en: 'Price', ru: 'Цена' },
    priceUnit:   { et: 'öö', en: 'night', ru: 'ночь' },
    priceNote: {
      et: 'Hinnad on kogu maja kohta ööpäevas. Kõrghooajal, pühade ajal ja pikemate broneeringute puhul võivad hinnad erineda – küsi pakkumist.',
      en: 'Prices are for the whole house, per night. They can differ in high season, over holidays and for longer stays – ask us for an offer.',
      ru: 'Цены указаны за весь дом за сутки. В высокий сезон, в праздники и при длительном проживании цены могут отличаться – запросите предложение.',
    },
    cta:         { et: 'Vaata saadavust', en: 'Check availability', ru: 'Проверить наличие' },
    galleryLink: { et: 'Vaata pilte', en: 'View photos', ru: 'Смотреть фото' },
    imgLabel:    { et: 'Oandu · Lahemaa · 59°26′N', en: 'Oandu · Lahemaa · 59°26′N', ru: 'Оанду · Лахемаа · 59°26′N' },
  },
  trails: {
    label: { et: 'Loodus', en: 'Nature', ru: 'Природа' },
    h1:   { et: 'Spaa on õues.', en: 'The spa is outside.', ru: 'Спа – на улице.' },
    h2:   { et: 'Tervis ', en: 'Health ', ru: 'Здоровье ' },
    h2em: { et: 'tuleb.', en: 'comes.', ru: 'приходит.' },
    desc1: {
      et: 'Puuküttega saun, tiigikümblus, allikavesi, linnulaul. Pole protseduuride nimekirja ega broneerimisportaali – ainult mets, vesi ja vaikus.',
      en: 'Wood-fired sauna, pond bathing, spring water, birdsong. No list of treatments, no booking portal – just forest, water and silence.',
      ru: 'Дровяная сауна, купание в пруду, родниковая вода, пение птиц. Никаких списков процедур и порталов – только лес, вода и тишина.',
    },
    desc2: {
      et: 'Kolme mõisa vahel: Palmse, Sagadi ja Vihula – kõik kivikese kaugusel. Siit algab kuus matkarada, sh Eesti pikim – Oandu-Ikla, 822 km.',
      en: 'Between three manors: Palmse, Sagadi and Vihula – all a stone\'s throw away. Six hiking trails begin here, including Estonia\'s longest – Oandu-Ikla, 822 km.',
      ru: 'Между тремя поместьями: Палмсе, Сагади и Вихула – все в двух шагах. Отсюда начинаются шесть маршрутов, в т.ч. самый длинный в Эстонии – Оанду-Икла, 822 км.',
    },
    mapLabel: { et: 'Asukoht', en: 'Where we are', ru: 'Расположение' },
    mapAlt: {
      et: 'Kaart: Oanduaia Oandu külas, tiik ja majad ringiga tähistatud',
      en: 'Map: Oanduaia in Oandu village, its pond and houses circled',
      ru: 'Карта: Oanduaia в деревне Оанду, пруд и дома обведены',
    },
    mapOpen: { et: 'Ava Google Mapsis', en: 'Open in Google Maps', ru: 'Открыть в Google Maps' },
    mapBook: { et: 'Broneeri oma aeg', en: 'Book your stay', ru: 'Забронировать' },
    nearby: {
      et: 'Palmse, Sagadi ja Vihula mõis jäävad kõik lühikese sõidu kaugusele. Altja kaluriküla oma kiigega on rannikul põhja pool, Käsmu – kaptenite küla – veidi kaugemal läänes. Oandu külastuskeskus ja loodusmetsarada on jalutuskäigu kaugusel. Tallinnasse on umbes 90 kilomeetrit, veidi üle tunni autoga.',
      en: 'The manors of Palmse, Sagadi and Vihula are each a short drive away. Altja fishing village and its swing sit on the coast to the north; Käsmu, the captains’ village, a little further west. The Oandu visitor centre and the old-growth forest trail are within walking distance. Tallinn is about 90 kilometres away, a little over an hour by car.',
      ru: 'Мызы Палмсе, Сагади и Вихула — каждая в коротком переезде. Рыбацкая деревня Алтья со своими качелями лежит на побережье к северу, Кясму, деревня капитанов, — чуть западнее. Центр посетителей Оанду и тропа древнего леса — в пешей доступности. До Таллинна около 90 километров, чуть больше часа на машине.',
    },
    items: [
      {
        dist: { et: '822 km · pikkajaline', en: '822 km · long-distance', ru: '822 км · дальний' },
        name: { et: 'Oandu-Ikla matkatee', en: 'Oandu–Ikla Trail', ru: 'Маршрут Оанду–Икла' },
        desc: { et: 'Eesti pikim märgistatud matkarada. Algab siin.', en: "Estonia's longest marked trail. Starts here.", ru: 'Самый длинный маршрут Эстонии. Начинается здесь.' },
      },
      {
        dist: { et: '~4 km · kerge', en: '~4 km · easy', ru: '~4 км · лёгкий' },
        name: { et: 'Oandu loodusmetsarada', en: 'Oandu Nature Forest Trail', ru: 'Природная тропа Оанду' },
        desc: { et: 'Looduslik ringrada läbi muistse metsa ja ürgoru.', en: 'A natural loop through ancient forest and a primeval valley.', ru: 'Кольцевая тропа через древний лес и долину.' },
      },
      {
        dist: { et: '~14 km · keskmine', en: '~14 km · medium', ru: '~14 км · средний' },
        name: { et: 'Võsu-Oandu matkarada', en: 'Võsu–Oandu Trail', ru: 'Маршрут Высу–Оанду' },
        desc: { et: 'Meri kuni mets – rannikult läbi rahvuspargi.', en: 'Sea to forest – from the coast through the national park.', ru: 'От моря до леса – с побережья через нацпарк.' },
      },
      {
        dist: { et: '~1,3 km · kerge', en: '~1.3 km · easy', ru: '~1.3 км · лёгкий' },
        name: { et: 'Koprarada', en: 'Beaver Trail', ru: 'Бобровая тропа' },
        desc: { et: 'Lühike rada koprapaisude ja järvepindade vaatluspunktideni.', en: 'A short trail to beaver dams and lake observation points.', ru: 'Короткая тропа к бобровым плотинам и смотровым площадкам.' },
      },
      {
        dist: { et: '~8 km · kerge', en: '~8 km · easy', ru: '~8 км · лёгкий' },
        name: { et: 'Pärimusrada', en: 'Heritage Trail', ru: 'Тропа наследия' },
        desc: { et: 'Lahemaa külade pärimusloo jälgedel.', en: 'Following the heritage story of Lahemaa villages.', ru: 'По следам исторического наследия деревень Лахемаа.' },
      },
      {
        dist: { et: '~11 km · keskmine', en: '~11 km · medium', ru: '~11 км · средний' },
        name: { et: 'Altja matkarada', en: 'Altja Hiking Trail', ru: 'Тропа Алтья' },
        desc: { et: 'Altja kaluriküla kaudu rannikule. Ajalugu ja loodus.', en: 'Via Altja fishing village to the coast. History and nature.', ru: 'Через рыбацкую деревню Алтья к побережью. История и природа.' },
      },
    ],
  },
  stats: {
    l1: { et: 'Booking.com hinne', en: 'Booking.com rating', ru: 'Рейтинг Booking.com' },
    l2: { et: 'privaatset maja', en: 'private houses', ru: 'отдельных дома' },
    l3: { et: 'km Eesti pikim matkarada', en: "km Estonia's longest trail", ru: 'км – самый длинный маршрут' },
    l4: { et: 'm² kaetud väliköök', en: 'm² covered outdoor kitchen', ru: 'м² крытая летняя кухня' },
  },
  reviews: {
    label: { et: 'Arvustused', en: 'Reviews', ru: 'Отзывы' },
    h1:    { et: 'Mida külalised', en: 'What our guests', ru: 'Что говорят' },
    h2em:  { et: 'räägivad.', en: 'say.', ru: 'наши гости.' },
    sub: {
      et: 'Kolm kohta, kus meist kirjutatakse. Kõik hinnangud on külaliste omad.',
      en: 'Three places where guests write about us. Every score is theirs, not ours.',
      ru: 'Три места, где о нас пишут. Все оценки принадлежат гостям.',
    },
    read:  { et: 'Loe arvustusi', en: 'Read the reviews', ru: 'Читать отзывы' },
    writeH: { et: 'Käisid meil?', en: 'Stayed with us?', ru: 'Гостили у нас?' },
    writeSub: {
      et: 'Paar rida sinult aitab järgmisel külalisel meid üles leida.',
      en: 'A couple of lines from you helps the next guest find us.',
      ru: 'Пара строк от вас поможет следующему гостю нас найти.',
    },
    write: { et: 'Kirjuta arvustus', en: 'Write a review', ru: 'Написать отзыв' },
  },
  housePage: {
    eyebrow:  { et: 'Majutus', en: 'Accommodation', ru: 'Размещение' },
    facts:    { et: 'Majas on', en: 'In the house', ru: 'В доме' },
    otherH:   { et: 'Teised majad', en: 'The other houses', ru: 'Другие дома' },
    back:     { et: '← Kõik majad', en: '← All houses', ru: '← Все дома' },
    more:     { et: 'Vaata maja', en: 'See the house', ru: 'Посмотреть дом' },
    photos:   { et: 'Pildid', en: 'Photographs', ru: 'Фотографии' },
    // Titles and descriptions are composed from published copy only — the house name, its
    // own tagline, its first detail line and its lowest published rate. Nothing invented.
    titlePlace:   { et: 'Lahemaa', en: 'Lahemaa', ru: 'Лахемаа' },
    titleCountry: { et: 'Eesti', en: 'Estonia', ru: 'Эстония' },
    titleSuffix: {
      et: 'majutus Lahemaal | Oanduaia',
      en: 'lodging in Lahemaa, Estonia | Oanduaia',
      ru: 'проживание в Лахемаа, Эстония | Oanduaia',
    },
    descFrom: { et: 'Hind alates', en: 'From', ru: 'От' },
    descUnit: {
      et: '€ öö kogu maja eest. Oandu küla, Lahemaa rahvuspark.',
      en: '€ per night for the whole house. Oandu village, Lahemaa National Park, Estonia.',
      ru: '€ за ночь за весь дом. Деревня Оанду, национальный парк Лахемаа.',
    },
  },
  availability: {
    label:   { et: 'Saadavus', en: 'Availability', ru: 'Наличие' },
    h1:      { et: 'Vali maja', en: 'Choose a house', ru: 'Выберите дом' },
    h2em:    { et: 'ja kuupäevad.', en: 'and your dates.', ru: 'и даты.' },
    sub: {
      et: 'Kalender näitab, millal majad vabad on. Vali periood – arvutame hinna ja saadad päringu ühe vajutusega.',
      en: 'The calendar shows when the houses are free. Pick your dates – we work out the price and your request goes off in one click.',
      ru: 'Календарь показывает, когда дома свободны. Выберите даты – мы рассчитаем цену, и запрос уйдёт одним нажатием.',
    },
    lHouse:  { et: 'Maja', en: 'House', ru: 'Дом' },
    lGuests: { et: 'Külalisi', en: 'Guests', ru: 'Гостей' },
    lDates:  { et: 'Kuupäevad', en: 'Dates', ru: 'Даты' },
    pickIn:  { et: 'Vali saabumispäev', en: 'Pick your arrival day', ru: 'Выберите день заезда' },
    pickOut: { et: 'Vali lahkumispäev', en: 'Pick your departure day', ru: 'Выберите день отъезда' },
    prevMonth: { et: 'Eelmine kuu', en: 'Previous month', ru: 'Предыдущий месяц' },
    nextMonth: { et: 'Järgmine kuu', en: 'Next month', ru: 'Следующий месяц' },
    legendFree:  { et: 'Vaba', en: 'Free', ru: 'Свободно' },
    legendTaken: { et: 'Hõivatud', en: 'Booked', ru: 'Занято' },
    legendPicked:{ et: 'Valitud', en: 'Selected', ru: 'Выбрано' },
    loading: { et: 'Laen kalendrit…', en: 'Loading the calendar…', ru: 'Загружаем календарь…' },
    // Shown when the channel feeds are unreachable, and when they are not connected yet.
    // In both cases the dates can still be chosen — we simply do not claim they are free.
    unknown: {
      et: 'Hõivatud kuupäevi ei õnnestunud laadida. Vali soovitud aeg – kinnitame vabad kuupäevad e-kirjaga.',
      en: 'We could not load the booked dates. Pick the time you want – we will confirm availability by e-mail.',
      ru: 'Не удалось загрузить занятые даты. Выберите желаемое время – мы подтвердим наличие по эл. почте.',
    },
    // Before the channel feeds are linked there is nothing wrong to report — the calendar
    // simply does not claim to know, and the enquiry answers the question.
    notLinked: {
      et: 'Vali soovitud aeg – kinnitame vabad kuupäevad e-kirjaga.',
      en: 'Pick the time you want – we confirm the free dates by e-mail.',
      ru: 'Выберите желаемое время – свободные даты подтвердим по эл. почте.',
    },
    crosses: {
      et: 'Selles vahemikus on juba hõivatud öid. Vali teine periood.',
      en: 'That range runs across nights that are already taken. Please choose another period.',
      ru: 'В этом промежутке есть занятые ночи. Выберите другой период.',
    },
    // Estonian: 1 öö / 2 ööd. English: 1 night / 2 nights. Russian: 1 ночь / 2 ночи / 5 ночей.
    nightOne:  { et: 'öö', en: 'night', ru: 'ночь' },
    nightFew:  { et: 'ööd', en: 'nights', ru: 'ночи' },
    nightMany: { et: 'ööd', en: 'nights', ru: 'ночей' },
    petAdd: {
      et: 'Tulen lemmikloomaga · 20 € broneeringu kohta',
      en: 'Bringing a pet · 20 € per stay',
      ru: 'Приеду с питомцем · 20 € за проживание',
    },
    breakfastAdd: {
      et: 'Soovin hommikusööki · 20 € inimese kohta hommikus',
      en: 'I would like breakfast · 20 € per person, per morning',
      ru: 'Хочу завтрак · 20 € с человека в утро',
    },
    breakfastLine: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак' },
    petLine:  { et: 'Lemmikloom', en: 'Pet fee', ru: 'Питомец' },
    total:    { et: 'Kokku', en: 'Total', ru: 'Итого' },
    indicative: {
      et: 'Esialgne hind. Kinnitame vabad kuupäevad ja lõpliku hinna e-kirjaga.',
      en: 'Indicative price. We confirm the dates and the final price by e-mail.',
      ru: 'Предварительная цена. Даты и итоговую сумму подтвердим по эл. почте.',
    },
    cta:      { et: 'Küsi neid kuupäevi', en: 'Request these dates', ru: 'Запросить эти даты' },
    // Prefilled into the message field, so the enquiry arrives already answered.
    mHouse:   { et: 'Maja', en: 'House', ru: 'Дом' },
    mGuests:  { et: 'Külalisi', en: 'Guests', ru: 'Гостей' },
    mPet:     { et: 'Lemmikloom', en: 'Pet', ru: 'Питомец' },
    mBreakfast: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак' },
    mEstimate:{ et: 'Esialgne hind', en: 'Indicative price', ru: 'Предварительная цена' },
    mYes:     { et: 'jah', en: 'yes', ru: 'да' },
  },
  /*
   * The scannable summary of the offer, between the houses and the questions. Six
   * reasons, each one a fact stated elsewhere on the site — nothing here is a new
   * promise, it is the same promises gathered where someone skimming will see them.
   */
  why: {
    label: { et: 'Miks siia', en: 'Why stay here', ru: 'Почему сюда' },
    h1:    { et: 'Kuus põhjust,', en: 'Six reasons,', ru: 'Шесть причин,' },
    h2em:  { et: 'miks tulla.', en: 'to come.', ru: 'чтобы приехать.' },
    items: [
      {
        icon: 'house',
        t: { et: 'Terve maja endale', en: 'The whole house to yourself', ru: 'Весь дом только вам' },
        d: {
          et: 'Iga maja renditakse tervikuna. Ei jagatud koridore ega naabreid seina taga.',
          en: 'Each house is rented whole. No shared corridors, no neighbours through the wall.',
          ru: 'Каждый дом сдаётся целиком. Ни общих коридоров, ни соседей за стеной.',
        },
      },
      {
        icon: 'flame',
        t: { et: 'Puuküttega saun', en: 'A wood-fired sauna', ru: 'Дровяная баня' },
        d: {
          et: 'Köetud puudega, mitte lülitiga. Tiik on kümne sammu kaugusel, talvel on jääs auk.',
          en: 'Heated with wood, not a switch. The pond is ten steps away, and in winter there is a hole in the ice.',
          ru: 'Топится дровами, а не выключателем. Пруд в десяти шагах, зимой во льду прорубь.',
        },
      },
      {
        icon: 'tree',
        t: { et: 'Rahvuspargi sees', en: 'Inside a national park', ru: 'Внутри национального парка' },
        d: {
          et: 'Lahemaa algab väravast. Ürgmets, raba, rannik ja kolm mõisa lühikese sõidu kaugusel.',
          en: 'Lahemaa begins at the gate. Old-growth forest, bog, coast and three manors a short drive away.',
          ru: 'Лахемаа начинается у ворот. Древний лес, болото, побережье и три мызы неподалёку.',
        },
      },
      {
        icon: 'trail',
        t: { et: 'Kuus rada uksest', en: 'Six trails from the door', ru: 'Шесть троп от порога' },
        d: {
          et: 'Nende seas Oandu–Ikla, Eesti pikim märgistatud matkarada, mis algab siit.',
          en: 'Among them Oandu–Ikla, the longest marked trail in Estonia, which starts here.',
          ru: 'Среди них Оанду–Икла, самый длинный маркированный маршрут Эстонии, он начинается здесь.',
        },
      },
      {
        icon: 'bowl',
        t: { et: 'Perenaise köök', en: 'Food cooked by the host', ru: 'Кухня хозяйки' },
        d: {
          et: 'Hommikusöök, lõuna või pidulik pikk laud – kõik värskest toorainest, kohapeal tehtud.',
          en: 'Breakfast, lunch or a long table – all from fresh ingredients, cooked here.',
          ru: 'Завтрак, обед или праздничный длинный стол – всё из свежих продуктов, приготовлено здесь.',
        },
      },
      {
        icon: 'quiet',
        t: { et: 'Vaikus, meelega', en: 'Quiet, on purpose', ru: 'Тишина, намеренно' },
        d: {
          et: 'Majades WiFi-t ei ole. Mobiillevi on hea, nii et telefon töötab, kui vaja.',
          en: 'There is no WiFi in the houses. Mobile coverage is good, so a phone works when it must.',
          ru: 'Wi-Fi в домах нет. Мобильная связь хорошая, так что телефон работает, когда нужен.',
        },
      },
    ],
  },
  /*
   * The questions guests ask before booking, on the page as well as in the FAQPage
   * schema. Both read from ONE list in lib/i18n.ts, so the answer a search engine is
   * given and the answer a visitor reads can never drift apart.
   */
  faq: {
    label: { et: 'Korduma kippuvad küsimused', en: 'Frequently asked', ru: 'Частые вопросы' },
    h1:    { et: 'Enne kui', en: 'Before you', ru: 'Прежде чем' },
    h2em:  { et: 'küsid.', en: 'ask.', ru: 'спросить.' },
  },
  booking: {
    label:   { et: 'Reserveerimine', en: 'Reservations', ru: 'Бронирование' },
    h1:      { et: 'Millal sa', en: 'When do', ru: 'Когда вы' },
    h2em:    { et: 'tuled?', en: 'you arrive?', ru: 'приедете?' },
    sub:     { et: 'Kirjuta meile – leiame sobiva maja ja aja.', en: "Write to us – we'll find the right house and time.", ru: 'Напишите нам – подберём подходящий дом и время.' },
    // 24-hour clock in Estonian and Russian, 2 pm / 12 noon only in English.
    times:   {
      et: 'Saabumine alates 14.00 · lahkumine 12.00',
      en: 'Check-in from 2 pm · check-out 12 noon',
      ru: 'Заезд с 14.00 · выезд до 12.00',
    },
    terms:   {
      et: 'Lühim broneering üks öö · lemmikloom 20 € broneeringu kohta',
      en: 'Minimum stay one night · pet fee 20 € per stay',
      ru: 'Минимум одна ночь · питомец 20 € за проживание',
    },
    // Free parking, and no WiFi anywhere on the property. The second one is a booking
    // decision for some people, so it is stated plainly rather than left to be discovered
    // on arrival — and here it reads as what it is: the reason to come.
    practical: {
      et: 'Tasuta parkimine · WiFi-t majades ei ole, mobiillevi on hea',
      en: 'Free parking · no WiFi in the houses, mobile coverage is good',
      ru: 'Бесплатная парковка · Wi-Fi в домах нет, мобильная связь хорошая',
    },
    pets:    {
      et: 'Kui majas on samal ajal ka teisi külalisi, palume koera hoida rihma otsas. Lemmiklooma eest vastutab tema omanik.',
      en: 'If other guests are on the property at the same time, please keep your dog on a leash. Pets remain the responsibility of their owner.',
      ru: 'Если на территории одновременно находятся другие гости, просим держать собаку на поводке. За питомца отвечает его владелец.',
    },
    lNimi:   { et: 'Nimi', en: 'Name', ru: 'Имя' },
    pNimi:   { et: 'Sinu nimi', en: 'Your name', ru: 'Ваше имя' },
    lEmail:  { et: 'E-post', en: 'E-mail', ru: 'Эл. почта' },
    pEmail:  { et: 'sinu@email.ee', en: 'your@email.com', ru: 'ваш@email.ru' },
    lKuup:   { et: 'Kuupäevad', en: 'Dates', ru: 'Даты' },
    pKuup:   { et: 'Saabun – lahkun', en: 'Arrival – departure', ru: 'Заезд – выезд' },
    lSonum:  { et: 'Sõnum', en: 'Message', ru: 'Сообщение' },
    pSonum:  { et: 'Külaliste arv, soovid, küsimused...', en: 'Number of guests, wishes, questions...', ru: 'Кол-во гостей, пожелания, вопросы...' },
    submit:  { et: 'Küsi pakkumist', en: 'Request an offer', ru: 'Запросить предложение' },
    success: { et: 'Sõnum saadetud!', en: 'Message sent!', ru: 'Сообщение отправлено!' },
    successSub: { et: 'Aitäh, et kirjutasid. Vastame 24 tunni jooksul.', en: 'Thank you for reaching out. We\'ll reply within 24 hours.', ru: 'Спасибо за обращение. Мы ответим в течение 24 часов.' },
    sending: { et: 'Saadan...', en: 'Sending...', ru: 'Отправка...' },
    error:   { et: 'Midagi läks valesti. Palun proovi uuesti.', en: 'Something went wrong. Please try again.', ru: 'Что-то пошло не так. Попробуйте ещё раз.' },
    eSubj:   { et: 'Pakkumise päring – Oanduaia', en: 'Inquiry – Oanduaia', ru: 'Запрос предложения – Oanduaia' },
    eName:   { et: 'Nimi', en: 'Name', ru: 'Имя' },
    eEmail:  { et: 'E-post', en: 'Email', ru: 'Email' },
    eDates:  { et: 'Kuupäevad', en: 'Dates', ru: 'Даты' },
  },
  footer: {
    t1: { et: 'Saun, majutus ja loodus', en: 'Sauna, lodging and nature', ru: 'Сауна, проживание и природа' },
    t2: { et: 'Lahemaa südames.', en: 'in the heart of Lahemaa.', ru: 'в сердце Лахемаа.' },
    t3: { et: 'Oandu küla, Lääne-Virumaa', en: 'Oandu village, Lääne-Virumaa', ru: 'д. Оанду, Ляэне-Вирумаа' },
    navH:    { et: 'Navigatsioon', en: 'Navigation', ru: 'Навигация' },
    lugu:    { et: 'Lugu', en: 'Story', ru: 'История' },
    teenused:{ et: 'Toit', en: 'Food', ru: 'Еда' },
    majutus: { et: 'Majad', en: 'Houses', ru: 'Дома' },
    matkad:  { et: 'Loodus', en: 'Nature', ru: 'Природа' },
    broneeri:{ et: 'Broneeri', en: 'Book', ru: 'Бронь' },
    maps:    { et: 'Google Maps', en: 'Google Maps', ru: 'Google Карты' },
    contH:   { et: 'Kontakt', en: 'Contact', ru: 'Контакт' },
    copy:    { et: '© 2026 Oanduaia. Kõik õigused kaitstud.', en: '© 2026 Oanduaia. All rights reserved.', ru: '© 2026 Oanduaia. Все права защищены.' },
    loc:     { et: 'Lahemaa rahvuspark · Estonia', en: 'Lahemaa National Park · Estonia', ru: 'Нац. парк Лахемаа · Эстония' },
  },
  gallery: {
    intro: {
      et: 'Fotod Oanduaia kolmest majast, puuküttega saunast, tiigist ja Lahemaa rahvuspargi loodusest – suvest talveni. Saunamaja, Tiigimaja ja Metsamaja seest ja väljast, väliköök ja kaetud lauad, matkarajad ja rannik Oandu külas Lääne-Virumaal.',
      en: 'Photographs of the three Oanduaia cabins, the wood-fired sauna, the pond and the Lahemaa National Park around them, from summer through to winter. The Sauna House, Pond House and Forest House inside and out, the outdoor kitchen and the laid tables, the trails and the coast at Oandu village in Lääne-Virumaa, Estonia.',
      ru: 'Фотографии трёх домов Oanduaia, дровяной бани, пруда и природы национального парка Лахемаа — от лета до зимы. Банный, Прудовой и Лесной дом снаружи и внутри, летняя кухня и накрытые столы, тропы и побережье в деревне Оанду, Ляэне-Вирумаа, Эстония.',
    },
    title: { et: 'Galerii', en: 'Gallery', ru: 'Галерея' },
    back:  { et: '← Tagasi', en: '← Back', ru: '← Назад' },
  },
}
