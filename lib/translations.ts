export type Lang = 'et' | 'en' | 'ru' | 'de' | 'es' | 'sv' | 'fi' | 'lv'

export const T = {
  nav: {
    meist:    { et: 'Lugu',     en: 'Story',   ru: 'История', de: 'Geschichte', es: 'Historia', sv: 'Historia', fi: 'Tarina', lv: 'Stāsts' },
    majutus:  { et: 'Majad',    en: 'Houses',  ru: 'Дома', de: 'Häuser', es: 'Casas', sv: 'Husen', fi: 'Talot', lv: 'Mājas' },
    teenused: { et: 'Toit',     en: 'Food',    ru: 'Еда', de: 'Essen', es: 'Comida', sv: 'Mat', fi: 'Ruoka', lv: 'Ēdiens' },
    matkad:   { et: 'Loodus',   en: 'Nature',  ru: 'Природа', de: 'Natur', es: 'Naturaleza', sv: 'Natur', fi: 'Luonto', lv: 'Daba' },
    // Matches the hero and the sticky button — one call to action, worded the same way
    // wherever it appears.
    broneeri: { et: 'Broneeri kohe', en: 'Book now', ru: 'Забронировать', de: 'Jetzt buchen', es: 'Reservar ahora', sv: 'Boka nu', fi: 'Varaa nyt', lv: 'Rezervēt tagad' },
    arvustused: { et: 'Arvustused', en: 'Reviews', ru: 'Отзывы', de: 'Bewertungen', es: 'Opiniones', sv: 'Omdömen', fi: 'Arviot', lv: 'Atsauksmes' },
    galerii:  { et: 'Galerii',  en: 'Gallery', ru: 'Галерея', de: 'Galerie', es: 'Galería', sv: 'Galleri', fi: 'Galleria', lv: 'Galerija' },
  },
  hero: {
    line1:  { et: 'Kaugel',            en: 'Far',              ru: 'Вдали', de: 'Fern', es: 'Lejos', sv: 'Långt', fi: 'Kaukana', lv: 'Tālu' },
    line2:  { et: 'kõigest.',          en: 'from all.',        ru: 'от всего.', de: 'von allem.', es: 'de todo.', sv: 'från allt.', fi: 'kaikesta.', lv: 'no visa.' },
    line3:  { et: 'Puhka päriselt.',   en: 'Rest for real.',   ru: 'По\u2011настоящему.', de: 'Wirklich ausruhen.', es: 'Descansa de verdad.', sv: 'Vila på riktigt.', fi: 'Lepää kunnolla.', lv: 'Atpūtieties pa īstam.' },
    eyebrow:{ et: 'Lahemaa rahvuspark · Oandu · Est', en: 'Lahemaa National Park · Oandu · Est', ru: 'Нац. парк Лахемаа · Оанду · Est', de: 'Nationalpark Lahemaa · Oandu · Est', es: 'Parque Nacional de Lahemaa · Oandu · Est', sv: 'Lahemaa nationalpark · Oandu · Est', fi: 'Lahemaan kansallispuisto · Oandu · Est', lv: 'Lahemaa nacionālais parks · Oandu · Est' },
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
      es: 'Una casa con sauna de leña, una moderna casa junto al estanque o una tranquila casa en el bosque: elige la que mejor te encaje.',
      sv: 'Ett bastuhus med vedeldad bastu, ett modernt dammhus eller ett lugnt skogshus – välj det som passar dig.',
      fi: 'Puulämmitteinen saunatalo, moderni lampitalo tai rauhallinen metsätalo – valitse itsellesi sopiva.',
      lv: 'Pirts māja ar malkas pirti, moderna Dīķa māja vai klusa Meža māja – izvēlieties sev piemērotāko.',
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
    cta:    { et: 'Broneeri kohe', en: 'Book now', ru: 'Забронировать', de: 'Jetzt buchen', es: 'Reservar ahora', sv: 'Boka nu', fi: 'Varaa nyt', lv: 'Rezervēt tagad' },
    alt:    { et: 'Lahemaa mets', en: 'Lahemaa forest', ru: 'Лес Лахемаа', de: 'Der Wald von Lahemaa', es: 'El bosque de Lahemaa', sv: 'Skogen i Lahemaa', fi: 'Lahemaan metsä', lv: 'Lahemaa mežs' },
  },
  intro: {
    label: { et: 'Lugu', en: 'Story', ru: 'История', de: 'Geschichte', es: 'Historia', sv: 'Historia', fi: 'Tarina', lv: 'Stāsts' },
    h1:    { et: 'Metsas', en: 'In the forest,', ru: 'В лесу', de: 'Im Wald', es: 'En el bosque', sv: 'I skogen', fi: 'Metsässä', lv: 'Mežā' },
    h2:    { et: '', en: '', ru: '', de: '', es: '', sv: '', fi: '', lv: '' },
    h2em:  { et: 'ärkas', en: 'beauty', ru: 'проснулась', de: 'erwachte', es: 'despertó', sv: 'vaknade', fi: 'heräsi', lv: 'pamodās' },
    h3:    { et: 'ilu.', en: 'awoke.', ru: 'красота.', de: 'die Schönheit.', es: 'la belleza.', sv: 'skönheten.', fi: 'kauneus.', lv: 'skaistums.' },
    p1: {
      et: 'Peremees leidis kunagi metsatuka, kus keskel voolas oja. Vana talukoht – roheluse alla mattunud, aeg seisma jäänud. Ta hakkas võsa niitma. Mida rohkem niitis, seda rohkem ilu avanes – nagu mets oleks oodanud, et keegi lõpuks tuleb.',
      en: 'The owner once found a forest grove with a stream running through the middle. An old farmstead – buried under greenery, time standing still. He started clearing the scrub. The more he cleared, the more beauty opened up – as if the forest had been waiting for someone to finally come.',
      ru: 'Хозяин однажды нашёл лесную поляну с ручьём посередине. Старый хутор – утонувший в зелени, время остановилось. Он начал расчищать кустарник. Чем больше расчищал, тем больше красоты открывалось – словно лес ждал, что кто-то наконец придёт.',
      de: 'Der Besitzer fand einst einen Waldhain mit einem Bach mittendurch. Ein alter Bauernhof – überwuchert, die Zeit stand still. Er begann, das Gestrüpp zu roden. Je mehr er rodete, desto mehr Schönheit kam zum Vorschein – als hätte der Wald darauf gewartet, dass endlich jemand kommt.',
      es: 'Un día, el dueño encontró un rincón del bosque con un arroyo que lo cruzaba por el medio. Una vieja granja, enterrada bajo la vegetación, donde el tiempo se había detenido. Empezó a desbrozar la maleza. Cuanto más desbrozaba, más belleza aparecía, como si el bosque hubiera estado esperando a que por fin llegara alguien.',
      sv: 'Ägaren hittade en gång en skogsdunge med en bäck som rann rakt genom den. En gammal gård – begravd under grönska, där tiden stått still. Han började röja slyet. Ju mer han röjde, desto mer skönhet kom fram – som om skogen hade väntat på att någon äntligen skulle komma.',
      fi: 'Isäntä löysi kerran metsäsaarekkeen, jonka halki virtasi puro. Vanha tilan paikka – vehreyden peitossa, aika pysähtynyt. Hän alkoi raivata pusikkoa. Mitä enemmän hän raivasi, sitä enemmän kauneutta paljastui – kuin metsä olisi odottanut, että joku vihdoin tulee.',
      lv: 'Saimnieks reiz atrada meža puduri, kura vidū tecēja strauts. Sena lauku sēta – aizaugusi zaļumos, laiks tur bija apstājies. Viņš sāka pļaut krūmus. Jo vairāk viņš pļāva, jo vairāk skaistuma atklājās – it kā mežs būtu gaidījis, ka kāds beidzot atnāks.',
    },
    p2: {
      et: 'Kõigepealt kerkis saunamaja. Siis peamaja. Esimesed külalised olid sõbrad. Sõbrad rääkisid edasi. Nii see läks. Nii kasvab Oanduaia siiani – mitte reklaamist, vaid soovitustest. Mitte plaanist, vaid armastusest koha vastu.',
      en: 'First the sauna house rose. Then the main house. The first guests were friends. Friends told others. That is how it went. Oanduaia still grows this way – not from advertising, but from recommendations. Not from a plan, but from love for this place.',
      ru: 'Сначала построили банный домик. Потом главный дом. Первые гости были друзьями. Друзья рассказывали дальше. Так и пошло. Oanduaia растёт и сейчас – не через рекламу, а через рекомендации. Не по плану, а из любви к этому месту.',
      de: 'Zuerst entstand das Saunahaus. Dann das Haupthaus. Die ersten Gäste waren Freunde. Freunde erzählten es weiter. So ging es. Oanduaia wächst noch immer so – nicht durch Werbung, sondern durch Empfehlungen. Nicht aus einem Plan, sondern aus Liebe zu diesem Ort.',
      es: 'Primero se levantó la casa de la sauna. Después, la casa principal. Los primeros huéspedes fueron amigos. Los amigos se lo contaron a otros. Así fue. Oanduaia sigue creciendo así: no gracias a la publicidad, sino a las recomendaciones. No por un plan, sino por amor a este lugar.',
      sv: 'Först växte bastuhuset fram. Sedan huvudbyggnaden. De första gästerna var vänner. Vännerna berättade för andra. Så gick det till. Så växer Oanduaia än i dag – inte genom reklam, utan genom rekommendationer. Inte efter en plan, utan av kärlek till platsen.',
      fi: 'Ensin nousi saunatalo. Sitten päärakennus. Ensimmäiset vieraat olivat ystäviä. Ystävät kertoivat eteenpäin. Niin se meni. Näin Oanduaia kasvaa yhä – ei mainonnan vaan suositusten kautta. Ei suunnitelmasta vaan rakkaudesta paikkaan.',
      lv: 'Vispirms uzcēla pirts māju. Tad galveno māju. Pirmie viesi bija draugi. Draugi pastāstīja citiem. Tā tas notika. Tā Oanduaia aug joprojām – nevis no reklāmas, bet no ieteikumiem. Nevis pēc plāna, bet aiz mīlestības pret šo vietu.',
    },
    p3: {
      et: 'Oanduaia asub Oandu külas Lääne-Virumaal, Lahemaa rahvuspargis – Eesti vanimas ja suurimas rahvuspargis, mis 1971. aastal asutatuna oli esimene kogu Nõukogude Liidus. Läänemere rannik jääb mõne minuti kaugusele põhja poole. Palmse, Sagadi ja Vihula mõis on kõik lühikese sõidu kaugusel. Tallinnasse on umbes 90 kilomeetrit, veidi üle tunni autoga.',
      en: 'Oanduaia stands in Oandu village in Lääne-Virumaa, inside Lahemaa National Park — the oldest and largest in Estonia, and when it was founded in 1971 the first national park in the whole Soviet Union. The Baltic coast is a few minutes north. The manors of Palmse, Sagadi and Vihula are each a short drive away. Tallinn is about 90 kilometres west, a little over an hour by car.',
      ru: 'Oanduaia находится в деревне Оанду в Ляэне-Вирумаа, в национальном парке Лахемаа — старейшем и крупнейшем в Эстонии, а в 1971 году, при основании, первом во всём Советском Союзе. До балтийского побережья несколько минут на север. Мызы Палмсе, Сагади и Вихула — каждая в коротком переезде. До Таллинна около 90 километров, чуть больше часа на машине.',
      de: 'Oanduaia liegt im Dorf Oandu im Kreis Lääne-Virumaa, im Nationalpark Lahemaa – dem ältesten und größten Estlands und bei seiner Gründung 1971 dem ersten der gesamten Sowjetunion. Die Ostseeküste liegt ein paar Minuten nördlich. Die Gutshöfe Palmse, Sagadi und Vihula sind jeweils eine kurze Fahrt entfernt. Tallinn liegt etwa 90 Kilometer westlich, gut eine Stunde mit dem Auto.',
      es: 'Oanduaia está en el pueblo de Oandu, en Lääne-Virumaa, dentro del Parque Nacional de Lahemaa: el más antiguo y el más grande de Estonia y, cuando se fundó en 1971, el primer parque nacional de toda la Unión Soviética. La costa del Báltico queda a pocos minutos al norte. Las casas señoriales de Palmse, Sagadi y Vihula están cada una a un corto trayecto en coche. Tallinn está a unos 90 kilómetros al oeste, algo más de una hora en coche.',
      sv: 'Oanduaia ligger i byn Oandu i Lääne-Virumaa, mitt i Lahemaa nationalpark – Estlands äldsta och största, och när den grundades 1971 den första nationalparken i hela Sovjetunionen. Östersjökusten ligger några minuter norrut. Herrgårdarna Palmse, Sagadi och Vihula ligger alla en kort bilresa bort. Till Tallinn är det cirka 90 kilometer västerut, drygt en timme med bil.',
      fi: 'Oanduaia sijaitsee Oandun kylässä Länsi-Virumaalla, Lahemaan kansallispuistossa – Viron vanhimmassa ja suurimmassa, joka perustettiin vuonna 1971 koko Neuvostoliiton ensimmäiseksi kansallispuistoksi. Itämeren rannikolle on muutama minuutti pohjoiseen. Palmsen, Sagadin ja Vihulan kartanot ovat kaikki lyhyen ajomatkan päässä. Tallinnaan on noin 90 kilometriä länteen, vähän yli tunti autolla.',
      lv: 'Oanduaia atrodas Oandu ciemā, Lääne-Virumaa apriņķī, Lahemaa nacionālajā parkā – vecākajā un lielākajā Igaunijā, kas, 1971. gadā dibināts, bija pirmais nacionālais parks visā Padomju Savienībā. Baltijas jūras krasts ir dažas minūtes uz ziemeļiem. Palmses, Sagadi un Vihulas muižas ir īsa brauciena attālumā. Līdz Tallinai ir aptuveni 90 kilometru uz rietumiem, nedaudz vairāk par stundu ar auto.',
    },
    p4: {
      et: 'Siin on puuküttega saun, tiik, kus ujuda, allikavesi ja linnulaul. Pole protseduuride nimekirja ega broneerimisportaali. Külast algab või möödub kuus märgistatud matkarada, nende seas RMK Oandu–Aegviidu–Ikla matkatee, mis algab RMK Oandu külastuskeskusest ja kulgeb 370 kilomeetrit läbi Kõrvemaa ja Soomaa Ikla piirini.',
      en: 'What is here is a wood-fired sauna, a pond to swim in, spring water and birdsong. There is no list of treatments and no booking portal. Six marked hiking trails start at or pass through the village, among them the RMK Oandu–Aegviidu–Ikla route, which begins at the RMK Oandu visitor centre and runs 370 kilometres through Kõrvemaa and Soomaa to Ikla on the Latvian border.',
      ru: 'Здесь дровяная баня, пруд, в котором можно плавать, родниковая вода и пение птиц. Никаких списков процедур и порталов бронирования. От деревни начинаются или через неё проходят шесть маркированных троп, среди них маршрут RMK Оанду–Аэгвийду–Икла: он начинается у центра посетителей RMK в Оанду и идёт 370 километров через Кырвемаа и Соомаа до Икла.',
      de: 'Hier gibt es eine Holzsauna, einen Teich zum Schwimmen, Quellwasser und Vogelgesang. Es gibt keine Behandlungsliste und kein Buchungsportal. Sechs markierte Wanderwege beginnen im Dorf oder führen hindurch, darunter die RMK-Route Oandu–Aegviidu–Ikla, die am RMK-Besucherzentrum Oandu startet und 370 Kilometer durch Kõrvemaa und Soomaa bis Ikla an der lettischen Grenze führt.',
      es: 'Aquí hay una sauna de leña, un estanque para bañarse, agua de manantial y canto de pájaros. No hay lista de tratamientos ni portal de reservas. Seis senderos señalizados empiezan en el pueblo o pasan por él, entre ellos la ruta RMK Oandu–Aegviidu–Ikla, que comienza en el centro de visitantes RMK de Oandu y recorre 370 kilómetros por Kõrvemaa y Soomaa hasta Ikla, en la frontera con Letonia.',
      sv: 'Här finns en vedeldad bastu, en damm att simma i, källvatten och fågelsång. Ingen behandlingslista och ingen bokningsportal. Sex markerade vandringsleder börjar i eller passerar genom byn, bland dem RMK-leden Oandu–Aegviidu–Ikla, som startar vid RMK:s besökscenter i Oandu och går 370 kilometer genom Kõrvemaa och Soomaa till Ikla vid lettiska gränsen.',
      fi: 'Täällä on puulämmitteinen sauna, lampi uimiseen, lähdevettä ja linnunlaulua. Ei hoitolistaa eikä varausportaalia. Kylästä alkaa tai sen kautta kulkee kuusi merkittyä retkeilyreittiä, muun muassa RMK:n Oandu–Aegviidu–Ikla-vaellusreitti, joka alkaa RMK:n Oandun luontokeskuksesta ja kulkee 370 kilometriä Kõrvemaan ja Soomaan halki Iklaan Latvian rajalle.',
      lv: 'Šeit ir malkas pirts, dīķis peldēšanai, avota ūdens un putnu dziesmas. Nav ne procedūru saraksta, ne rezervēšanas portāla. Ciemā sākas vai caur to iet sešas marķētas pārgājienu takas, starp tām RMK maršruts Oandu–Aegviidu–Ikla, kas sākas RMK Oandu apmeklētāju centrā un vijas 370 kilometrus cauri Kõrvemaa un Soomaa līdz Iklai pie Latvijas robežas.',
    },
    p5: {
      et: 'See sobib paarile, kes tahab maja endale, perele, kes tahab lapsed õue, ja väiksele seltskonnale, kes tahab üht pikka lauda ja mitte kedagi teist majja. Iga maja renditakse tervikuna – jagama ei pea. Koerad on teretulnud. Talvel on Saunamaja avatud, saun köetud ja jäässe raiutud auk.',
      en: 'It suits a couple who want a house to themselves, a family who want the children outdoors, and a small group who want one long table and nobody else in the building. Each house is rented whole – you will not be sharing it. Dogs are welcome. In winter the Sauna House stays open, the sauna is lit, and there is a hole cut in the ice.',
      ru: 'Это подходит паре, которая хочет дом целиком, семье, которая хочет, чтобы дети были на улице, и небольшой компании, которой нужен один длинный стол и никого больше в доме. Каждый дом сдаётся целиком – делить его не придётся. Собаки желанны. Зимой Банный дом открыт, баня топится, а во льду прорублена прорубь.',
      de: 'Es passt für ein Paar, das ein Haus für sich möchte, für eine Familie, die die Kinder draußen haben will, und für eine kleine Gruppe, die eine lange Tafel möchte und sonst niemanden im Haus. Jedes Haus wird als Ganzes vermietet – Sie teilen es mit niemandem. Hunde sind willkommen. Im Winter bleibt das Saunahaus geöffnet, die Sauna wird geheizt, und ins Eis ist ein Loch geschnitten.',
      es: 'Es ideal para una pareja que quiere una casa para ella sola, para una familia que quiere a los niños al aire libre y para un grupo pequeño que quiere una mesa larga y a nadie más en la casa. Cada casa se alquila entera: no tendrás que compartirla. Los perros son bienvenidos. En invierno, la Casa de la Sauna sigue abierta, la sauna se enciende y hay un agujero abierto en el hielo.',
      sv: 'Det passar ett par som vill ha ett hus för sig själva, en familj som vill ha barnen ute och ett litet sällskap som vill ha ett långt bord och ingen annan i huset. Varje hus hyrs ut i sin helhet – du delar det inte med någon. Hundar är välkomna. På vintern håller Bastuhuset öppet, bastun eldas och det finns en vak upphuggen i isen.',
      fi: 'Se sopii pariskunnalle, joka haluaa talon omaan käyttöönsä, perheelle, joka haluaa lapset ulos, ja pienelle porukalle, joka haluaa yhden pitkän pöydän eikä ketään muuta taloon. Jokainen talo vuokrataan kokonaan – sitä ei tarvitse jakaa. Koirat ovat tervetulleita. Talvella Saunatalo on auki, sauna lämpiää ja jäähän on hakattu avanto.',
      lv: 'Tas der pārim, kas vēlas māju tikai sev, ģimenei, kas vēlas, lai bērni būtu ārā, un nelielai kompānijai, kurai vajag vienu garu galdu un nevienu citu mājā. Katra māja tiek izīrēta pilnībā – jums tā nav ar kādu jādala. Suņi ir gaidīti. Ziemā Pirts māja ir atvērta, pirts tiek kurināta un ledū ir izcirsts āliņģis.',
    },
    p6: {
      et: 'Söögi teeb perenaine ise, värskest toorainest – hommikusöök, lõuna või pidulikult kaetud pikk laud. Oanduaia on pereettevõte ja on kasvanud soovituste, mitte reklaami toel.',
      en: 'The food is cooked by the host herself, from fresh ingredients – breakfast, lunch, or a long table laid for a celebration. Oanduaia is a family business, and it grew from recommendations rather than advertising.',
      ru: 'Еду готовит сама хозяйка, из свежих продуктов – завтрак, обед или празднично накрытый длинный стол. Oanduaia — семейное дело, выросшее на рекомендациях, а не на рекламе.',
      de: 'Das Essen kocht die Gastgeberin selbst, aus frischen Zutaten – Frühstück, Mittagessen oder eine lange Tafel für ein Fest. Oanduaia ist ein Familienbetrieb und ist aus Empfehlungen gewachsen, nicht aus Werbung.',
      es: 'La comida la prepara la propia anfitriona, con ingredientes frescos: desayuno, almuerzo o una mesa larga puesta para una celebración. Oanduaia es un negocio familiar y ha crecido gracias a las recomendaciones, no a la publicidad.',
      sv: 'Maten lagar värdinnan själv, av färska råvaror – frukost, lunch eller ett långbord dukat till fest. Oanduaia är ett familjeföretag och har vuxit genom rekommendationer, inte reklam.',
      fi: 'Ruoan tekee emäntä itse tuoreista raaka-aineista – aamiaisen, lounaan tai juhlavasti katetun pitkän pöydän. Oanduaia on perheyritys, joka on kasvanut suositusten eikä mainonnan varassa.',
      lv: 'Ēdienu gatavo pati saimniece no svaigiem produktiem – brokastis, pusdienas vai svētkiem klātu garo galdu. Oanduaia ir ģimenes uzņēmums, kas izaudzis no ieteikumiem, nevis reklāmas.',
    },
  },
  services: {
    label: { et: 'Toit', en: 'Food', ru: 'Еда', de: 'Essen', es: 'Comida', sv: 'Mat', fi: 'Ruoka', lv: 'Ēdiens' },
    arrow: { et: 'Küsi menüü →', en: 'Ask for menu →', ru: 'Запросить меню →', de: 'Karte anfragen →', es: 'Pide el menú →', sv: 'Fråga efter menyn →', fi: 'Kysy ruokalistaa →', lv: 'Pieprasiet ēdienkarti →' },
    s1: {
      t1: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак', de: 'Frühstück', es: 'Desayuno', sv: 'Frukost', fi: 'Aamiainen', lv: 'Brokastis' },
      t2: { et: 'Lõuna', en: 'Lunch', ru: 'Обед', de: 'Mittagessen', es: 'Almuerzo', sv: 'Lunch', fi: 'Lounas', lv: 'Pusdienas' },
      desc: {
        et: 'Hommikusöök, lõuna, pidulik pikk laud või kodusem supilõuna – kõik värskest toorainest, kõik perenaise enda tehtud.',
        en: 'Breakfast, lunch, a festive long table or a homier soup lunch – all from fresh ingredients, all made by the host herself.',
        ru: 'Завтрак, обед, торжественный стол или домашний суп – всё из свежих продуктов, всё приготовлено хозяйкой лично.',
        de: 'Frühstück, Mittagessen, eine festliche lange Tafel oder ein einfacheres Suppenessen – alles aus frischen Zutaten, alles von der Gastgeberin selbst zubereitet.',
        es: 'Desayuno, almuerzo, una mesa larga de fiesta o un almuerzo de sopa más casero: todo con ingredientes frescos, todo preparado por la propia anfitriona.',
        sv: 'Frukost, lunch, ett festligt långbord eller en enklare lunch med soppa – allt av färska råvaror, allt lagat av värdinnan själv.',
        fi: 'Aamiainen, lounas, juhlava pitkä pöytä tai kotoisampi keittolounas – kaikki tuoreista raaka-aineista, kaikki emännän itsensä tekemää.',
        lv: 'Brokastis, pusdienas, svētku garais galds vai mājīgākas zupas pusdienas – viss no svaigiem produktiem, visu gatavo pati saimniece.',
      },
      price: {
        line:   { et: 'Hommikusöök 20 € inimese kohta hommikus', en: 'Breakfast 20 € per person, per morning', ru: 'Завтрак 20 € с человека в утро', de: 'Frühstück 20 € pro Person und Morgen', es: 'Desayuno 20 € por persona y mañana', sv: 'Frukost 20 € per person och morgon', fi: 'Aamiainen 20 € hengeltä aamua kohden', lv: 'Brokastis 20 € personai par rītu' },
        detail: { et: 'Munad, peekon, puder, kohv', en: 'Eggs, bacon, porridge, coffee', ru: 'Яйца, бекон, каша, кофе', de: 'Eier, Speck, Porridge, Kaffee', es: 'Huevos, beicon, gachas, café', sv: 'Ägg, bacon, gröt, kaffe', fi: 'Munia, pekonia, puuroa, kahvia', lv: 'Olas, bekons, putra, kafija' },
        note:   { et: 'Lõuna- ja õhtusöögi valikute jaoks võta meiega ühendust.', en: 'Contact us for lunch and dinner options.', ru: 'Свяжитесь с нами, чтобы узнать варианты обеда и ужина.', de: 'Für Mittag- und Abendessen sprechen Sie uns an.', es: 'Escríbenos para conocer las opciones de almuerzo y cena.', sv: 'Kontakta oss för lunch- och middagsalternativ.', fi: 'Ota yhteyttä, niin kerromme lounas- ja illallisvaihtoehdoista.', lv: 'Sazinieties ar mums par pusdienu un vakariņu iespējām.' },
      },
    },
    s2: {
      t1: { et: 'Pidulik pikk laud', en: 'Festive long table', ru: 'Праздничный стол', de: 'Festliche lange Tafel', es: 'Mesa larga de fiesta', sv: 'Festligt långbord', fi: 'Juhlava pitkä pöytä', lv: 'Svētku garais galds' },
      t2: { et: '', en: '', ru: '', de: '', es: '', sv: '', fi: '', lv: '' },
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
        es: 'Por encargo, de dos a diez personas. En verano, la mesa larga se pone en la cocina exterior para hasta veinte, bajo las flores colgantes y las guirnaldas de luces. Con mal tiempo, y en invierno, la misma mesa se pone dentro, en la de la propia casa. Las flores, las velas y la cristalería van incluidas; el menú se acuerda antes.',
        sv: 'Dukas på beställning för två till tio. På sommaren dukas långbordet i utomhusköket för upp till tjugo, under de hängande blommorna och ljusslingorna. Vid dåligt väder, och på vintern, dukas samma bord inomhus, vid husets eget. Blommor, ljus och glas ingår – menyn kommer vi överens om i förväg.',
        fi: 'Katetaan tilauksesta kahdesta kymmeneen hengelle. Kesällä pitkä pöytä katetaan ulkokeittiöön jopa kahdellekymmenelle, riippuvien kukkien ja valosarjojen alle. Huonolla säällä ja talvella sama pöytä katetaan sisälle, talon omaan pöytään. Kukat, kynttilät ja lasit kuuluvat asiaan – ruokalistasta sovitaan etukäteen.',
        lv: 'Klāj pēc pasūtījuma diviem līdz desmit cilvēkiem. Vasarā garo galdu klāj āra virtuvē līdz divdesmit viesiem, zem piekārtajiem ziediem un gaismas virtenēm. Sliktā laikā un ziemā to pašu galdu klāj iekštelpās, pie mājas paša galda. Ziedi, sveces un stikla trauki ir iekļauti – ēdienkarti saskaņojam iepriekš.',
      },
      price: null,
    },
  },
  feature: {
    label: { et: 'Majad', en: 'Houses', ru: 'Дома', de: 'Häuser', es: 'Casas', sv: 'Husen', fi: 'Talot', lv: 'Mājas' },
    // Eyebrow stays "Majad"; the headline is the accommodation offer.
    // Estonian is one compound word, so it takes no second line.
    h1:   { et: 'Majutusvõimalused', en: 'Accommodation', ru: 'Варианты', de: 'Unterkünfte', es: 'Opciones de', sv: 'Boende', fi: 'Valitse', lv: 'Naktsmītņu' },
    h2:   { et: '', en: 'options.', ru: 'размещения.', de: 'zur Auswahl.', es: 'alojamiento.', sv: 'att välja på.', fi: 'majoituksesi.', lv: 'iespējas.' },
    /* Labels for the three-house comparison table. */
    compareLabel: { et: 'Kolm maja kõrvuti', en: 'The three houses side by side', ru: 'Три дома рядом', de: 'Die drei Häuser nebeneinander', es: 'Las tres casas, una al lado de otra', sv: 'De tre husen sida vid sida', fi: 'Kolme taloa rinnakkain', lv: 'Trīs mājas līdzās' },
    compareRows: {
      guests:   { et: 'Kohti', en: 'Sleeps', ru: 'Мест', de: 'Plätze', es: 'Plazas', sv: 'Bäddar', fi: 'Paikkoja', lv: 'Vietas' },
      bedrooms: { et: 'Magamine', en: 'Sleeping', ru: 'Спальни', de: 'Schlafen', es: 'Para dormir', sv: 'Sovrum', fi: 'Makuutilat', lv: 'Gulēšanai' },
      sauna:    { et: 'Saun', en: 'Sauna', ru: 'Баня', de: 'Sauna', es: 'Sauna', sv: 'Bastu', fi: 'Sauna', lv: 'Pirts' },
      kitchen:  { et: 'Köök', en: 'Kitchen', ru: 'Кухня', de: 'Küche', es: 'Cocina', sv: 'Kök', fi: 'Keittiö', lv: 'Virtuve' },
      winter:   { et: 'Talvel', en: 'In winter', ru: 'Зимой', de: 'Im Winter', es: 'En invierno', sv: 'På vintern', fi: 'Talvella', lv: 'Ziemā' },
      // Not "from" any more — the row lists every tier, so a minimum would misdescribe it.
      price:    { et: 'Hind', en: 'Price', ru: 'Цена', de: 'Preis', es: 'Precio', sv: 'Pris', fi: 'Hinta', lv: 'Cena' },
      bestFor:  { et: 'Sobib', en: 'Best for', ru: 'Подходит', de: 'Passt für', es: 'Ideal para', sv: 'Passar för', fi: 'Sopii', lv: 'Piemērota' },
      extra:    { et: 'Lisaks', en: 'Extra', ru: 'Дополнительно', de: 'Zusätzlich', es: 'Extra', sv: 'Extra', fi: 'Lisäksi', lv: 'Papildus' },
    },
    compareUnit: { et: 'ööpäev, kogu maja', en: 'a night, whole house', ru: 'за ночь, весь дом', de: 'pro Nacht, ganzes Haus', es: 'por noche, la casa entera', sv: 'per natt, hela huset', fi: 'yö, koko talo', lv: 'par nakti, visa māja' },
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
          es: 'Construida a la antigua: paredes macizas de troncos gruesos y pesados, con madera de los bosques de Estonia. En esta casa no hay pladur.',
          sv: 'Byggt på gammalt vis: massiva väggar av grova, tunga stockar, virket från estnisk skog. Det finns inga gipsskivor i huset.',
          fi: 'Rakennettu vanhaan tapaan: massiiviset seinät paksuista, raskaista hirsistä, puutavara Viron metsistä. Talossa ei ole kipsilevyä.',
          lv: 'Celta pa vecam: masīvas sienas no resniem, smagiem baļķiem, kokmateriāls no Igaunijas mežiem. Šajā mājā nav ģipškartona.',
        },
        sleeps: 4,
        compare: {
          bedrooms: { et: '2 korrust, avatud toad', en: '2 floors, open rooms', ru: '2 этажа, открытые комнаты', de: '2 Etagen, offene Räume', es: '2 plantas, espacios abiertos', sv: '2 våningar, öppna rum', fi: '2 kerrosta, avoimet tilat', lv: '2 stāvi, atvērtas telpas' },
          // Named, not "in the house" — the other two rows point AT the Sauna House, so this
          // one naming itself is what makes the three cells comparable at a glance.
          sauna:    { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом', de: 'Saunahaus', es: 'Casa de la Sauna', sv: 'Bastuhuset', fi: 'Saunatalo', lv: 'Pirts māja' },
          kitchen:  { et: 'Täisvarustatud', en: 'Fully equipped', ru: 'Полностью оборудована', de: 'Voll ausgestattet', es: 'Totalmente equipada', sv: 'Fullt utrustat', fi: 'Täysin varusteltu', lv: 'Pilnībā aprīkota' },
          winter:   { et: 'Avatud', en: 'Open', ru: 'Открыт', de: 'Geöffnet', es: 'Abierta', sv: 'Öppet', fi: 'Auki', lv: 'Atvērta' },
          bestFor:  { et: 'Seltskond, väike tähistamine', en: 'A group, a small celebration', ru: 'Компания, небольшой праздник', de: 'Eine Gruppe, eine kleine Feier', es: 'Un grupo, una pequeña celebración', sv: 'Ett sällskap, en liten fest', fi: 'Porukka, pienet juhlat', lv: 'Kompānijai, nelielām svinībām' },
          extra:    { et: 'Lisavoodi lapsele', en: 'Extra bed for a child', ru: 'Детская доп. кровать', de: 'Zusatzbett für ein Kind', es: 'Cama supletoria para un niño', sv: 'Extrasäng för ett barn', fi: 'Lisävuode lapselle', lv: 'Papildu gulta bērnam' },
        },
        /*
         * Prose for the house page. The three cabins had 220-250 indexable words each
         * and leaned on photographs; a search engine cannot read a photograph. Written
         * from what is already true of the house — the build, who it suits, what is
         * around it — not padded to a word count.
         */
        seoKind: { et: 'saunaga palkmaja', en: 'sauna cabin', ru: 'сруб с дровяной баней', de: 'Ferienhaus mit Sauna', es: 'cabaña con sauna', sv: 'stuga med bastu', fi: 'saunallinen hirsimökki', lv: 'guļbūve ar pirti' },
        body: [
          {
            et: 'Saunamaja on roogkatusega palkmaja Oandu külas, Lahemaa rahvuspargi sees. Kaks korrust, avatud toad, paeplaatidest põrand ja kamin, mille kohal on sepistatud tammeokstega rõdupiire. Köök on täisvarustatud, köögisaar telliskivijalal ja puuküttega pliit. Magamiskohti on neljale, kaks kahekohalist voodit üle kahe korruse.',
            en: 'The Sauna House is a thatched log cabin in Oandu village, inside Lahemaa National Park. Two floors, open rooms, a flagstone floor and a fireplace, with a loft above it behind a balustrade of forged oak branches. The kitchen is fully equipped — an island on a brick base and a wood-fired range. It sleeps four, two double beds across two floors.',
            ru: 'Банный дом — бревенчатый дом с камышовой крышей в деревне Оанду, в национальном парке Лахемаа. Два этажа, открытые комнаты, каменный пол и камин, а над ним антресоль за коваными дубовыми ветвями ограждения. Кухня полностью оборудована: остров на кирпичном основании и дровяная плита. Спальных мест на четверых — две двуспальные кровати на двух этажах.',
            de: 'Das Saunahaus ist ein reetgedecktes Blockhaus im Dorf Oandu, im Nationalpark Lahemaa. Zwei Etagen, offene Räume, ein Steinplattenboden und ein Kamin, darüber eine Galerie hinter einem Geländer aus geschmiedeten Eichenzweigen. Die Küche ist voll ausgestattet – eine Insel auf gemauertem Sockel und ein Holzherd. Es bietet vier Personen Platz, zwei Doppelbetten über zwei Etagen.',
            es: 'La Casa de la Sauna es una cabaña de troncos con tejado de junco en el pueblo de Oandu, dentro del Parque Nacional de Lahemaa. Dos plantas, espacios abiertos, suelo de losas de piedra y una chimenea, con un altillo encima tras una barandilla de ramas de roble forjadas. La cocina está totalmente equipada: una isla sobre base de ladrillo y una cocina de leña. Tiene capacidad para cuatro personas, con dos camas dobles repartidas en dos plantas.',
            sv: 'Bastuhuset är en vasstäckt timmerstuga i byn Oandu, mitt i Lahemaa nationalpark. Två våningar, öppna rum, stengolv och en öppen spis, med ett loft ovanför bakom ett räcke av smidda ekgrenar. Köket är fullt utrustat – en köksö på tegelsockel och en vedspis. Det finns sovplats för fyra, två dubbelsängar på två våningar.',
            fi: 'Saunatalo on ruokokattoinen hirsimökki Oandun kylässä Lahemaan kansallispuistossa. Kaksi kerrosta, avoimet tilat, kivilaattalattia ja takka, jonka yläpuolella on parvi taotuista tammenoksista tehdyn kaiteen takana. Keittiö on täysin varusteltu – tiilijalustalla seisova keittiösaareke ja puuhella. Majoitus neljälle, kaksi parisänkyä kahdessa kerroksessa.',
            lv: 'Pirts māja ir guļbūve ar niedru jumtu Oandu ciemā, Lahemaa nacionālajā parkā. Divi stāvi, atvērtas telpas, akmens plākšņu grīda un kamīns, virs tā – galerija aiz kaltām ozolzaru margām. Virtuve ir pilnībā aprīkota – virtuves sala uz ķieģeļu pamata un malkas plīts. Guļvietas četriem – divas divguļamās gultas divos stāvos.',
          },
          {
            et: 'Süda on puuküttega saun. Köetakse puudega, mitte lülitiga, ja tiik on kümne sammu kaugusel – suvel ujumiseks, talvel on jäässe raiutud auk. Saunamaja on ainus kolmest, mis on avatud aasta läbi.',
            en: 'The heart of it is the wood-fired sauna. It is heated with wood, not a switch, and the pond is ten steps away — for swimming in summer, and in winter there is a hole cut in the ice. The Sauna House is the only one of the three open all year round.',
            ru: 'Сердце дома — дровяная баня. Она топится дровами, а не выключателем, и пруд в десяти шагах: летом для купания, зимой во льду прорублена прорубь. Банный дом — единственный из трёх, открытый круглый год.',
            de: 'Das Herzstück ist die Holzsauna. Sie wird mit Holz geheizt, nicht mit einem Schalter, und der Teich ist zehn Schritte entfernt – im Sommer zum Schwimmen, im Winter ist ein Loch ins Eis geschnitten. Das Saunahaus ist das einzige der drei, das ganzjährig geöffnet ist.',
            es: 'El corazón de la casa es la sauna de leña. Se calienta con leña, no con un interruptor, y el estanque está a diez pasos: para nadar en verano y, en invierno, hay un agujero abierto en el hielo. La Casa de la Sauna es la única de las tres abierta todo el año.',
            sv: 'Hjärtat är den vedeldade bastun. Den värms med ved, inte med en strömbrytare, och dammen ligger tio steg bort – för bad på sommaren, och på vintern finns en vak upphuggen i isen. Bastuhuset är det enda av de tre som är öppet året runt.',
            fi: 'Sydän on puulämmitteinen sauna. Se lämmitetään puilla, ei katkaisijasta, ja lampi on kymmenen askeleen päässä – kesällä uimiseen, talvella jäähän on hakattu avanto. Saunatalo on kolmesta ainoa, joka on auki ympäri vuoden.',
            lv: 'Tās sirds ir malkas pirts. To kurina ar malku, nevis ar slēdzi, un dīķis ir desmit soļu attālumā – vasarā peldēšanai, ziemā ledū ir izcirsts āliņģis. Pirts māja ir vienīgā no trim, kas atvērta visu gadu.',
          },
          {
            et: 'See sobib seltskonnale, kes tahab ühte lauda ja oma sauna: sõpradele, kahele perele, väiksele tähistamisele. Maja renditakse tervikuna. Ümberringi on Lahemaa – Palmse, Sagadi ja Vihula mõis lühikese sõidu kaugusel, Altja kaluriküla ja rannik põhja pool, Oandu külastuskeskus ja loodusmetsarada jalutuskäigu kaugusel. Tallinnasse on umbes 90 kilomeetrit.',
            en: 'It suits a group who want one table and a sauna of their own: friends, two families, a small celebration. The house is rented whole. Around it is Lahemaa — the manors of Palmse, Sagadi and Vihula a short drive away, Altja fishing village and the coast to the north, the Oandu visitor centre and the old-growth forest trail within walking distance. Tallinn is about 90 kilometres away.',
            ru: 'Подходит компании, которой нужен один стол и своя баня: друзьям, двум семьям, небольшому празднику. Дом сдаётся целиком. Вокруг — Лахемаа: мызы Палмсе, Сагади и Вихула в коротком переезде, рыбацкая деревня Алтья и побережье к северу, центр посетителей Оанду и тропа древнего леса в пешей доступности. До Таллинна около 90 километров.',
            de: 'Es passt für eine Gruppe, die eine Tafel und eine eigene Sauna möchte: Freunde, zwei Familien, eine kleine Feier. Das Haus wird als Ganzes vermietet. Ringsum liegt Lahemaa – die Gutshöfe Palmse, Sagadi und Vihula eine kurze Fahrt entfernt, das Fischerdorf Altja und die Küste im Norden, das Besucherzentrum Oandu und der Urwaldpfad in Gehweite. Tallinn ist etwa 90 Kilometer entfernt.',
            es: 'Es ideal para un grupo que quiere una sola mesa y una sauna propia: amigos, dos familias, una pequeña celebración. La casa se alquila entera. Alrededor está Lahemaa: las casas señoriales de Palmse, Sagadi y Vihula a un corto trayecto en coche, el pueblo pesquero de Altja y la costa al norte, y el centro de visitantes de Oandu y el sendero del bosque primario a poca distancia a pie. Tallinn está a unos 90 kilómetros.',
            sv: 'Det passar ett sällskap som vill ha ett bord och en egen bastu: vänner, två familjer, en liten fest. Huset hyrs ut i sin helhet. Runt omkring ligger Lahemaa – herrgårdarna Palmse, Sagadi och Vihula en kort bilresa bort, fiskebyn Altja och kusten i norr, Oandu besökscenter och urskogsleden på gångavstånd. Till Tallinn är det cirka 90 kilometer.',
            fi: 'Se sopii porukalle, joka haluaa yhden pöydän ja oman saunan: ystäville, kahdelle perheelle, pieniin juhliin. Talo vuokrataan kokonaan. Ympärillä on Lahemaa – Palmsen, Sagadin ja Vihulan kartanot lyhyen ajomatkan päässä, Altjan kalastajakylä ja rannikko pohjoisessa, Oandun luontokeskus ja luonnonmetsäpolku kävelymatkan päässä. Tallinnaan on noin 90 kilometriä.',
            lv: 'Tā der kompānijai, kas vēlas vienu galdu un savu pirti: draugiem, divām ģimenēm, nelielām svinībām. Māja tiek izīrēta pilnībā. Apkārt ir Lahemaa – Palmses, Sagadi un Vihulas muižas īsa brauciena attālumā, Altjas zvejnieku ciems un krasts uz ziemeļiem, Oandu apmeklētāju centrs un dabas meža taka pastaigas attālumā. Līdz Tallinai ir aptuveni 90 kilometru.',
          },
        ],
        name: { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом', de: 'Saunahaus', es: 'Casa de la Sauna', sv: 'Bastuhuset', fi: 'Saunatalo', lv: 'Pirts māja' },
        tag:  { et: 'Saun, köök, seltskond – kõik olemas.', en: 'Sauna, kitchen, company – all there.', ru: 'Сауна, кухня, компания – всё есть.', de: 'Sauna, Küche, Gesellschaft – alles da.', es: 'Sauna, cocina, compañía: todo está aquí.', sv: 'Bastu, kök, sällskap – allt finns.', fi: 'Sauna, keittiö, seura – kaikki valmiina.', lv: 'Pirts, virtuve, kompānija – viss ir.' },
        items: [
          { et: 'Kuni 4 ööbijat · 2 kahekohalist voodit · 2 korrust', en: 'Up to 4 guests · 2 double beds · 2 floors', ru: 'До 4 гостей · 2 двухместные кровати · 2 этажа', de: 'Bis zu 4 Gäste · 2 Doppelbetten · 2 Etagen', es: 'Hasta 4 huéspedes · 2 camas dobles · 2 plantas', sv: 'Upp till 4 gäster · 2 dubbelsängar · 2 våningar', fi: 'Enintään 4 vierasta · 2 parisänkyä · 2 kerrosta', lv: 'Līdz 4 viesiem · 2 divguļamās gultas · 2 stāvi' },
          { et: 'Avatud toad, puuküttega saun, täisvarustatud köök, külmavann tiigis', en: 'Open rooms, wood-fired sauna, fully equipped kitchen, cold plunge in the pond', ru: 'Открытые комнаты, дровяная сауна, оборудованная кухня, холодное купание в пруду', de: 'Offene Räume, Holzsauna, voll ausgestattete Küche, Kaltbad im Teich', es: 'Espacios abiertos, sauna de leña, cocina totalmente equipada, baño frío en el estanque', sv: 'Öppna rum, vedeldad bastu, fullt utrustat kök, kallbad i dammen', fi: 'Avoimet tilat, puulämmitteinen sauna, täysin varusteltu keittiö, kylmä pulahdus lampeen', lv: 'Atvērtas telpas, malkas pirts, pilnībā aprīkota virtuve, auksta pelde dīķī' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя', de: '1–2 Gäste', es: '1–2 huéspedes', sv: '1–2 gäster', fi: '1–2 vierasta', lv: '1–2 viesi' }, eur: 200, upTo: 2 },
          { guests: { et: '3–4 inimest', en: '3–4 guests', ru: '3–4 гостя', de: '3–4 Gäste', es: '3–4 huéspedes', sv: '3–4 gäster', fi: '3–4 vierasta', lv: '3–4 viesi' }, eur: 300, upTo: 4 },
        ],
        priceExtra: {
          et: 'Lapsele saab igasse majja lisavoodi – kokkuleppel broneerides.',
          en: 'An extra bed for a child can be added in any house – by arrangement when you book.',
          ru: 'Детскую дополнительную кровать можно поставить в любом доме – по договорённости при бронировании.',
          de: 'In jedem Haus kann ein Zusatzbett für ein Kind aufgestellt werden – nach Absprache bei der Buchung.',
          es: 'En cualquier casa se puede añadir una cama supletoria para un niño, previo acuerdo al reservar.',
          sv: 'En extrasäng för ett barn kan ställas in i alla hus – enligt överenskommelse när du bokar.',
          fi: 'Lapselle saa lisävuoteen mihin tahansa taloon – sopimuksen mukaan varauksen yhteydessä.',
          lv: 'Jebkurā mājā var ielikt papildu gultu bērnam – pēc vienošanās, veicot rezervāciju.',
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
          es: 'Construida a la antigua: paredes macizas de troncos gruesos y pesados, con madera de los bosques de Estonia. En esta casa no hay pladur.',
          sv: 'Byggt på gammalt vis: massiva väggar av grova, tunga stockar, virket från estnisk skog. Det finns inga gipsskivor i huset.',
          fi: 'Rakennettu vanhaan tapaan: massiiviset seinät paksuista, raskaista hirsistä, puutavara Viron metsistä. Talossa ei ole kipsilevyä.',
          lv: 'Celta pa vecam: masīvas sienas no resniem, smagiem baļķiem, kokmateriāls no Igaunijas mežiem. Šajā mājā nav ģipškartona.',
        },
        sleeps: 2,
        compare: {
          bedrooms: { et: '1 magamistuba', en: '1 bedroom', ru: '1 спальня', de: '1 Schlafzimmer', es: '1 dormitorio', sv: '1 sovrum', fi: '1 makuuhuone', lv: '1 guļamistaba' },
          // Not "in the Sauna House, next door" — that told the guest where the sauna is
          // and let them assume it came with the house. It does not.
          sauna:    { et: 'Ei sisaldu · küsi', en: 'Not included · ask us', ru: 'Не входит · спросите', de: 'Nicht enthalten · fragen', es: 'No incluida · pregúntanos', sv: 'Ingår inte · fråga oss', fi: 'Ei sisälly · kysy meiltä', lv: 'Nav iekļauta · jautājiet' },
          kitchen:  { et: 'Kööginurk', en: 'Kitchenette', ru: 'Кухонный уголок', de: 'Küchenzeile', es: 'Rincón de cocina', sv: 'Pentry', fi: 'Keittonurkkaus', lv: 'Virtuves stūrītis' },
          winter:   { et: 'Suletud dets–märts', en: 'Closed Dec–Mar', ru: 'Закрыт дек–март', de: 'Dez–März geschlossen', es: 'Cerrada dic–mar', sv: 'Stängt dec–mars', fi: 'Suljettu joulu–maalis', lv: 'Slēgta dec.–marts' },
          bestFor:  { et: 'Paar', en: 'A couple', ru: 'Пара', de: 'Ein Paar', es: 'Una pareja', sv: 'Ett par', fi: 'Pariskunta', lv: 'Pārim' },
          extra:    { et: 'Lisavoodi lapsele', en: 'Extra bed for a child', ru: 'Детская доп. кровать', de: 'Zusatzbett für ein Kind', es: 'Cama supletoria para un niño', sv: 'Extrasäng för ett barn', fi: 'Lisävuode lapselle', lv: 'Papildu gulta bērnam' },
        },
        seoKind: { et: 'majake tiigi ääres', en: 'waterside cabin', ru: 'домик на берегу пруда', de: 'Ferienhaus am Wasser', es: 'cabaña junto al agua', sv: 'stuga vid vattnet', fi: 'mökki veden äärellä', lv: 'namiņš pie ūdens' },
        body: [
          {
            et: 'Tiigimaja seisab vee ääres, oma tiigi kaldal. Sees on üks avatud ruum: elutuba rohelise diivani ja nikerdatud katusetalaga, kamin uivpuust skulptuuri all ja klaasseinad, mis avanevad murule ja metsale. Kööginurgas on gaasipliit ja retrokülmik. Magamistoal on põrandast laeni aknad niidule.',
            en: 'The Pond House stands at the water, on the bank of its own pond. Inside is one open room: a living room with a green sofa and a carved roof beam, a fireplace beneath a driftwood sculpture, and glass walls that open onto lawn and forest. The kitchen corner has a gas hob and a retro fridge. The bedroom has floor-to-ceiling windows onto the meadow.',
            ru: 'Прудовой дом стоит у воды, на берегу собственного пруда. Внутри одно открытое пространство: гостиная с зелёным диваном и резной балкой, камин под скульптурой из коряги и стеклянные стены, открытые на газон и лес. В кухонном углу газовая плита и ретро-холодильник. В спальне окна в пол, выходящие на луг.',
            de: 'Das Teichhaus steht am Wasser, am Ufer seines eigenen Teichs. Innen ein einziger offener Raum: ein Wohnzimmer mit grünem Sofa und geschnitztem Dachbalken, ein Kamin unter einer Treibholzskulptur und Glaswände, die sich zu Wiese und Wald öffnen. Die Küchenecke hat ein Gaskochfeld und einen Retro-Kühlschrank. Das Schlafzimmer hat raumhohe Fenster zur Wiese.',
            es: 'La Casa del Estanque está junto al agua, a la orilla de su propio estanque. Dentro hay un único espacio abierto: un salón con un sofá verde y una viga tallada, una chimenea bajo una escultura de madera de deriva y paredes de cristal que se abren al césped y al bosque. El rincón de cocina tiene placa de gas y una nevera retro. El dormitorio tiene ventanales de suelo a techo que dan al prado.',
            sv: 'Dammhuset står vid vattnet, på stranden av sin egen damm. Inuti finns ett enda öppet rum: ett vardagsrum med en grön soffa och en snidad takbjälke, en öppen spis under en skulptur av drivved och glasväggar som öppnar sig mot gräsmattan och skogen. I köksdelen finns gashäll och ett retrokylskåp. Sovrummet har fönster från golv till tak ut mot ängen.',
            fi: 'Lampitalo seisoo veden äärellä, oman lampensa rannalla. Sisällä on yksi avoin tila: olohuone, jossa on vihreä sohva ja veistetty kattopalkki, takka ajopuuveistoksen alla ja lasiseinät, jotka avautuvat nurmikolle ja metsään. Keittonurkkauksessa on kaasuliesi ja retrojääkaappi. Makuuhuoneessa on lattiasta kattoon ulottuvat ikkunat niitylle.',
            lv: 'Dīķa māja stāv pie ūdens, sava dīķa krastā. Iekšā ir viena atvērta telpa: dzīvojamā istaba ar zaļu dīvānu un grieztu jumta siju, kamīns zem dreifkoka skulptūras un stikla sienas, kas paveras uz zālienu un mežu. Virtuves stūrītī ir gāzes plīts un retro ledusskapis. Guļamistabā ir logi no grīdas līdz griestiem ar skatu uz pļavu.',
          },
          {
            et: 'Ees on lai puitterrass lamamistoolide ja pergola all istumisalaga – hommikukohv vee kohal, õhtu välja. Maja on kahele.',
            en: 'In front is a broad timber deck with loungers and seating under a pergola — morning coffee over the water, the evening outdoors. The house is for two.',
            ru: 'Перед домом широкая деревянная терраса с шезлонгами и зоной отдыха под перголой — утренний кофе над водой, вечер на улице. Дом рассчитан на двоих.',
            de: 'Davor liegt eine breite Holzterrasse mit Liegen und Sitzplätzen unter einer Pergola – der Morgenkaffee über dem Wasser, der Abend im Freien. Das Haus ist für zwei.',
            es: 'Delante hay una amplia terraza de madera con tumbonas y una zona para sentarse bajo una pérgola: el café de la mañana sobre el agua, la tarde al aire libre. La casa es para dos.',
            sv: 'Framför huset ligger ett brett trädäck med solstolar och sittplatser under en pergola – morgonkaffe över vattnet, kvällen utomhus. Huset är för två.',
            fi: 'Edessä on leveä puuterassi aurinkotuoleineen ja istumapaikkoineen pergolan alla – aamukahvi veden äärellä, ilta ulkona. Talo on kahdelle.',
            lv: 'Priekšā ir plaša koka terase ar sauļošanās krēsliem un sēdvietām zem pergolas – rīta kafija virs ūdens, vakars brīvā dabā. Māja ir diviem.',
          },
          {
            et: 'See on kolmest kõige vaiksem ja sobib paarile. Saun on ainult Saunamajas ega sisaldu selle maja hinnas – kui soovid sauna, kirjuta meile. Tiigimaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill. Lahemaa matkarajad, mõisad ja rannik on samamoodi lähedal nagu ülejäänud majadel.',
            en: 'It is the quietest of the three and suits a couple. The sauna is in the Sauna House only and is not included with this house \u2014 write to us if you would like to use it. The Pond House closes for the winter, from 1 December to 31 March; the first night of the new season is 1 April. The Lahemaa trails, manors and coast are as near as they are from the other houses.',
            ru: 'Это самый тихий из трёх домов, он подходит паре. Баня есть только в Банном доме и в стоимость этого дома не входит — напишите нам, если хотите ею воспользоваться. Прудовой дом закрыт на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля. Тропы Лахемаа, мызы и побережье так же близко, как и от остальных домов.',
            de: 'Es ist das ruhigste der drei und passt für ein Paar. Die Sauna gibt es nur im Saunahaus und sie ist im Preis dieses Hauses nicht enthalten – schreiben Sie uns, wenn Sie sie nutzen möchten. Das Teichhaus ist im Winter vom 1. Dezember bis 31. März geschlossen; die erste Nacht der neuen Saison ist der 1. April. Die Wege, Gutshöfe und die Küste von Lahemaa sind so nah wie von den anderen Häusern.',
            es: 'Es la más tranquila de las tres y es ideal para una pareja. La sauna está solo en la Casa de la Sauna y no está incluida con esta casa; escríbenos si quieres usarla. La Casa del Estanque cierra en invierno, del 1 de diciembre al 31 de marzo; la primera noche de la nueva temporada es el 1 de abril. Los senderos, las casas señoriales y la costa de Lahemaa quedan igual de cerca que desde las otras casas.',
            sv: 'Det är det lugnaste av de tre och passar ett par. Bastun finns bara i Bastuhuset och ingår inte i det här huset – skriv till oss om du vill använda den. Dammhuset är stängt över vintern, från 1 december till 31 mars; säsongens första natt är 1 april. Lahemaas leder, herrgårdar och kust ligger lika nära som från de andra husen.',
            fi: 'Se on kolmesta rauhallisin ja sopii pariskunnalle. Sauna on vain Saunatalossa, eikä se sisälly tämän talon hintaan – kirjoita meille, jos haluat käyttää sitä. Lampitalo on suljettu talven ajan 1. joulukuuta–31. maaliskuuta; uuden kauden ensimmäinen yö on 1. huhtikuuta. Lahemaan polut, kartanot ja rannikko ovat yhtä lähellä kuin muistakin taloista.',
            lv: 'Tā ir klusākā no trim un der pārim. Pirts ir tikai Pirts mājā un šīs mājas cenā nav iekļauta – rakstiet mums, ja vēlaties to izmantot. Dīķa māja ziemā ir slēgta no 1. decembra līdz 31. martam; jaunās sezonas pirmā nakts ir 1. aprīlī. Lahemaa takas, muižas un krasts ir tikpat tuvu kā no pārējām mājām.',
          },
        ],
        name: { et: 'Tiigimaja', en: 'Pond House', ru: 'Прудовой дом', de: 'Teichhaus', es: 'Casa del Estanque', sv: 'Dammhuset', fi: 'Lampitalo', lv: 'Dīķa māja' },
        tag:  { et: 'Tule kaheks päevaks. Jää kaheks nädalaks.', en: 'Come for two days. Stay for two weeks.', ru: 'Приедь на два дня. Останься на две недели.', de: 'Kommen Sie für zwei Tage. Bleiben Sie zwei Wochen.', es: 'Ven por dos días. Quédate dos semanas.', sv: 'Kom för två dagar. Stanna i två veckor.', fi: 'Tule kahdeksi päiväksi. Jää kahdeksi viikoksi.', lv: 'Atbrauciet uz divām dienām. Palieciet uz divām nedēļām.' },
        items: [
          { et: 'Kahele · suur terrass · kamin', en: 'For two · large terrace · fireplace', ru: 'На двоих · большая терраса · камин', de: 'Für zwei · große Terrasse · Kamin', es: 'Para dos · gran terraza · chimenea', sv: 'För två · stor terrass · öppen spis', fi: 'Kahdelle · iso terassi · takka', lv: 'Diviem · liela terase · kamīns' },
          { et: 'Kööginurk, vannituba', en: 'Kitchenette, bathroom', ru: 'Кухонный угол, ванная', de: 'Küchenzeile, Bad', es: 'Rincón de cocina, baño', sv: 'Pentry, badrum', fi: 'Keittonurkkaus, kylpyhuone', lv: 'Virtuves stūrītis, vannas istaba' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя', de: '1–2 Gäste', es: '1–2 huéspedes', sv: '1–2 gäster', fi: '1–2 vierasta', lv: '1–2 viesi' }, eur: 150, upTo: 2 },
        ],
        priceExtra: {
          et: 'Lapsele saab igasse majja lisavoodi – kokkuleppel broneerides.',
          en: 'An extra bed for a child can be added in any house – by arrangement when you book.',
          ru: 'Детскую дополнительную кровать можно поставить в любом доме – по договорённости при бронировании.',
          de: 'In jedem Haus kann ein Zusatzbett für ein Kind aufgestellt werden – nach Absprache bei der Buchung.',
          es: 'En cualquier casa se puede añadir una cama supletoria para un niño, previo acuerdo al reservar.',
          sv: 'En extrasäng för ett barn kan ställas in i alla hus – enligt överenskommelse när du bokar.',
          fi: 'Lapselle saa lisävuoteen mihin tahansa taloon – sopimuksen mukaan varauksen yhteydessä.',
          lv: 'Jebkurā mājā var ielikt papildu gultu bērnam – pēc vienošanās, veicot rezervāciju.',
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
          es: 'Construida a la antigua: paredes macizas de troncos gruesos y pesados, con madera de los bosques de Estonia. En esta casa no hay pladur.',
          sv: 'Byggt på gammalt vis: massiva väggar av grova, tunga stockar, virket från estnisk skog. Det finns inga gipsskivor i huset.',
          fi: 'Rakennettu vanhaan tapaan: massiiviset seinät paksuista, raskaista hirsistä, puutavara Viron metsistä. Talossa ei ole kipsilevyä.',
          lv: 'Celta pa vecam: masīvas sienas no resniem, smagiem baļķiem, kokmateriāls no Igaunijas mežiem. Šajā mājā nav ģipškartona.',
        },
        sleeps: 4,
        compare: {
          bedrooms: { et: '2 magamistuba', en: '2 bedrooms', ru: '2 спальни', de: '2 Schlafzimmer', es: '2 dormitorios', sv: '2 sovrum', fi: '2 makuuhuonetta', lv: '2 guļamistabas' },
          sauna:    { et: 'Ei sisaldu · küsi', en: 'Not included · ask us', ru: 'Не входит · спросите', de: 'Nicht enthalten · fragen', es: 'No incluida · pregúntanos', sv: 'Ingår inte · fråga oss', fi: 'Ei sisälly · kysy meiltä', lv: 'Nav iekļauta · jautājiet' },
          kitchen:  { et: 'Miniköök', en: 'Mini kitchen', ru: 'Мини-кухня', de: 'Miniküche', es: 'Minicocina', sv: 'Minikök', fi: 'Minikeittiö', lv: 'Mini virtuve' },
          winter:   { et: 'Suletud dets–märts', en: 'Closed Dec–Mar', ru: 'Закрыт дек–март', de: 'Dez–März geschlossen', es: 'Cerrada dic–mar', sv: 'Stängt dec–mars', fi: 'Suljettu joulu–maalis', lv: 'Slēgta dec.–marts' },
          bestFor:  { et: 'Pere või kaks paari', en: 'A family or two couples', ru: 'Семья или две пары', de: 'Eine Familie oder zwei Paare', es: 'Una familia o dos parejas', sv: 'En familj eller två par', fi: 'Perhe tai kaksi pariskuntaa', lv: 'Ģimenei vai diviem pāriem' },
          extra:    { et: 'Lisavoodi lapsele', en: 'Extra bed for a child', ru: 'Детская доп. кровать', de: 'Zusatzbett für ein Kind', es: 'Cama supletoria para un niño', sv: 'Extrasäng för ett barn', fi: 'Lisävuode lapselle', lv: 'Papildu gulta bērnam' },
        },
        seoKind: { et: 'palkmaja metsa serval', en: 'forest cabin', ru: 'дом среди елей', de: 'Ferienhaus im Wald', es: 'cabaña en el bosque', sv: 'stuga i skogen', fi: 'metsämökki', lv: 'namiņš mežā' },
        body: [
          {
            et: 'Metsamaja seisab kõrgete kuuskede vahel, muru serval. Kaks magamistuba, kamin, miniköök, WC ja dušš. Elutoas on tepitud diivan lambanahkade all, ruuduline vaip ja rippkiik akna all; magamistoa palkseinte vahel valgustatud pullipea voodi kohal.',
            en: 'The Forest House stands among tall spruce at the edge of the lawn. Two bedrooms, a fireplace, a mini kitchen, a WC and a shower. In the living room a buttoned sofa under sheepskins, a checked rug and a hanging chair at the window; in the bedroom, between log walls, a lit bull’s head above the bed.',
            ru: 'Лесной дом стоит среди высоких елей на краю газона. Две спальни, камин, мини-кухня, санузел с душем. В гостиной стёганый диван под овчинами, клетчатый ковёр и подвесное кресло у окна; в спальне между бревенчатыми стенами — подсвеченная голова быка над кроватью.',
            de: 'Das Waldhaus steht zwischen hohen Fichten am Rand der Wiese. Zwei Schlafzimmer, ein Kamin, eine Miniküche, WC und Dusche. Im Wohnraum ein Chesterfield-Sofa unter Schaffellen, ein karierter Teppich und ein Hängesessel am Fenster; im Schlafzimmer, zwischen Blockwänden, ein beleuchteter Stierkopf über dem Bett.',
            es: 'La Casa del Bosque está entre altos abetos, al borde del césped. Dos dormitorios, una chimenea, una minicocina, un aseo y una ducha. En el salón, un sofá capitoné bajo pieles de oveja, una alfombra de cuadros y un sillón colgante junto a la ventana; en el dormitorio, entre paredes de troncos, una cabeza de toro iluminada sobre la cama.',
            sv: 'Skogshuset står bland höga granar i kanten av gräsmattan. Två sovrum, öppen spis, minikök, wc och dusch. I vardagsrummet en kapitonnérad soffa under fårskinn, en rutig matta och en hängstol vid fönstret; i sovrummet, mellan timmerväggarna, ett upplyst tjurhuvud ovanför sängen.',
            fi: 'Metsätalo seisoo korkeiden kuusten keskellä nurmikon laidalla. Kaksi makuuhuonetta, takka, minikeittiö, WC ja suihku. Olohuoneessa on napitettu sohva lampaantaljojen alla, ruudullinen matto ja riipputuoli ikkunan edessä; makuuhuoneessa hirsiseinien välissä valaistu härän pää sängyn yläpuolella.',
            lv: 'Meža māja stāv starp augstām eglēm zāliena malā. Divas guļamistabas, kamīns, mini virtuve, tualete un duša. Dzīvojamā istabā – pogots dīvāns zem aitādām, rūtains paklājs un piekarams krēsls pie loga; guļamistabā starp baļķu sienām – izgaismota vērša galva virs gultas.',
          },
          {
            et: 'See on neljale ja sobib perele või kahele paarile: kaks eraldi magamistuba, oma kamin ja mets akna taga. Maja renditakse tervikuna.',
            en: 'It is for four and suits a family or two couples: two separate bedrooms, a fireplace of its own and forest outside the window. The house is rented whole.',
            ru: 'Дом на четверых, подходит семье или двум парам: две отдельные спальни, собственный камин и лес за окном. Дом сдаётся целиком.',
            de: 'Es ist für vier und passt für eine Familie oder zwei Paare: zwei getrennte Schlafzimmer, ein eigener Kamin und Wald vor dem Fenster. Das Haus wird als Ganzes vermietet.',
            es: 'Es para cuatro y es ideal para una familia o dos parejas: dos dormitorios separados, una chimenea propia y el bosque al otro lado de la ventana. La casa se alquila entera.',
            sv: 'Det är för fyra och passar en familj eller två par: två separata sovrum, en egen öppen spis och skog utanför fönstret. Huset hyrs ut i sin helhet.',
            fi: 'Se on neljälle ja sopii perheelle tai kahdelle pariskunnalle: kaksi erillistä makuuhuonetta, oma takka ja metsä ikkunan takana. Talo vuokrataan kokonaan.',
            lv: 'Tā ir četriem un der ģimenei vai diviem pāriem: divas atsevišķas guļamistabas, savs kamīns un mežs aiz loga. Māja tiek izīrēta pilnībā.',
          },
          {
            et: 'Saun on ainult Saunamajas ega sisaldu selle maja hinnas – kui soovid sauna, kirjuta meile. Metsamaja on talveks suletud 1. detsembrist 31. märtsini; hooaja esimene öö on 1. aprill. Matkarajad algavad külast, Palmse, Sagadi ja Vihula mõis ning Altja rannik on lühikese sõidu kaugusel, Tallinnasse umbes 90 kilomeetrit.',
            en: 'The sauna is in the Sauna House only and is not included with this house \u2014 write to us if you would like to use it. The Forest House closes for the winter, from 1 December to 31 March; the first night of the new season is 1 April. The trails start from the village, the manors of Palmse, Sagadi and Vihula and the coast at Altja are a short drive away, and Tallinn is about 90 kilometres.',
            ru: 'Баня есть только в Банном доме и в стоимость этого дома не входит — напишите нам, если хотите ею воспользоваться. Лесной дом закрыт на зиму с 1 декабря по 31 марта; первая ночь нового сезона — 1 апреля. Тропы начинаются от деревни, мызы Палмсе, Сагади и Вихула и побережье в Алтья — в коротком переезде, до Таллинна около 90 километров.',
            de: 'Die Sauna gibt es nur im Saunahaus und sie ist im Preis dieses Hauses nicht enthalten – schreiben Sie uns, wenn Sie sie nutzen möchten. Das Waldhaus ist im Winter vom 1. Dezember bis 31. März geschlossen; die erste Nacht der neuen Saison ist der 1. April. Die Wege beginnen im Dorf, die Gutshöfe Palmse, Sagadi und Vihula und die Küste bei Altja sind eine kurze Fahrt entfernt, und Tallinn ist etwa 90 Kilometer entfernt.',
            es: 'La sauna está solo en la Casa de la Sauna y no está incluida con esta casa; escríbenos si quieres usarla. La Casa del Bosque cierra en invierno, del 1 de diciembre al 31 de marzo; la primera noche de la nueva temporada es el 1 de abril. Los senderos salen del pueblo, las casas señoriales de Palmse, Sagadi y Vihula y la costa de Altja están a un corto trayecto en coche, y Tallinn queda a unos 90 kilómetros.',
            sv: 'Bastun finns bara i Bastuhuset och ingår inte i det här huset – skriv till oss om du vill använda den. Skogshuset är stängt över vintern, från 1 december till 31 mars; säsongens första natt är 1 april. Lederna börjar i byn, herrgårdarna Palmse, Sagadi och Vihula och kusten vid Altja ligger en kort bilresa bort, och till Tallinn är det cirka 90 kilometer.',
            fi: 'Sauna on vain Saunatalossa, eikä se sisälly tämän talon hintaan – kirjoita meille, jos haluat käyttää sitä. Metsätalo on suljettu talven ajan 1. joulukuuta–31. maaliskuuta; uuden kauden ensimmäinen yö on 1. huhtikuuta. Polut alkavat kylästä, Palmsen, Sagadin ja Vihulan kartanot sekä Altjan rannikko ovat lyhyen ajomatkan päässä, ja Tallinnaan on noin 90 kilometriä.',
            lv: 'Pirts ir tikai Pirts mājā un šīs mājas cenā nav iekļauta – rakstiet mums, ja vēlaties to izmantot. Meža māja ziemā ir slēgta no 1. decembra līdz 31. martam; jaunās sezonas pirmā nakts ir 1. aprīlī. Takas sākas ciemā, Palmses, Sagadi un Vihulas muižas un Altjas krasts ir īsa brauciena attālumā, un līdz Tallinai ir aptuveni 90 kilometru.',
          },
        ],
        name: { et: 'Metsamaja', en: 'Forest House', ru: 'Лесной дом', de: 'Waldhaus', es: 'Casa del Bosque', sv: 'Skogshuset', fi: 'Metsätalo', lv: 'Meža māja' },
        tag:  { et: 'Neli inimest. Kaks tuba. Üks mets.', en: 'Four people. Two rooms. One forest.', ru: 'Четыре человека. Две комнаты. Один лес.', de: 'Vier Personen. Zwei Zimmer. Ein Wald.', es: 'Cuatro personas. Dos habitaciones. Un bosque.', sv: 'Fyra personer. Två rum. En skog.', fi: 'Neljä ihmistä. Kaksi huonetta. Yksi metsä.', lv: 'Četri cilvēki. Divas istabas. Viens mežs.' },
        items: [
          { et: 'Neljale · 2 magamistuba', en: 'For four · 2 bedrooms', ru: 'На четверых · 2 спальни', de: 'Für vier · 2 Schlafzimmer', es: 'Para cuatro · 2 dormitorios', sv: 'För fyra · 2 sovrum', fi: 'Neljälle · 2 makuuhuonetta', lv: 'Četriem · 2 guļamistabas' },
          { et: 'Kamin, mini köök, WC ja dušš', en: 'Fireplace, mini kitchen, WC and shower', ru: 'Камин, мини-кухня, туалет и душ', de: 'Kamin, Miniküche, WC und Dusche', es: 'Chimenea, minicocina, aseo y ducha', sv: 'Öppen spis, minikök, wc och dusch', fi: 'Takka, minikeittiö, WC ja suihku', lv: 'Kamīns, mini virtuve, tualete un duša' },
        ],
        prices: [
          { guests: { et: '1–2 inimest', en: '1–2 guests', ru: '1–2 гостя', de: '1–2 Gäste', es: '1–2 huéspedes', sv: '1–2 gäster', fi: '1–2 vierasta', lv: '1–2 viesi' }, eur: 100, upTo: 2 },
          { guests: { et: '3–4 inimest', en: '3–4 guests', ru: '3–4 гостя', de: '3–4 Gäste', es: '3–4 huéspedes', sv: '3–4 gäster', fi: '3–4 vierasta', lv: '3–4 viesi' }, eur: 150, upTo: 4 },
        ],
        priceExtra: {
          et: 'Lapsele saab igasse majja lisavoodi – kokkuleppel broneerides.',
          en: 'An extra bed for a child can be added in any house – by arrangement when you book.',
          ru: 'Детскую дополнительную кровать можно поставить в любом доме – по договорённости при бронировании.',
          de: 'In jedem Haus kann ein Zusatzbett für ein Kind aufgestellt werden – nach Absprache bei der Buchung.',
          es: 'En cualquier casa se puede añadir una cama supletoria para un niño, previo acuerdo al reservar.',
          sv: 'En extrasäng för ett barn kan ställas in i alla hus – enligt överenskommelse när du bokar.',
          fi: 'Lapselle saa lisävuoteen mihin tahansa taloon – sopimuksen mukaan varauksen yhteydessä.',
          lv: 'Jebkurā mājā var ielikt papildu gultu bērnam – pēc vienošanās, veicot rezervāciju.',
        },
      },
    ],
    priceLabel:  { et: 'Hind', en: 'Price', ru: 'Цена', de: 'Preis', es: 'Precio', sv: 'Pris', fi: 'Hinta', lv: 'Cena' },
    priceUnit:   { et: 'öö', en: 'night', ru: 'ночь', de: 'Nacht', es: 'noche', sv: 'natt', fi: 'yö', lv: 'nakts' },
    priceNote: {
      et: 'Hinnad on kogu maja kohta ööpäevas. Kõrghooajal, pühade ajal ja pikemate broneeringute puhul võivad hinnad erineda – küsi pakkumist.',
      en: 'Prices are for the whole house, per night. They can differ in high season, over holidays and for longer stays – ask us for an offer.',
      ru: 'Цены указаны за весь дом за сутки. В высокий сезон, в праздники и при длительном проживании цены могут отличаться – запросите предложение.',
      de: 'Die Preise gelten für das ganze Haus pro Nacht. In der Hochsaison, an Feiertagen und bei längeren Aufenthalten können sie abweichen – fragen Sie uns nach einem Angebot.',
      es: 'Los precios son por la casa entera y por noche. Pueden variar en temporada alta, en festivos y en estancias largas: pídenos una oferta.',
      sv: 'Priserna gäller hela huset per natt. De kan variera under högsäsong, helger och vid längre vistelser – be oss om ett erbjudande.',
      fi: 'Hinnat ovat koko talosta yöltä. Ne voivat vaihdella sesonkiaikana, pyhinä ja pidemmillä lomilla – pyydä meiltä tarjous.',
      lv: 'Cenas norādītas par visu māju par nakti. Augstajā sezonā, svētku laikā un ilgākām uzturēšanās reizēm tās var atšķirties – lūdziet mums piedāvājumu.',
    },
    cta:         { et: 'Vaata saadavust', en: 'Check availability', ru: 'Проверить наличие', de: 'Verfügbarkeit prüfen', es: 'Ver disponibilidad', sv: 'Se lediga datum', fi: 'Katso saatavuus', lv: 'Skatīt pieejamību' },
    galleryLink: { et: 'Vaata pilte', en: 'View photos', ru: 'Смотреть фото', de: 'Fotos ansehen', es: 'Ver fotos', sv: 'Se bilder', fi: 'Katso kuvat', lv: 'Skatīt fotoattēlus' },
    imgLabel:    { et: 'Oandu · Lahemaa · 59°26′N', en: 'Oandu · Lahemaa · 59°26′N', ru: 'Оанду · Лахемаа · 59°26′N', de: 'Oandu · Lahemaa · 59°26′N', es: 'Oandu · Lahemaa · 59°26′N', sv: 'Oandu · Lahemaa · 59°26′N', fi: 'Oandu · Lahemaa · 59°26′N', lv: 'Oandu · Lahemaa · 59°26′N' },
  },
  trails: {
    label: { et: 'Loodus', en: 'Nature', ru: 'Природа', de: 'Natur', es: 'Naturaleza', sv: 'Natur', fi: 'Luonto', lv: 'Daba' },
    h1:   { et: 'Spaa on õues.', en: 'The spa is outside.', ru: 'Спа – на улице.', de: 'Das Spa ist draußen.', es: 'El spa está fuera.', sv: 'Spat är utomhus.', fi: 'Kylpylä on ulkona.', lv: 'Spa ir ārā.' },
    h2:   { et: 'Tervis ', en: 'Health ', ru: 'Здоровье ', de: 'Gesundheit ', es: 'La salud ', sv: 'Hälsan ', fi: 'Terveys ', lv: 'Veselība ' },
    h2em: { et: 'tuleb.', en: 'comes.', ru: 'приходит.', de: 'kommt.', es: 'llega.', sv: 'kommer.', fi: 'tulee.', lv: 'nāk.' },
    desc1: {
      et: 'Puuküttega saun, tiigikümblus, allikavesi, linnulaul. Pole protseduuride nimekirja ega broneerimisportaali – ainult mets, vesi ja vaikus.',
      en: 'Wood-fired sauna, pond bathing, spring water, birdsong. No list of treatments, no booking portal – just forest, water and silence.',
      ru: 'Дровяная сауна, купание в пруду, родниковая вода, пение птиц. Никаких списков процедур и порталов – только лес, вода и тишина.',
      de: 'Holzsauna, Baden im Teich, Quellwasser, Vogelgesang. Keine Behandlungsliste, kein Buchungsportal – nur Wald, Wasser und Stille.',
      es: 'Sauna de leña, baños en el estanque, agua de manantial, canto de pájaros. Sin lista de tratamientos ni portal de reservas: solo bosque, agua y silencio.',
      sv: 'Vedeldad bastu, bad i dammen, källvatten, fågelsång. Ingen behandlingslista, ingen bokningsportal – bara skog, vatten och tystnad.',
      fi: 'Puulämmitteinen sauna, lampikylpy, lähdevesi, linnunlaulu. Ei hoitolistaa, ei varausportaalia – vain metsä, vesi ja hiljaisuus.',
      lv: 'Malkas pirts, peldēšana dīķī, avota ūdens, putnu dziesmas. Nekādu procedūru sarakstu, nekāda rezervēšanas portāla – tikai mežs, ūdens un klusums.',
    },
    desc2: {
      et: 'Kolme mõisa vahel: Palmse, Sagadi ja Vihula – kõik kivikese kaugusel. Siit algab kuus matkarada, sh RMK Oandu–Aegviidu–Ikla matkatee, 370 km.',
      en: 'Between three manors: Palmse, Sagadi and Vihula – all a stone\'s throw away. Six hiking trails begin here, including the RMK Oandu-Aegviidu-Ikla route, 370 km.',
      ru: 'Между тремя поместьями: Палмсе, Сагади и Вихула – все в двух шагах. Отсюда начинаются шесть маршрутов, в том числе RMK Оанду–Аэгвийду–Икла, 370 км.',
      de: 'Zwischen drei Gutshöfen: Palmse, Sagadi und Vihula – alle einen Katzensprung entfernt. Sechs Wanderwege beginnen hier, darunter die RMK-Route Oandu-Aegviidu-Ikla, 370 km.',
      es: 'Entre tres casas señoriales: Palmse, Sagadi y Vihula, todas a un paso. Aquí empiezan seis senderos, entre ellos la ruta RMK Oandu-Aegviidu-Ikla, de 370 km.',
      sv: 'Mellan tre herrgårdar: Palmse, Sagadi och Vihula – alla ett stenkast bort. Sex vandringsleder börjar här, bland dem RMK-leden Oandu-Aegviidu-Ikla, 370 km.',
      fi: 'Kolmen kartanon välissä: Palmse, Sagadi ja Vihula – kaikki kivenheiton päässä. Täältä alkaa kuusi retkeilyreittiä, muun muassa RMK:n Oandu-Aegviidu-Ikla-reitti, 370 km.',
      lv: 'Starp trim muižām: Palmse, Sagadi un Vihula – visas tepat netālu. Šeit sākas sešas pārgājienu takas, starp tām RMK maršruts Oandu-Aegviidu-Ikla, 370 km.',
    },
    mapLabel: { et: 'Asukoht', en: 'Where we are', ru: 'Расположение', de: 'Wo wir sind', es: 'Dónde estamos', sv: 'Var vi finns', fi: 'Missä olemme', lv: 'Kur mēs atrodamies' },
    mapAlt: {
      et: 'Kaart: Oanduaia Oandu külas, tiik ja majad ringiga tähistatud',
      en: 'Map: Oanduaia in Oandu village, its pond and houses circled',
      ru: 'Карта: Oanduaia в деревне Оанду, пруд и дома обведены',
      de: 'Karte: Oanduaia im Dorf Oandu, Teich und Häuser markiert',
      es: 'Mapa: Oanduaia en el pueblo de Oandu, con su estanque y sus casas marcados con un círculo',
      sv: 'Karta: Oanduaia i byn Oandu, dammen och husen inringade',
      fi: 'Kartta: Oanduaia Oandun kylässä, lampi ja talot ympyröity',
      lv: 'Karte: Oanduaia Oandu ciemā, dīķis un mājas apvilktas ar apli',
    },
    mapOpen: { et: 'Ava Google Mapsis', en: 'Open in Google Maps', ru: 'Открыть в Google Maps', de: 'In Google Maps öffnen', es: 'Abrir en Google Maps', sv: 'Öppna i Google Maps', fi: 'Avaa Google Mapsissa', lv: 'Atvērt Google Maps' },
    mapBook: { et: 'Broneeri oma aeg', en: 'Book your stay', ru: 'Забронировать', de: 'Aufenthalt buchen', es: 'Reserva tu estancia', sv: 'Boka din vistelse', fi: 'Varaa majoituksesi', lv: 'Rezervējiet savu uzturēšanos' },
    nearby: {
      et: 'Palmse, Sagadi ja Vihula mõis jäävad kõik lühikese sõidu kaugusele. Altja kaluriküla oma kiigega on rannikul põhja pool, Käsmu – kaptenite küla – veidi kaugemal läänes. Oandu külastuskeskus ja loodusmetsarada on jalutuskäigu kaugusel. Tallinnasse on umbes 90 kilomeetrit, veidi üle tunni autoga.',
      en: 'The manors of Palmse, Sagadi and Vihula are each a short drive away. Altja fishing village and its swing sit on the coast to the north; Käsmu, the captains’ village, a little further west. The Oandu visitor centre and the old-growth forest trail are within walking distance. Tallinn is about 90 kilometres away, a little over an hour by car.',
      ru: 'Мызы Палмсе, Сагади и Вихула — каждая в коротком переезде. Рыбацкая деревня Алтья со своими качелями лежит на побережье к северу, Кясму, деревня капитанов, — чуть западнее. Центр посетителей Оанду и тропа древнего леса — в пешей доступности. До Таллинна около 90 километров, чуть больше часа на машине.',
      de: 'Die Gutshöfe Palmse, Sagadi und Vihula sind jeweils eine kurze Fahrt entfernt. Das Fischerdorf Altja mit seiner Schaukel liegt an der Küste im Norden; Käsmu, das Kapitänsdorf, etwas weiter westlich. Das Besucherzentrum Oandu und der Urwaldpfad sind zu Fuß erreichbar. Tallinn ist etwa 90 Kilometer entfernt, gut eine Stunde mit dem Auto.',
      es: 'Las casas señoriales de Palmse, Sagadi y Vihula están cada una a un corto trayecto en coche. El pueblo pesquero de Altja, con su columpio, está en la costa al norte; Käsmu, el pueblo de los capitanes, un poco más al oeste. El centro de visitantes de Oandu y el sendero del bosque primario están a poca distancia a pie. Tallinn está a unos 90 kilómetros, algo más de una hora en coche.',
      sv: 'Herrgårdarna Palmse, Sagadi och Vihula ligger alla en kort bilresa bort. Fiskebyn Altja med sin gunga ligger vid kusten i norr; Käsmu, kaptenernas by, lite längre västerut. Oandu besökscenter och urskogsleden ligger på gångavstånd. Till Tallinn är det cirka 90 kilometer, drygt en timme med bil.',
      fi: 'Palmsen, Sagadin ja Vihulan kartanot ovat kaikki lyhyen ajomatkan päässä. Altjan kalastajakylä keinuineen on rannikolla pohjoisessa; Käsmu, kapteenien kylä, hieman kauempana lännessä. Oandun luontokeskus ja luonnonmetsäpolku ovat kävelymatkan päässä. Tallinnaan on noin 90 kilometriä, vähän yli tunti autolla.',
      lv: 'Palmses, Sagadi un Vihulas muižas ir īsa brauciena attālumā. Altjas zvejnieku ciems ar savām šūpolēm atrodas krastā uz ziemeļiem; Käsmu, kapteiņu ciems, atrodas nedaudz tālāk uz rietumiem. Oandu apmeklētāju centrs un dabas meža taka ir pastaigas attālumā. Līdz Tallinai ir aptuveni 90 kilometru, nedaudz vairāk par stundu ar auto.',
    },
    items: [
      {
        slug: 'oandu-aegviidu-ikla',
        dist: { et: '370 km · pikkajaline', en: '370 km · long-distance', ru: '370 км · дальний', de: '370 km · Fernwanderweg', es: '370 km · larga distancia', sv: '370 km · fjärrled', fi: '370 km · pitkä vaellusreitti', lv: '370 km · tālais maršruts' },
        name: { et: 'Oandu–Aegviidu–Ikla matkatee', en: 'Oandu–Aegviidu–Ikla route', ru: 'Маршрут Оанду–Аэгвийду–Икла', de: 'Route Oandu–Aegviidu–Ikla', es: 'Ruta Oandu–Aegviidu–Ikla', sv: 'Leden Oandu–Aegviidu–Ikla', fi: 'Oandu–Aegviidu–Ikla-vaellusreitti', lv: 'Maršruts Oandu–Aegviidu–Ikla' },
        desc: { et: 'Algab RMK Oandu külastuskeskusest ja kulgeb läbi Kõrvemaa ja Soomaa Ikla piirini.', en: 'Starts at the RMK Oandu visitor centre and runs through Kõrvemaa and Soomaa to Ikla.', ru: 'Начинается у центра посетителей RMK в Оанду и идёт через Кырвемаа и Соомаа до Икла.', de: 'Beginnt am RMK-Besucherzentrum Oandu und führt durch Kõrvemaa und Soomaa bis Ikla.', es: 'Empieza en el centro de visitantes RMK de Oandu y recorre Kõrvemaa y Soomaa hasta Ikla.', sv: 'Startar vid RMK:s besökscenter i Oandu och går genom Kõrvemaa och Soomaa till Ikla.', fi: 'Alkaa RMK:n Oandun luontokeskuksesta ja kulkee Kõrvemaan ja Soomaan halki Iklaan.', lv: 'Sākas RMK Oandu apmeklētāju centrā un ved cauri Kõrvemaa un Soomaa līdz Iklai.' },
      },
      {
        slug: 'oandu-loodusmetsarada',
        dist: { et: '4,7 km · kerge', en: '4.7 km · easy', ru: '4,7 км · лёгкий', de: '4,7 km · leicht', es: '4,7 km · fácil', sv: '4,7 km · lätt', fi: '4,7 km · helppo', lv: '4,7 km · viegls' },
        name: { et: 'Oandu loodusmetsarada', en: 'Oandu Nature Forest Trail', ru: 'Природная тропа Оанду', de: 'Naturlehrpfad Oandu', es: 'Sendero Natural del Bosque de Oandu', sv: 'Oandu naturskogsled', fi: 'Oandun luonnonmetsäpolku', lv: 'Oandu dabas meža taka' },
        desc: { et: 'Looduslik ringrada läbi muistse metsa ja ürgoru.', en: 'A natural loop through ancient forest and a primeval valley.', ru: 'Кольцевая тропа через древний лес и долину.', de: 'Eine Runde durch Urwald und ein urzeitliches Tal.', es: 'Un circuito natural por un bosque antiguo y un valle primigenio.', sv: 'En naturlig rundslinga genom urgammal skog och en urdal.', fi: 'Luonnonmukainen kierros ikivanhan metsän ja muinaislaakson halki.', lv: 'Dabiska apļveida taka cauri senam mežam un pirmatnējai ielejai.' },
      },
      {
        slug: 'oandu-vosu',
        dist: { et: '9,5 km · keskmine', en: '9.5 km · medium', ru: '9,5 км · средний', de: '9,5 km · mittel', es: '9,5 km · media', sv: '9,5 km · medel', fi: '9,5 km · keskivaikea', lv: '9,5 km · vidēji grūts' },
        name: { et: 'Oandu–Võsu matkarada', en: 'Oandu–Võsu Trail', ru: 'Маршрут Оанду–Высу', de: 'Weg Oandu–Võsu', es: 'Sendero Oandu–Võsu', sv: 'Leden Oandu–Võsu', fi: 'Oandu–Võsu-reitti', lv: 'Taka Oandu–Võsu' },
        desc: { et: 'Meri kuni mets – rannikult läbi rahvuspargi.', en: 'Sea to forest – from the coast through the national park.', ru: 'От моря до леса – с побережья через нацпарк.', de: 'Vom Meer in den Wald – von der Küste durch den Nationalpark.', es: 'Del mar al bosque: desde la costa a través del parque nacional.', sv: 'Från havet till skogen – från kusten genom nationalparken.', fi: 'Mereltä metsään – rannikolta kansallispuiston halki.', lv: 'No jūras līdz mežam – no krasta cauri nacionālajam parkam.' },
      },
      {
        slug: 'koprarada',
        dist: { et: '1 km · kerge', en: '1 km · easy', ru: '1 км · лёгкий', de: '1 km · leicht', es: '1 km · fácil', sv: '1 km · lätt', fi: '1 km · helppo', lv: '1 km · viegls' },
        name: { et: 'Koprarada', en: 'Beaver Trail', ru: 'Бобровая тропа', de: 'Biberpfad', es: 'Sendero del Castor', sv: 'Bäverleden', fi: 'Majavapolku', lv: 'Bebru taka' },
        desc: { et: 'Lühike rada koprapaisude ja järvepindade vaatluspunktideni.', en: 'A short trail to beaver dams and lake observation points.', ru: 'Короткая тропа к бобровым плотинам и смотровым площадкам.', de: 'Ein kurzer Weg zu Biberdämmen und Aussichtspunkten am Wasser.', es: 'Un sendero corto hasta las presas de castores y los miradores del lago.', sv: 'En kort led till bäverdammar och utsiktsplatser vid sjön.', fi: 'Lyhyt polku majavanpadoille ja järven näköalapaikoille.', lv: 'Īsa taka līdz bebru dambjiem un ezera skatu punktiem.' },
      },
      {
        slug: 'oandu-parimusrada',
        dist: { et: '3,4 km · kerge', en: '3.4 km · easy', ru: '3,4 км · лёгкий', de: '3,4 km · leicht', es: '3,4 km · fácil', sv: '3,4 km · lätt', fi: '3,4 km · helppo', lv: '3,4 km · viegls' },
        name: { et: 'Oandu pärimusrada', en: 'Oandu Heritage Trail', ru: 'Тропа наследия Оанду', de: 'Traditionspfad Oandu', es: 'Sendero del Patrimonio de Oandu', sv: 'Oandu kulturarvsled', fi: 'Oandun perinnepolku', lv: 'Oandu mantojuma taka' },
        desc: { et: 'Lahemaa külade pärimusloo jälgedel.', en: 'Following the heritage story of Lahemaa villages.', ru: 'По следам исторического наследия деревень Лахемаа.', de: 'Der Überlieferung der Dörfer von Lahemaa folgend.', es: 'Siguiendo la historia y las tradiciones de los pueblos de Lahemaa.', sv: 'I spåren av Lahemaabyarnas kulturarv.', fi: 'Lahemaan kylien perinteen jäljillä.', lv: 'Lahemaa ciemu mantojuma pēdās.' },
      },
      {
        slug: 'altja',
        dist: { et: '3 km · kerge', en: '3 km · easy', ru: '3 км · лёгкий', de: '3 km · leicht', es: '3 km · fácil', sv: '3 km · lätt', fi: '3 km · helppo', lv: '3 km · viegls' },
        name: { et: 'Altja matkarada', en: 'Altja Hiking Trail', ru: 'Тропа Алтья', de: 'Wanderweg Altja', es: 'Sendero de Altja', sv: 'Altja vandringsled', fi: 'Altjan retkeilyreitti', lv: 'Altjas pārgājienu taka' },
        desc: { et: 'Altja kaluriküla kaudu rannikule. Ajalugu ja loodus.', en: 'Via Altja fishing village to the coast. History and nature.', ru: 'Через рыбацкую деревню Алтья к побережью. История и природа.', de: 'Über das Fischerdorf Altja zur Küste. Geschichte und Natur.', es: 'Por el pueblo pesquero de Altja hasta la costa. Historia y naturaleza.', sv: 'Via fiskebyn Altja till kusten. Historia och natur.', fi: 'Altjan kalastajakylän kautta rannikolle. Historiaa ja luontoa.', lv: 'Caur Altjas zvejnieku ciemu līdz krastam. Vēsture un daba.' },
      },
    ],
  },
  stats: {
    l1: { et: 'Booking.com hinne', en: 'Booking.com rating', ru: 'Рейтинг Booking.com', de: 'Booking.com-Bewertung', es: 'Puntuación en Booking.com', sv: 'Betyg på Booking.com', fi: 'Booking.com-arvosana', lv: 'Booking.com vērtējums' },
    l2: { et: 'privaatset maja', en: 'private houses', ru: 'отдельных дома', de: 'separate Häuser', es: 'casas privadas', sv: 'privata hus', fi: 'yksityistä taloa', lv: 'privātas mājas' },
    l3: { et: 'km RMK matkateed siit', en: 'km of RMK hiking route from here', ru: 'км маршрута RMK отсюда', de: 'km RMK-Wanderweg ab hier', es: 'km de ruta de senderismo RMK desde aquí', sv: 'km RMK-vandringsled härifrån', fi: 'km RMK:n vaellusreittiä täältä', lv: 'km RMK pārgājienu maršruta no šejienes' },
    l4: { et: 'm² kaetud väliköök', en: 'm² covered outdoor kitchen', ru: 'м² крытая летняя кухня', de: 'm² überdachte Außenküche', es: 'm² de cocina exterior cubierta', sv: 'm² täckt utomhuskök', fi: 'm² katettu ulkokeittiö', lv: 'm² jumta segta āra virtuve' },
  },
  reviews: {
    label: { et: 'Arvustused', en: 'Reviews', ru: 'Отзывы', de: 'Bewertungen', es: 'Opiniones', sv: 'Omdömen', fi: 'Arviot', lv: 'Atsauksmes' },
    h1:    { et: 'Mida külalised', en: 'What our guests', ru: 'Что говорят', de: 'Was unsere Gäste', es: 'Lo que dicen', sv: 'Vad våra gäster', fi: 'Mitä vieraamme', lv: 'Ko saka' },
    h2em:  { et: 'räägivad.', en: 'say.', ru: 'наши гости.', de: 'sagen.', es: 'nuestros huéspedes.', sv: 'säger.', fi: 'sanovat.', lv: 'mūsu viesi.' },
    sub: {
      et: 'Kolm kohta, kus meist kirjutatakse. Kõik hinnangud on külaliste omad.',
      en: 'Three places where guests write about us. Every score is theirs, not ours.',
      ru: 'Три места, где о нас пишут. Все оценки принадлежат гостям.',
      de: 'Drei Orte, an denen Gäste über uns schreiben. Jede Bewertung ist ihre, nicht unsere.',
      es: 'Tres sitios donde los huéspedes escriben sobre nosotros. Cada puntuación es suya, no nuestra.',
      sv: 'Tre ställen där gäster skriver om oss. Varje betyg är deras, inte vårt.',
      fi: 'Kolme paikkaa, joissa vieraat kirjoittavat meistä. Jokainen arvosana on heidän, ei meidän.',
      lv: 'Trīs vietas, kur viesi raksta par mums. Katrs vērtējums ir viņu, nevis mūsu.',
    },
    read:  { et: 'Loe arvustusi', en: 'Read the reviews', ru: 'Читать отзывы', de: 'Bewertungen lesen', es: 'Leer las opiniones', sv: 'Läs omdömena', fi: 'Lue arviot', lv: 'Lasīt atsauksmes' },
    writeH: { et: 'Käisid meil?', en: 'Stayed with us?', ru: 'Гостили у нас?', de: 'Bei uns gewesen?', es: '¿Te has alojado con nosotros?', sv: 'Har du bott hos oss?', fi: 'Oletko majoittunut meillä?', lv: 'Esat viesojušies pie mums?' },
    writeSub: {
      et: 'Paar rida sinult aitab järgmisel külalisel meid üles leida.',
      en: 'A couple of lines from you helps the next guest find us.',
      ru: 'Пара строк от вас поможет следующему гостю нас найти.',
      de: 'Ein paar Zeilen von Ihnen helfen dem nächsten Gast, uns zu finden.',
      es: 'Un par de líneas tuyas ayudan al próximo huésped a encontrarnos.',
      sv: 'Ett par rader från dig hjälper nästa gäst att hitta oss.',
      fi: 'Pari riviä sinulta auttaa seuraavaa vierasta löytämään meidät.',
      lv: 'Pāris rindiņu no jums palīdzēs nākamajam viesim mūs atrast.',
    },
    write: { et: 'Kirjuta arvustus', en: 'Write a review', ru: 'Написать отзыв', de: 'Bewertung schreiben', es: 'Escribir una opinión', sv: 'Skriv ett omdöme', fi: 'Kirjoita arvio', lv: 'Uzrakstīt atsauksmi' },
  },
  /*
   * "Before winter" — the Pond House and the Forest House close 1 Dec–31 Mar (lib/season.ts),
   * so their last autumn nights are promoted first (Mikk, 29 Oct). No discount is offered;
   * the prices are the published ones, read from feature.houses.
   */
  lastChance: {
    label: { et: 'Enne talve', en: 'Before winter', ru: 'До зимы', de: 'Vor dem Winter', es: 'Antes del invierno', sv: 'Före vintern', fi: 'Ennen talvea', lv: 'Pirms ziemas' },
    h1: { et: 'Viimased sügisööd', en: 'The last autumn nights', ru: 'Последние осенние ночи', de: 'Die letzten Herbstnächte', es: 'Las últimas noches de otoño', sv: 'De sista höstnätterna', fi: 'Viimeiset syysyöt', lv: 'Pēdējās rudens naktis' },
    h2: { et: 'enne talve.', en: 'before winter.', ru: 'перед зимой.', de: 'vor dem Winter.', es: 'antes del invierno.', sv: 'före vintern.', fi: 'ennen talvea.', lv: 'pirms ziemas.' },
    text: {
      et: 'Tiigimaja ja Metsamaja suletakse talveks 1. detsembril ja avatakse taas 1. aprillil. Viimane öö on 30. november – kamin köetud, mets vaikne ja rajad kõige ilusamad.',
      en: 'The Pond House and the Forest House close for the winter on 1 December and open again on 1 April. The last night is 30 November — the fire lit, the forest quiet and the trails at their most beautiful.',
      ru: 'Прудовой дом и Лесной дом закрываются на зиму 1 декабря и снова открываются 1 апреля. Последняя ночь — 30 ноября: камин растоплен, лес затих, а тропы особенно красивы.',
      de: 'Das Teichhaus und das Waldhaus schließen am 1. Dezember über den Winter und öffnen wieder am 1. April. Die letzte Nacht ist der 30. November – das Feuer im Kamin, der Wald still und die Wanderwege am schönsten.',
      es: 'La Casa del Estanque y la Casa del Bosque cierran por invierno el 1 de diciembre y vuelven a abrir el 1 de abril. La última noche es el 30 de noviembre: la chimenea encendida, el bosque en calma y los senderos en su mejor momento.',
      sv: 'Dammhuset och Skogshuset stänger för vintern den 1 december och öppnar igen den 1 april. Sista natten är den 30 november – brasan tänd, skogen tyst och lederna som vackrast.',
      fi: 'Lampitalo ja Metsätalo suljetaan talveksi 1. joulukuuta ja avataan taas 1. huhtikuuta. Viimeinen yö on 30. marraskuuta – takka lämpiää, metsä on hiljainen ja polut kauneimmillaan.',
      lv: 'Dīķa māja un Meža māja uz ziemu slēdzas 1. decembrī un atkal atveras 1. aprīlī. Pēdējā nakts ir 30. novembris – kamīnā deg uguns, mežs ir kluss un takas visskaistākās.',
    },
    nightsLeft: { et: 'Öid jäänud', en: 'Nights left', ru: 'Осталось ночей', de: 'Verbleibende Nächte', es: 'Noches restantes', sv: 'Nätter kvar', fi: 'Öitä jäljellä', lv: 'Atlikušās naktis' },
    /** {p} is the house's lowest published nightly price. */
    from: { et: 'alates {p} € öö', en: 'from €{p} a night', ru: 'от {p} € за ночь', de: 'ab {p} € pro Nacht', es: 'desde {p} € la noche', sv: 'från {p} € per natt', fi: '{p} €/yö alkaen', lv: 'no {p} € naktī' },
    forTiigimaja: { et: 'kahele', en: 'for two', ru: 'для двоих', de: 'für zwei', es: 'para dos', sv: 'för två', fi: 'kahdelle', lv: 'diviem' },
    forMetsamaja: { et: 'kuni neljale', en: 'for up to four', ru: 'до четырёх гостей', de: 'für bis zu vier', es: 'hasta cuatro personas', sv: 'för upp till fyra', fi: 'enintään neljälle', lv: 'līdz četriem' },
    cta: { et: 'Vaata vabu kuupäevi', en: 'See free dates', ru: 'Свободные даты', de: 'Freie Termine ansehen', es: 'Ver fechas libres', sv: 'Se lediga datum', fi: 'Katso vapaat päivät', lv: 'Skatīt brīvos datumus' },
    notice: {
      et: 'Viimased ööd enne talve: maja on avatud kuni 30. novembrini ja suletud 1. detsembrist 31. märtsini.',
      en: 'The last nights before winter: the house is open until 30 November and closed from 1 December to 31 March.',
      ru: 'Последние ночи перед зимой: дом открыт до 30 ноября и закрыт с 1 декабря по 31 марта.',
      de: 'Die letzten Nächte vor dem Winter: Das Haus ist bis zum 30. November geöffnet und vom 1. Dezember bis 31. März geschlossen.',
      es: 'Las últimas noches antes del invierno: la casa está abierta hasta el 30 de noviembre y cerrada del 1 de diciembre al 31 de marzo.',
      sv: 'De sista nätterna före vintern: huset är öppet till den 30 november och stängt från den 1 december till den 31 mars.',
      fi: 'Viimeiset yöt ennen talvea: talo on auki 30. marraskuuta asti ja suljettu 1. joulukuuta – 31. maaliskuuta.',
      lv: 'Pēdējās naktis pirms ziemas: māja ir atvērta līdz 30. novembrim un slēgta no 1. decembra līdz 31. martam.',
    },
  },
  housePage: {
    eyebrow:  { et: 'Majutus', en: 'Accommodation', ru: 'Размещение', de: 'Unterkunft', es: 'Alojamiento', sv: 'Boende', fi: 'Majoitus', lv: 'Naktsmītne' },
    facts:    { et: 'Majas on', en: 'In the house', ru: 'В доме', de: 'Im Haus', es: 'En la casa', sv: 'I huset', fi: 'Talossa', lv: 'Mājā' },
    otherH:   { et: 'Teised majad', en: 'The other houses', ru: 'Другие дома', de: 'Die anderen Häuser', es: 'Las otras casas', sv: 'De andra husen', fi: 'Muut talot', lv: 'Pārējās mājas' },
    back:     { et: '← Kõik majad', en: '← All houses', ru: '← Все дома', de: '← Alle Häuser', es: '← Todas las casas', sv: '← Alla hus', fi: '← Kaikki talot', lv: '← Visas mājas' },
    more:     { et: 'Vaata maja', en: 'See the house', ru: 'Посмотреть дом', de: 'Haus ansehen', es: 'Ver la casa', sv: 'Se huset', fi: 'Katso talo', lv: 'Apskatīt māju' },
    photos:   { et: 'Pildid', en: 'Photographs', ru: 'Фотографии', de: 'Fotografien', es: 'Fotografías', sv: 'Fotografier', fi: 'Valokuvat', lv: 'Fotogrāfijas' },
    // Titles and descriptions are composed from published copy only — the house name, its
    // own tagline, its first detail line and its lowest published rate. Nothing invented.
    titlePlace:   { et: 'Lahemaa', en: 'Lahemaa', ru: 'Лахемаа', de: 'Lahemaa', es: 'Lahemaa', sv: 'Lahemaa', fi: 'Lahemaa', lv: 'Lahemaa' },
    titleCountry: { et: 'Eesti', en: 'Estonia', ru: 'Эстония', de: 'Estland', es: 'Estonia', sv: 'Estland', fi: 'Viro', lv: 'Igaunija' },
    titleSuffix: {
      et: 'majutus Lahemaal | Oanduaia',
      en: 'lodging in Lahemaa, Estonia | Oanduaia',
      ru: 'проживание в Лахемаа, Эстония | Oanduaia',
      de: 'Unterkunft in Lahemaa, Estland | Oanduaia',
      es: 'alojamiento en Lahemaa, Estonia | Oanduaia',
      sv: 'boende i Lahemaa, Estland | Oanduaia',
      fi: 'majoitus Lahemaalla, Virossa | Oanduaia',
      lv: 'naktsmītne Lahemaa parkā, Igaunijā | Oanduaia',
    },
    descFrom: { et: 'Hind alates', en: 'From', ru: 'От', de: 'Ab', es: 'Desde', sv: 'Från', fi: 'Alkaen', lv: 'No' },
    descUnit: {
      et: '€ öö kogu maja eest. Oandu küla, Lahemaa rahvuspark.',
      en: '€ per night for the whole house. Oandu village, Lahemaa National Park, Estonia.',
      ru: '€ за ночь за весь дом. Деревня Оанду, национальный парк Лахемаа.',
      de: '€ pro Nacht für das ganze Haus. Dorf Oandu, Nationalpark Lahemaa, Estland.',
      es: '€ por noche por la casa entera. Pueblo de Oandu, Parque Nacional de Lahemaa, Estonia.',
      sv: '€ per natt för hela huset. Byn Oandu, Lahemaa nationalpark, Estland.',
      fi: '€ yöltä koko talosta. Oandun kylä, Lahemaan kansallispuisto, Viro.',
      lv: '€ par nakti par visu māju. Oandu ciems, Lahemaa nacionālais parks, Igaunija.',
    },
  },
  /* The pay page — reached only from a link we send after confirming the dates. */
  pay: {
    eyebrow:  { et: 'Makse', en: 'Payment', ru: 'Оплата', de: 'Zahlung', es: 'Pago', sv: 'Betalning', fi: 'Maksu', lv: 'Maksājums' },
    h1:       { et: 'Maksa kaardiga', en: 'Pay by card', ru: 'Оплата картой', de: 'Mit Karte bezahlen', es: 'Pagar con tarjeta', sv: 'Betala med kort', fi: 'Maksa kortilla', lv: 'Maksāt ar karti' },
    forWhom:  { et: 'Kellele', en: 'For', ru: 'Кому', de: 'Für', es: 'Para', sv: 'För', fi: 'Kenelle', lv: 'Kam' },
    what:     { et: 'Mille eest', en: 'What for', ru: 'За что', de: 'Wofür', es: 'Concepto', sv: 'Avser', fi: 'Mistä', lv: 'Par ko' },
    amount:   { et: 'Summa', en: 'Amount', ru: 'Сумма', de: 'Betrag', es: 'Importe', sv: 'Belopp', fi: 'Summa', lv: 'Summa' },
    cta:      { et: 'Maksa turvaliselt', en: 'Pay securely', ru: 'Оплатить безопасно', de: 'Sicher bezahlen', es: 'Pagar de forma segura', sv: 'Betala säkert', fi: 'Maksa turvallisesti', lv: 'Maksāt droši' },
    working:  { et: 'Avan makselehe…', en: 'Opening the payment page…', ru: 'Открываю страницу оплаты…', de: 'Zahlungsseite wird geöffnet…', es: 'Abriendo la página de pago…', sv: 'Öppnar betalningssidan…', fi: 'Avataan maksusivua…', lv: 'Atveram maksājuma lapu…' },
    secure: {
      et: 'Makse toimub Stripe’i turvalisel lehel. Kaardiandmed ei jõua kunagi meie serverisse. Toetatud on kaart, Apple Pay ja Google Pay. Tasuta tühistamine kuni 7 päeva enne saabumist, hiljem raha ei tagastata.',
      en: 'The payment happens on Stripe’s secure page. Your card details never reach our server. Card, Apple Pay and Google Pay are all accepted. Free cancellation up to 7 days before arrival; after that, no refund.',
      ru: 'Оплата проходит на защищённой странице Stripe. Данные карты никогда не попадают на наш сервер. Принимаются карта, Apple Pay и Google Pay. Бесплатная отмена не позднее чем за 7 дней до заезда; позже оплата не возвращается.',
      de: 'Die Zahlung erfolgt auf der sicheren Seite von Stripe. Ihre Kartendaten erreichen unseren Server nie. Karte, Apple Pay und Google Pay werden akzeptiert. Kostenlose Stornierung bis 7 Tage vor Anreise; danach keine Erstattung.',
      es: 'El pago se realiza en la página segura de Stripe. Los datos de su tarjeta nunca llegan a nuestro servidor. Se aceptan tarjeta, Apple Pay y Google Pay. Cancelación gratuita hasta 7 días antes de la llegada; después, no hay reembolso.',
      sv: 'Betalningen sker på Stripes säkra sida. Dina kortuppgifter når aldrig vår server. Kort, Apple Pay och Google Pay accepteras. Kostnadsfri avbokning fram till 7 dagar före ankomst; därefter ingen återbetalning.',
      fi: 'Maksu tapahtuu Stripen suojatulla sivulla. Korttitietonne eivät koskaan päädy palvelimellemme. Hyväksymme kortin, Apple Payn ja Google Payn. Maksuton peruutus viimeistään 7 päivää ennen saapumista; sen jälkeen maksua ei palauteta.',
      lv: 'Maksājums notiek Stripe drošajā lapā. Jūsu kartes dati nekad nenonāk mūsu serverī. Tiek pieņemta karte, Apple Pay un Google Pay. Bezmaksas atcelšana līdz 7 dienām pirms ierašanās; vēlāk nauda netiek atmaksāta.',
    },
    paidH:    { et: 'Makstud – aitäh!', en: 'Paid — thank you.', ru: 'Оплачено — спасибо!', de: 'Bezahlt – vielen Dank!', es: 'Pagado — gracias.', sv: 'Betalt – tack!', fi: 'Maksettu – kiitos!', lv: 'Samaksāts – paldies!' },
    paidBody: {
      et: 'Saatsime kinnituse sinu e-postile. Kohtumiseni Oandus.',
      en: 'A confirmation is on its way to your e-mail. We look forward to seeing you in Oandu.',
      ru: 'Подтверждение отправлено на вашу почту. Ждём вас в Оанду.',
      de: 'Eine Bestätigung ist per E-Mail unterwegs. Wir freuen uns auf Sie in Oandu.',
      es: 'Le hemos enviado una confirmación por correo electrónico. Le esperamos en Oandu.',
      sv: 'En bekräftelse är på väg till din e-post. Vi ser fram emot att träffa dig i Oandu.',
      fi: 'Vahvistus on matkalla sähköpostiinne. Odotamme teitä Oandussa.',
      lv: 'Apstiprinājums ir ceļā uz jūsu e-pastu. Uz tikšanos Oandu!',
    },
    goneH:    { et: 'Seda makselinki ei ole', en: 'This payment link is not available', ru: 'Такой ссылки нет', de: 'Diesen Zahlungslink gibt es nicht', es: 'Este enlace de pago no está disponible', sv: 'Den här betalningslänken är inte tillgänglig', fi: 'Tämä maksulinkki ei ole käytettävissä', lv: 'Šī maksājuma saite nav pieejama' },
    goneBody: {
      et: 'Link võib olla vale või tühistatud. Kirjuta info@oanduaia.ee ja saadame uue.',
      en: 'The link may be wrong or cancelled. Write to info@oanduaia.ee and we will send a new one.',
      ru: 'Ссылка может быть неверной или отменённой. Напишите на info@oanduaia.ee — пришлём новую.',
      de: 'Der Link kann falsch oder storniert sein. Schreiben Sie an info@oanduaia.ee, wir senden einen neuen.',
      es: 'Puede que el enlace sea incorrecto o se haya cancelado. Escriba a info@oanduaia.ee y le enviaremos uno nuevo.',
      sv: 'Länken kan vara fel eller annullerad. Skriv till info@oanduaia.ee så skickar vi en ny.',
      fi: 'Linkki voi olla virheellinen tai peruttu. Kirjoittakaa osoitteeseen info@oanduaia.ee, niin lähetämme uuden.',
      lv: 'Saite var būt nepareiza vai atcelta. Rakstiet uz info@oanduaia.ee, un mēs nosūtīsim jaunu.',
    },
    failed: {
      et: 'Midagi läks makse avamisel valesti. Proovi uuesti või kirjuta info@oanduaia.ee.',
      en: 'Something went wrong opening the payment. Try again, or write to info@oanduaia.ee.',
      ru: 'Не удалось открыть оплату. Попробуйте ещё раз или напишите на info@oanduaia.ee.',
      de: 'Beim Öffnen der Zahlung ist etwas schiefgegangen. Versuchen Sie es erneut oder schreiben Sie an info@oanduaia.ee.',
      es: 'Algo ha fallado al abrir el pago. Inténtelo de nuevo o escriba a info@oanduaia.ee.',
      sv: 'Något gick fel när betalningen skulle öppnas. Försök igen eller skriv till info@oanduaia.ee.',
      fi: 'Maksun avaamisessa tapahtui virhe. Yrittäkää uudelleen tai kirjoittakaa osoitteeseen info@oanduaia.ee.',
      lv: 'Atverot maksājumu, radās kļūda. Mēģiniet vēlreiz vai rakstiet uz info@oanduaia.ee.',
    },
    // Shown when the stay was arranged to be settled in cash at the house. There is no card
    // payment to offer, so the page says so plainly rather than presenting a button that fails.
    cashH: { et: 'Maksad kohapeal', en: 'You pay at the house', ru: 'Оплата на месте', de: 'Sie zahlen vor Ort', es: 'Pagará en la casa', sv: 'Du betalar på plats', fi: 'Maksatte paikan päällä', lv: 'Jūs maksājat uz vietas' },
    cashBody: {
      et: 'Leppisime kokku, et tasud sularahas kohale jõudes. Veebis ei ole midagi maksta. Kui midagi muutus, kirjuta info@oanduaia.ee.',
      en: 'We agreed you will pay in cash when you arrive. There is nothing to pay online. If anything has changed, write to info@oanduaia.ee.',
      ru: 'Мы договорились, что вы оплатите наличными по приезде. Онлайн платить ничего не нужно. Если что-то изменилось, напишите на info@oanduaia.ee.',
      de: 'Wir haben vereinbart, dass Sie bei der Ankunft bar bezahlen. Online ist nichts zu bezahlen. Falls sich etwas geändert hat, schreiben Sie an info@oanduaia.ee.',
      es: 'Acordamos que pagaría en efectivo a su llegada. No hay nada que pagar en línea. Si algo ha cambiado, escriba a info@oanduaia.ee.',
      sv: 'Vi kom överens om att du betalar kontant när du kommer. Det finns inget att betala på nätet. Om något har ändrats, skriv till info@oanduaia.ee.',
      fi: 'Sovimme, että maksatte käteisellä saapuessanne. Verkossa ei ole mitään maksettavaa. Jos jokin on muuttunut, kirjoittakaa osoitteeseen info@oanduaia.ee.',
      lv: 'Mēs vienojāmies, ka jūs samaksāsiet skaidrā naudā, ierodoties. Tiešsaistē nekas nav jāmaksā. Ja kaut kas ir mainījies, rakstiet uz info@oanduaia.ee.',
    },
  },

  availability: {
    label:   { et: 'Saadavus', en: 'Availability', ru: 'Наличие', de: 'Verfügbarkeit', es: 'Disponibilidad', sv: 'Lediga datum', fi: 'Saatavuus', lv: 'Pieejamība' },
    h1:      { et: 'Vali maja', en: 'Choose a house', ru: 'Выберите дом', de: 'Wählen Sie ein Haus', es: 'Elige una casa', sv: 'Välj ett hus', fi: 'Valitse talo', lv: 'Izvēlieties māju' },
    h2em:    { et: 'ja kuupäevad.', en: 'and your dates.', ru: 'и даты.', de: 'und Ihre Daten.', es: 'y tus fechas.', sv: 'och dina datum.', fi: 'ja päivämäärät.', lv: 'un datumus.' },
    sub: {
      et: 'Kalender näitab, millal majad vabad on. Vali periood – arvutame hinna ja saadad päringu ühe vajutusega.',
      en: 'The calendar shows when the houses are free. Pick your dates – we work out the price and your request goes off in one click.',
      ru: 'Календарь показывает, когда дома свободны. Выберите даты – мы рассчитаем цену, и запрос уйдёт одним нажатием.',
      de: 'Der Kalender zeigt, wann die Häuser frei sind. Wählen Sie Ihre Daten – wir berechnen den Preis und Ihre Anfrage geht mit einem Klick raus.',
      es: 'El calendario muestra cuándo están libres las casas. Elige tus fechas: calculamos el precio y tu solicitud se envía con un clic.',
      sv: 'Kalendern visar när husen är lediga. Välj dina datum – vi räknar ut priset och din förfrågan skickas med ett klick.',
      fi: 'Kalenteri näyttää, milloin talot ovat vapaina. Valitse päivämäärät – laskemme hinnan, ja pyyntösi lähtee yhdellä napsautuksella.',
      lv: 'Kalendārs rāda, kad mājas ir brīvas. Izvēlieties datumus – mēs aprēķināsim cenu, un jūsu pieprasījums tiks nosūtīts ar vienu klikšķi.',
    },
    lHouse:  { et: 'Maja', en: 'House', ru: 'Дом', de: 'Haus', es: 'Casa', sv: 'Hus', fi: 'Talo', lv: 'Māja' },
    lGuests: { et: 'Külalisi', en: 'Guests', ru: 'Гостей', de: 'Gäste', es: 'Huéspedes', sv: 'Gäster', fi: 'Vieraita', lv: 'Viesi' },
    lDates:  { et: 'Kuupäevad', en: 'Dates', ru: 'Даты', de: 'Zeitraum', es: 'Fechas', sv: 'Datum', fi: 'Päivämäärät', lv: 'Datumi' },
    pickIn:  { et: 'Vali saabumispäev', en: 'Pick your arrival day', ru: 'Выберите день заезда', de: 'Wählen Sie den Anreisetag', es: 'Elige el día de llegada', sv: 'Välj ankomstdag', fi: 'Valitse saapumispäivä', lv: 'Izvēlieties ierašanās dienu' },
    pickOut: { et: 'Vali lahkumispäev', en: 'Pick your departure day', ru: 'Выберите день отъезда', de: 'Wählen Sie den Abreisetag', es: 'Elige el día de salida', sv: 'Välj avresedag', fi: 'Valitse lähtöpäivä', lv: 'Izvēlieties izbraukšanas dienu' },
    prevMonth: { et: 'Eelmine kuu', en: 'Previous month', ru: 'Предыдущий месяц', de: 'Voriger Monat', es: 'Mes anterior', sv: 'Föregående månad', fi: 'Edellinen kuukausi', lv: 'Iepriekšējais mēnesis' },
    nextMonth: { et: 'Järgmine kuu', en: 'Next month', ru: 'Следующий месяц', de: 'Nächster Monat', es: 'Mes siguiente', sv: 'Nästa månad', fi: 'Seuraava kuukausi', lv: 'Nākamais mēnesis' },
    legendFree:  { et: 'Vaba', en: 'Free', ru: 'Свободно', de: 'Frei', es: 'Libre', sv: 'Ledigt', fi: 'Vapaa', lv: 'Brīvs' },
    legendTaken: { et: 'Hõivatud', en: 'Booked', ru: 'Занято', de: 'Belegt', es: 'Reservado', sv: 'Bokat', fi: 'Varattu', lv: 'Aizņemts' },
    legendPicked:{ et: 'Valitud', en: 'Selected', ru: 'Выбрано', de: 'Ausgewählt', es: 'Seleccionado', sv: 'Valt', fi: 'Valittu', lv: 'Izvēlēts' },
    loading: { et: 'Laen kalendrit…', en: 'Loading the calendar…', ru: 'Загружаем календарь…', de: 'Kalender wird geladen…', es: 'Cargando el calendario…', sv: 'Laddar kalendern…', fi: 'Ladataan kalenteria…', lv: 'Ielādējam kalendāru…' },
    // Shown when the channel feeds are unreachable, and when they are not connected yet.
    // In both cases the dates can still be chosen — we simply do not claim they are free.
    unknown: {
      et: 'Hõivatud kuupäevi ei õnnestunud laadida. Vali soovitud aeg – kinnitame vabad kuupäevad e-kirjaga.',
      en: 'We could not load the booked dates. Pick the time you want – we will confirm availability by e-mail.',
      ru: 'Не удалось загрузить занятые даты. Выберите желаемое время – мы подтвердим наличие по эл. почте.',
      de: 'Die belegten Daten konnten nicht geladen werden. Wählen Sie den gewünschten Zeitraum – wir bestätigen die Verfügbarkeit per E-Mail.',
      es: 'No hemos podido cargar las fechas reservadas. Elige las fechas que quieras: te confirmaremos la disponibilidad por correo electrónico.',
      sv: 'Vi kunde inte läsa in de bokade datumen. Välj den tid du vill ha – vi bekräftar tillgängligheten via e-post.',
      fi: 'Varattuja päiviä ei voitu ladata. Valitse haluamasi aika – vahvistamme saatavuuden sähköpostitse.',
      lv: 'Neizdevās ielādēt aizņemtos datumus. Izvēlieties vēlamo laiku – pieejamību apstiprināsim pa e-pastu.',
    },
    // Before the channel feeds are linked there is nothing wrong to report — the calendar
    // simply does not claim to know, and the enquiry answers the question.
    notLinked: {
      et: 'Vali soovitud aeg – kinnitame vabad kuupäevad e-kirjaga.',
      en: 'Pick the time you want – we confirm the free dates by e-mail.',
      ru: 'Выберите желаемое время – свободные даты подтвердим по эл. почте.',
      de: 'Wählen Sie den gewünschten Zeitraum – wir bestätigen die freien Daten per E-Mail.',
      es: 'Elige las fechas que quieras: te confirmamos las fechas libres por correo electrónico.',
      sv: 'Välj den tid du vill ha – vi bekräftar lediga datum via e-post.',
      fi: 'Valitse haluamasi aika – vahvistamme vapaat päivät sähköpostitse.',
      lv: 'Izvēlieties vēlamo laiku – brīvos datumus apstiprināsim pa e-pastu.',
    },
    crosses: {
      et: 'Selles vahemikus on juba hõivatud öid. Vali teine periood.',
      en: 'That range runs across nights that are already taken. Please choose another period.',
      ru: 'В этом промежутке есть занятые ночи. Выберите другой период.',
      de: 'Dieser Zeitraum enthält bereits belegte Nächte. Bitte wählen Sie einen anderen Zeitraum.',
      es: 'Ese periodo incluye noches que ya están reservadas. Por favor, elige otro.',
      sv: 'Perioden omfattar nätter som redan är bokade. Välj en annan period.',
      fi: 'Valitulla jaksolla on jo varattuja öitä. Valitse toinen ajanjakso.',
      lv: 'Šajā periodā ir jau aizņemtas naktis. Lūdzu, izvēlieties citu periodu.',
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
      es: 'Entre medias, {date} ya está reservado. Hemos liberado las fechas anteriores: ahora elige el día de salida.',
      sv: '{date} är redan bokat där emellan. De tidigare datumen har släppts – välj nu din avresedag.',
      fi: 'Välissä {date} on jo varattu. Aiempi valinta peruttiin – valitse nyt lähtöpäivä.',
      lv: 'Starp tiem {date} jau ir aizņemts. Iepriekšējā izvēle atcelta – tagad izvēlieties izbraukšanas dienu.',
    },
    takenDay: {
      et: 'See öö on juba broneeritud. Valik on tühistatud – vali uued kuupäevad.',
      en: 'That night is already booked. The selection has been released — pick new dates.',
      ru: 'Эта ночь уже занята. Выбор сброшен — выберите новые даты.',
      de: 'Diese Nacht ist bereits belegt. Die Auswahl wurde aufgehoben – bitte neu wählen.',
      es: 'Esa noche ya está reservada. Hemos anulado la selección: elige nuevas fechas.',
      sv: 'Den natten är redan bokad. Valet har släppts – välj nya datum.',
      fi: 'Tämä yö on jo varattu. Valinta peruttiin – valitse uudet päivämäärät.',
      lv: 'Šī nakts jau ir aizņemta. Izvēle atcelta – izvēlieties jaunus datumus.',
    },
    released: {
      et: 'Valik tühistatud. Vali uus saabumispäev.',
      en: 'Selection cleared. Pick a new arrival day.',
      ru: 'Выбор сброшен. Выберите новый день заезда.',
      de: 'Auswahl gelöscht. Wählen Sie einen neuen Anreisetag.',
      es: 'Selección borrada. Elige un nuevo día de llegada.',
      sv: 'Valet rensat. Välj en ny ankomstdag.',
      fi: 'Valinta tyhjennetty. Valitse uusi saapumispäivä.',
      lv: 'Izvēle notīrīta. Izvēlieties jaunu ierašanās dienu.',
    },
    // Estonian: 1 öö / 2 ööd. English: 1 night / 2 nights. Russian: 1 ночь / 2 ночи / 5 ночей.
    nightOne:  { et: 'öö', en: 'night', ru: 'ночь', de: 'Nacht', es: 'noche', sv: 'natt', fi: 'yö', lv: 'nakts' },
    nightFew:  { et: 'ööd', en: 'nights', ru: 'ночи', de: 'Nächte', es: 'noches', sv: 'nätter', fi: 'yötä', lv: 'naktis' },
    nightMany: { et: 'ööd', en: 'nights', ru: 'ночей', de: 'Nächte', es: 'noches', sv: 'nätter', fi: 'yötä', lv: 'naktis' },
    petAdd: {
      et: 'Tulen lemmikloomaga · 20 € broneeringu kohta',
      en: 'Bringing a pet · 20 € per stay',
      ru: 'Приеду с питомцем · 20 € за проживание',
      de: 'Mit Haustier · 20 € pro Aufenthalt',
      es: 'Vengo con mascota · 20 € por estancia',
      sv: 'Jag tar med husdjur · 20 € per vistelse',
      fi: 'Tulen lemmikin kanssa · 20 € varausta kohden',
      lv: 'Braucu ar mājdzīvnieku · 20 € par uzturēšanos',
    },
    breakfastAdd: {
      et: 'Soovin hommikusööki · 20 € inimese kohta hommikus',
      en: 'I would like breakfast · 20 € per person, per morning',
      ru: 'Хочу завтрак · 20 € с человека в утро',
      de: 'Ich möchte Frühstück · 20 € pro Person und Morgen',
      es: 'Quiero desayuno · 20 € por persona y mañana',
      sv: 'Jag vill ha frukost · 20 € per person och morgon',
      fi: 'Haluan aamiaisen · 20 € hengeltä aamua kohden',
      lv: 'Vēlos brokastis · 20 € personai par rītu',
    },
    /* The per-morning picker. Breakfast used to be one checkbox for the whole stay. */
    breakfastWhich: { et: 'Millistel hommikutel?', en: 'Which mornings?', ru: 'В какие утра?', de: 'An welchen Morgen?', es: '¿Qué mañanas?', sv: 'Vilka morgnar?', fi: 'Minä aamuina?', lv: 'Kuros rītos?' },
    breakfastAll:   { et: 'Kõik hommikud', en: 'All mornings', ru: 'Все утра', de: 'Alle Morgen', es: 'Todas las mañanas', sv: 'Alla morgnar', fi: 'Kaikkina aamuina', lv: 'Visos rītos' },
    breakfastNone:  { et: 'Ühtegi', en: 'None', ru: 'Ни одного', de: 'Keine', es: 'Ninguna', sv: 'Inga', fi: 'Ei yhtenäkään', lv: 'Nevienā' },
    /* Shown when breakfast is ticked but every morning has been turned off. */
    breakfastPick:  {
      et: 'Vali vähemalt üks hommik.',
      en: 'Choose at least one morning.',
      ru: 'Выберите хотя бы одно утро.',
      de: 'Wählen Sie mindestens einen Morgen.',
      es: 'Elige al menos una mañana.',
      sv: 'Välj minst en morgon.',
      fi: 'Valitse vähintään yksi aamu.',
      lv: 'Izvēlieties vismaz vienu rītu.',
    },
    mMornings:      { et: 'Hommikusöögi päevad', en: 'Breakfast mornings', ru: 'Дни завтрака', de: 'Frühstückstage', es: 'Mañanas con desayuno', sv: 'Frukostmorgnar', fi: 'Aamiaispäivät', lv: 'Brokastu rīti' },
    /* Breakfast is not always for the whole house — a family of four often wants it for two. */
    breakfastWho:   { et: 'Mitmele inimesele?', en: 'For how many people?', ru: 'На сколько человек?', de: 'Für wie viele Personen?', es: '¿Para cuántas personas?', sv: 'För hur många personer?', fi: 'Kuinka monelle hengelle?', lv: 'Cik personām?' },
    mBreakfastWho:  { et: 'Hommikusööki inimestele', en: 'Breakfast for', ru: 'Завтрак на человек', de: 'Frühstück für', es: 'Desayuno para', sv: 'Frukost för', fi: 'Aamiaisia hengille', lv: 'Brokastis personām' },
    breakfastLine: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак', de: 'Frühstück', es: 'Desayuno', sv: 'Frukost', fi: 'Aamiainen', lv: 'Brokastis' },
    petLine:  { et: 'Lemmikloom', en: 'Pet fee', ru: 'Питомец', de: 'Haustiergebühr', es: 'Suplemento por mascota', sv: 'Husdjursavgift', fi: 'Lemmikkimaksu', lv: 'Mājdzīvnieka maksa' },
    total:    { et: 'Kokku', en: 'Total', ru: 'Итого', de: 'Gesamt', es: 'Total', sv: 'Totalt', fi: 'Yhteensä', lv: 'Kopā' },
    indicative: {
      et: 'Esialgne hind. Kinnitame vabad kuupäevad ja lõpliku hinna e-kirjaga.',
      en: 'Indicative price. We confirm the dates and the final price by e-mail.',
      ru: 'Предварительная цена. Даты и итоговую сумму подтвердим по эл. почте.',
      de: 'Richtpreis. Wir bestätigen die Daten und den Endpreis per E-Mail.',
      es: 'Precio orientativo. Te confirmamos las fechas y el precio final por correo electrónico.',
      sv: 'Preliminärt pris. Vi bekräftar datum och slutpris via e-post.',
      fi: 'Alustava hinta. Vahvistamme päivämäärät ja lopullisen hinnan sähköpostitse.',
      lv: 'Orientējoša cena. Datumus un galīgo cenu apstiprināsim pa e-pastu.',
    },
    cta:      { et: 'Küsi neid kuupäevi', en: 'Request these dates', ru: 'Запросить эти даты', de: 'Diese Daten anfragen', es: 'Solicitar estas fechas', sv: 'Fråga om de här datumen', fi: 'Kysy näitä päiviä', lv: 'Pieprasīt šos datumus' },
    // Prefilled into the message field, so the enquiry arrives already answered.
    mHouse:   { et: 'Maja', en: 'House', ru: 'Дом', de: 'Haus', es: 'Casa', sv: 'Hus', fi: 'Talo', lv: 'Māja' },
    mGuests:  { et: 'Külalisi', en: 'Guests', ru: 'Гостей', de: 'Gäste', es: 'Huéspedes', sv: 'Gäster', fi: 'Vieraita', lv: 'Viesi' },
    mPet:     { et: 'Lemmikloom', en: 'Pet', ru: 'Питомец', de: 'Haustier', es: 'Mascota', sv: 'Husdjur', fi: 'Lemmikki', lv: 'Mājdzīvnieks' },
    mBreakfast: { et: 'Hommikusöök', en: 'Breakfast', ru: 'Завтрак', de: 'Frühstück', es: 'Desayuno', sv: 'Frukost', fi: 'Aamiainen', lv: 'Brokastis' },
    mEstimate:{ et: 'Esialgne hind', en: 'Indicative price', ru: 'Предварительная цена', de: 'Richtpreis', es: 'Precio orientativo', sv: 'Preliminärt pris', fi: 'Alustava hinta', lv: 'Orientējoša cena' },
    mYes:     { et: 'jah', en: 'yes', ru: 'да', de: 'ja', es: 'sí', sv: 'ja', fi: 'kyllä', lv: 'jā' },
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
    label: { et: 'Miks siia', en: 'Why stay here', ru: 'Почему сюда', de: 'Warum hierher', es: 'Por qué alojarse aquí', sv: 'Varför bo här', fi: 'Miksi täällä', lv: 'Kāpēc šeit' },
    h1:    { et: 'Kõik, mille pärast', en: 'Everything people', ru: 'Всё, ради чего', de: 'Alles, wofür man', es: 'Todo aquello por lo que', sv: 'Allt som folk', fi: 'Kaikki, minkä vuoksi', lv: 'Viss, kā dēļ' },
    h2em:  { et: 'siia tullakse.', en: 'come here for.', ru: 'сюда едут.', de: 'herkommt.', es: 'la gente viene aquí.', sv: 'kommer hit för.', fi: 'tänne tullaan.', lv: 'šeit brauc.' },
    sub: {
      et: 'Metsa ja mere vahel – koht, kuhu tulla kahekesi, olgu see esimene reis või kahekümnes.',
      en: 'Between the forest and the sea — a place to come as two, whether it is the first trip or the twentieth.',
      ru: 'Между лесом и морем — место, куда приезжают вдвоём, будь это первая поездка или двадцатая.',
      de: 'Zwischen Wald und Meer — ein Ort für zwei, ob es die erste Reise ist oder die zwanzigste.',
      es: 'Entre el bosque y el mar: un lugar al que venir en pareja, sea el primer viaje o el vigésimo.',
      sv: 'Mellan skogen och havet – en plats att komma till som två, vare sig det är första resan eller den tjugonde.',
      fi: 'Metsän ja meren välissä – paikka, jonne tulla kahdestaan, oli se ensimmäinen matka tai kahdeskymmenes.',
      lv: 'Starp mežu un jūru – vieta, kur atbraukt divatā, vai tas būtu pirmais ceļojums vai divdesmitais.',
    },
    items: [
      {
        icon: 'house',
        t: { et: 'Terve maja endale', en: 'The whole house to yourself', ru: 'Весь дом только вам', de: 'Das ganze Haus für sich', es: 'La casa entera para ti', sv: 'Hela huset för dig själv', fi: 'Koko talo omaan käyttöön', lv: 'Visa māja tikai jums' },
        d: {
          et: 'Iga maja renditakse tervikuna. Ei jagatud koridore ega naabreid seina taga.',
          en: 'Each house is rented whole. No shared corridors, no neighbours through the wall.',
          ru: 'Каждый дом сдаётся целиком. Ни общих коридоров, ни соседей за стеной.',
          de: 'Jedes Haus wird als Ganzes vermietet. Keine gemeinsamen Flure, keine Nachbarn hinter der Wand.',
          es: 'Cada casa se alquila entera. Sin pasillos compartidos ni vecinos al otro lado de la pared.',
          sv: 'Varje hus hyrs ut i sin helhet. Inga delade korridorer, inga grannar bakom väggen.',
          fi: 'Jokainen talo vuokrataan kokonaan. Ei yhteisiä käytäviä eikä naapureita seinän takana.',
          lv: 'Katra māja tiek izīrēta pilnībā. Nav kopīgu gaiteņu, nav kaimiņu aiz sienas.',
        },
      },
      {
        icon: 'flame',
        t: { et: 'Puuküttega saun', en: 'A wood-fired sauna', ru: 'Дровяная баня', de: 'Eine Holzsauna', es: 'Una sauna de leña', sv: 'En vedeldad bastu', fi: 'Puulämmitteinen sauna', lv: 'Malkas pirts' },
        d: {
          et: 'Köetud puudega, mitte lülitiga. Tiik on kümne sammu kaugusel, talvel on jääs auk.',
          en: 'Heated with wood, not a switch. The pond is ten steps away, and in winter there is a hole in the ice.',
          ru: 'Топится дровами, а не выключателем. Пруд в десяти шагах, зимой во льду прорубь.',
          de: 'Mit Holz geheizt, nicht mit einem Schalter. Der Teich ist zehn Schritte entfernt, und im Winter ist ein Loch im Eis.',
          es: 'Se calienta con leña, no con un interruptor. El estanque está a diez pasos y, en invierno, hay un agujero en el hielo.',
          sv: 'Eldas med ved, inte med en strömbrytare. Dammen ligger tio steg bort, och på vintern finns en vak i isen.',
          fi: 'Lämmitetään puilla, ei katkaisijasta. Lampi on kymmenen askeleen päässä, ja talvella jäässä on avanto.',
          lv: 'Kurina ar malku, nevis ar slēdzi. Dīķis ir desmit soļu attālumā, un ziemā ledū ir āliņģis.',
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
        t: { et: 'Meri ja mõisad lähedal', en: 'The sea and the manors', ru: 'Море и мызы рядом', de: 'Meer und Gutshöfe', es: 'El mar y las casas señoriales', sv: 'Havet och herrgårdarna', fi: 'Meri ja kartanot', lv: 'Jūra un muižas' },
        d: {
          et: 'Rand on mõne minuti kaugusel põhja pool. Palmse, Sagadi ja Vihula mõis ning Altja kõrts – lühike sõit.',
          en: 'The coast is minutes to the north. Palmse, Sagadi and Vihula manors and the inn at Altja are a short drive.',
          ru: 'Берег в нескольких минутах к северу. Мызы Палмсе, Сагади и Вихула и корчма в Алтья — недалеко.',
          de: 'Die Küste liegt Minuten nördlich. Die Gutshöfe Palmse, Sagadi und Vihula und der Gasthof in Altja sind eine kurze Fahrt entfernt.',
          es: 'La costa está a pocos minutos al norte. Las casas señoriales de Palmse, Sagadi y Vihula y la posada de Altja están a un corto trayecto en coche.',
          sv: 'Kusten ligger några minuter norrut. Herrgårdarna Palmse, Sagadi och Vihula och krogen i Altja är en kort bilresa bort.',
          fi: 'Rannikolle on muutama minuutti pohjoiseen. Palmsen, Sagadin ja Vihulan kartanot sekä Altjan krouvi ovat lyhyen ajomatkan päässä.',
          lv: 'Krasts ir dažu minūšu attālumā uz ziemeļiem. Palmses, Sagadi un Vihulas muižas un Altjas krogs ir īsa brauciena attālumā.',
        },
      },
      {
        icon: 'trail',
        t: { et: 'Kuus rada uksest', en: 'Six trails from the door', ru: 'Шесть троп от порога', de: 'Sechs Wege vor der Tür', es: 'Seis senderos desde la puerta', sv: 'Sex leder från dörren', fi: 'Kuusi polkua ovelta', lv: 'Sešas takas no sliekšņa' },
        d: {
          et: 'Nende seas RMK Oandu–Aegviidu–Ikla matkatee, 370 km, mis algab siit.',
          en: 'Among them the RMK Oandu–Aegviidu–Ikla route, 370 km, which starts here.',
          ru: 'Среди них маршрут RMK Оанду–Аэгвийду–Икла, 370 км, он начинается здесь.',
          de: 'Darunter die RMK-Route Oandu–Aegviidu–Ikla, 370 km, die hier beginnt.',
          es: 'Entre ellos, la ruta RMK Oandu–Aegviidu–Ikla, de 370 km, que empieza aquí.',
          sv: 'Bland dem RMK-leden Oandu–Aegviidu–Ikla, 370 km, som börjar här.',
          fi: 'Muun muassa RMK:n Oandu–Aegviidu–Ikla-vaellusreitti, 370 km, joka alkaa täältä.',
          lv: 'Starp tām RMK maršruts Oandu–Aegviidu–Ikla, 370 km, kas sākas šeit.',
        },
      },
      {
        icon: 'bowl',
        t: { et: 'Perenaise köök', en: 'Food cooked by the host', ru: 'Кухня хозяйки', de: 'Essen von der Gastgeberin', es: 'Comida hecha por la anfitriona', sv: 'Mat lagad av värdinnan', fi: 'Emännän tekemää ruokaa', lv: 'Saimnieces gatavots ēdiens' },
        d: {
          et: 'Hommikusöök, lõuna või pidulik pikk laud – kõik värskest toorainest, kohapeal tehtud.',
          en: 'Breakfast, lunch or a long table – all from fresh ingredients, cooked here.',
          ru: 'Завтрак, обед или праздничный длинный стол – всё из свежих продуктов, приготовлено здесь.',
          de: 'Frühstück, Mittagessen oder eine lange Tafel – alles aus frischen Zutaten, hier gekocht.',
          es: 'Desayuno, almuerzo o una mesa larga: todo con ingredientes frescos, cocinado aquí.',
          sv: 'Frukost, lunch eller ett långbord – allt av färska råvaror, lagat här.',
          fi: 'Aamiainen, lounas tai pitkä pöytä – kaikki tuoreista raaka-aineista, paikan päällä tehtynä.',
          lv: 'Brokastis, pusdienas vai garais galds – viss no svaigiem produktiem, gatavots šeit pat.',
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
          es: 'Construido a la antigua',
          sv: 'Byggt på gammalt vis',
          fi: 'Rakennettu vanhaan tapaan',
          lv: 'Celts pa vecam',
        },
        d: {
          et: 'Massiivsed palkseinad, pilliroost katused, materjal Eesti metsast. Kipsi ega WiFi-t ei ole – ega ole puudugi.',
          en: 'Solid log walls, reed roofs, timber from Estonian forest. No drywall and no WiFi — and nothing is missing.',
          ru: 'Массивные бревенчатые стены, камышовые крыши, дерево из эстонского леса. Ни гипсокартона, ни Wi-Fi — и ничего не упущено.',
          de: 'Massive Blockwände, Reetdächer, Holz aus estnischem Wald. Kein Rigips, kein WLAN — und es fehlt nichts.',
          es: 'Paredes macizas de troncos, tejados de junco, madera de los bosques de Estonia. Ni pladur ni WiFi, y no falta nada.',
          sv: 'Massiva timmerväggar, vasstak, virke från estnisk skog. Inga gipsskivor och inget wifi – och inget saknas.',
          fi: 'Massiiviset hirsiseinät, ruokokatot, puutavara Viron metsistä. Ei kipsilevyä eikä WiFiä – eikä mitään puutu.',
          lv: 'Masīvas baļķu sienas, niedru jumti, kokmateriāls no Igaunijas mežiem. Nav ne ģipškartona, ne WiFi – un nekā netrūkst.',
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
    label: { et: 'Korduma kippuvad küsimused', en: 'Frequently asked', ru: 'Частые вопросы', de: 'Häufige Fragen', es: 'Preguntas frecuentes', sv: 'Vanliga frågor', fi: 'Usein kysyttyä', lv: 'Biežāk uzdotie jautājumi' },
    h1:    { et: 'Enne kui', en: 'Before you', ru: 'Прежде чем', de: 'Bevor Sie', es: 'Antes de que', sv: 'Innan du', fi: 'Ennen kuin', lv: 'Pirms jūs' },
    h2em:  { et: 'küsid.', en: 'ask.', ru: 'спросить.', de: 'fragen.', es: 'preguntes.', sv: 'frågar.', fi: 'kysyt.', lv: 'jautājat.' },
    more:  { et: 'Rohkem küsimusi', en: 'More questions', ru: 'Больше вопросов', de: 'Weitere Fragen', es: 'Más preguntas', sv: 'Fler frågor', fi: 'Lisää kysymyksiä', lv: 'Vairāk jautājumu' },
  },
  /* Labels for the individual trail pages. */
  trailPage: {
    eyebrow:     { et: 'Matkarada', en: 'Hiking trail', ru: 'Маршрут', de: 'Wanderweg', es: 'Sendero', sv: 'Vandringsled', fi: 'Retkeilyreitti', lv: 'Pārgājienu taka' },
    km:          { et: 'km', en: 'km', ru: 'км', de: 'km', es: 'km', sv: 'km', fi: 'km', lv: 'km' },
    length:      { et: 'Pikkus', en: 'Length', ru: 'Длина', de: 'Länge', es: 'Longitud', sv: 'Längd', fi: 'Pituus', lv: 'Garums' },
    difficulty:  { et: 'Raskus', en: 'Difficulty', ru: 'Сложность', de: 'Schwierigkeit', es: 'Dificultad', sv: 'Svårighetsgrad', fi: 'Vaikeus', lv: 'Grūtība' },
    duration:    { et: 'Kestus', en: 'Time', ru: 'Время', de: 'Dauer', es: 'Duración', sv: 'Tid', fi: 'Kesto', lv: 'Ilgums' },
    startPoint:  { et: 'Algus', en: 'Starts at', ru: 'Начало', de: 'Start', es: 'Salida', sv: 'Start', fi: 'Lähtöpaikka', lv: 'Sākums' },
    season:      { et: 'Hooaeg', en: 'Season', ru: 'Сезон', de: 'Saison', es: 'Temporada', sv: 'Säsong', fi: 'Kausi', lv: 'Sezona' },
    source: {
      et: 'Pikkus RMK andmetel. Kestus on meie hinnang rahulikus tempos.',
      en: 'Length as published by RMK. The time is our own estimate at an easy pace.',
      ru: 'Длина по данным RMK. Время — наша оценка при спокойном темпе.',
      de: 'Länge nach Angaben der RMK. Die Dauer ist unsere eigene Schätzung bei gemächlichem Tempo.',
      es: 'Longitud según los datos publicados por RMK. La duración es nuestra propia estimación a un ritmo tranquilo.',
      sv: 'Längd enligt RMK. Tiden är vår egen uppskattning i lugnt tempo.',
      fi: 'Pituus RMK:n tietojen mukaan. Kesto on oma arviomme rauhallisella tahdilla.',
      lv: 'Garums pēc RMK datiem. Ilgums ir mūsu pašu aplēse mierīgā tempā.',
    },
    rmkLink:     { et: 'RMK rajakirjeldus', en: 'RMK trail page', ru: 'Описание тропы на RMK', de: 'RMK-Seite zum Weg', es: 'Página del sendero en RMK', sv: 'RMK:s sida om leden', fi: 'RMK:n reittikuvaus', lv: 'RMK takas apraksts' },
    stay: {
      et: 'Otsid pärast matka ööbimiskohta? Oanduaia on Oandu külas, RMK külastuskeskusest jalutuskäigu kaugusel – kolm eraldi maja, puuküttega saun ja perenaise tehtud hommikusöök.',
      en: 'Looking for somewhere to stay after the hike? Oanduaia is in Oandu village, a walk from the RMK visitor centre — three separate houses, a wood-fired sauna and breakfast cooked by the host.',
      ru: 'Ищете, где остановиться после похода? Oanduaia — в деревне Оанду, в пешей доступности от центра посетителей RMK: три отдельных дома, дровяная баня и завтрак, приготовленный хозяйкой.',
      de: 'Suchen Sie nach der Wanderung eine Unterkunft? Oanduaia liegt im Dorf Oandu, einen Spaziergang vom RMK-Besucherzentrum entfernt – drei separate Häuser, eine Holzsauna und ein Frühstück von der Gastgeberin.',
      es: '¿Buscas dónde alojarte después de la caminata? Oanduaia está en el pueblo de Oandu, a un paseo del centro de visitantes RMK: tres casas independientes, una sauna de leña y un desayuno preparado por la anfitriona.',
      sv: 'Letar du efter boende efter vandringen? Oanduaia ligger i byn Oandu, en promenad från RMK:s besökscenter – tre separata hus, en vedeldad bastu och frukost lagad av värdinnan.',
      fi: 'Etsitkö majoitusta retken jälkeen? Oanduaia on Oandun kylässä, kävelymatkan päässä RMK:n luontokeskuksesta – kolme erillistä taloa, puulämmitteinen sauna ja emännän tekemä aamiainen.',
      lv: 'Meklējat naktsmītni pēc pārgājiena? Oanduaia atrodas Oandu ciemā, pastaigas attālumā no RMK apmeklētāju centra – trīs atsevišķas mājas, malkas pirts un saimnieces gatavotas brokastis.',
    },
    stayCta:     { et: 'Vaata majasid', en: 'See the houses', ru: 'Посмотреть дома', de: 'Die Häuser ansehen', es: 'Ver las casas', sv: 'Se husen', fi: 'Katso talot', lv: 'Apskatīt mājas' },
    otherTrails: { et: 'Teised rajad', en: 'Other trails', ru: 'Другие тропы', de: 'Andere Wege', es: 'Otros senderos', sv: 'Andra leder', fi: 'Muut polut', lv: 'Citas takas' },
    back:        { et: '← Kõik rajad', en: '← All trails', ru: '← Все тропы', de: '← Alle Wege', es: '← Todos los senderos', sv: '← Alla leder', fi: '← Kaikki polut', lv: '← Visas takas' },
  },
  /* Shared chrome for the topic landing pages. */
  landing: {
    cta:     { et: 'Vaata saadavust', en: 'Check availability', ru: 'Проверить наличие', de: 'Verfügbarkeit prüfen', es: 'Ver disponibilidad', sv: 'Se lediga datum', fi: 'Katso saatavuus', lv: 'Skatīt pieejamību' },
    qaLabel: { et: 'Korduvad küsimused', en: 'Common questions', ru: 'Частые вопросы', de: 'Häufige Fragen', es: 'Preguntas frecuentes', sv: 'Vanliga frågor', fi: 'Usein kysyttyä', lv: 'Biežāk uzdotie jautājumi' },
  },
  booking: {
    label:   { et: 'Reserveerimine', en: 'Reservations', ru: 'Бронирование', de: 'Reservierung', es: 'Reservas', sv: 'Bokning', fi: 'Varaukset', lv: 'Rezervācijas' },
    h1:      { et: 'Millal sa', en: 'When do', ru: 'Когда вы', de: 'Wann kommen', es: '¿Cuándo', sv: 'När', fi: 'Milloin', lv: 'Kad jūs' },
    h2em:    { et: 'tuled?', en: 'you arrive?', ru: 'приедете?', de: 'Sie an?', es: 'llegas?', sv: 'kommer du?', fi: 'saavut?', lv: 'ieradīsieties?' },
    sub:     { et: 'Kirjuta meile – leiame sobiva maja ja aja.', en: "Write to us – we'll find the right house and time.", ru: 'Напишите нам – подберём подходящий дом и время.', de: 'Schreiben Sie uns – wir finden das passende Haus und die passende Zeit.', es: 'Escríbenos: encontraremos la casa y las fechas adecuadas.', sv: 'Skriv till oss – vi hittar rätt hus och tid.', fi: 'Kirjoita meille – löydämme sopivan talon ja ajan.', lv: 'Rakstiet mums – atradīsim piemērotu māju un laiku.' },
    // 24-hour clock in Estonian and Russian, 2 pm / 12 noon only in English.
    times:   {
      et: 'Saabumine alates 14.00 · lahkumine 12.00',
      en: 'Check-in from 2 pm · check-out 12 noon',
      ru: 'Заезд с 14.00 · выезд до 12.00',
      de: 'Anreise ab 14.00 Uhr · Abreise bis 12.00 Uhr',
      es: 'Entrada a partir de las 14:00 · salida hasta las 12:00',
      sv: 'Incheckning från 14:00 · utcheckning 12:00',
      fi: 'Saapuminen klo 14:00 alkaen · lähtö klo 12:00',
      lv: 'Ierašanās no 14:00 · izbraukšana līdz 12:00',
    },
    terms:   {
      et: 'Lühim broneering üks öö · lemmikloom 20 € broneeringu kohta',
      en: 'Minimum stay one night · pet fee 20 € per stay',
      ru: 'Минимум одна ночь · питомец 20 € за проживание',
      de: 'Mindestaufenthalt eine Nacht · Haustiergebühr 20 € pro Aufenthalt',
      es: 'Estancia mínima de una noche · suplemento por mascota 20 € por estancia',
      sv: 'Minsta vistelse en natt · husdjursavgift 20 € per vistelse',
      fi: 'Lyhin varaus yksi yö · lemmikkimaksu 20 € varausta kohden',
      lv: 'Minimālais uzturēšanās laiks – viena nakts · mājdzīvnieka maksa 20 € par uzturēšanos',
    },
    // Free parking, and no WiFi anywhere on the property. The second one is a booking
    // decision for some people, so it is stated plainly rather than left to be discovered
    // on arrival — and here it reads as what it is: the reason to come.
    cancel: {
      et: 'Tasuta tühistamine kuni 7 päeva enne saabumist, hiljem raha ei tagastata',
      en: 'Free cancellation up to 7 days before arrival, no refund after that',
      ru: 'Бесплатная отмена не позднее чем за 7 дней до заезда, позже без возврата',
      de: 'Kostenlose Stornierung bis 7 Tage vor Anreise, danach keine Erstattung',
      es: 'Cancelación gratuita hasta 7 días antes de la llegada; después, sin reembolso',
      sv: 'Kostnadsfri avbokning fram till 7 dagar före ankomst, därefter ingen återbetalning',
      fi: 'Maksuton peruutus viimeistään 7 päivää ennen saapumista, sen jälkeen ei palautusta',
      lv: 'Bezmaksas atcelšana līdz 7 dienām pirms ierašanās, vēlāk bez atmaksas',
    },
    practical: {
      et: 'Tasuta parkimine · WiFi-t majades ei ole, mobiillevi on hea',
      en: 'Free parking · no WiFi in the houses, mobile coverage is good',
      ru: 'Бесплатная парковка · Wi-Fi в домах нет, мобильная связь хорошая',
      de: 'Kostenlose Parkplätze · kein WLAN in den Häusern, guter Mobilfunkempfang',
      es: 'Aparcamiento gratuito · sin WiFi en las casas, buena cobertura móvil',
      sv: 'Gratis parkering · inget wifi i husen, bra mobiltäckning',
      fi: 'Ilmainen pysäköinti · taloissa ei ole WiFiä, mobiiliverkko toimii hyvin',
      lv: 'Bezmaksas autostāvvieta · mājās nav WiFi, mobilais pārklājums ir labs',
    },
    pets:    {
      et: 'Kui majas on samal ajal ka teisi külalisi, palume koera hoida rihma otsas. Lemmiklooma eest vastutab tema omanik.',
      en: 'If other guests are on the property at the same time, please keep your dog on a leash. Pets remain the responsibility of their owner.',
      ru: 'Если на территории одновременно находятся другие гости, просим держать собаку на поводке. За питомца отвечает его владелец.',
      de: 'Wenn gleichzeitig andere Gäste auf dem Grundstück sind, halten Sie Ihren Hund bitte an der Leine. Für Haustiere haftet ihr Besitzer.',
      es: 'Si hay otros huéspedes en la finca al mismo tiempo, lleva a tu perro con correa, por favor. Las mascotas son responsabilidad de su dueño.',
      sv: 'Om andra gäster är på gården samtidigt, håll gärna hunden i koppel. Husdjur är ägarens ansvar.',
      fi: 'Jos tilalla on samaan aikaan muitakin vieraita, pidäthän koiran kytkettynä. Lemmikistä vastaa sen omistaja.',
      lv: 'Ja teritorijā vienlaikus ir arī citi viesi, lūdzam turēt suni pavadā. Par mājdzīvnieku atbild tā saimnieks.',
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
    directLabel: { et: 'Otse broneerides', en: 'Booking direct', ru: 'При прямом бронировании', de: 'Direkt buchen', es: 'Reservando directamente', sv: 'Boka direkt', fi: 'Suoraan varaten', lv: 'Rezervējot tieši' },
    direct: [
      {
        et: 'Aitame valida maja – ütle, kes tulevad ja millal, ja soovitame, milline kolmest sobib.',
        en: 'We help you choose the house – tell us who is coming and when, and we will say which of the three fits.',
        ru: 'Поможем выбрать дом – скажите, кто приезжает и когда, и мы подскажем, какой из трёх подойдёт.',
        de: 'Wir helfen bei der Wahl des Hauses – sagen Sie uns, wer kommt und wann, und wir sagen Ihnen, welches der drei passt.',
        es: 'Te ayudamos a elegir la casa: dinos quién viene y cuándo, y te diremos cuál de las tres encaja.',
        sv: 'Vi hjälper dig att välja hus – berätta vem som kommer och när, så säger vi vilket av de tre som passar.',
        fi: 'Autamme valitsemaan talon – kerro, keitä on tulossa ja milloin, niin kerromme, mikä kolmesta sopii.',
        lv: 'Palīdzēsim izvēlēties māju – pastāstiet, kas brauks un kad, un mēs ieteiksim, kura no trim derēs.',
      },
      {
        et: 'Hommikusöök, pikk laud ja saun lepitakse kokku sama kirjaga, mitte eraldi.',
        en: 'Breakfast, the long table and the sauna are arranged in the same message, not separately.',
        ru: 'Завтрак, длинный стол и баня согласуются тем же письмом, а не отдельно.',
        de: 'Frühstück, die lange Tafel und die Sauna werden in derselben Nachricht abgesprochen, nicht einzeln.',
        es: 'El desayuno, la mesa larga y la sauna se organizan en el mismo mensaje, no por separado.',
        sv: 'Frukost, långbordet och bastun bokas i samma meddelande, inte separat.',
        fi: 'Aamiaisesta, pitkästä pöydästä ja saunasta sovitaan samassa viestissä, ei erikseen.',
        lv: 'Par brokastīm, garo galdu un pirti vienojamies tajā pašā vēstulē, nevis atsevišķi.',
      },
      {
        et: 'Kirjavahetus käib otse peremehega – lisavoodi, hiline saabumine, koer, sünnipäev.',
        en: 'You write directly to the hosts – an extra bed, a late arrival, a dog, a birthday.',
        ru: 'Вы пишете напрямую хозяевам – дополнительная кровать, поздний заезд, собака, день рождения.',
        de: 'Sie schreiben direkt an die Gastgeber – ein Zusatzbett, eine späte Anreise, ein Hund, ein Geburtstag.',
        es: 'Escribes directamente a los anfitriones: una cama supletoria, una llegada tarde, un perro, un cumpleaños.',
        sv: 'Du skriver direkt till värdarna – en extrasäng, en sen ankomst, en hund, en födelsedag.',
        fi: 'Kirjoitat suoraan isännille – lisävuode, myöhäinen saapuminen, koira, syntymäpäivä.',
        lv: 'Jūs rakstāt tieši saimniekiem – papildu gulta, vēla ierašanās, suns, dzimšanas diena.',
      },
      {
        et: 'Makse sularahas kohapeal või kaardiga – saadame makselingi.',
        en: 'Payment in cash on arrival or by card — we send a payment link.',
        ru: 'Оплата наличными на месте или картой — пришлём ссылку на оплату.',
        de: 'Zahlung bar bei der Anreise oder per Karte – wir senden einen Zahlungslink.',
        es: 'Pago en efectivo a la llegada o con tarjeta: te enviamos un enlace de pago.',
        sv: 'Betalning kontant vid ankomst eller med kort – vi skickar en betalningslänk.',
        fi: 'Maksu käteisellä paikan päällä tai kortilla – lähetämme maksulinkin.',
        lv: 'Maksājums skaidrā naudā uz vietas vai ar karti – nosūtīsim maksājuma saiti.',
      },
    ],
    lNimi:   { et: 'Nimi', en: 'Name', ru: 'Имя', de: 'Name', es: 'Nombre', sv: 'Namn', fi: 'Nimi', lv: 'Vārds' },
    pNimi:   { et: 'Sinu nimi', en: 'Your name', ru: 'Ваше имя', de: 'Ihr Name', es: 'Tu nombre', sv: 'Ditt namn', fi: 'Nimesi', lv: 'Jūsu vārds' },
    lEmail:  { et: 'E-post', en: 'E-mail', ru: 'Эл. почта', de: 'E-Mail', es: 'Correo electrónico', sv: 'E-post', fi: 'Sähköposti', lv: 'E-pasts' },
    pEmail:  { et: 'sinu@email.ee', en: 'your@email.com', ru: 'ваш@email.ru', de: 'ihre@email.de', es: 'tu@email.com', sv: 'din@email.se', fi: 'sinun@email.fi', lv: 'jusu@email.lv' },
    lKuup:   { et: 'Kuupäevad', en: 'Dates', ru: 'Даты', de: 'Zeitraum', es: 'Fechas', sv: 'Datum', fi: 'Päivämäärät', lv: 'Datumi' },
    pKuup:   { et: 'Saabun – lahkun', en: 'Arrival – departure', ru: 'Заезд – выезд', de: 'Anreise – Abreise', es: 'Llegada – salida', sv: 'Ankomst – avresa', fi: 'Saapuminen – lähtö', lv: 'Ierašanās – izbraukšana' },
    lSonum:  { et: 'Sõnum', en: 'Message', ru: 'Сообщение', de: 'Nachricht', es: 'Mensaje', sv: 'Meddelande', fi: 'Viesti', lv: 'Ziņojums' },
    pSonum:  { et: 'Külaliste arv, soovid, küsimused...', en: 'Number of guests, wishes, questions...', ru: 'Кол-во гостей, пожелания, вопросы...', de: 'Anzahl der Gäste, Wünsche, Fragen...', es: 'Número de huéspedes, deseos, preguntas...', sv: 'Antal gäster, önskemål, frågor...', fi: 'Vieraiden määrä, toiveet, kysymykset...', lv: 'Viesu skaits, vēlmes, jautājumi...' },
    /*
     * Not "Book now": there is no instant confirmation, and a button that claims one
     * would be a lie the reply email has to walk back. "Send booking request" is the
     * honest transactional form — it is a booking, not the start of a negotiation.
     */
    submit:  { et: 'Saada broneeringusoov', en: 'Send booking request', ru: 'Отправить запрос на бронирование', de: 'Buchungsanfrage senden', es: 'Enviar solicitud de reserva', sv: 'Skicka bokningsförfrågan', fi: 'Lähetä varauspyyntö', lv: 'Nosūtīt rezervācijas pieprasījumu' },
    success: { et: 'Sõnum saadetud!', en: 'Message sent!', ru: 'Сообщение отправлено!', de: 'Nachricht gesendet!', es: '¡Mensaje enviado!', sv: 'Meddelandet har skickats!', fi: 'Viesti lähetetty!', lv: 'Ziņojums nosūtīts!' },
    successSub: { et: 'Aitäh, et kirjutasid. Vastame 24 tunni jooksul.', en: 'Thank you for reaching out. We\'ll reply within 24 hours.', ru: 'Спасибо за обращение. Мы ответим в течение 24 часов.', de: 'Danke für Ihre Nachricht. Wir antworten innerhalb von 24 Stunden.', es: 'Gracias por escribirnos. Te responderemos en menos de 24 horas.', sv: 'Tack för att du hörde av dig. Vi svarar inom 24 timmar.', fi: 'Kiitos viestistäsi. Vastaamme 24 tunnin kuluessa.', lv: 'Paldies, ka rakstījāt. Atbildēsim 24 stundu laikā.' },
    sending: { et: 'Saadan...', en: 'Sending...', ru: 'Отправка...', de: 'Wird gesendet...', es: 'Enviando...', sv: 'Skickar...', fi: 'Lähetetään...', lv: 'Sūta...' },
    error:   { et: 'Midagi läks valesti. Palun proovi uuesti.', en: 'Something went wrong. Please try again.', ru: 'Что-то пошло не так. Попробуйте ещё раз.', de: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.', es: 'Algo ha fallado. Inténtalo de nuevo, por favor.', sv: 'Något gick fel. Försök igen.', fi: 'Jokin meni vikaan. Yritä uudelleen.', lv: 'Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.' },
    eSubj:   { et: 'Pakkumise päring – Oanduaia', en: 'Inquiry – Oanduaia', ru: 'Запрос предложения – Oanduaia', de: 'Anfrage – Oanduaia', es: 'Consulta – Oanduaia', sv: 'Förfrågan – Oanduaia', fi: 'Tiedustelu – Oanduaia', lv: 'Pieprasījums – Oanduaia' },
    eName:   { et: 'Nimi', en: 'Name', ru: 'Имя', de: 'Name', es: 'Nombre', sv: 'Namn', fi: 'Nimi', lv: 'Vārds' },
    eEmail:  { et: 'E-post', en: 'Email', ru: 'Email', de: 'E-Mail', es: 'Correo electrónico', sv: 'E-post', fi: 'Sähköposti', lv: 'E-pasts' },
    eDates:  { et: 'Kuupäevad', en: 'Dates', ru: 'Даты', de: 'Zeitraum', es: 'Fechas', sv: 'Datum', fi: 'Päivämäärät', lv: 'Datumi' },
  },
  footer: {
    t1: { et: 'Saun, majutus ja loodus', en: 'Sauna, lodging and nature', ru: 'Сауна, проживание и природа', de: 'Sauna, Unterkunft und Natur', es: 'Sauna, alojamiento y naturaleza', sv: 'Bastu, boende och natur', fi: 'Sauna, majoitus ja luonto', lv: 'Pirts, naktsmītne un daba' },
    t2: { et: 'Lahemaa südames.', en: 'in the heart of Lahemaa.', ru: 'в сердце Лахемаа.', de: 'im Herzen von Lahemaa.', es: 'en el corazón de Lahemaa.', sv: 'i hjärtat av Lahemaa.', fi: 'Lahemaan sydämessä.', lv: 'Lahemaa sirdī.' },
    // Same address as the Google Business Profile (Oandu, 45432 Lääne-Viru County) — keep them identical.
    t3: { et: 'Oandu küla, 45432 Lääne-Virumaa, Eesti', en: 'Oandu village, 45432 Lääne-Virumaa, Estonia', ru: 'д. Оанду, 45432 Ляэне-Вирумаа, Эстония', de: 'Dorf Oandu, 45432 Lääne-Virumaa, Estland', es: 'Pueblo de Oandu, 45432 Lääne-Virumaa, Estonia', sv: 'Byn Oandu, 45432 Lääne-Virumaa, Estland', fi: 'Oandun kylä, 45432 Länsi-Virumaa, Viro', lv: 'Oandu ciems, 45432 Lääne-Virumaa, Igaunija' },
    navH:    { et: 'Navigatsioon', en: 'Navigation', ru: 'Навигация', de: 'Navigation', es: 'Navegación', sv: 'Navigering', fi: 'Navigointi', lv: 'Navigācija' },
    lugu:    { et: 'Lugu', en: 'Story', ru: 'История', de: 'Geschichte', es: 'Historia', sv: 'Historia', fi: 'Tarina', lv: 'Stāsts' },
    teenused:{ et: 'Toit', en: 'Food', ru: 'Еда', de: 'Essen', es: 'Comida', sv: 'Mat', fi: 'Ruoka', lv: 'Ēdiens' },
    majutus: { et: 'Majad', en: 'Houses', ru: 'Дома', de: 'Häuser', es: 'Casas', sv: 'Husen', fi: 'Talot', lv: 'Mājas' },
    matkad:  { et: 'Loodus', en: 'Nature', ru: 'Природа', de: 'Natur', es: 'Naturaleza', sv: 'Natur', fi: 'Luonto', lv: 'Daba' },
    broneeri:{ et: 'Broneeri', en: 'Book', ru: 'Бронь', de: 'Buchen', es: 'Reservar', sv: 'Boka', fi: 'Varaa', lv: 'Rezervēt' },
    maps:    { et: 'Google Maps', en: 'Google Maps', ru: 'Google Карты', de: 'Google Maps', es: 'Google Maps', sv: 'Google Maps', fi: 'Google Maps', lv: 'Google Maps' },
    /*
     * The footer used to link only to anchors on this page, which left the landing page and
     * the gallery reachable from the sitemap but from no page on the site. An orphan is the
     * weakest page there is, however good its content — so the two real pages go here.
     */
    landing: { et: 'Majutus Lahemaal', en: 'Lahemaa accommodation', ru: 'Жильё в Лахемаа', de: 'Unterkunft in Lahemaa', es: 'Alojamiento en Lahemaa', sv: 'Boende i Lahemaa', fi: 'Majoitus Lahemaalla', lv: 'Naktsmītnes Lahemaa parkā' },
    landingWinter: { et: 'Talvine saun', en: 'Winter sauna', ru: 'Баня зимой', de: 'Wintersauna', es: 'Sauna en invierno', sv: 'Vinterbastu', fi: 'Talvisauna', lv: 'Ziemas pirts' },
    galerii: { et: 'Galerii', en: 'Gallery', ru: 'Галерея', de: 'Galerie', es: 'Galería', sv: 'Galleri', fi: 'Galleria', lv: 'Galerija' },
    contH:   { et: 'Kontakt', en: 'Contact', ru: 'Контакт', de: 'Kontakt', es: 'Contacto', sv: 'Kontakt', fi: 'Yhteystiedot', lv: 'Kontakti' },
    copy:    { et: '© 2026 Oanduaia. Kõik õigused kaitstud.', en: '© 2026 Oanduaia. All rights reserved.', ru: '© 2026 Oanduaia. Все права защищены.', de: '© 2026 Oanduaia. Alle Rechte vorbehalten.', es: '© 2026 Oanduaia. Todos los derechos reservados.', sv: '© 2026 Oanduaia. Alla rättigheter förbehållna.', fi: '© 2026 Oanduaia. Kaikki oikeudet pidätetään.', lv: '© 2026 Oanduaia. Visas tiesības aizsargātas.' },
    loc:     { et: 'Lahemaa rahvuspark · Estonia', en: 'Lahemaa National Park · Estonia', ru: 'Нац. парк Лахемаа · Эстония', de: 'Nationalpark Lahemaa · Estland', es: 'Parque Nacional de Lahemaa · Estonia', sv: 'Lahemaa nationalpark · Estland', fi: 'Lahemaan kansallispuisto · Viro', lv: 'Lahemaa nacionālais parks · Igaunija' },
  },
  gallery: {
    intro: {
      et: 'Fotod Oanduaia kolmest majast, puuküttega saunast, tiigist ja Lahemaa rahvuspargi loodusest – suvest talveni. Saunamaja, Tiigimaja ja Metsamaja seest ja väljast, väliköök ja kaetud lauad, matkarajad ja rannik Oandu külas Lääne-Virumaal.',
      en: 'Photographs of the three Oanduaia cabins, the wood-fired sauna, the pond and the Lahemaa National Park around them, from summer through to winter. The Sauna House, Pond House and Forest House inside and out, the outdoor kitchen and the laid tables, the trails and the coast at Oandu village in Lääne-Virumaa, Estonia.',
      ru: 'Фотографии трёх домов Oanduaia, дровяной бани, пруда и природы национального парка Лахемаа — от лета до зимы. Банный, Прудовой и Лесной дом снаружи и внутри, летняя кухня и накрытые столы, тропы и побережье в деревне Оанду, Ляэне-Вирумаа, Эстония.',
      de: 'Fotografien der drei Häuser von Oanduaia, der Holzsauna, des Teichs und des Nationalparks Lahemaa ringsum, vom Sommer bis in den Winter. Saunahaus, Teichhaus und Waldhaus innen und außen, die Außenküche und die gedeckten Tafeln, die Wege und die Küste im Dorf Oandu in Lääne-Virumaa, Estland.',
      es: 'Fotografías de las tres cabañas de Oanduaia, la sauna de leña, el estanque y el Parque Nacional de Lahemaa que las rodea, del verano al invierno. La Casa de la Sauna, la Casa del Estanque y la Casa del Bosque por dentro y por fuera, la cocina exterior y las mesas puestas, los senderos y la costa en el pueblo de Oandu, en Lääne-Virumaa, Estonia.',
      sv: 'Fotografier av Oanduaias tre stugor, den vedeldade bastun, dammen och Lahemaa nationalpark runt omkring, från sommar till vinter. Bastuhuset, Dammhuset och Skogshuset inifrån och utifrån, utomhusköket och de dukade borden, lederna och kusten i byn Oandu i Lääne-Virumaa, Estland.',
      fi: 'Valokuvia Oanduaian kolmesta mökistä, puulämmitteisestä saunasta, lammesta ja ympäröivästä Lahemaan kansallispuistosta kesästä talveen. Saunatalo, Lampitalo ja Metsätalo sisältä ja ulkoa, ulkokeittiö ja katetut pöydät, polut ja rannikko Oandun kylässä Länsi-Virumaalla, Virossa.',
      lv: 'Fotogrāfijas no trim Oanduaia guļbūvēm, malkas pirts, dīķa un apkārtējā Lahemaa nacionālā parka – no vasaras līdz ziemai. Pirts māja, Dīķa māja un Meža māja no iekšpuses un ārpuses, āra virtuve un klātie galdi, takas un krasts Oandu ciemā, Lääne-Virumaa, Igaunijā.',
    },
    title: { et: 'Galerii', en: 'Gallery', ru: 'Галерея', de: 'Galerie', es: 'Galería', sv: 'Galleri', fi: 'Galleria', lv: 'Galerija' },
    back:  { et: '← Tagasi', en: '← Back', ru: '← Назад', de: '← Zurück', es: '← Volver', sv: '← Tillbaka', fi: '← Takaisin', lv: '← Atpakaļ' },
  },
}
