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
    components: {
        'tray': require('components/tray/tray.vue'),
        'content-header': require('components/content-header/content-header.vue'),
        'content-body': require('components/content-body/content-body.vue')
    },

    props: {
        title: {
            type: String,
            default: 'Worldview'
        },
        tabs: {
            type: Array,
            default: () => []
        }
    },

    methods: {
        logout() {
            authenticationService.logout()
        }
    }
}
