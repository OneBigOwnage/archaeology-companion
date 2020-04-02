<template>
  <v-app id="archaeology-companion">

    <layout>
      <v-content>
        <v-container fluid class="grey lighten-4 fill-height align-start">

          <router-view></router-view>

        </v-container>
      </v-content>
    </layout>

  </v-app>
</template>

<script>
  import Layout from '@/components/Layout.vue';

  export default {
    components: {
      'layout': Layout
    }
  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
