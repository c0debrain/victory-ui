/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login
 */

import authenticationService from './../../../services/authentication'

export default {

    data() {
        return {
            user: {
                email: 'demo',
                password: 'demo'
            }
        }
    },

    methods: {
        login(user) {
            authenticationService.login(user)
        }
    },

    components: {
        'layout': require('layouts/minimal/minimal.vue')
    }
}
