angular.module('app.controllers')
    .controller('controllers.core', CoreController)

CoreController.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    'services.socket'
]

/*
    This controller is instantiated on page load, as opposed to
    application.controller which is instatiated on login.
*/
function CoreController(
    $scope,
    $rootScope,
    $state,
    socket
) {
    $rootScope.app = {
        name: 'Network Operations Center | OneLink',
        description: ''
    }

    // Checks if the given state is the current state
    $scope.is = function(name) {
        return $state.is(name)
    }

    // Checks if the given state/child states are present
    $scope.includes = function(name) {
        return $state.includes(name)
    }

    socket.on('connect', function() {
        console.log('Socket connection established.')
    })

    // Emit ready event.
    socket.emit('ready')

    // Listen for the talk event.
    socket.on('talk', function(data) {
        alert(data.message)
    })
}
