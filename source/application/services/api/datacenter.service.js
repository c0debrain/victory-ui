angular.module('app.services')
    .factory('services.datacenter', DatacenterService)

DatacenterService.$inject = ['$resource', 'environment']

function DatacenterService($resource, Environment) {
    return $resource(Environment.api.path + '/datacenters/:id', { id: '@id' }, {
        all: {
            url: Environment.api.path + '/datacenters/',
            method: 'GET'
        }
    })
}
