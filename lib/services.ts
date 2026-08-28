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
      ru: 'Хозяйка за накрытым столом в летней кухне, торты и ягодные десерты впереди',
    },
  },
  {
    // The festive long table, lit. Portrait original cropped to the card's 4:3, so the
    // focus sits high enough to keep the jasmine and the table running away — lower
    // down the crop was all napkin rings and no length.
    src: '/galerii/toit/pidulik-pikk-laud.jpeg',
    focus: '50% 38%',
    alt: {
      et: 'Küünlavalgel pikk laud messingist salvrätirõngaste ja jasmiinikimpudega',
      en: 'The long table by candlelight, with brass napkin rings and jars of jasmine',
      ru: 'Длинный стол при свечах, латунные кольца для салфеток и букеты жасмина',
    },
  },
]
