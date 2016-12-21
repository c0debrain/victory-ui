angular.module('app')
    .config(RoutesConfiguration)

RoutesConfiguration.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    '$locationProvider'
]

function RoutesConfiguration(
    $stateProvider,
    $urlRouterProvider,
    $ocLazyLoadProvider,
    $locationProvider
) {
    // Use the HTML5 History API, remove /# from url
    $locationProvider.html5Mode(true)

    // Fallback route
    $urlRouterProvider.otherwise('/login')

    // States / Routes
    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'templates/app.html'
        })
            .state('app.overview', {
                url: '/overview',
                templateUrl: 'templates/pages/overview.html',
                controller: 'controllers.overview',
                controllerAs: 'overview',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(['nvd3'], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function() {
                                return $ocLazyLoad.load([
                                    'application/controllers/overview.controller.js'
                                ])
                            })
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
                                ])
                            })
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
                            ])
                        })
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
                            ])
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
                            ])
                    }]
                }
            })
}
