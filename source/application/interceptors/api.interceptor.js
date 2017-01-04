angular.module('app.interceptors')
    .factory('interceptors.api', ApiInterceptor)

ApiInterceptor.$inject = [
    '$q'
]

function ApiInterceptor(
    $q
) {
    return {
        response: function(response) {
            if (response.data.data) {
                response.data = response.data.data
            }

            return response || $q.when(response)
        }
    }
}

angular.module('app').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(ApiInterceptor)
}])
