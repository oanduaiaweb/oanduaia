import type { Lang } from './translations'

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
    label: { et: 'Saunamaja', en: 'Sauna House', ru: 'Банный дом' },
    alt: {
      et: 'Oanduaia saunamaja palkseintega metsa serval',
      en: 'The Oanduaia sauna house, log-built at the forest edge',
      ru: 'Банный дом Oanduaia из бруса на опушке леса',
    },
  },
  {
    src: '/images/tiigimaja.jpg',
    id: 'tiigimaja',
    label: { et: 'Tiigimaja', en: 'Pond House', ru: 'Прудовой дом' },
    alt: {
      et: 'Tiigimaja tiigi kaldal Lahemaal',
      en: 'The Pond House on the water’s edge in Lahemaa',
      ru: 'Прудовой дом на берегу пруда в Лахемаа',
    },
  },
  {
    src: '/images/metsamaja.jpg',
    id: 'metsamaja',
    label: { et: 'Metsamaja', en: 'Forest House', ru: 'Лесной дом' },
    alt: {
      et: 'Metsamaja kõrgete kuuskede vahel',
      en: 'The Forest House among tall spruce',
      ru: 'Лесной дом среди высоких елей',
    },
  },
]

type A = [string, string, string, string] // [file, et, en, ru]

