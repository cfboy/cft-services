import { Toaster } from 'sonner'

import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Services } from '@/components/Services'
import { Work } from '@/components/Work'

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
