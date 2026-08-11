# Product Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create three dedicated product pages (Route+, Quote, Reload) to give Google individually-rankable URLs for each product, and link to them from the homepage.

**Architecture:** Static HTML files sharing the same Tailwind CSS, fonts, and `main.js` as `index.html`. No build step. Each page is self-contained: its own `<head>` metadata, the shared nav/footer shell, a product hero, description, metrics (where applicable), and a contact form.

**Tech Stack:** HTML, Tailwind CSS (CDN via `style.css`), `main.js` (counter animation + Umami analytics), `contact.php` (existing form handler)

## Global Constraints

- Dark theme class on `<html>`: `class="dark" lang="en"`
- Primary colour token: `text-primary` / `bg-primary` (amber, `#F3AC13`)
- Font classes: `font-headline` = Barlow Condensed, `font-mono` = IBM Plex Mono, `font-body` = IBM Plex Sans
- All copy is verbatim from `index.html` — no new content invented
- Nav anchor links on product pages must be homepage-relative: `/#philosophy`, `/#products`; contact CTA stays `#contact` (resolves to on-page contact section)
- Footer links: `/#philosophy`, `/#products`, `#contact`, `privacy-policy.html`
- Logo `href` on product pages: `/` (not `#`)
- `main.js` counter animation observes `[id^="metrics-panel"]` — metrics panel IDs must start with `metrics-panel`
- Umami analytics script tag must be present on every page
- All asset paths are root-relative: `assets/...`

---

### Task 1: Create `route-plus.html`

**Files:**
- Create: `route-plus.html`

**Verification:** Open `route-plus.html` in a browser. Confirm: title bar shows correct title, nav links go to `/#products` etc., metrics counters animate on scroll, "Book a Demo" scrolls to contact form, "← All Products" goes to `/#products`.

- [ ] **Step 1: Create branch**

```bash
git checkout -b feature/product-pages
```

- [ ] **Step 2: Create the file with the full page**

