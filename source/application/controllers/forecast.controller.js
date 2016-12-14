angular.module('app.controllers')
    .controller('controllers.forecast', ForecastController)

ForecastController.$inject = [
    '$scope',
    '$rootScope',
    'moment',
    'services.transaction',
    'services.scenario'
]

function ForecastController(
    $scope,
    $rootScope,
    moment,
    Transaction,
    Scenario
) {
    $scope.active = 1
    $scope.transactions = []
    $scope.scenarios = []

    // What do we need for the chart
        // List of transactions grouped by day
        // Scenarios w/ Budgets

    // What do we need to do to them
        // Apply budgets on days after current date

    Scenario.allWithBudgets(function(response) {
        $scope.scenarios = response.data
        console.log('Scenario Service Response: ', $scope.scenarios)
    })

    Transaction.all(function(response) {
        var groupBy = function(xs, key) {
            return xs.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x)
                return rv
            }, {})
        }

        // Group transactions by date (day in this case, due to the way Plaid dates are)
        $scope.transactions = groupBy(response.data.map(function(transaction) {
            transaction.date = moment(transaction.date).format('MM/DD/YY')
            return transaction
        }), 'date')

        console.log('Transaction Service Response: ', $scope.transactions)

        // $scope.values = Object.keys($scope.transactions).map(function(date) {
        //     return $scope.transactions[date].reduce(function(previous, current) {
        //         return previous + current.amount
        //     }, ($rootScope.currentNetWorth || 0))
        // })

        $scope.dateTotals = []
        var keyMap = Object.keys($scope.transactions).sort().reverse()

        console.log('Current Net Worth: ', $rootScope.currentNetWorth)
        console.log('KeyMap Length: ', keyMap)

        // Iterate through the array backwards
        // for (var i = 0; i <= keyMap.length - 1; i++) {
        //     $scope.dateTotals[keyMap[i]] = $scope.transactions[keyMap[i]].reduce(function(previous, current) {
        //         return previous + current.amount
        //     }, 0)
        //
        //     console.log('Transactions @ ' + keyMap[i] + ': ', $scope.transactions[keyMap[i]])
        // }

        // console.log('keyMap: ', keyMap)

        keyMap.forEach(function(currentValue) {
            var total = $scope.transactions[currentValue].reduce(function(previous, current) {
                return previous + current.amount
            }, 0)

            if (currentValue === keyMap[0]) {
                total += $rootScope.currentNetWorth
            } else {
                console.log($scope.dateTotals, moment(currentValue).subtract(1, 'day').format('MM/DD/YY'))
                // total += $scope.dateTotals[moment(currentValue).subtract(1, 'day').format()]
            }

            $scope.dateTotals[currentValue] = total
        })

        console.log('Values: ', $scope.dateTotals)
    })



    // Chart Configuration
    $scope.chartConfig = {
        options: {
            // This is the Main Highcharts chart config. Any Highchart options are valid here.
            // will be overriden by values specified below.
            chart: {
                type: 'areaspline'
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            },
            margin: 0
        },
        // The below properties are watched separately for changes.

        // Series object (optional) - a list of series using normal Highcharts series options.
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        // Title configuration (optional)
        title: {
            text: null
        },

        // Boolean to control showing loading status on chart (optional)
        // Could be a string if you want to show specific loading text.
        loading: false,

        // Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        // properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
        xAxis: {
            currentMin: 0,
            currentMax: 20,
            title: {
                text: ''
            },
            credits: {
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: ''
            }
        },

        // Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
        useHighStocks: false,

        // function (optional)
        func: function(chart) {
            // setup some logic for the chart
        }
    }

    $scope.eventSources = []
}
