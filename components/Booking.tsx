export default function Booking() {
  return (
    <section className="booking-section" id="broneeri">
      <p className="booking-eyebrow">Reserveerimine</p>
      <h2 className="booking-heading reveal">
        Millal sa<br />
        <em>tuled?</em>
      </h2>
      <p className="booking-sub reveal reveal-delay-1">
        Oanduaia töötab päringupõhiselt —
        kirjuta meile ja me leiame sinu jaoks sobiva aja.
      </p>
      <div className="booking-buttons reveal reveal-delay-2">
        <a href="mailto:info@oanduaia.ee" className="btn-primary">Küsi pakkumist</a>
        <a href="tel:+372XXXXXXXX" className="btn-ghost">Helista</a>
      </div>
    </section>
  )
}
