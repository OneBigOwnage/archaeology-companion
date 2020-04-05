import actions from '@/store/relations/actions';
import mutations from '@/store/relations/mutations';
import getters from '@/store/relations/getters';

export const initial = () => {
  return {
    artefacts_materials: [],
    artefacts_collections: [],
    excavations_materials: [],
  };
};


export default {
  namespaced: true,
  state: initial(),
  getters,
  mutations,
  actions,
};
