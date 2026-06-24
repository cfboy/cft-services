# PRODUCT.md — CFT Services

> **Product context for design decisions.**  
> Read by the design system (`DESIGN.md`) and by any AI-assisted implementation work.

---

## What Is CFT Services?

CFT Services is a Puerto Rico–based technology and experiential firm founded by Cristian F. Torres Collazo. The company delivers two complementary lines of business:

1. **IT & Digital Services** — technology consulting, web development, custom applications, workflow automation, and CRM solutions for small-to-medium businesses across Puerto Rico and beyond.
2. **Experiential Technology** — interactive digital experiences for conventions, trade shows, expos, and booth-based activations: interactive kiosk games, digital signage, live event displays, lead capture with CRM sync, and event check-in/registration.

These two businesses share one brand identity but communicate in distinct visual registers (see `DESIGN.md`).

---

## Audiences

### Primary: SMBs seeking IT services

- Small-to-medium businesses in Puerto Rico (and the broader Caribbean/US market)
- Need: website, web app, or CRM; OR workflow automation; OR technology consulting
- Pain: overwhelmed by complexity, unsure where to start
- Tone resonance: calm, professional, trustworthy, human

### Secondary: Event organizers seeking experiential tech

- Convention/expo organizers, brand activations, trade show exhibitors
- Need: turnkey digital experience for their booth or event venue
- Pain: generic activations that don't engage attendees; hard-to-capture leads
- Tone resonance: modern, innovative, immersive, results-driven

---

## Business Goals

| Goal | Metric |
|------|--------|
| Generate qualified leads | Visitor clicks "Start a Project" or submits contact form |
| Establish credibility | Professional design; clear services list; work samples |
| Bilingual reach | Full EN + ES content parity |
| Low maintenance | Static site, no CMS — changes via code |

---

## Primary CTA

**Start a conversation.** Every section funnels visitors toward the contact section (`#contact`) or to an email/calendar link. The ask is low-friction: no forms with many fields, no pricing pages. Just: "Let's talk."

---

## Languages

The site is fully bilingual — English (default) and Spanish. All UI copy, section headings, navigation labels, and capability descriptions must have equivalent keys in both `src/i18n/en.json` and `src/i18n/es.json`.

---

## Services Offered

### IT & Digital

| # | Service | Description |
|---|---------|-------------|
| 01 | Technology Consulting | Strategic guidance: stack selection, systems audits, vendor evaluation |
| 02 | Web Development | Marketing sites, landing pages, web apps — built to convert |
| 03 | Custom Applications | Tailored internal tools, client portals, workflow dashboards |
| 04 | Workflow Automation | Zapier / Make / custom scripts — eliminate repetitive manual work |
| 05 | CRM Solutions | Setup, customization, and training for CRM platforms |

### Experiential Technology

| # | Capability | Description |
|---|-----------|-------------|
| 01 | Interactive Kiosk Games | Pick-to-win, spin-to-win, and custom game activations for booths |
| 02 | Digital Signage & Live Displays | Dynamic event visuals, leaderboards, countdown timers |
| 03 | Lead Capture & CRM Sync | Touchscreen forms with real-time CRM delivery |
| 04 | Event Check-in & Registration | QR-based or form-based attendee management |

---

## Personality & Voice

- **Confident but not boastful** — let the work speak
- **Human, not corporate** — first-person "we," accessible language
- **Bilingual naturally** — Spanish is not an afterthought; both languages receive equal care
- **Action-oriented** — short sentences, strong verbs, minimal jargon

---

## Technical Context (for design decisions)

- **Framework:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Hosting:** GitHub Pages (static, subpath `/cft-services/`)
- **No backend** — contact form handled externally (email link or third-party)
- **Animation:** Framer Motion (existing) — all motion respects `prefers-reduced-motion`
- **i18n:** react-i18next, keys scoped by section

---

*Last updated: 2026-06-24 | Maintained by: CFT Services / Cristian F. Torres Collazo*
