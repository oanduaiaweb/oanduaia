import type { Lang } from '@/lib/translations'

/**
 * Gift vouchers (Mikk, 1 Nov 2026). Bought on /[lang]/gift, paid through the same Stripe
 * payment records as booking links, delivered by e-mail once Stripe says paid, and redeemed by
 * quoting the code when booking. Valid twelve months from payment.
 */

export const GIFT_AMOUNTS = [100, 150, 200, 300]
export const GIFT_MIN = 50
export const GIFT_MAX = 2000
export const GIFT_MONTHS = 12

/** OA- and the first eight characters of the payment token: short enough to say on the phone. */
export const giftCode = (token: string) => `OA-${token.slice(0, 8).toUpperCase()}`

export function giftValidUntil(from: Date): string {
  const d = new Date(from)
  d.setUTCMonth(d.getUTCMonth() + GIFT_MONTHS)
  return d.toISOString().slice(0, 10)
}

type L = Record<Lang, string>

export const G: Record<string, L> = {
  name: { et: 'Kinkekaart', en: 'Gift voucher', ru: 'Подарочный сертификат', de: 'Gutschein', es: 'Tarjeta regalo', sv: 'Presentkort', fi: 'Lahjakortti', lv: 'Dāvanu karte' },
  label: { et: 'Kingitus', en: 'A gift', ru: 'Подарок', de: 'Geschenk', es: 'Un regalo', sv: 'En gåva', fi: 'Lahja', lv: 'Dāvana' },
  title: { et: 'Kingi öö metsas.', en: 'Give a night in the forest.', ru: 'Подарите ночь в лесу.', de: 'Verschenken Sie eine Nacht im Wald.', es: 'Regala una noche en el bosque.', sv: 'Ge bort en natt i skogen.', fi: 'Anna lahjaksi yö metsässä.', lv: 'Uzdāviniet nakti mežā.' },
  lead: {
    et: 'Oanduaia kinkekaart sobib kõigisse kolme majja – saunaõhtuks, hommikusöögiks või terveks nädalavahetuseks Lahemaal. Saaja valib ise kuupäevad. Kehtib 12 kuud.',
    en: 'An Oanduaia gift voucher works for any of our three houses – a sauna evening, breakfast or a whole weekend in Lahemaa. The recipient picks the dates. Valid for 12 months.',
    ru: 'Подарочный сертификат Oanduaia действует во всех трёх домах – вечер в сауне, завтрак или целые выходные в Лахемаа. Даты получатель выбирает сам. Действует 12 месяцев.',
    de: 'Ein Oanduaia-Gutschein gilt für alle drei Häuser – ein Saunaabend, Frühstück oder ein ganzes Wochenende in Lahemaa. Die Termine wählt der Beschenkte selbst. Gültig 12 Monate.',
    es: 'La tarjeta regalo de Oanduaia vale para cualquiera de nuestras tres casas: una tarde de sauna, un desayuno o un fin de semana entero en Lahemaa. Quien la recibe elige las fechas. Válida 12 meses.',
    sv: 'Ett presentkort från Oanduaia gäller i alla tre husen – en bastukväll, frukost eller en hel helg i Lahemaa. Mottagaren väljer själv datum. Gäller i 12 månader.',
    fi: 'Oanduaian lahjakortti käy kaikkiin kolmeen taloon – saunailtaan, aamiaiseen tai kokonaiseen viikonloppuun Lahemaalla. Saaja valitsee päivät itse. Voimassa 12 kuukautta.',
    lv: 'Oanduaia dāvanu karte derīga visās trijās mājās – pirts vakaram, brokastīm vai visai nedēļas nogalei Lahemā. Datumus izvēlas saņēmējs. Derīga 12 mēnešus.',
  },
  hint: {
    et: '100 € – üks öö Metsamajas kahele · 150 € – öö Tiigimajas · 200 € – öö Saunamajas',
    en: '100 € – one night in the Forest House for two · 150 € – a night in the Pond House · 200 € – a night in the Sauna House',
    ru: '100 € – ночь в Лесном доме на двоих · 150 € – ночь в Прудовом доме · 200 € – ночь в Банном доме',
    de: '100 € – eine Nacht im Waldhaus zu zweit · 150 € – eine Nacht im Teichhaus · 200 € – eine Nacht im Saunahaus',
    es: '100 € – una noche en la Casa del Bosque para dos · 150 € – una noche en la Casa del Estanque · 200 € – una noche en la Casa de la Sauna',
    sv: '100 € – en natt i Skogshuset för två · 150 € – en natt i Dammhuset · 200 € – en natt i Bastuhuset',
    fi: '100 € – yö Metsätalossa kahdelle · 150 € – yö Lampitalossa · 200 € – yö Saunatalossa',
    lv: '100 € – nakts Meža mājā diviem · 150 € – nakts Dīķa mājā · 200 € – nakts Pirts mājā',
  },
  amount: { et: 'Summa', en: 'Amount', ru: 'Сумма', de: 'Betrag', es: 'Importe', sv: 'Belopp', fi: 'Summa', lv: 'Summa' },
  other: { et: 'Muu summa', en: 'Other amount', ru: 'Другая сумма', de: 'Anderer Betrag', es: 'Otro importe', sv: 'Annat belopp', fi: 'Muu summa', lv: 'Cita summa' },
  buyer: { et: 'Sinu nimi', en: 'Your name', ru: 'Ваше имя', de: 'Ihr Name', es: 'Tu nombre', sv: 'Ditt namn', fi: 'Nimesi', lv: 'Jūsu vārds' },
  email: { et: 'Sinu e-post – kinkekaart saabub siia', en: 'Your e-mail – the voucher is sent here', ru: 'Ваша эл. почта – сертификат придёт сюда', de: 'Ihre E-Mail – der Gutschein kommt hierher', es: 'Tu correo – la tarjeta llega aquí', sv: 'Din e-post – presentkortet skickas hit', fi: 'Sähköpostisi – lahjakortti tulee tänne', lv: 'Jūsu e-pasts – karte tiks nosūtīta šeit' },
  recipient: { et: 'Kellele (soovi korral)', en: 'For whom (optional)', ru: 'Для кого (по желанию)', de: 'Für wen (optional)', es: 'Para quién (opcional)', sv: 'Till vem (valfritt)', fi: 'Kenelle (vapaaehtoinen)', lv: 'Kam (pēc vēlēšanās)' },
  message: { et: 'Tervitus kaardile (soovi korral)', en: 'A message on the card (optional)', ru: 'Пожелание на карточке (по желанию)', de: 'Ein Gruß auf der Karte (optional)', es: 'Un mensaje en la tarjeta (opcional)', sv: 'En hälsning på kortet (valfritt)', fi: 'Tervehdys korttiin (vapaaehtoinen)', lv: 'Apsveikums uz kartes (pēc vēlēšanās)' },
  pay: { et: 'Edasi maksma', en: 'Continue to payment', ru: 'Перейти к оплате', de: 'Weiter zur Zahlung', es: 'Ir al pago', sv: 'Vidare till betalning', fi: 'Jatka maksamaan', lv: 'Turpināt uz apmaksu' },
  paying: { et: 'Hetk…', en: 'One moment…', ru: 'Секунду…', de: 'Einen Moment…', es: 'Un momento…', sv: 'Ett ögonblick…', fi: 'Hetki…', lv: 'Mirkli…' },
  note: {
    et: 'Makse toimub Stripe’i turvalisel lehel – kaart, Apple Pay ja Google Pay. Kinkekaart saabub kohe pärast makset sinu e-postile: prindi välja või saada edasi.',
    en: 'Payment happens on Stripe’s secure page – card, Apple Pay and Google Pay. The voucher arrives in your inbox right after payment: print it or pass it on.',
    ru: 'Оплата на защищённой странице Stripe – карта, Apple Pay и Google Pay. Сертификат придёт на вашу почту сразу после оплаты: распечатайте или перешлите.',
    de: 'Bezahlt wird auf der sicheren Seite von Stripe – Karte, Apple Pay und Google Pay. Der Gutschein kommt direkt nach der Zahlung per E-Mail: ausdrucken oder weiterleiten.',
    es: 'El pago se hace en la página segura de Stripe: tarjeta, Apple Pay y Google Pay. La tarjeta regalo llega a tu correo justo después del pago: imprímela o reenvíala.',
    sv: 'Betalningen sker på Stripes säkra sida – kort, Apple Pay och Google Pay. Presentkortet kommer till din e-post direkt efter betalningen: skriv ut eller skicka vidare.',
    fi: 'Maksu tapahtuu Stripen turvallisella sivulla – kortti, Apple Pay ja Google Pay. Lahjakortti tulee sähköpostiisi heti maksun jälkeen: tulosta tai lähetä eteenpäin.',
    lv: 'Maksājums notiek Stripe drošajā lapā – karte, Apple Pay un Google Pay. Karte pienāks uz jūsu e-pastu uzreiz pēc apmaksas: izdrukājiet vai pārsūtiet.',
  },
  error: { et: 'Midagi läks valesti. Palun proovi uuesti või kirjuta info@oanduaia.ee.', en: 'Something went wrong. Please try again or write to info@oanduaia.ee.', ru: 'Что-то пошло не так. Попробуйте ещё раз или напишите на info@oanduaia.ee.', de: 'Etwas ist schiefgelaufen. Bitte erneut versuchen oder an info@oanduaia.ee schreiben.', es: 'Algo ha fallado. Inténtalo de nuevo o escribe a info@oanduaia.ee.', sv: 'Något gick fel. Försök igen eller skriv till info@oanduaia.ee.', fi: 'Jokin meni vikaan. Yritä uudelleen tai kirjoita info@oanduaia.ee.', lv: 'Kaut kas nogāja greizi. Mēģiniet vēlreiz vai rakstiet uz info@oanduaia.ee.' },
  cta: { et: 'Osta kinkekaart', en: 'Buy a gift voucher', ru: 'Купить сертификат', de: 'Gutschein kaufen', es: 'Comprar tarjeta regalo', sv: 'Köp presentkort', fi: 'Osta lahjakortti', lv: 'Pirkt dāvanu karti' },
  teaser: {
    et: 'Kinkekaart kõigisse kolme majja – saaja valib ise kuupäevad. Jõuab kohe e-postile, kehtib 12 kuud.',
    en: 'A voucher for any of the three houses – the recipient picks the dates. Delivered instantly by e-mail, valid for 12 months.',
    ru: 'Сертификат во все три дома – даты выбирает получатель. Приходит сразу на почту, действует 12 месяцев.',
    de: 'Ein Gutschein für alle drei Häuser – der Beschenkte wählt die Termine. Sofort per E-Mail, 12 Monate gültig.',
    es: 'Una tarjeta para cualquiera de las tres casas: quien la recibe elige las fechas. Llega al instante por correo y vale 12 meses.',
    sv: 'Ett presentkort till alla tre husen – mottagaren väljer datum. Kommer direkt via e-post, gäller i 12 månader.',
    fi: 'Lahjakortti kaikkiin kolmeen taloon – saaja valitsee päivät. Tulee heti sähköpostiin, voimassa 12 kuukautta.',
    lv: 'Dāvanu karte visām trim mājām – datumus izvēlas saņēmējs. Pienāk uzreiz e-pastā, derīga 12 mēnešus.',
  },
  // The voucher itself
  value: { et: 'Väärtus', en: 'Value', ru: 'Номинал', de: 'Wert', es: 'Valor', sv: 'Värde', fi: 'Arvo', lv: 'Vērtība' },
  for: { et: 'Kellele', en: 'For', ru: 'Для', de: 'Für', es: 'Para', sv: 'Till', fi: 'Kenelle', lv: 'Kam' },
  from: { et: 'Kellelt', en: 'From', ru: 'От', de: 'Von', es: 'De', sv: 'Från', fi: 'Keneltä', lv: 'No' },
  code: { et: 'Kood', en: 'Code', ru: 'Код', de: 'Code', es: 'Código', sv: 'Kod', fi: 'Koodi', lv: 'Kods' },
  valid: { et: 'Kehtib kuni', en: 'Valid until', ru: 'Действует до', de: 'Gültig bis', es: 'Válida hasta', sv: 'Gäller till', fi: 'Voimassa', lv: 'Derīga līdz' },
  howTo: {
    et: 'Broneerimiseks kirjuta info@oanduaia.ee või helista +372 520 2044 ja ütle kinkekaardi kood. Kehtib kõigis kolmes majas, vastavalt vabadele kuupäevadele.',
    en: 'To book, write to info@oanduaia.ee or call +372 520 2044 and quote the voucher code. Valid in all three houses, subject to availability.',
    ru: 'Для бронирования напишите на info@oanduaia.ee или позвоните +372 520 2044 и назовите код сертификата. Действует во всех трёх домах при наличии свободных дат.',
    de: 'Zum Buchen an info@oanduaia.ee schreiben oder +372 520 2044 anrufen und den Gutscheincode nennen. Gültig in allen drei Häusern, je nach Verfügbarkeit.',
    es: 'Para reservar, escribe a info@oanduaia.ee o llama al +372 520 2044 e indica el código. Válida en las tres casas, según disponibilidad.',
    sv: 'Boka genom att skriva till info@oanduaia.ee eller ringa +372 520 2044 och uppge koden. Gäller i alla tre husen, i mån av plats.',
    fi: 'Varaa kirjoittamalla info@oanduaia.ee tai soittamalla +372 520 2044 ja kertomalla koodi. Voimassa kaikissa kolmessa talossa vapaiden päivien mukaan.',
    lv: 'Lai rezervētu, rakstiet uz info@oanduaia.ee vai zvaniet +372 520 2044 un nosauciet kodu. Derīga visās trijās mājās atbilstoši brīvajiem datumiem.',
  },
  print: { et: 'Prindi kinkekaart', en: 'Print the voucher', ru: 'Распечатать сертификат', de: 'Gutschein drucken', es: 'Imprimir la tarjeta', sv: 'Skriv ut presentkortet', fi: 'Tulosta lahjakortti', lv: 'Izdrukāt karti' },
  pending: {
    et: 'Makse kinnitamine võtab mõne sekundi. Värskenda lehte – kinkekaart ilmub siia ja saabub ka e-postile.',
    en: 'Confirming the payment takes a few seconds. Refresh the page – the voucher appears here and arrives by e-mail too.',
    ru: 'Подтверждение оплаты занимает несколько секунд. Обновите страницу – сертификат появится здесь и придёт на почту.',
    de: 'Die Bestätigung dauert ein paar Sekunden. Seite neu laden – der Gutschein erscheint hier und kommt auch per E-Mail.',
    es: 'Confirmar el pago tarda unos segundos. Recarga la página: la tarjeta aparecerá aquí y también llegará por correo.',
    sv: 'Det tar några sekunder att bekräfta betalningen. Ladda om sidan – presentkortet visas här och kommer även via e-post.',
    fi: 'Maksun vahvistus kestää muutaman sekunnin. Päivitä sivu – lahjakortti näkyy täällä ja tulee myös sähköpostiin.',
    lv: 'Maksājuma apstiprināšana aizņem dažas sekundes. Atsvaidziniet lapu – karte parādīsies šeit un pienāks arī e-pastā.',
  },
  mailSubject: { et: 'Sinu Oanduaia kinkekaart', en: 'Your Oanduaia gift voucher', ru: 'Ваш подарочный сертификат Oanduaia', de: 'Ihr Oanduaia-Gutschein', es: 'Tu tarjeta regalo de Oanduaia', sv: 'Ditt presentkort från Oanduaia', fi: 'Oanduaian lahjakorttisi', lv: 'Jūsu Oanduaia dāvanu karte' },
  mailThanks: { et: 'Aitäh! Siin on sinu kinkekaart.', en: 'Thank you! Here is your gift voucher.', ru: 'Спасибо! Вот ваш подарочный сертификат.', de: 'Danke! Hier ist Ihr Gutschein.', es: '¡Gracias! Aquí tienes tu tarjeta regalo.', sv: 'Tack! Här är ditt presentkort.', fi: 'Kiitos! Tässä lahjakorttisi.', lv: 'Paldies! Šeit ir jūsu dāvanu karte.' },
  mailOpen: { et: 'Prinditav kinkekaart', en: 'Printable voucher', ru: 'Сертификат для печати', de: 'Gutschein zum Ausdrucken', es: 'Tarjeta para imprimir', sv: 'Presentkort att skriva ut', fi: 'Tulostettava lahjakortti', lv: 'Izdrukājama karte' },
  hello: { et: 'Tere', en: 'Hello', ru: 'Здравствуйте', de: 'Hallo', es: 'Hola', sv: 'Hej', fi: 'Hei', lv: 'Labdien' },
  regards: { et: 'Parimate soovidega', en: 'Best regards', ru: 'С наилучшими пожеланиями', de: 'Viele Grüße', es: 'Un saludo', sv: 'Vänliga hälsningar', fi: 'Ystävällisin terveisin', lv: 'Ar cieņu' },
}
