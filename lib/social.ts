/**
 * Single source of truth for the outbound links. The Google Maps URL in particular
 * was pasted in three places (nav once, footer twice) before this existed.
 *
 * The Facebook page is not discoverable by search — a search for "Oanduaia facebook"
 * returns RMK Oandu, the state forest visitor centre, which is a different
 * organisation. This URL came from Mikk directly.
 */
export const SOCIAL = {
  /** The host's number. Displayed grouped, dialled in E.164. */
  phone: '+372 5202 044',
  phoneHref: 'tel:+3725202044',
  instagram: 'https://www.instagram.com/oanduaia/',
  facebook: 'https://www.facebook.com/Oanduaia/',
  booking: 'https://www.booking.com/hotel/ee/oanduaia-saunamaja.html',
  /**
   * The place itself, by CID — verified in a browser to resolve to Oanduaia. Shorter and
   * more durable than the full coordinate URL, and it is what "write a review" opens.
   */
  mapsPlace: 'https://maps.google.com/?cid=9811987788853274564',
  /**
   * The one-tap review composer, issued 1 Sep 2026 from Oanduaia's own Google Business
   * Profile — the only place it can come from. Verified to be the right listing rather
   * than trusted: it redirects to a Maps place whose id is 0x882b2ee86711e7c4, which is
   * 9811987788853274564 in decimal, byte-identical to the CID above. A 200 alone would
   * not have proved it; Google's other review URL for this listing returns 200 to curl
   * and a 404 to a human.
   */
  mapsReview: 'https://g.page/r/CcTnEWfoLiuIEBM/review',
  maps:
    'https://www.google.com/maps/place/Oanduaia/@59.5602003,26.1040144,17.51z/data=!4m9!3m8!' +
    '1s0x4693a5e9eb2501f1:0x882b2ee86711e7c4!5m2!4m1!1i2!8m2!3d59.5601919!4d26.1067858!' +
    '16s%2Fg%2F11c1p2zn4s?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D',
} as const

export const EMAIL = 'info@oanduaia.ee'
