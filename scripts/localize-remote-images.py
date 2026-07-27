#!/usr/bin/env python3
"""Localize hotlinked WordPress/legacy images before the drariciu.com DNS flip.

Every URL in remote-image-manifest.json currently points at drariciu.com/wp-content,
ozarkholisticcenter.com, or the i0.wp.com CDN. All of those break once drariciu.com
points at GitHub Pages (and whenever ozarkholisticcenter.com goes away). This script:

  1. downloads each image into assets/uploads/<host>/<original path>
  2. rewrites every reference in the HTML tree (src, srcset, href, og:image) to the
     local copy
  3. reports anything that failed to download so it can be handled by hand

Run it from the repo root on any machine with normal internet access:

    python3 scripts/localize-remote-images.py

then review `git status`, commit, and push. Safe to re-run; downloads are skipped
if the target file already exists.
"""
import json, os, re, sys, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "scripts", "remote-image-manifest.json")
DEST = os.path.join(ROOT, "assets", "uploads")

urls = json.load(open(MANIFEST))

def local_path(url):
    p = urllib.parse.urlparse(url)
    path = p.path.lstrip("/")  # query string (?fit=...&ssl=1) intentionally dropped
    if p.netloc == "i0.wp.com":
        # i0.wp.com/drariciu.com/wp-content/... -> file under the origin host's tree
        host, _, path = path.partition("/")
    else:
        host = p.netloc.replace("www.", "")
    return os.path.join(DEST, host, path)

failed, done = [], {}
for u in urls:
    lp = local_path(u)
    os.makedirs(os.path.dirname(lp), exist_ok=True)
    if not os.path.exists(lp):
        try:
            req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (site-migration)"})
            with urllib.request.urlopen(req, timeout=30) as r, open(lp, "wb") as f:
                f.write(r.read())
            print("ok  ", u)
        except Exception as e:
            failed.append((u, str(e)))
            print("FAIL", u, "->", e, file=sys.stderr)
            continue
    done[u] = os.path.relpath(lp, ROOT).replace(os.sep, "/")

# rewrite references
changed = 0
for dirpath, dirs, files in os.walk(ROOT):
    if ".git" in dirpath or dirpath.endswith("scripts"):
        continue
    for fn in files:
        if not fn.endswith(".html"):
            continue
        full = os.path.join(dirpath, fn)
        c = orig = open(full, encoding="utf-8").read()
        depth = os.path.relpath(dirpath, ROOT)
        prefix = "" if depth == "." else "../" * (len(depth.split(os.sep)))
        for u, lp in done.items():
            c = c.replace(u, prefix + lp)
        if c != orig:
            open(full, "w", encoding="utf-8").write(c)
            changed += 1

print(f"\ndownloaded/present: {len(done)}  failed: {len(failed)}  html files rewritten: {changed}")
if failed:
    print("\nFailed URLs (fix by hand or re-run):")
    for u, e in failed:
        print(" ", u)
