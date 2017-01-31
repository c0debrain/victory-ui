import Vue from 'vue'
import {
    SET_CLUSTER,
    SET_CLUSTER_HEALTH,
    SET_CLUSTERS,
    SET_CLUSTERS_HEALTH
} from './../../mutation-types'

export default {
    // Singleton Mutations
    [SET_CLUSTER](state, singleton) {
        Vue.set(state.all, singleton.id, singleton)
    },

    [SET_CLUSTER_HEALTH](state, health) {
        if (state.all[health.id]) {
            Vue.set(state.all, health.id, Object.assign(state.all[health.id], {
                health: health.percent
            }))
        } else {
            console.warn('Trying to set health for non-existant resource: ', health)
        }
    },

    // Collection Mutations
    [SET_CLUSTERS](state, collection) {
        collection.forEach((singleton) => {
            Vue.set(state.all, singleton.id, singleton)
        })
    },

    [SET_CLUSTERS_HEALTH](state, healths) {
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
