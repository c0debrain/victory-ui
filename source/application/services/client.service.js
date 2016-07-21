angular.module('app.services')
    .factory('services.client', ClientService);

ClientService.$inject = ['$resource', 'environment'];

function ClientService($resource, Environment) {
    return $resource(Environment.api.path + '/clients/:id', { id: '@id' }, {
        all: {
            url: Environment.api.path + '/clients/',
            method: 'GET',
            cache: false,
            isArray: true
        },
        tree: {
            url: Environment.api.path + '/clients/tree',
            method: 'GET',
            cache: false,
            isArray: true
        },

        // Relations
        projects: {
            url: Environment.api.path + '/clients/:id/projects',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        origins: {
            url: Environment.api.path + '/clients/:id/origins',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        targets: {
            url: Environment.api.path + '/clients/:id/targets',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        clusters: {
            url: Environment.api.path + '/clients/:id/clusters',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        },
        datacenters: {
            url: Environment.api.path + '/clients/:id/datacenters',
            params: { id: '@id' },
            method: 'GET',
            cache: false,
            isArray: true
        }
    });
};
