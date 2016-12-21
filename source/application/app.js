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

    // Libraries
    'ngAnimate',
    'ui.bootstrap',
    'angularMoment',
    'angular-plaid-link',

    // Components
    'ngFlash',
    'ui.tree',
    'ui.calendar',
    'xeditable',
    'smart-table',
    'ngLetterAvatar',
    'daterangepicker',
    'highcharts-ng',
    'vs-repeat',

    // Application Modules
    'app.environment',
    'app.configuration',
    'app.controllers',
    'app.models',
    'app.managers',
    'app.services',
    'app.directives',
    'app.filters'

])
