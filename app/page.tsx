import Header from '@/components/header'
import Hero from '@/components/hero'
import Fleet from '@/components/fleet-section'
import Procedure from '@/components/procedure-section'
import Values from '@/components/values'
import Contact from './contact/page'
import Footer from '@/components/footer'
import ServicesSection from '@/components/services-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <Fleet />
      <Procedure />
      <Values />
    </main>
  )
}
