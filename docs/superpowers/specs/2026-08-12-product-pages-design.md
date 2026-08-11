# Product Pages — Design Spec

**Date:** 2026-08-12  
**Status:** Approved

## Goal

Create three dedicated product pages to improve Google search ranking and CTR for product-name queries (`anteam route+`, `anteam quote`, `anteam reload`). Currently all traffic lands on the homepage, which gives Google no signal to rank individual products independently.

## Pages

| File | URL | Product |
|------|-----|---------|
| `route-plus.html` | `/route-plus.html` | Anteam Route+™ |
| `quote.html` | `/quote.html` | Anteam Quote™ |
| `reload.html` | `/reload.html` | Anteam Reload™ |

## Page Structure (each page)

### `<head>`
- Unique `<title>`: `{Product Name} – {Tagline} | Anteam`
- Unique `<meta name="description">`: one benefit-led sentence
- `<link rel="canonical">` pointing to the page's own URL
- `<meta name="robots" content="index, follow"/>`
- OG and Twitter tags (title, description, image, url)
- `SoftwareApplication` JSON-LD schema with `name`, `description`, `applicationCategory`, `url` (no pricing/offers — none publicly available)

### Nav
- Identical markup to homepage
- All anchor links updated to homepage-relative: `/#philosophy`, `/#products`, `/#contact`
- Logo links to `/`

### Hero
- Product number badge (01 / 02 / 03)
- Category label (e.g. "Last Mile Delivery: Real-time AI Optimisation")
- Product name as `<h1>`
- Taglines (drawn from existing homepage copy):
  - Route+: "Dynamically matches same-day delivery orders with routes in real-time"
  - Quote: "AI-powered quoting — from hours of research to minutes"
  - Reload: "Analyses routes to identify and fill empty legs automatically"
- "Book a Demo →" CTA linking to `#contact` on the same page

### Description
- Existing paragraph copy from homepage, verbatim
- No new content invented

### Metrics Panel
- Same animated counter cards as homepage
- Route+: 85% CO₂, 60% cost, 40% fleet utilisation
- Quote: no metrics panel (none on homepage)
- Reload: 50% empty legs, 34% CO₂, 16% profit

### Back Link
- `← All Products` linking to `/#products`

### Contact Section
- Identical to homepage contact section
- Form action: `contact.php`
- Umami tracking events updated to reflect product page context

### Footer
- Identical to homepage

## Homepage Changes

- Each product card gets a `Learn more →` link to its dedicated page
- `sitemap.xml` updated to include `/route-plus.html`, `/quote.html`, `/reload.html`
- No nav changes

## Out of Scope

- New/invented product copy
- Nav dropdowns or product submenu
- Careers or case studies pages (separate initiative)
