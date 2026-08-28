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

export default nextConfig
