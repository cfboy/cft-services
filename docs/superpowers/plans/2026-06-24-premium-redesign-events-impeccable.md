# Premium Redesign + Events Services + Impeccable — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. When implementing the creative UI tasks (Events, KioskMockup, polish passes), also invoke the `frontend-design` skill — the plan specifies exact files, structure, and acceptance criteria; that skill drives the actual styling quality.

**Goal:** Redesign cft-services into a professional, non-"AI-template" site with a "Premium Experiential" design language, add a dedicated brand-neutral Events Services section, and adopt the Impeccable design CLI.

**Architecture:** Static Vite + React 19 + TS SPA, Tailwind v4, framer-motion, i18n (EN/ES). Two visual registers: a calm/editorial light-first IT register and an immersive dark Events register. A documented design system (`DESIGN.md`) drives all visual decisions; Impeccable critique/polish enforces it.

**Tech Stack:** Vite 7, React 19, TypeScript 5.9, Tailwind CSS v4 (CSS-first `@theme`), framer-motion 12, react-i18next, lucide-react, Space Grotesk + Plus Jakarta Sans (Google Fonts).

## Global Constraints

- **Verification (no test runner exists):** every task ends with `npm run lint` AND `npm run build` passing, plus the task's stated visual/behavioral acceptance checks. Do NOT add a test framework.
- **No hardcoded hex in components** — use semantic Tailwind classes / CSS variables (per CLAUDE.md). New colors go in `index.css` `@theme`.
- **Headings use the display font** via a `font-display` utility (Space Grotesk); body stays `font-sans` (Plus Jakarta Sans).
- **i18n parity:** every key added to `en.json` must exist in `es.json` with the same shape. Access via `t('...')`.
- **Import order:** React/built-ins → third-party → `@/components/ui/*` → `@/components|hooks|lib/*` (per CLAUDE.md).
- **Reduced motion:** all decorative animation respects `useReducedMotion()` (existing pattern).
- **Brand colors only in Events** — navy `#0F4C75` / teal `#3CAEA3`; NO client (Lotería / Coffee & Chocolate) branding anywhere.
- **Events section is dark in both light and dark themes.**
- **Section pattern:** `<section id="...">` with inner `<div className="mx-auto max-w-6xl">`; section padding `px-4 py-24 sm:py-32`.
- **Commit after every task** (frequent commits). Co-author trailer:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
- **Branch:** all work on `claude/premium-redesign-events`.

---

## File Structure

**New files**
- `DESIGN.md` — root design system (the source of truth; quality bar = `../prizes-game/design-system/MASTER.md`).
- `PRODUCT.md` — root product context for Impeccable.
- `src/components/Events.tsx` — the Events section (Register B).
- `src/components/events/KioskMockup.tsx` — brand-neutral code-built kiosk/device mockup.

**Modified files**
- `src/index.css` — Space Grotesk import, `--font-display` token, Events tokens, remove blob styles.
- `src/i18n/en.json`, `src/i18n/es.json` — `events.*` group + `nav.events`.
- `src/App.tsx` — insert `<Events />` between `<Services />` and `<About />`.
- `src/components/Navbar.tsx` — add Events nav link.
- `src/components/Services.tsx` — de-AI polish (remove blob/gradient tiles → numbered index + line icons).
- `src/components/Hero.tsx`, `About.tsx`, `Work.tsx`, `Contact.tsx`, `FinalCTA.tsx`, `Footer.tsx` — polish passes.
- `CLAUDE.md` — document the new design language, display font, Events conventions.
- Impeccable config (`.impeccable/`, hooks, settings) — created by `npx impeccable install`.

---

## Task 1: Install Impeccable + author PRODUCT.md and DESIGN.md

**Files:**
- Create: `PRODUCT.md`, `DESIGN.md`, Impeccable config (`.impeccable/`, generated)
- Reference: `../prizes-game/design-system/MASTER.md` (quality bar)

