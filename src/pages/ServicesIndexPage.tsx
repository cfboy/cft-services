import { useTranslation } from 'react-i18next'

import type { Lang } from '@/routes'

import { Contact } from '@/components/Contact'
import { Breadcrumbs } from '@/components/services/Breadcrumbs'
import { ServiceIndex } from '@/components/services/ServiceIndex'

/** `/services/` and `/es/servicios/` — the hub every service page links up to. */
export function ServicesIndexPage({ lang }: { lang: Lang }) {
  const { t } = useTranslation()

  return (
    <>
      <section
        aria-labelledby="services-hub-title"
        className="px-4 pt-32 pb-20 sm:pt-36 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs lang={lang} />
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <h1
              id="services-hub-title"
              className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-bold tracking-[-0.03em] text-balance lg:col-span-7"
            >
              {t('servicePages.hub.title')}
            </h1>
            <p className="text-muted-foreground max-w-[52ch] text-lg leading-relaxed text-pretty lg:col-span-5">
              {t('servicePages.hub.lead')}
            </p>
          </div>

          <div className="mt-16">
            <ServiceIndex lang={lang} />
          </div>
          <p className="text-muted-foreground mt-8 font-mono text-xs">
            {t('servicePages.common.areaNote')}
          </p>
        </div>
      </section>

      <Contact />
    </>
  )
}
