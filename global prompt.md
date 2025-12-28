# Base Astro Demo Prompt (Global)

You are a senior UI designer + Astro engineer. Build a production-quality static website demo using Astro (latest) designed to be deployed to GitHub Pages. The demo must feel realistic and conversion-focused.

## Tech & Constraints

- **Framework:** Astro (static output). Avoid server features.
- **Styling:** choose one approach and stick to it:
  - **Option A:** Tailwind (preferred for speed)
  - **Option B:** Vanilla CSS modules + design tokens in `src/styles/tokens.css`
- **Images:** use `astro:assets` where possible, and provide placeholder images in `src/assets/images/`.
- **Content:** no external CMS required, but structure content cleanly so it could be swapped later.

## GitHub Pages Deployment Constraints (Important)

Assume the site is deployed at `https://github.com/amplifycreativelab/demo1/`.

Configure Astro with correct `site` and `base`:

```js
site: "https://github.com/amplifycreativelab",
base: "demo1",
```

Ensure all links/assets work under a base path (no hardcoded absolute `/` paths unless handled properly).

Provide npm scripts and build instructions.

## Deliverables

Provide:

- Folder structure
- Key files with code: `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, plus required pages
- Components for repeated sections
- A small content layer:
  - **Option A:** `src/content/` collections (Astro Content Collections)
  - **Option B:** `src/data/*.json`
- Basic SEO: title templates, meta description, OG tags, canonical, robots, sitemap if straightforward
- Accessibility: semantic headings, skip link, focus states, contrast-safe palette, keyboard-friendly nav
- Performance: lightweight JS (only where needed), lazy images, avoid huge bundles
- Conversion UX: clear CTAs, sticky/obvious contact action, trust signals

## Design System (Include in Every Demo)

Define a simple design system:

- **Typography:** 2 fonts max (use system fonts or Google Fonts). Provide font scale.
- **Spacing scale:** 4/8/12/16/24/32/48/64 etc.
- **Colors:** 1 primary, 1 accent, neutrals, and background tone
- **Components:** Button, Card, Section header, Form inputs, Badge, Testimonial, FAQ accordion (optional)

## Pages (Minimum)

- Home
- About
- Services (or equivalent)
- Contact (with form UI; non-functional is fine)
- Legal: Privacy (simple)

## Local SEO / GEO (Perth)

Even though it's a demo, write content and schema as if the business is in Perth, WA:

- Include NAP (name, address area, phone placeholder)
- Add a LocalBusiness (or relevant subtype) JSON-LD with:
  - `addressLocality: "Perth"`
  - `addressRegion: "WA"`
  - `addressCountry: "AU"`
- Add a short "Areas we serve" section with Perth suburbs relevant to the demo category.

## Output Format

Return the full code for each file in separate code blocks with file paths as headings.
