angular.module('app.controllers')
    .controller('controllers.navigation', NavigationController)

NavigationController.$inject = ['$scope']

function NavigationController($scope) {
    $scope.menu = [
        {
            title: "Overview",
            url: "app.overview"
        }, {
            title: "Dispatch Alarms",
            url: "app.dispatch",
            badge: {
                type: 'complete',
                content: '21'
            }
        }
    ]
}
