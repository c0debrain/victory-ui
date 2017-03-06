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
            },

            // Transactions Section
            {
                name: 'transactions',
                path: 'transactions',
                redirect: '/transactions/all',
                component: require('pages/transactions/transactions.vue'),
                children: [{
                    path: '/transactions/all',
                    name: 'transactions.collection',
                    component: require('pages/transactions/collection/collection.vue')
                }]
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
