<template>
  <v-container>
    <v-dialog v-model="isOpen" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card tile>
        <v-toolbar dark tile color="amber">
          <v-btn icon dark v-on:click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Edit excavation: {{ excavation.name }}</v-toolbar-title>
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
                <v-text-field
                  v-model="form.level"
                  outlined
                  label="Skill level requirement"
                  required
                ></v-text-field>
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
                  v-model="form.materials"
                  deletable-chips
                  small-chips
                  outlined
                  multiple
                  :items="materials"
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

export default {
  data() {
    return {
      excavationToUpdate: null,
      isOpen: false,
      form: {
        name: null,
        level: null,
        digSiteID: null,
        materials: null,
      },
    };
  },
  methods: {
    loadExcavationIntoForm() {
      this.form.name = this.excavation.name;
      this.form.level = this.excavation.level;
      this.form.digSiteID = this.excavation.digSiteID;

      this.form.materials = this.$store.getters['relations/materials'](this.excavation).map(material => material.ID);
    },
    save() {
      const isNameDiff = this.excavation.name !== this.form.name;

      this.updateRelatedMaterials();

      this.excavationToUpdate.name = this.form.name;
      this.excavationToUpdate.level = this.form.level;
      this.excavationToUpdate.digSiteID = this.form.digSiteID;

      this.$store.dispatch('excavations/update', this.excavationToUpdate).then(() => {
        this.isOpen = false;

        if (isNameDiff) {
          this.$router.push({ name: 'excavation-details', params: { slug: this.excavationToUpdate.slug() } });
        }
      });
    },
    updateRelatedMaterials() {
      const before = this.$store.getters['relations/materials'](this.excavation).map(art => art.ID);
      const after = this.form.materials;

      const removedIDs = before.filter(i => !after.includes(i));
      const addedIDs = after.filter(i => !before.includes(i));

      const removedMaterials = this.$store.state.materials.all.filter(art => removedIDs.includes(art.ID));
      const addedMaterials = this.$store.state.materials.all.filter(art => addedIDs.includes(art.ID));

      removedMaterials.forEach(material => this.$store.dispatch('relations/detach', [material, this.excavation]));
      addedMaterials.forEach(material => this.$store.dispatch('relations/attach', [material, this.excavation]));
    },
  },
  props: {
    excavation: {
      type: Excavation,
      required: true,
    },
  },
  created() {
    EventBus.$on('excavations.dialogs.edit.open', () => this.isOpen = true);
    EventBus.$on('excavations.dialogs.edit.hide', () => this.isOpen = false);

    this.excavationToUpdate = this.excavation;
    this.loadExcavationIntoForm();
  },
  computed: {
    materials() {
      return this.$store.state.materials.all.map(autocompleteMapper);
    },
    digSites() {
      return this.$store.state.digSites.all.map(autocompleteMapper);
    },
  },
}
</script>

<style>
</style>
