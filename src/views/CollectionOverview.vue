<template>
  <v-container>
    <h1>Collections</h1>

    <v-row>
      <v-col v-for="(collection, i) in this.$store.state.collections.all" cols="3" :key="i" class="overview-column">
        <v-hover v-slot:default="{ hover }">
          <v-card v-on:click="detailView(collection)" class="overview-card" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
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
export default {
  methods: {
    detailView(collection) {
      this.$router.push({ name: 'collection-details', params: { slug: collection.slug() } });
    }
  }
}
</script>

<style>
</style>
