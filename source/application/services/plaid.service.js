angular.module('app.services')
    .factory('services.plaid', PlaidService)

PlaidService.$inject = [
    'environment',
    '$http',
    '$q'
]

function PlaidService(
    Environment,
    $http,
    $q
) {
    return {
        exchangeToken: function(token) {
            var deferred = $q.defer()

            $http.post(Environment.api.path + '/plaid/self/exchange', {
                public_token: token
            }).then(function(response) {
                deferred.resolve(response)
            })
            .catch(function(error) {
                console.error(error)
                deferred.reject()
            })

            return deferred.promise
        },

        refreshAccounts: function() {
            var deferred = $q.defer()

            $http.get(Environment.api.path + '/plaid/self/accounts')
                .then(function(response) {
                    deferred.resolve(response)
                })
                .catch(function(error) {
                    console.error(error)
                    deferred.reject()
                })

            return deferred.promise
        },

        refreshTransactions: function() {
            var deferred = $q.defer()

            $http.get(Environment.api.path + '/plaid/self/transactions')
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
