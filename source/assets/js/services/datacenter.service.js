angular.module('app.services')
    .factory('services.datacenter', DatacenterService);

DatacenterService.$inject = ['$resource', 'services.api'];

function DatacenterService($resource, ApiResource) {
    return $resource(ApiResource.location + '/datacenters/:id', { id: '@id' }, {
        all: {
            url: ApiResource.location + '/datacenters/',
            method: 'GET',
            cache: false,
            isArray: true
        },
        tree: {
            url: ApiResource.location + '/datacenters/tree',
            method: 'GET',
            cache: false,
            isArray: true
        },

        // Relations
        clients: {
            url: ApiResource.location + '/datacenters/:id/clients',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        projects: {
            url: ApiResource.location + '/datacenters/:id/projects',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        origins: {
            url: ApiResource.location + '/datacenters/:id/origins',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        targets: {
            url: ApiResource.location + '/datacenters/:id/targets',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        clusters: {
            url: ApiResource.location + '/datacenters/:id/clusters',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        }
    });
};
