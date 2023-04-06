<template>
  <v-card class="emt-card card"  @click.stop="detailsDialog = true">
    <v-img
      :src="image"
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
        <div
          :class="{
            'card-title': true,
            'text-no-wrap': titleEllipsis,
            'text-truncate': titleEllipsis,
          }"
        >
          {{ title }}
        </div>
        <div class="card-content">
          <slot name="card-content"></slot>
        </div>
      </div>
    </v-img>
    <v-dialog
      v-model="detailsDialog"
      max-width="650"
    >
      <v-card>
        <v-card-title>
          {{ title }}
          <v-spacer />
          <v-btn
            outlined
            @click="detailsDialog = false"
          >
            Chiudi
          </v-btn>
        </v-card-title>
        <v-img
          :src="image"
          class="image"
          :aspect-ratio="5 / 3"
        >
        </v-img>
        <v-card-text v-if="details">
          <p class="mt-2">{{ details }}</p>
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
  border: 1px solid #414141;
  box-shadow: none;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 8px 0 #111212, 0 -3px 8px 0 #111212, 3px 0 8px 0 #111212,
  -3px 0 8px 0 #111212;
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
.card-content {
  background-color: transparentize($color: #000, $amount: 0.2);
  padding: 12px;
  position: absolute;
  top: 0;
  left: 0;
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
      border-radius: 4px !important;
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
