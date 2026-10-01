<script setup lang="ts">
const site = useRuntimeConfig().public.siteUrl
const route = useRoute()

// Hide intro elements before first paint only when motion will reveal them.
useHead({
  script: [{
    innerHTML: 'if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")',
    tagPosition: 'head',
  }],
  link: [{ rel: 'canonical', href: () => site + route.path }],
})

// Share defaults: pages override title/description. og:image arrives with the artworks on FileHarbor.
useSeoMeta({
  ogType: 'website',
  ogSiteName: 'Studio Arte Puma',
  ogLocale: 'it_IT',
  ogUrl: () => site + route.path,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <main id="main">
    <NuxtPage />
  </main>
</template>
