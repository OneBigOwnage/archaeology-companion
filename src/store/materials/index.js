const initial = {
    items: [],
};

const getters = {
    byID: (state) => ID => {
        return state.items.find(mat => mat.ID === ID);
    },
};

const mutations = {
    add(state, mat) {
        state.items.push(mat)
    },
    update(state, updatedMat) {
        const index = state.items.findIndex(m => m.ID === updatedMat.ID);
        state.items[index] = updatedMat;
    },
    setAll(state, allMats) {
        state.items = allMats;
    }
};

const actions = {
    add({ commit }, mat) {
        commit('add', mat);
    },
    update({ commit }, updatedMat) {
        commit('update', updatedMat);
    },
    setAll({ commit }, allMats) {
        commit('setAll', allMats);
    },
};

export default {
    namespaced: true,
    state: initial,
    getters,
    actions,
    mutations,
};
