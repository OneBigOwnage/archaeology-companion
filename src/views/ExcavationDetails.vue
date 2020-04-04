<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/artefacts">
      <v-icon left>mdi-chevron-left</v-icon>
      To overview
    </v-btn>

    <app-loader v-if="!excavation"></app-loader>

    <v-container v-else>
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

      <v-row justify="center">
        <v-col xs="12" lg="3">
          <v-card>
            <v-card-title>Materials</v-card-title>
            <v-card-text>
              <div v-for="material in materials" :key="material">
                {{ material }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xs="12" lg="3">
          <v-card>
            <v-card-title>Artefacts</v-card-title>
            <v-card-text>
              <div v-for="artefact in artefacts" :key="artefact">
                {{ artefact }}
              </div>
            </v-card-text>
          </v-card>
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
  },
  computed: {
    materials() {
      if (!this.excavation) {
        return [];
      }

      return ['Chaotic brimstone', 'Hellfire metal'];
    },
    artefacts() {
      if (!this.excavation) {
        return [];
      }

      return ['Legatus Maximus figurine', 'Rod of Asclepius'];
    },
  }
}
</script>

<style>

</style>
