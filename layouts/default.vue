<template>
  <v-app class="bg-surface-a0">
    <SideNavBar />
    <v-main>
      <slot />
    </v-main>
    <main-footer />
  </v-app>
</template>

<script>
import MainFooter from "~/components/layout/MainFooter.vue";

export default {
  components: {MainFooter}
}
</script>

<style lang="scss" scoped>

</style>
