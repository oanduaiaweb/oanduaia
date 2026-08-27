'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { T } from '@/lib/translations'
import SocialRow from '@/components/SocialRow'
import { SOCIAL, EMAIL } from '@/lib/social'

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
          <li><a href="#lugu">{t.lugu[lang]}</a></li>
          <li><a href="#majad">{t.majutus[lang]}</a></li>
          <li><a href="#toit">{t.teenused[lang]}</a></li>
          <li><a href="#loodus">{t.matkad[lang]}</a></li>
          <li><a href="#broneeri">{t.broneeri[lang]}</a></li>
        </ul>
      </div>
      <div>
        <p className="footer-heading">{t.contH[lang]}</p>
        <ul className="footer-links">
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
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
