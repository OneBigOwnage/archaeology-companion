<template>
  <v-container fluid>
    <h1>This is the material overview</h1>

    <v-row dense>
      <v-col v-for="(material, i) in this.$store.state.materials.items" :key="i" cols="2">
        <v-card>
          <v-card-title>{{ material.name }}</v-card-title>
          <v-card-text class="text--primary">
            <div>Level: {{ material.level }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-btn v-on:click="add()">Add items</v-btn>

  </v-container>
</template>

<script>
import Material from './../models/material';

export default {
  name: 'MaterialOverview',
  methods: {
    add() {
      this.$store.dispatch('materials/add', new Material('Mat 1', 1));
      this.$store.dispatch('materials/add', new Material('Mat 2', 2));
      this.$store.dispatch('materials/add', new Material('Mat 3', 3));
      this.$store.dispatch('materials/add', new Material('Mat 4', 4));
    }
  }
}
</script>

<style>

</style>
