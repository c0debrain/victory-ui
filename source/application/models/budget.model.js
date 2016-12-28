angular.module('app.models')
    .factory('models.budget', BudgetModel)

BudgetModel.$inject = [
    'environment',
    '$http',
    '$q'
]

function BudgetModel(
    Environment,
    $http,
    $q
) {
    function Budget(data) {
        if (data) {
            this.setData(data)
        }
    }


    Budget.prototype.setData = function(data) {
        data.total = data.total || 0
        data.progress = data.progress || 0
        data.total = data.total || 0

        angular.extend(this, data)
    }

    Budget.prototype.update = function(data) {
        var deferred = $q.defer()
        var scope = this

        $http.put(Environment.api.path + '/budgets/self/' + data.id, data)
            .then(function(response) {
                var instance = angular.extend(scope, response.data)
                deferred.resolve(instance)
            })
            .catch(function(error) {
                console.error(error)
                deferred.reject()
            })

        return deferred.promise
    }

    /**
     * Calculates all the virtual fields for a Budget; are only existant
     * on the client-side and are determined by other real values that are
     * stored in the database. These fields cannot be persisted and must be
     * recalculated on page load and on certain page events.
     *
     * Virtual Fields:
     * @param budget.type
     * @param budget.total
     * @param budget.progress
     */
    Budget.prototype.virtuals = function(datePeriods) {
        // Set default virtual properties
        this.total = 0
        this.progress = 0

        // Only if category has transactions
        // Iterate through transactions and accumulate
        if (this.category) {
            if (this.category.transactions) {
                this.total = this.category.transactions.reduceRight(function(previous, current) {
                    return previous + current.amount
                }, 0)
            }

            // Don't bother calculating budget progress if no allowance is set
            if (this.allowance !== 0 && this.allowance) {
                this.progress = Math.round((this.total / (this.allowance * datePeriods)) * 100)
            }
        }

        return this
    }


    return Budget
}
