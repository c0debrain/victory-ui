import * as types from './../../mutation-types'

// Datacenter
export default {
    // Collection Actions
    setTransactions({ commit }, collection) {
        commit(types.SET_TRANSACTIONS, collection)
    }
}
