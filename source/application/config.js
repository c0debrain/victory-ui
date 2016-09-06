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

            $urlRouterProvider.otherwise('/access/login');

            $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: 'templates/app.html',
                    data: {
                        permissions: {
                            only: ['isUser']
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
                    controller: 'controllers.transactions',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'application/controllers/transactions.controller.js'
                            ]);
                        }]
                    }
                })
                .state('app.budgets', {
                    url: '/budgets',
                    templateUrl: 'templates/pages/budgets.html',
                    controller: 'controllers.budgets',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'application/controllers/budgets.controller.js'
                            ]);
                        }]
                    }
                })

            .state('access', {
                    url: '/access',
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
                });
        }
    ])

// Validate authentication
.run(function($rootScope, $location, PermPermissionStore) {
    PermPermissionStore.definePermission('isUser', function() {
        var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;

        // If page is private, and no user or token exists, redirect to login
        if (restrictedPage && (!$rootScope.user || !$rootScope.token)) {
            return false;
        }

        return true;
    });
});
