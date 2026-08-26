import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Cormorant_Garamond, DM_Mono } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { LOCALES, META, SITE, alternates, isLocale } from '@/lib/i18n'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-dm-mono',
  display: 'swap',
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
      images: [{ url: '/images/tiik.jpg', width: 1200, height: 630, alt: 'Oanduaia' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/images/tiik.jpg'],
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
    <html lang={lang} className={`${cormorant.variable} ${dmMono.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B58Z9QKYLS" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B58Z9QKYLS');
        `}</Script>
      </head>
      <body>
        <LanguageProvider lang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  )
}
