import { motion, useReducedMotion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

const CALENDLY_URL = 'https://calendly.com/cristianf-torres15/consulting'

export function FinalCTA() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="schedule" className="px-4 py-24 sm:py-32">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-border bg-muted/30 rounded-lg border px-8 py-16 text-center sm:px-16">
          <div className="flex flex-col items-center gap-6">
            <Calendar
              className="text-muted-foreground h-7 w-7"
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <div className="flex flex-col items-center gap-3">
              <h2 className="font-display text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                {t('finalCta.title')}
              </h2>
              <p className="text-muted-foreground max-w-xl text-lg">
                {t('finalCta.subtitle')}
              </p>
            </div>

            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="default"
                className="gap-2 font-semibold"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {t('finalCta.cta')}
              </Button>
            </a>

            <p className="text-muted-foreground text-sm">
              {t('finalCta.note')}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
