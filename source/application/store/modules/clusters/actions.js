import * as types from './../../mutation-types'

// Datacenter
export default {
    // Singleton Actions
    setCluster({ commit }, singleton) {
        commit(types.SET_CLUSTER, singleton)
    },

    setClusterHealth({ commit }, health) {
        commit(types.SET_CLUSTER_HEALTH, health)
    },

    // Collection Actions
    setClusters({ commit }, collection) {
        commit(types.SET_CLUSTERS, collection)
    },

    setClustersHealth({ commit }, healths) {
        commit(types.SET_CLUSTERS_HEALTH, healths)
    }
}
