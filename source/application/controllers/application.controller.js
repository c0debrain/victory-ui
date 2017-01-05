angular.module('app.controllers')
    .controller('controllers.application', ApplicationController)

ApplicationController.$inject = [
    '$scope',
    '$state',
    'services.plaid',
    'managers.account',
    'managers.transaction',
    'services.notification',
    'plaidLink',
]

/*
    This controller is instantiated when a user logs in, as opposed to
    core.controller which is instatiated on page load.
*/
function ApplicationController(
    $scope,
    $state,
    PlaidService,
    AccountManager,
    TransactionManager,
    NotificationService,
    PlaidLink
) {
    $scope.navigation = [
        {
            title: "Overview",
            url: "app.overview"
        }, {
            title: "Transactions",
            url: "app.transactions",
            badge: {
                type: 'complete',
                content: '21'
            }
        }, {
            title: "Budgets",
            url: "app.budgets"
        }, {
            title: "Goals",
            url: "app.goals"
        }, {
            title: "Forecast",
            url: "app.forecast"
        }
    ]

    AccountManager.loadAll()
        .then(function(accounts) {
            $scope.accounts = accounts
        }).catch(function(error) {
            NotificationService.create('warning', error)
        })

    $scope.logout = function() {
        $state.go('access.login')
    }


    // Plaid connect modal
    $scope.linkAccount = function() {
        if (PlaidLink.isLoaded()) {
            PlaidLink.open()
        } else {
            console.log('Plaid Link isn\'t loaded!')
        }
    }

    $scope.refreshAccounts = function() {
        $scope.refreshing = true
        var refreshing = {
            accounts: true,
            transactions: true
        }

        PlaidService.refreshAccounts()
            .then(function(response) {
                if (response.data.length > 0) {
                    response.data.forEach(function(token) {
                        if (token.data.length > 0) {
                            token.data.forEach(function(account) {
                                AccountManager.set(account)
                            })
                        }
                    })
                }

                refreshing.accounts = false
                $scope.refreshing = (!refreshing.accounts && !refreshing.transactions ? false : true)
            }).catch(function(error) {
                console.error('Refresh accounts failed: ', error)
            })

        PlaidService.refreshTransactions()
            .then(function(response) {
                if (response.data.length > 0) {
                    response.data.forEach(function(token) {
                        if (token.data.length > 0) {
                            token.data.forEach(function(transaction) {
                                TransactionManager.set(transaction)
                            })
                        }
                    })
                }

                refreshing.transactions = false
                $scope.refreshing = (!refreshing.accounts && !refreshing.transactions ? false : true)
            }).catch(function(error) {
                console.error('Refresh transactions failed: ', error)
            })
    }
}
