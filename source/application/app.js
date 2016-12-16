/**
 * This is the main module that all other angular modules are attached to. This
 * is essentially the application.
 */
angular.module('app', [

    // Request Flow
    'ui.router',
    'permission',
    'permission.ui',
    'ngCookies',
    'oc.lazyLoad',
    'btford.socket-io',

    // Libraries
    'ngAnimate',
    'ui.bootstrap',
    'angularMoment',

    // Components
    'ngFlash',
    'smart-table',
    'highcharts-ng',

    // Application Modules
    'app.environment',
    'app.configuration',
    'app.controllers',
    'app.services',
    'app.models',
    'app.managers',
    'app.directives',
    'app.filters'

])
