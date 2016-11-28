angular.module('app.services')
    .factory('services.scenario', ScenarioService)

ScenarioService.$inject = ['$resource', 'environment']

function ScenarioService($resource, Environment) {
    return $resource(Environment.api.path + '/scenarios/self/:id', { id: '@id' }, {
        all: {
            method: 'GET',
            url: Environment.api.path + '/scenarios/self'
        },
        allWithBudgets: {
            method: 'GET',
            url: Environment.api.path + '/scenarios/self/budgets'
        },
        allWithCategory: {
            method: 'GET',
            url: Environment.api.path + '/scenarios/self/category'
        },
        allWithTransactions: {
            method: 'GET',
            url: Environment.api.path + '/scenarios/self/transactions'
        },
        update: {
            method: 'PUT' // this method issues a PUT request
        }
    })
}
