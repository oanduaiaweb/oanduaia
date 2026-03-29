import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import Feature from '@/components/Feature'
import Trails from '@/components/Trails'
import Testimonial from '@/components/Testimonial'
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
      <Services />
      <Feature />
      <Trails />
      <Testimonial />
      <Booking />
      <Footer />
    </>
  )
}
