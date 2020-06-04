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
    delete(state, artefactToDelete) {
        state.all = state.all.filter(artefact => artefact.ID !== artefactToDelete.ID);
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
    delete({ commit }, artefactToDelete) {
        commit('delete', artefactToDelete);
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
