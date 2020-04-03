const initial = () => {
    return {
        all: [],
    };
};

const getters = {
    bySlug: state => slug => {
        return state.all.find(digSite => digSite.slug() === slug);
    }
};

const mutations = {
    add(state, digSite) {
        state.all.push(digSite);
    },
    update(state, updatedDigSite) {
        const index = state.all.findIndex(digSite => digSite.name === updatedDigSite.name);
        state.all[index] = updatedDigSite;
    },
    reset(state) {
        Object.assign(state, initial());
    },
};

const actions = {
    add({ commit }, digSite) {
        commit('add', digSite);
    },
    update({ commit }, updatedDigSite) {
        commit('update', updatedDigSite);
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
