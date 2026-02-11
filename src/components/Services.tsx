import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Lightbulb, Monitor, Zap } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SECTION_ID = 'services'

const services = [
  {
    key: 'consulting',
    Icon: Lightbulb,
    color: 'from-cft-navy-medium to-cft-navy-deep',
  },
  {
    key: 'websites',
    Icon: Monitor,
    color: 'from-cft-navy-medium to-cft-navy-deep',
  },
  {
    key: 'webapps',
    Icon: Code2,
    color: 'from-cft-navy-medium to-cft-navy-deep',
  },
  {
    key: 'automation',
    Icon: Zap,
    color: 'from-cft-navy-medium to-cft-navy-deep',
  },
] as const

export function Services() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)

  const activeService = services[active]

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
          className="mb-16 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-12">
          {/* Tab list */}
          <div className="flex flex-col gap-3">
            {services.map(({ key, Icon, color }, i) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setActive(i)}
                className={`group relative flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                  active === i
                    ? 'border-cft-teal-primary/40 bg-cft-teal-primary/5 shadow-md'
                    : 'border-border hover:border-cft-teal-primary/20 hover:bg-muted/50'
                }`}
              >
                {/* Active indicator bar */}
                {active === i && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="bg-cft-teal-primary absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full"
                  />
                )}

                <motion.div
                  animate={active === i ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${color} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </motion.div>

                <div>
                  <p
                    className={`leading-tight font-semibold transition-colors ${active === i ? 'text-cft-teal-primary' : ''}`}
                  >
                    {t(`services.${key}.title`)}
                  </p>
                  <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                    {t(`services.${key}.description`)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="border-border bg-card rounded-2xl border p-8 shadow-sm"
              >
                {/* Large icon */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${activeService.color} shadow-lg`}
                >
                  <activeService.Icon className="h-8 w-8 text-white" />
                </motion.div>

                <h3 className="mb-3 text-2xl font-bold">
                  {t(`services.${activeService.key}.title`)}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {t(`services.${activeService.key}.description`)}
                </p>

                {/* Dot navigation */}
                <div className="mt-8 flex gap-2">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        active === i
                          ? 'bg-cft-teal-primary w-6'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/60 w-2'
                      }`}
                      aria-label={`Go to service ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
