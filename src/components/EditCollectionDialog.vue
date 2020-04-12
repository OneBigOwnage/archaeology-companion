<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit collection: {{ collection.name }}</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form v-model="isFormValid" ref="form">
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Collection name"
                  required
                  v-model="form.name"
                  :rules="rules.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Collector NPC name"
                  required
                  v-model="form.NPCName"
                  :rules="rules.NPCName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  :class="{ 'rewards-non-chronotes': isInterpretedAsChronotes === false }"
                  outlined
                  label="Rewards"
                  required
                  v-model="form.rewards"
                  :rules="rules.rewards"
                  :messages="interpretationMessage"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Artefacts"
                  v-model="form.artefacts"
                  deletable-chips
                  small-chips
                  outlined
                  multiple
                  :items="artefacts"
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
import { autocompleteMapper, isInterpretedAsChronotes, getNumberOfChronotes } from '@/helpers';
import { required } from '@/validationrules';

export default {
  data() {
    return {
      collectionToUpdate: null,
      isOpen: null,
      isFormValid: false,
      form: {
        name: null,
        NPCName: null,
        rewards: null,
        artefacts: null,
      },
      rules: {
        name: [required()],
        NPCName: [required()],
        rewards: [required()],
      },
    };
  },
  methods: {
    loadCollectionIntoForm() {
      this.form.name = this.collection.name;
      this.form.NPCName = this.collection.NPCName;
      this.form.rewards = this.collection.rewards;

      this.form.artefacts = this.$store.getters['relations/artefacts'](this.collection).map(artefact => artefact.ID);
    },
    save() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const isNameDiff = this.collection.name !== this.form.name;

      this.updateRelatedArtefacts();

      this.collectionToUpdate.name = this.form.name;
      this.collectionToUpdate.NPCName = this.form.NPCName;
      this.collectionToUpdate.rewards = this.form.rewards;

      this.$store.dispatch('collections/update', this.collectionToUpdate).then(() => {
        this.isOpen = false;

        if (isNameDiff) {
          this.$router.push({ name: 'collection-details', params: { slug: this.collectionToUpdate.slug() } });
        }
      });
    },
    updateRelatedArtefacts() {
      const before = this.$store.getters['relations/artefacts'](this.collection).map(artefact => artefact.ID);
      const after = this.form.artefacts;

      const removedIDs = before.filter(i => !after.includes(i));
      const addedIDs = after.filter(i => !before.includes(i));

      const removedArtefacts = this.$store.state.artefacts.all.filter(artefact => removedIDs.includes(artefact.ID));
      const addedArtefacts = this.$store.state.artefacts.all.filter(artefact => addedIDs.includes(artefact.ID));

      removedArtefacts.forEach(artefact => this.$store.dispatch('relations/detach', [artefact, this.collection]));
      addedArtefacts.forEach(artefact => this.$store.dispatch('relations/attach', [artefact, this.collection]));
    }
  },
  props: {
    collection: {
      type: Collection,
      required: true,
    },
  },
  created() {
    EventBus.$on('collections.dialogs.edit.open', () => this.isOpen = true);
    EventBus.$on('collections.dialogs.edit.hide', () => this.isOpen = false);

    this.collectionToUpdate = this.collection;
    this.loadCollectionIntoForm();
  },
  computed: {
    artefacts() {
      return this.$store.state.artefacts.all.map(autocompleteMapper);
    },
    interpretationMessage() {
      if (!this.form.rewards) {
        return 'Tip: if the reward is a number of chronotes, use the format "123 chronotes"'
      }

      if (isInterpretedAsChronotes(this.form.rewards)) {
        return `This reward is interepreted as a number of chronotes (${getNumberOfChronotes(this.form.rewards)})`;
      }

      return `This reward is not interpreted as a number of chronotes, but a custom reward (${this.form.rewards})`;
    },
    isInterpretedAsChronotes() {
      if (!this.form.rewards) {
        return null;
      }

      return isInterpretedAsChronotes(this.form.rewards);
    },
  },
}
</script>

<style>
.rewards-non-chronotes .v-messages__message {
  color: orange;
}
</style>
