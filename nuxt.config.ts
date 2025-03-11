// PWA Config
const title = "Studio Arte Puma";
const shortTitle = "Studio Arte Puma";
const description = "Scopri le mie opere: dipinti, sculture e creazioni uniche. Ogni opera racconta una storia, esplora il mio mondo artistico e lasciati ispirare.";
const image = "https://file-harbor.com/api/v1/files/59eede5fb0b097a63e0eb276add71e83";
const url = "https://studioartepuma.it";
const themeColor = "#212122";

export default defineNuxtConfig({
  alias: {
    assets: '/<rootDir>/assets',
    composables: '/<rootDir>/composables'
  },

  app: {
    head: {
      titleTemplate: '%s - Studio Arte Puma',
      title: 'Studio Arte Puma',
      htmlAttrs: {
        lang: 'it'
      },
      meta: [
        {key: "description", name: "description", content: description,},
        {property: "og:site_name", content: title},
        {key: "og:type", property: "og:type", content: "website"},
        {key: "og:url", property: "og:url", content: url},
        {key: "og:image:secure_url", property: "og:image:secure_url", content: image},
        {key: "og:title", property: "og:title", content: title},
        {key: "og:description", property: "og:description", content: description},
        {key: "og:image", property: "og:image", content: image},
        //Twitter
        {name: "twitter:card", content: "summary_large_image"},
        {key: "twitter:url", name: "twitter:url", content: url},
        {key: "twitter:title", name: "twitter:title", content: title},
        {key: "twitter:description", name: "twitter:description", content: description},
        {key: "twitter:image", name: "twitter:image", content: image},
      ],
    }
  },

  css: ['vuetify/styles', '~/assets/css/main.css'],

  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],

  plugins: ['~/plugins/vuetify.ts'],

  runtimeConfig: {
    SERVICE_KEY: process.env.SERVICE_KEY,
    public: {
      FILE_HARBOR_URL: 'https://file-harbor.com',
    }
  },

  googleFonts: {
    display: 'swap',
    families: {
      "Work Sans": true
    }
  },

  build: { transpile: ["vuetify"] },

  typescript: {
    typeCheck: true
  },

  // Nuxt compatibility date
  compatibilityDate: '2024-12-03',
})
