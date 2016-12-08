angular.module('app.services')
    .factory('services.client', ClientService)

ClientService.$inject = ['$resource', 'environment']

function ClientService($resource, Environment) {
    return $resource(Environment.api.path + '/clients/:id', { id: '@id' }, {
        all: {
            url: Environment.api.path + '/clients/',
            method: 'GET'
        },
        tree: {
            url: Environment.api.path + '/clients/tree',
            method: 'GET'
        }
    })
}
