<template>
  <v-app id="archaeology-companion">
    <v-app-bar app clipped-left color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <span class="title ml-3 mr-5">
        Archaeology
        <span class="font-weight-light">companion</span>
      </span>

      <app-search-bar></app-search-bar>

      <v-spacer />

      <v-btn v-on:click="seed()">
        <v-icon style="margin-right: .3rem">refresh</v-icon>Re-seed
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
      <v-list nav class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-list-item :key="i" link :to="item.route">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text text--darken-1">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <slot></slot>
  </v-app>
</template>

<script>
import Seeder from '@/seeder';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    items: [
      { text: 'Materials', icon: 'category', route: '/materials' },
      { text: 'Artefacts', icon: 'gradient', route: '/artefacts' },
      { text: 'Dig sites', icon: 'account_balance', route: '/dig-sites' },
      { text: 'Excavations', icon: 'gavel', route: '/excavations' },
      { text: 'Collections', icon: 'view_quilt', route: '/collections' },
    ],
  }),
  methods: {
    seed() {
      const seeder = new Seeder(this.$store);
      seeder.seed();
    }
  }
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
