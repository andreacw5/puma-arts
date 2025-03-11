<script setup lang="ts">
const props = defineProps<{
  item: {
    name: string
    description: string
    image: string
  }
}>()

const isModalOpen = ref(false)
const handleClose = () => {
  isModalOpen.value = false
}
</script>

<template>
  <v-hover v-slot:default="{ isHovering, props: hoverProps }">
      <v-card
          v-bind="hoverProps"
          link
          :ripple="false"
          rounded="lg"
          class="image-card card"
          @click="isModalOpen = true"
      >
        <v-img
            class="zoom-in"
            gradient="to bottom, rgba(18, 18, 18, .1), rgba(18, 18, 18, .3)"
            block
            :content-class="isHovering ? 'align-end d-flex align-center justify-center' : ''"
            cover
            height="350"
            :src="item.image"
        >
          <v-slide-x-transition hide-on-leave>
            <div v-if="isHovering" class="borel text-white text-h5">
              {{ item.name }}
            </div>
          </v-slide-x-transition>
        </v-img>
        <v-fade-transition>
          <v-overlay
              v-if="isHovering"
              absolute
              opacity="1"
              scrim
          >
            {{ item.description }}
          </v-overlay>
        </v-fade-transition>
      </v-card>
      <v-dialog v-model="isModalOpen" max-width="800">
        <gallery-preview-modal
            :item="item"
            @close="handleClose"
        />
      </v-dialog>
    </v-hover>
</template>

<style>
.zoom-in {
  transition: transform 0.3s ease-in-out;
}

.zoom-in:hover {
  color: var(--color-primary-a0);
}
</style>
