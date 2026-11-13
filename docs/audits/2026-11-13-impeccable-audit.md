# Impeccable audit + premium redesign — 2026-11-13

Audit run against the production build (`pnpm build && pnpm preview`) at
1440×900 (light and dark) and 390×844, then fixed in the same branch.

## Health score

| # | Dimension | Before | After | Key finding (before) |
|---|-----------|:-----:|:-----:|----------------------|
| 1 | Accessibility | 3 | 4 | Phone placeholder used an SSN pattern (`XXX-XX-XXXX`); carousels hid 2 of 5 services and half the work past the fold |
| 2 | Performance | 3 | 3 | Fine. JS 457 KB → 444 KB; new project captures are WebP with 720/1440 srcset (~18–60 KB each) |
| 3 | Responsive | 3 | 4 | Cards cut off at the right edge on desktop; drag-to-scroll required on a mouse |
| 4 | Theming | 4 | 4 | Tokens used throughout; no regressions |
| 5 | Anti-patterns | 1 | 3 | Six template tells (below) |
| | **Total** | **14/20** | **18/20** | Good → Excellent |

## Anti-pattern verdict (before): looked template-built

1. **Identical card grid** — five same-size service cards (number, icon, title, text, checkmarks) in a sideways carousel.
2. **Glass card grid** — four translucent capability cards in Events.
3. **Hero-metric template** — `20+ / 10+ / 8+` in three cards with count-up animation.
4. **Icon-pill marquee** — twelve industries scrolling in two directions.
5. **Flip cards** — 3:4 tiles with a client logo and "Tap to learn more"; the work itself was never shown.
6. **Two closing CTAs in a row** — "Not sure what you need?" form, then "Ready to stop guessing?" box.

Also: no imagery above the fold (a hairline grid where proof belonged), Title Case headlines, and the Work section was missing four shipped projects.

## What changed

| Area | Change |
|------|--------|
| **Work** | Rebuilt as case studies with real captures of the live sites. Added **Masterspace**, **Clínica Dorsal**, **Fudis** and **Itinerario Escolar** (M. Adviser and Consultant, Inc.). The school app is private, so it gets a code-built illustration with invented data. Older projects moved to a ruled "More projects" index; automations keep their detail drawer. Section moved to right after the hero. |
| **Hero** | Larger headline (clamp to 4.25rem), sentence case. Imagery is a fanned stack of three live client sites with spring-smoothed pointer parallax (mouse only; off for reduced motion). Client names set as type under a hairline. |
| **Services** | Ruled numbered index — all five visible at once, no carousel. |
| **Events** | Capabilities as a ruled 2-up list instead of glass cards. |
| **About** | Statement split; figures as a ruled row (values from i18n, no counters); process as three ruled columns; industries set as type. |
| **Contact** | Absorbed FinalCTA: ask + "book a free call" + direct lines on the left, form on the right. Phone placeholder fixed. |
| **Navbar** | "Start a project" button from `lg`; links follow the new order. |
| **Copy** | Headings in sentence case (EN + ES); `nav.work` → "Proyectos" in Spanish. |

## Verified

- `pnpm lint`, `pnpm format:check`, `pnpm build` (tsc + client + SSR + prerender) all pass.
- No horizontal overflow at 390, 1024 or 1440. No broken images. No console errors in English.
- Drawer opens from the index rows; every external link announces "opens in a new tab".
- EN/ES key parity checked by script.

## Still open

- **D8 / hydration on `?lang=es`** (pre-existing): the prerender is English, so a Spanish visit logs React error #418 and React re-renders on the client. Prerendering an `/es/` path fixes both this and Spanish SEO.
- Captures are point-in-time. Re-shoot when a client site changes (steps in DESIGN.md → Project imagery).