**Interfaces:**
- Produces: `DESIGN.md` design tokens/names consumed conceptually by every later task (font `font-display` = Space Grotesk; two registers A/B; the five "less AI-built" moves).

- [ ] **Step 1: Install Impeccable**

Run from repo root:
```bash
npx impeccable install
```
Expected: creates Impeccable config (e.g. `.impeccable/`, hooks). If the command is interactive or needs network the agent cannot complete, STOP and ask the user to run it manually, then continue.

- [ ] **Step 2: Generate context files**

Run:
```bash
/impeccable init
```
Expected: creates/scaffolds `PRODUCT.md` and `DESIGN.md`. If unavailable, create the two files manually in the next steps.

- [ ] **Step 3: Write `PRODUCT.md`**

Capture: CFT Services = Puerto Rico technology + experiential firm. Audiences: SMBs needing IT (consulting/web/apps/automation/CRM) AND event organizers needing booth/convention experiences. Primary CTA: start a conversation. Bilingual EN/ES.

- [ ] **Step 4: Write `DESIGN.md`** (the design system — be concrete, mirror the structure of `prizes-game/design-system/MASTER.md`)

Must include, verbatim where applicable:
- **Two registers:** A (IT — calm, editorial, light-first, dark supported) and B (Events — immersive, dark in both themes, glow/depth/motion).
- **Color tokens:** existing navy/teal table from CLAUDE.md; rule "used sparingly as ink in A, as glow in B."
- **Typography:** Display = Space Grotesk (500/600/700) via `font-display`; Body = Plus Jakarta Sans via `font-sans`. Headings `font-display font-bold tracking-tight`.
- **The five "less AI-built" rules:** (1) no blurred background blobs; (2) no per-card gradient icon tiles — use line icons + numbered index (`01 / …`); (3) break centered rhythm with asymmetric grid layouts; (4) Space Grotesk headlines; (5) hairline borders / considered radii instead of `rounded-3xl`+`shadow-xl` everywhere.
- **Spacing/layout:** `max-w-6xl`, `px-4 py-24 sm:py-32`.
- **Anti-patterns** list mirroring the prizes-game doc, adapted.

- [ ] **Step 5: Verify build still green**

Run:
```bash
npm run lint && npm run build
```
Expected: both succeed (these are docs/config only).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: set up Impeccable + author PRODUCT.md and DESIGN.md"
```

---

## Task 2: Typography + design tokens in index.css

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: `--font-display` theme token → Tailwind `font-display` utility; Events color tokens (`--color-events-bg`, `--color-events-bg-soft`, `--color-events-glow`) usable as `bg-events-bg`, etc.

- [ ] **Step 1: Add the Google Fonts import for Space Grotesk**

At the very top of `src/index.css`, before `@import 'tailwindcss';` is not allowed (Tailwind import must be processed) — instead add the font `<link>` OR `@import url(...)` at the top of the file ABOVE `@import 'tailwindcss';`:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');
@import 'tailwindcss';
```

- [ ] **Step 2: Add the display font token + Events tokens inside `@theme`**

In the `@theme { ... }` block, alongside `--font-sans`, add:
```css
  --font-display: 'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif;

  /* Events register (Register B) — dark in both themes */
  --color-events-bg: #0a1420;
  --color-events-bg-soft: #0f2236;
  --color-events-glow: #20e3b2;
```

- [ ] **Step 3: Remove blob-friendly assumptions (no code yet, just confirm)**

No change here; the blob `div`s live in components and are removed in their tasks. Confirm `index.css` has no `.blob`/blur utilities to delete (it does not).

- [ ] **Step 4: Verify**

