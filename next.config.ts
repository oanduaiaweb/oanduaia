import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    /*
     * AVIF FIRST, then WebP. This is not a micro-optimisation — without AVIF the
     * optimiser could not beat the source JPEGs at all.
     *
     * Next encodes, compares against the original, and serves whichever is smaller.
     * Our photographs are high-entropy forest and foliage: WebP came out LARGER than
     * the source at every quality tried, so Next fell back to passing the original
     * through untouched — a 524 KB hero on every desktop, and the same for any other
     * photo whose slot asked for a width at or above the source's own width.
     * AVIF wins where WebP could not (hero: 524 KB -> ~296 KB at the same apparent
     * quality, checked at 1:1 before this was changed).
     *
     * Order matters: Next offers these in order against the browser's Accept header,
     * so a browser too old for AVIF still gets WebP, and one too old for that gets
     * the JPEG. Nothing breaks; older clients simply get what they already got.
     */
    formats: ['image/avif', 'image/webp'],
    // Next 16 refuses any `quality` not listed here and silently falls back to 75.
    // 60 is the hero; 75 is the default everything else uses. 88 is gone — nothing
    // asked for it once AVIF made the extra bytes pointless.
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

/*
 * Security headers.
 *
 * The CSP is written from an inventory of what this site actually loads, not from a
 * template — a policy that blocks the map tiles or analytics is worse than no policy,
 * because it fails silently in the visitor's browser and nowhere else.
 *
 * What the site genuinely needs:
 *   - googletagmanager.com  the GA4 script
 *   - *.google-analytics.com  where GA4 sends its measurements
 *   - tiles.maaamet.ee  the Maa- ja Ruumiamet base map. Leaflet itself is an npm
 *     dependency and is bundled, so only the tile IMAGES are external.
 *
 * 'unsafe-inline' is present for scripts and styles because Next.js inlines its hydration
 * payload and its critical CSS, and the JSON-LD blocks are inline script tags. Removing it
 * needs a nonce threaded through the proxy — worth doing later, not worth breaking the
 * site for now.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://tiles.maaamet.ee https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // Replaces X-Frame-Options, which this supersedes in every browser that reads a CSP.
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

nextConfig.headers = async () => [
  {
    source: '/:path*',
    headers: [
      { key: 'Content-Security-Policy', value: csp },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Nothing here uses a camera, a microphone or a payment handler. Saying so closes
      // the door on anything embedded later doing it without a deliberate change.
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
    ],
  },
]

export default nextConfig
