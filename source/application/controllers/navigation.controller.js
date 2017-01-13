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
            title: "Datacenters Worldview",
            url: "app.datacenters"
        },
        {
            title: "Clients Worldview",
            url: "app.clients"
        },
        {
            title: "Origins Worldview",
            url: "app.origins"
        },
        {
            title: "Targets Worldview",
            url: "app.targets"
        }
    ]
}
