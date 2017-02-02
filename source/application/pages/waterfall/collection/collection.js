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
        'waterfall': require('vue-waterfall/lib/waterfall'),
        'waterfall-slot': require('vue-waterfall/lib/waterfall-slot'),
        'waterfall-resource': require('components/waterfall-resource/waterfall-resource.vue')
    },

    data() {
        return {
            datacenters: false
        }
    },

    mounted() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            datacenterService.findAll().then(() => {
                this.datacenters = store.state.datacenters.all
            })
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
