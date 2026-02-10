import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t('contact.name')}
                    </label>
                    <Input
                      id="name"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t('contact.email')}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="h-4 w-4" />
                  {t('contact.send')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
