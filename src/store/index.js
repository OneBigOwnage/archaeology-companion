import Vue from 'vue'
import Vuex from 'vuex'
import materials from './materials';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    materials,
  },
});
