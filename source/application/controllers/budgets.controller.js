angular.module('app.controllers')
    .controller('controllers.budget', BudgetsController);

BudgetsController.$inject = ['$scope', '$rootScope', 'services.category', 'services.notification'];

function BudgetsController($scope, $rootScope, Category, Notification) {

    $scope.categories = [];
    $scope.active = 1;
    $scope.transactions = $rootScope.transactions;

    $scope.filterActiveCategories = function() {
        return $scope.categories.filter(function(category) {
            category.transactions = [];

            // Map through transactions and attach to matching category
            $rootScope.transactions.map(function(transaction) {
                if (transaction.category_id == category.plaid_id) {
                    category.transactions.push(transaction);
                }
            });

            // Only return categories containing transactions
            if (category.transactions.length > 0) {
                return category;
            }
        });
    }

    Category.all(function(response) {
        if (response.status === 'error') {
            Notification.create('warning', 'Failed to pull categories.', 0);
        }

        $scope.categories = response.data;

        if ($rootScope.transactions != null) {
            $scope.activeCategories = $scope.filterActiveCategories();
        }
    });

    // Inject transactions upon retrieval
    $scope.$on('retrievedTransactions', function() {
        $scope.activeCategories = $scope.filterActiveCategories();
    });
}
