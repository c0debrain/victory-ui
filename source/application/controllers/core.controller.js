angular.module('app.controllers')
    .controller('controllers.core', CoreController)

CoreController.$inject = ['$scope', '$rootScope', '$state']

/*
    This controller is instantiated on page load, as opposed to
    application.controller which is instatiated on login.
*/
function CoreController($scope, $rootScope, $state) {
    $rootScope.app = {
        name: 'Network Operations Center | OneLink',
        description: 'Network operations center dashboard that displays important information regarding the various hardware and software deployments that are embodied by the OneLink service.'
    }

    // Checks if the given state is the current state
    $scope.is = function(name) {
        return $state.is(name)
    }

    // Checks if the given state/child states are present
    $scope.includes = function(name) {
        return $state.includes(name)
    }
}
