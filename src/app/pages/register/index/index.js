/* ============
 * Register Index Page
 * ============
 *
 * Page where the user can register
 */

import authenticationService from './../../../services/authentication'

export default {

    data() {
        return {
            user: {
                firstName: null,
                lastName: null,
                email: null,
                passwordConfirm: null,
                password: null
            }
        }
    },

    methods: {
        register(user) {
            authenticationService.register(user)
        }
    },

    components: {
        VLayout: require('layouts/minimal/minimal.vue')
    }
}
