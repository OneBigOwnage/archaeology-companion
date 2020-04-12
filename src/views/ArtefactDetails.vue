<template>
  <v-container>
    <v-btn outlined color="amber accent-4" to="/artefacts">
      <v-icon left>mdi-chevron-left</v-icon>To overview
    </v-btn>

    <app-loader v-if="!artefact"></app-loader>

    <v-container v-else>
      <app-edit-artefact-dialog v-bind:artefact="artefact"></app-edit-artefact-dialog>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined v-if="artefact">
            <v-toolbar dark flat color="amber darken-2">
              <v-avatar size="36">
                <v-icon>gradient</v-icon>
              </v-avatar>
              <v-toolbar-title class="font-weight-medium">Artefact</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="openEditDialog()">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-title>{{ artefact.name }}</v-card-title>

            <app-card-table :items="table"></app-card-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="3">
          <v-card>
            <v-toolbar dark flat dense color="amber lighten-1">
              <v-toolbar-title>Materials</v-toolbar-title>
            </v-toolbar>
            <v-list dense>
              <v-list-item
                v-for="(material, index) in materials"
                :key="material.ID"
                v-on:click="$router.push(material.route())"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ material.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>x{{ materialAmounts[index] }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col xs="12" lg="3">
          <v-card>
            <v-toolbar dark flat dense color="amber lighten-1">
              <v-toolbar-title>Collections</v-toolbar-title>
            </v-toolbar>
            <v-list dense>
              <v-list-item
                v-for="collection in collections"
                :key="collection.ID"
                v-on:click="$router.push(collection.route())"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ collection.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>{{ collection.NPCName }}</v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import EventBus from '@/eventbus';
import AppEditArtefactDialog from '@/components/EditArtefactDialog';

export default {
  components: {
    AppEditArtefactDialog
  },
  data() {
    return {
      artefact: null,
    };
  },
  mounted() {
    this.loadArtefact();
  },
  methods: {
    loadArtefact() {
      const slug = this.$route.params.slug;

      this.artefact = this.$store.getters['artefacts/bySlug'](slug);
    },
    openEditDialog() {
      EventBus.$emit('artefacts.dialogs.edit.open');
    },
    materialAmount(material) {
      const getterArgs = { stateKey: 'artefacts_materials', firstID: this.artefact.ID, secondID: material.ID };
      const pivot = this.$store.getters['relations/pivotProps'](getterArgs);

      if (pivot && Object.prototype.hasOwnProperty.call(pivot, 'amount')) {
        return pivot.amount;
      }

      return 0;
    },
  },
  computed: {
    materials() {
      if (!this.artefact) {
        return [];
      }

      return this.$store.getters['relations/materials'](this.artefact);
    },
    collections() {
      if (!this.artefact) {
        return [];
      }

      return this.$store.getters['relations/collections'](this.artefact);
    },
    excavation() {
      if (!this.artefact) {
        return [];
      }

      return this.$store.getters['relations/excavation'](this.artefact);
    },
    materialAmounts() {
      return this.materials.map(material => {
        const getterArgs = { stateKey: 'artefacts_materials', firstID: this.artefact.ID, secondID: material.ID };
        const pivot = this.$store.getters['relations/pivotProps'](getterArgs);

        if (pivot && Object.prototype.hasOwnProperty.call(pivot, 'amount')) {
          return pivot.amount;
        }

        return 0;
      });
    },
    table() {
      return [
        { label: 'Excavation', text: this.excavation.name, link: this.$router.resolve(this.excavation.route()).href },
        { label: 'Experience', text: this.artefact.formattedXP() },
        { label: 'Chronotes', text: this.artefact.chronotes },
      ];
    },
  }
}
</script>

<style>
</style>
