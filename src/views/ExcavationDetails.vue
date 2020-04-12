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
            <v-toolbar dark flat color="amber darken-2">
              <v-avatar size="36">
                <v-icon>gavel</v-icon>
              </v-avatar>
              <v-toolbar-title class="font-weight-medium">Excavation</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="openEditDialog()">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-title>{{ excavation.name }}</v-card-title>
            <app-card-table :items="table"></app-card-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="3">
          <v-card>
            <v-toolbar dark flat dense color="amber lighten-1">
              <v-toolbar-title>Materials</v-toolbar-title>
            </v-toolbar>
            <v-list dense>
              <v-list-item
                v-for="material in materials"
                :key="material.ID"
                v-on:click="$router.push(material.route())"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ material.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col xs="12" lg="3">
          <v-card>
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
import AppEditExcavationDialog from '@/components/EditExcavationDialog';

export default {
  components: {
    AppEditExcavationDialog
  },
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
        return {};
      }

      return this.$store.getters['relations/digSite'](this.excavation);
    },
    table() {
      return [
        { label: 'Dig site', text: this.digSite.name, link: this.$router.resolve(this.digSite.route()).href },
        { label: 'Level requirement', text: this.excavation.level },
      ];
    },
  }
}
</script>

<style>
</style>
