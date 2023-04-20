import it from './i18n/it'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Emanuele Puma',
    title: 'Home',
    htmlAttrs: {
      lang: 'it'
    },
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Comfortaa&display=swap' }
    ]
  },

  loading: {
    color: '#ff6b3a'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~assets/css/global.css', lang: 'css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/filters/formatDate.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/color-mode',
    'nuxt-i18n',
    '@nuxtjs/sitemap'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    optionsPath: './plugins/vuetify.options.js'
  },

  // Router Configuration: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/error/not-found.vue')
      })
    },
    linkActiveClass: 'active-link'
  },

  // Color mode configuration
  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  // I18N Configuration
  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', file: 'it.js' }
    ],
    defaultLocale: 'it',
    vueI18n: {
      fallbackLocale: 'it',
      messages: { it }
    }
  },

  // Sitemap Configuration
  sitemap: {
    hostname: 'https://studioartepuma.it/',
    gzip: true,
    routes: [
      '/'
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]]
    }
  }
}
