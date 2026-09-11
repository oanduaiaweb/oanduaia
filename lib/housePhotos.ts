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
      },
    },
    {
      src: '/galerii/saunamaja/jaaauk-talvel.webp',
      alt: {
        et: 'Jääauk tiigis saunamaja ees pakasepäeval, käsipuu vette',
        en: 'An ice hole cut in the pond before the sauna house on a frozen day, a handrail leading in',
        ru: 'Прорубь в пруду перед банным домом в мороз, поручень к воде',
        de: 'Ein Eisloch im Teich vor dem Saunahaus an einem Frosttag, ein Handlauf führt hinein',
      },
    },
    {
      src: '/galerii/saunamaja/elutuba.jpeg',
      alt: {
        et: 'Avar elutuba lambanahkadega diivanil, tammelehtedega lühter ja paeplaatidest põrand',
        en: 'The open living room with sheepskins on the sofa, an oak-leaf chandelier and a flagstone floor',
        ru: 'Просторная гостиная с овчинами на диване, люстрой из дубовых листьев и каменным полом',
        de: 'Der offene Wohnraum mit Schaffellen auf dem Sofa, einem Eichenlaub-Leuchter und Steinplattenboden',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar.jpeg',
      alt: {
        et: 'Köögisaar telliskivijalal, puuküttega pliit ja rippuvad kruusid palgi all',
        en: 'The kitchen island on a brick base, a wood-fired range and mugs hanging from the beam',
        ru: 'Кухонный остров на кирпичном основании, дровяная плита и кружки на балке',
        de: 'Die Kücheninsel auf gemauertem Sockel, ein Holzherd und Tassen, die am Balken hängen',
      },
    },
    {
      src: '/galerii/saunamaja/pesuruum.jpeg',
      alt: {
        et: 'Pesuruum telliskivist dušinišiga ja saunauksega palkseinas',
        en: 'The washroom with its brick shower alcove and the sauna door in the log wall',
        ru: 'Душевая с кирпичной нишей и дверью в сауну в бревенчатой стене',
        de: 'Der Waschraum mit gemauerter Duschnische und der Saunatür in der Blockwand',
      },
    },
    {
      src: '/galerii/saunamaja/vahuvein.jpeg',
      alt: {
        et: 'Vahuvein ja marjad kristallklaaside kõrval graniitlaual',
        en: 'Sparkling wine and berries beside crystal glasses on the granite table',
        ru: 'Игристое вино и ягоды рядом с хрустальными бокалами на гранитном столе',
        de: 'Schaumwein und Beeren neben Kristallgläsern auf dem Granittisch',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar-ja-elutuba.jpeg',
      alt: {
        et: 'Köögisaar ja elutuba ühes ruumis hämaras, potiraam ja kruusid palgi all',
        en: 'The kitchen island and the living room in one space at dusk, pots and mugs hung from the beam',
        ru: 'Кухонный остров и гостиная в одном пространстве в сумерках, посуда на балке',
        de: 'Kücheninsel und Wohnraum in einem Raum in der Dämmerung, Töpfe und Tassen am Balken',
      },
    },
    {
      src: '/galerii/saunamaja/sepisrinnatis.jpeg',
      alt: {
        et: 'Sepistatud tammeokstega rõdupiire lae all, elutuba allpool',
        en: 'The forged oak-branch balustrade of the loft beneath the timber ceiling, the room below',
        ru: 'Кованое ограждение антресоли в виде дубовых ветвей под потолком, комната внизу',
        de: 'Das geschmiedete Eichenzweig-Geländer der Galerie unter der Holzdecke, darunter der Raum',
      },
    },
    {
      src: '/galerii/saunamaja/vokk.jpeg',
      alt: {
        et: 'Vana vokk rõdu põrandal sepispiirde kõrval',
        en: 'An old spinning wheel on the loft floor beside the forged railing',
        ru: 'Старая прялка на полу антресоли рядом с кованым ограждением',
        de: 'Ein altes Spinnrad auf dem Galerieboden neben dem geschmiedeten Geländer',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar-ohtul.jpeg',
      alt: {
        et: 'Köögisaar õhtul, baaritoolid, merevaigukarva valgustid ja riidas küttepuud',
        en: 'The kitchen island in the evening with bar stools, amber pendant lights and stacked firewood',
        ru: 'Кухонный остров вечером — барные стулья, янтарные светильники и поленница',
        de: 'Die Kücheninsel am Abend mit Barhockern, bernsteinfarbenen Pendelleuchten und gestapeltem Brennholz',
      },
    },
    {
      src: '/galerii/saunamaja/elutoast-kooki.jpeg',
      alt: {
        et: 'Vaade diivanilt üle paeplaatide köögisaareni, tammelehtedega lühter lae all',
        en: 'The view from the sofa across the flagstones to the kitchen island, the oak-leaf chandelier overhead',
        ru: 'Вид с дивана через каменный пол на кухонный остров, люстра из дубовых листьев наверху',
        de: 'Der Blick vom Sofa über die Steinplatten zur Kücheninsel, darüber der Eichenlaub-Leuchter',
      },
    },
    {
      src: '/galerii/saunamaja/elutuba-luhter.jpeg',
      alt: {
        et: 'Elutuba tammelehtedega lühtri all, aknad kolmel seinal muru poole',
        en: 'The living room under the oak-leaf chandelier, windows on three sides onto the lawn',
        ru: 'Гостиная под люстрой из дубовых листьев, окна с трёх сторон на газон',
        de: 'Der Wohnraum unter dem Eichenlaub-Leuchter, nach drei Seiten Fenster zur Wiese',
      },
    },
    {
      src: '/galerii/saunamaja/saun.webp',
      alt: {
        et: 'Leiliruum, kuumad kivid kerisel ja kaseviht ämbris lava all',
        en: 'The steam room, hot stones on the stove and a birch whisk in a bucket beneath the bench',
        ru: 'Парная — раскалённые камни на печи и берёзовый веник в ведре под полком',
        de: 'Der Saunaraum, heiße Steine auf dem Ofen und ein Birkenquast im Eimer unter der Bank',
      },
    },
    {
      src: '/galerii/saunamaja/ratikud.webp',
      alt: {
        et: 'Oanduaia tikandiga rätikud ja teokarbid sauna pingil',
        en: 'Towels embroidered Oanduaia, with shells, on the sauna bench',
        ru: 'Полотенца с вышивкой Oanduaia и ракушки на банной скамье',
        de: 'Handtücher mit Oanduaia-Stickerei und Muscheln auf der Saunabank',
      },
    },
    {
      src: '/galerii/saunamaja/elutuba-talvel.webp',
      alt: {
        et: 'Elutuba talvel, lumi akende taga ja küünlad graniitlaual',
        en: 'The living room in winter, snow beyond the windows and candles on the granite table',
        ru: 'Гостиная зимой, снег за окнами и свечи на гранитном столе',
        de: 'Der Wohnraum im Winter, hinter den Fenstern Schnee und Kerzen auf dem Granittisch',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-ulal.webp',
      alt: {
        et: 'Rõdukorruse voodi katusekalde all, sepispiire ja laeventilaator',
        en: 'The loft bed under the roof slope, the forged railing and a ceiling fan',
        ru: 'Кровать на антресоли под скатом крыши, кованое ограждение и вентилятор',
        de: 'Das Galeriebett unter der Dachschräge, das geschmiedete Geländer und ein Deckenventilator',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-lilleline.webp',
      alt: {
        et: 'Teine voodi rõdul, lilleline tekk ja sepistatud okstega piire',
        en: 'The second bed in the loft, a floral quilt and the forged branch railing',
        ru: 'Вторая кровать на антресоли, покрывало в цветах и кованое ограждение',
        de: 'Das zweite Bett auf der Galerie, eine Blumendecke und das geschmiedete Zweiggeländer',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-kuunlaga.webp',
      alt: {
        et: 'Voodi palkseina ääres, küünal seinaküünlajalas ja pilt kohal',
        en: 'A bed against the log wall, a candle in its sconce and a picture above',
        ru: 'Кровать у бревенчатой стены, свеча в бра и картина над ней',
        de: 'Ein Bett an der Blockwand, eine Kerze im Wandhalter und darüber ein Bild',
      },
    },
    {
      src: '/galerii/saunamaja/saunamaja-elutuba-koogisaar.jpeg',
      alt: {
        et: 'Saunamaja elutuba – diivan, paeplaatidest põrand ja köögisaar, kohal sepistatud tammelehtedega lühter',
        en: 'The Sauna House living room — sofa, flagstone floor and the kitchen island beyond, the forged oak-leaf chandelier overhead',
        ru: 'Гостиная Банного дома — диван, каменный пол и кухонный остров за ним, сверху кованая люстра из дубовых листьев',
        de: 'Der Wohnraum des Saunahauses — Sofa, Steinplattenboden und dahinter die Kücheninsel, darüber der geschmiedete Eichenlaub-Leuchter',
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
      },
    },
    {
      src: '/galerii/kiigud.jpeg',
      alt: {
        et: 'Kaks puidust võrkkiike kaskede vahel maja ees kevadel',
        en: 'Two timber hammocks slung between birches before the house in spring',
        ru: 'Два деревянных гамака между берёзами перед домом весной',
        de: 'Zwei Holzschaukeln zwischen Birken vor dem Haus im Frühling',
      },
    },
    {
      src: '/galerii/tiigimaja/terrass.jpeg',
      alt: {
        et: 'Lai puitterrass tiigi ääres, lamamistoolid ja pergola all istumisala',
        en: 'The broad timber deck at the pond, loungers and seating under the pergola',
        ru: 'Широкая деревянная терраса у пруда, шезлонги и зона отдыха под перголой',
        de: 'Die breite Holzterrasse am Teich, Liegen und Sitzplätze unter der Pergola',
      },
    },
    {
      src: '/galerii/tiigimaja/siseruum.jpeg',
      alt: {
        et: 'Elutuba rohelise diivani, nikerdatud katusetala ja lambanahkse vaibaga',
        en: 'The living room with its green sofa, carved roof beam and sheepskin rug',
        ru: 'Гостиная с зелёным диваном, резной балкой и ковром из овчины',
        de: 'Der Wohnraum mit grünem Sofa, geschnitztem Dachbalken und Schaffellteppich',
      },
    },
    {
      src: '/galerii/tiigimaja/kamin.jpeg',
      alt: {
        et: 'Kamin ja klaasseinad, mis avanevad murule ja metsale',
        en: 'The fireplace and glass walls opening onto lawn and forest',
        ru: 'Камин и стеклянные стены, открытые на газон и лес',
        de: 'Der Kamin und die Glaswände, die sich zu Wiese und Wald öffnen',
      },
    },
    {
      src: '/galerii/tiigimaja/kamin-eest.jpeg',
      alt: {
        et: 'Kamin eestvaates, uivpuust skulptuur korstna ees ja pink kolde all',
        en: 'The fireplace head-on, a driftwood sculpture set above it and a bench across the hearth',
        ru: 'Камин анфас, скульптура из коряги над ним и скамья перед очагом',
        de: 'Der Kamin von vorn, darüber eine Treibholzskulptur und eine Bank vor der Feuerstelle',
      },
    },
    {
      src: '/galerii/tiigimaja/kook.jpeg',
      alt: {
        et: 'Köögitasapind gaasipliidi, avariiuli ja retrokülmikuga',
        en: 'The kitchen counter with gas hob, open shelf and retro fridge',
        ru: 'Кухонная столешница с газовой плитой, открытой полкой и ретро-холодильником',
        de: 'Die Küchenzeile mit Gaskochfeld, offenem Regal und Retro-Kühlschrank',
      },
    },
    {
      src: '/galerii/tiigimaja/magamistuba.jpeg',
      alt: {
        et: 'Magamistuba põrandast laeni akendega niidule ja pealuuga palkseinal',
        en: 'The bedroom with floor-to-ceiling windows onto the meadow and a skull on the log wall',
        ru: 'Спальня с окнами в пол на луг и черепом на бревенчатой стене',
        de: 'Das Schlafzimmer mit raumhohen Fenstern zur Wiese und einem Schädel an der Blockwand',
      },
    },
    {
      src: '/galerii/tiigimaja/voodilamp.jpeg',
      alt: {
        et: 'Narmastega öölamp palgikettast öökapil voodi kõrval',
        en: 'A fringed bedside lamp on a shelf cut from a single round of log',
        ru: 'Ночник с бахромой на полке из спила бревна у кровати',
        de: 'Eine Nachttischlampe mit Fransen auf einem Regal aus einer einzigen Baumscheibe',
      },
    },
    {
      src: '/galerii/tiigimaja/vannituba.jpeg',
      alt: {
        et: 'Vannituba graniidist valamulaua ja dušinurgaga tumedas puidus',
        en: 'The bathroom with a granite vanity and walk-in shower in dark timber',
        ru: 'Ванная с гранитной столешницей и душевой в тёмном дереве',
        de: 'Das Bad mit Granitwaschtisch und begehbarer Dusche in dunklem Holz',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-esikylg-silt.jpeg',
      alt: {
        et: 'Tiigimaja esikülg, ukse kohal nikerdatud silt, terrass ja lamamistoolid',
        en: 'The front of the Pond House, its name carved above the door, deck and loungers',
        ru: 'Фасад Прудового дома, вырезанное название над дверью, терраса и шезлонги',
        de: 'Die Vorderseite des Teichhauses, der Name über der Tür eingeschnitzt, Terrasse und Liegen',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-terrass-kyljelt.jpeg',
      alt: {
        et: 'Tiigimaja küljelt – hele palkmaja laia terrassiga, taga kuusemets',
        en: 'The Pond House from the side — pale timber with its broad deck, spruce forest behind',
        ru: 'Прудовой дом сбоку — светлое дерево и широкая терраса, позади еловый лес',
        de: 'Das Teichhaus von der Seite — helles Holz mit breiter Terrasse, dahinter Fichtenwald',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-terrass-tiigi-aares.jpeg',
      alt: {
        et: 'Terrassi serv tiigi kaldal, vesiroosid ja puude peegeldused vees',
        en: 'The edge of the deck at the pond, water lilies and trees reflected in the water',
        ru: 'Край террасы у пруда, кувшинки и отражения деревьев в воде',
        de: 'Der Rand der Terrasse am Teich, Seerosen und die Spiegelung der Bäume im Wasser',
      },
    },
    {
      src: '/galerii/tiigimaja/tiigimaja-lamamistoolid.jpeg',
      alt: {
        et: 'Kaks puidust lamamistooli terrassil, tiik ja mets nende taga',
        en: 'Two wooden loungers on the deck, the pond and the forest beyond them',
        ru: 'Два деревянных шезлонга на террасе, за ними пруд и лес',
        de: 'Zwei Holzliegen auf der Terrasse, dahinter der Teich und der Wald',
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
      src: '/galerii/metsamaja/kamin.jpeg',
      alt: {
        et: 'Kamin vanast lauast seina ees, tohust korv puudega ja lambanahk põrandal',
        en: 'The fireplace against its reclaimed-timber breast, a birch-bark basket of logs and a sheepskin on the floor',
        ru: 'Камин у стены из состаренного дерева, берестяная корзина с дровами и овчина на полу',
        de: 'Der Kamin vor seiner Wand aus Altholz, ein Birkenrindenkorb mit Scheiten und ein Schaffell auf dem Boden',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-kamin.webp',
      alt: {
        et: 'Elutuba lõõmava kaminaga, türkiissinised tugitoolid akna all ja vein laual',
        en: 'The living room with the fire lit, teal recliners at the window and wine on the table',
        ru: 'Гостиная с горящим камином, бирюзовые кресла у окна и вино на столе',
        de: 'Der Wohnraum mit brennendem Feuer, petrolfarbenen Sesseln am Fenster und Wein auf dem Tisch',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-ulevalt.webp',
      alt: {
        et: 'Kogu elutuba ülalt: kööginurk, kamin ja ruuduline vaip',
        en: 'The whole living room from above — the kitchen corner, the fire and the checked rug',
        ru: 'Вся гостиная сверху — кухонный угол, камин и клетчатый ковёр',
        de: 'Der ganze Wohnraum von oben – die Küchenecke, das Feuer und der karierte Teppich',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-diivan.webp',
      alt: {
        et: 'Tepitud diivan lambanahkadega, sulgedest unenäopüüdja ja kööginurk taga',
        en: 'The buttoned sofa under sheepskins, a feather dreamcatcher and the kitchen counter behind',
        ru: 'Стёганый диван с овчинами, ловец снов из перьев и кухня позади',
        de: 'Das Chesterfield-Sofa unter Schaffellen, ein Traumfänger aus Federn und dahinter die Küchenzeile',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-rippkiik.webp',
      alt: {
        et: 'Rippkiik akna all, tugitool kamina ees ja uks murule',
        en: 'The hanging chair at the window, an armchair by the fire and the door onto the lawn',
        ru: 'Подвесное кресло у окна, кресло у камина и дверь на газон',
        de: 'Der Hängesessel am Fenster, ein Sessel am Feuer und die Tür zur Wiese',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba.jpeg',
      alt: {
        et: 'Avatud uks palkseintega magamistuppa, unenäopüüdja ja lambanahad',
        en: 'The open door into the log-walled sleeping room, a dreamcatcher and sheepskins',
        ru: 'Открытая дверь в спальню с бревенчатыми стенами, ловец снов и овчины',
        de: 'Die offene Tür zum Schlafraum mit Blockwänden, ein Traumfänger und Schaffelle',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-sees.webp',
      alt: {
        et: 'Voodi palkseinte vahel, valgustatud pullipea peatsis',
        en: 'The bed between the log walls, a lit bull’s head above the headboard',
        ru: 'Кровать между бревенчатыми стенами, подсвеченная голова быка над изголовьем',
        de: 'Das Bett zwischen den Blockwänden, darüber ein beleuchteter Stierkopf',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-ohtul.webp',
      alt: {
        et: 'Sama voodi õhtul, ainus valgus pullipea silmis',
        en: 'The same bed at night, the only light in the bull’s eyes',
        ru: 'Та же кровать вечером, единственный свет — в глазах быка',
        de: 'Dasselbe Bett bei Nacht, das einzige Licht in den Augen des Stiers',
      },
    },
    {
      src: '/galerii/metsamaja/tualett.webp',
      alt: {
        et: 'Valge plaaditud tualettruum kraanikausi ja peegliga',
        en: 'The white-tiled washroom with basin and mirror',
        ru: 'Санузел в белой плитке с раковиной и зеркалом',
        de: 'Der weiß geflieste Waschraum mit Becken und Spiegel',
      },
    },
  ],
}
