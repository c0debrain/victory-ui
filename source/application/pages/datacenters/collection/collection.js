/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information
 */

import store from 'store'
import datacenterService from 'services/datacenters'

export default {
    components: {
        'layout': require('layouts/default/default.vue'),
        'resource': require('components/resource/resource.vue')
    },

    computed: {
        datacenters () {
            return this.$store.state.datacenters.all
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            datacenterService.findAll()
        }
    },

    destroyed() {
        console.log('Killing socket listener for: ', 'datacenters:health')
        delete this.$options.sockets['datacenters:health']
    },

    sockets: {
        'datacenters:health': function(response) {
            store.dispatch('setDatacentersHealth', response.data)
        }
    }
}
