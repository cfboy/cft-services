import { useForm } from '@tanstack/react-form'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(20, 'Phone number must be at most 20 digits')
    .regex(/^[\d+\-()\s]*$/, 'Please enter a valid phone number'),
  industry: z.string().min(1, 'Please select an industry'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

export function Contact() {
  const { t } = useTranslation()

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      industry: '',
      message: '',
    } as ContactForm,
    onSubmit: async ({ value }) => {
      try {
        const webhookUrl =
          'https://hook.us2.make.com/2ore7a8fy13c2jn02j2g0oqr041iqrha'

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        console.log('Form submitted successfully:', value)

        // Show success toast
        toast.success(t('contact.successMessage', 'Message sent successfully!'))

        // Reset form after successful submission
        form.reset()
      } catch (error) {
        console.error('Error submitting form:', error)

        // Show error toast
        toast.error(
          t('contact.errorMessage', 'Failed to send message. Please try again.')
        )
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = contactSchema.safeParse(value)
        if (!result.success) {
          const fieldErrors: Record<string, string> = {}
          for (const issue of result.error.issues) {
            const fieldName = issue.path[0] as string
            if (fieldName && !fieldErrors[fieldName]) {
              fieldErrors[fieldName] = issue.message
            }
          }
          return {
            fields: fieldErrors,
          }
        }
        return
      },
    },
  })

  const industries = [
    { value: 'technology', label: t('contact.industries.technology') },
    { value: 'finance', label: t('contact.industries.finance') },
    { value: 'healthcare', label: t('contact.industries.healthcare') },
    { value: 'retail', label: t('contact.industries.retail') },
    { value: 'manufacturing', label: t('contact.industries.manufacturing') },
    { value: 'education', label: t('contact.industries.education') },
    { value: 'other', label: t('contact.industries.other') },
  ]

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
              <form
                className="space-y-5"
                onSubmit={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
              >
                <div className="grid grid-cols-1 gap-5">
                  <form.Field
                    name="name"
                    children={field => (
                      <div className="space-y-2">
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium"
                        >
                          {t('contact.name')}
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          placeholder={t('contact.namePlaceholder')}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-destructive text-sm">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <form.Field
                    name="email"
                    children={field => (
                      <div className="space-y-2">
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium"
                        >
                          {t('contact.email')}
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          placeholder={t('contact.emailPlaceholder')}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-destructive text-sm">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <form.Field
                    name="phone"
                    children={field => (
                      <div className="space-y-2">
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium"
                        >
                          {t('contact.phone')}
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="tel"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          placeholder={t('contact.phonePlaceholder')}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-destructive text-sm">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
                <form.Field
                  name="industry"
                  children={field => (
                    <div className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        {t('contact.industry')}
                      </label>
                      <Select
                        value={field.state.value}
                        onValueChange={value => field.handleChange(value)}
                      >
                        <SelectTrigger
                          id={field.name}
                          name={field.name}
                          onBlur={field.handleBlur}
                        >
                          <SelectValue
                            placeholder={t('contact.industryPlaceholder')}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map(industry => (
                            <SelectItem
                              key={industry.value}
                              value={industry.value}
                            >
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-destructive text-sm">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                />
                <form.Field
                  name="message"
                  children={field => (
                    <div className="space-y-2">
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium"
                      >
                        {t('contact.message')}
                      </label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        rows={5}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        placeholder={t('contact.messagePlaceholder')}
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-destructive text-sm">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                />
                <div className="flex justify-end">
                  <form.Subscribe>
                    {state => (
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto"
                        disabled={Boolean(state.isSubmitting)}
                      >
                        <Send className="h-4 w-4" />
                        {state.isSubmitting ? 'Sending...' : t('contact.send')}
                      </Button>
                    )}
                  </form.Subscribe>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
