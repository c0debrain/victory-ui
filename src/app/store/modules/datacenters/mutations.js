import Vue from 'vue'
import {
    SET_DATACENTER,
    SET_DATACENTERS,
    SET_HEALTH,
    SET_HEALTHS
} from './../../mutation-types'

export default {
    [SET_DATACENTER](state, datacenter) {
        Vue.set(state.all, datacenter.id, datacenter)
    },

    [SET_DATACENTERS](state, datacenters) {
        datacenters.forEach((datacenter) => {
            Vue.set(state.all, datacenter.id, datacenter)
        })
    },

    [SET_HEALTH](state, health) {
        Vue.set(state.all, health.id, Object.assign(state.all[health.id], {
            health: health.percent
        }))
    },

    [SET_HEALTHS](state, healths) {
        healths.forEach((health) => {
            Vue.set(state.all, health.id, Object.assign(state.all[health.id], {
                health: health.percent
            }))
        })
    }
}
