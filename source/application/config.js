/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider
                .otherwise('/app/overview');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
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
                    controllerAs: 'transactions',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'application/controllers/transactions.controller.js'
                            ]);
                        }]
                    }
                });
        }
    ]);
