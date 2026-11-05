import type { Lang } from '@/lib/translations'

type L = Record<Lang, string>

/**
 * Things made by hand at Oanduaia and sold through the site. Not live yet (Mikk, 3 Nov 2026:
 * "we not gonna publish it now") — the pages are noindex and linked from nowhere until he says.
 *
 * Every claim here comes from Mikk: fully handmade, an animal hide on the seat as an option,
 * 1 490 € with sheepskin +190 € and a special fur +290 €; oak and ash, made by the peremees.
 * No lead time is stated until he gives one, and no "come and try it" (Mikk: no need).
 */
export type ProductOption = { id: string; price: number; name: L }
export type Product = {
  slug: string
  price: number
  name: L
  tagline: L
  body: L[]
  facts: L[]
  options: ProductOption[]
  /** Heading over the option buttons; shown only when there is a real choice. */
  optionLabel?: L
  /** Starts hidden until Mikk ticks "Show on the site" in /admin. */
  hidden?: boolean
  photos: { src: string; alt: L }[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'kiiktool',
    price: 1490,
    name: {
      et: 'Kiiktool', en: 'Rocking chair', ru: 'Кресло-качалка', de: 'Schaukelstuhl',
      es: 'Mecedora', sv: 'Gungstol', fi: 'Keinutuoli', lv: 'Šūpuļkrēsls',
    },
    tagline: {
      et: 'Täielikult käsitöö. Iga tool on erinev, sest iga puu on erinev.',
      en: 'Made entirely by hand. Every chair is different, because every tree is.',
      ru: 'Полностью ручная работа. Каждое кресло своё, потому что каждое дерево своё.',
      de: 'Vollständig von Hand gefertigt. Jeder Stuhl ist anders, weil jeder Baum anders ist.',
      es: 'Hecha íntegramente a mano. Cada mecedora es distinta, porque cada árbol lo es.',
      sv: 'Helt handgjord. Varje stol är olik den andra, eftersom varje träd är det.',
      fi: 'Kokonaan käsityötä. Jokainen tuoli on erilainen, koska jokainen puu on.',
      lv: 'Pilnībā roku darbs. Katrs krēsls ir citāds, jo katrs koks ir citāds.',
    },
    body: [
      {
        et: 'Selja moodustab terve laud koos naturaalse servaga – koos lõhe, oksakohtade ja koore jäljega, mida puu ise kasvades tegi. Seda ei siluta ära, sest just see teeb tooli ainulaadseks.',
        en: 'The back is a single board with its natural edge left on – the split, the knots and the trace of bark the tree made as it grew. None of it is planed away; it is what makes the chair one of a kind.',
        ru: 'Спинка – цельная доска с природным краем: трещина, сучки и след коры, которые дерево оставило, пока росло. Ничего не сострогано – именно это делает кресло единственным в своём роде.',
        de: 'Die Lehne ist ein einziges Brett mit natürlicher Kante – mit dem Riss, den Ästen und der Spur der Rinde, die der Baum beim Wachsen hinterlassen hat. Nichts davon wird weggehobelt; genau das macht den Stuhl einzigartig.',
        es: 'El respaldo es una sola tabla con su borde natural: la grieta, los nudos y la huella de la corteza que el árbol dejó al crecer. Nada de eso se cepilla; es lo que hace única a cada mecedora.',
        sv: 'Ryggen är en enda planka med naturkanten kvar – sprickan, kvistarna och spåret av barken som trädet gjorde när det växte. Inget av det hyvlas bort; det är det som gör stolen unik.',
        fi: 'Selkänoja on yksi lauta luonnollisine reunoineen – halkeama, oksankohdat ja kaarnan jälki, jotka puu teki kasvaessaan. Mitään ei höylätä pois; juuri se tekee tuolista ainutlaatuisen.',
        lv: 'Atzveltne ir viens dēlis ar dabisko malu – plaisa, zari un mizas pēdas, ko koks atstāja augot. Nekas netiek noēvelēts; tieši tas padara krēslu vienreizēju.',
      },
      {
        et: 'Käetoed, jalad ja jalased on kujundatud käsitsi, nii et tool kiigub pehmelt ja istub kindlalt. Soovi korral tuleb istmele looma nahk – lambanahk või eriline karusnahk.',
        en: 'The arms, legs and rockers are shaped by hand, so the chair rocks softly and sits steady. If you like, it comes with an animal hide on the seat – a sheepskin or a special fur.',
        ru: 'Подлокотники, ножки и полозья вырезаны вручную, поэтому кресло качается мягко и стоит устойчиво. По желанию на сиденье кладётся натуральная шкура – овчина или особый мех.',
        de: 'Armlehnen, Beine und Kufen sind von Hand geformt, damit der Stuhl sanft schaukelt und sicher steht. Auf Wunsch kommt ein Tierfell auf die Sitzfläche – ein Schaffell oder ein besonderer Pelz.',
        es: 'Los brazos, las patas y los balancines se tallan a mano, para que la mecedora se balancee con suavidad y asiente firme. Si lo desea, lleva una piel natural en el asiento: de oveja o una piel especial.',
        sv: 'Armstöden, benen och medarna formas för hand, så att stolen gungar mjukt och står stadigt. Om du vill kommer den med ett djurskinn på sitsen – ett fårskinn eller en särskild päls.',
        fi: 'Käsinojat, jalat ja jalakset muotoillaan käsin, joten tuoli keinuu pehmeästi ja seisoo tukevasti. Halutessasi istuimelle tulee eläimen tali – lampaantalja tai erityinen turkis.',
        lv: 'Roku balsti, kājas un šūpuļi veidoti ar roku, tāpēc krēsls šūpojas maigi un stāv stabili. Pēc vēlēšanās uz sēdekļa tiek likta dzīvnieka āda – aitādа vai īpaša kažokāda.',
      },
      {
        et: 'Iga tooli teeb käsitsi Oanduaia peremees. Tool valmib tellimuse peale – kirjuta meile ja räägime läbi puidu, naha ja valmimise aja.',
        en: 'Every chair is made by hand by the master of the house at Oanduaia, to order. Write to us and we will talk through the wood, the hide and when it can be ready.',
        ru: 'Каждое кресло делает вручную хозяин Oanduaia, на заказ. Напишите нам – обсудим дерево, шкуру и сроки.',
        de: 'Jeden Stuhl fertigt der Hausherr von Oanduaia von Hand, auf Bestellung. Schreiben Sie uns – wir besprechen Holz, Fell und Fertigstellung.',
        es: 'Cada mecedora la hace a mano, por encargo, el dueño de casa de Oanduaia. Escríbanos y hablaremos de la madera, la piel y el plazo.',
        sv: 'Varje stol görs för hand av husbonden på Oanduaia, på beställning. Skriv till oss så pratar vi om träet, skinnet och när den kan vara klar.',
        fi: 'Jokaisen tuolin tekee käsin Oanduaian isäntä, tilauksesta. Kirjoita meille, niin sovitaan puusta, taljasta ja valmistumisajasta.',
        lv: 'Katru krēslu ar rokām pēc pasūtījuma darina Oanduaia saimnieks. Rakstiet mums – pārrunāsim koku, ādu un izgatavošanas laiku.',
      },
    ],
    facts: [
      { et: 'Täielikult käsitöö', en: 'Entirely handmade', ru: 'Полностью ручная работа', de: 'Vollständig handgefertigt', es: 'Íntegramente a mano', sv: 'Helt handgjord', fi: 'Kokonaan käsityötä', lv: 'Pilnībā roku darbs' },
      { et: 'Tamm ja saar, naturaalse servaga selg', en: 'Solid oak and ash, live-edge back', ru: 'Массив дуба и ясеня, спинка с природным краем', de: 'Massive Eiche und Esche, Lehne mit Naturkante', es: 'Roble y fresno macizos, respaldo con borde natural', sv: 'Massiv ek och ask, rygg med naturkant', fi: 'Täyttä tammea ja saarnia, luonnonreunainen selkänoja', lv: 'Masīvs ozols un osis, atzveltne ar dabisko malu' },
      { et: 'Valmib tellimuse peale', en: 'Made to order', ru: 'Изготовление на заказ', de: 'Auf Bestellung gefertigt', es: 'Por encargo', sv: 'Tillverkas på beställning', fi: 'Tehdään tilauksesta', lv: 'Izgatavo pēc pasūtījuma' },
      { et: 'Kättesaamine Oanduaias tasuta, transport Eestis kokkuleppel', en: 'Free pick-up at Oanduaia, delivery in Estonia by arrangement', ru: 'Самовывоз из Oanduaia бесплатно, доставка по Эстонии по договорённости', de: 'Abholung in Oanduaia kostenlos, Lieferung in Estland nach Absprache', es: 'Recogida gratuita en Oanduaia, envío en Estonia a convenir', sv: 'Gratis upphämtning på Oanduaia, leverans i Estland enligt överenskommelse', fi: 'Nouto Oanduaiasta maksutta, toimitus Viroon sopimuksen mukaan', lv: 'Saņemšana Oanduaia bez maksas, piegāde Igaunijā pēc vienošanās' },
    ],
    optionLabel: { et: 'Nahk istmele', en: 'Hide on the seat', ru: 'Шкура на сиденье', de: 'Fell auf dem Sitz', es: 'Piel en el asiento', sv: 'Skinn på sitsen', fi: 'Talja istuimelle', lv: 'Āda uz sēdekļa' },
    options: [
      { id: 'none', price: 0, name: { et: 'Ilma nahata', en: 'No hide', ru: 'Без шкуры', de: 'Ohne Fell', es: 'Sin piel', sv: 'Utan skinn', fi: 'Ilman taljaa', lv: 'Bez ādas' } },
      { id: 'sheepskin', price: 190, name: { et: 'Lambanahk', en: 'Sheepskin', ru: 'Овчина', de: 'Schaffell', es: 'Piel de oveja', sv: 'Fårskinn', fi: 'Lampaantalja', lv: 'Aitāda' } },
      { id: 'fur', price: 290, name: { et: 'Eriline karusnahk', en: 'Special fur', ru: 'Особый мех', de: 'Besonderer Pelz', es: 'Piel especial', sv: 'Särskild päls', fi: 'Erityinen turkis', lv: 'Īpaša kažokāda' } },
    ],
    photos: [
      { src: '/tooted/kiiktool/1.jpg', alt: { et: 'Käsitöö kiiktool karusnahaga palkmaja akna all', en: 'Handmade rocking chair with a fur, by a log-house window', ru: 'Кресло-качалка ручной работы с мехом у окна бревенчатого дома', de: 'Handgefertigter Schaukelstuhl mit Fell am Fenster eines Blockhauses', es: 'Mecedora hecha a mano con piel junto a la ventana de una casa de troncos', sv: 'Handgjord gungstol med päls vid ett timmerhusfönster', fi: 'Käsintehty keinutuoli turkiksella hirsitalon ikkunan ääressä', lv: 'Roku darba šūpuļkrēsls ar kažokādu pie guļbūves loga' } },
      { src: '/tooted/kiiktool/2.jpg', alt: { et: 'Kiiktool töökojas enne viimistlust', en: 'The rocking chair in the workshop before finishing', ru: 'Кресло-качалка в мастерской до отделки', de: 'Der Schaukelstuhl in der Werkstatt vor der Oberflächenbehandlung', es: 'La mecedora en el taller antes del acabado', sv: 'Gungstolen i verkstaden före ytbehandling', fi: 'Keinutuoli verstaalla ennen viimeistelyä', lv: 'Šūpuļkrēsls darbnīcā pirms apdares' } },
      { src: '/tooted/kiiktool/3.jpg', alt: { et: 'Kiiktool eestvaates, naturaalse servaga selg', en: 'The rocking chair from the front, live-edge back', ru: 'Кресло-качалка спереди, спинка с природным краем', de: 'Der Schaukelstuhl von vorn, Lehne mit Naturkante', es: 'La mecedora de frente, respaldo con borde natural', sv: 'Gungstolen framifrån, rygg med naturkant', fi: 'Keinutuoli edestä, luonnonreunainen selkänoja', lv: 'Šūpuļkrēsls no priekšpuses, atzveltne ar dabisko malu' } },
      { src: '/tooted/kiiktool/4.jpg', alt: { et: 'Kiiktooli istme ja selja lõhe lähivaade', en: 'Close view of the seat and the split in the back', ru: 'Сиденье и трещина в спинке крупным планом', de: 'Nahaufnahme von Sitz und Riss in der Lehne', es: 'Vista cercana del asiento y la grieta del respaldo', sv: 'Närbild av sitsen och sprickan i ryggen', fi: 'Lähikuva istuimesta ja selkänojan halkeamasta', lv: 'Sēdekļa un atzveltnes plaisas tuvplāns' } },
      { src: '/tooted/kiiktool/5.jpg', alt: { et: 'Kiiktool tagantvaates, seljatugi ja käetoed', en: 'The rocking chair from behind, back support and arms', ru: 'Кресло-качалка сзади, опора спинки и подлокотники', de: 'Der Schaukelstuhl von hinten, Rückenstütze und Armlehnen', es: 'La mecedora por detrás, soporte del respaldo y brazos', sv: 'Gungstolen bakifrån, ryggstöd och armstöd', fi: 'Keinutuoli takaa, selkätuki ja käsinojat', lv: 'Šūpuļkrēsls no aizmugures, atzveltnes balsts un roku balsti' } },
    ],
  },
  {
    // Mikk, 3 Nov 2026: Toomas's photos from May. Price 690 € is Claude's proposal — confirm before launch.
    // Made by the peremees (Mikk: all products are). Wood and what comes with it are not stated until Mikk gives them.
    slug: 'vorkkiik',
    price: 690,
    name: {
      et: 'Puidust võrkkiik', en: 'Log hammock', ru: 'Гамак из брёвнышек', de: 'Hängematte aus Rundhölzern',
      es: 'Hamaca de troncos', sv: 'Hängmatta av rundvirke', fi: 'Puinen riippumatto', lv: 'Koka šūpuļtīkls',
    },
    tagline: {
      et: 'Käsitsi tehtud võrkkiik ümarpuust – kahe puu vahele, metsa alla.',
      en: 'A hammock made by hand from small round logs – for between two trees, under the forest.',
      ru: 'Гамак ручной работы из круглых брёвнышек – между двумя деревьями, под лесным пологом.',
      de: 'Eine handgemachte Hängematte aus Rundhölzern – zwischen zwei Bäume, unter das Blätterdach.',
      es: 'Una hamaca hecha a mano con pequeños troncos redondos, para colgar entre dos árboles.',
      sv: 'En handgjord hängmatta av runda småstockar – mellan två träd, under skogens tak.',
      fi: 'Käsin tehty riippumatto pyöreistä puista – kahden puun väliin, metsän katveeseen.',
      lv: 'Ar rokām darināts šūpuļtīkls no apaļkoka – starp diviem kokiem, meža ēnā.',
    },
    body: [
      {
        et: 'Kümned ümarpuust pulgad on lõigatud, puuritud ja nööri peale lükitud ükshaaval. Lamades vajub kiik hälli kujuliseks ja hoiab sind keskel.',
        en: 'Dozens of round wooden rungs are cut, drilled and threaded onto the rope one by one. When you lie down, the hammock settles into a cradle and holds you in the middle.',
        ru: 'Десятки круглых перекладин вырезаны, просверлены и нанизаны на верёвку одна за другой. Когда ложишься, гамак принимает форму колыбели и держит в середине.',
        de: 'Dutzende runde Holzsprossen werden einzeln zugeschnitten, gebohrt und auf das Seil gefädelt. Legt man sich hinein, formt sich die Hängematte zur Wiege und hält einen in der Mitte.',
        es: 'Decenas de travesaños redondos se cortan, se taladran y se ensartan en la cuerda uno a uno. Al tumbarse, la hamaca forma una cuna y le sostiene en el centro.',
        sv: 'Dussintals runda pinnar sågas, borras och träs upp på repet en och en. När du lägger dig formar sig hängmattan till en vagga och håller dig i mitten.',
        fi: 'Kymmenet pyöreät puolat sahataan, porataan ja pujotetaan köyteen yksi kerrallaan. Kun käyt makuulle, riippumatto asettuu kehdon muotoon ja pitää sinut keskellä.',
        lv: 'Desmitiem apaļu koka šķērskociņu tiek nozāģēti, izurbti un uzvērti uz virves pa vienam. Apguļoties šūpuļtīkls ieņem šūpuļa formu un tur jūs vidū.',
      },
      {
        et: 'Iga kiige teeb käsitsi Oanduaia peremees, tellimuse peale – kirjuta meile ja räägime läbi suuruse ja valmimise aja.',
        en: 'Every hammock is made by hand by the master of the house at Oanduaia, to order – write to us and we will talk through the size and when it can be ready.',
        ru: 'Каждый гамак делает вручную хозяин Oanduaia, на заказ – напишите нам, обсудим размер и сроки.',
        de: 'Jede Hängematte fertigt der Hausherr von Oanduaia von Hand, auf Bestellung – schreiben Sie uns, dann besprechen wir Größe und Fertigstellung.',
        es: 'Cada hamaca la hace a mano, por encargo, el dueño de casa de Oanduaia: escríbanos y hablaremos del tamaño y del plazo.',
        sv: 'Varje hängmatta görs för hand av husbonden på Oanduaia, på beställning – skriv till oss så pratar vi om storlek och när den kan vara klar.',
        fi: 'Jokaisen riippumaton tekee käsin Oanduaian isäntä, tilauksesta – kirjoita meille, niin sovitaan koosta ja valmistumisajasta.',
        lv: 'Katru šūpuļtīklu ar rokām pēc pasūtījuma darina Oanduaia saimnieks – rakstiet mums, un pārrunāsim izmēru un izgatavošanas laiku.',
      },
    ],
    facts: [
      { et: 'Käsitöö', en: 'Handmade', ru: 'Ручная работа', de: 'Handgefertigt', es: 'Hecha a mano', sv: 'Handgjord', fi: 'Käsityötä', lv: 'Roku darbs' },
      { et: 'Valmib tellimuse peale', en: 'Made to order', ru: 'Изготовление на заказ', de: 'Auf Bestellung gefertigt', es: 'Por encargo', sv: 'Tillverkas på beställning', fi: 'Tehdään tilauksesta', lv: 'Izgatavo pēc pasūtījuma' },
      { et: 'Kättesaamine Oanduaias tasuta, transport Eestis kokkuleppel', en: 'Free pick-up at Oanduaia, delivery in Estonia by arrangement', ru: 'Самовывоз из Oanduaia бесплатно, доставка по Эстонии по договорённости', de: 'Abholung in Oanduaia kostenlos, Lieferung in Estland nach Absprache', es: 'Recogida gratuita en Oanduaia, envío en Estonia a convenir', sv: 'Gratis upphämtning på Oanduaia, leverans i Estland enligt överenskommelse', fi: 'Nouto Oanduaiasta maksutta, toimitus Viroon sopimuksen mukaan', lv: 'Saņemšana Oanduaia bez maksas, piegāde Igaunijā pēc vienošanās' },
    ],
    options: [
      { id: 'std', price: 0, name: { et: 'Võrkkiik', en: 'Hammock', ru: 'Гамак', de: 'Hängematte', es: 'Hamaca', sv: 'Hängmatta', fi: 'Riippumatto', lv: 'Šūpuļtīkls' } },
    ],
    photos: [
      { src: '/tooted/vorkkiik/1.jpg', alt: { et: 'Kaks puidust võrkkiike kaskede vahel Tiigimaja ees', en: 'Two log hammocks between birches in front of the Pond House', ru: 'Два деревянных гамака между берёзами перед Прудовым домом', de: 'Zwei Rundholz-Hängematten zwischen Birken vor dem Teichhaus', es: 'Dos hamacas de troncos entre abedules frente a la Casa del Estanque', sv: 'Två hängmattor av rundvirke mellan björkar framför Dammhuset', fi: 'Kaksi puista riippumattoa koivujen välissä Lampitalon edessä', lv: 'Divi koka šūpuļtīkli starp bērziem pie Dīķa mājas' } },
      { src: '/tooted/vorkkiik/2.jpg', alt: { et: 'Kaks puidust võrkkiike Oanduaia hoovis', en: 'Two log hammocks in the Oanduaia yard', ru: 'Два деревянных гамака во дворе Oanduaia', de: 'Zwei Rundholz-Hängematten im Hof von Oanduaia', es: 'Dos hamacas de troncos en el patio de Oanduaia', sv: 'Två hängmattor av rundvirke på gården i Oanduaia', fi: 'Kaksi puista riippumattoa Oanduaian pihalla', lv: 'Divi koka šūpuļtīkli Oanduaia pagalmā' } },
      { src: '/tooted/vorkkiik/3.jpg', alt: { et: 'Võrkkiiged puude vahel, ühes tekk', en: 'The hammocks between the trees, a blanket in one', ru: 'Гамаки между деревьями, в одном плед', de: 'Die Hängematten zwischen den Bäumen, in einer eine Decke', es: 'Las hamacas entre los árboles, una con manta', sv: 'Hängmattorna mellan träden, en filt i den ena', fi: 'Riippumatot puiden välissä, toisessa huopa', lv: 'Šūpuļtīkli starp kokiem, vienā sega' } },
      { src: '/tooted/vorkkiik/4.jpg', alt: { et: 'Lähivaade: ümarpuust pulgad nööri peal', en: 'Close view: round rungs threaded on the rope', ru: 'Крупный план: круглые перекладины на верёвке', de: 'Nahaufnahme: Rundholzsprossen auf dem Seil', es: 'Detalle: travesaños redondos en la cuerda', sv: 'Närbild: runda pinnar uppträdda på repet', fi: 'Lähikuva: pyöreät puolat köydessä', lv: 'Tuvplāns: apaļi šķērskociņi uz virves' } },
      { src: '/tooted/vorkkiik/5.jpg', alt: { et: 'Võrkkiik kasutuses metsa all', en: 'The hammock in use under the forest', ru: 'Гамак под лесным пологом', de: 'Die Hängematte im Gebrauch unter den Bäumen', es: 'La hamaca en uso bajo los árboles', sv: 'Hängmattan i bruk under träden', fi: 'Riippumatto käytössä metsän alla', lv: 'Šūpuļtīkls lietošanā meža ēnā' } },
      { src: '/tooted/vorkkiik/6.jpg', alt: { et: 'Võrkkiik Oanduaia majade ees', en: 'The hammock in front of the Oanduaia houses', ru: 'Гамак перед домами Oanduaia', de: 'Die Hängematte vor den Häusern von Oanduaia', es: 'La hamaca frente a las casas de Oanduaia', sv: 'Hängmattan framför husen i Oanduaia', fi: 'Riippumatto Oanduaian talojen edessä', lv: 'Šūpuļtīkls pie Oanduaia mājām' } },
    ],
  },
  {
    // Mikk, 3 Nov 2026: the Oanduaia logo C (spruce + sauna in a ring) burned into a branch slice
    // with a live edge and only a thin line of bark. Photo is a MOCKUP (AI wood + real logo). Shown on /products at Mikk's word. 10 € set by Mikk.
    slug: 'magnet',
    price: 10,
    name: {
      et: 'Oanduaia magnet', en: 'Oanduaia magnet', ru: 'Магнит Oanduaia', de: 'Oanduaia-Magnet',
      es: 'Imán de Oanduaia', sv: 'Oanduaia-magnet', fi: 'Oanduaia-magneetti', lv: 'Oanduaia magnēts',
    },
    tagline: {
      et: 'Oksaketas koos koorega, Oanduaia märk peale põletatud – külmkapi uksele.',
      en: 'A slice of a branch with its bark left on and the Oanduaia mark burned in – for the fridge door.',
      ru: 'Срез ветки с корой и выжженным знаком Oanduaia – на дверцу холодильника.',
      de: 'Eine Astscheibe mit Rinde und eingebranntem Oanduaia-Zeichen – für die Kühlschranktür.',
      es: 'Una rodaja de rama con su corteza y la marca de Oanduaia grabada a fuego, para la nevera.',
      sv: 'En skiva av en gren med barken kvar och Oanduaias märke inbränt – till kylskåpsdörren.',
      fi: 'Oksasta sahattu kiekko kaarnoineen, Oanduaian merkki poltettuna – jääkaapin oveen.',
      lv: 'Zara ripa ar mizu un iededzinātu Oanduaia zīmi – ledusskapja durvīm.',
    },
    body: [
      {
        et: 'Iga magnet on lõigatud oksast käsitsi, nii et serv ja aastarõngad on igal ühel isesugused. Magneti teeb Oanduaia peremees.',
        en: 'Each magnet is cut by hand from a branch, so the edge and the growth rings are different on every one. Made by the master of the house at Oanduaia.',
        ru: 'Каждый магнит вырезан из ветки вручную, поэтому край и годичные кольца у всех разные. Делает хозяин Oanduaia.',
        de: 'Jeder Magnet wird von Hand aus einem Ast geschnitten, darum sind Rand und Jahresringe bei jedem anders. Gefertigt vom Hausherrn von Oanduaia.',
        es: 'Cada imán se corta a mano de una rama, así que el borde y los anillos son distintos en cada uno. Lo hace el dueño de casa de Oanduaia.',
        sv: 'Varje magnet sågas för hand ur en gren, så kanten och årsringarna är olika på varje. Gjord av husbonden på Oanduaia.',
        fi: 'Jokainen magneetti sahataan käsin oksasta, joten reuna ja vuosirenkaat ovat jokaisessa erilaiset. Tekijä on Oanduaian isäntä.',
        lv: 'Katrs magnēts ar rokām izzāģēts no zara, tāpēc mala un gadskārtas katram ir citādas. Darina Oanduaia saimnieks.',
      },
    ],
    facts: [
      { et: 'Käsitöö', en: 'Handmade', ru: 'Ручная работа', de: 'Handgefertigt', es: 'Hecho a mano', sv: 'Handgjord', fi: 'Käsityötä', lv: 'Roku darbs' },
      { et: 'Oksaketas koorega, põletatud märk', en: 'Branch slice with bark, burned mark', ru: 'Срез ветки с корой, выжженный знак', de: 'Astscheibe mit Rinde, eingebranntes Zeichen', es: 'Rodaja de rama con corteza, marca a fuego', sv: 'Grenskiva med bark, inbränt märke', fi: 'Oksakiekko kaarnoineen, poltettu merkki', lv: 'Zara ripa ar mizu, iededzināta zīme' },
    ],
    options: [
      { id: 'std', price: 0, name: { et: 'Magnet', en: 'Magnet', ru: 'Магнит', de: 'Magnet', es: 'Imán', sv: 'Magnet', fi: 'Magneetti', lv: 'Magnēts' } },
    ],
    photos: [
      { src: '/tooted/magnet/1.jpg', alt: { et: 'Oanduaia magnet: oksaketas koorega, kuuse ja sauna märk peale põletatud', en: 'Oanduaia magnet: a branch slice with bark, the spruce-and-sauna mark burned in', ru: 'Магнит Oanduaia: срез ветки с корой и выжженной елью и сауной', de: 'Oanduaia-Magnet: Astscheibe mit Rinde und eingebranntem Fichte-und-Sauna-Zeichen', es: 'Imán de Oanduaia: rodaja de rama con corteza y el abeto y la sauna grabados', sv: 'Oanduaia-magnet: grenskiva med bark och inbränt gran- och bastumärke', fi: 'Oanduaia-magneetti: kaarnallinen oksakiekko, kuusi- ja saunamerkki poltettuna', lv: 'Oanduaia magnēts: zara ripa ar mizu un iededzinātu egles un pirts zīmi' } },
    ],
  },
  {
    // Mikk, 4 Nov 2026: the smart dog house, designed in the 3D model (Desktop/koerakuut-demo). Prices are Claude's
    // proposal on Mikk's word ("use your own know-how"); pictures are 3D renders until the first one is built.
    slug: 'koerakuut',
    price: 3900,
    optionLabel: { et: 'Varustus', en: 'Equipment', ru: 'Комплектация', de: 'Ausstattung', es: 'Equipamiento', sv: 'Utrustning', fi: 'Varustus', lv: 'Aprīkojums' },
    name: {
      et: 'Oanduaia koerakuut', en: 'Oanduaia dog house', ru: 'Будка Oanduaia', de: 'Oanduaia-Hundehütte',
      es: 'Caseta Oanduaia', sv: 'Oanduaia hundkoja', fi: 'Oanduaia-koirankoppi', lv: 'Oanduaia suņu būda',
    },
    tagline: {
      et: 'Väike Oanduaia maja koerale: ümarpalgid, roogkatus ja soe, tuulevaikne pesa.',
      en: 'A small Oanduaia house for a dog: round logs, a thatched roof and a warm, wind-free den.',
      ru: 'Маленький дом Oanduaia для собаки: круглые брёвна, тростниковая крыша и тёплое логово без сквозняков.',
      de: 'Ein kleines Oanduaia-Haus für den Hund: Rundholz, Reetdach und eine warme, windstille Höhle.',
      es: 'Una pequeña casa de Oanduaia para el perro: troncos redondos, tejado de junco y una guarida cálida y sin viento.',
      sv: 'Ett litet Oanduaia-hus för hunden: rundtimmer, vasstak och ett varmt, vindstilla bo.',
      fi: 'Pieni Oanduaia-talo koiralle: pyöröhirret, ruokokatto ja lämmin, tuuleton pesä.',
      lv: 'Maza Oanduaia māja sunim: apaļbaļķi, niedru jumts un silta, bezvēja guļvieta.',
    },
    body: [
      {
        et: 'Koerakuut on ehitatud nagu Oanduaia majad: ümarpalkidest seinad, igas palgivahes tihend ja paks roogkatus, mis ulatub üle kõigi nelja külje. Põhjas jääb õhk liikuma, seinad on ülevalt alla tihedad.',
        en: 'The dog house is built like the Oanduaia houses: round-log walls sealed in every joint, and a thick thatched roof that wraps over all four sides. Air moves under the raised floor; the walls are sealed from top to bottom.',
        ru: 'Будка построена как дома Oanduaia: стены из круглых брёвен с уплотнением в каждом шве и толстая тростниковая крыша на все четыре стороны. Под приподнятым полом воздух движется, стены плотные сверху донизу.',
        de: 'Die Hütte ist gebaut wie die Häuser von Oanduaia: Rundholzwände, jede Fuge abgedichtet, und ein dickes Reetdach über alle vier Seiten. Unter dem erhöhten Boden zirkuliert Luft, die Wände sind von oben bis unten dicht.',
        es: 'La caseta se construye como las casas de Oanduaia: paredes de troncos redondos selladas en cada junta y un grueso tejado de junco que cubre los cuatro lados. Bajo el suelo elevado circula el aire; las paredes son estancas de arriba abajo.',
        sv: 'Hundkojan byggs som husen på Oanduaia: väggar av rundtimmer tätade i varje fog och ett tjockt vasstak över alla fyra sidor. Under det upphöjda golvet rör sig luften, väggarna är täta uppifrån och ned.',
        fi: 'Koppi rakennetaan kuten Oanduaian talot: pyöröhirsiseinät tiivistettyinä jokaisesta saumasta ja paksu ruokokatto kaikille neljälle sivulle. Korotetun lattian alla ilma liikkuu, seinät ovat tiiviit ylhäältä alas.',
        lv: 'Būda celta kā Oanduaia mājas: apaļbaļķu sienas ar blīvējumu katrā šuvē un biezs niedru jumts pār visām četrām pusēm. Zem paceltās grīdas gaiss kustas, sienas ir blīvas no augšas līdz apakšai.',
      },
      {
        et: 'Uks on küljel ja viib väikesesse eeskotta; magamisase on palkvaheseina taga, nii et tuul voodini ei jõua. Tagaseinas on kaks hingedel palkust – pesa saab puhastada ja haiget või vana koera aidata. Põrandal on liistudest puitvoodi pestava villase alusega ja jahe kiviriba suveks.',
        en: 'The doorway sits to one side and leads into a small vestibule; the bed is behind a log partition, so wind never reaches it. The back wall has two hinged log doors for cleaning the den or helping a sick or old dog. On the floor: a slatted wooden bed with a washable wool pad, and a cool stone strip for summer.',
        ru: 'Вход сбоку ведёт в маленький тамбур; лежанка за бревенчатой перегородкой, поэтому ветер до неё не доходит. В задней стене две бревенчатые двери на петлях – для уборки и чтобы помочь больной или старой собаке. На полу реечная деревянная лежанка с моющейся шерстяной подстилкой и прохладная каменная полоса на лето.',
        de: 'Der Eingang liegt seitlich und führt in einen kleinen Vorraum; das Lager liegt hinter einer Blockwand, der Wind erreicht es nie. In der Rückwand sind zwei Blocktüren mit Scharnieren – zum Reinigen und um einem kranken oder alten Hund zu helfen. Am Boden: ein Lattenbett aus Holz mit waschbarer Wollauflage und ein kühler Steinstreifen für den Sommer.',
        es: 'La entrada está a un lado y da a un pequeño vestíbulo; la cama está tras un tabique de troncos, el viento nunca llega. La pared trasera tiene dos puertas de troncos con bisagras para limpiar o ayudar a un perro enfermo o mayor. En el suelo: una cama de listones con almohadilla de lana lavable y una franja de piedra fresca para el verano.',
        sv: 'Ingången sitter åt sidan och leder in i ett litet vindfång; bädden ligger bakom en timmervägg så att vinden aldrig når den. Bakväggen har två gångjärnsdörrar av timmer för städning eller för att hjälpa en sjuk eller gammal hund. På golvet: en ribbsäng av trä med tvättbar ulldyna och en sval stenremsa för sommaren.',
        fi: 'Oviaukko on sivussa ja johtaa pieneen tuulikaappiin; makuupaikka on hirsiseinän takana, joten tuuli ei sinne yllä. Takaseinässä on kaksi saranoitua hirsiovea siivousta varten tai sairaan tai vanhan koiran auttamiseen. Lattialla rimoista tehty puusänky pestävällä villapatjalla ja viileä kivikaistale kesäksi.',
        lv: 'Ieeja ir sānis un ved mazā priekštelpā; guļvieta ir aiz baļķu starpsienas, tāpēc vējš tai netiek klāt. Aizmugurējā sienā ir divas baļķu durvis uz eņģēm – tīrīšanai vai lai palīdzētu slimam vai vecam sunim. Uz grīdas – līstīšu koka gulta ar mazgājamu vilnas paklāju un vēsa akmens josla vasarai.',
      },
      {
        et: 'Nutipakett lisab madalpingega põrandakütte, mittekülmuva joogikausi, temperatuuri- ja kohaloluandurid, voodi all kaalu mõõtva anduri ning ukse kohal kaamera koos liikumisanduriga valgustiga. Rakendusest näed, kas koer on sees, kui soe on pesas ja kas vesi on lahti. Iga kuut teeb käsitsi Oanduaia peremees, tellimuse peale.',
        en: 'The smart package adds low-voltage floor heating, a frost-free water bowl, temperature and presence sensors, weight sensing under the bed, and a camera with a motion light above the doorway. The app shows whether the dog is inside, how warm the den is and whether the water is open. Every dog house is made by hand by the master of the house at Oanduaia, to order.',
        ru: 'Смарт-пакет добавляет низковольтный подогрев пола, незамерзающую миску, датчики температуры и присутствия, датчики веса под лежанкой и камеру с подсветкой по движению над входом. В приложении видно, в будке ли собака, как тепло внутри и не замёрзла ли вода. Каждую будку вручную делает хозяин Oanduaia, на заказ.',
        de: 'Das Smart-Paket bringt Niedervolt-Fußbodenheizung, einen frostfreien Wassernapf, Temperatur- und Anwesenheitssensoren, Gewichtssensoren unter dem Bett und eine Kamera mit Bewegungslicht über dem Eingang. Die App zeigt, ob der Hund drinnen ist, wie warm die Höhle ist und ob das Wasser offen ist. Jede Hütte fertigt der Hausherr von Oanduaia von Hand, auf Bestellung.',
        es: 'El paquete inteligente añade suelo radiante de baja tensión, un bebedero antihielo, sensores de temperatura y presencia, sensores de peso bajo la cama y una cámara con luz de movimiento sobre la entrada. La app muestra si el perro está dentro, la temperatura de la guarida y si el agua está libre. Cada caseta la hace a mano, por encargo, el dueño de casa de Oanduaia.',
        sv: 'Smartpaketet ger lågspänd golvvärme, en frostfri vattenskål, temperatur- och närvarosensorer, viktsensorer under sängen och en kamera med rörelseljus ovanför ingången. Appen visar om hunden är inne, hur varmt det är i boet och om vattnet är öppet. Varje koja görs för hand av husbonden på Oanduaia, på beställning.',
        fi: 'Älypaketti tuo pienjännitteisen lattialämmityksen, jäätymättömän vesikupin, lämpötila- ja läsnäoloanturit, painoanturit sängyn alle sekä kameran ja liiketunnistinvalon oven yläpuolelle. Sovelluksesta näet, onko koira sisällä, kuinka lämmin pesä on ja onko vesi sulana. Jokaisen kopin tekee käsin Oanduaian isäntä, tilauksesta.',
        lv: 'Viedā pakete pievieno zemsprieguma grīdas apsildi, nesasalstošu ūdens bļodu, temperatūras un klātbūtnes sensorus, svara sensorus zem gultas un kameru ar kustības gaismu virs ieejas. Lietotnē redzams, vai suns ir iekšā, cik silta ir guļvieta un vai ūdens nav sasalis. Katru būdu ar rokām pēc pasūtījuma darina Oanduaia saimnieks.',
      },
    ],
    facts: [
      { et: 'Mõõdud: alus 1,15 × 1,55 m (koos verandaga), kõrgus koos harjapuudega ~1,6 m', en: 'Size: base 1.15 × 1.55 m (with porch), height incl. ridge sticks ~1.6 m', ru: 'Размеры: основание 1,15 × 1,55 м (с крыльцом), высота с коньковыми жердями ~1,6 м', de: 'Maße: Grundfläche 1,15 × 1,55 m (mit Veranda), Höhe inkl. Firsthölzer ~1,6 m', es: 'Medidas: base 1,15 × 1,55 m (con porche), altura con palos de cumbrera ~1,6 m', sv: 'Mått: bas 1,15 × 1,55 m (med veranda), höjd inkl. nockstickor ~1,6 m', fi: 'Mitat: pohja 1,15 × 1,55 m (kuistin kanssa), korkeus harjapuineen ~1,6 m', lv: 'Izmēri: pamatne 1,15 × 1,55 m (ar verandu), augstums ar kores kokiem ~1,6 m' },
      { et: 'Magamisase ~103 × 76 cm, uks 35 × 50 cm – ühele suurele koerale (husky, labrador, lambakoer)', en: 'Den ~103 × 76 cm, doorway 35 × 50 cm – for one large dog (husky, Labrador, shepherd)', ru: 'Лежанка ~103 × 76 см, вход 35 × 50 см – для одной крупной собаки (хаски, лабрадор, овчарка)', de: 'Liegeraum ~103 × 76 cm, Eingang 35 × 50 cm – für einen großen Hund (Husky, Labrador, Schäferhund)', es: 'Guarida ~103 × 76 cm, entrada 35 × 50 cm – para un perro grande (husky, labrador, pastor)', sv: 'Bo ~103 × 76 cm, öppning 35 × 50 cm – för en stor hund (husky, labrador, schäfer)', fi: 'Makuutila ~103 × 76 cm, oviaukko 35 × 50 cm – yhdelle isolle koiralle (husky, labradori, paimenkoira)', lv: 'Guļvieta ~103 × 76 cm, ieeja 35 × 50 cm – vienam lielam sunim (haskijs, labradors, aitu suns)' },
      { et: 'Ümarpalk Ø ~12 cm, tihendatud vuugid, roogkatus, kivijalad', en: 'Round logs Ø ~12 cm, sealed joints, reed thatch, stone feet', ru: 'Круглые брёвна Ø ~12 см, уплотнённые швы, тростник, каменные опоры', de: 'Rundholz Ø ~12 cm, abgedichtete Fugen, Reetdach, Steinfüße', es: 'Troncos redondos Ø ~12 cm, juntas selladas, junco, pies de piedra', sv: 'Rundtimmer Ø ~12 cm, tätade fogar, vasstak, stenfötter', fi: 'Pyöröhirsi Ø ~12 cm, tiivistetyt saumat, ruokokatto, kivijalat', lv: 'Apaļbaļķi Ø ~12 cm, noblīvētas šuves, niedru jumts, akmens kājas' },
      { et: 'Elekter: koera juures ainult 12/24 V, võrgutoide lukustatud kastis, kaabel torus', en: 'Power: only 12/24 V near the dog, mains in a locked box, cable in conduit', ru: 'Питание: рядом с собакой только 12/24 В, сеть в запертом ящике, кабель в трубе', de: 'Strom: beim Hund nur 12/24 V, Netzstrom im abschließbaren Kasten, Kabel im Rohr', es: 'Electricidad: junto al perro solo 12/24 V, red en caja cerrada, cable en tubo', sv: 'El: vid hunden bara 12/24 V, nätström i låst låda, kabel i rör', fi: 'Sähkö: koiran lähellä vain 12/24 V, verkkovirta lukitussa kotelossa, kaapeli putkessa', lv: 'Elektrība: pie suņa tikai 12/24 V, tīkla strāva slēgtā kastē, kabelis caurulē' },
      { et: 'Valmib tellimuse peale ~8–10 nädalat; transport ja paigaldus Eestis kokkuleppel', en: 'Made to order in ~8–10 weeks; delivery and setup in Estonia by arrangement', ru: 'Изготовление на заказ ~8–10 недель; доставка и установка по Эстонии по договорённости', de: 'Auf Bestellung in ~8–10 Wochen; Lieferung und Aufbau in Estland nach Absprache', es: 'Por encargo en ~8–10 semanas; entrega e instalación en Estonia a convenir', sv: 'Tillverkas på beställning på ~8–10 veckor; leverans och montering i Estland enligt överenskommelse', fi: 'Tehdään tilauksesta ~8–10 viikossa; toimitus ja asennus Virossa sopimuksen mukaan', lv: 'Izgatavo pēc pasūtījuma ~8–10 nedēļās; piegāde un uzstādīšana Igaunijā pēc vienošanās' },
      { et: 'Pildid on 3D-mudelist – esimene valmis kuut pildistatakse', en: 'Pictures are from the 3D model – the first finished one will be photographed', ru: 'Изображения из 3D-модели – первую готовую будку сфотографируем', de: 'Bilder aus dem 3D-Modell – die erste fertige Hütte wird fotografiert', es: 'Imágenes del modelo 3D – fotografiaremos la primera terminada', sv: 'Bilderna är från 3D-modellen – den första färdiga fotograferas', fi: 'Kuvat ovat 3D-mallista – ensimmäinen valmis koppi kuvataan', lv: 'Attēli no 3D modeļa – pirmo gatavo būdu nofotografēsim' },
    ],
    options: [
      { id: 'base', price: 0, name: { et: 'Põhimudel', en: 'Base model', ru: 'Базовая модель', de: 'Grundmodell', es: 'Modelo base', sv: 'Grundmodell', fi: 'Perusmalli', lv: 'Pamatmodelis' } },
      { id: 'smart', price: 1200, name: { et: 'Nutipaketiga', en: 'With smart package', ru: 'Со смарт-пакетом', de: 'Mit Smart-Paket', es: 'Con paquete inteligente', sv: 'Med smartpaket', fi: 'Älypaketilla', lv: 'Ar viedo paketi' } },
      { id: 'smartcam', price: 1390, name: { et: 'Nutipakett + sisekaamera', en: 'Smart package + inside camera', ru: 'Смарт-пакет + камера внутри', de: 'Smart-Paket + Innenkamera', es: 'Paquete inteligente + cámara interior', sv: 'Smartpaket + innekamera', fi: 'Älypaketti + sisäkamera', lv: 'Viedā pakete + iekšējā kamera' } },
    ],
    photos: [
      { src: '/tooted/koerakuut/1.jpg', alt: { et: 'Oanduaia koerakuut eest vasakult: palkseinad ja roogkatus', en: 'Oanduaia dog house from the front left: log walls and thatched roof', ru: 'Будка Oanduaia спереди слева: бревенчатые стены и тростниковая крыша', de: 'Oanduaia-Hundehütte von vorn links: Blockwände und Reetdach', es: 'Caseta Oanduaia desde delante a la izquierda: troncos y tejado de junco', sv: 'Oanduaia hundkoja framifrån vänster: timmerväggar och vasstak', fi: 'Oanduaia-koirankoppi edestä vasemmalta: hirsiseinät ja ruokokatto', lv: 'Oanduaia suņu būda no priekšas pa kreisi: baļķu sienas un niedru jumts' } },
      { src: '/tooted/koerakuut/2.jpg', alt: { et: 'Koerakuut otse eest: uks küljel, kaamera räästa all', en: 'The dog house straight on: doorway to one side, camera under the eave', ru: 'Будка спереди: вход сбоку, камера под свесом крыши', de: 'Die Hütte von vorn: Eingang seitlich, Kamera unter der Traufe', es: 'La caseta de frente: entrada a un lado, cámara bajo el alero', sv: 'Kojan rakt framifrån: öppning åt sidan, kamera under takfoten', fi: 'Koppi suoraan edestä: oviaukko sivussa, kamera räystään alla', lv: 'Būda no priekšas: ieeja sānis, kamera zem jumta pārkares' } },
      { src: '/tooted/koerakuut/3.jpg', alt: { et: 'Tagaseina uksed lahti: puitvoodi ja pestav alus', en: 'The back doors open: slatted bed and washable pad', ru: 'Задние двери открыты: реечная лежанка и подстилка', de: 'Rücktüren offen: Lattenbett und waschbare Auflage', es: 'Puertas traseras abiertas: cama de listones y almohadilla lavable', sv: 'Bakdörrarna öppna: ribbsäng och tvättbar dyna', fi: 'Takaovet auki: rimasänky ja pestävä patja', lv: 'Aizmugurējās durvis vaļā: līstīšu gulta un mazgājams paklājs' } },
      { src: '/tooted/koerakuut/4.jpg', alt: { et: 'Lõige: eeskoda joogikausiga, vahesein ja magamisase', en: 'Cutaway: vestibule with water bowl, partition and den', ru: 'Разрез: тамбур с миской, перегородка и лежанка', de: 'Schnitt: Vorraum mit Napf, Trennwand und Liegeraum', es: 'Corte: vestíbulo con bebedero, tabique y guarida', sv: 'Genomskärning: vindfång med skål, mellanvägg och bo', fi: 'Leikkaus: tuulikaappi ja vesikuppi, väliseinä ja makuutila', lv: 'Griezums: priekštelpa ar bļodu, starpsiena un guļvieta' } },
      { src: '/tooted/koerakuut/5.jpg', alt: { et: 'Koerakuut küljelt, tehnikakast seinal', en: 'The dog house from the side, with the tech box on the wall', ru: 'Будка сбоку, техблок на стене', de: 'Die Hütte von der Seite, Technikkasten an der Wand', es: 'La caseta de lado, con la caja técnica en la pared', sv: 'Kojan från sidan, teknikbox på väggen', fi: 'Koppi sivulta, tekniikkakotelo seinällä', lv: 'Būda no sāniem, tehnikas kaste pie sienas' } },
    ],
  },
]

