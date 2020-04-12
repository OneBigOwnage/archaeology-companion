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
                  <v-list-item-action-text>
                    <span style="width: 70px; display: inline-block;">
                      Level:
                      <span
                        class="text-right"
                        style="width: 23px; display: inline-block;"
                      >{{ artefactLevel(artefact) }}</span>
                    </span>
                    <span
                      style="width: 100px; display: inline-block; padding-left: 10px;"
                    >Chronotes: {{ artefact.chronotes }}</span>
                  </v-list-item-action-text>
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
import { isInterpretedAsChronotes, getNumberOfChronotes } from '@/helpers';
import AppEditCollectionDialog from '@/components/EditCollectionDialog';

export default {
  components: {
    AppEditCollectionDialog
  },
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
    artefactLevel(artefact) {
      return this.$store.getters['relations/excavation'](artefact).level;
    },
  },
  computed: {
    artefacts() {
      if (!this.collection) {
        return [];
      }

      // @TODO [Niek, 2020-04-12] Sort this list by level, asc.
      return this.$store.getters['relations/artefacts'](this.collection);
    },
    table() {
      const level = this.artefacts.map(this.artefactLevel).sort((a, b) => a - b).pop() || '?';
      let collectionChronotes = 0;

      if (isInterpretedAsChronotes(this.collection.rewards)) {
        collectionChronotes = getNumberOfChronotes(this.collection.rewards);
      }

      const totalChronotes = this.artefacts
        .map(art => art.chronotes || 0)
        .filter(chr => typeof chr === 'number') // @TODO [Niek, 2020-04-12] This can be removed once we have validation in place for the number of chronotes of an artefact.
        .reduce((item, carry) => carry += item, collectionChronotes);

      return [
        { label: 'Hand in NPC', text: this.collection.NPCName },
        { label: 'Rewards for completing', text: this.collection.rewards },
        { label: 'Total chronotes for completion', text: totalChronotes },
        { label: 'Level required for completion', text: level },
      ];
    },
  }
}
</script>

<style>
</style>
