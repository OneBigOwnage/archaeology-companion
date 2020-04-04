import NotAModelError from '@/store/relations/NotAModelError';
import Model from '@/models/model';
import Relation from '@/models/relation';
import { toCamelCase } from '@/helpers';

const getStateKey = args => {
  let parts = args
    .map(entity => toCamelCase(entity.constructor.name))
    .map(entity => entity + 's');

  parts.sort();

  return parts.join('_');
};

const throwErrorIfNotModel = args => {
  const [first, second] = args;

  if (!(first instanceof Model) || !(second instanceof Model)) {
    console.error(first, second);
    throw new NotAModelError();
  }
};

const alphabeticalSort = (a, b) => {
  if (a.constructor.name > b.constructor.name) {
    return 1;
  }

  if (a.constructor.name < b.constructor.name) {
    return -1;
  }

  return 0;
};

const initial = () => {
  return {
    artefacts_materials: [],
    artefacts_collections: [],
    digSites_excavations: [],
    digSites_materials: [],
    excavations_materials: [],
  };
};

const getters = {

};

const mutations = {
  attach(state, transferObj) {
    state[transferObj.key].push(
      new Relation(transferObj.first.ID, transferObj.second.ID)
    );
  },
  detach(state, transferObj) {
    state[transferObj.key] = state[transferObj.key].filter(
      relation => relation.firstID !== transferObj.first.ID
        && relation.secondID !== transferObj.second.ID
    );
  },
  reset(state) {
    Object.assign(state, initial());
  },
};

const actions = {
  attach({ commit, state }, args) {
    throwErrorIfNotModel(args);

    const key = getStateKey(args);

    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      console.error(`[${key}] is not a valid state key.`);
    }

    args.sort(alphabeticalSort);

    commit('attach', { key, first: args[0], second: args[1]});
  },
  detach({ commit, state }, args) {
    throwErrorIfNotModel(args);

    const key = getStateKey(args);

    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      console.error(`[${key}] is not a valid state key.`);
    }

    commit('detach', { key, first: args[0], second: args[1]});
  },
  reset({ commit }) {
    commit('reset');
  }
};

export default {
  namespaced: true,
  state: initial(),
  getters,
  mutations,
  actions,
};
