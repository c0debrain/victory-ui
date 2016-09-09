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
    Transaction.all(function(response) {
        console.log('Transaction Service Response: ', response.data);
        $scope.transactions = response.data;
    }.bind(this));
}
