angular.module('app.filters')
    .filter('reverse', ReverseFilter);

function ReverseFilter() {
    return function(items) {
        return items.slice().reverse();
    };
}
