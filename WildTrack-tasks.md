# Development Tasks - WildTrack (Topographic Adventure / Mapping-Grade UI)

Source docs:

- `WildTrack/WildTrack.md`
- Reference format: `cafe-restaurant-demo/Demo 1 - Cafe - Restaurant - Tasks.md`

How to use:

- Mark items complete by changing `- [ ]` to `- [x]`.
- Work top-to-bottom; later phases depend on earlier setup.

## Phase 0 - Project Decisions

- [ ] Confirm GitHub Pages repo name for Astro `base` (must be `"/<repo>/"`).
- [ ] Confirm business placeholders (brand, phone/email, Perth base, service regions/landmarks, hours).
- [ ] Confirm primary conversions and routes: Book Tour, Request Itinerary.
- [ ] Choose styling approach (authored CSS vs Tailwind) and commit to a disciplined style (no decorative UI).
- [ ] Confirm whether the optional filter island is included (Difficulty/Season/Duration) and choose Solid/Preact if yes.
- [ ] Confirm tour inventory and required fields (difficulty, duration, distance, elevation gain, best season, group size, region/terrain, access notes).

## Phase 1 - Astro Setup (SSG + GitHub Pages)

- [ ] Create Astro 4 project (static output / SSG).
- [ ] Configure `astro.config.mjs` with `site` + `base` placeholders for GitHub Pages.
- [ ] Ensure internal links and asset URLs work under the base path (no hard-coded `/`).
- [ ] Add/verify scripts: `dev`, `build`, `preview`.
- [ ] Set up `astro:assets` (or equivalent) for image optimization and add placeholders:
  - [ ] tour hero images
  - [ ] tour card imagery (if used)
  - [ ] topo/contour SVG assets (if external)
  - [ ] OG image
- [ ] Keep JS minimal; avoid heavy libraries.

## Phase 2 - Design System (Topo Modern)

- [ ] Implement tokens (CSS variables or Tailwind theme) using the exact palette:
  - [ ] Deep Navy `#0A1020` (primary background)
  - [ ] Forest `#0F2A1E` (panels/cards/data blocks)
  - [ ] Sand `#F2E7D3` (content surfaces/info sections)
  - [ ] High-vis Orange `#FF6A00` (CTAs/selected/action only)
  - [ ] Accent Teal `#1EE3CF` (info feedback/secondary indicators)
  - [ ] Text Primary `#F3F6FA`, Text Muted `#A9B3C2`
- [ ] Enforce accent rules in components:
  - [ ] Orange = action only
  - [ ] Teal = information feedback
  - [ ] Never use more than one accent per section
- [ ] Add visual motifs:
  - [ ] Subtle topographic contour lines in hero/section headers only (opacity <= 6%)
  - [ ] Thin divider lines inspired by map gridlines
  - [ ] Technical, stroke-based icons (not rounded/playful)
- [ ] Typography:
  - [ ] Headings: Sora (labels may be uppercase; headings are not "shouty")
  - [ ] Body: Inter optimized for scanning and metadata hierarchy
- [ ] Implement focus-visible styles and ensure contrast-safe badges.
- [ ] Implement `prefers-reduced-motion` baseline (motion off, clarity intact).

## Phase 3 - Layout & UI Patterns (Rugged Precision)

- [ ] Implement layout grid:
  - [ ] 12-column desktop grid
  - [ ] Mobile stacked, card-first layout
  - [ ] Wide margins to convey scale/terrain
- [ ] Card language for tours:
  - [ ] Hard edges, subtle shadow (no soft/rounded UI)
  - [ ] Tour cards behave like map pins
  - [ ] Hover rotation limited to 1-2 degrees max (hover only)
- [ ] Ensure internal alignment snaps to grid even when visuals overlap/break edges.

## Phase 4 - Data Layer (Typed + Logistics-First)

- [ ] Create `src/data/tours.ts` (typed) with fields:
  - [ ] `slug`, `name`, `difficulty`, `duration`, `distance`, `elevationGain`, `bestSeason`, `groupSize`
  - [ ] `region`, `terrainType`, `accessNotes`
  - [ ] `includes[]` checklist (gear/food/transport/guide)
  - [ ] media fields (images/poster) as needed
- [ ] Create `src/data/locations.ts` (typed): region, terrain type, access notes (and any map/context metadata).
- [ ] Add realistic sample data (enough tours to test filtering + layout).
- [ ] Ensure slugs are human-readable and SEO-safe.

