angular.module('app.controllers')
    .controller('controllers.transactions', TransactionsController);

TransactionsController.$inject = [];

function TransactionsController() {
    this.weekly = {
        amount: '-120.02'
    };

    this.monthly = {
        amount: '-678.00'
    };

    this.yearly = {
        amount: '-1280.20'
    };

    this.data = [
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
