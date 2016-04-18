/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider
                .otherwise('/app/home');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: "/app",
                    templateUrl: "tpl/app.html"
                })
                .state('app.dashboard', {
                    url: "/home",
                    templateUrl: "tpl/home.html",
                    controller: 'HomeCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                    'sparkline',
                                    'nvd3'
                                ], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/home.controller.js'
                                    ]);
                                });
                        }]
                    }
                })
                // Login
                .state('access', {
                        url: '/access',
                        template: '<div class="full-height" ui-view></div>'
                    })
                .state('access.login', {
                    url: '/login',
                    templateUrl: 'tpl/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                [
                                    'assets/js/controllers/login.controller.js',
                                    'assets/js/services/authentication.service.js',
                                    'assets/js/services/flash.service.js'
                                ]);
                        }]
                    }
                });

        }
    ]);