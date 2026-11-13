import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Lock, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { BrowserFrame, PhoneFrame } from '@/components/work/BrowserFrame'
import {
  featured,
  moreProjects,
  shotSizes,
  type FeaturedProject,
  type IndexProject,
} from '@/components/work/projects'
import { SchoolMockup } from '@/components/work/SchoolMockup'
import { cn } from '@/lib/utils'

const SECTION_ID = 'work'

/** ease-out-quint — fast start, long settle. */
const EASE = [0.22, 1, 0.36, 1] as const

const linkClass =
  'focus-visible:ring-ring inline-flex items-center gap-1.5 rounded-sm text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'

/* ── Media ──────────────────────────────────────────────────────────── */

function ProjectMedia({
  project,
  sizes,
  withPhone = true,
}: {
  project: FeaturedProject
  sizes: string
  withPhone?: boolean
}) {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const alt = t(`work.projects.${project.key}.alt`, { defaultValue: '' })

  return (
    <div className="relative">
      <motion.div
        // A clip-path reveal: the frame opens from slightly inset rather than
        // fading in, so the capture is never fully hidden.
        initial={
          prefersReduced ? false : { clipPath: 'inset(6% 6% 6% 6% round 8px)' }
        }
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 8px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <BrowserFrame
          host={project.host}
          shot={project.desktop}
          alt={alt}
          sizes={sizes}
          className="transition-transform duration-500 ease-out group-hover/project:-translate-y-1"
        >
          {project.key === 'school' && <SchoolMockup />}
        </BrowserFrame>
      </motion.div>

      {/* The phone sits outside the clipped layer so it can overhang */}
      {withPhone && project.mobile && (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="absolute -right-3 -bottom-8 hidden w-[22%] min-w-24 sm:block lg:-right-6"
        >
          <PhoneFrame
            src={project.mobile}
            className="transition-transform duration-500 ease-out group-hover/project:-translate-y-2"
          />
        </motion.div>
      )}
    </div>
  )
}

/* ── Copy ───────────────────────────────────────────────────────────── */

function ProjectCopy({
  project,
  headingLevel = 'h3',
}: {
  project: FeaturedProject
  headingLevel?: 'h3'
}) {
  const { t } = useTranslation()
  const base = `work.projects.${project.key}`
  const highlights = t(`${base}.highlights`, {
    returnObjects: true,
  }) as string[]
  const client = t(`${base}.client`, { defaultValue: '' })
  const Heading = headingLevel

  return (
    <div className="flex flex-col">
      <p className="text-muted-foreground font-mono text-xs tracking-wide">
        {t(`${base}.kind`)}
      </p>
      <Heading className="font-display mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {t(`${base}.title`)}
      </Heading>
      {client && (
        <p className="text-foreground/80 mt-1 text-sm font-medium">{client}</p>
      )}
      <p className="text-muted-foreground mt-4 max-w-[52ch] leading-relaxed text-pretty">
        {t(`${base}.summary`)}
      </p>

      <ul className="border-border/70 mt-6 border-t">
        {Array.isArray(highlights) &&
          highlights.map(item => (
            <li
              key={item}
              className="border-border/70 flex items-baseline gap-3 border-b py-2.5 text-sm"
            >
              {/* The brand cursor, as a list marker */}
              <span
                aria-hidden="true"
                className="bg-cft-mint-ink inline-block h-[3px] w-2.5 shrink-0 -translate-y-[3px]"
              />
              {item}
            </li>
          ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="text-muted-foreground font-mono text-xs">
          {project.stack.join(' · ')}
        </p>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClass, 'text-foreground group/link')}
          >
            <span className="decoration-cft-mint-ink underline decoration-2 underline-offset-[6px]">
              {t('work.visitSite')}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
            <span className="sr-only">
              {t(`${base}.title`)} {t('a11y.opensInNewTab')}
            </span>
          </a>
        ) : (
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
            <Lock
              aria-hidden="true"
              className="h-3.5 w-3.5"
              strokeWidth={1.75}
            />
            {t('work.privateApp')}
          </span>
        )}
      </div>
    </div>
  )
}

/** Media + copy side by side; `flip` puts the media on the right. */
function FeatureRow({
  project,
  flip = false,
}: {
  project: FeaturedProject
  flip?: boolean
}) {
  return (
    <article className="group/project grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
      <div className={cn('lg:col-span-7', flip && 'lg:order-2')}>
        <ProjectMedia project={project} sizes={shotSizes.featured} />
      </div>
      <div className={cn('lg:col-span-5', flip && 'lg:order-1')}>
        <ProjectCopy project={project} />
      </div>
    </article>
  )
}