```html
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Anteam Route+™ – Real-time AI Route Optimisation | Anteam</title>
<meta name="description" content="Anteam Route+™ dynamically matches same-day delivery orders with existing routes in real-time — up to 60% cost savings and 85% CO₂ savings per delivery."/>
<meta name="robots" content="index, follow"/>
<link rel="icon" type="image/png" href="assets/favicon.png"/>
<link rel="canonical" href="https://www.anteam.ai/route-plus.html"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Anteam"/>
<meta property="og:title" content="Anteam Route+™ – Real-time AI Route Optimisation"/>
<meta property="og:description" content="Anteam Route+™ dynamically matches same-day delivery orders with existing routes in real-time — up to 60% cost savings and 85% CO₂ savings per delivery."/>
<meta property="og:url" content="https://www.anteam.ai/route-plus.html"/>
<meta property="og:image" content="https://www.anteam.ai/assets/case_study_1-1200.webp"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Anteam Route+™ – Real-time AI Route Optimisation"/>
<meta name="twitter:description" content="Anteam Route+™ dynamically matches same-day delivery orders with existing routes in real-time — up to 60% cost savings and 85% CO₂ savings per delivery."/>
<meta name="twitter:image" content="https://www.anteam.ai/assets/case_study_1-1200.webp"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Anteam Route+™",
  "description": "Anteam Route+™ dynamically matches same-day delivery orders with existing or planned routes in real-time, to ensure faster and greener deliveries.",
  "applicationCategory": "BusinessApplication",
  "url": "https://www.anteam.ai/route-plus.html"
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preload" href="assets/fonts/space-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
<noscript><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;700&display=swap" rel="stylesheet"/></noscript>
<link href="style.css" rel="stylesheet"/>
<script defer src="https://analytics.umami.is/script.js" data-website-id="ca05893a-4ca9-4f5c-b33b-665103596cd4"></script>
</head>
<body class="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-[#131313]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-b border-white/5">
<a href="/" class="flex items-center gap-3">
<img src="assets/anteam_logo.webp" alt="Anteam" class="h-8 w-auto"/>
<span class="text-2xl font-bold tracking-tighter text-primary">Anteam</span>
</a>
<div class="hidden md:flex gap-10">
<a class="font-headline tracking-widest uppercase text-sm text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy">Mission</a>
<a class="font-headline tracking-widest uppercase text-sm text-[#C4C7C7] hover:text-primary transition-colors" href="/#products">Products</a>
</div>
<a href="#contact" data-umami-event="cta_click" data-umami-event-location="nav" class="hidden md:inline-flex font-headline tracking-widest uppercase text-sm px-6 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95">
  Contact Us
</a>
<button id="nav-menu-btn" class="md:hidden flex items-center justify-center w-10 h-10 text-[#C4C7C7] hover:text-primary transition-colors" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
  <svg id="ham-svg" class="w-5 h-4" viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <line class="ham-line" x1="0" y1="2" x2="20" y2="2"/>
    <line class="ham-line" x1="0" y1="8" x2="20" y2="8"/>
    <line class="ham-line" x1="2" y1="14" x2="20" y2="14"/>
  </svg>
</button>
</nav>
<!-- Mobile nav overlay -->
<div id="mobile-nav" class="fixed inset-0 z-40 bg-[#0e0e0e] flex flex-col items-center justify-center gap-10 pointer-events-none opacity-0 transition-opacity duration-300" role="dialog" aria-modal="true" aria-label="Navigation" aria-hidden="true">
  <nav class="flex flex-col items-center gap-8">
    <a class="mobile-nav-link font-headline tracking-widest uppercase text-3xl text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy" tabindex="-1">Mission</a>
    <a class="mobile-nav-link font-headline tracking-widest uppercase text-3xl text-[#C4C7C7] hover:text-primary transition-colors" href="/#products" tabindex="-1">Products</a>
  </nav>
  <a href="#contact" data-umami-event="cta_click" data-umami-event-location="mobile_nav" class="mobile-nav-link mt-6 font-headline tracking-widest uppercase text-sm px-12 py-4 bg-primary text-on-primary hover:brightness-110 transition-all font-bold" tabindex="-1">
    Get in Touch
  </a>
</div>
<!-- Product Hero -->
<section class="pt-36 pb-16 bg-surface">
<div class="container mx-auto px-8">
<a href="/#products" class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12">← All Products</a>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
<div class="lg:col-span-7 space-y-6">
<div class="space-y-4">
<span aria-hidden="true" class="case-study-number">01</span>
<span class="text-primary font-mono text-base uppercase tracking-widest opacity-60">Last Mile Delivery: Real-time AI Optimisation</span>
<h1 class="text-5xl md:text-6xl font-headline font-bold tracking-tight">Anteam Route+™</h1>
<p class="text-xl text-on-surface-variant font-light leading-relaxed">Dynamically matches same-day delivery orders with existing routes in real-time — faster and greener deliveries, proven at scale.</p>
</div>
<div class="flex">
<a href="#contact" data-umami-event="cta_click" data-umami-event-location="hero_route_plus" class="flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs">Book a Demo →</a>
</div>
</div>
</div>
</div>
</section>
<!-- Product Content -->
<section class="py-16 bg-surface">
<div class="container mx-auto px-8">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
<div class="lg:col-span-7 space-y-8">
<div class="relative aspect-video overflow-hidden border border-outline-variant/20 group">
<img class="w-full h-full object-cover grayscale-[0.2] opacity-90 group-hover:opacity-100 transition-opacity duration-700" alt="Gritty industrial yard at night with high contrast orange lights and heavy machinery" src="assets/case_study_1.jpg" srcset="assets/case_study_1-800.webp 800w, assets/case_study_1-1200.webp 1200w, assets/case_study_1.jpg 1400w" sizes="(max-width: 1024px) 100vw, 58vw" loading="eager"/>
<div class="absolute inset-0 pointer-events-none hud-grid opacity-20"></div>
</div>
<div class="prose prose-invert max-w-none">
<p class="text-lg text-on-surface-variant font-light leading-relaxed">Anteam Route+™ dynamically matches same-day delivery orders with existing or planned routes on the road in real-time, to ensure faster and greener deliveries. Anteam worked closely with NHS Hospitals and a major UK pharmacy chain to validate our patent pending technology. Over 100,000 weekly deliveries by over 1000 vehicles, Anteam Route+ is able to deliver up to 60% cost savings and 85% CO2 savings per AI-matched delivery.</p>
</div>
</div>
<div id="metrics-panel" class="lg:col-span-5 lg:sticky lg:top-24 bg-surface-container-low border border-outline-variant/10 p-8">
<div class="flex items-center gap-2 mb-8">
<div class="w-2 h-2 bg-primary rounded-full"></div>
<span class="font-label text-xs uppercase tracking-widest text-primary">Metrics</span>
</div>
<div class="flex flex-col divide-y divide-outline-variant/10">
<div class="py-6 last:pb-0 flex items-center gap-6">
<div class="flex items-center gap-3 text-6xl font-headline font-bold text-on-surface shrink-0"><span class="text-2xl">↓</span><span class="counter" data-target="85" data-suffix="%">0%</span></div>
<div>
<div class="text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">CO₂ Savings</div>
<div class="text-sm text-on-surface-variant font-light mt-1">Fewer empty legs and shorter routes dramatically reduce emissions.</div>
</div>
</div>
<div class="py-6 flex items-center gap-6">
<div class="flex items-center gap-3 text-6xl font-headline font-bold text-tertiary shrink-0"><span class="text-2xl">↓</span><span class="counter" data-target="60" data-suffix="%">0%</span></div>
<div>
<div class="text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">Cost Reduction</div>
<div class="text-sm text-on-surface-variant font-light mt-1">Smarter routing cuts operational costs without cutting corners.</div>
</div>
</div>
<div class="py-6 first:pt-0 flex items-center gap-6">
<div class="flex items-center gap-3 text-6xl font-headline font-bold text-primary shrink-0"><span class="text-2xl">↑</span><span class="counter" data-target="40" data-suffix="%">0%</span></div>
<div>
<div class="text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">Fleet Utilisation</div>
<div class="text-sm text-on-surface-variant font-light mt-1">More of the fleet working harder, with less idle time between runs.</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Contact Section -->
<section id="contact" class="py-24 bg-surface-dim border-t border-primary/10">
<div class="container mx-auto px-8 max-w-4xl">
<div class="text-center mb-16 space-y-4">
<span class="text-primary font-label text-xs uppercase tracking-widest">Get in Touch</span>
<h2 class="text-5xl font-headline font-bold tracking-tight">Let's Talk</h2>
<p class="text-lg text-on-surface-variant font-light max-w-xl mx-auto leading-relaxed">Reach out to schedule a quick 15-minute chat to discuss your pain points. We'll talk about how Anteam AI can help.</p>
</div>
<form action="contact.php" method="POST" class="space-y-8 bg-surface-container-lowest p-10 border border-outline-variant/20">
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="space-y-2">
<label for="contact-name" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Your Name</label>
<input id="contact-name" name="name" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="John Smith" type="text" required/>
</div>
<div class="space-y-2">
<label for="contact-company" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Company</label>
<input id="contact-company" name="company" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="Acme Logistics Ltd" type="text"/>
</div>
<div class="space-y-2 md:col-span-2">
<label for="contact-email" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Email</label>
<input id="contact-email" name="email" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="john@acmelogistics.com" type="email" required/>
</div>
<div class="space-y-2 md:col-span-2">
<label for="contact-message" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">What's your biggest challenge right now?</label>
<textarea id="contact-message" name="message" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm h-32 resize-none" placeholder="Tell us about the inefficiencies, costs, or bottlenecks you're dealing with..."></textarea>
</div>
</div>
<div class="pt-4 flex justify-center">
<button type="submit" data-umami-event="contact_form_submit" class="px-16 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,186,55,0.2)]">Book a Call</button>
</div>
</form>
</div>
</section>
<!-- Footer -->
<footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#131313] border-t border-[#B5C8DF]/10">
<div class="flex flex-col items-center md:items-start gap-2">
<a href="/" class="flex items-center gap-3">
<img src="assets/anteam_logo.webp" alt="Anteam" class="h-7 w-auto"/>
<span class="font-headline text-lg font-black text-primary">ANTEAM</span>
</a>
<div class="font-body text-xs tracking-wide text-[#C4C7C7]">© 2026 ANTEAM LTD</div>
</div>
<div class="flex flex-wrap justify-center gap-8">
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy">Mission</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="/#products">Products</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="#contact">Contact</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100" href="privacy-policy.html">Privacy Policy</a>
</div>
</footer>
<div id="toast" class="fixed bottom-8 right-8 z-50 hidden">
  <div id="toast-inner" class="flex items-center gap-4 px-6 py-4 border bg-surface-container-low font-headline uppercase tracking-widest text-sm font-bold shadow-[0_0_40px_rgba(0,0,0,0.4)]">
    <span id="toast-msg"></span>
  </div>
</div>
<script src="main.js" defer></script>
</body></html>
```

