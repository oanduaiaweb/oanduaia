import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { LOCALES, SITE, alternates, isLocale, META } from '@/lib/i18n'
import { TERMS } from '@/lib/terms'

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = TERMS[lang]
  const title = `${t.title} – Oanduaia`
  return {
    title,
    description: t.lead,
    alternates: alternates(lang, '/terms'),
    openGraph: { type: 'website', siteName: 'Oanduaia', locale: META[lang].ogLocale, title, description: t.lead, url: `${SITE}/${lang}/terms` },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = TERMS[lang]
  return (
    <>
      <Nav />
      <main id="main" className="terms">
        <h1 className="terms-title">{t.title}</h1>
        <p className="terms-lead">{t.lead}</p>
        {t.sections.map(s => (
          <section key={s.h}>
            <h2 className="terms-h">{s.h}</h2>
            <ul className="terms-list">
              {s.p.map(p => <li key={p}>{p}</li>)}
            </ul>
          </section>
        ))}
        <p className="terms-updated">{t.updated}</p>
      </main>
      <Footer />
    </>
  )
}
