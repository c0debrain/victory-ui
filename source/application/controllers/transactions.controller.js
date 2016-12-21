angular.module('app.controllers')
    .controller('controllers.transaction', TransactionsController)

TransactionsController.$inject = [
    '$scope',
    '$rootScope',
    'moment',
    'services.transaction',
    'services.scenario'
]

function TransactionsController(
    $scope,
    $rootScope,
    moment,
    Transaction,
    Scenario
) {
    $scope.initial = []
    $scope.transactions = []
    $scope.pulledTransactions = false

    $scope.dates = {
        startDate: moment().startOf('month'),
        endDate: moment()
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
        autoUpdateInput: true,
        locale: {
            format: 'MMM Do, YYYY'
        },
        eventHandlers: {
            'apply.daterangepicker': function(ev, picker) {
                $scope.retrieveTransactions({
                    startDate: moment($scope.dates.startDate).format(),
                    endDate: moment($scope.dates.endDate).format()
                })
            }
        }
    }

    // Retrieve User's Transactions
    $scope.retrieveTransactions = function(parameters) {
        Transaction.allWithAll(parameters, function(transactionResponse) {
            console.log('Transaction Service Response: ', transactionResponse.data)

            // Don't pull scenarios unless we have transactions
            if (transactionResponse.data.length > 0) {
                Scenario.allWithBudgets(function(scenarioResponse) {
                    console.log('Scenario Service Response: ', scenarioResponse.data)
                    $scope.scenarios = scenarioResponse.data

                    $scope.transactions = transactionResponse.data.map(function(transaction) {
                        transaction.scenarios = []

                        scenarioResponse.data.forEach(function(scenario) {
                            scenario.budgets.forEach(function(budget) {
                                if (budget.category_id === transaction.category_id) {
                                    transaction.scenarios.push(scenario)
                                }
                            })
                        })

                        return transaction
                    })

                    $scope.pulledTransactions = true
                })

                $scope.initial.concat($scope.transactions)

            // No Transactions were returned for the specified date range
            } else {
                $scope.transactions = []
                $scope.pulledTransactions = true
            }
        })

    }
    $scope.retrieveTransactions({
        startDate: moment($scope.dates.startDate).format(),
        endDate: moment($scope.dates.endDate).format()
    })

    // Hack to make the date button show the datepicker
    $scope.showDatepicker = function() {
        $('#transaction-range-picker').data('daterangepicker').show()
    }
}
