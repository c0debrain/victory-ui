angular.module('app.services')
    .factory('services.category', CategoryService);

CategoryService.$inject = ['$resource', 'environment'];

function CategoryService($resource, Environment) {
    return $resource(Environment.api.path + '/categories/self/:id', { id: '@id' },
    {
        all: {
            method: 'GET',
            url: Environment.api.path + '/categories/'
        },
        allPrimary: {
            method: 'GET',
            url: Environment.api.path + '/categories/primary'
        }
    });
}
