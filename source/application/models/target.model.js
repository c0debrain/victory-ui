angular.module('app.models')
    .factory('models.target', TargetModel)

TargetModel.$inject = [
    'environment',
    '$http',
    '$q'
]

function TargetModel(
    Environment,
    $http,
    $q
) {
    function Target(data) {
        if (data) {
            this.setData(data)
        }
    }

    Target.prototype.setData = function(data) {
        angular.extend(this, data)
    }

    return Target
}
