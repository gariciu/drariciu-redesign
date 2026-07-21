# drariciu.com — BEFORE metrics (WordPress/Elementor + Astra + Jetpack)

Captured 2026-07-20, read-only via `curl` (no browser, no rendering — HTML-only counts; actual browser-loaded byte totals for images/fonts/JS-injected content will be higher than what's captured here).

## Per-page HTML + tag counts

| Page | URL | HTML size | `<script src>` | `<link rel=stylesheet>` | `<img>` | inline `<style>` blocks | distinct 3rd-party hosts | notes |
|---|---|---|---|---|---|---|---|---|
| Home | `/` | 240,335 B (234.7 KB) | 13 | 4 | 9 | 25 | 29 | heaviest page; only page (besides Contact) pulling TrustIndex reviews widget |
| About | `/about/` | 194,506 B (189.9 KB) | 11 | 4 | 5 | 25 | 27 | |
| Services | `/services/` | 216,849 B (211.7 KB) | 11 | 4 | 8 | 27 | 27 | most inline `<style>` blocks |
| FAQ | `/faq/` | 180,202 B (175.9 KB) | 10 | 3 | 3 | 25 | 27 | lightest page |
| Contact | `/contact/` | 203,873 B (199.0 KB) | 11 | 3 | 3 | 25 | 29 | pulls Google Maps embed + TrustIndex + `lh3.googleusercontent.com` |
| Systems Health Care | `/systems-health-care/` | 197,940 B (193.3 KB) | 11 | 4 | 5 | 25 | 28 | only page linking out to `systemshealthcare.net` |

**HTML-only average across the 6 pages: ~205.6 KB.** None of this counts images, webfonts, or the JS/CSS payload those `<script src>`/`<link>` tags pull in — see asset-weight section below for Home.

## Distinct third-party hosts referenced (union across all 6 pages)

Grouped by function — raw host list per page is in the per-page counts above; this is what those hosts are:

- **Google**: `www.googletagmanager.com` (GTM container `GT-PL3TQLKF`), `fonts.googleapis.com`, `fonts.gstatic.com`, `maps.google.com`, `lh3.googleusercontent.com` (Contact page only, Maps-related)
- **Automattic / WordPress.com / Jetpack** (largest cluster — 11 distinct subdomains): `api.w.org`, `s.w.org`, `c0.wp.com`, `s0.wp.com`, `i0.wp.com`, `fonts-api.wp.com`, `stats.wp.com`, `widgets.wp.com`, `public-api.wordpress.com`, `jetpack.wordpress.com`, `wp.me`
- **Gravatar**: `0.gravatar.com`, `1.gravatar.com`, `2.gravatar.com`, `secure.gravatar.com`
- **Social**: `facebook.com`, `twitter.com`, `www.instagram.com`
- **Jane App** (booking widget): `drariciu.janeapp.com`
- **TrustIndex** (reviews widget — Home + Contact only): `cdn.trustindex.io`
- **SEO/theme markup namespaces, not actual network requests**: `schema.org`, `www.w3.org`, `gmpg.org` (XFN `rel=profile` link), `yoast.com` (generator meta comment)
- **Systems Health Care page only** (outbound link, not an asset host): `systemshealthcare.net`

Net: **~24 hosts that actually cost a DNS lookup + connection**, once the markup-only namespace references (`schema.org`, `w3.org`, `gmpg.org`) are excluded. The WP.com/Jetpack/Automattic cluster alone is 11 of those.

## Home-page render-blocking asset weight (best effort — HEAD, GET fallback where HEAD had no Content-Length)

All 17 `<script src>` + `<link rel=stylesheet>` URLs found in the Home page HTML were fetched (17 of 30-request cap — none skipped):

| # | Asset | Type | Method | HTTP | Bytes |
|---|---|---|---|---|---|
| 1 | `drariciu.com/_jb_static/??de51b946c5` (Jetpack Boost combined CSS bundle) | CSS | GET | 200 | 431,412 |
| 2 | `fonts-api.wp.com/css?family=Lora:400\|Lato:700\|PT+Sans:400` | CSS | GET | 200 | 7,035 |
| 3 | `drariciu.com/…/jetpack-forms-layout.css` | CSS | HEAD | 200 | 14,365 |
| 4 | `drariciu.com/_jb_static/??5438620020` (Jetpack Boost combined bundle) | CSS/JS | GET | 200 | 29,906 |
| 5 | `drariciu.com/…/gtm-kit/…/engagement-events.js` | JS | HEAD | 200 | 1,297 |
| 6 | `www.googletagmanager.com/gtag/js?id=GT-PL3TQLKF` | JS | GET | 200 | 572,454 |
| 7 | `drariciu.com/wp-includes/js/jquery/jquery.min.js` | JS | HEAD | 200 | 87,553 |
| 8 | `drariciu.com/wp-includes/js/jquery/jquery-migrate.min.js` | JS | HEAD | 200 | 13,577 |
| 9 | `s0.wp.com/wp-content/js/bilmur.min.js` | JS | HEAD | 200 | 12,907 |
| 10 | `drariciu.com/…/astra/…/frontend.min.js` | JS | HEAD | 200 | 25,719 |
| 11 | `drariciu.com/…/gutenberg/…/dom-ready/index.min.js` | JS | HEAD | 200 | 821 |
| 12 | `drariciu.com/_jb_static/??d3ee72b0c0` (Jetpack Boost combined bundle) | JS | GET | 200 | 84,478 |
| 13 | `drariciu.com/…/elementor/assets/js/frontend.min.js` | JS | HEAD | 200 | 32,098 |
| 14 | `drariciu.com/…/elementor/…/swiper.min.js` | JS | HEAD | 200 | 143,709 |
| 15 | `stats.wp.com/e-202630.js` | JS | HEAD | 200 | 3,812 |
| 16 | `cdn.trustindex.io/loader.js` | JS | HEAD | 200 | 86,153 |
| 17 | `drariciu.com/…/jetpack/…/jetpack-carousel.min.js` | JS | HEAD | 200 | 24,685 |

**Home render-blocking CSS+JS total: 1,571,981 bytes ≈ 1,535 KB ≈ 1.50 MB** — before adding the 234.7 KB HTML document itself, before images, before webfonts (gstatic), and before whatever the two Jetpack Boost combined bundles (#1, #4, #12 — 546 KB alone) further chain-load. All 17 requests resolved (200 OK); none skipped.

**Home total transfer floor (HTML + these 17 assets): ~1,806 KB (~1.76 MB)**, not counting images/fonts/inline-triggered requests.

## Home-page timing (curl, 3 runs, median reported)

| Run | time_total | time_starttransfer |
|---|---|---|
| 1 | 0.111160s | 0.057183s |
| 2 | 0.112547s | 0.058250s |
| 3 | 0.110813s | 0.056164s |
| **Median** | **0.111160s** | **0.057183s** |

Note: these numbers are fast because WP.com's edge (`x-nananana: Batcache-Set`, Automattic CDN) is serving a **cached, gzip-compressed HTML response** to a single `curl` request from this network — this measures server/CDN response latency for the HTML document only, not real-world page-load time (which is dominated by the ~1.5 MB of CSS/JS above plus images/fonts, none of which `curl -w` on the HTML request captures). Treat this as a TTFB/document-transfer floor, not a page-load benchmark.

---

### Home page totals (one-line summary)
**Home: 234.7 KB HTML + ~1.50 MB render-blocking CSS/JS (17 requests, 0 skipped) = ~1.76 MB transfer floor · 29 distinct 3rd-party hosts referenced · TTFB median 57ms / total median 111ms (cached CDN response, not full page-load time).**
