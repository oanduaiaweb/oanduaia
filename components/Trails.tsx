const trails = [
  {
    distance: '822 km · pikkajaline',
    name: 'Oandu-Ikla matkatee',
    desc: 'Eesti pikim märgistatud matkarada. Algab siin.',
  },
  {
    distance: '~4 km · kerge',
    name: 'Oandu loodusmetsarada',
    desc: 'Looduslik ringrada läbi muistse metsa ja ürgoru.',
  },
  {
    distance: '~14 km · keskmine',
    name: 'Võsu-Oandu matkarada',
    desc: 'Meri kuni mets - rannikult läbi rahvuspargi.',
  },
  {
    distance: '~1.3 km · kerge',
    name: 'Koprarada',
    desc: 'Lühike rada koprapaisude ja järvepindade vaatluspunktideni.',
  },
  {
    distance: '~8 km · kerge',
    name: 'Pärimusrada',
    desc: 'Lahemaa külade pärimusloo jälgedel.',
  },
  {
    distance: '~11 km · keskmine',
    name: 'Altja matkarada',
    desc: 'Altja kaluriküla kaudu rannikule. Ajalugu ja loodus.',
  },
]

const delays = ['', ' reveal-delay-1', ' reveal-delay-2']

export default function Trails() {
  return (
    <section className="trails-section" id="matkad">
      <div className="trails-header reveal">
        <p className="section-label">04 - Matkarajad</p>
        <h2 className="trails-heading">
          Kuus rada<br />
          algab <em>siit.</em>
        </h2>
      </div>

      <div className="trails-grid">
        {trails.map((trail, i) => (
          <div key={trail.name} className={`trail-item reveal${delays[i % 3]}`}>
            <p className="trail-distance">{trail.distance}</p>
            <h3 className="trail-name">{trail.name}</h3>
            <p className="trail-desc">{trail.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
