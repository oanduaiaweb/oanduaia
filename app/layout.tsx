import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

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

export const metadata: Metadata = {
  title: 'Oanduaia - Metsaspaa Lahemaal',
  description: 'Metsaspaa ja majutus Lahemaa südames.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="et" className={`${cormorant.variable} ${dmMono.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B58Z9QKYLS" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B58Z9QKYLS');
        `}</Script>
      </head>
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  )
}
