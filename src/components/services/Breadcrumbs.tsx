import { useTranslation } from 'react-i18next'

import { homePath, servicesPath, type Lang } from '@/routes'

/**
 * Visible breadcrumbs, mirrored by the BreadcrumbList in the page's JSON-LD.
 * The last item is the current page and is not a link.
 */
export function Breadcrumbs({
  lang,
  current,
}: {
  lang: Lang
  /** Name of the current service, or omitted on the services hub. */
  current?: string
}) {
  const { t } = useTranslation()
  const items = [
    { label: t('servicePages.common.home'), href: homePath(lang) },
    {
      label: t('servicePages.common.services'),
      href: current ? servicesPath(lang) : undefined,
    },
    ...(current ? [{ label: current, href: undefined }] : []),
  ]

  return (
    <nav aria-label={t('servicePages.common.breadcrumb')}>
      <ol className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <a
                href={item.href}
                className="hover:text-foreground focus-visible:ring-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="text-foreground/80">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