- [ ] **Step 3: Open in browser and verify**

Open `route-plus.html` locally. Check:
- Title bar reads "Anteam Route+™ – Real-time AI Route Optimisation | Anteam"
- Nav "Mission" and "Products" links have `/#` prefix
- Logo links to `/`
- Metrics panel counters animate on scroll
- "Book a Demo →" scrolls to contact section
- "← All Products" goes to `/#products`

- [ ] **Step 4: Commit**

```bash
git add route-plus.html
git commit -m "feat: add Route+ product page"
```

---

### Task 2: Create `quote.html`

**Files:**
- Create: `quote.html`

**Note:** Quote has no metrics panel (none exists on the homepage for this product). The layout is a single column: hero + description + image + CTA + contact.

**Verification:** Open in browser. Confirm title, nav links, "Book a Demo" CTA, "← All Products" link.

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Anteam Quote™ – AI-Powered Freight Quoting | Anteam</title>
<meta name="description" content="Anteam Quote™ learns from your historical order data to generate accurate, data-driven freight quotes and predict suitable suppliers in minutes, not hours."/>
<meta name="robots" content="index, follow"/>
<link rel="icon" type="image/png" href="assets/favicon.png"/>
<link rel="canonical" href="https://www.anteam.ai/quote.html"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Anteam"/>
<meta property="og:title" content="Anteam Quote™ – AI-Powered Freight Quoting"/>
<meta property="og:description" content="Anteam Quote™ learns from your historical order data to generate accurate, data-driven freight quotes and predict suitable suppliers in minutes, not hours."/>
<meta property="og:url" content="https://www.anteam.ai/quote.html"/>
<meta property="og:image" content="https://www.anteam.ai/assets/case_study_2.webp"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Anteam Quote™ – AI-Powered Freight Quoting"/>
<meta name="twitter:description" content="Anteam Quote™ learns from your historical order data to generate accurate, data-driven freight quotes and predict suitable suppliers in minutes, not hours."/>
<meta name="twitter:image" content="https://www.anteam.ai/assets/case_study_2.webp"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Anteam Quote™",
  "description": "An AI-powered quoting calculator for freight-forwarding companies that learns from historical order data to generate accurate quotes and predict suitable suppliers instantly.",
  "applicationCategory": "BusinessApplication",
  "url": "https://www.anteam.ai/quote.html"
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preload" href="assets/fonts/space-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
<noscript><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;700&display=swap" rel="stylesheet"/></noscript>
<link href="style.css" rel="stylesheet"/>
<script defer src="https://analytics.umami.is/script.js" data-website-id="ca05893a-4ca9-4f5c-b33b-665103596cd4"></script>
</head>
<body class="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-[#131313]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-b border-white/5">
<a href="/" class="flex items-center gap-3">
<img src="assets/anteam_logo.webp" alt="Anteam" class="h-8 w-auto"/>
<span class="text-2xl font-bold tracking-tighter text-primary">Anteam</span>
</a>
<div class="hidden md:flex gap-10">
<a class="font-headline tracking-widest uppercase text-sm text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy">Mission</a>
<a class="font-headline tracking-widest uppercase text-sm text-[#C4C7C7] hover:text-primary transition-colors" href="/#products">Products</a>
</div>
<a href="#contact" data-umami-event="cta_click" data-umami-event-location="nav" class="hidden md:inline-flex font-headline tracking-widest uppercase text-sm px-6 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95">
  Contact Us
