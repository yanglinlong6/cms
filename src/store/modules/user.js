import { deleteToken, getToken, saveToken } from '../../utils/token';

export default {
    namespaced: true,
    state: {
        token: getToken(),
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
            saveToken(token);
        },
        delToken(state) {
            state.token = null;
            deleteToken();
        }
    }
};