/** Media above copy — used for the two-up pair. */
function FeatureStack({ project }: { project: FeaturedProject }) {
  return (
    <article className="group/project flex flex-col gap-10">
      <ProjectMedia project={project} sizes={shotSizes.half} />
      <ProjectCopy project={project} />
    </article>
  )
}

/* ── More projects ──────────────────────────────────────────────────── */

function IndexRow({ project }: { project: IndexProject }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const base = `work.projects.${project.key}`
  const title = t(`${base}.title`)

  // One control per row, stretched over the row with ::after, so the whole
  // line is clickable without nesting interactive elements.
  const stretched =
    'after:absolute after:inset-0 after:content-[""] focus-visible:outline-none'

  return (
    <li className="group/row border-border/70 has-focus-visible:ring-ring relative grid grid-cols-[88px_1fr] items-center gap-4 rounded-sm border-t py-5 has-focus-visible:ring-2 sm:grid-cols-[148px_1fr_auto] sm:gap-8">
      <div className="border-border/70 bg-muted overflow-hidden rounded-md border">
        <img
          src={project.thumb}
          alt=""
          width={720}
          height={450}
          loading="lazy"
          decoding="async"
          className="aspect-16/10 h-auto w-full object-cover object-top transition-transform duration-500 ease-out group-hover/row:scale-[1.04]"
        />
      </div>

      <div className="min-w-0">
        <h4 className="font-display text-lg leading-tight font-semibold">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={stretched}
            >
              {title}
              <span className="sr-only">
                {' '}
                — {t('work.visitSite')} {t('a11y.opensInNewTab')}
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className={cn(stretched, 'cursor-pointer text-left')}
            >
              {title}
              <span className="sr-only"> — {t('work.viewDetails')}</span>
            </button>
          )}
        </h4>
        <p className="text-muted-foreground mt-1 font-mono text-[11px] tracking-wide">
          {t(`${base}.kind`)}
        </p>
        <p className="text-muted-foreground mt-2 hidden max-w-[60ch] text-sm leading-relaxed sm:block">
          {t(`${base}.summary`)}
        </p>
      </div>

      <span
        aria-hidden="true"
        className="text-muted-foreground group-hover/row:text-foreground hidden items-center gap-1.5 text-sm transition-colors sm:inline-flex"
      >
        {project.url ? t('work.visitSite') : t('work.viewDetails')}
        {project.url ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </span>

      {project.detail && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <p className="text-muted-foreground font-mono text-xs">
                {t(`${base}.kind`)}
              </p>
            </DrawerHeader>
            <div className="mx-auto w-full max-w-4xl overflow-y-auto px-4 pb-8">
              <DrawerDescription className="max-w-[65ch] pb-1 text-sm leading-relaxed">
                {t(`${base}.description`)}
              </DrawerDescription>
              <img
                src={project.detail.src}
                alt={title}
                className="border-border/70 mt-5 block w-full rounded-lg border object-contain"
                loading="lazy"
                decoding="async"
                width={project.detail.width}
                height={project.detail.height}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </li>
  )
}

/* ── Section ────────────────────────────────────────────────────────── */

export function Work() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()

  return (
    <section
      id={SECTION_ID}
      className="overflow-x-clip px-4 pt-12 pb-24 sm:pt-16 sm:pb-32"
      aria-labelledby="work-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end"
        >
          <h2
            id="work-title"
            className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:col-span-7 lg:text-6xl"
          >
            {t('work.title')}
          </h2>
          <p className="text-muted-foreground max-w-md leading-relaxed lg:col-span-5 lg:justify-self-end">
            {t('work.subtitle')}
          </p>
        </motion.header>

        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          <FeatureRow project={featured.masterspace} />

          <div className="grid grid-cols-1 gap-24 md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
            <FeatureStack project={featured.dorsal} />
            {/* Offset the second column so the pair doesn't read as a grid */}
            <div className="md:pt-24">
              <FeatureStack project={featured.fudis} />
            </div>
          </div>

          <FeatureRow project={featured.school} flip />
        </div>

        {/* More projects — a ruled index, not another grid of cards */}
        <div className="mt-28 sm:mt-36">
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {t('work.moreTitle')}
          </h3>
          <ul className="border-border/70 mt-8 border-b">
            {moreProjects.map(project => (
              <IndexRow key={project.key} project={project} />
            ))}
          </ul>

          <p className="text-muted-foreground mt-10 text-sm">
            {t('work.cta')}{' '}
            <a
              href="#contact"
              className="text-cft-mint-ink focus-visible:ring-ring rounded-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('work.ctaLink')}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
