# drariciu-redesign — Full-site redo brief (Todd approved 2026-07-20)
(Staged in scratchpad during classifier outage; copy to Web-Projects/drariciu-batch4/REDESIGN-SITE-BRIEF.md when writes recover.)

Goal: a NEW live preview site that completely redesigns drariciu.com — modern, high-end feel, Gabe's blue palette, his content VERBATIM, displayed dramatically better. Target: "the best looking functional medicine practice site there is." Gabe's real WordPress site is untouched; this deploys to a preview URL for the go/no-go call.

## Locked decisions
- Repo: PRIVATE GitHub `drariciu-redesign`, local at /Volumes/T7/Claude Projects/Web-Projects/drariciu-redesign/
- Stack: dependency-free static HTML + one shared design-system CSS (assets/site.css) + minimal vanilla JS (nav, accordions). No build step, no frameworks.
- Host: free-tier static deploy → preview URL.
- Pages (11): index, about, services, systems-health-care, innovative-approach-thyroid, innovative-approach-sibo, innovative-approach-hormones, functional-blood-work-analysis, specialty-lab-testing, faq, contact. Blog = "Health Topics" tiles linking to live drariciu.com category archives (posts not rebuilt).
- The two batch-4 pages reuse the APPROVED v2 copy + architecture (mock-blood-work.html / mock-specialty.html are source of truth for those two).

## Design direction (high-end clinical-editorial)
- Palette: Gabe's blue #0262a2 anchor, hover #268ed4, expanded neutral system (near-black ink, warm off-whites, soft blue tints), generous whitespace. NO gold.
- Type: Lato (700/900) display + Lora body + PT Sans UI. Editorial scale: oversized H1s, eyebrow labels, tight display leading, airy body.
- Feel: premium specialty-clinic: full-bleed bands, asymmetric 2-col layouts, cards w/ soft shadows 8-12px radii, sticky header w/ Book CTA, 96-140px desktop section padding.
- Imagery: HIS media library only (headshot id 3775, microscope id 1654, fitting stock already in his library), hotlinked; blue duotone overlays allowed. Design stands where imagery is thin.
- Mobile-first; targets ≥44px; FAQ = native <details>.

## Hard rules
- Content VERBATIM from live site (scrape phase). No paraphrasing, no invented claims/prices/stats. New structural microcopy only (eyebrows/labels/CTAs), no em dashes, voice per 00_Resources/voice-principles.md.
- Disclaimer ("NOT licensed Medical Doctors" block) in footer of EVERY page.
- All booking CTAs → https://drariciu.janeapp.com ; phone (479) 310-6745 ; address 1736 E. Sunshine St. STE 703, Springfield, MO 65804.
- SEO: per-page title/meta (reuse shipped Yoast values where they exist), FAQPage JSON-LD where FAQs, LocalBusiness/Chiropractor JSON-LD on home + contact (site data only).
- Never touch drariciu.com in this lane.

## Phases
A. Scrape content verbatim → content/*.md + asset inventory (Sonnet)
B. Design system + flagship home + one inner page (Opus) → TODD REVIEWS before fan-out
C. Remaining pages (Sonnet fleet via Workflow)
D. QA on deployed preview: truncation/responsive/links/schema/a11y (Opus find, Sonnet fix, loop until dry)
E. Private repo push + deploy + live smoke + report

## Parallel lane (independent)
v2 Elementor templates (redesign-*.json, validated, staged for upload) import into Gabe's WP as drafts → preview → publish, once classifier recovers. Sequence: stage uploads/ + CORS server on 8923 → import form-submit on tab at elementor_library screen → open each draft editor → $e document/elements/empty (fallback UI-delete) → insert v2 template → save draft → preview screenshots → publish → live verify.
