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

export default function Page() {
  return (
    <>
      <ScrollRevealInit />
      <Nav />
      <Hero />
      <Intro />
      <Feature />
      {/* The offer summarised right after the houses, while someone is deciding. */}
      <Why />
      <Services />
      <Trails />
      <Stats />
      <Reviews />
      {/* Questions answered immediately before the enquiry form, not after it. */}
      <Faq />
      <Availability />
      <Booking />
      <Footer />
    </>
  )
}
