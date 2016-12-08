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
            .state('app.overview', {
                url: '/overview',
                templateUrl: 'templates/pages/overview.html',
                controller: 'controllers.overview',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/controllers/overview.controller.js'
                        ])
                    }]
                }
            })
            .state('app.datacenter', {
                url: '/datacenter',
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
