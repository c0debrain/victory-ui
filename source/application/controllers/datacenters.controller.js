angular.module('app.controllers')
    .controller('controllers.datacenters', DatacentersController)

DatacentersController.$inject = [
    '$scope',
    '$state',
    'managers.datacenter'
]

function DatacentersController(
    $scope,
    $state,
    DatacenterManager
) {
    // Initalize scope variables
    DatacenterManager.loadAll().then(function(datacenters) {
        $scope.datacenters = datacenters
    })

    $scope.enterDatacenter = function(datacenter) {
        $state.go('app.datacenter', { id: datacenter.data_center_code })
    }
}
