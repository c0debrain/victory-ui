angular.module('app.services')
    .factory('services.budget', BudgetService);

BudgetService.$inject = ['$resource', 'environment'];

function BudgetService($resource, Environment) {
    return $resource(Environment.api.path + '/budgets/self/:id', { id: '@id' }, {
        all: {
            method: 'GET',
            url: Environment.api.path + '/budgets/self'
        }
    });
}
