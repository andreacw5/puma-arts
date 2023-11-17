<template>
  <v-card class="atom-card card"  @click.stop="detailsDialog = true">
    <v-img
      :src="imageSrc"
      class="image"
      :aspect-ratio="aspectRatio"
      :gradient="baseGradient"
    >
      <div
        :class="{
          'card-content-wrapper': true,
          'fill-height': true,
          'title-centered': titleCentered,
        }"
      >
        <div class="card-content">
          <slot name="card-content"></slot>
        </div>
      </div>
    </v-img>
    <v-dialog
      v-model="detailsDialog"
      fullscreen
      transition="dialog-bottom-transition"
      class="details-dialog"
      scrollable
    >
      <v-card class="details-dialog">
        <v-card-text>
          <v-container class="details">
            <v-row dense>
              <v-col cols="12">
                <v-list
                  style="background: transparent !important;"
                  class="card-header"
                >
                  <v-list-item>
                    <v-list-item-content class="text-left">
                      <v-list-item-title>
                        <h1>{{ title }}</h1>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        class="round-border button-hover"
                        outlined
                        @click="detailsDialog = false"
                      >
                        Chiudi
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-img
                  :src="imageSrc"
                  class="image details-image-border"
                  :aspect-ratio="5 / 3"
                >
                </v-img>
              </v-col>
            </v-row>

            <div class="my-4 text-subtitle-1">
              Statua - 2019
            </div>

            <div v-if="details">
              {{ details }}
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: 'CommonCard',
  props: {
    image: {
      type: String,
      default: ''
    },
    details: {
      type: String,
      default: ''
    },
    gradient: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    titleCentered: {
      type: Boolean,
      default: false
    },
    titleEllipsis: {
      type: Boolean,
      default: false
    },
    aspectRatio: {
      type: Number,
      default: 5 / 3
    }
  },
  data () {
    return {
      detailsDialog: false
    }
  },
  computed: {
    imageSrc () {
      return require(`~/assets/img${this.image}`)
    },
    baseGradient () {
      return this.gradient
        ? 'to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)'
        : undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  background: #333333;
  border-radius: 8px !important;
  border: 1px solid #414141;
  box-shadow: none;
}
.image {
  border-radius:7px !important;
}
.card:hover {
  transform: translateY(-2px);
}
.card-title {
  background-color: transparentize($color: #1d1d1d, $amount: 0.25);
  padding: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: 0.3s ease all;
  color: #f2f2f2;
  font-weight: 600;
  font-size: 1.06rem;
}
.details {
  background: #282829 !important;
}
.details-image-border {
  border-bottom: solid 2px var(--color-primary) !important;
  border-radius: 14px !important;
}
.details-dialog {
  background: rgba(40,40,40, 0.9) !important;
  border-radius: 14px !important;
}
.card-content {
  background-color: transparentize($color: #000, $amount: 0.2);
  padding: 12px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px !important;
  width: 100%;
  height: 100%;
  transition: 0.3s ease all;
  opacity: 0;
}
.card-content-wrapper {
  position: relative;
  display: block;

  &.title-centered {
    display: flex;
    align-items: center;
    justify-content: center;

    .card-title {
      position: static;
      width: auto;
      border-radius: 8px !important;
      padding: 10px;
      font-size: 2rem;
    }
  }
  &:hover {
    .card-title {
      opacity: 0;
    }
    .card-content {
      opacity: 1;
    }
  }
}
</style>
