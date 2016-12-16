angular.module('app.controllers')
    .controller('controllers.sidemenu', SidemenuController)

SidemenuController.$inject = [
    '$rootScope',
    '$scope',
    '$state'
]

function SidemenuController(
    $rootScope,
    $scope,
    $state
) {
    $scope.user = $rootScope.user

    $scope.logout = function() {
        $state.go('access.login')
    }
}
