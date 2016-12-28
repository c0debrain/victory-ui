angular.module('app.controllers')
    .controller('controllers.budget', BudgetsController)

BudgetsController.$inject = [
    '$scope',
    '$rootScope',
    'services.category',
    'services.scenario',
    'services.budget',
    'services.notification',
    'managers.scenario',
    'managers.category',
    'managers.budget'
]

function BudgetsController(
    $scope,
    $rootScope,
    Category,
    Scenario,
    Budget,
    NotificationService,
    ScenarioManager,
    CategoryManager,
    BudgetManager
) {
    // Scope variables
    $scope.scenarios = []
    $scope.categories = []
    $scope.active = 1

    $scope.intervals = [
        {
            text: 'Daily',
            dateRange: moment().add(1, 'days').diff(moment())
        },
        {
            text: 'Weekly',
            dateRange: moment().add(1, 'weeks').diff(moment())
        },
        {
            text: 'Bi-Weekly',
            dateRange: moment().add(2, 'weeks').diff(moment())
        },
        {
            text: 'Monthly',
            dateRange: moment().add(1, 'months').diff(moment())
        },
        {
            text: 'Quarterly',
            dateRange: moment().add(3, 'months').diff(moment())
        },
        {
            text: 'Yearly',
            dateRange: moment().add(1, 'year').diff(moment())
        }
    ]

    $scope.dateRange = {
        dates: {
            startDate: moment().startOf('month'),
            endDate: moment()
        },
        periods: 1
    }

    // Had to write my own period calculations because moment.js does not take
    // into consideration the number of days in a month, and instead assumes
    // they all have 30 days.
    $scope.calculatePeriods = function() {
        var monthsInRange = Math.ceil(moment($scope.dateRange.dates.endDate).endOf('month')
            .diff(moment($scope.dateRange.dates.startDate).startOf('month'), 'months', true))
        console.log('Months in Range: ', monthsInRange)

        var daysInMonth = moment($scope.dateRange.dates.endDate).endOf('month')
            .diff(moment($scope.dateRange.dates.startDate).startOf('month'), 'days', true)
        console.log('Days in Month: ', daysInMonth)

        var daysInRange = $scope.dateRange.dates.endDate
            .diff($scope.dateRange.dates.startDate, 'days', true)
        console.log('Days in Range: ', daysInRange)

        $scope.dateRange.periods = (monthsInRange > 1 ? (daysInRange / daysInMonth) * monthsInRange : daysInRange / daysInMonth)
    }

    $scope.scenarioColors = [
        '#00AEEF', // Blue
        '#FECF39', // Yellow
        '#81736A', // Brown
        '#00AEEF', // Grey
        '#FFA2AD', // Red
        '#74C7A8', // Light Green
        '#00797A', // Dark Green
        '#8781BD' // Purple
    ]

    /**
     * Pull in all Scenarios with their associated budgets, categories and
     * transactions, then calculate their net values by iterating through all
     * mentioned associations and accumulating their values.
     */
    $scope.retrieveScenarios = function() {
        ScenarioManager.loadAll({
            relations: true,
            attributes: ['id'],
            startDate: moment($scope.dateRange.dates.startDate).format(),
            endDate: moment($scope.dateRange.dates.endDate).format()

        }).then(function(scenarios) {
            console.log('Scenario Manager Response: ', scenarios)
            $scope.scenarios = scenarios

            $scope.scenarios.forEach(function(scenario) {
                scenario.virtuals($scope.dateRange.dates)
            })

        }).catch(function(error) {
            NotificationService.create('warning', error)
        })

        // BudgetManager.loadAll({
        //     relations: true,
        //     attributes: ['id']
        // }).then(function(scenarios) {
        //     console.log('Scenario Manager Response: ', scenarios)
        //
        //     $scope.scenarios = ScenarioManager.virtuals(
        //         scenarios.map(function(scenario) {
        //             scenario.budgets = scenario.budgets.map(function(budget) {
        //                 return BudgetManager.get(budget.id)
        //             })
        //             return scenario
        //         })
        //     )
        // })
        // .catch(function(error) {
        //     NotificationService.create('warning', error)
        // })
    }


    $scope.datePickerOptions = {
        ranges: {
            'Today': [moment().startOf('day'), moment()],
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
        minMode: 'month',
        showWeekNumbers: true,
        eventHandlers: {
            'apply.daterangepicker': function(ev, picker) {
                $scope.calculatePeriods()
                $scope.retrieveScenarios()
                $scope.retrieveCategories()
            }
        }
    }

    // Hack to make the date button show the datepicker
    $scope.showDatepicker = function() {
        $('#transaction-range-picker').data('daterangepicker').show()
    }

    // Pull information for the page
    $scope.retrieveScenarios()

    /**
     * Pull in all categories that have transactions and append those transactions
     * to the existing categories from the rootScope
     */
    $scope.retrieveCategories = function() {
        CategoryManager.loadAll().then(function(categories) {
            console.log('Categories Manager Response: ', categories)

            $scope.categories = categories

            // categories.map(function(category) {
            //     category.total = category.transactions.reduce(function(previous, current) {
            //         return previous + current.amount
            //     }, 0)
            //
            //     return category
            // })

        }).catch(function(error) {
            NotificationService.create('warning', error)
        })

        // Category.allWithTransactions(parameters, function(response) {
        //     // console.log('Category Service Response: ', response.data, $scope.categories, $rootScope.categories)
        //
        //     // Accumulate transaction amounts
        //     response.data.map(function(retrievedCategory) {
        //         retrievedCategory.total = retrievedCategory.transactions.reduce(function(previous, current) {
        //             return previous + current.amount
        //         }, 0)
        //
        //         // Overwrite categories from rootScope
        //         $scope.categories = $rootScope.categories.map(function(category) {
        //             if (category.id === retrievedCategory.id) {
        //                 Object.keys(retrievedCategory).forEach(function(key) {
        //                     category[key] = retrievedCategory[key]
        //                 })
        //             }
        //
        //             return category
        //         })
        //     })
        // })
    }
    $scope.retrieveCategories()


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
     * Create a new Scenario and append it to the $scope list
     */
    $scope.createScenario = function() {
        // Creates and calculates nets for our one Scenario, which will involve
        // simply adding the net properties and setting them to zero
        new Scenario({
            name: 'New Scenario',
            color: $scope.scenarioColors[
                Math.floor(Math.random() * $scope.scenarioColors.length)
            ]
        }).$save().then(function(response) {
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
            interval: $scope.intervals[3],
            total: 0,
            allowance: 0,
            scenario_id: scenario.id,
            incomplete: true
        })

        scenario.budgets.push(budget)
    }

    $scope.createBudget = function(scenario, budget) {
        BudgetManager.create(budget)
            .then(function(budget) {
                ScenarioManager.set(Scenario.virtuals(budget))
            })

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
    $scope.handleBudgetCategoryChange = function(scenario, budget, category) {
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

    $scope.handleBudgetIntervalChange = function(scenario, budget, interval) {
        console.log(interval)

        budget.interval = interval
        $scope.updateBudget(scenario, budget)

        console.log('Updated Budget Interval: ', budget)
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
