<template>
  <v-dialog v-model="showBackdrop" hide-overlay persistent>
    <v-card class="d-flex justify-center align-center">
      <SvgSpinnersBarsRotateFade />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  data() {
    const showBackdrop = ref(false)
    return {
      showBackdrop
    }
  },
  methods: {
    toggleLoadingBackdrop() {
      this.showBackdrop = !this.showBackdrop
    }
  }
}
</script>

<style scoped>
.v-card {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1600;
}
</style>
