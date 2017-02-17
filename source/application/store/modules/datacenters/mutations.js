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
        let increments = 0

        collection.forEach((singleton) => {
            const current = state.all[singleton.id]

            if (!current || (
                current.name !== singleton.name &&
                current.id !== singleton.id &&
                current.importance !== singleton.importance
            )) {
                Vue.set(state.all, singleton.id, singleton)
                increments += 1
            }
        })

        console.log(`Updated ${increments} datacenters.`)
    },

    [SET_DATACENTERS_HEALTH](state, healths) {
        let increments = 0

        healths.forEach((entry) => {
            if (state.all[entry.id]) {
                if (state.all[entry.id].health !== entry.health) {
                    Vue.set(state.all, entry.id, Object.assign(state.all[entry.id], {
                        health: entry.health
                    }))

                    increments += 1
                }
            } else {
                console.warn('Trying to set health for non-existant resource: ', entry)
            }
        })

        console.log(`Updated ${increments} datacenters.`)
    }
}
