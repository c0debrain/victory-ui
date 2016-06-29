angular.module('app.services')
    .factory('services.client', ClientService);

ClientService.$inject = ['$resource', 'services.api'];

function ClientService($resource, ApiResource) {
    return $resource(ApiResource.location + '/clients/:id', { id: '@id' }, {
        all: {
            url: ApiResource.location + '/clients/',
            method: 'GET',
            cache: false,
            isArray: true
        },
        tree: {
            url: ApiResource.location + '/clients/tree',
            method: 'GET',
            cache: false,
            isArray: true
        },

        // Relations
        projects: {
            url: ApiResource.location + '/clients/:id/projects',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        origins: {
            url: ApiResource.location + '/clients/:id/origins',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        targets: {
            url: ApiResource.location + '/clients/:id/targets',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        clusters: {
            url: ApiResource.location + '/clients/:id/clusters',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        datacenters: {
            url: ApiResource.location + '/clients/:id/datacenters',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        }
    });
};
