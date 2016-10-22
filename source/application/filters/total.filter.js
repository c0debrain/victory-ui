angular.module('app.filters')
    .filter('propertyTotal', TotalFilter);

function TotalFilter($filter) {
    return function(itemArray, property) {
        return itemArray.reduce(function(previous, current, index) {
            return previous + current[property];
        }, 0);
    };
};
