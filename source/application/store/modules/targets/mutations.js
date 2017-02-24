import Vue from 'vue'
import {
    SET_TARGET,
    SET_TARGET_HEALTH,
    SET_TARGETS,
    SET_TARGETS_HEALTH
} from './../../mutation-types'

export default {
    // Singleton Mutations
    [SET_TARGET](state, singleton) {
        Vue.set(state.all, singleton.id, singleton)
    },

    [SET_TARGET_HEALTH](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                health: data.health
            }))
        } else {
            console.warn('Trying to set health for non-existant resource: ', data)
        }
    },

    // Collection Mutations
    [SET_TARGETS](state, collection) {
        collection.forEach(singleton => Vue.set(state.all, singleton.id, singleton))
    },

    [SET_TARGETS_HEALTH](state, healths) {
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
