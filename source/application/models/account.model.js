angular.module('app.models')
    .factory('models.account', AccountModel)

AccountModel.$inject = [
    '$http',
    '$q'
]

function AccountModel(
    $http,
    $q
) {
    function Account(data) {
        if (data) {
            this.setData(data)
        }
    }

    Account.prototype = {
        setData: function(data) {
            angular.extend(this, data)
        }
    }

    return Account
}
