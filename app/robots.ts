import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/i18n'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // The admin and the private feeds are not for crawlers.
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
      // Named explicitly so AI crawlers are unambiguously permitted.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
