export default {
    namespaced: true,
    state: {
        token: null,
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
        },
    }
};
