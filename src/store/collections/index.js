const initial = () => {
    return {
        all: [],
    };
};

const getters = {
    bySlug: state => slug => {
        return state.all.find(collection => collection.slug() === slug);
    }
};

const mutations = {
    add(state, collection) {
        state.all.push(collection);
    },
    update(state, updatedCollection) {
        const index = state.all.findIndex(collection => collection.name === updatedCollection.name);
        state.all[index] = updatedCollection;
    },
};

const actions = {
    add({ commit }, collection) {
        commit('add', collection);
    },
    update({ commit }, updatedCollection) {
        commit('update', updatedCollection);
    },
};

export default {
    namespaced: true,
    state: initial(),
    getters,
    actions,
    mutations,
};
