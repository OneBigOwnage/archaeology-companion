<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create new collection</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.name" outlined label="Collection name" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.NPCName" outlined label="Collector NPC name" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.rewards" outlined label="Rewards" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Artefacts"
                  deletable-chips
                  small-chips
                  outlined
                  multiple
                  v-model="form.artefacts"
                  :items="artefacts"
                  :search-input.sync="artefactSearch"
                  v-on:change="artefactSearch = ''"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4" align="end">
                <v-btn color="amber" v-on:click="save()">Save</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Collection from '@/models/collection';
import EventBus from '@/eventbus';
import { autocompleteMapper } from '@/helpers';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      isOpen: false,
      artefactSearch: '',
      form: {
        name: null,
        NPCName: null,
        rewards: null,
        artefacts: [],
      },
    };
  },
  methods: {
    save() {
      const collection = new Collection(uuidv4(), this.form.name, this.form.NPCName, this.form.rewards);

      this.$store.dispatch('collections/add', collection);

      const artefacts = this.$store.state.artefacts.all.filter(artefact => this.form.artefacts.includes(artefact.ID));

      artefacts.forEach(artefact => this.$store.dispatch('relations/attach', [artefact, collection]));

      this.$router.push(collection.route());
    },
  },
  computed: {
    artefacts() {
      return this.$store.state.artefacts.all.map(autocompleteMapper);
    },
  },
  created() {
    EventBus.$on('collections.dialogs.create.open', () => this.isOpen = true);
    EventBus.$on('collections.dialogs.create.hide', () => this.isOpen = false);
  },
}
</script>

<style>
</style>
