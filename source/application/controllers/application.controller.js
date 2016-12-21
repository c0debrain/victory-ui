angular.module('app.controllers')
    .controller('controllers.application', ApplicationController)

ApplicationController.$inject = [
    '$rootScope',
    'services.account',
    'services.transaction',
    'services.category',
    'managers.account',
    'services.notification'
]

/*
    This controller is instantiated when a user logs in, as opposed to
    core.controller which is instatiated on page load.
*/
function ApplicationController(
    $rootScope,
    Accounts,
    Transactions,
    Category,
    AccountManager,
    NotificationService
) {
    AccountManager.loadAll()
        .then(function(accounts) {
            $rootScope.accounts = accounts
        }).catch(function(error) {
            NotificationService.create('warning', error)
        })
}
