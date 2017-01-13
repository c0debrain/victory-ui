/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */


/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue'

Vue.config.debug = process.env.NODE_ENV !== 'production'


/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios'
import authenticationService from './app/services/authentication'

Axios.defaults.baseURL = process.env.API_LOCATION
Axios.defaults.headers.common.Accept = 'application/json'
Axios.interceptors.response.use(
    response => response.data,
    (error) => {
        if (error.response.status === 401) {
            authenticationService.logout()
        }
    })
Vue.$http = Axios


/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import VuexRouterSync from 'vuex-router-sync'
import store from './app/store'

store.dispatch('checkAuthentication')


/* ============
 * Vue Socket.io
 * ============
 *
 * Aims to make realtime apps possible in every browser and mobile
 * device, blurring the differences between the different transport
 * mechanisms.
 *
 * https://github.com/socketio/socket.io
 */

import VueSocket from 'vue-socket.io'

Vue.use(VueSocket, process.env.API_LOCATION, store)


/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router'
import routes from './app/routes'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(m => m.meta.authentication) && !store.state.authentication.authenticated) {
        /*
         * If the user is not authenticated and visits
         * a page that requires authentication, redirect to the login page
         */
        next({
            name: 'login.index'
        })
    } else if (to.matched.some(m => m.meta.guest) && store.state.authentication.authenticated) {
        /*
         * If the user is authenticated and visits
         * an guest page, redirect to the dashboard page
         */
        next({
            name: 'home.index'
        })
    } else {
        next()
    }
})

VuexRouterSync.sync(store, router)
Vue.router = router


/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js
 *
 * https://kazupon.github.io/vue-i18n/
 */
import VueI18n from 'vue-i18n'
import locale from './app/locale'

Vue.use(VueI18n)
Vue.config.lang = 'en'

Object.keys(locale).forEach((lang) => {
    Vue.locale(lang, locale[lang])
})


/* ============
 * jQuery
 * ============
 *
 * Require jQuery
 *
 * http://jquery.com/
 */
import jQuery from 'jquery'

window.$ = window.jQuery = jQuery


/* ============
 * Bootstrap
 * ============
 *
 * Require bootstrap
 *
 * http://getbootstrap.com/
 */
global.Tether = require('tether')
require('bootstrap')
require('bootstrap/scss/bootstrap.scss')


/* ============
 * Font Awesome
 * ============
 *
 * Require font-awesome
 *
 * http://http://fontawesome.io/
 */
require('font-awesome/less/font-awesome.less')


/* ============
 * Styling
 * ============
 *
 * Require the application styling.
 *
 * If you don't want to use Scss, that's fine!
 * Replace the scss directory with the CSS preprocessor you want.
 * Require the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://sass-lang.com/
 */
require('./assets/less/application.less')

export default {
    router
}