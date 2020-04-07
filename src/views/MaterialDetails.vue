<template>
  <v-container>

    <v-btn outlined color="amber accent-4" to="/materials">
      <v-icon left>mdi-chevron-left</v-icon>
      To overview
    </v-btn>

    <app-loader v-if="!material"></app-loader>

    <v-container v-else>
      <v-row justify="center">

        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-card-title>{{ material.name }}</v-card-title>
            <v-card-text>Level {{ material.level }}</v-card-text>
          </v-card>
        </v-col>

      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="3">
          <v-card outlined>
            <v-card-title>Artefacts</v-card-title>
            <v-card-text>
              <div v-for="artefact in artefacts" :key="artefact.ID">
                {{ artefact.name }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xs="12" lg="3">
          <v-card outlined>
            <v-card-title>Excavations</v-card-title>
            <v-card-text>
              <div v-for="excavation in excavations" :key="excavation.ID">
                {{ excavation.name }}
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
      material: null,
    }
  },
  mounted() {
    this.loadMaterial();
  },
  methods: {
    loadMaterial() {
      const slug = this.$route.params.slug;

      this.material = this.$store.getters['materials/bySlug'](slug);
    }
  },
  computed: {
    artefacts() {
      if (!this.material) {
        return [];
      }

      return this.$store.getters['relations/artefacts'](this.material);
    },
    excavations() {
      if (!this.material) {
        return [];
      }

      return this.$store.getters['relations/excavations'](this.material);
    }
  }
}
</script>

<style>
</style>
