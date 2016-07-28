angular.module('app.controllers')
    .controller('controllers.navigation', NavigationController);

NavigationController.$inject = ['$scope', '$interval'];

function NavigationController($scope) {
    $scope.menu = [
        {
            title: "Overview",
            url: "app.overview"
        }, {
            title: "Transactions",
            url: "app.transactions",
            badge: {
                type: 'complete',
                content: '21'
            }
        }, {
            title: "Budgets",
            url: "app.budgets"
        }, {
            title: "Goals",
            url: "app.goals"
        }, {
            title: "Forecast",
            url: "app.forecast"
        }
    ];

    $scope.accounts = [
        {
            id: 1,
            title: 'Bofa Checking',
            type: 'fa-university'
        },
        {
            id: 2,
            title: 'TD Bank Savings',
            type: 'fa-university'
        },
        {
            id: 3,
            title: 'Santander Savings',
            type: 'fa-university'
        },
        {
            id: 4,
            title: 'CoinBase',
            type: 'fa-btc'
        },
        {
            id: 5,
            title: 'Kraken',
            type: 'fa-btc'
        },
        {
            id: 6,
            title: 'BitFinex',
            type: 'fa-btc'
        },
        {
            id: 7,
            title: 'PayPal',
            type: 'fa-cc-paypal'
        },
        {
            id: 8,
            title: 'Visa Card',
            type: 'fa-cc-visa'
        },
        {
            id: 9,
            title: 'Discover Card',
            type: 'fa-cc-discover'
        },
        {
            id: 10,
            title: 'MasterCard',
            type: 'fa-cc-mastercard',
            filtered: 'true'
        },
        {
            id: 11,
            title: 'Amex Card',
            type: 'fa-cc-amex',
            filtered: 'true'
        },
        {
            id: 12,
            title: 'Stripe',
            type: 'fa-cc-stripe',
            filtered: 'true'
        }
    ];

    $scope.filterAccount = function(accountId) {
        $scope.accounts.map(function(account) {
            if (account.id === accountId) {
                account.filtered = !account.filtered;
            }
        });
    }
}
