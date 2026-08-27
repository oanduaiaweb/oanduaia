/**
 * Single source of truth for the outbound links. The Google Maps URL in particular
 * was pasted in three places (nav once, footer twice) before this existed.
 *
 * The Facebook page is not discoverable by search — a search for "Oanduaia facebook"
 * returns RMK Oandu, the state forest visitor centre, which is a different
 * organisation. This URL came from Mikk directly.
 */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/oanduaia/',
  facebook: 'https://www.facebook.com/Oanduaia/',
  booking: 'https://www.booking.com/hotel/ee/oanduaia-saunamaja.html',
  maps:
    'https://www.google.com/maps/place/Oanduaia/@59.5602003,26.1040144,17.51z/data=!4m9!3m8!' +
    '1s0x4693a5e9eb2501f1:0x882b2ee86711e7c4!5m2!4m1!1i2!8m2!3d59.5601919!4d26.1067858!' +
    '16s%2Fg%2F11c1p2zn4s?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D',
} as const

export const EMAIL = 'info@oanduaia.ee'
