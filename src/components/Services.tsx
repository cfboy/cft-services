import { motion } from 'framer-motion'
import { Check, Code2, Lightbulb, Monitor, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SECTION_ID = 'services'

const services = [
  {
    key: 'consulting',
    Icon: Lightbulb,
    gradient: 'from-cft-teal-primary to-cft-navy-medium',
    accentGradient: 'from-cft-teal-primary to-cft-navy-medium',
  },
  {
    key: 'websites',
    Icon: Monitor,
    gradient: 'from-cft-navy-medium to-cft-navy-deep',
    accentGradient: 'from-cft-navy-medium to-cft-navy-deep',
  },
  {
    key: 'webapps',
    Icon: Code2,
    gradient: 'from-cft-teal-primary to-cft-teal-light',
    accentGradient: 'from-cft-teal-primary to-cft-teal-light',
  },
  {
    key: 'automation',
    Icon: Zap,
    gradient: 'from-cft-navy-deep to-cft-teal-primary',
    accentGradient: 'from-cft-navy-deep to-cft-teal-primary',
  },
] as const

function ServiceCard({
  serviceKey,
  Icon,
  gradient,
  accentGradient,
  index,
}: {
  serviceKey: string
  Icon: React.ComponentType<{ className?: string }>
  gradient: string
  accentGradient: string
  index: number
}) {
  const { t } = useTranslation()
  const features = t(`services.${serviceKey}.features`, {
    returnObjects: true,
  }) as string[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-card border-border/60 hover:border-cft-teal-primary/30 group flex flex-col overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-linear-to-r ${accentGradient}`} />

      <div className="flex flex-1 flex-col p-6">
        {/* Top section — grows to push divider down */}
        <div className="flex flex-1 flex-col">
          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 3, delay: index * 0.4 }}
            className={`mb-5 inline-flex h-13 w-13 items-center justify-center rounded-xl bg-linear-to-br ${gradient} shadow-md`}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="mb-2 text-lg leading-tight font-bold">
            {t(`services.${serviceKey}.title`)}
          </h3>

          {/* Description — grows to fill remaining space */}
          <p className="text-muted-foreground grow text-sm leading-relaxed">
            {t(`services.${serviceKey}.description`)}
          </p>
        </div>

        {/* Divider — always at the same level per row */}
        <div className="border-border/50 mt-5 mb-4 border-t" />

        {/* Features list */}
        <ul className="space-y-2">
          {Array.isArray(features) &&
            features.map(feature => (
              <li key={feature} className="flex items-center gap-2">
                <span className="bg-cft-teal-primary/10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <Check
                    className="text-cft-teal-primary h-3 w-3"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function Services() {
  const { t } = useTranslation()

  return (
    <section
      id={SECTION_ID}
      className="relative overflow-hidden px-4 py-24 sm:py-32"
    >
      {/* Decorative background blob */}
      <div className="bg-cft-teal-primary/5 pointer-events-none absolute -top-32 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full blur-3xl" />

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
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ key, Icon, gradient, accentGradient }, i) => (
            <ServiceCard
              key={key}
              serviceKey={key}
              Icon={Icon}
              gradient={gradient}
              accentGradient={accentGradient}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
