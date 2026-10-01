<script setup lang="ts">
import { artworks, artworkAlt, artworkTitle, artworkCaption, path } from '~/data/artworks'
import { site } from '~/data/site'
import { gsap, MOTION_OK, pasteIn, useMotion } from '~/utils/motion'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const cover = artworks.find(a => a.slug === 'papaveri')!

useSeoMeta({
  title: () => t('home.seo.title'),
  description: () => t('home.seo.description'),
  ogTitle: () => `${t('home.seo.title')} · Studio Arte Puma`,
  ogDescription: () => t('home.seo.description'),
  ogImageAlt: () => t('home.coverAlt', { title: artworkTitle(cover, locale.value), artist: site.artist }),
})

const total = artworks.length
const pad = (i: number) => String(i).padStart(2, '0')

// Without the walk (reduced motion) the wall is a plain scroller; overlay scrollbars give mouse users
// nothing to grab, so the poster carries two buttons that move it by most of a screen.
function slide(e: MouseEvent, dir: 1 | -1) {
  const wall = (e.currentTarget as HTMLElement).closest('.stage-in')!.querySelector<HTMLElement>('.wall')!
  wall.scrollBy({ left: dir * wall.clientWidth * 0.8 })
}
// Each button switches off at its end of the wall.
function syncNav(wall: HTMLElement) {
  const [back, fwd] = wall.closest('.stage-in')!.querySelectorAll<HTMLButtonElement>('.wall-nav button')
  if (!back || !fwd) return
  back.disabled = wall.scrollLeft <= 1
  fwd.disabled = wall.scrollLeft >= wall.scrollWidth - wall.clientWidth - 1
}
onMounted(() => {
  const walls = [...document.querySelectorAll<HTMLElement>('.wall')]
  const onScroll = (e: Event) => syncNav(e.currentTarget as HTMLElement)
  for (const w of walls) {
    syncNav(w)
    w.addEventListener('scroll', onScroll, { passive: true })
  }
  onBeforeUnmount(() => walls.forEach(w => w.removeEventListener('scroll', onScroll)))
})

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  mm.add(MOTION_OK, () => {
    pasteIn(el.querySelector('.bill-art')!, el.querySelector('.bill-name')!)

    // Each stage is a wall: vertical scroll walks along it, then the next poster is pasted over it.
    const walk = el.querySelector<HTMLElement>('#percorso')!
    walk.classList.add('is-walk')
    for (const stage of walk.querySelectorAll<HTMLElement>('.stage')) {
      const wall = stage.querySelector<HTMLElement>('.wall')!
      const track = wall.querySelector<HTMLElement>('.sheets')!
      const dist = () => Math.max(0, track.scrollWidth - wall.clientWidth)
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${dist()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: () => stage.style.setProperty('--walk', `${dist()}px`),
        },
      })
    }
    return () => walk.classList.remove('is-walk')
  })
})
</script>

