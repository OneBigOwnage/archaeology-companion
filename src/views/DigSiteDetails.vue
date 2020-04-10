<template>
  <v-container>

    <v-btn outlined color="amber accent-4" to="/dig-sites">
      <v-icon left>mdi-chevron-left</v-icon>To overview
    </v-btn>

    <app-loader v-if="!digSite"></app-loader>

    <v-container v-else>
      <app-edit-dig-site-dialog :digSite="digSite"></app-edit-dig-site-dialog>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-card-title>{{ digSite.name }}</v-card-title>
            <v-card-text>
              <span class="font-weight-medium">Level:</span>
              {{ digSite.level }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="openEditDialog()">
                <v-icon color="amber">edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-card-title>Excavations</v-card-title>
            <v-card-text>
              <div v-for="excavation in excavations" :key="excavation.ID">
                {{ excavation.name }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
import EventBus from '@/eventbus';

export default {
  data() {
    return {
      digSite: null,
    };
  },
  mounted() {
    this.loadDigSite();
  },
  methods: {
    loadDigSite() {
      const slug = this.$route.params.slug;

      this.digSite = this.$store.getters['digSites/bySlug'](slug);
    },
    openEditDialog() {
      EventBus.$emit('dig-sites.dialogs.edit.open');
    },
  },
  computed: {
    excavations() {
      if (!this.digSite) {
        return [];
      }

      return this.$store.getters['relations/excavations'](this.digSite);
    },
  }
}
</script>

<style>
</style>
