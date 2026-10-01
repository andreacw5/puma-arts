<script setup lang="ts">
import { artworks, artworkTitle, artworkCaption, stages } from '~/data/artworks'
import { site } from '~/data/site'

useSeoMeta({
  title: 'Pittura, scultura, disegno',
  description: 'Dipinti, sculture e disegni di Emanuele Puma: dalle copie dei maestri all\'astratto.',
})

const cover = artworks.find(a => a.slug === 'papaveri')!
const total = artworks.length
// Running number across the whole path, so each sheet reads 07/26.
const numbered = stages.map(s => ({ ...s, works: artworks.filter(s.match) }))
let n = 0
const path = numbered.map(s => ({ ...s, works: s.works.map(w => ({ ...w, n: ++n })) }))
const pad = (i: number) => String(i).padStart(2, '0')
</script>

<template>
  <div>
    <section class="bill" aria-labelledby="name">
      <img
        class="bill-art"
        :src="img(cover.image, 1200)"
        :srcset="srcset(cover.image, [600, 900, 1200, 1800])"
        sizes="(min-width: 900px) 62vw, 100vw"
        :alt="`${artworkTitle(cover)}, dipinto di ${site.artist}`"
        :width="cover.px[0]"
        :height="cover.px[1]"
        fetchpriority="high"
      >
      <div class="bill-band">
        <nav class="bill-nav" aria-label="Sezioni">
          <a href="#percorso">Opere</a>
          <a href="#contatti">Contatti</a>
        </nav>
        <h1 id="name" class="bill-name">
          <span>Emanuele</span>
          <span>Puma</span>
        </h1>
        <p class="bill-line">Pittura, scultura, disegno · {{ total }} opere</p>
        <p class="bill-credit">In copertina: {{ artworkTitle(cover) }}</p>
      </div>
    </section>

    <div id="percorso">
      <section
        v-for="stage in path"
        :key="stage.id"
        class="stage"
        :class="`ink-${stage.ink}`"
        :aria-labelledby="`stage-${stage.id}`"
      >
        <header class="stage-head">
          <h2 :id="`stage-${stage.id}`" class="stage-title">{{ stage.title }}</h2>
          <p class="stage-line">{{ stage.line }}</p>
          <p class="stage-count">{{ stage.works.length }} {{ stage.works.length === 1 ? 'opera' : 'opere' }}</p>
        </header>

        <ol class="sheets">
          <li v-for="w in stage.works" :key="w.slug" class="sheet">
            <img
              :src="img(w.image, 800)"
              :srcset="srcset(w.image, [400, 800, 1200])"
              sizes="(min-width: 900px) 30vw, (min-width: 560px) 50vw, 100vw"
              :alt="`${artworkTitle(w)}${w.medium ? `, ${w.medium.toLowerCase()}` : ''}`"
              :width="w.px[0]"
              :height="w.px[1]"
              loading="lazy"
            >
            <p class="sheet-meta">
              <span class="sheet-n">{{ pad(w.n) }}/{{ total }}</span>
              <span class="sheet-title">{{ artworkTitle(w) }}</span>
              <span v-if="artworkCaption(w)" class="sheet-cap">{{ artworkCaption(w) }}</span>
              <span v-if="w.copyOf" class="sheet-copy">da {{ w.copyOf }}</span>
            </p>
          </li>
        </ol>
      </section>
    </div>

    <footer id="contatti" class="close">
      <p class="close-say">Scrivimi.</p>
      <a class="close-mail" :href="`mailto:${site.email}`">{{ site.email }}</a>
      <a class="close-ig" :href="site.instagram.url">Instagram {{ site.instagram.handle }}</a>
      <p class="close-credit">Sito di <a href="https://heyatom.dev">Andrea Tombolato</a></p>
    </footer>
  </div>
</template>

