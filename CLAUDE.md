# CLAUDE.md — CFT Services

## Project Overview

CFT Services is a minimalistic, responsive company website built with Vite + React 19 + TypeScript. It features i18n (EN/ES), dark/light theming, and deploys to GitHub Pages.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint (flat config, TS + React rules)
npm run preview   # Preview production build locally
```

Build is two-step: `tsc -b` (type safety) then `vite build` (bundling).

## Architecture

```
src/
├── components/        # Page sections (PascalCase.tsx)
│   └── ui/            # Base UI components (shadcn-style, lowercase.tsx)
├── hooks/             # Custom hooks (use-*.tsx)
├── i18n/              # Translation files (en.json, es.json, index.ts)
├── lib/               # Utilities (utils.ts with cn() helper)
├── assets/            # Static assets
├── App.tsx            # Root component — assembles all sections
├── main.tsx           # Entry point — wraps App in ThemeProvider
└── index.css          # Tailwind v4 + CSS variables + theme tokens
```

## Import Aliases

Use `@/` for all src imports. Configured in `tsconfig.json` and `vite.config.ts`.

```typescript
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'
```

## Import Order Convention

1. React / built-in hooks
2. Third-party libraries (`react-i18next`, `framer-motion`, `lucide-react`)
3. Local UI components (`@/components/ui/*`)
4. Local components, hooks, utils (`@/components/*`, `@/hooks/*`, `@/lib/*`)

## Brand Design System

> **Source of truth for visual decisions is `DESIGN.md`**. CLAUDE.md covers developer conventions; DESIGN.md governs every color, type, spacing, motion, and component shape decision.

### Two-Register Design Language: "Premium Experiential"

The site operates in two coordinated visual registers that share a palette but communicate in different emotional keys:

- **Register A — IT & Digital Services** (`Hero`, `Services`, `About`, `Work`, `Contact`, `FinalCTA`, `Footer`, `Navbar`): Calm, editorial, light-first. Navy as ink, teal as sparse accent, generous whitespace, no glow effects.
- **Register B — Experiential Technology** (`Events` section only): Immersive, **dark in both light and dark themes**, depth + glow + motion. Full-bleed `#0A1420` band; teal appears as glow, not ink; spring entrances + idle loops.

The transition from Register A into Register B as the user scrolls from Services into Events should feel like stepping from a professional office onto an event floor. Register B glow effects must never appear in Register A sections.

### Colors

| Token               | Hex       | Usage                            |
|----------------------|-----------|----------------------------------|
| `cft-navy-deep`     | `#0F4C75` | Primary (light), headings        |
| `cft-navy-medium`   | `#1B6B93` | Secondary navy                   |
| `cft-navy-dark`     | `#1A1A2E` | Deepest navy                     |
| `cft-teal-primary`  | `#3CAEA3` | Accent, CTAs, primary (dark)     |
| `cft-teal-light`    | `#20E3B2` | Highlight, gradients             |
| `cft-teal-soft`     | `#E8F8F5` | Light teal backgrounds           |

#### Register B (Events) surface tokens

| Token (CSS var)        | Hex       | Usage                        |
|------------------------|-----------|------------------------------|
| `--color-events-bg`    | `#0A1420` | Section base background       |
| `--color-events-bg-soft` | `#0F2236` | Raised card/panel surface   |
| `--color-events-glow`  | `#20E3B2` | Teal glow accent              |

These are defined in `@theme` in `src/index.css`. Register B is the **only** exception to the "no hardcoded hex" rule — glassmorphism and glow surfaces use `rgba()` inline styles where no semantic token exists.

### Theme Behavior

- **Light mode**: Navy (`#0F4C75`) is primary, teal is accent.
- **Dark mode**: Teal (`#3CAEA3`) becomes primary, navy becomes accent.
- Theme class (`dark`/`light`) is applied to `<html>` element.
- CSS variables swap via `.dark { ... }` selector in `index.css`.
- Use semantic color classes (`bg-primary`, `text-muted-foreground`, `border-border`) — never hardcode hex values in Register A components.
- **The Events section is always dark regardless of theme** — it uses hardcoded `#0A1420`-family backgrounds, never `bg-background`.

### Typography

- **Display font**: Space Grotesk (Google Fonts, weights 500/600/700). CSS token: `--font-display`. Tailwind utility: `font-display`.
- **Body font**: Plus Jakarta Sans (Google Fonts, weights 400/500/600). CSS token: `--font-sans`. Tailwind utility: `font-sans`.
- Both fonts are imported via a single `@import url(...)` at the top of `src/index.css` and registered in the Tailwind v4 `@theme` block — no `tailwind.config.js` needed.
- **All section headings (`h1`–`h3`) must use `font-display`** (Space Grotesk). Body text and UI labels use `font-sans` (Plus Jakarta Sans).
- Heading classes: `font-display font-bold tracking-tight text-3xl sm:text-4xl` (Register A) or `text-4xl sm:text-5xl` with gradient treatment (Register B).
- Body: `font-sans text-muted-foreground leading-relaxed`.

### The Five "Less AI-Built" Rules

These moves differentiate the site from template-generated output. Every implementation must respect them:

1. **No blurred background blobs** — no SVG ellipses with `filter: blur()` floating behind content. Use hairline rules, noise texture, or structural backgrounds only.
2. **No per-card gradient icon tiles** — no `bg-gradient-to-br rounded-xl p-3` containing a white icon on every card. Use line icons (`strokeWidth={1.5}`) preceded by a numbered index (`01 /`).
3. **Break the centered rhythm** — section headings flush-left. Centering reserved for CTAs and the Events Register B section only.
4. **`font-display` for all headlines** — Space Grotesk on every `h1`/`h2`/`h3`. Never system fonts or body font for headings.
5. **Considered radii and shadows** — cards use `rounded-lg border border-border/50`, not `rounded-3xl shadow-xl`. Shadows only for genuine elevation (dropdowns, modals).

### Events Section Pattern (Register B)

`src/components/Events.tsx` is the only Register B section. Key constraints:

- **Always dark in both themes** — section background is a hardcoded radial gradient (`#0F2236` → `#0A1420` → `#050A12`), never `bg-background`.
- **Layered depth**: noise texture overlay (`opacity-[0.04]`) + radial vignette + brand teal glow radial + floating particles — all `aria-hidden="true"`, all `pointer-events-none`.
- **Gradient headline text** with `filter: drop-shadow()` (never `text-shadow` — incompatible with `background-clip: text`).
- **Glassmorphism capability cards** using `rgba()` inline styles and `backdropFilter` — the documented exception to the no-hex rule.
- **Motion**: spring entrances for the KioskMockup, scroll-triggered reveals for copy, idle glow pulse loops — all gated on `useReducedMotion()`.
- The `KioskMockup` lives in `src/components/events/KioskMockup.tsx` — a code-built interactive mockup using CFT brand colors only, no client branding.

### Spacing & Layout

- Max content width: `max-w-6xl` (1152px), centered with `mx-auto`.
- Section padding: `px-4 py-24 sm:py-32`.
- Responsive: mobile-first, breakpoints at `sm:` (640px), `md:` (768px), `lg:` (1024px).

## Component Patterns

### Page Sections

Each section is a named export function using `<section id="...">` for anchor navigation:

```tsx
export function SectionName() {
  const { t } = useTranslation()
  return (
    <section id="section-name" className="px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* content */}
      </div>
    </section>
  )
}
```

### UI Components (shadcn-style)

Base components in `src/components/ui/` follow this pattern:

- Use `forwardRef` for ref forwarding
- Extend native HTML attributes
- Accept `className` and merge with `cn()`
- Set `displayName`
- Use `cva` (class-variance-authority) for variants

```tsx
const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <element ref={ref} className={cn('base-classes', className)} {...props} />
  )
)
Component.displayName = 'Component'
```

### Button Variants

| Variant     | Purpose                          |
|-------------|----------------------------------|
| `default`   | Primary action (navy/teal bg)    |
| `secondary` | Secondary action (muted bg)      |
| `outline`   | Bordered, transparent bg         |
| `ghost`     | No bg, hover reveals muted       |
| `accent`    | Teal CTA                         |

Sizes: `default`, `sm`, `lg`, `icon`.

## Animation Patterns (Framer Motion)

### Scroll-triggered reveal

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.5 }}
>
```

