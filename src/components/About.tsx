import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/** ease-out-quint */
const EASE = [0.22, 1, 0.36, 1] as const

/** Figures live in i18n (`about.stats.*.value`) so they change without code. */
const STATS = [
  'projectsCompleted',
  'satisfiedClients',
  'yearsExperience',
] as const

const STEPS = ['assessment', 'recommendations', 'implementation'] as const

const INDUSTRIES = [
  'healthcare',
  'education',
  'construction',
  'hospitality',
  'finance',
  'insurance',
  'retail',
  'realestate',
  'legal',
  'logistics',
  'fitness',
  'government',
] as const

export function About() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()

  const reveal = (delay = 0) => ({
    initial: prefersReduced ? (false as const) : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay, ease: EASE },
  })

  return (
    <section
      id="about"
      className="px-4 py-24 sm:py-32"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Statement ── */}
        <motion.div
          {...reveal()}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <h2
            id="about-title"
            className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:col-span-6"
          >
            {t('about.title')}
          </h2>
          <p className="text-muted-foreground max-w-[60ch] text-lg leading-relaxed text-pretty lg:col-span-6 lg:pt-2">
            {t('about.description')}
          </p>
        </motion.div>

        {/* ── Figures — ruled, not carded ── */}
        <dl className="border-border mt-16 grid grid-cols-1 border-y sm:mt-20 sm:grid-cols-3">
          {STATS.map((id, i) => (
            <motion.div
              key={id}
              {...reveal(i * 0.08)}
              className="border-border flex flex-col gap-1 py-8 not-first:border-t sm:px-8 sm:not-first:border-t-0 sm:not-first:border-l sm:first:pl-0"
            >
              <dt className="order-2 text-sm font-semibold">
                {t(`about.stats.${id}.label`)}
              </dt>
              <dd className="font-display order-1 text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">
                {t(`about.stats.${id}.value`)}
              </dd>
              <dd className="text-muted-foreground order-3 text-sm leading-relaxed">
                {t(`about.stats.${id}.description`)}
              </dd>
            </motion.div>
          ))}
        </dl>

        {/* ── Process — a real sequence, so it earns its numbers ── */}
        <div className="mt-24 sm:mt-32">
          <motion.div {...reveal()} className="max-w-xl">
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {t('about.howWeDoIt.title')}
            </h3>
            <p className="text-muted-foreground mt-2">
              {t('about.howWeDoIt.subtitle')}
            </p>
          </motion.div>

          <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.li
                key={step}
                {...reveal(i * 0.1)}
                className="border-foreground/80 relative border-t pt-6"
              >
                <span
                  aria-hidden="true"
                  className="text-foreground/55 font-mono text-sm tabular-nums"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display mt-4 text-xl font-semibold tracking-tight">
                  {t(`about.howWeDoIt.${step}.title`)}
                </h4>
                <p className="text-muted-foreground mt-3 leading-relaxed text-pretty">
                  {t(`about.howWeDoIt.${step}.description`)}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ── Industries — set as type ── */}
        <motion.div {...reveal()} className="mt-24 sm:mt-32">
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {t('about.industries.title')}
          </h3>
          <ul className="font-display mt-8 flex max-w-5xl flex-wrap items-baseline gap-x-3 gap-y-2 text-2xl font-medium tracking-tight sm:text-3xl">
            {INDUSTRIES.map((key, i) => (
              <li
                key={key}
                className="text-foreground/80 flex items-baseline gap-3"
              >
                {t(`about.industries.${key}.name`)}
                {i < INDUSTRIES.length - 1 && (
                  <span aria-hidden="true" className="text-cft-mint-ink">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