const RAW: A[] = [
  ['033', 'Roogkatusega palkmaja kivisel terrassil, taga mets', 'Thatched log house above a stone terrace, forest behind', 'Дом из бруса с камышовой крышей над каменной террасой'],
  ['034', 'Vaade üles läbi männilatvade päikese poole', 'Looking up through pine crowns towards the sun', 'Вид вверх сквозь кроны сосен на солнце'],
  ['035', 'Roogkatusega maja üle niidetud muru, lillepeenar ees', 'Thatched house across a mown lawn with a flower border', 'Дом с камышовой крышей за подстриженным газоном'],
  ['036', 'Puidust paadisild tiigil vesirooside vahel', 'A wooden jetty reaching into the lily-covered pond', 'Деревянный мостик на пруду среди кувшинок'],
  ['038', 'Tammelehed esiplaanil, roogkatusega maja hägusalt taga', 'Oak leaves in the foreground, the thatched house soft behind', 'Дубовые листья на переднем плане, дом с камышовой крышей позади'],
  ['039', 'Pikk roogkatusega palkmaja katuseakendega', 'The long thatched log house with dormer windows', 'Длинный дом из бруса с мансардными окнами'],
  ['040', 'Palkmaja veranda puitsammaste ja laudpõrandaga', 'Log house veranda with timber posts and a plank floor', 'Веранда дома из бруса с деревянными столбами'],
  ['041', 'Maja tiigi ääres lopsaka aiaga', 'The house beside the pond with a lush garden', 'Дом у пруда с пышным садом'],
  ['042', 'Sõudepaat tiigi kaldal, taga mets', 'A rowing boat moored at the pond, forest beyond', 'Лодка у берега пруда, за ним лес'],
  ['043', 'Paadisild tiigil, puud peegelduvad vees', 'The jetty on the pond with trees mirrored in the water', 'Мостик на пруду, деревья отражаются в воде'],
  ['044', 'Avatud puidust paviljon lillede ja välikööginurgaga', 'An open timber pavilion with flowers and an outdoor kitchen', 'Открытый деревянный павильон с цветами и летней кухней'],
  ['045', 'Roosad lilled esiplaanil, roogkatusega majad taga', 'Pink flowers in front of the thatched houses', 'Розовые цветы перед домами с камышовой крышей'],
  ['046', 'Langenud puud sammaldunud ürgmetsas', 'Fallen trees in mossy old-growth forest', 'Поваленные деревья во мшистом старом лесу'],
  ['047', 'Laps hoiab kaussi värskete maasikatega', 'A child holding a bowl of freshly picked strawberries', 'Ребёнок держит миску со свежей клубникой'],
  ['048', 'Tiik kaskede vahel, maja vasakul kaldal', 'The pond among birches, a house on the left bank', 'Пруд среди берёз, дом на левом берегу'],
  ['051', 'Roogkatusega maja tiigi ääres varakevadel', 'The thatched house by the pond in early spring', 'Дом с камышовой крышей у пруда ранней весной'],
  ['052', 'Palkmaja koridor, nahad laetalade peal, trepp taga', 'Log house hallway with hides over the beams and a staircase', 'Коридор дома из бруса со шкурами на балках'],
  ['053', 'Pikk puidust välilaud pinkidega maja ees', 'A long timber outdoor table and benches before the house', 'Длинный деревянный стол со скамьями перед домом'],
  ['054', 'Tiik varakevadel, raagus puud ja pilvine taevas', 'The pond in early spring under bare trees and cloud', 'Пруд ранней весной, голые деревья и облака'],
  ['055', 'Õitsvad pojengid aias, majad ja sinine taevas taga', 'Peonies in bloom with the houses and blue sky behind', 'Цветущие пионы в саду, дома и синее небо'],
  ['056', 'Roogkatusega varjualune jäätunud tiigi ääres talvel', 'A thatched shelter beside the frozen pond in winter', 'Навес с камышовой крышей у замёрзшего пруда зимой'],
  ['057', 'Lahtine raamat, milles on Oanduaia lugu ja fotod', 'An open book showing photographs of Oanduaia', 'Открытая книга с фотографиями Oanduaia'],
  ['058', 'Maja poolenisti jäätunud tiigi taga kevadel', 'The house behind the half-frozen pond in spring', 'Дом за наполовину замёрзшим прудом весной'],
  ['059', 'Jää ja peegeldused tiigil, kuused kaldal', 'Ice and reflections on the pond, spruce along the bank', 'Лёд и отражения на пруду, ели по берегу'],
  ['060', 'Tiik jää all sinise taeva ja kuuskede vahel', 'The pond under ice between blue sky and spruce', 'Пруд подо льдом между синим небом и елями'],
  ['061', 'Kevadine tiik, maja vasakul, raagus puud', 'The spring pond with the house at left among bare trees', 'Весенний пруд, дом слева среди голых деревьев'],
  ['062', 'Valgustatud majake õhtuhämaruses metsa serval', 'A lit cabin glowing at dusk on the forest edge', 'Освещённый домик в сумерках на опушке леса'],
  ['063', 'Küünlavalgel kaetud õhtusöögilaud tulpide ja klaasidega', 'A candlelit dinner table set with tulips and glassware', 'Накрытый при свечах стол с тюльпанами и бокалами'],
  ['064', 'Lumine rada palkmaja valgustatud akende poole', 'A snowy path towards the lit windows of the log house', 'Заснеженная тропа к освещённым окнам дома'],
  ['065', 'Kaetud laud taldrikute, klaaside ja mustade salvrätikutega', 'A laid table with plates, glasses and black napkins', 'Накрытый стол с тарелками, бокалами и салфетками'],
  ['066', 'Pidulik söögilaud lillede ja küünaldega akende ees', 'A festive dining table with flowers and candles by the windows', 'Праздничный стол с цветами и свечами у окон'],
  ['067', 'Kaetud söögilaud sügislillede ja kristallklaasidega', 'The dining table set with autumn flowers and crystal', 'Стол, сервированный осенними цветами и хрусталём'],
  ['068', 'Tume viilkatusega saunahoone kõrgete puude vahel', 'A dark gabled sauna building among tall trees', 'Тёмное строение сауны с двускатной крышей среди деревьев'],
  ['069', 'Perenaine valmistab kööginurgas akna all sööki', 'Cooking at the kitchen counter beside the window', 'Приготовление еды на кухне у окна'],
  ['070', 'Tuba puitseintega, aken metsa poole, kummut ja lamp', 'A timber-walled room with a forest window, chest and lamp', 'Комната с деревянными стенами, окном в лес и комодом'],
  ['071', 'Punane malmpott gaasipliidil, värsked ürdid aknalaual', 'A red pot on the gas hob with fresh herbs on the sill', 'Красная кастрюля на плите, свежие травы на подоконнике'],
  ['072', 'Sauna leiliruum puidust lavade ja sooja valgusega', 'The sauna room with timber benches and warm light', 'Парная с деревянными полками и тёплым светом'],
  ['073', 'Tiik sõnajalgade taga, maja puude vahel', 'The pond behind ferns, the house among the trees', 'Пруд за папоротниками, дом среди деревьев'],
  ['074', 'Kruusatee kiviäärise ja dekoratiivsete kõrrelistega', 'A gravel path with stone edging and ornamental grasses', 'Гравийная дорожка с каменным бордюром и злаками'],
  ['075', 'Vannituba puitseinte, peegli ja kivist valamulauaga', 'A bathroom with timber walls, mirror and stone counter', 'Ванная с деревянными стенами, зеркалом и каменной столешницей'],
  ['076', 'Puidust viilkatus taeva ja puulatvade taustal', 'A timber gable roof against sky and treetops', 'Деревянный фронтон на фоне неба и крон деревьев'],
  ['077', 'Avar elutuba diivani ja suurte metsavaatega akendega', 'An open living room with a sofa and wide forest windows', 'Просторная гостиная с диваном и окнами в лес'],
  ['078', 'Elutuba kamina, tugitooli ja puidust lauaga', 'The living room with fireplace, lounge chair and timber table', 'Гостиная с камином, креслом и деревянным столом'],
  ['079', 'Vannituba kahe peegli ja kivist valamulauaga', 'A bathroom with twin mirrors and a stone vanity', 'Ванная с двумя зеркалами и каменной столешницей'],
  ['080', 'Muru tiigini, sügisvärvides puud ja maja kaugemal', 'Lawn down to the pond, autumn trees and the house beyond', 'Газон к пруду, осенние деревья и дом вдали'],
  ['081', 'Roogkatusega maja murul dramaatilise pilvise taeva all', 'The thatched house on the lawn under a dramatic sky', 'Дом с камышовой крышей на газоне под драматичным небом'],
  ['082', 'Palkmaja sisevaade diivani, kööginurga ja kaminaga', 'Cabin interior with sofa, kitchenette and fireplace', 'Интерьер дома с диваном, кухней и камином'],
  ['083', 'Veekogu läbi suvise niidu ja lehtpuude', 'Water winding through summer meadow and broadleaf trees', 'Вода среди летнего луга и лиственных деревьев'],
  ['084', 'Marjadesserdid klaasides jääl, lilled taustal', 'Berry desserts in glasses on ice, flowers behind', 'Ягодные десерты в бокалах на льду, цветы позади'],
  ['086', 'Mesilane härjasilma õiel niidul', 'A bee on an ox-eye daisy in the meadow', 'Пчела на цветке нивяника на лугу'],
  ['087', 'Ümar roogkatusega hoone suvise tiigi ääres', 'A round thatched building beside the summer pond', 'Круглое строение с камышовой крышей у летнего пруда'],
  ['088', 'Kaks matkajat metsarajal päikesekiirte all', 'Two walkers on a forest trail in shafts of sunlight', 'Двое на лесной тропе в лучах солнца'],
  ['089', 'Kaetud laud taldrikute, klaaside ja lilledega', 'A place setting with plates, glasses and flowers', 'Сервировка стола с тарелками, бокалами и цветами'],
  ['090', 'Kevadine tiik peegeldab metsa ja pilvi', 'The spring pond mirroring forest and cloud', 'Весенний пруд отражает лес и облака'],
  ['091', 'Roogkatusega hoone peegeldub vaikses tiigis', 'A thatched building reflected in the still pond', 'Строение с камышовой крышей отражается в пруду'],
  ['092', 'Paadisild üle tumeda tiigi, mets peegeldub', 'The jetty over the dark pond with forest reflected', 'Мостик над тёмным прудом, лес в отражении'],
  ['093', 'Sõudepaat ja varjualune tiigi ääres kevadel', 'A rowing boat and shelter at the pond in spring', 'Лодка и навес у пруда весной'],
  ['094', 'Roogkatusega hoone ja paadisild tiigi kaldal', 'A thatched building and jetty at the pond’s edge', 'Строение с камышовой крышей и мостик у пруда'],
]


