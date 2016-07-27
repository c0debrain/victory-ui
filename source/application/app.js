/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

angular.module('app', [
    // Exernal Dependencies
    'ui.router',
    'ui.utils',
    'oc.lazyLoad',
    'ngFlash',

    // Internal Submodules
    'app.environment',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters'
]);
