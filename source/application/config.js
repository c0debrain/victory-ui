/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', 'plaidLinkProvider',
        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $plaidLinkProvider) {

            // Use the HTML5 History API, remove /# from url
            $locationProvider.html5Mode(true);

            // Set default Route w/ workaround from angular-permissions
            // $urlRouterProvider.otherwise(function($injector) {
            //     var $state = $injector.get("$state");
            //     $state.go('/access/login');
            // });

            $urlRouterProvider.otherwise('/login');

            // Plaid Configuration
            $plaidLinkProvider.init({
                clientName: 'Victory',
                env: 'tartan',
                key: 'test_key',
                product: 'auth'
            });

            $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: 'templates/app.html',
                    data: {
                        permissions: {
                            only: ['isUser'],
                            redirectTo: function() {
                                return {
                                    state: 'access.login'
                                }
                            }
                        }
                    }
                })
                .state('app.overview', {
                    url: '/overview',
                    templateUrl: 'templates/pages/overview.html',
                    controller: 'controllers.overview',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'application/controllers/overview.controller.js'
                            ]);
                        }]
                    }
                })
                .state('app.transactions', {
                    url: '/transactions',
                    templateUrl: 'templates/pages/transactions.html',
                    controller: 'controllers.transaction',
                    controllerAs: 'transactionCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'application/services/transactions.service.js',
                                'application/controllers/transactions.controller.js',
                            ]);
                        }]
                    }
                })
                .state('app.budgets', {
                    url: '/budgets',
                    templateUrl: 'templates/pages/budgets.html',
                    controller: 'controllers.budget',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'application/controllers/budgets.controller.js'
                            ]);
                        }]
                    }
                })

            .state('access', {
                    template: '<div class="full-height" ui-view></div>'
                })
                .state('access.login', {
                    url: '/login',
                    templateUrl: 'templates/pages/login.html',
                    controller: 'controllers.login',
                    controllerAs: 'loginCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                [
                                    'application/controllers/login.controller.js',
                                    'application/services/authentication.service.js'
                                ]);
                        }]
                    }
                })
                .state('access.register', {
                    url: '/register',
                    templateUrl: 'templates/pages/register.html',
                    controller: 'controllers.register',
                    controllerAs: 'registerCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                [
                                    'application/controllers/register.controller.js',
                                    'application/services/users.service.js',
                                    'application/services/authentication.service.js'
                                ]);
                        }]
                    }
                });
        }
    ])

// Validate authentication
.run(AuthenticationConfiguration)
.run(PlaidConfiguration);

/*
    Handle setting up authentication when the application loads. This includes
    persisting authentication variables that are used with requests that are erased
    from scope if the user refreshes the page.
*/
AuthenticationConfiguration.$inject = [
    '$rootScope',
    '$location',
    '$cookieStore',
    '$http',
    'PermPermissionStore'
];

function AuthenticationConfiguration(
    $rootScope,
    $location,
    $cookieStore,
    $http,
    Permissions
) {
    // Assign rootScope variables && Authorization header
    $rootScope.user = $cookieStore.get('user') || {};
    $rootScope.token = $cookieStore.get('token') || '';
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.token;

    // Restrict based on permissions
    Permissions.definePermission('isUser', function() {
        var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;

        // If page is private, and no user or token exists, redirect to login
        if (restrictedPage && (!$rootScope.user || !$rootScope.token)) {
            console.log('Unauthenticated!')
            return false;
        }

        return true;
    });
};

/*
    Handles setting up the Plaid Link that is used to import the user's bank
    accounts and transactions.
*/
PlaidConfiguration.$inject = [
    '$rootScope',
    'plaidLink',
    'services.account'
];

function PlaidConfiguration(
    $rootScope,
    plaidLink,
    Account
) {
    plaidLink.create({},

        // Exchange public token for access_token server-side
        function success(token) {
            Account.exchange({ public_token: token, returning: false }, function(resPromise) {
                return resPromise.$promise.then(function(response) {
                    if (response.data.updated) {

                        // Just pull in all new accounts
                        Account.all(function(response) {
                            console.log('Account Service Response: ', response.data);
                            $rootScope.$broadcast('newAccounts', response.data);
                        });
                    }
                });
            });
        },

        // Callback for when user exits modal
        function exit() {
            console.log('Exited plaidLink modal');
        }
    );

};
