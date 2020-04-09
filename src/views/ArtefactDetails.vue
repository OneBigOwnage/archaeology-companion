<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/artefacts">
      <v-icon left>mdi-chevron-left</v-icon>
      To overview
    </v-btn>

    <app-loader v-if="!artefact"></app-loader>

    <v-container v-else>
      <app-edit-artefact-modal v-bind:artefact="artefact"></app-edit-artefact-modal>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined v-if="artefact">
            <v-card-title>{{ artefact.name }}</v-card-title>
            <v-card-text>
              <div>
                <span class="font-weight-medium">Excavation:</span>
                {{ excavation.name }}
              </div>
              <div>
                <span class="font-weight-medium">Experience:</span>
                {{ artefact.formattedXP() }}
              </div>
              <div>
                <span class="font-weight-medium">Chronotes:</span>
                {{ artefact.chronotes }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="openEditModal()">
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
            <v-card-title>Collections</v-card-title>
            <v-card-text>
              <div v-for="collection in collections" :key="collection.ID">
                {{ collection.name }}
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
    },
    openEditModal() {
      EventBus.$emit('artefacts.dialogs.edit.open');
    },
  },
  computed: {
    materials() {
      if (!this.artefact) {
        return [];
      }

      return this.$store.getters['relations/materials'](this.artefact);
    },
    collections() {
      if (!this.artefact) {
        return [];
      }

      return this.$store.getters['relations/collections'](this.artefact);
    },
    excavation() {
      if (!this.artefact) {
        return [];
      }

      return this.$store.getters['relations/excavation'](this.artefact);
    },
  }
}
</script>

<style>
</style>
