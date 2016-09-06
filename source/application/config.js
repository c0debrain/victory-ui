/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {

            // Use the HTML5 History API, remove /# from url
            $locationProvider.html5Mode(true);

            // Set default Route w/ workaround from angular-permissions
            // $urlRouterProvider.otherwise(function($injector) {
            //     var $state = $injector.get("$state");
            //     $state.go('/access/login');
            // });

            $urlRouterProvider.otherwise('/login');

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
                    controllerAs: 'transaction',
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
                    controllerAs: 'login',
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
                // .state('access.register', {
                //     url: '/register',
                //     templateUrl: 'templates/pages/register.html',
                //     controller: 'controllers.register',
                //     controllerAs: 'register',
                //     resolve: {
                //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
                //             return $ocLazyLoad.load(
                //                 [
                //                     'application/controllers/register.controller.js',
                //                     'application/services/authentication.service.js'
                //                 ]);
                //         }]
                //     }
                // });
        }
    ])

// Validate authentication
.run(function($rootScope, $location, $cookieStore, $http, PermPermissionStore) {
    $rootScope.user = $cookieStore.get('user') || {};

    if ($cookieStore.get('token')) {
        $rootScope.token = $cookieStore.get('token');
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $cookieStore.get('token');
    } else {
        $rootScope.token = '';
    }

    PermPermissionStore.definePermission('isUser', function() {
        var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;

        // If page is private, and no user or token exists, redirect to login
        if (restrictedPage && (!$rootScope.user || !$rootScope.token)) {
            console.log('Unauthenticated!')
            return false;
        }

        return true;
    });
});
