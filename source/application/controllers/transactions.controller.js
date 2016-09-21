angular.module('app.controllers')
    .controller('controllers.transaction', TransactionsController);

TransactionsController.$inject = ['$scope', 'services.transaction'];

function TransactionsController($scope, Transaction) {
    $scope.weekly = {
        amount: '-120.02'
    };

    $scope.monthly = {
        amount: '-678.00'
    };

    $scope.yearly = {
        amount: '-1280.20'
    };

    $scope.initialTransactions = [];
    $scope.transactions = [];

    // Retrieve User's Transactions
    Transaction.allWithAccounts(function(response) {
        console.log('Transaction Service Response: ', response.data);
        $scope.transactions = response.data;

        // Map through transactions and set filtered property
        $scope.transactions.map(function(transaction) {
            transaction.filtered = false;
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
