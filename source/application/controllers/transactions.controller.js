angular.module('app.controllers')
    .controller('controllers.transaction', TransactionsController)

TransactionsController.$inject = [
    '$rootScope',
    '$scope',
    'moment',
    'managers.transaction',
    'managers.scenario',
    'services.notification'
]

function TransactionsController(
    $rootScope,
    $scope,
    moment,
    TransactionManager,
    ScenarioManager,
    NotificationService
) {
    $scope.initial = []
    $scope.transactions = []
    $scope.pulledTransactions = false

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
        autoUpdateInput: true,
        locale: {
            format: 'MMM Do, YYYY'
        },
        eventHandlers: {
            'apply.daterangepicker': function(ev, picker) {
                $scope.retrieveTransactions({
                    startDate: moment($scope.dates.startDate).format(),
                    endDate: moment($scope.dates.endDate).format(),
                    relations: true
                })
            }
        }
    }

    $scope.retrieveTransactions = function(parameters) {
        TransactionManager.loadAll(parameters)
            .then(function(transactions) {
                console.log('Transaction Response: ', transactions)
                $scope.transactions = transactions
                $scope.initial.concat(transactions)
                $scope.pulledTransactions = true

            }).catch(function(error) {
                NotificationService.create('warning', error)
            })
    }

    $scope.retrieveTransactions({
        startDate: moment($scope.dates.startDate).format(),
        endDate: moment($scope.dates.endDate).format(),
        relations: true
    })

    // Hack to make the date button show the datepicker
    $scope.showDatepicker = function() {
        $('#transaction-range-picker').data('daterangepicker').show()
    }
}
