<script setup lang="ts">
import { artworkAlt, artworkTitle, artworkCaption, pathOrder } from '~/data/artworks'
import { site } from '~/data/site'

const route = useRoute()
const i = pathOrder.findIndex(w => w.slug === route.params.slug)
if (i < 0) throw createError({ statusCode: 404, statusMessage: 'Opera non trovata', fatal: true })

const w = pathOrder[i]!
const prev = pathOrder[i - 1]
const next = pathOrder[i + 1]
const total = pathOrder.length
const pad = (n: number) => String(n).padStart(2, '0')
const title = artworkTitle(w)
const caption = artworkCaption(w)

useSeoMeta({
  title,
  description: [w.subject && w.subject[0]!.toUpperCase() + w.subject.slice(1), caption, w.copyOf && `Copia da ${w.copyOf}`, `Opera di ${site.artist}`].filter(Boolean).join('. '),
  ogImage: img(w.image, 1200),
})

// The size drawn to scale next to an A4 sheet, so "33 × 48 cm" reads as an object.
const A4: [number, number] = [21, 29.7]
const scale = w.size && (() => {
  const [aw, ah] = w.size!
  const gap = 4
  return { aw, ah, vw: A4[0] + gap + aw, vh: Math.max(A4[1], ah), gap }
})()

// Arrow keys walk the path like the wall does.
onMounted(() => {
  const go = (e: KeyboardEvent) => {
    const to = e.key === 'ArrowLeft' ? prev : e.key === 'ArrowRight' ? next : undefined
    if (to) navigateTo(`/opere/${to.slug}`)
  }
  window.addEventListener('keydown', go)
  onBeforeUnmount(() => window.removeEventListener('keydown', go))
})
</script>

<template>
  <article class="work" :class="`ink-${w.stage.ink}`">
    <figure class="work-art">
      <img
        :src="img(w.image, 1600)"
        :srcset="srcset(w.image, [800, 1200, 1600, 2000])"
        sizes="(min-width: 900px) 66vw, 100vw"
        :width="w.px[0]"
        :height="w.px[1]"
        :alt="artworkAlt(w)"
        :style="{ viewTransitionName: `art-${w.slug}` }"
      >
    </figure>

    <div class="work-band torn" style="--torn-x: 120px">
      <NuxtLink class="work-back" :to="`/#${w.stage.id}`">← {{ w.stage.title }}</NuxtLink>

      <div class="work-id">
        <p class="work-n">{{ pad(w.n) }}/{{ total }}</p>
        <h1 class="work-title">{{ title }}</h1>
        <p v-if="caption" class="work-cap">{{ caption }}</p>
        <p v-if="w.copyOf" class="work-copy">Copia da {{ w.copyOf }}</p>
        <p v-if="w.note" class="work-note">{{ w.note }}</p>
      </div>

      <figure v-if="scale" class="work-scale">
        <svg
          :viewBox="`0 0 ${scale.vw} ${scale.vh}`"
          role="img"
          :aria-label="`Dimensioni in scala: ${scale.aw} per ${scale.ah} centimetri, accanto a un foglio A4`"
        >
          <rect class="a4" :x="0.15" :y="scale.vh - A4[1] + 0.15" :width="A4[0] - 0.3" :height="A4[1] - 0.3" />
          <rect class="art" :x="A4[0] + scale.gap" :y="scale.vh - scale.ah" :width="scale.aw" :height="scale.ah" />
        </svg>
        <figcaption><span>A4</span><span>{{ scale.aw }} × {{ scale.ah }} cm</span></figcaption>
      </figure>

      <nav class="work-nav" aria-label="Opere">
        <NuxtLink v-if="prev" :to="`/opere/${prev.slug}`" rel="prev">
          <span>Precedente</span> {{ artworkTitle(prev) }}
        </NuxtLink>
        <NuxtLink v-if="next" :to="`/opere/${next.slug}`" rel="next" class="is-next">
          <span>Successiva</span> {{ artworkTitle(next) }}
        </NuxtLink>
      </nav>
    </div>
  </article>
</template>

<style scoped>
.work {
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto auto;
}

.work-art {
  margin: 0;
  padding: clamp(1rem, 4vw, 3rem) var(--gutter);
  display: grid;
  place-items: center;
  min-height: 62svh;
}
.work-art img {
  max-height: 76svh;
  width: auto;
  max-width: 100%;
  box-shadow: 0 2px 4px rgb(20 20 20 / 0.12), 0 24px 48px -24px rgb(20 20 20 / 0.45);
}

.work-band {
  --torn-ink: var(--stage-ink);
  position: relative;
  background: var(--stage-ink);
  color: var(--on-stage);
  padding: 1.5rem var(--gutter) 2rem;
  display: grid;
  gap: 1.75rem;
  align-content: start;
}
.work-back { font-weight: 700; text-decoration: none; justify-self: start; }
.work-back:hover { text-decoration: underline; }

.work-id { display: grid; gap: 0.3rem; }
.work-id p { margin: 0; }
.work-n { font-weight: 700; }
.work-title {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(2.75rem, 12vw, 6rem);
  line-height: 0.86;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.work-cap { font-weight: 600; font-size: 1.05rem; margin-top: 0.4rem !important; }
.work-copy { font-style: italic; }
.work-note { max-width: 40ch; }

.work-scale { margin: 0; max-width: 15rem; display: grid; gap: 0.4rem; }
.work-scale svg { width: 100%; height: auto; max-height: 9rem; overflow: visible; }
.work-scale .a4 { fill: none; stroke: currentColor; stroke-width: 0.3; stroke-dasharray: 1 0.8; opacity: 0.8; }
.work-scale .art { fill: currentColor; }
.work-scale figcaption { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; }

.work-nav { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.work-nav a { display: grid; text-decoration: none; font-weight: 700; }
.work-nav a span { font-size: 0.8rem; font-weight: 500; opacity: 0.8; }
.work-nav a:hover { text-decoration: underline; }
.work-nav .is-next { grid-column: 2; text-align: right; }

@media (min-width: 900px) {
  .work {
    grid-template-rows: none;
    grid-template-columns: minmax(0, 66fr) minmax(0, 34fr);
    height: 100svh;
  }
  .work-art img { max-height: calc(100svh - 6rem); }
  .work-band { padding: 2.5rem var(--gutter); align-content: space-between; }
  .work-band.torn::before { display: none; }
}
</style>
