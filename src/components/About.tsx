import { motion, useInView } from 'framer-motion'
import {
  Banknote,
  CheckCircle,
  Clock,
  Heart,
  Shield,
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
  label: string
  value: number
  suffix: string
  Icon: React.ComponentType<{ className?: string }>
  color: string
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className={`bg-card border-border/50 hover:border-cft-teal-primary/20 flex flex-col items-center rounded-2xl border p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md ${isLast ? 'col-span-2 md:col-span-1' : ''}`}
    >
      <div
        className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${stat.color} shadow-md`}
      >
        <stat.Icon className="h-5 w-5 text-white" />
      </div>
      <div ref={ref} className="text-cft-teal-primary text-3xl font-extrabold">
        {count}
        {stat.suffix}
      </div>
      <div className="mt-1 text-sm font-semibold">{stat.label}</div>
      <div className="text-muted-foreground mt-0.5 text-xs">
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
    descKey: 'about.industries.healthcare.description',
    Icon: Heart,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-500/10',
  },
  {
    nameKey: 'about.industries.insurance.name',
    descKey: 'about.industries.insurance.description',
    Icon: Shield,
    iconColor: 'text-cft-teal-primary',
    iconBg: 'bg-cft-teal-primary/10',
  },
  {
    nameKey: 'about.industries.hospitality.name',
    descKey: 'about.industries.hospitality.description',
    Icon: Utensils,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
  {
    nameKey: 'about.industries.finance.name',
    descKey: 'about.industries.finance.description',
    Icon: Banknote,
    iconColor: 'text-cft-navy-medium',
    iconBg: 'bg-cft-navy-medium/10',
  },
]

export function About() {
  const { t } = useTranslation()

  const stats: StatType[] = [
    {
      label: t('about.stats.projectsCompleted.label'),
      value: 20,
      suffix: '+',
      Icon: CheckCircle,
      color: 'from-cft-teal-primary to-cft-navy-medium',
      description: t('about.stats.projectsCompleted.description'),
    },
    {
      label: t('about.stats.satisfiedClients.label'),
      value: 10,
      suffix: '+',
      Icon: Users,
      color: 'from-cft-navy-medium to-cft-navy-deep',
      description: t('about.stats.satisfiedClients.description'),
    },
    {
      label: t('about.stats.yearsExperience.label'),
      value: 8,
      suffix: '+',
      Icon: Clock,
      color: 'from-cft-navy-deep to-cft-teal-primary',
      description: t('about.stats.yearsExperience.description'),
    },
  ]

  return (
    <section
      id="about"
      className="bg-muted/40 relative overflow-hidden px-4 py-24 sm:py-32"
    >
      {/* Subtle background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-cft-teal-primary/5 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-cft-navy-medium/5 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-20">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('about.title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            {t('about.description')}
          </p>
        </motion.div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              isLast={i === stats.length - 1}
            />
          ))}
        </div>

        {/* ── How We Do It — Vertical Timeline ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h3 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {t('about.howWeDoIt.title')}
            </h3>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm sm:text-base">
              {t('about.howWeDoIt.subtitle')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="bg-cft-teal-primary/20 absolute top-0 left-5 h-full w-px origin-top lg:left-1/2 lg:-translate-x-px"
            />

            <div className="space-y-10">
              {processSteps.map(({ phase, titleKey, descKey }, i) => {
                // odd index (1) = left side on desktop; even index (0,2) = right side
                const isLeft = i % 2 !== 0

                const cardContent = (
                  <div className="bg-card border-border/50 hover:border-cft-teal-primary/30 w-full rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:max-w-sm">
                    <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                      Step {phase}
                    </p>
                    <h4 className="mb-2 text-base font-bold">{t(titleKey)}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t(descKey)}
                    </p>
                  </div>
                )

                return (
                  <div key={phase} className="relative flex items-center gap-6">
                    {/* Left column — visible on desktop only when isLeft */}
                    <motion.div
                      initial={{ opacity: 0, x: -32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="hidden flex-1 justify-end lg:flex"
                    >
                      {isLeft ? cardContent : null}
                    </motion.div>

                    {/* Timeline node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.15 + 0.1,
                        type: 'spring',
                      }}
                      className="bg-cft-teal-primary relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-lg lg:mx-0"
                    >
                      <span className="text-sm font-bold text-white">
                        {phase}
                      </span>
                    </motion.div>

                    {/* Right column — desktop right side + full mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: 32 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="flex flex-1 justify-start lg:flex"
                    >
                      {/* On mobile always show; on desktop only when !isLeft */}
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

        {/* ── Industries — Horizontal scroll cards ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h3 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {t('about.industries.title')}
            </h3>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm sm:text-base">
              {t('about.industries.subtitle')}
            </p>
          </motion.div>

          {/* Staggered two-column grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map(
              ({ nameKey, descKey, Icon, iconColor, iconBg }, i) => (
                <motion.div
                  key={nameKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-card border-border/50 hover:border-cft-teal-primary/30 flex h-full items-start gap-3 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t(nameKey)}</p>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-snug">
                      {t(descKey)}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
