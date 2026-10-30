import type { Lang } from './translations'
import { HOUSE_GALLERIES } from './housePhotos'

export type GalleryPhoto = {
  src: string
  alt: Record<Lang, string>
  id?: string
  label?: Record<Lang, string>
}

/**
 * Alt text is written per photo, in each language — it is read by screen readers and
 * indexed by image search, so "Oanduaia 37" is worth nothing to either.
 *
 * To add a photo: drop the file in /public/galerii and append one entry below.
 * Describe what is actually visible; do not keyword-stuff.
 *
 * Before adding a batch, check for near-duplicates BY LOOKING. Perceptual hashing
 * does not catch them: 037 and 038 were the same shot seconds apart and scored 138
 * of 256 bits apart on dHash, because foliage and bokeh defeat the hash. 037 was
 * removed; md5 will only ever catch byte-identical copies.
 */
export const HOUSE_PHOTOS: GalleryPhoto[] = [
  {
    src: '/images/saunamaja.jpg',
    id: 'saunamaja',
    label: { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом', de: 'Saunahaus', es: 'Casa de la Sauna', sv: 'Bastuhuset', fi: 'Saunatalo', lv: 'Pirts māja' },
    alt: {
      et: 'Oanduaia saunamaja palkseintega metsa serval',
      en: 'The Oanduaia Sauna House, log-built at the forest edge',
      ru: 'Бревенчатый Банный дом Oanduaia на опушке леса',
      de: 'Das Saunahaus von Oanduaia, in Blockbauweise am Waldrand',
      es: 'La Casa de la Sauna de Oanduaia, de troncos, en el linde del bosque',
      sv: 'Bastuhuset på Oanduaia, timrat vid skogsbrynet',
      fi: 'Oanduaian saunatalo, hirrestä rakennettu metsän reunaan',
      lv: 'Oanduaia Pirts māja, celta no baļķiem meža malā',
    },
  },
  {
    src: '/images/tiigimaja.jpg',
    id: 'tiigimaja',
    label: { et: 'Tiigimaja', en: 'Pond House', ru: 'Прудовой дом', de: 'Teichhaus', es: 'Casa del Estanque', sv: 'Dammhuset', fi: 'Lampitalo', lv: 'Dīķa māja' },
    alt: {
      et: 'Tiigimaja tiigi kaldal Lahemaal',
      en: 'The Pond House at the water’s edge in Lahemaa',
      ru: 'Прудовой дом на берегу пруда в Лахемаа',
      de: 'Das Teichhaus direkt am Wasser in Lahemaa',
      es: 'La Casa del Estanque a la orilla del agua en Lahemaa',
      sv: 'Dammhuset vid vattenbrynet i Lahemaa',
      fi: 'Lampitalo veden äärellä Lahemaalla',
      lv: 'Dīķa māja ūdens malā Lahemā nacionālajā parkā',
    },
  },
  {
    src: '/images/metsamaja.jpg',
    id: 'metsamaja',
    label: { et: 'Metsamaja', en: 'Forest House', ru: 'Лесной дом', de: 'Waldhaus', es: 'Casa del Bosque', sv: 'Skogshuset', fi: 'Metsätalo', lv: 'Meža māja' },
    alt: {
      et: 'Metsamaja kõrgete kuuskede vahel',
      en: 'The Forest House among tall spruce',
      ru: 'Лесной дом среди высоких елей',
      de: 'Das Waldhaus zwischen hohen Fichten',
      es: 'La Casa del Bosque entre altos abetos',
      sv: 'Skogshuset bland höga granar',
      fi: 'Metsätalo korkeiden kuusien keskellä',
      lv: 'Meža māja starp augstām eglēm',
    },
  },
]

type A = [string, string, string, string, string, string, string, string, string] // [file, et, en, ru, de, es, sv, fi, lv]

const RAW: A[] = [
  ['033', 'Roogkatusega palkmaja kivisel terrassil, taga mets', 'Thatched log house above a stone terrace, forest behind', 'Бревенчатый дом с камышовой крышей над каменной террасой', 'Reetgedecktes Blockhaus über einer Steinterrasse, dahinter der Wald', 'Casa de troncos con tejado de junco sobre una terraza de piedra, con el bosque detrás', 'Vasstäckt timmerhus ovanför en stenterrass, skog bakom', 'Ruokokattoinen hirsitalo kiviterassin yläpuolella, takana metsää', 'Baļķu māja ar niedru jumtu virs akmens terases, aizmugurē mežs'],
  ['034', 'Vaade üles läbi männilatvade päikese poole', 'Looking up through pine crowns towards the sun', 'Вид вверх сквозь кроны сосен на солнце', 'Blick hinauf durch Kiefernkronen zur Sonne', 'Mirando hacia arriba entre las copas de los pinos, hacia el sol', 'Blick uppåt genom tallkronorna mot solen', 'Näkymä ylös mäntyjen latvusten läpi kohti aurinkoa', 'Skats augšup caur priežu galotnēm pret sauli'],
  ['035', 'Roogkatusega maja üle niidetud muru, lillepeenar ees', 'Thatched house across a mown lawn with a flower border', 'Дом с камышовой крышей за подстриженным газоном', 'Reetgedecktes Haus hinter einer gemähten Wiese mit Blumenbeet', 'Casa con tejado de junco tras un césped segado con un arriate de flores', 'Vasstäckt hus bortom en klippt gräsmatta med en blomrabatt', 'Ruokokattoinen talo leikatun nurmikon takana, edessä kukkapenkki', 'Māja ar niedru jumtu aiz nopļauta zāliena ar puķu dobi'],
  ['036', 'Puidust paadisild tiigil vesirooside vahel', 'A wooden jetty reaching into the lily-covered pond', 'Деревянный мостик на пруду среди кувшинок', 'Ein Holzsteg, der in den mit Seerosen bedeckten Teich reicht', 'Un embarcadero de madera que se adentra en el estanque cubierto de nenúfares', 'En träbrygga som sträcker sig ut i den näckrosklädda dammen', 'Puulaituri, joka ulottuu lumpeiden peittämään lampeen', 'Koka laipa, kas sniedzas ūdensrozēm klātajā dīķī'],
  ['038', 'Tammelehed esiplaanil, roogkatusega maja hägusalt taga', 'Oak leaves in the foreground, the thatched house soft behind', 'Дубовые листья на переднем плане, дом с камышовой крышей позади', 'Eichenblätter im Vordergrund, dahinter unscharf das reetgedeckte Haus', 'Hojas de roble en primer plano, con la casa de tejado de junco desenfocada detrás', 'Eklöv i förgrunden, det vasstäckta huset suddigt bakom', 'Tammenlehtiä etualalla, ruokokattoinen talo pehmeänä taustalla', 'Ozola lapas priekšplānā, aiz tām izplūdusi māja ar niedru jumtu'],
  ['039', 'Pikk roogkatusega palkmaja katuseakendega', 'The long thatched log house with dormer windows', 'Длинный бревенчатый дом с мансардными окнами', 'Das lange reetgedeckte Blockhaus mit Dachgauben', 'La alargada casa de troncos con tejado de junco y buhardillas', 'Det långa vasstäckta timmerhuset med takkupor', 'Pitkä ruokokattoinen hirsitalo kattolyhtyineen', 'Garā baļķu māja ar niedru jumtu un jumta logiem'],
  ['040', 'Palkmaja veranda puitsammaste ja laudpõrandaga', 'Log house veranda with timber posts and a plank floor', 'Веранда бревенчатого дома с деревянными столбами', 'Veranda des Blockhauses mit Holzpfosten und Dielenboden', 'Porche de la casa de troncos con postes de madera y suelo de tablones', 'Timmerhusets veranda med trästolpar och plankgolv', 'Hirsitalon kuisti, puupilarit ja lankkulattia', 'Baļķu mājas veranda ar koka stabiem un dēļu grīdu'],
  ['041', 'Maja tiigi ääres lopsaka aiaga', 'The house beside the pond with a lush garden', 'Дом у пруда с пышным садом', 'Das Haus am Teich mit üppigem Garten', 'La casa junto al estanque con un jardín frondoso', 'Huset vid dammen med en frodig trädgård', 'Talo lammen rannalla ja rehevä puutarha', 'Māja pie dīķa ar kuplu dārzu'],
  ['042', 'Sõudepaat tiigi kaldal, taga mets', 'A rowing boat moored at the pond, forest beyond', 'Лодка у берега пруда, за ним лес', 'Ein Ruderboot am Teich vertäut, dahinter der Wald', 'Una barca de remos amarrada en el estanque, con el bosque al fondo', 'En roddbåt förtöjd vid dammen, skog bortom', 'Soutuvene kiinnitettynä lammen rantaan, takana metsää', 'Airu laiva piesieta pie dīķa, tālāk mežs'],
  ['043', 'Paadisild tiigil, puud peegelduvad vees', 'The jetty on the pond with trees mirrored in the water', 'Мостик на пруду, деревья отражаются в воде', 'Der Steg am Teich, Bäume spiegeln sich im Wasser', 'El embarcadero en el estanque con los árboles reflejados en el agua', 'Bryggan i dammen med träd som speglas i vattnet', 'Laituri lammella, puut heijastuvat veteen', 'Laipa dīķī, koki atspoguļojas ūdenī'],
  ['044', 'Avatud puidust paviljon lillede ja välikööginurgaga', 'An open timber pavilion with flowers and an outdoor kitchen', 'Открытый деревянный павильон с цветами и летней кухней', 'Ein offener Holzpavillon mit Blumen und Außenküche', 'Un pabellón abierto de madera con flores y una cocina exterior', 'En öppen paviljong i trä med blommor och ett utekök', 'Avoin puinen paviljonki, kukkia ja ulkokeittiö', 'Atvērta koka nojume ar ziediem un āra virtuvi'],
  ['045', 'Roosad lilled esiplaanil, roogkatusega majad taga', 'Pink flowers in front of the thatched houses', 'Розовые цветы перед домами с камышовой крышей', 'Rosa Blüten vor den reetgedeckten Häusern', 'Flores rosas delante de las casas con tejado de junco', 'Rosa blommor framför de vasstäckta husen', 'Vaaleanpunaisia kukkia ruokokattoisten talojen edessä', 'Rozā ziedi pie mājām ar niedru jumtiem'],
  ['046', 'Langenud puud sammaldunud ürgmetsas', 'Fallen trees in mossy old-growth forest', 'Поваленные деревья во мшистом старом лесу', 'Umgestürzte Bäume im moosigen Urwald', 'Árboles caídos en un bosque primario cubierto de musgo', 'Nedfallna träd i mossig urskog', 'Kaatuneita puita sammaloituneessa aarniometsässä', 'Nogāzušies koki sūnainā pirmatnējā mežā'],
  ['047', 'Laps hoiab kaussi värskete maasikatega', 'A child holding a bowl of freshly picked strawberries', 'Ребёнок держит миску со свежей клубникой', 'Ein Kind hält eine Schale frisch gepflückter Erdbeeren', 'Un niño sostiene un cuenco de fresas recién cogidas', 'Ett barn som håller en skål med nyplockade jordgubbar', 'Lapsi pitelee kulhollista vastapoimittuja mansikoita', 'Bērns tur bļodu ar svaigi lasītām zemenēm'],
  ['048', 'Tiik kaskede vahel, maja vasakul kaldal', 'The pond among birches, a house on the left bank', 'Пруд среди берёз, дом на левом берегу', 'Der Teich zwischen Birken, ein Haus am linken Ufer', 'El estanque entre abedules, con una casa en la orilla izquierda', 'Dammen bland björkar, ett hus på vänstra stranden', 'Lampi koivujen keskellä, talo vasemmalla rannalla', 'Dīķis starp bērziem, māja kreisajā krastā'],
  ['051', 'Roogkatusega maja tiigi ääres varakevadel', 'The thatched house by the pond in early spring', 'Дом с камышовой крышей у пруда ранней весной', 'Das reetgedeckte Haus am Teich im zeitigen Frühling', 'La casa con tejado de junco junto al estanque a principios de primavera', 'Det vasstäckta huset vid dammen tidigt på våren', 'Ruokokattoinen talo lammen rannalla varhain keväällä', 'Māja ar niedru jumtu pie dīķa agrā pavasarī'],
  ['052', 'Palkmaja koridor, nahad laetalade peal, trepp taga', 'Log house hallway with hides over the beams and a staircase', 'Коридор бревенчатого дома со шкурами на балках', 'Diele des Blockhauses mit Fellen über den Balken und einer Treppe', 'Pasillo de la casa de troncos con pieles sobre las vigas y una escalera', 'Hall i timmerhuset med hudar över bjälkarna och en trappa', 'Hirsitalon eteinen, vuotia palkkien päällä ja portaat', 'Baļķu mājas gaitenis ar ādām pār sijām un kāpnēm'],
  ['053', 'Pikk puidust välilaud pinkidega maja ees', 'A long timber outdoor table and benches before the house', 'Длинный деревянный стол со скамьями перед домом', 'Ein langer Holztisch mit Bänken vor dem Haus', 'Una larga mesa exterior de madera con bancos delante de la casa', 'Ett långt utomhusbord i trä med bänkar framför huset', 'Pitkä puinen ulkopöytä ja penkit talon edessä', 'Garš koka āra galds un soli pie mājas'],
  ['054', 'Tiik varakevadel, raagus puud ja pilvine taevas', 'The pond in early spring under bare trees and cloud', 'Пруд ранней весной, голые деревья и облака', 'Der Teich im zeitigen Frühling unter kahlen Bäumen und Wolken', 'El estanque a principios de primavera bajo árboles desnudos y nubes', 'Dammen tidigt på våren under kala träd och moln', 'Lampi varhain keväällä paljaiden puiden ja pilvien alla', 'Dīķis agrā pavasarī zem kailiem kokiem un mākoņiem'],
  ['055', 'Õitsvad pojengid aias, majad ja sinine taevas taga', 'Peonies in bloom with the houses and blue sky behind', 'Цветущие пионы в саду, дома и синее небо', 'Blühende Pfingstrosen, dahinter die Häuser und blauer Himmel', 'Peonías en flor con las casas y el cielo azul detrás', 'Blommande pioner med husen och blå himmel bakom', 'Kukkivia pioneja, takana talot ja sininen taivas', 'Ziedošas peonijas, aiz tām mājas un zilas debesis'],
  ['056', 'Roogkatusega varjualune jäätunud tiigi ääres talvel', 'A thatched shelter beside the frozen pond in winter', 'Навес с камышовой крышей у замёрзшего пруда зимой', 'Ein reetgedeckter Unterstand am zugefrorenen Teich im Winter', 'Un refugio con tejado de junco junto al estanque helado en invierno', 'Ett vasstäckt skärmtak vid den frusna dammen på vintern', 'Ruokokattoinen katos jäätyneen lammen rannalla talvella', 'Nojume ar niedru jumtu pie aizsalušā dīķa ziemā'],
  ['057', 'Lahtine raamat, milles on Oanduaia lugu ja fotod', 'An open book showing photographs of Oanduaia', 'Открытая книга с фотографиями Oanduaia', 'Ein aufgeschlagenes Buch mit Fotografien von Oanduaia', 'Un libro abierto con fotografías de Oanduaia', 'En uppslagen bok med fotografier från Oanduaia', 'Avoin kirja, jossa on valokuvia Oanduaiasta', 'Atvērta grāmata ar Oanduaia fotogrāfijām'],
  ['058', 'Maja poolenisti jäätunud tiigi taga kevadel', 'The house behind the half-frozen pond in spring', 'Дом за наполовину замёрзшим прудом весной', 'Das Haus hinter dem halb zugefrorenen Teich im Frühling', 'La casa tras el estanque medio helado en primavera', 'Huset bakom den halvt frusna dammen på våren', 'Talo puoliksi jäätyneen lammen takana keväällä', 'Māja aiz pa pusei aizsalušā dīķa pavasarī'],
  ['059', 'Jää ja peegeldused tiigil, kuused kaldal', 'Ice and reflections on the pond, spruce along the bank', 'Лёд и отражения на пруду, ели по берегу', 'Eis und Spiegelungen auf dem Teich, Fichten am Ufer', 'Hielo y reflejos en el estanque, con abetos a lo largo de la orilla', 'Is och speglingar på dammen, granar längs stranden', 'Jäätä ja heijastuksia lammella, kuusia rannalla', 'Ledus un atspulgi dīķī, gar krastu egles'],
  ['060', 'Tiik jää all sinise taeva ja kuuskede vahel', 'The pond under ice between blue sky and spruce', 'Пруд подо льдом между синим небом и елями', 'Der Teich unter Eis zwischen blauem Himmel und Fichten', 'El estanque bajo el hielo entre el cielo azul y los abetos', 'Den isbelagda dammen mellan blå himmel och granar', 'Jään peittämä lampi sinisen taivaan ja kuusien välissä', 'Aizsalis dīķis starp zilām debesīm un eglēm'],
  ['061', 'Kevadine tiik, maja vasakul, raagus puud', 'The spring pond with the house at left among bare trees', 'Весенний пруд, дом слева среди голых деревьев', 'Der Frühlingsteich, links das Haus zwischen kahlen Bäumen', 'El estanque en primavera con la casa a la izquierda entre árboles desnudos', 'Dammen på våren med huset till vänster bland kala träd', 'Kevätlampi, talo vasemmalla paljaiden puiden keskellä', 'Pavasara dīķis, pa kreisi māja starp kailiem kokiem'],
  ['062', 'Valgustatud majake õhtuhämaruses metsa serval', 'A lit cabin glowing at dusk on the forest edge', 'Освещённый домик в сумерках на опушке леса', 'Eine erleuchtete Hütte in der Dämmerung am Waldrand', 'Una cabaña iluminada que brilla al anochecer en el linde del bosque', 'En upplyst stuga som lyser i skymningen vid skogsbrynet', 'Valaistu mökki hehkuu hämärässä metsän reunassa', 'Izgaismota māja mirdz krēslā meža malā'],
  ['063', 'Küünlavalgel kaetud õhtusöögilaud tulpide ja klaasidega', 'A candlelit dinner table set with tulips and glassware', 'Накрытый при свечах стол с тюльпанами и бокалами', 'Ein Esstisch bei Kerzenschein mit Tulpen und Gläsern', 'Una mesa de cena a la luz de las velas con tulipanes y cristalería', 'Ett middagsbord i levande ljus, dukat med tulpaner och glas', 'Kynttilänvalossa katettu illallispöytä, tulppaaneja ja laseja', 'Sveču gaismā klāts vakariņu galds ar tulpēm un glāzēm'],
  ['064', 'Lumine rada palkmaja valgustatud akende poole', 'A snowy path towards the lit windows of the log house', 'Заснеженная тропа к освещённым окнам дома', 'Ein verschneiter Weg zu den erleuchteten Fenstern des Blockhauses', 'Un sendero nevado hacia las ventanas iluminadas de la casa de troncos', 'En snöig stig mot timmerhusets upplysta fönster', 'Luminen polku kohti hirsitalon valaistuja ikkunoita', 'Sniegota taka, kas ved uz baļķu mājas izgaismotajiem logiem'],
  ['065', 'Kaetud laud taldrikute, klaaside ja mustade salvrätikutega', 'A laid table with plates, glasses and black napkins', 'Накрытый стол с тарелками, бокалами и салфетками', 'Eine gedeckte Tafel mit Tellern, Gläsern und schwarzen Servietten', 'Una mesa puesta con platos, copas y servilletas negras', 'Ett dukat bord med tallrikar, glas och svarta servetter', 'Katettu pöytä, lautasia, laseja ja mustia lautasliinoja', 'Klāts galds ar šķīvjiem, glāzēm un melnām salvetēm'],
  ['066', 'Pidulik söögilaud lillede ja küünaldega akende ees', 'A festive dining table with flowers and candles by the windows', 'Праздничный стол с цветами и свечами у окон', 'Eine festliche Tafel mit Blumen und Kerzen an den Fenstern', 'Una mesa festiva con flores y velas junto a las ventanas', 'Ett festligt matbord med blommor och ljus vid fönstren', 'Juhlava ruokapöytä, kukkia ja kynttilöitä ikkunoiden edessä', 'Svētku galds ar ziediem un svecēm pie logiem'],
  ['067', 'Kaetud söögilaud sügislillede ja kristallklaasidega', 'The dining table set with autumn flowers and crystal', 'Стол, сервированный осенними цветами и хрусталём', 'Der Esstisch, gedeckt mit Herbstblumen und Kristall', 'La mesa de comedor puesta con flores otoñales y cristal', 'Matbordet dukat med höstblommor och kristall', 'Ruokapöytä katettuna syyskukin ja kristallilasein', 'Ēdamgalds, klāts ar rudens ziediem un kristālu'],
  ['068', 'Tume viilkatusega saunahoone kõrgete puude vahel', 'A dark gabled sauna building among tall trees', 'Тёмное строение сауны с двускатной крышей среди деревьев', 'Ein dunkles Saunagebäude mit Giebeldach zwischen hohen Bäumen', 'Un oscuro edificio de sauna con tejado a dos aguas entre árboles altos', 'En mörk bastubyggnad med sadeltak bland höga träd', 'Tumma harjakattoinen saunarakennus korkeiden puiden keskellä', 'Tumša pirts ēka ar divslīpju jumtu starp augstiem kokiem'],
  ['069', 'Perenaine valmistab kööginurgas akna all sööki', 'Cooking at the kitchen counter beside the window', 'Приготовление еды на кухне у окна', 'Kochen an der Küchenzeile neben dem Fenster', 'Cocinando en la encimera junto a la ventana', 'Matlagning vid köksbänken bredvid fönstret', 'Ruoanlaittoa keittiötasolla ikkunan vieressä', 'Ēdiena gatavošana pie virtuves darba virsmas blakus logam'],
  ['070', 'Tuba puitseintega, aken metsa poole, kummut ja lamp', 'A timber-walled room with a forest window, chest and lamp', 'Комната с деревянными стенами, окном в лес и комодом', 'Ein holzverkleideter Raum mit Waldfenster, Truhe und Lampe', 'Una habitación con paredes de madera, ventana al bosque, cómoda y lámpara', 'Ett rum med träväggar, ett fönster mot skogen, en byrå och en lampa', 'Puuseinäinen huone, ikkuna metsään, lipasto ja lamppu', 'Istaba ar koka sienām, logu uz mežu, kumodi un lampu'],
  ['071', 'Punane malmpott gaasipliidil, värsked ürdid aknalaual', 'A red pot on the gas hob with fresh herbs on the sill', 'Красная кастрюля на плите, свежие травы на подоконнике', 'Ein roter Topf auf dem Gasherd, frische Kräuter auf der Fensterbank', 'Una olla roja sobre la placa de gas con hierbas frescas en el alféizar', 'En röd gryta på gashällen och färska örter i fönstret', 'Punainen pata kaasulieden päällä ja tuoreita yrttejä ikkunalaudalla', 'Sarkans katls uz gāzes plīts un svaigi garšaugi uz palodzes'],
  ['072', 'Sauna leiliruum puidust lavade ja sooja valgusega', 'The sauna room with timber benches and warm light', 'Парная с деревянными полками и тёплым светом', 'Der Saunaraum mit Holzbänken und warmem Licht', 'La sala de la sauna con bancos de madera y luz cálida', 'Bastun med lavar av trä och varmt ljus', 'Löylyhuone, puulauteet ja lämmin valo', 'Pirts telpa ar koka lāvām un siltu gaismu'],
  ['073', 'Tiik sõnajalgade taga, maja puude vahel', 'The pond behind ferns, the house among the trees', 'Пруд за папоротниками, дом среди деревьев', 'Der Teich hinter Farnen, das Haus zwischen den Bäumen', 'El estanque tras los helechos, con la casa entre los árboles', 'Dammen bakom ormbunkar, huset bland träden', 'Lampi saniaisten takana, talo puiden keskellä', 'Dīķis aiz papardēm, māja starp kokiem'],
  ['074', 'Kruusatee kiviäärise ja dekoratiivsete kõrrelistega', 'A gravel path with stone edging and ornamental grasses', 'Гравийная дорожка с каменным бордюром и злаками', 'Ein Kiesweg mit Steineinfassung und Ziergräsern', 'Un camino de grava con bordillo de piedra y gramíneas ornamentales', 'En grusgång med stenkant och prydnadsgräs', 'Sorapolku, kivireunus ja koristeheiniä', 'Grants celiņš ar akmens apmali un dekoratīvām graudzālēm'],
  ['075', 'Vannituba puitseinte, peegli ja kivist valamulauaga', 'A bathroom with timber walls, mirror and stone counter', 'Ванная с деревянными стенами, зеркалом и каменной столешницей', 'Ein Bad mit Holzwänden, Spiegel und Steinwaschtisch', 'Un baño con paredes de madera, espejo y encimera de piedra', 'Ett badrum med träväggar, spegel och stenbänk', 'Kylpyhuone, puuseinät, peili ja kivitaso', 'Vannas istaba ar koka sienām, spoguli un akmens virsmu'],
  ['076', 'Puidust viilkatus taeva ja puulatvade taustal', 'A timber gable roof against sky and treetops', 'Деревянный фронтон на фоне неба и крон деревьев', 'Ein hölzerner Giebel vor Himmel und Baumkronen', 'Un hastial de madera contra el cielo y las copas de los árboles', 'Ett sadeltak i trä mot himlen och trädtopparna', 'Puinen harjakatto taivasta ja puiden latvoja vasten', 'Koka divslīpju jumts pret debesīm un koku galotnēm'],
  ['077', 'Avar elutuba diivani ja suurte metsavaatega akendega', 'An open living room with a sofa and wide forest windows', 'Просторная гостиная с диваном и окнами в лес', 'Ein offener Wohnraum mit Sofa und breiten Waldfenstern', 'Un salón diáfano con sofá y amplias ventanas al bosque', 'Ett öppet vardagsrum med soffa och breda fönster mot skogen', 'Avara olohuone, sohva ja leveät ikkunat metsään', 'Plaša dzīvojamā istaba ar dīvānu un platiem logiem uz mežu'],
  ['078', 'Elutuba kamina, tugitooli ja puidust lauaga', 'The living room with fireplace, lounge chair and timber table', 'Гостиная с камином, креслом и деревянным столом', 'Der Wohnraum mit Kamin, Sessel und Holztisch', 'El salón con chimenea, butaca y mesa de madera', 'Vardagsrummet med öppen spis, fåtölj och träbord', 'Olohuone, takka, nojatuoli ja puupöytä', 'Dzīvojamā istaba ar kamīnu, atpūtas krēslu un koka galdu'],
  ['079', 'Vannituba kahe peegli ja kivist valamulauaga', 'A bathroom with twin mirrors and a stone vanity', 'Ванная с двумя зеркалами и каменной столешницей', 'Ein Bad mit zwei Spiegeln und steinernem Waschtisch', 'Un baño con dos espejos y un lavabo de piedra', 'Ett badrum med två speglar och tvättställ i sten', 'Kylpyhuone, kaksi peiliä ja kivinen allastaso', 'Vannas istaba ar diviem spoguļiem un akmens izlietnes virsmu'],
  ['080', 'Muru tiigini, sügisvärvides puud ja maja kaugemal', 'Lawn down to the pond, autumn trees and the house beyond', 'Газон к пруду, осенние деревья и дом вдали', 'Wiese hinunter zum Teich, Herbstbäume und dahinter das Haus', 'Césped que baja hasta el estanque, árboles otoñales y la casa al fondo', 'Gräsmatta ner mot dammen, höstträd och huset bortom', 'Nurmikko lammen rantaan asti, syksyisiä puita ja talo taempana', 'Zāliens līdz dīķim, rudens koki un tālāk māja'],
  ['081', 'Roogkatusega maja murul dramaatilise pilvise taeva all', 'The thatched house on the lawn under a dramatic sky', 'Дом с камышовой крышей на газоне под драматичным небом', 'Das reetgedeckte Haus auf der Wiese unter dramatischem Himmel', 'La casa con tejado de junco sobre el césped bajo un cielo espectacular', 'Det vasstäckta huset på gräsmattan under en dramatisk himmel', 'Ruokokattoinen talo nurmikolla dramaattisen taivaan alla', 'Māja ar niedru jumtu zālienā zem dramatiskām debesīm'],
  ['082', 'Palkmaja sisevaade diivani, kööginurga ja kaminaga', 'Cabin interior with sofa, kitchenette and fireplace', 'Интерьер дома с диваном, кухней и камином', 'Hütteninneres mit Sofa, Küchenzeile und Kamin', 'Interior de la cabaña con sofá, cocina pequeña y chimenea', 'Stugans interiör med soffa, pentry och öppen spis', 'Mökin sisätila, sohva, keittokomero ja takka', 'Mājas interjers ar dīvānu, virtuves nišu un kamīnu'],
  ['083', 'Veekogu läbi suvise niidu ja lehtpuude', 'Water winding through summer meadow and broadleaf trees', 'Вода среди летнего луга и лиственных деревьев', 'Wasser windet sich durch Sommerwiese und Laubbäume', 'Agua que serpentea entre un prado estival y árboles de hoja ancha', 'Vatten som slingrar sig genom sommaräng och lövträd', 'Vesi mutkittelee kesäniityn ja lehtipuiden halki', 'Ūdens līkumo cauri vasaras pļavai un lapu kokiem'],
  ['086', 'Mesilane härjasilma õiel niidul', 'A bee on an ox-eye daisy in the meadow', 'Пчела на цветке нивяника на лугу', 'Eine Biene auf einer Margerite in der Wiese', 'Una abeja sobre una margarita en el prado', 'Ett bi på en prästkrage på ängen', 'Mehiläinen päivänkakkaralla niityllä', 'Bite uz pīpenes pļavā'],
  ['087', 'Ümar roogkatusega hoone suvise tiigi ääres', 'A round thatched building beside the summer pond', 'Круглое строение с камышовой крышей у летнего пруда', 'Ein rundes reetgedecktes Gebäude am sommerlichen Teich', 'Un edificio redondo con tejado de junco junto al estanque en verano', 'En rund vasstäckt byggnad vid dammen på sommaren', 'Pyöreä ruokokattoinen rakennus kesäisen lammen rannalla', 'Apaļa ēka ar niedru jumtu pie vasarīgā dīķa'],
  ['088', 'Kaks matkajat metsarajal päikesekiirte all', 'Two walkers on a forest trail in shafts of sunlight', 'Двое на лесной тропе в лучах солнца', 'Zwei Wanderer auf einem Waldpfad in Sonnenstrahlen', 'Dos caminantes en un sendero del bosque entre rayos de sol', 'Två vandrare på en skogsstig i solstrålar', 'Kaksi kulkijaa metsäpolulla auringonsäteiden keskellä', 'Divi gājēji meža takā saules staros'],
  ['089', 'Kaetud laud taldrikute, klaaside ja lilledega', 'A place setting with plates, glasses and flowers', 'Сервировка стола с тарелками, бокалами и цветами', 'Ein Gedeck mit Tellern, Gläsern und Blumen', 'Un cubierto con platos, copas y flores', 'En kuvertdukning med tallrikar, glas och blommor', 'Kattaus, lautasia, laseja ja kukkia', 'Galda klājums ar šķīvjiem, glāzēm un ziediem'],
  ['090', 'Kevadine tiik peegeldab metsa ja pilvi', 'The spring pond mirroring forest and cloud', 'Весенний пруд отражает лес и облака', 'Der Frühlingsteich spiegelt Wald und Wolken', 'El estanque en primavera reflejando el bosque y las nubes', 'Dammen på våren speglar skog och moln', 'Kevätlampi heijastaa metsää ja pilviä', 'Pavasara dīķis atspoguļo mežu un mākoņus'],
  ['091', 'Roogkatusega hoone peegeldub vaikses tiigis', 'A thatched building reflected in the still pond', 'Строение с камышовой крышей отражается в пруду', 'Ein reetgedecktes Gebäude spiegelt sich im stillen Teich', 'Un edificio con tejado de junco reflejado en el estanque en calma', 'En vasstäckt byggnad som speglas i den stilla dammen', 'Ruokokattoinen rakennus heijastuu tyyneen lampeen', 'Ēka ar niedru jumtu atspoguļojas rāmajā dīķī'],
  ['092', 'Paadisild üle tumeda tiigi, mets peegeldub', 'The jetty over the dark pond with forest reflected', 'Мостик над тёмным прудом, лес в отражении', 'Der Steg über dem dunklen Teich, der Wald spiegelt sich', 'El embarcadero sobre el estanque oscuro con el bosque reflejado', 'Bryggan över den mörka dammen där skogen speglas', 'Laituri tumman lammen yllä, metsä heijastuu veteen', 'Laipa pār tumšo dīķi, kurā atspoguļojas mežs'],
  ['093', 'Sõudepaat ja varjualune tiigi ääres kevadel', 'A rowing boat and shelter at the pond in spring', 'Лодка и навес у пруда весной', 'Ein Ruderboot und ein Unterstand am Teich im Frühling', 'Una barca de remos y un refugio junto al estanque en primavera', 'En roddbåt och ett skärmtak vid dammen på våren', 'Soutuvene ja katos lammen rannalla keväällä', 'Airu laiva un nojume pie dīķa pavasarī'],
  ['094', 'Roogkatusega hoone ja paadisild tiigi kaldal', 'A thatched building and jetty at the pond’s edge', 'Строение с камышовой крышей и мостик у пруда', 'Ein reetgedecktes Gebäude und der Steg am Ufer des Teichs', 'Un edificio con tejado de junco y el embarcadero a la orilla del estanque', 'En vasstäckt byggnad och en brygga vid dammens kant', 'Ruokokattoinen rakennus ja laituri lammen reunalla', 'Ēka ar niedru jumtu un laipa dīķa malā'],
]


/** Added 26 Aug 2026 — descriptive filenames, same [file, et, en, ru] shape. */
const RAW_2026: A[] = [
  ['kolm-hoonet', 'Kolm hoonet peegeldumas vaikses tiigis', 'Three buildings mirrored in the still pond', 'Три строения отражаются в спокойном пруду', 'Drei Gebäude spiegeln sich im stillen Teich', 'Tres edificios reflejados en el estanque en calma', 'Tre byggnader som speglas i den stilla dammen', 'Kolme rakennusta heijastuu tyyneen lampeen', 'Trīs ēkas atspoguļojas rāmajā dīķī'],
  ['peamajast-ulevalt', 'Avar muru peamaja ees kõrgete pilvede all', 'Open lawn before the main house under high cloud', 'Открытый газон перед главным домом под облаками', 'Offene Wiese vor dem Haupthaus unter hohen Wolken', 'Amplio césped delante de la casa principal bajo nubes altas', 'Öppen gräsmatta framför huvudbyggnaden under höga moln', 'Avara nurmikko päärakennuksen edessä korkeiden pilvien alla', 'Plašs zāliens pie galvenās mājas zem augstiem mākoņiem'],
  ['kiigud', 'Kaks puidust võrkkiike kaskede vahel maja ees', 'Two timber hammocks slung between birches before the house', 'Два деревянных гамака между берёзами перед домом', 'Zwei Hängematten aus Holz zwischen Birken vor dem Haus', 'Dos hamacas de madera colgadas entre abedules delante de la casa', 'Två hängmattor av trä uppspända mellan björkar framför huset', 'Kaksi puista riippumattoa koivujen välissä talon edessä', 'Divi koka šūpuļtīkli, iekārti starp bērziem pie mājas'],
  ['saunamaja-veepealt', 'Saunamaja üle vee, mets peegeldumas tiigis', 'The Sauna House across the water, forest mirrored in the pond', 'Банный дом за прудом, лес отражается в пруду', 'Das Saunahaus jenseits des Teichs, der Wald spiegelt sich im Teich', 'La casa de la sauna al otro lado del agua, con el bosque reflejado en el estanque', 'Bastuhuset sett över vattnet, skogen speglas i dammen', 'Saunatalo veden takana, metsä heijastuu lampeen', 'Pirts māja pāri ūdenim, mežs atspoguļojas dīķī'],
  ['oja', 'Õhtupäike läbi puude tiigi kohal', 'Evening sun through the trees above the pond', 'Вечернее солнце сквозь деревья над прудом', 'Abendsonne durch die Bäume über dem Teich', 'Sol de tarde entre los árboles sobre el estanque', 'Kvällssol genom träden ovanför dammen', 'Ilta-aurinko puiden läpi lammen yllä', 'Vakara saule caur kokiem virs dīķa'],
  ['peamaja-eeshoov', 'Peamaja esine muru palkhoonete vahel', 'The forecourt lawn between the log buildings', 'Газон перед главным домом между строениями', 'Der Vorplatz zwischen den Blockgebäuden', 'El césped del patio delantero entre los edificios de troncos', 'Gräsmattan på gårdsplanen mellan timmerbyggnaderna', 'Pihanurmikko hirsirakennusten välissä', 'Pagalma zāliens starp baļķu ēkām'],
  ['paadiaer', 'Tiik peegeldab metsa ja suvist taevast', 'The pond mirroring forest and summer sky', 'Пруд отражает лес и летнее небо', 'Der Teich spiegelt Wald und Sommerhimmel', 'El estanque reflejando el bosque y el cielo de verano', 'Dammen speglar skogen och sommarhimlen', 'Lampi heijastaa metsää ja kesätaivasta', 'Dīķis atspoguļo mežu un vasaras debesis'],
  ['tiigimaja-veepealt', 'Tiigimaja vaadatuna üle vee', 'The Pond House seen from across the water', 'Прудовой дом со стороны воды', 'Das Teichhaus von der anderen Uferseite gesehen', 'La Casa del Estanque vista desde el otro lado del agua', 'Dammhuset sett från andra sidan vattnet', 'Lampitalo veden toiselta puolelta nähtynä', 'Dīķa māja, skatoties no ūdens otra krasta'],
  ['metsarada', 'Vaade üles läbi kõrgete männitüvede', 'Looking up through tall pine trunks', 'Вид вверх сквозь высокие стволы сосен', 'Blick hinauf durch hohe Kiefernstämme', 'Mirando hacia arriba entre altos troncos de pino', 'Blick uppåt längs höga tallstammar', 'Näkymä ylös korkeiden männynrunkojen välistä', 'Skats augšup gar augstiem priežu stumbriem'],
  ['ilus-tiik', 'Vaikne tiik vesiroosidega suvel', 'The still pond with water lilies in summer', 'Тихий пруд с кувшинками летом', 'Der stille Teich mit Seerosen im Sommer', 'El estanque en calma con nenúfares en verano', 'Den stilla dammen med näckrosor på sommaren', 'Tyyni lampi ja lumpeet kesällä', 'Rāmais dīķis ar ūdensrozēm vasarā'],
  ['puu-ja-majad', 'Vana puu murul, majad taga', 'An old tree on the lawn with the houses behind', 'Старое дерево на газоне, дома позади', 'Ein alter Baum auf der Wiese, dahinter die Häuser', 'Un árbol viejo en el césped con las casas detrás', 'Ett gammalt träd på gräsmattan med husen bakom', 'Vanha puu nurmikolla, takana talot', 'Vecs koks zālienā, aiz tā mājas'],
  ['kivid-ja-tiik', 'Rändrahnud tiigi kaldal', 'Boulders along the edge of the pond', 'Валуны на берегу пруда', 'Findlinge am Ufer des Teichs', 'Grandes rocas a lo largo de la orilla del estanque', 'Flyttblock längs dammens kant', 'Siirtolohkareita lammen reunalla', 'Laukakmeņi gar dīķa malu'],
  ['tiik-selge-vesi', 'Õhtupäike puude vahelt üle vaikse tiigi', 'Evening sun through the trees across the still pond', 'Вечернее солнце сквозь деревья над тихим прудом', 'Abendsonne durch die Bäume über dem stillen Teich', 'Sol de tarde entre los árboles sobre el estanque en calma', 'Kvällssol mellan träden över den stilla dammen', 'Ilta-aurinko puiden välistä tyynen lammen yli', 'Vakara saule starp kokiem pāri rāmajam dīķim'],
  ['ait-ja-saun', 'Vana ait ja saun muru serval', 'The old granary and sauna at the lawn’s edge', 'Старый амбар и сауна на краю газона', 'Der alte Speicher und die Sauna am Rand der Wiese', 'El antiguo granero y la sauna en el borde del césped', 'Det gamla härbret och bastun i kanten av gräsmattan', 'Vanha aitta ja sauna nurmikon reunalla', 'Vecā klēts un pirts zāliena malā'],
  ['metsamaja-kaugelt', 'Metsamaja üle muru metsa taustal', 'The Forest House across the lawn against the forest', 'Лесной дом за газоном на фоне леса', 'Das Waldhaus über die Wiese hinweg vor dem Wald', 'La Casa del Bosque al otro lado del césped, con el bosque de fondo', 'Skogshuset bortom gräsmattan mot skogen', 'Metsätalo nurmikon takana metsää vasten', 'Meža māja aiz zāliena uz meža fona'],
  ['metsamaja-tagant', 'Metsamaja tagantvaade puude vahelt', 'The Forest House from behind, seen through the trees', 'Лесной дом сзади, сквозь деревья', 'Das Waldhaus von hinten, durch die Bäume gesehen', 'La Casa del Bosque por detrás, vista entre los árboles', 'Skogshuset bakifrån, sett genom träden', 'Metsätalo takaa, puiden lomasta nähtynä', 'Meža māja no aizmugures, skatā caur kokiem'],
  ['saun-ja-tiigimaja', 'Saun ja tiigimaja tiigi ääres', 'The sauna and the Pond House at the water', 'Сауна и Прудовой дом у воды', 'Die Sauna und das Teichhaus am Wasser', 'La sauna y la Casa del Estanque junto al agua', 'Bastun och Dammhuset vid vattnet', 'Sauna ja Lampitalo veden äärellä', 'Pirts un Dīķa māja pie ūdens'],
  ['saunamaja-ja-peamaja', 'Saunamaja ja peamaja üle muru', 'The Sauna House and main house across the lawn', 'Банный дом и главный дом за газоном', 'Das Saunahaus und das Haupthaus über die Wiese hinweg', 'La casa de la sauna y la casa principal al otro lado del césped', 'Bastuhuset och huvudbyggnaden bortom gräsmattan', 'Saunatalo ja päärakennus nurmikon takana', 'Pirts māja un galvenā māja aiz zāliena'],
  ['peamaja', 'Peamaja roogkatuse ja palkseintega', 'The main house with its thatched roof and log walls', 'Главный дом с камышовой крышей и бревенчатыми стенами', 'Das Haupthaus mit Reetdach und Blockwänden', 'La casa principal con su tejado de junco y paredes de troncos', 'Huvudbyggnaden med vasstak och timmerväggar', 'Päärakennus, ruokokatto ja hirsiseinät', 'Galvenā māja ar niedru jumtu un baļķu sienām'],
  ['muru-ja-majad', 'Niidetud muru majade vahel suvepäeval', 'Mown lawn between the houses on a summer day', 'Подстриженный газон между домами летним днём', 'Gemähte Wiese zwischen den Häusern an einem Sommertag', 'Césped segado entre las casas en un día de verano', 'Klippt gräsmatta mellan husen en sommardag', 'Leikattu nurmikko talojen välissä kesäpäivänä', 'Nopļauts zāliens starp mājām vasaras dienā'],
  ['kasvuhoone-valikook', 'Kasvuhoone ja väliköök aias', 'The greenhouse and outdoor kitchen in the garden', 'Теплица и летняя кухня в саду', 'Das Gewächshaus und die Außenküche im Garten', 'El invernadero y la cocina exterior en el jardín', 'Växthuset och uteköket i trädgården', 'Kasvihuone ja ulkokeittiö puutarhassa', 'Siltumnīca un āra virtuve dārzā'],
  ['valikook-istumine', 'Tume puidust laud ja pingid paekivisel terrassil, kuused ja kasvuhoone taga', 'A dark timber table and benches on the flagstone terrace, spruces and the greenhouse beyond', 'Тёмный деревянный стол и скамьи на каменной террасе, ели и теплица позади', 'Ein dunkler Holztisch mit Bänken auf der Steinterrasse, dahinter Fichten und das Gewächshaus', 'Una mesa de madera oscura y bancos en la terraza de losas de piedra, con abetos y el invernadero al fondo', 'Ett mörkt träbord med bänkar på stenterrassen, granar och växthuset bortom', 'Tumma puupöytä ja penkit kivilaattaterassilla, taempana kuusia ja kasvihuone', 'Tumšs koka galds un soli uz akmens plākšņu terases, tālāk egles un siltumnīca'],
  ['valikook', 'Pikk puidust laud väliköögi katuse all, muru ja maja taga', 'The long timber table under the outdoor kitchen roof, lawn and house beyond', 'Длинный деревянный стол под крышей летней кухни, газон и дом позади', 'Die lange Holztafel unter dem Dach der Außenküche, dahinter Wiese und Haus', 'La larga mesa de madera bajo el tejado de la cocina exterior, con el césped y la casa al fondo', 'Det långa träbordet under utekökets tak, gräsmatta och hus bortom', 'Pitkä puupöytä ulkokeittiön katoksen alla, taempana nurmikko ja talo', 'Garais koka galds zem āra virtuves jumta, tālāk zāliens un māja'],
  ['kokteil', 'Kokteiliklaas tiigi kohal õhtupäikeses', 'A cocktail glass held above the pond in evening light', 'Бокал коктейля над прудом в вечернем свете', 'Ein Cocktailglas über dem Teich im Abendlicht', 'Una copa de cóctel sostenida sobre el estanque con la luz de la tarde', 'Ett cocktailglas som hålls upp över dammen i kvällsljuset', 'Cocktaillasi kohotettuna lammen ylle illan valossa', 'Kokteiļa glāze, pacelta virs dīķa vakara gaismā'],
  ['lilled', 'Lillad petuuniad puidust istutuskastis terrassil', 'Purple petunias in a timber planter on the deck', 'Фиолетовые петунии в деревянном ящике на террасе', 'Violette Petunien in einem Holzkasten auf der Terrasse', 'Petunias moradas en una jardinera de madera en la terraza', 'Lila petunior i en planteringslåda av trä på däcket', 'Violetteja petunioita puisessa kukkalaatikossa terassilla', 'Violetas petūnijas koka puķu kastē uz terases'],
  ['istumine-taevas', 'Välisistumisala avara sinise taeva all', 'The outdoor seating area under a wide blue sky', 'Зона отдыха под широким синим небом', 'Der Sitzplatz im Freien unter weitem blauem Himmel', 'La zona de asientos al aire libre bajo un amplio cielo azul', 'Sittplatsen utomhus under en vid blå himmel', 'Ulkoistuinalue laajan sinisen taivaan alla', 'Āra sēdvieta zem plašām zilām debesīm'],
]

/**
 * One-offs, newest first. Anything added singly lands here rather than growing one of
 * the dated batches below, so the front of the gallery stays the most recent work.
 */
const RAW_LATEST: A[] = [
  ['metsamaja-paikeses', 'Metsamaja päikesepaistel kaskede ja kuuskede vahel', 'The Forest House in sunshine between birch and spruce', 'Лесной дом в солнечный день среди берёз и елей', 'Das Waldhaus in der Sonne zwischen Birken und Fichten', 'La Casa del Bosque al sol entre abedules y abetos', 'Skogshuset i solsken mellan björkar och granar', 'Metsätalo auringonpaisteessa koivujen ja kuusien välissä', 'Meža māja saulē starp bērziem un eglēm'],
  ['metsamaja/sissepaas', 'Metsamaja sissepääs puitterrassi ja sildiga', 'The Forest House entrance with its timber deck and sign', 'Вход в Лесной дом с деревянной террасой и вывеской', 'Der Eingang des Waldhauses mit Holzterrasse und Schild', 'La entrada de la Casa del Bosque con su terraza de madera y su cartel', 'Skogshusets entré med trädäck och skylt', 'Metsätalon sisäänkäynti, puuterassi ja kyltti', 'Meža mājas ieeja ar koka terasi un uzrakstu'],
  ['metsamaja/elutuba-lai', 'Avar elutuba: türkiissinised tugitoolid, diivan lambanahkadega, rippkiik ja suured aknad', 'The open living room — teal armchairs, a sofa under sheepskins, the hanging chair and tall windows', 'Просторная гостиная — бирюзовые кресла, диван с овчинами, подвесное кресло и большие окна', 'Der offene Wohnraum – petrolfarbene Sessel, ein Sofa mit Schaffellen, der Hängesessel und hohe Fenster', 'El salón diáfano: butacas verde azulado, un sofá con pieles de oveja, la silla colgante y ventanas altas', 'Det öppna vardagsrummet — blågröna fåtöljer, en soffa med fårskinn, hängstolen och höga fönster', 'Avara olohuone — sinivihreät nojatuolit, sohva lampaantaljoineen, riipputuoli ja korkeat ikkunat', 'Plašā dzīvojamā istaba — zilganzaļi atzveltnes krēsli, dīvāns ar aitādām, piekaramais krēsls un augsti logi'],
  ['metsamaja/rippkiik-aken', 'Rippkiik akende all, uks magamistuppa lahti', 'The hanging chair by the windows, the bedroom door open', 'Подвесное кресло у окон, дверь в спальню открыта', 'Der Hängesessel an den Fenstern, die Schlafzimmertür offen', 'La silla colgante junto a las ventanas, con la puerta del dormitorio abierta', 'Hängstolen vid fönstren, dörren till sovrummet öppen', 'Riipputuoli ikkunoiden vieressä, makuuhuoneen ovi auki', 'Piekaramais krēsls pie logiem, guļamistabas durvis vaļā'],
  ['metsamaja/magamistuba-hele', 'Magamistuba palklae all, hele voodipesu ja kaks patja', 'A bedroom under the log ceiling, pale bedding and two pillows', 'Спальня под бревенчатым потолком, светлое бельё и две подушки', 'Ein Schlafzimmer unter der Balkendecke, helle Bettwäsche und zwei Kissen', 'Un dormitorio bajo el techo de troncos, ropa de cama clara y dos almohadas', 'Ett sovrum under timmertaket, ljusa sängkläder och två kuddar', 'Makuuhuone hirsikaton alla, vaaleat vuodevaatteet ja kaksi tyynyä', 'Guļamistaba zem baļķu griestiem, gaiša gultasveļa un divi spilveni'],
  ['metsamaja/magamistuba-lambanahk', 'Magamistuba halli voodipesu ja lambanahast vaibaga', 'A bedroom with grey bedding and a sheepskin rug', 'Спальня с серым бельём и ковриком из овчины', 'Ein Schlafzimmer mit grauer Bettwäsche und einem Schaffell', 'Un dormitorio con ropa de cama gris y una alfombra de piel de oveja', 'Ett sovrum med grå sängkläder och en fårskinnsfäll', 'Makuuhuone, harmaat vuodevaatteet ja lampaantaljamatto', 'Guļamistaba ar pelēku gultasveļu un aitādas paklāju'],
  ['metsamaja/magamistuba-uks', 'Magamistoast vaade läbi ukse valgesse elutuppa', 'From the bedroom through the door into the bright living room', 'Вид из спальни через дверь в светлую гостиную', 'Vom Schlafzimmer durch die Tür in den hellen Wohnraum', 'Desde el dormitorio, a través de la puerta, hacia el luminoso salón', 'Från sovrummet genom dörren in i det ljusa vardagsrummet', 'Makuuhuoneesta oven läpi valoisaan olohuoneeseen', 'No guļamistabas caur durvīm uz gaišo dzīvojamo istabu'],
  ['metsamaja/dush', 'Vannituba dušikardina, WC ja valamuga', 'The bathroom with shower curtain, toilet and basin', 'Ванная с душевой шторой, унитазом и раковиной', 'Das Bad mit Duschvorhang, WC und Waschbecken', 'El baño con cortina de ducha, inodoro y lavabo', 'Badrummet med duschdraperi, toalett och handfat', 'Kylpyhuone, suihkuverho, wc-istuin ja pesuallas', 'Vannas istaba ar dušas aizkaru, tualeti un izlietni'],
  ['saunamaja/jaaauk-talvel.webp', 'Jääauk tiigis saunamaja ees pakasepäeval, käsipuu vette', 'An ice hole cut in the pond before the Sauna House on a frozen day, a handrail leading in', 'Прорубь в пруду перед Банным домом в мороз, поручень к воде', 'Ein Eisloch im Teich vor dem Saunahaus an einem Frosttag, ein Handlauf führt hinein', 'Un agujero abierto en el hielo del estanque frente a la Casa de la Sauna en un día helado, con un pasamanos que baja al agua', 'En isvak upphuggen i dammen framför Bastuhuset en frostig dag, en ledstång leder ner i vattnet', 'Avanto lammessa saunatalon edessä pakkaspäivänä, kaide johtaa veteen', 'Āliņģis dīķī pie Pirts mājas aukstā ziemas dienā, ūdenī ved margas'],
]

/**
 * The table, added 28 Aug 2026. Same shape; the name carries the `toit/` folder.
 *
 * These also run as the ribbon under the food cards, and the two card photographs are
 * here too — unlike the house interiors, which were pulled OUT of this gallery, food is
 * not about one building. It is the property, which is what this gallery is for.
 */
const RAW_TOIT: A[] = [
  ['toit/buffet-perenaine', 'Perenaine kaetud puhvetilaua taga väliköögis, koogid ja marjadesserdid ees', 'The host behind the laid buffet in the outdoor kitchen, cakes and berry desserts to the front', 'Хозяйка за накрытым столом в летней кухне, торты и ягодные десерты на переднем плане', 'Die Gastgeberin hinter dem gedeckten Buffet in der Außenküche, Kuchen und Beerendesserts im Vordergrund', 'La anfitriona tras el bufé servido en la cocina exterior, con tartas y postres de frutos rojos delante', 'Värdinnan bakom den dukade buffén i uteköket, tårtor och bärdesserter längst fram', 'Emäntä katetun noutopöydän takana ulkokeittiössä, edessä kakkuja ja marjajälkiruokia', 'Saimniece aiz klātā bufetes galda āra virtuvē, priekšā kūkas un ogu deserti'],
  ['toit/pidulik-pikk-laud', 'Küünlavalgel pikk laud messingist salvrätirõngaste ja jasmiinikimpudega', 'The long table by candlelight, with brass napkin rings and jars of jasmine', 'Длинный стол при свечах, латунные кольца для салфеток и букеты жасмина', 'Die lange Tafel bei Kerzenschein, mit Serviettenringen aus Messing und Gläsern voll Jasmin', 'La larga mesa a la luz de las velas, con servilleteros de latón y tarros de jazmín', 'Det långa bordet i levande ljus, med servettringar i mässing och burkar med jasmin', 'Pitkä pöytä kynttilänvalossa, messinkiset lautasliinarenkaat ja jasmiinia purkeissa', 'Garais galds sveču gaismā ar misiņa salvešu gredzeniem un jasmīnu burciņās'],
  ['toit/marjadesserdid', 'Marjadesserdid klaasides puidust kandikul, metsalilled ja kuusk taga', 'Berry desserts in coupe glasses on a wooden tray, wildflowers and spruce behind', 'Ягодные десерты в креманках на деревянном подносе, полевые цветы и ели позади', 'Beerendesserts in Schalengläsern auf einem Holztablett, dahinter Wiesenblumen und Fichten', 'Postres de frutos rojos en copas sobre una bandeja de madera, con flores silvestres y abetos detrás', 'Bärdesserter i coupeglas på en träbricka, vilda blommor och gran bakom', 'Marjajälkiruokia coupe-laseissa puutarjottimella, takana luonnonkukkia ja kuusi', 'Ogu deserti kupveida glāzēs uz koka paplātes, aizmugurē meža ziedi un egle'],
  ['toit/valikook-ohtul', 'Väliköök hämaras, suitsevad tulealused murul', 'The outdoor kitchen at dusk, fire bowls smoking on the lawn', 'Летняя кухня в сумерках, дымящиеся жаровни на газоне', 'Die Außenküche in der Dämmerung, Feuerschalen rauchen auf der Wiese', 'La cocina exterior al anochecer, con braseros humeando en el césped', 'Uteköket i skymningen, eldskålar som ryker på gräsmattan', 'Ulkokeittiö hämärässä, tulimaljat savuavat nurmikolla', 'Āra virtuve krēslā, zālienā kūp ugunskuru bļodas'],
  ['toit/talvine-suupistelaud', 'Talvine suupistelaud juustu ja oliividega, lumi klaasuste taga', 'A winter spread of cheese and olives, snow beyond the glass doors', 'Зимний стол с сыром и оливками, снег за стеклянными дверями', 'Eine winterliche Tafel mit Käse und Oliven, hinter der Glastür der Schnee', 'Una mesa invernal de queso y aceitunas, con nieve tras las puertas de cristal', 'Ett vinterbord med ost och oliver, snö utanför glasdörrarna', 'Talvinen juusto- ja oliivitarjoilu, lunta lasiovien takana', 'Ziemas uzkodu galds ar sieru un olīvām, aiz stikla durvīm sniegs'],
  ['toit/roheline-laud', 'Roheliselt kaetud laud kiviterrassil, kristall ja vahuvein', 'The table laid in green on the stone terrace, crystal and sparkling wine', 'Стол, сервированный в зелёных тонах на каменной террасе, хрусталь и игристое', 'Die Tafel in Grün gedeckt auf der Steinterrasse, Kristall und Schaumwein', 'La mesa vestida de verde en la terraza de piedra, con cristal y vino espumoso', 'Bordet dukat i grönt på stenterrassen, kristall och mousserande vin', 'Vihreäksi katettu pöytä kiviterassilla, kristallia ja kuohuviiniä', 'Zaļos toņos klāts galds uz akmens terases, kristāls un dzirkstošais vīns'],
  ['toit/tee-lumes', 'Aurav klaas teed sepistatud laual lumes', 'A steaming glass of tea on a wrought-iron table in the snow', 'Дымящийся стакан чая на кованом столе в снегу', 'Ein dampfendes Glas Tee auf einem schmiedeeisernen Tisch im Schnee', 'Un vaso de té humeante sobre una mesa de hierro forjado en la nieve', 'Ett ångande glas te på ett smidesjärnsbord i snön', 'Höyryävä teelasi takorautapöydällä lumessa', 'Kūpoša tējas glāze uz kalta dzelzs galdiņa sniegā'],
  ['toit/pergolalaud', 'Kaetud laud kuuele pergola all, mets kardinate taga', 'A table laid for six under the pergola, forest behind the curtains', 'Стол на шестерых под перголой, лес за занавесями', 'Ein für sechs gedeckter Tisch unter der Pergola, hinter den Vorhängen der Wald', 'Una mesa puesta para seis bajo la pérgola, con el bosque tras las cortinas', 'Ett bord dukat för sex under pergolan, skog bakom gardinerna', 'Kuudelle katettu pöytä pergolan alla, metsä verhojen takana', 'Sešiem klāts galds zem pergolas, aiz aizkariem mežs'],
  ['toit/viinamarjad-ja-klaasid', 'Viinamarjad, maasikad ja oliivid vaagnal, šampanjaklaasid ja küünlajalg', 'Grapes, strawberries and olives on trays, champagne flutes and a brass candelabra', 'Виноград, клубника и оливки на подносах, бокалы и бронзовый канделябр', 'Trauben, Erdbeeren und Oliven auf Tabletts, Sektgläser und ein Messingleuchter', 'Uvas, fresas y aceitunas en bandejas, copas de champán y un candelabro de latón', 'Vindruvor, jordgubbar och oliver på fat, champagneglas och en kandelaber i mässing', 'Viinirypäleitä, mansikoita ja oliiveja tarjottimilla, samppanjalaseja ja messinkinen kynttelikkö', 'Vīnogas, zemenes un olīvas uz paplātēm, šampanieša glāzes un misiņa svečturis'],
  ['toit/roosa-vein', 'Roosa vein kullatud jahutuskausis terrassil, roogkatusega maja taga', 'Rosé cooling in a gilded bowl on the deck, the thatched house beyond', 'Розовое вино в золочёной чаше на террасе, дом с камышовой крышей позади', 'Rosé kühlt in einer vergoldeten Schale auf der Terrasse, dahinter das reetgedeckte Haus', 'Vino rosado enfriándose en un cuenco dorado en la terraza, con la casa de tejado de junco al fondo', 'Rosévin som kyls i en förgylld skål på däcket, det vasstäckta huset bortom', 'Roséviini jäähtyy kullatussa maljassa terassilla, taempana ruokokattoinen talo', 'Rozā vīns atdziest zeltītā traukā uz terases, tālāk māja ar niedru jumtu'],
  ['toit/kuldne-laudlina', 'Kuldne laudlina, roosid, põlev küünal ja pakitud kingitus', 'A gold damask cloth with roses, a lit candle and a wrapped gift', 'Золотая скатерть, розы, зажжённая свеча и упакованный подарок', 'Eine Tischdecke aus Golddamast mit Rosen, einer brennenden Kerze und einem eingepackten Geschenk', 'Un mantel de damasco dorado con rosas, una vela encendida y un regalo envuelto', 'En guldfärgad damastduk med rosor, ett tänt ljus och en inslagen present', 'Kultainen damastiliina, ruusuja, palava kynttilä ja paketoitu lahja', 'Zelta damasta galdauts ar rozēm, degoša svece un iesaiņota dāvana'],
  ['toit/laud-tiigi-aares', 'Juustu- ja vorstivaagen tiigi ääres kevadpäikeses', 'A board of cheese and cured meats by the pond in spring sun', 'Доска с сыром и мясными закусками у пруда на весеннем солнце', 'Eine Platte mit Käse und Aufschnitt am Teich in der Frühlingssonne', 'Una tabla de quesos y embutidos junto al estanque bajo el sol de primavera', 'En bricka med ost och charkuterier vid dammen i vårsolen', 'Juusto- ja leikkelelauta lammen rannalla kevätauringossa', 'Siera un kūpinājumu dēlītis pie dīķa pavasara saulē'],
  ['toit/klaasid-ja-lilled', 'Kaks klaasi tõstetud suure lillekimbu kõrval, lumi akna taga', 'Two glasses raised beside a tall arrangement of flowers, snow through the window', 'Два бокала подняты у большого букета, снег за окном', 'Zwei erhobene Gläser neben einem hohen Blumenarrangement, durch das Fenster der Schnee', 'Dos copas alzadas junto a un alto arreglo floral, con nieve tras la ventana', 'Två glas som höjs bredvid ett högt blomsterarrangemang, snö utanför fönstret', 'Kaksi kohotettua lasia korkean kukka-asetelman vieressä, lunta ikkunan takana', 'Divas paceltas glāzes pie augsta ziedu pušķa, aiz loga sniegs'],
]

/**
 * `.jpeg` is assumed, because all but a handful of these are. Give the name its own
 * extension — 'saunamaja/jaaauk-talvel.webp' — and that wins instead. Without this a
 * .webp entry silently became a 404 pointing at a .jpeg that was never there.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [...RAW_LATEST, ...RAW_TOIT, ...RAW_2026, ...RAW].map(([n, et, en, ru, de, es, sv, fi, lv]) => ({
  src: `/galerii/${n.includes('.') ? n : `${n}.jpeg`}`,
  alt: { et, en, ru, de, es, sv, fi, lv },
}))

export const ALL_PHOTOS: GalleryPhoto[] = [...HOUSE_PHOTOS, ...GALLERY_PHOTOS]

/* ───────────── Sections (Mikk, 29 Oct: "make it more systemised") ───────────── */


export type GallerySectionId =
  | 'saunamaja' | 'tiigimaja' | 'metsamaja' | 'valikook' | 'toit' | 'loodus' | 'ou'

export type GallerySection = {
  id: GallerySectionId
  label: Record<Lang, string>
  photos: GalleryPhoto[]
}

const SECTION_LABELS: Record<GallerySectionId, Record<Lang, string>> = {
  saunamaja: HOUSE_PHOTOS[0].label!,
  tiigimaja: HOUSE_PHOTOS[1].label!,
  metsamaja: HOUSE_PHOTOS[2].label!,
  valikook: { et: 'Väliköök ja lava', en: 'Outdoor kitchen & stage', ru: 'Летняя кухня и сцена', de: 'Außenküche & Bühne', es: 'Cocina exterior y escenario', sv: 'Utekök & scen', fi: 'Ulkokeittiö ja lava', lv: 'Āra virtuve un skatuve' },
  toit: { et: 'Toit', en: 'Food', ru: 'Еда', de: 'Essen', es: 'Comida', sv: 'Mat', fi: 'Ruoka', lv: 'Ēdiens' },
  loodus: { et: 'Loodus', en: 'Nature', ru: 'Природа', de: 'Natur', es: 'Naturaleza', sv: 'Naturen', fi: 'Luonto', lv: 'Daba' },
  ou: { et: 'Õu ja teised hooned', en: 'The grounds & other buildings', ru: 'Усадьба и другие постройки', de: 'Das Gelände & weitere Gebäude', es: 'La finca y otros edificios', sv: 'Gården & övriga byggnader', fi: 'Piha ja muut rakennukset', lv: 'Sēta un citas ēkas' },
}

/**
 * Which section each gallery photograph belongs to — decided by looking at every frame,
 * not from the file names (they were shifted once before; see feedback_trust_the_image).
 * The round thatched house by the pond is the Sauna House; the glass-walled one the Pond
 * House; the long log house with the OANDUAIA sign the main house, which is not rented
 * and so sits under the grounds. A photo missing here falls into the grounds.
 */
const SECTION_OF: Record<string, GallerySectionId> = {
  '033': 'ou', '034': 'loodus', '035': 'ou', '036': 'loodus', '038': 'loodus', '039': 'ou',
  '040': 'ou', '041': 'saunamaja', '042': 'loodus', '043': 'loodus', '044': 'valikook',
  '045': 'ou', '046': 'loodus', '047': 'loodus', '048': 'loodus', '051': 'saunamaja',
  '052': 'ou', '053': 'ou', '054': 'loodus', '055': 'ou', '056': 'loodus', '057': 'ou',
  '058': 'saunamaja', '059': 'loodus', '060': 'loodus', '061': 'loodus', '062': 'tiigimaja',
  '063': 'toit', '064': 'ou', '065': 'toit', '066': 'toit', '067': 'toit', '068': 'tiigimaja',
  '069': 'toit', '070': 'tiigimaja', '071': 'tiigimaja', '072': 'metsamaja', '073': 'loodus',
  '074': 'ou', '075': 'tiigimaja', '076': 'tiigimaja', '077': 'tiigimaja', '078': 'tiigimaja',
  '079': 'tiigimaja', '080': 'loodus', '081': 'saunamaja', '082': 'tiigimaja', '083': 'loodus',
  '086': 'loodus', '087': 'saunamaja', '088': 'loodus', '089': 'toit', '090': 'loodus',
  '091': 'loodus', '092': 'loodus', '093': 'loodus', '094': 'loodus',
  'kolm-hoonet': 'ou', 'peamajast-ulevalt': 'ou', 'kiigud': 'tiigimaja',
  'saunamaja-veepealt': 'saunamaja', 'oja': 'loodus', 'peamaja-eeshoov': 'ou',
  'paadiaer': 'loodus', 'tiigimaja-veepealt': 'tiigimaja', 'metsarada': 'loodus',
  'ilus-tiik': 'loodus', 'puu-ja-majad': 'ou', 'kivid-ja-tiik': 'ou', 'tiik-selge-vesi': 'loodus',
  'ait-ja-saun': 'ou', 'metsamaja-kaugelt': 'metsamaja', 'metsamaja-tagant': 'metsamaja',
  'saun-ja-tiigimaja': 'ou', 'saunamaja-ja-peamaja': 'ou', 'peamaja': 'ou', 'muru-ja-majad': 'ou',
  'kasvuhoone-valikook': 'valikook', 'valikook-istumine': 'valikook', 'valikook': 'valikook',
  'kokteil': 'toit', 'lilled': 'ou', 'istumine-taevas': 'valikook',
  'metsamaja-paikeses': 'metsamaja', 'toit/valikook-ohtul': 'valikook',
  'saunamaja/jaaauk-talvel.webp': 'saunamaja',
}

const ORDER: GallerySectionId[] = ['saunamaja', 'tiigimaja', 'metsamaja', 'valikook', 'toit', 'loodus', 'ou']

function sectionOf(raw: string): GallerySectionId {
  if (SECTION_OF[raw]) return SECTION_OF[raw]
  if (raw.startsWith('metsamaja/')) return 'metsamaja'
  if (raw.startsWith('saunamaja/')) return 'saunamaja'
  if (raw.startsWith('tiigimaja/')) return 'tiigimaja'
  if (raw.startsWith('toit/')) return 'toit'
  return 'ou'
}

const RAW_ALL = [...RAW_LATEST, ...RAW_TOIT, ...RAW_2026, ...RAW]

/**
 * Look-alikes left out of the gallery, the weaker of each pair (Mikk, 29 Oct: "if there
 * are similar pictures, leave the better one"). Chosen side by side, by eye; the file
 * that stays is named after each. Only the gallery skips them — strips and house pages
 * that use one keep it.
 */
const GALLERY_SKIP = new Set([
  '/galerii/036.jpeg',                 // 043, the same jetty, wider and sharper
  '/galerii/060.jpeg',                 // 059, the same dusk pond, more sky
  '/galerii/063.jpeg',                 // 065, the same place setting, brighter
  '/galerii/067.jpeg',                 // 066, the same floral table
  '/galerii/istumine-taevas.jpeg',     // valikook-istumine, the same seats
  '/galerii/045.jpeg',                 // 055, the same roses and houses
  '/galerii/068.jpeg',                 // 076, the Pond House front, brighter
  '/galerii/078.jpeg',                 // tiigimaja/elutuba-kamin-tiik, same corner in autumn light
  '/galerii/075.jpeg',                 // tiigimaja/vannituba
  '/galerii/079.jpeg',                 // tiigimaja/vannituba, near-identical frame
  '/galerii/041.jpeg',                 // saunamaja-veepealt, the Sauna House over the pond
  '/galerii/088.jpeg',                 // metsarada, the same forest path
  '/galerii/lilled.jpeg',              // saunamaja-ja-peamaja, the same petunias
  '/images/metsamaja.jpg',             // metsamaja-paikeses, the Forest House in sun
  '/galerii/tiigimaja/magamistuba.jpeg', // tiigimaja/magamistuba-sugisel, same bed, newer
])

/**
 * The gallery in sections. A house section is its cover, then the photographs from its
 * own page (lib/housePhotos.ts), then any general photograph of it not already there —
 * each picture once, wherever it was listed first.
 */
export const GALLERY_SECTIONS: GallerySection[] = ORDER.map(id => {
  const seen = new Set<string>()
  const photos: GalleryPhoto[] = []
  const add = (p: GalleryPhoto) => { if (!seen.has(p.src) && !GALLERY_SKIP.has(p.src)) { seen.add(p.src); photos.push(p) } }
  const cover = HOUSE_PHOTOS.find(h => h.id === id)
  if (cover) add({ src: cover.src, alt: cover.alt })
  if (id === 'saunamaja' || id === 'tiigimaja' || id === 'metsamaja') {
    for (const p of HOUSE_GALLERIES[id] ?? []) add({ src: p.src, alt: p.alt })
  }
  RAW_ALL.forEach(([n], i) => { if (sectionOf(n) === id) add(GALLERY_PHOTOS[i]) })
  return { id, label: SECTION_LABELS[id], photos }
})
