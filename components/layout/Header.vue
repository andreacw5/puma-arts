<template>
  <v-container grid-list-md text-xs-center>
    <v-row wrap>
      <v-col cols="12">
        <v-app-bar
          app
          dark
          elevate-on-scroll
          prominent
          shrink-on-scroll
          class="header"
        >
          <v-app-bar-nav-icon @click="drawer = true" />
          <v-toolbar-title class="personal">Emanuele Puma</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text to="/" nuxt class="hidden-sm-and-down white-text mt-1 mr-1" active-class="header-active">
            Galleria
          </v-btn>
          <v-btn text to="/contacts" nuxt class="hidden-sm-and-down white-text mt-1" active-class="header-active">
            Contatti
          </v-btn>
          <v-btn text class="hidden-sm-and-down white-text mt-1">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          class="gray darken-4"
          absolute
          temporary
        >
          <template #prepend>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Emanuele <span class="primary-text">Puma</span></v-list-item-title>
                <v-list-item-subtitle>Artista, scultore e architetto</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider />
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="primary-text text--accent-4"
            >
              <v-list-item href="/" nuxt>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Galleria</v-list-item-title>
              </v-list-item>
              <v-list-item href="/contacts" nuxt>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Contatti</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null
  }),
  computed: {
    currentLocale () {
      return this.$i18n.locale
    },
    imageUrl () {
      return require('~/assets/img/logo.webp')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: transparentize($color: #3b3b3b, $amount: 0.5) !important;
  border-bottom: 1px solid #222222;
  box-shadow: none;
}
</style>
