# Design Spec — Premium Redesign + Events Services + Impeccable

**Date:** 2026-06-24
**Status:** Approved (pending final user review)
**Repo:** cft-services

## Summary

Elevate the CFT Services website to look more professional and less "AI-template
built," add a new **Events Services** offering (digital and dynamic experiences
for conventions and booth-based events), and adopt **Impeccable** (the AI design
CLI) as the design-workflow tool. Delivered as one coordinated project.

## Goals

1. **Professional, distinctive visual language** — remove generic "AI-built"
   tells; introduce a documented, intentional design system.
2. **New Events Services section** — a dedicated, immersive showcase of CFT's
   experiential/booth technology capabilities, using brand-neutral mockups.
3. **Impeccable adoption** — install and configure the Impeccable CLI, generate
   `PRODUCT.md` + `DESIGN.md`, and use its critique/polish commands to enforce
   the new design language.

## Non-Goals

- No CMS / backend changes. The site stays a static Vite + React SPA on GitHub
  Pages.
- No new client-specific branding (Lotería / Coffee & Chocolate Expo). The
  Events showcase is **brand-neutral**.
- No migration of the existing IT services content/messaging (copy is good).
- No e-commerce, auth, or booking system.

## Decisions (from brainstorming)

| Decision | Choice |
|----------|--------|
| Scope | All three (redesign + Events + Impeccable) as one effort |
| Events placement | New dedicated homepage section |
| Events capabilities | Interactive kiosk games · Digital signage & live displays · Lead capture & CRM sync · Event check-in & registration |
| Design direction | **Premium Experiential** — calm/light IT register + immersive/dark Events register |
| Events visuals | Brand-neutral, code-built mockups (no client branding) |
| Display typeface | **Space Grotesk** (headlines) + **Plus Jakarta Sans** (body) |
| Theming | Keep light/dark toggle; Events section stays dark in both modes |

## Design Language: "Premium Experiential"

Two coordinated registers within one site.

### Register A — IT services (Hero, Services, About, Work, Contact, FinalCTA)
Calm, editorial, professional. Light-first, dark mode supported.

### Register B — Events
Immersive, dark in both light/dark mode, depth + glow + motion. Echoes the
*craft* of the sibling `prizes-game` design system without its branding.

### "Less AI-built" moves (required)
These are the concrete changes that remove template tells:

1. **Remove blurred background blobs** (e.g. the teal blob in `Services.tsx`).
   Replace with structured editorial backgrounds: hairline grid, fine rules, or
   subtle noise.
2. **Drop gradient icon tiles on every card.** Replace with restrained line
   icons + a numbered index system (`01 / Consulting`, `02 / Websites`, …).
3. **Break the "everything centered" rhythm.** Introduce asymmetric,
   grid-aligned layouts with real typographic hierarchy.
4. **Introduce Space Grotesk** for headlines; keep Plus Jakarta Sans for body.
5. **Tighten the card language** — hairline borders, considered radii and
   shadows instead of `rounded-3xl` + `shadow-xl` everywhere.

### Color
Existing brand palette (navy `#0F4C75` / teal `#3CAEA3`) is retained. Usage
changes: in Register A, brand colors are used sparingly as "ink." In Register B,
they appear as glow/depth on a dark canvas. Add neutral ink/hairline tokens as
needed for editorial rules.

### Typography
- Add **Space Grotesk** (weights 500–700) via Google Fonts; set as a new
  `--font-display` token. Headings use `font-display`.
- Body keeps `--font-sans` (Plus Jakarta Sans).

## New Events Section

- **File:** `src/components/Events.tsx`; device mockup in
  `src/components/events/KioskMockup.tsx`.
- **Anchor/nav:** `<section id="events">`; new "Events" link in `Navbar.tsx`.
- **Page order:** Hero → Services → **Events** → About → Work → Contact →
  FinalCTA.
- **Layout:** full-bleed dark band (dark in both themes) that intentionally
  breaks from the light IT sections to signal a distinct line of business.
- **Content:**
  - Eyebrow: "Experiential Technology"
  - Headline + subtitle: dynamic experiences for conventions & booth-based
    events.
  - **Centerpiece:** brand-neutral, code-built kiosk/device mockup (tilted
    touchscreen showing a generic "pick-to-win" game) with glow, floating
    particles, and motion. CFT navy/teal only — no client branding.
  - **Four capability blocks:** Interactive Kiosk Games · Digital Signage &
    Live Displays · Lead Capture & CRM Sync · Event Check-in & Registration.
  - **Context strip:** "conventions · expos · trade shows · activations."
- **Motion:** framer-motion, scroll-triggered reveals; respects
  `prefers-reduced-motion` (matching existing component conventions).

## Impeccable Setup

1. `npx impeccable install` at repo root (may be interactive / need network —
   user runs or approves).
2. `/impeccable init` → generate `PRODUCT.md` + `DESIGN.md`.
3. Author `DESIGN.md` to encode the "Premium Experiential" system above (the
   sibling `prizes-game/design-system/MASTER.md` is the quality bar).
4. Use `/impeccable critique` + refine/polish commands during implementation.
5. Commit Impeccable config (`.impeccable/`, hooks, `DESIGN.md`, `PRODUCT.md`).

## i18n

- Add an `events.*` group (title, subtitle, eyebrow, four capability
  title/description pairs, context strip) to **both** `src/i18n/en.json` and
  `src/i18n/es.json`. Add the `nav.events` key to both. Files must stay in sync
  (per CLAUDE.md).

## Files Touched

**New**
- `src/components/Events.tsx`
- `src/components/events/KioskMockup.tsx`
- `DESIGN.md`, `PRODUCT.md`
- Impeccable config (`.impeccable/`, hooks)

**Modified**
- `src/App.tsx` — insert `<Events />`
- `src/index.css` — Space Grotesk import, `--font-display` token, any
  events-specific utilities/tokens, remove blob-dependent styles
- `src/components/Navbar.tsx` — add Events nav link
- `src/i18n/en.json`, `src/i18n/es.json` — `events.*` + `nav.events`
- Polish passes: `Hero.tsx`, `Services.tsx`, `About.tsx`, `Work.tsx`,
  `Contact.tsx`, `FinalCTA.tsx`, `Footer.tsx` against the new design system
- `CLAUDE.md` — document the new design language, display font, and Events
  section conventions

## Build Sequence (phased)

1. **Foundation:** install Impeccable; add Space Grotesk + `--font-display`;
   define design tokens; author `DESIGN.md` + `PRODUCT.md`.
2. **Events section:** build `KioskMockup.tsx` + `Events.tsx`; wire into
   `App.tsx`, `Navbar.tsx`, and i18n (en + es).
3. **De-AI polish:** apply the "less AI-built" moves across existing sections;
   run `/impeccable critique` and address findings.
4. **Verify:** `npm run lint` and `npm run build` pass; visual QA in light +
   dark; reduced-motion check; EN/ES parity check.

## Testing / Verification

- `npm run build` (tsc + vite) passes with no type errors.
- `npm run lint` passes.
- Manual visual QA: light mode, dark mode, mobile + desktop breakpoints.
- `prefers-reduced-motion` disables decorative animation.
- EN and ES translation files have identical key sets.

## Risks / Open Questions

- **Impeccable install** may require interactivity or network the agent can't
  complete unattended — user may need to run `npx impeccable install` manually.
- **Scope size:** this is a sizable redesign; the phased sequence keeps each
  phase independently reviewable. If desired, Phase 3 (existing-section polish)
  can ship as a follow-up without blocking Events.
