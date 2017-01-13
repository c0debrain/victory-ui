angular.module('app.models')
    .factory('models.client', ClientModel)

ClientModel.$inject = [
    'environment',
    '$http',
    '$q'
]

function ClientModel(
    Environment,
    $http,
    $q
) {
    function Client(data) {
        if (data) {
            this.setData(data)
        }
    }

    Client.prototype.setData = function(data) {
        angular.extend(this, data)
    }

    return Client
}
