import type { Lang } from './translations'

/**
 * One photograph per house, keyed by the slug used in translations.ts.
 *
 * To swap a house photo: drop the file in /public/images (or /public/galerii) and
 * change the src here. Landscape or square works best — these are wide crops on
 * desktop and shorter ones on phones. Set `focus` if the subject sits off-centre.
 */
export type HouseImage = {
  src: string
  alt: Record<Lang, string>
  focus?: string
}

export const HOUSE_IMAGES: Record<string, HouseImage> = {
  saunamaja: {
    // Water retouched: surface algae removed below the shoreline, everything above it
    // is the untouched original. See the note at the foot of this file.
    src: '/galerii/saunamaja-veepealt.jpeg',
    focus: '50% 42%',
    alt: {
      et: 'Saunamaja tiigi kaldal, mets peegeldumas vees',
      en: 'The Sauna House at the pond, forest mirrored in the water',
      ru: 'Банный дом у пруда, лес отражается в воде',
    },
  },
  tiigimaja: {
    src: '/images/tiigimaja.jpg',
    alt: {
      et: 'Tiigimaja tiigi kaldal',
      en: 'The Pond House on the water’s edge',
      ru: 'Прудовой дом на берегу пруда',
    },
  },
  metsamaja: {
    src: '/images/metsamaja.jpg',
    alt: {
      et: 'Metsamaja kõrgete kuuskede vahel',
      en: 'The Forest House among tall spruce',
      ru: 'Лесной дом среди высоких елей',
    },
  },
}

/**
 * Note on saunamaja-veepealt.jpeg — the pond had heavy surface algae. It was cleaned by
 * generating a water-only retouch and compositing it back below the shoreline, so the
 * building, trees and sky are the untouched original at full resolution. Verified: the
 * top 60% of the frame is pixel-identical to the source.
 *
 * Colour filtering alone does NOT work on this image — the algae and the green foliage
 * reflections share a hue range, so a mask catches both and smears the reflections.
 */
