import { useTranslation } from 'react-i18next'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { homePath, servicesPath, type Lang } from '@/routes'

export function NotFoundPage({ lang }: { lang: Lang }) {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="not-found-title"
      className="flex min-h-[70svh] items-center px-4 pt-32 pb-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-muted-foreground font-mono text-sm">404</p>
        <h1
          id="not-found-title"
          className="font-display mt-4 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-bold tracking-[-0.03em]"
        >
          {t('servicePages.notFound.title')}
          <span aria-hidden="true" className="cft-cursor" />
        </h1>
        <p className="text-muted-foreground mt-6 max-w-[52ch] text-lg leading-relaxed">
          {t('servicePages.notFound.lead')}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={homePath(lang)}
            className={cn(buttonVariants({ size: 'lg' }), 'px-7')}
          >
            {t('servicePages.notFound.home')}
          </a>
          <a
            href={servicesPath(lang)}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'px-6'
            )}
          >
            {t('servicePages.notFound.services')}
          </a>
        </div>
      </div>
    </section>
  )
}
