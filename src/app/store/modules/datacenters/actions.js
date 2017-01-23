import * as types from './../../mutation-types'

// Datacenter
export default {
    getDatacenter({ commit }, datacenter) {
        commit(types.SET_DATACENTER, datacenter)
    },

    getDatacenters({ commit }, datacenters) {
        commit(types.SET_DATACENTERS, datacenters)
    },

    setHealth({ commit }, health) {
        commit(types.SET_HEALTH, health)
    },

    setHealths({ commit }, healths) {
        commit(types.SET_HEALTHS, healths)
    }
}
