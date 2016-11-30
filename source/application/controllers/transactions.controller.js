angular.module('app.controllers')
    .controller('controllers.transaction', TransactionsController)

TransactionsController.$inject = ['$scope', '$rootScope', 'services.transaction']

function TransactionsController($scope, $rootScope, Transaction) {
    $scope.transactions = []
    $scope.initialTransactions = []

    $scope.dates = {
        startDate: moment().startOf('month'),
        endDate: moment()
    }

    $scope.datePickerOptions = {
        ranges: {
            'Today': [moment().startOf('day'), moment()],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Week': [moment().startOf('week'), moment()],
            'This Month': [moment().startOf('month'), moment()],
            'Last Month': [
                moment().subtract(1, 'months').startOf('month'),
                moment().subtract(1, 'months').endOf('month')
            ]
        },
        opens: 'left',
        locale: {
            format: 'MMM Do, YYYY'
        },
        eventHandlers: {
            'apply.daterangepicker': function(ev, picker) {
                $scope.pullScenarios()
            }
        }
    }

    // Hack to make the date button show the datepicker
    $scope.showDatepicker = function() {
        $('#transaction-range-picker').data('daterangepicker').show()
    }

    $scope.initialTransactions = [].concat($rootScope.transactions)

    // Inject transactions upon retrieval
    $scope.$on('retrievedTransactions', function() {
        $scope.initialTransactions = [].concat($rootScope.transactions)
    })

    // Filter out specified accounts on event
    $scope.$on('toggleAccount', function(event, account) {
        $scope.transactions.forEach(function(transaction) {
            if (transaction.account.id === account.id) {
                console.log('Transaction from account filtered: ', transaction.name)
                transaction.filtered = !transaction.filtered
            }
        })
    })
}
