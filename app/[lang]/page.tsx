import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import Feature from '@/components/Feature'
import Trails from '@/components/Trails'
import Why from '@/components/Why'
import Faq from '@/components/Faq'
import Stats from '@/components/Stats'
import Reviews from '@/components/Reviews'
import Availability from '@/components/Availability'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'
import ScrollRevealInit from '@/components/ScrollReveal'
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
      <Nav />
      <Hero />
      <Feature />
      {/*
        Reviews sit immediately after the houses, not near the bottom. Someone who has just
        read what the three houses are is deciding whether to believe us; that is the moment
        other people's word is worth most. Lower down it was decoration.
      */}
      <Reviews />
      {/*
        The story sits between the houses and the reasons, not above them. Someone landing
        here wants to see what they can rent before they are told what the place is like;
        the story then lands as the answer to "why here", which is exactly what Why picks up.
      */}
      <Intro />
      <Why />
      <Services />
      <Trails />
      <Stats />
      {/* Questions answered immediately before the enquiry form, not after it. */}
      <Faq />
      <Availability />
      <Booking />
      <Footer />
    </>
  )
}
