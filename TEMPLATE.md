# Dr. Gabe Ariciu — Site Template & Replication Guide

This is the build spec for the page fleet. `index.html` is the flagship reference — every other
page (about, services, systems-health-care, innovative-approach-*, functional-blood-work-analysis,
specialty-lab-testing, faq, contact) is assembled from the same shared design system in
`assets/site.css` + `assets/site.js`. **No new CSS files, no frameworks, no build step.** Copy the
header/footer verbatim, drop in the section patterns below, wire the reveals, done.

Design direction: **clinical-editorial**. Display serif **Fraunces** for headlines + crisp
**Inter** for body/UI, on Gabe's blue. Oversized editorial H1s, eyebrow labels, soft-shadow cards,
tasteful scroll-reveal. Two font families, everything else derives from CSS variables.

---

## 0. The rules (do not break)

1. **Copy is VERBATIM** from the live site / `content/*.md`. No paraphrasing, no invented claims,
   prices, or stats. Only *structural microcopy* is new: eyebrows, section labels, button text,
   image alt. When you need a headline the source doesn't have, promote an existing verbatim line.
2. **No em dashes in microcopy.** (The Frost quote keeps its em dash - that's verbatim body
   content, not microcopy.) Use middot, commas, or periods in labels/eyebrows.
3. **The disclaimer block is in the footer of EVERY page**, verbatim (see section 3).
4. **Palette law:** only the blue family + neutral scale in `:root`. No gold, no off-brand accent
   hues. Never hard-code a hex in a page - use the CSS variables.
5. **All booking CTAs -> `https://drariciu.janeapp.com`.** Phone `(479) 310-6745`
   (`tel:+14793106745`). Address `1736 E. Sunshine St. STE 703, Springfield, MO 65804`.
6. **Never truncate text.** Any label/chip/heading/card must show its content in full at every
   width. Verify desktop + mobile before calling a page done.

---

## 1. Page skeleton + SEO head

Every page is this shell. Fill the per-page `<title>`, `<meta description>`, and `<link canonical>`
from the cached page's `<head>` (reuse the shipped Yoast values). Keep the two-font `<link>` and the
`preconnect`s exactly as-is.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>[PER-PAGE TITLE]</title>
<meta name="description" content="[PER-PAGE DESCRIPTION]">
<link rel="canonical" href="https://drariciu.com/[slug]/">
<meta property="og:type" content="website">
<meta property="og:title" content="[PER-PAGE TITLE]">
<meta property="og:description" content="[PER-PAGE DESCRIPTION]">
<meta property="og:image" content="https://drariciu.com/wp-content/uploads/2025/04/headshot-1024x1024.jpg">
<meta name="theme-color" content="#0262a2">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css">
<!-- JSON-LD: LocalBusiness/Chiropractor on index + contact only; FAQPage on any page with FAQs -->
</head>
<body>
<a href="#main" class="btn btn--primary" style="position:absolute;left:-9999px;top:0;z-index:200;">Skip to content</a>
<div class="nav-backdrop" aria-hidden="true"></div>
<!-- HEADER (section 2) -->
<main id="main">
  <!-- SECTIONS (section 4) -->
</main>
<!-- FOOTER (section 3) -->
<script src="assets/site.js" defer></script>
</body>
</html>
```

**JSON-LD:** put the `Chiropractor`/`MedicalBusiness` block (copy from `index.html`) on `index` and
`contact` only. On any page that renders an FAQ accordion, also emit a `FAQPage` block whose
`mainEntity` questions/answers exactly match the visible verbatim Q&A.

---

## 2. Header (copy verbatim onto every page)

Set `aria-current="page"` on the current page's `.nav__link`. The in-nav Book button is auto-hidden
on desktop and shown only in the mobile slide-out, so keep both Book buttons as written.

```html
<header class="site-header">
  <div class="wrap wrap--wide header-inner">
    <a class="brand" href="index.html" aria-label="Dr. Gabe Ariciu, home">
      <span class="brand__name">Dr. Gabe Ariciu</span>
      <span class="brand__cred">DC</span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Primary">
      <a class="nav__link" href="about.html">About</a>
      <a class="nav__link" href="services.html">Services</a>
      <a class="nav__link" href="systems-health-care.html">Systems Health Care</a>
      <a class="nav__link" href="https://drariciu.com/blog/" rel="noopener">Health Topics</a>
      <a class="nav__link" href="faq.html">FAQ</a>
      <a class="nav__link" href="contact.html">Contact</a>
      <a class="btn btn--primary" href="https://drariciu.janeapp.com" rel="noopener">Book a Visit</a>
    </nav>
    <div class="header-cta">
      <a class="btn btn--primary" href="https://drariciu.janeapp.com" rel="noopener">Book a Visit</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">
        <svg class="bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        <svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
  </div>
