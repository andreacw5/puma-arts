<script setup lang="ts">
const site = useRuntimeConfig().public.siteUrl
const route = useRoute()
const { locale } = useI18n()
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
  // Share images: og/render.sh, one per page and language.
  ogImage: () => `${site}/og/${locale.value}/home.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <main id="main">
    <NuxtPage />
  </main>
</template>
