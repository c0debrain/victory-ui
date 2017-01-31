import Vue from 'vue'
import {
    SET_DATACENTER,
    SET_DATACENTER_HEALTH,
    SET_DATACENTER_CLUSTERS,
    SET_DATACENTERS,
    SET_DATACENTERS_HEALTH
} from './../../mutation-types'

export default {
    // Singleton Mutations
    [SET_DATACENTER](state, singleton) {
        Vue.set(state.all, singleton.id, singleton)
    },

    [SET_DATACENTER_HEALTH](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                health: data.health
            }))
        } else {
            console.warn('Trying to set health for non-existant resource: ', data)
        }
    },

    [SET_DATACENTER_CLUSTERS](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                clusters: data.collection.map(singleton => singleton.id)
            }))
        } else {
            console.warn('Trying to set clusters for non-existant resource: ', data)
        }
    },

    // Collection Mutations
    [SET_DATACENTERS](state, collection) {
        collection.forEach((singleton) => {
            Vue.set(state.all, singleton.id, singleton)
        })
    },

    [SET_DATACENTERS_HEALTH](state, healths) {
        healths.forEach((entry) => {
            if (state.all[entry.id]) {
                Vue.set(state.all, entry.id, Object.assign(state.all[entry.id], {
                    health: entry.health
                }))
            } else {
                console.warn('Trying to set health for non-existant resource: ', entry)
            }
        })
    }
}
