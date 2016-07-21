angular.module('app')
    .controller('AppCtrl', MainController);

MainController.$inject = ['$scope', '$rootScope', '$state'];

function MainController($scope, $rootScope, $state) {
    // App globals
    $scope.app = {
        name: 'OneLink Network Operations Center',
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
};