/** Added 26 Aug 2026 — descriptive filenames, same [file, et, en, ru] shape. */
const RAW_2026: [string, string, string, string][] = [
  ['kolm-hoonet', 'Kolm hoonet peegeldumas vaikses tiigis', 'Three buildings mirrored in the still pond', 'Три строения отражаются в спокойном пруду'],
  ['peamajast-ulevalt', 'Avar muru peamaja ees kõrgete pilvede all', 'Open lawn before the main house under high cloud', 'Открытый газон перед главным домом под облаками'],
  ['kiigud', 'Kaks puidust võrkkiike kaskede vahel maja ees', 'Two timber hammocks slung between birches before the house', 'Два деревянных гамака между берёзами перед домом'],
  ['saunamaja-veepealt', 'Saunamaja üle vee, mets peegeldumas tiigis', 'The sauna house across the water, forest mirrored in the pond', 'Банный дом через воду, лес отражается в пруду'],
  ['oja', 'Õhtupäike läbi puude tiigi kohal', 'Evening sun through the trees above the pond', 'Вечернее солнце сквозь деревья над прудом'],
  ['peamaja-eeshoov', 'Peamaja esine muru palkhoonete vahel', 'The forecourt lawn between the log buildings', 'Газон перед главным домом между строениями'],
  ['paadiaer', 'Tiik peegeldab metsa ja suvist taevast', 'The pond mirroring forest and summer sky', 'Пруд отражает лес и летнее небо'],
  ['tiigimaja-veepealt', 'Tiigimaja vaadatuna üle vee', 'The Pond House seen from across the water', 'Прудовой дом со стороны воды'],
  ['metsarada', 'Vaade üles läbi kõrgete männitüvede', 'Looking up through tall pine trunks', 'Вид вверх сквозь высокие стволы сосен'],
  ['ilus-tiik', 'Vaikne tiik vesiroosidega suvel', 'The still pond with water lilies in summer', 'Тихий пруд с кувшинками летом'],
  ['puu-ja-majad', 'Vana puu murul, majad taga', 'An old tree on the lawn with the houses behind', 'Старое дерево на газоне, дома позади'],
  ['kivid-ja-tiik', 'Rändrahnud tiigi kaldal', 'Boulders along the edge of the pond', 'Валуны на берегу пруда'],
  ['tiik-selge-vesi', 'Õhtupäike puude vahelt üle vaikse tiigi', 'Evening sun through the trees across the still pond', 'Вечернее солнце сквозь деревья над тихим прудом'],
  ['ait-ja-saun', 'Vana ait ja saun muru serval', 'The old granary and sauna at the lawn’s edge', 'Старый амбар и сауна на краю газона'],
  ['metsamaja-kaugelt', 'Metsamaja üle muru metsa taustal', 'The Forest House across the lawn against the forest', 'Лесной дом через газон на фоне леса'],
  ['metsamaja-tagant', 'Metsamaja tagantvaade puude vahelt', 'The Forest House from behind, seen through the trees', 'Лесной дом сзади, сквозь деревья'],
  ['saun-ja-tiigimaja', 'Saun ja tiigimaja tiigi ääres', 'The sauna and the Pond House at the water', 'Сауна и Прудовой дом у воды'],
  ['saunamaja-ja-peamaja', 'Saunamaja ja peamaja üle muru', 'The sauna house and main house across the lawn', 'Банный дом и главный дом через газон'],
  ['peamaja', 'Peamaja roogkatuse ja palkseintega', 'The main house with its thatched roof and log walls', 'Главный дом с камышовой крышей и бревенчатыми стенами'],
  ['muru-ja-majad', 'Niidetud muru majade vahel suvepäeval', 'Mown lawn between the houses on a summer day', 'Подстриженный газон между домами летним днём'],
  ['kasvuhoone-valikook', 'Kasvuhoone ja väliköök aias', 'The greenhouse and outdoor kitchen in the garden', 'Теплица и летняя кухня в саду'],
  ['valikook-istumine', 'Kaetud välisöögikoht pika puidust lauaga', 'The covered outdoor dining area with its long timber table', 'Крытая летняя столовая с длинным деревянным столом'],
  ['valikook', 'Väliköögi istumisala rippuvate lillede all', 'The outdoor kitchen seating beneath hanging flowers', 'Зона отдыха летней кухни под подвесными цветами'],
  ['kokteil', 'Kokteiliklaas tiigi kohal õhtupäikeses', 'A cocktail glass held above the pond in evening light', 'Бокал коктейля над прудом в вечернем свете'],
  ['lilled', 'Lillad petuunikad puidust istutuskastis terrassil', 'Purple petunias in a timber planter on the deck', 'Фиолетовые петунии в деревянном ящике на террасе'],
  ['istumine-taevas', 'Välisistumisala avara sinise taeva all', 'The outdoor seating area under a wide blue sky', 'Зона отдыха под широким синим небом'],
]

