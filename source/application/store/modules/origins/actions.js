import * as types from './../../mutation-types'

// Datacenter
export default {
    // Singleton Actions
    setOrigin({ commit }, singleton) {
        commit(types.SET_ORIGIN, singleton)
    },

    setOriginHealth({ commit }, data) {
        commit(types.SET_ORIGIN_HEALTH, data)
    },

    setOriginTargets({ commit }, collection) {
        commit(types.SET_ORIGIN_TARGETS, collection)
    },

    // Collection Actions
    setOrigins({ commit }, collection) {
        commit(types.SET_ORIGINS, collection)
    },

    setOriginsHealth({ commit }, healths) {
        commit(types.SET_ORIGINS_HEALTH, healths)
    }
}
