angular.module('app.controllers')
    .controller('controllers.clients', ClientsController)

ClientsController.$inject = [
    '$scope',
    '$state',
    'managers.client'
]

function ClientsController(
    $scope,
    $state,
    ClientManager
) {
    // Initalize scope variables
    ClientManager.loadAll().then(function(clients) {
        $scope.clients = clients
    })

    $scope.enterClient = function(client) {
        $state.go('app.client', { id: client.client_id })
    }
}
