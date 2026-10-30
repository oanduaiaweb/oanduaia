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
      de: 'Der Wald von Lahemaa rund um Oanduaia',
      es: 'El bosque de Lahemaa alrededor de Oanduaia',
      sv: 'Skogen i Lahemaa runt Oanduaia',
      fi: 'Lahemaan metsä Oanduaian ympärillä',
      lv: 'Lahemā mežs ap Oanduaia',
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
      ru: 'Длинный бревенчатый дом с камышовой крышей на летнем солнце',
      de: 'Das lange Blockhaus mit Reetdach in der Sommersonne',
      es: 'La larga casa de troncos con tejado de junco bajo el sol de verano',
      sv: 'Det långa timmerhuset med vasstak i sommarsolen',
      fi: 'Pitkä ruokokattoinen hirsitalo kesäauringossa',
      lv: 'Garā guļbūve ar niedru jumtu vasaras saulē',
    },
  },
  {
    src: '/galerii/sugispaike-muru.jpeg',
    w: 1536,
    h: 2048,
    focus: { desktop: '50% 47%', mobile: '50% 50%' },
    alt: {
      et: 'Madal sügispäike paistab üle muru ja roogkatuste, esiplaanil lillepott terrassi serval',
      en: 'Low autumn sun over the lawn and the thatched roofs, a pot of flowers at the edge of the deck',
      ru: 'Низкое осеннее солнце над лужайкой и камышовыми крышами, на краю террасы горшок с цветами',
      de: 'Tiefe Herbstsonne über dem Rasen und den Reetdächern, ein Blumentopf am Rand der Terrasse',
      es: 'El sol bajo de otoño sobre el césped y los tejados de junco, una maceta con flores al borde de la terraza',
      sv: 'Låg höstsol över gräsmattan och vasstaken, en blomkruka vid terrasskanten',
      fi: 'Matala syysaurinko nurmikon ja ruokokattojen yllä, kukkaruukku terassin reunalla',
      lv: 'Zema rudens saule pār zālienu un niedru jumtiem, terases malā puķu pods',
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
      de: 'Das runde reetgedeckte Gebäude am Teich',
      es: 'Una construcción redonda con tejado de junco junto al estanque',
      sv: 'En rund byggnad med vasstak vid dammen',
      fi: 'Pyöreä ruokokattoinen rakennus lammen rannalla',
      lv: 'Apaļa ēka ar niedru jumtu pie dīķa',
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
      de: 'Das reetgedeckte Haus am Teich im zeitigen Frühling',
      es: 'La casa con tejado de junco junto al estanque a principios de primavera',
      sv: 'Huset med vasstak vid dammen tidigt på våren',
      fi: 'Ruokokattoinen talo lammen rannalla varhain keväällä',
      lv: 'Māja ar niedru jumtu pie dīķa agrā pavasarī',
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
      de: 'Drei Gebäude spiegeln sich im stillen Teich',
      es: 'Tres edificios reflejados en el estanque en calma',
      sv: 'Tre byggnader som speglar sig i den stilla dammen',
      fi: 'Kolme rakennusta heijastuu tyyneen lampeen',
      lv: 'Trīs ēkas atspoguļojas mierīgajā dīķī',
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
      de: 'Die offene Wiese vor dem Haupthaus unter Wolken',
      es: 'El amplio césped frente a la casa principal bajo nubes altas',
      sv: 'Den öppna gräsmattan framför huvudbyggnaden under höga moln',
      fi: 'Avara nurmikko päärakennuksen edessä korkeiden pilvien alla',
      lv: 'Plašs zāliens pie galvenās mājas zem augstiem mākoņiem',
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
      de: 'Zwei Hängematten aus Holz zwischen Birken vor dem Haus',
      es: 'Dos hamacas de madera colgadas entre abedules frente a la casa',
      sv: 'Två hängmattor av trä mellan björkar framför huset',
      fi: 'Kaksi puista riippumattoa koivujen välissä talon edessä',
      lv: 'Divi koka šūpuļtīkli starp bērziem pie mājas',
    },
  },
  {
    src: '/galerii/saunamaja-veepealt.jpeg',
    w: 1536,
    h: 2048,
    focus: { desktop: '50% 45%', mobile: '50% 45%' },
    alt: {
      et: 'Saunamaja üle vee, mets peegeldumas tiigis',
      en: 'The Sauna House across the water, forest mirrored in the pond',
      ru: 'Банный дом за прудом, лес отражается в пруду',
      de: 'Das Saunahaus jenseits des Teichs, der Wald spiegelt sich im Teich',
      es: 'La casa de la sauna al otro lado del agua, con el bosque reflejado en el estanque',
      sv: 'Bastuhuset på andra sidan vattnet, med skogen speglad i dammen',
      fi: 'Saunatalo veden takana, metsä heijastuu lampeen',
      lv: 'Pirts māja ūdens otrā krastā, mežs atspoguļojas dīķī',
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
      de: 'Abendsonne durch die Bäume über dem Teich',
      es: 'Sol de tarde entre los árboles sobre el estanque',
      sv: 'Kvällssol genom träden ovanför dammen',
      fi: 'Ilta-aurinko puiden läpi lammen yllä',
      lv: 'Vakara saule caur kokiem virs dīķa',
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
  /*
   * Capped in CSS pixels, not vw. A landscape photo cropped to a phone is ~240vw wide, and on
   * a 2.75x screen that asked for the 3840 px file — measured LCP 8.2 s on a throttled Pixel 5
   * (24 Oct). 600px × DPR lands on the 1080–1920 files: sharp on every phone, a fraction of
   * the bytes.
   */
  const overflow = Math.min(Math.round((aspect / HERO_ASPECT_MOBILE) * 100), 300)
  return `(max-width: 700px) min(${overflow}vw, 600px), 100vw`
}
