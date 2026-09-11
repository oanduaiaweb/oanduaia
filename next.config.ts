import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    // Next 16 refuses any `quality` not listed here and silently falls back to 75.
    // 88 is for the hero, where the photographs are the product.
    qualities: [75, 88],
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
