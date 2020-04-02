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
        const index = state.all.findIndex(material => material.name === updatedMaterial.name);
        state.all[index] = updatedMaterial;
    },
};

const actions = {
    add({ commit }, material) {
        commit('add', material);
    },
    update({ commit }, updatedMaterial) {
        commit('update', updatedMaterial);
    },
};

export default {
    namespaced: true,
    state: initial(),
    getters,
    actions,
    mutations,
};
