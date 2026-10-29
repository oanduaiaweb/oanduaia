import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { BookingDraftProvider } from '@/contexts/BookingDraftContext'
import StickyBook from '@/components/StickyBook'
import ScrollMemory from '@/components/ScrollMemory'
import { LOCALES, META, SITE, alternates, isLocale, jsonLd, siteJsonLd } from '@/lib/i18n'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  // 500 exists for the small UI text that used to be Jost — a 300-weight Garamond at 11px
  // is a hairline, and the browser would otherwise synthesise the bolder weight.
  // 600 was declared here and used NOWHERE: grepping font-weight across globals.css and
  // every component returns only 300 (158), 400 (40) and 500 (8). It was being fetched,
  // and preloaded, for nothing.
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
  /*
   * NOT preloaded. Jost is used in exactly one place — `.avail-panel` redefines
   * --font-sans so the availability calendar keeps a sans (Mikk, 31 Aug). That panel is
   * far below the fold, yet next/font was emitting <link rel="preload"> for all three
   * weights, so every visitor spent first-paint bandwidth on a font they may never
   * scroll to, competing with the hero image that IS the LCP.
   * display:'swap' already covers the late arrival.
   */
  preload: false,
})

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const m = META[lang]

  return {
    metadataBase: new URL(SITE),
    title: m.title,
    description: m.description,
    alternates: alternates(lang),
    openGraph: {
      type: 'website',
      siteName: 'Oanduaia',
      title: m.title,
      description: m.description,
      url: `${SITE}/${lang}`,
      locale: m.ogLocale,
      alternateLocale: LOCALES.filter(l => l !== lang).map(l => META[l].ogLocale),
      images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Oanduaia' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/images/og.jpg'],
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={lang} className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        {/*
          * lazyOnload, not afterInteractive. afterInteractive makes Next emit a
          * <link rel="preload" as="script"> for gtag.js, so Google Analytics was being
          * fetched in competition with the LCP image on a site whose whole job is to look
          * good in the first second. Nothing on the page reads gtag, so it can wait for
          * idle; the pageview still fires.
          */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B58Z9QKYLS" strategy="lazyOnload" />
        <Script id="ga" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B58Z9QKYLS');
        `}</Script>
      </head>
      <body>
        {/*
          Section background photographs (booking, food) are switched on only after the
          page has loaded, so they never compete with the hero image — see .bg-ready.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: "addEventListener('load',function(){document.documentElement.classList.add('bg-ready')})" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd(lang), siteJsonLd(lang)]) }}
        />
        <LanguageProvider lang={lang}>
          <BookingDraftProvider>
            <ScrollMemory />
            {children}
            {/* Every locale page gets the following booking button; /admin has its own layout. */}
            <StickyBook />
          </BookingDraftProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
