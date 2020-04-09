<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/collections">
      <v-icon left>mdi-chevron-left</v-icon>
      To overview
    </v-btn>

    <app-loader v-if="!collection"></app-loader>

    <v-container v-else>
      <app-edit-collection-modal :collection="collection"></app-edit-collection-modal>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-card-title>{{ collection.name }}</v-card-title>
            <v-card-text>
              <div>
                NPC: {{ collection.NPCName }}
              </div>
              <div>
                Rewards: {{ collection.rewards }}
              </div>
              <div>
                Total chronotes for completion: 652
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
        <v-col xs="12" lg="6">
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
    openEditModal() {
      EventBus.$emit('collections.dialogs.edit.open');
    },
  },
  computed: {
    artefacts() {
      if (!this.collection) {
        return [];
      }

      return this.$store.getters['relations/artefacts'](this.collection);
    }
  }
}
</script>

<style>
</style>
