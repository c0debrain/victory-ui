angular.module('app.controllers')
    .controller('controllers.sidemenu', SidemenuController)

SidemenuController.$inject = [
    '$scope',
    '$rootScope',
    '$state'
]

function SidemenuController(
    $scope,
    $rootScope,
    $state
) {
    $scope.user = $rootScope.user

    $scope.logout = function() {
        $state.go('access.login')
    }
}
