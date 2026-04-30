# Project Map

## Overview

- Project name: Team Tupina
- Current architecture: static multi-page site
- Runtime model: browser-only rendering with HTML, CSS, vanilla JavaScript and a vendored Anime.js motion layer
- Deployment fit: static hosting (`GitHub Pages`, `Netlify`, `Vercel static`, `Cloudflare Pages`, traditional shared hosting)

This project is a marketing landing page with two legal support pages. There is no backend, no build step, no package manifest and no external framework dependency in the current implementation.

## Architecture

### Frontend stack

- `index.html`: landing page and primary conversion funnel
- `privacy.html`: privacy policy page
- `terms.html`: terms of use page
- `styles.css`: global visual system, glassmorphism surfaces, layout, responsive rules and motion-ready states
- `script.js`: mobile menu toggle, header state, Anime.js timelines, staggered reveals, ambient motion and progress animations
- `assets/vendor/anime.umd.min.js`: local Anime.js UMD bundle used by the site without a build step

### Rendering model

1. Browser loads one of the static HTML entry points.
2. Each page imports the same global stylesheet.
3. Each page imports the same script bundle.
4. JavaScript enhances the experience with:
   - mobile navigation open/close
   - sticky header state changes on scroll
   - hero intro timeline
   - staggered reveals for card-based sections
   - animated progress bars
   - ambient background motion
5. Conversion exits the site through external links to `WhatsApp` and `Instagram`.

### Current architectural classification

- Type: static multi-page site
- Styling approach: handcrafted CSS
- Scripting approach: vanilla JavaScript
- Data layer: none
- State management: none
- API integration: none
- Build tooling: none detected

## Dependencies And Libraries

### Direct dependencies

No package manager or build pipeline was identified.

The site now includes a vendored runtime dependency:

- `Anime.js` UMD bundle in `assets/vendor/anime.umd.min.js`

### Browser features used

- `Anime.js` APIs such as `animate()`, `createTimeline()` and `stagger()`
- `IntersectionObserver` for reveal triggers
- `matchMedia` for reduced-motion handling
- standard DOM APIs for menu behavior
- standard DOM APIs for header and progressive enhancement

### External services referenced

- `https://wa.me/...` for lead capture
- `https://www.instagram.com/teamtupina/` for social proof and brand presence

## Folder Structure

Observed in the original project directory:

```text
Team Tupina/
|- assets/
|  |- vendor/
|  |  `- anime.umd.min.js
|  |- favicon-teamtupina.png
|  `- logo-team.png
|- Ensaio Barra 11-04/
|  |- 264 .jpg files
|  `- 62 .mp4 files
|- index.html
|- privacy.html
|- terms.html
|- styles.css
|- script.js
|- Favicon-TeamTupina.png
|- Logo Team.png
|- Team-Tupina-hosting.zip
`- Team-Tupina-hosting-v2.zip
```

### Asset notes

- `assets/logo-team.png`: actively used by the site, `625x625`
- `assets/favicon-teamtupina.png`: actively used by the site, `200x200`
- `assets/vendor/anime.umd.min.js`: actively used local motion engine bundle
- `Logo Team.png` and `Favicon-TeamTupina.png`: duplicate root-level source files, not referenced by the live markup
- `Ensaio Barra 11-04/`: media archive not referenced by the current HTML
- `*.zip`: export packages, should not be part of a normal source-control commit

### Storage footprint

- Total files detected: `337`
- Total project size detected: about `5.52 GB`
- Media archive alone: `326` files, about `5.52 GB`

This means the deployable website is lightweight, but the repository footprint becomes very large if the raw media archive stays inside the project root.

## Routes And Navigation

### Internal routes

- `/index.html`
- `/privacy.html`
- `/terms.html`

### In-page anchors on the landing page

- `#top`
- `#metodo`
- `#jornada`
- `#provas`
- `#contato`

### External exits

- WhatsApp CTA in header
- WhatsApp CTA in hero
- WhatsApp CTA in final section
- Instagram link in footer

## Data Flow

### Conversion flow

1. User lands on `index.html`.
2. User navigates sections through anchor links.
3. User consumes value proposition, proof placeholders and CTA blocks.
4. User exits to WhatsApp for direct contact.

### Legal flow

1. User reaches `privacy.html` or `terms.html` through the footer.
2. User reads supporting policy content.
3. User returns to the landing page through the header nav link.

### Runtime flow

- There is no form submission.
- There is no local storage usage.
- There is no API fetch.
- There is no server-side rendering.
- Motion is executed fully on the client through Anime.js plus viewport observers.

## Motion And Visual System

### Motion stack

- Hero intro timeline for primary messaging, CTAs, pills, stats and dashboard cards
- Section stagger reveals for card collections
- Animated metric bars for method pillars
- Ambient looping motion for decorative glass orbs and glow elements
- Reduced-motion fallback via `matchMedia('(prefers-reduced-motion: reduce)')`

### Visual stack

- Purple-led identity preserved
- Stronger glassmorphism on header, cards, footer and dashboard surfaces
- Layered gradients, luminous borders and controlled blur
- Responsive layout maintained without introducing a framework

## Semantics And Content Model

### Home page sections

- Hero
- Problem framing
- Multidisciplinary method
- Journey / steps
- Social proof placeholders
- Supporting stats
- Final CTA
- Footer

### Legal pages

- Branded header
- Legal introduction
- Stack of policy cards

## Audit Findings

### Current technical notes

- The deployable UI remains framework-free and static-hosting friendly.
- The project root is still bloated by unused raw media and zip packages.
- Motion now depends on a local Anime.js bundle, which removes CDN dependency during runtime.
- The WhatsApp number format still appears unusual for a Brazilian mobile number and should be manually confirmed before changing production CTAs.

## Deployment Notes

### Safe deploy set

For hosting, the essential files are:

- `index.html`
- `privacy.html`
- `terms.html`
- `styles.css`
- `script.js`
- `assets/`

### Recommended exclusions

- `Ensaio Barra 11-04/`
- `*.zip`
- local preview artifacts

### Suggested hosting strategy

- Keep the raw media archive outside the deploy root or in separate cloud storage.
- Version only the website source and the curated assets used by the live pages.
