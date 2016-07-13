angular.module('app.directives')
    .directive('amMap', ['$q', function($q) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=',
                height: '@',
                width: '@'
            },
            template: '<div class="ammap"></div>',
            link: function($scope, $el) {
                var id = $el[0].id;
                $el.attr('id', id);

                var map = AmCharts.makeChart(id, $scope.options);
                map.write(id);
            }
        };
    }]);
