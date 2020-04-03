<template>
  <v-container fluid>
    <h1>Artefacts</h1>

    <v-row>
      <v-col v-for="(artefact, i) in this.$store.state.artefacts.all" :key="i" cols="3">
        <v-hover v-slot:default="{ hover }">
          <v-card v-on:click="detailView(artefact)" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" class="artefact-overview--card">
            <v-card-title>{{ artefact.name }}</v-card-title>
            <v-card-text class="text--primary">

              <div>
                <span class="font-weight-medium">Excavation:</span>
                {{ artefact.excavationSlug }}
              </div>

              <div>
                <span class="font-weight-medium">Experience:</span>
                {{ artefact.xp }}
              </div>

              <div>
                <span class="font-weight-medium">Base chronotes value:</span>
                {{ artefact.chronotes }}
              </div>

            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'ArtefactOverview',
  methods: {
    detailView(artefact) {
      this.$router.push({ name: 'artefact-details', params: {slug: artefact.slug()} });
    }
  }
}
</script>

<style>
.v-card.artefact-overview--card:hover {
  cursor: pointer;
}
</style>
