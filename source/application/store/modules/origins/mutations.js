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
            if (state.all[data.id].health !== data.health) {
                Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                    health: data.health
                }))
            }
        } else {
            console.warn('Trying to set health for non-existant resource: ', data)
        }
    },

    [SET_ORIGIN_TARGETS](state, data) {
        if (state.all[data.id]) {
            Vue.set(state.all, data.id, Object.assign(state.all[data.id], {
                targets: data.collection.map(singleton => singleton.id)
            }))
        } else {
            console.warn('Trying to set relations for non-existant resource: ', data)
        }
    },

    // Collection Mutations
    [SET_ORIGINS](state, collection) {
        let increments = 0

        collection.forEach((singleton) => {
            const current = state.all[singleton.id]

            if (current.name !== singleton.name && current.id !== singleton.id) {
                Vue.set(state.all, singleton.id, singleton)
                increments += 1
            }
        })

        console.log(`Updated ${increments} origins.`)
    },

    [SET_ORIGINS_HEALTH](state, healths) {
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

        console.log(`Updated ${increments} origins.`)
    }
}
