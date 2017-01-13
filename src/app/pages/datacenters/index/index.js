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
        VLayout: require('layouts/default/default.vue'),
        VResource: require('components/resource/resource.vue')
    },

    // computed: {
    //     // datacenters: (state) => {
    //     //     datacenterService.findAll()
    //     //         .then(function(datacenters) {
    //     //             console.log(datacenters)
    //     //         })
    //     // }
    //
    //     datacenters: (state) => {
    //         state.$store.dispatch('getDatacenters')
    //             .then(function(datacenters) {
    //                 console.log(datacenters)
    //             })
    //     }
    // }
    //
    onready: () => {
        this.loadAll()
    },

    methods: {
        loadAll: () => {
            datacenterService.findAll().then(function(datacenters) {
                this.datacenters = datacenters
            })
        }
    }
}
