/* ============================================================
 * File: config.lazyload.js
 * Configure modules for ocLazyLoader. These are grouped by
 * vendor libraries.
 * ============================================================ */

angular.module('app')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [
                {
                    name: 'ammaps',
                    files: [
                        'https://cdnjs.cloudflare.com/ajax/libs/ammaps/3.13.0/ammap.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/ammaps/3.13.0/maps/js/continentsLow.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/ammaps/3.13.0/maps/js/worldLow.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/ammaps/3.13.0/themes/dark.js'
                    ],
                    serie: true
                },
                {
                    name: 'ui-select',
                    files: [
                        'components/angular-ui-select3/src/select3.js'
                    ]
                }
            ]
        });
    }]);
