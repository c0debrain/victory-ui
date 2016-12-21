angular.module('app.controllers')
    .controller('controllers.datacenter', DatacenterController)

DatacenterController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    '$interval',
    'managers.datacenter'
]

function DatacenterController(
    $scope,
    $state,
    $timeout,
    $interval,
    DatacenterManager
) {
    $scope.datacenter = {}

    /**
     * Helper that extends area and lines to the left and right plot edges.
     *
     * Has to be invoked with .call(), giving Highchart as the this reference
     * and Highchart event as the second parameter.
     *
     * @return void
     */
    function edgeExtend(chart) {
        var self = chart

        chart.series.map(function(series) {
            // Get inner-chart box
            var box = self.plotBox

            // Take areas path
            var areaPath = series.areaPath

            // Add start point
            // Right after the first element (M)
            areaPath.splice(1, 0, 0, areaPath[2], 'L')

            // Add Last points upper area end
            // Remove penultimate point
            // Replace it with a new point reaching to the width of chart and growing to the height of last element
            // And add the bottom-right corner
            areaPath.splice(-6, 3, 'L', box.width, areaPath[areaPath.length - 7], 'L', box.width, box.height)

            // Make the last points X be zero - that will result in bottom left corner
            areaPath[areaPath.length - 2] = 0

            // Replace value (redraw)
            series.area.element.attributes.d.value = areaPath.join(' ')
            var graphPath = series.graphPath

            // Add start point
            // Right after the first element (M)
            graphPath.splice(1, 0, 0, graphPath[2], 'L')

            // Add end point
            graphPath.push('L', box.width, graphPath[graphPath.length - 1])
            series.graph.element.attributes.d.value = graphPath.join(' ')
        })
    }


    DatacenterManager.get($state.params.id).then(function(datacenter) {
        $scope.datacenter = datacenter
        console.log('Datacenter: ', $scope.datacenter)

        datacenter.getClusters()
            .then(function(clusters) {
                console.log('Clusters: ', clusters)
                $scope.clusters = clusters
            })


        // Push the retrieved data as a series on the chart
        $scope.chartConfiguration.series.push({
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
                lineColor: null,
                lineWidth: 1.5,
                width: 6,
                height: 6,
                radius: 3,
                symbol: 'circle'
            }
        })

        // Assign the X-Axis values
        $scope.chartConfiguration.xAxis.categories = datacenter.health.map(function(health) {
            return moment(health.date).format('HH:mm')
        }).reverse()
    })

    $scope.chartConfiguration = {
        options: {
            chart: {
                animation: true,
                type: 'area',
                spacingLeft: 0,
                spacingRight: 0,
                spacingTop: 0,
                style: {
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontSize: '12px'
                },
                events: {
                    redraw: function(event) {
                        edgeExtend(event.target)
                    }
                }
            },
            tooltip: {
                style: {
                    padding: 15,
                    fontWeight: 'bold'
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                show: false
            }
        },
        series: [],
        title: {
            text: null
        },
        loading: false,
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
            endOnTick: false,
            softMax: 100,
            softMin: 0
        },
        func: function(chart) {
            $timeout(function() {
                chart.reflow()
            })
        }
    }
}
