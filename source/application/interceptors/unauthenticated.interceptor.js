angular.module('app.interceptors')
    .factory('interceptors.unauthenticated', UnauthenticatedInterceptor)

UnauthenticatedInterceptor.$inject = [
    '$location',
    '$q'
]

function UnauthenticatedInterceptor(
    $location,
    $q
) {
    return {
        response: function(response) {
            if (response.status === 401) {
                console.log("Response 401")
            }

            return response || $q.when(response)
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401", rejection)
                $location.path('/login').search('returnTo', $location.path())
            }

            return $q.reject(rejection)
        }
    }
}

angular.module('app').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(UnauthenticatedInterceptor)
}])
