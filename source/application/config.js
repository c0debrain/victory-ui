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
                            return $ocLazyLoad.load(['nvd3'], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'application/controllers/overview.controller.js'
                                    ]);
                                });
                        }]
                    }
                })
                .state('app.region', {
                    url: '/region/:id',
                    templateUrl: 'templates/pages/region.html',
                    controller: 'controllers.region',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(['nvd3'], {
                                    insertBefore: '#lazyload_placeholder'
                                })
                                .then(function() {
                                    return $ocLazyLoad.load([
                                        'application/controllers/region.controller.js'
                                    ]);
                                });
                        }]
                    }
                })

            .state('app.maps', {
                url: '/maps',
                templateUrl: 'templates/pages/map.html',
                controller: 'controllers.map',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'ammaps'
                            ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function() {
                                return $ocLazyLoad.load([
                                    'application/controllers/map.controller.js',
                                    'application/directives/ammaps.js'
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
                    templateUrl: 'templates/pages/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                [
                                    'application/controllers/login.controller.js',
                                    'application/services/authentication.service.js',
                                    'application/services/flash.service.js'
                                ]);
                        }]
                    }
                });

        }
    ])
    .run(function($http, environment) {
        $http.defaults.headers.common.apikey = environment.api.key;
    });
