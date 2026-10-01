import { artworks } from './app/data/artworks'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/robots', '@nuxtjs/sitemap'],
  css: ['@fontsource-variable/archivo/wdth.css', '~/assets/main.css'],
  site: { url: 'https://studioartepuma.it' },
  // Sitemaps are written at build time from the prerendered pages, not served by a runtime handler.
  sitemap: { zeroRuntime: true },
  i18n: {
    locales: [
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'it',
    // Italian stays on /, English lives under /en.
    strategy: 'prefix_except_default',
    baseUrl: 'https://studioartepuma.it',
    // First visit to / follows the browser; the choice sticks in a cookie. Unsupported or missing language (crawlers) stays Italian.
    detectBrowserLanguage: { useCookie: true, cookieKey: 'lang', redirectOn: 'root', fallbackLocale: 'it' },
  },
  // An artwork grows from the wall into its own page.
  experimental: { viewTransition: true },
  runtimeConfig: {
    public: { siteUrl: 'https://studioartepuma.it' },
  },
  // Content is static: pages are rendered at build time, starting from /en and /chi-sono and following links.
  // Sitemap (one per language + index) and robots.txt are generated from the prerendered pages.
  // / is the one page rendered per request: the server reads the browser language and redirects to /en
  // before any HTML is sent. Prerendered, the redirect would happen during hydration.
  routeRules: { '/': { prerender: false } },
  // Italian artwork pages are linked only from /, so they are listed here; /en links its own.
  nitro: { prerender: { crawlLinks: true, routes: ['/en', '/chi-sono', '/robots.txt', ...artworks.map(a => `/opere/${a.slug}`)] } },
  app: {
    head: {
      titleTemplate: '%s · Studio Arte Puma',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
})