## Phase 5 - Components (Required Deliverables)

- [ ] Build required components:
  - [ ] `RouteCard.astro` (tour discovery unit: name, difficulty, duration+distance, elevation sparkline, primary CTA)
  - [ ] `DifficultyBadge.astro` (accessible; never color-only; includes text label)
  - [ ] `TopoDivider.astro` (SVG divider using contour logic)
  - [ ] `TourHero.astro` (hero with route line + key metadata)
  - [ ] `ElevationSparkline.astro` (inline SVG chart)
- [ ] Optional:
  - [ ] `TourFilterIsland.tsx` (progressive enhancement only; must degrade gracefully without JS)

## Phase 6 - Pages (IA + Conversion)

### Home (`src/pages/index.astro`)

- [ ] Expedition overview hero with immediate CTAs (Book Tour / Request Itinerary).
- [ ] Featured tours module (render from `tours.ts`).
- [ ] Scannable logistics/trust blocks (no marketing fluff).

### Tours Index (`src/pages/tours/index.astro`) (core discovery)

- [ ] Render tour list from `tours.ts` using `RouteCard.astro`.
- [ ] If `TourFilterIsland.tsx` exists, add filters for Difficulty/Season/Duration with no-JS fallback.
- [ ] Ensure metadata hierarchy is clear (logistics first).

### Tour Detail (`src/pages/tours/[slug].astro`) (conversion page)

- [ ] Tour hero with route line + key metadata (difficulty, duration, distance, elevation, best season, group size).
- [ ] Difficulty system includes visual + text description (e.g., "Moderate - technical terrain") and is not color-only.
- [ ] Best Season strip (timeline) highlighting optimal months with muted off-season display.
- [ ] "What's Included" checklist with icons (gear/food/transport/guide) and zero marketing adjectives.
- [ ] Primary CTA block(s): Book Tour + Request Itinerary.

### Gear (`src/pages/gear/index.astro`)

- [ ] Practical preparation guide (checklists, scannable sections, technical tone).

### FAQs (`src/pages/faqs/index.astro`)

- [ ] Logistics & safety FAQ (structured, scannable, reduces booking friction).

### Contact (`src/pages/contact/index.astro`)

- [ ] Booking + itinerary request form UI (non-functional OK) with accessible labels.
- [ ] Include contact details and response expectations (calm, precise).

## Phase 7 - Motion (Route Draw) + Reduced Motion

- [ ] Implement functional motion only (no cinematic effects):
  - [ ] SVG route line draw on entry via `stroke-dashoffset`
  - [ ] Elevation line draws left-to-right
  - [ ] Hover micro-interactions (compass nudge, arrow tick, subtle axis shift)
- [ ] Motion constraints:
  - [ ] <= 300ms
  - [ ] No heavy easing; keep it sharp and purposeful
- [ ] Reduced motion behavior (`prefers-reduced-motion: reduce`):
  - [ ] Disable route/elevation draws and hover motion
  - [ ] Keep layout and clarity intact

## Phase 8 - SEO & Local Context

- [ ] Set per-page titles + meta descriptions (precise, logistics-forward).
- [ ] Canonical URLs respect `site` + `base`.
- [ ] Add OpenGraph + Twitter meta with placeholder OG image.
- [ ] Inject JSON-LD:
  - [ ] `TouristTrip`
  - [ ] `Offer`
  - [ ] `LocalBusiness`
- [ ] Include geographic relevance (Perth base + nearby regions/landmarks) naturally in copy.

## Phase 9 - Accessibility, Performance & Deployment

- [ ] Accessibility QA: one H1 per page, logical headings, keyboard nav, strong focus-visible, contrast-safe badges.
- [ ] Ensure badges and difficulty indicators are understandable without color.
- [ ] Performance QA:
  - [ ] Lighthouse target >= 95 (especially performance and accessibility)
  - [ ] Keep JS minimal and filter island lightweight
  - [ ] Optimize images and avoid large layout shifts
- [ ] Verify build works under GitHub Pages base path (no broken links/assets).
- [ ] Add minimal `README.md` with install/dev/build/preview + base path notes + motion/reduced motion rules.

## Optional / Bonus

- [ ] Add a print stylesheet for gear checklists (clean, field-guide feel).
