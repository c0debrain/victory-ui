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
            Vue.$http.defaults.headers.common.Authorization = `JWT ${JSON.parse(localStorage.getItem('token'))}`
        }
    },

    [LOGIN](state, data) {
        state.authenticated = true
        state.user = data.user
        localStorage.setItem('token', JSON.stringify(data.payload))
        localStorage.setItem('user', JSON.stringify(data.user_id))
        Vue.$http.defaults.headers.common.Authorization = `JWT ${data.payload}`
    },

    [LOGOUT](state) {
        state.authenticated = false
        state.user = false
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        Vue.$http.defaults.headers.common.Authorization = ''
    }
}
