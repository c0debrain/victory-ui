import Vue from 'vue'
import { SET_DATACENTER, SET_DATACENTERS } from './../../mutation-types'

export default {
    [SET_DATACENTER](state, datacenter) {
        Vue.set(state.all, datacenter.id, datacenter)
    },

    [SET_DATACENTERS](state, datacenters) {
        datacenters.forEach((datacenter) => {
            Vue.set(state.all, datacenter.id, datacenter)
        })
    }
}
