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

    $scope.chartConfig = {
        options: {
            //This is the Main Highcharts chart config. Any Highchart options are valid here.
            //will be overriden by values specified below.
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
        //The below properties are watched separately for changes.

        //Series object (optional) - a list of series using normal Highcharts series options.
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        //Title configuration (optional)
        title: {
            text: null
        },

        //Boolean to control showing loading status on chart (optional)
        //Could be a string if you want to show specific loading text.
        loading: false,

        //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
        //properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
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

        //Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
        useHighStocks: false,

        //function (optional)
        func: function(chart) {
            //setup some logic for the chart
        }
    }

    $scope.eventSources = []
}