</a>
<button id="nav-menu-btn" class="md:hidden flex items-center justify-center w-10 h-10 text-[#C4C7C7] hover:text-primary transition-colors" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
  <svg id="ham-svg" class="w-5 h-4" viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <line class="ham-line" x1="0" y1="2" x2="20" y2="2"/>
    <line class="ham-line" x1="0" y1="8" x2="20" y2="8"/>
    <line class="ham-line" x1="2" y1="14" x2="20" y2="14"/>
  </svg>
</button>
</nav>
<!-- Mobile nav overlay -->
<div id="mobile-nav" class="fixed inset-0 z-40 bg-[#0e0e0e] flex flex-col items-center justify-center gap-10 pointer-events-none opacity-0 transition-opacity duration-300" role="dialog" aria-modal="true" aria-label="Navigation" aria-hidden="true">
  <nav class="flex flex-col items-center gap-8">
    <a class="mobile-nav-link font-headline tracking-widest uppercase text-3xl text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy" tabindex="-1">Mission</a>
    <a class="mobile-nav-link font-headline tracking-widest uppercase text-3xl text-[#C4C7C7] hover:text-primary transition-colors" href="/#products" tabindex="-1">Products</a>
  </nav>
  <a href="#contact" data-umami-event="cta_click" data-umami-event-location="mobile_nav" class="mobile-nav-link mt-6 font-headline tracking-widest uppercase text-sm px-12 py-4 bg-primary text-on-primary hover:brightness-110 transition-all font-bold" tabindex="-1">
    Get in Touch
  </a>
