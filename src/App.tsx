import { useTranslation } from 'react-i18next'
import { Toaster } from 'sonner'

import type { Route } from '@/routes'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { RouteProvider } from '@/hooks/use-route'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ServicePage } from '@/pages/ServicePage'
import { ServicesIndexPage } from '@/pages/ServicesIndexPage'

function Page({ route }: { route: Route }) {
  switch (route.kind) {
    case 'home':
      return <HomePage />
    case 'services':
      return <ServicesIndexPage lang={route.lang} />
    case 'service':
      return <ServicePage service={route.service} lang={route.lang} />
    case 'notFound':
      return <NotFoundPage lang={route.lang} />
  }
}

export default function App({ route }: { route: Route }) {
  const { t } = useTranslation()

  return (
    <RouteProvider route={route}>
      <div className="bg-background text-foreground min-h-screen">
        <a
          href="#main"
          className="bg-primary text-primary-foreground focus-visible:ring-ring sr-only rounded-lg px-4 py-2 text-sm font-semibold focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t('a11y.skipToContent')}
        </a>
        <Navbar />
        {/* Keyed on the path so nothing from one page's state leaks into another. */}
        <main id="main" key={route.path}>
          <Page route={route} />
        </main>
        <Footer />
        <Toaster richColors closeButton />
      </div>
    </RouteProvider>
  )
}
