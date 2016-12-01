angular.module('app.filters')
    .filter('strictFilter', StrictFilter)

function StrictFilter($filter) {
    return function(input, predicate) {
        return $filter('filter')(input, predicate, true)
    }
}
