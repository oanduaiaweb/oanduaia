import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/i18n'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // The admin and the private feeds are not for crawlers.
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
      // Named explicitly so AI crawlers are unambiguously permitted. A named group replaces
      // the * group for that bot, so each one repeats the same disallow.
      ...[
        'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
        'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
        'PerplexityBot', 'Perplexity-User',
        'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent',
      ].map(userAgent => ({ userAgent, allow: '/', disallow: ['/admin', '/api/'] })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
