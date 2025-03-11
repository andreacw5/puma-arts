<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <v-container class="pa-4 pa-md-12 my-4 pb-md-4 bg-surface-a0" fluid>
    <v-responsive max-width="700">
      <h2 class="font-weight-bold text-sm-h2 text-h4 borel text-white">
        {{ title }}
      </h2>

      <p class="mt-4 text-body-1 text-medium-emphasis text-primary-a10">
        {{ subtitle }}
      </p>
    </v-responsive>
  </v-container>
</template>

<style scoped>

</style>
