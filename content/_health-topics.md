---
scope: "Health Topics" tiles — link out to live drariciu.com category archives (posts are not rebuilt, per BRIEF.md; blog stays on the live WordPress site)
source: categories.json (cached WordPress REST API /wp-json/wp/v2/categories response)
---

10 categories, in the order returned by the cache (WordPress category id order). Each links to its live archive URL — `https://drariciu.com/category/<slug>/`.

| Name | Slug | Live archive URL | Post count |
|---|---|---|---|
| Autoimmune Disease | `autoimmune-disease` | https://drariciu.com/category/autoimmune-disease/ | 9 |
| Chronic Infections | `chronic-infections` | https://drariciu.com/category/chronic-infections/ | 13 |
| Functional Medicine | `functional-medicine` | https://drariciu.com/category/functional-medicine/ | 7 |
| Gut Health | `gut-health` | https://drariciu.com/category/gut-health/ | 12 |
| Headaches | `headaches` | https://drariciu.com/category/headaches/ | 6 |
| Hormonal Health | `hormones` | https://drariciu.com/category/hormones/ | 6 |
| Mental Health & Neurological | `mental-health-and-neurological-conditions` | https://drariciu.com/category/mental-health-and-neurological-conditions/ | 6 |
| Nutrition & Wellness | `wellness` | https://drariciu.com/category/wellness/ | 6 |
| Structural & Musculoskeletal Pain | `sports-injuries-and-musculoskeletal-pain` | https://drariciu.com/category/sports-injuries-and-musculoskeletal-pain/ | 15 |
| Thyroid Health | `thyroid-health` | https://drariciu.com/category/thyroid-health/ | 3 |

Note: the raw JSON encodes the ampersand as `&amp;` in "Mental Health &amp; Neurological" and "Nutrition &amp; Wellness" (standard WP REST HTML-entity escaping of the category name) — rendered as plain `&` above; both forms refer to the same category name verbatim.

Total posts across all 10 categories: 83 (counts are not mutually exclusive — a post can carry more than one category).
