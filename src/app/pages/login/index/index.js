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
                email: 'onelink',
                password: 'onelink'
            }
        }
    },

    methods: {
        login(user) {
            authenticationService.login(user)
        }
    },

    components: {
        VLayout: require('layouts/minimal/minimal.vue')
    }
}
