angular.module('app.controllers')
    .controller('controllers.application', ApplicationController)

ApplicationController.$inject = [
    '$rootScope',
    'services.api',
    'stores.datacenter'
]

/*
    This controller is instantiated when a user logs in, as opposed to
    core.controller which is instatiated on page load.
*/
function ApplicationController(
    $rootScope,
    Api,
    Datacenter
) {

}
