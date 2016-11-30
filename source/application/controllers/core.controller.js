angular.module('app.controllers')
    .controller('controllers.core', CoreController);

CoreController.$inject = ['$scope', '$rootScope', '$state'];

/*
    This controller is instantiated on page load, as opposed to
    application.controller which is instatiated on login.
*/
function CoreController($scope, $rootScope, $state) {
    $rootScope.app = {
        name: 'Victory',
        description: 'Your all-in-one financial tracking, management and advising platform.'
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
