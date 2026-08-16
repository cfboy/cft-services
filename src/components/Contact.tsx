import { useForm } from '@tanstack/react-form'
import { motion, useReducedMotion } from 'framer-motion'
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

const WEBHOOK_URL = 'https://hook.us2.make.com/2ore7a8fy13c2jn02j2g0oqr041iqrha'

/**
 * Validation messages are translation keys, resolved at render time so the
 * error a visitor reads matches the language the form is displayed in.
 */
const contactSchema = z.object({
  name: z.string().min(2, 'contact.errors.name'),
  email: z.email('contact.errors.email'),
  phone: z
    .string()
    .min(7, 'contact.errors.phone')
    .max(20, 'contact.errors.phone')
    .regex(/^[\d+\-()\s]*$/, 'contact.errors.phone'),
  industry: z.string().min(1, 'contact.errors.industry'),
  message: z.string().min(10, 'contact.errors.message'),
})

type ContactForm = z.infer<typeof contactSchema>

/** Per-field validator so mistakes surface on blur, not only on submit. */
function fieldValidator(field: keyof ContactForm) {
  return ({ value }: { value: unknown }) => {
    const result = contactSchema.shape[field].safeParse(value)
    return result.success ? undefined : result.error.issues[0].message
  }
}

export function Contact() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()

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
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        })

        if (!response.ok) throw new Error(`Request failed: ${response.status}`)

        toast.success(t('contact.successMessage'))
        form.reset()
      } catch {
        // Never log submitted contact details to the console.
        toast.error(t('contact.errorMessage'))
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = contactSchema.safeParse(value)
        if (result.success) return

        const fieldErrors: Record<string, string> = {}
        for (const issue of result.error.issues) {
          const fieldName = issue.path[0] as string
          if (fieldName && !fieldErrors[fieldName]) {
            fieldErrors[fieldName] = issue.message
          }
        }

        // Move focus to the first problem so the fix is one keystroke away.
        const firstField = Object.keys(fieldErrors)[0]
        if (firstField) {
          requestAnimationFrame(() => {
            document.getElementById(firstField)?.focus()
          })
        }

        return { fields: fieldErrors }
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
    <section
      id="contact"
      className="px-4 py-24 sm:py-32"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            id="contact-title"
            className="font-display mb-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 sm:p-8">
              <form
                className="space-y-5"
                noValidate
                onSubmit={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
              >
                <div className="grid grid-cols-1 gap-5">
                  <form.Field
                    name="name"
                    validators={{ onBlur: fieldValidator('name') }}
                  >
                    {field => {
                      const error = field.state.meta.errors[0]
                      return (
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
                            autoComplete="name"
                            aria-invalid={error ? true : undefined}
                            aria-describedby={
                              error ? `${field.name}-error` : undefined
                            }
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            placeholder={t('contact.namePlaceholder')}
                          />
                          {error && (
                            <p
                              id={`${field.name}-error`}
                              role="alert"
                              className="text-destructive text-sm"
                            >
                              {t(String(error))}
                            </p>
                          )}
                        </div>
                      )
                    }}
                  </form.Field>
                  <form.Field
                    name="email"
                    validators={{ onBlur: fieldValidator('email') }}
                  >
                    {field => {
                      const error = field.state.meta.errors[0]
                      return (
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
                            autoComplete="email"
                            spellCheck={false}
                            aria-invalid={error ? true : undefined}
                            aria-describedby={
                              error ? `${field.name}-error` : undefined
                            }
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            placeholder={t('contact.emailPlaceholder')}
                          />
                          {error && (
                            <p
                              id={`${field.name}-error`}
                              role="alert"
                              className="text-destructive text-sm"
                            >
                              {t(String(error))}
                            </p>
                          )}
                        </div>
                      )
                    }}
                  </form.Field>
                  <form.Field
                    name="phone"
                    validators={{ onBlur: fieldValidator('phone') }}
                  >
                    {field => {
                      const error = field.state.meta.errors[0]
                      return (
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
                            autoComplete="tel"
                            inputMode="tel"
                            aria-invalid={error ? true : undefined}
                            aria-describedby={
                              error ? `${field.name}-error` : undefined
                            }
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            placeholder={t('contact.phonePlaceholder')}
                          />
                          {error && (
                            <p
                              id={`${field.name}-error`}
                              role="alert"
                              className="text-destructive text-sm"
                            >
                              {t(String(error))}
                            </p>
                          )}
                        </div>
                      )
                    }}
                  </form.Field>
                </div>
                <form.Field
                  name="industry"
                  validators={{ onBlur: fieldValidator('industry') }}
                >
                  {field => {
                    const error = field.state.meta.errors[0]
                    return (
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
                            aria-invalid={error ? true : undefined}
                            aria-describedby={
                              error ? `${field.name}-error` : undefined
                            }
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
                        {error && (
                          <p
                            id={`${field.name}-error`}
                            role="alert"
                            className="text-destructive text-sm"
                          >
                            {t(String(error))}
                          </p>
                        )}
                      </div>
                    )
                  }}
                </form.Field>
                <form.Field
                  name="message"
                  validators={{ onBlur: fieldValidator('message') }}
                >
                  {field => {
                    const error = field.state.meta.errors[0]
                    return (
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
                          aria-invalid={error ? true : undefined}
                          aria-describedby={
                            error ? `${field.name}-error` : undefined
                          }
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          placeholder={t('contact.messagePlaceholder')}
                        />
                        {error && (
                          <p
                            id={`${field.name}-error`}
                            role="alert"
                            className="text-destructive text-sm"
                          >
                            {t(String(error))}
                          </p>
                        )}
                      </div>
                    )
                  }}
                </form.Field>
                <div className="flex justify-end">
                  <form.Subscribe selector={state => state.isSubmitting}>
                    {isSubmitting => (
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        <Send aria-hidden="true" className="h-4 w-4" />
                        {isSubmitting
                          ? t('contact.sending')
                          : t('contact.send')}
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
