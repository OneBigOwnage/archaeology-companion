<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create new excavation</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form v-model="isFormValid" ref="form">
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Excavation name"
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
                  label="Level requirement"
                  required
                  v-model="form.level"
                  :rules="rules.level"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Dig site"
                  outlined
                  v-model="form.digSiteID"
                  :items="digSites"
                  :rules="rules.digSiteID"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Materials"
                  deletable-chips
                  small-chips
                  outlined
                  multiple
                  v-model="form.materials"
                  :items="materials"
                  :search-input.sync="materialSearch"
                  v-on:change="materialSearch = ''"
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
import Excavation from '@/models/excavation';
import EventBus from '@/eventbus';
import { autocompleteMapper } from '@/helpers';
import { v4 as uuidv4 } from 'uuid';
import { required, numeric, between } from '@/validationrules';

export default {
  data() {
    return {
      isOpen: false,
      materialSearch: '',
      isFormValid: false,
      form: {
        name: null,
        level: null,
        digSiteID: null,
        materials: [],
      },
      rules: {
        name: [required()],
        level: [required(), numeric(), between(1, 120)],
        digSiteID: [required()],
      },
    };
  },
  methods: {
    save() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const excavation = new Excavation(uuidv4(), this.form.name, this.form.level, this.form.digSiteID);

      const materials = this.$store.state.materials.all.filter(material => this.form.materials.includes(material.ID));

      this.$store.dispatch('excavations/add', excavation);

      materials.forEach(material => this.$store.dispatch('relations/attach', [excavation, material]));

      this.$router.push(excavation.route());
    },
  },
  computed: {
    materials() {
      return this.$store.state.materials.all.map(autocompleteMapper);
    },
    digSites() {
      return this.$store.state.digSites.all.map(autocompleteMapper);
    },
  },
  created() {
    EventBus.$on('excavations.dialogs.create.open', () => this.isOpen = true);
    EventBus.$on('excavations.dialogs.create.hide', () => this.isOpen = false);
  },
}
</script>

<style>
</style>
