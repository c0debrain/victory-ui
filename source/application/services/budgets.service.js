angular.module('app.services')
    .factory('services.budget', BudgetService)

BudgetService.$inject = ['$resource', 'environment']

function BudgetService($resource, Environment) {
    return $resource(Environment.api.path + '/budgets/self/:id', { id: '@id' }, {
        all: {
            method: 'GET',
            url: Environment.api.path + '/budgets/self'
        },
        getWithTransactions: {
            method: 'GET',
            url: Environment.api.path + '/budgets/self/:id/transactions',
            params: {
                id: '@id'
            }
        },
        update: {
            method: 'PUT' // this method issues a PUT request
        }
    })
}
