angular.module('app.controllers')
    .controller('controllers.eventfeed', EventfeedController);

EventfeedController.$inject = ['$scope', '$interval'];

function EventfeedController($scope, $interval) {
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
    $interval(function() {
        $scope.events.push(angular.copy($scope.events[Math.floor(Math.random() * 4)]));
        if ($scope.events.length > 10) $scope.events.shift();
    }, 5000)
}
