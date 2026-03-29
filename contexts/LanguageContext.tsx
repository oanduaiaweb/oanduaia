'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from '@/lib/translations'

interface Ctx { lang: Lang; setLang: (l: Lang) => void }

const LangCtx = createContext<Ctx>({ lang: 'et', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('et')

  useEffect(() => {
    const saved = localStorage.getItem('oa-lang') as Lang | null
    if (saved && ['et', 'en', 'ru'].includes(saved)) {
      setLangState(saved)
      return
    }
    // First visit — use geo-detected language from middleware cookie
    const geoCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('oa-lang-geo='))
      ?.split('=')[1]
    if (geoCookie && (['et', 'en', 'ru'] as string[]).includes(geoCookie)) {
      setLangState(geoCookie as Lang)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('oa-lang', l)
  }

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

export const useLanguage = () => useContext(LangCtx)
