import Vue from 'vue'
import Vuex from 'vuex'
import materials from '@/store/materials';
import artefacts from '@/store/artefacts';
import excavations from '@/store/excavations';
import digSites from '@/store/dig-sites';
import collections from '@/store/collections';
import relations from '@/store/relations';
import VuexClassPersistence from 'vuex-class-persist';
import classes from '@/store/classes';

Vue.use(Vuex)

const persistence = new VuexClassPersistence({ storage: window.localStorage }, classes).plugin;

export default new Vuex.Store({
  modules: {
    materials,
    artefacts,
    excavations,
    digSites,
    collections,
    relations,
  },
  plugins: [persistence]
});
