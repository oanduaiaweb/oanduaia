import type { Lang } from './translations'
import { SOCIAL } from './social'

/**
 * Where the reviews actually live.
 *
 * Oanduaia is reviewed in three places and had been showing one hand-picked quote from
 * one of them. These are the real scores, read off each listing — Booking.com runs the
 * two houses as separate properties, so they carry separate scores and separate review
 * counts. Update them here when they move; nothing else needs touching.
 *
 * Deliberately NOT marked up as `aggregateRating` in the structured data. Marking up
 * someone else's review score as your own is exactly the sort of thing Google penalises.
 */
export type ReviewSource = {
  id: string
  channel: string
  /** Which house, where a channel splits them. Omitted for whole-property listings. */
  place?: string
  /** A number, not a string, so each language prints its own decimal mark. */
  score: number
  outOf: number
  count: number
  url: string
}

export const REVIEW_SOURCES: ReviewSource[] = [
  {
    id: 'booking-saunamaja',
    channel: 'Booking.com',
    place: 'Saunamaja',
    score: 9.7,
    outOf: 10,
    count: 27,
    url: SOCIAL.booking,
  },
  {
    id: 'booking-metsamaja',
    channel: 'Booking.com',
    place: 'Metsamaja',
    score: 9.7,
    outOf: 10,
    count: 31,
    url: 'https://www.booking.com/hotel/ee/metsamaja.html',
  },
  {
    id: 'google',
    channel: 'Google',
    score: 5,
    outOf: 5,
    count: 35,
    url: SOCIAL.mapsPlace,
  },
]

/**
 * Where "write a review" goes — now the real one-tap composer.
 *
 * This was the last knowingly-broken thing on the site. It pointed at the Maps listing,
 * from which leaving a review took several taps, because the proper short link can only
 * be issued from the business profile and the profile was unclaimed. It was claimed on
 * 1 September and the link is now in place.
 *
 * Do NOT swap this back to search.google.com/local/writereview?placeid=… — that URL
 * 404s for this listing while returning 200 to curl, which is how it passed a check once
 * before. See the note beside SOCIAL.mapsReview.
 */
export const WRITE_REVIEW_URL = SOCIAL.mapsReview

