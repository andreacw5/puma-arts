<script setup lang="ts">
import { site } from '~/data/site'

const { t, locale, setLocaleCookie } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<!-- The close every page ends on: pasted over whatever came before. -->
<template>
  <footer id="contatti" class="close torn" style="--torn-x: 300px">
    <p class="close-say">{{ t('close.say') }}</p>
    <a class="close-mail" :href="`mailto:${site.email}`">{{ site.email }}</a>
    <a class="close-ig" :href="site.instagram.url">Instagram {{ site.instagram.handle }}</a>
    <p class="close-lang" role="group" :aria-label="t('nav.language')">
      <!-- Plain links: a full load renders the page in the new language (the walk is measured once).
           The cookie goes first, or / would bounce an English visitor back to /en.
           Hash dropped: the server never sees it, so keeping it would break hydration. -->
      <a
        v-for="l in ['it', 'en']"
        :key="l"
        :href="switchLocalePath(l).split('#')[0]"
        :lang="l"
        :hreflang="l"
        :aria-current="locale === l ? 'true' : undefined"
        @click="setLocaleCookie(l)"
      >{{ l === 'it' ? 'Italiano' : 'English' }}</a>
    </p>
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
.close-lang { margin: 1rem 0 0; display: flex; gap: 1rem; font-weight: 600; }
.close-lang a { text-decoration: none; opacity: 0.7; }
.close-lang a:hover { text-decoration: underline; }
.close-lang a[aria-current] { opacity: 1; text-decoration: underline; text-decoration-thickness: 2px; }
.close-credit { margin: 3rem 0 0; }
</style>
