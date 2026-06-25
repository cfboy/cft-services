import { motion, useReducedMotion } from 'framer-motion'
import { Check, Code2, GitBranch, Lightbulb, Monitor, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useDragScroll } from '@/hooks/use-drag-scroll'

const SECTION_ID = 'services'

const services = [
  { key: 'consulting', Icon: Lightbulb, number: '01' },
  { key: 'websites', Icon: Monitor, number: '02' },
  { key: 'webapps', Icon: Code2, number: '03' },
  { key: 'automation', Icon: Zap, number: '04' },
  { key: 'crm', Icon: GitBranch, number: '05' },
]

function ServiceCard({
  serviceKey,
  Icon,
  number,
  index,
}: {
  serviceKey: string
  Icon: React.ComponentType<{
    className?: string
    strokeWidth?: number
    'aria-hidden'?: boolean | 'true' | 'false'
  }>
  number: string
  index: number
}) {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const features = t(`services.${serviceKey}.features`, {
    returnObjects: true,
  }) as string[]

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="bg-card border-border/50 hover:border-border group relative my-2 flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border transition-[border-color] duration-300 md:w-80"
    >
      {/* Card header: number index + icon */}
      <div className="flex items-start justify-between p-6 pb-4">
        <span className="font-display text-muted-foreground/30 text-2xl leading-none font-semibold tabular-nums">
          {number}
        </span>
        <Icon
          aria-hidden="true"
          className="text-muted-foreground/50 group-hover:text-muted-foreground h-5 w-5 transition-colors duration-200"
          strokeWidth={1.5}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6">
        <h3 className="font-display mb-2 text-lg leading-tight font-semibold">
          {t(`services.${serviceKey}.title`)}
        </h3>
        <p className="text-muted-foreground mb-5 grow text-sm leading-relaxed">
          {t(`services.${serviceKey}.description`)}
        </p>

        {/* Divider */}
        <div className="border-border/40 mb-4 border-t" />

        {/* Features */}
        <ul className="space-y-2">
          {Array.isArray(features) &&
            features.map(feature => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check
                  aria-hidden="true"
                  className="text-muted-foreground/60 mt-0.5 h-3.5 w-3.5 shrink-0"
                  strokeWidth={2}
                />
                <span className="text-muted-foreground text-sm">{feature}</span>
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function Services() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  const { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDragScroll<HTMLDivElement>()

  return (
    <section
      id={SECTION_ID}
      className="relative overflow-x-clip px-4 py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Header — flush left per Register A asymmetric layout */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="font-display mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground max-w-lg">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Horizontal scroll with drag */}
        <div
          ref={ref}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          <ScrollArea className="w-full">
            <div className="flex cursor-grab gap-5 pb-4 select-none">
              {services.map(({ key, Icon, number }, i) => (
                <ServiceCard
                  key={key}
                  serviceKey={key}
                  Icon={Icon}
                  number={number}
                  index={i}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  )
}
