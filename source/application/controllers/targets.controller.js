angular.module('app.controllers')
    .controller('controllers.targets', TargetsController)

TargetsController.$inject = [
    '$scope',
    '$state',
    'managers.target'
]

function TargetsController(
    $scope,
    $state,
    TargetManager
) {
    // Initalize scope variables
    TargetManager.loadAll().then(function(targets) {
        $scope.targets = targets
    })
}
