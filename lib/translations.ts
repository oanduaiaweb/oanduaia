export type Lang = 'et' | 'en' | 'ru' | 'de'

export const T = {
  nav: {
    meist:    { et: 'Lugu',     en: 'Story',   ru: 'История', de: 'Geschichte' },
    majutus:  { et: 'Majad',    en: 'Houses',  ru: 'Дома', de: 'Häuser' },
    teenused: { et: 'Toit',     en: 'Food',    ru: 'Еда', de: 'Essen' },
    matkad:   { et: 'Loodus',   en: 'Nature',  ru: 'Природа', de: 'Natur' },
    // Matches the hero and the sticky button — one call to action, worded the same way
    // wherever it appears.
    broneeri: { et: 'Broneeri kohe', en: 'Book now', ru: 'Забронировать', de: 'Jetzt buchen' },
    arvustused: { et: 'Arvustused', en: 'Reviews', ru: 'Отзывы', de: 'Bewertungen' },
    galerii:  { et: 'Galerii',  en: 'Gallery', ru: 'Галерея', de: 'Galerie' },
  },
  hero: {
    line1:  { et: 'Kaugel',            en: 'Far',              ru: 'Вдали', de: 'Fern' },
    line2:  { et: 'kõigest.',          en: 'from all.',        ru: 'от всего.', de: 'von allem.' },
    line3:  { et: 'Puhka päriselt.',   en: 'Rest for real.',   ru: 'По\u2011настоящему.', de: 'Wirklich ausruhen.' },
    eyebrow:{ et: 'Lahemaa rahvuspark · Oandu · Est', en: 'Lahemaa National Park · Oandu · Est', ru: 'Нац. парк Лахемаа · Оанду · Est', de: 'Nationalpark Lahemaa · Oandu · Est' },
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
    /*
     * Names all three houses and asks the visitor to pick one. It replaced a line that
     * described the property in general terms — this one does the same job and also tells
     * someone which of the three they are choosing between, which is the actual decision.
     * The location words it gave up ("Lahemaa rahvuspark") sit directly beside it in the
     * place line and in the meta description, so nothing was lost that mattered.
     */
    desc:   {
      et: 'Puuküttega saunamaja, moodne tiigimaja või vaikne metsamaja – vali endale sobiv maja.',
      en: 'A wood-fired sauna house, a modern pond house or a quiet forest house — choose the one that suits you.',
      ru: 'Дом с дровяной баней, современный Прудовой дом или тихий Лесной дом — выберите подходящий.',
      de: 'Das Saunahaus mit Holzsauna, das moderne Teichhaus oder das stille Waldhaus – wählen Sie das passende.',
    },
    /*
     * "Küsi pakkumist" / "Request an offer" invited a negotiation, and "Vaata saadavust" /
     * "Check availability" described the next screen rather than the thing the visitor came
     * to do. Mikk asked for "Book now" on the landing button, and it is honest here: this
     * button only scrolls to the calendar, so it promises a start, not a confirmation. The
     * form's own submit button stays "Send booking request" — that one WOULD be a promise,
     * and nothing on this site confirms instantly.
     *
     * The in-page buttons further down (feature.cta, landing.cta) still say "Check
     * availability", which is what they actually offer at that point in the page.
     *
     * Shared with the sticky button, so the two can never drift apart.
     */
    cta:    { et: 'Broneeri kohe', en: 'Book now', ru: 'Забронировать', de: 'Jetzt buchen' },
    alt:    { et: 'Lahemaa mets', en: 'Lahemaa forest', ru: 'Лес Лахемаа', de: 'Der Wald von Lahemaa' },
  },
  intro: {
    label: { et: 'Lugu', en: 'Story', ru: 'История', de: 'Geschichte' },
    h1:    { et: 'Metsas', en: 'In the forest,', ru: 'В лесу', de: 'Im Wald' },
    h2:    { et: '', en: '', ru: '', de: '' },
    h2em:  { et: 'ärkas', en: 'beauty', ru: 'проснулась', de: 'erwachte' },
    h3:    { et: 'ilu.', en: 'awoke.', ru: 'красота.', de: 'die Schönheit.' },
    p1: {
      et: 'Peremees leidis kunagi metsatuka, kus keskel voolas oja. Vana talukoht – roheluse alla mattunud, aeg seisma jäänud. Ta hakkas võsa niitma. Mida rohkem niitis, seda rohkem ilu avanes – nagu mets oleks oodanud, et keegi lõpuks tuleb.',
      en: 'The owner once found a forest grove with a stream running through the middle. An old farmstead – buried under greenery, time standing still. He started clearing the scrub. The more he cleared, the more beauty opened up – as if the forest had been waiting for someone to finally come.',
      ru: 'Хозяин однажды нашёл лесную поляну с ручьём посередине. Старый хутор – утонувший в зелени, время остановилось. Он начал расчищать кустарник. Чем больше расчищал, тем больше красоты открывалось – словно лес ждал, что кто-то наконец придёт.',
      de: 'Der Besitzer fand einst einen Waldhain mit einem Bach mittendurch. Ein alter Bauernhof – überwuchert, die Zeit stand still. Er begann, das Gestrüpp zu roden. Je mehr er rodete, desto mehr Schönheit kam zum Vorschein – als hätte der Wald darauf gewartet, dass endlich jemand kommt.',
    },
    p2: {
      et: 'Kõigepealt kerkis saunamaja. Siis peamaja. Esimesed külalised olid sõbrad. Sõbrad rääkisid edasi. Nii see läks. Nii kasvab Oanduaia siiani – mitte reklaamist, vaid soovitustest. Mitte plaanist, vaid armastusest koha vastu.',
      en: 'First the sauna house rose. Then the main house. The first guests were friends. Friends told others. That is how it went. Oanduaia still grows this way – not from advertising, but from recommendations. Not from a plan, but from love for this place.',
      ru: 'Сначала построили банный домик. Потом главный дом. Первые гости были друзьями. Друзья рассказывали дальше. Так и пошло. Oanduaia растёт и сейчас – не через рекламу, а через рекомендации. Не по плану, а из любви к этому месту.',
      de: 'Zuerst entstand das Saunahaus. Dann das Haupthaus. Die ersten Gäste waren Freunde. Freunde erzählten es weiter. So ging es. Oanduaia wächst noch immer so – nicht durch Werbung, sondern durch Empfehlungen. Nicht aus einem Plan, sondern aus Liebe zu diesem Ort.',
    },
    p3: {
      et: 'Oanduaia asub Oandu külas Lääne-Virumaal, Lahemaa rahvuspargis – Eesti vanimas ja suurimas rahvuspargis, mis 1971. aastal asutatuna oli esimene kogu Nõukogude Liidus. Läänemere rannik jääb mõne minuti kaugusele põhja poole. Palmse, Sagadi ja Vihula mõis on kõik lühikese sõidu kaugusel. Tallinnasse on umbes 90 kilomeetrit, veidi üle tunni autoga.',
      en: 'Oanduaia stands in Oandu village in Lääne-Virumaa, inside Lahemaa National Park — the oldest and largest in Estonia, and when it was founded in 1971 the first national park in the whole Soviet Union. The Baltic coast is a few minutes north. The manors of Palmse, Sagadi and Vihula are each a short drive away. Tallinn is about 90 kilometres west, a little over an hour by car.',
      ru: 'Oanduaia находится в деревне Оанду в Ляэне-Вирумаа, в национальном парке Лахемаа — старейшем и крупнейшем в Эстонии, а в 1971 году, при основании, первом во всём Советском Союзе. До балтийского побережья несколько минут на север. Мызы Палмсе, Сагади и Вихула — каждая в коротком переезде. До Таллинна около 90 километров, чуть больше часа на машине.',
      de: 'Oanduaia liegt im Dorf Oandu im Kreis Lääne-Virumaa, im Nationalpark Lahemaa – dem ältesten und größten Estlands und bei seiner Gründung 1971 dem ersten der gesamten Sowjetunion. Die Ostseeküste liegt ein paar Minuten nördlich. Die Gutshöfe Palmse, Sagadi und Vihula sind jeweils eine kurze Fahrt entfernt. Tallinn liegt etwa 90 Kilometer westlich, gut eine Stunde mit dem Auto.',
    },
    p4: {
      et: 'Siin on puuküttega saun, tiik, kus ujuda, allikavesi ja linnulaul. Pole protseduuride nimekirja ega broneerimisportaali. Külast algab või möödub kuus märgistatud matkarada, nende seas RMK Oandu–Aegviidu–Ikla matkatee, mis algab RMK Oandu külastuskeskusest ja kulgeb 370 kilomeetrit läbi Kõrvemaa ja Soomaa Ikla piirini.',
      en: 'What is here is a wood-fired sauna, a pond to swim in, spring water and birdsong. There is no list of treatments and no booking portal. Six marked hiking trails start at or pass through the village, among them the RMK Oandu–Aegviidu–Ikla route, which begins at the RMK Oandu visitor centre and runs 370 kilometres through Kõrvemaa and Soomaa to Ikla on the Latvian border.',
      ru: 'Здесь дровяная баня, пруд, в котором можно плавать, родниковая вода и пение птиц. Никаких списков процедур и порталов бронирования. От деревни начинаются или через неё проходят шесть маркированных троп, среди них маршрут RMK Оанду–Аэгвийду–Икла: он начинается у центра посетителей RMK в Оанду и идёт 370 километров через Кырвемаа и Соомаа до Икла.',
      de: 'Hier gibt es eine Holzsauna, einen Teich zum Schwimmen, Quellwasser und Vogelgesang. Es gibt keine Behandlungsliste und kein Buchungsportal. Sechs markierte Wanderwege beginnen im Dorf oder führen hindurch, darunter die RMK-Route Oandu–Aegviidu–Ikla, die am RMK-Besucherzentrum Oandu startet und 370 Kilometer durch Kõrvemaa und Soomaa bis Ikla an der lettischen Grenze führt.',
    },
    p5: {
      et: 'See sobib paarile, kes tahab maja endale, perele, kes tahab lapsed õue, ja väiksele seltskonnale, kes tahab üht pikka lauda ja mitte kedagi teist majja. Iga maja renditakse tervikuna – jagama ei pea. Koerad on teretulnud. Talvel on Saunamaja avatud, saun köetud ja jäässe raiutud auk.',
      en: 'It suits a couple who want a house to themselves, a family who want the children outdoors, and a small group who want one long table and nobody else in the building. Each house is rented whole – you will not be sharing it. Dogs are welcome. In winter the Sauna House stays open, the sauna is lit, and there is a hole cut in the ice.',
      ru: 'Это подходит паре, которая хочет дом целиком, семье, которая хочет, чтобы дети были на улице, и небольшой компании, которой нужен один длинный стол и никого больше в доме. Каждый дом сдаётся целиком – делить его не придётся. Собаки желанны. Зимой Банный дом открыт, баня топится, а во льду прорублена прорубь.',
      de: 'Es passt für ein Paar, das ein Haus für sich möchte, für eine Familie, die die Kinder draußen haben will, und für eine kleine Gruppe, die eine lange Tafel möchte und sonst niemanden im Haus. Jedes Haus wird als Ganzes vermietet – Sie teilen es mit niemandem. Hunde sind willkommen. Im Winter bleibt das Saunahaus geöffnet, die Sauna wird geheizt, und ins Eis ist ein Loch geschnitten.',
    },
    p6: {
      et: 'Söögi teeb perenaine ise, värskest toorainest – hommikusöök, lõuna või pidulikult kaetud pikk laud. Oanduaia on pereettevõte ja on kasvanud soovituste, mitte reklaami toel.',
      en: 'The food is cooked by the host herself, from fresh ingredients – breakfast, lunch, or a long table laid for a celebration. Oanduaia is a family business, and it grew from recommendations rather than advertising.',
      ru: 'Еду готовит сама хозяйка, из свежих продуктов – завтрак, обед или празднично накрытый длинный стол. Oanduaia — семейное дело, выросшее на рекомендациях, а не на рекламе.',
      de: 'Das Essen kocht die Gastgeberin selbst, aus frischen Zutaten – Frühstück, Mittagessen oder eine lange Tafel für ein Fest. Oanduaia ist ein Familienbetrieb und ist aus Empfehlungen gewachsen, nicht aus Werbung.',
    },
  },
  services: {
    label: { et: 'Toit', en: 'Food', ru: 'Еда', de: 'Essen' },
    arrow: { et: 'Küsi menüü →', en: 'Ask for menu →', ru: 'Запросить меню →', de: 'Karte anfragen →' },
    s1: {
      t1: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак', de: 'Frühstück' },
      t2: { et: 'Lõuna', en: 'Lunch', ru: 'Обед', de: 'Mittagessen' },
      desc: {
        et: 'Hommikusöök, lõuna, pidulik pikk laud või kodusem supilõuna – kõik värskest toorainest, kõik perenaise enda tehtud.',
        en: 'Breakfast, lunch, a festive long table or a homier soup lunch – all from fresh ingredients, all made by the host herself.',
        ru: 'Завтрак, обед, торжественный стол или домашний суп – всё из свежих продуктов, всё приготовлено хозяйкой лично.',
        de: 'Frühstück, Mittagessen, eine festliche lange Tafel oder ein einfacheres Suppenessen – alles aus frischen Zutaten, alles von der Gastgeberin selbst zubereitet.',
      },
      price: {
        line:   { et: 'Hommikusöök 20 € inimese kohta hommikus', en: 'Breakfast 20 € per person, per morning', ru: 'Завтрак 20 € с человека в утро', de: 'Frühstück 20 € pro Person und Morgen' },
        detail: { et: 'Munad, peekon, puder, kohv', en: 'Eggs, bacon, porridge, coffee', ru: 'Яйца, бекон, каша, кофе', de: 'Eier, Speck, Porridge, Kaffee' },
        note:   { et: 'Lõuna- ja õhtusöögi valikute jaoks võta meiega ühendust.', en: 'Contact us for lunch and dinner options.', ru: 'Свяжитесь с нами, чтобы узнать варианты обеда и ужина.', de: 'Für Mittag- und Abendessen sprechen Sie uns an.' },
      },
    },
    s2: {
      t1: { et: 'Pidulik pikk laud', en: 'Festive long table', ru: 'Праздничный стол', de: 'Festliche lange Tafel' },
      t2: { et: '', en: '', ru: '', de: '' },
      /*
       * Two lines against the breakfast card's five left this side of the section
       * visibly short. It now says the thing that was missing anyway: the long table
       * is laid in the outdoor kitchen OR indoors, so weather is not a reason not to ask.
       */
      desc: {
        et: 'Ette tellides kahele kuni kümnele. Suvel kaetakse pikk laud väliköögis, rippuvate lillede ja valguskee all, kuni kahekümnele. Halva ilmaga ja talvel katame sama laua tuppa, maja enda lauale. Lilled, küünlad ja kristall käivad juurde – menüü lepime enne kokku.',
        en: 'Laid to order for two to ten. In summer the long table is set in the outdoor kitchen for up to twenty, under the hanging flowers and the string lights. In poor weather, and in winter, the same table is laid indoors on the house’s own. Flowers, candles and glassware come with it — the menu is agreed beforehand.',
        ru: 'По предварительному заказу на двух–десять человек. Летом длинный стол накрывают в летней кухне до двадцати гостей — под подвесными цветами и гирляндой. В непогоду и зимой тот же стол накрывают в доме. Цветы, свечи и хрусталь входят в это, меню согласуем заранее.',
        de: 'Auf Bestellung für zwei bis zehn Personen gedeckt. Im Sommer wird die lange Tafel in der Außenküche für bis zu zwanzig gedeckt, unter den hängenden Blumen und den Lichterketten. Bei schlechtem Wetter und im Winter wird dieselbe Tafel drinnen im Haus gedeckt. Blumen, Kerzen und Gläser gehören dazu – die Karte wird vorher abgesprochen.',
      },
      price: null,
    },
  },
  feature: {
    label: { et: 'Majad', en: 'Houses', ru: 'Дома', de: 'Häuser' },
    // Eyebrow stays "Majad"; the headline is the accommodation offer.
    // Estonian is one compound word, so it takes no second line.
    h1:   { et: 'Majutusvõimalused', en: 'Accommodation', ru: 'Варианты', de: 'Unterkünfte' },
    h2:   { et: '', en: 'options.', ru: 'размещения.', de: 'zur Auswahl.' },
    /* Labels for the three-house comparison table. */
    compareLabel: { et: 'Kolm maja kõrvuti', en: 'The three houses side by side', ru: 'Три дома рядом', de: 'Die drei Häuser nebeneinander' },
    compareRows: {
      guests:   { et: 'Kohti', en: 'Sleeps', ru: 'Мест', de: 'Plätze' },
      bedrooms: { et: 'Magamine', en: 'Sleeping', ru: 'Спальни', de: 'Schlafen' },
      sauna:    { et: 'Saun', en: 'Sauna', ru: 'Баня', de: 'Sauna' },
      kitchen:  { et: 'Köök', en: 'Kitchen', ru: 'Кухня', de: 'Küche' },
      winter:   { et: 'Talvel', en: 'In winter', ru: 'Зимой', de: 'Im Winter' },
      // Not "from" any more — the row lists every tier, so a minimum would misdescribe it.
      price:    { et: 'Hind', en: 'Price', ru: 'Цена', de: 'Preis' },
      bestFor:  { et: 'Sobib', en: 'Best for', ru: 'Подходит', de: 'Passt für' },
      extra:    { et: 'Lisaks', en: 'Extra', ru: 'Дополнительно', de: 'Zusätzlich' },
    },
    compareUnit: { et: 'ööpäev, kogu maja', en: 'a night, whole house', ru: 'за ночь, весь дом', de: 'pro Nacht, ganzes Haus' },
    houses: [
      {
        slug: 'saunamaja',
        /*
         * How the house is built, under the facts on its own page.
         *
         * DELIBERATELY SAYS NOTHING ABOUT THE ROOF. The roofs are not the same across the
         * property — the main house and the garage are reed, the outdoor kitchen is
         * different again, and Metsamaja's own photograph shows sheet metal. What IS true of
         * every house is the walls: thick solid logs from Estonian forest, no drywall. Say
         * only that, and no page can be contradicted by the picture sitting on it.
         */
        build: {
          et: 'Ehitatud vanamoodi: jämedatest palkidest massiivsed seinad, materjal Eesti metsast. Kipsplaati majas ei ole.',
          en: 'Built the old way: solid walls of thick, heavy logs, the timber from Estonian forest. There is no drywall in this house.',
          ru: 'Построено по-старому: массивные стены из толстых брёвен, дерево из эстонского леса. Гипсокартона в доме нет.',
          de: 'Auf die alte Art gebaut: massive Wände aus dicken, schweren Balken, das Holz aus estnischem Wald. Rigips gibt es in diesem Haus nicht.',
        },
        sleeps: 4,
        compare: {
          bedrooms: { et: '2 korrust, avatud toad', en: '2 floors, open rooms', ru: '2 этажа, открытые комнаты', de: '2 Etagen, offene Räume' },
          // Named, not "in the house" — the other two rows point AT the Sauna House, so this
          // one naming itself is what makes the three cells comparable at a glance.
          sauna:    { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом', de: 'Saunahaus' },
          kitchen:  { et: 'Täisvarustatud', en: 'Fully equipped', ru: 'Полностью оборудована', de: 'Voll ausgestattet' },
          winter:   { et: 'Avatud', en: 'Open', ru: 'Открыт', de: 'Geöffnet' },
          bestFor:  { et: 'Seltskond, väike tähistamine', en: 'A group, a small celebration', ru: 'Компания, небольшой праздник', de: 'Eine Gruppe, eine kleine Feier' },
          extra:    { et: 'Lisavoodi lapsele', en: 'Extra bed for a child', ru: 'Детская доп. кровать', de: 'Zusatzbett für ein Kind' },
        },
        /*
         * Prose for the house page. The three cabins had 220-250 indexable words each
         * and leaned on photographs; a search engine cannot read a photograph. Written
         * from what is already true of the house — the build, who it suits, what is
         * around it — not padded to a word count.
         */
        seoKind: { et: 'saunaga palkmaja', en: 'sauna cabin', ru: 'сруб с дровяной баней', de: 'Ferienhaus mit Sauna' },
        body: [
          {
            et: 'Saunamaja on roogkatusega palkmaja Oandu külas, Lahemaa rahvuspargi sees. Kaks korrust, avatud toad, paeplaatidest põrand ja kamin, mille kohal on sepistatud tammeokstega rõdupiire. Köök on täisvarustatud, köögisaar telliskivijalal ja puuküttega pliit. Magamiskohti on neljale, kaks kahekohalist voodit üle kahe korruse.',
            en: 'The Sauna House is a thatched log cabin in Oandu village, inside Lahemaa National Park. Two floors, open rooms, a flagstone floor and a fireplace, with a loft above it behind a balustrade of forged oak branches. The kitchen is fully equipped — an island on a brick base and a wood-fired range. It sleeps four, two double beds across two floors.',
            ru: 'Банный дом — бревенчатый дом с камышовой крышей в деревне Оанду, в национальном парке Лахемаа. Два этажа, открытые комнаты, каменный пол и камин, а над ним антресоль за коваными дубовыми ветвями ограждения. Кухня полностью оборудована: остров на кирпичном основании и дровяная плита. Спальных мест на четверых — две двуспальные кровати на двух этажах.',
            de: 'Das Saunahaus ist ein reetgedecktes Blockhaus im Dorf Oandu, im Nationalpark Lahemaa. Zwei Etagen, offene Räume, ein Steinplattenboden und ein Kamin, darüber eine Galerie hinter einem Geländer aus geschmiedeten Eichenzweigen. Die Küche ist voll ausgestattet – eine Insel auf gemauertem Sockel und ein Holzherd. Es bietet vier Personen Platz, zwei Doppelbetten über zwei Etagen.',
          },
          {
            et: 'Süda on puuküttega saun. Köetakse puudega, mitte lülitiga, ja tiik on kümne sammu kaugusel – suvel ujumiseks, talvel on jäässe raiutud auk. Saunamaja on ainus kolmest, mis on avatud aasta läbi.',
            en: 'The heart of it is the wood-fired sauna. It is heated with wood, not a switch, and the pond is ten steps away — for swimming in summer, and in winter there is a hole cut in the ice. The Sauna House is the only one of the three open all year round.',
            ru: 'Сердце дома — дровяная баня. Она топится дровами, а не выключателем, и пруд в десяти шагах: летом для купания, зимой во льду прорублена прорубь. Банный дом — единственный из трёх, открытый круглый год.',
            de: 'Das Herzstück ist die Holzsauna. Sie wird mit Holz geheizt, nicht mit einem Schalter, und der Teich ist zehn Schritte entfernt – im Sommer zum Schwimmen, im Winter ist ein Loch ins Eis geschnitten. Das Saunahaus ist das einzige der drei, das ganzjährig geöffnet ist.',
          },
          {
            et: 'See sobib seltskonnale, kes tahab ühte lauda ja oma sauna: sõpradele, kahele perele, väiksele tähistamisele. Maja renditakse tervikuna. Ümberringi on Lahemaa – Palmse, Sagadi ja Vihula mõis lühikese sõidu kaugusel, Altja kaluriküla ja rannik põhja pool, Oandu külastuskeskus ja loodusmetsarada jalutuskäigu kaugusel. Tallinnasse on umbes 90 kilomeetrit.',
            en: 'It suits a group who want one table and a sauna of their own: friends, two families, a small celebration. The house is rented whole. Around it is Lahemaa — the manors of Palmse, Sagadi and Vihula a short drive away, Altja fishing village and the coast to the north, the Oandu visitor centre and the old-growth forest trail within walking distance. Tallinn is about 90 kilometres away.',
            ru: 'Подходит компании, которой нужен один стол и своя баня: друзьям, двум семьям, небольшому празднику. Дом сдаётся целиком. Вокруг — Лахемаа: мызы Палмсе, Сагади и Вихула в коротком переезде, рыбацкая деревня Алтья и побережье к северу, центр посетителей Оанду и тропа древнего леса в пешей доступности. До Таллинна около 90 километров.',
            de: 'Es passt für eine Gruppe, die eine Tafel und eine eigene Sauna möchte: Freunde, zwei Familien, eine kleine Feier. Das Haus wird als Ganzes vermietet. Ringsum liegt Lahemaa – die Gutshöfe Palmse, Sagadi und Vihula eine kurze Fahrt entfernt, das Fischerdorf Altja und die Küste im Norden, das Besucherzentrum Oandu und der Urwaldpfad in Gehweite. Tallinn ist etwa 90 Kilometer entfernt.',
          },
        ],
        name: { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом', de: 'Saunahaus' },
        tag:  { et: 'Saun, köök, seltskond – kõik olemas.', en: 'Sauna, kitchen, company – all there.', ru: 'Сауна, кухня, компания – всё есть.', de: 'Sauna, Küche, Gesellschaft – alles da.' },
        items: [
          { et: 'Kuni 4 ööbijat · 2 kahekohalist voodit · 2 korrust', en: 'Up to 4 guests · 2 double beds · 2 floors', ru: 'До 4 гостей · 2 двухместные кровати · 2 этажа', de: 'Bis zu 4 Gäste · 2 Doppelbetten · 2 Etagen' },
          { et: 'Avatud toad, puuküttega saun, täisvarustatud köök, külmavann tiigis', en: 'Open rooms, wood-fired sauna, fully equipped kitchen, cold plunge in the pond', ru: 'Открытые комнаты, дровяная сауна, оборудованная кухня, холодное купание в пруду', de: 'Offene Räume, Holzsauna, voll ausgestattete Küche, Kaltbad im Teich' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя', de: '1–2 Gäste' }, eur: 200, upTo: 2 },
          { guests: { et: '3–4 inimest', en: '3–4 guests', ru: '3–4 гостя', de: '3–4 Gäste' }, eur: 300, upTo: 4 },
        ],
        priceExtra: {
          et: 'Lapsele saab igasse majja lisavoodi – kokkuleppel broneerides.',
          en: 'An extra bed for a child can be added in any house – by arrangement when you book.',
          ru: 'Детскую дополнительную кровать можно поставить в любом доме – по договорённости при бронировании.',
          de: 'In jedem Haus kann ein Zusatzbett für ein Kind aufgestellt werden – nach Absprache bei der Buchung.',
        },
      },
      {
        slug: 'tiigimaja',
        /*
         * How the house is built, under the facts on its own page.
         *
         * DELIBERATELY SAYS NOTHING ABOUT THE ROOF. The roofs are not the same across the
         * property — the main house and the garage are reed, the outdoor kitchen is
         * different again, and Metsamaja's own photograph shows sheet metal. What IS true of
         * every house is the walls: thick solid logs from Estonian forest, no drywall. Say
         * only that, and no page can be contradicted by the picture sitting on it.
         */
        build: {
          et: 'Ehitatud vanamoodi: jämedatest palkidest massiivsed seinad, materjal Eesti metsast. Kipsplaati majas ei ole.',
          en: 'Built the old way: solid walls of thick, heavy logs, the timber from Estonian forest. There is no drywall in this house.',
          ru: 'Построено по-старому: массивные стены из толстых брёвен, дерево из эстонского леса. Гипсокартона в доме нет.',
          de: 'Auf die alte Art gebaut: massive Wände aus dicken, schweren Balken, das Holz aus estnischem Wald. Rigips gibt es in diesem Haus nicht.',
        },
        sleeps: 2,
        compare: {
          bedrooms: { et: '1 magamistuba', en: '1 bedroom', ru: '1 спальня', de: '1 Schlafzimmer' },
          // Not "in the Sauna House, next door" — that told the guest where the sauna is
          // and let them assume it came with the house. It does not.
          sauna:    { et: 'Ei sisaldu · küsi', en: 'Not included · ask us', ru: 'Не входит · спросите', de: 'Nicht enthalten · fragen' },
          kitchen:  { et: 'Kööginurk', en: 'Kitchenette', ru: 'Кухонный уголок', de: 'Küchenzeile' },
          winter:   { et: 'Suletud dets–märts', en: 'Closed Dec–Mar', ru: 'Закрыт дек–март', de: 'Dez–März geschlossen' },
          bestFor:  { et: 'Paar', en: 'A couple', ru: 'Пара', de: 'Ein Paar' },
          extra:    { et: 'Lisavoodi lapsele', en: 'Extra bed for a child', ru: 'Детская доп. кровать', de: 'Zusatzbett für ein Kind' },
        },
        seoKind: { et: 'majake tiigi ääres', en: 'waterside cabin', ru: 'домик на берегу пруда', de: 'Ferienhaus am Wasser' },
        body: [
          {
            et: 'Tiigimaja seisab vee ääres, oma tiigi kaldal. Sees on üks avatud ruum: elutuba rohelise diivani ja nikerdatud katusetalaga, kamin uivpuust skulptuuri all ja klaasseinad, mis avanevad murule ja metsale. Kööginurgas on gaasipliit ja retrokülmik. Magamistoal on põrandast laeni aknad niidule.',
            en: 'The Pond House stands at the water, on the bank of its own pond. Inside is one open room: a living room with a green sofa and a carved roof beam, a fireplace beneath a driftwood sculpture, and glass walls that open onto lawn and forest. The kitchen corner has a gas hob and a retro fridge. The bedroom has floor-to-ceiling windows onto the meadow.',
            ru: 'Прудовой дом стоит у воды, на берегу собственного пруда. Внутри одно открытое пространство: гостиная с зелёным диваном и резной балкой, камин под скульптурой из коряги и стеклянные стены, открытые на газон и лес. В кухонном углу газовая плита и ретро-холодильник. В спальне окна в пол, выходящие на луг.',
            de: 'Das Teichhaus steht am Wasser, am Ufer seines eigenen Teichs. Innen ein einziger offener Raum: ein Wohnzimmer mit grünem Sofa und geschnitztem Dachbalken, ein Kamin unter einer Treibholzskulptur und Glaswände, die sich zu Wiese und Wald öffnen. Die Küchenecke hat ein Gaskochfeld und einen Retro-Kühlschrank. Das Schlafzimmer hat raumhohe Fenster zur Wiese.',
          },
          {
            et: 'Ees on lai puitterrass lamamistoolide ja pergola all istumisalaga – hommikukohv vee kohal, õhtu välja. Maja on kahele.',
            en: 'In front is a broad timber deck with loungers and seating under a pergola — morning coffee over the water, the evening outdoors. The house is for two.',
            ru: 'Перед домом широкая деревянная терраса с шезлонгами и зоной отдыха под перголой — утренний кофе над водой, вечер на улице. Дом рассчитан на двоих.',
            de: 'Davor liegt eine breite Holzterrasse mit Liegen und Sitzplätzen unter einer Pergola – der Morgenkaffee über dem Wasser, der Abend im Freien. Das Haus ist für zwei.',
          },
          {
            et: 'See on kolmest kõige vaiksem ja sobib paarile. Saun on ainult Saunamajas ega sisaldu selle maja hinnas – kui soovid sauna, kirjuta meile. Tiigimaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill. Lahemaa matkarajad, mõisad ja rannik on samamoodi lähedal nagu ülejäänud majadel.',
            en: 'It is the quietest of the three and suits a couple. The sauna is in the Sauna House only and is not included with this house \u2014 write to us if you would like to use it. The Pond House closes for the winter, from 1 December to 31 March; the first night of the new season is 1 April. The Lahemaa trails, manors and coast are as near as they are from the other houses.',
            ru: 'Это самый тихий из трёх домов, он подходит паре. Баня есть только в Банном доме и в стоимость этого дома не входит — напишите нам, если хотите ею воспользоваться. Прудовой дом закрыт на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля. Тропы Лахемаа, мызы и побережье так же близко, как и от остальных домов.',
            de: 'Es ist das ruhigste der drei und passt für ein Paar. Die Sauna gibt es nur im Saunahaus und sie ist im Preis dieses Hauses nicht enthalten – schreiben Sie uns, wenn Sie sie nutzen möchten. Das Teichhaus ist im Winter vom 1. Dezember bis 31. März geschlossen; die erste Nacht der neuen Saison ist der 1. April. Die Wege, Gutshöfe und die Küste von Lahemaa sind so nah wie von den anderen Häusern.',
          },
        ],
        name: { et: 'Tiigimaja', en: 'Pond House', ru: 'Прудовой дом', de: 'Teichhaus' },
        tag:  { et: 'Tule kaheks päevaks. Jää kaheks nädalaks.', en: 'Come for two days. Stay for two weeks.', ru: 'Приедь на два дня. Останься на две недели.', de: 'Kommen Sie für zwei Tage. Bleiben Sie zwei Wochen.' },
        items: [
          { et: 'Kahele · suur terrass · kamin', en: 'For two · large terrace · fireplace', ru: 'На двоих · большая терраса · камин', de: 'Für zwei · große Terrasse · Kamin' },
          { et: 'Kööginurk, vannituba', en: 'Kitchenette, bathroom', ru: 'Кухонный угол, ванная', de: 'Küchenzeile, Bad' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя', de: '1–2 Gäste' }, eur: 150, upTo: 2 },
        ],
        priceExtra: {
          et: 'Lapsele saab igasse majja lisavoodi – kokkuleppel broneerides.',
          en: 'An extra bed for a child can be added in any house – by arrangement when you book.',
          ru: 'Детскую дополнительную кровать можно поставить в любом доме – по договорённости при бронировании.',
          de: 'In jedem Haus kann ein Zusatzbett für ein Kind aufgestellt werden – nach Absprache bei der Buchung.',
        },
      },
      {
        slug: 'metsamaja',
        /*
         * How the house is built, under the facts on its own page.
         *
         * DELIBERATELY SAYS NOTHING ABOUT THE ROOF. The roofs are not the same across the
         * property — the main house and the garage are reed, the outdoor kitchen is
         * different again, and Metsamaja's own photograph shows sheet metal. What IS true of
         * every house is the walls: thick solid logs from Estonian forest, no drywall. Say
         * only that, and no page can be contradicted by the picture sitting on it.
         */
        build: {
          et: 'Ehitatud vanamoodi: jämedatest palkidest massiivsed seinad, materjal Eesti metsast. Kipsplaati majas ei ole.',
          en: 'Built the old way: solid walls of thick, heavy logs, the timber from Estonian forest. There is no drywall in this house.',
          ru: 'Построено по-старому: массивные стены из толстых брёвен, дерево из эстонского леса. Гипсокартона в доме нет.',
          de: 'Auf die alte Art gebaut: massive Wände aus dicken, schweren Balken, das Holz aus estnischem Wald. Rigips gibt es in diesem Haus nicht.',
        },
        sleeps: 4,
        compare: {
          bedrooms: { et: '2 magamistuba, 180 cm voodid', en: '2 bedrooms, 180 cm beds', ru: '2 спальни, кровати 180 см', de: '2 Schlafzimmer, 180-cm-Betten' },
          sauna:    { et: 'Ei sisaldu · küsi', en: 'Not included · ask us', ru: 'Не входит · спросите', de: 'Nicht enthalten · fragen' },
          kitchen:  { et: 'Miniköök', en: 'Mini kitchen', ru: 'Мини-кухня', de: 'Miniküche' },
          winter:   { et: 'Suletud dets–märts', en: 'Closed Dec–Mar', ru: 'Закрыт дек–март', de: 'Dez–März geschlossen' },
          bestFor:  { et: 'Pere või kaks paari', en: 'A family or two couples', ru: 'Семья или две пары', de: 'Eine Familie oder zwei Paare' },
          extra:    { et: 'Lisavoodi lapsele', en: 'Extra bed for a child', ru: 'Детская доп. кровать', de: 'Zusatzbett für ein Kind' },
        },
        seoKind: { et: 'palkmaja metsa serval', en: 'forest cabin', ru: 'дом среди елей', de: 'Ferienhaus im Wald' },
        body: [
          {
            et: 'Metsamaja seisab kõrgete kuuskede vahel, muru serval. Kaks magamistuba 180 cm voodiga, kamin, miniköök, WC ja dušš. Elutoas on tepitud diivan lambanahkade all, ruuduline vaip ja rippkiik akna all; magamistoa palkseinte vahel valgustatud pullipea voodi kohal.',
            en: 'The Forest House stands among tall spruce at the edge of the lawn. Two bedrooms with 180 cm beds, a fireplace, a mini kitchen, a WC and a shower. In the living room a buttoned sofa under sheepskins, a checked rug and a hanging chair at the window; in the bedroom, between log walls, a lit bull’s head above the bed.',
            ru: 'Лесной дом стоит среди высоких елей на краю газона. Две спальни с кроватями 180 см, камин, мини-кухня, санузел с душем. В гостиной стёганый диван под овчинами, клетчатый ковёр и подвесное кресло у окна; в спальне между бревенчатыми стенами — подсвеченная голова быка над кроватью.',
            de: 'Das Waldhaus steht zwischen hohen Fichten am Rand der Wiese. Zwei Schlafzimmer mit 180-cm-Betten, ein Kamin, eine Miniküche, WC und Dusche. Im Wohnraum ein Chesterfield-Sofa unter Schaffellen, ein karierter Teppich und ein Hängesessel am Fenster; im Schlafzimmer, zwischen Blockwänden, ein beleuchteter Stierkopf über dem Bett.',
          },
          {
            et: 'See on neljale ja sobib perele või kahele paarile: kaks eraldi magamistuba, oma kamin ja mets akna taga. Maja renditakse tervikuna.',
            en: 'It is for four and suits a family or two couples: two separate bedrooms, a fireplace of its own and forest outside the window. The house is rented whole.',
            ru: 'Дом на четверых, подходит семье или двум парам: две отдельные спальни, собственный камин и лес за окном. Дом сдаётся целиком.',
            de: 'Es ist für vier und passt für eine Familie oder zwei Paare: zwei getrennte Schlafzimmer, ein eigener Kamin und Wald vor dem Fenster. Das Haus wird als Ganzes vermietet.',
          },
          {
            et: 'Saun on ainult Saunamajas ega sisaldu selle maja hinnas – kui soovid sauna, kirjuta meile. Metsamaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill. Matkarajad algavad külast, Palmse, Sagadi ja Vihula mõis ning Altja rannik on lühikese sõidu kaugusel, Tallinnasse umbes 90 kilomeetrit.',
            en: 'The sauna is in the Sauna House only and is not included with this house \u2014 write to us if you would like to use it. The Forest House closes for the winter, from 1 December to 31 March; the first night of the new season is 1 April. The trails start from the village, the manors of Palmse, Sagadi and Vihula and the coast at Altja are a short drive away, and Tallinn is about 90 kilometres.',
            ru: 'Баня есть только в Банном доме и в стоимость этого дома не входит — напишите нам, если хотите ею воспользоваться. Лесной дом закрыт на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля. Тропы начинаются от деревни, мызы Палмсе, Сагади и Вихула и побережье в Алтья — в коротком переезде, до Таллинна около 90 километров.',
            de: 'Die Sauna gibt es nur im Saunahaus und sie ist im Preis dieses Hauses nicht enthalten – schreiben Sie uns, wenn Sie sie nutzen möchten. Das Waldhaus ist im Winter vom 1. Dezember bis 31. März geschlossen; die erste Nacht der neuen Saison ist der 1. April. Die Wege beginnen im Dorf, die Gutshöfe Palmse, Sagadi und Vihula und die Küste bei Altja sind eine kurze Fahrt entfernt, und Tallinn ist etwa 90 Kilometer entfernt.',
          },
        ],
        name: { et: 'Metsamaja', en: 'Forest House', ru: 'Лесной дом', de: 'Waldhaus' },
        tag:  { et: 'Neli inimest. Kaks tuba. Üks mets.', en: 'Four people. Two rooms. One forest.', ru: 'Четыре человека. Две комнаты. Один лес.', de: 'Vier Personen. Zwei Zimmer. Ein Wald.' },
        items: [
          { et: 'Neljale · 2 magamistuba (180 cm voodid)', en: 'For four · 2 bedrooms (180 cm beds)', ru: 'На четверых · 2 спальни (кровати 180 см)', de: 'Für vier · 2 Schlafzimmer (180-cm-Betten)' },
          { et: 'Kamin, mini köök, WC ja dušš', en: 'Fireplace, mini kitchen, WC and shower', ru: 'Камин, мини-кухня, туалет и душ', de: 'Kamin, Miniküche, WC und Dusche' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя', de: '1–2 Gäste' }, eur: 150, upTo: 2 },
          { guests: { et: '3–4 inimest', en: '3–4 guests', ru: '3–4 гостя', de: '3–4 Gäste' }, eur: 200, upTo: 4 },
        ],
        priceExtra: {
          et: 'Lapsele saab igasse majja lisavoodi – kokkuleppel broneerides.',
          en: 'An extra bed for a child can be added in any house – by arrangement when you book.',
          ru: 'Детскую дополнительную кровать можно поставить в любом доме – по договорённости при бронировании.',
          de: 'In jedem Haus kann ein Zusatzbett für ein Kind aufgestellt werden – nach Absprache bei der Buchung.',
        },
      },
    ],
    priceLabel:  { et: 'Hind', en: 'Price', ru: 'Цена', de: 'Preis' },
    priceUnit:   { et: 'öö', en: 'night', ru: 'ночь', de: 'Nacht' },
    priceNote: {
      et: 'Hinnad on kogu maja kohta ööpäevas. Kõrghooajal, pühade ajal ja pikemate broneeringute puhul võivad hinnad erineda – küsi pakkumist.',
      en: 'Prices are for the whole house, per night. They can differ in high season, over holidays and for longer stays – ask us for an offer.',
      ru: 'Цены указаны за весь дом за сутки. В высокий сезон, в праздники и при длительном проживании цены могут отличаться – запросите предложение.',
      de: 'Die Preise gelten für das ganze Haus pro Nacht. In der Hochsaison, an Feiertagen und bei längeren Aufenthalten können sie abweichen – fragen Sie uns nach einem Angebot.',
    },
    cta:         { et: 'Vaata saadavust', en: 'Check availability', ru: 'Проверить наличие', de: 'Verfügbarkeit prüfen' },
    galleryLink: { et: 'Vaata pilte', en: 'View photos', ru: 'Смотреть фото', de: 'Fotos ansehen' },
    imgLabel:    { et: 'Oandu · Lahemaa · 59°26′N', en: 'Oandu · Lahemaa · 59°26′N', ru: 'Оанду · Лахемаа · 59°26′N', de: 'Oandu · Lahemaa · 59°26′N' },
  },
  trails: {
    label: { et: 'Loodus', en: 'Nature', ru: 'Природа', de: 'Natur' },
    h1:   { et: 'Spaa on õues.', en: 'The spa is outside.', ru: 'Спа – на улице.', de: 'Das Spa ist draußen.' },
    h2:   { et: 'Tervis ', en: 'Health ', ru: 'Здоровье ', de: 'Gesundheit ' },
    h2em: { et: 'tuleb.', en: 'comes.', ru: 'приходит.', de: 'kommt.' },
    desc1: {
      et: 'Puuküttega saun, tiigikümblus, allikavesi, linnulaul. Pole protseduuride nimekirja ega broneerimisportaali – ainult mets, vesi ja vaikus.',
      en: 'Wood-fired sauna, pond bathing, spring water, birdsong. No list of treatments, no booking portal – just forest, water and silence.',
      ru: 'Дровяная сауна, купание в пруду, родниковая вода, пение птиц. Никаких списков процедур и порталов – только лес, вода и тишина.',
      de: 'Holzsauna, Baden im Teich, Quellwasser, Vogelgesang. Keine Behandlungsliste, kein Buchungsportal – nur Wald, Wasser und Stille.',
    },
    desc2: {
      et: 'Kolme mõisa vahel: Palmse, Sagadi ja Vihula – kõik kivikese kaugusel. Siit algab kuus matkarada, sh RMK Oandu–Aegviidu–Ikla matkatee, 370 km.',
      en: 'Between three manors: Palmse, Sagadi and Vihula – all a stone\'s throw away. Six hiking trails begin here, including the RMK Oandu-Aegviidu-Ikla route, 370 km.',
      ru: 'Между тремя поместьями: Палмсе, Сагади и Вихула – все в двух шагах. Отсюда начинаются шесть маршрутов, в том числе RMK Оанду–Аэгвийду–Икла, 370 км.',
      de: 'Zwischen drei Gutshöfen: Palmse, Sagadi und Vihula – alle einen Katzensprung entfernt. Sechs Wanderwege beginnen hier, darunter die RMK-Route Oandu-Aegviidu-Ikla, 370 km.',
    },
    mapLabel: { et: 'Asukoht', en: 'Where we are', ru: 'Расположение', de: 'Wo wir sind' },
    mapAlt: {
      et: 'Kaart: Oanduaia Oandu külas, tiik ja majad ringiga tähistatud',
      en: 'Map: Oanduaia in Oandu village, its pond and houses circled',
      ru: 'Карта: Oanduaia в деревне Оанду, пруд и дома обведены',
      de: 'Karte: Oanduaia im Dorf Oandu, Teich und Häuser markiert',
    },
    mapOpen: { et: 'Ava Google Mapsis', en: 'Open in Google Maps', ru: 'Открыть в Google Maps', de: 'In Google Maps öffnen' },
    mapBook: { et: 'Broneeri oma aeg', en: 'Book your stay', ru: 'Забронировать', de: 'Aufenthalt buchen' },
    nearby: {
      et: 'Palmse, Sagadi ja Vihula mõis jäävad kõik lühikese sõidu kaugusele. Altja kaluriküla oma kiigega on rannikul põhja pool, Käsmu – kaptenite küla – veidi kaugemal läänes. Oandu külastuskeskus ja loodusmetsarada on jalutuskäigu kaugusel. Tallinnasse on umbes 90 kilomeetrit, veidi üle tunni autoga.',
      en: 'The manors of Palmse, Sagadi and Vihula are each a short drive away. Altja fishing village and its swing sit on the coast to the north; Käsmu, the captains’ village, a little further west. The Oandu visitor centre and the old-growth forest trail are within walking distance. Tallinn is about 90 kilometres away, a little over an hour by car.',
      ru: 'Мызы Палмсе, Сагади и Вихула — каждая в коротком переезде. Рыбацкая деревня Алтья со своими качелями лежит на побережье к северу, Кясму, деревня капитанов, — чуть западнее. Центр посетителей Оанду и тропа древнего леса — в пешей доступности. До Таллинна около 90 километров, чуть больше часа на машине.',
      de: 'Die Gutshöfe Palmse, Sagadi und Vihula sind jeweils eine kurze Fahrt entfernt. Das Fischerdorf Altja mit seiner Schaukel liegt an der Küste im Norden; Käsmu, das Kapitänsdorf, etwas weiter westlich. Das Besucherzentrum Oandu und der Urwaldpfad sind zu Fuß erreichbar. Tallinn ist etwa 90 Kilometer entfernt, gut eine Stunde mit dem Auto.',
    },
    items: [
      {
        slug: 'oandu-aegviidu-ikla',
        dist: { et: '370 km · pikkajaline', en: '370 km · long-distance', ru: '370 км · дальний', de: '370 km · Fernwanderweg' },
        name: { et: 'Oandu–Aegviidu–Ikla matkatee', en: 'Oandu–Aegviidu–Ikla route', ru: 'Маршрут Оанду–Аэгвийду–Икла', de: 'Route Oandu–Aegviidu–Ikla' },
        desc: { et: 'Algab RMK Oandu külastuskeskusest ja kulgeb läbi Kõrvemaa ja Soomaa Ikla piirini.', en: 'Starts at the RMK Oandu visitor centre and runs through Kõrvemaa and Soomaa to Ikla.', ru: 'Начинается у центра посетителей RMK в Оанду и идёт через Кырвемаа и Соомаа до Икла.', de: 'Beginnt am RMK-Besucherzentrum Oandu und führt durch Kõrvemaa und Soomaa bis Ikla.' },
      },
      {
        slug: 'oandu-loodusmetsarada',
        dist: { et: '4,7 km · kerge', en: '4.7 km · easy', ru: '4,7 км · лёгкий', de: '4,7 km · leicht' },
        name: { et: 'Oandu loodusmetsarada', en: 'Oandu Nature Forest Trail', ru: 'Природная тропа Оанду', de: 'Naturlehrpfad Oandu' },
        desc: { et: 'Looduslik ringrada läbi muistse metsa ja ürgoru.', en: 'A natural loop through ancient forest and a primeval valley.', ru: 'Кольцевая тропа через древний лес и долину.', de: 'Eine Runde durch Urwald und ein urzeitliches Tal.' },
      },
      {
        slug: 'oandu-vosu',
        dist: { et: '9,5 km · keskmine', en: '9.5 km · medium', ru: '9,5 км · средний', de: '9,5 km · mittel' },
        name: { et: 'Oandu–Võsu matkarada', en: 'Oandu–Võsu Trail', ru: 'Маршрут Оанду–Высу', de: 'Weg Oandu–Võsu' },
        desc: { et: 'Meri kuni mets – rannikult läbi rahvuspargi.', en: 'Sea to forest – from the coast through the national park.', ru: 'От моря до леса – с побережья через нацпарк.', de: 'Vom Meer in den Wald – von der Küste durch den Nationalpark.' },
      },
      {
        slug: 'koprarada',
        dist: { et: '1 km · kerge', en: '1 km · easy', ru: '1 км · лёгкий', de: '1 km · leicht' },
        name: { et: 'Koprarada', en: 'Beaver Trail', ru: 'Бобровая тропа', de: 'Biberpfad' },
        desc: { et: 'Lühike rada koprapaisude ja järvepindade vaatluspunktideni.', en: 'A short trail to beaver dams and lake observation points.', ru: 'Короткая тропа к бобровым плотинам и смотровым площадкам.', de: 'Ein kurzer Weg zu Biberdämmen und Aussichtspunkten am Wasser.' },
      },
      {
        slug: 'oandu-parimusrada',
        dist: { et: '3,4 km · kerge', en: '3.4 km · easy', ru: '3,4 км · лёгкий', de: '3,4 km · leicht' },
        name: { et: 'Oandu pärimusrada', en: 'Oandu Heritage Trail', ru: 'Тропа наследия Оанду', de: 'Traditionspfad Oandu' },
        desc: { et: 'Lahemaa külade pärimusloo jälgedel.', en: 'Following the heritage story of Lahemaa villages.', ru: 'По следам исторического наследия деревень Лахемаа.', de: 'Der Überlieferung der Dörfer von Lahemaa folgend.' },
      },
      {
        slug: 'altja',
        dist: { et: '3 km · kerge', en: '3 km · easy', ru: '3 км · лёгкий', de: '3 km · leicht' },
        name: { et: 'Altja matkarada', en: 'Altja Hiking Trail', ru: 'Тропа Алтья', de: 'Wanderweg Altja' },
        desc: { et: 'Altja kaluriküla kaudu rannikule. Ajalugu ja loodus.', en: 'Via Altja fishing village to the coast. History and nature.', ru: 'Через рыбацкую деревню Алтья к побережью. История и природа.', de: 'Über das Fischerdorf Altja zur Küste. Geschichte und Natur.' },
      },
    ],
  },
  stats: {
    l1: { et: 'Booking.com hinne', en: 'Booking.com rating', ru: 'Рейтинг Booking.com', de: 'Booking.com-Bewertung' },
    l2: { et: 'privaatset maja', en: 'private houses', ru: 'отдельных дома', de: 'separate Häuser' },
    l3: { et: 'km RMK matkateed siit', en: 'km of RMK hiking route from here', ru: 'км маршрута RMK отсюда', de: 'km RMK-Wanderweg ab hier' },
    l4: { et: 'm² kaetud väliköök', en: 'm² covered outdoor kitchen', ru: 'м² крытая летняя кухня', de: 'm² überdachte Außenküche' },
  },
  reviews: {
    label: { et: 'Arvustused', en: 'Reviews', ru: 'Отзывы', de: 'Bewertungen' },
    h1:    { et: 'Mida külalised', en: 'What our guests', ru: 'Что говорят', de: 'Was unsere Gäste' },
    h2em:  { et: 'räägivad.', en: 'say.', ru: 'наши гости.', de: 'sagen.' },
    sub: {
      et: 'Kolm kohta, kus meist kirjutatakse. Kõik hinnangud on külaliste omad.',
      en: 'Three places where guests write about us. Every score is theirs, not ours.',
      ru: 'Три места, где о нас пишут. Все оценки принадлежат гостям.',
      de: 'Drei Orte, an denen Gäste über uns schreiben. Jede Bewertung ist ihre, nicht unsere.',
    },
    read:  { et: 'Loe arvustusi', en: 'Read the reviews', ru: 'Читать отзывы', de: 'Bewertungen lesen' },
    writeH: { et: 'Käisid meil?', en: 'Stayed with us?', ru: 'Гостили у нас?', de: 'Bei uns gewesen?' },
    writeSub: {
      et: 'Paar rida sinult aitab järgmisel külalisel meid üles leida.',
      en: 'A couple of lines from you helps the next guest find us.',
      ru: 'Пара строк от вас поможет следующему гостю нас найти.',
      de: 'Ein paar Zeilen von Ihnen helfen dem nächsten Gast, uns zu finden.',
    },
    write: { et: 'Kirjuta arvustus', en: 'Write a review', ru: 'Написать отзыв', de: 'Bewertung schreiben' },
  },
  housePage: {
    eyebrow:  { et: 'Majutus', en: 'Accommodation', ru: 'Размещение', de: 'Unterkunft' },
    facts:    { et: 'Majas on', en: 'In the house', ru: 'В доме', de: 'Im Haus' },
    otherH:   { et: 'Teised majad', en: 'The other houses', ru: 'Другие дома', de: 'Die anderen Häuser' },
    back:     { et: '← Kõik majad', en: '← All houses', ru: '← Все дома', de: '← Alle Häuser' },
    more:     { et: 'Vaata maja', en: 'See the house', ru: 'Посмотреть дом', de: 'Haus ansehen' },
    photos:   { et: 'Pildid', en: 'Photographs', ru: 'Фотографии', de: 'Fotografien' },
    // Titles and descriptions are composed from published copy only — the house name, its
    // own tagline, its first detail line and its lowest published rate. Nothing invented.
    titlePlace:   { et: 'Lahemaa', en: 'Lahemaa', ru: 'Лахемаа', de: 'Lahemaa' },
    titleCountry: { et: 'Eesti', en: 'Estonia', ru: 'Эстония', de: 'Estland' },
    titleSuffix: {
      et: 'majutus Lahemaal | Oanduaia',
      en: 'lodging in Lahemaa, Estonia | Oanduaia',
      ru: 'проживание в Лахемаа, Эстония | Oanduaia',
      de: 'Unterkunft in Lahemaa, Estland | Oanduaia',
    },
    descFrom: { et: 'Hind alates', en: 'From', ru: 'От', de: 'Ab' },
    descUnit: {
      et: '€ öö kogu maja eest. Oandu küla, Lahemaa rahvuspark.',
      en: '€ per night for the whole house. Oandu village, Lahemaa National Park, Estonia.',
      ru: '€ за ночь за весь дом. Деревня Оанду, национальный парк Лахемаа.',
      de: '€ pro Nacht für das ganze Haus. Dorf Oandu, Nationalpark Lahemaa, Estland.',
    },
  },
  /* The pay page — reached only from a link we send after confirming the dates. */
  pay: {
    eyebrow:  { et: 'Makse', en: 'Payment', ru: 'Оплата', de: 'Zahlung' },
    h1:       { et: 'Maksa kaardiga', en: 'Pay by card', ru: 'Оплата картой', de: 'Mit Karte bezahlen' },
    forWhom:  { et: 'Kellele', en: 'For', ru: 'Кому', de: 'Für' },
    what:     { et: 'Mille eest', en: 'What for', ru: 'За что', de: 'Wofür' },
    amount:   { et: 'Summa', en: 'Amount', ru: 'Сумма', de: 'Betrag' },
    cta:      { et: 'Maksa turvaliselt', en: 'Pay securely', ru: 'Оплатить безопасно', de: 'Sicher bezahlen' },
    working:  { et: 'Avan makselehe…', en: 'Opening the payment page…', ru: 'Открываю страницу оплаты…', de: 'Zahlungsseite wird geöffnet…' },
    secure: {
      et: 'Makse toimub Stripe’i turvalisel lehel. Kaardiandmed ei jõua kunagi meie serverisse. Toetatud on kaart, Apple Pay ja Google Pay.',
      en: 'The payment happens on Stripe’s secure page. Your card details never reach our server. Card, Apple Pay and Google Pay are all accepted.',
      ru: 'Оплата проходит на защищённой странице Stripe. Данные карты никогда не попадают на наш сервер. Принимаются карта, Apple Pay и Google Pay.',
      de: 'Die Zahlung erfolgt auf der sicheren Seite von Stripe. Ihre Kartendaten erreichen unseren Server nie. Karte, Apple Pay und Google Pay werden akzeptiert.',
    },
    paidH:    { et: 'Makstud – aitäh!', en: 'Paid — thank you.', ru: 'Оплачено — спасибо!', de: 'Bezahlt – vielen Dank!' },
    paidBody: {
      et: 'Saatsime kinnituse sinu e-postile. Kohtumiseni Oandus.',
      en: 'A confirmation is on its way to your e-mail. We look forward to seeing you in Oandu.',
      ru: 'Подтверждение отправлено на вашу почту. Ждём вас в Оанду.',
      de: 'Eine Bestätigung ist per E-Mail unterwegs. Wir freuen uns auf Sie in Oandu.',
    },
    goneH:    { et: 'Seda makselinki ei ole', en: 'This payment link is not available', ru: 'Такой ссылки нет', de: 'Diesen Zahlungslink gibt es nicht' },
    goneBody: {
      et: 'Link võib olla vale või tühistatud. Kirjuta info@oanduaia.ee ja saadame uue.',
      en: 'The link may be wrong or cancelled. Write to info@oanduaia.ee and we will send a new one.',
      ru: 'Ссылка может быть неверной или отменённой. Напишите на info@oanduaia.ee — пришлём новую.',
      de: 'Der Link kann falsch oder storniert sein. Schreiben Sie an info@oanduaia.ee, wir senden einen neuen.',
    },
    failed: {
      et: 'Midagi läks makse avamisel valesti. Proovi uuesti või kirjuta info@oanduaia.ee.',
      en: 'Something went wrong opening the payment. Try again, or write to info@oanduaia.ee.',
      ru: 'Не удалось открыть оплату. Попробуйте ещё раз или напишите на info@oanduaia.ee.',
      de: 'Beim Öffnen der Zahlung ist etwas schiefgegangen. Versuchen Sie es erneut oder schreiben Sie an info@oanduaia.ee.',
    },
  },

  availability: {
    label:   { et: 'Saadavus', en: 'Availability', ru: 'Наличие', de: 'Verfügbarkeit' },
    h1:      { et: 'Vali maja', en: 'Choose a house', ru: 'Выберите дом', de: 'Wählen Sie ein Haus' },
    h2em:    { et: 'ja kuupäevad.', en: 'and your dates.', ru: 'и даты.', de: 'und Ihre Daten.' },
    sub: {
      et: 'Kalender näitab, millal majad vabad on. Vali periood – arvutame hinna ja saadad päringu ühe vajutusega.',
      en: 'The calendar shows when the houses are free. Pick your dates – we work out the price and your request goes off in one click.',
      ru: 'Календарь показывает, когда дома свободны. Выберите даты – мы рассчитаем цену, и запрос уйдёт одним нажатием.',
      de: 'Der Kalender zeigt, wann die Häuser frei sind. Wählen Sie Ihre Daten – wir berechnen den Preis und Ihre Anfrage geht mit einem Klick raus.',
    },
    lHouse:  { et: 'Maja', en: 'House', ru: 'Дом', de: 'Haus' },
    lGuests: { et: 'Külalisi', en: 'Guests', ru: 'Гостей', de: 'Gäste' },
    lDates:  { et: 'Kuupäevad', en: 'Dates', ru: 'Даты', de: 'Zeitraum' },
    pickIn:  { et: 'Vali saabumispäev', en: 'Pick your arrival day', ru: 'Выберите день заезда', de: 'Wählen Sie den Anreisetag' },
    pickOut: { et: 'Vali lahkumispäev', en: 'Pick your departure day', ru: 'Выберите день отъезда', de: 'Wählen Sie den Abreisetag' },
    prevMonth: { et: 'Eelmine kuu', en: 'Previous month', ru: 'Предыдущий месяц', de: 'Voriger Monat' },
    nextMonth: { et: 'Järgmine kuu', en: 'Next month', ru: 'Следующий месяц', de: 'Nächster Monat' },
    legendFree:  { et: 'Vaba', en: 'Free', ru: 'Свободно', de: 'Frei' },
    legendTaken: { et: 'Hõivatud', en: 'Booked', ru: 'Занято', de: 'Belegt' },
    legendPicked:{ et: 'Valitud', en: 'Selected', ru: 'Выбрано', de: 'Ausgewählt' },
    loading: { et: 'Laen kalendrit…', en: 'Loading the calendar…', ru: 'Загружаем календарь…', de: 'Kalender wird geladen…' },
    // Shown when the channel feeds are unreachable, and when they are not connected yet.
    // In both cases the dates can still be chosen — we simply do not claim they are free.
    unknown: {
      et: 'Hõivatud kuupäevi ei õnnestunud laadida. Vali soovitud aeg – kinnitame vabad kuupäevad e-kirjaga.',
      en: 'We could not load the booked dates. Pick the time you want – we will confirm availability by e-mail.',
      ru: 'Не удалось загрузить занятые даты. Выберите желаемое время – мы подтвердим наличие по эл. почте.',
      de: 'Die belegten Daten konnten nicht geladen werden. Wählen Sie den gewünschten Zeitraum – wir bestätigen die Verfügbarkeit per E-Mail.',
    },
    // Before the channel feeds are linked there is nothing wrong to report — the calendar
    // simply does not claim to know, and the enquiry answers the question.
    notLinked: {
      et: 'Vali soovitud aeg – kinnitame vabad kuupäevad e-kirjaga.',
      en: 'Pick the time you want – we confirm the free dates by e-mail.',
      ru: 'Выберите желаемое время – свободные даты подтвердим по эл. почте.',
      de: 'Wählen Sie den gewünschten Zeitraum – wir bestätigen die freien Daten per E-Mail.',
    },
    crosses: {
      et: 'Selles vahemikus on juba hõivatud öid. Vali teine periood.',
      en: 'That range runs across nights that are already taken. Please choose another period.',
      ru: 'В этом промежутке есть занятые ночи. Выберите другой период.',
      de: 'Dieser Zeitraum enthält bereits belegte Nächte. Bitte wählen Sie einen anderen Zeitraum.',
    },
    /*
     * Named the blocking night, rather than only saying one exists. `{date}` is substituted.
     * A guest who is told WHICH night is gone can pick around it; one who is told a night
     * exists somewhere can only guess, and usually gives up.
     */
    crossesOn: {
      et: 'Vahepeal on {date} juba broneeritud. Varasem valik tühistati – vali nüüd lahkumispäev.',
      en: '{date} is already booked in between. The earlier dates were released — now pick your departure.',
      ru: 'В середине {date} уже занято. Прежний выбор сброшен — теперь выберите день отъезда.',
      de: 'Dazwischen ist {date} bereits belegt. Die vorherige Auswahl wurde aufgehoben – wählen Sie nun den Abreisetag.',
    },
    takenDay: {
      et: 'See öö on juba broneeritud. Valik on tühistatud – vali uued kuupäevad.',
      en: 'That night is already booked. The selection has been released — pick new dates.',
      ru: 'Эта ночь уже занята. Выбор сброшен — выберите новые даты.',
      de: 'Diese Nacht ist bereits belegt. Die Auswahl wurde aufgehoben – bitte neu wählen.',
    },
    released: {
      et: 'Valik tühistatud. Vali uus saabumispäev.',
      en: 'Selection cleared. Pick a new arrival day.',
      ru: 'Выбор сброшен. Выберите новый день заезда.',
      de: 'Auswahl gelöscht. Wählen Sie einen neuen Anreisetag.',
    },
    // Estonian: 1 öö / 2 ööd. English: 1 night / 2 nights. Russian: 1 ночь / 2 ночи / 5 ночей.
    nightOne:  { et: 'öö', en: 'night', ru: 'ночь', de: 'Nacht' },
    nightFew:  { et: 'ööd', en: 'nights', ru: 'ночи', de: 'Nächte' },
    nightMany: { et: 'ööd', en: 'nights', ru: 'ночей', de: 'Nächte' },
    petAdd: {
      et: 'Tulen lemmikloomaga · 20 € broneeringu kohta',
      en: 'Bringing a pet · 20 € per stay',
      ru: 'Приеду с питомцем · 20 € за проживание',
      de: 'Mit Haustier · 20 € pro Aufenthalt',
    },
    breakfastAdd: {
      et: 'Soovin hommikusööki · 20 € inimese kohta hommikus',
      en: 'I would like breakfast · 20 € per person, per morning',
      ru: 'Хочу завтрак · 20 € с человека в утро',
      de: 'Ich möchte Frühstück · 20 € pro Person und Morgen',
    },
    /* The per-morning picker. Breakfast used to be one checkbox for the whole stay. */
    breakfastWhich: { et: 'Millistel hommikutel?', en: 'Which mornings?', ru: 'В какие утра?', de: 'An welchen Morgen?' },
    breakfastAll:   { et: 'Kõik hommikud', en: 'All mornings', ru: 'Все утра', de: 'Alle Morgen' },
    breakfastNone:  { et: 'Ühtegi', en: 'None', ru: 'Ни одного', de: 'Keine' },
    /* Shown when breakfast is ticked but every morning has been turned off. */
    breakfastPick:  {
      et: 'Vali vähemalt üks hommik.',
      en: 'Choose at least one morning.',
      ru: 'Выберите хотя бы одно утро.',
      de: 'Wählen Sie mindestens einen Morgen.',
    },
    mMornings:      { et: 'Hommikusöögi päevad', en: 'Breakfast mornings', ru: 'Дни завтрака', de: 'Frühstückstage' },
    /* Breakfast is not always for the whole house — a family of four often wants it for two. */
    breakfastWho:   { et: 'Mitmele inimesele?', en: 'For how many people?', ru: 'На сколько человек?', de: 'Für wie viele Personen?' },
    mBreakfastWho:  { et: 'Hommikusööki inimestele', en: 'Breakfast for', ru: 'Завтрак на человек', de: 'Frühstück für' },
    breakfastLine: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак', de: 'Frühstück' },
    petLine:  { et: 'Lemmikloom', en: 'Pet fee', ru: 'Питомец', de: 'Haustiergebühr' },
    total:    { et: 'Kokku', en: 'Total', ru: 'Итого', de: 'Gesamt' },
    indicative: {
      et: 'Esialgne hind. Kinnitame vabad kuupäevad ja lõpliku hinna e-kirjaga.',
      en: 'Indicative price. We confirm the dates and the final price by e-mail.',
      ru: 'Предварительная цена. Даты и итоговую сумму подтвердим по эл. почте.',
      de: 'Richtpreis. Wir bestätigen die Daten und den Endpreis per E-Mail.',
    },
    cta:      { et: 'Küsi neid kuupäevi', en: 'Request these dates', ru: 'Запросить эти даты', de: 'Diese Daten anfragen' },
    // Prefilled into the message field, so the enquiry arrives already answered.
    mHouse:   { et: 'Maja', en: 'House', ru: 'Дом', de: 'Haus' },
    mGuests:  { et: 'Külalisi', en: 'Guests', ru: 'Гостей', de: 'Gäste' },
    mPet:     { et: 'Lemmikloom', en: 'Pet', ru: 'Питомец', de: 'Haustier' },
    mBreakfast: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак', de: 'Frühstück' },
    mEstimate:{ et: 'Esialgne hind', en: 'Indicative price', ru: 'Предварительная цена', de: 'Richtpreis' },
    mYes:     { et: 'jah', en: 'yes', ru: 'да', de: 'ja' },
  },
  /*
   * The scannable summary of the offer, between the houses and the questions. Six
   * reasons, each one a fact stated elsewhere on the site — nothing here is a new
   * promise, it is the same promises gathered where someone skimming will see them.
   */
  why: {
    /*
     * "Six reasons" is gone. The number was arbitrary — it described how many boxes the grid
     * happened to have, not anything about the place, and it quietly promised a countdown the
     * section never delivered. The heading now says what the items actually are, so the list
     * can grow or shrink without the words going stale.
     */
    label: { et: 'Miks siia', en: 'Why stay here', ru: 'Почему сюда', de: 'Warum hierher' },
    h1:    { et: 'Kõik, mille pärast', en: 'Everything people', ru: 'Всё, ради чего', de: 'Alles, wofür man' },
    h2em:  { et: 'siia tullakse.', en: 'come here for.', ru: 'сюда едут.', de: 'herkommt.' },
    sub: {
      et: 'Metsa ja mere vahel – koht, kuhu tulla kahekesi, olgu see esimene reis või kahekümnes.',
      en: 'Between the forest and the sea — a place to come as two, whether it is the first trip or the twentieth.',
      ru: 'Между лесом и морем — место, куда приезжают вдвоём, будь это первая поездка или двадцатая.',
      de: 'Zwischen Wald und Meer — ein Ort für zwei, ob es die erste Reise ist oder die zwanzigste.',
    },
    items: [
      {
        icon: 'house',
        t: { et: 'Terve maja endale', en: 'The whole house to yourself', ru: 'Весь дом только вам', de: 'Das ganze Haus für sich' },
        d: {
          et: 'Iga maja renditakse tervikuna. Ei jagatud koridore ega naabreid seina taga.',
          en: 'Each house is rented whole. No shared corridors, no neighbours through the wall.',
          ru: 'Каждый дом сдаётся целиком. Ни общих коридоров, ни соседей за стеной.',
          de: 'Jedes Haus wird als Ganzes vermietet. Keine gemeinsamen Flure, keine Nachbarn hinter der Wand.',
        },
      },
      {
        icon: 'flame',
        t: { et: 'Puuküttega saun', en: 'A wood-fired sauna', ru: 'Дровяная баня', de: 'Eine Holzsauna' },
        d: {
          et: 'Köetud puudega, mitte lülitiga. Tiik on kümne sammu kaugusel, talvel on jääs auk.',
          en: 'Heated with wood, not a switch. The pond is ten steps away, and in winter there is a hole in the ice.',
          ru: 'Топится дровами, а не выключателем. Пруд в десяти шагах, зимой во льду прорубь.',
          de: 'Mit Holz geheizt, nicht mit einem Schalter. Der Teich ist zehn Schritte entfernt, und im Winter ist ein Loch im Eis.',
        },
      },
      {
        icon: 'tree',
        /*
         * Was "Inside a national park", which the title, the meta description and the place
         * line already say three times over. This says what is actually within reach once
         * you are here — the coast, the manors, and somewhere to eat that is not our kitchen.
         * Every name in it is already published elsewhere on the site.
         */
        t: { et: 'Meri ja mõisad lähedal', en: 'The sea and the manors', ru: 'Море и мызы рядом', de: 'Meer und Gutshöfe' },
        d: {
          et: 'Rand on mõne minuti kaugusel põhja pool. Palmse, Sagadi ja Vihula mõis ning Altja kõrts – lühike sõit.',
          en: 'The coast is minutes to the north. Palmse, Sagadi and Vihula manors and the inn at Altja are a short drive.',
          ru: 'Берег в нескольких минутах к северу. Мызы Палмсе, Сагади и Вихула и корчма в Алтья — недалеко.',
          de: 'Die Küste liegt Minuten nördlich. Die Gutshöfe Palmse, Sagadi und Vihula und der Gasthof in Altja sind eine kurze Fahrt entfernt.',
        },
      },
      {
        icon: 'trail',
        t: { et: 'Kuus rada uksest', en: 'Six trails from the door', ru: 'Шесть троп от порога', de: 'Sechs Wege vor der Tür' },
        d: {
          et: 'Nende seas RMK Oandu–Aegviidu–Ikla matkatee, 370 km, mis algab siit.',
          en: 'Among them the RMK Oandu–Aegviidu–Ikla route, 370 km, which starts here.',
          ru: 'Среди них маршрут RMK Оанду–Аэгвийду–Икла, 370 км, он начинается здесь.',
          de: 'Darunter die RMK-Route Oandu–Aegviidu–Ikla, 370 km, die hier beginnt.',
        },
      },
      {
        icon: 'bowl',
        t: { et: 'Perenaise köök', en: 'Food cooked by the host', ru: 'Кухня хозяйки', de: 'Essen von der Gastgeberin' },
        d: {
          et: 'Hommikusöök, lõuna või pidulik pikk laud – kõik värskest toorainest, kohapeal tehtud.',
          en: 'Breakfast, lunch or a long table – all from fresh ingredients, cooked here.',
          ru: 'Завтрак, обед или праздничный длинный стол – всё из свежих продуктов, приготовлено здесь.',
          de: 'Frühstück, Mittagessen oder eine lange Tafel – alles aus frischen Zutaten, hier gekocht.',
        },
      },
      /*
       * Replaced "Quiet, on purpose", which said only that there is no WiFi. This says the
       * same thing and explains WHY — the houses are built the way they were built here
       * before, out of the forest around them. The absence stops reading as a shortfall and
       * starts reading as the point. It is also the one claim on this page no competitor in
       * Lahemaa can copy.
       */
      {
        icon: 'timber',
        t: {
          et: 'Ehitatud vanamoodi',
          en: 'Built the old way',
          ru: 'Построено по-старому',
          de: 'Auf die alte Art gebaut',
        },
        d: {
          et: 'Massiivsed palkseinad, pilliroost katused, materjal Eesti metsast. Kipsi ega WiFi-t ei ole – ega ole puudugi.',
          en: 'Solid log walls, reed roofs, timber from Estonian forest. No drywall and no WiFi — and nothing is missing.',
          ru: 'Массивные бревенчатые стены, камышовые крыши, дерево из эстонского леса. Ни гипсокартона, ни Wi-Fi — и ничего не упущено.',
          de: 'Massive Blockwände, Reetdächer, Holz aus estnischem Wald. Kein Rigips, kein WLAN — und es fehlt nichts.',
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
    label: { et: 'Korduma kippuvad küsimused', en: 'Frequently asked', ru: 'Частые вопросы', de: 'Häufige Fragen' },
    h1:    { et: 'Enne kui', en: 'Before you', ru: 'Прежде чем', de: 'Bevor Sie' },
    h2em:  { et: 'küsid.', en: 'ask.', ru: 'спросить.', de: 'fragen.' },
    more:  { et: 'Rohkem küsimusi', en: 'More questions', ru: 'Больше вопросов', de: 'Weitere Fragen' },
  },
  /* Labels for the individual trail pages. */
  trailPage: {
    eyebrow:     { et: 'Matkarada', en: 'Hiking trail', ru: 'Маршрут', de: 'Wanderweg' },
    km:          { et: 'km', en: 'km', ru: 'км', de: 'km' },
    length:      { et: 'Pikkus', en: 'Length', ru: 'Длина', de: 'Länge' },
    difficulty:  { et: 'Raskus', en: 'Difficulty', ru: 'Сложность', de: 'Schwierigkeit' },
    duration:    { et: 'Kestus', en: 'Time', ru: 'Время', de: 'Dauer' },
    startPoint:  { et: 'Algus', en: 'Starts at', ru: 'Начало', de: 'Start' },
    season:      { et: 'Hooaeg', en: 'Season', ru: 'Сезон', de: 'Saison' },
    source: {
      et: 'Pikkus RMK andmetel. Kestus on meie hinnang rahulikus tempos.',
      en: 'Length as published by RMK. The time is our own estimate at an easy pace.',
      ru: 'Длина по данным RMK. Время — наша оценка при спокойном темпе.',
      de: 'Länge nach Angaben der RMK. Die Dauer ist unsere eigene Schätzung bei gemächlichem Tempo.',
    },
    rmkLink:     { et: 'RMK rajakirjeldus', en: 'RMK trail page', ru: 'Описание тропы на RMK', de: 'RMK-Seite zum Weg' },
    stay: {
      et: 'Otsid pärast matka ööbimiskohta? Oanduaia on Oandu külas, RMK külastuskeskusest jalutuskäigu kaugusel – kolm eraldi maja, puuküttega saun ja perenaise tehtud hommikusöök.',
      en: 'Looking for somewhere to stay after the hike? Oanduaia is in Oandu village, a walk from the RMK visitor centre — three separate houses, a wood-fired sauna and breakfast cooked by the host.',
      ru: 'Ищете, где остановиться после похода? Oanduaia — в деревне Оанду, в пешей доступности от центра посетителей RMK: три отдельных дома, дровяная баня и завтрак, приготовленный хозяйкой.',
      de: 'Suchen Sie nach der Wanderung eine Unterkunft? Oanduaia liegt im Dorf Oandu, einen Spaziergang vom RMK-Besucherzentrum entfernt – drei separate Häuser, eine Holzsauna und ein Frühstück von der Gastgeberin.',
    },
    stayCta:     { et: 'Vaata majasid', en: 'See the houses', ru: 'Посмотреть дома', de: 'Die Häuser ansehen' },
    otherTrails: { et: 'Teised rajad', en: 'Other trails', ru: 'Другие тропы', de: 'Andere Wege' },
    back:        { et: '← Kõik rajad', en: '← All trails', ru: '← Все тропы', de: '← Alle Wege' },
  },
  /* Shared chrome for the topic landing pages. */
  landing: {
    cta:     { et: 'Vaata saadavust', en: 'Check availability', ru: 'Проверить наличие', de: 'Verfügbarkeit prüfen' },
    qaLabel: { et: 'Korduvad küsimused', en: 'Common questions', ru: 'Частые вопросы', de: 'Häufige Fragen' },
  },
  booking: {
    label:   { et: 'Reserveerimine', en: 'Reservations', ru: 'Бронирование', de: 'Reservierung' },
    h1:      { et: 'Millal sa', en: 'When do', ru: 'Когда вы', de: 'Wann kommen' },
    h2em:    { et: 'tuled?', en: 'you arrive?', ru: 'приедете?', de: 'Sie an?' },
    sub:     { et: 'Kirjuta meile – leiame sobiva maja ja aja.', en: "Write to us – we'll find the right house and time.", ru: 'Напишите нам – подберём подходящий дом и время.', de: 'Schreiben Sie uns – wir finden das passende Haus und die passende Zeit.' },
    // 24-hour clock in Estonian and Russian, 2 pm / 12 noon only in English.
    times:   {
      et: 'Saabumine alates 14.00 · lahkumine 12.00',
      en: 'Check-in from 2 pm · check-out 12 noon',
      ru: 'Заезд с 14.00 · выезд до 12.00',
      de: 'Anreise ab 14.00 Uhr · Abreise bis 12.00 Uhr',
    },
    terms:   {
      et: 'Lühim broneering üks öö · lemmikloom 20 € broneeringu kohta',
      en: 'Minimum stay one night · pet fee 20 € per stay',
      ru: 'Минимум одна ночь · питомец 20 € за проживание',
      de: 'Mindestaufenthalt eine Nacht · Haustiergebühr 20 € pro Aufenthalt',
    },
    // Free parking, and no WiFi anywhere on the property. The second one is a booking
    // decision for some people, so it is stated plainly rather than left to be discovered
    // on arrival — and here it reads as what it is: the reason to come.
    practical: {
      et: 'Tasuta parkimine · WiFi-t majades ei ole, mobiillevi on hea',
      en: 'Free parking · no WiFi in the houses, mobile coverage is good',
      ru: 'Бесплатная парковка · Wi-Fi в домах нет, мобильная связь хорошая',
      de: 'Kostenlose Parkplätze · kein WLAN in den Häusern, guter Mobilfunkempfang',
    },
    pets:    {
      et: 'Kui majas on samal ajal ka teisi külalisi, palume koera hoida rihma otsas. Lemmiklooma eest vastutab tema omanik.',
      en: 'If other guests are on the property at the same time, please keep your dog on a leash. Pets remain the responsibility of their owner.',
      ru: 'Если на территории одновременно находятся другие гости, просим держать собаку на поводке. За питомца отвечает его владелец.',
      de: 'Wenn gleichzeitig andere Gäste auf dem Grundstück sind, halten Sie Ihren Hund bitte an der Leine. Für Haustiere haftet ihr Besitzer.',
    },
    /*
     * Why book here rather than through the channel. Not a discount — none is published
     * and inventing one would bind Mikk to it. What is offered instead is what a small
     * family place can actually give and a channel cannot: a person who knows which
     * house suits you, meals and sauna arranged with the booking, and payment by
     * transfer or cash.
     *
     * The payment line used to end "No card form and no middleman." Mikk cut it, and he
     * is right: Booking.com is a channel he wants to keep, and calling it a middleman on
     * his own site argues against a business he depends on. The fact stands on its own
     * without the swipe.
     */
    directLabel: { et: 'Otse broneerides', en: 'Booking direct', ru: 'При прямом бронировании', de: 'Direkt buchen' },
    direct: [
      {
        et: 'Aitame valida maja – ütle, kes tulevad ja millal, ja soovitame, milline kolmest sobib.',
        en: 'We help you choose the house – tell us who is coming and when, and we will say which of the three fits.',
        ru: 'Поможем выбрать дом – скажите, кто приезжает и когда, и мы подскажем, какой из трёх подойдёт.',
        de: 'Wir helfen bei der Wahl des Hauses – sagen Sie uns, wer kommt und wann, und wir sagen Ihnen, welches der drei passt.',
      },
      {
        et: 'Hommikusöök, pikk laud ja saun lepitakse kokku sama kirjaga, mitte eraldi.',
        en: 'Breakfast, the long table and the sauna are arranged in the same message, not separately.',
        ru: 'Завтрак, длинный стол и баня согласуются тем же письмом, а не отдельно.',
        de: 'Frühstück, die lange Tafel und die Sauna werden in derselben Nachricht abgesprochen, nicht einzeln.',
      },
      {
        et: 'Kirjavahetus käib otse peremehega – lisavoodi, hiline saabumine, koer, sünnipäev.',
        en: 'You write directly to the hosts – an extra bed, a late arrival, a dog, a birthday.',
        ru: 'Вы пишете напрямую хозяевам – дополнительная кровать, поздний заезд, собака, день рождения.',
        de: 'Sie schreiben direkt an die Gastgeber – ein Zusatzbett, eine späte Anreise, ein Hund, ein Geburtstag.',
      },
      {
        et: 'Makse pangaülekandega või sularahas kohapeal.',
        en: 'Payment by bank transfer or in cash on arrival.',
        ru: 'Оплата переводом или наличными на месте.',
        de: 'Zahlung per Überweisung oder bar bei der Anreise.',
      },
    ],
    lNimi:   { et: 'Nimi', en: 'Name', ru: 'Имя', de: 'Name' },
    pNimi:   { et: 'Sinu nimi', en: 'Your name', ru: 'Ваше имя', de: 'Ihr Name' },
    lEmail:  { et: 'E-post', en: 'E-mail', ru: 'Эл. почта', de: 'E-Mail' },
    pEmail:  { et: 'sinu@email.ee', en: 'your@email.com', ru: 'ваш@email.ru', de: 'ihre@email.de' },
    lKuup:   { et: 'Kuupäevad', en: 'Dates', ru: 'Даты', de: 'Zeitraum' },
    pKuup:   { et: 'Saabun – lahkun', en: 'Arrival – departure', ru: 'Заезд – выезд', de: 'Anreise – Abreise' },
    lSonum:  { et: 'Sõnum', en: 'Message', ru: 'Сообщение', de: 'Nachricht' },
    pSonum:  { et: 'Külaliste arv, soovid, küsimused...', en: 'Number of guests, wishes, questions...', ru: 'Кол-во гостей, пожелания, вопросы...', de: 'Anzahl der Gäste, Wünsche, Fragen...' },
    /*
     * Not "Book now": there is no instant confirmation, and a button that claims one
     * would be a lie the reply email has to walk back. "Send booking request" is the
     * honest transactional form — it is a booking, not the start of a negotiation.
     */
    submit:  { et: 'Saada broneeringusoov', en: 'Send booking request', ru: 'Отправить запрос на бронирование', de: 'Buchungsanfrage senden' },
    success: { et: 'Sõnum saadetud!', en: 'Message sent!', ru: 'Сообщение отправлено!', de: 'Nachricht gesendet!' },
    successSub: { et: 'Aitäh, et kirjutasid. Vastame 24 tunni jooksul.', en: 'Thank you for reaching out. We\'ll reply within 24 hours.', ru: 'Спасибо за обращение. Мы ответим в течение 24 часов.', de: 'Danke für Ihre Nachricht. Wir antworten innerhalb von 24 Stunden.' },
    sending: { et: 'Saadan...', en: 'Sending...', ru: 'Отправка...', de: 'Wird gesendet...' },
    error:   { et: 'Midagi läks valesti. Palun proovi uuesti.', en: 'Something went wrong. Please try again.', ru: 'Что-то пошло не так. Попробуйте ещё раз.', de: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.' },
    eSubj:   { et: 'Pakkumise päring – Oanduaia', en: 'Inquiry – Oanduaia', ru: 'Запрос предложения – Oanduaia', de: 'Anfrage – Oanduaia' },
    eName:   { et: 'Nimi', en: 'Name', ru: 'Имя', de: 'Name' },
    eEmail:  { et: 'E-post', en: 'Email', ru: 'Email', de: 'E-Mail' },
    eDates:  { et: 'Kuupäevad', en: 'Dates', ru: 'Даты', de: 'Zeitraum' },
  },
  footer: {
    t1: { et: 'Saun, majutus ja loodus', en: 'Sauna, lodging and nature', ru: 'Сауна, проживание и природа', de: 'Sauna, Unterkunft und Natur' },
    t2: { et: 'Lahemaa südames.', en: 'in the heart of Lahemaa.', ru: 'в сердце Лахемаа.', de: 'im Herzen von Lahemaa.' },
    t3: { et: 'Oandu küla, Lääne-Virumaa', en: 'Oandu village, Lääne-Virumaa', ru: 'д. Оанду, Ляэне-Вирумаа', de: 'Dorf Oandu, Lääne-Virumaa' },
    navH:    { et: 'Navigatsioon', en: 'Navigation', ru: 'Навигация', de: 'Navigation' },
    lugu:    { et: 'Lugu', en: 'Story', ru: 'История', de: 'Geschichte' },
    teenused:{ et: 'Toit', en: 'Food', ru: 'Еда', de: 'Essen' },
    majutus: { et: 'Majad', en: 'Houses', ru: 'Дома', de: 'Häuser' },
    matkad:  { et: 'Loodus', en: 'Nature', ru: 'Природа', de: 'Natur' },
    broneeri:{ et: 'Broneeri', en: 'Book', ru: 'Бронь', de: 'Buchen' },
    maps:    { et: 'Google Maps', en: 'Google Maps', ru: 'Google Карты', de: 'Google Maps' },
    contH:   { et: 'Kontakt', en: 'Contact', ru: 'Контакт', de: 'Kontakt' },
    copy:    { et: '© 2026 Oanduaia. Kõik õigused kaitstud.', en: '© 2026 Oanduaia. All rights reserved.', ru: '© 2026 Oanduaia. Все права защищены.', de: '© 2026 Oanduaia. Alle Rechte vorbehalten.' },
    loc:     { et: 'Lahemaa rahvuspark · Estonia', en: 'Lahemaa National Park · Estonia', ru: 'Нац. парк Лахемаа · Эстония', de: 'Nationalpark Lahemaa · Estland' },
  },
  gallery: {
    intro: {
      et: 'Fotod Oanduaia kolmest majast, puuküttega saunast, tiigist ja Lahemaa rahvuspargi loodusest – suvest talveni. Saunamaja, Tiigimaja ja Metsamaja seest ja väljast, väliköök ja kaetud lauad, matkarajad ja rannik Oandu külas Lääne-Virumaal.',
      en: 'Photographs of the three Oanduaia cabins, the wood-fired sauna, the pond and the Lahemaa National Park around them, from summer through to winter. The Sauna House, Pond House and Forest House inside and out, the outdoor kitchen and the laid tables, the trails and the coast at Oandu village in Lääne-Virumaa, Estonia.',
      ru: 'Фотографии трёх домов Oanduaia, дровяной бани, пруда и природы национального парка Лахемаа — от лета до зимы. Банный, Прудовой и Лесной дом снаружи и внутри, летняя кухня и накрытые столы, тропы и побережье в деревне Оанду, Ляэне-Вирумаа, Эстония.',
      de: 'Fotografien der drei Häuser von Oanduaia, der Holzsauna, des Teichs und des Nationalparks Lahemaa ringsum, vom Sommer bis in den Winter. Saunahaus, Teichhaus und Waldhaus innen und außen, die Außenküche und die gedeckten Tafeln, die Wege und die Küste im Dorf Oandu in Lääne-Virumaa, Estland.',
    },
    title: { et: 'Galerii', en: 'Gallery', ru: 'Галерея', de: 'Galerie' },
    back:  { et: '← Tagasi', en: '← Back', ru: '← Назад', de: '← Zurück' },
  },
}
