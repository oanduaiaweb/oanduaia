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
  /**
   * RMK's page for this trail — the authority, and where the detail lives.
   */
  rmk: string
  /** A Lahemaa photograph, honestly captioned. See the note in components/Trail.tsx. */
  photo: string
  photoAlt: Record<Lang, string>
  /**
   * An extra download for this trail. Shown on the trail's own page only — it used to
   * sit on the home-page list as well, which put a 0.9 MB PDF in front of people
   * scanning six trails to pick one.
   */
  link?: TrailLink
}

const FOREST = {
  et: 'Lahemaa mets Oandu lähedal',
  en: 'Lahemaa forest near Oandu',
  ru: 'Лес Лахемаа близ Оанду',
  de: 'Der Wald von Lahemaa bei Oandu',
  es: 'El bosque de Lahemaa cerca de Oandu',
  sv: 'Skogen i Lahemaa nära Oandu',
  fi: 'Lahemaan metsä Oandun lähellä',
  lv: 'Lahemā mežs pie Oandu',
}

export const TRAILS: Trail[] = [
  {
    slug: 'oandu-aegviidu-ikla',
    key: 'Oandu–Aegviidu–Ikla matkatee',
    name: {
      et: 'RMK Oandu–Aegviidu–Ikla matkatee',
      en: 'RMK Oandu–Aegviidu–Ikla hiking route',
      ru: 'Маршрут RMK Оанду–Аэгвийду–Икла',
      de: 'RMK-Wanderweg Oandu–Aegviidu–Ikla',
      es: 'Ruta de senderismo RMK Oandu–Aegviidu–Ikla',
      sv: 'RMK:s vandringsled Oandu–Aegviidu–Ikla',
      fi: 'RMK:n Oandu–Aegviidu–Ikla-vaellusreitti',
      lv: 'RMK pārgājienu maršruts Oandu–Aegviidu–Ikla',
    },
    km: '370',
    difficulty: { et: 'Pikamaarada', en: 'Long-distance', ru: 'Дальний', de: 'Fernwanderweg', es: 'Larga distancia', sv: 'Långled', fi: 'Pitkä vaellusreitti', lv: 'Tālais maršruts' },
    hours: { et: 'Nädalaid, etappide kaupa', en: 'Weeks, walked in sections', ru: 'Недели, по этапам', de: 'Wochen, in Etappen gewandert', es: 'Semanas, recorrida por etapas', sv: 'Veckor, i etapper', fi: 'Viikkoja, osuuksittain', lv: 'Nedēļas, pa posmiem' },
    start: {
      et: 'RMK Oandu külastuskeskus, jalutuskäigu kaugusel Oanduaiast',
      en: 'The RMK Oandu visitor centre, walking distance from Oanduaia',
      ru: 'Центр посетителей RMK в Оанду, в пешей доступности от Oanduaia',
      de: 'Das RMK-Besucherzentrum Oandu, zu Fuß von Oanduaia erreichbar',
      es: 'El centro de visitantes del RMK en Oandu, a un paseo de Oanduaia',
      sv: 'RMK:s besökscenter i Oandu, på gångavstånd från Oanduaia',
      fi: 'RMK:n Oandun luontokeskus, kävelymatkan päässä Oanduaiasta',
      lv: 'RMK Oandu apmeklētāju centrs, kājām sasniedzams no Oanduaia',
    },
    body: [
      {
        et: 'Matkatee algab RMK Oandu külastuskeskuse juurest ja kulgeb 370 kilomeetrit läbi Eesti põhjast lõunasse: Lahemaa rahvuspargist läbi Kõrvemaa maastikukaitseala ja Soomaa rahvuspargi – ühe Euroopa suurima rabamaastiku – edasi Pärnumaa metsade, edelaranniku kalurikülade ja Liivi lahe liivarandadeni Ikla juures Läti piiril.',
        en: 'The route starts at the RMK Oandu visitor centre and runs 370 kilometres from the north of Estonia to the south: out of Lahemaa National Park, through the Kõrvemaa Landscape Reserve and Soomaa National Park — one of Europe’s largest bog landscapes — then through the forests of Pärnu County to the fishing villages of the south-west coast and the sandy beaches of the Gulf of Riga, ending at Ikla on the Latvian border.',
        ru: 'Маршрут начинается у центра посетителей RMK в Оанду и идёт 370 километров с севера Эстонии на юг: из национального парка Лахемаа через ландшафтный заказник Кырвемаа и национальный парк Соомаа — один из крупнейших болотных ландшафтов Европы — далее через леса Пярнумаа к рыбацким деревням юго-западного побережья и песчаным пляжам Рижского залива, до Икла на латвийской границе.',
        de: 'Die Route beginnt am RMK-Besucherzentrum Oandu und führt über 370 Kilometer vom Norden Estlands in den Süden: hinaus aus dem Nationalpark Lahemaa, durch das Landschaftsschutzgebiet Kõrvemaa und den Nationalpark Soomaa – eine der größten Moorlandschaften Europas –, dann durch die Wälder des Kreises Pärnu zu den Fischerdörfern der Südwestküste und den Sandstränden der Rigaer Bucht, bis nach Ikla an der lettischen Grenze.',
        es: 'La ruta empieza en el centro de visitantes del RMK en Oandu y recorre 370 kilómetros de norte a sur de Estonia: sale del Parque Nacional de Lahemaa, atraviesa la Reserva Paisajística de Kõrvemaa y el Parque Nacional de Soomaa —uno de los mayores paisajes de turberas de Europa— y sigue por los bosques del condado de Pärnu hasta los pueblos pesqueros de la costa suroeste y las playas de arena del golfo de Riga, para terminar en Ikla, en la frontera con Letonia.',
        sv: 'Leden börjar vid RMK:s besökscenter i Oandu och går 370 kilometer genom Estland från norr till söder: ut ur Lahemaa nationalpark, genom Kõrvemaa landskapsskyddsområde och Soomaa nationalpark – ett av Europas största myrlandskap – och vidare genom skogarna i Pärnumaa till fiskebyarna på sydvästkusten och sandstränderna vid Rigabukten, för att sluta vid Ikla på gränsen till Lettland.',
        fi: 'Reitti alkaa RMK:n Oandun luontokeskukselta ja kulkee 370 kilometriä Viron halki pohjoisesta etelään: Lahemaan kansallispuistosta Kõrvemaan maisemansuojelualueen ja Soomaan kansallispuiston – yhden Euroopan suurimmista suomaisemista – kautta Pärnunmaan metsiin, lounaisrannikon kalastajakyliin ja Riianlahden hiekkarannoille, ja se päättyy Iklaan Latvian rajalle.',
        lv: 'Maršruts sākas pie RMK Oandu apmeklētāju centra un ved 370 kilometrus cauri Igaunijai no ziemeļiem uz dienvidiem: no Lahemā nacionālā parka cauri Kõrvemaa ainavu aizsardzības apvidum un Soomaa nacionālajam parkam – vienai no lielākajām purvu ainavām Eiropā –, tālāk caur Pērnavas apriņķa mežiem līdz dienvidrietumu piekrastes zvejnieku ciemiem un Rīgas jūras līča smilšu pludmalēm, līdz pat Iklai pie Latvijas robežas.',
      },
      {
        et: 'Vähesed läbivad seda ühe korraga. Enamik käib etappide kaupa, ja esimene etapp – Oandu–Võsu, 9,5 km – algab siitsamast. Oanduaia on esimese päeva loomulik alguspunkt: maja on külastuskeskusest jalutuskäigu kaugusel, saun on köetav ja hommikusöök tuleb enne väljaminekut.',
        en: 'Few walk it in one go. Most take it in sections, and the first section — Oandu–Võsu, 9.5 km — starts here. Oanduaia is the natural place to begin day one: the houses are a walk from the visitor centre, the sauna can be lit for the evening you come back, and breakfast is there before you set out.',
        ru: 'Мало кто проходит его целиком за один раз. Большинство идёт по этапам, и первый этап — Оанду–Высу, 9,5 км — начинается прямо отсюда. Oanduaia — естественная точка старта первого дня: дома в нескольких минутах ходьбы от центра посетителей, баню можно натопить к возвращению, а завтрак будет до выхода.',
        de: 'Nur wenige gehen sie am Stück. Die meisten nehmen sie in Etappen, und die erste Etappe – Oandu–Võsu, 9,5 km – beginnt hier. Oanduaia ist der natürliche Ausgangspunkt für den ersten Tag: die Häuser liegen einen Spaziergang vom Besucherzentrum entfernt, die Sauna kann für den Abend Ihrer Rückkehr geheizt werden, und das Frühstück steht bereit, bevor Sie aufbrechen.',
        es: 'Pocos la hacen de una sola vez. La mayoría la recorre por etapas, y la primera —Oandu–Võsu, 9,5 km— empieza aquí mismo. Oanduaia es el punto de partida natural del primer día: las casas están a un paseo del centro de visitantes, la sauna se puede encender para la tarde en que vuelvas y el desayuno te espera antes de salir.',
        sv: 'Få går hela leden i ett svep. De flesta tar den i etapper, och den första etappen – Oandu–Võsu, 9,5 km – börjar här. Oanduaia är den naturliga startpunkten för första dagen: husen ligger på gångavstånd från besökscentret, bastun kan eldas till kvällen när du kommer tillbaka, och frukosten står framme innan du ger dig av.',
        fi: 'Harva kulkee sen kerralla. Useimmat kulkevat sen osuuksittain, ja ensimmäinen osuus – Oandu–Võsu, 9,5 km – alkaa täältä. Oanduaia on luonteva paikka aloittaa ensimmäinen päivä: talot ovat kävelymatkan päässä luontokeskuksesta, sauna voidaan lämmittää illaksi, kun palaat, ja aamiainen on valmiina ennen kuin lähdet.',
        lv: 'Retais to noiet vienā piegājienā. Lielākā daļa iet pa posmiem, un pirmais posms – Oandu–Võsu, 9,5 km – sākas tepat. Oanduaia ir dabiska vieta, kur sākt pirmo dienu: mājas ir pastaigas attālumā no apmeklētāju centra, pirti var iekurināt vakaram, kad atgriezīsieties, un brokastis jūs sagaida pirms došanās ceļā.',
      },
      {
        et: 'NB: see ei ole Eesti pikim matkatee. Pikim on Peraküla–Aegviidu–Ähijärve matkatee, 820 km, mis Oandust läbi ei lähe. Oandust algab 370-kilomeetrine haru.',
        en: 'A note on the numbers: this is not Estonia’s longest trail. The longest is the Peraküla–Aegviidu–Ähijärve route at 820 km, which does not pass Oandu. The branch that starts here is the 370-kilometre one.',
        ru: 'О цифрах: это не самый длинный маршрут Эстонии. Самый длинный — Перакюла–Аэгвийду–Ахиярве, 820 км, и он не проходит через Оанду. Отсюда начинается ветка длиной 370 километров.',
        de: 'Eine Anmerkung zu den Zahlen: Dies ist nicht Estlands längster Wanderweg. Der längste ist die Route Peraküla–Aegviidu–Ähijärve mit 820 km, die nicht an Oandu vorbeiführt. Der Zweig, der hier beginnt, ist der 370 Kilometer lange.',
        es: 'Una nota sobre las cifras: esta no es la ruta más larga de Estonia. La más larga es la ruta Peraküla–Aegviidu–Ähijärve, de 820 km, que no pasa por Oandu. El ramal que empieza aquí es el de 370 kilómetros.',
        sv: 'En anmärkning om siffrorna: det här är inte Estlands längsta led. Den längsta är leden Peraküla–Aegviidu–Ähijärve på 820 km, som inte passerar Oandu. Grenen som börjar här är den som är 370 kilometer lång.',
        fi: 'Huomio luvuista: tämä ei ole Viron pisin reitti. Pisin on 820 kilometrin Peraküla–Aegviidu–Ähijärve-reitti, joka ei kulje Oandun kautta. Täältä alkaa 370 kilometrin haara.',
        lv: 'Piezīme par skaitļiem: šis nav Igaunijas garākais maršruts. Garākais ir Peraküla–Aegviidu–Ähijärve maršruts, 820 km, kas neiet caur Oandu. Šeit sākas 370 kilometrus garais atzars.',
      },
    ],
    season: {
      et: 'Aasta läbi, etappide kaupa. Talvel on osa lõike suusarajana.',
      en: 'All year, in sections. Some stretches are ski tracks in winter.',
      ru: 'Круглый год, по этапам. Зимой часть отрезков — лыжня.',
      de: 'Ganzjährig, in Etappen. Einige Abschnitte sind im Winter Loipen.',
      es: 'Todo el año, por etapas. En invierno algunos tramos son pistas de esquí.',
      sv: 'Året runt, i etapper. Vissa sträckor är skidspår på vintern.',
      fi: 'Ympäri vuoden, osuuksittain. Osa osuuksista on talvella hiihtolatuja.',
      lv: 'Visu gadu, pa posmiem. Ziemā daži posmi ir slēpošanas trases.',
    },
    rmk: 'https://rmk.ee/en/exploring-nature/hiking-route/oandu-aegviidu-ikla-370-km-2/',
    photo: '/galerii/metsarada.jpeg',
    photoAlt: FOREST,
    link: {
      href: 'https://rmk.ee/wp-content/uploads/2024/10/oanduIklaKaardivihik_20.05.pdf',
      label: { et: 'RMK kaardivihik', en: 'RMK map booklet', ru: 'Карты RMK', de: 'RMK-Kartenheft', es: 'Cuadernillo de mapas del RMK', sv: 'RMK:s karthäfte', fi: 'RMK:n karttavihko', lv: 'RMK karšu buklets' },
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
      de: 'Naturlehrpfad im Urwald von Oandu',
      es: 'Sendero natural del bosque primario de Oandu',
      sv: 'Naturstigen i Oandus urskog',
      fi: 'Oandun luonnonmetsäpolku',
      lv: 'Oandu dabiskā meža taka',
    },
    km: '4,7',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий', de: 'Leicht', es: 'Fácil', sv: 'Lätt', fi: 'Helppo', lv: 'Viegla' },
    hours: { et: 'Umbes 1,5–2 tundi', en: 'About 1.5–2 hours', ru: 'Около 1,5–2 часов', de: 'Etwa 1,5–2 Stunden', es: 'Unas 1,5–2 horas', sv: 'Cirka 1,5–2 timmar', fi: 'Noin 1,5–2 tuntia', lv: 'Apmēram 1,5–2 stundas' },
    start: {
      et: 'RMK Oandu külastuskeskus – ringrada, mis lõpeb seal, kus algas',
      en: 'The RMK Oandu visitor centre — a loop, ending where it began',
      ru: 'Центр посетителей RMK в Оанду — кольцо, заканчивается там же, где начинается',
      de: 'Das RMK-Besucherzentrum Oandu – ein Rundweg, der dort endet, wo er beginnt',
      es: 'El centro de visitantes del RMK en Oandu: un circuito que termina donde empieza',
      sv: 'RMK:s besökscenter i Oandu – en rundslinga som slutar där den började',
      fi: 'RMK:n Oandun luontokeskus – rengasreitti, joka päättyy lähtöpaikkaansa',
      lv: 'RMK Oandu apmeklētāju centrs – loks, kas beidzas turpat, kur sākās',
    },
    body: [
      {
        et: 'Rada laskub Koljaku–Oandu pangalt niiskesse soometsa ja tõuseb tagasi valgusküllastesse kuivadesse männikutesse. Vanade luidete lähedal vahelduvad kuusikud, haavikud ja sanglepikud; kõrgematel nõlvadel kasvavad vanad männid, mille koor on paks ja soomuseline.',
        en: 'The trail drops off the Koljaku–Oandu escarpment into moist peatland forest and climbs back into light-filled dry pine. Near the ancient dunes it moves between spruce, aspen and common alder; on the higher slopes stand old pines whose bark is thick and scaly.',
        ru: 'Тропа спускается с уступа Кольяку–Оанду во влажный болотный лес и снова поднимается в светлый сухой сосняк. У древних дюн чередуются ельники, осинники и черноольшаники; на верхних склонах стоят старые сосны с толстой чешуйчатой корой.',
        de: 'Der Pfad fällt vom Steilhang Koljaku–Oandu in feuchten Moorwald ab und steigt wieder in lichten, trockenen Kiefernwald auf. Nahe den alten Dünen führt er zwischen Fichten, Espen und Schwarzerlen hindurch; an den höheren Hängen stehen alte Kiefern mit dicker, schuppiger Rinde.',
        es: 'El sendero baja por el escarpe de Koljaku–Oandu hasta un bosque húmedo de turbera y vuelve a subir a un pinar seco y luminoso. Cerca de las antiguas dunas pasa entre abetos, álamos temblones y alisos; en las laderas más altas se alzan pinos viejos de corteza gruesa y escamosa.',
        sv: 'Stigen går ner från Koljaku–Oandu-branten i fuktig myrskog och stiger sedan tillbaka upp i ljus, torr tallskog. Nära de uråldriga sanddynerna växlar den mellan gran, asp och klibbal; på de högre sluttningarna står gamla tallar med tjock, fjällig bark.',
        fi: 'Polku laskeutuu Koljaku–Oandu-törmältä kosteaan suometsään ja nousee takaisin valoisaan, kuivaan männikköön. Muinaisten dyynien lähellä vuorottelevat kuusikot, haavikot ja tervaleppiköt; korkeammilla rinteillä kasvaa vanhoja mäntyjä, joiden kaarna on paksu ja suomuinen.',
        lv: 'Taka nolaižas no Koljaku–Oandu kraujas mitrā purvainā mežā un atkal kāpj augšup gaišā, sausā priežu mežā. Pie senajām kāpām tā vijas starp eglēm, apsēm un melnalkšņiem; augstākajās nogāzēs aug vecas priedes ar biezu, zvīņainu mizu.',
      },
      {
        et: 'See on loodusmets: langenud puud jäetakse maha ja neis elavad haruldased seened, samblikud, samblad ja putukad. Pinnasel on näha põdra, metssea, karu ja ilvese jälgi. Rajal on laudtee, märgemates kohtades hakkepuiduga kaetud lõigud, trepid, pingid, viidad ja infotahvlid. Teel on allikas.',
        en: 'This is old-growth: fallen trees are left where they fall, and rare fungi, lichens, mosses and insects live in them. On the ground you can find the tracks of elk, wild boar, bear and lynx. The path has boardwalk, woodchip through the wetter stretches, stairs, benches, signposts and information boards, and there is a spring along the way.',
        ru: 'Это старый лес: упавшие деревья остаются лежать, и в них живут редкие грибы, лишайники, мхи и насекомые. На земле встречаются следы лося, кабана, медведя и рыси. На тропе есть настил, участки со щепой в сырых местах, лестницы, скамьи, указатели и информационные щиты, а по пути — родник.',
        de: 'Dies ist Urwald: umgestürzte Bäume bleiben liegen, wo sie fallen, und in ihnen leben seltene Pilze, Flechten, Moose und Insekten. Am Boden finden sich die Spuren von Elch, Wildschwein, Bär und Luchs. Der Weg hat Bohlenstege, Holzhäcksel in den nasseren Abschnitten, Treppen, Bänke, Wegweiser und Informationstafeln, und unterwegs gibt es eine Quelle.',
        es: 'Es bosque primario: los árboles caídos se dejan donde caen, y en ellos viven hongos, líquenes, musgos e insectos poco comunes. En el suelo puedes encontrar huellas de alce, jabalí, oso y lince. El camino tiene pasarelas de madera, astillas en los tramos más húmedos, escaleras, bancos, señales y paneles informativos, y por el camino hay un manantial.',
        sv: 'Det här är urskog: nedfallna träd får ligga kvar där de faller, och i dem lever sällsynta svampar, lavar, mossor och insekter. På marken kan du hitta spår av älg, vildsvin, björn och lodjur. Stigen har spänger, flis på de blötare sträckorna, trappor, bänkar, vägvisare och informationstavlor, och längs vägen finns en källa.',
        fi: 'Tämä on luonnonmetsää: kaatuneet puut jätetään paikoilleen, ja niissä elää harvinaisia sieniä, jäkäliä, sammalia ja hyönteisiä. Maasta voi löytää hirven, villisian, karhun ja ilveksen jälkiä. Polulla on pitkospuita, haketta märemmillä osuuksilla, portaita, penkkejä, opasteita ja infotauluja, ja matkan varrella on lähde.',
        lv: 'Šis ir dabiskais mežs: kritušie koki paliek tur, kur nokrituši, un tajos mīt retas sēnes, ķērpji, sūnas un kukaiņi. Uz zemes var atrast aļņu, mežacūku, lāču un lūšu pēdas. Takā ir laipas, šķeldas segums mitrākajos posmos, kāpnes, soliņi, norādes un informācijas stendi, un pa ceļam ir avots.',
      },
      {
        et: 'Külastuskeskuses on näitus „Rada põlismetsa“. Parklas on kohti kümnele autole või kahele bussile ja joogivesi. Oandu telkimisala jääb 250 meetri kaugusele.',
        en: 'The visitor centre holds an exhibition called “Path to the Virgin Forest”. The car park takes ten cars or two buses and there is drinking water. The Oandu campsite is 250 metres away.',
        ru: 'В центре посетителей работает выставка «Тропа в девственный лес». На парковке место для десяти машин или двух автобусов, есть питьевая вода. Кемпинг Оанду — в 250 метрах.',
        de: 'Im Besucherzentrum ist die Ausstellung „Weg in den Urwald“ zu sehen. Auf dem Parkplatz finden zehn Autos oder zwei Busse Platz, und es gibt Trinkwasser. Der Lagerplatz Oandu liegt 250 Meter entfernt.',
        es: 'El centro de visitantes acoge la exposición «Camino al bosque virgen». El aparcamiento tiene sitio para diez coches o dos autobuses, y hay agua potable. La zona de acampada de Oandu está a 250 metros.',
        sv: 'I besökscentret finns utställningen ”Stigen till urskogen”. Parkeringen har plats för tio bilar eller två bussar, och det finns dricksvatten. Oandus tältplats ligger 250 meter bort.',
        fi: 'Luontokeskuksessa on näyttely ”Polku aarniometsään”. Pysäköintialueelle mahtuu kymmenen autoa tai kaksi bussia, ja siellä on juomavettä. Oandun telttailualue on 250 metrin päässä.',
        lv: 'Apmeklētāju centrā ir izstāde „Taka uz pirmatnējo mežu”. Stāvvietā ir vieta desmit automašīnām vai diviem autobusiem, un ir pieejams dzeramais ūdens. Oandu telšu vieta atrodas 250 metru attālumā.',
      },
    ],
    season: {
      et: 'Aasta läbi, hooldatud igal aastaajal.',
      en: 'All year, maintained in every season.',
      ru: 'Круглый год, поддерживается в любой сезон.',
      de: 'Ganzjährig, in jeder Jahreszeit gepflegt.',
      es: 'Todo el año, con mantenimiento en todas las estaciones.',
      sv: 'Året runt, underhållen under alla årstider.',
      fi: 'Ympäri vuoden, kunnossapidetty joka vuodenaikana.',
      lv: 'Visu gadu, uzturēta visos gadalaikos.',
    },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/oandu-old-growth-forest-nature-trail-4-7-km/',
    photo: '/galerii/046.jpeg',
    photoAlt: {
      et: 'Langenud puud sammaldunud ürgmetsas Lahemaal',
      en: 'Fallen trees in mossy old-growth forest in Lahemaa',
      ru: 'Поваленные деревья во мшистом старом лесу Лахемаа',
      de: 'Umgestürzte Bäume im moosigen Urwald von Lahemaa',
      es: 'Árboles caídos en el bosque primario cubierto de musgo de Lahemaa',
      sv: 'Nedfallna träd i mossig urskog i Lahemaa',
      fi: 'Kaatuneita puita sammaloituneessa luonnonmetsässä Lahemaalla',
      lv: 'Kritušie koki sūnainā dabiskajā mežā Lahemā',
    },
  },
  {
    slug: 'oandu-vosu',
    key: 'Oandu–Võsu matkarada',
    name: { et: 'Oandu–Võsu matkarada', en: 'Oandu–Võsu hiking trail', ru: 'Тропа Оанду–Высу', de: 'Wanderweg Oandu–Võsu', es: 'Sendero Oandu–Võsu', sv: 'Oandu–Võsu-leden', fi: 'Oandu–Võsu-reitti', lv: 'Oandu–Võsu taka' },
    km: '9,5',
    difficulty: { et: 'Keskmine', en: 'Medium', ru: 'Средний', de: 'Mittel', es: 'Media', sv: 'Medel', fi: 'Keskivaikea', lv: 'Vidēji grūta' },
    hours: { et: 'Umbes 2,5–3 tundi ühes suunas', en: 'About 2.5–3 hours one way', ru: 'Около 2,5–3 часов в одну сторону', de: 'Etwa 2,5–3 Stunden für eine Richtung', es: 'Unas 2,5–3 horas por trayecto', sv: 'Cirka 2,5–3 timmar enkel väg', fi: 'Noin 2,5–3 tuntia suuntaansa', lv: 'Apmēram 2,5–3 stundas vienā virzienā' },
    start: {
      et: 'RMK Oandu külastuskeskuse parkla, lõpeb Võsu telkimisalal',
      en: 'The RMK Oandu visitor centre car park, ending at Võsu campsite',
      ru: 'Парковка центра посетителей RMK в Оанду, заканчивается у кемпинга Высу',
      de: 'Der Parkplatz am RMK-Besucherzentrum Oandu, Ziel ist der Lagerplatz Võsu',
      es: 'El aparcamiento del centro de visitantes del RMK en Oandu; termina en la zona de acampada de Võsu',
      sv: 'Parkeringen vid RMK:s besökscenter i Oandu, slutar vid Võsu tältplats',
      fi: 'RMK:n Oandun luontokeskuksen pysäköintialue, päättyy Võsun telttailualueelle',
      lv: 'RMK Oandu apmeklētāju centra stāvvieta, beidzas pie Võsu telšu vietas',
    },
    body: [
      {
        et: 'See on Oandu–Aegviidu–Ikla matkatee esimene lõik ja ainus, mis algab otse siit. Rada kulgeb läbi põlismetsa mööda muinasaegset Seljaku teed, Koljaku–Oandu pangast allpool, ja läbib mitmesuguseid pinnavorme ja metsakooslusi.',
        en: 'This is the first section of the Oandu–Aegviidu–Ikla route, and the only one that starts directly from here. It runs through primeval forest along the prehistoric Seljaku road, beneath the Koljaku–Oandu escarpment, crossing a range of landforms and forest communities.',
        ru: 'Это первый отрезок маршрута Оанду–Аэгвийду–Икла и единственный, начинающийся прямо отсюда. Тропа идёт через древний лес по доисторической дороге Сельяку, под уступом Кольяку–Оанду, пересекая разные формы рельефа и лесные сообщества.',
        de: 'Dies ist die erste Etappe der Route Oandu–Aegviidu–Ikla und die einzige, die direkt von hier startet. Sie führt durch Urwald entlang des vorgeschichtlichen Seljaku-Weges, unterhalb der Terrasse von Koljaku–Oandu, und quert dabei eine ganze Reihe von Landschaftsformen und Waldgesellschaften.',
        es: 'Es la primera etapa de la ruta Oandu–Aegviidu–Ikla y la única que sale directamente de aquí. Atraviesa bosque primigenio siguiendo el camino prehistórico de Seljaku, bajo la terraza de Koljaku–Oandu, y cruza toda una variedad de relieves y tipos de bosque.',
        sv: 'Det här är den första etappen av leden Oandu–Aegviidu–Ikla och den enda som börjar direkt härifrån. Den går genom urskog längs den förhistoriska Seljakuvägen, nedanför Koljaku–Oandu-terrassen, och korsar en rad olika landformer och skogstyper.',
        fi: 'Tämä on Oandu–Aegviidu–Ikla-reitin ensimmäinen osuus ja ainoa, joka alkaa suoraan täältä. Se kulkee aarniometsän halki esihistoriallista Seljakun tietä pitkin, Koljaku–Oandu-törmän alapuolella, ja ylittää monenlaisia pinnanmuotoja ja metsätyyppejä.',
        lv: 'Šis ir Oandu–Aegviidu–Ikla maršruta pirmais posms un vienīgais, kas sākas tieši šeit. Tas ved cauri pirmatnējam mežam pa aizvēsturisko Seljaku ceļu, zem Koljaku–Oandu terases, un šķērso dažādas reljefa formas un meža tipus.',
      },
      {
        et: 'Rada on läbitav jalgsi ja jalgrattaga ning märgistatud kogu ulatuses; laudteed on 25 meetrit. Mõlemas otsas on telkimisala parkla, veevõtukoha ja lõkkekohaga, nii et päeva saab käia kummastki otsast. Tagasi tullakse sama teed.',
        en: 'It is passable on foot and by bicycle and marked throughout; there is 25 metres of boardwalk. There is a campsite at each end with parking, water and a fireplace, so the day can be walked from either direction. It is a there-and-back route.',
        ru: 'Тропа проходима пешком и на велосипеде, промаркирована по всей длине; настила — 25 метров. На обоих концах кемпинг с парковкой, водой и кострищем, так что маршрут можно начать с любого конца. Обратно идут тем же путём.',
        de: 'Sie ist zu Fuß und mit dem Fahrrad begehbar und durchgehend markiert; es gibt 25 Meter Bohlenweg. An beiden Enden liegt ein Lagerplatz mit Parkplatz, Wasser und Feuerstelle, sodass die Etappe aus beiden Richtungen gegangen werden kann. Es ist eine Hin- und Rückstrecke.',
        es: 'Se puede hacer a pie y en bicicleta y está señalizada en todo su recorrido; hay 25 metros de pasarela de madera. En cada extremo hay una zona de acampada con aparcamiento, agua y fogón, así que puedes empezar por cualquiera de los dos lados. Es un recorrido de ida y vuelta.',
        sv: 'Leden kan gås till fots och cyklas och är märkt hela vägen; det finns 25 meter spång. I båda ändar finns en tältplats med parkering, vatten och eldplats, så du kan börja från vilket håll du vill. Man går tillbaka samma väg.',
        fi: 'Reitin voi kulkea jalan ja pyörällä, ja se on merkitty koko matkalta; pitkospuita on 25 metriä. Kummassakin päässä on telttailualue, jossa on pysäköinti, vettä ja tulentekopaikka, joten voit aloittaa kummasta päästä tahansa. Takaisin tullaan samaa reittiä.',
        lv: 'To var veikt kājām un ar velosipēdu, un tas ir marķēts visā garumā; ir 25 metri laipu. Abos galos ir telšu vieta ar stāvvietu, ūdeni un ugunskura vietu, tāpēc varat sākt no jebkura gala. Atpakaļ jāiet pa to pašu ceļu.',
      },
    ],
    season: {
      et: 'Aasta läbi. Talvel on rada suusarajaks lükatud – palun ärge lõhkuge suusarada.',
      en: 'All year. In winter it is set as a cross-country ski track — please do not walk on the ski tracks.',
      ru: 'Круглый год. Зимой здесь лыжня — пожалуйста, не портите её.',
      de: 'Ganzjährig. Im Winter ist sie als Langlaufloipe gespurt – bitte die Spur nicht zertreten.',
      es: 'Todo el año. En invierno se prepara como pista de esquí de fondo; por favor, no pises las huellas.',
      sv: 'Året runt. På vintern dras här ett längdskidspår – trampa inte sönder spåren.',
      fi: 'Ympäri vuoden. Talvella reitille ajetaan hiihtolatu – älä riko latua.',
      lv: 'Visu gadu. Ziemā šeit ierīko distanču slēpošanas trasi – lūdzu, nesabojājiet sliedes.',
    },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/rmk-hiking-route-oandu-aegviidu-ikla-oandu-vosu-9-5-km/',
    photo: '/galerii/088.jpeg',
    photoAlt: {
      et: 'Kaks matkajat metsarajal päikesekiirte all Lahemaal',
      en: 'Two walkers on a forest trail in shafts of sunlight in Lahemaa',
      ru: 'Двое на лесной тропе в лучах солнца в Лахемаа',
      de: 'Zwei Wanderer auf einem Waldpfad in Sonnenstrahlen in Lahemaa',
      es: 'Dos caminantes en un sendero del bosque entre rayos de sol en Lahemaa',
      sv: 'Två vandrare på en skogsstig i solstrålar i Lahemaa',
      fi: 'Kaksi kulkijaa metsäpolulla auringonsäteissä Lahemaalla',
      lv: 'Divi gājēji meža takā saules staros Lahemā',
    },
  },
  {
    slug: 'koprarada',
    key: 'Koprarada',
    name: { et: 'Koprarada', en: 'Beaver trail', ru: 'Бобровая тропа', de: 'Biberpfad', es: 'Sendero de los castores', sv: 'Bäverstigen', fi: 'Majavapolku', lv: 'Bebru taka' },
    km: '1',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий', de: 'Leicht', es: 'Fácil', sv: 'Lätt', fi: 'Helppo', lv: 'Viegla' },
    hours: { et: 'Umbes pool tundi', en: 'About half an hour', ru: 'Около получаса', de: 'Etwa eine halbe Stunde', es: 'Una media hora', sv: 'Cirka en halvtimme', fi: 'Noin puoli tuntia', lv: 'Apmēram pusstunda' },
    start: { et: 'Oandu, RMK külastuskeskuse juurest', en: 'Oandu, from the RMK visitor centre', ru: 'Оанду, от центра посетителей RMK', de: 'Oandu, ab dem RMK-Besucherzentrum', es: 'Oandu, desde el centro de visitantes del RMK', sv: 'Oandu, från RMK:s besökscenter', fi: 'Oandu, RMK:n luontokeskukselta', lv: 'Oandu, no RMK apmeklētāju centra' },
    body: [
      {
        et: 'Kilomeeter, mis viib koprapaisude ja vaatluspunktideni. Lühim rada Oandus ja ainus, mille jaoks ei pea päeva plaanima – see mahub hommikusöögi ja lõuna vahele, ja lastega on see enamasti esimene rada, mida käiakse.',
        en: 'A kilometre out to beaver dams and the observation points above them. The shortest trail at Oandu and the only one you need not plan a day around — it fits between breakfast and lunch, and with children it is usually the first one anybody walks.',
        ru: 'Километр до бобровых плотин и смотровых точек над ними. Самая короткая тропа в Оанду и единственная, ради которой не нужно планировать день — она укладывается между завтраком и обедом, а с детьми обычно становится первой.',
        de: 'Einen Kilometer hinaus zu den Biberdämmen und den Aussichtspunkten darüber. Der kürzeste Pfad in Oandu und der einzige, für den man keinen ganzen Tag einplanen muss – er passt zwischen Frühstück und Mittagessen, und mit Kindern ist er meist der erste, den man geht.',
        es: 'Un kilómetro hasta los diques de los castores y los miradores que hay sobre ellos. Es el sendero más corto de Oandu y el único para el que no hace falta dedicarle el día entero: cabe entre el desayuno y la comida, y con niños suele ser el primero que se hace.',
        sv: 'En kilometer ut till bäverdammarna och utsiktsplatserna ovanför dem. Den kortaste stigen i Oandu och den enda du inte behöver planera en hel dag kring – den ryms mellan frukost och lunch, och med barn är det oftast den första man går.',
        fi: 'Kilometri majavanpadoille ja niiden yläpuolella oleville tähystyspaikoille. Oandun lyhin polku ja ainoa, jota varten ei tarvitse varata koko päivää – sen ehtii kulkea aamiaisen ja lounaan välissä, ja lasten kanssa se on yleensä ensimmäinen polku, jolle lähdetään.',
        lv: 'Kilometrs līdz bebru dambjiem un skatu vietām virs tiem. Īsākā Oandu taka un vienīgā, kuras dēļ nav jāplāno visa diena – tā ietilpst starp brokastīm un pusdienām, un ar bērniem tā parasti ir pirmā, ko noiet.',
      },
      {
        et: 'Koprad on öised. Paisud, näritud puutüved ja üleujutatud mets on aga kogu aeg näha, ja just neid rada näitabki.',
        en: 'Beavers are nocturnal. The dams, the gnawed trunks and the flooded forest behind them are there at any hour, and those are what the trail is for.',
        ru: 'Бобры ведут ночной образ жизни. Но плотины, обгрызенные стволы и затопленный за ними лес видны в любое время — ради них тропа и проложена.',
        de: 'Biber sind nachtaktiv. Die Dämme, die angenagten Stämme und der überflutete Wald dahinter sind zu jeder Stunde da, und um sie geht es auf diesem Pfad.',
        es: 'Los castores son nocturnos. Pero los diques, los troncos roídos y el bosque inundado que hay detrás están ahí a cualquier hora, y eso es lo que enseña el sendero.',
        sv: 'Bävrar är nattaktiva. Men dammarna, de gnagda stammarna och den översvämmade skogen bakom dem finns där när som helst på dygnet, och det är dem stigen visar.',
        fi: 'Majavat liikkuvat öisin. Padot, järsityt rungot ja niiden takana tulviva metsä ovat kuitenkin nähtävissä mihin aikaan tahansa, ja niitä polku esittelee.',
        lv: 'Bebri ir nakts dzīvnieki. Taču dambji, apgrauztie stumbri un appludinātais mežs aiz tiem ir redzami jebkurā stundā, un tieši tos šī taka parāda.',
      },
    ],
    season: { et: 'Aasta läbi. Kevadel on vesi kõrgeim.', en: 'All year. The water is highest in spring.', ru: 'Круглый год. Весной вода самая высокая.', de: 'Ganzjährig. Im Frühling steht das Wasser am höchsten.', es: 'Todo el año. En primavera el agua está más alta.', sv: 'Året runt. Vattnet står som högst på våren.', fi: 'Ympäri vuoden. Vesi on korkeimmillaan keväällä.', lv: 'Visu gadu. Pavasarī ūdens līmenis ir visaugstākais.' },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/oandu-visitor-center/',
    photo: '/galerii/083.jpeg',
    photoAlt: {
      et: 'Veekogu läbi suvise niidu ja lehtpuude Lahemaal',
      en: 'Water winding through summer meadow and broadleaf trees in Lahemaa',
      ru: 'Вода среди летнего луга и лиственных деревьев в Лахемаа',
      de: 'Wasser windet sich durch Sommerwiese und Laubbäume in Lahemaa',
      es: 'Agua serpenteando entre un prado de verano y árboles de hoja ancha en Lahemaa',
      sv: 'Vatten som slingrar sig genom sommaräng och lövträd i Lahemaa',
      fi: 'Vesi mutkittelee kesäisen niityn ja lehtipuiden halki Lahemaalla',
      lv: 'Ūdens vijas cauri vasaras pļavai un lapu kokiem Lahemā',
    },
  },
  {
    slug: 'oandu-parimusrada',
    key: 'Oandu pärimusrada',
    name: { et: 'Oandu pärimusrada', en: 'Oandu heritage trail', ru: 'Тропа наследия Оанду', de: 'Traditionspfad von Oandu', es: 'Sendero del patrimonio de Oandu', sv: 'Kulturarvsstigen i Oandu', fi: 'Oandun perinnepolku', lv: 'Oandu mantojuma taka' },
    km: '3,4',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий', de: 'Leicht', es: 'Fácil', sv: 'Lätt', fi: 'Helppo', lv: 'Viegla' },
    hours: { et: 'Umbes tund', en: 'About an hour', ru: 'Около часа', de: 'Etwa eine Stunde', es: 'Una hora, más o menos', sv: 'Cirka en timme', fi: 'Noin tunti', lv: 'Apmēram stunda' },
    start: { et: 'Oandu, RMK külastuskeskuse juurest', en: 'Oandu, from the RMK visitor centre', ru: 'Оанду, от центра посетителей RMK', de: 'Oandu, ab dem RMK-Besucherzentrum', es: 'Oandu, desde el centro de visitantes del RMK', sv: 'Oandu, från RMK:s besökscenter', fi: 'Oandu, RMK:n luontokeskukselta', lv: 'Oandu, no RMK apmeklētāju centra' },
    body: [
      {
        et: 'Kolm ja pool kilomeetrit Lahemaa külade pärimusloo jälgedel: mis siin kasvas, mida sellest tehti ja mida sellest räägiti. Rada käsitleb inimest metsas, mitte metsa ilma inimeseta – see on Oandu radadest kõige lähemal sellele, kuidas siin tegelikult elati.',
        en: 'Three and a half kilometres following the heritage story of the Lahemaa villages: what grew here, what was made from it and what was told about it. This trail is about people in the forest rather than the forest without them — of the Oandu trails it is the one closest to how life here was actually lived.',
        ru: 'Три с половиной километра по следам преданий деревень Лахемаа: что здесь росло, что из этого делали и что об этом рассказывали. Эта тропа — о человеке в лесу, а не о лесе без человека; из троп Оанду она ближе всего к тому, как здесь жили на самом деле.',
        de: 'Dreieinhalb Kilometer entlang der Überlieferung der Dörfer von Lahemaa: was hier wuchs, was daraus gemacht wurde und was darüber erzählt wurde. Bei diesem Pfad geht es um die Menschen im Wald und nicht um den Wald ohne sie – von den Pfaden in Oandu kommt er dem tatsächlichen Leben hier am nächsten.',
        es: 'Tres kilómetros y medio siguiendo la tradición de los pueblos de Lahemaa: qué crecía aquí, qué se hacía con ello y qué se contaba sobre ello. Este sendero trata de las personas en el bosque, no del bosque sin ellas; de los senderos de Oandu, es el que más se acerca a cómo se vivía aquí de verdad.',
        sv: 'Tre och en halv kilometer i spåren av kulturarvet i Lahemaas byar: vad som växte här, vad man gjorde av det och vad man berättade om det. Stigen handlar om människorna i skogen snarare än skogen utan dem – av stigarna i Oandu är det den som kommer närmast hur man faktiskt levde här.',
        fi: 'Kolme ja puoli kilometriä Lahemaan kylien perinteen jäljillä: mitä täällä kasvoi, mitä siitä tehtiin ja mitä siitä kerrottiin. Polku kertoo ihmisistä metsässä eikä metsästä ilman heitä – Oandun poluista se on lähimpänä sitä, miten täällä todella elettiin.',
        lv: 'Trīsarpus kilometri pa Lahemā ciemu tradīciju pēdām: kas te auga, ko no tā darināja un ko par to stāstīja. Šī taka ir par cilvēkiem mežā, nevis par mežu bez viņiem – no Oandu takām tā ir vistuvāk tam, kā šeit patiesībā dzīvoja.',
      },
    ],
    season: { et: 'Aasta läbi.', en: 'All year.', ru: 'Круглый год.', de: 'Ganzjährig.', es: 'Todo el año.', sv: 'Året runt.', fi: 'Ympäri vuoden.', lv: 'Visu gadu.' },
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
      de: 'Natur- und kulturhistorischer Pfad von Altja',
      es: 'Sendero de naturaleza e historia cultural de Altja',
      sv: 'Altjas natur- och kulturhistoriska stig',
      fi: 'Altjan luonto- ja kulttuurihistoriapolku',
      lv: 'Altjas dabas un kultūrvēstures taka',
    },
    km: '3',
    difficulty: { et: 'Kerge', en: 'Easy', ru: 'Лёгкий', de: 'Leicht', es: 'Fácil', sv: 'Lätt', fi: 'Helppo', lv: 'Viegla' },
    hours: { et: 'Umbes tund', en: 'About an hour', ru: 'Около часа', de: 'Etwa eine Stunde', es: 'Una hora, más o menos', sv: 'Cirka en timme', fi: 'Noin tunti', lv: 'Apmēram stunda' },
    start: { et: 'Altja kaluriküla, lühike sõit Oandust põhja poole', en: 'Altja fishing village, a short drive north of Oandu', ru: 'Рыбацкая деревня Алтья, короткий переезд к северу от Оанду', de: 'Das Fischerdorf Altja, eine kurze Fahrt nördlich von Oandu', es: 'El pueblo pesquero de Altja, a poca distancia en coche al norte de Oandu', sv: 'Fiskebyn Altja, en kort bilresa norr om Oandu', fi: 'Altjan kalastajakylä, lyhyen ajomatkan päässä Oandusta pohjoiseen', lv: 'Altjas zvejnieku ciems, īss brauciens uz ziemeļiem no Oandu' },
    body: [
      {
        et: 'Kolm kilomeetrit läbi Altja kaluriküla ja mööda rannikut. Altja on üks Lahemaa säilinuimaid külasid – võrgukuurid kivisel rannal, kiik küla keskel ja kõrts tee ääres. Rada seob küla, ranniku ja metsa ühte tunniajasesse ringi.',
        en: 'Three kilometres through Altja fishing village and along the coast. Altja is one of the best-preserved villages in Lahemaa — net sheds on the stony shore, the village swing, and the inn by the road. The trail ties the village, the coast and the forest into a single hour-long loop.',
        ru: 'Три километра через рыбацкую деревню Алтья и вдоль побережья. Алтья — одна из наиболее сохранившихся деревень Лахемаа: сараи для сетей на каменистом берегу, деревенские качели и корчма у дороги. Тропа связывает деревню, побережье и лес в один круг примерно на час.',
        de: 'Drei Kilometer durch das Fischerdorf Altja und die Küste entlang. Altja ist eines der am besten erhaltenen Dörfer in Lahemaa – Netzschuppen am steinigen Ufer, die Dorfschaukel und der Gasthof an der Straße. Der Pfad verbindet Dorf, Küste und Wald zu einer einstündigen Runde.',
        es: 'Tres kilómetros por el pueblo pesquero de Altja y a lo largo de la costa. Altja es uno de los pueblos mejor conservados de Lahemaa: cobertizos de redes en la orilla pedregosa, el columpio del pueblo y la taberna junto a la carretera. El sendero une el pueblo, la costa y el bosque en un circuito de una hora.',
        sv: 'Tre kilometer genom fiskebyn Altja och längs kusten. Altja är en av de bäst bevarade byarna i Lahemaa – nätbodar på den steniga stranden, bygungan och krogen vid vägen. Stigen binder samman byn, kusten och skogen till en timslång runda.',
        fi: 'Kolme kilometriä Altjan kalastajakylän läpi ja rannikkoa pitkin. Altja on yksi Lahemaan parhaiten säilyneistä kylistä – verkkovajat kivikkoisella rannalla, kyläkeinu ja majatalo tien varressa. Polku yhdistää kylän, rannikon ja metsän tunnin mittaiseksi kierrokseksi.',
        lv: 'Trīs kilometri cauri Altjas zvejnieku ciemam un gar krastu. Altja ir viens no vislabāk saglabātajiem ciemiem Lahemā – tīklu šķūņi akmeņainajā krastā, ciema šūpoles un krogs pie ceļa. Taka savieno ciemu, krastu un mežu vienā stundu garā lokā.',
      },
    ],
    season: { et: 'Aasta läbi. Rannikul on tuul ka suvel.', en: 'All year. There is wind on that coast even in summer.', ru: 'Круглый год. На этом побережье ветрено даже летом.', de: 'Ganzjährig. An dieser Küste weht auch im Sommer der Wind.', es: 'Todo el año. En esa costa sopla el viento incluso en verano.', sv: 'Året runt. Vid den kusten blåser det även på sommaren.', fi: 'Ympäri vuoden. Sillä rannikolla tuulee kesälläkin.', lv: 'Visu gadu. Tajā krastā vējš pūš pat vasarā.' },
    rmk: 'https://rmk.ee/en/exploring-nature/where-to-go/oandu-visitor-center/',
    photo: '/galerii/kivid-ja-tiik.jpeg',
    photoAlt: {
      et: 'Rändrahnud vee ääres Lahemaal',
      en: 'Boulders at the water’s edge in Lahemaa',
      ru: 'Валуны у воды в Лахемаа',
      de: 'Findlinge am Ufer in Lahemaa',
      es: 'Rocas erráticas a la orilla del agua en Lahemaa',
      sv: 'Flyttblock vid vattenbrynet i Lahemaa',
      fi: 'Siirtolohkareita veden äärellä Lahemaalla',
      lv: 'Laukakmeņi ūdens malā Lahemā',
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
