# DESIGN.md — CFT Services Design System

> **Source of Truth** for all visual decisions in the CFT Services website.  
> This file governs all components and sections. Every implementation choice — color, type, spacing, motion, component shape — must align with what is written here.

---

## Design Language: "Premium Experiential"

The CFT Services site operates in two coordinated visual registers. They share a brand palette and typographic scale but communicate in different emotional keys — one calm and editorial, one immersive and cinematic. The contrast between them is intentional and meaningful: it reflects the two distinct business lines.

### Register A — IT & Digital Services

> *Calm · Editorial · Light-first · Professional*

Applied to: `Hero`, `Services`, `About`, `Work`, `Contact`, `FinalCTA`, `Footer`, `Navbar`

- Light backgrounds in light mode; dark (but not theatrical) in dark mode
- Brand navy used as ink — primary text, headings, accents
- Teal used sparingly as a highlight color — not as a default fill
- Generous whitespace, grid-based layouts, clear typographic hierarchy
- No glow effects, no heavy shadows, no theatrical depth
- Motion is subtle: fade-in, gentle slide-up on scroll entry

### Register B — Experiential Technology

> *Immersive · Dark in both themes · Depth + glow + motion*

Applied to: `Events` section only

- Full-bleed dark band (`#0A1420` base) — dark in light mode AND dark mode
- Teal and navy appear as **glow** rather than ink — radial halos, gradient text
- Visual depth: layered backgrounds (noise texture, radial gradient, vignette)
- Interactive mockup with floating particles and ambient motion
- Motion is expressive: spring entrances, continuous idle loops, scroll-triggered reveals
- Intentionally echoes the craft of the `prizes-game` sibling project without its branding

The transition from Register A into Register B (as the user scrolls past Services into Events) should feel like stepping from a professional office into an event floor.

---

## Color Palette

### Brand Colors

| CSS Token | Tailwind Class | Hex | Usage |
|-----------|---------------|-----|-------|
| `--cft-navy-deep` | `cft-navy-deep` | `#0F4C75` | Register A: headings, primary text, borders |
| `--cft-navy-medium` | `cft-navy-medium` | `#1B6B93` | Secondary navy, interactive states |
| `--cft-navy-dark` | `cft-navy-dark` | `#1A1A2E` | Register B: deep background layer |
| `--cft-teal-primary` | `cft-teal-primary` | `#3CAEA3` | A: accent; B: primary glow, CTA |
| `--cft-teal-light` | `cft-teal-light` | `#20E3B2` | B: highlight, gradient stops, shimmer peak |
| `--cft-teal-soft` | `cft-teal-soft` | `#E8F8F5` | A: light teal backgrounds, chip fills |

### Usage by Register

**Register A (IT — light-first):**
- Navy colors are "ink" — use for type, borders, and on-brand accents
- Teal appears only at accent weight: hover states, underlines, active indicators
- Backgrounds are white/light-gray (light mode) or `--background` token (dark mode)
- No colored surface fills on cards — use hairline borders + whitespace instead

**Register B (Events — always dark):**
- Teal appears as glow: `box-shadow: 0 0 24px rgba(60,174,163,0.4)`, gradient text
- Dark navy surface colors define Register B hierarchy (see **Register B Surface Tokens** below)
- Teal-light (`#20E3B2`) used sparingly at gradient endpoints
- White at 80–95% opacity for primary text on dark surfaces

### Register B Surface Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `events-bg` (base) | `#0A1420` | Section base background |
| `events-bg-soft` | `#0F2236` | Raised card/panel surface |
| `events-bg-deep` | `#050A12` | Vignette edges / deepest layer |
| `events-glow` | `#20E3B2` | Teal glow accent |

These tokens ensure consistency across the Register B section and align with CSS variables defined in `src/index.css` (`--color-events-bg`, `--color-events-bg-soft`, `--color-events-bg-deep`, `--color-events-glow`).

### Semantic Gradient — Teal Glow (Register B)

```css
/* Primary heading gradient for Events section */
background: linear-gradient(135deg, #3CAEA3 0%, #20E3B2 50%, #3CAEA3 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
filter: drop-shadow(0 2px 16px rgba(32, 227, 178, 0.3));
```

### Neutral / Editorial Tokens (Register A)

