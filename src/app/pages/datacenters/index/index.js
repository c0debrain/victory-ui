/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information
 */

import store from 'store'
import datacenterService from 'services/datacenters'
import { mapActions } from 'vuex'

export default {
    components: {
        VLayout: require('layouts/default/default.vue'),
        VPanel: require('components/panel/panel.vue')
    },

    computed: {
        // datacenters: (state) => {
        //     datacenterService.findAll()
        //         .then(function(datacenters) {
        //             console.log(datacenters)
        //         })
        // }

        datacenters: (state) => {
            state.$store.dispatch('getDatacenters')
                .then(function(datacenters) {
                    console.log(datacenters)
                })
        }
    }
}
