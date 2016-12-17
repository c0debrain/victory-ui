angular.module('app.controllers')
    .controller('controllers.forecast', ForecastController)

ForecastController.$inject = [
    '$scope',
    '$rootScope',
    'moment',
    'services.transaction',
    'services.scenario',
    'services.user'
]

function ForecastController(
    $scope,
    $rootScope,
    moment,
    Transaction,
    Scenario,
    User
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

    User.netWorth({ startDate: moment().subtract(3, 'years').format() }, function(response) {
        $scope.netWorth = response.data

        console.log('Net Worth: ', $scope.netWorth)

        $scope.chartConfig.series.push({
            data: $scope.netWorth
        })
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
            data: []
        }],
        // Title configuration (optional)
        title: {
            text: null
        },

        // Boolean to control showing loading status on chart (optional)
        // Could be a string if you want to show specific loading text.
        loading: true,

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
