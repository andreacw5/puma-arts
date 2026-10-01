<script setup lang="ts">
import { artworks, artworkTitle, artworkCaption, path } from '~/data/artworks'
import { site } from '~/data/site'
import { gsap, MOTION_OK, useMotion } from '~/utils/motion'

useSeoMeta({
  title: 'Pittura, scultura, disegno',
  description: 'Dipinti, sculture e disegni di Emanuele Puma: dalle copie dei maestri all\'astratto.',
})

const cover = artworks.find(a => a.slug === 'papaveri')!
const total = artworks.length
const pad = (i: number) => String(i).padStart(2, '0')

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  mm.add(MOTION_OK, () => {
    // The cover is pasted on from the top, then the name rises out of the band.
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to(el.querySelector('.bill-art'), { clipPath: 'inset(0% 0 0% 0)', duration: 1.4 })
      // GSAP reads the CSS translateY(110%) as y in px, so it is y that goes back to 0.
      .to(el.querySelectorAll('.bill-name .ln > span'), { y: 0, duration: 1.1, stagger: 0.08 }, '-=0.9')

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
  <div ref="root" class="home">
    <section class="bill" aria-labelledby="name">
      <img
        class="bill-art"
        :src="img(cover.image, 1200)"
        :srcset="srcset(cover.image, [600, 900, 1200, 1800])"
        sizes="(min-width: 900px) 62vw, 100vw"
        :width="cover.px[0]"
        :height="cover.px[1]"
        :alt="`${artworkTitle(cover)}, dipinto di ${site.artist}`"
        fetchpriority="high"
      >
      <div class="bill-band">
        <nav class="bill-nav" aria-label="Sezioni">
          <a href="#percorso">Opere</a>
          <NuxtLink to="/chi-sono">Chi sono</NuxtLink>
          <a href="#contatti">Contatti</a>
        </nav>
        <h1 id="name" class="bill-name">
          <span class="ln"><span>Emanuele</span></span>
          <span class="ln"><span>Puma</span></span>
        </h1>
        <p class="bill-line">Pittura, scultura, disegno · {{ total }} opere</p>
        <p class="bill-credit">In copertina: {{ artworkTitle(cover) }}</p>
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
            <h2 :id="`stage-${stage.id}`" class="stage-title">{{ stage.title }}</h2>
            <p class="stage-line">{{ stage.line }}</p>
            <p class="stage-count">{{ stage.works.length }} {{ stage.works.length === 1 ? 'opera' : 'opere' }}</p>
          </header>

          <div class="wall">
            <ol class="sheets">
              <li v-for="w in stage.works" :key="w.slug" class="sheet">
                <NuxtLink :to="`/opere/${w.slug}`" class="sheet-link">
                  <img
                    :src="img(w.image, 800)"
                    :srcset="srcset(w.image, [400, 800, 1200])"
                    sizes="(min-width: 900px) 40vw, 80vw"
                    :width="w.px[0]"
                    :height="w.px[1]"
                    :alt="`${artworkTitle(w)}${w.medium ? `, ${w.medium.toLowerCase()}` : ''}`"
                    :style="{ viewTransitionName: `art-${w.slug}` }"
                    loading="lazy"
                  >
                  <span class="sheet-meta">
                    <span class="sheet-n">{{ pad(w.n) }}/{{ total }}</span>
                    <span class="sheet-title">{{ artworkTitle(w) }}</span>
                    <span v-if="artworkCaption(w)" class="sheet-cap">{{ artworkCaption(w) }}</span>
                    <span v-if="w.copyOf" class="sheet-copy">da {{ w.copyOf }}</span>
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
.ln { display: block; overflow: clip; padding-top: 0.04em; }
.ln > span { display: block; }
/* Hidden before first paint only when motion will reveal them. The whole selector is global:
   in scoped CSS `:global(.js) .x` compiles to plain `.js`. Global, so scoped to .home by hand. */
:global(.js .home .bill-art) { clip-path: inset(0 0 100% 0); }
:global(.js .home .bill-name .ln > span) { transform: translateY(110%); }

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

/* Without the walk the wall is a plain horizontal scroller. */
.wall {
  /* A grid item grows to its content by default; the wall must stay viewport-wide. */
  min-width: 0;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
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
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  align-content: center;
  gap: 0.7rem;
  text-decoration: none;
}
/* Never crop an artwork: height is set by the wall, width by the photo. */
.sheet img {
  height: 100%;
  width: auto;
  max-width: 82vw;
  object-fit: contain;
  object-position: left bottom;
  box-shadow: 0 1px 2px rgb(20 20 20 / 0.12), 0 12px 28px -14px rgb(20 20 20 / 0.35);
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
}
.sheet-link:hover img,
.sheet-link:focus-visible img {
  transform: translateY(-6px);
  box-shadow: 0 2px 4px rgb(20 20 20 / 0.12), 0 22px 40px -18px rgb(20 20 20 / 0.45);
}
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
  .sheets { padding-block: clamp(1.5rem, 7svh, 4rem) clamp(1rem, 4svh, 2.5rem); }
}

/* ---------- The walk (motion only) ---------- */
/* Each stage holds still for its wall, then for one more screen while the next one slides over it. */
.is-walk .stage { height: calc(200svh + var(--walk, 0px)); }
.is-walk .stage + .stage { margin-top: -100svh; }
.is-walk { margin-bottom: -100svh; }
.is-walk .stage-in { position: sticky; top: 0; }
.is-walk .wall { overflow: clip; }

</style>
