/* ============
 * Default Layout
 * ============
 *
 * Used for the home and account pages
 *
 * Layouts are used to store a lot of shared code.
 * This way the app stays clean.
 */

import authenticationService from './../../services/authentication'

export default {
    methods: {
        logout() {
            authenticationService.logout()
        }
    },
    components: {
        'v-tray':  require('components/tray/tray.vue'),
        'v-content': require('components/content/content.vue')
    }
}
