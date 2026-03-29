import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') ?? 'XX'
  const acceptLang = (request.headers.get('accept-language') ?? '').toLowerCase()
  const primaryLang = acceptLang.split(/[,;]/)[0].trim().substring(0, 2)

  let geo: string
  // Prefer browser language (most accurate for user's actual preference)
  if (primaryLang === 'et') geo = 'et'
  else if (primaryLang === 'ru') geo = 'ru'
  else if (primaryLang === 'en') geo = 'en'
  // Fall back to IP geo
  else if (country === 'EE') geo = 'et'
  else if (country === 'RU') geo = 'ru'
  else geo = 'en'

  const response = NextResponse.next()
  response.cookies.set('oa-lang-geo', geo, {
    maxAge: 86400,
    path: '/',
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|icon\\.png|apple-icon\\.png).*)'],
}
