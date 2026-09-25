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
- Night used as ink — primary text and headings
- Deep Mint (light) / Mint (dark) used sparingly as the accent — the cursor, a rule, an active state; never a default fill
- Generous whitespace, grid-based layouts, clear typographic hierarchy
- No glow effects, no heavy shadows, no theatrical depth
- Motion is subtle: fade-in, gentle slide-up on scroll entry

### Register B — Experiential Technology

> *Immersive · Dark in both themes · Depth + glow + motion*

Applied to: `Events` section only

- Full-bleed dark band (Night `#0A1628` base) — dark in light mode AND dark mode
- Mint and navy appear as **glow** rather than ink — radial halos, soft light
- Visual depth: layered backgrounds (noise texture, radial gradient, vignette)
- Interactive mockup with floating particles and ambient motion
- Motion is expressive: spring entrances, continuous idle loops, scroll-triggered reveals
- Intentionally echoes the craft of the `prizes-game` sibling project without its branding

The transition from Register A into Register B (as the user scrolls past Services into Events) should feel like stepping from a professional office into an event floor.

---

## Brand Identity — v2.0 (September 2026)

The identity rests on one element: **the cursor** — the bar that blinks when
someone is ready to type. It says "we build things" without a generic icon.
The mint cursor appears in everything that carries the brand. The source of
truth is the brand kit (`CFT-Brand-Assets/05-guidelines/CFT-Brand-Guidelines-v2.html`,
mirrored at `CFT-Brand-Guidelines.html` in this repo). v2 replaces the v1
hexagon identity and the teal/navy gradient palette.

- **Logo `CFT_`** — "CFT" in Space Grotesk Bold, the mint cursor after the T,
  and "SERVICES" in wide-tracked JetBrains Mono. The site ships the kit's
  horizontal lockups (`src/assets/cft-logo-horizontal-{light,dark}.svg`), which
  are the kit files with only the embedded C2PA metadata block removed.
- **Symbol `C_`** — small spaces only (favicon, app icon, profile photos).
  The logo and the symbol never appear side by side.
- **Never redraw the logo.** Do not type "CFT" in a font and add a bar. No
  shadows, gradients, outlines, or rotation. The cursor is always a flat
  rectangle.
- **The cursor may blink** on screens (1.1s, hard on/off). In print it is fixed.
  On the site it blinks once, after the hero headline (`.cft-cursor` in
  `src/index.css`), and holds solid for reduced-motion visitors.
- **Clear space** around the logo: at least 2× the cursor height. Minimum
  width 120px (the navbar renders it at 28–32px tall, ≈136–155px wide).

---

## Color Palette

### Brand Colors

One dark base, one accent. Mint is used sparingly — the cursor, a button, a
key figure — never as a background for long text.

| Name | Tailwind class | Hex | Usage |
|------|---------------|-----|-------|
| Night | `cft-night` | `#0A1628` | Main dark background; text on light |
| Navy | `cft-navy` | `#12355B` | Icon backgrounds, surfaces |
| Mint | `cft-mint` | `#20E3B2` | Cursor and accents **on dark** |
| Deep Mint | `cft-deep-mint` | `#0E7C6B` | Cursor and accents **on light** |
| Fog | `cft-fog` | `#F2F5F8` | Main light background |
| Slate | `cft-slate` | `#45596A` | Secondary text on light |
| Mint ink (themed) | `cft-mint-ink` | `#0E7C6B` light / `#20E3B2` dark | **Accent as text, rules, and the cursor** in Register A |

**The mint depends on the background.** Bright Mint all but disappears on
white (1.6:1); Deep Mint is 5.1:1 on white and 4.7:1 on Fog. Register A
accents always use `cft-mint-ink`, which swaps automatically. Raw `cft-mint`
is for the always-dark Events band only.

### Semantic Tokens

| Token | Light | Dark |
|-------|-------|------|
| `background` | Fog `#F2F5F8` | Night `#0A1628` |
| `foreground` | Night `#0A1628` | Fog `#F2F5F8` |
| `card` / `popover` | `#FFFFFF` | `#0E2139` |
| `muted` / `secondary` | `#E7ECF1` | `#0F2743` |
| `muted-foreground` | Slate `#45596A` (6.7:1 on Fog, 6.1:1 on muted) | `#9DB1C6` (8:1 on Night) |
| `border` / `input` | `#DCE3E9` | `#1F3D60` |
| `primary` | Night (white text) | Mint (Night text) |
| `accent` | Deep Mint (white text) | Mint (Night text) |
| `ring` | Deep Mint | Mint |
| `destructive` | `#C2410C` | `#FB923C` |