| Token | Hex (light) | Usage |
|-------|-------------|-------|
| Hairline border | `rgba(15,76,117,0.12)` | Card edges, section dividers |
| Fine rule | `rgba(15,76,117,0.08)` | Decorative horizontal rules |
| Index number | `rgba(15,76,117,0.25)` | `01 /` styled numbers in service lists |
| Muted text | `rgba(15,76,117,0.6)` | Descriptive body text below headings |

---

## Typography

### Font Stack

| Role | Font | Weights | CSS Token | Tailwind Class |
|------|------|---------|-----------|---------------|
| **Display** | Space Grotesk | 500, 600, 700 | `--font-display` | `font-display` |
| **Body** | Plus Jakarta Sans | 400, 500, 600 | `--font-sans` | `font-sans` |

**Google Fonts import (in `index.css`):**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
```

**CSS custom property definition (and Tailwind v4 theme registration):**
```css
:root {
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

**Tailwind v4 @theme block (in `src/index.css`):**

Tailwind v4 automatically generates the `font-display` and `font-sans` utilities from CSS custom properties. Register them in the `@theme` block:

```css
/* src/index.css, inside @theme { } */
--font-display: 'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif;
--font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
```

This approach replaces `tailwind.config.js` (which this project does not use); Tailwind v4 reads theme values directly from CSS variables.

### Type Scale

| Element | Classes | Notes |
|---------|---------|-------|
| Section headline (A) | `font-display font-bold tracking-tight text-3xl sm:text-4xl` | Left-aligned or asymmetric |
| Section headline (B) | `font-display font-bold tracking-tight text-4xl sm:text-5xl` | Gradient text treatment |
| Eyebrow label | `font-sans text-xs font-semibold uppercase tracking-[0.18em]` | Teal color in both registers |
| Card title | `font-display font-semibold text-lg` | No `tracking-tight` on small sizes |
| Body text | `font-sans text-base text-muted-foreground` | Line height `leading-relaxed` |
| Caption / micro | `font-sans text-sm text-muted-foreground` | Labels, index numbers |
| Numbered index | `font-display font-semibold text-sm text-muted/40 tabular-nums` | `01 / 02 /` service indicators |

### Typography Rules

- **All section headings use `font-display`** (Space Grotesk) — never body font for h1–h3
- **Eyebrow labels** always uppercase + wide tracking + teal accent color
- **Numbers (`01 /`, `02 /`)** use `font-display tabular-nums` at reduced opacity (25–40%) — they are structural indices, not focal points
- **No centered body paragraphs over 60 characters** — left-align or use asymmetric layouts
- **Register B gradient text** — always use `filter: drop-shadow()` for glow effects, never `text-shadow` (incompatible with `background-clip: text`)

---

## Spacing & Layout

### Grid & Containers

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-6xl` (1152px) | Centered with `mx-auto` |
| Section padding | `px-4 py-24 sm:py-32` | Consistent across all sections |
| Column gap | `gap-8 lg:gap-12` | Between major layout columns |
| Card gap (grid) | `gap-6` | Between card items in grids |

### Breakpoints (mobile-first)

| Prefix | Min-width | Use |
|--------|-----------|-----|
| (none) | 0 | Mobile portrait |
| `sm:` | 640px | Mobile landscape, small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |

### Asymmetric Layouts (Register A — required)

Sections must break the "everything centered" template pattern. Preferred approaches:

**Option 1 — Split layout:**
```
[ Headline + index list (7 cols) ] [ Visual / stat block (5 cols) ]
```

**Option 2 — Offset headline:**
```
Eyebrow + headline flush-left (8 cols), body text indented under col 3
```

**Option 3 — Numbered list:**
```
01 / Service Name        Brief description right-aligned in remaining cols
02 / Service Name        ...
```

Centered layouts are acceptable only for CTAs, hero sub-headlines, and the Events Register B section (where centering serves the cinematic aesthetic).

---

## Component Patterns

### Cards (Register A)

The premium redesign eliminates the "AI card" pattern: gradient background tile + rounded-3xl + shadow-xl + icon in colored square.

**Do:**
```tsx
<div className="border border-border/50 rounded-lg p-6 hover:border-border transition-colors">
  <span className="font-display text-sm text-muted-foreground/40 tabular-nums">01 /</span>
  <Monitor className="size-5 text-muted-foreground mt-3" strokeWidth={1.5} />
  <h3 className="font-display font-semibold text-lg mt-4 mb-2">Technology Consulting</h3>
  <p className="font-sans text-sm text-muted-foreground leading-relaxed">…</p>
</div>
```

**Do not:**
```tsx
{/* WRONG — AI-template pattern */}
<div className="rounded-3xl shadow-xl p-8 bg-gradient-to-br from-teal-50 to-navy-50">
  <div className="rounded-2xl bg-gradient-to-br from-teal-400 to-navy-600 p-3 w-12 h-12">
    <Monitor className="text-white" />
  </div>
  …
</div>
```

### Cards (Register B — Events Capabilities)

```tsx
<div
  className="border border-teal-500/20 rounded-lg p-6"
  style={{ background: 'rgba(15,76,117,0.15)', backdropFilter: 'blur(8px)' }}
>
  <Monitor className="size-5 mb-4" style={{ color: '#3CAEA3' }} strokeWidth={1.5} />
  <h3 className="font-display font-semibold text-white/90 mb-2">Interactive Kiosk Games</h3>
  <p className="font-sans text-sm text-white/55 leading-relaxed">…</p>
</div>
```

**Register B Exception:** The inline `rgba()` and `#3CAEA3` color values above are intentional. Register B (Events) uses glassmorphism and glow effects where semantic tokens don't map to exact values. This is the sole exception to the "no hardcoded hex" rule (see Anti-Patterns). All other sections must use semantic Tailwind classes.

### Buttons

| Variant | Use | Classes |
|---------|-----|---------|
| `default` | Primary CTA | `bg-primary text-primary-foreground hover:bg-primary/90` |
| `accent` | Events / teal CTA | `bg-[#3CAEA3] text-white hover:bg-[#3CAEA3]/90` |
| `outline` | Secondary | `border border-border bg-transparent hover:bg-muted` |
| `ghost` | Nav, icon-only | `hover:bg-muted text-foreground` |

**Rules:**
- No `asChild` — wrap `<a>` around `<Button>` instead
- All icon-only buttons must have `aria-label`
- Focus rings: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`

### Numbered Index Pattern (Services)

```tsx
{services.map((service, i) => (
  <div key={service.id} className="flex gap-6 items-start py-6 border-b border-border/40 last:border-0">
    <span className="font-display font-semibold text-sm text-foreground/25 tabular-nums w-8 shrink-0 mt-0.5">
      {String(i + 1).padStart(2, '0')} /
    </span>
    <div>
      <h3 className="font-display font-semibold text-base mb-1">{t(service.titleKey)}</h3>
      <p className="font-sans text-sm text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
    </div>
  </div>
))}
```

### Eyebrow Label

```tsx
<span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#3CAEA3] mb-4">
  {t('section.eyebrow')}
</span>
```

**Note:** Eyebrow labels use the arbitrary-value `text-[#3CAEA3]` (teal primary hex) because the project's Tailwind config does not expose a `text-cft-teal-primary` utility. This is acceptable for brand-color accents that do not vary by theme. All other foreground colors should use semantic classes (`text-primary`, `text-muted-foreground`, etc.).

---

## Background Treatments

### Register A

- **Default:** `bg-background` (CSS variable, white in light / near-black in dark)
- **Alternating section:** `bg-muted/30` — very subtle tint, no pattern
- **What NOT to do:** no blurred SVG color blobs, no `backdrop-blur` decorative shapes, no colored section backgrounds that compete with content
- **Allowed accent:** fine horizontal hairline rule (`<hr className="border-border/30">`) as a section separator; or a 1px-wide vertical rule in multi-column layouts

### Register B (Events — always dark)

```css
/* Base layer — always dark regardless of theme */
/* Uses Register B Surface Tokens: events-bg (#0A1420), events-bg-soft (#0F2236), events-bg-deep (#050A12) */
background: radial-gradient(ellipse at 50% 20%, #0F2236 0%, #0A1420 50%, #050A12 100%);
```

Layered depth elements (apply in order, lowest z-index first):
1. **Noise texture overlay** — `opacity-[0.04]` SVG noise, `200px` tile, `aria-hidden`
2. **Radial vignette** — `rgba(0,0,0,0.6)` at edges, `rgba(0,0,0,0)` at center
3. **Brand glow** — subtle teal radial at center: `rgba(60,174,163,0.08)` radius ~40%
4. **Floating particles** — `ChocolateParticle`-style small glowing dots in teal/navy, `aria-hidden`

```tsx
{/* Register B section wrapper pattern */}
<section id="events" className="relative overflow-hidden py-24 sm:py-32"
  style={{ background: 'radial-gradient(ellipse at 50% 20%, #0F2236 0%, #0A1420 50%, #050A12 100%)' }}
>
  {/* Noise overlay */}
  <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:url('/noise.svg')]" aria-hidden />
  {/* Content */}
  <div className="relative z-10 mx-auto max-w-6xl px-4">…</div>
</section>
```

---

## Animation Guidelines

### Timing Reference

| Duration | Use |
|----------|-----|
| 150–200ms | Micro-interactions: hover, focus ring, button press |
| 300–400ms | State transitions: color change, border toggle |
| 500–600ms | Scroll-entry reveals: fade + slide up |
| 700–900ms | Screen-level entrances: Register B hero element |
| 1.5–3s | Idle loops: particle float, glow pulse |

### Scroll-Triggered Reveal (all sections)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.5 }}
>
```

### Staggered Lists

```tsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: i * 0.08 }}
  >