Run:
```bash
npm run lint && npm run build
```
Expected: both pass. Visual check: nothing visibly changes yet (token added, not applied).

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "feat: add Space Grotesk display font + Events color tokens"
```

---

## Task 3: i18n — events.* keys + nav.events (EN + ES)

**Files:**
- Modify: `src/i18n/en.json`, `src/i18n/es.json`

**Interfaces:**
- Produces: translation keys consumed by Tasks 4–6: `nav.events`; `events.eyebrow`, `events.title`, `events.subtitle`, `events.contextStrip`, and `events.capabilities.{kiosk,signage,leads,checkin}.{title,description}`.

- [ ] **Step 1: Add `nav.events` to both files**

In `en.json` `nav` object add `"events": "Events"`. In `es.json` `nav` object add `"events": "Eventos"`.

- [ ] **Step 2: Add the `events` group to `en.json`** (place after the `services` group)

```json
  "events": {
    "eyebrow": "Experiential Technology",
    "title": "Dynamic Experiences for Conventions & Booths",
    "subtitle": "We design and build interactive, on-brand technology that turns a booth into the busiest spot on the floor — and turns foot traffic into measurable results.",
    "contextStrip": "conventions · expos · trade shows · activations",
    "capabilities": {
      "kiosk": {
        "title": "Interactive Kiosk Games",
        "description": "Gamified touchscreen experiences — pick-to-win, spin, and prize reveals — built around your brand to draw a crowd and reward engagement."
      },
      "signage": {
        "title": "Digital Signage & Live Displays",
        "description": "Dynamic screens, live leaderboards, and sponsor displays that keep your booth moving and your message on screen all day."
      },
      "leads": {
        "title": "Lead Capture & CRM Sync",
        "description": "Capture visitor info at the booth and sync it straight to your CRM, with follow-up automation and a real-time dashboard for your team."
      },
      "checkin": {
        "title": "Event Check-in & Registration",
        "description": "Fast digital check-in, badge and registration flows, and attendee management that scale from a single booth to a full event."
      }
    }
  },
```

- [ ] **Step 3: Add the matching `events` group to `es.json`** (same shape, Spanish copy)

```json
  "events": {
    "eyebrow": "Tecnología de Experiencias",
    "title": "Experiencias Dinámicas para Convenciones y Stands",
    "subtitle": "Diseñamos y construimos tecnología interactiva y a la medida de tu marca que convierte un stand en el punto más concurrido del salón — y el flujo de visitantes en resultados medibles.",
    "contextStrip": "convenciones · expos · ferias · activaciones",
    "capabilities": {
      "kiosk": {
        "title": "Juegos Interactivos en Kiosco",
        "description": "Experiencias gamificadas en pantalla táctil — elige y gana, ruleta y revelación de premios — creadas en torno a tu marca para atraer público y premiar la participación."
      },
      "signage": {
        "title": "Señalización y Pantallas en Vivo",
        "description": "Pantallas dinámicas, tableros de líderes en vivo y displays de patrocinadores que mantienen tu stand activo y tu mensaje en pantalla todo el día."
      },
      "leads": {
        "title": "Captura de Leads y Sincronización con CRM",
        "description": "Captura la información de los visitantes en el stand y sincronízala directo a tu CRM, con automatización de seguimiento y un tablero en tiempo real para tu equipo."
      },
      "checkin": {
        "title": "Registro y Check-in de Eventos",
        "description": "Check-in digital rápido, flujos de registro y credenciales, y gestión de asistentes que escalan de un solo stand a un evento completo."
      }
    }
  },
```

- [ ] **Step 4: Verify parity + build**

Run:
```bash
node -e "const a=require('./src/i18n/en.json'),b=require('./src/i18n/es.json');const k=o=>Object.keys(o).flatMap(x=>o[x]&&typeof o[x]==='object'?k(o[x]).map(y=>x+'.'+y):[x]).sort();const ka=k(a),kb=k(b);const miss=ka.filter(x=>!kb.includes(x)).concat(kb.filter(x=>!ka.includes(x)));console.log(miss.length?'MISMATCH: '+miss.join(', '):'PARITY OK')"
npm run lint && npm run build
```
Expected: `PARITY OK`, then lint + build pass.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/en.json src/i18n/es.json
git commit -m "feat(i18n): add events section copy (EN/ES) + nav.events"
```

