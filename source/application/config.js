/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {

            // Use the HTML5 History API, remove /# from url
            $locationProvider.html5Mode(true);

            // Set default Route
            $urlRouterProvider.otherwise('/overview');

            $stateProvider
                .state('app', {
                    abstract: true,
                    templateUrl: 'templates/app.html'
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
                });
        }
    ]);
