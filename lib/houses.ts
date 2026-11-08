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
      de: 'Das Saunahaus am Teich, der Wald spiegelt sich im Wasser',
      es: 'La Casa de la Sauna junto al estanque, con el bosque reflejado en el agua',
      sv: 'Bastuhuset vid dammen, skogen speglas i vattnet',
      fi: 'Saunatalo lammen rannalla, metsä heijastuu veteen',
      lv: 'Pirts māja pie dīķa, mežs atspoguļojas ūdenī',
    },
  },
  tiigimaja: {
    src: '/galerii/tiigimaja-veepealt.jpeg',
    focus: '50% 45%',
    alt: {
      et: 'Tiigimaja üle vee, mets ja maja peegeldumas tiigis',
      en: 'The Pond House across the water, house and forest mirrored in the pond',
      ru: 'Прудовой дом за прудом, дом и лес отражаются в пруду',
      de: 'Das Teichhaus jenseits des Teichs, Haus und Wald spiegeln sich im Teich',
      es: 'La Casa del Estanque al otro lado del agua, con la casa y el bosque reflejados en el estanque',
      sv: 'Dammhuset sett över vattnet, huset och skogen speglas i dammen',
      fi: 'Lampitalo veden takana, talo ja metsä heijastuvat lampeen',
      lv: 'Dīķa māja pāri ūdenim, māja un mežs atspoguļojas dīķī',
    },
  },
  metsamaja: {
    src: '/galerii/metsamaja/maja-muru.jpeg',
    focus: '60% 60%',
    alt: {
      et: 'Metsamaja kevadisel murul, taga kuused ja kased',
      en: 'The Forest House on a green spring lawn, spruces and birches behind it',
      ru: 'Лесной дом на зелёной весенней лужайке, позади ели и берёзы',
      de: 'Das Waldhaus auf einer grünen Frühlingswiese, dahinter Fichten und Birken',
      es: 'La Casa del Bosque sobre un césped verde de primavera, con abetos y abedules detrás',
      sv: 'Skogshuset på en grön vårgräsmatta, granar och björkar bakom',
      fi: 'Metsätalo vihreällä kevätnurmella, takana kuusia ja koivuja',
      lv: 'Meža māja uz zaļa pavasara zāliena, aiz tās egles un bērzi',
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
