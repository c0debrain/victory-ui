angular.module('app.controllers')
    .controller('controllers.account', AccountsController)

AccountsController.$inject = [
    '$scope',
    '$rootScope',
    'services.account',
    'services.notification',
    'plaidLink'
]

function AccountsController(
    $scope,
    $rootScope,
    Account,
    $NotificationService,
    plaidLink
) {
    $scope.accounts = $rootScope.accounts

    // Plaid connect modal
    $scope.linkAccount = function() {
        if (plaidLink.isLoaded()) {
            plaidLink.open()
        } else {
            console.log('Plaid Link isn\'t loaded!')
        }
    }

    // TODO: Need to figure out how to add newly linked accounts to application
    $scope.$on('newAccounts', function(accounts) {
        accounts.forEach(function(account) {
            $scope.accounts.push(account)
        })
    })
}
