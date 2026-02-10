import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function About() {
  const { t } = useTranslation()

  const stats = [
    { label: t('about.stat1Label'), value: t('about.stat1Value') },
    { label: t('about.stat2Label'), value: t('about.stat2Value') },
    { label: t('about.stat3Label'), value: t('about.stat3Value') },
  ]

  return (
    <section id="about" className="bg-muted/40 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t('about.title')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-cft-teal-primary text-3xl font-bold sm:text-4xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-1 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