### Staggered children

Add incremental `delay: i * 0.1` in mapped lists.

### Entry animation (hero, navbar)

```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.3 }}
```

### Conditional mount/unmount (mobile menu)

Wrap with `<AnimatePresence>` and use `exit` prop.

## i18n

- Languages: `en`, `es`. Files at `src/i18n/{lang}.json`.
- Keys are nested objects grouped by section: `nav.*`, `hero.*`, `services.*`, `about.*`, `contact.*`, `footer.*`.
- Access via `const { t } = useTranslation()` then `t('section.key')`.
- Language toggle cycles `en` ↔ `es`.
- **Both language files must stay in sync** — every key added to one must exist in the other.

## Theming

- Provider: `ThemeProvider` in `src/hooks/use-theme.tsx`.
- Hook: `useTheme()` returns `{ theme, setTheme, resolvedTheme }`.
- `resolvedTheme` is always `'dark' | 'light'` (resolves `'system'`).
- Persisted in `localStorage` key `'theme'`.

## Deployment

- **Target**: GitHub Pages at `/cft-services/` subpath.
- **Workflow**: `.github/workflows/deploy.yml` — triggers on push to `main`.
- **Base URL**: Set in `vite.config.ts` as `base: '/cft-services/'`.
- **Activation**: Repo Settings → Pages → Source: "GitHub Actions".

## ESLint

Flat config (`eslint.config.js`) with:
- `@eslint/js` recommended
- `typescript-eslint` recommended
- `react-hooks` recommended
- `react-refresh` vite rules

Files exporting both components and non-components (hooks, variant objects) use:
```typescript
// eslint-disable-next-line react-refresh/only-export-components
```

## Key Conventions

- **No hardcoded colors** — use semantic Tailwind classes (`bg-primary`, `text-foreground`).
- **No `asChild` prop** — custom Button doesn't support Radix Slot; wrap `<a>` around `<Button>` instead.
- **All interactive elements** need `aria-label` when icon-only.
- **Focus rings**: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
- **Disabled state**: `disabled:pointer-events-none disabled:opacity-50`.
- **Smooth scroll**: Enabled globally via `html { scroll-behavior: smooth }`.