```

### Register B Motion (Events)

**Kiosk mockup entrance (spring):**
```tsx
initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
animate={{ opacity: 1, scale: 1, rotateY: 0 }}
transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.3 }}
```

**Idle glow pulse:**
```tsx
animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
```

### Reduced Motion

All decorative animations (`animate` loops, particles, spring entrances) must check `prefers-reduced-motion`. Use Framer Motion's `useReducedMotion()` hook or the CSS `@media (prefers-reduced-motion: reduce)` block in `index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

In component code:
```tsx
const shouldReduceMotion = useReducedMotion()
const idleVariant = shouldReduceMotion
  ? {}
  : { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 3, repeat: Infinity } }
```

---

## Accessibility

- All interactive elements have visible focus rings: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Icon-only interactive elements must have `aria-label`
- Decorative elements (particles, noise overlays, background shapes) must have `aria-hidden="true"`
- Gradient text: use `filter: drop-shadow()` for glow — never `text-shadow` (incompatible with `background-clip: text`)
- Color contrast: body text on light backgrounds must meet AA (4.5:1 minimum); white text on Register B dark surface exceeds AAA
- `aria-current="page"` is not applicable (SPA); active nav links use visual indicator only
- Language toggle: `aria-label="Switch to Spanish"` / `aria-label="Cambiar a inglés"`

