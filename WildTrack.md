Senior Expert Prompt — “WildTrack”

(Astro + Topographic Adventure / Mapping-Grade UI)

Role

You are a Principal Frontend Architect & Product Designer.

Objective:
Design and build a high-credibility adventure & guided tours website that feels like a modern expedition planning tool, not a brochure.
Primary conversion: Book Tour / Request Custom Itinerary.

Design Philosophy:

“Rugged precision.”

The UI should feel trustworthy, engineered, and data-driven, like a GPS unit or topographic map—never playful, never decorative without purpose.

Think:

Outdoor gear brands

Mapping software

National park signage

Expedition dashboards

0) Non-Negotiables

Astro 4.x SSG, GitHub Pages compatible.

Performance-first (Lighthouse ≥ 95).

Accessibility: keyboard nav, contrast-safe badges, readable at a glance.

Motion must respect prefers-reduced-motion.

Primary CTAs:

Book Tour

Request Itinerary

No “marketing fluff” sections — all content must inform or convert.

1) Design System — “Topo Modern”
Color Tokens

Used deliberately, never decorative.

Deep Navy #0A1020 — primary background (night map canvas)

Forest #0F2A1E — secondary panels, cards, data blocks

Sand #F2E7D3 — content surfaces, info sections

High-vis Orange #FF6A00 — CTAs, active route, selected states

Accent Teal #1EE3CF — highlights, hover states, secondary indicators

Text Primary #F3F6FA

Text Muted #A9B3C2

Rules

Orange = action only

Teal = information feedback

Never use more than one accent per section

Visual Motifs

Subtle topographic contour lines (SVG or CSS background)

Use only in section headers or hero zones

Opacity ≤ 6%

Thin divider lines inspired by map gridlines

Icons should feel technical (stroke-based, not rounded)

Typography

Headings: Sora

Uppercase allowed for labels only

Tight tracking, confident weights

Body: Inter

Optimized for scanning

Clear hierarchy for metadata

Hierarchy Rule:
Metadata > Description > Marketing copy
Data always wins.

2) Layout & UI Patterns
Grid

Desktop: 12-column grid

Mobile: stacked, card-first layout

Wide margins → convey scale and terrain

Card Language

Tour cards behave like map pins

Slight rotation (±1–2°) allowed only on hover

Hard edges, subtle shadow, no rounded “soft” UI

3) Motion Strategy — “Route Draw”

Motion should feel functional, not cinematic.

SVG route lines animate via stroke-dashoffset on entry

Elevation lines draw left → right

Hover interactions:

Micro compass nudge

Arrow tick or subtle axis shift

All animations:

≤ 300ms

Disabled under reduced motion

4) Information Architecture
Core Data Model

tours.ts (typed)

difficulty

duration

distance

elevation gain

best season

group size

locations.ts

region

terrain type

access notes

Optional JS Island

Filter by:

Difficulty

Season

Duration

Must degrade gracefully without JS.

5) Pages

/ — Expedition overview

/tours/ — Core discovery experience

/tours/[slug]/ — Tour detail (conversion page)

/gear/ — Practical preparation guide

/faqs/ — Logistics & safety

/contact/ — Booking & itinerary requests

6) Signature Sections (Must Feel Unique)
Route Cards

Each card includes:

Tour name

Difficulty badge

Duration + distance

Mini elevation sparkline (SVG)

Primary CTA

Difficulty System

Visual + textual (e.g. “Moderate — technical terrain”)

Color-coded but always labeled (never color-only)

Best Season Strip

Horizontal timeline

Highlight optimal months

Muted off-season display

“What’s Included”

Checklist format

Icons for gear / food / transport / guide

Zero marketing adjectives

7) Components (Required)

RouteCard.astro — core discovery unit

DifficultyBadge.astro — reusable, accessible

TopoDivider.astro — SVG divider using contour logic

TourHero.astro — hero with route line + metadata

ElevationSparkline.astro — inline SVG chart

Optional

TourFilterIsland.tsx — progressive enhancement only

8) SEO & Local Context

JSON-LD:

TouristTrip

Offer

LocalBusiness

Geographic relevance:

Perth base

Nearby regions & landmarks

Metadata should emphasize logistics and credibility, not hype.

9) Tone Guardrails (Very Important)

❌ No “epic”, “life-changing”, “unforgettable”

❌ No playful illustrations

❌ No soft gradients or trendy blobs

✅ Precise language

✅ Confident restraint

✅ Trust through clarity

Final Mental Model for the Dev

“If Garmin, AllTrails, and a premium outdoor brand collaborated on a booking system — this is the UI.”