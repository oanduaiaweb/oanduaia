import Nav from '@/components/Nav'
import WinterSauna from '@/components/WinterSauna'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import Feature from '@/components/Feature'
import Trails from '@/components/Trails'
import Why from '@/components/Why'
import Faq from '@/components/Faq'
import Stats from '@/components/Stats'
import GiftTeaser from '@/components/GiftTeaser'
import Reviews from '@/components/Reviews'
import Availability from '@/components/Availability'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'
import ScrollRevealInit from '@/components/ScrollReveal'
import HashLanding from '@/components/HashLanding'
import { faqJsonLd, isLocale } from '@/lib/i18n'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return (
    <>
      {/*
        The site-wide FAQ schema lives here, not in the layout.
        It used to be emitted on every page — including trail and house pages, where none
        of those thirteen questions appear. FAQPage is meant to describe the FAQ ON the
        page carrying it, and the landing page ended up with two FAQPage nodes: its own
        five questions and these thirteen. Now the thirteen sit with the visible FAQ.
      */}
      {isLocale(lang) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(lang)) }}
        />
      )}
      <ScrollRevealInit />
      <HashLanding />
      <Nav />
      <main id="main">
        <Hero />
        {/* Sauna House winter band, 1 Dec – 31 Mar (Mikk, 7 Nov). Shows itself in season. */}
        <WinterSauna />
        <Feature />
        {/*
          Order agreed with Mikk, 26 Nov 2026: the quick facts and the reviews straight after
          the three houses, so a guest sees 35 five-star reviews BEFORE the calendar asks them
          to commit; then the calendar and the form; the story, food and nature after that.
          If a section moves here, move it in the links list in components/Nav.tsx too.
        */}
        <Stats />
        <Reviews />
        <Availability />
        <Booking />
        <GiftTeaser />
        <Intro />
        <Why />
        <Services />
        <Trails />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
