<script setup lang="ts">

useSeoMeta({
  title: 'Chi sono - Studio Arte Puma',
  ogTitle: 'Chi sono - Studio Arte Puma',
  description: 'Scopri di più su di me, la mia passione per l\'arte e le opere che ho realizzato. Contattami per informazioni e richieste di commissione.',
  ogDescription: 'Scopri di più su di me, la mia passione per l\'arte e le opere che ho realizzato. Contattami per informazioni e richieste di commissione.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

import PageTitle from "~/components/layout/PageTitle.vue";
import GetInTouch from "~/components/common/GetInTouch.vue";

const features = [
  {
    title: 'Oltre 100 opere realizzate',
    subtitle: 'Dal primo progetto scolastico alle creazioni più recenti, ho sempre trovato nella pittura e nella scultura la mia forma di espressione preferita. Questa passione mi ha accompagnato e guidato in un percorso creativo che dura da tutta la vita.',
    icon: 'mdi-widgets-outline',
  },
  {
    title: "Espressioni di emozioni e sentimenti",
    subtitle:
        'Le mie opere sono lo specchio del mio vissuto, una finestra aperta sulla mia interiorità e sul modo in cui percepisco il mondo. Ogni creazione, sia essa un dipinto o una scultura, è un’estensione di me stesso, un pezzo della mia anima che prende forma e colore.',
    icon: 'mdi-calendar-outline',
  }
]

</script>

<template>
  <div class="mt-6">
    <!-- Sezione di Intestazione -->
    <page-title
        title="Conosciamoci meglio"
        subtitle="Contattami e insieme daremo vita a qualcosa di straordinario."
    />

    <!-- Sezione Chi Sono -->
    <v-container class="pa-0 mb-4 bg-surface-a0" fluid>
      <v-row justify="center">
        <v-col
            class="pa-8 pa-md-12"
            cols="12"
            lg="6"
        >
          <p class="mt-2 text-h5 font-weight-bold text-sm-h4">
            Un'artista da sempre
          </p>

          <p class="mt-4 mb-6 text-body-1">
            Sin da bambino, fin dai primi progetti scolastici, sono stato affascinato dal mondo dell'arte. Pittura, scultura e ogni forma di espressione visiva sono diventati il mio linguaggio, una passione che è cresciuta con me e che non mi ha mai abbandonato.
          </p>

          <p class="text-medium-emphasis mb-5">
            Ogni opera che creo è una parte di me: rappresenta i miei pensieri, le mie emozioni e la mia visione del mondo. Attraverso ogni pennellata e ogni dettaglio scultoreo, cerco di trasmettere qualcosa di unico e profondo, che possa toccare l'anima di chi osserva.
          </p>

          <v-list-item
              v-for="(item, i) in features"
              :key="i"
              class="px-0"
          >
            <template #title>
              <p class="text-body-2 font-weight-bold pb-2">
                <v-icon
                    class="mr-2"
                    color="primary"
                    :icon="item.icon"
                    size="small"
                />
                {{ item.title }}
              </p>
            </template>

            <template #subtitle>
              <p class="ps-7">{{ item.subtitle }}</p>
            </template>
          </v-list-item>

          <p class="text-medium-emphasis mt-6">
            Ogni momento libero dagli impegni universitari e lavorativi lo dedico alla creazione di nuove opere. Adoro sperimentare tecniche innovative e stili diversi, cercando sempre di evolvermi e di esprimere in modo autentico le mie emozioni.
          </p>

          <p class="mt-6 text-h6 font-weight-bold">Opere su commissione</p>

          <p class="text-medium-emphasis mt-3">
            Ho già realizzato numerose opere su commissione per privati. Se apprezzi il mio stile e desideri un'opera personalizzata, non esitare a contattarmi: insieme possiamo trovare la soluzione perfetta per trasformare le tue idee in realtà.
          </p>
        </v-col>

        <v-col
            v-if="!$vuetify.display.mdAndDown"
            cols="12"
            lg="6"
        >
          <v-img
              style="border-top-left-radius: 20px; border-bottom-left-radius: 20px"
              cover
              max-height="780"
              position="left"
              src="about-us.png"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- Sezione Contatti -->
    <get-in-touch />

  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
