import * as types from './../../mutation-types'

// Datacenter
export default {
    // Collection Actions
    setAccounts({ commit }, collection) {
        commit(types.SET_ACCOUNTS, collection)
    }
}
