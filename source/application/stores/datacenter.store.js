angular.module('app.stores')
    .factory('stores.datacenter', DatacenterStore)

DatacenterStore.$inject = [
    'services.api',
    'services.socket'
]

function DatacenterStore(
    Api,
    Socket
) {
    /*
        Class Properties
     */
    var datacenters = {}

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


    /*
        Class Socket Events
     */
    Socket.on('datacenters:health', function(data) {
        console.log('New datacenter health: ', data)
    })


    /**
     * Load in data from the API for a datacenter
     * @param  {[string]}   key         key of the datacenter to load
     * @param  {Function}   callback    to be executed on the returned data
     * @return {Function}               callback executed on the returned data
     */
    var load = function(key, callback) {
        Api.datacenter.get({ id: key }, function(response) {
            if (response.status !== 'success') {
                return Notification.create('danger', 'Failed to pull datacenters from API.')
            }

            // Mock statistical values until we have real data
            var datacenter = mockStatistics(response.data[0])

            // Make associative array entry
            datacenters[datacenter.data_center_code] = datacenter

            callback(datacenter)
        })
    }

    /**
     * Load in data from the API for all datacenters
     * @param  {Function}   callback    to be executed on the returned data
     * @return {Function}               callback executed on the returned data
     */
    var loadAll = function(callback) {
        Api.datacenter.all(function(response) {
            if (response.status !== 'success') {
                return Notification.create('danger', 'Failed to pull datacenters from API.')
            }

            // Mock statistical values until we have real data
            response.data.forEach(function(datacenter) {
                datacenter = mockStatistics(datacenter)

                // Make associative array entry
                datacenters[datacenter.data_center_code] = datacenter
            })

            callback(datacenters)
        })
    }

    var set = function(key, value) {
        datacenters[key] = value
    }

    var setAll = function() {
        return
    }

    var update = function(key, properties) {
        if (datacenters.length > 0 && datacenters[key]) {
            datacenters[key] = angular.extend(datacenters[key], properties)
            return datacenters[key]
        }

        return false
    }

    var updateAll = function() {
        return
    }

    var find = function(key, callback) {
        if (datacenters && datacenters[key]) { return datacenters[key] }
        return load(key, callback)
    }

    var findAll = function(callback) {
        if (datacenters) { return datacenters }
        return loadAll(callback)
    }

    /**
     * Converts the object to an array and strips out reference keys. Returned
     * value is a pure array which can easily be iterated over and mapped.
     */
    var toArray = function() {
        return Object.keys(datacenters).map(function(key, index) {
            return datacenters[key]
        })
    }

    /*
        Class Returned Object
     */
    return {
        load: load,
        loadAll: loadAll,
        find: find,
        findAll: findAll,
        set: set,
        setAll: setAll,
        update: update,
        updateAll: updateAll,
        toArray: toArray
    }
}
