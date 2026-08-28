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
        et: 'Avar elutuba lambanahkadega diivanil, sarvedest lühter ja paeplaatidest põrand',
        en: 'The open living room with sheepskins on the sofa, an antler chandelier and a flagstone floor',
        ru: 'Просторная гостиная с овчинами на диване, люстрой из рогов и каменным полом',
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
  ],
  tiigimaja: [
    {
      src: '/galerii/tiigimaja-siseruum.jpeg',
      alt: {
        et: 'Elutuba rohelise diivani, nikerdatud katusetala ja lambanahkse vaibaga',
        en: 'The living room with its green sofa, carved roof beam and sheepskin rug',
        ru: 'Гостиная с зелёным диваном, резной балкой и ковром из овчины',
      },
    },
    {
      src: '/galerii/tiigimaja-kamin.jpeg',
      alt: {
        et: 'Kamin ja klaasseinad, mis avanevad murule ja metsale',
        en: 'The fireplace and glass walls opening onto lawn and forest',
        ru: 'Камин и стеклянные стены, открытые на газон и лес',
      },
    },
    {
      src: '/galerii/tiigimaja-kook.jpeg',
      alt: {
        et: 'Köögitasapind gaasipliidi, avariiuli ja retrokülmikuga',
        en: 'The kitchen counter with gas hob, open shelf and retro fridge',
        ru: 'Кухонная столешница с газовой плитой, открытой полкой и ретро-холодильником',
      },
    },
    {
      src: '/galerii/tiigimaja-magamistuba.jpeg',
      alt: {
        et: 'Magamistuba põrandast laeni akendega niidule ja pealuuga palkseinal',
        en: 'The bedroom with floor-to-ceiling windows onto the meadow and a skull on the log wall',
        ru: 'Спальня с окнами в пол на луг и черепом на бревенчатой стене',
      },
    },
    {
      src: '/galerii/tiigimaja-vannituba.jpeg',
      alt: {
        et: 'Vannituba graniidist valamulaua ja dušinurgaga tumedas puidus',
        en: 'The bathroom with a granite vanity and walk-in shower in dark timber',
        ru: 'Ванная с гранитной столешницей и душевой в тёмном дереве',
      },
    },
  ],
}
