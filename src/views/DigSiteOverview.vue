<template>
  <v-container>
    <h1>Dig sites</h1>

    <v-btn fab fixed bottom right dark color="amber" v-on:click="openCreateDialog()">
      <v-icon>add</v-icon>
    </v-btn>

    <app-create-dig-site-dialog></app-create-dig-site-dialog>

    <v-row>
      <v-col
        v-for="(digSite, i) in this.$store.state.digSites.all"
        :key="i"
        cols="2"
        class="overview-column"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            v-on:click="detailView(digSite)"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            class="overview-card"
          >
            <v-card-title>{{ digSite.name }}</v-card-title>
            <v-card-text>Level: {{ digSite.level }}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '@/eventbus';
import AppCreateDigSiteDialog from '@/components/CreateDigSiteDialog';

export default {
    components: {
    AppCreateDigSiteDialog,
  },
  methods: {
    detailView(digSite) {
      this.$router.push({ name: 'dig-site-details', params: { slug: digSite.slug() } });
    },
    openCreateDialog() {
      EventBus.$emit('dig-sites.dialogs.create.open');
    },
  }
}
</script>

<style>
</style>
