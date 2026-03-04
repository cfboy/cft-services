import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

const CALENDLY_URL = 'https://calendly.com/cristianf-torres15/consulting'

export function FinalCTA() {
  const { t } = useTranslation()

  return (
    <section id="schedule" className="px-4 py-24 sm:py-32">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-border bg-muted/40 relative overflow-hidden rounded-2xl border px-8 py-16 text-center sm:px-16">
          {/* Decorative background blobs */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full">
              <Calendar className="text-primary h-7 w-7" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
                {t('finalCta.title')}
              </h2>
              <p className="text-muted-foreground max-w-xl text-lg">
                {t('finalCta.subtitle')}
              </p>
            </div>

            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="default" className="gap-2 font-semibold">
                <Calendar className="h-4 w-4" />
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
