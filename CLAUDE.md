# puma-arts

Sito di Studio Arte Puma (studioartepuma.it). **Nuxt 4 + Vue 3 + CSS puro + GSAP**, prerender + Nitro Node, pnpm. Stessa impostazione tecnica di `../heyatom-portfolio`: in caso di dubbio, fare come lì.

Niente Vuetify, niente Pinia, niente DB. I contenuti sono file TS in `app/data/`.

## Struttura

```
app/
  app.vue            # head globale: canonical, og default, classe `js` per il motion
  assets/main.css    # token e stili condivisi (inchiostri, .torn, intro); fonte dei valori in DESIGN.md
  data/artworks.ts   # opere: fonte unica, ordine = più recenti prima
  data/site.ts       # nome, contatti, ritratto, immagine di share
  pages/index.vue    # manifesto iniziale + percorso a pareti (scroll orizzontale guidato da GSAP). Ordine e inchiostri delle tappe: `stages` in data/artworks.ts
  pages/opere/[slug].vue  # opera singola: view transition dalla parete, righello in scala con A4
  pages/chi-sono.vue # ritratto + testo dell'artista + il percorso come strisce che si colorano al passaggio
  components/SiteClose.vue  # chiusura "Scrivimi." condivisa da tutte le pagine
  plugins/motion.client.ts  # ScrollTrigger.refresh dopo ogni pagina
  utils/img.ts       # img/srcset per FileHarbor (?width=N)
  utils/motion.ts    # useMotion, revealLines, magnetic (copiato dal portfolio)
scripts/upload-images.mjs  # carica su FileHarbor i path locali in app/data/*.ts e li sostituisce
```

## Regole

- **Stile**: CSS scoped nei componenti + token da `main.css`. Mai colori hardcoded. Inchiostri delle tappe (`.ink-*`) e bordo strappato (`.torn`, `--torn-ink`) sono globali in `main.css`: non ridefinire `--stage-ink` in CSS scoped, vince sulla classe globale.
- **Un inchiostro per schermo**: mai due tinte piene visibili insieme; dove una lista mostra più tappe, la tinta arriva solo su hover/focus.
- **Motion**: sempre via `useMotion(root, (mm, el) => …)`, animazioni dentro `mm.add(MOTION_OK, …)`. Senza motion le pareti sono normali scroller orizzontali.
- **Apertura delle pagine**: `pasteIn(img, heading)` di `utils/motion.ts` + classi `intro-art` / `intro-heading` (nascoste prima del paint in `main.css`). Ogni pagina con un manifesto in apertura la usa, così le aperture non divergono.
- **CSS scoped + `.js`**: scrivere `:global(.js .x)`, mai `:global(.js) .x`: Vue compila il secondo in `.js` e applica le regole a `<html>`.
- **Direzione visiva**: "Manifesto d'affissione", contratto in `.impeccable/surfaces/app-pages-index-vue.md`. `PRODUCT.md` per il prodotto, `DESIGN.md` (+ `.impeccable/design.json`) per token e regole visive: leggerlo prima di toccare la UI.
- **SEO**: ogni pagina chiama `useSeoMeta` con titolo e descrizione. URL assoluti da `useRuntimeConfig().public.siteUrl`.
- **Prerender**: tutto tranne `/`, che il server Node rende a ogni richiesta per il redirect di lingua. Nitro parte da `/en` e `/chi-sono` e segue i link; le opere italiane sono elencate da `artworks` in `nitro.prerender.routes`. Una pagina non linkata da nessuna parte va aggiunta lì.
- **Opere**: titolo assente = "Senza titolo", sempre via `artworkTitle()`. Un'opera senza titolo deve avere `subject` (cosa raffigura): è il suo alt. Alt sempre via `artworkAlt()`. `slug` stabile: è l'URL di `/opere/<slug>`. Non scrivere tecnica o misure dentro `note`.
- **Immagini**: URL FileHarbor → `img(url, w)` / `srcset(url, widths)`. Nuova immagine: metterla in `public/`, referenziarla da `app/data/`, poi `pnpm upload-images` (key in `.env`), poi cancellare il file locale.
- **Lingua**: italiano su `/`, inglese su `/en` (`@nuxtjs/i18n`, `prefix_except_default`, autodetect dal browser solo su `/`, cookie `lang`). Ogni stringa UI in **entrambi** `i18n/locales/{it,en}.json`; testi delle opere nel campo `en` di `app/data/artworks.ts` (via `artworkTitle/Alt/Caption/Text(a, locale)`). Link interni con `useLocalePath()`.
- **Sitemap e robots**: generati al build da `@nuxtjs/sitemap` (`zeroRuntime`) e `@nuxtjs/robots` dalle pagine prerenderizzate. Ingresso: `/sitemap_index.xml`.
- **Contatti**: solo `mailto:`. Nessun form.

## Verifica

Il check è `pnpm build` (lo stesso della CI). Per la UI usare il preview `puma-arts` di `.claude/launch.json` (porta 3220).

## Versione precedente

Nuxt 3 + Vuetify su `main`. I testi e i dati delle opere (`stores/collectionsStore.ts`, `pages/about.vue`) si recuperano con `git show main:<path>`.
