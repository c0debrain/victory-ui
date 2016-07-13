angular.module('app.controllers')
    .controller('controllers.map', MapController);

MapController.$inject = ['$scope'];

function MapController($scope) {

    $scope.amMapOptions = {
        type: "map",
        theme: "light",
        pathToImages: "http://www.amcharts.com/lib/3/images/",
        addClassNames: true,
        areasSettings: {
            alpha: 0.75,
            rollOverAlpha: 0.75,
            selectedAlpha: 1,
            autoZoom: true,
            rollOverOutlineColor: "#9a7bca",
            selectedColor: undefined,
            color: "#eee",
            outlineColor: "#3B4752"
        },
        backgroundZoomsToTop: true,
        dataProvider: {
            map: "worldLow",
            getAreasFromMap: true,
            areas: [
            {
                id: 'US',
                color: '#525263'
            }]
        },
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        zoomControl: {
            zoomControlEnabled: false,
            homeButtonEnabled: false,
            panControlEnabled: false
        }
    };
};
