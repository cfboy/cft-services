import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Clock, RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import CRMAutomationImg from '../assets/projects/CRM-Make-Automation.webp'
import LibelulaLogo from '../assets/projects/LogoLibelula.svg'
import MACEducandoLogo from '../assets/projects/LogoMACEducando.webp'
import TitiAmandaLogo from '../assets/projects/LogoTitiAmanda.svg'
import SalesReportImg from '../assets/projects/Sales-Report.webp'

import { useDragScroll } from '@/hooks/use-drag-scroll'

const SECTION_ID = 'work'

type Project = {
  key: string
  url?: string
  drawerImage?: string
  /** Intrinsic size of `drawerImage`, so the drawer reserves space up front. */
  drawerSize?: { width: number; height: number }
  image: string
  isLogo: boolean
  bgColor: string
  /** Whether `bgColor` is dark — drives the front-face text colour. */
  bgIsDark: boolean
  backBg: string
  tags: readonly string[]
}

const projects: Project[] = [
  {
    key: 'project1',
    url: 'https://titiamandababysitter.com/',
    image: TitiAmandaLogo,
    isLogo: true,
    bgColor: '#fff3eb',
    bgIsDark: false,
    backBg: '#b13b3b',
    tags: ['Website'],
  },
  {
    key: 'project2',
    url: 'https://www.clinicalibelula.com/',
    image: LibelulaLogo,
    isLogo: true,
    bgColor: '#f8ffe3',
    bgIsDark: false,
    backBg: '#1f3032',
    tags: ['Website'],
  },
  {
    key: 'project3',
    drawerImage: CRMAutomationImg,
    drawerSize: { width: 1200, height: 553 },
    image: CRMAutomationImg,
    isLogo: false,
    bgColor: '',
    bgIsDark: true,
    backBg: '#3b4a6b',
    tags: ['Automation', 'CRM', 'AI'],
  },
  {
    key: 'project4',
    drawerImage: SalesReportImg,
    drawerSize: { width: 1200, height: 519 },
    image: SalesReportImg,
    isLogo: false,
    bgColor: '',
    bgIsDark: true,
    backBg: '#4a1a6b',
    tags: ['Automation', 'Reporting', 'Finance'],
  },
  {
    key: 'project5',
    url: 'https://maceducando.com/',
    image: MACEducandoLogo,
    isLogo: true,
    bgColor: '#1a3d1b',
    bgIsDark: true,
    backBg: '#2d6a2e',
    tags: ['Website'],
  },
]

