angular.module('app.models')
    .factory('models.transaction', TransactionModel)

TransactionModel.$inject = [
    '$http',
    '$q'
]

function TransactionModel(
    $http,
    $q
) {
    function Transaction(data) {
        if (data) {
            this.setData(data)
        }
    }

    Transaction.prototype = {
        setData: function(data) {
            angular.extend(this, data)
        }
    }

    return Transaction
}
