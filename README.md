# Studio Arte Puma

Sito di Emanuele Puma, pittore e scultore: [studioartepuma.it](https://studioartepuma.it).

Nuxt 4, CSS puro, GSAP. Nessun backend: le pagine sono prerenderizzate in build e servite dal server Nitro.

## Sviluppo

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # stesso check della CI
node .output/server/index.mjs
```

Richiede Node 24 e pnpm 10.

## Deploy

Un tag git fa partire `.github/workflows/build-image.yml`: build dell'immagine Docker e push su `registry.gitlab.com/heyatomdev/puma-arts:<tag>`.

## Licenza

MIT, vedi [LICENSE](LICENSE).
