import type { Lang } from './translations'
import type { HouseSlug } from './availability'

/**
 * Photographs belonging to one house, shown on that house's own page.
 *
 * Separate from `lib/gallery.ts`, which is the whole-property gallery and is not grouped
 * by house. A photograph here says something about the house you are reading about; the
 * gallery says something about the place.
 *
 * Alt text describes what is actually in the frame, in each language — it is read aloud
 * and indexed by image search, and "Saunamaja 3" is worth nothing to either.
 */
export type HousePhoto = {
  src: string
  alt: Record<Lang, string>
}

export const HOUSE_GALLERIES: Partial<Record<HouseSlug, HousePhoto[]>> = {
  saunamaja: [
    {
      src: '/galerii/saunamaja/ohtuvalgus.jpeg',
      alt: {
        et: 'Saunamaja sügisõhtul, aknad valgustatud ja roogkatus samblane',
        en: 'The Sauna House on an autumn evening, windows lit and the thatch gone mossy',
        ru: 'Банный дом осенним вечером, свет в окнах и мох на камышовой крыше',
        de: 'Das Saunahaus an einem Herbstabend, die Fenster erleuchtet und das Reetdach bemoost',
        es: 'La Casa de la Sauna en una tarde de otoño, con las ventanas iluminadas y el tejado de junco cubierto de musgo',
        sv: 'Bastuhuset en höstkväll, fönstren tända och vasstaket mossbevuxet',
        fi: 'Saunatalo syysiltana, ikkunoissa valo ja ruokokatto sammaloitunut',
        lv: 'Pirts māja rudens vakarā, logi izgaismoti un niedru jumts apsūnojis',
      },
    },
    {
      src: '/galerii/saunamaja/jaaauk-talvel.webp',
      alt: {
        et: 'Jääauk tiigis saunamaja ees pakasepäeval, käsipuu vette',
        en: 'An ice hole cut in the pond before the sauna house on a frozen day, a handrail leading in',
        ru: 'Прорубь в пруду перед банным домом в мороз, поручень к воде',
        de: 'Ein Eisloch im Teich vor dem Saunahaus an einem Frosttag, ein Handlauf führt hinein',
        es: 'Un agujero abierto en el hielo del estanque frente a la casa de la sauna en un día helado, con un pasamanos que baja al agua',
        sv: 'En isvak upphuggen i dammen framför bastuhuset en frostig dag, en ledstång leder ner i vattnet',
        fi: 'Avanto lammessa saunatalon edessä pakkaspäivänä, kaide johtaa veteen',
        lv: 'Āliņģis dīķī pie pirts mājas aukstā ziemas dienā, ūdenī ved margas',
      },
    },
    {
      src: '/galerii/saunamaja/elutuba-ohtuvalgus.jpeg',
      alt: {
        et: 'Elutuba õhtuvalguses: nurgadiivan lambanahkadega, ümar kivilaud lehmanahast vaibal ja aknad muruplatsile',
        en: 'The living room in evening light: a corner sofa with sheepskins, a round stone table on a cowhide rug and windows onto the lawn',
        ru: 'Гостиная в вечернем свете: угловой диван с овчинами, круглый каменный стол на коровьей шкуре и окна на лужайку',
        de: 'Der Wohnraum im Abendlicht: ein Ecksofa mit Schaffellen, ein runder Steintisch auf einem Kuhfell und Fenster zum Rasen',
        es: 'El salón con la luz de la tarde: un sofá rinconero con pieles de oveja, una mesa redonda de piedra sobre una piel de vaca y ventanas al césped',
        sv: 'Vardagsrummet i kvällsljus: en hörnsoffa med fårskinn, ett runt stenbord på en kohudsmatta och fönster mot gräsmattan',
        fi: 'Olohuone iltavalossa: kulmasohva lampaantaljoineen, pyöreä kivipöytä lehmäntaljamatolla ja ikkunat nurmikolle',
        lv: 'Dzīvojamā istaba vakara gaismā: stūra dīvāns ar aitādām, apaļš akmens galds uz govs ādas paklāja un logi uz zālienu',
      },
    },
    {
      src: '/galerii/saunamaja/kiiktool.jpeg',
      alt: {
        et: 'Käsitsi tehtud puidust kiiktool lambanahaga akna all, kõrval jukka ja raamaturiiul',
        en: 'A handmade wooden rocking chair with a sheepskin by the window, a yucca and a bookshelf beside it',
        ru: 'Деревянное кресло-качалка ручной работы с овчиной у окна, рядом юкка и книжная полка',
        de: 'Ein handgefertigter Schaukelstuhl aus Holz mit Schaffell am Fenster, daneben eine Yucca und ein Bücherregal',
        es: 'Una mecedora de madera hecha a mano con una piel de oveja junto a la ventana, al lado una yuca y una estantería',
        sv: 'En handgjord gungstol i trä med fårskinn vid fönstret, bredvid en yucca och en bokhylla',
        fi: 'Käsin tehty puinen keinutuoli lampaantaljalla ikkunan ääressä, vieressä jukka ja kirjahylly',
        lv: 'Ar rokām darināts koka šūpuļkrēsls ar aitādu pie loga, blakus jukas palma un grāmatu plaukts',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar.jpeg',
      alt: {
        et: 'Köögisaar telliskivijalal, puuküttega pliit ja rippuvad kruusid palgi all',
        en: 'The kitchen island on a brick base, a wood-fired range and mugs hanging from the beam',
        ru: 'Кухонный остров на кирпичном основании, дровяная плита и кружки на балке',
        de: 'Die Kücheninsel auf gemauertem Sockel, ein Holzherd und Tassen, die am Balken hängen',
        es: 'La isla de cocina sobre una base de ladrillo, una cocina de leña y tazas colgadas de la viga',
        sv: 'Köksön på en sockel av tegel, en vedspis och muggar som hänger från bjälken',
        fi: 'Keittiösaareke tiilijalustalla, puuhella ja palkista roikkuvat mukit',
        lv: 'Virtuves sala uz ķieģeļu pamatnes, malkas plīts un krūzes, kas karājas pie sijas',
      },
    },
    {
      src: '/galerii/saunamaja/pesuruum-peegel.jpeg',
      alt: {
        et: 'Pesuruum palkseinte vahel: puitraamis peegel, valgustatud kapp ingliga ja kiviplaatidest põrand, paremal saunauks',
        en: 'The washroom between log walls: a wood-framed mirror, a lit cabinet with an angel and a stone-tiled floor, the sauna door to the right',
        ru: 'Умывальная между бревенчатыми стенами: зеркало в деревянной раме, подсвеченный шкафчик с ангелом и пол из каменной плитки, справа дверь в сауну',
        de: 'Der Waschraum zwischen Blockwänden: ein Spiegel im Holzrahmen, ein beleuchtetes Schränkchen mit Engel und ein Steinfliesenboden, rechts die Saunatür',
        es: 'El aseo entre paredes de troncos: un espejo con marco de madera, un mueble iluminado con un angelito y suelo de baldosas de piedra, a la derecha la puerta de la sauna',
        sv: 'Tvättrummet mellan timmerväggar: en spegel i träram, ett upplyst skåp med en ängel och stenklinker på golvet, till höger bastudörren',
        fi: 'Pesuhuone hirsiseinien välissä: puukehyksinen peili, valaistu kaappi enkelipatsaineen ja kivilaattalattia, oikealla saunan ovi',
        lv: 'Mazgāšanās telpa starp baļķu sienām: spogulis koka rāmī, izgaismots skapītis ar eņģelīti un akmens flīžu grīda, pa labi pirts durvis',
      },
    },
    {
      src: '/galerii/saunamaja/vahuvein.jpeg',
      alt: {
        et: 'Vahuvein ja marjad kristallklaaside kõrval graniitlaual',
        en: 'Sparkling wine and berries beside crystal glasses on the granite table',
        ru: 'Игристое вино и ягоды рядом с хрустальными бокалами на гранитном столе',
        de: 'Schaumwein und Beeren neben Kristallgläsern auf dem Granittisch',
        es: 'Vino espumoso y frutos rojos junto a copas de cristal sobre la mesa de granito',
        sv: 'Mousserande vin och bär bredvid kristallglas på granitbordet',
        fi: 'Kuohuviiniä ja marjoja kristallilasien vieressä graniittipöydällä',
        lv: 'Dzirkstošais vīns un ogas līdzās kristāla glāzēm uz granīta galda',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar-ja-elutuba.jpeg',
      alt: {
        et: 'Köögisaar ja elutuba ühes ruumis hämaras, potiraam ja kruusid palgi all',
        en: 'The kitchen island and the living room in one space at dusk, pots and mugs hung from the beam',
        ru: 'Кухонный остров и гостиная в одном пространстве в сумерках, посуда на балке',
        de: 'Kücheninsel und Wohnraum in einem Raum in der Dämmerung, Töpfe und Tassen am Balken',
        es: 'La isla de cocina y el salón en un mismo espacio al anochecer, ollas y tazas colgadas de la viga',
        sv: 'Köksön och vardagsrummet i ett och samma rum i skymningen, kastruller och muggar hängda från bjälken',
        fi: 'Keittiösaareke ja olohuone samassa tilassa hämärässä, kattilat ja mukit roikkuvat palkista',
        lv: 'Virtuves sala un dzīvojamā istaba vienā telpā krēslā, katli un krūzes piekārti pie sijas',
      },
    },
    {
      src: '/galerii/saunamaja/sepisrinnatis.jpeg',
      alt: {
        et: 'Sepistatud tammeokstega rõdupiire lae all, elutuba allpool',
        en: 'The forged oak-branch balustrade of the loft beneath the timber ceiling, the room below',
        ru: 'Кованое ограждение антресоли в виде дубовых ветвей под потолком, комната внизу',
        de: 'Das geschmiedete Eichenzweig-Geländer der Galerie unter der Holzdecke, darunter der Raum',
        es: 'La barandilla de forja con ramas de roble del altillo bajo el techo de madera, con la estancia debajo',
        sv: 'Loftets smidda räcke med ekgrenar under trätaket, rummet nedanför',
        fi: 'Parven taottu tammenoksakaide puukaton alla, huone alapuolella',
        lv: 'Antresola kaltās ozolzaru margas zem koka griestiem, istaba lejā',
      },
    },
    {
      src: '/galerii/saunamaja/vokk.jpeg',
      alt: {
        et: 'Vana vokk rõdu põrandal sepispiirde kõrval',
        en: 'An old spinning wheel on the loft floor beside the forged railing',
        ru: 'Старая прялка на полу антресоли рядом с кованым ограждением',
        de: 'Ein altes Spinnrad auf dem Galerieboden neben dem geschmiedeten Geländer',
        es: 'Una vieja rueca en el suelo del altillo junto a la barandilla de forja',
        sv: 'En gammal spinnrock på loftgolvet bredvid det smidda räcket',
        fi: 'Vanha rukki parven lattialla taotun kaiteen vieressä',
        lv: 'Vecs vērpjamais ratiņš uz antresola grīdas pie kaltajām margām',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar-ohtul.jpeg',
      alt: {
        et: 'Köögisaar õhtul, baaritoolid, merevaigukarva valgustid ja riidas küttepuud',
        en: 'The kitchen island in the evening with bar stools, amber pendant lights and stacked firewood',
        ru: 'Кухонный остров вечером — барные стулья, янтарные светильники и поленница',
        de: 'Die Kücheninsel am Abend mit Barhockern, bernsteinfarbenen Pendelleuchten und gestapeltem Brennholz',
        es: 'La isla de cocina por la tarde, con taburetes, lámparas colgantes ámbar y leña apilada',
        sv: 'Köksön på kvällen med barstolar, bärnstensfärgade taklampor och staplad ved',
        fi: 'Keittiösaareke illalla, baarijakkarat, meripihkanväriset riippuvalaisimet ja pinottuja polttopuita',
        lv: 'Virtuves sala vakarā ar bāra krēsliem, dzintarkrāsas piekaramām lampām un sakrautu malku',
      },
    },
    {
      src: '/galerii/saunamaja/elutoast-kooki.jpeg',
      alt: {
        et: 'Vaade diivanilt üle paeplaatide köögisaareni, tammelehtedega lühter lae all',
        en: 'The view from the sofa across the flagstones to the kitchen island, the oak-leaf chandelier overhead',
        ru: 'Вид с дивана через каменный пол на кухонный остров, люстра из дубовых листьев наверху',
        de: 'Der Blick vom Sofa über die Steinplatten zur Kücheninsel, darüber der Eichenlaub-Leuchter',
        es: 'La vista desde el sofá, sobre las losas de piedra, hacia la isla de cocina, con la lámpara de hojas de roble encima',
        sv: 'Utsikten från soffan över stenplattorna till köksön, ljuskronan med eklöv ovanför',
        fi: 'Näkymä sohvalta kivilaattojen yli keittiösaarekkeelle, tammenlehtikattokruunu yläpuolella',
        lv: 'Skats no dīvāna pāri akmens plāksnēm uz virtuves salu, augšā ozollapu lustra',
      },
    },
    {
      src: '/galerii/saunamaja/elutuba-luhter.jpeg',
      alt: {
        et: 'Elutuba tammelehtedega lühtri all, aknad kolmel seinal muru poole',
        en: 'The living room under the oak-leaf chandelier, windows on three sides onto the lawn',
        ru: 'Гостиная под люстрой из дубовых листьев, окна с трёх сторон на газон',
        de: 'Der Wohnraum unter dem Eichenlaub-Leuchter, nach drei Seiten Fenster zur Wiese',
        es: 'El salón bajo la lámpara de hojas de roble, con ventanas en tres lados que dan al césped',
        sv: 'Vardagsrummet under ljuskronan med eklöv, fönster åt tre håll mot gräsmattan',
        fi: 'Olohuone tammenlehtikattokruunun alla, ikkunat kolmella seinällä nurmikolle',
        lv: 'Dzīvojamā istaba zem ozollapu lustras, logi uz trim pusēm ar skatu uz zālienu',
      },
    },
    {
      src: '/galerii/saunamaja/saun.webp',
      alt: {
        et: 'Leiliruum, kuumad kivid kerisel ja kaseviht ämbris lava all',
        en: 'The steam room, hot stones on the stove and a birch whisk in a bucket beneath the bench',
        ru: 'Парная — раскалённые камни на печи и берёзовый веник в ведре под полком',
        de: 'Der Saunaraum, heiße Steine auf dem Ofen und ein Birkenquast im Eimer unter der Bank',
        es: 'La sala de vapor, piedras calientes sobre la estufa y un manojo de ramas de abedul en un cubo bajo el banco',
        sv: 'Bastun med heta stenar på bastuugnen och en bastukvast av björk i en hink under laven',
        fi: 'Löylyhuone, kuumat kivet kiukaalla ja koivuvihta ämpärissä lauteiden alla',
        lv: 'Tvaika telpa, karsti akmeņi uz krāsns un bērza slota spainī zem lāvas',
      },
    },
    {
      src: '/galerii/saunamaja/ratikud.webp',
      alt: {
        et: 'Oanduaia tikandiga rätikud ja teokarbid sauna pingil',
        en: 'Towels embroidered Oanduaia, with shells, on the sauna bench',
        ru: 'Полотенца с вышивкой Oanduaia и ракушки на банной скамье',
        de: 'Handtücher mit Oanduaia-Stickerei und Muscheln auf der Saunabank',
        es: 'Toallas bordadas con Oanduaia, con conchas, sobre el banco de la sauna',
        sv: 'Handdukar broderade med Oanduaia och snäckskal på bastubänken',
        fi: 'Oanduaia-kirjailtuja pyyhkeitä ja simpukankuoria saunan penkillä',
        lv: 'Dvieļi ar izšūtu uzrakstu Oanduaia un gliemežvāki uz pirts sola',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-ulal.webp',
      alt: {
        et: 'Rõdukorruse voodi katusekalde all, sepispiire ja laeventilaator',
        en: 'The loft bed under the roof slope, the forged railing and a ceiling fan',
        ru: 'Кровать на антресоли под скатом крыши, кованое ограждение и вентилятор',
        de: 'Das Galeriebett unter der Dachschräge, das geschmiedete Geländer und ein Deckenventilator',
        es: 'La cama del altillo bajo la pendiente del tejado, la barandilla de forja y un ventilador de techo',
        sv: 'Sängen på loftet under taklutningen, det smidda räcket och en takfläkt',
        fi: 'Parven sänky kattolappeen alla, taottu kaide ja kattotuuletin',
        lv: 'Gulta antresolā zem jumta slīpnes, kaltās margas un griestu ventilators',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-lilleline.webp',
      alt: {
        et: 'Teine voodi rõdul, lilleline tekk ja sepistatud okstega piire',
        en: 'The second bed in the loft, a floral quilt and the forged branch railing',
        ru: 'Вторая кровать на антресоли, покрывало в цветах и кованое ограждение',
        de: 'Das zweite Bett auf der Galerie, eine Blumendecke und das geschmiedete Zweiggeländer',
        es: 'La segunda cama del altillo, una colcha de flores y la barandilla de forja con ramas',
        sv: 'Den andra sängen på loftet, ett blommigt täcke och det smidda grenräcket',
        fi: 'Parven toinen sänky, kukallinen peitto ja taottu oksakaide',
        lv: 'Otrā gulta antresolā, puķaina sega un kaltās zaru margas',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-puitseinad.jpeg',
      alt: {
        et: 'Kaheinimesevoodi palkseinte vahel, mustriline päevatekk ja öölamp puuketta-riiulil',
        en: 'A double bed between log walls, a patterned bedspread and a bedside lamp on a slice of tree trunk',
        ru: 'Двуспальная кровать между бревенчатыми стенами, узорчатое покрывало и ночник на спиле дерева',
        de: 'Ein Doppelbett zwischen Blockwänden, eine gemusterte Tagesdecke und eine Nachttischlampe auf einer Baumscheibe',
        es: 'Una cama doble entre paredes de troncos, una colcha estampada y una lámpara de noche sobre una rodaja de tronco',
        sv: 'En dubbelsäng mellan timmerväggar, ett mönstrat överkast och en sänglampa på en trädskiva',
        fi: 'Parivuode hirsiseinien välissä, kuviollinen päiväpeite ja yölamppu puukiekon päällä',
        lv: 'Divguļamā gulta starp baļķu sienām, rakstains gultas pārklājs un naktslampiņa uz koka ripas',
      },
    },
    {
      src: '/galerii/saunamaja/saunamaja-elutuba-koogisaar.jpeg',
      alt: {
        et: 'Saunamaja elutuba – diivan, paeplaatidest põrand ja köögisaar, kohal sepistatud tammelehtedega lühter',
        en: 'The Sauna House living room — sofa, flagstone floor and the kitchen island beyond, the forged oak-leaf chandelier overhead',
        ru: 'Гостиная Банного дома — диван, каменный пол и кухонный остров за ним, сверху кованая люстра из дубовых листьев',
        de: 'Der Wohnraum des Saunahauses — Sofa, Steinplattenboden und dahinter die Kücheninsel, darüber der geschmiedete Eichenlaub-Leuchter',
        es: 'El salón de la Casa de la Sauna: sofá, suelo de losas de piedra y la isla de cocina al fondo, con la lámpara de forja de hojas de roble encima',
        sv: 'Bastuhusets vardagsrum — soffa, golv av stenplattor och köksön bortom, den smidda ljuskronan med eklöv ovanför',
        fi: 'Saunatalon olohuone — sohva, kivilaattalattia ja keittiösaareke taempana, yläpuolella taottu tammenlehtikattokruunu',
        lv: 'Pirts mājas dzīvojamā istaba — dīvāns, akmens plākšņu grīda un tālāk virtuves sala, augšā kalta ozollapu lustra',
      },
    },
  ],
  tiigimaja: [
    {
      src: '/galerii/tiigimaja-veepealt.jpeg',
      alt: {
        et: 'Tiigimaja üle vee, kask kaldal ja maja peegeldumas tiigis',
        en: 'The Pond House across the water, a birch on the bank and the house mirrored in the pond',
        ru: 'Прудовой дом через воду, берёза на берегу и отражение дома в пруду',
        de: 'Das Teichhaus über dem Wasser, eine Birke am Ufer und das Haus im Teich gespiegelt',
        es: 'La Casa del Estanque al otro lado del agua, un abedul en la orilla y la casa reflejada en el estanque',
        sv: 'Dammhuset sett över vattnet, en björk på stranden och huset speglat i dammen',
        fi: 'Lampitalo veden takana, koivu rannalla ja talo heijastuu lampeen',
        lv: 'Dīķa māja pāri ūdenim, bērzs krastā un māja atspoguļojas dīķī',
      },
    },
    {
      src: '/galerii/kiigud.jpeg',
      alt: {
        et: 'Kaks puidust võrkkiike kaskede vahel maja ees kevadel',
        en: 'Two timber hammocks slung between birches before the house in spring',
        ru: 'Два деревянных гамака между берёзами перед домом весной',
        de: 'Zwei Holzschaukeln zwischen Birken vor dem Haus im Frühling',
        es: 'Dos hamacas de madera colgadas entre abedules delante de la casa en primavera',
        sv: 'Två hängmattor av trä uppspända mellan björkar framför huset på våren',
        fi: 'Kaksi puista riippumattoa koivujen välissä talon edessä keväällä',
        lv: 'Divi koka šūpuļtīkli, iekārti starp bērziem pie mājas pavasarī',
      },
    },
    {
      src: '/galerii/tiigimaja/terrass.jpeg',
      alt: {
        et: 'Lai puitterrass tiigi ääres, lamamistoolid ja pergola all istumisala',
        en: 'The broad timber deck at the pond, loungers and seating under the pergola',
        ru: 'Широкая деревянная терраса у пруда, шезлонги и зона отдыха под перголой',
        de: 'Die breite Holzterrasse am Teich, Liegen und Sitzplätze unter der Pergola',
        es: 'La amplia terraza de madera junto al estanque, con tumbonas y asientos bajo la pérgola',
        sv: 'Det breda trädäcket vid dammen, solstolar och sittplatser under pergolan',
        fi: 'Leveä puuterassi lammen rannalla, aurinkotuolit ja istumapaikat pergolan alla',
        lv: 'Plašā koka terase pie dīķa, sauļošanās krēsli un sēdvieta zem pergolas',
      },
    },
    {
      src: '/galerii/tiigimaja/terrass-paikeses.jpeg',
      alt: {
        et: 'Lai terrass roogkatusega tiigimaja ees sügispäikeses, taga kõrged kased ja kuused',
        en: 'The wide deck in front of the thatched Pond House in autumn sun, tall birches and spruces behind',
        ru: 'Широкая терраса перед Прудовым домом с камышовой крышей под осенним солнцем, позади высокие берёзы и ели',
        de: 'Die breite Terrasse vor dem reetgedeckten Teichhaus in der Herbstsonne, dahinter hohe Birken und Fichten',
        es: 'La amplia terraza frente a la Casa del Estanque con tejado de junco bajo el sol de otoño, detrás abedules y abetos altos',
        sv: 'Den breda terrassen framför det vasstäckta Dammhuset i höstsol, bakom höga björkar och granar',
        fi: 'Leveä terassi ruokokattoisen Lampitalon edessä syysauringossa, taustalla korkeat koivut ja kuuset',
        lv: 'Plašā terase pie Dīķa mājas ar niedru jumtu rudens saulē, aizmugurē augsti bērzi un egles',
      },
    },
    {
      src: '/galerii/tiigimaja/siseruum.jpeg',
      alt: {
        et: 'Elutuba rohelise diivani, nikerdatud katusetala ja lambanahkse vaibaga',
        en: 'The living room with its green sofa, carved roof beam and sheepskin rug',
        ru: 'Гостиная с зелёным диваном, резной балкой и ковром из овчины',
        de: 'Der Wohnraum mit grünem Sofa, geschnitztem Dachbalken und Schaffellteppich',
        es: 'El salón con su sofá verde, la viga tallada del tejado y una alfombra de piel de oveja',
        sv: 'Vardagsrummet med grön soffa, snidad takbjälke och fårskinnsfäll',
        fi: 'Olohuone, vihreä sohva, veistetty kattopalkki ja lampaantaljamatto',
        lv: 'Dzīvojamā istaba ar zaļu dīvānu, grieztu jumta siju un aitādas paklāju',
      },
    },
    {
      src: '/galerii/tiigimaja/elutuba-kamin-tiik.jpeg',
      alt: {
        et: 'Elutuba kaminatulega, puust kohvilaud valgel vaibal, nahktugitool ja suured aknad tiigile',
        en: 'The living room with the fire lit, a timber coffee table on a white rug, a leather lounge chair and tall windows onto the pond',
        ru: 'Гостиная с горящим камином, деревянный журнальный стол на белом ковре, кожаное кресло и большие окна на пруд',
        de: 'Der Wohnraum mit brennendem Kamin, ein Couchtisch aus Holz auf weißem Teppich, ein Lounge-Sessel aus Leder und hohe Fenster zum Teich',
        es: 'El salón con la chimenea encendida, una mesa de centro de madera sobre una alfombra blanca, un sillón de cuero y ventanales al estanque',
        sv: 'Vardagsrummet med brasan tänd, ett soffbord i trä på en vit matta, en fåtölj i läder och höga fönster mot dammen',
        fi: 'Olohuone takkatulen loisteessa, puinen sohvapöytä valkoisella matolla, nahkainen nojatuoli ja korkeat ikkunat lammelle',
        lv: 'Dzīvojamā istaba ar iekurtu kamīnu, koka kafijas galdiņš uz balta paklāja, ādas atpūtas krēsls un augsti logi uz dīķi',
      },
    },
    {
      src: '/galerii/tiigimaja/kamin.jpeg',
      alt: {
        et: 'Kamin ja klaasseinad, mis avanevad murule ja metsale',
        en: 'The fireplace and glass walls opening onto lawn and forest',
        ru: 'Камин и стеклянные стены, открытые на газон и лес',
        de: 'Der Kamin und die Glaswände, die sich zu Wiese und Wald öffnen',
        es: 'La chimenea y las paredes de cristal que se abren al césped y al bosque',
        sv: 'Den öppna spisen och glasväggar som öppnar sig mot gräsmattan och skogen',
        fi: 'Takka ja lasiseinät, jotka avautuvat nurmikolle ja metsään',
        lv: 'Kamīns un stikla sienas ar skatu uz zālienu un mežu',
      },
    },
    {
      src: '/galerii/tiigimaja/kamin-eest.jpeg',
      alt: {
        et: 'Kamin eestvaates, uivpuust skulptuur korstna ees ja pink kolde all',
        en: 'The fireplace head-on, a driftwood sculpture set above it and a bench across the hearth',
        ru: 'Камин анфас, скульптура из коряги над ним и скамья перед очагом',
        de: 'Der Kamin von vorn, darüber eine Treibholzskulptur und eine Bank vor der Feuerstelle',
        es: 'La chimenea de frente, con una escultura de madera de deriva encima y un banco ante el hogar',
        sv: 'Den öppna spisen rakt framifrån, en skulptur av drivved ovanför och en bänk framför härden',
        fi: 'Takka suoraan edestä, ajopuuveistos sen yläpuolella ja penkki tulisijan edessä',
        lv: 'Kamīns skatā no priekšas, virs tā skulptūra no jūras izskalota koka un sols pie pavarda',
      },
    },
    {
      src: '/galerii/tiigimaja/kook.jpeg',
      alt: {
        et: 'Köögitasapind gaasipliidi, avariiuli ja retrokülmikuga',
        en: 'The kitchen counter with gas hob, open shelf and retro fridge',
        ru: 'Кухонная столешница с газовой плитой, открытой полкой и ретро-холодильником',
        de: 'Die Küchenzeile mit Gaskochfeld, offenem Regal und Retro-Kühlschrank',
        es: 'La encimera de cocina con placa de gas, estante abierto y nevera retro',
        sv: 'Köksbänken med gashäll, öppen hylla och retrokylskåp',
        fi: 'Keittiötaso, kaasuliesi, avohylly ja retrojääkaappi',
        lv: 'Virtuves darba virsma ar gāzes plīti, atvērtu plauktu un retro ledusskapi',
      },
    },
    {
      src: '/galerii/tiigimaja/magamistuba.jpeg',
      alt: {
        et: 'Magamistuba põrandast laeni akendega niidule ja pealuuga palkseinal',
        en: 'The bedroom with floor-to-ceiling windows onto the meadow and a skull on the log wall',
        ru: 'Спальня с окнами в пол на луг и черепом на бревенчатой стене',
        de: 'Das Schlafzimmer mit raumhohen Fenstern zur Wiese und einem Schädel an der Blockwand',
        es: 'El dormitorio con ventanales de suelo a techo que dan al prado y un cráneo en la pared de troncos',
        sv: 'Sovrummet med fönster från golv till tak mot ängen och en skalle på timmerväggen',
        fi: 'Makuuhuone, lattiasta kattoon ulottuvat ikkunat niitylle ja kallo hirsiseinällä',
        lv: 'Guļamistaba ar logiem no grīdas līdz griestiem uz pļavu un galvaskausu uz baļķu sienas',
      },
    },
    {
      src: '/galerii/tiigimaja/magamistuba-sugisel.jpeg',
      alt: {
        et: 'Suur voodi palkseina ääres, puidust härjapea seinal ja aknast paistab sügisene tiigikallas',
        en: 'A large bed against the timber wall, a carved wooden bull’s head above it and the autumn pond bank through the window',
        ru: 'Большая кровать у деревянной стены, над ней резная голова быка, за окном осенний берег пруда',
        de: 'Ein großes Bett an der Holzwand, darüber ein geschnitzter Stierkopf und durchs Fenster das herbstliche Teichufer',
        es: 'Una cama grande contra la pared de madera, una cabeza de toro tallada encima y la orilla otoñal del estanque tras la ventana',
        sv: 'En stor säng mot träväggen, ett snidat tjurhuvud ovanför och den höstliga dammstranden utanför fönstret',
        fi: 'Iso sänky puuseinää vasten, yläpuolella veistetty härän pää ja ikkunasta syksyinen lammenranta',
        lv: 'Liela gulta pie koka sienas, virs tās grebta vērša galva un pa logu redzams rudenīgs dīķa krasts',
      },
    },
    {
      src: '/galerii/tiigimaja/magamistuba-kamin.jpeg',
      alt: {
        et: 'Voodist vaade: kamin põleb seinas ja suurest aknast paistavad terrass ja tiik',
        en: 'The view from the bed: the fire burning in the wall and the deck and pond through the big window',
        ru: 'Вид с кровати: в стене горит камин, а в большом окне видны терраса и пруд',
        de: 'Der Blick vom Bett: das Feuer brennt in der Wand, durchs große Fenster Terrasse und Teich',
        es: 'La vista desde la cama: el fuego arde en la pared y por el gran ventanal se ven la terraza y el estanque',
        sv: 'Utsikten från sängen: brasan brinner i väggen och genom det stora fönstret syns terrassen och dammen',
        fi: 'Näkymä sängystä: takka palaa seinässä ja isosta ikkunasta näkyvät terassi ja lampi',
        lv: 'Skats no gultas: sienā deg kamīns, bet pa lielo logu redzama terase un dīķis',
      },
    },
    {
      src: '/galerii/tiigimaja/voodilamp.jpeg',
      alt: {
        et: 'Narmastega öölamp palgikettast öökapil voodi kõrval',
        en: 'A fringed bedside lamp on a shelf cut from a single round of log',
        ru: 'Ночник с бахромой на полке из спила бревна у кровати',
        de: 'Eine Nachttischlampe mit Fransen auf einem Regal aus einer einzigen Baumscheibe',
        es: 'Una lámpara de noche con flecos sobre un estante hecho de una sola rodaja de tronco',
        sv: 'En nattlampa med fransar på en hylla gjord av en enda stockskiva',
        fi: 'Hapsureunainen yölamppu yhdestä pölkkykiekosta tehdyllä hyllyllä',
        lv: 'Naktslampa ar bārkstīm uz plaukta, kas izgriezts no vienas baļķa ripas',
      },
    },
    {
      src: '/galerii/tiigimaja/voodilamp-puit.jpeg',
      alt: {
        et: 'Puuliistudest seinalamp voodi kohal, öökapiks jämeda puu ketas',
        en: 'A wall lamp made of wooden slats above the bed, a thick slice of tree trunk for a bedside table',
        ru: 'Настенный светильник из деревянных реек над кроватью, вместо тумбочки толстый спил дерева',
        de: 'Eine Wandleuchte aus Holzleisten über dem Bett, als Nachttisch eine dicke Baumscheibe',
        es: 'Un aplique de listones de madera sobre la cama y, como mesilla, una gruesa rodaja de tronco',
        sv: 'En vägglampa av trästavar ovanför sängen, en tjock trädskiva som nattduksbord',
        fi: 'Puurimoista tehty seinävalaisin sängyn yläpuolella, yöpöytänä paksu puukiekko',
        lv: 'Sienas lampa no koka līstītēm virs gultas, naktsgaldiņa vietā biezs koka ripas gabals',
      },
    },
    {
      src: '/galerii/tiigimaja/vannituba.jpeg',
      alt: {
        et: 'Vannituba graniidist valamulaua ja dušinurgaga tumedas puidus',
        en: 'The bathroom with a granite vanity and walk-in shower in dark timber',
        ru: 'Ванная с гранитной столешницей и душевой в тёмном дереве',
        de: 'Das Bad mit Granitwaschtisch und begehbarer Dusche in dunklem Holz',
        es: 'El baño con un lavabo de granito y una ducha a ras de suelo en madera oscura',
        sv: 'Badrummet med tvättställ i granit och en walk-in-dusch i mörkt trä',
        fi: 'Kylpyhuone, graniittinen allaskaappi ja suihkunurkkaus tummaa puuta',
        lv: 'Vannas istaba ar granīta izlietnes virsmu un atvērtu dušu tumšā koka apdarē',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-esikylg-silt.jpeg',
      alt: {
        et: 'Tiigimaja esikülg, ukse kohal nikerdatud silt, terrass ja lamamistoolid',
        en: 'The front of the Pond House, its name carved above the door, deck and loungers',
        ru: 'Фасад Прудового дома, вырезанное название над дверью, терраса и шезлонги',
        de: 'Die Vorderseite des Teichhauses, der Name über der Tür eingeschnitzt, Terrasse und Liegen',
        es: 'La fachada de la Casa del Estanque, con su nombre tallado sobre la puerta, la terraza y las tumbonas',
        sv: 'Dammhusets framsida, namnet snidat ovanför dörren, däck och solstolar',
        fi: 'Lampitalon julkisivu, nimi veistettynä oven yläpuolelle, terassi ja aurinkotuolit',
        lv: 'Dīķa mājas priekšpuse, virs durvīm izgriezts nosaukums, terase un sauļošanās krēsli',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-terrass-kyljelt.jpeg',
      alt: {
        et: 'Tiigimaja küljelt – hele palkmaja laia terrassiga, taga kuusemets',
        en: 'The Pond House from the side — pale timber with its broad deck, spruce forest behind',
        ru: 'Прудовой дом сбоку — светлое дерево и широкая терраса, позади еловый лес',
        de: 'Das Teichhaus von der Seite — helles Holz mit breiter Terrasse, dahinter Fichtenwald',
        es: 'La Casa del Estanque de lado: madera clara con su amplia terraza y el bosque de abetos detrás',
        sv: 'Dammhuset från sidan — ljust timmer med brett däck, granskog bakom',
        fi: 'Lampitalo sivulta — vaaleaa puuta ja leveä terassi, takana kuusimetsä',
        lv: 'Dīķa māja no sāniem — gaišs koks un plaša terase, aizmugurē egļu mežs',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-terrass-tiigi-aares.jpeg',
      alt: {
        et: 'Terrassi serv tiigi kaldal, vesiroosid ja puude peegeldused vees',
        en: 'The edge of the deck at the pond, water lilies and trees reflected in the water',
        ru: 'Край террасы у пруда, кувшинки и отражения деревьев в воде',
        de: 'Der Rand der Terrasse am Teich, Seerosen und die Spiegelung der Bäume im Wasser',
        es: 'El borde de la terraza junto al estanque, con nenúfares y árboles reflejados en el agua',
        sv: 'Däckets kant vid dammen, näckrosor och träd som speglas i vattnet',
        fi: 'Terassin reuna lammen rannalla, lumpeet ja puut heijastuvat veteen',
        lv: 'Terases mala pie dīķa, ūdensrozes un koki atspoguļojas ūdenī',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-lamamistoolid.jpeg',
      alt: {
        et: 'Kaks puidust lamamistooli terrassil, tiik ja mets nende taga',
        en: 'Two wooden loungers on the deck, the pond and the forest beyond them',
        ru: 'Два деревянных шезлонга на террасе, за ними пруд и лес',
        de: 'Zwei Holzliegen auf der Terrasse, dahinter der Teich und der Wald',
        es: 'Dos tumbonas de madera en la terraza, con el estanque y el bosque al fondo',
        sv: 'Två solstolar av trä på däcket, dammen och skogen bortom dem',
        fi: 'Kaksi puista aurinkotuolia terassilla, niiden takana lampi ja metsä',
        lv: 'Divi koka sauļošanās krēsli uz terases, aiz tiem dīķis un mežs',
      },
    },
  ],
  /*
   * Ordered as a walk through the house: the fire first, then the room read from four
   * corners, then the sleeping box from outside, from the bed, and at night, and the
   * washroom last.
   */
  metsamaja: [
    {
      src: '/galerii/metsamaja-paikeses.jpeg',
      alt: {
        et: 'Metsamaja päikesepaistel kaskede ja kuuskede vahel, ees roheline muru',
        en: 'The Forest House in sunshine between birch and spruce, a green lawn in front',
        ru: 'Лесной дом в солнечный день среди берёз и елей, впереди зелёная лужайка',
        de: 'Das Waldhaus in der Sonne zwischen Birken und Fichten, davor eine grüne Wiese',
        es: 'La Casa del Bosque al sol entre abedules y abetos, con un césped verde delante',
        sv: 'Skogshuset i solsken mellan björkar och granar, en grön gräsmatta framför',
        fi: 'Metsätalo auringonpaisteessa koivujen ja kuusien välissä, edessä vihreä nurmikko',
        lv: 'Meža māja saulē starp bērziem un eglēm, priekšā zaļš zāliens',
      },
    },
    {
      src: '/galerii/metsamaja/sissepaas.jpeg',
      alt: {
        et: 'Metsamaja sissepääs: puitterrass pingiga, palksein ja silt METSAMAJA',
        en: 'The Forest House entrance — a timber deck with a bench, log wall and the METSAMAJA sign',
        ru: 'Вход в Лесной дом — деревянная терраса со скамьёй, бревенчатая стена и вывеска METSAMAJA',
        de: 'Der Eingang des Waldhauses – Holzterrasse mit Bank, Blockwand und das Schild METSAMAJA',
        es: 'La entrada de la Casa del Bosque: una terraza de madera con un banco, la pared de troncos y el cartel METSAMAJA',
        sv: 'Skogshusets entré — ett trädäck med en bänk, timmervägg och skylten METSAMAJA',
        fi: 'Metsätalon sisäänkäynti — puuterassi ja penkki, hirsiseinä ja METSAMAJA-kyltti',
        lv: 'Meža mājas ieeja — koka terase ar solu, baļķu siena un uzraksts METSAMAJA',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-lai.jpeg',
      alt: {
        et: 'Avar elutuba: türkiissinised tugitoolid, diivan lambanahkadega, rippkiik ja suured aknad',
        en: 'The open living room — teal armchairs, a sofa under sheepskins, the hanging chair and tall windows',
        ru: 'Просторная гостиная — бирюзовые кресла, диван с овчинами, подвесное кресло и большие окна',
        de: 'Der offene Wohnraum – petrolfarbene Sessel, ein Sofa mit Schaffellen, der Hängesessel und hohe Fenster',
        es: 'El salón diáfano: butacas verde azulado, un sofá con pieles de oveja, la silla colgante y ventanas altas',
        sv: 'Det öppna vardagsrummet — blågröna fåtöljer, en soffa med fårskinn, hängstolen och höga fönster',
        fi: 'Avara olohuone — sinivihreät nojatuolit, sohva lampaantaljoineen, riipputuoli ja korkeat ikkunat',
        lv: 'Plašā dzīvojamā istaba — zilganzaļi atzveltnes krēsli, dīvāns ar aitādām, piekaramais krēsls un augsti logi',
      },
    },
    {
      src: '/galerii/metsamaja/rippkiik-aken.jpeg',
      alt: {
        et: 'Rippkiik akende all, uks magamistuppa lahti',
        en: 'The hanging chair by the windows, the bedroom door open',
        ru: 'Подвесное кресло у окон, дверь в спальню открыта',
        de: 'Der Hängesessel an den Fenstern, die Schlafzimmertür offen',
        es: 'La silla colgante junto a las ventanas, con la puerta del dormitorio abierta',
        sv: 'Hängstolen vid fönstren, dörren till sovrummet öppen',
        fi: 'Riipputuoli ikkunoiden vieressä, makuuhuoneen ovi auki',
        lv: 'Piekaramais krēsls pie logiem, guļamistabas durvis vaļā',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-hele.jpeg',
      alt: {
        et: 'Magamistuba palklae all, hele voodipesu ja kaks patja',
        en: 'A bedroom under the log ceiling, pale bedding and two pillows',
        ru: 'Спальня под бревенчатым потолком, светлое бельё и две подушки',
        de: 'Ein Schlafzimmer unter der Balkendecke, helle Bettwäsche und zwei Kissen',
        es: 'Un dormitorio bajo el techo de troncos, ropa de cama clara y dos almohadas',
        sv: 'Ett sovrum under timmertaket, ljusa sängkläder och två kuddar',
        fi: 'Makuuhuone hirsikaton alla, vaaleat vuodevaatteet ja kaksi tyynyä',
        lv: 'Guļamistaba zem baļķu griestiem, gaiša gultasveļa un divi spilveni',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-lambanahk.jpeg',
      alt: {
        et: 'Magamistuba halli voodipesu ja lambanahast vaibaga',
        en: 'A bedroom with grey bedding and a sheepskin rug',
        ru: 'Спальня с серым бельём и ковриком из овчины',
        de: 'Ein Schlafzimmer mit grauer Bettwäsche und einem Schaffell',
        es: 'Un dormitorio con ropa de cama gris y una alfombra de piel de oveja',
        sv: 'Ett sovrum med grå sängkläder och en fårskinnsfäll',
        fi: 'Makuuhuone, harmaat vuodevaatteet ja lampaantaljamatto',
        lv: 'Guļamistaba ar pelēku gultasveļu un aitādas paklāju',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-uks.jpeg',
      alt: {
        et: 'Magamistoast vaade läbi ukse valgesse elutuppa',
        en: 'From the bedroom through the door into the bright living room',
        ru: 'Вид из спальни через дверь в светлую гостиную',
        de: 'Vom Schlafzimmer durch die Tür in den hellen Wohnraum',
        es: 'Desde el dormitorio, a través de la puerta, hacia el luminoso salón',
        sv: 'Från sovrummet genom dörren in i det ljusa vardagsrummet',
        fi: 'Makuuhuoneesta oven läpi valoisaan olohuoneeseen',
        lv: 'No guļamistabas caur durvīm uz gaišo dzīvojamo istabu',
      },
    },
    {
      src: '/galerii/metsamaja/dush.jpeg',
      alt: {
        et: 'Vannituba dušikardina, WC ja valamuga',
        en: 'The bathroom with shower curtain, toilet and basin',
        ru: 'Ванная с душевой шторой, унитазом и раковиной',
        de: 'Das Bad mit Duschvorhang, WC und Waschbecken',
        es: 'El baño con cortina de ducha, inodoro y lavabo',
        sv: 'Badrummet med duschdraperi, toalett och handfat',
        fi: 'Kylpyhuone, suihkuverho, wc-istuin ja pesuallas',
        lv: 'Vannas istaba ar dušas aizkaru, tualeti un izlietni',
      },
    },
    {
      src: '/galerii/metsamaja/kamin.jpeg',
      alt: {
        et: 'Kamin vanast lauast seina ees, tohust korv puudega ja lambanahk põrandal',
        en: 'The fireplace against its reclaimed-timber breast, a birch-bark basket of logs and a sheepskin on the floor',
        ru: 'Камин у стены из состаренного дерева, берестяная корзина с дровами и овчина на полу',
        de: 'Der Kamin vor seiner Wand aus Altholz, ein Birkenrindenkorb mit Scheiten und ein Schaffell auf dem Boden',
        es: 'La chimenea contra su frente de madera recuperada, una cesta de corteza de abedul con leña y una piel de oveja en el suelo',
        sv: 'Den öppna spisen mot en vägg av återbrukat trä, en näverkorg med ved och ett fårskinn på golvet',
        fi: 'Takka kierrätyspuisen seinän edessä, tuohikori täynnä halkoja ja lampaantalja lattialla',
        lv: 'Kamīns pie sienas no veciem dēļiem, bērza tāss grozs ar malku un aitāda uz grīdas',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-kamin.webp',
      alt: {
        et: 'Elutuba lõõmava kaminaga, türkiissinised tugitoolid akna all ja vein laual',
        en: 'The living room with the fire lit, teal recliners at the window and wine on the table',
        ru: 'Гостиная с горящим камином, бирюзовые кресла у окна и вино на столе',
        de: 'Der Wohnraum mit brennendem Feuer, petrolfarbenen Sesseln am Fenster und Wein auf dem Tisch',
        es: 'El salón con el fuego encendido, sillones reclinables verde azulado junto a la ventana y vino sobre la mesa',
        sv: 'Vardagsrummet med brasan tänd, blågröna vilfåtöljer vid fönstret och vin på bordet',
        fi: 'Olohuone, takassa tuli, sinivihreät lepotuolit ikkunan edessä ja viiniä pöydällä',
        lv: 'Dzīvojamā istaba ar iekurtu kamīnu, zilganzaļi atgāžami krēsli pie loga un vīns uz galda',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-ulevalt.webp',
      alt: {
        et: 'Kogu elutuba ülalt: kööginurk, kamin ja ruuduline vaip',
        en: 'The whole living room from above — the kitchen corner, the fire and the checked rug',
        ru: 'Вся гостиная сверху — кухонный угол, камин и клетчатый ковёр',
        de: 'Der ganze Wohnraum von oben – die Küchenecke, das Feuer und der karierte Teppich',
        es: 'Todo el salón visto desde arriba: el rincón de la cocina, el fuego y la alfombra de cuadros',
        sv: 'Hela vardagsrummet ovanifrån — köksvrån, brasan och den rutiga mattan',
        fi: 'Koko olohuone ylhäältä — keittiönurkkaus, takka ja ruudullinen matto',
        lv: 'Visa dzīvojamā istaba no augšas — virtuves stūris, kamīns un rūtains paklājs',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-diivan.webp',
      alt: {
        et: 'Tepitud diivan lambanahkadega, sulgedest unenäopüüdja ja kööginurk taga',
        en: 'The buttoned sofa under sheepskins, a feather dreamcatcher and the kitchen counter behind',
        ru: 'Стёганый диван с овчинами, ловец снов из перьев и кухня позади',
        de: 'Das Chesterfield-Sofa unter Schaffellen, ein Traumfänger aus Federn und dahinter die Küchenzeile',
        es: 'El sofá capitoné con pieles de oveja, un atrapasueños de plumas y la encimera de la cocina detrás',
        sv: 'Den knappade soffan med fårskinn, en drömfångare av fjädrar och köksbänken bakom',
        fi: 'Napitettu sohva lampaantaljoineen, höyhenistä tehty unisieppari ja keittiötaso takana',
        lv: 'Pogots dīvāns ar aitādām, spalvu sapņu ķērājs un aiz tā virtuves darba virsma',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-rippkiik.webp',
      alt: {
        et: 'Rippkiik akna all, tugitool kamina ees ja uks murule',
        en: 'The hanging chair at the window, an armchair by the fire and the door onto the lawn',
        ru: 'Подвесное кресло у окна, кресло у камина и дверь на газон',
        de: 'Der Hängesessel am Fenster, ein Sessel am Feuer und die Tür zur Wiese',
        es: 'La silla colgante junto a la ventana, un sillón junto al fuego y la puerta que da al césped',
        sv: 'Hängstolen vid fönstret, en fåtölj vid brasan och dörren ut mot gräsmattan',
        fi: 'Riipputuoli ikkunan edessä, nojatuoli takan ääressä ja ovi nurmikolle',
        lv: 'Piekaramais krēsls pie loga, atzveltnes krēsls pie kamīna un durvis uz zālienu',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba.jpeg',
      alt: {
        et: 'Avatud uks palkseintega magamistuppa, unenäopüüdja ja lambanahad',
        en: 'The open door into the log-walled sleeping room, a dreamcatcher and sheepskins',
        ru: 'Открытая дверь в спальню с бревенчатыми стенами, ловец снов и овчины',
        de: 'Die offene Tür zum Schlafraum mit Blockwänden, ein Traumfänger und Schaffelle',
        es: 'La puerta abierta al dormitorio con paredes de troncos, un atrapasueños y pieles de oveja',
        sv: 'Den öppna dörren in till sovrummet med timmerväggar, en drömfångare och fårskinn',
        fi: 'Avoin ovi hirsiseinäiseen makuuhuoneeseen, unisieppari ja lampaantaljoja',
        lv: 'Atvērtas durvis uz guļamistabu ar baļķu sienām, sapņu ķērājs un aitādas',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-sees.webp',
      alt: {
        et: 'Voodi palkseinte vahel, valgustatud pullipea peatsis',
        en: 'The bed between the log walls, a lit bull’s head above the headboard',
        ru: 'Кровать между бревенчатыми стенами, подсвеченная голова быка над изголовьем',
        de: 'Das Bett zwischen den Blockwänden, darüber ein beleuchteter Stierkopf',
        es: 'La cama entre las paredes de troncos, con una cabeza de toro iluminada sobre el cabecero',
        sv: 'Sängen mellan timmerväggarna, ett upplyst tjurhuvud ovanför sänggaveln',
        fi: 'Sänky hirsiseinien välissä, valaistu härän pää sängynpäädyn yläpuolella',
        lv: 'Gulta starp baļķu sienām, virs galvgaļa izgaismota buļļa galva',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-ohtul.webp',
      alt: {
        et: 'Sama voodi õhtul, ainus valgus pullipea silmis',
        en: 'The same bed at night, the only light in the bull’s eyes',
        ru: 'Та же кровать вечером, единственный свет — в глазах быка',
        de: 'Dasselbe Bett bei Nacht, das einzige Licht in den Augen des Stiers',
        es: 'La misma cama de noche, con la única luz en los ojos del toro',
        sv: 'Samma säng på natten, det enda ljuset i tjurens ögon',
        fi: 'Sama sänky yöllä, ainoa valo härän silmissä',
        lv: 'Tā pati gulta naktī, vienīgā gaisma — buļļa acīs',
      },
    },
    {
      src: '/galerii/metsamaja/tualett.webp',
      alt: {
        et: 'Valge plaaditud tualettruum kraanikausi ja peegliga',
        en: 'The white-tiled washroom with basin and mirror',
        ru: 'Санузел в белой плитке с раковиной и зеркалом',
        de: 'Der weiß geflieste Waschraum mit Becken und Spiegel',
        es: 'El aseo de azulejos blancos con lavabo y espejo',
        sv: 'Det vitkaklade tvättrummet med handfat och spegel',
        fi: 'Valkoiseksi laatoitettu pesuhuone, pesuallas ja peili',
        lv: 'Ar baltām flīzēm klāta mazgātava ar izlietni un spoguli',
      },
    },
  ],
}

/**
 * One short clip per house, shown as the first tile of its photo grid. Silent, so the
 * label is the only description a screen reader gets.
 */
export type HouseVideo = {
  src: string
  poster: string
  width: number
  height: number
  label: Record<Lang, string>
}

export const HOUSE_VIDEOS: Partial<Record<HouseSlug, HouseVideo>> = {
  tiigimaja: {
    src: '/video/tiigimaja.mp4',
    poster: '/video/tiigimaja-poster.jpg',
    width: 576,
    height: 768,
    label: {
      et: 'Video: Tiigimaja terrass ja tiik sügispäikeses, magamistuba kaminatulega ja elutuba',
      en: 'Video: the Pond House deck and pond in autumn sun, the bedroom with the fire lit and the living room',
      ru: 'Видео: терраса и пруд Прудового дома под осенним солнцем, спальня с горящим камином и гостиная',
      de: 'Video: Terrasse und Teich des Teichhauses in der Herbstsonne, das Schlafzimmer mit brennendem Kamin und der Wohnraum',
      es: 'Vídeo: la terraza y el estanque de la Casa del Estanque bajo el sol de otoño, el dormitorio con la chimenea encendida y el salón',
      sv: 'Video: Dammhusets terrass och damm i höstsol, sovrummet med brasan tänd och vardagsrummet',
      fi: 'Video: Lampitalon terassi ja lampi syysauringossa, makuuhuone takkatulen loisteessa ja olohuone',
      lv: 'Video: Dīķa mājas terase un dīķis rudens saulē, guļamistaba ar iekurtu kamīnu un dzīvojamā istaba',
    },
  },
}
