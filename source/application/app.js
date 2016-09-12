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
    'permission',
    'permission.ui',
    'angularMoment',
    'angular-plaid-link',

    // Application Modules
    'app.environment',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters'
]);
