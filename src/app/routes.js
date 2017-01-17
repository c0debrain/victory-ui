/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */


/**
 * The routes
 *
 * @type {object} The routes
 */
export default [

    // Home
    {
        path: '/home',
        name: 'home.index',
        component: require('pages/home/index/index.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },


    // Datacenters
    {
        path: '/datacenters',
        name: 'datacenters.collection',
        component: require('pages/datacenters/collection/collection.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },


    // Datacenters Singleton
    {
        path: '/datacenters/:id',
        name: 'datacenters.singleton',
        component: require('pages/datacenters/singleton/singleton.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },


    // Login
    {
        path: '/login',
        name: 'login.index',
        component: require('pages/login/index/index.vue'),

        // If the user needs to be a guest to view this page
        meta: {
            guest: true
        }
    },


    // Register
    {
        path: '/register',
        name: 'register.index',
        component: require('pages/register/index/index.vue'),

        // If the user needs to be a guest to view this page
        meta: {
            guest: true
        }
    }, {
        path: '/',
        redirect: '/home'
    }, {
        path: '/*',
        redirect: '/home'
    }
]
