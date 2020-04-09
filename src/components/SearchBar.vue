<template>
  <v-row>
    <v-col cols="12">
      <v-autocomplete
        solo-inverted
        flat
        ref="search-input"
        hide-details
        label="Search..."
        prepend-inner-icon="search"
        append-icon
        auto-select-first
        return-object
        item-text="name"
        v-on:focus="performSearch('')"
        v-model="selection"
        :items="items"
        :filter="customFilter"
        :search-input.sync="search"
      >
        <template v-slot:item="{ item }">
          <v-list-item-avatar color="amber" class="headline font-weight-light white--text">
            <v-icon>{{ icon(item) }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.constructor.name"></v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <template v-slot:no-data>
          <template v-if="!search">
            <v-list-item>
              <v-list-item-title class="font-italic">Start typing to search...</v-list-item-title>
            </v-list-item>
          </template>

          <template v-else>
            <v-list-item>
              <v-list-item-title class="font-italic">No results were found for "{{ search }}"</v-list-item-title>
            </v-list-item>
          </template>
        </template>
      </v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import Artefact from '@/models/artefact';
import Excavation from '@/models/excavation';
import DigSite from '@/models/digsite';
import Material from '@/models/material';
import Collection from '@/models/collection';
import { sortByProperty, createFuzzyMatcher } from '@/helpers';

export default {
  data() {
    return {
      selection: '',
      search: null,
      items: [],
      allItems: [],
    };
  },
  methods: {
    icon(model) {
      switch (model.constructor.name) {
        case Artefact.name: return 'gradient';
        case Excavation.name: return 'gavel';
        case DigSite.name: return 'account_balance';
        case Material.name: return 'category';
        case Collection.name: return 'view_quilt';

        default: return 'help';
      }
    },
    getRoute(model) {
      const params = { slug: model.slug() };

      switch (model.constructor.name) {
        case Artefact.name: return { name: 'artefact-details', params };
        case Excavation.name: return { name: 'excavation-details', params };
        case DigSite.name: return { name: 'dig-site-details', params };
        case Material.name: return { name: 'material-details', params };
        case Collection.name: return { name: 'collection-details', params };

        default: throw new Error('Cannot route to the given model');
      }
    },
    performSearch(searchTerm) {
      searchTerm = (searchTerm || '').toLowerCase();

      const fuzzyMatcher = createFuzzyMatcher(searchTerm);

      this.items = this.allItems.filter(model => fuzzyMatcher.test(model.name.toLowerCase()));
    },
    customFilter(model, searchTerm) {
      searchTerm = (searchTerm || '').toLowerCase();

      return createFuzzyMatcher(searchTerm).test(model.name.toLowerCase());
    },
  },
  watch: {
    selection(selectedModel) {
      if (!selectedModel) {
        return;
      }

      const route = this.getRoute(selectedModel);

      const hasRouteChanged = route.name !== this.$route.name && route.params.slug !== this.$route.params.slug;

      if (hasRouteChanged) {
        this.$router.push(route);
      }
    },
    search(newVal) {
      this.performSearch(newVal);
    },
  },
  created() {
    this.allItems = []
      .concat(this.$store.state.materials.all)
      .concat(this.$store.state.artefacts.all)
      .concat(this.$store.state.collections.all)
      .concat(this.$store.state.excavations.all)
      .concat(this.$store.state.digSites.all)
      .sort(sortByProperty('name'));
  },
}
</script>

<style>
</style>
