# Project Map

## Snapshot

- Project: `Team Tupina`
- Update baseline: `2026-04-30`
- Architecture: static multi-page website
- Runtime: browser-only, no backend, no build step
- Stack: `HTML + CSS + Vanilla JS + local Anime.js bundle`
- Main goal: lead capture and qualification via `WhatsApp`

## Current Pages

- `index.html`: main conversion funnel
- `privacy.html`: privacy policy
- `terms.html`: terms of use

## Core Assets

- `styles.css`: visual system, layout, responsive behavior, glassmorphism, mobile CTA and section spacing
- `script.js`: menu toggle, sticky header state, section-aware navigation, scroll progress, Anime.js reveals, ambient motion and interaction handling
- `assets/logo-team.png`: main brand image
- `assets/favicon-teamtupina.png`: favicon and app icon
- `assets/vendor/anime.umd.min.js`: local motion dependency
- `manifest.webmanifest`: mobile install metadata
- `robots.txt`: crawler access rule

## Architecture Classification

- Site type: static landing page with legal support pages
- Rendering model: client-side enhancement only
- State layer: none
- API layer: none
- Storage layer: none
- Build tooling: none detected
- Deployment fit: `GitHub Pages`, `Netlify`, `Vercel static`, `Cloudflare Pages`, traditional shared hosting

## Funnel Structure

### Home page flow

1. Hero with primary promise and first CTA
2. Pain framing
3. Method and multidisciplinary structure
4. Journey / onboarding steps
5. Results-oriented expectation section
6. Compact differentiator band
7. FAQ block
8. Final CTA
9. Footer with legal and social links

### Legal flow

1. User reaches `privacy.html` or `terms.html`
2. Reads operational/legal support content
3. Returns to `index.html` through header or footer

## Navigation Map

### Internal routes

- `/index.html`
- `/privacy.html`
- `/terms.html`

### In-page anchors

- `#metodo`
- `#jornada`
- `#resultados`
- `#faq`
- `#contato`

### External exits

- `https://wa.me/...`
- `https://www.instagram.com/teamtupina/`

## Motion System

### Hero motion

- line-by-line title reveal
- staged CTA, pill and metric entrance
- animated dashboard entry
- looping accent/glow behavior

### Section motion

- grouped reveal for card grids
- timeline entrance
- FAQ entrance
- footer and legal header reveal

### Motion safeguards

- reduced-motion fallback via `matchMedia`
- hover interactions applied only on hover-capable devices
- local Anime.js bundle removes CDN dependency

## UX / Layout Baseline

- Desktop reference target: `1920x1080` at browser zoom `100%`
- Section scale reduced to improve fold distribution
- Cards, shadows, radii and spacing compressed for denser reading without crowding
- Sticky header includes section highlight and scroll progress bar
- Mobile includes a fixed WhatsApp CTA
- Responsive refinement pass now includes intermediate adjustments for `1360px`, `1180px`, `1024px`, `960px`, `900px`, `720px`, `640px` and `520px`

## SEO And Content Notes

- Home page now uses stronger keyword alignment around:
  - emagrecimento online
  - hipertrofia
  - reconstrucao corporal
  - consultoria online
  - treino, nutricao e saude
- `FAQPage` structured data added on the home page
- `robots` meta added:
  - `index,follow` on home
  - `noindex,follow` on legal pages
- `manifest.webmanifest` added for mobile/PWA-style metadata

## File Inventory

```text
team-tupina/
|- assets/
|  |- vendor/
|  |  `- anime.umd.min.js
|  |- favicon-teamtupina.png
|  `- logo-team.png
|- index.html
|- privacy.html
|- terms.html
|- styles.css
|- script.js
|- manifest.webmanifest
|- robots.txt
|- PROJECT_MAP.md
|- SYSTEM_DOCUMENTATION.md
|- MANUAL_DE_MANUTENCAO.md
`- GUIA_DE_IMAGENS.md
```

## Known Operational Notes

- The WhatsApp number remains the same across the project and should be confirmed manually if the production contact changes.
- Open Graph image URLs are relative because the production canonical domain was not provided in the project files.
- The site remains intentionally framework-free and static-hosting friendly.

## Deploy Set

Required for production:

- `index.html`
- `privacy.html`
- `terms.html`
- `styles.css`
- `script.js`
- `manifest.webmanifest`
- `robots.txt`
- `assets/`

## Recommended Maintenance Priorities

1. Confirm and standardize production domain for canonical and sitemap rollout
2. Replace abstract result visuals with authorized proof assets when available
3. Reconfirm WhatsApp contact formatting before push to production
4. Keep legal copy review date updated on future revisions
