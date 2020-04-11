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
          <v-form>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.name" outlined label="Excavation name" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.level" outlined label="Level requirement" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Dig site"
                  v-model="form.digSiteID"
                  outlined
                  :items="digSites"
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

export default {
  data() {
    return {
      isOpen: false,
      materialSearch: '',
      form: {
        name: null,
        level: null,
        digSiteID: null,
        materials: [],
      },
    };
  },
  methods: {
    save() {
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
