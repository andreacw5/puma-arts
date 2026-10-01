<script setup lang="ts">
import { site } from '~/data/site'
</script>

<!-- The close every page ends on: pasted over whatever came before. -->
<template>
  <footer id="contatti" class="close torn" style="--torn-x: 300px">
    <p class="close-say">Scrivimi.</p>
    <a class="close-mail" :href="`mailto:${site.email}`">{{ site.email }}</a>
    <a class="close-ig" :href="site.instagram.url">Instagram {{ site.instagram.handle }}</a>
    <p class="close-credit"><PoweredBy /></p>
  </footer>
</template>

<style scoped>
.close {
  position: relative;
  background: var(--ink);
  color: var(--on-black);
  padding: var(--section) var(--gutter) 2rem;
  display: grid;
  gap: 0.75rem;
  align-content: end;
  justify-items: start;
}
.close-say {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  font-size: clamp(4rem, 19vw, 11rem);
  line-height: 0.85;
}
.close-mail { font-size: clamp(1.1rem, 3vw, 1.6rem); font-weight: 700; overflow-wrap: anywhere; }
.close-ig { font-weight: 600; }
.close-credit { margin: 3rem 0 0; }
</style>