In dark mode `primary` resolves to Mint, so reserve `bg-primary` for the one
action that matters in a view (primary CTA, active filter pill). Hover and
focus states on lists and menus use `muted`, not `accent`.

### Register B Surface Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `events-bg` (base) | `#0A1628` | Night — section base background |
| `events-bg-soft` | `#0E2440` | Raised card/panel surface |
| `events-bg-deep` | `#050B16` | Vignette edges / deepest layer |
| `events-glow` | `#20E3B2` | Mint glow accent |

These tokens are defined in `src/index.css` (`@theme`) as the canonical Register B palette reference. The Events components consume them as inline `rgba()`/hex values per the Register B glass/glow exception — not via `bg-events-bg` Tailwind utilities. Mint in `rgba()` form is `rgba(32,227,178,α)`; Navy is `rgba(18,53,91,α)`.

**No gradient text.** v2 has one accent and no gradients on type. The Events
headline is solid white at 95%; emphasis comes from size and weight.

---

## Typography

### Font Stack

| Role | Font | Weights | CSS Token | Tailwind Class |
|------|------|---------|-----------|---------------|
| **Titles, names, running text** | Space Grotesk | 400, 500, 700 (variable 400–700) | `--font-display`, `--font-sans` | `font-display`, `font-sans` |
| **Labels, data, technical detail** | JetBrains Mono | 400, 500 | `--font-mono` | `font-mono` |

Both load from one Google Fonts `<link>` in `index.html` (never a CSS
`@import`, which delays first paint):

```
https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400..700&display=swap
```

### Type Scale

| Element | Classes | Notes |
|---------|---------|-------|
| Section headline (A) | `font-display font-bold tracking-tight text-3xl sm:text-4xl` | Left-aligned or asymmetric |
| Section headline (B) | `font-display font-bold tracking-tight text-4xl sm:text-5xl` | Solid white, no gradient |
| Label (eyebrow) | `font-mono text-xs font-normal uppercase tracking-[0.2em]` | `cft-mint-ink` in A; `#20E3B2` in B |
| Card title | `font-display font-semibold text-lg` | No `tracking-tight` on small sizes |
| Body text | `font-sans text-base text-muted-foreground` | Line height `leading-relaxed` |
| Caption / micro | `font-sans text-sm text-muted-foreground` | |
| Numbered index | `font-mono tabular-nums` at reduced opacity | `01 /` indicators, as in the brand guidelines |

### Typography Rules

- **All section headings use `font-display`** (Space Grotesk)
- **JetBrains Mono is for labels, data, and technical detail** — uppercase with wide tracking. Never for headlines or paragraphs
- **Numbers (`01 /`, `02 /`)** use `font-mono tabular-nums` at reduced opacity and are always `aria-hidden` — they are structural indices, not focal points. The card numeral uses `text-foreground/55` and the hero index `text-foreground/50`; below that the numeral is not quiet, it is invisible
- **No centered body paragraphs over 60 characters** — left-align or use asymmetric layouts

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
  className="rounded-lg p-5"
  style={{ background: 'rgba(14,36,64,0.75)', border: '1px solid rgba(32,227,178,0.18)', backdropFilter: 'blur(8px)' }}
>
  <Monitor className="size-5 mb-4" style={{ color: '#20E3B2' }} strokeWidth={1.5} />
  <h3 className="font-display font-semibold text-white/90 mb-2">Interactive Kiosk Games</h3>
  <p className="font-sans text-sm text-white/55 leading-relaxed">…</p>
</div>
```

**Register B Exception:** The inline `rgba()` and `#20E3B2` color values above are intentional. Register B (Events) uses glassmorphism and glow effects where semantic tokens don't map to exact values. This is the sole exception to the "no hardcoded hex" rule (see Anti-Patterns). All other sections must use semantic Tailwind classes.

### Buttons

