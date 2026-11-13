import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Events } from '@/components/Events'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Work } from '@/components/Work'

export function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Events />
      <About />
      <Contact />
    </>
  )
}
