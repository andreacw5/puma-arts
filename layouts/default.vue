<template>
  <v-app class="area">
    <!--[if lte IE 9]>
      <p class="browserupgrade">
      You are using an <strong>outdated</strong> browser. Please
      <a href="https://browsehappy.com/">upgrade your browser</a> to improve
      your experience and security.
      </p>
    <![endif]-->

    <Header />
    <v-content class="mt-4">
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '../components/layout/Header'
import Footer from '~/components/layout/Footer.vue'
export default {
  name: 'DefaultLayout',
  components: { Footer, Header },
  head: {
    titleTemplate: '%s'
  }
}
</script>
