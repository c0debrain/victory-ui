angular.module('app.models')
    .factory('models.datacenter', DatacenterModel)

DatacenterModel.$inject = [
    '$http',
    '$q'
]

function DatacenterModel(
    $http,
    $q
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
                status: Math.floor((Math.random() * 100) + 1)
            })
        }

        return datacenter
    }

    function Datacenter(data) {
        if (data) {
            this.setData(mockStatistics(data))
        }
    }

    Datacenter.prototype = {
        setData: function(data) {
            angular.extend(this, data)
        }
    }

    return Datacenter
}
