<template>
  <v-container>

    <v-btn outlined to="/materials">
      <v-icon left>mdi-chevron-left</v-icon>
      To overview
    </v-btn>

    <v-row justify="center">

      <v-col xs="12" lg="6">
        <v-card outlined v-if="material">
          <v-card-title>{{ material.name }}</v-card-title>
          <v-card-text>Level {{ material.level }}</v-card-text>
        </v-card>
        <div v-else>Didn't load...</div>
      </v-col>

    </v-row>

    <v-row justify="center">
      <v-col xs="12" lg="3">
        <v-card outlined v-if="material">
          <v-card-title>Artefacts</v-card-title>
          <v-card-text>
            <div v-for="artefact in artefacts" :key="artefact">
              {{ artefact }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" lg="3">
        <v-card outlined v-if="material">
          <v-card-title>Excavations</v-card-title>
          <v-card-text>
            <div v-for="excavation in excavations" :key="excavation">
              {{ excavation }}
            </div>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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

      return ['Legatus Maximus figurine (21x)', 'Rod of Asclepius (4x)'];
    },
    excavations() {
      if (!this.material) {
        return [];
      }

      return ['Remains (Everlight)', 'Sacrificial altar (Infernal Source)'];
    }
  }
}
</script>

<style>
</style>
