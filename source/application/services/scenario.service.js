angular.module('app.services')
    .factory('services.scenario', ScenarioService);

ScenarioService.$inject = ['$resource', 'environment'];

function ScenarioService($resource, Environment) {
    return $resource(Environment.api.path + '/budgets/self/:id', { id: '@id' }, {
        all: {
            method: 'GET',
            url: Environment.api.path + '/scenarios/self'
        }
    });
}
