import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { ProjectRef } from '@/components/services/service-meta'

import { BrowserFrame } from '@/components/work/BrowserFrame'
import { featured, moreProjects } from '@/components/work/projects'
import { SchoolMockup } from '@/components/work/SchoolMockup'

function resolve(ref: ProjectRef) {
  if (ref.type === 'featured') {
    const p = featured[ref.key]
    return {
      key: p.key,
      url: p.url,
      host: p.host,
      shot: p.desktop,
      thumb: undefined,
    }
  }
  const p = moreProjects.find(m => m.key === ref.key)!
  const host = p.url
    ? new URL(p.url).hostname.replace(/^www\./, '')
    : 'make.com'
  return { key: p.key, url: p.url, host, shot: undefined, thumb: p.thumb }
}

/** A project in its browser frame — capture, thumbnail or code-built mockup. */
export function ProjectVisual({
  project,
  sizes,
  loading = 'lazy',
}: {
  project: ProjectRef
  sizes: string
  loading?: 'eager' | 'lazy'
}) {
  const { t } = useTranslation()
  const p = resolve(project)
  const alt = t(`work.projects.${p.key}.alt`, {
    defaultValue: t(`work.projects.${p.key}.title`),
  })

  return (
    <BrowserFrame
      host={p.host}
      shot={p.shot}
      alt={alt}
      sizes={sizes}
      loading={loading}
    >
      {p.key === 'school' ? (
        <SchoolMockup />
      ) : p.thumb ? (
        <img
          src={p.thumb}
          alt={alt}
          width={720}
          height={450}
          loading={loading}
          decoding="async"
          className="block aspect-16/10 h-auto w-full object-cover object-top"
        />
      ) : null}
    </BrowserFrame>
  )
}

export function RelatedWork({ projects }: { projects: ProjectRef[] }) {
  const { t } = useTranslation()

  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(ref => {
        const p = resolve(ref)
        const base = `work.projects.${p.key}`
        return (
          <li key={p.key} className="flex flex-col gap-5">
            <ProjectVisual
              project={ref}
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            />
            <div>
              <p className="text-muted-foreground font-mono text-xs">
                {t(`${base}.kind`)}
              </p>
              <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">
                {t(`${base}.title`)}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`${base}.summary`)}
              </p>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link focus-visible:ring-ring mt-3 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span className="decoration-cft-mint-ink underline decoration-2 underline-offset-[6px]">
                    {t('work.visitSite')}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                  <span className="sr-only">
                    {t(`${base}.title`)} {t('a11y.opensInNewTab')}
                  </span>
                </a>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
