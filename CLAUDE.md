# puma-arts

Sito di Studio Arte Puma (studioartepuma.it). **Nuxt 4 + Vue 3 + CSS puro + GSAP**, prerender + Nitro Node, pnpm. Stessa impostazione tecnica di `../heyatom-portfolio`: in caso di dubbio, fare come lì.

Niente Vuetify, niente Pinia, niente DB. I contenuti sono file TS in `app/data/`.

## Struttura

```
app/
  app.vue            # head globale: canonical, og default, classe `js` per il motion
  assets/main.css    # token e stili base. Palette e font provvisori finché manca DESIGN.md
  data/artworks.ts   # opere: fonte unica, ordine = più recenti prima
  data/site.ts       # nome, contatti, ritratto, immagine di share
  pages/
  utils/img.ts       # img/srcset per FileHarbor (?width=N)
  utils/motion.ts    # useMotion, revealLines, magnetic (copiato dal portfolio)
scripts/upload-images.mjs  # carica su FileHarbor i path locali in app/data/*.ts e li sostituisce
```

## Regole

- **Stile**: CSS scoped nei componenti + token da `main.css`. Mai colori hardcoded.
- **Motion**: sempre via `useMotion(root, (mm, el) => …)`, animazioni dentro `mm.add(MOTION_OK, …)`.
- **SEO**: ogni pagina chiama `useSeoMeta` con titolo e descrizione. URL assoluti da `useRuntimeConfig().public.siteUrl`.
- **Prerender**: Nitro parte da `/` e segue i link. Una pagina non linkata da nessuna parte va aggiunta a `nitro.prerender.routes`.
- **Opere**: titolo assente = "Senza titolo", sempre via `artworkTitle()`. `slug` stabile: è l'URL di `/opere/<slug>`. Non scrivere tecnica o misure dentro `note`.
- **Immagini**: URL FileHarbor → `img(url, w)` / `srcset(url, widths)`. Nuova immagine: metterla in `public/`, referenziarla da `app/data/`, poi `pnpm upload-images` (key in `.env`), poi cancellare il file locale.
- **Lingua**: solo italiano.
- **Contatti**: solo `mailto:`. Nessun form.

## Verifica

Il check è `pnpm build` (lo stesso della CI). Per la UI usare il preview `puma-arts` di `.claude/launch.json` (porta 3220).

## Versione precedente

Nuxt 3 + Vuetify su `main`. I testi e i dati delle opere (`stores/collectionsStore.ts`, `pages/about.vue`) si recuperano con `git show main:<path>`.
