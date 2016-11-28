/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

angular.module('app', [
    'ui.router',
    'oc.lazyLoad',
    'smart-table',
    'ngFlash',
    'ngCookies',
    'ngResource',
    'ngAnimate',
    'ngLetterAvatar',
    'permission',
    'permission.ui',
    'angularMoment',
    'angular-plaid-link',
    'ui.bootstrap',
    'xeditable',

    // Application Modules
    'app.environment',
    'app.configuration',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters'
]);
