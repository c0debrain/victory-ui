angular.module('app.controllers')
    .controller('controllers.application', ApplicationController);

ApplicationController.$inject = ['$rootScope', 'services.account', 'services.transaction'];

/*
    This controller is instantiated when a user logs in, as opposed to
    core.controller which is instatiated on page load.
*/
function ApplicationController($rootScope, $Accounts, $Transactions) {

    // Retrieve User's Accounts
    $Accounts.all(function(response) {
        console.log('Account Service Response: ', response.data);
        $rootScope.accounts = response.data;

        // Map through and add filtered status to accounts
        $rootScope.accounts.map(function(account) {
            account.filtered = false;
        });

        $rootScope.$broadcast('retrievedAccounts');
    });

    // Retrieve User's Transactions
    $Transactions.all(function(response) {
        console.log('Transaction Service Response: ', response.data);
        $rootScope.transactions = response.data;

        $rootScope.$broadcast('retrievedTransactions');
    });
};
