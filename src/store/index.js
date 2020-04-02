import Vue from 'vue'
import Vuex from 'vuex'
import materials from './materials';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const persistence = new VuexPersistence({
  storage: window.localStorage
}).plugin;

export default new Vuex.Store({
  modules: {
    materials,
  },
  plugins: [persistence]
});
