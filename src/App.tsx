import { useTranslation } from 'react-i18next'

import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Events } from '@/components/Events'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Services } from '@/components/Services'
import { Work } from '@/components/Work'
import { useDocumentLanguage } from '@/hooks/use-document-language'

export default function App() {
  const { t } = useTranslation()
  useDocumentLanguage()

  return (
    <div className="bg-background text-foreground min-h-screen">
      <a
        href="#main"
        className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only rounded-lg px-4 py-2 text-sm font-semibold focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {t('a11y.skipToContent')}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Events />
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
