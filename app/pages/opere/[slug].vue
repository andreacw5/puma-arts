<script setup lang="ts">
import { artworkAlt, artworkTitle, artworkCaption, artworkText, pathOrder } from '~/data/artworks'
import { site } from '~/data/site'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const siteUrl = useRuntimeConfig().public.siteUrl
const i = pathOrder.findIndex(w => w.slug === route.params.slug)
if (i < 0) throw createError({ statusCode: 404, statusMessage: t('work.notFound'), fatal: true })

const w = pathOrder[i]!
const prev = pathOrder[i - 1]
const next = pathOrder[i + 1]
const total = pathOrder.length
const pad = (n: number) => String(n).padStart(2, '0')
// Full reload on a language switch: the locale is fixed for the life of the page.
const lang = locale.value
const text = artworkText(w, lang)
const title = artworkTitle(w, lang)
const caption = artworkCaption(w, lang)
const stageTitle = t(`stages.${w.stage.id}.title`)
const cap = (s: string) => s[0]!.toUpperCase() + s.slice(1)

// Untitled works share a title: the search result gets their number on the path to tell them apart.
const seoTitle = t('work.seoTitle', {
  title: text.title ?? t('work.untitled', { n: pad(w.n) }),
  kind: t(`kind.${w.category}`).toLowerCase(),
  artist: site.artist,
})
// Whose it is, what it shows, what it is made of, whose copy, then the stage it hangs in:
// every work gets a description of its own, even with no medium or note.
const description = [
  seoTitle + '.',
  text.subject && cap(text.subject) + '.',
  caption && caption + '.',
  w.copyOf && t('work.copyOf', { author: w.copyOf }) + '.',
  text.note,
  t('work.from', { stage: stageTitle, line: t(`stages.${w.stage.id}.line`) }),
].filter(Boolean).join(' ')

useSeoMeta({
  title: seoTitle,
  description,
  ogTitle: seoTitle,
  ogDescription: description,
  ogImage: img(w.image, 1200),
  ogImageAlt: artworkAlt(w, lang),
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VisualArtwork',
      'name': title,
      'description': description,
      'image': img(w.image, 1600),
      'url': siteUrl + localePath(`/opere/${w.slug}`),
      'inLanguage': lang,
      'artform': t(`kind.${w.category}`),
      'artMedium': text.medium,
      'width': w.size && { '@type': 'Distance', 'name': `${w.size[0]} cm` },
      'height': w.size && { '@type': 'Distance', 'name': `${w.size[1]} cm` },
      'creator': { '@type': 'Person', 'name': site.artist, 'url': siteUrl + localePath('/chi-sono') },
    }),
  }],
})

// The size drawn to scale next to an A4 sheet, so "33 × 48 cm" reads as an object.
const A4: [number, number] = [21, 29.7]
const scale = w.size && (() => {
  // Draw the long side the way the photo runs: the caption order is not always width × height.
  const [s1, s2] = w.size!
  const landscape = w.px[0] > w.px[1]
  const [aw, ah] = landscape ? [Math.max(s1, s2), Math.min(s1, s2)] : [Math.min(s1, s2), Math.max(s1, s2)]
  const gap = 4
  return { aw, ah, vw: A4[0] + gap + aw, vh: Math.max(A4[1], ah), gap }
})()

// Arrow keys walk the path like the wall does.
onMounted(() => {
  const go = (e: KeyboardEvent) => {
    const to = e.key === 'ArrowLeft' ? prev : e.key === 'ArrowRight' ? next : undefined
    if (to) navigateTo(localePath(`/opere/${to.slug}`))
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
        :alt="artworkAlt(w, lang)"
        :style="{ viewTransitionName: `art-${w.slug}` }"
      >
    </figure>

    <div class="work-band torn" style="--torn-x: 120px">
      <NuxtLink class="work-back" :to="localePath(`/#${w.stage.id}`)">{{ t('work.back', { stage: stageTitle }) }}</NuxtLink>

      <div class="work-id">
        <h1 class="work-title">{{ title }}</h1>
        <p v-if="caption" class="work-cap">{{ caption }}</p>
        <p v-if="w.copyOf" class="work-copy">{{ t('work.copyOf', { author: w.copyOf }) }}</p>
        <p v-if="text.note" class="work-note">{{ text.note }}</p>
        <p class="work-n" :aria-label="t('work.n', { n: w.n, total })">{{ pad(w.n) }}/{{ total }}</p>
      </div>

      <figure v-if="scale" class="work-scale">
        <svg
          :viewBox="`0 0 ${scale.vw} ${scale.vh}`"
          role="img"
          :aria-label="t('work.scale', { w: scale.aw, h: scale.ah })"
        >
          <rect class="a4" :x="0.15" :y="scale.vh - A4[1] + 0.15" :width="A4[0] - 0.3" :height="A4[1] - 0.3" />
          <rect class="art" :x="A4[0] + scale.gap" :y="scale.vh - scale.ah" :width="scale.aw" :height="scale.ah" />
        </svg>
        <figcaption><span>A4</span><span>{{ w.size![0] }} × {{ w.size![1] }} cm</span></figcaption>
      </figure>

      <nav class="work-nav" :aria-label="t('work.nav')">
        <NuxtLink v-if="prev" :to="localePath(`/opere/${prev.slug}`)" rel="prev">
          <span>{{ t('work.prev') }}</span> {{ artworkTitle(prev, lang) }}
        </NuxtLink>
        <NuxtLink v-if="next" :to="localePath(`/opere/${next.slug}`)" rel="next" class="is-next">
          <span>{{ t('work.next') }}</span> {{ artworkTitle(next, lang) }}
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
.work-n {
  margin-top: 0.75rem !important;
  font-stretch: 62%;
  font-weight: 900;
  font-size: clamp(2rem, min(7vw, 11svh), 4rem);
  line-height: 1;
}
.work-title {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(2rem, min(12vw, 14svh), 6rem);
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

/* Same breakpoint as the walls: a phone on its side gets art beside the band. */
@media (min-width: 900px), (orientation: landscape) and (max-height: 520px) {
  .work {
    grid-template-rows: minmax(0, 1fr);
    grid-template-columns: minmax(0, 66fr) minmax(0, 34fr);
    height: 100svh;
  }
  .work-art img { max-height: calc(100svh - 6rem); }
  /* A short window may not fit the whole band: it scrolls on its own, the artwork stays put. */
  .work-band { padding: clamp(1rem, 5svh, 2.5rem) var(--gutter); align-content: space-between; overflow-y: auto; }
  .work-band.torn::before,
  .work-band.torn::after { display: none; }
}
</style>