---

## Task 4: KioskMockup component (brand-neutral device mockup)

**Files:**
- Create: `src/components/events/KioskMockup.tsx`

**Interfaces:**
- Produces: `export function KioskMockup({ className }: { className?: string })` — a self-contained, brand-neutral, code-built tilted touchscreen showing a generic "pick-to-win" tile grid with glow + subtle motion. No i18n, no external assets, no client branding.

**Acceptance criteria (the implementer, using frontend-design, must satisfy all):**
- Renders a kiosk/tablet frame (rounded bezel, slight 3D tilt via CSS transform/perspective) containing a small grid of "pick" tiles and a faux header ("Tap to play" style, generic).
- Uses ONLY CFT brand colors via tokens (`text-cft-teal-primary`, navy, `events-glow`) — no hex literals, no Lotería/chocolate motifs.
- Decorative glow + floating particle motion via framer-motion; ALL motion gated behind `useReducedMotion()` (static fallback).
- Purely decorative → `aria-hidden="true"` on the wrapper.
- Accepts `className` merged with `cn()`; no layout assumptions beyond what the parent gives it.

- [ ] **Step 1: Scaffold the component file** with the exact export signature above, `cn` import from `@/lib/utils`, `motion`/`useReducedMotion` from framer-motion. Mark wrapper `aria-hidden="true"`.

- [ ] **Step 2: Build the static structure** (frame + tile grid + header) meeting the acceptance criteria, tokens only.

- [ ] **Step 3: Add reduced-motion-gated decorative motion** (glow pulse / particle float). When `useReducedMotion()` is true, render the static visual with no animated props.

- [ ] **Step 4: Verify**

Run:
```bash
npm run lint && npm run build
```
Expected: both pass. (Component not yet mounted; this confirms it compiles.)

- [ ] **Step 5: Commit**

```bash
git add src/components/events/KioskMockup.tsx
git commit -m "feat(events): add brand-neutral KioskMockup component"
```

---

## Task 5: Events section + wire into App + Navbar

**Files:**
- Create: `src/components/Events.tsx`
- Modify: `src/App.tsx`, `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `KioskMockup` (Task 4); `events.*` + `nav.events` keys (Task 3); `--font-display`, `events-*` tokens (Task 2).
- Produces: `export function Events()` rendering `<section id="events">`.

**Acceptance criteria:**
- Full-bleed dark band using `bg-events-bg` (dark in BOTH themes — do not gate on `.dark`).
- Eyebrow (`events.eyebrow`), display-font headline (`events.title`, `font-display`), subtitle (`events.subtitle`).
- `KioskMockup` as the visual centerpiece, asymmetric layout (not centered) — e.g. text column + mockup column on `lg:`.
- Four capability blocks from `events.capabilities.*` using restrained line icons (lucide: `Gamepad2`, `MonitorPlay`, `Users`/`UserPlus`, `ClipboardCheck`) — NO gradient icon tiles.
- Context strip (`events.contextStrip`).
- Scroll-reveal motion via framer-motion + `useReducedMotion()`.
- Follows section pattern + import order.

- [ ] **Step 1: Build `Events.tsx`** meeting all acceptance criteria above.

- [ ] **Step 2: Wire into `App.tsx`** — add `import { Events } from '@/components/Events'` (correct alpha-ish import position) and place `<Events />` between `<Services />` and `<About />` in the `<main>`:
```tsx
        <Services />
        <Events />
        <About />
```

- [ ] **Step 3: Add Events nav link** in `src/components/Navbar.tsx` `navLinks` array (after services, line ~36):
```tsx
    { href: '#services', label: t('nav.services') },
    { href: '#events', label: t('nav.events') },
    { href: '#about', label: t('nav.about') },
