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
      },
    },
    {
      src: '/galerii/saunamaja/elutuba.jpeg',
      alt: {
        et: 'Avar elutuba lambanahkadega diivanil, tammelehtedega lühter ja paeplaatidest põrand',
        en: 'The open living room with sheepskins on the sofa, an oak-leaf chandelier and a flagstone floor',
        ru: 'Просторная гостиная с овчинами на диване, люстрой из дубовых листьев и каменным полом',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar.jpeg',
      alt: {
        et: 'Köögisaar telliskivijalal, puuküttega pliit ja rippuvad kruusid palgi all',
        en: 'The kitchen island on a brick base, a wood-fired range and mugs hanging from the beam',
        ru: 'Кухонный остров на кирпичном основании, дровяная плита и кружки на балке',
      },
    },
    {
      src: '/galerii/saunamaja/pesuruum.jpeg',
      alt: {
        et: 'Pesuruum telliskivist dušinišiga ja saunauksega palkseinas',
        en: 'The washroom with its brick shower alcove and the sauna door in the log wall',
        ru: 'Душевая с кирпичной нишей и дверью в сауну в бревенчатой стене',
      },
    },
    {
      src: '/galerii/saunamaja/vahuvein.jpeg',
      alt: {
        et: 'Vahuvein ja marjad kristallklaaside kõrval graniitlaual',
        en: 'Sparkling wine and berries beside crystal glasses on the granite table',
        ru: 'Игристое вино и ягоды рядом с хрустальными бокалами на гранитном столе',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar-ja-elutuba.jpeg',
      alt: {
        et: 'Köögisaar ja elutuba ühes ruumis hämaras, potiraam ja kruusid palgi all',
        en: 'The kitchen island and the living room in one space at dusk, pots and mugs hung from the beam',
        ru: 'Кухонный остров и гостиная в одном пространстве в сумерках, посуда на балке',
      },
    },
    {
      src: '/galerii/saunamaja/sepisrinnatis.jpeg',
      alt: {
        et: 'Sepistatud tammeokstega rõdupiire lae all, elutuba allpool',
        en: 'The forged oak-branch balustrade of the loft beneath the timber ceiling, the room below',
        ru: 'Кованое ограждение антресоли в виде дубовых ветвей под потолком, комната внизу',
      },
    },
    {
      src: '/galerii/saunamaja/vokk.jpeg',
      alt: {
        et: 'Vana vokk rõdu põrandal sepispiirde kõrval',
        en: 'An old spinning wheel on the loft floor beside the forged railing',
        ru: 'Старая прялка на полу антресоли рядом с кованым ограждением',
      },
    },
    {
      src: '/galerii/saunamaja/koogisaar-ohtul.jpeg',
      alt: {
        et: 'Köögisaar õhtul, baaritoolid, merevaigukarva valgustid ja riidas küttepuud',
        en: 'The kitchen island in the evening with bar stools, amber pendant lights and stacked firewood',
        ru: 'Кухонный остров вечером — барные стулья, янтарные светильники и поленница',
      },
    },
    {
      src: '/galerii/saunamaja/elutoast-kooki.jpeg',
      alt: {
        et: 'Vaade diivanilt üle paeplaatide köögisaareni, tammelehtedega lühter lae all',
        en: 'The view from the sofa across the flagstones to the kitchen island, the oak-leaf chandelier overhead',
        ru: 'Вид с дивана через каменный пол на кухонный остров, люстра из дубовых листьев наверху',
      },
    },
    {
      src: '/galerii/saunamaja/elutuba-luhter.jpeg',
      alt: {
        et: 'Elutuba tammelehtedega lühtri all, aknad kolmel seinal muru poole',
        en: 'The living room under the oak-leaf chandelier, windows on three sides onto the lawn',
        ru: 'Гостиная под люстрой из дубовых листьев, окна с трёх сторон на газон',
      },
    },
    {
      src: '/galerii/saunamaja/saun.webp',
      alt: {
        et: 'Leiliruum, kuumad kivid kerisel ja kaseviht ämbris lava all',
        en: 'The steam room, hot stones on the stove and a birch whisk in a bucket beneath the bench',
        ru: 'Парная — раскалённые камни на печи и берёзовый веник в ведре под полком',
      },
    },
    {
      src: '/galerii/saunamaja/ratikud.webp',
      alt: {
        et: 'Oanduaia tikandiga rätikud ja teokarbid sauna pingil',
        en: 'Towels embroidered Oanduaia, with shells, on the sauna bench',
        ru: 'Полотенца с вышивкой Oanduaia и ракушки на банной скамье',
      },
    },
    {
      src: '/galerii/saunamaja/elutuba-talvel.webp',
      alt: {
        et: 'Elutuba talvel, lumi akende taga ja küünlad graniitlaual',
        en: 'The living room in winter, snow beyond the windows and candles on the granite table',
        ru: 'Гостиная зимой, снег за окнами и свечи на гранитном столе',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-ulal.webp',
      alt: {
        et: 'Rõdukorruse voodi katusekalde all, sepispiire ja laeventilaator',
        en: 'The loft bed under the roof slope, the forged railing and a ceiling fan',
        ru: 'Кровать на антресоли под скатом крыши, кованое ограждение и вентилятор',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-lilleline.webp',
      alt: {
        et: 'Teine voodi rõdul, lilleline tekk ja sepistatud okstega piire',
        en: 'The second bed in the loft, a floral quilt and the forged branch railing',
        ru: 'Вторая кровать на антресоли, покрывало в цветах и кованое ограждение',
      },
    },
    {
      src: '/galerii/saunamaja/magamistuba-kuunlaga.webp',
      alt: {
        et: 'Voodi palkseina ääres, küünal seinaküünlajalas ja pilt kohal',
        en: 'A bed against the log wall, a candle in its sconce and a picture above',
        ru: 'Кровать у бревенчатой стены, свеча в бра и картина над ней',
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
      },
    },
    {
      src: '/galerii/kiigud.jpeg',
      alt: {
        et: 'Kaks puidust võrkkiike kaskede vahel maja ees kevadel',
        en: 'Two timber hammocks slung between birches before the house in spring',
        ru: 'Два деревянных гамака между берёзами перед домом весной',
      },
    },
    {
      src: '/galerii/tiigimaja/terrass.jpeg',
      alt: {
        et: 'Lai puitterrass tiigi ääres, lamamistoolid ja pergola all istumisala',
        en: 'The broad timber deck at the pond, loungers and seating under the pergola',
        ru: 'Широкая деревянная терраса у пруда, шезлонги и зона отдыха под перголой',
      },
    },
    {
      src: '/galerii/tiigimaja/siseruum.jpeg',
      alt: {
        et: 'Elutuba rohelise diivani, nikerdatud katusetala ja lambanahkse vaibaga',
        en: 'The living room with its green sofa, carved roof beam and sheepskin rug',
        ru: 'Гостиная с зелёным диваном, резной балкой и ковром из овчины',
      },
    },
    {
      src: '/galerii/tiigimaja/kamin.jpeg',
      alt: {
        et: 'Kamin ja klaasseinad, mis avanevad murule ja metsale',
        en: 'The fireplace and glass walls opening onto lawn and forest',
        ru: 'Камин и стеклянные стены, открытые на газон и лес',
      },
    },
    {
      src: '/galerii/tiigimaja/kook.jpeg',
      alt: {
        et: 'Köögitasapind gaasipliidi, avariiuli ja retrokülmikuga',
        en: 'The kitchen counter with gas hob, open shelf and retro fridge',
        ru: 'Кухонная столешница с газовой плитой, открытой полкой и ретро-холодильником',
      },
    },
    {
      src: '/galerii/tiigimaja/magamistuba.jpeg',
      alt: {
        et: 'Magamistuba põrandast laeni akendega niidule ja pealuuga palkseinal',
        en: 'The bedroom with floor-to-ceiling windows onto the meadow and a skull on the log wall',
        ru: 'Спальня с окнами в пол на луг и черепом на бревенчатой стене',
      },
    },
    {
      src: '/galerii/tiigimaja/vannituba.jpeg',
      alt: {
        et: 'Vannituba graniidist valamulaua ja dušinurgaga tumedas puidus',
        en: 'The bathroom with a granite vanity and walk-in shower in dark timber',
        ru: 'Ванная с гранитной столешницей и душевой в тёмном дереве',
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
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-kamin.webp',
      alt: {
        et: 'Elutuba lõõmava kaminaga, türkiissinised tugitoolid akna all ja vein laual',
        en: 'The living room with the fire lit, teal recliners at the window and wine on the table',
        ru: 'Гостиная с горящим камином, бирюзовые кресла у окна и вино на столе',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-ulevalt.webp',
      alt: {
        et: 'Kogu elutuba ülalt: kööginurk, kamin ja ruuduline vaip',
        en: 'The whole living room from above — the kitchen corner, the fire and the checked rug',
        ru: 'Вся гостиная сверху — кухонный угол, камин и клетчатый ковёр',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-diivan.webp',
      alt: {
        et: 'Tepitud diivan lambanahkadega, sulgedest unenäopüüdja ja kööginurk taga',
        en: 'The buttoned sofa under sheepskins, a feather dreamcatcher and the kitchen counter behind',
        ru: 'Стёганый диван с овчинами, ловец снов из перьев и кухня позади',
      },
    },
    {
      src: '/galerii/metsamaja/elutuba-rippkiik.webp',
      alt: {
        et: 'Rippkiik akna all, tugitool kamina ees ja uks murule',
        en: 'The hanging chair at the window, an armchair by the fire and the door onto the lawn',
        ru: 'Подвесное кресло у окна, кресло у камина и дверь на газон',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba.jpeg',
      alt: {
        et: 'Avatud uks palkseintega magamistuppa, unenäopüüdja ja lambanahad',
        en: 'The open door into the log-walled sleeping room, a dreamcatcher and sheepskins',
        ru: 'Открытая дверь в спальню с бревенчатыми стенами, ловец снов и овчины',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-sees.webp',
      alt: {
        et: 'Voodi palkseinte vahel, valgustatud pullipea peatsis',
        en: 'The bed between the log walls, a lit bull’s head above the headboard',
        ru: 'Кровать между бревенчатыми стенами, подсвеченная голова быка над изголовьем',
      },
    },
    {
      src: '/galerii/metsamaja/magamistuba-ohtul.webp',
      alt: {
        et: 'Sama voodi õhtul, ainus valgus pullipea silmis',
        en: 'The same bed at night, the only light in the bull’s eyes',
        ru: 'Та же кровать вечером, единственный свет — в глазах быка',
      },
    },
    {
      src: '/galerii/metsamaja/tualett.webp',
      alt: {
        et: 'Valge plaaditud tualettruum kraanikausi ja peegliga',
        en: 'The white-tiled washroom with basin and mirror',
        ru: 'Санузел в белой плитке с раковиной и зеркалом',
      },
    },
  ],
}
