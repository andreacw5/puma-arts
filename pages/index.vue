<script setup lang="ts">
import GalleryCard from "~/components/gallery/GalleryCard.vue";
import { useCollectionsStore } from '~/stores/collectionsStore';
import GetInTouch from "~/components/common/GetInTouch.vue";
import PageTitle from "~/components/layout/PageTitle.vue";

const collectionsStore = useCollectionsStore();

onMounted(async () => {
  await collectionsStore.getAll()
})

const collections = collectionsStore.collections

useSeoMeta({
  title: 'Studio Arte Puma',
  ogTitle: 'Studio Arte Puma',
  description: 'Scopri le mie opere: dipinti, sculture e creazioni uniche. Ogni opera racconta una storia, esplora il mio mondo artistico e lasciati ispirare.',
  ogDescription: 'Scopri le mie opere: dipinti, sculture e creazioni uniche. Ogni opera racconta una storia, esplora il mio mondo artistico e lasciati ispirare.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="mt-6">
    <!-- Header section -->
    <v-card image="/arts/25.webp" class="pa-5 image-container">
      <template #image>
        <v-img gradient="to bottom, rgba(18, 18, 18, .5), rgba(18, 18, 18, .8)" />
      </template>

      <v-container class="pa-4 pa-md-12 my-4" fluid>
      <v-responsive class="mb-6">
        <p class="font-weight-bold text-sm-h2 text-md-h2 text-lg-h1 text-xl-h1 text-h2 mt-2 text-center borel">
          Emanuele Puma
        </p>

        <p class="mt-4 text-body-1 text-medium-emphasis text-center borel">
          Pittura | Scultura | Arte astratta
        </p>
      </v-responsive>
    </v-container>
    <div class="v-bg position-absolute top-0 right-0 left-0 bottom-0">
      <div aria-hidden="true" class="overflow-hidden opacity-20 w-100 h-100" />
    </div>
    </v-card>

    <page-title
        title="Scopri le mie opere"
        subtitle="Esplora le mie creazioni in un unico spazio: dai dipinti alle sculture, ogni opera, una storia."
    />

    <!-- Creations section -->
    <v-container class="pa-md-12 pa-6 bg-surface-a0" fluid>
      <v-row>
        <v-col
            v-for="(item, i) in collections"
            :key="i"
            cols="12"
            md="4"
        >
          <gallery-card :item="item" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Get in touch section -->
    <get-in-touch />

  </div>
</template>
