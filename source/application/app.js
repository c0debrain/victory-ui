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
    'ngResource',
    'oc.lazyLoad',
    'btford.socket-io',

    // Libraries
    'ngAnimate',
    'ui.bootstrap',
    'angularMoment',

    // Components
    'ngFlash',
    'ui.tree',
    'ui.calendar',
    'xeditable',
    'smart-table',
    'ngLetterAvatar',
    'daterangepicker',
    'highcharts-ng',

    // Application Modules
    'app.environment',
    'app.configuration',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters'

])
