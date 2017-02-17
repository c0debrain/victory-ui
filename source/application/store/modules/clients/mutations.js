import Vue from 'vue'
import {
    SET_CLIENT,
    SET_CLIENT_HEALTH,
    SET_CLIENT_ORIGINS,
    SET_CLIENTS,
    SET_CLIENTS_HEALTH
} from './../../mutation-types'

export default {
    // Singleton Mutations
    [SET_CLIENT](state, singleton) {
        Vue.set(state.all, singleton.id, singleton)
    },

    [SET_CLIENT_HEALTH](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                health: data.health
            }))
        } else {
            console.warn('Trying to set health for non-existant resource: ', data)
        }
    },

    [SET_CLIENT_ORIGINS](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                origins: data.collection.map(singleton => singleton.id)
            }))
        } else {
            console.warn('Trying to set clusters for non-existant resource: ', data)
        }
    },

    // Collection Mutations
    [SET_CLIENTS](state, collection) {
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

    [SET_CLIENTS_HEALTH](state, healths) {
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
