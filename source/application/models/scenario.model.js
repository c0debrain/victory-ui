angular.module('app.models')
    .factory('models.scenario', ScenarioModel)

ScenarioModel.$inject = [
    '$http',
    '$q',
    'managers.budget'
]

function ScenarioModel(
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
    Scenario.prototype.virtuals = function(scenario) {
        // Set default virtual properties
        scenario.income = {
            actual: 0,
            allowance: 0
        }
        scenario.expense = {
            actual: 0,
            allowance: 0
        }

        // Only perform this map if the scenario has a budgets property
        if (scenario.budgets) {
            scenario.budgets = BudgetManager.virtuals(scenario.budgets)

            scenario.budgets.forEach(function(budget) {
                if ((budget.total !== 0 ? budget.total : budget.allowance) > 0) {
                    scenario.income.actual += budget.total
                    scenario.income.allowance += budget.allowance
                } else if ((budget.total !== 0 ? budget.total : budget.allowance) <= 0) {
                    scenario.expense.actual += budget.total
                    scenario.expense.allowance += budget.allowance
                }
            })

        // Otherwise assign an empty array of Budgets
        } else {
            scenario.budgets = []
        }

        return scenario
    }


    return Scenario
}
