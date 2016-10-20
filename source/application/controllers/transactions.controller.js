angular.module('app.controllers')
    .controller('controllers.transaction', TransactionsController);

TransactionsController.$inject = ['$scope', '$rootScope', 'services.transaction'];

function TransactionsController($scope, $rootScope, Transaction) {
    $scope.weekly = {
        amount: '-120.02'
    };

    $scope.monthly = {
        amount: '-678.00'
    };

    $scope.yearly = {
        amount: '-1280.20'
    };

    $scope.showControls = false;
    $scope.transactions = [];
    $scope.initialTransactions = [];

    // Inject transactions upon retrieval
    $scope.$on('retrievedTransactions', function() {
        $scope.transactions = $rootScope.transactions.map(function(transaction) {
            transaction.filtered = false;

            transaction.account = $rootScope.accounts.filter(function(account) {
                if (transaction.plaid_account_id === account.plaid_id) {
                    return account;
                }
            })[0];

            return transaction;
        });

        $scope.initialTransactions = [].concat($scope.transactions);
    });

    // Filter out specified accounts on event
    $scope.$on('toggleAccount', function(event, account) {
        $scope.transactions.forEach(function(transaction) {
            if (transaction.PlaidAccount.id === account.id) {
                console.log('Transaction from account filtered: ', transaction.name);
                transaction.filtered = !transaction.filtered;
            }
        });
    });
}
