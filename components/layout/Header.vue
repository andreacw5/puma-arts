<template>
  <v-container grid-list-md text-xs-center>
    <v-row wrap class="mt-2">
      <v-col cols="12">
        <v-app-bar dense elevation="0" style="background-color: transparent">
          <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true"></v-app-bar-nav-icon>
          <v-app-bar-title>
            <nuxt-link to="/">
              <h1 class="personal hidden-sm-and-down">Emanuele Puma</h1>
              <span class="personal hidden-md-and-up">Emanuele Puma</span>
            </nuxt-link>
          </v-app-bar-title>
          <v-spacer />
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                icon
                href="https://www.instagram.com/puma_art_lab/"
                target="_blank"
                alt-text="Instagram profile"
                v-on="on"
              >
                <v-icon size="27" class="white-text">
                  mdi-instagram
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('socials.prefix', { name: 'Instagram' }) }}</span>
          </v-tooltip>
        </v-app-bar>
        <v-navigation-drawer
          v-model="drawer"
          class="gray darken-4"
          absolute
          temporary
        >
          <template #prepend>
            <v-list-item two-line>
              <v-list-item-avatar tile>
                <img :src="imageUrl" alt="AT Logo">
              </v-list-item-avatar>

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
              <v-list-item v-for="(link,i) in links" :key="i" :href="localePath(link.url, currentLocale)" nuxt>
                <v-list-item-icon>
                  <v-icon>{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t(link.name) }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          <template #append>
            <div class="pa-2">
              <v-btn block @click="drawer = false">Logout</v-btn>
            </div>
          </template>
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
  },
  methods: {
    toggleDarkMode () {
      this.$emit('toggleDarkMode')
    },
    isDarkMode () {
      return this.$colorMode.preference === 'dark' ||
        (this.$colorMode.preference === 'system' &&
          this.$colorMode.value === 'dark')
    }
  }
}
</script>
