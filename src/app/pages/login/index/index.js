/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login
 */

import authService from './../../../services/auth'

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
            authService.login(user)
        }
    },

    components: {
        VLayout: require('layouts/minimal/minimal.vue')
    }
}
