angular.module('app.services')
    .factory('services.transaction', TransactionService);

TransactionService.$inject = ['$resource', 'environment'];

function TransactionService($resource, Environment) {
    return $resource(Environment.api.path + '/transactions/self/:id', { id: '@id' },
    {
        all: {
            method: 'GET',
            url: Environment.api.path + '/transactions/self'
        },
        allWithAccounts: {
            method: 'GET',
            url: Environment.api.path + '/transactions/self/accounts'
        }
    });
}
