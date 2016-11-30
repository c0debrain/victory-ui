angular.module('app.controllers')
    .controller('controllers.application', ApplicationController)

ApplicationController.$inject = [
    '$rootScope',
    'services.account',
    'services.transaction',
    'services.category'
]

/*
    This controller is instantiated when a user logs in, as opposed to
    core.controller which is instatiated on page load.
*/
function ApplicationController(
    $rootScope,
    Accounts,
    Transactions,
    Category
) {

    // Retrieve User's Accounts
    Accounts.all(function(response) {
        console.log('Account Service Response: ', response.data)
        $rootScope.accounts = response.data

        // Map through and add filtered status to accounts
        $rootScope.accounts.map(function(account) {
            account.filtered = false
        })

        $rootScope.$broadcast('retrievedAccounts')
    })


    // Retrieve User's Transactions
    Transactions.allWithAll(function(response) {
        console.log('Transaction Service Response: ', response.data)
        $rootScope.transactions = response.data

        // Map through and add filtered status to accounts
        $rootScope.transactions.map(function(transaction) {
            transaction.filtered = false
        })

        $rootScope.$broadcast('retrievedTransactions')
    })


    /**
     * Pull in all categories
     * @type {[type]}
     */
    $rootScope.retrieveCategories = function() {
        // Limit the attributes we are retrieving
        var parameters = {
            attributes: ['id', 'hierarchy', 'type']
        }

        // Make request for categories
        Category.all(parameters, function(response) {
            console.log('Category Service Response: ', response.data)
            $rootScope.categories = response.data
        })
    }
    $rootScope.retrieveCategories()

}
