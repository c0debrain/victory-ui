angular.module('app.filters')
    .filter('unique', UniqueFilter)

function UniqueFilter() {
    return function(arr, field) {
        var o = {},
            i, l = arr.length,
            r = []
        for (i = 0; i < l; i += 1) {
            o[arr[i][field]] = arr[i]
        }
        for (i in o) {
            r.push(o[i])
        }
        return r
    }
}