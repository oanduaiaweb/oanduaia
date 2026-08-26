import type { Lang } from './translations'

export type HeroSlide = { src: string; alt: Record<Lang, string> }

/** Crossfade timing, in ms. HOLD is how long a slide sits still; FADE is the dissolve. */
export const HERO_HOLD = 3600
export const HERO_FADE = 1100

/**
 * Hero slideshow. Use **landscape** images only — the hero is a wide crop and a portrait
 * photo loses its subject. Add a slide by appending one entry.
 *
 * The first entry is the LCP image: it is the only one in the initial HTML and carries
 * `priority`. The rest mount after first paint so they do not compete with it.
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/images/hero.jpg',
    alt: {
      et: 'Lahemaa mets Oanduaia ümber',
      en: 'The Lahemaa forest around Oanduaia',
      ru: 'Лес Лахемаа вокруг Oanduaia',
    },
  },
  {
    src: '/galerii/039.jpeg',
    alt: {
      et: 'Pikk roogkatusega palkmaja suvises päikeses',
      en: 'The long thatched log house in summer sun',
      ru: 'Длинный дом из бруса с камышовой крышей на летнем солнце',
    },
  },
  {
    src: '/galerii/087.jpeg',
    alt: {
      et: 'Ümar roogkatusega hoone tiigi ääres',
      en: 'A round thatched building beside the pond',
      ru: 'Круглое строение с камышовой крышей у пруда',
    },
  },
  {
    src: '/galerii/043.jpeg',
    alt: {
      et: 'Paadisild tiigil, puud peegelduvad vees',
      en: 'The jetty on the pond with trees mirrored in the water',
      ru: 'Мостик на пруду, деревья отражаются в воде',
    },
  },
  {
    src: '/galerii/051.jpeg',
    alt: {
      et: 'Roogkatusega maja tiigi ääres varakevadel',
      en: 'The thatched house by the pond in early spring',
      ru: 'Дом с камышовой крышей у пруда ранней весной',
    },
  },
  {
    src: '/galerii/kolm-hoonet.jpeg',
    alt: {
      et: 'Kolm hoonet peegeldumas vaikses tiigis',
      en: 'Three buildings mirrored in the still pond',
      ru: 'Три строения отражаются в спокойном пруду',
    },
  },
  {
    src: '/galerii/peamajast-ulevalt.jpeg',
    alt: {
      et: 'Avar muru peamaja ees kõrgete pilvede all',
      en: 'Open lawn before the main house under high cloud',
      ru: 'Открытый газон перед главным домом под облаками',
    },
  },
  {
    src: '/galerii/kiigud.jpeg',
    alt: {
      et: 'Kaks puidust võrkkiike kaskede vahel maja ees',
      en: 'Two timber hammocks slung between birches before the house',
      ru: 'Два деревянных гамака между берёзами перед домом',
    },
  },
  {
    src: '/galerii/saunamaja-veepealt.jpeg',
    alt: {
      et: 'Saunamaja üle vee, mets peegeldumas tiigis',
      en: 'The sauna house across the water, forest mirrored in the pond',
      ru: 'Банный дом через воду, лес отражается в пруду',
    },
  },
  {
    src: '/galerii/oja.jpeg',
    alt: {
      et: 'Õhtupäike läbi puude tiigi kohal',
      en: 'Evening sun through the trees above the pond',
      ru: 'Вечернее солнце сквозь деревья над прудом',
    },
  },
]
