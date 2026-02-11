import { motion, useInView, type MotionProps } from 'framer-motion'
import {
  Banknote,
  CheckCircle,
  Clock,
  Code,
  Heart,
  Shield,
  Users,
  Utensils,
  ArrowRight,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

type StatType = {
  label: string
  value: number
  suffix: string
  Icon: React.ComponentType<{ className?: string }>
  color: string
  description: string
}

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

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isInView])

  return { count, ref }
}

function ProcessCard({
  phaseNumber,
  titleKey,
  descriptionKey,
  animationProps,
}: {
  phaseNumber: number
  titleKey: string
  descriptionKey: string
  animationProps: Pick<
    MotionProps,
    'initial' | 'whileInView' | 'viewport' | 'transition'
  >
}) {
  const { t } = useTranslation()

  return (
    <motion.div
      {...animationProps}
      className="flex max-w-xs flex-col items-center text-center"
    >
      <div className="bg-card border-border/50 hover:border-cft-teal-primary/30 flex h-80 w-full flex-col items-center justify-center rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="bg-cft-teal-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow-lg sm:h-14 sm:w-14">
          <span className="text-lg font-bold text-white sm:text-xl">
            {phaseNumber}
          </span>
        </div>
        <h4 className="mb-3 text-lg font-semibold sm:text-xl">{t(titleKey)}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
          {t(descriptionKey)}
        </p>
      </div>
    </motion.div>
  )
}

function StatCard({ stat, index }: { stat: StatType; index: number }) {
  const { count, ref } = useCounter(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="bg-card border-border/50 relative flex flex-col justify-center overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      {/* Gradient background on hover */}
      <div
        className={`bg-linear-to-br ${stat.color} absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />

      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.7 + index * 0.1,
            type: 'spring',
          }}
          className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${stat.color} shadow-lg sm:mb-4 sm:h-12 sm:w-12`}
        >
          <stat.Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </motion.div>

        <div className="space-y-1 sm:space-y-2">
          <div
            ref={ref}
            className="text-cft-teal-primary text-2xl font-bold sm:text-3xl xl:text-4xl"
          >
            {count}
            {stat.suffix}
          </div>
          <div className="text-foreground text-sm font-semibold sm:text-base">
            {stat.label}
          </div>
          <div className="text-muted-foreground text-xs sm:text-sm">
            {stat.description}
          </div>
        </div>
      </div>

      {/* Subtle shine effect */}
      <motion.div
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
      />
    </motion.div>
  )
}

export function About() {
  const { t } = useTranslation()

  const stats = [
    {
      label: t('about.stats.projectsCompleted.label'),
      value: 50,
      suffix: '+',
      Icon: CheckCircle,
      color: 'from-cft-teal-primary to-cft-teal-secondary',
      description: t('about.stats.projectsCompleted.description'),
    },
    {
      label: t('about.stats.satisfiedClients.label'),
      value: 35,
      suffix: '+',
      Icon: Users,
      color: 'from-cft-navy-medium to-cft-navy-deep',
      description: t('about.stats.satisfiedClients.description'),
    },
    {
      label: t('about.stats.technologies.label'),
      value: 25,
      suffix: '+',
      Icon: Code,
      color: 'from-cft-teal-primary to-cft-navy-medium',
      description: t('about.stats.technologies.description'),
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
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="bg-cft-teal-primary/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="bg-cft-navy-medium/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="bg-cft-teal-primary/3 absolute top-1/4 left-1/4 h-40 w-40 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 0.8, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="bg-cft-navy-deep/4 absolute right-1/4 bottom-1/4 h-60 w-60 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="bg-cft-teal-primary/2 absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Main About Section */}
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {t('about.title')}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                {t('about.description')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:gap-8"
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>

        {/* How We Do It Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="mb-8 text-center sm:mb-12">
            <h3 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t('about.howWeDoIt.title')}
            </h3>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              {t('about.howWeDoIt.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Process Flow Layout */}
            <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-4 xl:gap-6">
              {/* Phase 1 */}
              <ProcessCard
                phaseNumber={1}
                titleKey="about.howWeDoIt.assessment.title"
                descriptionKey="about.howWeDoIt.assessment.description"
                animationProps={{
                  initial: { opacity: 0, x: -30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: 0.1 },
                }}
              />

              {/* Arrow 1-2 (Desktop) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="hidden lg:block"
              >
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.7,
                  }}
                >
                  <ArrowRight className="text-cft-teal-primary h-6 w-6 sm:h-8 sm:w-8" />
                </motion.div>
              </motion.div>

              {/* Arrow 1-2 (Mobile) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="lg:hidden"
              >
                <motion.div
                  animate={{
                    y: [0, 3, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.7,
                  }}
                >
                  <ArrowRight className="text-cft-teal-primary h-5 w-5 rotate-90 sm:h-6 sm:w-6" />
                </motion.div>
              </motion.div>

              {/* Phase 2 */}
              <ProcessCard
                phaseNumber={2}
                titleKey="about.howWeDoIt.recommendations.title"
                descriptionKey="about.howWeDoIt.recommendations.description"
                animationProps={{
                  initial: { opacity: 0, y: 30 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: 0.2 },
                }}
              />

              {/* Arrow 2-3 (Desktop) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="hidden lg:block"
              >
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  }}
                >
                  <ArrowRight className="text-cft-teal-primary h-6 w-6 sm:h-8 sm:w-8" />
                </motion.div>
              </motion.div>

              {/* Arrow 2-3 (Mobile) */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="lg:hidden"
              >
                <motion.div
                  animate={{
                    y: [0, 3, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  }}
                >
                  <ArrowRight className="text-cft-teal-primary h-5 w-5 rotate-90 sm:h-6 sm:w-6" />
                </motion.div>
              </motion.div>

              {/* Phase 3 */}
              <ProcessCard
                phaseNumber={3}
                titleKey="about.howWeDoIt.implementation.title"
                descriptionKey="about.howWeDoIt.implementation.description"
                animationProps={{
                  initial: { opacity: 0, x: 30 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: 0.3 },
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Industries Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 text-center sm:mb-12">
            <h3 className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {t('about.industries.title')}
            </h3>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
              {t('about.industries.subtitle')}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
            {[
              {
                name: t('about.industries.healthcare.name'),
                Icon: Heart,
                description: t('about.industries.healthcare.description'),
              },
              {
                name: t('about.industries.insurance.name'),
                Icon: Shield,
                description: t('about.industries.insurance.description'),
              },
              {
                name: t('about.industries.hospitality.name'),
                Icon: Utensils,
                description: t('about.industries.hospitality.description'),
              },
              {
                name: t('about.industries.finance.name'),
                Icon: Banknote,
                description: t('about.industries.finance.description'),
              },
            ].map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-card border-border/50 hover:border-cft-teal-primary/30 flex h-[200px] flex-col justify-center rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg sm:h-[220px]"
              >
                <div className="bg-cft-teal-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl sm:mb-4 sm:h-12 sm:w-12">
                  <industry.Icon className="text-cft-teal-primary h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h4 className="mb-2 text-base font-semibold sm:text-lg">
                  {industry.name}
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
