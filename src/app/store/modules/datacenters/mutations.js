import { FETCH_DATACENTER, FETCH_DATACENTERS } from './../../mutation-types'

export default {
    [FETCH_DATACENTER](state, datacenter) {
        state.all.push(datacenter)
    },

    [FETCH_DATACENTERS](state, datacenters) {
        state.all = datacenters
    }
}
