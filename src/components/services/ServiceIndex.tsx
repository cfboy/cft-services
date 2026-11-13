import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SERVICE_META } from '@/components/services/service-meta'
import { cn } from '@/lib/utils'
import { SERVICE_KEYS, servicePath, type Lang, type ServiceKey } from '@/routes'

/**
 * A ruled list of service pages — the services hub, and the "other services"
 * block at the foot of each service page. Each row is one stretched link, so
 * the whole row is clickable without nesting interactive elements.
 */
export function ServiceIndex({
  lang,
  exclude,
  headingLevel: Heading = 'h2',
  compact = false,
}: {
  lang: Lang
  exclude?: ServiceKey
  headingLevel?: 'h2' | 'h3'
  compact?: boolean
}) {
  const { t } = useTranslation()
  const keys = SERVICE_KEYS.filter(key => key !== exclude)

  return (
    <ul className="border-border border-b">
      {keys.map(key => {
        const { Icon } = SERVICE_META[key]
        return (
          <li
            key={key}
            className={cn(
              'group border-border has-focus-visible:ring-ring relative grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-x-4 rounded-sm border-t has-focus-visible:ring-2 sm:gap-x-6',
              compact ? 'py-5' : 'py-7 sm:py-8'
            )}
          >
            <Icon
              aria-hidden="true"
              className="text-muted-foreground h-5 w-5 translate-y-1"
              strokeWidth={1.5}
            />
            <div>
              <Heading
                className={cn(
                  'font-display font-semibold tracking-tight',
                  compact ? 'text-lg' : 'text-2xl sm:text-[1.75rem]'
                )}
              >
                <a
                  href={servicePath(key, lang)}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  {t(`servicePages.${key}.name`)}
                </a>
              </Heading>
              <p
                className={cn(
                  'text-muted-foreground mt-1.5 max-w-[60ch] leading-relaxed',
                  compact && 'text-sm'
                )}
              >
                {t(`servicePages.${key}.summary`)}
              </p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="text-muted-foreground group-hover:text-cft-mint-ink h-5 w-5 transition-[color,transform] duration-200 group-hover:translate-x-1"
            />
          </li>
        )
      })}
    </ul>
  )
}
