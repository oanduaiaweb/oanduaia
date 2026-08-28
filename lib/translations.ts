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
    desc:   { et: 'Kolme mõisa vahel, mere lähedal, metsas – Lahemaa südames.', en: 'Between three manors, near the sea, in the forest – in the heart of Lahemaa.', ru: 'Между тремя поместьями, у моря, в лесу – в сердце Лахемаа.' },
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
      et: 'Oanduaia on pereettevõte.',
      en: 'Oanduaia is a family business.',
      ru: 'Oanduaia — семейное дело.',
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
          et: 'Rohkem magamiskohti on võimalik – võta meiega otse ühendust.',
          en: 'More sleeping options are available – please contact us directly.',
          ru: 'Возможны дополнительные спальные места – свяжитесь с нами напрямую.',
        },
      },
      {
        slug: 'tiigimaja',
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
  testimonial: {
    rating:  { et: 'Booking.com · 9.6 / 10', en: 'Booking.com · 9.6 / 10', ru: 'Booking.com · 9.6 / 10' },
    quote: {
      et: 'Kogu koht on kaunistatud kuni väikseima detailini. Väike paradiis maa peal.',
      en: 'The whole place is decorated down to the smallest detail – a little paradise on earth.',
      ru: 'Всё место украшено до мельчайших деталей – маленький рай на земле.',
    },
    author: { et: 'Külalisarvustus, 2024', en: 'Guest review, 2024', ru: 'Отзыв гостя, 2024' },
  },
  housePage: {
    eyebrow:  { et: 'Majutus', en: 'Accommodation', ru: 'Размещение' },
    facts:    { et: 'Majas on', en: 'In the house', ru: 'В доме' },
    otherH:   { et: 'Teised majad', en: 'The other houses', ru: 'Другие дома' },
    back:     { et: '← Kõik majad', en: '← All houses', ru: '← Все дома' },
    more:     { et: 'Vaata maja', en: 'See the house', ru: 'Посмотреть дом' },
    // Titles and descriptions are composed from published copy only — the house name, its
    // own tagline, its first detail line and its lowest published rate. Nothing invented.
    titleSuffix: {
      et: 'majutus Lahemaal | Oanduaia',
      en: 'lodging in Lahemaa, Estonia | Oanduaia',
      ru: 'проживание в Лахемаа | Oanduaia',
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
    pets:    {
      et: 'Kui majas on samal ajal ka teisi külalisi, palume koera hoida rihma otsas. Lemmiklooma eest vastutab tema omanik.',
      en: 'If other guests are on the property at the same time, please keep your dog on a leash. Pets remain the responsibility of their owner.',
      ru: 'Если на территории одновременно находятся другие гости, просим держать собаку на поводке. За питомца отвечает его владелец.',
    },
    // Booking.com's own listing says pets are not allowed. Rather than quietly contradict
    // it, the site states which channel the 20 € pet policy actually applies to — otherwise
    // a guest reads this page, books through Booking.com and arrives with a dog against
    // that listing's rules.
    petsDirect: {
      et: 'Lemmikloom on teretulnud otse meilt broneerides – Booking.com-i kaudu tehtud broneeringutele see ei laiene.',
      en: 'Pets are welcome when you book with us directly – this does not apply to bookings made through Booking.com.',
      ru: 'Питомцы приветствуются при прямом бронировании – на бронирования через Booking.com это не распространяется.',
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
    title: { et: 'Galerii', en: 'Gallery', ru: 'Галерея' },
    back:  { et: '← Tagasi', en: '← Back', ru: '← Назад' },
  },
}
