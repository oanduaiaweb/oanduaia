import type { Lang } from './translations'

/*
 * Terms of booking and the privacy notice, one page. Everything here must match what the
 * site and the e-mails actually do: the 7-day free cancellation (lib/instantBooking.ts),
 * 2 days' notice online, arrival 14:00 / departure 12:00 (lib/bookingEmail.ts), the pet
 * fee (lib/pricing.ts), the 12-month voucher (lib/gift.ts), and the processors listed.
 * Change one there, change it here.
 *
 * Company facts from the Estonian business register, checked 25 Nov 2026: registry code
 * 12745194; not liable to VAT (VAT number ended 30.10.2020) — so "no VAT is added".
 */

export type TermsSection = { h: string; p: string[] }
export type Terms = { title: string; lead: string; updated: string; sections: TermsSection[] }

export const COMPANY = {
  name: 'Oanduaia Puhkemaja OÜ',
  code: '12745194',
  address: 'Oanduaia, Oandu küla, Haljala vald, 45432 Lääne-Viru maakond',
}

const id = (reg: string, country: string) =>
  `${COMPANY.name} · ${reg} ${COMPANY.code} · ${COMPANY.address}, ${country} · info@oanduaia.ee · +372 5202 044`

export const TERMS: Record<Lang, Terms> = {
  et: {
    title: 'Tingimused ja privaatsus',
    lead: 'Lühidalt: broneeri veebis ja maksa kaardiga või lepi meiega kokku sularahamakse. Tühistamine on tasuta kuni 7 päeva enne saabumist. Sinu andmeid kasutame ainult sinu puhkuse korraldamiseks.',
    updated: 'Viimati uuendatud 25. novembril 2026.',
    sections: [
      { h: 'Kes me oleme', p: [
        id('registrikood', 'Eesti'),
        'Me ei ole käibemaksukohustuslased, seega on lehel olevad hinnad lõplikud – käibemaksu juurde ei lisandu.',
      ] },
      { h: 'Broneerimine ja maksmine', p: [
        'Veebis: vali kalendris maja ja kuupäevad ning maksa kogu summa kaardiga. Broneering on kohe kinnitatud ja saadame kinnituse e-postiga. Kaardimakseid töötleb Stripe – sinu kaardiandmeid me ei näe.',
        'Kirja teel: kirjuta, helista või saada WhatsAppi sõnum. Kinnitame e-postiga ning saadame kas kaardimakse lingi või lepime kokku, et maksad sularahas kohale jõudes.',
        'Veebis saab broneerida kuni 2 päeva enne saabumist. Varasemaks saabumiseks helista või kirjuta WhatsAppis.',
        'Kehtib broneerimise hetkel kalendris näidatud hind.',
      ] },
      { h: 'Tühistamine', p: [
        'Tasuta tühistamine kuni 7 päeva enne saabumist – maksame kogu summa tagasi.',
        'Hilisema tühistamise või saabumata jätmise korral raha ei tagastata.',
        'Tühistamiseks kirjuta info@oanduaia.ee.',
        'Kui peame broneeringu ise tühistama, näiteks kuna maja ei saa kasutada, maksame kogu tasutud summa tagasi.',
        'Kindlateks kuupäevadeks broneeritud majutusele ei kohaldu internetiostude 14-päevane taganemisõigus (EL direktiiv 2011/83/EL, artikkel 16).',
      ] },
      { h: 'Puhkuse ajal', p: [
        'Saabumine alates kell 14.00, lahkumine kella 12.00-ks, kui pole kokku lepitud teisiti.',
        'Igas majas võib ööbida maja lehel märgitud arv külalisi.',
        'Lemmikloomad on kokkuleppel teretulnud; lemmikloomatasu on 20 € viibimise kohta.',
        'Saun ja kaminad on puuküttega – palun kasuta neid nii, nagu saabumisel näitame. Lapsed peavad tiigi ja sauna juures olema täiskasvanu järelevalve all. Ujumine, ka talisuplus, on omal vastutusel.',
        'Palun anna teada, kui midagi läheb katki. Külaliste põhjustatud kahju võidakse hüvitada lasta.',
      ] },
      { h: 'Kinkekaardid', p: [
        'Kinkekaart kehtib 12 kuud ostmisest kõigis kolmes majas, vabade kuupäevade olemasolul. Broneerimisel ütle kinkekaardi kood.',
      ] },
      { h: 'Sinu isikuandmed', p: [
        'Vastutav töötleja on Oanduaia Puhkemaja OÜ (andmed ülal).',
        'Kogume nime, e-posti, telefoni, kuupäevi, külaliste arvu, sinu kirju ja seda, kas oled maksnud.',
        'Kasutame neid, et sulle vastata, broneering täita ja pidada seadusega nõutud raamatupidamist. Õiguslik alus: broneeringu leping ja seadusest tulenevad kohustused (isikuandmete kaitse üldmääruse art 6 lg 1 p b ja c).',
        'Andmeid töötlevad meie eest ainult nendel eesmärkidel: Stripe (kaardimaksed), Vercel (veebileht ja broneeringute andmed), Resend (meie e-kirjade saatmine) ja Google (meie postkast ja anonüümne külastusstatistika). Booking.com saab ainult teada, millised kuupäevad on hõivatud – nimesid mitte.',
        'Broneeringute ja maksete andmeid hoiame 7 aastat, nagu nõuab raamatupidamise seadus; muid kirju nii kaua, kui on vaja neile vastamiseks.',
        'Endistele külalistele võime kord aastas saata pühadetervituse; vasta „unsubscribe“ ja me lõpetame.',
        'Sul on õigus oma andmeid näha, parandada või kustutada ning nende kasutamisele vastu vaielda – kirjuta info@oanduaia.ee. Kaebuse saad esitada ka Andmekaitse Inspektsioonile (aki.ee).',
      ] },
      { h: 'Küpsised', p: [
        'Kasutame Google Analyticsit, et lugeda külastusi ja näha, millised lehed külalisi aitavad. See salvestab sinu brauserisse küpsiseid. Andmeid me ei müü ega näita nende põhjal reklaami. Küpsised saad brauseri seadetes blokeerida – leht töötab samamoodi.',
      ] },
    ],
  },
  en: {
    title: 'Terms & privacy',
    lead: 'The short version: book online and pay by card, or agree with us to pay in cash. Cancellation is free up to 7 days before arrival. We use your details only to look after your stay.',
    updated: 'Last updated 25 November 2026.',
    sections: [
      { h: 'Who we are', p: [
        id('registry code', 'Estonia'),
        'We are not registered for VAT, so the prices on this site are final – no VAT is added.',
      ] },
      { h: 'Booking and payment', p: [
        'Online: choose the house and dates in the calendar and pay the full amount by card. The booking is confirmed straight away and we send a confirmation by e-mail. Card payments are handled by Stripe – we never see your card details.',
        'By message: write, call or WhatsApp us. We confirm by e-mail and either send a card payment link or agree that you pay in cash when you arrive.',
        'Online booking is possible up to 2 days before arrival. For a sooner arrival, call or WhatsApp us.',
        'The price is the one shown in the calendar when you book.',
      ] },
      { h: 'Cancellation', p: [
        'Free cancellation up to 7 days before arrival – you get the full amount back.',
        'If you cancel later or do not arrive, the amount is not refunded.',
        'To cancel, write to info@oanduaia.ee.',
        'If we have to cancel, for example because the house cannot be used, we refund everything you paid.',
        'The 14-day right of withdrawal for online purchases does not apply to accommodation booked for specific dates (EU Directive 2011/83/EU, Article 16).',
      ] },
      { h: 'During your stay', p: [
        'Arrival from 14:00, departure by 12:00, unless agreed otherwise.',
        'Each house sleeps the number of guests shown on its page.',
        'Pets are welcome by arrangement; the pet fee is 20 € per stay.',
        'The sauna and fireplaces are wood-fired – please use them as we show you on arrival. Children must be supervised by an adult near the pond and the sauna. Swimming, including winter swimming, is at your own risk.',
        'Please tell us if anything gets broken. Damage caused by guests may be charged.',
      ] },
      { h: 'Gift vouchers', p: [
        'A voucher is valid for 12 months from purchase in any of the three houses, subject to availability. Quote the voucher code when you book.',
      ] },
      { h: 'Your personal data', p: [
        'The data controller is Oanduaia Puhkemaja OÜ (details above).',
        'We collect your name, e-mail, phone, dates, number of guests, your messages and whether you have paid.',
        'We use them to answer you, carry out your booking and keep the accounts the law requires. Legal basis: the booking contract and our legal obligations (GDPR Article 6(1)(b) and (c)).',
        'They are processed on our behalf, only for these purposes, by: Stripe (card payments), Vercel (website and booking records), Resend (sending our e-mails) and Google (our mailbox and anonymous visitor statistics). Booking.com only learns which dates are taken – never names.',
        'Booking and payment records are kept for 7 years, as Estonian accounting law requires; other messages for as long as needed to answer them.',
        'Past guests may receive a seasonal greeting from us once a year; reply "unsubscribe" and we will stop.',
        'You have the right to see, correct or delete your data and to object to its use – write to info@oanduaia.ee. You can also complain to the Estonian Data Protection Inspectorate (aki.ee).',
      ] },
      { h: 'Cookies', p: [
        'We use Google Analytics to count visits and see which pages help guests. It stores cookies in your browser. We do not sell the data or show ads based on it. You can block cookies in your browser settings – the site works the same.',
      ] },
    ],
  },
  ru: {
    title: 'Условия и конфиденциальность',
    lead: 'Коротко: бронируйте онлайн и платите картой или договоритесь с нами об оплате наличными. Отмена бесплатна до 7 дней до заезда. Ваши данные мы используем только для организации вашего отдыха.',
    updated: 'Обновлено 25 ноября 2026 г.',
    sections: [
      { h: 'Кто мы', p: [
        id('регистрационный код', 'Эстония'),
        'Мы не являемся плательщиками НДС, поэтому цены на сайте окончательные – НДС не добавляется.',
      ] },
      { h: 'Бронирование и оплата', p: [
        'Онлайн: выберите дом и даты в календаре и оплатите полную сумму картой. Бронирование подтверждается сразу, мы присылаем подтверждение по электронной почте. Платежи картой обрабатывает Stripe – данных вашей карты мы не видим.',
        'Сообщением: напишите, позвоните или отправьте сообщение в WhatsApp. Мы подтвердим по электронной почте и либо пришлём ссылку на оплату картой, либо договоримся, что вы оплатите наличными по приезде.',
        'Онлайн можно забронировать не позднее чем за 2 дня до заезда. Для более раннего заезда позвоните или напишите в WhatsApp.',
        'Действует цена, указанная в календаре в момент бронирования.',
      ] },
      { h: 'Отмена', p: [
        'Бесплатная отмена до 7 дней до заезда – мы вернём всю сумму.',
        'При более поздней отмене или неприезде деньги не возвращаются.',
        'Чтобы отменить, напишите на info@oanduaia.ee.',
        'Если отменить бронирование придётся нам, например потому что дом нельзя использовать, мы вернём всё, что вы заплатили.',
        '14-дневное право отказа от покупок в интернете не распространяется на проживание, забронированное на конкретные даты (Директива ЕС 2011/83/ЕС, статья 16).',
      ] },
      { h: 'Во время отдыха', p: [
        'Заезд с 14:00, выезд до 12:00, если не договорились иначе.',
        'В каждом доме может разместиться указанное на его странице число гостей.',
        'Домашние животные – по договорённости; плата за животное 20 € за пребывание.',
        'Баня и камины топятся дровами – пожалуйста, пользуйтесь ими так, как мы покажем по приезде. Дети у пруда и бани должны быть под присмотром взрослых. Купание, в том числе зимнее, – на ваш риск.',
        'Пожалуйста, сообщите нам, если что-то сломалось. Ущерб, причинённый гостями, может быть возмещён за их счёт.',
      ] },
      { h: 'Подарочные сертификаты', p: [
        'Сертификат действует 12 месяцев с момента покупки во всех трёх домах при наличии свободных дат. При бронировании назовите код сертификата.',
      ] },
      { h: 'Ваши персональные данные', p: [
        'Ответственный обработчик – Oanduaia Puhkemaja OÜ (данные выше).',
        'Мы собираем имя, электронную почту, телефон, даты, число гостей, ваши сообщения и сведения об оплате.',
        'Мы используем их, чтобы ответить вам, выполнить бронирование и вести бухгалтерию, которой требует закон. Правовое основание: договор бронирования и наши обязательства по закону (GDPR, ст. 6(1)(b) и (c)).',
        'По нашему поручению и только для этих целей их обрабатывают: Stripe (платежи картой), Vercel (сайт и данные бронирований), Resend (отправка наших писем) и Google (наш почтовый ящик и анонимная статистика посещений). Booking.com узнаёт только, какие даты заняты, – без имён.',
        'Данные о бронированиях и платежах хранятся 7 лет, как требует эстонский закон о бухгалтерском учёте; прочие сообщения – столько, сколько нужно, чтобы на них ответить.',
        'Бывшим гостям мы можем раз в год отправить праздничное поздравление; ответьте «unsubscribe», и мы перестанем.',
        'Вы вправе ознакомиться со своими данными, исправить или удалить их и возразить против их использования – напишите на info@oanduaia.ee. Также можно подать жалобу в Инспекцию по защите данных Эстонии (aki.ee).',
      ] },
      { h: 'Файлы cookie', p: [
        'Мы используем Google Analytics, чтобы считать посещения и видеть, какие страницы помогают гостям. Он сохраняет в вашем браузере файлы cookie. Мы не продаём данные и не показываем рекламу на их основе. Вы можете заблокировать cookie в настройках браузера – сайт будет работать так же.',
      ] },
    ],
  },
  de: {
    title: 'Bedingungen & Datenschutz',
    lead: 'Kurz gesagt: Online buchen und mit Karte bezahlen oder mit uns Barzahlung vereinbaren. Stornierung bis 7 Tage vor Anreise kostenlos. Ihre Daten verwenden wir nur, um Ihren Aufenthalt zu organisieren.',
    updated: 'Zuletzt aktualisiert am 25. November 2026.',
    sections: [
      { h: 'Wer wir sind', p: [
        id('Registernummer', 'Estland'),
        'Wir sind nicht umsatzsteuerpflichtig, die Preise auf dieser Website sind daher Endpreise – es kommt keine Mehrwertsteuer hinzu.',
      ] },
      { h: 'Buchung und Zahlung', p: [
        'Online: Wählen Sie Haus und Termine im Kalender und zahlen Sie den vollen Betrag mit Karte. Die Buchung ist sofort bestätigt, und wir senden Ihnen eine Bestätigung per E-Mail. Kartenzahlungen wickelt Stripe ab – Ihre Kartendaten sehen wir nie.',
        'Per Nachricht: Schreiben, rufen Sie an oder schicken Sie eine WhatsApp. Wir bestätigen per E-Mail und senden entweder einen Kartenzahlungslink oder vereinbaren, dass Sie bei der Anreise bar bezahlen.',
        'Online buchen können Sie bis 2 Tage vor der Anreise. Für eine frühere Anreise rufen Sie uns an oder schreiben Sie per WhatsApp.',
        'Es gilt der Preis, der bei der Buchung im Kalender angezeigt wird.',
      ] },
      { h: 'Stornierung', p: [
        'Kostenlose Stornierung bis 7 Tage vor der Anreise – Sie erhalten den vollen Betrag zurück.',
        'Bei späterer Stornierung oder Nichtanreise wird der Betrag nicht erstattet.',
        'Zum Stornieren schreiben Sie an info@oanduaia.ee.',
        'Müssen wir selbst stornieren, etwa weil das Haus nicht nutzbar ist, erstatten wir alles, was Sie bezahlt haben.',
        'Das 14-tägige Widerrufsrecht für Online-Käufe gilt nicht für Unterkünfte, die für bestimmte Termine gebucht werden (EU-Richtlinie 2011/83/EU, Artikel 16).',
      ] },
      { h: 'Während Ihres Aufenthalts', p: [
        'Anreise ab 14:00 Uhr, Abreise bis 12:00 Uhr, sofern nicht anders vereinbart.',
        'Jedes Haus bietet Platz für die auf seiner Seite angegebene Zahl von Gästen.',
        'Haustiere sind nach Absprache willkommen; die Gebühr beträgt 20 € pro Aufenthalt.',
        'Sauna und Kamine werden mit Holz beheizt – bitte nutzen Sie sie so, wie wir es Ihnen bei der Ankunft zeigen. Kinder müssen am Teich und an der Sauna von einem Erwachsenen beaufsichtigt werden. Schwimmen, auch Eisbaden, auf eigene Gefahr.',
        'Bitte sagen Sie uns Bescheid, wenn etwas kaputtgeht. Von Gästen verursachte Schäden können in Rechnung gestellt werden.',
      ] },
      { h: 'Geschenkgutscheine', p: [
        'Ein Gutschein gilt 12 Monate ab Kauf in allen drei Häusern, je nach Verfügbarkeit. Nennen Sie bei der Buchung den Gutscheincode.',
      ] },
      { h: 'Ihre personenbezogenen Daten', p: [
        'Verantwortlich ist die Oanduaia Puhkemaja OÜ (Angaben oben).',
        'Wir erheben Name, E-Mail, Telefon, Termine, Gästezahl, Ihre Nachrichten und ob Sie bezahlt haben.',
        'Wir verwenden sie, um Ihnen zu antworten, Ihre Buchung auszuführen und die gesetzlich vorgeschriebene Buchhaltung zu führen. Rechtsgrundlage: der Buchungsvertrag und unsere gesetzlichen Pflichten (Art. 6 Abs. 1 lit. b und c DSGVO).',
        'In unserem Auftrag und nur zu diesen Zwecken verarbeiten sie: Stripe (Kartenzahlungen), Vercel (Website und Buchungsdaten), Resend (Versand unserer E-Mails) und Google (unser Postfach und anonyme Besucherstatistik). Booking.com erfährt nur, welche Termine belegt sind – keine Namen.',
        'Buchungs- und Zahlungsdaten bewahren wir 7 Jahre auf, wie es das estnische Buchhaltungsgesetz verlangt; andere Nachrichten so lange, wie es für die Antwort nötig ist.',
        'Ehemalige Gäste erhalten von uns eventuell einmal im Jahr einen Festtagsgruß; antworten Sie mit „unsubscribe“, und wir hören auf.',
        'Sie haben das Recht, Ihre Daten einzusehen, berichtigen oder löschen zu lassen und ihrer Verwendung zu widersprechen – schreiben Sie an info@oanduaia.ee. Sie können sich auch bei der estnischen Datenschutzaufsicht beschweren (aki.ee).',
      ] },
      { h: 'Cookies', p: [
        'Wir nutzen Google Analytics, um Besuche zu zählen und zu sehen, welche Seiten Gästen helfen. Dabei werden Cookies in Ihrem Browser gespeichert. Wir verkaufen die Daten nicht und zeigen keine Werbung auf ihrer Grundlage. Sie können Cookies in Ihren Browsereinstellungen blockieren – die Website funktioniert genauso.',
      ] },
    ],
  },
  es: {
    title: 'Condiciones y privacidad',
    lead: 'En resumen: reserva en línea y paga con tarjeta, o acuerda con nosotros pagar en efectivo. La cancelación es gratuita hasta 7 días antes de la llegada. Usamos tus datos solo para organizar tu estancia.',
    updated: 'Última actualización: 25 de noviembre de 2026.',
    sections: [
      { h: 'Quiénes somos', p: [
        id('código de registro', 'Estonia'),
        'No estamos registrados a efectos del IVA, así que los precios de esta web son finales: no se añade IVA.',
      ] },
      { h: 'Reserva y pago', p: [
        'En línea: elige la casa y las fechas en el calendario y paga el importe total con tarjeta. La reserva queda confirmada al momento y te enviamos la confirmación por correo electrónico. Los pagos con tarjeta los gestiona Stripe: nunca vemos los datos de tu tarjeta.',
        'Por mensaje: escríbenos, llámanos o envíanos un WhatsApp. Confirmamos por correo y te enviamos un enlace de pago con tarjeta o acordamos que pagues en efectivo al llegar.',
        'En línea se puede reservar hasta 2 días antes de la llegada. Para llegar antes, llámanos o escríbenos por WhatsApp.',
        'Se aplica el precio que muestra el calendario en el momento de la reserva.',
      ] },
      { h: 'Cancelación', p: [
        'Cancelación gratuita hasta 7 días antes de la llegada: te devolvemos el importe completo.',
        'Si cancelas más tarde o no llegas, el importe no se reembolsa.',
        'Para cancelar, escribe a info@oanduaia.ee.',
        'Si tenemos que cancelar nosotros, por ejemplo porque la casa no se puede usar, te devolvemos todo lo que hayas pagado.',
        'El derecho de desistimiento de 14 días para compras en línea no se aplica al alojamiento reservado para fechas concretas (Directiva UE 2011/83/UE, artículo 16).',
      ] },
      { h: 'Durante la estancia', p: [
        'Llegada a partir de las 14:00 y salida antes de las 12:00, salvo otro acuerdo.',
        'Cada casa admite el número de huéspedes indicado en su página.',
        'Las mascotas son bienvenidas previo acuerdo; la tarifa es de 20 € por estancia.',
        'La sauna y las chimeneas son de leña: úsalas como te mostremos al llegar. Los niños deben estar vigilados por un adulto junto al estanque y la sauna. El baño, también el baño de invierno, es bajo tu responsabilidad.',
        'Avísanos si algo se rompe. Los daños causados por los huéspedes pueden cobrarse.',
      ] },
      { h: 'Tarjetas regalo', p: [
        'La tarjeta regalo es válida 12 meses desde la compra en cualquiera de las tres casas, según disponibilidad. Indica el código al reservar.',
      ] },
      { h: 'Tus datos personales', p: [
        'El responsable del tratamiento es Oanduaia Puhkemaja OÜ (datos arriba).',
        'Recogemos tu nombre, correo, teléfono, fechas, número de huéspedes, tus mensajes y si has pagado.',
        'Los usamos para responderte, gestionar tu reserva y llevar la contabilidad que exige la ley. Base jurídica: el contrato de reserva y nuestras obligaciones legales (RGPD, art. 6.1.b y c).',
        'Los tratan por encargo nuestro, solo para estos fines: Stripe (pagos con tarjeta), Vercel (web y datos de reservas), Resend (envío de nuestros correos) y Google (nuestro buzón y estadísticas anónimas de visitas). Booking.com solo sabe qué fechas están ocupadas, nunca nombres.',
        'Los datos de reservas y pagos se conservan 7 años, como exige la ley estonia de contabilidad; otros mensajes, el tiempo necesario para responderlos.',
        'Los antiguos huéspedes pueden recibir una felicitación una vez al año; responde «unsubscribe» y dejaremos de enviarla.',
        'Tienes derecho a ver, corregir o suprimir tus datos y a oponerte a su uso: escribe a info@oanduaia.ee. También puedes reclamar ante la Inspección de Protección de Datos de Estonia (aki.ee).',
      ] },
      { h: 'Cookies', p: [
        'Usamos Google Analytics para contar las visitas y ver qué páginas ayudan a los huéspedes. Guarda cookies en tu navegador. No vendemos los datos ni mostramos publicidad basada en ellos. Puedes bloquear las cookies en la configuración del navegador y la web funciona igual.',
      ] },
    ],
  },
  sv: {
    title: 'Villkor och integritet',
    lead: 'Kort sagt: boka på nätet och betala med kort, eller kom överens med oss om kontant betalning. Avbokning är gratis fram till 7 dagar före ankomst. Vi använder dina uppgifter bara för att ordna din vistelse.',
    updated: 'Senast uppdaterad 25 november 2026.',
    sections: [
      { h: 'Vilka vi är', p: [
        id('registreringsnummer', 'Estland'),
        'Vi är inte momsregistrerade, så priserna på webbplatsen är slutpriser – ingen moms tillkommer.',
      ] },
      { h: 'Bokning och betalning', p: [
        'På nätet: välj hus och datum i kalendern och betala hela beloppet med kort. Bokningen bekräftas direkt och vi skickar en bekräftelse per e-post. Kortbetalningar hanteras av Stripe – vi ser aldrig dina kortuppgifter.',
        'Via meddelande: skriv, ring eller skicka ett WhatsApp. Vi bekräftar per e-post och skickar antingen en betalningslänk för kort eller kommer överens om att du betalar kontant när du kommer.',
        'På nätet kan du boka fram till 2 dagar före ankomst. För tidigare ankomst, ring eller skriv på WhatsApp.',
        'Priset är det som visas i kalendern när du bokar.',
      ] },
      { h: 'Avbokning', p: [
        'Gratis avbokning fram till 7 dagar före ankomst – du får tillbaka hela beloppet.',
        'Om du avbokar senare eller inte kommer återbetalas beloppet inte.',
        'Avboka genom att skriva till info@oanduaia.ee.',
        'Om vi själva måste avboka, till exempel för att huset inte kan användas, betalar vi tillbaka allt du har betalat.',
        'Den 14-dagars ångerrätten för köp på nätet gäller inte boende som bokats för bestämda datum (EU-direktiv 2011/83/EU, artikel 16).',
      ] },
      { h: 'Under vistelsen', p: [
        'Ankomst från 14.00, avresa senast 12.00, om inget annat avtalats.',
        'Varje hus rymmer det antal gäster som anges på dess sida.',
        'Husdjur är välkomna efter överenskommelse; avgiften är 20 € per vistelse.',
        'Bastun och eldstäderna eldas med ved – använd dem så som vi visar vid ankomsten. Barn ska vara under uppsikt av en vuxen vid dammen och bastun. Bad, även vinterbad, sker på egen risk.',
        'Säg till om något går sönder. Skador som gäster orsakar kan debiteras.',
      ] },
      { h: 'Presentkort', p: [
        'Ett presentkort gäller i 12 månader från köpet i alla tre husen, i mån av plats. Uppge presentkortets kod när du bokar.',
      ] },
      { h: 'Dina personuppgifter', p: [
        'Personuppgiftsansvarig är Oanduaia Puhkemaja OÜ (uppgifter ovan).',
        'Vi samlar in namn, e-post, telefon, datum, antal gäster, dina meddelanden och om du har betalat.',
        'Vi använder dem för att svara dig, genomföra din bokning och föra den bokföring lagen kräver. Rättslig grund: bokningsavtalet och våra rättsliga skyldigheter (GDPR artikel 6.1 b och c).',
        'De behandlas för vår räkning, endast för dessa ändamål, av: Stripe (kortbetalningar), Vercel (webbplats och bokningsuppgifter), Resend (utskick av våra e-postmeddelanden) och Google (vår brevlåda och anonym besöksstatistik). Booking.com får bara veta vilka datum som är upptagna – aldrig namn.',
        'Boknings- och betalningsuppgifter sparas i 7 år, som den estniska bokföringslagen kräver; andra meddelanden så länge som behövs för att besvara dem.',
        'Tidigare gäster kan få en hälsning från oss en gång om året; svara ”unsubscribe” så slutar vi.',
        'Du har rätt att se, rätta eller radera dina uppgifter och att invända mot hur de används – skriv till info@oanduaia.ee. Du kan också klaga hos den estniska dataskyddsmyndigheten (aki.ee).',
      ] },
      { h: 'Cookies', p: [
        'Vi använder Google Analytics för att räkna besök och se vilka sidor som hjälper gästerna. Det sparar cookies i din webbläsare. Vi säljer inte uppgifterna och visar ingen reklam baserad på dem. Du kan blockera cookies i webbläsarens inställningar – webbplatsen fungerar likadant.',
      ] },
    ],
  },
  fi: {
    title: 'Ehdot ja tietosuoja',
    lead: 'Lyhyesti: varaa verkossa ja maksa kortilla tai sovi kanssamme käteismaksusta. Peruutus on maksuton 7 päivään ennen saapumista asti. Käytämme tietojasi vain lomasi järjestämiseen.',
    updated: 'Päivitetty 25.11.2026.',
    sections: [
      { h: 'Keitä olemme', p: [
        id('rekisterikoodi', 'Viro'),
        'Emme ole arvonlisäverovelvollisia, joten sivuston hinnat ovat lopullisia – arvonlisäveroa ei lisätä.',
      ] },
      { h: 'Varaus ja maksu', p: [
        'Verkossa: valitse kalenterista talo ja päivät ja maksa koko summa kortilla. Varaus vahvistuu heti, ja lähetämme vahvistuksen sähköpostilla. Korttimaksut käsittelee Stripe – emme koskaan näe korttitietojasi.',
        'Viestillä: kirjoita, soita tai lähetä WhatsApp-viesti. Vahvistamme sähköpostilla ja lähetämme joko korttimaksulinkin tai sovimme, että maksat käteisellä saapuessasi.',
        'Verkossa voi varata viimeistään 2 päivää ennen saapumista. Aiempaa saapumista varten soita tai kirjoita WhatsAppissa.',
        'Hinta on se, joka kalenterissa näkyy varaushetkellä.',
      ] },
      { h: 'Peruutus', p: [
        'Maksuton peruutus 7 päivään ennen saapumista asti – palautamme koko summan.',
        'Jos perut myöhemmin tai et saavu, summaa ei palauteta.',
        'Peruuta kirjoittamalla osoitteeseen info@oanduaia.ee.',
        'Jos joudumme itse perumaan, esimerkiksi koska taloa ei voi käyttää, palautamme kaiken maksamasi.',
        'Verkko-ostosten 14 päivän peruutusoikeus ei koske tietyille päiville varattua majoitusta (EU-direktiivi 2011/83/EU, 16 artikla).',
      ] },
      { h: 'Lomasi aikana', p: [
        'Saapuminen klo 14.00 alkaen, lähtö klo 12.00 mennessä, ellei toisin sovita.',
        'Kuhunkin taloon mahtuu sen sivulla mainittu määrä vieraita.',
        'Lemmikit ovat tervetulleita sopimuksen mukaan; lemmikkimaksu on 20 € oleskelulta.',
        'Sauna ja takat lämmitetään puilla – käytä niitä niin kuin saapuessasi näytämme. Lasten on oltava aikuisen valvonnassa lammen ja saunan luona. Uiminen, myös avantouinti, omalla vastuulla.',
        'Kerro meille, jos jokin menee rikki. Vieraiden aiheuttamista vahingoista voidaan laskuttaa.',
      ] },
      { h: 'Lahjakortit', p: [
        'Lahjakortti on voimassa 12 kuukautta ostosta kaikissa kolmessa talossa vapaiden päivien mukaan. Kerro lahjakortin koodi varatessasi.',
      ] },
      { h: 'Henkilötietosi', p: [
        'Rekisterinpitäjä on Oanduaia Puhkemaja OÜ (tiedot yllä).',
        'Keräämme nimen, sähköpostin, puhelinnumeron, päivät, vieraiden määrän, viestisi ja tiedon siitä, oletko maksanut.',
        'Käytämme niitä vastataksemme sinulle, hoitaaksemme varauksesi ja pitääksemme lain edellyttämää kirjanpitoa. Oikeusperuste: varaussopimus ja lakisääteiset velvoitteemme (tietosuoja-asetuksen 6 artiklan 1 kohdan b ja c alakohta).',
        'Niitä käsittelevät puolestamme ja vain näihin tarkoituksiin: Stripe (korttimaksut), Vercel (sivusto ja varaustiedot), Resend (sähköpostiemme lähetys) ja Google (postilaatikkomme ja anonyymi kävijätilasto). Booking.com saa tietää vain, mitkä päivät ovat varattuja – ei koskaan nimiä.',
        'Varaus- ja maksutiedot säilytetään 7 vuotta Viron kirjanpitolain mukaisesti; muut viestit niin kauan kuin niihin vastaaminen vaatii.',
        'Entiset vieraat voivat saada meiltä tervehdyksen kerran vuodessa; vastaa ”unsubscribe”, niin lopetamme.',
        'Sinulla on oikeus nähdä, korjata tai poistaa tietosi ja vastustaa niiden käyttöä – kirjoita osoitteeseen info@oanduaia.ee. Voit myös tehdä valituksen Viron tietosuojavirastolle (aki.ee).',
      ] },
      { h: 'Evästeet', p: [
        'Käytämme Google Analyticsia laskeaksemme käynnit ja nähdäksemme, mitkä sivut auttavat vieraita. Se tallentaa evästeitä selaimeesi. Emme myy tietoja emmekä näytä niiden perusteella mainoksia. Voit estää evästeet selaimen asetuksista – sivusto toimii samoin.',
      ] },
    ],
  },
  lv: {
    title: 'Noteikumi un privātums',
    lead: 'Īsumā: rezervējiet tiešsaistē un maksājiet ar karti vai vienojieties ar mums par samaksu skaidrā naudā. Atcelšana ir bezmaksas līdz 7 dienām pirms ierašanās. Jūsu datus izmantojam tikai jūsu uzturēšanās organizēšanai.',
    updated: 'Atjaunināts 2026. gada 25. novembrī.',
    sections: [
      { h: 'Kas mēs esam', p: [
        id('reģistrācijas kods', 'Igaunija'),
        'Mēs neesam PVN maksātāji, tāpēc cenas vietnē ir galīgās – PVN netiek pieskaitīts.',
      ] },
      { h: 'Rezervēšana un samaksa', p: [
        'Tiešsaistē: kalendārā izvēlieties māju un datumus un samaksājiet visu summu ar karti. Rezervācija tiek apstiprināta uzreiz, un mēs nosūtām apstiprinājumu e-pastā. Kartes maksājumus apstrādā Stripe – jūsu kartes datus mēs neredzam.',
        'Ar ziņu: rakstiet, zvaniet vai sūtiet WhatsApp ziņu. Mēs apstiprinām e-pastā un vai nu nosūtām kartes maksājuma saiti, vai vienojamies, ka samaksāsiet skaidrā naudā, ierodoties.',
        'Tiešsaistē var rezervēt ne vēlāk kā 2 dienas pirms ierašanās. Ātrākai ierašanās zvaniet vai rakstiet WhatsApp.',
        'Spēkā ir cena, kas kalendārā redzama rezervēšanas brīdī.',
      ] },
      { h: 'Atcelšana', p: [
        'Bezmaksas atcelšana līdz 7 dienām pirms ierašanās – atmaksājam visu summu.',
        'Ja atceļat vēlāk vai neierodaties, summa netiek atmaksāta.',
        'Lai atceltu, rakstiet uz info@oanduaia.ee.',
        'Ja rezervācija jāatceļ mums, piemēram, jo māju nevar izmantot, atmaksājam visu, ko esat samaksājis.',
        '14 dienu atteikuma tiesības tiešsaistes pirkumiem neattiecas uz izmitināšanu, kas rezervēta konkrētiem datumiem (ES Direktīva 2011/83/ES, 16. pants).',
      ] },
      { h: 'Uzturēšanās laikā', p: [
        'Ierašanās no plkst. 14.00, izbraukšana līdz plkst. 12.00, ja nav norunāts citādi.',
        'Katrā mājā var uzturēties tās lapā norādītais viesu skaits.',
        'Mājdzīvnieki ir laipni gaidīti pēc vienošanās; maksa par mājdzīvnieku ir 20 € par uzturēšanos.',
        'Pirts un kamīni tiek kurināti ar malku – lūdzu, lietojiet tos tā, kā parādīsim ierodoties. Bērniem pie dīķa un pirts jābūt pieaugušā uzraudzībā. Peldēšanās, arī ziemas peldes, uz jūsu atbildību.',
        'Lūdzu, pasakiet mums, ja kaut kas saplīst. Viesu nodarītie zaudējumi var tikt piedzīti.',
      ] },
      { h: 'Dāvanu kartes', p: [
        'Dāvanu karte ir derīga 12 mēnešus no iegādes visās trijās mājās, ja ir brīvi datumi. Rezervējot nosauciet dāvanu kartes kodu.',
      ] },
      { h: 'Jūsu personas dati', p: [
        'Pārzinis ir Oanduaia Puhkemaja OÜ (dati augstāk).',
        'Mēs vācam vārdu, e-pastu, tālruni, datumus, viesu skaitu, jūsu ziņas un to, vai esat samaksājis.',
        'Mēs tos izmantojam, lai jums atbildētu, izpildītu rezervāciju un kārtotu likumā prasīto grāmatvedību. Juridiskais pamats: rezervācijas līgums un mūsu juridiskie pienākumi (VDAR 6. panta 1. punkta b un c apakšpunkts).',
        'Mūsu uzdevumā un tikai šiem nolūkiem tos apstrādā: Stripe (kartes maksājumi), Vercel (vietne un rezervāciju dati), Resend (mūsu e-pastu sūtīšana) un Google (mūsu pastkaste un anonīma apmeklējumu statistika). Booking.com uzzina tikai to, kuri datumi ir aizņemti, – nekad ne vārdus.',
        'Rezervāciju un maksājumu datus glabājam 7 gadus, kā prasa Igaunijas grāmatvedības likums; citas ziņas – tik ilgi, cik vajadzīgs, lai uz tām atbildētu.',
        'Bijušie viesi reizi gadā var saņemt mūsu svētku apsveikumu; atbildiet „unsubscribe“, un mēs pārtrauksim.',
        'Jums ir tiesības redzēt, labot vai dzēst savus datus un iebilst pret to izmantošanu – rakstiet uz info@oanduaia.ee. Varat arī iesniegt sūdzību Igaunijas Datu aizsardzības inspekcijā (aki.ee).',
      ] },
      { h: 'Sīkdatnes', p: [
        'Mēs izmantojam Google Analytics, lai skaitītu apmeklējumus un redzētu, kuras lapas palīdz viesiem. Tas saglabā sīkdatnes jūsu pārlūkā. Mēs datus nepārdodam un nerādām uz tiem balstītas reklāmas. Sīkdatnes varat bloķēt pārlūka iestatījumos – vietne darbosies tāpat.',
      ] },
    ],
  },
}

export const TERMS_LINK: Record<Lang, string> = {
  et: 'Tingimused ja privaatsus', en: 'Terms & privacy', ru: 'Условия и конфиденциальность', de: 'Bedingungen & Datenschutz',
  es: 'Condiciones y privacidad', sv: 'Villkor och integritet', fi: 'Ehdot ja tietosuoja', lv: 'Noteikumi un privātums',
}