const ALL_TAGS = Array.from(new Set(projects.flatMap(p => p.tags)))

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const [flipped, setFlipped] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const frontRef = useRef<HTMLButtonElement>(null)
  const backRef = useRef<HTMLButtonElement>(null)

  const hasDrawer = !!project.drawerImage
  const hasUrl = !!project.url
  const title = t(`work.${project.key}.title`)

  // Only one face is reachable at a time. Without this, keyboard users tab
  // into the controls on the hidden back of the card.
  const faceProps = (isVisible: boolean) => ({
    inert: !isVisible,
    'aria-hidden': !isVisible,
  })

  // Marking the focused face `inert` drops focus to <body>. Hand it to the
  // face that just became visible so keyboard position survives the flip.
  const flip = (next: boolean) => {
    setFlipped(next)
    requestAnimationFrame(() => {
      ;(next ? backRef : frontRef).current?.focus()
    })
  }

  const hintColor = project.bgIsDark ? 'text-white/60' : 'text-black/60'

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, delay: index * 0.1 }}
        className="aspect-3/4"
        style={{ perspective: '1000px' }}
      >
        {/* Flip container */}
        <div
          className="relative h-full w-full rounded-lg transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transform: prefersReduced
              ? 'none'
              : flipped
                ? 'rotateY(180deg)'
                : 'rotateY(0deg)',
            WebkitTransform: prefersReduced
              ? 'none'
              : flipped
                ? 'rotateY(180deg)'
                : 'rotateY(0deg)',
          }}
        >
          {/* ── FRONT ── */}
          <div
            className="absolute inset-0 overflow-hidden rounded-lg"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              WebkitTransform: 'rotateY(0deg)',
            }}
            {...faceProps(!flipped)}
          >
            {project.isLogo ? (
              /* Logo projects — image on client brand bg */
              <div
                className="relative flex h-full items-center justify-center p-6"
                style={{ backgroundColor: project.bgColor || undefined }}
              >
                <img
                  src={project.image}
                  alt={title}
                  className="max-h-full max-w-[80%] object-contain"
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={320}
                />
                {/* Bottom row: tags left, hint right */}
                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/55 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className={`shrink-0 text-xs ${hintColor}`}>
                    {t('work.tapToLearnMore')}
                  </p>
                </div>
              </div>
            ) : (
              /* Screenshot projects — solid brand field with overlay */
              <div
                className="relative flex h-full flex-col items-start justify-end p-6"
                style={{ backgroundColor: project.backBg }}
              >
                {/* Gradient overlay for legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg bg-linear-to-t from-black/60 via-transparent to-transparent"
                />
                <div className="relative z-10 w-full">
                  <h3 className="font-display mb-3 text-lg leading-snug font-semibold text-white">
                    {title}
                  </h3>
                  {/* Bottom row: tags left, hint right */}
                  <div className="flex items-end justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="shrink-0 text-xs text-white/70">
                      {t('work.tapToLearnMore')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Flip trigger covers the face so the whole card stays clickable
                while remaining a single, real button. */}
            <button
              ref={frontRef}
              type="button"
              onClick={() => flip(true)}
              aria-expanded={flipped}
              aria-label={`${title} — ${t('work.tapToLearnMore')}`}
              className="focus-visible:ring-ring absolute inset-0 h-full w-full cursor-pointer rounded-lg focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
            />
          </div>

          {/* ── BACK ── */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-lg p-6"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              WebkitTransform: 'rotateY(180deg)',
              backgroundColor: project.backBg,
            }}
            {...faceProps(flipped)}
          >
            {/* Title */}
            <div className="mb-3 flex shrink-0 items-start justify-between gap-2">
              <h3 className="font-display text-xl leading-tight font-semibold text-white">
                {title}
              </h3>
              <button
                ref={backRef}
                type="button"
                onClick={() => flip(false)}
                aria-label={t('work.flipBack')}
                className="focus-visible:ring-ring -mt-1 -mr-1 shrink-0 cursor-pointer rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
              >
                <RotateCcw aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable description */}
            <ScrollArea className="min-h-0 flex-1">
              <p className="text-sm leading-relaxed text-white/85">
                {t(`work.${project.key}.description`)}
              </p>
            </ScrollArea>

            {/* Action button */}
            {(hasDrawer || hasUrl) && (
              <div className="mt-4 shrink-0">
                {hasDrawer && (
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(true)}
                    className="focus-visible:ring-ring inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
                  >
                    {t('work.viewDetails')}
                  </button>
                )}
                {hasUrl && !hasDrawer && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:ring-ring inline-flex items-center gap-1 rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
                  >
                    {t('work.visitSite')}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    <span className="sr-only">{t('a11y.opensInNewTab')}</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {hasDrawer && (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-8">
              <DrawerDescription className="pb-1 text-sm leading-relaxed">
                {t(`work.${project.key}.description`)}
              </DrawerDescription>
              {project.drawerImage && (
                <img
                  src={project.drawerImage}
                  alt={title}
                  className="mx-auto mt-4 block w-full rounded-lg object-contain"
                  loading="lazy"
                  decoding="async"
                  width={project.drawerSize?.width}
                  height={project.drawerSize?.height}
                />
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

export function Work() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const {
    ref,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onClickCapture,
  } = useDragScroll<HTMLDivElement>()

  const filtered = activeTag
    ? projects.filter(p => p.tags.includes(activeTag))
    : projects

  const pillClass = (isActive: boolean) =>
    `focus-visible:ring-ring cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-secondary text-secondary-foreground hover:bg-border'
    }`

  return (
    <section
      id={SECTION_ID}
      className="px-4 py-24 sm:py-32"
      aria-labelledby="work-title"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header — flush left per Register A */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2
            id="work-title"
            className="font-display mb-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t('work.title')}
          </h2>
          <p className="text-muted-foreground max-w-lg">{t('work.subtitle')}</p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          role="group"
          aria-label={t('a11y.filterProjects')}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            aria-pressed={activeTag === null}
            className={pillClass(activeTag === null)}
          >
            {t('work.all')}
          </button>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              aria-pressed={activeTag === tag}
              className={pillClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Horizontal scroll */}
        <div
          className="relative"
          ref={ref}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onClickCapture={onClickCapture}
        >
          <ScrollArea
            className="w-full"
            viewportProps={{
              tabIndex: 0,
              role: 'region',
              'aria-label': t('a11y.workCarousel'),
            }}
          >
            <div className="flex cursor-grab gap-4 pb-4 select-none">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.key}
                    layout
                    initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.92 }}
                    transition={{ duration: 0.25 }}
                    className="w-56 shrink-0"
                  >
                    <ProjectCard project={project} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* Coming soon card */}
              {!activeTag && (
                <div className="border-border/50 bg-muted text-muted-foreground flex aspect-3/4 w-56 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed p-5 text-center">
                  <Clock
                    aria-hidden="true"
                    className="text-muted-foreground/40 mb-3 h-5 w-5"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-semibold">
                    {t('work.comingSoon')}
                  </span>
                  <span className="mt-1 text-xs">
                    {t('work.comingSoonSub')}
                  </span>
                </div>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div
            aria-hidden="true"
            className="from-background pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-linear-to-l to-transparent sm:block"
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12"
        >
          <p className="text-muted-foreground text-sm">
            {t('work.cta')}{' '}
            <a
              href="#contact"
              className="text-cft-teal-ink focus-visible:ring-ring rounded-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('work.ctaLink')}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
