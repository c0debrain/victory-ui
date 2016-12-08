angular.module('app.controllers')
    .controller('controllers.overview', OverviewController)

OverviewController.$inject = [
    '$scope',
    'services.api',
    'services.notification'
]

function OverviewController(
    $scope,
    Api,
    Notification
) {
    // Initalize scope variables
    $scope.datacenters = []

    Api.datacenter.all().$promise.then(function(response) {
        if (response.status !== 'success') {
            return Notification.create('danger', 'Failed to pull datacenters from API.')
        }

        // Mock statistical values until we have real data
        $scope.datacenters = response.data.map(function(datacenter) {
            datacenter.statistics = {
                clusters: Math.floor((Math.random() * 20) + 1),
                alerts: Math.floor((Math.random() * 10) + 1),
                warnings: Math.floor((Math.random() * 30) + 1)
            }
            datacenter.status = { stable: Math.floor((Math.random() * 100) + 1) }
            datacenter.status.warning = Math.floor(((100 -  datacenter.status.stable) / 3) * 2)
            datacenter.status.danger = Math.floor((100 -  datacenter.status.stable) / 3)

            console.log(datacenter.status)

            return datacenter
        })
    })
}
