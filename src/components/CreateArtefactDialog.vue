<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create new artefact</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.name" outlined label="Artefact name" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.xp" outlined label="Restoration xp" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field v-model="form.chronotes" outlined label="Base chronotes" required></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Excavation"
                  v-model="form.excavationID"
                  outlined
                  :items="excavations"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Collections"
                  deletable-chips
                  small-chips
                  outlined
                  multiple
                  v-model="form.collections"
                  :items="collections"
                  :search-input.sync="collectionSearch"
                  v-on:change="collectionSearch = ''"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-row v-for="(item, index) in form.materials" :key="index">
                  <v-col cols="8">
                    <v-autocomplete
                      label="Material"
                      v-model="form.materials[index].ID"
                      outlined
                      dense
                      :items="materials"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      append-icon="add"
                      class="counter-line-height-fix"
                      v-model="form.materials[index].amount"
                      prepend-inner-icon="remove"
                      outlined
                      dense
                      v-on:click:append="increment(index)"
                      v-on:click:prepend-inner="decrement(index)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn icon color="red" class="mt-1" v-on:click="removeMaterial(index)">
                      <v-icon>delete_forever</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-btn block v-on:click="addMaterial()">+ material</v-btn>
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
import Artefact from '@/models/artefact';
import EventBus from '@/eventbus';
import { autocompleteMapper } from '@/helpers';
import { v4 as uuidv4 } from 'uuid';

export default {
  data() {
    return {
      isOpen: false,
      collectionSearch: '',
      form: {
        name: null,
        xp: null,
        chronotes: null,
        excavationID: null,
        collections: [],
        materials: [],
      },
    };
  },
  methods: {
    save() {
      const artefact = new Artefact(uuidv4(), this.form.name, this.form.xp, this.form.chronotes, this.form.excavationID);

      const materialIDs = this.form.materials.map(obj => obj.ID);
      const materials = this.$store.state.materials.all.filter(material => materialIDs.includes(material.ID));
      const collections = this.$store.state.collections.all.filter(collection => this.form.collections.includes(collection.ID));

      this.$store.dispatch('artefacts/add', artefact);

      collections.forEach(collection => this.$store.dispatch('relations/attach', [collection, artefact]));
      materials.forEach(material => this.$store.dispatch('relations/attach', [material, artefact]));

      this.form.materials.forEach(obj => {
        this.$store.dispatch('relations/setPivotProps', {
          stateKey: 'artefacts_materials',
          firstID: artefact.ID,
          secondID: obj.ID,
          props: { amount: obj.amount },
        });
      });

      this.$router.push(artefact.route());
    },
    increment(index) {
      this.form.materials[index].amount++;
    },
    decrement(index) {
      this.form.materials[index].amount--;
    },
    addMaterial() {
      this.form.materials.push({ ID: null, amount: 0 });
    },
    removeMaterial(index) {
      this.form.materials.splice(index, 1);
    },
  },
  computed: {
    materials() {
      return this.$store.state.materials.all.map(autocompleteMapper);
    },
    excavations() {
      return this.$store.state.excavations.all.map(autocompleteMapper);
    },
    collections() {
      return this.$store.state.collections.all.map(autocompleteMapper);
    },
  },
  created() {
    EventBus.$on('artefacts.dialogs.create.open', () => this.isOpen = true);
    EventBus.$on('artefacts.dialogs.create.hide', () => this.isOpen = false);
  },
}
</script>

<style>
</style>
