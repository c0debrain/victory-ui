angular.module('app.controllers')
    .controller('controllers.overview', OverviewController)

OverviewController.$inject = [
    '$scope',
    '$state',
    'services.api',
    'services.notification',
    'stores.datacenter'
]

function OverviewController(
    $scope,
    $state,
    Api,
    Notification,
    Datacenter
) {
    // Initalize scope variables
    Datacenter.load().then(function(datacenters) {
        $scope.datacenters = datacenters

        console.log($scope.datacenters)
    })

    $scope.enterDatacenter = function(datacenter) {
        $state.go('app.datacenter', { id: datacenter.data_center_code })
    }
}
