import { useForm } from '@tanstack/react-form'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Calendar, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
const CALENDLY_URL = 'https://calendly.com/cristianf-torres15/consulting'
const CONTACT_EMAIL = 'cristianf.torres15@gmail.com'

/**
 * Dispatched by section CTAs (e.g. Events → "Plan your booth") to preselect
 * the industry before the visitor lands on the form. Without JS the link
 * still scrolls to #contact; the preselect is an enhancement.
 */
export const CONTACT_TOPIC_EVENT = 'cft:contact-topic'

// eslint-disable-next-line react-refresh/only-export-components
export function preselectContactTopic(industry: string) {
  window.dispatchEvent(
    new CustomEvent(CONTACT_TOPIC_EVENT, { detail: industry })
  )
}

/**
 * Validation messages are translation keys, resolved at render time so the
 * error a visitor reads matches the language the form is displayed in.
 */
const contactSchema = z.object({
  name: z.string().min(2, 'contact.errors.name'),
  email: z.email('contact.errors.email'),
  // Optional. When given: 7+ digits of a real number, with an optional
  // extension ("x123", "ext. 123") so office lines are not rejected.
  phone: z.union([
    z.literal(''),
    z
      .string()
      .trim()
      .max(30, 'contact.errors.phone')
      .regex(
        /^\+?[\d\s().-]{7,20}(\s*(x|ext\.?)\s*\d{1,6})?$/i,
        'contact.errors.phone'
      ),
  ]),
  industry: z.string(),
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

function OptionalMark() {
  const { t } = useTranslation()
  return (
    <span className="text-muted-foreground ml-1.5 font-mono text-xs font-normal tracking-wide lowercase">
      ({t('contact.optional')})
    </span>
  )
}

export function Contact() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()
  // The address the visitor gave, kept after the form resets so the success
  // panel can say exactly where the reply is going.
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [sendFailed, setSendFailed] = useState(false)
  const successRef = useRef<HTMLHeadingElement>(null)

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

        setSendFailed(false)
        setSentTo(value.email)
        form.reset()
      } catch {
        // Never log submitted contact details to the console. The fields keep
        // their values so nothing the visitor wrote is lost.
        setSendFailed(true)
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

  // Section CTAs preselect a topic (Events → "Events & Conventions").
  useEffect(() => {
    const onTopic = (e: Event) => {
      const industry = (e as CustomEvent<string>).detail
      setSentTo(null)
      form.setFieldValue('industry', industry)
    }
    window.addEventListener(CONTACT_TOPIC_EVENT, onTopic)
    return () => window.removeEventListener(CONTACT_TOPIC_EVENT, onTopic)
  }, [form])

  // Move focus to the confirmation so screen readers announce it and keyboard
  // users are not stranded on a control that no longer exists.
  useEffect(() => {
    if (sentTo) successRef.current?.focus()
  }, [sentTo])

  const industries = [
    { value: 'events', label: t('contact.industries.events') },
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
              {sentTo ? (
                <div role="status" className="py-6 sm:py-10">
                  <h3
                    ref={successRef}
                    tabIndex={-1}
                    className="font-display text-foreground text-2xl font-bold tracking-tight focus:outline-none sm:text-3xl"
                  >
                    {t('contact.success.title')}
                    <span aria-hidden="true" className="cft-cursor" />
                  </h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">
                    {t('contact.success.body', { email: sentTo })}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-8"
                    onClick={() => setSentTo(null)}
                  >
                    {t('contact.success.again')}
                  </Button>
                </div>
              ) : (
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
                              <OptionalMark />
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
                            <OptionalMark />
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
                  {sendFailed && (
                    <p
                      role="alert"
                      className="border-destructive/30 bg-destructive/5 text-foreground rounded-lg border px-4 py-3 text-sm leading-relaxed"
                    >
                      {t('contact.errorMessage')}{' '}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-cft-mint-ink focus-visible:ring-ring rounded-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </p>
                  )}
                  <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring group inline-flex items-center gap-2 self-center rounded-sm text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:self-auto"
                    >
                      <Calendar
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="underline-offset-4 group-hover:underline">
                        {t('contact.bookCall')}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0"
                      />
                      <span className="sr-only">{t('a11y.opensInNewTab')}</span>
                    </a>
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
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
