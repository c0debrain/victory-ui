import * as types from './../../mutation-types'

// Auth
export default {
    login({ commit }, token) {
        commit(types.LOGIN, token)
    },

    logout({ commit }) {
        commit(types.LOGOUT)
    },

    checkAuthentication({ commit }) {
        commit(types.CHECK_AUTHENTICATION)
    }
}
