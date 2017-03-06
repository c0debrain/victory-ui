import Vue from 'vue'
import { SET_TRANSACTIONS } from './../../mutation-types'

export default {
    // Collection Mutations
    [SET_TRANSACTIONS](state, collection) {
        collection.forEach(singleton => Vue.set(state.all, singleton.id, singleton))
    }
}
