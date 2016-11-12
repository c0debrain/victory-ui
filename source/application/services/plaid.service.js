angular.module('app.services')
    .factory('services.plaid', PlaidService);

PlaidService.$inject = ['$resource', 'environment'];

function PlaidService($resource, Environment) {
    return $resource(Environment.api.path + '/plaid/', {}, {
        connect: {
            url: Environment.api.path + '/plaid/connect',
            method: 'POST'
        },
        exchange: {
            url: Environment.api.path + '/plaid/exchange',
            method: 'POST'
        }
    })
}
