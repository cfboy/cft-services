import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe, Cloud, Lightbulb, Smartphone } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const icons = [Globe, Cloud, Lightbulb, Smartphone]
const keys = ['web', 'cloud', 'consulting', 'mobile'] as const

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
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
          <p className="mx-auto max-w-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="group h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cft-teal-primary/10 text-cft-teal-primary transition-colors group-hover:bg-cft-teal-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{t(`services.${key}.title`)}</CardTitle>
                    <CardDescription>{t(`services.${key}.description`)}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