---

## The Five "Less AI-Built" Rules

These are the concrete moves that differentiate CFT Services from a template-generated site. Every implementation must respect them.

### Rule 1 — No blurred background blobs

**Banned:** SVG ellipses with `filter: blur(...)` or `backdrop-blur` used decoratively as colored blobs floating behind content (e.g. the existing teal blob in `Services.tsx`).

**Replacement:** Hairline horizontal rules (`border-border/30`), fine grid lines, or subtle noise texture. Structural backgrounds only — white/near-white in Register A, deep dark in Register B.

### Rule 2 — No per-card gradient icon tiles

**Banned:** The pattern of a colored square/circle (`bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl p-3`) containing a white icon — applied to every card in a grid.

**Replacement:** Line icons (Lucide, `strokeWidth={1.5}`) in muted foreground color, preceded by a numbered index (`01 /`). The number provides structural identity; the icon supports readability. Color comes from the number's teal accent, not a filled shape.

### Rule 3 — Break the centered rhythm

**Banned:** Every section heading and subheading centered on the page, every card grid identical in column count and weight.

**Replacement:** Section headings flush-left. Body text in offset columns (not under the headline). Some sections use list layouts (numbered), others use two-column splits. Centering reserved for hero calls-to-action and the Events cinematic section only.

### Rule 4 — Space Grotesk for headlines

**Banned:** System fonts or Inter for headings.

**Required:** `font-display` (Space Grotesk, 500/600/700) on all `h1`, `h2`, `h3` elements and their Tailwind equivalents. Body text and UI labels use `font-sans` (Plus Jakarta Sans).

### Rule 5 — Considered radii and shadows

**Banned:** `rounded-3xl shadow-xl` as a default card style applied universally. Heavy drop shadows that make every card look like a "floating chip."

