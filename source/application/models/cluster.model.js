angular.module('app.models')
    .factory('models.cluster', ClusterModel)

ClusterModel.$inject = [
    '$http',
    '$q'
]

function ClusterModel(
    $http,
    $q
) {

    /**
     * Generate faked health data to be graphed
     * @param  {[object]}   datacenter which we want to fake data for
     * @return {[object]}
     */
    var mockStatistics = function(cluster) {
        cluster.status = { stable: Math.floor((Math.random() * 100) + 1) }
        cluster.status.warning = Math.floor(((100 -  cluster.status.stable) / 3) * 2)
        cluster.status.danger = Math.floor((100 -  cluster.status.stable) / 3)
        cluster.health = []

        // Generate health history
        for (var i = 0; i < 24; i++) {
            cluster.health.push({
                date: moment().startOf('hour').subtract(i + 1, 'hour').format(),
                status: Math.floor((Math.random() * 35) + 65)
            })
        }

        return cluster
    }

    function Cluster(data) {
        if (data) {
            this.setData(mockStatistics(data))
        }
    }

    Cluster.prototype = {
        setData: function(data) {
            angular.extend(this, data)
        }
    }

    return Cluster
}
