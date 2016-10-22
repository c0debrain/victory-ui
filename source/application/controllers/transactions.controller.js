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
    
    $scope.initialTransactions = [].concat($rootScope.transactions);

    // Inject transactions upon retrieval
    $scope.$on('retrievedTransactions', function() {
        $scope.initialTransactions = [].concat($rootScope.transactions);
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
