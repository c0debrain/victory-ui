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

        response.data.map(function(scenario) {
            scenario.income = 0
            scenario.expenditure = 0

            scenario.budgets.forEach(function(budget) {
                budget.total = 0

                budget.category.transactions.forEach(function(transaction) {
                    if (transaction.amount > 0) {
                        scenario.income += transaction.amount
                    } else if (transaction.amount < 0) {
                        scenario.expenditure += transaction.amount
                    }

                    budget.total += transaction.amount
                })

                budget.progress = Math.round((Math.abs(budget.total) / Math.abs(budget.allowance)) * 100)
            })

            // scenario.budgets.reduce(function(previous, current) {
            //     return previous + current.category.transactions.reduce(function(previous, current) {
            //         return previous + current
            //     }, 0)
            // }, 0)
        })

        console.log('Scenario Service Response: ', response.data);
        $scope.scenarios = response.data;
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

    $scope.createScenario = function() {
        var newScenario = new Scenario({ name: 'New Scenario' })
        newScenario.$save()
            .then(function(response) {
                var scenario = response.data
                scenario.budgets = []
                scenario.expenditure = 0
                scenario.income = 0

                console.log('New Scenario: ', scenario)

                $scope.scenarios.push(scenario)
            })

        console.log('Scenarios: ', $scope.scenarios)
    }
}
