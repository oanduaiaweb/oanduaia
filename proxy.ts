import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'
import { detectLocale } from '@/lib/detectLocale'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    l => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasLocale) return NextResponse.next()

  const locale = detectLocale({
    cookie:         request.cookies.get('oa-lang')?.value,
    acceptLanguage: request.headers.get('accept-language'),
    country:        request.headers.get('x-vercel-ip-country'),
  })
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
