import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarDays, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { Lang, ServiceKey } from '@/routes'

import { Contact } from '@/components/Contact'
import { KioskMockup } from '@/components/events/KioskMockup'
import { Breadcrumbs } from '@/components/services/Breadcrumbs'
import { ProjectVisual, RelatedWork } from '@/components/services/RelatedWork'
import { SERVICE_META } from '@/components/services/service-meta'
import { ServiceIndex } from '@/components/services/ServiceIndex'
import { buttonVariants } from '@/components/ui/button'
import { CONTACT } from '@/lib/site'
import { cn } from '@/lib/utils'

/** ease-out-quint */
const EASE = [0.22, 1, 0.36, 1] as const

type Item = { title: string; desc: string }
type Faq = { q: string; a: string }

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl"
    >
      {children}
    </h2>
  )
}

/**
 * One template for every service, in both languages. The content lives in
 * `src/i18n/services.{en,es}.json`; the structure is the same everywhere so
 * each page answers the questions a searcher has, in the order they have
 * them: what is it, what's included, is it for me, how does it work, what
 * have you built, what does it cost — then a way to start.
 */
export function ServicePage({
  service,
  lang,
}: {
  service: ServiceKey
  lang: Lang
}) {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const base = `servicePages.${service}`
  const c = (key: string) => t(`servicePages.common.${key}`)
  const { related } = SERVICE_META[service]

  const includes = t(`${base}.includes`, { returnObjects: true }) as Item[]
  const fit = t(`${base}.fit`, { returnObjects: true }) as string[]
  const process = t(`${base}.process`, { returnObjects: true }) as Item[]
  const faqs = t(`${base}.faqs`, { returnObjects: true }) as Faq[]

  const reveal = (delay = 0) => ({
    initial: prefersReduced ? (false as const) : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  })

  return (
    <>
      {/* ── Hero ── */}
      <section
        aria-labelledby="service-title"
        className="overflow-x-clip px-4 pt-32 pb-20 sm:pt-36 sm:pb-28"
      >
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs lang={lang} current={t(`${base}.name`)} />

          <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <motion.h1
                id="service-title"
                {...reveal(0.05)}
                className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-bold tracking-[-0.03em] text-balance"
              >
                {t(`${base}.h1`)}
              </motion.h1>
              <motion.p
                {...reveal(0.15)}
                className="text-muted-foreground mt-6 max-w-[58ch] text-lg leading-relaxed text-pretty"
              >
                {t(`${base}.lead`)}
              </motion.p>
              <motion.div
                {...reveal(0.25)}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#contact"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group w-full px-7 sm:w-auto'
                  )}
                >
                  {c('ctaPrimary')}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href={CONTACT.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'w-full px-6 sm:w-auto'
                  )}
                >
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  {c('ctaCall')}
                  <span className="sr-only">{t('a11y.opensInNewTab')}</span>
                </a>
              </motion.div>
              <motion.p
                {...reveal(0.35)}
                className="text-muted-foreground mt-8 font-mono text-xs"
              >
                {c('areaNote')}
              </motion.p>
            </div>

            <motion.div {...reveal(0.2)} className="lg:col-span-5">
              {service === 'events' ? (
                // Event tech keeps its Register B stage, even on a light page.
                <div
                  className="flex justify-center rounded-lg px-6 py-10"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 20%, #0E2440 0%, #0A1628 60%, #050B16 100%)',
                  }}
                >
                  <KioskMockup className="w-full max-w-[280px]" />
                </div>
              ) : (
                related[0] && (
                  <ProjectVisual
                    project={related[0]}
                    sizes="(min-width: 1024px) 460px, 100vw"
                    loading="eager"
                  />
                )
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section
        aria-labelledby="included-title"
        className="bg-muted/40 px-4 py-24 sm:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading id="included-title">
            {c('includedTitle')}
          </SectionHeading>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map(item => (
              <li key={item.title} className="border-border border-t pt-6">
                <h3 className="font-display flex items-baseline gap-3 text-lg font-semibold tracking-tight">
                  <span
                    aria-hidden="true"
                    className="bg-cft-mint-ink inline-block h-[3px] w-2.5 shrink-0 -translate-y-[4px]"
                  />
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2.5 leading-relaxed text-pretty">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Fit + process ── */}
      <section aria-labelledby="process-title" className="px-4 py-24 sm:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {c('fitTitle')}
            </h2>
            <ul className="border-border mt-8 border-b">
              {fit.map(line => (
                <li
                  key={line}
                  className="border-border border-t py-4 leading-relaxed"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <SectionHeading id="process-title">
              {c('processTitle')}
            </SectionHeading>
            <ol className="mt-8">
              {process.map((step, i) => (
                <li
                  key={step.title}
                  className="border-border grid grid-cols-[2.5rem_1fr] gap-x-4 border-t py-6"
                >
                  <span
                    aria-hidden="true"
                    className="text-foreground/55 pt-0.5 font-mono text-sm tabular-nums"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mt-1.5 leading-relaxed text-pretty">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Related work ── */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="border-border border-t px-4 py-24 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading id="related-title">
              {c('relatedTitle')}
            </SectionHeading>
            <div className="mt-12">
              <RelatedWork projects={related} />
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ — native <details>: keyboard-ready and in the DOM for crawlers ── */}
      <section
        aria-labelledby="faq-title"
        className="bg-muted/40 px-4 py-24 sm:py-28"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title">{c('faqTitle')}</SectionHeading>
          </div>
          <div className="border-border border-b lg:col-span-8">
            {faqs.map(faq => (
              <details
                key={faq.q}
                className="group border-border border-t [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="focus-visible:ring-ring flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm py-5 focus-visible:ring-2 focus-visible:outline-none">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {faq.q}
                  </h3>
                  <Plus
                    aria-hidden="true"
                    className="text-muted-foreground mt-1 h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="text-muted-foreground max-w-[65ch] pb-6 leading-relaxed text-pretty">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other services — internal links between service pages ── */}
      <section aria-labelledby="other-title" className="px-4 pt-24 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <h2
            id="other-title"
            className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {c('otherTitle')}
          </h2>
          <div className="mt-8">
            <ServiceIndex
              lang={lang}
              exclude={service}
              headingLevel="h3"
              compact
            />
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
