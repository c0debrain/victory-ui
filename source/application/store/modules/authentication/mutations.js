import Vue from 'vue'
import {
    LOGOUT,
    CHECK_AUTHENTICATION,
    LOGIN
} from './../../mutation-types'

export default {
    [CHECK_AUTHENTICATION](state) {
        state.authenticated = !!localStorage.getItem('token')
        if (state.authenticated) {
            Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token.auth_token')}`
        }
    },

    [LOGIN](state, data) {
        state.authenticated = true
        state.user = data.user
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.user)
        Vue.$http.defaults.headers.common.Authorization = `Bearer ${data.token}`
    },

    [LOGOUT](state) {
        state.authenticated = false
        state.user = false
        localStorage.removeItem('id_token')
        localStorage.removeItem('user')
        Vue.$http.defaults.headers.common.Authorization = ''
    }
}
