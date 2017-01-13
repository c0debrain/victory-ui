angular.module('app.models')
    .factory('models.datacenter', DatacenterModel)

DatacenterModel.$inject = [
    'environment',
    '$http',
    '$q',
    'managers.cluster'
]

function DatacenterModel(
    Environment,
    $http,
    $q,
    ClusterManager
) {

    /**
     * Generate faked health data to be graphed
     * @param  {[object]}   datacenter which we want to fake data for
     * @return {[object]}
     */
    var mockStatistics = function(datacenter) {
        datacenter.status = { stable: Math.floor((Math.random() * 100) + 1) }
        datacenter.status.warning = Math.floor(((100 -  datacenter.status.stable) / 3) * 2)
        datacenter.status.danger = Math.floor((100 -  datacenter.status.stable) / 3)
        datacenter.health = []

        // Generate health history
        for (var i = 0; i < 24; i++) {
            datacenter.health.push({
                date: moment().startOf('hour').subtract(i + 1, 'hour').format(),
                status: Math.floor((Math.random() * 35) + 65)
            })
        }

        return datacenter
    }

    function Datacenter(data) {
        if (data) {
            this.setData(data)
        }
    }

    Datacenter.prototype.setData = function(data) {
        angular.extend(this, data)
    }

    Datacenter.prototype.getClusters = function() {
        var deferred = $q.defer()
        var scope = this

        $http.get(Environment.api.path + '/datacenters/' + this.data_center_code + '/clusters')
            .then(function(response) {
                console.log('API response: ', response)

                var collection = []

                response.data.forEach(function(data) {
                    var instance = ClusterManager._retrieveInstance(data.cluster_name, data)
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

    return Datacenter
}
