<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/collections">
      <v-icon left>mdi-chevron-left</v-icon>To overview
    </v-btn>

    <app-loader v-if="!collection"></app-loader>

    <v-container v-else>
      <app-edit-collection-dialog :collection="collection"></app-edit-collection-dialog>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-toolbar dark flat color="amber darken-2">
              <v-avatar size="36">
                <v-icon>view_quilt</v-icon>
              </v-avatar>
              <v-toolbar-title class="font-weight-medium">Collection</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="openEditDialog()">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-title>{{ collection.name }}</v-card-title>

            <app-card-table :items="table" :labelCols="4" :textCols="8"></app-card-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="6">
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
                <v-list-item-action>
                  <v-list-item-action-text>Chronotes: {{ artefact.chronotes }}</v-list-item-action-text>
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
      collection: null,
    };
  },
  mounted() {
    this.loadCollection();
  },
  methods: {
    loadCollection() {
      const slug = this.$route.params.slug;

      this.collection = this.$store.getters['collections/bySlug'](slug);
    },
    openEditDialog() {
      EventBus.$emit('collections.dialogs.edit.open');
    },
  },
  computed: {
    artefacts() {
      if (!this.collection) {
        return [];
      }

      return this.$store.getters['relations/artefacts'](this.collection);
    },
    table() {
      return [
        { label: 'Hand in NPC', text: this.collection.NPCName },
        { label: 'Rewards for completing', text: this.collection.rewards },
        { label: 'Total chronotes for completion', text: 1235 },
      ];
    },
  }
}
</script>

<style>
</style>
