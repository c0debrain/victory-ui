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
        angular.extend(this, data)
    }

    Scenario.prototype.getBudgets = function() {
        var deferred = $q.defer()
        var scope = this


        $http.get(Environment.api.path + '/scenarios/self/' + this.id + '/budgets')
            .then(function(response) {
                console.log('API response: ', response)

                var collection = []
                response.data.forEach(function(data) {
                    var instance = BudgetManager._retrieveInstance(data.cluster_name, data)
                    collection.push(instance)
                })

                deferred.resolve(collection)
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
