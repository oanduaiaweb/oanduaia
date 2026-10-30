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
    src: '/galerii/metsamaja-paikeses.jpeg',
    focus: '50% 55%',
    alt: {
      et: 'Metsamaja päikesepaistel kaskede ja kuuskede vahel, ees roheline muru',
      en: 'The Forest House in sunshine between birch and spruce, a green lawn in front',
      ru: 'Лесной дом в солнечный день среди берёз и елей, впереди зелёная лужайка',
      de: 'Das Waldhaus in der Sonne zwischen Birken und Fichten, davor eine grüne Wiese',
      es: 'La Casa del Bosque al sol entre abedules y abetos, con un césped verde delante',
      sv: 'Skogshuset i solsken mellan björkar och granar, en grön gräsmatta framför',
      fi: 'Metsätalo auringonpaisteessa koivujen ja kuusien välissä, edessä vihreä nurmikko',
      lv: 'Meža māja saulē starp bērziem un eglēm, priekšā zaļš zāliens',
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
