export default function Footer() {
  return (
    <footer>
      <div>
        <p className="footer-brand">Oanduaia</p>
        <p className="footer-tagline">
          Metsaspaa ja majutus<br />
          Lahemaa rahvuspargis,<br />
          Oandu küla, Lääne-Virumaa
        </p>
      </div>

      <div>
        <p className="footer-heading">Navigatsioon</p>
        <ul className="footer-links">
          <li><a href="#teenused">Teenused</a></li>
          <li><a href="#majutus">Majutus</a></li>
          <li><a href="#matkad">Matkarajad</a></li>
          <li><a href="#broneeri">Broneeri</a></li>
        </ul>
      </div>

      <div>
        <p className="footer-heading">Kontakt</p>
        <ul className="footer-links">
          <li><a href="mailto:info@oanduaia.ee">info@oanduaia.ee</a></li>
          <li>
            <a
              href="https://www.booking.com/hotel/ee/oanduaia-saunamaja.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking.com
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Oanduaia. Kõik õigused kaitstud.</p>
        <p className="footer-copy">Lahemaa rahvuspark · Estonia</p>
      </div>
    </footer>
  )
}
