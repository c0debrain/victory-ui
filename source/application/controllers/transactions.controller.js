angular.module('app.controllers')
    .controller('controllers.transaction', TransactionsController);

TransactionsController.$inject = ['$scope', 'services.transaction'];

function TransactionsController($scope, Transaction) {
    $scope.weekly = {
        amount: '-120.02'
    };

    $scope.monthly = {
        amount: '-678.00'
    };

    $scope.yearly = {
        amount: '-1280.20'
    };

    $scope.initialTransactions = [];
    $scope.transactions = [];
    $scope.showControls = false;

    // Retrieve User's Transactions
    Transaction.allWithAccounts(function(response) {
        console.log('Transaction Service Response: ', response.data);
        $scope.transactions = response.data;

        // Map through transactions and set filtered property
        $scope.transactions.map(function(transaction) {
            transaction.filtered = false;
        });

        $scope.initialTransactions = [].concat($scope.transactions);
    });

    // Filter out specified accounts on event
    $scope.$on('toggleAccount', function(event, account) {
        $scope.transactions.forEach(function(transaction) {
            if (transaction.PlaidAccount.id === account.id) {
                console.log('Transaction from account filtered: ', transaction.name);
                transaction.filtered = !transaction.filtered;
            }
        });
    });

    // Toggle table controls
    $scope.toggleControls = function() {
        $scope.showControls = !$scope.showControls;
    };

    // Date Controls

    $scope.today = function() {
        $scope.dt = new Date();
    };

    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
}
