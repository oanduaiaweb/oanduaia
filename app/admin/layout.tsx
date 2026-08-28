import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import '../globals.css'

const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-jost' })

/**
 * The admin sits outside /[lang] — it is one operator's tool, not a page of the site — so
 * it carries its own document shell rather than the locale layout's.
 */
export const metadata: Metadata = {
  title: 'Availability — Oanduaia',
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jost.variable}>
      <body>{children}</body>
    </html>
  )
}
