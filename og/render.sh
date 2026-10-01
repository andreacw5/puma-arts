#!/usr/bin/env bash
# Renders og/poster.html once per page and language to public/og/<locale>/<page>.jpg at 1200x630:
# home.jpg, chi-sono.jpg and opere/<slug>.jpg, with text from i18n/locales and app/data.
# Usage: og/render.sh [slug ...]   (default: every page)
set -euo pipefail
cd "$(dirname "$0")"

CHROME="${CHROME:-$(ls -d ~/.cache/puppeteer/chrome-headless-shell/*/*/chrome-headless-shell 2>/dev/null | sort -V | tail -1)}"
[ -x "$CHROME" ] || { echo "chrome-headless-shell not found: npx @puppeteer/browsers install chrome-headless-shell, or set CHROME=" >&2; exit 1; }

# One "<out> <query string>" line per image, straight from the site's data.
node -e '
  const only = process.argv.slice(1)
  Promise.all([import("../app/data/artworks.ts"), import("../app/data/site.ts")]).then(([{ artworks, pathOrder, artworkTitle, artworkCaption }, { site }]) => {
    const fs = require("fs")
    const img = (url, w) => `${url}?width=${w}`
    const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k])
    const row = (out, p) => console.log(out, new URLSearchParams(p).toString())
    for (const lang of ["it", "en"]) {
      const t = JSON.parse(fs.readFileSync(`../i18n/locales/${lang}.json`, "utf8"))
      const dir = `../public/og/${lang}`
      if (!only.length) {
        const cover = artworks.find(a => a.slug === "papaveri")
        row(`${dir}/home.jpg`, { img: img(site.cover, 1600), ink: "red", title: "Emanuele|Puma",
          kicker: fill(t.home.credit, { title: artworkTitle(cover, lang) }), line: fill(t.home.line, { n: artworks.length }) })
        row(`${dir}/chi-sono.jpg`, { img: img(site.portrait, 1600), ink: "black", title: t.about.title,
          kicker: t.nav.about, line: fill(t.about.line, { artist: site.artist }) })
      }
      for (const w of pathOrder) {
        if (only.length && !only.includes(w.slug)) continue
        row(`${dir}/opere/${w.slug}.jpg`, { img: img(w.image, 1600), fit: "contain", ink: w.stage.ink, title: artworkTitle(w, lang),
          kicker: `${String(w.n).padStart(2, "0")}/${pathOrder.length} · ${t.stages[w.stage.id].title}`,
          line: artworkCaption(w, lang) || t.stages[w.stage.id].line })
      }
    }
  })' "$@" | while read -r out qs; do
  mkdir -p "$(dirname "$out")"
  png="$(mktemp -t og).png"
  "$CHROME" --allow-file-access-from-files --hide-scrollbars --window-size=1200,630 \
    --virtual-time-budget=8000 --screenshot="$png" "file://$PWD/poster.html?$qs" >/dev/null 2>&1
  magick "$png" -strip -quality 85 "$out" && rm "$png"
  echo "$out"
done
