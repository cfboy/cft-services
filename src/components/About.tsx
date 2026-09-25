import { motion, useReducedMotion } from 'framer-motion'
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
import { useTranslation } from 'react-i18next'

type Proof = {
  id: 'reporting' | 'entry' | 'years'
  value: string
  label: string
  description: string
}

/**
 * Named outcomes from shipped work instead of generic counters. The figure is
 * the one key datum the brand allows in mint (`cft-mint-ink`).
 */
function ProofCard({ proof, index }: { proof: Proof; index: number }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.li
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="border-border/60 flex flex-col border-t pt-6"
    >
      <span
        data-tabular
        className="font-display text-cft-mint-ink mb-3 text-4xl leading-none font-bold tracking-tight sm:text-5xl"
      >
        {proof.value}
      </span>
      <span className="font-display text-foreground mb-2 text-base font-semibold">
        {proof.label}
      </span>
      <span className="text-muted-foreground text-sm leading-relaxed">
        {proof.description}
      </span>
    </motion.li>
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

  const proof: Proof[] = (['reporting', 'entry', 'years'] as const).map(id => ({
    id,
    value: t(`about.proof.${id}.value`),
    label: t(`about.proof.${id}.label`),
    description: t(`about.proof.${id}.description`),
  }))

  return (
    <section
      id="about"
      // overflow-x-clip: the timeline cards enter from a 32px x-offset, which
      // would otherwise let the whole page scroll sideways on narrow screens.
      className="bg-muted/40 overflow-x-clip px-4 py-24 sm:py-32"
      aria-labelledby="about-title"
    >
      <div className="mx-auto max-w-6xl space-y-20">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="about-title"
            className="font-display mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t('about.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
            {t('about.description')}
          </p>
        </motion.div>

        {/* ── Proof — named outcomes from shipped work ── */}
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {proof.map((item, i) => (
            <ProofCard key={item.id} proof={item} index={i} />
          ))}
        </ul>

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

            <ol className="space-y-10">
              {processSteps.map(({ phase, titleKey, descKey }, i) => {
                // Alternate sides at lg by reversing the row, so each card
                // exists once in the DOM instead of being rendered twice and
                // hidden — no duplicated copy for crawlers or screen readers.
                const isLeft = i % 2 !== 0

                return (
                  <li
                    key={phase}
                    className={`relative flex items-center gap-6 ${
                      isLeft ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Balancing column so the node stays on the centre line */}
                    <div
                      aria-hidden="true"
                      className="hidden flex-1 lg:block"
                    />

                    {/* Timeline node — restrained circle */}
                    <motion.div
                      aria-hidden="true"
                      initial={{ scale: prefersReduced ? 1 : 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.15 + 0.1,
                        type: 'spring',
                      }}
                      className="border-border bg-background relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2"
                    >
                      <span className="text-muted-foreground font-mono text-xs tabular-nums">
                        {phase}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: prefersReduced ? 0 : isLeft ? -32 : 32,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className={`flex flex-1 ${
                        isLeft ? 'lg:justify-end' : 'justify-start'
                      }`}
                    >
                      <div className="border-border/50 hover:border-border w-full rounded-lg border p-6 transition-[border-color] duration-300 lg:max-w-sm">
                        <h4 className="font-display mb-2 text-base font-semibold">
                          {t(titleKey)}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(descKey)}
                        </p>
                      </div>
                    </motion.div>
                  </li>
                )
              })}
            </ol>
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

          {/* Assistive tech reads the list once; the marquee below repeats each
              item to loop seamlessly, so it is presentational only. */}
          <ul className="sr-only">
            {industries.map(({ nameKey }) => (
              <li key={nameKey}>{t(nameKey)}</li>
            ))}
          </ul>

          {/* Marquee — items duplicated for a seamless loop; slot prefix keeps keys unique */}
          <div
            aria-hidden="true"
            className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-1"
          >
            <div className="pause-on-hover flex w-max gap-3 motion-safe:animate-[marquee_30s_linear_infinite]">
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
          </div>
        </div>
      </div>
    </section>
  )
}
