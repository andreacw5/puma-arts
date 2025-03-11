<script setup lang="ts">
</script>

<template>
  <v-footer class="text-center d-flex flex-column py-sm-12 py-6 footer">
    <p class="text-4 mb-2">
      Designed & Developed by
      <a href="https://andreatombolato.dev" class="author">
        Andrea Tombolato
      </a>
    </p>
    <p class="text-caption">
      &copy; {{ new Date().getFullYear() }} All rights reserved.
    </p>
  </v-footer>
</template>

<style scoped>
.author {
  color: #00a86b;
  font-weight: bold;
  text-decoration: none;
}
.author:hover {
  transform: scale(1.1);
  color: #00a86b;
}
</style>
