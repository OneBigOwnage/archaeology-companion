const initial = () => {
    return {
        all: [],
    };
};

const getters = {
    bySlug: (state) => slug => {
        return state.items.find(artefact => artefact.slug() === slug);
    }
};

const mutations = {
    add(state, artefact) {
        state.items.push(artefact);
    },
    update(state, updatedArtefact) {
        const index = state.items.findIndex(artefact => artefact.name === updatedArtefact.name);
        state.items[index] = updatedArtefact;
    },
};

const actions = {
    add({ commit }, artefact) {
        commit('add', artefact);
    },
    update({ commit }, updatedArtefact) {
        commit('update', updatedArtefact);
    }
};

export default {
    namespaced: true,
    state: initial(),
    getters,
    actions,
    mutations,
};
