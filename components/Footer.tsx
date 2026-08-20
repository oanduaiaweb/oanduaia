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
          <li><a href="mailto:info@oanduaia.ee">info@oanduaia.ee</a></li>
          <li>
            <a href="https://www.booking.com/hotel/ee/oanduaia-saunamaja.html"
              target="_blank" rel="noopener noreferrer">Booking.com</a>
          </li>
          <li>
            <a href="https://www.google.com/maps/place/Oanduaia/@59.5602003,26.1040144,17.51z/data=!4m9!3m8!1s0x4693a5e9eb2501f1:0x882b2ee86711e7c4!5m2!4m1!1i2!8m2!3d59.5601919!4d26.1067858!16s%2Fg%2F11c1p2zn4s?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank" rel="noopener noreferrer">{t.maps[lang]}</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">{t.copy[lang]}</p>
        <p className="footer-copy">
          <a className="footer-loc-link" href="https://www.google.com/maps/place/Oanduaia/@59.5602003,26.1040144,17.51z/data=!4m9!3m8!1s0x4693a5e9eb2501f1:0x882b2ee86711e7c4!5m2!4m1!1i2!8m2!3d59.5601919!4d26.1067858!16s%2Fg%2F11c1p2zn4s?entry=ttu&g_ep=EgoyMDI2MDgxNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" rel="noopener noreferrer">{t.loc[lang]}</a>
        </p>
      </div>
    </footer>
  )
}
