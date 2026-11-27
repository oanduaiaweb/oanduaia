'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { track } from '@/lib/analytics'
import { T } from '@/lib/translations'
import SocialRow from '@/components/SocialRow'
import { SOCIAL, EMAIL } from '@/lib/social'
import { LANDINGS } from '@/lib/landing'
import { G } from '@/lib/gift'
import { COMPANY, TERMS_LINK } from '@/lib/terms'

/* The two guide pages added 26 Nov 2026. Short footer labels, separate from the page titles. */
const ROMANTIC = { et: 'Romantiline puhkus', en: 'Romantic weekend', ru: 'Романтический отдых', de: 'Romantisches Wochenende', es: 'Escapada romántica', sv: 'Romantisk helg', fi: 'Romanttinen loma', lv: 'Romantiska atpūta' } as const
const DOG = { et: 'Koeraga puhkus', en: 'Holiday with a dog', ru: 'Отдых с собакой', de: 'Urlaub mit Hund', es: 'Vacaciones con perro', sv: 'Semester med hund', fi: 'Loma koiran kanssa', lv: 'Atpūta ar suni' } as const

export default function Footer() {
  const { lang } = useLanguage()
  const t = T.footer
  // Per-locale slug: the landing page is /en/lahemaa-accommodation but /et/majutus-lahemaal.
  const landing = LANDINGS[0]
  const winter = LANDINGS.find(l => l.id === 'winter-sauna') ?? LANDINGS[0]
  const romantic = LANDINGS.find(l => l.id === 'romantic-weekend')
  const dog = LANDINGS.find(l => l.id === 'dog-friendly')
  return (
    <footer>
      <div>
        <p className="footer-brand">Oanduaia</p>
        <p className="footer-tagline">
          {t.t1[lang]}<br />
          {t.t2[lang]}<br />
          {t.t3[lang]}
        </p>
      </div>
      <div>
        <p className="footer-heading">{t.navH[lang]}</p>
        <ul className="footer-links">
          {/*
            Homepage sections, so the path is spelled out: the footer is on every page, and a
            bare "#lugu" on a house or trail page pointed at nothing (Mikk, 29 Oct).
          */}
          <li><a href={`/${lang}#lugu`}>{t.lugu[lang]}</a></li>
          <li><a href={`/${lang}#majad`}>{t.majutus[lang]}</a></li>
          <li><a href={`/${lang}#toit`}>{t.teenused[lang]}</a></li>
          <li><a href={`/${lang}#loodus`}>{t.matkad[lang]}</a></li>
          <li><a href={`/${lang}#broneeri`}>{t.broneeri[lang]}</a></li>
          <li><a href={`/${lang}/${landing.slug[lang]}`}>{t.landing[lang]}</a></li>
          <li><a href={`/${lang}/${winter.slug[lang]}`}>{t.landingWinter[lang]}</a></li>
          {romantic && <li><a href={`/${lang}/${romantic.slug[lang]}`}>{ROMANTIC[lang]}</a></li>}
          {dog && <li><a href={`/${lang}/${dog.slug[lang]}`}>{DOG[lang]}</a></li>}
          <li><a href={`/${lang}/gallery`}>{t.galerii[lang]}</a></li>
          <li><a href={`/${lang}/gift`}>{G.name[lang]}</a></li>
        </ul>
      </div>
      <div>
        <p className="footer-heading">{t.contH[lang]}</p>
        <ul className="footer-links">
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          {/* Same number as the Business Profile — the two must not drift apart. */}
          <li>
            <a href={SOCIAL.phoneHref} onClick={() => track('phone_click', { lang })}>
              {SOCIAL.phone}
            </a>
          </li>
          <li>
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { location: 'footer', lang })}>WhatsApp</a>
          </li>
          <li>
            <a href={SOCIAL.booking} target="_blank" rel="noopener noreferrer">Booking.com</a>
          </li>
          <li>
            <a href={SOCIAL.maps} target="_blank" rel="noopener noreferrer">{t.maps[lang]}</a>
          </li>
        </ul>
        <SocialRow className="footer-socials" itemClassName="footer-social" size={20} />
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">{t.copy[lang]}</p>
        <p className="footer-copy">
          {COMPANY.name} · {COMPANY.code} · <a className="footer-loc-link" href={`/${lang}/terms`}>{TERMS_LINK[lang]}</a>
        </p>
        <p className="footer-copy">
          <a className="footer-loc-link" href={SOCIAL.maps}
            target="_blank" rel="noopener noreferrer">{t.loc[lang]}</a>
        </p>
      </div>
    </footer>
  )
}
