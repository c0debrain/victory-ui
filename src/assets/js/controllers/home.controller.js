'use strict';

/* Controllers */

angular.module('app')
    .controller('HomeCtrl', ['$scope', function($scope) {

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
                color: [
                    $.Pages.getColor('success')
                ],
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                tooltips: true,
                tooltipContent: function(key, y, e, graph) {
                    var data = graph.series.values[y - 1];
                    return
                    '<p>' + data.x + '</p>'
                },
                useInteractiveGuideline: false,
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
        setInterval(function() {
            $scope.nvd3_data[0].values.push({ x: x, y: Math.floor(Math.random() * 100) + 1 });

            if ($scope.nvd3_data[0].values.length > 20) $scope.nvd3_data[0].values.shift();
            x++;

            $scope.$apply(); // update both chart
        }, 222500);

        /* ============================================================
         * Sparkline Charts
         * ============================================================ */

        $scope.sparkline_line_data = [
            0, 10, 8, 20, 15, 10, 15, 5,
            0, 10, 8, 20, 15, 10, 15, 5,
            0, 10, 8, 20, 15, 10, 15, 5
        ];
        $scope.sparkline_line_options = {
            type: 'line',
            width: '100%',
            height: '75',
            highlightLineColor: 'rgba(0,0,0,.09)',
            highlightSpotColor: 'rgba(0,0,0,0)',
            chartRangeMax: 25,
            fillColor: $.Pages.getColor('success', .3), // Get Pages contextual color
            lineColor: $.Pages.getColor('success', .8),
            lineWidth: 1,
            spotColor: null,
            minSpotColor: null,
            maxSpotColor: null,
            highlightSpotColor: null
        };
    }]);
