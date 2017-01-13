angular.module('app.models')
    .factory('models.origin', OriginModel)

OriginModel.$inject = [
    'environment',
    '$http',
    '$q',
    'managers.target'
]

function OriginModel(
    Environment,
    $http,
    $q,
    TargetManager
) {
    function Origin(data) {
        if (data) {
            this.setData(data)
        }
    }

    Origin.prototype.setData = function(data) {
        angular.extend(this, data)
    }

    Origin.prototype.getTargets = function() {
        var deferred = $q.defer()
        var scope = this

        $http.get(Environment.api.path + '/origins/' + this.origin_id + '/targets')
            .then(function(response) {
                console.log('API response: ', response)

                var collection = []

                response.data.forEach(function(data) {
                    var instance = TargetManager._retrieveInstance(data.target_id, data)
                    collection.push(instance)
                })

                deferred.resolve(collection)
            })
            .catch(function(error) {
                console.error(error)
                deferred.reject()
            })

        return deferred.promise
    }

    Origin.prototype.getHealth = function() {
        var deferred = $q.defer()
        var scope = this

        $http.get(Environment.api.path + '/origins/' + this.origin_id + '/health')
            .then(function(response) {
                console.log('Origin Health History Response: ', response)

                scope.setData(response.data.origin_id, response.data)

                deferred.resolve(response.data)
            })
            .catch(function(error) {
                console.error(error)
                deferred.reject()
            })

        return deferred.promise
    }

    return Origin
}
