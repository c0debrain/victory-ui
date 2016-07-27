angular.module('app.services')
    .factory('services.datacenter', DatacenterService);

DatacenterService.$inject = ['$resource', 'environment'];

function DatacenterService($resource, Environment) {
    return $resource(Environment.api.path + '/datacenters/:id', { id: '@id' }, {
        all: {
            url: Environment.api.path + '/datacenters/',
            method: 'GET',
            cache: false,
            isArray: true
        },
        tree: {
            url: Environment.api.path + '/datacenters/tree',
            method: 'GET',
            cache: false,
            isArray: true
        },

        // Relations
        clients: {
            url: Environment.api.path + '/datacenters/:id/clients',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        projects: {
            url: Environment.api.path + '/datacenters/:id/projects',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        origins: {
            url: Environment.api.path + '/datacenters/:id/origins',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        targets: {
            url: Environment.api.path + '/datacenters/:id/targets',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        clusters: {
            url: Environment.api.path + '/datacenters/:id/clusters',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        }
    });
}