| Variant | Use | Classes |
|---------|-----|---------|
| `default` | Primary CTA | `bg-primary text-primary-foreground hover:bg-primary/90` |
| `accent` | Mint CTA | `bg-accent text-accent-foreground hover:bg-accent/90` (Deep Mint light / Mint dark) |
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
<span className="text-cft-mint-ink mb-4 inline-block font-mono text-xs font-normal tracking-[0.2em] uppercase">
  {t('section.eyebrow')}
</span>
```

**Note:** Register A labels use the `text-cft-mint-ink` utility, which resolves to Deep Mint `#0E7C6B` in light and Mint `#20E3B2` in dark so the label clears AA in both themes. Register B labels keep the inline `#20E3B2` — on Night it measures 10.9:1. Never put bright Mint as text on a light surface.

---

## Background Treatments

### Register A

- **Default:** `bg-background` (Fog in light / Night in dark)
- **Alternating section:** `bg-muted/30` — very subtle tint, no pattern
- **What NOT to do:** no blurred SVG color blobs, no `backdrop-blur` decorative shapes, no colored section backgrounds that compete with content
- **Allowed accent:** fine horizontal hairline rule (`<hr className="border-border/30">`) as a section separator; or a 1px-wide vertical rule in multi-column layouts

### Register B (Events — always dark)

```css
/* Base layer — always dark regardless of theme */
/* Uses Register B Surface Tokens: events-bg (#0A1628), events-bg-soft (#0E2440), events-bg-deep (#050B16) */
background: radial-gradient(ellipse at 50% 10%, #0E2440 0%, #0A1628 55%, #050B16 100%);
```

Layered depth elements (apply in order, lowest z-index first):
1. **Noise texture overlay** — `opacity-[0.04]` SVG noise, `200px` tile, `aria-hidden`
2. **Radial vignette** — `rgba(0,0,0,0.6)` at edges, `rgba(0,0,0,0)` at center
3. **Brand glow** — subtle mint radial at center: `rgba(32,227,178,0.07)` radius ~40%
4. **Floating particles** — small glowing dots in mint/navy, `aria-hidden`

```tsx
{/* Register B section wrapper pattern */}
<section id="events" className="relative overflow-hidden py-24 sm:py-32"
  style={{ background: 'radial-gradient(ellipse at 50% 10%, #0E2440 0%, #0A1628 55%, #050B16 100%)' }}
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

- All interactive elements have visible focus rings: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`. `--tw-ring-offset-color` is bound to `--color-background` in `@layer base`; Tailwind's white default prints a halo around every focused control in dark mode
- **A skip link is the first focusable element on the page**, targeting `#main`
- **Every `<section>` is named** via `aria-labelledby` pointing at its own heading, so landmark navigation lists real section names
- **Horizontal carousels** (Services, Work) put `tabIndex={0}`, `role="region"`, and a label on the ScrollArea *viewport* via `viewportProps`. Without it, cards past the fold are unreachable by keyboard
- **Never nest interactive elements.** Buttons are not wrapped in anchors — style the anchor with `buttonVariants()` from `@/components/ui/button` instead. Flip cards expose one control per visible face and mark the hidden face `inert`, moving focus to the face that became visible
- **No rendered output may branch on a client-only signal** (`resolvedTheme`, `prefers-reduced-motion`). The prerendered document is always light and always English; branching on theme breaks hydration. Swap themed assets and icons with `dark:` CSS variants instead
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

**Replacement:** Line icons (Lucide, `strokeWidth={1.5}`) in muted foreground color, preceded by a numbered index (`01 /`). The number provides structural identity; the icon supports readability. Color comes from the mint accent, not a filled shape.

### Rule 3 — Break the centered rhythm

**Banned:** Every section heading and subheading centered on the page, every card grid identical in column count and weight.

**Replacement:** Section headings flush-left. Body text in offset columns (not under the headline). Some sections use list layouts (numbered), others use two-column splits. Centering reserved for hero calls-to-action and the Events cinematic section only.

### Rule 4 — Space Grotesk for headlines

**Banned:** System fonts or Inter for headings.

