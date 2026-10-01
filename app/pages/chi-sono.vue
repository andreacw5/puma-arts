<script setup lang="ts">
import { path } from '~/data/artworks'
import { site } from '~/data/site'
import { MOTION_OK, pasteIn, useMotion } from '~/utils/motion'

const { t, tm, locale } = useI18n()
const localePath = useLocalePath()
const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: () => t('about.seo.title'),
  description: () => t('about.seo.description'),
  ogTitle: () => `${site.artist} · ${t('about.seo.title')}`,
  ogDescription: () => t('about.seo.description'),
  ogImage: () => `${siteUrl}/og/${locale.value}/chi-sono.jpg`,
  ogImageAlt: () => t('about.ogAlt', { portrait: t('about.portraitAlt', { artist: site.artist }), title: t('about.title') }),
})

// Who the artist is, for search engines: the name, the craft, where else he shows his work.
useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': site.artist,
      'jobTitle': t('about.job'),
      'image': img(site.portrait, 1200),
      'url': siteUrl + localePath('/chi-sono'),
      'email': `mailto:${site.email}`,
      'sameAs': [site.instagram.url],
    }),
  }],
}))

const root = ref<HTMLElement>()
useMotion(root, (mm, el) => {
  mm.add(MOTION_OK, () => { pasteIn(el.querySelector('.bill-art')!, el.querySelector('.bill-title')!) })
})
</script>

<template>
  <div ref="root">
    <section class="bill" aria-labelledby="title">
      <img
        class="bill-art intro-art"
        :src="img(site.portrait, 1200)"
        :srcset="srcset(site.portrait, [600, 900, 1200, 1600])"
        sizes="(min-width: 900px) 50vw, 100vw"
        :width="site.portraitPx[0]"
        :height="site.portraitPx[1]"
        :alt="t('about.portraitAlt', { artist: site.artist })"
        fetchpriority="high"
      >
      <div class="bill-band">
        <nav class="bill-nav" :aria-label="t('nav.label')">
          <NuxtLink :to="localePath('/')">{{ t('nav.works') }}</NuxtLink>
          <a href="#contatti">{{ t('nav.contact') }}</a>
        </nav>
        <h1 id="title" class="bill-title intro-heading">{{ t('about.title') }}</h1>
        <p class="bill-line">{{ t('about.line', { artist: site.artist }) }}</p>
      </div>
    </section>

    <section class="story" :aria-label="t('nav.about')">
      <p class="story-quote">{{ t('about.quote') }}</p>
      <div class="story-text">
        <p v-for="(_, i) in tm('about.story')" :key="i">{{ t(`about.story.${i}`) }}</p>
      </div>
    </section>

    <nav class="path" aria-labelledby="path-title">
      <h2 id="path-title" class="path-title">{{ t('about.path') }}</h2>
      <ol class="path-list">
        <li v-for="stage in path" :key="stage.id" class="path-item" :class="`ink-${stage.ink}`">
          <NuxtLink :to="localePath(`/#${stage.id}`)" class="path-link">
            <span class="path-name">{{ t(`stages.${stage.id}.title`) }}</span>
            <span class="path-line">{{ t(`stages.${stage.id}.line`) }}</span>
            <span class="path-count">{{ t('count', stage.works.length) }}</span>
          </NuxtLink>
        </li>
      </ol>
    </nav>

    <SiteClose />
  </div>
</template>

<style scoped>
/* ---------- The artist's own poster ---------- */
.bill {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  height: 100svh;
  /* Paper, not ink: the night photo is dark enough, the poster around it stays light. */
  background: var(--paper);
  color: var(--ink);
}
.bill-art { width: 100%; height: 100%; object-fit: cover; object-position: 30% 50%; }
.bill-band {
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  gap: 0.5rem;
  padding: 0.9rem var(--gutter) 1.25rem;
}
.bill-nav { display: flex; justify-content: flex-end; gap: 1.25rem; font-weight: 700; font-size: 0.95rem; }
.bill-nav a { text-decoration: none; }
.bill-nav a:hover { text-decoration: underline; }
.bill-title {
  margin: 0;
  align-self: end;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.84;
  letter-spacing: -0.02em;
  font-size: clamp(3rem, min(17vw, 12svh), 10rem);
  text-wrap: balance;
}
.bill-line { margin: 0.4rem 0 0; font-weight: 600; font-size: 1.05rem; }

@media (min-width: 900px), (orientation: landscape) and (max-height: 520px) {
  .bill { grid-template-rows: minmax(0, 1fr); grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .bill-band { padding: 2rem var(--gutter) 2.5rem; }
  .bill-nav { justify-content: flex-start; }
  .bill-title { font-size: clamp(3rem, min(7.5vw, 20svh), 10rem); }
}

/* ---------- Story ---------- */
.story {
  padding: var(--section) var(--gutter);
  display: grid;
  gap: 2.5rem;
  max-width: var(--max);
  margin: 0 auto;
}
.story-quote {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(2.5rem, 7vw, 6rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  max-width: 14ch;
  text-wrap: balance;
}
.story-text { max-width: 62ch; display: grid; gap: 1.1rem; font-size: clamp(1.05rem, 1.3vw, 1.2rem); }
.story-text p { margin: 0; }
.story-text p:first-child { font-size: 1.15em; font-weight: 600; }

@media (min-width: 900px) {
  .story { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); align-items: start; gap: 4rem; }
  .story-quote { position: sticky; top: 3rem; }
}

/* ---------- The path: paper strips, each floods with its own ink when you reach for it ---------- */
.path { padding-top: 1rem; }
.path-title {
  margin: 0 var(--gutter) 1.5rem;
  font-weight: 800;
  font-size: 1.2rem;
}
.path-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--ink); }
.path-item { border-bottom: 2px solid var(--ink); }
.path-link {
  display: grid;
  gap: 0.35rem;
  padding: 1.5rem var(--gutter) 1.75rem;
  text-decoration: none;
  transition: background-color 0.45s var(--ease-out), color 0.45s var(--ease-out);
}
.path-link:hover,
.path-link:focus-visible {
  background: var(--stage-ink);
  color: var(--on-stage);
}
.path-name {
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(2.75rem, 11vw, 6.5rem);
  line-height: 0.85;
  letter-spacing: -0.02em;
}
.path-line { font-weight: 500; max-width: 40ch; }
.path-count { font-weight: 700; font-size: 0.95rem; }

@media (min-width: 900px) {
  .path-link { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto; align-items: end; column-gap: 2rem; }
}
</style>
