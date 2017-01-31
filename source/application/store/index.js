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

// Modules
import authentication from './modules/authentication'
import datacenters from './modules/datacenters'
import clusters from './modules/clusters'
import clients from './modules/clients'
import origins from './modules/origins'
import targets from './modules/targets'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    /**
     * Assign the modules to the store
     */
    modules: {
        // Services
        authentication,

        // Hardware
        datacenters,
        clusters,

        // Software
        clients,
        origins,
        targets
    },

    /**
     * If strict mode should be enabled
     */
    strict: debug,

    /**
     * Plugins used in the store
     */
    plugins: debug ? [createLogger()] : []
})
