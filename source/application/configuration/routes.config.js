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
            .state('app.transactions', {
                url: '/transactions',
                templateUrl: 'templates/pages/transactions.html',
                controller: 'controllers.transaction',
                controllerAs: 'transactionCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'application/services/transactions.service.js',
                            'application/services/scenarios.service.js',
                            'application/controllers/transactions.controller.js',
                        ])
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
                            'application/controllers/budgets.controller.js',
                            'application/services/categories.service.js',
                            'application/services/scenarios.service.js',
                            'application/services/budgets.service.js'
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
