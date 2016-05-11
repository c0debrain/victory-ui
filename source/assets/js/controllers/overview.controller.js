'use strict';

/* Controllers */

angular.module('app')
    .controller('OverviewCtrl', ['$scope', '$timeout', '$interval', function($scope, $timeout, $interval) {

        $scope.regions = [
            {
                name: "Datapipe Hong Kong",
                abbreviation: "DHK",
                description: "Click on the refresh icon to simulate an AJAX call and to see an animated progress bar indicator above the portlet. These progress bars come in seven different colors that are available in the Pages contextual color scheme.",
                statistics: {
                    clusters: 7,
                    timezone: -5,
                    alerts: 3,
                    warnings: 15
                },
                status: {
                    stable: 100,
                    warning: 0,
                    danger: 0
                }
            },
            {
                name: "Amazon Web Services",
                abbreviation: "AWS",
                description: "Click on the refresh icon to simulate an AJAX call and to see an animated progress bar indicator above the portlet. These progress bars come in seven different colors that are available in the Pages contextual color scheme.",
                statistics: {
                    clusters: 7,
                    timezone: -5,
                    alerts: 3,
                    warnings: 15
                },
                status: {
                    stable: 75,
                    warning: 25,
                    danger: 0
                }
            },
            {
                name: "Datapipe New Jersey",
                abbreviation: "DNJ",
                description: "Click on the refresh icon to simulate an AJAX call and to see an animated progress bar indicator above the portlet. These progress bars come in seven different colors that are available in the Pages contextual color scheme.",
                statistics: {
                    clusters: 7,
                    timezone: -5,
                    alerts: 3,
                    warnings: 15
                },
                status: {
                    stable: 35,
                    warning: 25,
                    danger: 40
                }
            },
            {
                name: "Contegix",
                abbreviation: "CTX",
                description: "Click on the refresh icon to simulate an AJAX call and to see an animated progress bar indicator above the portlet. These progress bars come in seven different colors that are available in the Pages contextual color scheme.",
                statistics: {
                    clusters: 7,
                    timezone: -5,
                    alerts: 3,
                    warnings: 15
                },
                status: {
                    stable: 0,
                    warning: 30,
                    danger: 70
                }
            }
        ];


        /* ============================================================
         * Portlets
         * ============================================================ */
        $scope.refreshTest = function(portlet) {
            console.log("Refreshing...");

            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);
        }

        $scope.refreshWithErrorTest = function(portlet) {
            console.log("Refreshing...");

            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    error: "Something went terribly wrong!"
                });
            }, 2000);
        }


        /* ============================================================
         * NVD3 Charts
         * ============================================================ */
        $scope.nvd3_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d.x
                },
                y: function(d) {
                    return d.y
                },
                height: 75,
                color: [
                    $.Pages.getColor('success')
                ],
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                tooltips: false,
                tooltipContent: function(key, y, e, graph) {
                    var data = graph.series.values[y - 1];
                    return data.x;
                },
                useInteractiveGuideline: false,
                interactive: false,
                forceY: [0, 2],
                showLegend: false,
                transitionDuration: 500,
                showYAxis: false,
                showXAxis: false
            }
        };

        $scope.nvd3_data = [{
            "values": [
                { x: 1, y: 23 },
                { x: 2, y: 13 },
                { x: 3, y: 66 },
                { x: 4, y: 44 },
                { x: 5, y: 22 },
                { x: 6, y: 11 },
                { x: 7, y: 99 },
                { x: 8, y: 66 },
                { x: 9, y: 44 }
            ],
            key: 'Response Time',
            area: true
        }];

        var x = 10;
        $interval(function() {
            $scope.nvd3_data[0].values.push({ x: x, y: Math.floor(Math.random() * 100) + 1 });

            if ($scope.nvd3_data[0].values.length > 20) $scope.nvd3_data[0].values.shift();
            x++;
        }, 2500);

    }]);
