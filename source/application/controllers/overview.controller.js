angular.module('app.controllers')
    .controller('controllers.overview', OverviewController);

OverviewController.$inject = ['$scope', '$interval'];

function OverviewController($scope) {
    console.log('Overview controller loaded!')
}