export const productBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug)

export const PT: Record<string, L> = {
  label: { et: 'Käsitöö', en: 'Handmade', ru: 'Ручная работа', de: 'Handarbeit', es: 'Hecho a mano', sv: 'Hantverk', fi: 'Käsityö', lv: 'Roku darbs' },
  title: { et: 'Oanduaia käsitöö', en: 'Made at Oanduaia', ru: 'Сделано в Oanduaia', de: 'Aus Oanduaia', es: 'Hecho en Oanduaia', sv: 'Gjort på Oanduaia', fi: 'Tehty Oanduaiassa', lv: 'Darināts Oanduaia' },
  lead: {
    et: 'Kõik tooted teeb käsitsi Oanduaia peremees. Iga ese on ainueksemplar.',
    en: 'Everything here is made by hand by the master of the house at Oanduaia. Every piece is one of a kind.',
    ru: 'Все изделия делает вручную хозяин Oanduaia. Каждое – в единственном экземпляре.',
    de: 'Alles hier fertigt der Hausherr von Oanduaia von Hand. Jedes Stück ist ein Unikat.',
    es: 'Todo lo hace a mano el dueño de casa de Oanduaia. Cada pieza es única.',
    sv: 'Allt här görs för hand av husbonden på Oanduaia. Varje föremål är unikt.',
    fi: 'Kaiken täällä tekee käsin Oanduaian isäntä. Jokainen on ainoa laatuaan.',
    lv: 'Visu šeit ar rokām darina Oanduaia saimnieks. Katrs priekšmets ir vienīgais.',
  },
  from: { et: 'alates', en: 'from', ru: 'от', de: 'ab', es: 'desde', sv: 'från', fi: 'alkaen', lv: 'no' },
  view: { et: 'Vaata lähemalt', en: 'Take a closer look', ru: 'Подробнее', de: 'Genauer ansehen', es: 'Ver de cerca', sv: 'Titta närmare', fi: 'Katso tarkemmin', lv: 'Apskatīt tuvāk' },
  back: { et: '← Kõik tooted', en: '← All products', ru: '← Все изделия', de: '← Alle Produkte', es: '← Todos los productos', sv: '← Alla produkter', fi: '← Kaikki tuotteet', lv: '← Visi izstrādājumi' },
  hide: { et: 'Nahk istmele', en: 'Hide on the seat', ru: 'Шкура на сиденье', de: 'Fell auf dem Sitz', es: 'Piel en el asiento', sv: 'Skinn på sitsen', fi: 'Talja istuimelle', lv: 'Āda uz sēdekļa' },
  total: { et: 'Kokku', en: 'Total', ru: 'Итого', de: 'Gesamt', es: 'Total', sv: 'Totalt', fi: 'Yhteensä', lv: 'Kopā' },
  order: { et: 'Telli või küsi', en: 'Order or ask', ru: 'Заказать или спросить', de: 'Bestellen oder fragen', es: 'Encargar o preguntar', sv: 'Beställ eller fråga', fi: 'Tilaa tai kysy', lv: 'Pasūtīt vai jautāt' },
  orderNote: {
    et: 'Tellimus on siduv alles pärast seda, kui oleme kõik koos läbi rääkinud. Raha ei võeta enne.',
    en: 'Nothing is binding until we have talked it through together. No payment is taken before that.',
    ru: 'Заказ становится обязательным только после того, как мы всё обсудим. До этого оплата не берётся.',
    de: 'Verbindlich wird die Bestellung erst, wenn wir alles gemeinsam besprochen haben. Vorher wird nichts bezahlt.',
    es: 'Nada es vinculante hasta que lo hayamos hablado juntos. No se cobra nada antes.',
    sv: 'Inget är bindande förrän vi har pratat igenom allt tillsammans. Ingen betalning tas innan dess.',
    fi: 'Mikään ei sido ennen kuin olemme käyneet kaiken yhdessä läpi. Maksua ei peritä sitä ennen.',
    lv: 'Nekas nav saistošs, kamēr neesam visu kopā pārrunājuši. Pirms tam maksa netiek ņemta.',
  },
  name: { et: 'Nimi', en: 'Name', ru: 'Имя', de: 'Name', es: 'Nombre', sv: 'Namn', fi: 'Nimi', lv: 'Vārds' },
  email: { et: 'E-post', en: 'E-mail', ru: 'E-mail', de: 'E-Mail', es: 'Correo electrónico', sv: 'E-post', fi: 'Sähköposti', lv: 'E-pasts' },
  phone: { et: 'Telefon (soovi korral)', en: 'Phone (optional)', ru: 'Телефон (по желанию)', de: 'Telefon (optional)', es: 'Teléfono (opcional)', sv: 'Telefon (valfritt)', fi: 'Puhelin (valinnainen)', lv: 'Tālrunis (pēc izvēles)' },
  message: { et: 'Sõnum', en: 'Message', ru: 'Сообщение', de: 'Nachricht', es: 'Mensaje', sv: 'Meddelande', fi: 'Viesti', lv: 'Ziņa' },
  send: { et: 'Saada', en: 'Send', ru: 'Отправить', de: 'Senden', es: 'Enviar', sv: 'Skicka', fi: 'Lähetä', lv: 'Sūtīt' },
  sent: {
    et: 'Aitäh! Kiri jõudis meieni, vastame 24 tunni jooksul aadressilt info@oanduaia.ee.',
    en: 'Thank you! Your message reached us – we will reply within 24 hours from info@oanduaia.ee.',
    ru: 'Спасибо! Сообщение получено – ответим в течение 24 часов с адреса info@oanduaia.ee.',
    de: 'Danke! Ihre Nachricht ist angekommen – wir antworten innerhalb von 24 Stunden von info@oanduaia.ee.',
    es: '¡Gracias! Hemos recibido su mensaje; responderemos en 24 horas desde info@oanduaia.ee.',
    sv: 'Tack! Ditt meddelande har kommit fram – vi svarar inom 24 timmar från info@oanduaia.ee.',
    fi: 'Kiitos! Viesti tuli perille – vastaamme 24 tunnin kuluessa osoitteesta info@oanduaia.ee.',
    lv: 'Paldies! Ziņa ir saņemta – atbildēsim 24 stundu laikā no info@oanduaia.ee.',
  },
  error: {
    et: 'Saatmine ebaõnnestus. Kirjuta palun otse info@oanduaia.ee.',
    en: 'Sending failed. Please write directly to info@oanduaia.ee.',
    ru: 'Не удалось отправить. Напишите, пожалуйста, на info@oanduaia.ee.',
    de: 'Senden fehlgeschlagen. Bitte schreiben Sie direkt an info@oanduaia.ee.',
    es: 'No se pudo enviar. Escriba directamente a info@oanduaia.ee.',
    sv: 'Det gick inte att skicka. Skriv direkt till info@oanduaia.ee.',
    fi: 'Lähetys epäonnistui. Kirjoita suoraan osoitteeseen info@oanduaia.ee.',
    lv: 'Neizdevās nosūtīt. Lūdzu, rakstiet uz info@oanduaia.ee.',
  },
  subject: { et: 'Tellimus', en: 'Order', ru: 'Заказ', de: 'Bestellung', es: 'Pedido', sv: 'Beställning', fi: 'Tilaus', lv: 'Pasūtījums' },
}

export const eur = (n: number) => `${n.toLocaleString('et-EE').replace(/ /g, ' ')} €`
