/**
 * The two photograph strips that drift behind section headings.
 *
 * They run in opposite directions at the same speed, so where the page shows both
 * they read as one mechanism seen from two sides rather than two unrelated effects.
 */

/**
 * Behind "Majutusvõimalused" — the buildings, travelling left to right.
 *
 * Two of each house, so the loop runs six wide and a visitor does not catch it
 * repeating. Exteriors only: at this size, dimmed and half a second in view, an
 * interior reads as brown mush. The order alternates between the houses, so any
 * three consecutive frames show three different buildings.
 */
export const HOUSE_STRIP: string[] = [
  '/galerii/saunamaja-veepealt.jpeg',
  '/images/metsamaja.jpg',
  '/galerii/tiigimaja-veepealt.jpeg',
  '/galerii/saunamaja/ohtuvalgus.jpeg',
  '/galerii/metsamaja-kaugelt.jpeg',
  '/galerii/tiigimaja/terrass.jpeg',
]

/**
 * Behind "Metsas ärkas ilu" — close work only, travelling right to left.
 *
 * Every frame was chosen by looking, not by its filename: a subject that fills the
 * frame or sits sharp against a soft background. The landscapes that share these
 * captions — the pond, the lawn, the jetty — were rejected. A wide view shrunk into a
 * third of a column and veiled to 14% is an unreadable smudge; a bee on a daisy, a
 * birch whisk by the stove, still read as themselves.
 *
 * Made things and growing things alternate, so neither half of the place dominates
 * the loop. Two otherwise good detail shots are missing on purpose — the forged
 * balustrade and the spinning wheel are so dark that under a linen veil they are
 * simply black rectangles.
 */
export const DETAIL_STRIP: string[] = [
  '/galerii/038.jpeg',
  '/galerii/saunamaja/ratikud.webp',
  '/galerii/086.jpeg',
  '/galerii/metsamaja/kamin.jpeg',
  '/galerii/lilled.jpeg',
  '/galerii/saunamaja/vahuvein.jpeg',
  '/galerii/kokteil.jpeg',
  '/galerii/saunamaja/saun.webp',
  '/galerii/084.jpeg',
  '/galerii/089.jpeg',
]
