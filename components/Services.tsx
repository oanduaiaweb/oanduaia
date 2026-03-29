export default function Services() {
  return (
    <section className="services-section" id="teenused">
      <p className="section-label">02 — Teenused</p>
      <div className="services-grid">

        <div className="service-card reveal">
          <p className="service-num">01</p>
          <h3 className="service-title">Metsaspaa <em>&amp; Saun</em></h3>
          <p className="service-desc">
            Puuküttega saun, erinevad saunaprotseduurid,
            leilirituaalid ja hingamisharjutused metsa keskel.
          </p>
          <a href="#" className="service-arrow">Loe lähemalt →</a>
        </div>

        <div className="service-card reveal reveal-delay-1">
          <p className="service-num">02</p>
          <h3 className="service-title">Tiigikümblus <em>&amp; Teraapiad</em></h3>
          <p className="service-desc">
            Looduslik tiigikümblus aastaringselt. Öko kehahooldused
            metsataimede ja turba baasil. Sügav taastumine.
          </p>
          <a href="#" className="service-arrow">Loe lähemalt →</a>
        </div>

        <div className="service-card reveal reveal-delay-2">
          <p className="service-num">03</p>
          <h3 className="service-title">Majutus <em>&amp; Hommikusöök</em></h3>
          <p className="service-desc">
            Kuni 6-kohaline puhkemaja panoraamakende ja
            privaatse aiaga. Kontinentaalne hommikusöök hinna sees.
          </p>
          <a href="#" className="service-arrow">Loe lähemalt →</a>
        </div>

      </div>
    </section>
  )
}
