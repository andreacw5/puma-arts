<script setup lang="ts">
import { site as artist } from '~/data/site'

const site = useRuntimeConfig().public.siteUrl
const route = useRoute()
// hreflang alternates, og:locale and <html lang> for the current locale.
const i18nHead = useLocaleHead({ seo: true })

// Hide intro elements before first paint only when motion will reveal them.
useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: i18nHead.value.meta,
  script: [{
    innerHTML: 'if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")',
    tagPosition: 'head',
  }],
  link: [...(i18nHead.value.link ?? []), { rel: 'canonical', href: site + route.path }],
}))

// Share defaults: pages override title, description and image.
useSeoMeta({
  ogType: 'website',
  ogSiteName: 'Studio Arte Puma',
  ogUrl: () => site + route.path,
  ogImage: img(artist.cover, 1200),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <main id="main">
    <NuxtPage />
  </main>
</template>
