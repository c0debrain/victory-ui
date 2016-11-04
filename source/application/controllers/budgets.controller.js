angular.module('app.controllers')
    .controller('controllers.budget', BudgetsController);

BudgetsController.$inject = ['$scope', '$rootScope', 'services.category', 'services.scenario', 'services.notification'];

function BudgetsController($scope, $rootScope, Category, Scenario, Notification) {

    $scope.scenarios = [];

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

    Scenario.allWithTransactions(function(response) {
        if (response.status === 'error') {
            Notification.create('warning', 'Failed to pull scenarios.', 0);
        }

        console.log('Scenario Service Response: ', response.data);
        $scope.scenarios = response.data;

        // response.data.map(function(scenario) {
        //     scenario.budgets.map(function(budget) {
        //         budget.category.transactions = $rootScope.transactions.filter(function(transaction) {
        //             return transaction.category_id == budget.category.plaid_id;
        //         });
        //     });
        // });

        setTimeout(function() {
            console.log('Scenarios after accumulation: ', $scope.scenarios)
        }, 1000);
    });

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
