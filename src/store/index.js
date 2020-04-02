import Vue from 'vue'
import Vuex from 'vuex'
import materials from '@/store/materials';
import VuexClassPersistence from 'vuex-class-persist';
import classes from '@/store/classes';

Vue.use(Vuex)

const persistence = new VuexClassPersistence({ storage: window.localStorage }, classes).plugin;

export default new Vuex.Store({
  modules: {
    materials,
  },
  plugins: [persistence]
});
