angular.module('app.controllers')
    .controller('controllers.origin', OriginController)

OriginController.$inject = [
    '$scope',
    '$state',
    '$timeout',
    '$interval',
    '$http',
    'managers.origin'
]

function OriginController(
    $scope,
    $state,
    $timeout,
    $interval,
    $http,
    OriginManager
) {

    /**
     * Scope Variables
     */
    $scope.origin = {}
    var promise


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

    /**
     * Retrieve Targets of Origin
     */
    var getTargets = function() {
        $scope.origin.getTargets()
            .then(function(targets) {
                console.log('Targets: ', targets)
                $scope.targets = targets
            })
            .catch(function(error) {
                console.error('origin.getTargets: ', error)
            })
    }


    /**
     * Retrieve Origin Health
     */
    var getHealth = function() {
        $scope.origin.getHealth()
            .then(function(healthCollection) {
                // Push the retrieved data as a series on the chart
                $scope.chartConfiguration.series.push({
                    name: 'Health',
                    data: healthCollection.map(function(health) {
                        return [moment(health.health_dtm).calendar(), health.health_score]
                    }),
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
                $scope.chartConfiguration.xAxis.categories = healthCollection.map(function(health) {
                    return moment(health.health_dtm).calendar()
                })
            })
            .catch(function(error) {
                console.error('origin.getHealth: ', error)
            })
    }

    /**
     * Starts health retrieval loop
     */
    $scope.startHealthLoop = function() {
        $scope.stop
        getHealth()
        promise = $interval(getHealth, 10000)
    }


    /**
     * Ends health retrieval loop
     */
    $scope.stopHealthLoop = function() {
        $interval.cancel(promise)
    }

    /**
     * Collection data retrieval
     */
    OriginManager.get($state.params.id)
        .then(function(origin) {
            console.log('Origin: ', origin)
            $scope.origin = origin

            getTargets()
            $scope.startHealthLoop()
        }).catch(function(error) {
            console.error('Failed to retrieve origin metadata: ', error)
        })



    /**
     * Chart configuration
     * @type {Object}
     */
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


    /**
     * To Target State Change
     * @param  {[type]} target [description]
     * @return {[type]}        [description]
     */
    $scope.enterTarget = function(target) {
        $state.go('app.target', { id: target.target_id })
    }
}
