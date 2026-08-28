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
    // Breakfast & lunch. Mikk's photograph: the table already laid — juice, bread,
    // pastries, fruit — and the host lighting the candles before anyone sits down.
    // Square original, so the focus favours the table over the ceiling.
    src: '/galerii/hommikulaud.jpeg',
    focus: '50% 58%',
    alt: {
      et: 'Perenaine süütab küünlad kaetud hommikulaual palkmaja söögitoas',
      en: 'The host lighting the candles at the laid breakfast table in the log dining room',
      ru: 'Хозяйка зажигает свечи за накрытым столом к завтраку в бревенчатой столовой',
    },
  },
  {
    // Festive long table
    src: '/galerii/065.jpeg',
    focus: '50% 50%',
    alt: {
      et: 'Pidulikult kaetud pikk laud kristallklaaside ja lilledega',
      en: 'The long table laid for a dinner, with crystal glasses and flowers',
      ru: 'Праздничный длинный стол с хрусталём и цветами',
    },
  },
]
