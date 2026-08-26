'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Lang } from '@/lib/translations'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

interface Ctx { lang: Lang; setLang: (l: Lang) => void }

const LangCtx = createContext<Ctx>({ lang: DEFAULT_LOCALE, setLang: () => {} })

/**
 * Language now comes from the URL segment, not client state — every locale has its
 * own indexable route. `setLang` swaps the segment and navigates, so the change is a
 * real navigation and the chosen language is remembered for the middleware redirect.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const setLang = (l: Lang) => {
    if (l === lang) return
    document.cookie = `oa-lang=${l};path=/;max-age=31536000;samesite=lax`

    const segments = pathname.split('/')
    if ((LOCALES as string[]).includes(segments[1])) segments[1] = l
    else segments.splice(1, 0, l)
    router.push(segments.join('/') || `/${l}`)
  }

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

export const useLanguage = () => useContext(LangCtx)