```

- [ ] **Step 4: Verify**

Run:
```bash
npm run lint && npm run build
```
Expected: both pass. Manual: `npm run dev`, confirm Events section renders dark in BOTH light and dark mode, nav "Events"/"Eventos" link scrolls to it, EN↔ES toggles copy, reduced-motion stops decorative animation, mobile layout stacks.

- [ ] **Step 5: Commit**

```bash
git add src/components/Events.tsx src/App.tsx src/components/Navbar.tsx
git commit -m "feat(events): add Events section, wire into App and Navbar"
```

---

## Task 6: De-AI polish — Services.tsx

**Files:**
- Modify: `src/components/Services.tsx`

**Acceptance criteria (apply the "less AI-built" rules):**
- **Remove** the decorative blurred blob `div` (`bg-cft-teal-primary/5 ... blur-3xl`, ~line 155).
- **Replace gradient icon tiles** (the `bg-linear-to-br ${gradient}` icon area and the per-feature gradient check bullets) with a restrained treatment: line icon (no filled gradient tile) + a prominent numbered index (`01`–`05`) in `font-display text-muted-foreground`.
- Replace `rounded-3xl` + `shadow-xl` with hairline border + restrained radius/shadow per DESIGN.md.
- Headline (`services.title`) uses `font-display`.
- Keep the existing drag-scroll behavior and i18n keys intact.

- [ ] **Step 1: Apply the changes** above to `Services.tsx` (using frontend-design for quality).
- [ ] **Step 2: Verify**

Run:
```bash
npm run lint && npm run build
```
Expected: both pass. Manual: cards show numbered index + line icons, no blob, no gradient tiles; drag-scroll still works; light + dark OK.

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.tsx
git commit -m "refactor(services): editorial redesign — numbered index, line icons, remove blob"
```

---

## Task 7: De-AI polish — Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

**Acceptance criteria:**
- Headline uses `font-display`, strong hierarchy; reduce/remove generic gradient-blob backgrounds in favor of structured editorial background (hairline grid / fine rule / subtle noise) per DESIGN.md.
- Keep existing copy keys (`hero.*`) and both CTAs.
- Layout may move from dead-center to a more editorial/asymmetric composition while staying responsive.
- Motion respects `useReducedMotion()`.

- [ ] **Step 1: Read `src/components/Hero.tsx`**, then apply the polish.
- [ ] **Step 2: Verify** `npm run lint && npm run build` pass; manual light/dark + mobile check.
- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "refactor(hero): editorial polish with display type"
```

---

## Task 8: De-AI polish — About.tsx

**Files:**
- Modify: `src/components/About.tsx`

**Acceptance criteria:**
- Section heading + stat numbers use `font-display`.
- Remove any blurred blobs; apply hairline/editorial treatment to stats, "How We Do It," and Industries blocks.
- Keep all `about.*` keys and the stats/industries data intact.
- Motion respects `useReducedMotion()`.

- [ ] **Step 1: Read `src/components/About.tsx`**, then apply the polish.
- [ ] **Step 2: Verify** `npm run lint && npm run build`; manual light/dark + mobile.
- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx
git commit -m "refactor(about): editorial polish, remove blobs"
```

---

## Task 9: De-AI polish — Work.tsx

**Files:**
- Modify: `src/components/Work.tsx`

**Acceptance criteria:**
- Heading uses `font-display`; project cards adopt hairline-border / restrained-shadow language consistent with Services.
- Remove blurred blobs / gradient-tile tells; keep all `work.*` keys and the 5 real projects + their links/images.
- Motion respects `useReducedMotion()`.

- [ ] **Step 1: Read `src/components/Work.tsx`**, then apply the polish.
- [ ] **Step 2: Verify** `npm run lint && npm run build`; manual light/dark + mobile.
- [ ] **Step 3: Commit**

```bash
git add src/components/Work.tsx
git commit -m "refactor(work): align project cards with editorial system"
```

---

## Task 10: De-AI polish — Contact, FinalCTA, Footer

