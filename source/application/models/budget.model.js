angular.module('app.models')
    .factory('models.budget', BudgetModel)

BudgetModel.$inject = [
    '$http',
    '$q'
]

function BudgetModel(
    $http,
    $q
) {
    function Budget(data) {
        if (data) {
            this.setData(data)
        }
    }


    Budget.prototype.setData = function(data) {
        angular.extend(this, data)
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
    Budget.prototype.virtuals = function(budget) {
        // Set default virtual properties
        budget.total = 0
        budget.progress = 0

        // Only if category has transactions
        // Iterate through transactions and accumulate
        if (budget.category) {
            if (budget.category.transactions) {
                budget.total = budget.category.transactions.reduceRight(function(previous, current) {
                    return previous + current.amount
                }, 0)
            }

            // Don't bother calculating budget progress if no allowance is set
            if (budget.allowance !== 0 && budget.allowance) {
                budget.progress = Math.round((budget.total / (budget.allowance * $scope.dateRange.periods)) * 100)
            }
        }

        return budget
    }


    return Budget
}
