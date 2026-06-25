import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Banknote,
  BookOpen,
  Building2,
  Dumbbell,
  Heart,
  Home,
  Scale,
  Shield,
  ShoppingBag,
  Truck,
  Users,
  Utensils,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, isInView])

  return { count, ref }
}

type StatType = {
  id: string
  label: string
  value: number
  suffix: string
  description: string
}

function StatCard({
  stat,
  index,
  isLast,
}: {
  stat: StatType
  index: number
  isLast?: boolean
}) {
  const { count, ref } = useCounter(stat.value)
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`border-border/50 hover:border-border flex flex-col rounded-lg border p-6 transition-[border-color] duration-300 ${isLast ? 'col-span-2 md:col-span-1' : ''}`}
    >
      <div
        ref={ref}
        className="font-display mb-1 text-3xl font-bold tracking-tight tabular-nums"
      >
        {count}
        {stat.suffix}
      </div>
      <div className="font-display mb-0.5 text-sm font-semibold">
        {stat.label}
      </div>
      <div className="text-muted-foreground text-xs leading-relaxed">
        {stat.description}
      </div>
    </motion.div>
  )
}

const processSteps = [
  {
    phase: 1,
    titleKey: 'about.howWeDoIt.assessment.title',
    descKey: 'about.howWeDoIt.assessment.description',
  },
  {
    phase: 2,
    titleKey: 'about.howWeDoIt.recommendations.title',
    descKey: 'about.howWeDoIt.recommendations.description',
  },
  {
    phase: 3,
    titleKey: 'about.howWeDoIt.implementation.title',
    descKey: 'about.howWeDoIt.implementation.description',
  },
]

const industries = [
  {
    nameKey: 'about.industries.healthcare.name',
    Icon: Heart,
  },
  {
    nameKey: 'about.industries.insurance.name',
    Icon: Shield,
  },
  {
    nameKey: 'about.industries.hospitality.name',
    Icon: Utensils,
  },
  {
    nameKey: 'about.industries.finance.name',
    Icon: Banknote,
  },
  {
    nameKey: 'about.industries.retail.name',
    Icon: ShoppingBag,
  },
  {
    nameKey: 'about.industries.education.name',
    Icon: BookOpen,
  },
  {
    nameKey: 'about.industries.legal.name',
    Icon: Scale,
  },
  {
    nameKey: 'about.industries.realestate.name',
    Icon: Home,
  },
  {
    nameKey: 'about.industries.logistics.name',
    Icon: Truck,
  },
  {
    nameKey: 'about.industries.fitness.name',
    Icon: Dumbbell,
  },
  {
    nameKey: 'about.industries.construction.name',
    Icon: Building2,
  },
  {
    nameKey: 'about.industries.government.name',
    Icon: Users,
  },
]

export function About() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()

  const stats: StatType[] = [
    {
      id: 'projectsCompleted',
      label: t('about.stats.projectsCompleted.label'),
      value: 20,
      suffix: '+',
      description: t('about.stats.projectsCompleted.description'),
    },
    {
      id: 'satisfiedClients',
      label: t('about.stats.satisfiedClients.label'),
      value: 10,
      suffix: '+',
      description: t('about.stats.satisfiedClients.description'),
    },
    {
      id: 'yearsExperience',
      label: t('about.stats.yearsExperience.label'),
      value: 8,
      suffix: '+',
      description: t('about.stats.yearsExperience.description'),
    },
  ]

  return (
    <section id="about" className="bg-muted/40 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl space-y-20">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('about.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
            {t('about.description')}
          </p>
        </motion.div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={i}
              isLast={i === stats.length - 1}
            />
          ))}
        </div>

        {/* ── How We Do It — Vertical Timeline ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h3 className="font-display mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {t('about.howWeDoIt.title')}
            </h3>
            <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
              {t('about.howWeDoIt.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical hairline */}
            <motion.div
              initial={{ scaleY: prefersReduced ? 1 : 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="border-border/50 absolute top-0 left-5 h-full w-px origin-top border-l lg:left-1/2 lg:-translate-x-px"
            />

            <div className="space-y-10">
              {processSteps.map(({ phase, titleKey, descKey }, i) => {
                const isLeft = i % 2 !== 0

                const cardContent = (
                  <div className="border-border/50 hover:border-border w-full rounded-lg border p-6 transition-[border-color] duration-300 lg:max-w-sm">
                    <span className="font-display text-muted-foreground/40 mb-3 block text-sm font-semibold tabular-nums">
                      {String(phase).padStart(2, '0')} /
                    </span>
                    <h4 className="font-display mb-2 text-base font-semibold">
                      {t(titleKey)}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(descKey)}
                    </p>
                  </div>
                )

                return (
                  <div key={phase} className="relative flex items-center gap-6">
                    {/* Left column — visible on desktop only when isLeft */}
                    <motion.div
                      initial={{ opacity: 0, x: prefersReduced ? 0 : -32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="hidden flex-1 justify-end lg:flex"
                    >
                      {isLeft ? cardContent : null}
                    </motion.div>

                    {/* Timeline node — restrained circle */}
                    <motion.div
                      initial={{ scale: prefersReduced ? 1 : 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.15 + 0.1,
                        type: 'spring',
                      }}
                      className="border-border bg-background relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 lg:mx-0"
                    >
                      <span className="font-display text-muted-foreground text-sm font-semibold tabular-nums">
                        {phase}
                      </span>
                    </motion.div>

                    {/* Right column — desktop right side + full mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: prefersReduced ? 0 : 32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="flex flex-1 justify-start lg:flex"
                    >
                      <div className={!isLeft ? '' : 'lg:hidden'}>
                        {cardContent}
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Industries — Horizontal scroll marquee ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h3 className="font-display mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {t('about.industries.title')}
            </h3>
            <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
              {t('about.industries.subtitle')}
            </p>
          </motion.div>

          {/* Marquee rows — items duplicated for infinite scroll; slot prefix ensures unique keys */}
          <div className="space-y-3 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-1">
            {/* Row 1 — scrolls left */}
            <div className="flex w-max gap-3 motion-safe:animate-[marquee_30s_linear_infinite]">
              {(['a', 'b'] as const).flatMap(slot =>
                industries.map(({ nameKey, Icon }) => (
                  <div
                    key={`${slot}-${nameKey}`}
                    className="border-border/50 bg-card flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-2.5"
                  >
                    <Icon
                      aria-hidden="true"
                      className="text-muted-foreground/60 h-3.5 w-3.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm font-semibold whitespace-nowrap">
                      {t(nameKey)}
                    </p>
                  </div>
                ))
              )}
            </div>
            {/* Row 2 — scrolls right (offset start for visual variety) */}
            <div className="flex w-max gap-3 motion-safe:animate-[marquee_25s_linear_infinite_reverse]">
              {(['a', 'b', 'c'] as const).flatMap((slot, si) =>
                (si === 0
                  ? industries.slice(6)
                  : si === 2
                    ? industries.slice(0, 6)
                    : industries
                ).map(({ nameKey, Icon }) => (
                  <div
                    key={`${slot}-${nameKey}`}
                    className="border-border/50 bg-card flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-2.5"
                  >
                    <Icon
                      aria-hidden="true"
                      className="text-muted-foreground/60 h-3.5 w-3.5 shrink-0"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm font-semibold whitespace-nowrap">
                      {t(nameKey)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
