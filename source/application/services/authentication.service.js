angular.module('app.services')
    .factory('services.authentication', AuthenticationService);

AuthenticationService.$inject = ['$resource', 'environment'];

function AuthenticationService($resource, Environment) {
    return $resource(Environment.api.path + '/authenticate/', {}, {
        authenticate: {
            url: Environment.api.path + '/authenticate/',
            method: 'POST'
        }
    });
}
