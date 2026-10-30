import type { Lang } from './translations'

/**
 * One photograph per food card. Same pattern as lib/houses.ts — swap a card's
 * photo by changing the src here.
 */
export type ServiceImage = {
  src: string
  alt: Record<Lang, string>
  focus?: string
}

export const SERVICE_IMAGES: ServiceImage[] = [
  {
    // Breakfast & lunch. The buffet as guests actually meet it — the host behind the
    // table, cakes and berry desserts already out. Landscape original, no crop needed.
    src: '/galerii/toit/buffet-perenaine.jpeg',
    focus: '50% 50%',
    alt: {
      et: 'Perenaine kaetud puhvetilaua taga väliköögis, koogid ja marjadesserdid ees',
      en: 'The host behind the laid buffet in the outdoor kitchen, cakes and berry desserts to the front',
      ru: 'Хозяйка за накрытым столом в летней кухне, торты и ягодные десерты на переднем плане',
      de: 'Die Gastgeberin hinter dem gedeckten Buffet in der Außenküche, Kuchen und Beerendesserts im Vordergrund',
      es: 'La anfitriona tras el bufé servido en la cocina exterior, con tartas y postres de frutos rojos delante',
      sv: 'Värdinnan bakom den dukade buffén i utomhusköket, med kakor och bärdesserter längst fram',
      fi: 'Emäntä katetun noutopöydän takana ulkokeittiössä, edessä kakkuja ja marjajälkiruokia',
      lv: 'Saimniece aiz klātā bufetes galda āra virtuvē, priekšplānā kūkas un ogu deserti',
    },
  },
  {
    /*
     * The candlelit table, restored. It was swapped for the outdoor kitchen so the
     * picture matched the copy's first line; Mikk's judgement is that the fancy table
     * simply sells the card better, and he is right — "Pidulik pikk laud" is a promise
     * about an evening, not about a roof. The outdoor kitchen is two photographs along
     * in the ribbon directly below, which is close enough to answer the same sentence.
     *
     * Portrait original cropped to the card's 4:3, so the focus sits high enough to
     * keep the jasmine and the length of the table; lower down it was all napkin rings.
     */
    src: '/galerii/toit/pidulik-pikk-laud.jpeg',
    focus: '50% 38%',
    alt: {
      et: 'Küünlavalgel pikk laud messingist salvrätirõngaste ja jasmiinikimpudega',
      en: 'The long table by candlelight, with brass napkin rings and jars of jasmine',
      ru: 'Длинный стол при свечах, латунные кольца для салфеток и букеты жасмина',
      de: 'Die lange Tafel bei Kerzenschein, mit Serviettenringen aus Messing und Gläsern voll Jasmin',
      es: 'La mesa larga a la luz de las velas, con servilleteros de latón y tarros de jazmín',
      sv: 'Det långa bordet i levande ljus, med servettringar i mässing och burkar med jasmin',
      fi: 'Pitkä pöytä kynttilänvalossa, messinkiset lautasliinarenkaat ja jasmiinia purkeissa',
      lv: 'Garais galds sveču gaismā ar misiņa salvešu gredzeniem un jasmīnu burciņās',
    },
  },
]