</header>
```

`Health Topics` points at the live WordPress blog archive (`https://drariciu.com/blog/`) - posts are
NOT rebuilt. The Approach pages (`innovative-approach-*`, `functional-blood-work-analysis`,
`specialty-lab-testing`) live under Services - link to them from within the Services page, not the
top nav (keep the nav to 6 items).

---

## 3. Footer (copy verbatim onto every page - disclaimer is mandatory)

```html
<footer class="site-footer">
  <div class="wrap wrap--wide">
    <div class="footer-grid">
      <div class="footer__brand">
        <a class="brand" href="index.html" aria-label="Dr. Gabe Ariciu, home">
          <span class="brand__name">Dr. Gabe Ariciu</span><span class="brand__cred">DC</span>
        </a>
        <p>Functional Medicine and Applied Kinesiology in Springfield, Missouri.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <nav class="footer-nav" aria-label="Footer">
          <a href="about.html">About</a>
          <a href="services.html">Services</a>
          <a href="systems-health-care.html">Systems Health Care</a>
          <a href="https://drariciu.com/blog/" rel="noopener">Health Topics</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact</a>
        </nav>
      </div>
      <div>
        <h4>Visit</h4>
        <div class="nap">
          <a href="https://www.google.com/maps?q=1736+E.+Sunshine+St.+STE+703,+Springfield,+MO+65804" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>
            <span>1736 E. Sunshine St. STE 703, Springfield, MO 65804</span>
          </a>
          <a href="tel:+14793106745">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3h3l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5a2 2 0 0 1 2-2Z"/></svg>
            <span>(479) 310-6745</span>
          </a>
          <a href="https://drariciu.janeapp.com" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M3.5 9h17M8 3v3M16 3v3"/></svg>
            <span>Book on Jane</span>
          </a>
        </div>
      </div>
    </div>
    <div class="disclaimer">
      <strong>DISCLAIMER:</strong> Gabriel Ariciu is NOT licensed Medical Doctors (MD). He is a licensed Chiropractic Physician in the state of Missouri. Information on this website is provided for general educational purposes only and is not intended to constitute (i) medical advice or counseling, (ii) the practice of medicine including psychiatry, psychology, psychotherapy or the provision of health care diagnosis or treatment, (iii) the creation of a physician patient or clinical relationship, or (iv) an endorsement, recommendation or sponsorship of any third party product or service by the Sponsor or any of the Sponsor&rsquo;s affiliates, agents, employees, consultants or service providers. These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any diseases. If you have or suspect that you have a medical problem, contact your health care provider promptly.
    </div>
    <div class="footer-legal">
      <span>Copyright &copy; 2026 Dr. Gabe - Functional Medicine and Applied Kinesiology</span>
      <a href="https://drariciu.janeapp.com" rel="noopener">Book a Visit &rarr;</a>
    </div>
  </div>
</footer>
```

---

## 4. Section & component patterns

Wrap every band in `<section class="section section--[bg]">` with an inner `<div class="wrap">`
(or `wrap wrap--wide` for hero/header/footer). Alternate backgrounds for rhythm; don't run two of
the same back-to-back except a dark CTA flowing into the dark footer.

**Section backgrounds:** `--paper` (default warm off-white), `--tint` (soft blue band),
`--white` (crisp white), `--navy` (deep-blue ink-on-dark; use for one or two anchor bands + the CTA).

### Section header
```html
<div class="section-head reveal">        <!-- add .center to center it -->
  <p class="eyebrow">Label In Caps</p>    <!-- .eyebrow--center when centered -->
  <h2>Verbatim or promoted headline.</h2>
  <p class="lede">Verbatim supporting sentence.</p>
</div>
```
On a `--navy` section, add `style="color:var(--brand-bright)"` to the eyebrow so it stays legible.

