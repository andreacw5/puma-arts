<script setup lang="ts">
import type { NuxtError } from '#app'

// The one page outside app.vue: it carries its own <html lang>, title and way back.
const { error } = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const localePath = useLocalePath()
const i18nHead = useLocaleHead({ seo: true })
const title = error.statusCode === 404 ? t('error.title') : t('error.generic')

useHead(() => ({ htmlAttrs: i18nHead.value.htmlAttrs }))
useSeoMeta({ title, robots: 'noindex' })
</script>

<template>
  <main id="main" class="oops">
    <p class="oops-code">{{ error.statusCode }}</p>
    <h1 class="oops-title">{{ title }}</h1>
    <a :href="localePath('/')" class="oops-home" @click.prevent="clearError({ redirect: localePath('/') })">{{ t('error.home') }}</a>
  </main>
</template>

<style scoped>
.oops {
  min-height: 100svh;
  display: grid;
  align-content: end;
  gap: 0.5rem;
  padding: var(--section) var(--gutter);
  background: var(--ink);
  color: var(--on-black);
}
.oops-code { margin: 0; font-weight: 700; }
.oops-title {
  margin: 0;
  font-stretch: 62%;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.85;
  font-size: clamp(3rem, 14vw, 10rem);
  text-wrap: balance;
}
.oops-home { margin-top: 1.5rem; font-weight: 700; justify-self: start; }
</style>
