angular.module('app.services')
    .factory('services.user', UserService);

UserService.$inject = ['$resource', 'environment'];

function UserService($resource, Environment) {
    return $resource(Environment.api.path + '/users/:id', { id: '@id' }, {
        all: {
            url: Environment.api.path + '/users/',
            method: 'GET',
            cache: false,
            isArray: true
        },

        // projects: {
        //     url: Environment.api.path + '/users/',
        //     method: 'POST',
        //     cache: false,
        //     isArray: false
        // },

        create: {
            url: Environment.api.path + '/users',
            method: 'POST'
        }
    });
}
