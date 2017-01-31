import * as types from './../../mutation-types'

// Datacenter
export default {
    // Singleton Actions
    setDatacenter({ commit }, singleton) {
        commit(types.SET_DATACENTER, singleton)
    },

    setDatacenterHealth({ commit }, data) {
        commit(types.SET_DATACENTER_HEALTH, data)
    },

    setDatacenterClusters({ commit }, collection) {
        commit(types.SET_DATACENTER_CLUSTERS, collection)
    },

    // Collection Actions
    setDatacenters({ commit }, collection) {
        commit(types.SET_DATACENTERS, collection)
    },

    setDatacentersHealth({ commit }, healths) {
        commit(types.SET_DATACENTERS_HEALTH, healths)
    }
}