**Required:** `font-display` (Space Grotesk) on all `h1`, `h2`, `h3` elements. Running text also uses Space Grotesk (`font-sans`); labels and data use `font-mono` (JetBrains Mono).

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
| Hardcoded hex colors in components | Breaks theme switching | Semantic Tailwind classes (`text-primary`, `bg-muted`). **Exception:** Register B (Events) glass/glow surfaces may use `rgba()` inline styles or arbitrary-value classes where no semantic token exists (e.g., `style={{ background: 'rgba(14,36,64,0.75)' }}` for glassmorphism, `text-[#20E3B2]` for mint accents). Elsewhere, always use semantic classes. |
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
| Logo / wordmark | `src/assets/cft-logo-horizontal-{light,dark}.svg` | v2 kit files (CSS-swapped by theme); Navbar and Footer |
| Favicons, OG image | `public/` | v2 kit `04-web/` and `06-banners/CFT-og-image.png`; smaller PNG sizes resized from `favicon-512.png` |

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

*Last updated: 2026-09-25 (brand v2.0) | Maintained by: CFT Services / Cristian F. Torres Collazo*

---

## Rendering & SEO Contract

The site is a client-rendered SPA on static hosting, so `npm run build` bakes the rendered markup into `dist/index.html`:

```
tsc -b
vite build                                          # client bundle
vite build --ssr src/entry-server.tsx --outDir dist-ssr
node scripts/prerender.mjs                          # inject markup, drop dist-ssr
```

Constraints this places on component code:

| Rule | Why |
|------|-----|
| No rendered output may depend on `resolvedTheme` | The prerender is always light; a themed `src` or icon fails hydration. Use `dark:` variants |
| No rendered output may depend on `prefers-reduced-motion` for *layout* | Same reason. Motion values may differ; the recovery is graceful but avoid where cheap |
| Values that animate from a placeholder must render their real value on the server | The stat counters resolve to `20+`, never `0+`, when `progress === null` |
| Section `id`s are stable string literals | They are anchor targets, sitemap fragments, and scroll-spy keys — not generated ids |

**Language.** English is prerendered at `/`; Spanish is the same document with `?lang=es`, switched by i18next at runtime. `src/hooks/use-document-language.ts` keeps `<html lang>`, `og:locale`, the canonical link, and the URL parameter in sync. Known limitation: a crawler that does not execute JavaScript sees English markup at the `?lang=es` URL. Moving Spanish to a prerendered `/es/` path would remove that; it is the natural next step if Spanish organic traffic matters.

**Fonts** load from a single `<link>` in `index.html`. Never `@import` them in `index.css` — that chains the font request behind the stylesheet and delays every heading.

**Tailwind source scanning** is scoped with `source(none)` plus explicit `@source` lines. Automatic detection also scans the markdown docs, which compiled Tailwind examples out of `CLAUDE.md` and `DESIGN.md` into shipped CSS.

---

## Deferred Critique Findings

Started at the Task 11 Impeccable critique (2026-06-25); reviewed during the polish + SEO pass (2026-08-15).

| # | Finding | Severity | Status |
|---|---------|----------|--------|
| D1 | `overused-font` detector warning for Plus Jakarta Sans | Warning | **Resolved** — brand v2 replaced it with Space Grotesk + JetBrains Mono |
| D2 | Footer `NAV_LINKS` omits `#events` | P3 | **Resolved** — Events is in the footer nav |
| D3 | Work "coming soon" card text hardcoded in English | P3 | **Resolved** — `work.comingSoon` / `work.comingSoonSub` exist in both locales |
| D4 | `KioskMockup.tsx` uses `key={i}` on PARTICLES map | P3 | **Deferred.** PARTICLES is a static constant with no reordering; stable index keys are safe |
| D5 | Stat values (`20+`, `10+`, `8+`) hardcoded in `About.tsx` | P3 | **Deferred.** Still literals; move to i18n if the figures start changing often |
| D6 | No inline (on-blur) form validation in Contact | P2 | **Resolved** — per-field `onBlur` validators, `aria-invalid`, `aria-describedby`, focus-to-first-error |
| D7 | Services section eyebrow intentionally absent | Design decision | **Intentional.** Services jumps straight to `h2` as a deliberate rhythm break |
| D8 | Spanish is not prerendered — `?lang=es` serves English markup to non-JS crawlers | P2 | **Open.** Fix by prerendering an `/es/` path; see Rendering & SEO Contract |
| D9 | Hydration mismatch for reduced-motion visitors | P3 | **Open.** Framer `initial` values differ from the server render; React recovers with one client render |
| D10 | Original project PNGs retained beside the shipped WebP | P3 | **Open.** Unreferenced masters in `src/assets/projects/`; kept as source, never bundled |
