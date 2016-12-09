angular.module('app.controllers')
    .controller('controllers.datacenter', DatacenterController)

DatacenterController.$inject = [
    '$scope',
    '$state',
    'services.api',
    'services.notification',
    'stores.datacenter'
]

function DatacenterController(
    $scope,
    $state,
    Api,
    Notification,
    Datacenter
) {
    $scope.datacenter = Datacenter.find($state.params.id)

    console.log('Datacenter: ', $scope.datacenter)
}
