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
        datacenters() {
            return store.state.datacenters.all
        }
    },

    mounted: function() {
        this.loadAll()
    },

    methods: {
        loadAll() {
            datacenterService.findAll()
        }
    }
}
