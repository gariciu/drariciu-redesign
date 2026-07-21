---
scope: shared site chrome — header nav, footer, disclaimer, NAP, booking, social
extracted_from: header/footer markup common to all 9 cached live pages (identical across home.html, about.html, services.html, systems-health-care.html, innovative-approach-thyroid.html, innovative-approach-sibo.html, innovative-approach-hormones.html, faq.html, contact.html)
---

## Site logo

- **Alt text:** "Dr. Gabe – Functional Medicine and Applied Kinesiology"
- **Src (as served):** https://drariciu.com/wp-content/uploads/2021/11/Dr.-Gabe-reg-268x96.jpg
- **Links to:** https://drariciu.com/ (home)
- Custom logo, WordPress attachment id 1541. Desktop and mobile header use the identical image.

## Header navigation (desktop + mobile — identical structure)

Primary menu, in document order. Indented items are sub-menu (dropdown) entries.

- [Home](/)
- [About](https://drariciu.com/about/)
  - [417 Local Resources](https://drariciu.com/417-local-resources/)
  - [FAQ](https://drariciu.com/faq/)
- [Services](https://drariciu.com/services/)
  - [What is Systems Health Care?](https://drariciu.com/systems-health-care/)
- [Health Topics](https://drariciu.com/blog/)
- [Schedule](https://drariciu.janeapp.com/)
- [Contact](https://drariciu.com/contact/)

Note: "417 Local Resources" is a live nav item / page that is **not** one of the 11 pages in this rebuild's scope (per BRIEF.md) — flagged here for awareness only, not to be built.

## Footer content (identical across all cached pages)

Footer is a 3-column WordPress widget area + a below-footer bar.

**Column 1 — Email widget** (heading: "Email")
```
doc@drariciu.com   (mailto:doc@drariciu.com)
479-310-6745       (tel:4793106745)
```
Plus a Google Map embed (block widget), src:
```
https://maps.google.com/maps?q=1736%20E.%20Sunshine%20St%2C%20Springfield%2C%20MO%2065804&z=12&hl=en&t=m&output=embed&iwloc=near
```

**Column 2 — Brand block**
- Logo image: https://drariciu.com/wp-content/uploads/2021/11/Dr.-Gabe-286x300.png (alt: none set)
- Heading: "Dr. Gabe Ariciu, DC"
- Social icons (footer only — no icons found elsewhere on the cached pages):
  - Facebook → http://facebook.com/drariciu
  - Instagram → https://www.instagram.com/drariciu/
  - Twitter/X → https://twitter.com/drariciu

**Column 3 — Address widget** (heading: "Address")
```
1736 E. Sunshine St. STE 703
Springfield, MO 65804
```

**Below-footer bar**
```
Copyright © 2026 Dr. Gabe - Functional Medicine and Applied Kinesiology
```

### Full disclaimer block (verbatim, footer of every page)

> DISCLAIMER: Gabriel Ariciu is NOT licensed Medical Doctors (MD). He is a licensed Chiropractic Physician in the state of Missouri. Information on this website is provided for general educational purposes only and is not intended to constitute (i) medical advice or counseling, (ii) the practice of medicine including psychiatry, psychology, psychotherapy or the provision of health care diagnosis or treatment, (iii) the creation of a physician patient or clinical relationship, or (iv) an endorsement, recommendation or sponsorship of any third party product or service by the Sponsor or any of the Sponsor's affiliates, agents, employees, consultants or service providers. These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any diseases. If you have or suspect that you have a medical problem, contact your health care provider promptly.

(Note the source grammar as-is: "is NOT licensed Medical Doctors" — singular subject / plural predicate mismatch in the live site's own text. Preserved verbatim per the no-paraphrase rule; flagged as an anomaly in the extraction report, not corrected here.)

## NAP (Name / Address / Phone) — canonical, for schema + footer + contact page

- **Name:** Dr. Gabe Ariciu, DC (site-wide title: "Dr. Gabe - Functional Medicine and Applied Kinesiology"; site tagline used in schema: "Dr. Gabe | Springfield MO")
- **Address:** 1736 E. Sunshine St. STE 703, Springfield, MO 65804
- **Phone:** 479-310-6745 (footer format) / (479) 310-6745 (contact-page format — both forms appear verbatim on the live site; tel link in both cases is `tel:4793106745`)
- **Email:** doc@drariciu.com

## Booking

- Jane booking root used site-wide for the header "Schedule" nav item and most generic buttons: **https://drariciu.janeapp.com/**
- Page-specific/deep-linked Jane URLs seen in the cached pages (preserve exactly, do not collapse to the root):
  - `https://drariciu.janeapp.com/#/staff_member/1/treatment/10` — "free 15 minute consult" treatment (used on contact, faq, thyroid/sibo/hormones "Schedule Today" blocks)
  - `https://drariciu.janeapp.com/#/staff_member/1/treatment/1` — "new patient appointment" treatment (faq, thyroid/sibo/hormones)
  - `https://drariciu.janeapp.com/#staff_member/1` — shorthand staff-member link used on the three condition pages' upper CTAs (note: no `/#/` — this exact hash form, `#staff_member/1`, differs from the `#/staff_member/1/treatment/N` form above; both exist verbatim on the live site)

## Social links

- Facebook: http://facebook.com/drariciu
- Instagram: https://www.instagram.com/drariciu/
- Twitter/X: https://twitter.com/drariciu

(No social links found in the header; all three live only in the footer widget area.)
