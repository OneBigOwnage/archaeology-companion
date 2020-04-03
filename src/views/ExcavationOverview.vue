<template>
  <v-container>
    <h1>Excavations</h1>

    <v-row>
      <v-col v-for="(excavation, i) in this.$store.state.excavations.all" :key="i" cols="3" class="overview-column">
        <v-hover v-slot:default="{ hover }">
          <v-card v-on:click="detailView(excavation)" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" class="overview-card">
            <v-card-title>{{ excavation.name }}</v-card-title>
            <v-card-text>
              Level {{ excavation.level }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ExcavationOverview',
}
</script>

<style>

</style>
