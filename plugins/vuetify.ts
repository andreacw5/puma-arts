import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: DARK_THEME,
            themes: {
                light,
                dark,
            },
        },
        icons: {
            defaultSet: "custom",
            aliases,
            sets: {
                custom,
            },
        },
    });

    nuxtApp.vueApp.use(vuetify)
})
