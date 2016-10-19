angular.module('app.controllers')
    .controller('controllers.overview', OverviewController);

OverviewController.$inject = ['$scope'];

function OverviewController($scope) {
    console.warn('Overview controller instantiated');
};
