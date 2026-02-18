import { motion, useInView } from 'framer-motion'
import {
  Banknote,
  BookOpen,
  Building2,
  CheckCircle,
  Clock,
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
    Icon: Heart,
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-500/10',
  },
  {
    nameKey: 'about.industries.insurance.name',
    Icon: Shield,
    iconColor: 'text-cft-teal-primary',
    iconBg: 'bg-cft-teal-primary/10',
  },
  {
    nameKey: 'about.industries.hospitality.name',
    Icon: Utensils,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
  {
    nameKey: 'about.industries.finance.name',
    Icon: Banknote,
    iconColor: 'text-cft-navy-medium',
    iconBg: 'bg-cft-navy-medium/10',
  },
  {
    nameKey: 'about.industries.retail.name',
    Icon: ShoppingBag,
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-500/10',
  },
  {
    nameKey: 'about.industries.education.name',
    Icon: BookOpen,
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-500/10',
  },
  {
    nameKey: 'about.industries.legal.name',
    Icon: Scale,
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-500/10',
  },
  {
    nameKey: 'about.industries.realestate.name',
    Icon: Home,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-500/10',
  },
  {
    nameKey: 'about.industries.logistics.name',
    Icon: Truck,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-500/10',
  },
  {
    nameKey: 'about.industries.fitness.name',
    Icon: Dumbbell,
    iconColor: 'text-lime-500',
    iconBg: 'bg-lime-500/10',
  },
  {
    nameKey: 'about.industries.construction.name',
    Icon: Building2,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-500/10',
  },
  {
    nameKey: 'about.industries.government.name',
    Icon: Users,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
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

          {/* Marquee rows */}
          <div className="space-y-3 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Row 1 — scrolls left */}
            <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-3">
              {[...industries, ...industries].map(
                ({ nameKey, Icon, iconColor, iconBg }, i) => (
                  <div
                    key={`row1-${i}`}
                    className="bg-card border-border/50 flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-2.5 shadow-sm"
                  >
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                    </div>
                    <p className="text-sm font-semibold whitespace-nowrap">
                      {t(nameKey)}
                    </p>
                  </div>
                )
              )}
            </div>
            {/* Row 2 — scrolls right */}
            <div className="flex w-max animate-[marquee_25s_linear_infinite_reverse] gap-3">
              {[
                ...industries.slice(6),
                ...industries,
                ...industries.slice(0, 6),
              ].map(({ nameKey, Icon, iconColor, iconBg }, i) => (
                <div
                  key={`row2-${i}`}
                  className="bg-card border-border/50 flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-2.5 shadow-sm"
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap">
                    {t(nameKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
