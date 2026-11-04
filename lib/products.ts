import type { Lang } from '@/lib/translations'

type L = Record<Lang, string>

/**
 * Things made by hand at Oanduaia and sold through the site. Not live yet (Mikk, 3 Nov 2026:
 * "we not gonna publish it now") — the pages are noindex and linked from nowhere until he says.
 *
 * Every claim here comes from Mikk: fully handmade, an animal hide on the seat as an option,
 * 1 490 € with sheepskin +190 € and a special fur +290 €. The wood species, the maker and the
 * lead time are NOT stated anywhere until he gives them.
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
        et: 'Tool valmib tellimuse peale. Kirjuta meile – räägime läbi puidu, naha ja valmimise aja. Tooli saab tulla ka Oanduaiasse proovima.',
        en: 'Each chair is made to order. Write to us and we will talk through the wood, the hide and when it can be ready. You are welcome to come and try one at Oanduaia.',
        ru: 'Кресло изготавливается на заказ. Напишите нам – обсудим дерево, шкуру и сроки. Кресло можно приехать и опробовать в Oanduaia.',
        de: 'Jeder Stuhl wird auf Bestellung gefertigt. Schreiben Sie uns – wir besprechen Holz, Fell und Fertigstellung. Gern können Sie ihn in Oanduaia ausprobieren.',
        es: 'Cada mecedora se hace por encargo. Escríbanos y hablaremos de la madera, la piel y el plazo. Puede venir a probarla a Oanduaia.',
        sv: 'Varje stol tillverkas på beställning. Skriv till oss så pratar vi om träet, skinnet och när den kan vara klar. Du är välkommen att prova den på Oanduaia.',
        fi: 'Jokainen tuoli tehdään tilauksesta. Kirjoita meille, niin sovitaan puusta, taljasta ja valmistumisajasta. Tuolia voi tulla kokeilemaan Oanduaiaan.',
        lv: 'Katrs krēsls tiek izgatavots pēc pasūtījuma. Rakstiet mums – pārrunāsim koku, ādu un izgatavošanas laiku. Krēslu var atbraukt izmēģināt uz Oanduaia.',
      },
    ],
    facts: [
      { et: 'Täielikult käsitöö', en: 'Entirely handmade', ru: 'Полностью ручная работа', de: 'Vollständig handgefertigt', es: 'Íntegramente a mano', sv: 'Helt handgjord', fi: 'Kokonaan käsityötä', lv: 'Pilnībā roku darbs' },
      { et: 'Täispuit, naturaalse servaga selg', en: 'Solid wood, live-edge back', ru: 'Массив, спинка с природным краем', de: 'Massivholz, Lehne mit Naturkante', es: 'Madera maciza, respaldo con borde natural', sv: 'Massivt trä, rygg med naturkant', fi: 'Täyspuuta, luonnonreunainen selkänoja', lv: 'Masīvkoks, atzveltne ar dabisko malu' },
      { et: 'Valmib tellimuse peale', en: 'Made to order', ru: 'Изготовление на заказ', de: 'Auf Bestellung gefertigt', es: 'Por encargo', sv: 'Tillverkas på beställning', fi: 'Tehdään tilauksesta', lv: 'Izgatavo pēc pasūtījuma' },
      { et: 'Kättesaamine Oanduaias tasuta, transport Eestis kokkuleppel', en: 'Free pick-up at Oanduaia, delivery in Estonia by arrangement', ru: 'Самовывоз из Oanduaia бесплатно, доставка по Эстонии по договорённости', de: 'Abholung in Oanduaia kostenlos, Lieferung in Estland nach Absprache', es: 'Recogida gratuita en Oanduaia, envío en Estonia a convenir', sv: 'Gratis upphämtning på Oanduaia, leverans i Estland enligt överenskommelse', fi: 'Nouto Oanduaiasta maksutta, toimitus Viroon sopimuksen mukaan', lv: 'Saņemšana Oanduaia bez maksas, piegāde Igaunijā pēc vienošanās' },
    ],
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
]

export const productBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug)

export const PT: Record<string, L> = {
  label: { et: 'Käsitöö', en: 'Handmade', ru: 'Ручная работа', de: 'Handarbeit', es: 'Hecho a mano', sv: 'Hantverk', fi: 'Käsityö', lv: 'Roku darbs' },
  title: { et: 'Oanduaia käsitöö', en: 'Made at Oanduaia', ru: 'Сделано в Oanduaia', de: 'Aus Oanduaia', es: 'Hecho en Oanduaia', sv: 'Gjort på Oanduaia', fi: 'Tehty Oanduaiassa', lv: 'Darināts Oanduaia' },
  lead: {
    et: 'Asjad, mis on tehtud täielikult käsitsi. Iga ese on ainueksemplar.',
    en: 'Things made entirely by hand. Every piece is one of a kind.',
    ru: 'Вещи, полностью сделанные вручную. Каждая – в единственном экземпляре.',
    de: 'Dinge, vollständig von Hand gemacht. Jedes Stück ist ein Unikat.',
    es: 'Objetos hechos íntegramente a mano. Cada pieza es única.',
    sv: 'Saker gjorda helt för hand. Varje föremål är unikt.',
    fi: 'Kokonaan käsin tehtyjä esineitä. Jokainen on ainoa laatuaan.',
    lv: 'Lietas, kas pilnībā darinātas ar rokām. Katrs priekšmets ir vienīgais.',
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
