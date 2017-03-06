import Vue from 'vue'
import { SET_ACCOUNTS } from './../../mutation-types'

export default {
    // Collection Mutations
    [SET_ACCOUNTS](state, collection) {
        collection.forEach(singleton => Vue.set(state.all, singleton.id, singleton))
    }
}
