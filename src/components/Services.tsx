import { motion } from 'framer-motion'
import { Check, Code2, GitBranch, Lightbulb, Monitor, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useDragScroll } from '@/hooks/use-drag-scroll'

const SECTION_ID = 'services'

const services = [
  {
    key: 'consulting',
    Icon: Lightbulb,
    gradient: 'from-cft-teal-primary to-cft-navy-medium',
    bg: 'from-cft-teal-primary/10 to-cft-navy-medium/10',
    border: 'hover:border-cft-teal-primary/40',
    number: '01',
  },
  {
    key: 'websites',
    Icon: Monitor,
    gradient: 'from-cft-navy-medium to-cft-navy-deep',
    bg: 'from-cft-navy-medium/10 to-cft-navy-deep/10',
    border: 'hover:border-cft-navy-medium/40',
    number: '02',
  },
  {
    key: 'webapps',
    Icon: Code2,
    gradient: 'from-cft-teal-primary to-cft-teal-light',
    bg: 'from-cft-teal-primary/10 to-cft-teal-light/10',
    border: 'hover:border-cft-teal-primary/40',
    number: '03',
  },
  {
    key: 'automation',
    Icon: Zap,
    gradient: 'from-cft-navy-deep to-cft-teal-primary',
    bg: 'from-cft-navy-deep/10 to-cft-teal-primary/10',
    border: 'hover:border-cft-teal-primary/40',
    number: '04',
  },
  {
    key: 'crm',
    Icon: GitBranch,
    gradient: 'from-violet-500 to-purple-700',
    bg: 'from-violet-500/10 to-purple-700/10',
    border: 'hover:border-violet-400/40',
    number: '05',
  },
]

function ServiceCard({
  serviceKey,
  Icon,
  gradient,
  bg,
  border,
  index,
}: {
  serviceKey: string
  Icon: React.ComponentType<{ className?: string }>
  gradient: string
  bg: string
  border: string
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
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`bg-card border-border/50 my-2 ${border} group relative flex shrink-0 flex-col overflow-hidden rounded-3xl border shadow-sm transition-[border-color,box-shadow] duration-300 hover:shadow-xl md:w-80`}
    >
      {/* Gradient icon area */}
      <div
        className={`bg-linear-to-br ${bg} relative flex h-32 items-end p-6 md:h-40`}
      >
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${gradient} shadow-lg`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg leading-tight font-bold">
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
              <li key={feature} className="flex items-center gap-2.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${gradient}`}
                >
                  <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
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
  const { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDragScroll<HTMLDivElement>()

  return (
    <section
      id={SECTION_ID}
      className="relative overflow-x-clip px-4 py-24 sm:py-32"
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
              {services.map(({ key, Icon, gradient, bg, border }, i) => (
                <ServiceCard
                  key={key}
                  serviceKey={key}
                  Icon={Icon}
                  gradient={gradient}
                  bg={bg}
                  border={border}
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
