angular.module('app.controllers')
    .controller('controllers.origins', OriginsController)

OriginsController.$inject = [
    'environment',
    '$scope',
    '$state',
    '$http',
    '$interval',
    'managers.origin'
]

function OriginsController(
    Environment,
    $scope,
    $state,
    $http,
    $interval,
    OriginManager
) {
    $scope.continue = true
    var promise

    // Initalize scope variables
    OriginManager.loadAll().then(function(origins) {
        $scope.origins = origins
        $scope.startHealthLoop()
    })

    $scope.enterOrigin = function(origin) {
        $scope.stopHealthLoop()
        $state.go('app.origin', { id: origin.origin_id })
    }

    var getHealth = function() {
        $http.get(Environment.api.path + '/origins/health')
            .then(function(response) {
                console.log('Health response: ', response)
                response.data.forEach(function(originHealth) {
                    OriginManager.set(originHealth)
                })

                console.log('Origin Manager: ', OriginManager._pool)
            })
            .catch(function(error) {
                console.error('Error retrieving Origin Healths: ', error)
            })
    }

    $scope.startHealthLoop = function() {
        $scope.stop
        getHealth()
        promise = $interval(getHealth, 10000)
    }

    $scope.stopHealthLoop = function() {
        $interval.cancel(promise)
    }
}
