<script setup lang="ts">
const props = defineProps<{
  item: {
    name: string
    description: string
    image: string
  }
}>()

const emit = defineEmits(['close'])
const close = () => {
  emit('close')
}
</script>

<template>
  <v-card class="card">
    <v-card-actions class="bg-surface-light">
      <v-card-title class="text-h5 borel">
        {{ item.name }}
      </v-card-title>
      <v-spacer />

      <v-btn
          class="text-none"
          text="Close"
          variant="flat"
          @click="close"
      />
    </v-card-actions>
    <v-img
        gradient="to bottom, rgba(var(--v-theme-surface), 0.1) 60%, rgba(0,0,0, 1)"
        block
        content-class="d-flex align-end justify-end"
        cover
        class="card"
        rounded="lg"
        :src="item.image"
        max-width="800"
        max-height="600"
    />
    </v-card>
</template>