</div>
<!-- Product Hero -->
<section class="pt-36 pb-16 bg-surface">
<div class="container mx-auto px-8">
<a href="/#products" class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12">← All Products</a>
<div class="space-y-6 max-w-3xl">
<div class="space-y-4">
<span aria-hidden="true" class="case-study-number">02</span>
<span class="text-primary font-mono text-base uppercase tracking-widest opacity-60">AI Quoting and Supplier Intelligence</span>
<h1 class="text-5xl md:text-6xl font-headline font-bold tracking-tight">Anteam Quote™</h1>
<p class="text-xl text-on-surface-variant font-light leading-relaxed">AI-powered quoting — from hours of research to minutes.</p>
</div>
<div class="flex">
<a href="#contact" data-umami-event="cta_click" data-umami-event-location="hero_quote" class="flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs">Book a Demo →</a>
</div>
</div>
</div>
</section>
<!-- Product Content -->
<section class="py-16 bg-surface">
<div class="container mx-auto px-8">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div class="lg:col-span-6 lg:order-2 space-y-8">
<div class="prose prose-invert max-w-none space-y-6">
<p class="text-lg text-on-surface-variant font-light leading-relaxed">Quote smarter. Win faster. Anteam developed an AI-powered quoting calculator for freight-forwarding companies. The AI tool learns from historical order data and patterns, as well as your favourite suppliers, to generate accurate, data-driven quotes, and predict suitable suppliers instantly. The solution could reduce your quoting time from hours of research to just a few minutes, and most importantly, improve the accuracy of your quotes. This enables freight forwarders to respond to their customer enquiries faster, more consistently and with a reduced risk of human error.</p>
</div>
<a href="#contact" data-umami-event="cta_click" data-umami-event-location="demo_quote" class="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs">Book a Demo →</a>
</div>
<div class="lg:col-span-6 lg:order-1 relative">
<div class="aspect-square bg-surface-container-high rounded-sm overflow-hidden relative border border-primary/20">
<img class="w-full h-full object-cover opacity-65" alt="High angle night shot of city streets with glowing orange delivery vehicle trails and a holographic map overlay" src="assets/case_study_2.webp" srcset="assets/case_study_2-600.webp 600w, assets/case_study_2.webp 1200w" sizes="(max-width: 1024px) 100vw, 50vw" loading="eager"/>
</div>
</div>
</div>
</div>
</section>
<!-- Contact Section -->
<section id="contact" class="py-24 bg-surface-dim border-t border-primary/10">
<div class="container mx-auto px-8 max-w-4xl">
<div class="text-center mb-16 space-y-4">
<span class="text-primary font-label text-xs uppercase tracking-widest">Get in Touch</span>
<h2 class="text-5xl font-headline font-bold tracking-tight">Let's Talk</h2>
<p class="text-lg text-on-surface-variant font-light max-w-xl mx-auto leading-relaxed">Reach out to schedule a quick 15-minute chat to discuss your pain points. We'll talk about how Anteam AI can help.</p>
</div>
<form action="contact.php" method="POST" class="space-y-8 bg-surface-container-lowest p-10 border border-outline-variant/20">
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="space-y-2">
<label for="contact-name" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Your Name</label>
<input id="contact-name" name="name" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="John Smith" type="text" required/>
</div>
<div class="space-y-2">
<label for="contact-company" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Company</label>
<input id="contact-company" name="company" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="Acme Logistics Ltd" type="text"/>
</div>
<div class="space-y-2 md:col-span-2">
<label for="contact-email" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Email</label>
<input id="contact-email" name="email" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="john@acmelogistics.com" type="email" required/>
</div>
<div class="space-y-2 md:col-span-2">
<label for="contact-message" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">What's your biggest challenge right now?</label>
<textarea id="contact-message" name="message" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm h-32 resize-none" placeholder="Tell us about the inefficiencies, costs, or bottlenecks you're dealing with..."></textarea>
</div>
</div>
<div class="pt-4 flex justify-center">
<button type="submit" data-umami-event="contact_form_submit" class="px-16 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,186,55,0.2)]">Book a Call</button>
</div>
</form>
</div>
</section>
<!-- Footer -->
<footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#131313] border-t border-[#B5C8DF]/10">
<div class="flex flex-col items-center md:items-start gap-2">
<a href="/" class="flex items-center gap-3">
<img src="assets/anteam_logo.webp" alt="Anteam" class="h-7 w-auto"/>
<span class="font-headline text-lg font-black text-primary">ANTEAM</span>
</a>
<div class="font-body text-xs tracking-wide text-[#C4C7C7]">© 2026 ANTEAM LTD</div>
</div>
<div class="flex flex-wrap justify-center gap-8">
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy">Mission</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="/#products">Products</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="#contact">Contact</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100" href="privacy-policy.html">Privacy Policy</a>
</div>
</footer>
<div id="toast" class="fixed bottom-8 right-8 z-50 hidden">
  <div id="toast-inner" class="flex items-center gap-4 px-6 py-4 border bg-surface-container-low font-headline uppercase tracking-widest text-sm font-bold shadow-[0_0_40px_rgba(0,0,0,0.4)]">
    <span id="toast-msg"></span>
  </div>
</div>
<script src="main.js" defer></script>
</body></html>
```

- [ ] **Step 2: Open in browser and verify**

Open `quote.html` locally. Check:
- Title bar reads "Anteam Quote™ – AI-Powered Freight Quoting | Anteam"
- Nav links have `/#` prefix; logo links to `/`
- No metrics panel (correct — Quote has none)
- "Book a Demo →" scrolls to contact section

- [ ] **Step 3: Commit**

```bash
git add quote.html
git commit -m "feat: add Quote product page"
```

---

### Task 3: Create `reload.html`

**Files:**
- Create: `reload.html`

**Note:** Reload metrics panel uses `id="metrics-panel-reload"` (starts with `metrics-panel`, so the counter observer in `main.js` picks it up automatically).

**Verification:** Open in browser. Confirm title, nav links, metrics counters animate, CTAs work.

- [ ] **Step 1: Create the file**

