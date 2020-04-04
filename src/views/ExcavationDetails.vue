<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/artefacts">
      <v-icon left>mdi-chevron-left</v-icon>
      To overview
    </v-btn>

    <app-loader v-if="!excavation"></app-loader>

    <v-container>
      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card>
            <v-card-title>{{ excavation.name }}</v-card-title>
            <v-card-text>
              <span class="font-weight-medium">Dig site:</span>
              {{ excavation.digSiteSlug }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>

        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      excavation: null,
    };
  },
  mounted() {
    this.loadExcavation();
  },
  methods: {
    loadExcavation() {
      const slug = this.$route.params.slug;

      this.excavation = this.$store.getters['excavations/bySlug'](slug);
    }
  }
}
</script>

<style>

</style>
