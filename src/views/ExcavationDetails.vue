<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/excavations">
      <v-icon left>mdi-chevron-left</v-icon>To overview
    </v-btn>

    <app-loader v-if="!excavation"></app-loader>

    <v-container v-else>
      <app-edit-excavation-dialog :excavation="excavation"></app-edit-excavation-dialog>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card>
            <v-card-title>{{ excavation.name }}</v-card-title>
            <v-card-text>
              <div>
                <span class="font-weight-medium">Dig site:</span>
                {{ digSite.name }}
              </div>
              <div>
                <span class="font-weight-medium">Level:</span>
                {{ digSite.level }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="openEditDialog()">
                <v-icon color="amber">edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="3">
          <v-card>
            <v-card-title>Materials</v-card-title>
            <v-card-text>
              <div v-for="material in materials" :key="material.ID">
                {{ material.name }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xs="12" lg="3">
          <v-card>
            <v-card-title>Artefacts</v-card-title>
            <v-card-text>
              <div v-for="artefact in artefacts" :key="artefact.ID">
                {{ artefact.name }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import EventBus from '@/eventbus';

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
    },
    openEditDialog() {
      EventBus.$emit('excavations.dialogs.edit.open');
    },
  },
  computed: {
    materials() {
      if (!this.excavation) {
        return [];
      }

      return this.$store.getters['relations/materials'](this.excavation);
    },
    artefacts() {
      if (!this.excavation) {
        return [];
      }

      return this.$store.getters['relations/artefacts'](this.excavation);
    },
    digSite() {
      if (!this.excavation) {
        return { };
      }

      return this.$store.getters['relations/digSite'](this.excavation);
    }
  }
}
</script>

<style>
</style>