```html
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Anteam Reload™ – Eliminate Empty Miles | Anteam</title>
<meta name="description" content="Anteam Reload™ analyses planned routes to identify empty legs and automatically fills them with matching orders — reducing wasted miles and unlocking new revenue."/>
<meta name="robots" content="index, follow"/>
<link rel="icon" type="image/png" href="assets/favicon.png"/>
<link rel="canonical" href="https://www.anteam.ai/reload.html"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Anteam"/>
<meta property="og:title" content="Anteam Reload™ – Eliminate Empty Miles"/>
<meta property="og:description" content="Anteam Reload™ analyses planned routes to identify empty legs and automatically fills them with matching orders — reducing wasted miles and unlocking new revenue."/>
<meta property="og:url" content="https://www.anteam.ai/reload.html"/>
<meta property="og:image" content="https://www.anteam.ai/assets/case_study_3.webp"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Anteam Reload™ – Eliminate Empty Miles"/>
<meta name="twitter:description" content="Anteam Reload™ analyses planned routes to identify empty legs and automatically fills them with matching orders — reducing wasted miles and unlocking new revenue."/>
<meta name="twitter:image" content="https://www.anteam.ai/assets/case_study_3.webp"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Anteam Reload™",
  "description": "Anteam Reload™ analyses planned routes and delivery schedules to identify inefficient empty legs and automatically matches them with suitable orders to maximise vehicle utilisation.",
  "applicationCategory": "BusinessApplication",
  "url": "https://www.anteam.ai/reload.html"
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preload" href="assets/fonts/space-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
<noscript><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;700&display=swap" rel="stylesheet"/></noscript>
<link href="style.css" rel="stylesheet"/>
<script defer src="https://analytics.umami.is/script.js" data-website-id="ca05893a-4ca9-4f5c-b33b-665103596cd4"></script>
</head>
<body class="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-[#131313]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-b border-white/5">
<a href="/" class="flex items-center gap-3">
<img src="assets/anteam_logo.webp" alt="Anteam" class="h-8 w-auto"/>
<span class="text-2xl font-bold tracking-tighter text-primary">Anteam</span>
</a>
<div class="hidden md:flex gap-10">
<a class="font-headline tracking-widest uppercase text-sm text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy">Mission</a>
<a class="font-headline tracking-widest uppercase text-sm text-[#C4C7C7] hover:text-primary transition-colors" href="/#products">Products</a>
</div>
<a href="#contact" data-umami-event="cta_click" data-umami-event-location="nav" class="hidden md:inline-flex font-headline tracking-widest uppercase text-sm px-6 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95">
  Contact Us
</a>
<button id="nav-menu-btn" class="md:hidden flex items-center justify-center w-10 h-10 text-[#C4C7C7] hover:text-primary transition-colors" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
  <svg id="ham-svg" class="w-5 h-4" viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <line class="ham-line" x1="0" y1="2" x2="20" y2="2"/>
    <line class="ham-line" x1="0" y1="8" x2="20" y2="8"/>
    <line class="ham-line" x1="2" y1="14" x2="20" y2="14"/>
  </svg>
</button>
</nav>
<!-- Mobile nav overlay -->
<div id="mobile-nav" class="fixed inset-0 z-40 bg-[#0e0e0e] flex flex-col items-center justify-center gap-10 pointer-events-none opacity-0 transition-opacity duration-300" role="dialog" aria-modal="true" aria-label="Navigation" aria-hidden="true">
  <nav class="flex flex-col items-center gap-8">
    <a class="mobile-nav-link font-headline tracking-widest uppercase text-3xl text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy" tabindex="-1">Mission</a>
    <a class="mobile-nav-link font-headline tracking-widest uppercase text-3xl text-[#C4C7C7] hover:text-primary transition-colors" href="/#products" tabindex="-1">Products</a>
  </nav>
  <a href="#contact" data-umami-event="cta_click" data-umami-event-location="mobile_nav" class="mobile-nav-link mt-6 font-headline tracking-widest uppercase text-sm px-12 py-4 bg-primary text-on-primary hover:brightness-110 transition-all font-bold" tabindex="-1">
    Get in Touch
  </a>
</div>
<!-- Product Hero -->
<section class="pt-36 pb-16 bg-surface">
<div class="container mx-auto px-8">
<a href="/#products" class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors mb-12">← All Products</a>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
<div class="lg:col-span-7 space-y-6">
<div class="space-y-4">
<span aria-hidden="true" class="case-study-number">03</span>
<span class="text-primary font-mono text-base uppercase tracking-widest opacity-60">Freight Operators: Eliminate Empty Miles</span>
<h1 class="text-5xl md:text-6xl font-headline font-bold tracking-tight">Anteam Reload™</h1>
<p class="text-xl text-on-surface-variant font-light leading-relaxed">Analyses routes to identify and fill empty legs automatically — turning unprofitable journeys into revenue.</p>
</div>
<div class="flex">
<a href="#contact" data-umami-event="cta_click" data-umami-event-location="hero_reload" class="flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs whitespace-nowrap">Book a Demo →</a>
</div>
</div>
</div>
</div>
</section>
<!-- Product Content -->
<section class="py-16 bg-surface">
<div class="container mx-auto px-8">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
<div class="lg:col-span-7 space-y-8">
<div class="relative aspect-video overflow-hidden border border-outline-variant/20 group">
<img class="w-full h-full object-cover grayscale-[0.2] opacity-90 group-hover:opacity-100 transition-opacity duration-700" alt="High angle night shot of city streets with glowing orange delivery vehicle trails and a holographic map overlay" src="assets/case_study_3.webp" srcset="assets/case_study_3-600.webp 600w, assets/case_study_3.webp 1200w" sizes="(max-width: 1024px) 100vw, 58vw" loading="eager"/>
<div class="absolute inset-0 pointer-events-none hud-grid opacity-20"></div>
</div>
<div class="prose prose-invert max-w-none">
<p class="text-lg text-on-surface-variant font-light leading-relaxed">Anteam Reload™ analyses planned routes and delivery schedules to identify inefficient empty legs. By detecting these gaps, the system automatically matches them with suitable orders from own or other suppliers, effectively filling unused capacity and maximising vehicle utilisation. This not only reduces wasted mileage and fuel consumption but also unlocks new revenue opportunities from journeys that would previously generate no return.</p>
</div>
</div>
<div id="metrics-panel-reload" class="lg:col-span-5 lg:sticky lg:top-24 bg-surface-container-low border border-outline-variant/10 p-8">
<div class="flex items-center gap-2 mb-8">
<div class="w-2 h-2 bg-primary rounded-full"></div>
<span class="font-label text-xs uppercase tracking-widest text-primary">Metrics</span>
</div>
<div class="flex flex-col divide-y divide-outline-variant/10">
<div class="py-6 last:pb-0 flex items-center gap-6">
<div class="flex items-center gap-3 text-6xl font-headline font-bold text-secondary shrink-0"><span class="text-2xl">↓</span><span class="counter" data-target="50" data-suffix="%">0%</span></div>
<div>
<div class="text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">Empty Legs Reduction</div>
<div class="text-sm text-on-surface-variant font-light mt-1">Less empty legs makes your fleet more carbon and cost efficient.</div>
</div>
</div>
<div class="py-6 last:pb-0 flex items-center gap-6">
<div class="flex items-center gap-3 text-6xl font-headline font-bold text-tertiary shrink-0"><span class="text-2xl">↓</span><span class="counter" data-target="34" data-suffix="%">0%</span></div>
<div>
<div class="text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">CO₂ Savings</div>
<div class="text-sm text-on-surface-variant font-light mt-1">Fewer empty miles per matched delivery means a significantly lower carbon footprint.</div>
</div>
</div>
<div class="py-6 first:pt-0 flex items-center gap-6">
<div class="flex items-center gap-3 text-6xl font-headline font-bold text-primary shrink-0"><span class="text-2xl">↑</span><span class="counter" data-target="16" data-suffix="%">0%</span></div>
<div>
<div class="text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">Increase in Profit</div>
<div class="text-sm text-on-surface-variant font-light mt-1">Filling empty legs turns previously unprofitable journeys into revenue.</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Contact Section -->
<section id="contact" class="py-24 bg-surface-dim border-t border-primary/10">
<div class="container mx-auto px-8 max-w-4xl">
<div class="text-center mb-16 space-y-4">
<span class="text-primary font-label text-xs uppercase tracking-widest">Get in Touch</span>
<h2 class="text-5xl font-headline font-bold tracking-tight">Let's Talk</h2>
<p class="text-lg text-on-surface-variant font-light max-w-xl mx-auto leading-relaxed">Reach out to schedule a quick 15-minute chat to discuss your pain points. We'll talk about how Anteam AI can help.</p>
</div>
<form action="contact.php" method="POST" class="space-y-8 bg-surface-container-lowest p-10 border border-outline-variant/20">
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<div class="space-y-2">
<label for="contact-name" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Your Name</label>
<input id="contact-name" name="name" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="John Smith" type="text" required/>
</div>
<div class="space-y-2">
<label for="contact-company" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Company</label>
<input id="contact-company" name="company" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="Acme Logistics Ltd" type="text"/>
</div>
<div class="space-y-2 md:col-span-2">
<label for="contact-email" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Email</label>
<input id="contact-email" name="email" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm" placeholder="john@acmelogistics.com" type="email" required/>
</div>
<div class="space-y-2 md:col-span-2">
<label for="contact-message" class="block font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">What's your biggest challenge right now?</label>
<textarea id="contact-message" name="message" class="w-full px-4 py-3 border border-outline-variant/40 bg-surface focus:outline-none transition-colors font-body text-sm h-32 resize-none" placeholder="Tell us about the inefficiencies, costs, or bottlenecks you're dealing with..."></textarea>
</div>
</div>
<div class="pt-4 flex justify-center">
<button type="submit" data-umami-event="contact_form_submit" class="px-16 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,186,55,0.2)]">Book a Call</button>
</div>
</form>
</div>
</section>
<!-- Footer -->
<footer class="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#131313] border-t border-[#B5C8DF]/10">
<div class="flex flex-col items-center md:items-start gap-2">
<a href="/" class="flex items-center gap-3">
<img src="assets/anteam_logo.webp" alt="Anteam" class="h-7 w-auto"/>
<span class="font-headline text-lg font-black text-primary">ANTEAM</span>
</a>
<div class="font-body text-xs tracking-wide text-[#C4C7C7]">© 2026 ANTEAM LTD</div>
</div>
<div class="flex flex-wrap justify-center gap-8">
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="/#philosophy">Mission</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="/#products">Products</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary transition-colors" href="#contact">Contact</a>
<a class="font-body text-xs tracking-wide text-[#C4C7C7] hover:text-primary underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100" href="privacy-policy.html">Privacy Policy</a>
</div>
</footer>
<div id="toast" class="fixed bottom-8 right-8 z-50 hidden">
  <div id="toast-inner" class="flex items-center gap-4 px-6 py-4 border bg-surface-container-low font-headline uppercase tracking-widest text-sm font-bold shadow-[0_0_40px_rgba(0,0,0,0.4)]">
    <span id="toast-msg"></span>
  </div>
</div>
<script src="main.js" defer></script>
</body></html>
```

