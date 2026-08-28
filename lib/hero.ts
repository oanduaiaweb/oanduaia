import type { Lang } from './translations'

export type HeroSlide = {
  src: string
  /**
   * The file's real pixels, measured not guessed. They decide how much of the photograph
   * survives the phone crop, and therefore how wide a file to ask for — see `slideSizes`.
   */
  w: number
  h: number
  alt: Record<Lang, string>
  /**
   * object-position for the crop. The hero is a wide box on desktop and a tall one on
   * phones, so the same photograph loses a different part of itself in each. Set the
   * point that must survive; omit for centre.
   */
  focus?: { desktop?: string; mobile?: string }
}

/** Crossfade timing, in ms. HOLD is how long a slide sits still; FADE is the dissolve. */
export const HERO_HOLD = 2400
export const HERO_FADE = 750

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
    w: 1800,
    h: 1200,
    focus: { desktop: '50% 50%', mobile: '28% 50%' },
    alt: {
      et: 'Lahemaa mets Oanduaia ümber',
      en: 'The Lahemaa forest around Oanduaia',
      ru: 'Лес Лахемаа вокруг Oanduaia',
    },
  },
  {
    src: '/galerii/039.jpeg',
    w: 1600,
    h: 1200,
    focus: { desktop: '50% 50%', mobile: '50% 50%' },
    alt: {
      et: 'Pikk roogkatusega palkmaja suvises päikeses',
      en: 'The long thatched log house in summer sun',
      ru: 'Длинный дом из бруса с камышовой крышей на летнем солнце',
    },
  },
  {
    src: '/galerii/087.jpeg',
    w: 2048,
    h: 1536,
    focus: { desktop: '62% 50%', mobile: '80% 50%' },
    alt: {
      et: 'Ümar roogkatusega hoone tiigi ääres',
      en: 'A round thatched building beside the pond',
      ru: 'Круглое строение с камышовой крышей у пруда',
    },
  },
  {
    src: '/galerii/051.jpeg',
    w: 1600,
    h: 1321,
    focus: { desktop: '45% 50%', mobile: '32% 50%' },
    alt: {
      et: 'Roogkatusega maja tiigi ääres varakevadel',
      en: 'The thatched house by the pond in early spring',
      ru: 'Дом с камышовой крышей у пруда ранней весной',
    },
  },
  {
    src: '/galerii/kolm-hoonet.jpeg',
    w: 1536,
    h: 2048,
    focus: { desktop: '50% 38%', mobile: '50% 45%' },
    alt: {
      et: 'Kolm hoonet peegeldumas vaikses tiigis',
      en: 'Three buildings mirrored in the still pond',
      ru: 'Три строения отражаются в спокойном пруду',
    },
  },
  {
    src: '/galerii/peamajast-ulevalt.jpeg',
    w: 2048,
    h: 1536,
    focus: { desktop: '40% 50%', mobile: '26% 50%' },
    alt: {
      et: 'Avar muru peamaja ees kõrgete pilvede all',
      en: 'Open lawn before the main house under high cloud',
      ru: 'Открытый газон перед главным домом под облаками',
    },
  },
  {
    src: '/galerii/kiigud.jpeg',
    w: 2048,
    h: 2048,
    focus: { desktop: '50% 58%', mobile: '50% 55%' },
    alt: {
      et: 'Kaks puidust võrkkiike kaskede vahel maja ees',
      en: 'Two timber hammocks slung between birches before the house',
      ru: 'Два деревянных гамака между берёзами перед домом',
    },
  },
  {
    src: '/galerii/saunamaja-veepealt.jpeg',
    w: 1536,
    h: 2048,
    focus: { desktop: '50% 45%', mobile: '50% 45%' },
    alt: {
      et: 'Saunamaja üle vee, mets peegeldumas tiigis',
      en: 'The sauna house across the water, forest mirrored in the pond',
      ru: 'Банный дом через воду, лес отражается в пруду',
    },
  },
  {
    src: '/galerii/oja.jpeg',
    w: 1536,
    h: 2048,
    focus: { desktop: '50% 42%', mobile: '50% 40%' },
    alt: {
      et: 'Õhtupäike läbi puude tiigi kohal',
      en: 'Evening sun through the trees above the pond',
      ru: 'Вечернее солнце сквозь деревья над прудом',
    },
  },
]

/**
 * The `sizes` hint for one slide.
 *
 * On a phone the hero is a tall, narrow box and `object-fit: cover` scales each photograph
 * until its shorter dimension fills. A LANDSCAPE slide therefore renders far wider than the
 * viewport — its width spills off both edges — and asking for 100vw fetches a file sized for
 * the screen which is then upscaled to fill. That was why the phone hero looked soft.
 *
 * A PORTRAIT slide fills the box by width instead, so 100vw is already right for it, and
 * asking for more is bytes spent on pixels nobody can see.
 */
export function slideSizes(slide: HeroSlide): string {
  const aspect = slide.w / slide.h
  // The phone hero is 76svh tall; ~0.63 is what that works out to across common handsets.
  const HERO_ASPECT_MOBILE = 0.63
  if (aspect <= HERO_ASPECT_MOBILE) return '100vw'
  const overflow = Math.min(Math.round((aspect / HERO_ASPECT_MOBILE) * 100), 300)
  return `(max-width: 700px) ${overflow}vw, 100vw`
}
