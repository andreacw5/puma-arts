<template>
  <v-container grid-list-md text-xs-center>
    <v-row wrap>
      <v-col cols="12">
        <v-footer class="mt-3 text-center white-text" style="background-color: transparent">
          <v-row wrap class="mt-1 mb-1">
            <v-col cols="12">
              <span>Designed & Developed by</span>
              <strong class="subheading" style="margin-left: 1px">
                <a href="https://andreacw.dev" class="primary-text" style="text-decoration: none;">Andrea Tombolato</a>
              </strong>
            </v-col>
            <v-col cols="12">
              © {{ new Date().getFullYear() }} - All rights reserved
            </v-col>
          </v-row>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
