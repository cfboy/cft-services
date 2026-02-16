import { motion } from 'framer-motion'
import { ArrowUpRight, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import LibelulaLogo from '../assets/projects/LogoLibelula.svg'
import TitiAmandaLogo from '../assets/projects/LogoTitiAmanda.svg'

const SECTION_ID = 'work'

/**
 * Projects data — replace placeholder values with real project details.
 * `image` should be a URL to a screenshot (can use a service like
 * https://api.microlink.io/?url=YOUR_URL&screenshot=true&meta=false&embed=screenshot.url
 * or drop real screenshots into /src/assets/ and import them).
 */
const projects = [
  {
    key: 'project1',
    url: 'https://titiamandababysitter.com/',
    image: TitiAmandaLogo,
    isLogo: true,
    bgColor: '#fff3eb',
    accentFrom: '#f99898',
    accentTo: '#fff3eb',
    textColor: 'text-foreground',
    tags: ['Website'],
  },
  {
    key: 'project2',
    url: 'https://www.clinicalibelula.com/',
    image: LibelulaLogo,
    isLogo: true,
    bgColor: '#f8ffe3',
    accentFrom: '#1f3032',
    accentTo: '#c3f991',
    textColor: 'text-background',
    tags: ['Website'],
  },
  {
    key: 'project3',
    url: 'https://example.com',
    image: 'https://placehold.co/800x500/3caea3/ffffff?text=Project+3',
    isLogo: false,
    bgColor: '',
    accentFrom: '#3caea3',
    accentTo: '#a8eddf',
    textColor: 'text-foreground',
    tags: ['E-Commerce', 'Retail'],
  },
  {
    key: 'project4',
    url: 'https://example.com',
    image: 'https://placehold.co/800x500/1a1a2e/3caea3?text=Project+4',
    isLogo: false,
    bgColor: '',
    accentFrom: '#1a1a2e',
    accentTo: '#3caea3',
    textColor: 'text-background',
    tags: ['Platform', 'Hospitality'],
  },
] as const

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const { t } = useTranslation()

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group relative block overflow-hidden rounded-2xl shadow-md"
    >
      {/* Image / Logo */}
      <div
        className={`relative overflow-hidden ${project.isLogo ? 'flex aspect-video items-center justify-center p-6' : 'aspect-video'}`}
        style={
          project.isLogo && project.bgColor
            ? { backgroundColor: project.bgColor }
            : undefined
        }
      >
        <img
          src={project.image}
          alt={t(`work.${project.key}.title`)}
          className={`transition-transform duration-500 group-hover:scale-105 ${project.isLogo ? 'max-h-full max-w-full object-contain' : 'h-full w-full object-cover'}`}
          loading="lazy"
        />
      </div>

      {/* Always-visible bottom strip */}
      <div className="bg-card border-border/50 flex items-center justify-between border-t px-4 py-3">
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
        <Globe className="text-muted-foreground h-4 w-4 shrink-0" />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* Solid color scrim for hover, using project4's style for all */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#1a1a2e',
            opacity: 0.95,
          }}
        />

        {/* Content with project 4 text color on hover */}
        <div className="relative p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="text-background text-base leading-tight font-bold">
              {t(`work.${project.key}.title`)}
            </h3>
            <ArrowUpRight className="text-background mt-0.5 h-4 w-4 shrink-0" />
          </div>
          <p className="text-background text-xs leading-relaxed">
            {t(`work.${project.key}.description`)}
          </p>
        </div>
      </div>
    </motion.a>
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

        {/* Grid — 1 col mobile, 2 col tablet, 3 col desktop, 4 col xl */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.key} project={project} index={i} />
          ))}
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
