angular.module('app.filters')
    .filter('capitalize', CapitalizeFilter)

function CapitalizeFilter($filter) {
    return function(token) {
        return token.charAt(0).toUpperCase() + token.slice(1)
    }
}
