import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'
import type { Lang } from '@/lib/translations'

/** Picks a locale from an explicit choice, then browser language, then IP country. */
function detectLocale(request: NextRequest): Lang {
  const saved = request.cookies.get('oa-lang')?.value
  if (saved && (LOCALES as string[]).includes(saved)) return saved as Lang

  const acceptLang = (request.headers.get('accept-language') ?? '').toLowerCase()
  const primary = acceptLang.split(/[,;]/)[0].trim().substring(0, 2)
  if ((LOCALES as string[]).includes(primary)) return primary as Lang

  const country = request.headers.get('x-vercel-ip-country') ?? 'XX'
  if (country === 'EE') return 'et'
  if (country === 'RU') return 'ru'
  return 'en'
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    l => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasLocale) return NextResponse.next()

  const locale = detectLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Everything except API routes, Next internals, metadata files and static assets.
    '/((?!api|_next|admin|.*\\..*|icon|apple-icon|sitemap.xml|robots.txt).*)',
  ],
}

export { DEFAULT_LOCALE }
