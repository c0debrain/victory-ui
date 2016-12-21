angular.module('app.services')
    .factory('services.authentication', AuthenticationService)

AuthenticationService.$inject = [
    'environment',
    '$http',
    '$q'
]

function AuthenticationService(
    Environment,
    $http,
    $q
) {
    return {
        authenticate: function(data) {
            var deferred = $q.defer()

            $http.post(Environment.api.path + '/authenticate/', data)
                .then(function(response) {
                    deferred.resolve(response)
                })
                .catch(function(error) {
                    console.error(error)
                    deferred.reject()
                })

            return deferred.promise
        }
    }
}
