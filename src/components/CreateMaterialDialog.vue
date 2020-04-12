<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create new Material</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form v-model="isFormValid" ref="form">
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  v-model="form.name"
                  :rules="rules.name"
                  outlined
                  label="Material name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  v-model="form.level"
                  :rules="rules.level"
                  outlined
                  label="Level requirement"
                  required
                ></v-text-field>
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
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Excavations"
                  deletable-chips
                  small-chips
                  outlined
                  multiple
                  v-model="form.excavations"
                  :items="excavations"
                  :search-input.sync="excavationSearch"
                  v-on:change="excavationSearch = ''"
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
import EventBus from '@/eventbus';
import Material from '@/models/material';
import { autocompleteMapper } from '@/helpers';
import { v4 as uuidv4 } from 'uuid';
import { required, numeric, between } from '@/validationrules';

export default {
  data() {
    return {
      isOpen: false,
      isFormValid: false,
      excavationSearch: '',
      artefactSearch: '',
      form: {
        name: null,
        level: null,
        artefacts: [],
        excavations: [],
      },
      rules: {
        name: [required()],
        level: [numeric(), between(1, 120)],
      },
    };
  },
  methods: {
    save() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const material = new Material(uuidv4(), this.form.name, this.form.level);

      const excavations = this.$store.state.excavations.all.filter(excavation => this.form.excavations.includes(excavation.ID));
      const artefacts = this.$store.state.artefacts.all.filter(artefact => this.form.artefacts.includes(artefact.ID));

      this.$store.dispatch('materials/add', material);

      excavations.forEach(excavation => this.$store.dispatch('relations/attach', [excavation, material]));
      artefacts.forEach(artefact => this.$store.dispatch('relations/attach', [artefact, material]));

      this.$router.push(material.route());
    },
  },
  computed: {
    excavations() {
      return this.$store.state.excavations.all.map(autocompleteMapper);
    },
    artefacts() {
      return this.$store.state.artefacts.all.map(autocompleteMapper);
    },
  },
  created() {
    EventBus.$on('materials.dialogs.create.open', () => this.isOpen = true);
    EventBus.$on('materials.dialogs.create.hide', () => this.isOpen = false);
  },
}
</script>

<style>
</style>
