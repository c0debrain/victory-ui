'use strict';

/* Controllers */

angular.module('app')

.controller('EventFeedCtrl', ['$scope', function($scope) {
    $scope.events = [{
        type: "complete",
        details: "The server is running under optimal conditions."
    }, {
        type: "danger",
        details: "The server has exploded!"
    }, {
        type: "warning",
        details: "The server might explode."
    }, {
        type: "success",
        details: "Server has been destroyed captain!"
    }];

    // Every X seconds, copy one of the events and push it
    setInterval(function() {
        $scope.events.push(angular.copy($scope.events[Math.floor(Math.random() * 4)]));

        $scope.$apply();
    }, 5000)
}])

.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});