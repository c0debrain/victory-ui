import * as types from './../../mutation-types'

// Datacenter
export default {
    // Singleton Actions
    setTarget({ commit }, singleton) {
        commit(types.SET_TARGET, singleton)
    },

    setTargetHealth({ commit }, data) {
        commit(types.SET_TARGET_HEALTH, data)
    },

    // Collection Actions
    setTargets({ commit }, collection) {
        commit(types.SET_TARGETS, collection)
    },

    setTargetsHealth({ commit }, healths) {
        commit(types.SET_TARGETS_HEALTH, healths)
    }
}
