'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { track } from '@/lib/analytics'
import { T } from '@/lib/translations'
import SocialRow from '@/components/SocialRow'
import { SOCIAL, EMAIL } from '@/lib/social'
import { LANDINGS } from '@/lib/landing'

export default function Footer() {
  const { lang } = useLanguage()
  const t = T.footer
  // Per-locale slug: the landing page is /en/lahemaa-accommodation but /et/majutus-lahemaal.
  const landing = LANDINGS[0]
  const winter = LANDINGS.find(l => l.id === 'winter-sauna') ?? LANDINGS[0]
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
          <li><a href={`/${lang}/gallery`}>{t.galerii[lang]}</a></li>
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
          <a className="footer-loc-link" href={SOCIAL.maps}
            target="_blank" rel="noopener noreferrer">{t.loc[lang]}</a>
        </p>
      </div>
    </footer>
  )
}
