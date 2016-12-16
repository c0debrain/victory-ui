angular.module('app.controllers')
    .controller('controllers.datacenter', DatacenterController)

DatacenterController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    'managers.datacenter'
]

function DatacenterController(
    $scope,
    $state,
    $timeout,
    DatacenterManager
) {
    $scope.datacenter = {}
    console.log('Code: ', $state.params.id)

    DatacenterManager.get($state.params.id).then(function(datacenter) {
        $scope.datacenter = datacenter

        console.log('Datacenter: ', $scope.datacenter)

        $scope.chartConfig.series.push({
            name: 'Performance',
            data: datacenter.health.map(function(health) {
                return [moment(health.date).calendar(), health.status]
            }).reverse(),
            type: 'area',
            color: "#2099ea",
            lineWidth: 1,
            dashStyle: "longdash",
            fillOpacity: 0.08,
            marker: {
                fillColor: "#FFF",
                lineColor: "#2099ea",
                lineWidth: 1.5,
                width: 6,
                height: 6,
                radius: 3,
                symbol: 'circle'
            }
        })

        $scope.chartConfig.xAxis.categories = datacenter.health.map(function(health) {
            return moment(health.date).format('HH:mm')
        }).reverse()
    })

    $scope.chartConfig = {
        options: {
            // This is the Main Highcharts chart config. Any Highchart options are valid here.
            // will be overriden by values specified below.
            chart: {
                animation: false,
                type: 'area',
                spacingLeft: 0,
                spacingRight: 0,
                spacingTop: 0,

                style: {
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '12px'
                }
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            },
            legend: {
                enabled: false
            }
        },
        // The below properties are watched separately for changes.

        // Series object (optional) - a list of series using normal Highcharts series options.
        series: [],

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
            crosshair: {
                color: "#e5e5e5",
                width: 2,
                zIndex: 2,
                dashStyle: "shortdash"
            },
            startOnTick: false,
            endOnTick: false,
            gridLineWidth: 0,
            minPadding: 0,
            maxPadding: 0,
            tickLength: 0
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                align: "left",
                x: 10,
                y: -8
            },
            startOnTick: false,
            endOnTick: false
        },
        func: function(chart) {
            $timeout(function() {
                chart.reflow()
            }, 0)
        }
    }
}
