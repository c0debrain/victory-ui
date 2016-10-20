angular.module('app.controllers')
    .controller('controllers.transaction', TransactionsController);

TransactionsController.$inject = ['$scope', '$rootScope', 'services.transaction'];

function TransactionsController($scope, $rootScope, Transaction) {
    $scope.showControls = false;
    $scope.transactions = [];
    $scope.initialTransactions = [];

    // Toggle the table header controls
    $scope.toggleControls = function() {
        $scope.showControls = !$scope.showControls;
    };

    // Function to inject transactions into this controller for rootScope
    $scope.injectTransactions = function(source, target) {
        if (source.transactions == null || source.accounts == null) {
            return console.log('Waiting for account & transaction data to be loaded...');
        }

        // Append accounts property to transaction object
        target.transactions = source.transactions.map(function(transaction) {
            transaction.filtered = false;

            // Determine account which transaction references
            transaction.account = source.accounts.filter(function(account) {
                if (transaction.plaid_account_id === account.plaid_id) {
                    return account;
                }
            })[0];

            return transaction;
        });

        // For
        target.initialTransactions = [].concat(target.transactions);

        console.info('Transactions <-> Accounts linked and injected into Transaction Controller.');
    };

    // Try to inject data into this controller
    $scope.injectTransactions($rootScope, $scope);

    // Inject transactions upon retrieval
    $scope.$on('retrievedTransactions', function() {
        $scope.injectTransactions($rootScope, $scope);
    });

    // Filter out specified accounts on event
    $scope.$on('toggleAccount', function(event, account) {
        $scope.transactions.forEach(function(transaction) {
            if (transaction.account.id === account.id) {
                console.log('Transaction from account filtered: ', transaction.name);
                transaction.filtered = !transaction.filtered;
            }
        });
    });
}
