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

### Colors

| Token               | Hex       | Usage                            |
|----------------------|-----------|----------------------------------|
| `cft-navy-deep`     | `#0F4C75` | Primary (light), headings        |
| `cft-navy-medium`   | `#1B6B93` | Secondary navy                   |
| `cft-navy-dark`     | `#1A1A2E` | Deepest navy                     |
| `cft-teal-primary`  | `#3CAEA3` | Accent, CTAs, primary (dark)     |
| `cft-teal-light`    | `#20E3B2` | Highlight, gradients             |
| `cft-teal-soft`     | `#E8F8F5` | Light teal backgrounds           |

### Theme Behavior

- **Light mode**: Navy (`#0F4C75`) is primary, teal is accent.
- **Dark mode**: Teal (`#3CAEA3`) becomes primary, navy becomes accent.
- Theme class (`dark`/`light`) is applied to `<html>` element.
- CSS variables swap via `.dark { ... }` selector in `index.css`.
- Use semantic color classes (`bg-primary`, `text-muted-foreground`, `border-border`) — never hardcode hex values in components.

### Typography

- **Font**: Inter (Google Fonts), weights 300–700.
- **Headings**: `font-bold tracking-tight`, sizes `text-3xl sm:text-4xl`.
- **Body**: `text-muted-foreground`, size `text-sm` or `text-lg`.

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
