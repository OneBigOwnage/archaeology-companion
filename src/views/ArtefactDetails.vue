<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/artefacts">
      <v-icon left>mdi-chevron-left</v-icon>
      To overview
    </v-btn>

    <v-row v-if="!artefact" justify="center">
      <v-progress-circular
        :size="90"
        :width="2"
        color="amber"
        indeterminate
      ></v-progress-circular>
    </v-row>

    <v-container v-else>
      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined v-if="artefact">
            <v-card-title>{{ artefact.name }}</v-card-title>
            <v-card-text>
              <div>
                <span class="font-weight-medium">Experience:</span>
                {{ artefact.formattedXP() }}
              </div>
              <div>
                <span class="font-weight-medium">Chronotes:</span>
                {{ artefact.chronotes }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="2">
          <v-card>
            <v-card-title>Materials</v-card-title>
            <v-card-text>
              <div v-for="material in materials" :key="material">
                {{ material }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xs="12" lg="2">
          <v-card>
            <v-card-title>Excavation</v-card-title>
            <v-card-text>
              {{ excavation }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xs="12" lg="2">
          <v-card>
            <v-card-title>Collections</v-card-title>
            <v-card-text>
              <div v-for="collection in collections" :key="collection">
                {{ collection }}
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
      artefact: null,
    };
  },
  mounted() {
    this.loadArtefact();
  },
  methods: {
    loadArtefact() {
      const slug = this.$route.params.slug;

      this.artefact = this.$store.getters['artefacts/bySlug'](slug);
    }
  },
  computed: {
    materials() {
      if (!this.artefact) {
        return [];
      }

      return ['Chaotic brimstone', 'Hellfire metal'];
    },
    collections() {
      if (!this.artefact) {
        return [];
      }

      return ['Saradomin II', 'Saradomin III'];
    },
    excavation() {
      if (!this.artefact) {
        return [];
      }

      return 'Remains (Everlight)';
    },
  }
}
</script>

<style>
</style>
