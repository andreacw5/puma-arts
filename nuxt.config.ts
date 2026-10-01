export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/sitemap'],
  css: ['@fontsource-variable/archivo/wdth.css', '~/assets/main.css'],
  site: { url: 'https://studioartepuma.it' },
  // Artwork pages come from the data, not from crawled routes.
  sitemap: { sources: ['/api/__sitemap__/urls'] },
  // An artwork grows from the wall into its own page.
  experimental: { viewTransition: true },
  runtimeConfig: {
    public: { siteUrl: 'https://studioartepuma.it' },
  },
  // Content is static: pages are rendered at build time, starting from / and following links.
  nitro: { prerender: { crawlLinks: true, routes: ['/', '/sitemap.xml'] } },
  app: {
    head: {
      titleTemplate: '%s · Studio Arte Puma',
      htmlAttrs: { lang: 'it' },
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
})
