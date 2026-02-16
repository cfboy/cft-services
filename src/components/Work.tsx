import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from './ui/drawer'
import CRMAutomationImg from '../assets/projects/CRM-Make-Automation.png'
import LibelulaLogo from '../assets/projects/LogoLibelula.svg'
import TitiAmandaLogo from '../assets/projects/LogoTitiAmanda.svg'
import SalesReportImg from '../assets/projects/Sales-Report.png'

const SECTION_ID = 'work'

type Project = {
  key: string
  url?: string
  drawerImage?: string
  image: string
  isLogo: boolean
  bgColor: string
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
    backBg: '#f97c7c',
    tags: ['Website'],
  },
  {
    key: 'project2',
    url: 'https://www.clinicalibelula.com/',
    image: LibelulaLogo,
    isLogo: true,
    bgColor: '#f8ffe3',
    backBg: '#1f3032',
    tags: ['Website'],
  },
  {
    key: 'project3',
    drawerImage: CRMAutomationImg,
    image: CRMAutomationImg,
    isLogo: false,
    bgColor: '',
    backBg: '#3b4a6b',
    tags: ['Automation', 'CRM', 'AI'],
  },
  {
    key: 'project4',
    drawerImage: SalesReportImg,
    image: SalesReportImg,
    isLogo: false,
    bgColor: '',
    backBg: '#4a1a6b',
    tags: ['Automation', 'Reporting', 'Finance'],
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation()
  const [flipped, setFlipped] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const hasDrawer = !!project.drawerImage
  const hasUrl = !!project.url

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45, delay: index * 0.1 }}
        className="aspect-[4/3] cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(v => !v)}
      >
        {/* Flip container */}
        <div
          className="relative h-full w-full rounded-2xl shadow-md transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ── FRONT ── */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Image / Logo */}
            <div
              className={`relative h-[calc(100%-44px)] overflow-hidden ${project.isLogo ? 'flex items-center justify-center p-6' : ''}`}
              style={
                project.isLogo && project.bgColor
                  ? { backgroundColor: project.bgColor }
                  : undefined
              }
            >
              <img
                src={project.image}
                alt={t(`work.${project.key}.title`)}
                className={
                  project.isLogo
                    ? 'max-h-full max-w-[80%] object-contain'
                    : 'h-full w-full object-cover'
                }
                loading="lazy"
              />
            </div>
            {/* Bottom strip */}
            <div className="bg-card border-border/50 flex h-11 items-center border-t px-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl p-5"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              backgroundColor: project.backBg,
            }}
          >
            <div>
              <h3 className="mb-2 text-base leading-tight font-bold text-white">
                {t(`work.${project.key}.title`)}
              </h3>
              <p className="text-xs leading-relaxed text-white/80">
                {t(`work.${project.key}.description`)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {hasDrawer && (
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setDrawerOpen(true)
                  }}
                  className="ml-3 inline-flex shrink-0 items-center gap-1 rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  {t('work.viewDetails')}
                </button>
              )}

              {hasUrl && !hasDrawer && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="ml-3 inline-flex shrink-0 items-center gap-1 rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                >
                  {t('work.visitSite')}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {hasDrawer && (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t(`work.${project.key}.title`)}</DrawerTitle>
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
                  alt={t(`work.${project.key}.title`)}
                  className="mx-auto mb-4 block w-full max-w-lg rounded-xl object-contain"
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

  return (
    <section
      id={SECTION_ID}
      className="relative overflow-hidden px-4 py-24 sm:py-32"
    >
      {/* Background blob */}
      <div className="bg-cft-navy-medium/5 pointer-events-none absolute right-0 -bottom-32 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('work.title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg">
            {t('work.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.key} project={project} index={i} />
          ))}
          {/* Coming soon card */}
          <div className="border-muted-foreground/30 bg-muted text-muted-foreground flex aspect-video flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center">
            <span className="mb-2 text-2xl">🚧</span>
            <span className="font-semibold">Coming soon</span>
            <span className="mt-1 text-xs">More projects will be added</span>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            {t('work.cta')}{' '}
            <a
              href="#contact"
              className="text-cft-teal-primary font-medium underline-offset-4 hover:underline"
            >
              {t('work.ctaLink')}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
