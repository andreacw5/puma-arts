<template>
  <v-navigation-drawer
      v-model="drawer"
      class="card"
      temporary
  >

    <v-list class="mt-2 mb-1">
      <v-list-item
          title="Emanuele Puma"
          subtitle="Pittore, Scultore"
      />
    </v-list>

    <v-list
        density="comfortable"
        item-props
        :items="links"
        nav
        rounded
    />
  </v-navigation-drawer>
  <v-app-bar color="transparent" flat absolute>
    <template #prepend>
      <v-app-bar-nav-icon
          variant="text"
          class="hidden-md-and-up text-white"
          :icon="drawer ? 'line-md:menu-to-close-transition' : 'line-md:menu-fold-right'"
          @click="closeOrOpenDrawer"
          aria-label="Menu button"
      />
    </template>

    <v-spacer></v-spacer>

    <div class="d-md-flex d-none ga-4 mx-auto">
      <v-btn v-for="item in links" :key="item.title" class="text-none" :text="item.title" :to="item.to" />
    </div>

    <div class="d-flex flex-1-1-0 pe-3">
      <v-btn class="ms-auto text-none" tile rounded="lg" icon="line-md:instagram" href="https://instagram.com" />
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
const drawer = ref(false)
const links = ref([
  {
    title: 'Le mie opere',
    prependIcon: "line-md:home",
    to: '/',
    link: true,
    aria: 'Home section'
  },
  {
    title: 'Chi sono',
    prependIcon: "line-md:account",
    to: '/about',
    link: true,
    aria: 'Home section'
  }
])

const closeOrOpenDrawer = () => {
  drawer.value = !drawer.value
}

</script>
