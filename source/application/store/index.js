/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

// Modules
import authentication from './modules/authentication'

// Resources
import transactions from './modules/transactions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    /**
     * Assign the modules to the store
     */
    modules: {
        // Services
        authentication,

        transactions
    },

    /**
     * If strict mode should be enabled
     */
    strict: debug,

    /**
     * Plugins used in the store
     */
    plugins: debug ? [createLogger(), createPersistedState({
        paths: ['transactions']
    })] : [createPersistedState()]
})
