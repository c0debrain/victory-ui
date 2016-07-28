angular.module('app')
    .controller('AppCtrl', MainController);

MainController.$inject = ['$scope', '$rootScope', '$state'];

function MainController($scope, $rootScope, $state) {
    // App globals
    $scope.app = {
        name: 'Victory: Money Manager',
        description: 'Victory: Money Manager description.',
        author: 'Nick Lombardi'
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