/** Estonian, Russian and German write 9,7; English writes 9.7. */
export function formatScore(score: number, lang: Lang): string {
  const locale = lang === 'en' ? 'en-GB' : lang
  return score.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

/** Estonian keeps one partitive form; German has two; Russian needs three. */
export function reviewCount(n: number, lang: Lang): string {
  if (lang === 'et') return `${n} arvustust`
  if (lang === 'en') return `${n} ${n === 1 ? 'review' : 'reviews'}`
  if (lang === 'de') return `${n} ${n === 1 ? 'Bewertung' : 'Bewertungen'}`
  if (lang === 'es') return `${n} ${n === 1 ? 'reseña' : 'reseñas'}`
  if (lang === 'sv') return `${n} ${n === 1 ? 'recension' : 'recensioner'}`
  if (lang === 'fi') return `${n} ${n === 1 ? 'arvio' : 'arviota'}`
  if (lang === 'lv') return `${n} ${n % 10 === 1 && n % 100 !== 11 ? 'atsauksme' : 'atsauksmes'}`
  const mod10 = n % 10
  const mod100 = n % 100
  const word =
    mod10 === 1 && mod100 !== 11 ? 'отзыв'
    : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'отзыва'
    : 'отзывов'
  return `${n} ${word}`
}

/**
 * Guest reviews, quoted from the Google listing.
 *
 * Quoted rather than pulled live from the Places API, deliberately. Google forbids caching
 * Places content — reviews have to be fetched on every single page view — which would turn
 * four prerendered locales into a paid API call per visit and cost us the static site.
 * Quoting with attribution is permitted, free, and lands the words in the HTML where search
 * and the assistants can actually read them.
 *
 * RULES, and they are not negotiable:
 * - `et` is the guest's own words, verbatim. Never tidied, never shortened mid-sentence.
 * - The other languages are marked as translations on the page, the way Google marks its own.
 * - Only reviews written natively in Estonian are quoted. Google machine-translates the
 *   English and Russian ones in its UI, and quoting a machine translation as if it were what
 *   somebody wrote is putting words in their mouth.
 * - Nothing here is marked up as `aggregateRating`. Same rule as the scores above.
 */
export type ReviewQuote = {
  id: string
  author: string
  /**
   * When it was written: 'YYYY-MM' where Google's "N days/weeks ago" pins the month, otherwise
   * just 'YYYY'. A fixed date, because a typed-in "a month ago" goes stale the day after the
   * deploy — Rainis's said "a month ago" for three months.
   */
  date: string
  /**
   * The language the guest actually wrote in. That entry is verbatim; every other language
   * is a translation and is labelled as one on the page. It is not always Estonian — the
   * most recent review here was written in English.
   */
  originalLang: Lang
  text: Record<Lang, string>
}

export const REVIEW_QUOTES: ReviewQuote[] = [
  {
    id: 'justin',
    author: 'Justin Hüsges',
    originalLang: 'de',
    date: '2026-11',
    text: {
      de: 'Eine wunderschöne, idyllische Unterkunft mitten in der Natur des Nationalparks. Die Blockhütte ist der perfekte Ort, um zur Ruhe zu kommen, abzuschalten und die Natur zu genießen. Die Gastgeber waren unglaublich freundlich, herzlich und haben uns tolle Tipps für die Umgebung gegeben. Wir haben uns rundum wohlgefühlt und können die Unterkunft absolut weiterempfehlen!',
      et: 'Imeilus, idülliline majutus keset rahvuspargi loodust. Palkmaja on täiuslik koht, et rahuneda, välja lülituda ja loodust nautida. Võõrustajad olid uskumatult sõbralikud ja südamlikud ning andsid meile toredaid soovitusi ümbruse kohta. Tundsime end igati hästi ja soovitame seda majutust kindlasti edasi!',
      en: 'A beautiful, idyllic place to stay in the middle of the national park\'s nature. The log cabin is the perfect place to wind down, switch off and enjoy nature. The hosts were incredibly friendly and warm, and gave us great tips for the area. We felt completely at home and can recommend this place without reservation!',
      ru: 'Прекрасное, идиллическое жильё посреди природы национального парка. Бревенчатый дом – идеальное место, чтобы успокоиться, отключиться и насладиться природой. Хозяева были невероятно приветливыми и душевными и дали нам отличные советы по окрестностям. Нам было во всём хорошо, и мы безоговорочно рекомендуем это место!',
      es: 'Un alojamiento precioso e idílico en plena naturaleza del parque nacional. La cabaña de madera es el lugar perfecto para relajarse, desconectar y disfrutar de la naturaleza. Los anfitriones fueron increíblemente amables y cálidos, y nos dieron muy buenos consejos sobre la zona. Nos sentimos como en casa y recomendamos este alojamiento sin dudarlo.',
      sv: 'Ett vackert, idylliskt boende mitt i nationalparkens natur. Timmerstugan är den perfekta platsen för att komma till ro, koppla av och njuta av naturen. Värdarna var otroligt vänliga och hjärtliga och gav oss fina tips om omgivningarna. Vi trivdes på alla sätt och kan varmt rekommendera boendet!',
      fi: 'Kaunis, idyllinen majoitus keskellä kansallispuiston luontoa. Hirsimökki on täydellinen paikka rauhoittua, irrottautua arjesta ja nauttia luonnosta. Isännät olivat uskomattoman ystävällisiä ja sydämellisiä ja antoivat meille hyviä vinkkejä lähiseudulle. Viihdyimme todella hyvin ja voimme ehdottomasti suositella majoitusta!',
      lv: 'Brīnišķīga, idilliska naktsmītne pašā nacionālā parka dabā. Guļbaļķu māja ir ideāla vieta, lai nomierinātos, atslēgtos un baudītu dabu. Saimnieki bija neticami laipni un sirsnīgi un deva mums lieliskus padomus par apkārtni. Mēs jutāmies lieliski un noteikti iesakām šo naktsmītni!',
    },
  },
  {
    /* The first of two paragraphs, quoted whole: it is the one about the house. */
    id: 'jarmo',
    author: 'Jarmo Zova',
    originalLang: 'et',
    date: '2026-11',
    text: {
      et: 'Meie puhkus Saunamajas oli tõeliselt mõnus ja kosutav! Koht oli väga hubane ning seal valitses imeline rahu ja vaikus, mida igapäevaelus tihti igatsema jääb. Eriti nautisime kamina soojust, metsa keskel olemist ja võimalust pärast sauna tiiki jahutama minna. Väga meeldis ka see, et majas polnud televiisorit – nii sai päriselt aja maha võtta, nautida teineteise seltskonda ja lihtsalt hetkes olla.',
      en: 'Our holiday at the Sauna House was truly lovely and refreshing! The place was very cosy, with a wonderful peace and quiet that everyday life so often lacks. We especially enjoyed the warmth of the fireplace, being in the middle of the forest and the chance to cool off in the pond after the sauna. We also really liked that there was no TV in the house – so we could truly slow down, enjoy each other\'s company and simply be in the moment.',
      ru: 'Наш отдых в Банном доме был по-настоящему приятным и восстанавливающим! Место очень уютное, там царили удивительные покой и тишина, которых так часто не хватает в повседневной жизни. Особенно нам понравились тепло камина, жизнь посреди леса и возможность освежиться в пруду после бани. Очень понравилось и то, что в доме не было телевизора – можно было по-настоящему отдохнуть, наслаждаться обществом друг друга и просто быть в моменте.',
      de: 'Unser Urlaub im Saunahaus war wirklich angenehm und erholsam! Der Ort war sehr gemütlich, und es herrschte eine wunderbare Ruhe und Stille, die man im Alltag oft vermisst. Besonders genossen haben wir die Wärme des Kamins, mitten im Wald zu sein und die Möglichkeit, sich nach der Sauna im Teich abzukühlen. Sehr gefallen hat uns auch, dass es im Haus keinen Fernseher gab – so konnte man wirklich abschalten, die Gesellschaft der anderen genießen und einfach im Moment sein.',
      es: 'Nuestras vacaciones en la Casa de la Sauna fueron de verdad agradables y reparadoras. El sitio era muy acogedor y reinaba una paz y un silencio maravillosos que tantas veces echamos de menos en el día a día. Disfrutamos especialmente del calor de la chimenea, de estar en medio del bosque y de poder refrescarnos en el estanque después de la sauna. También nos gustó mucho que no hubiera televisión en la casa: así pudimos desconectar de verdad, disfrutar de la compañía y simplemente vivir el momento.',
      sv: 'Vår semester i Bastuhuset var verkligen skön och uppfriskande! Stället var väldigt mysigt, och där rådde ett underbart lugn och en tystnad som man ofta saknar i vardagen. Vi njöt särskilt av värmen från brasan, av att vara mitt i skogen och av möjligheten att svalka oss i dammen efter bastun. Vi uppskattade också att det inte fanns någon tv i huset – så att vi verkligen kunde varva ner, njuta av varandras sällskap och bara vara i stunden.',
      fi: 'Lomamme Saunatalossa oli todella mukava ja virkistävä! Paikka oli hyvin viihtyisä, ja siellä vallitsi ihana rauha ja hiljaisuus, jota arjessa usein kaipaa. Nautimme erityisesti takan lämmöstä, metsän keskellä olemisesta ja mahdollisuudesta vilvoitella lammessa saunan jälkeen. Pidimme myös siitä, ettei talossa ollut televisiota – niin pystyi todella pysähtymään, nauttimaan toistensa seurasta ja vain olemaan hetkessä.',
      lv: 'Mūsu atpūta Pirts mājā bija patiesi jauka un atjaunojoša! Vieta bija ļoti mājīga, un tur valdīja brīnišķīgs miers un klusums, kā ikdienā bieži pietrūkst. Īpaši baudījām kamīna siltumu, atrašanos meža vidū un iespēju pēc pirts atveldzēties dīķī. Ļoti patika arī tas, ka mājā nebija televizora – tā varēja patiešām atpūsties, baudīt cits cita sabiedrību un vienkārši būt mirklī.',
    },
  },
  {
    /* Her closing paragraph, quoted whole: the one review so far about the Pond House. */
    id: 'anu',
    author: 'Anu Kuzma',
    originalLang: 'et',
    date: '2026-11',
    text: {
      et: 'Viimati käisin uuemas tiigimajas, see on omaette pärl. Luksuslik väike maamaja kaminaga, väga hubane. Soovitan minna kogema!',
      en: 'Most recently I stayed in the newer Pond House, which is a gem of its own. A luxurious little country house with a fireplace, very cosy. I recommend going to experience it!',
      ru: 'В последний раз я была в новом Прудовом доме – это отдельная жемчужина. Роскошный маленький загородный дом с камином, очень уютный. Советую поехать и почувствовать это самим!',
      de: 'Zuletzt war ich im neueren Teichhaus, das ist eine Perle für sich. Ein luxuriöses kleines Landhaus mit Kamin, sehr gemütlich. Ich empfehle, es selbst zu erleben!',
      es: 'La última vez estuve en la Casa del Estanque, la más nueva, que es una joya en sí misma. Una casita de campo lujosa con chimenea, muy acogedora. ¡Recomiendo ir a vivirlo!',
      sv: 'Senast bodde jag i det nyare Dammhuset, som är en pärla i sig. Ett lyxigt litet lanthus med öppen spis, väldigt mysigt. Jag rekommenderar att uppleva det!',
      fi: 'Viimeksi olin uudemmassa Lampitalossa, joka on helmi omana itsenään. Ylellinen pieni maalaistalo takalla, todella viihtyisä. Suosittelen kokemaan sen itse!',
      lv: 'Pēdējo reizi biju jaunākajā Dīķa mājā – tā ir pērle pati par sevi. Grezna maza lauku māja ar kamīnu, ļoti mājīga. Iesaku doties un piedzīvot!',
    },
  },
  {
    /*
     * Quoted exactly as written, "bookes" included. It is a guest's own sentence, not our
     * copy, and correcting someone's spelling inside quotation marks is still editing them.
     */
    id: 'rainis',
    author: 'Rainis Venta',
    originalLang: 'en',
    date: '2026',
    text: {
      en: 'Amazing place! Third time here, and again amazed! This time bookes the Forest House (Metsamaja). The evening warmth, the morning mist, the supercool atmosphere inside the cottage. That is just amazing. Wish I could live like that!',
      et: 'Hämmastav koht! Kolmandat korda siin ja jälle hämmastunud! Seekord broneerisin Metsamaja. Õhtune soojus, hommikune udu, ülilahe õhkkond majas. See on lihtsalt hämmastav. Soovin, et saaksin nii elada!',
      ru: 'Потрясающее место! Третий раз здесь и снова в восторге! На этот раз забронировал Лесной дом (Metsamaja). Вечернее тепло, утренний туман, потрясающая атмосфера внутри дома. Это просто потрясающе. Хотел бы я так жить!',
      de: 'Fantastischer Ort! Zum dritten Mal hier und wieder begeistert! Diesmal das Waldhaus (Metsamaja) gebucht. Die Wärme am Abend, der Nebel am Morgen, die großartige Atmosphäre im Haus. Das ist einfach fantastisch. Ich wünschte, ich könnte so leben!',
      es: '¡Un sitio increíble! Es la tercera vez que vengo y otra vez me ha encantado. Esta vez reservé la Casa del Bosque (Metsamaja). La calidez de la tarde, la niebla de la mañana, el ambiente genial dentro de la casa. Es sencillamente increíble. ¡Ojalá pudiera vivir así!',
      sv: 'Fantastiskt ställe! Tredje gången här och lika förtjust igen! Den här gången bokade jag Skogshuset (Metsamaja). Kvällsvärmen, morgondimman, den supercoola stämningen inne i stugan. Det är helt enkelt fantastiskt. Önskar att jag kunde leva så!',
      fi: 'Upea paikka! Kolmatta kertaa täällä ja taas haltioissani! Tällä kertaa varasin Metsätalon (Metsamaja). Illan lämpö, aamun usva, huikea tunnelma mökin sisällä. Se on yksinkertaisesti upeaa. Kunpa voisin elää noin!',
      lv: 'Brīnišķīga vieta! Jau trešo reizi šeit, un atkal sajūsmā! Šoreiz rezervēju Meža māju (Metsamaja). Vakara siltums, rīta migla, lieliskā atmosfēra mājiņā. Tas ir vienkārši brīnišķīgi. Kaut es varētu tā dzīvot!',
    },
  },
  {
    id: 'janek',
    originalLang: 'et',
    author: 'Janek Hamidzanov',
    date: '2025',
    text: {
      et: 'Peale lahke pererahva on ka koht suurepärane. Vaikne, maalähedane ja maitsekalt sisustatud puhkemajad. Ühesõnaga kui vajad linnakärast puhkust on just see koht, mida külastada. Piirkonnas on vaatamisväärsusi ja terviseradu.',
      en: 'Besides the kind hosts, the place itself is wonderful. Quiet, rural and tastefully furnished houses. In a word, if you need a rest from the noise of the city, this is the place to visit. There are sights and trails in the area.',
      ru: 'Помимо приветливых хозяев, и само место прекрасное. Тихие, деревенские и со вкусом обставленные дома. Одним словом, если нужен отдых от городского шума — это то самое место. В округе есть достопримечательности и тропы.',
      de: 'Neben den freundlichen Gastgebern ist auch der Ort selbst großartig. Ruhige, ländliche und geschmackvoll eingerichtete Häuser. Kurz gesagt: Wer Ruhe vom Lärm der Stadt braucht, sollte genau hierher kommen. In der Umgebung gibt es Sehenswürdigkeiten und Wanderwege.',
      es: 'Además de los amables anfitriones, el sitio en sí es estupendo. Casas tranquilas, rurales y decoradas con gusto. En una palabra: si necesitas descansar del ruido de la ciudad, este es el lugar que visitar. En la zona hay lugares de interés y senderos.',
      sv: 'Förutom de vänliga värdarna är själva stället underbart. Lugna, lantliga och smakfullt inredda stugor. Kort sagt: behöver du vila från stadens buller är det just hit du ska åka. I området finns sevärdheter och motionsspår.',
      fi: 'Ystävällisten isäntien lisäksi itse paikka on upea. Hiljaisia, maalaisia ja tyylikkäästi sisustettuja lomataloja. Sanalla sanoen: jos kaipaat lepoa kaupungin melusta, tämä on juuri oikea paikka. Alueella on nähtävyyksiä ja kuntopolkuja.',
      lv: 'Bez laipnajiem saimniekiem arī pati vieta ir lieliska. Klusas, lauku noskaņas un gaumīgi iekārtotas brīvdienu mājas. Vārdu sakot, ja jums vajag atpūtu no pilsētas trokšņa, šī ir īstā vieta, kur doties. Apkārtnē ir apskates objekti un veselības takas.',
    },
  },
  {
    id: 'heti-helen',
    originalLang: 'et',
    author: 'Heti-Helen Rohtla',
    date: '2024',
    text: {
      et: 'Ideaalne koht, kus võtta aeg maha ja lihtsalt olla. Toidud on maitsvad, hoolega tehtud ja imeilusti serveeritud!',
      en: 'An ideal place to slow down and simply be. The food is delicious, made with care and beautifully served!',
      ru: 'Идеальное место, чтобы сбавить темп и просто быть. Еда вкусная, приготовлена с заботой и красиво подана!',
      de: 'Ein idealer Ort, um herunterzukommen und einfach zu sein. Das Essen ist köstlich, mit Sorgfalt zubereitet und wunderschön angerichtet!',
      es: 'Un lugar ideal para bajar el ritmo y simplemente estar. ¡La comida es deliciosa, hecha con cariño y servida de maravilla!',
      sv: 'En perfekt plats att varva ner och bara vara. Maten är god, lagad med omsorg och vackert serverad!',
      fi: 'Ihanteellinen paikka hidastaa ja vain olla. Ruoka on herkullista, huolella tehtyä ja kauniisti tarjoiltua!',
      lv: 'Ideāla vieta, kur piebremzēt un vienkārši būt. Ēdiens ir garšīgs, gatavots ar rūpību un brīnišķīgi pasniegts!',
    },
  },
  {
    /*
     * The closing paragraph only, quoted whole. Her first paragraph states the property
     * "comfortably fits up to 35 people + children, and 12-16 can stay the night" — and our
     * own pages say ten adults, settled 29 Aug 2026. Publishing both would put two different
     * capacities on the same website, and a review cannot be edited to fix that. So the
     * paragraph about service is quoted in full and the reader is linked to the original.
     * Excerpting a whole paragraph is fair; rewriting one is not.
     */
    id: 'aleksandra',
    author: 'Aleksandra Kryzhanovskaya',
    originalLang: 'ru',
    date: '2023',
    text: {
      ru: 'В Эстонии мало мест, где обслуживание такое теплое и трепетное, видно, что люди делают свою работу от всего сердца. Спасибо большое, это самый лучший отдых для души!',
      et: 'Eestis on vähe kohti, kus teenindus on nii soe ja hoolik – on näha, et inimesed teevad oma tööd kogu südamest. Suur aitäh, see on hingele parim puhkus!',
      en: 'There are few places in Estonia where the service is this warm and attentive — you can see that these people do their work with all their heart. Thank you so much, this is the best rest there is for the soul!',
      de: 'In Estland gibt es nur wenige Orte, an denen der Service so herzlich und aufmerksam ist – man sieht, dass diese Menschen ihre Arbeit mit ganzem Herzen tun. Vielen Dank, das ist die beste Erholung für die Seele!',
      es: 'En Estonia hay pocos sitios donde el trato sea tan cálido y atento: se nota que esta gente hace su trabajo con todo el corazón. ¡Muchísimas gracias, es el mejor descanso para el alma!',
      sv: 'Det finns få ställen i Estland där servicen är så varm och omtänksam – man ser att de här människorna gör sitt arbete av hela sitt hjärta. Stort tack, det här är den bästa vilan för själen!',
      fi: 'Virossa on vähän paikkoja, joissa palvelu on näin lämmintä ja huomaavaista – näkee, että nämä ihmiset tekevät työtään koko sydämestään. Suuri kiitos, tämä on parasta lepoa sielulle!',
      lv: 'Igaunijā ir maz vietu, kur apkalpošana ir tik sirsnīga un gādīga – var redzēt, ka šie cilvēki savu darbu dara no visas sirds. Liels paldies, šī ir labākā atpūta dvēselei!',
    },
  },
  {
    /*
     * Kept for the second sentence. It is the only review that names a use nobody else
     * mentions — work gatherings — and a quiet house that seats a group off-season is
     * worth saying out loud. Spacing normalised (the original has spaces before commas);
     * not a word is changed.
     */
    id: 'ero',
    author: 'Ero Kukk',
    originalLang: 'et',
    date: '2023',
    text: {
      et: 'Super rahul, väga vaikne, ilus, rahulik koht. Perenaine väga külalislahke. Sobib nii tööalasteks kokkusaamisteks kui ka lihtsalt linnajamast puhkamiseks.',
      en: 'Very happy — a very quiet, beautiful, peaceful place. The hostess is very welcoming. It suits work gatherings just as well as simply resting away from the city.',
      ru: 'Очень доволен — очень тихое, красивое, спокойное место. Хозяйка очень гостеприимна. Подходит и для рабочих встреч, и просто для отдыха от городской суеты.',
      de: 'Sehr zufrieden — ein sehr ruhiger, schöner, friedlicher Ort. Die Gastgeberin ist überaus gastfreundlich. Geeignet für Arbeitstreffen ebenso wie zum Ausruhen fern der Stadt.',
      es: 'Muy contento: un lugar muy tranquilo, bonito y apacible. La anfitriona es muy acogedora. Sirve tanto para reuniones de trabajo como para descansar sin más del ajetreo de la ciudad.',
      sv: 'Supernöjd – ett väldigt lugnt, vackert och fridfullt ställe. Värdinnan är mycket gästvänlig. Passar lika bra för arbetsträffar som för att bara vila från stadens jäkt.',
      fi: 'Todella tyytyväinen – hyvin hiljainen, kaunis ja rauhallinen paikka. Emäntä on erittäin vieraanvarainen. Sopii yhtä hyvin työtapaamisiin kuin pelkkään lepoon kaupungin hälinästä.',
      lv: 'Ļoti apmierināts – ļoti klusa, skaista, mierīga vieta. Saimniece ir ļoti viesmīlīga. Der gan darba tikšanās reizēm, gan vienkārši atpūtai no pilsētas burzmas.',
    },
  },
  {
    id: 'julia',
    originalLang: 'et',
    author: 'Julia Kudrjavtseva',
    date: '2020',
    text: {
      et: 'Parimat kohta pole olemas. Saunaga maja on meie pere lemmik. Hubane, puhas. Maitsev ja nii ilusasti serveeritud hommikusöök. Südamest soovitan!',
      en: 'There is no better place. The house with the sauna is our family favourite. Cosy, clean. Delicious and so beautifully served breakfast. I recommend it wholeheartedly!',
      ru: 'Лучшего места нет. Дом с баней — любимец нашей семьи. Уютно, чисто. Вкусный и так красиво поданный завтрак. Рекомендую от всего сердца!',
      de: 'Einen besseren Ort gibt es nicht. Das Haus mit der Sauna ist der Liebling unserer Familie. Gemütlich, sauber. Köstliches und so schön angerichtetes Frühstück. Ich empfehle es von Herzen!',
      es: 'No hay un sitio mejor. La casa con sauna es la favorita de nuestra familia. Acogedora, limpia. Un desayuno delicioso y servido con tanto mimo. ¡Lo recomiendo de corazón!',
      sv: 'Det finns inget bättre ställe. Huset med bastun är vår familjs favorit. Mysigt, rent. Läcker och så vackert serverad frukost. Jag rekommenderar det av hela mitt hjärta!',
      fi: 'Parempaa paikkaa ei ole. Saunallinen talo on perheemme suosikki. Viihtyisä, siisti. Herkullinen ja niin kauniisti tarjoiltu aamiainen. Suosittelen koko sydämestäni!',
      lv: 'Labākas vietas nav. Māja ar pirti ir mūsu ģimenes mīļākā. Mājīga, tīra. Garšīgas un tik skaisti pasniegtas brokastis. No sirds iesaku!',
    },
  },
]

/**
 * "Translated from X", the way Google labels its own translations.
 *
 * Keyed both ways rather than written as a ternary, because the original language is not
 * always Estonian and a fallback branch would quietly mislabel the one review that is not.
 */
const LANGUAGE_NAME: Record<Lang, Record<Lang, string>> = {
  et: { et: 'eesti keelest', en: 'Estonian', ru: 'эстонского', de: 'dem Estnischen', es: 'estonio', sv: 'estniska', fi: 'virosta', lv: 'igauņu valodas' },
  en: { et: 'inglise keelest', en: 'English', ru: 'английского', de: 'dem Englischen', es: 'inglés', sv: 'engelska', fi: 'englannista', lv: 'angļu valodas' },
  ru: { et: 'vene keelest', en: 'Russian', ru: 'русского', de: 'dem Russischen', es: 'ruso', sv: 'ryska', fi: 'venäjästä', lv: 'krievu valodas' },
  de: { et: 'saksa keelest', en: 'German', ru: 'немецкого', de: 'dem Deutschen', es: 'alemán', sv: 'tyska', fi: 'saksasta', lv: 'vācu valodas' },
  es: { et: 'hispaania keelest', en: 'Spanish', ru: 'испанского', de: 'dem Spanischen', es: 'español', sv: 'spanska', fi: 'espanjasta', lv: 'spāņu valodas' },
  sv: { et: 'rootsi keelest', en: 'Swedish', ru: 'шведского', de: 'dem Schwedischen', es: 'sueco', sv: 'svenska', fi: 'ruotsista', lv: 'zviedru valodas' },
  fi: { et: 'soome keelest', en: 'Finnish', ru: 'финского', de: 'dem Finnischen', es: 'finés', sv: 'finska', fi: 'suomesta', lv: 'somu valodas' },
  lv: { et: 'läti keelest', en: 'Latvian', ru: 'латышского', de: 'dem Lettischen', es: 'letón', sv: 'lettiska', fi: 'latviasta', lv: 'latviešu valodas' },
}

const TRANSLATED_TEMPLATE: Record<Lang, (name: string) => string> = {
  et: n => `Tõlgitud ${n}`,
  en: n => `Translated from ${n}`,
  ru: n => `Перевод с ${n}`,
  de: n => `Aus ${n} übersetzt`,
  es: n => `Traducido del ${n}`,
  sv: n => `Översatt från ${n}`,
  fi: n => `Käännetty ${n}`,
  lv: n => `Tulkots no ${n}`,
}

/** Empty when the reader is seeing the guest's own words. */
export function translatedNote(original: Lang, display: Lang): string {
  if (original === display) return ''
  return TRANSLATED_TEMPLATE[display](LANGUAGE_NAME[original][display])
}

/** 'YYYY-MM' → "November 2026" in the reader's language; 'YYYY' → the year alone. */
export function reviewDate(date: string, lang: Lang): string {
  const [y, m] = date.split('-').map(Number)
  if (!m) return String(y)
  const locale = lang === 'en' ? 'en-GB' : lang
  return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' })
}
