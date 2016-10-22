angular.module('app.controllers')
    .controller('controllers.budget', BudgetsController);

BudgetsController.$inject = ['$scope', '$rootScope', 'services.category', 'services.notification'];

function BudgetsController($scope, $rootScope, Category, Notification) {

    $scope.categories = [];
    $scope.activeCategories = [];
    $scope.inactiveCategories = [];

    $scope.active = 1;
    $scope.transactions = $rootScope.transactions;

    $scope.filterActiveCategories = function() {
        $scope.categories.forEach(function(category) {
            category.transactions = [];

            // Map through transactions and attach to matching category
            $rootScope.transactions.forEach(function(transaction) {
                if (transaction.category_id == category.plaid_id) {
                    category.transactions.push(transaction);
                }
            });

            // Only return categories containing transactions
            if (category.transactions.length > 0) {
                $scope.activeCategories.push(category);
            } else if (category.hierarchy.length <= 2) {
                $scope.inactiveCategories.push(category);
            }
        });
    }

    Category.all(function(response) {
        if (response.status === 'error') {
            Notification.create('warning', 'Failed to pull categories.', 0);
        }

        $scope.categories = response.data;

        if ($rootScope.transactions != null) {
            $scope.filterActiveCategories();
        }
    });

    // Inject transactions upon retrieval
    $scope.$on('retrievedTransactions', function() {
        $scope.filterActiveCategories();
    });
}
