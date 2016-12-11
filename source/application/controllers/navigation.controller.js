angular.module('app.controllers')
    .controller('controllers.navigation', NavigationController)

NavigationController.$inject = [
    '$scope'
]

function NavigationController(
    $scope
) {
    $scope.menu = [
        {
            title: "Overview",
            url: "app.overview"
        }, {
            title: "Transactions",
            url: "app.transactions",
            badge: {
                type: 'complete',
                content: '21'
            }
        }, {
            title: "Budgets",
            url: "app.budgets"
        }, {
            title: "Goals",
            url: "app.goals"
        }, {
            title: "Forecast",
            url: "app.forecast"
        }
    ]
}
