<template>
  <v-container>
    <h1>Collections</h1>

    <v-btn fab fixed bottom right dark color="amber" v-on:click="openCreateDialog()">
      <v-icon>add</v-icon>
    </v-btn>

    <app-create-collection-dialog></app-create-collection-dialog>

    <v-row>
      <v-col
        v-for="(collection, i) in this.$store.state.collections.all"
        cols="3"
        :key="i"
        class="overview-column"
      >
        <v-hover v-slot:default="{ hover }">
          <v-card
            v-on:click="detailView(collection)"
            class="overview-card"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <v-card-title>{{ collection.name }}</v-card-title>
            <v-card-text>
              <div>NPC: {{ collection.NPCName }}</div>
              <div>Rewards: {{ collection.rewards }}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EventBus from '@/eventbus';
import AppCreateCollectionDialog from '@/components/CreateCollectionDialog';

export default {
  components: {
    AppCreateCollectionDialog
  },
  methods: {
    detailView(collection) {
      this.$router.push({ name: 'collection-details', params: { slug: collection.slug() } });
    },
    openCreateDialog() {
      EventBus.$emit('collections.dialogs.create.open');
    },
  }
}
</script>

<style>
</style>
