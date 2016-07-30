angular.module('app.controllers')
    .controller('controllers.transactions', TransactionsController);

TransactionsController.$inject = ['$scope'];

function TransactionsController($scope) {
    $scope.weekly = {
        amount: '-120.02'
    };

    $scope.monthly = {
        amount: '-678.00'
    };

    $scope.yearly = {
        amount: '-1280.20'
    };

    $scope.data = [
        {
            date: 'JUL 28',
            description: 'Blue Coyote Grill',
            category: 'Lunch at Work',
            account: {
                name: 'Checking',
                color: '#00A8FF'
            },
            amount: '20.00'
        },
        {
            date: 'JUL 28',
            description: 'Blue Coyote Grill',
            category: 'Lunch at Work',
            account: {
                name: 'Checking',
                color: '#00A8FF'
            },
            amount: '20.00'
        },
        {
            date: 'JUL 28',
            description: 'Blue Coyote Grill',
            category: 'Lunch at Work',
            account: {
                name: 'Checking',
                color: '#00A8FF'
            },
            amount: '20.00'
        },
        {
            date: 'JUL 28',
            description: 'Blue Coyote Grill',
            category: 'Lunch at Work',
            account: {
                name: 'Checking',
                color: '#00A8FF'
            },
            amount: '20.00'
        },
        {
            date: 'JUL 28',
            description: 'Blue Coyote Grill',
            category: 'Lunch at Work',
            account: {
                name: 'Checking',
                color: '#00A8FF'
            },
            amount: '20.00'
        },
        {
            date: 'JUL 28',
            description: 'Blue Coyote Grill',
            category: 'Lunch at Work',
            account: {
                name: 'Savings',
                color: '#46c35f'
            },
            amount: '20.00'
        },
        {
            date: 'JUL 28',
            description: 'Blue Coyote Grill',
            category: 'Lunch at Work',
            account: {
                name: 'Savings',
                color: '#46c35f'
            },
            amount: '20.00'
        }
    ];
}