<template>
  <div ref="root">
    <section class="bill" aria-labelledby="name">
      <img
        class="bill-art intro-art"
        :src="img(cover.image, 1200)"
        :srcset="srcset(cover.image, [600, 900, 1200, 1800])"
        sizes="(min-width: 900px) 62vw, 100vw"
        :width="cover.px[0]"
        :height="cover.px[1]"
        :alt="t('home.coverAlt', { title: artworkTitle(cover, locale), artist: site.artist })"
        fetchpriority="high"
      >
      <div class="bill-band">
        <nav class="bill-nav" :aria-label="t('nav.label')">
          <a href="#percorso">{{ t('nav.works') }}</a>
          <NuxtLink :to="localePath('/chi-sono')">{{ t('nav.about') }}</NuxtLink>
          <a href="#contatti">{{ t('nav.contact') }}</a>
        </nav>
        <h1 id="name" class="bill-name intro-heading">
          <span>Emanuele</span>
          <span>Puma</span>
        </h1>
        <p class="bill-line">{{ t('home.line', { n: total }) }}</p>
        <p class="bill-credit">{{ t('home.credit', { title: artworkTitle(cover, locale) }) }}</p>
      </div>
    </section>

    <div id="percorso">
      <section
        v-for="stage in path"
        :id="stage.id"
        :key="stage.id"
        class="stage"
        :class="`ink-${stage.ink}`"
        :aria-labelledby="`stage-${stage.id}`"
      >
        <div class="stage-in torn">
          <header class="stage-head">
            <h2 :id="`stage-${stage.id}`" class="stage-title">{{ t(`stages.${stage.id}.title`) }}</h2>
            <p class="stage-line">{{ t(`stages.${stage.id}.line`) }}</p>
            <p class="stage-count">{{ t('count', stage.works.length) }}</p>
            <p v-if="stage.works.length > 1" class="wall-nav">
              <button type="button" disabled @click="slide($event, -1)">{{ t('home.back') }}</button>
              <button type="button" @click="slide($event, 1)">{{ t('home.forward') }}</button>
            </p>
          </header>

          <div class="wall">
            <ol class="sheets">
              <li v-for="w in stage.works" :key="w.slug" class="sheet">
                <NuxtLink :to="localePath(`/opere/${w.slug}`)" class="sheet-link">
                  <img
                    :src="img(w.image, 800)"
                    :srcset="srcset(w.image, [400, 800, 1200])"
                    sizes="(min-width: 900px) 40vw, 80vw"
                    :width="w.px[0]"
                    :height="w.px[1]"
                    :alt="artworkAlt(w, locale)"
                    :style="{ viewTransitionName: `art-${w.slug}` }"
                    loading="lazy"
                  >
                  <span class="sheet-meta">
                    <span class="sheet-n">{{ pad(w.n) }}/{{ total }}</span>
                    <span class="sheet-title">{{ artworkTitle(w, locale) }}</span>
                    <span v-if="artworkCaption(w, locale)" class="sheet-cap">{{ artworkCaption(w, locale) }}</span>
                    <span v-if="w.copyOf" class="sheet-copy">{{ t('home.after', { author: w.copyOf }) }}</span>
                  </span>
                </NuxtLink>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>

    <SiteClose />
  </div>
</template>

<style scoped>
/* ---------- First viewport: the bill ---------- */
.bill {
  display: grid;
  /* The band takes what it needs; the cover fills the rest of exactly one screen. */
  grid-template-rows: minmax(0, 1fr) auto;
  height: 100svh;
  background: var(--red);
  color: var(--on-red);
  /* Stays put underneath: the first stage is pasted over it. */
  position: sticky;
  top: 0;
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
  align-self: end;
  display: grid;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.82;
  letter-spacing: -0.02em;
  /* EMANUELE fills the band width at the condensed cut. */
  font-size: clamp(3.5rem, 21vw, 9rem);
}

.bill-line { margin: 0.4rem 0 0; font-weight: 600; font-size: 1.05rem; }
.bill-credit { margin: 0; font-size: 0.8rem; opacity: 0.85; }

/* Same breakpoint as the walls: a phone on its side gets the cover beside the band. */
@media (min-width: 900px), (orientation: landscape) and (max-height: 520px) {
  .bill {
    /* A fixed row: an auto row grows to the photo's natural height and pushes the name off screen. */
    grid-template-rows: minmax(0, 1fr);
    grid-template-columns: minmax(0, 62fr) minmax(0, 38fr);
    height: 100svh;
  }
  .bill-band { padding: 2rem var(--gutter) 2.5rem; }
  .bill-nav { justify-content: flex-start; }
  .bill-name { font-size: clamp(3.5rem, min(8.4vw, 26svh), 11rem); }
}

/* ---------- Stages: one wall each ---------- */
.stage {
  position: relative;
}

.stage-in {
  --torn-ink: var(--stage-ink);
  position: relative;
  /* Exactly one screen: the wall is sticky, anything taller hides under the fold. */
  height: 100svh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background: var(--paper);
}

