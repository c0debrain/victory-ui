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
    'managers.budget',
    'models.budget'
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
    BudgetManager,
    BudgetModel
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

    /**
     * Pull in all Scenarios with their associated budgets, categories and
     * transactions, then calculate their net values by iterating through all
     * mentioned associations and accumulating their values.
     */
    $scope.retrieveScenarios = function() {
        ScenarioManager.loadAll({
            startDate: $scope.dateRange.dates.startDate.format(),
            endDate: $scope.dateRange.dates.endDate.format()

        }).then(function(scenarios) {
            console.log('Scenario Manager Response: ', scenarios)
            $scope.scenarios = scenarios

            $scope.scenarios.forEach(function(scenario) {
                scenario.virtuals($scope.dateRange.periods)
            })

        }).catch(function(error) {
            NotificationService.create('warning', error)
        })
    }

    // Pull information for the page
    $scope.retrieveScenarios()

    /**
     * Pull in all categories that have transactions and append those transactions
     * to the existing categories from the rootScope
     */
    $scope.retrieveCategories = function() {
        CategoryManager.loadAllWithTransactions({
            startDate: $scope.dateRange.dates.startDate.format(),
            endDate: $scope.dateRange.dates.endDate.format()
        }).then(function(categories) {
            console.log('Categories Manager Response: ', categories)
            $scope.categories = categories

        }).catch(function(error) {
            NotificationService.create('warning', error)
        })
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

            BudgetManager.create({
                name: budget.name,
                category_id: budget.category_id,
                scenario_id: event.dest.nodesScope.$parent.$parent.scenario.id,
                type: budget.type,
                allowance: budget.allowance
            }).then(function(budget) {
                event.source.cloneModel = budget
                ScenarioManager.get(budget.scenario_id).then(function(scenario) {
                    scenario.virtuals($scope.dateRange.periods)
                })
            })
        }
    }


    /**
     * Create a new Scenario and append it to the $scope list
     */
    $scope.createScenario = function() {
        // Creates and calculates nets for our one Scenario, which will involve
        // simply adding the net properties and setting them to zero
        ScenarioManager.create({
            name: 'New Scenario',
            color: $scope.scenarioColors[
                Math.floor(Math.random() * $scope.scenarioColors.length)
            ]
        }).then(function(scenario) {
            scenario.virtuals($scope.dateRange.periods)
            $scope.scenarios.push(scenario)
            console.log('New Scenario: ', scenario)
        })
    }


    /**
     * Update an existing Scenario, called by inline editing
     */
    $scope.updateScenario = function(scenario) {
        scenario.update(scenario)
        scenario.virtuals($scope.dateRange.periods)
    }


    /**
     * Delete an existing Scenario, called by inline editing
     */
    $scope.deleteScenario = function(scenario) {
        ScenarioManager.delete(scenario.id)

        $scope.scenarios = $scope.scenarios.filter(function(item) {
            return item.id !== scenario.id
        })
    }


    /**
     * Create a new Budget and append it to the $scope list
     */
    $scope.toggleCreateBudget = function(scenario) {
        var budget = new BudgetModel({
            // Generate a temporary ID
            temporary_id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
                return v.toString(16)
            }),
            category: {
                hierarchy: ['Set Category'],
                transactions: []
            },
            interval: $scope.intervals[3],
            allowance: 0,
            scenario_id: scenario.id,
            incomplete: true,
            total: 0,
            progress: 0
        })

        console.log('Skeleton Budget: ', budget)

        scenario.budgets.push(budget)
        scenario.virtuals($scope.dateRange.periods)

        console.log('Budget Manager: ', BudgetManager._pool)
    }

    $scope.createBudget = function(scenario, budget, category) {
        BudgetManager.create(budget, category).then(function(newBudget) {
            // Strip the placeholder out of the scope
            scenario.budgets = scenario.budgets.filter(function(item) {
                return item.temporary_id !== budget.temporary_id
            })

            // Push the new Budget instance to the scope
            scenario.budgets.push(newBudget)

            // Update virtuals
            scenario.virtuals($scope.dateRange.periods)

            console.log(scenario.budgets, budget)
        })
    }

    $scope.updateBudget = function(scenario, budget) {
        BudgetManager.update(budget, {
            startDate: $scope.dateRange.dates.startDate,
            endDate: $scope.dateRange.dates.endDate
        }).then(function(budget) {
            scenario.virtuals($scope.dateRange.periods)
        })
    }

    /**
     * Update an existing Budget, called by inline editing
     */
    $scope.handleBudgetCategoryChange = function(scenario, budget, category) {
        // Overwrite the category & ID with it's association
        budget.category_id = category.id
        budget.category = category

        if (budget.incomplete) {
            console.log('Creating Budget: ', budget)
            $scope.createBudget(scenario, budget, category)
        } else {
            $scope.updateBudget(scenario, budget)
        }

        budget.incomplete = false
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
        BudgetManager.delete(budget.id)

        // If the budget has an ID, strip it out of the scenario based on it; If
        // not, strip out the incomplete budget as this is the target of the deletion
        scenario.budgets = scenario.budgets.filter(function(item) {
            return (budget.id ? (item.id !== budget.id) : (item.incomplete !== true))
        })

        scenario.virtuals($scope.dateRange.periods)
    }
}
