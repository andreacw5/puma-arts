# Immagini di condivisione (Open Graph)

Un solo modello, `poster.html` (1200×630): l'opera a sinistra, la fascia d'inchiostro a destra, come il manifesto in apertura della home. `render.sh` lo riempie con i testi di `i18n/locales/` e `app/data/` e scrive una JPG per pagina e lingua.

| Output | Pagina |
|---|---|
| `public/og/<locale>/home.jpg` | `/`, `/en` (default in `app/app.vue`) |
| `public/og/<locale>/chi-sono.jpg` | `/chi-sono`, `/en/chi-sono` |
| `public/og/<locale>/opere/<slug>.jpg` | `/opere/<slug>`, `/en/opere/<slug>`: inchiostro della tappa |

## Rigenerare

```bash
og/render.sh                 # tutte
og/render.sh papaveri volti  # solo queste opere
```

Serve `chrome-headless-shell` (dalla cache di puppeteer, oppure `CHROME=/path/al/binario`), ImageMagick (`magick`) e Node ≥ 22.18 per leggere i `.ts`. Il font è Archivo da `node_modules`, le foto da FileHarbor: serve la rete.

Rigenerare quando si aggiunge o modifica un'opera (anche il numero `07/26` cambia per tutte), o cambiano i testi di home e chi sono.

Per un'anteprima: apri `poster.html?title=Prova&ink=blue&img=…` nel browser a 1200×630. Dopo un cambio, i social tengono la versione in cache: forzare il refresh dal Sharing Debugger di Facebook / Post Inspector di LinkedIn.
