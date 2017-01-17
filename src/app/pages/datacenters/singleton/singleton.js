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
        datacenter() {
            return store.state.datacenters.all[this.$route.params.id]
        }
    },

    mounted: function() {
        this.load(this.$route.params.id)
    },

    methods: {
        load(id) {
            datacenterService.find(id)
        }
    }
}
