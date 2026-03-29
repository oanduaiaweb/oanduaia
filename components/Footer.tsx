'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'

export default function Footer() {
  const { lang } = useLanguage()
  const t = T.footer
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
          <li><a href="#teenused">{t.teenused[lang]}</a></li>
          <li><a href="#majutus">{t.majutus[lang]}</a></li>
          <li><a href="#matkad">{t.matkad[lang]}</a></li>
          <li><a href="#broneeri">{t.broneeri[lang]}</a></li>
        </ul>
      </div>
      <div>
        <p className="footer-heading">{t.contH[lang]}</p>
        <ul className="footer-links">
          <li><a href="mailto:info@oanduaia.ee">info@oanduaia.ee</a></li>
          <li>
            <a href="https://www.booking.com/hotel/ee/oanduaia-saunamaja.html"
              target="_blank" rel="noopener noreferrer">Booking.com</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">{t.copy[lang]}</p>
        <p className="footer-copy">{t.loc[lang]}</p>
      </div>
    </footer>
  )
}
