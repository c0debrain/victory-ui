angular.module('app.controllers')
    .controller('controllers.datacenter', DatacenterController)

DatacenterController.$inject = [
    '$scope',
    '$state',
    'services.api',
    'services.notification'
]

function DatacenterController(
    $scope,
    $state,
    Api,
    Notification
) {


}
