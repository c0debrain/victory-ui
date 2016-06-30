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
                    url: "/app",
                    templateUrl: "tpl/app.html"
                })
                .state('app.overview', {
                    url: "/overview",
                    templateUrl: "tpl/overview.html",
                    controller: 'controllers.overview',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(['nvd3'], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/overview.controller.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.region', {
                    url: "/region/:id",
                    templateUrl: "tpl/region.html",
                    controller: 'controllers.region',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(['nvd3'], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'assets/js/controllers/region.controller.js'
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
    ])
    .run(function($http, environment) {
        $http.defaults.headers.common['apikey'] = environment.api.key;
    });
