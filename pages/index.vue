<template>
  <!-- Page content -->
  <div>
    <v-container grid-list-sm text-xs-center class="mt-2">
      <v-row wrap>
        <v-col
          v-for="(paint, i) in paintings"
          :key="i"
          cols="12"
          lg="4"
          md="6"
          sm="6"
        >
          <common-card
            :title="paint.name"
            :image="paint.image"
            :details="paint.description"
            :aspect-ratio="5 / 3"
          >
            <template #card-content>
              <div class="team-card-content d-flex align-center fill-height">
                  <span class="text-center flex-grow-1 text--primary">{{
                      paint.description
                    }}</span>
              </div>
            </template>
          </common-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoadingComponent from '@/components/Loading'
import { createSEOMeta } from '~/utils/seo'
export default {
  components: { LoadingComponent },
  data: () => ({
    loading: false,
    paintings: []
  }),
  head () {
    return {
      title: 'Home - Emanuele Puma',
      meta: [
        ...createSEOMeta({
          title: 'Home',
          description: 'Andrea Tombolato, Web Developer con base a Milano e questo è il mio sito personale!',
          url: this.$route.path,
          image: 'https://firebasestorage.googleapis.com/v0/b/pw-9483234.appspot.com/o/IMG_1104.jpg?alt=media&token=d226d956-bc7f-40b7-aed5-4c5356227449'
        })
      ]
    }
  },
  computed: {
    currentLocale () {
      return this.$i18n.locale
    }
  },
  created () {
    this.paintings = this.$store.getters['paintings/getItems']
  }
}
</script>

<style scoped>
.large-title {
  font-size: 3rem;
}
.services {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