**Files:**
- Modify: `src/components/Contact.tsx`, `src/components/FinalCTA.tsx`, `src/components/Footer.tsx`

**Acceptance criteria:**
- Headings use `font-display`; remove blobs / gradient tells; hairline/editorial treatment consistent with the rest.
- Keep all keys, the contact form behavior (TanStack form + zod + sonner toast), and footer links intact.
- Motion respects `useReducedMotion()`.

- [ ] **Step 1: Read all three files**, then apply the polish (form logic unchanged — visual only).
- [ ] **Step 2: Verify** `npm run lint && npm run build`; manual: submit-flow visuals + toast still work, light/dark + mobile.
- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx src/components/FinalCTA.tsx src/components/Footer.tsx
git commit -m "refactor(contact/cta/footer): editorial polish"
```

---

## Task 11: Impeccable critique pass + docs + final verification

**Files:**
- Modify: `CLAUDE.md` (and any files flagged by critique)

**Acceptance criteria:**
- Run Impeccable critique and address actionable findings (or record them in `DESIGN.md` if deferred).
- `CLAUDE.md` updated: new display font (Space Grotesk + `font-display`), the "Premium Experiential" two-register language, the five "less AI-built" rules, and the Events section conventions.
- Full site passes final QA.

- [ ] **Step 1: Run critique**

```bash
/impeccable critique
```
Address high-value findings; commit fixes per file with clear messages.

- [ ] **Step 2: Update `CLAUDE.md`** — typography section (add Space Grotesk/`font-display`), add a "Premium Experiential / two registers" subsection under Brand Design System, document the Events section pattern + that it stays dark in both themes.

- [ ] **Step 3: Final verification**

Run:
```bash
node -e "const a=require('./src/i18n/en.json'),b=require('./src/i18n/es.json');const k=o=>Object.keys(o).flatMap(x=>o[x]&&typeof o[x]==='object'?k(o[x]).map(y=>x+'.'+y):[x]).sort();const ka=k(a),kb=k(b);const miss=ka.filter(x=>!kb.includes(x)).concat(kb.filter(x=>!ka.includes(x)));console.log(miss.length?'MISMATCH: '+miss.join(', '):'PARITY OK')"
npm run lint && npm run build
```
Expected: `PARITY OK`, lint + build pass.
Manual QA checklist: light mode, dark mode, mobile + desktop; Events dark in both themes; reduced-motion disables decorative animation; all nav links scroll correctly; EN/ES both render fully.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: update CLAUDE.md for new design system; impeccable critique fixes"
```

---

## Self-Review

**Spec coverage:**
- Impeccable setup → Task 1, Task 11. ✓
- Design system / DESIGN.md → Task 1. ✓
- Typography (Space Grotesk) → Task 2 (+applied Tasks 5–10). ✓
- Events section (4 capabilities, brand-neutral mockup, dark band, nav) → Tasks 3, 4, 5. ✓
- "Less AI-built" moves → Tasks 6–10 (blobs, gradient tiles, centering, display font, card language). ✓
- i18n EN/ES parity → Task 3 (+ verified Tasks 3 & 11). ✓
- Page order Hero→Services→Events→About→Work→Contact→FinalCTA → Task 5. ✓
- CLAUDE.md update → Task 11. ✓
- Verification (lint+build, no test runner) → every task. ✓

**Placeholder scan:** Creative UI tasks (4–10) specify exact files, signatures, and concrete acceptance criteria rather than speculative final markup — this is intentional for visual work and pairs with the frontend-design skill, not a vague "add styling" placeholder. i18n, tokens, and wiring tasks contain complete literal content. No TBD/TODO.

**Type/name consistency:** `KioskMockup({ className })` defined Task 4, consumed Task 5. `events.*` / `nav.events` keys defined Task 3, consumed Tasks 4–5. `--font-display`/`font-display` and `events-*` tokens defined Task 2, consumed Tasks 4–10. Consistent.
