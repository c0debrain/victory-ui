angular.module('app.controllers')
    .controller('controllers.budget', BudgetsController)

BudgetsController.$inject = [
    '$scope',
    '$rootScope',
    'services.category',
    'services.scenario',
    'services.budget',
    'services.notification'
]

function BudgetsController(
    $scope,
    $rootScope,
    Category,
    Scenario,
    Budget,
    Notification
) {
    // Scope variables
    $scope.scenarios = []
    $scope.categories = []
    $scope.active = 1

    $scope.dates = {
        startDate: moment().startOf('month'),
        endDate: moment()
    }


    /**
     * Pull in all Scenarios with their associated budgets, categories and
     * transactions, then calculate their net values by iterating through all
     * mentioned associations and accumulating their values.
     */
    $scope.pullScenarios = function() {
        var parameters = {}
        if ($scope.dates.startDate !== null && $scope.dates.endDate !== null) {
            parameters = {
                startDate: moment($scope.dates.startDate).format(),
                endDate: moment($scope.dates.endDate).format()
            }
        }

        Scenario.allWithTransactions(parameters, function(response) {
            if (response.status === 'error') {
                Notification.create('warning', 'Failed to pull scenarios.', 0)
            }

            console.log('Scenario Service Response: ', response.data)
            $scope.scenarios = calculateNet(response.data)
        })
    }


    $scope.datePickerOptions = {
        ranges: {
            'Today': [moment().startOf('day'), moment()],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Week': [moment().startOf('week'), moment()],
            'This Month': [moment().startOf('month'), moment()],
            'Last Month': [
                moment().subtract(1, 'months').startOf('month'),
                moment().subtract(1, 'months').endOf('month')
            ]
        },
        opens: 'left',
        locale: {
            format: 'MMM Do, YYYY'
        },
        eventHandlers: {
            'apply.daterangepicker': function(ev, picker) {
                $scope.pullScenarios()
            }
        }
    }

    // Pull information for the page
    $scope.pullScenarios()

    /**
     * Pull in all categories
     * @type {[type]}
     */
    Category.allWithTransactions(function(response) {
        if (response.status === 'error') {
            Notification.create('warning', 'Failed to pull categories.', 0)
        }

        // Accumulate transaction amounts
        response.data.map(function(category) {
            category.total = category.transactions.reduce(function(previous, current) {
                return previous + current.amount
            }, 0)
        })

        console.log('Category Service Response: ', response.data)
        $scope.categories = response.data
    })


    $scope.dragOptions = {
        beforeDrop: function(event) {
            console.log('Src Source Node: ', event)

            var budget = event.source.cloneModel

            if (event.dest.nodesScope.$parent.$parent.scenario.id === budget.scenario_id) {
                console.log('Copy budget failed, cannot copy to same scenario: ', budget)
                return false
            }

            var duplicateTrigger = false
            event.dest.nodesScope.$modelValue.forEach(function(budgetItem) {
                if (budgetItem.category_id === budget.category_id) {
                    duplicateTrigger = true
                }
            })

            if (duplicateTrigger === true) {
                console.log('Copy budget failed, duplicate found: ', budget)
                return false
            }

            var newBudget = new Budget({
                name: budget.name,
                category_id: budget.category_id,
                scenario_id: event.dest.nodesScope.$parent.$parent.scenario.id,
                type: budget.type,
                allowance: budget.allowance
            })

            newBudget.$save()
                .then(function(response) {
                    event.source.cloneModel = response.data
                    $scope.scenarios = calculateNet($scope.scenarios)
                })
        }
    }


    /**
     * [calculateNet description]
     * @param  {[type]} scenarios   all scenarios to calculate
     * @return {[type]}             scenarios with net calculations
     */
    var calculateNet = function(scenarios) {
        return scenarios.map(function(scenario) {
            scenario.income = {
                actual: 0,
                allowance: 0
            }

            scenario.expenditure = {
                actual: 0,
                allowance: 0
            }

            if (!scenario.budgets) {
                scenario.budgets = [];
                return scenario
            }

            scenario.budgets.forEach(function(budget) {
                budget.total = 0

                budget.category.transactions.forEach(function(transaction) {
                    if (transaction.amount > 0) {
                        scenario.income.actual += transaction.amount
                    } else if (transaction.amount < 0) {
                        scenario.expenditure.actual += transaction.amount
                    }

                    budget.total += transaction.amount
                })

                if (budget.type === 'income') {
                    scenario.income.allowance += budget.allowance
                } else if (budget.type === 'expense') {
                    scenario.expenditure.allowance += budget.allowance
                }

                budget.progress = Math.round((Math.abs(budget.total) / Math.abs(budget.allowance)) * 100)
            })

            return scenario
        })
    }


    /**
     * Create a new Scenario and append it to the $scope list
     */
    $scope.createScenario = function() {
        var newScenario = new Scenario({ name: 'New Scenario' })

        // Creates and calculates nets for our one Scenario, which will involve
        // simply adding the net properties and setting them to zero
        newScenario.$save()
            .then(function(response) {
                $scope.scenarios.push(calculateNet([response.data])[0])
            })
    }


    /**
     * Update an existing Scenario, called by inline editing
     */
    $scope.updateScenario = function(scenario) {
        Scenario.update({ id: scenario.id }, scenario)
        $scope.scenarios = calculateNet($scope.scenarios)
    }


    /**
     * Delete an existing Scenario, called by inline editing
     */
    $scope.deleteScenario = function(scenario) {
        Scenario.delete({ id: scenario.id }, scenario)

        $scope.scenarios = $scope.scenarios.filter(function(item) {
            return item.id !== scenario.id
        })
    }


    /**
     * Update an existing Budget, called by inline editing
     */
    $scope.updateBudget = function(budget) {
        Budget.update({ id: budget.id }, budget)
        $scope.scenarios = calculateNet($scope.scenarios)
    }


    /**
     * Delete an existing Budget, called by row dropdown
     */
    $scope.deleteBudget = function(budget) {
        Budget.delete({ id: budget.id }, budget)

        $scope.scenarios = $scope.scenarios.map(function(scenario) {
            scenario.budgets = scenario.budgets.filter(function(item) {
                return item.id !== budget.id
            })

            return scenario
        })

        $scope.scenarios = calculateNet($scope.scenarios)
    }
}