/**
 * The table, added 28 Aug 2026. Same shape; the name carries the `toit/` folder.
 *
 * These also run as the ribbon under the food cards, and the two card photographs are
 * here too — unlike the house interiors, which were pulled OUT of this gallery, food is
 * not about one building. It is the property, which is what this gallery is for.
 */
const RAW_TOIT: [string, string, string, string][] = [
  ['toit/buffet-perenaine', 'Perenaine kaetud puhvetilaua taga väliköögis, koogid ja marjadesserdid ees', 'The host behind the laid buffet in the outdoor kitchen, cakes and berry desserts to the front', 'Хозяйка за накрытым столом в летней кухне, торты и ягодные десерты впереди'],
  ['toit/pidulik-pikk-laud', 'Küünlavalgel pikk laud messingist salvrätirõngaste ja jasmiinikimpudega', 'The long table by candlelight, with brass napkin rings and jars of jasmine', 'Длинный стол при свечах, латунные кольца для салфеток и букеты жасмина'],
  ['toit/marjadesserdid', 'Marjadesserdid klaasides puidust kandikul, metsalilled ja kuusk taga', 'Berry desserts in coupe glasses on a wooden tray, wildflowers and spruce behind', 'Ягодные десерты в креманках на деревянном подносе, полевые цветы и ели позади'],
  ['toit/valikook-ohtul', 'Väliköök hämaras, suitsevad tulealused murul', 'The outdoor kitchen at dusk, fire bowls smoking on the lawn', 'Летняя кухня в сумерках, дымящиеся жаровни на газоне'],
  ['toit/talvine-suupistelaud', 'Talvine suupistelaud juustu ja oliividega, lumi klaasuste taga', 'A winter spread of cheese and olives, snow beyond the glass doors', 'Зимний стол с сыром и оливками, снег за стеклянными дверями'],
  ['toit/roheline-laud', 'Roheliselt kaetud laud kiviterrassil, kristall ja vahuvein', 'The table laid in green on the stone terrace, crystal and sparkling wine', 'Стол в зелёном на каменной террасе, хрусталь и игристое'],
  ['toit/tee-lumes', 'Aurav klaas teed sepistatud laual lumes', 'A steaming glass of tea on a wrought-iron table in the snow', 'Дымящийся стакан чая на кованом столе в снегу'],
  ['toit/pergolalaud', 'Kaetud laud kuuele pergola all, mets kardinate taga', 'A table laid for six under the pergola, forest behind the curtains', 'Стол на шестерых под перголой, лес за занавесями'],
  ['toit/viinamarjad-ja-klaasid', 'Viinamarjad, maasikad ja oliivid vaagnal, šampanjaklaasid ja küünlajalg', 'Grapes, strawberries and olives on trays, champagne flutes and a brass candelabra', 'Виноград, клубника и оливки на подносах, бокалы и бронзовый канделябр'],
  ['toit/roosa-vein', 'Roosa vein kullatud jahutuskausis terrassil, roogkatusega maja taga', 'Rosé cooling in a gilded bowl on the deck, the thatched house beyond', 'Розовое вино в золочёной чаше на террасе, дом с камышовой крышей позади'],
  ['toit/kuldne-laudlina', 'Kuldne laudlina, roosid, põlev küünal ja pakitud kingitus', 'A gold damask cloth with roses, a lit candle and a wrapped gift', 'Золотая скатерть, розы, зажжённая свеча и упакованный подарок'],
  ['toit/laud-tiigi-aares', 'Juustu- ja vorstivaagen tiigi ääres kevadpäikeses', 'A board of cheese and cured meats by the pond in spring sun', 'Доска с сыром и мясными закусками у пруда на весеннем солнце'],
  ['toit/klaasid-ja-lilled', 'Kaks klaasi tõstetud suure lillekimbu kõrval, lumi akna taga', 'Two glasses raised beside a tall arrangement of flowers, snow through the window', 'Два бокала подняты у большого букета, снег за окном'],
]

export const GALLERY_PHOTOS: GalleryPhoto[] = [...RAW_TOIT, ...RAW_2026, ...RAW].map(([n, et, en, ru]) => ({
  src: `/galerii/${n}.jpeg`,
  alt: { et, en, ru },
}))

export const ALL_PHOTOS: GalleryPhoto[] = [...HOUSE_PHOTOS, ...GALLERY_PHOTOS]
