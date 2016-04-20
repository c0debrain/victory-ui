'use strict';

/* Controllers */

angular.module('app')
    .controller('RegionCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$interval', function($scope, $stateParams, $state, $timeout, $interval) {
        // Redirect if no ID provided
        if (!$stateParams.id) { $state.go('app.overview'); }

        // External request to region information
            // Resolve returned Promise
            // IF success
                // Assign to $scope.region
            // IF failure
                // Throw error

        $scope.region = {
            name: "Amazon Web Services",
            abbreviation: "AWS",
            description: "Click on the refresh icon to simulate an AJAX call and to see an animated progress bar indicator above the portlet. These progress bars come in seven different colors that are available in the Pages contextual color scheme.",
            clusters: [
                {
                    name: "AWS-US-AA",
                    statistics: {
                        virtual_machines: 14,
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
                    name: "NVA-02",
                    virtual_machines: 5,
                    statistics: {
                        virtual_machines: 14,
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
                    name: "AWS-ASHFORD",
                    virtual_machines: 7,
                    statistics: {
                        virtual_machines: 14,
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
                    name: "AWS-US-DELTA",
                    virtual_machines: 8,
                    statistics: {
                        virtual_machines: 14,
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
                    name: "TEST-BIKESPOT",
                    virtual_machines: 2,
                    statistics: {
                        virtual_machines: 14,
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
                    name: "NVA-PCI-01",
                    virtual_machines: 12,
                    statistics: {
                        virtual_machines: 14,
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
                    name: "NVA-HILTON",
                    virtual_machines: 6,
                    statistics: {
                        virtual_machines: 14,
                        timezone: -5,
                        alerts: 3,
                        warnings: 15
                    },
                    status: {
                        stable: 35,
                        warning: 25,
                        danger: 40
                    }
                }
            ]
        };

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
        };

        $scope.refreshWithErrorTest = function(portlet) {
            console.log("Refreshing...");

            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    error: "Something went terribly wrong!"
                });
            }, 2000);
        };

        /* ============================================================
         * NVD3 Charts
         * ============================================================ */
        // $.Pages.getColor(colors[Math.floor(Math.random() * colors.length) + 1])
        var colors = [
            'success-light',
            'complete-light',
            'danger-light',
            'warning-light',
            'info-light'
        ];

        $scope.nvd3_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d.x
                },
                y: function(d) {
                    return d.y
                },
                color: [
                    $.Pages.getColor('success-light')
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
