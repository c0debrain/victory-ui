angular.module('app.filters')
    .filter('inverse', InverseFilter)

function InverseFilter($filter) {
    return function(number) {
        return (number * -1)
    }
}
