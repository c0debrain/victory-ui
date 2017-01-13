import * as types from './../../mutation-types'

// Datacenter
export default {
    getDatacenter({ commit }, datacenter) {
        commit(types.FETCH_DATACENTER, datacenter)
    },

    getDatacenters({ commit }, datacenters) {
        commit(types.FETCH_DATACENTERS, datacenters)
    }
}
