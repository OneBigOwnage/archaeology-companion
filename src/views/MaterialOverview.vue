<template>
  <v-container fluid>
    <h1>This is the material overview</h1>

    <v-row>
      <v-col v-for="(material, i) in this.$store.state.materials.all" :key="i" cols="2">
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

    <v-btn v-on:click="add()">Add mats</v-btn>

  </v-container>
</template>

<script>
import Material from './../models/material';

export default {
  name: 'MaterialOverview',
  methods: {
    add() {
      for (let i = 1; i <= 15; i++) {
        this.$store.dispatch('materials/add', new Material('Material ' + i, i));
      }
    },
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
</style>
