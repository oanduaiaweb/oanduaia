const items = [
  'Metsaspaa',
  'Saun & Tiigikümblus',
  'Öko kehahooldused',
  'Matkarajad',
  'Majutus',
  'Lahemaa rahvuspark',
]

export default function Marquee() {
  // Duplicate items so the seamless loop works at -50%
  const all = [...items, ...items]

  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
