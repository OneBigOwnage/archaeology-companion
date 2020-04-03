<template>
  <v-container fluid>
    <h1>Materials</h1>

    <v-row>
      <v-col v-for="(material, i) in this.$store.state.materials.all" :key="i" cols="2" class="items-column">
        <v-hover v-slot:default="{ hover }">
          <v-card v-on:click="detailView(material)" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" class="material-overview--card">
            <v-card-title>{{ material.name }}</v-card-title>
            <v-card-text class="text--primary">
              <div>Level: {{ material.level }}</div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'MaterialOverview',
  methods: {
    detailView(material) {
      this.$router.push({ name: 'material-details', params: {slug: material.slug()} });
    }
  }
}
</script>

<style>
.v-card.material-overview--card:hover {
  cursor: pointer;
}

.v-card.material-overview--card {
  height: 100%;
}

.v-col.items-column {
  align-items: stretch;
}
</style>