**Replacement:** 
- Cards: `rounded-lg` (8px) with `border border-border/50` — borders provide definition without lifting cards off the page
- Interactive surfaces: `rounded-md` (6px) 
- Pills / badges: `rounded-full`
- Shadows: use `shadow-sm` only for genuine elevation needs (dropdowns, modals); omit on static content cards

---

## Section-by-Section Reference

| Section | Register | Layout | Key Constraints |
|---------|----------|--------|-----------------|
| `Navbar` | A | Horizontal, sticky | No heavy blur; thin border-bottom |
| `Hero` | A | Asymmetric 2-col (lg) | Left-align headline; CTA row left |
| `Services` | A | Numbered list or 2-col grid | Rule 1, 2, 3 apply strictly |
| `Events` | B | Full-bleed dark, centered | Always dark; glow text; mockup centerpiece |
| `About` | A | 2-col split (text + visual) | No blobs; hairline dividers |
| `Work` | A | Portfolio grid | Card = image + title only, no gradients |
| `Contact` | A | Centered (CTA exception) | Simple, low-friction |
| `FinalCTA` | A | Centered band | One headline, one button |
| `Footer` | A | 3-col at lg, stacked mobile | Hairline top border; no heavy bg |

---

## i18n Design Constraints

- All section headings, eyebrow labels, capability titles, and body text must be translated
- Both `en.json` and `es.json` must have identical key sets — no orphan keys
- Spanish copy should have equivalent emphasis, not just a literal translation — if a headline is punchy in English, it must be punchy in Spanish
- Events section keys live under `events.*`; nav link key is `nav.events`

---

## Anti-Patterns (Do Not Do)

| Anti-Pattern | Why Banned | Correct Approach |
|--------------|------------|------------------|
| Colored SVG blobs with blur | Signals AI template; no design intent | Hairline rules, noise texture |
| Gradient icon tiles on every card | Homogenizes all cards; screams "template" | Line icons + numbered index |
| `rounded-3xl shadow-xl` on static cards | Makes cards look like floating UI components | `rounded-lg border border-border/50` |
| Centering every section | Monotonous rhythm; no hierarchy | Left-align headings, use offset layouts |
| Hardcoded hex colors in components | Breaks theme switching | Semantic Tailwind classes (`text-primary`, `bg-muted`). **Exception:** Register B (Events) glass/glow surfaces may use `rgba()` inline styles or arbitrary-value classes where no semantic token exists (e.g., `style={{ background: 'rgba(15,76,117,0.15)' }}` for glassmorphism, `text-[#3CAEA3]` for teal accents). Elsewhere, always use semantic classes. |
| `text-shadow` on gradient text | Incompatible with `background-clip: text` | `filter: drop-shadow()` |
| Hover-only states with no focus equivalent | Accessibility gap | Pair `:hover` with `:focus-visible` |
| `asChild` prop on `<Button>` | Not implemented in this project's Button | Wrap `<a>` around `<Button>` |
| Emoji as structural icons | Renders inconsistently; not semantic | Lucide icons with `aria-label` |
| Identical motion on every element | Animation loses meaning | Reserve motion for genuine state changes and entrances |
| Register B glow effects in Register A | Mixes design languages; confusing | Glow stays in Events section only |

---

## Assets

| Asset | Location | Notes |
|-------|----------|-------|
| Noise texture SVG | `public/noise.svg` | Used in Register B background; `aria-hidden` always |
| Kiosk mockup | `src/components/events/KioskMockup.tsx` | Code-built, CFT brand colors only — no client branding |
| Logo / wordmark | `src/assets/` | Used in Navbar and Footer |

---

## Relationship to Other Files

| File | Role |
|------|------|
| `PRODUCT.md` | Product context: audiences, goals, services list, voice |
| `CLAUDE.md` | Developer conventions: import order, component patterns, CLI commands |
| `src/index.css` | Token definitions: CSS custom properties, Tailwind v4 theme, font imports |
| `src/i18n/en.json`, `es.json` | All translatable copy — must stay in sync |
| `src/components/Events.tsx` | The only Register B section |
| `src/components/events/KioskMockup.tsx` | Register B centerpiece visual |

---

*Last updated: 2026-06-24 | Maintained by: CFT Services / Cristian F. Torres Collazo*
