<template>
  <v-container>

    <v-btn outlined color="amber accent-4" to="/dig-sites">
      <v-icon left>mdi-chevron-left</v-icon>To overview
    </v-btn>

    <app-loader v-if="!digSite"></app-loader>

    <v-container v-else>
      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-card-title>{{ digSite.name }}</v-card-title>
            <v-card-text>
              <span class="font-weight-medium">Level:</span>
              {{ digSite.level }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col xs="12" lg="6">
          <v-card outlined>
            <v-card-title>Excavations</v-card-title>
            <v-card-text>
              <div v-for="(excavation, i) in excavations" :key="i">
                {{ excavation }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script>
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
    }
  },
  computed: {
    excavations() {
      if (!this.digSite) {
        return [];
      }

      return ['Remains', 'Sacrificial altar'];
    },
  }
}
</script>

<style>
</style>
