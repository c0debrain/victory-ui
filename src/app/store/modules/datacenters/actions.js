import * as types from './../../mutation-types'

// Datacenter
export default {
    getDatacenter({ commit }, datacenter) {
        commit(types.SET_DATACENTER, datacenter)
    },

    getDatacenters({ commit }, datacenters) {
        commit(types.SET_DATACENTERS, datacenters)
    }
}
