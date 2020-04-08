const initial = () => {
    return {
        all: [],
    };
};

const getters = {
    bySlug: state => slug => {
        return state.all.find(material => material.slug() === slug);
    },
};

const mutations = {
    add(state, material) {
        state.all.push(material)
    },
    update(state, updatedMaterial) {
        const index = state.all.findIndex(material => material.ID === updatedMaterial.ID);
        state.all[index] = updatedMaterial;
    },
    reset(state) {
        Object.assign(state, initial());
    },
};

const actions = {
    add({ commit }, material) {
        commit('add', material);
    },
    update({ commit }, updatedMaterial) {
        commit('update', updatedMaterial);
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
