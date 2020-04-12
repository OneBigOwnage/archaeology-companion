<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit artefact: {{ artefact.name }}</v-toolbar-title>
        </v-toolbar>

        <v-container>
          <v-form v-model="isFormValid" ref="form">
            <v-row justify="center">
              <v-col sm="12" lg="4">
                <v-text-field
                  outlined
                  label="Artefact name"
                  required
                  :rules="rules.name"
                  v-model="form.name"
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
                  v-model="form.excavationID"
                  outlined
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
                      label="Amount"
                      class="counter-line-height-fix"
                      prepend-inner-icon="remove"
                      outlined
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
import { required, numeric, positive } from '@/validationrules';

export default {
  data() {
    return {
      artefactToUpdate: null,
      isFormValid: false,
      isOpen: false,
      form: {
        name: null,
        xp: null,
        chronotes: null,
        excavationID: null,
        materials: [],
        collections: null,
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
    loadArtefactIntoForm() {
      this.form.name = this.artefact.name;
      this.form.xp = this.artefact.xp;
      this.form.chronotes = this.artefact.chronotes;
      this.form.excavationID = this.artefact.excavationID;
      this.form.additionalItems = this.artefact.additionalItems;

      this.form.materials = this.$store.getters['relations/materials'](this.artefact).map(material => {
        const getByArgs = { stateKey: 'artefacts_materials', firstID: this.artefact.ID, secondID: material.ID };
        const pivot = this.$store.getters['relations/pivotProps'](getByArgs);

        let amount = 0;

        if (pivot && Object.prototype.hasOwnProperty.call(pivot, 'amount')) {
          amount = pivot.amount;
        }

        return { ID: material.ID, amount };
      });

      this.form.collections = this.$store.getters['relations/collections'](this.artefact).map(collection => collection.ID);
    },
    save() {
      this.$refs.form.validate();

      if (!this.isFormValid) {
        return;
      }

      const isNameDiff = this.artefact.name !== this.form.name;

      this.updateRelatedMaterials();
      this.updateRelatedCollections();

      this.artefactToUpdate.name = this.form.name;
      this.artefactToUpdate.xp = this.form.xp;
      this.artefactToUpdate.chronotes = this.form.chronotes;
      this.artefactToUpdate.excavationID = this.form.excavationID;
      this.artefactToUpdate.additionalItems = this.form.additionalItems;

      this.$store.dispatch('artefacts/update', this.artefactToUpdate).then(() => {
        this.isOpen = false;

        if (isNameDiff) {
          this.$router.push({ name: 'artefact-details', params: { slug: this.artefactToUpdate.slug() } });
        }
      });
    },
    updateRelatedMaterials() {
      // Attach detach artefacts & materials.
      const before = this.$store.getters['relations/materials'](this.artefact).map(material => material.ID);
      const after = this.form.materials.map(material => material.ID);

      const removedIDs = before.filter(i => !after.includes(i));
      const addedIDs = after.filter(i => !before.includes(i));

      const removedMaterials = this.$store.state.materials.all.filter(material => removedIDs.includes(material.ID));
      const addedMaterials = this.$store.state.materials.all.filter(material => addedIDs.includes(material.ID));

      removedMaterials.forEach(material => this.$store.dispatch('relations/detach', [material, this.artefact]));
      addedMaterials.forEach(material => this.$store.dispatch('relations/attach', [material, this.artefact]));

      // Set pivot props on the relation objects, which are the number of required materials to restore each artefact in this case.
      const relations = this.$store.state.relations.artefacts_materials.filter(relation => relation.firstID === this.artefact.ID);

      relations.forEach(relation => {
        const amount = this.form.materials.find(mat => mat.ID === relation.secondID).amount;

        this.$store.dispatch('relations/setPivotProps', {
          stateKey: 'artefacts_materials',
          firstID: relation.firstID,
          secondID: relation.secondID,
          props: { amount },
        });
      });
    },
    updateRelatedCollections() {
      const before = this.$store.getters['relations/collections'](this.artefact).map(collection => collection.ID);
      const after = this.form.collections;

      const removedIDs = before.filter(i => !after.includes(i));
      const addedIDs = after.filter(i => !before.includes(i));

      const removedCollections = this.$store.state.collections.all.filter(collection => removedIDs.includes(collection.ID));
      const addedCollections = this.$store.state.collections.all.filter(collection => addedIDs.includes(collection.ID));

      removedCollections.forEach(collection => this.$store.dispatch('relations/detach', [collection, this.artefact]));
      addedCollections.forEach(collection => this.$store.dispatch('relations/attach', [collection, this.artefact]));
    },
    increment(index) {
      this.form.materials[index].amount++;
    },
    decrement(index) {
      this.form.materials[index].amount--;
    },
    removeMaterial(index) {
      this.form.materials.splice(index, 1);
    },
    addMaterial() {
      this.form.materials.push({ ID: null, amount: 0 });
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
  props: {
    artefact: {
      type: Artefact,
      required: true,
    },
  },
  created() {
    EventBus.$on('artefacts.dialogs.edit.open', () => this.isOpen = true);
    EventBus.$on('artefacts.dialogs.edit.hide', () => this.isOpen = false);

    this.artefactToUpdate = this.artefact;
    this.loadArtefactIntoForm();
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
}
</script>

<style>
.counter-line-height-fix input {
  padding: 10px 0 5px 0;
}
</style>
