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
            templateUrl: 'templates/app.html',
            controller: 'controllers.application',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'application/controllers/application.controller.js'
                    ])
                }]
            },
            data: {
                permissions: {
                    only: ['isUser'],
                    redirectTo: function() {
                        return { state: 'access.login' }
                    }
                }
            }
        })
            .state('app.datacenters', {
                url: '/datacenters',
                templateUrl: 'templates/pages/datacenters.html',
                controller: 'controllers.datacenters',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/datacenters.controller.js'
                        ])
                    }]
                }
            })
            .state('app.datacenter', {
                url: '/datacenter/:id',
                templateUrl: 'templates/pages/datacenter.html',
                controller: 'controllers.datacenter',
                controllerAs: 'datacenterCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/datacenter.controller.js',
                        ])
                    }]
                }
            })

            .state('app.clients', {
                url: '/clients',
                templateUrl: 'templates/pages/clients.html',
                controller: 'controllers.clients',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/clients.controller.js'
                        ])
                    }]
                }
            })
            .state('app.client', {
                url: '/client/:id',
                templateUrl: 'templates/pages/client.html',
                controller: 'controllers.client',
                controllerAs: 'clientCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/client.controller.js',
                        ])
                    }]
                }
            })

            .state('app.origins', {
                url: '/origins',
                templateUrl: 'templates/pages/origins.html',
                controller: 'controllers.origins',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/origins.controller.js'
                        ])
                    }]
                }
            })
            .state('app.origin', {
                url: '/origin/:id',
                templateUrl: 'templates/pages/origin.html',
                controller: 'controllers.origin',
                controllerAs: 'originCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/origin.controller.js',
                        ])
                    }]
                }
            })

            .state('app.targets', {
                url: '/targets',
                templateUrl: 'templates/pages/targets.html',
                controller: 'controllers.targets',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/targets.controller.js'
                        ])
                    }]
                }
            })
            .state('app.target', {
                url: '/target/:id',
                templateUrl: 'templates/pages/target.html',
                controller: 'controllers.target',
                controllerAs: 'targetCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/target.controller.js',
                        ])
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
                        return $ocLazyLoad.load([
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
                        return $ocLazyLoad.load([
                                'application/controllers/register.controller.js',
                                'application/services/users.service.js',
                                'application/services/authentication.service.js'
                            ])
                    }]
                }
            })
}
