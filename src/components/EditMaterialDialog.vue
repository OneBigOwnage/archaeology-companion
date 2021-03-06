<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit material: {{ material.name }}</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form v-model="isFormValid" ref="form">
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Material name"
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
                  label="Skill level requirement"
                  required
                  :rules="rules.level"
                  v-model="form.level"
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
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Excavations"
                  v-model="form.excavations"
                  deletable-chips
                  small-chips
                  outlined
                  multiple
                  :items="excavations"
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
import Material from '@/models/material';
import EventBus from '@/eventbus';
import { autocompleteMapper } from '@/helpers';
import { required, numeric, between } from '@/validationrules';

export default {
  data() {
    return {
      materialToUpdate: null,
      isOpen: false,
      isFormValid: false,
      form: {
        name: null,
        level: null,
        artefacts: null,
        excavations: null,
      },
      rules: {
        name: [required()],
        level: [numeric(), between(1, 120)],
      },
    };
  },
  methods: {
    loadMaterialIntoForm() {
      this.form.name = this.material.name;
      this.form.level = this.material.level;

      this.form.artefacts = this.$store.getters['relations/artefacts'](this.material).map(artefact => artefact.ID);
      this.form.excavations = this.$store.getters['relations/excavations'](this.material).map(excavation => excavation.ID);
    },
    save() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const isNameDiff = this.material.name !== this.form.name;

      this.updateRelatedArtefacts();
      this.updateRelatedExcavations();

      this.materialToUpdate.name = this.form.name;
      this.materialToUpdate.level = this.form.level;

      this.$store.dispatch('materials/update', this.materialToUpdate).then(() => {
        this.isOpen = false;

        if (isNameDiff) {
          this.$router.push({ name: 'material-details', params: { slug: this.materialToUpdate.slug() } });
        }
      });
    },
    updateRelatedArtefacts() {
      const before = this.$store.getters['relations/artefacts'](this.material).map(art => art.ID);
      const after = this.form.artefacts;

      const removedIDs = before.filter(i => !after.includes(i));
      const addedIDs = after.filter(i => !before.includes(i));

      const removedArtefacts = this.$store.state.artefacts.all.filter(art => removedIDs.includes(art.ID));
      const addedArtefacts = this.$store.state.artefacts.all.filter(art => addedIDs.includes(art.ID));

      removedArtefacts.forEach(artefact => this.$store.dispatch('relations/detach', [artefact, this.material]));
      addedArtefacts.forEach(artefact => this.$store.dispatch('relations/attach', [artefact, this.material]));
    },
    updateRelatedExcavations() {
      const before = this.$store.getters['relations/excavations'](this.material).map(art => art.ID);
      const after = this.form.excavations;

      const removedIDs = before.filter(i => !after.includes(i));
      const addedIDs = after.filter(i => !before.includes(i));

      const removedExcavations = this.$store.state.excavations.all.filter(art => removedIDs.includes(art.ID));
      const addedExcavations = this.$store.state.excavations.all.filter(art => addedIDs.includes(art.ID));

      removedExcavations.forEach(excavation => this.$store.dispatch('relations/detach', [excavation, this.material]));
      addedExcavations.forEach(excavation => this.$store.dispatch('relations/attach', [excavation, this.material]));
    },
  },
  props: {
    material: {
      type: Material,
      required: true,
    },
  },
  created() {
    EventBus.$on('materials.dialogs.edit.open', () => this.isOpen = true);
    EventBus.$on('materials.dialogs.edit.hide', () => this.isOpen = false);

    this.materialToUpdate = this.material;
    this.loadMaterialIntoForm();
  },
  computed: {
    artefacts() {
      return this.$store.state.artefacts.all.map(autocompleteMapper);
    },
    excavations() {
      return this.$store.state.excavations.all.map(autocompleteMapper);
    }
  }
}
</script>

<style>
</style>
