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
    'xeditable',
    'smart-table',
    'ngLetterAvatar',
    'daterangepicker',

    // Application Modules
    'app.environment',
    'app.configuration',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters'

])
