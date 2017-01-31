import * as types from './../../mutation-types'

// Datacenter
export default {
    // Singleton Actions
    setClient({ commit }, singleton) {
        commit(types.SET_CLIENT, singleton)
    },

    setClientHealth({ commit }, data) {
        commit(types.SET_CLIENT_HEALTH, data)
    },

    setClientOrigins({ commit }, collection) {
        commit(types.SET_CLIENT_ORIGINS, collection)
    },

    // Collection Actions
    setClients({ commit }, collection) {
        commit(types.SET_CLIENTS, collection)
    },

    setClientsHealth({ commit }, healths) {
        commit(types.SET_CLIENTS_HEALTH, healths)
    }
}
