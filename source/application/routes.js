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
        path: '/datacenters/collection',
        name: 'datacenters.collection',
        component: require('pages/datacenters/collection/collection.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },
    // {
    //     path: '/datacenters/waterfall',
    //     name: 'datacenters.waterfall',
    //     component: require('pages/datacenters/waterfall/waterfall.vue'),
    //
    //     // If the user needs to be authenticated to view this page
    //     meta: {
    //         authentication: true
    //     }
    // },
    {
        path: '/datacenters/:id',
        name: 'datacenters.singleton',
        component: require('pages/datacenters/singleton/singleton.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },


    // Clients
    {
        path: '/clients',
        name: 'clients.collection',
        component: require('pages/clients/collection/collection.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },
    {
        path: '/clients/:id',
        name: 'clients.singleton',
        component: require('pages/clients/singleton/singleton.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },


    // Origins
    {
        path: '/origins',
        name: 'origins.collection',
        component: require('pages/origins/collection/collection.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },
    {
        path: '/origins/waterfall',
        name: 'origins.waterfall',
        component: require('pages/origins/waterfall/waterfall.vue'),

        // If the user needs to be authenticated to view this page
        meta: {
            authentication: true
        }
    },
    {
        path: '/origins/:id',
        name: 'origins.singleton',
        component: require('pages/origins/singleton/singleton.vue'),

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
