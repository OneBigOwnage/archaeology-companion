const initial = () => {
    return {
        all: [],
    };
};

const getters = {
    bySlug: state => slug => {
        return state.all.find(artefact => artefact.slug() === slug);
    }
};

const mutations = {
    add(state, artefact) {
        state.all.push(artefact);
    },
    update(state, updatedArtefact) {
        const index = state.all.findIndex(artefact => artefact.ID === updatedArtefact.ID);
        state.all[index] = updatedArtefact;
    },
    reset(state) {
        Object.assign(state, initial());
    },
};

const actions = {
    add({ commit }, artefact) {
        commit('add', artefact);
    },
    update({ commit }, updatedArtefact) {
        commit('update', updatedArtefact);
    },
    reset({ commit }) {
        commit('reset');
    },
};

export default {
    namespaced: true,
    state: initial(),
    getters,
    actions,
    mutations,
};
