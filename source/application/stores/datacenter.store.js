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
    var datacenters = {}

    // Listen for the talk event.
    Socket.on('datacenters:health', function(data) {
        console.log('New datacenter health: ', data)
    })

    return {
        load: function() {
            return Api.datacenter.all().$promise.then(function(response) {
                if (response.status !== 'success') {
                    return Notification.create('danger', 'Failed to pull datacenters from API.')
                }

                // Mock statistical values until we have real data
                response.data.forEach(function(datacenter) {
                    datacenter.statistics = {
                        clusters: Math.floor((Math.random() * 20) + 1),
                        alerts: Math.floor((Math.random() * 10) + 1),
                        warnings: Math.floor((Math.random() * 30) + 1)
                    }
                    datacenter.status = { stable: Math.floor((Math.random() * 100) + 1) }
                    datacenter.status.warning = Math.floor(((100 -  datacenter.status.stable) / 3) * 2)
                    datacenter.status.danger = Math.floor((100 -  datacenter.status.stable) / 3)

                    // Make associative array entry
                    datacenters[datacenter.data_center_code] = datacenter
                })

                return datacenters
            })
        },

        set: function(key, value) {
            datacenters[key] = value
        },

        update: function(key, properties) {
            datacenters[key] = angular.extend(datacenters[key], properties)
            return datacenters[key]
        },

        findOne: function(key) {
            return datacenters[key]
        },

        findAll: function() {
            return datacenters
        },

        toArray: function() {
            return Object.keys(datacenters).map(function(key, index) {
                return datacenters[key]
            })
        }
    }
}
