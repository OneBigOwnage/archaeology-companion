<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/materials">
      <v-icon left>mdi-chevron-left</v-icon>To overview
    </v-btn>

    <app-loader v-if="!material"></app-loader>

    <v-container v-else>
      <app-edit-material-dialog v-bind:material="material"></app-edit-material-dialog>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-toolbar dark flat color="amber darken-2">
              <v-avatar size="36">
                <v-icon>category</v-icon>
              </v-avatar>
              <v-toolbar-title class="font-weight-medium">Material</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="openEditDialog()">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-title>{{ material.name }}</v-card-title>

            <app-card-table :items="table"></app-card-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="3">
          <v-card outlined>
            <v-toolbar dark flat dense color="amber lighten-1">
              <v-toolbar-title>Artefacts</v-toolbar-title>
            </v-toolbar>
            <v-list dense>
              <v-list-item
                v-for="artefact in artefacts"
                :key="artefact.ID"
                v-on:click="$router.push(artefact.route())"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ artefact.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>x{{ material.level }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col xs="12" lg="3">
          <v-card outlined>
            <v-toolbar dark flat dense color="amber lighten-1">
              <v-toolbar-title>Excavations</v-toolbar-title>
            </v-toolbar>
            <v-list dense>
              <v-list-item
                v-for="excavation in excavations"
                :key="excavation.ID"
                v-on:click="$router.push(excavation.route())"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ excavation.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>Level {{ excavation.level }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list>
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
    },
    openEditDialog() {
      EventBus.$emit('materials.dialogs.edit.open');
    },
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
    },
    table() {
      return [
        { label: 'Level', text: this.material.level },
      ];
    },
  }
}
</script>

<style>
</style>
