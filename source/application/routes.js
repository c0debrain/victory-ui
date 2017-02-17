// import DashboardView from 'layouts/dashboard/dashboard.vue'
// import RegisterView from 'pages/register/index/index.vue'

/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
    // Login
    {
        path: '/login',
        name: 'login.index',
        component: require('pages/login/index/index.vue'),
        meta: { guest: true }
    },

    // Register
    {
        path: '/register',
        name: 'register.index',
        component: require('pages/register/index/index.vue'),
        meta: { guest: true }
    },

    // Dashboard View
    {
        path: '/',
        component: require('layouts/dashboard/dashboard.vue'),
        meta: { authentication: true },
        redirect: '/home',
        children: [

            // Home Page
            {
                path: '/home',
                name: 'home.index',
                component: require('pages/home/index/index.vue')

            // Datacenters Section
            }, {
                path: '/datacenters',
                name: 'datacenters',
                redirect: '/datacenters/collection',
                component: require('pages/datacenters/datacenters.vue'),
                children: [
                    {
                        path: '/datacenters/collection',
                        name: 'datacenters.collection',
                        component: require('pages/datacenters/collection/collection.vue')
                    }, {
                        path: '/datacenters/:id',
                        name: 'datacenters.singleton',
                        component: require('pages/datacenters/singleton/singleton.vue')
                    }
                ]
            },

            // Clients Section
            {
                path: '/clients',
                name: 'clients',
                component: require('pages/clients/clients.vue'),
                children: [
                    {
                        path: '/clients/collection',
                        name: 'clients.collection',
                        component: require('pages/clients/collection/collection.vue')
                    }, {
                        path: '/clients/:id',
                        name: 'clients.singleton',
                        component: require('pages/clients/singleton/singleton.vue')
                    }
                ]
            },

            // Origins Section
            {
                path: '/origins',
                name: 'origins',
                component: require('pages/origins/origins.vue'),
                children: [
                    {
                        path: '/origins/collection',
                        name: 'origins.collection',
                        component: require('pages/origins/collection/collection.vue')
                    }, {
                        path: '/origins/waterfall',
                        name: 'origins.waterfall',
                        component: require('pages/origins/waterfall/waterfall.vue')
                    }, {
                        path: '/origins/:id',
                        name: 'origins.singleton',
                        component: require('pages/origins/singleton/singleton.vue')
                    }
                ]
            },

            // Targets Section
            {
                path: '/targets',
                name: 'targets',
                component: require('pages/targets/targets.vue'),
                children: [
                    {
                        path: '/targets/collection',
                        name: 'targets.collection',
                        component: require('pages/targets/collection/collection.vue')
                    }, {
                        path: '/targets/waterfall',
                        name: 'targets.waterfall',
                        component: require('pages/targets/waterfall/waterfall.vue')
                    }, {
                        path: '/targets/:id',
                        name: 'targets.singleton',
                        component: require('pages/targets/singleton/singleton.vue')
                    }
                ]
            }
        ]
    },

    // Fallback Routes
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/*',
        redirect: '/home'
    }
]
