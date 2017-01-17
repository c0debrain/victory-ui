/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information
 */

import store from 'store'
import datacenterService from 'services/datacenters'
import VueHighcharts from 'vue-highcharts';

export default {
    components: {
        'layout': require('layouts/minimal/minimal.vue'),
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