### Hero (home; simplify for inner pages)
Split hero with portrait. For inner pages, drop the portrait column and use a single-column
`.section` with eyebrow + H1 + lede + one CTA. Emphasize a phrase in the H1 with
`<span class="hl">...</span>` (brand-colored italic).
```html
<section class="hero">
  <div class="wrap wrap--wide">
    <div class="hero__grid">
      <div class="hero__stagger">
        <p class="eyebrow">...</p>
        <div class="tag-row"><span class="pill">...</span>...</div>   <!-- optional -->
        <h1 class="hero__display">... <span class="hl">...</span></h1>
        <div class="hero__actions">
          <a class="btn btn--primary btn--lg" href="https://drariciu.janeapp.com" rel="noopener">Schedule Here</a>
          <a class="btn btn--ghost btn--lg" href="...">Secondary</a>
        </div>
      </div>
      <div class="hero__media"> ...portrait + .hero__badge... </div>
    </div>
  </div>
</section>
```

### Cards (3-up services / features)
```html
<div class="grid grid--3">
  <article class="card card--service reveal" data-delay="1">
    <div class="card__ic"><svg .../></div>
    <h3 class="card__title">Title</h3>
    <p class="card__body">Verbatim description.</p>
  </article>
  ...
</div>
```
`grid--2`, `grid--3`, `grid--auto` available. Icons are inline 24x24 stroke SVGs using
`stroke="currentColor"` (they inherit the brand color). A card can be an `<a>` for a "see more" tile.

### Concern / feature chips (dense lists)
```html
<div class="focus-grid">
  <div class="focus-item"><span class="dot"></span><span class="lbl">Verbatim item</span></div>
  ...
</div>
```

### Numbered process (steps)
```html
<div class="steps">
  <div class="step"><span class="step__badge">01</span><p class="step__t">Verbatim step</p></div>
  ...
</div>
```
`.steps` is 2-col on desktop, 1-col on mobile. Works on light or `--navy` backgrounds.

### Asymmetric split (story / feature + image)
```html
<div class="split split--media-right">   <!-- omit modifier to put media left -->
  <div class="reveal">
    <p class="eyebrow">...</p><h2>...</h2><p>Verbatim body.</p>
    <div class="stat-row">
      <div class="stat"><div class="stat__num">1000+</div><div class="stat__lbl">Verbatim-grounded label</div></div>
    </div>
    <a class="btn btn--primary" href="...">CTA</a>
  </div>
  <div class="split__media reveal" data-delay="1">
    <img src="...-1024x683.jpg" width="1024" height="683" alt="..." loading="lazy">
  </div>
</div>
```
Stat numbers must be grounded in verbatim copy (e.g. "1000+" from "Over 1000 hours..."). Don't invent.

### Testimonials (verbatim reviews only)
```html
<div class="reviews">
  <figure class="review reveal" data-delay="1">
    <blockquote class="review__text">Verbatim review text.</blockquote>
    <figcaption class="review__by">
      <span class="review__avatar">G</span>
      <span><span class="review__name">Reviewer Name</span><br><span class="review__src">Posted on Google</span></span>
    </figcaption>
  </figure>
  ...
</div>
```
Use only real reviews from the cache, verbatim. No star ratings (we don't fabricate a numeric
rating) - the "Posted on Google" label is the source attribution and is itself verbatim.

### Post / link list (Health Topics teaser)
```html
<div class="posts">
  <a class="post-link reveal" href="[live post URL]" rel="noopener">
    <span class="post-link__t">Verbatim post title</span>
    <span class="post-link__arrow"><svg ...arrow.../></span>
  </a>
  ...
</div>
```

### FAQ accordion (native `<details>`)
```html
<div class="faq">
  <details>
    <summary>Verbatim question<span class="chev"><svg ...chevron-down.../></span></summary>
    <div class="faq__body"><p>Verbatim answer.</p></div>
  </details>
  ...
</div>
```
Styled, animated, keyboard-accessible for free. Mirror every Q&A into a `FAQPage` JSON-LD block.

