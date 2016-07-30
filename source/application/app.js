/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

angular.module('app', [
    'ui.router',
    'oc.lazyLoad',

    // 3rd Party Modules
    'angular-peity',

    // Application Modules
    'app.environment',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters'
]);
