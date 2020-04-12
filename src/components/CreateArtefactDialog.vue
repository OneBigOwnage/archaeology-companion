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
          <v-form v-model="isFormValid" ref="form">
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Artefact name"
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
                  label="Restoration xp"
                  required
                  v-model="form.xp"
                  :rules="rules.xp"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Base chronotes"
                  required
                  v-model="form.chronotes"
                  :rules="rules.chronotes"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-autocomplete
                  label="Excavation"
                  outlined
                  v-model="form.excavationID"
                  :rules="rules.excavationID"
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
                <span class="subtitle-1">Materials</span>
                <v-row v-for="(item, index) in form.materials" :key="index">
                  <v-col cols="8">
                    <v-autocomplete
                      label="Material"
                      outlined
                      dense
                      v-model="form.materials[index].ID"
                      :items="materials"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      append-icon="add"
                      class="counter-line-height-fix"
                      prepend-inner-icon="remove"
                      outlined
                      label="Amount"
                      dense
                      v-model="form.materials[index].amount"
                      v-on:click:append="increment(index)"
                      v-on:click:prepend-inner="decrement(index)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn icon color="red" class="mt-1" v-on:click="removeMaterial(index)">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-btn block v-on:click="addMaterial()">
                  <v-icon>add</v-icon>&nbsp;Material
                </v-btn>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col sm="12" lg="4">
                <span class="subtitle-1">Additional items</span>

                <v-row v-for="(item, index) in form.additionalItems" :key="index">
                  <v-col cols="8">
                    <v-text-field
                      outlined
                      dense
                      label="Item name"
                      v-model="form.additionalItems[index].name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      append-icon="add"
                      class="counter-line-height-fix"
                      prepend-inner-icon="remove"
                      outlined
                      dense
                      v-model="form.additionalItems[index].amount"
                      v-on:click:append="incrementItem(index)"
                      v-on:click:prepend-inner="decrementItem(index)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn icon color="red" class="mt-1" v-on:click="removeAdditionalItem(index)">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-btn block v-on:click="addAdditionalItem()">
                  <v-icon>add</v-icon>&nbsp;Item
                </v-btn>
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
import { required, numeric, positive } from '@/validationrules';

export default {
  data() {
    return {
      isOpen: false,
      isFormValid: false,
      collectionSearch: '',
      form: {
        name: null,
        xp: null,
        chronotes: null,
        excavationID: null,
        collections: [],
        materials: [],
        additionalItems: [],
      },
      rules: {
        name: [required()],
        xp: [required(), numeric(), positive()],
        chronotes: [required(), numeric(), positive()],
        excavationID: [required()],
      },
    };
  },
  methods: {
    save() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const artefact = new Artefact(uuidv4(), this.form.name, this.form.xp, this.form.chronotes, this.form.excavationID, this.form.additionalItems);

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
    addAdditionalItem() {
      this.form.additionalItems.push({ name: null, amount: 0 });
    },
    removeAdditionalItem(index) {
      this.form.additionalItems.splice(index, 1);
    },
    incrementItem(index) {
      this.form.additionalItems[index].amount++;
    },
    decrementItem(index) {
      this.form.additionalItems[index].amount--;
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
