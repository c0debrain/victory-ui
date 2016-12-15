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

    var mockStatistics = function(datacenter) {
        datacenter.statistics = {
            clusters: Math.floor((Math.random() * 20) + 1),
            alerts: Math.floor((Math.random() * 10) + 1),
            warnings: Math.floor((Math.random() * 30) + 1)
        }
        datacenter.status = { stable: Math.floor((Math.random() * 100) + 1) }
        datacenter.status.warning = Math.floor(((100 -  datacenter.status.stable) / 3) * 2)
        datacenter.status.danger = Math.floor((100 -  datacenter.status.stable) / 3)

        return datacenter
    }


    /*
        Class Socket Events
     */
    Socket.on('datacenters:health', function(data) {
        console.log('New datacenter health: ', data)
    })


    /*
        Class Methods
     */
    var load = function(key, callback) {
        Api.datacenter.get({ id: key })
            .$promise.then(function(response) {
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

    var loadAll = function() {
        return Api.datacenter.all().$promise.then(function(response) {
            if (response.status !== 'success') {
                return Notification.create('danger', 'Failed to pull datacenters from API.')
            }

            // Mock statistical values until we have real data
            response.data.forEach(function(datacenter) {
                datacenter = mockStatistics(datacenter)

                // Make associative array entry
                datacenters[datacenter.data_center_code] = datacenter
            })

            return datacenters
        })
    }

    var set = function(key, value) {
        datacenters[key] = value
    }

    var setAll = function() {
        return
    }

    var update = function(key, properties) {
        datacenters[key] = angular.extend(datacenters[key], properties)
        return datacenters[key]
    }

    var updateAll = function() {
        return
    }

    var find = function(key) {
        if (datacenters && datacenters[key]) {
            console.log('Entity exists in collection, returning: ', datacenters[key])
            return datacenters[key]
        }

        console.log('Entity does not exist in collection, retrieving...')
        return load(key, function(datacenter) {
            return datacenter
        })
    }

    var findAll = function() {
        if (datacenters) {
            return datacenters
        }

        return loadAll()
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
