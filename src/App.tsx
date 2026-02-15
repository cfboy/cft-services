import { Toaster } from 'sonner'

import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Services } from '@/components/Services'

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
