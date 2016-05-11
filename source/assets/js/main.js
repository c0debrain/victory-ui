/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables.
 * ============================================================ */

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'env', function($scope, $rootScope, $state, env) {

        // App globals
        $scope.app = {
            name: 'OneLink NOC',
            description: 'Network operations center dashboard that displays important information regarding the various hardware and software deployments that are embodied by the OneLink service.',
            layout: {
                menuPin: false,
                menuBehind: false,
                theme: 'pages/css/pages.css'
            }
        };

        // Checks if the given state is the current state
        $scope.is = function(name) {
            return $state.is(name);
        };

        // Checks if the given state/child states are present
        $scope.includes = function(name) {
            return $state.includes(name);
        };
    }]);


angular.module('app')
    /*
        Use this directive together with ng-include to include a
        template file by replacing the placeholder element
    */
    .directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });
