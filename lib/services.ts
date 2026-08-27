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
    // Breakfast & lunch — the card's own text says "all made by the host herself",
    // so the photograph shows exactly that.
    src: '/galerii/069.jpeg',
    focus: '50% 40%',
    alt: {
      et: 'Perenaine valmistab kööginurgas akna all sööki',
      en: 'The host preparing food at the kitchen counter by the window',
      ru: 'Хозяйка готовит на кухне у окна',
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