### CTA band (deep blue, before the footer)
```html
<section class="section section--navy cta-band">
  <span class="cta-glow cta-glow--a" aria-hidden="true"></span>
  <span class="cta-glow cta-glow--b" aria-hidden="true"></span>
  <div class="wrap">
    <div class="cta-band__inner reveal">
      <p class="eyebrow eyebrow--center" style="color:var(--brand-bright)">Get Started</p>
      <h2>Verbatim CTA headline</h2>
      <div class="cta-band__actions" style="margin-top:2rem;">
        <a class="btn btn--light btn--lg" href="https://drariciu.janeapp.com" rel="noopener">Click Here!</a>
        <a class="btn btn--outline-light btn--lg" href="tel:+14793106745">(479) 310-6745</a>
      </div>
    </div>
  </div>
</section>
```

**Button variants:** `btn--primary` (blue), `btn--ghost` (outlined, light bg), `btn--light`
(white, for dark bands), `btn--outline-light` (outlined, for dark bands); add `btn--lg` for hero/CTA.

---

## 5. Reveal wiring (motion)

Add class `reveal` to any element you want to fade+rise on scroll. Stagger siblings with
`data-delay="1..5"`. `assets/site.js` runs an IntersectionObserver that adds `.in-view` - **no
per-page JS.** All motion is gated behind `prefers-reduced-motion: no-preference`; reduced-motion
users see everything immediately. Don't put `reveal` on the header/footer or on the first hero (the
hero uses its own `.hero__stagger` entrance animation).

---

## 6. Image guidelines

- **Hotlink from his live library** (`https://drariciu.com/wp-content/uploads/...`). Do not download
  or re-host.
- **Use WordPress's sized variants**, never the full-res original: append `-1024x683` / `-768x512`
  / `-600x600` etc. (e.g. headshot: `headshot-1024x1024.jpg` = 75KB, not the 2048px 354KB original).
- Always set intrinsic `width`/`height` attributes (prevents layout shift) and `loading="lazy"` on
  every image below the fold. The hero portrait is eager + `<link rel="preload" as="image">` in head.
- **Pick on-message imagery.** Verify the actual photo before using it - filenames lie (a
  "boltneva" food shot turned out to be fried food, wrong for a nutrition story; the vegetables
  shot `pexels-mark-stebnicki-2255935` is the right whole-foods image). Design stands on typography
  where his library is thin - a strong type band beats a bad stock photo.
- Known-good picks: portrait `headshot-1024x1024.jpg`; whole foods `pexels-mark-stebnicki-2255935-1024x683.jpg`;
  countryside `trees-farm-fence-2900064-1024x683.jpg`; gut/wellness `pexels-kindel-media-7298672-1024x683.jpg`.
- Blue duotone overlays are allowed (the hero portrait uses a subtle bottom gradient). Keep total
  page weight well under 1MB - home currently loads ~330KB fully (fonts ~194KB are the bulk).

---

## 7. Per-page fleet notes

| Page | Nav active | Notes |
|---|---|---|
| `index.html` | Home | Flagship. LocalBusiness JSON-LD. Full hero + all patterns. Done. |
| `about.html` | About | "My Story" long-form. Split with portrait, stat band, values as cards. |
| `services.html` | Services | Service cards linking out to the Approach detail pages. |
| `systems-health-care.html` | Systems Health Care | Explains the SHC technique - steps + split. |
| `innovative-approach-thyroid.html` | (from Services) | Condition deep-dive: hero + focus chips + FAQ + CTA. |
| `innovative-approach-sibo.html` | (from Services) | Same condition template. |
| `innovative-approach-hormones.html` | (from Services) | Same condition template. |
| `functional-blood-work-analysis.html` | (from Services) | Reuse approved v2 copy/architecture. |
| `specialty-lab-testing.html` | (from Services) | Reuse approved v2 copy/architecture. |
| `faq.html` | FAQ | `.faq` accordion + FAQPage JSON-LD. |
| `contact.html` | Contact | NAP + map + hours + CTA. LocalBusiness JSON-LD. |

For every page: copy header (set `aria-current`), assemble sections from section 4 with verbatim
copy, copy footer, add `reveal` classes, set the SEO head, verify desktop + mobile for overflow and
truncation. That's the whole loop.
