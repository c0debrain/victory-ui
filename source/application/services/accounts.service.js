angular.module('app.services')
    .factory('services.account', AccountService);

AccountService.$inject = ['$resource', 'environment'];

function AccountService($resource, Environment) {
    return $resource(Environment.api.path + '/accounts/:id', { id: '@id' }, {
        all: {
            url: Environment.api.path + '/accounts/self',
            method: 'GET'
        },
        connect: {
            url: Environment.api.path + '/plaid/connect',
            method: 'POST'
        },
        exchange: {
            url: Environment.api.path + '/plaid/exchange',
            method: 'POST'
        }
    });
}