<style scoped>
/* ---------- First viewport: the bill ---------- */
.bill {
  display: grid;
  grid-template-rows: minmax(0, 72svh) auto;
  min-height: 100svh;
  background: var(--red);
  color: var(--on-red);
}
.bill-art {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bill-band {
  display: grid;
  grid-template-rows: auto 1fr auto auto auto;
  gap: 0.5rem;
  padding: 0.9rem var(--gutter) 1.25rem;
}
.bill-nav {
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
  font-weight: 700;
  font-size: 0.95rem;
}
.bill-nav a { text-decoration: none; }
.bill-nav a:hover { text-decoration: underline; }
.bill-name {
  margin: 0;
  display: grid;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.82;
  letter-spacing: -0.02em;
  align-self: end;
  /* EMANUELE fills the band width at the condensed cut. */
  font-size: clamp(3.5rem, 21vw, 9rem);
}
.bill-line {
  margin: 0.4rem 0 0;
  font-weight: 600;
  font-size: 1.05rem;
}
.bill-credit {
  margin: 0;
  font-size: 0.8rem;
  opacity: 0.85;
}

@media (min-width: 900px) {
  .bill {
    grid-template-rows: none;
    grid-template-columns: minmax(0, 62fr) minmax(0, 38fr);
    height: 100svh;
    min-height: 600px;
  }
  .bill-band { padding: 2rem var(--gutter) 2.5rem; }
  .bill-nav { justify-content: flex-start; }
  .bill-name { font-size: clamp(5rem, 8.4vw, 11rem); }
}

/* ---------- Stages: one poster each ---------- */
.stage {
  --stage-ink: var(--ink);
  --on-stage: var(--on-black);
}
.ink-red { --stage-ink: var(--red); --on-stage: var(--on-red); }
.ink-blue { --stage-ink: var(--blue); --on-stage: var(--on-blue); }
.ink-yellow { --stage-ink: var(--yellow); --on-stage: var(--on-yellow); }

.stage-head {
  background: var(--stage-ink);
  color: var(--on-stage);
  padding: var(--section) var(--gutter) 1.5rem;
  display: grid;
  gap: 0.5rem;
}
.stage-title {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(4rem, 19vw, 13rem);
  line-height: 0.82;
  letter-spacing: -0.02em;
}
.stage-line {
  margin: 0;
  max-width: 34ch;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 500;
}
.stage-count { margin: 0; font-weight: 700; }

.sheets {
  list-style: none;
  margin: 0;
  padding: 2rem var(--gutter) var(--section);
  display: grid;
  gap: 2.5rem 1.5rem;
  grid-template-columns: 1fr;
  max-width: var(--max);
}
@media (min-width: 560px) { .sheets { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 900px) { .sheets { grid-template-columns: repeat(3, 1fr); } }

.sheets { align-items: end; }
/* Never crop an artwork: each sheet keeps the photo's own proportions. */
.sheet img {
  width: 100%;
  height: auto;
  background: var(--paper-2);
}
.sheet-meta {
  margin: 0.7rem 0 0;
  display: grid;
  gap: 0.1rem;
  font-size: 0.92rem;
  color: var(--ink-2);
}
.sheet-n { font-weight: 700; color: var(--ink); }
.sheet-title {
  font-weight: 800;
  font-size: 1.2rem;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.sheet-copy { font-style: italic; }

/* ---------- Close ---------- */
.close {
  background: var(--ink);
  color: var(--on-black);
  padding: var(--section) var(--gutter) 2rem;
  display: grid;
  gap: 0.75rem;
  justify-items: start;
}
.close-say {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(4rem, 19vw, 11rem);
  line-height: 0.85;
}
.close-mail { font-size: clamp(1.1rem, 3vw, 1.6rem); font-weight: 700; word-break: break-all; }
.close-ig { font-weight: 600; }
.close-credit { margin: 3rem 0 0; font-size: 0.85rem; opacity: 0.75; }
</style>