- [ ] **Step 2: Open in browser and verify**

Open `reload.html` locally. Check:
- Title bar reads "Anteam Reload™ – Eliminate Empty Miles | Anteam"
- Nav links have `/#` prefix; logo links to `/`
- Metrics panel counters animate on scroll
- "Book a Demo →" scrolls to contact section

- [ ] **Step 3: Commit**

```bash
git add reload.html
git commit -m "feat: add Reload product page"
```

---

### Task 4: Update homepage and sitemap

**Files:**
- Modify: `index.html` — add "Learn more →" links to each product card
- Modify: `sitemap.xml` — add three new URLs

**Verification:** Open `index.html` in browser. Each product card's "Learn more →" link navigates to the correct product page. View source of `sitemap.xml` and confirm all five URLs are present.

- [ ] **Step 1: Add "Learn more →" links to each product card in `index.html`**

For Route+ (after the existing "Book a Demo →" `<div class="flex">` block around line 216):
```html
<div class="flex gap-4 flex-wrap">
  <a href="#contact" data-umami-event="cta_click" data-umami-event-location="demo_route_plus" class="flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs whitespace-nowrap">Book a Demo →</a>
  <a href="route-plus.html" data-umami-event="cta_click" data-umami-event-location="learn_more_route_plus" class="flex items-center gap-2 px-8 py-3 border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs whitespace-nowrap">Learn More →</a>
</div>
```

