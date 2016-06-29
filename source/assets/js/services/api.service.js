angular.module('app.services')
    .factory('services.api', ApiResource);

ApiResource.$inject = ['environment'];

function ApiResource(env) {
    return {
        location: env.api.protocol + '://' + env.api.host + (env.dashboard.environment != 'production' ? ':' + env.api.port : '') + '/' + env.api.version
    };
};
