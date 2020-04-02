<template>
  <v-app id="archaeology-companion">
    <v-app-bar app clipped-left color="amber">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-3 mr-5">Archaeology&nbsp;<span class="font-weight-light">companion</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search..."
        prepend-inner-icon="search"
      />

      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list nav class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-list-item :key="i" link :to="item.route" >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text text--darken-1">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <slot></slot>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { text: 'Materials'  , icon: 'category'       , route: '/materials' },
        { text: 'Artefacts'  , icon: 'gradient'       , route: '/artefacts' },
        { text: 'Dig sites'  , icon: 'account_balance', route: '/dig-sites' },
        { text: 'Excavations', icon: 'gavel'          , route: '/excavations' },
        { text: 'Collections', icon: 'view_quilt'     , route: '/collections' },
      ],
    }),
  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
