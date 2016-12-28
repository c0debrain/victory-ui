angular.module('app.models')
    .factory('models.scenario', ScenarioModel)

ScenarioModel.$inject = [
    'environment',
    '$http',
    '$q',
    'managers.budget'
]

function ScenarioModel(
    Environment,
    $http,
    $q,
    BudgetManager
) {
    function Scenario(data) {
        if (data) {
            this.setData(data)
        }
    }

    Scenario.prototype.setData = function(data) {
        return angular.extend(this, data)
    }


    Scenario.prototype.update = function(data) {
        var deferred = $q.defer()
        var scope = this

        $http.put(Environment.api.path + '/scenarios/self/' + data.id, data)
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
     * Calculates all the virtual fields for a Scenario; are only existant
     * on the client-side and are determined by other real values that are
     * stored in the database. These fields cannot be persisted and must be
     * recalculated on page load and on certain page events.
     *
     * Virtual Fields:
     * @param scenario.income.actual
     * @param scenario.income.allowance
     * @param scenario.expenditure.actual
     * @param scenario.expenditure.allowance
     */
    Scenario.prototype.virtuals = function(datePeriods) {
        var scope = this

        // Set default virtual properties
        scope.income = {
            actual: 0,
            allowance: 0
        }
        scope.expense = {
            actual: 0,
            allowance: 0
        }

        // Only perform this map if the scenario has a budgets property
        if (scope.budgets) {
            scope.budgets.forEach(function(budget) {
                budget.virtuals(datePeriods)
            })

            scope.budgets.forEach(function(budget) {
                if ((budget.total !== 0 ? budget.total : budget.allowance) > 0) {
                    scope.income.actual += budget.total
                    scope.income.allowance += budget.allowance
                } else if ((budget.total !== 0 ? budget.total : budget.allowance) <= 0) {
                    scope.expense.actual += budget.total
                    scope.expense.allowance += budget.allowance
                }
            })

            // Otherwise assign an empty array of Budgets
        } else {
            scope.budgets = []
        }

        return scope
    }


    return Scenario
}
