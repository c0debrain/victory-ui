import Vue from 'vue'
import {
    SET_ORIGIN,
    SET_ORIGIN_HEALTH,
    SET_ORIGIN_TARGETS,
    SET_ORIGINS,
    SET_ORIGINS_HEALTH
} from './../../mutation-types'

export default {
    // Singleton Mutations
    [SET_ORIGIN](state, singleton) {
        Vue.set(state.all, singleton.id, singleton)
    },

    [SET_ORIGIN_HEALTH](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                health: data.health
            }))
        } else {
            console.warn('Trying to set health for non-existant resource: ', data)
        }
    },

    [SET_ORIGIN_TARGETS](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                clusters: data.collection.map(singleton => singleton.id)
            }))
        } else {
            console.warn('Trying to set relations for non-existant resource: ', data)
        }
    },

    // Collection Mutations
    [SET_ORIGINS](state, collection) {
        collection.forEach((singleton) => {
            Vue.set(state.all, singleton.id, singleton)
        })
    },

    [SET_ORIGINS_HEALTH](state, healths) {
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
