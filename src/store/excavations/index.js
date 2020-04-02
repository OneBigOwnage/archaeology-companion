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
        const index = state.all.findIndex(excavation => excavation.name === updatedExcavation.name);
        state.all[index] = updatedExcavation;
    },
};

const actions = {
    add({ commit }, excavation) {
        commit('add', excavation);
    },
    update({ commit }, updatedExcavation) {
        commit('update', updatedExcavation);
    },
};

export default {
    namespaced: true,
    state: initial(),
    getters,
    actions,
    mutations,
};