.stage-head {
  container-type: inline-size;
  background: var(--stage-ink);
  color: var(--on-stage);
  padding: 1.25rem var(--gutter) 1.1rem;
  display: grid;
  gap: 0.35rem;
}
.stage-title {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  /* Sized on its own column: ASTRATTO, the longest, must fit. */
  font-size: clamp(2.25rem, min(21cqi, 11svh), 11rem);
  line-height: 0.82;
  letter-spacing: -0.02em;
}
.stage-line { margin: 0; max-width: 32ch; font-size: clamp(1rem, 1.6vw, 1.25rem); font-weight: 500; }
.stage-count { margin: 0; font-weight: 700; font-size: 0.9rem; }
.wall-nav { margin: 0.4rem 0 0; display: flex; gap: 0.5rem; }
.wall-nav button {
  font: inherit;
  font-weight: 700;
  font-size: 0.9rem;
  color: inherit;
  background: none;
  border: 2px solid currentColor;
  padding: 0.35rem 0.8rem;
  cursor: pointer;
}
.wall-nav button:hover:not(:disabled) { background: var(--on-stage); color: var(--stage-ink); }
.wall-nav button:disabled { opacity: 0.4; cursor: default; }
/* Walking moves the wall already. */
.is-walk .wall-nav { display: none; }

/* Without the walk the wall is a plain horizontal scroller. */
.wall {
  /* A grid item grows to its content by default; the wall must stay viewport-wide. */
  min-width: 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  /* Fallback (no walk): keep the bar, mouse users need something to drag. */
  scrollbar-width: thin;
  /* Clear of the next poster's torn edge, which overlaps the last ~36px of this wall. */
  margin-bottom: 40px;
}
.sheets {
  list-style: none;
  margin: 0;
  height: 100%;
  padding: clamp(1.25rem, 3vw, 2.5rem) var(--gutter);
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 4rem);
  width: max-content;
}
.sheet {
  height: 100%;
  scroll-snap-align: center;
}
.sheet-link {
  height: 100%;
  /* Painting and caption sit together at eye level, centred on the wall. */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
  text-decoration: none;
}
/* Never crop an artwork, and the box is the artwork: pasted flat on the wall, no frame, no shadow. */
.sheet img {
  align-self: flex-start;
  width: auto;
  height: auto;
  /* Leave room for the caption under it. */
  max-height: calc(100% - 5.3rem);
  max-width: 82vw;
}
.sheet-link:hover .sheet-title,
.sheet-link:focus-visible .sheet-title { text-decoration: underline; text-decoration-thickness: 2px; }
.sheet-meta {
  display: grid;
  gap: 0.05rem;
  font-size: 0.9rem;
  color: var(--ink-2);
  min-height: 4.6rem;
}
.sheet-n { font-weight: 700; color: var(--ink); }
.sheet-title { font-weight: 800; font-size: 1.15rem; color: var(--ink); letter-spacing: -0.01em; }
.sheet-copy { font-style: italic; }

/* Wide or short-and-landscape (a phone on its side): poster beside the wall, not above it. */
@media (min-width: 900px), (orientation: landscape) and (max-height: 520px) {
  .stage-in { grid-template-rows: minmax(0, 1fr); grid-template-columns: minmax(0, 30fr) minmax(0, 70fr); }
  .stage-head { align-content: end; padding: 2rem var(--gutter) 2.5rem; }
  .stage-title { font-size: clamp(2.25rem, min(21cqi, 17svh), 9rem); }
  .sheets { padding-block: clamp(1.5rem, 7svh, 4rem) clamp(1rem, 4svh, 2.5rem); align-items: stretch; }
}

/* ---------- The walk (motion only) ---------- */
/* Each stage holds still for its wall, then for one more screen while the next one slides over it.
   The last one has nothing pasted over it: the close simply follows. */
.is-walk .stage { height: calc(200svh + var(--walk, 0px)); }
.is-walk .stage:last-child { height: calc(100svh + var(--walk, 0px)); }
.is-walk .stage + .stage { margin-top: -100svh; }
.is-walk .stage-in { position: sticky; top: 0; }
.is-walk .wall { overflow: clip; }

</style>
