'use client'

import { useEffect, useState } from 'react'
import { track } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import { scrollToId } from '@/lib/scrollToId'
import { SOCIAL } from '@/lib/social'
import type { Lang } from '@/lib/translations'

/** The opening line of a WhatsApp chat with Aigi, so the guest only has to add their question. */
const WA_HELLO: Record<Lang, string> = {
  et: 'Tere! Küsiksin Oanduaia kohta: ',
  en: 'Hello! I have a question about Oanduaia: ',
  ru: 'Здравствуйте! У меня вопрос об Oanduaia: ',
  de: 'Hallo! Ich habe eine Frage zu Oanduaia: ',
  es: '¡Hola! Tengo una pregunta sobre Oanduaia: ',
  sv: 'Hej! Jag har en fråga om Oanduaia: ',
  fi: 'Hei! Minulla on kysymys Oanduaiasta: ',
  lv: 'Labdien! Man ir jautājums par Oanduaia: ',
}
const WA_LABEL: Record<Lang, string> = {
  et: 'Kirjuta WhatsAppis', en: 'Message us on WhatsApp', ru: 'Написать в WhatsApp', de: 'Per WhatsApp schreiben',
  es: 'Escríbenos por WhatsApp', sv: 'Skriv på WhatsApp', fi: 'Kirjoita WhatsAppissa', lv: 'Rakstīt WhatsApp',
}

/**
 * A booking button that follows the page, bottom right, on every screen size.
 *
 * It stays hidden until the hero's own button has scrolled away — two identical calls to
 * action on screen at once is noise rather than emphasis — and hides again while the
 * calendar is in view, where a floating "book now" would sit on top of the very thing it
 * is asking someone to use.
 *
 * Pages that have no calendar (gallery, trails, landing pages) have no `#broneeri` to
 * scroll to. There the href does the work and takes the visitor to the home page's
 * calendar; the click handler only intercepts when the section is actually on this page.
 */
export default function StickyBook() {
  const { lang } = useLanguage()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const cta = document.querySelector('.hero-cta')
    const booking = document.getElementById('broneeri')

    // Two independent reasons to stay hidden, tracked apart and combined on every change.
    let pastHero = !cta
    let overBooking = false
    const apply = () => setShown(pastHero && !overBooking)

    const cleanups: Array<() => void> = []

    if (cta) {
      const o = new IntersectionObserver(([e]) => {
        pastHero = !e.isIntersecting
        apply()
      })
      o.observe(cta)
      cleanups.push(() => o.disconnect())
    } else {
      // No hero on this page, so fall back to a plain scroll threshold.
      const onScroll = () => {
        pastHero = window.scrollY > 240
        apply()
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
    }

    if (booking) {
      const o = new IntersectionObserver(([e]) => {
        overBooking = e.isIntersecting
        apply()
      })
      o.observe(booking)
      cleanups.push(() => o.disconnect())
    }

    return () => cleanups.forEach(fn => fn())
  }, [])

  return (
    <>
    {/* WhatsApp to Aigi, stacked above the booking button and shown with it (Mikk, 1 Nov). */}
    <a
      href={`${SOCIAL.whatsapp}?text=${encodeURIComponent(WA_HELLO[lang])}`}
      className={`sticky-wa${shown ? ' is-on' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WA_LABEL[lang]}
      title={WA_LABEL[lang]}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      onClick={() => track('whatsapp_click', { location: 'sticky', lang })}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z"/>
      </svg>
    </a>
    <a
      href={`/${lang}#broneeri`}
      className={`sticky-book${shown ? ' is-on' : ''}`}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      onClick={e => {
        track('booking_cta', { location: 'sticky', lang })
        if (document.getElementById('broneeri')) {
          e.preventDefault()
          scrollToId('broneeri')
        }
      }}
    >
      {T.hero.cta[lang]}
    </a>
    </>
  )
}
