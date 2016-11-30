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
            $scope.scenarios = Scenario.allVirtuals(response.data)
            console.log('Scenario w/ Virtuals: ', $scope.scenarios)
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

    // Hack to make the date button show the datepicker
    $scope.showDatepicker = function() {
        $('#transaction-range-picker').data('daterangepicker').show()
    }

    // Pull information for the page
    $scope.pullScenarios()

    /**
     * Pull in all categories that have transactions and append those transactions
     * to the existing categories from the rootScope
     */
    Category.allWithTransactions({ required: true }, function(response) {
        console.log('Category Service Response: ', response.data, $scope.categories, $rootScope.categories)

        // Accumulate transaction amounts
        response.data.map(function(retrievedCategory) {
            retrievedCategory.total = retrievedCategory.transactions.reduce(function(previous, current) {
                return previous + current.amount
            }, 0)

            // Overwrite categories from rootScope
            $scope.categories = $rootScope.categories.map(function(category) {
                if (category.id === retrievedCategory.id) {
                    Object.keys(retrievedCategory).forEach(function(key) {
                        category[key] = retrievedCategory[key]
                    })
                }

                return category
            })
        })
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
                    $scope.scenarios = Scenario.allVirtuals($scope.scenarios)
                })
        }
    }


    /**
     * Calculates all the virtual fields for all Budgets provided
     *
     * @param   [budgets]   all Budgets to calculate
     * @return  [budgets]   all Budgets with virtual fields
     */
    Budget.allVirtuals = function(budgets) {
        return budgets.map(function(budget) {
            return Budget.virtuals(budget)
        })
    }


    /**
     * Calculates all the virtual fields for a Budget; are only existant
     * on the client-side and are determined by other real values that are
     * stored in the database. These fields cannot be persisted and must be
     * recalculated on page load and on certain page events.
     *
     * Virtual Fields:
     * @param budget.type
     * @param budget.total
     * @param budget.progress
     */
    Budget.virtuals = function(budget) {
        // Set default virtual properties
        budget.total = 0
        budget.progress = 0

        // Only if category has transactions
        // Iterate through transactions and accumulate
        if (budget.category.transactions) {
            budget.total = budget.category.transactions.reduceRight(function(previous, current) {
                return previous + current.amount
            }, 0)
        }

        // Don't bother calculating budget progress if no allowance is set
        if (budget.allowance !== 0 && budget.allowance) {
            budget.progress = Math.round((budget.total / budget.allowance) * 100)
        }

        return budget
    }


    /**
     * Calculates all the virtual fields for all Scenarios
     *
     * @param   [scenarios]     all Scenarios to calculate
     * @return  [scenarios]     all Scenarios with virtual fields
     */
    Scenario.allVirtuals = function(scenarios) {
        return scenarios.map(function(scenario) {
            return Scenario.virtuals(scenario)
        })
    }


    /**
     * Calculates all the virtual fields for a Scenario; are only existant
     * on the client-side and are determined by other real values that are
     * stored in the database. These fields cannot be persisted and must be
     * recalculated on page load and on certain page events.
     *
     * Virtual Fields:
     * @param scenario.income.actual
     * @param scenario.income.allowance
     * @param scenario.expenditure.actual
     * @param scenario.expenditure.allowance
     */
    Scenario.virtuals = function(scenario) {
        // Set default virtual properties
        scenario.income = {
            actual: 0,
            allowance: 0
        }
        scenario.expense = {
            actual: 0,
            allowance: 0
        }

        // Only perform this map if the scenario has a budgets property
        if (scenario.budgets) {
            scenario.budgets = Budget.allVirtuals(scenario.budgets)

            scenario.budgets.forEach(function(budget) {
                if ((budget.total !== 0 ? budget.total : budget.allowance) > 0) {
                    scenario.income.actual += budget.total
                    scenario.income.allowance += budget.allowance
                } else if ((budget.total !== 0 ? budget.total : budget.allowance) <= 0) {
                    scenario.expense.actual += budget.total
                    scenario.expense.allowance += budget.allowance
                }
            })

        // Otherwise assign an empty array of Budgets
        } else {
            scenario.budgets = []
        }

        return scenario
    }


    /**
     * Create a new Scenario and append it to the $scope list
     */
    $scope.createScenario = function() {
        // Creates and calculates nets for our one Scenario, which will involve
        // simply adding the net properties and setting them to zero
        new Scenario({ name: 'New Scenario' }).$save().then(function(response) {
            $scope.scenarios.push(Scenario.virtuals(response.data))
        })
    }


    /**
     * Update an existing Scenario, called by inline editing
     */
    $scope.updateScenario = function(scenario) {
        Scenario.update({ id: scenario.id }, scenario, function(response) {
            Object.keys(response.data).forEach(function(key) {
                scenario[key] = response.data[key]
            })

            scenario = Scenario.virtuals(scenario)
        })
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
     * Create a new Budget and append it to the $scope list
     */
    $scope.toggleCreateBudget = function(scenario) {
        var budget = Budget.virtuals({
            category: {
                hierarchy: ['Set Category'],
                transactions: []
            },
            total: 0,
            allowance: 0,
            scenario_id: scenario.id,
            incomplete: true
        })

        scenario.budgets.push(budget)
    }

    $scope.createBudget = function(scenario, budget) {
        new Budget(budget).$save().then(function(response) {
            Object.keys(response.data).forEach(function(key) {
                budget[key] = response.data[key]
            })

            scenario = Scenario.virtuals(scenario)
        })
    }

    $scope.updateBudget = function(scenario, budget) {
        Budget.update({ id: budget.id }, budget, function(response) {
            Object.keys(response.data).forEach(function(key) {
                budget[key] = response.data[key]
            })

            scenario = Scenario.virtuals(scenario)
        })
    }

    /**
     * Update an existing Budget, called by inline editing
     */
    $scope.handleBudgetChange = function(scenario, budget, category) {
        console.log(budget)

        // Overwrite the category & ID with it's association
        budget.category_id = category.id

        if (budget.id) {
            $scope.updateBudget(scenario, budget)
            console.log('Budget updated: ', budget)
        } else {
            $scope.createBudget(scenario, budget)
            console.log('Budget created: ', budget)
        }

        budget.incomplete = false

        console.log('Updated / Created Budget: ', budget)
    }


    /**
     * Delete an existing Budget, called by row dropdown
     */
    $scope.deleteBudget = function(scenario, budget) {
        if (budget.id) {
            Budget.delete({ id: budget.id }, budget)
        }

        // If the budget has an ID, strip it out of the scenario based on it; If
        // not, strip out the incomplete budget as this is the target of the deletion
        scenario.budgets = scenario.budgets.filter(function(item) {
            return (budget.id ? (item.id !== budget.id) : (item.incomplete !== true))
        })

        scenario = Scenario.virtuals(scenario)
    }
}