For Quote (after the existing "Book a Demo →" link around line 260):
```html
<div class="flex gap-4 flex-wrap">
  <a href="#contact" data-umami-event="cta_click" data-umami-event-location="demo_quote" class="inline-flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs">Book a Demo →</a>
  <a href="quote.html" data-umami-event="cta_click" data-umami-event-location="learn_more_quote" class="inline-flex items-center gap-2 px-8 py-3 border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs">Learn More →</a>
</div>
```

For Reload (after the existing "Book a Demo →" `<div class="flex">` block around line 285):
```html
<div class="flex gap-4 flex-wrap">
  <a href="#contact" data-umami-event="cta_click" data-umami-event-location="demo_reload" class="flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs whitespace-nowrap">Book a Demo →</a>
  <a href="reload.html" data-umami-event="cta_click" data-umami-event-location="learn_more_reload" class="flex items-center gap-2 px-8 py-3 border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300 font-headline font-bold uppercase tracking-widest text-xs whitespace-nowrap">Learn More →</a>
</div>
```

- [ ] **Step 2: Update `sitemap.xml`**

Replace the contents of `sitemap.xml` with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.anteam.ai/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.anteam.ai/route-plus.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.anteam.ai/quote.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.anteam.ai/reload.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.anteam.ai/privacy-policy.html</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Verify in browser**

Open `index.html`. Each product card should now show both "Book a Demo →" and "Learn More →" side by side. Click each "Learn More →" and confirm it navigates to the correct product page.

- [ ] **Step 4: Commit**

```bash
git add index.html sitemap.xml
git commit -m "feat: link product cards to dedicated pages, update sitemap"
```

---

### Task 5: Open PR

- [ ] **Step 1: Push branch and open PR**

```bash
git push -u origin feature/product-pages
gh pr create --title "Add dedicated product pages for Route+, Quote and Reload" --body "$(cat <<'EOF'
## Summary

- Adds three dedicated product pages: `route-plus.html`, `quote.html`, `reload.html`
- Each page has unique title, meta description, canonical URL, OG/Twitter tags, and SoftwareApplication JSON-LD schema
- Homepage product cards updated with \"Learn More →\" links to each page
- Sitemap updated with all three new URLs

## Why

Currently all search traffic lands on the homepage. Dedicated pages let Google rank each product independently for queries like \"anteam route+\", \"anteam quote\", \"anteam reload\" — which already show up in Search Console with impressions but zero clicks.

## Test plan

- [ ] Open each page in browser: verify title, nav links (use `/#` prefix), metrics counters animate, CTAs work
- [ ] Confirm \"Learn More →\" links on homepage go to correct product pages
- [ ] Verify sitemap.xml contains 5 URLs
- [ ] After merge, submit sitemap to Google Search Console for re-crawl

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
