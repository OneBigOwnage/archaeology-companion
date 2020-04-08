const initial = () => {
    return {
        all: [],
    };
};

const getters = {
    bySlug: state => slug => {
        return state.all.find(excavation => excavation.slug() === slug);
    }
};

const mutations = {
    add(state, excavation) {
        state.all.push(excavation);
    },
    update(state, updatedExcavation) {
        const index = state.all.findIndex(excavation => excavation.ID === updatedExcavation.ID);
        state.all[index] = updatedExcavation;
    },
    reset(state) {
        Object.assign(state, initial());
    },
};

const actions = {
    add({ commit }, excavation) {
        commit('add', excavation);
    },
    update({ commit }, updatedExcavation) {
        commit('update', updatedExcavation);
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
