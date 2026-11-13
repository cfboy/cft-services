import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  GitBranch,
  Lightbulb,
  Monitor,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useRoute } from '@/hooks/use-route'
import { servicePath, servicesPath } from '@/routes'

const SECTION_ID = 'services'

/** ease-out-quint */
const EASE = [0.22, 1, 0.36, 1] as const

const services = [
  { key: 'consulting', Icon: Lightbulb },
  { key: 'websites', Icon: Monitor },
  { key: 'webapps', Icon: Code2 },
  { key: 'automation', Icon: Zap },
  { key: 'crm', Icon: GitBranch },
] as const

/**
 * A ruled index, not a carousel of identical cards: every service is visible
 * at once, and each row reads left to right — what it is, why it matters,
 * what's included.
 */
export function Services() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const { lang } = useRoute()

  return (
    <section
      id={SECTION_ID}
      className="bg-muted/40 px-4 py-24 sm:py-32"
      aria-labelledby="services-title"
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
            id="services-title"
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:col-span-7"
          >
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground max-w-md leading-relaxed lg:col-span-5 lg:justify-self-end">
            {t('services.subtitle')}
          </p>
        </motion.header>

        <ol className="border-border mt-14 border-b sm:mt-16">
          {services.map(({ key, Icon }, i) => {
            const features = t(`services.${key}.features`, {
              returnObjects: true,
            }) as string[]

            return (
              <motion.li
                key={key}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="group border-border has-focus-visible:ring-ring relative grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-4 rounded-sm border-t py-8 has-focus-visible:ring-2 sm:py-10 lg:grid-cols-12 lg:gap-x-8"
              >
                <span
                  aria-hidden="true"
                  className="text-foreground/55 pt-1.5 font-mono text-sm tabular-nums lg:col-span-1"
                >
                  {String(i + 1).padStart(2, '0')} /
                </span>

                <div className="lg:col-span-4">
                  <h3 className="font-display flex items-center gap-3 text-2xl leading-tight font-semibold tracking-tight sm:text-[1.75rem]">
                    {/* Stretched over the row: the whole service is one link */}
                    <a
                      href={servicePath(key, lang)}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {t(`services.${key}.title`)}
                    </a>
                    {/* Cursor appears on hover — the brand mark, as state */}
                    <span
                      aria-hidden="true"
                      className="bg-cft-mint-ink inline-block h-[0.14em] w-[0.45em] translate-y-[0.32em] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </h3>
                </div>

                <p className="text-muted-foreground col-start-2 max-w-[56ch] leading-relaxed text-pretty lg:col-span-4 lg:col-start-auto">
                  {t(`services.${key}.description`)}
                </p>

                <div className="col-start-2 lg:col-span-3 lg:col-start-auto">
                  <Icon
                    aria-hidden="true"
                    className="text-muted-foreground mb-3 hidden h-5 w-5 lg:block"
                    strokeWidth={1.5}
                  />
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5 lg:flex-col">
                    {Array.isArray(features) &&
                      features.map(feature => (
                        <li
                          key={feature}
                          className="text-foreground/75 font-mono text-xs"
                        >
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>

        <a
          href={servicesPath(lang)}
          className="group/all focus-visible:ring-ring mt-8 inline-flex items-center gap-2 rounded-sm text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="decoration-cft-mint-ink underline decoration-2 underline-offset-[6px]">
            {t('services.allServices')}
          </span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover/all:translate-x-1"
          />
        </a>
      </div>
    </section>
  )
}
