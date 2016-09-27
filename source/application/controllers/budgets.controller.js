angular.module('app.controllers')
    .controller('controllers.budget', BudgetsController);

BudgetsController.$inject = ['$scope', 'services.category', 'services.notification'];

function BudgetsController($scope, Category, Notification) {

    Category.all(function(response) {
        if (response.status === 'error') {
            Notification.create('warning', 'Failed to pull categories.', 0);
        }

        $scope.categories = response.data;
    });

    $scope.scenarios = [
        {
            name: 'Scenario 1',
            data: [
                {
                    name: 'Coffee',
                    spent: 20.00,
                    allowance: 40.00,
                    interval: '1 Month',
                    color: '#00a8ff',
                    background: '#e4f6fd'
                },
                {
                    name: 'Restaurants',
                    spent: 120.00,
                    allowance: 80.00,
                    interval: 'Two Weeks',
                    color: '#46c35f',
                    background: '#edf9ee'
                },
                {
                    name: 'Groceries',
                    spent: 80.00,
                    allowance: 100.00,
                    interval: 'Two Weeks',
                    color: '#f29824',
                    background: '#fdf4e6',
                },
                {
                    name: 'Student Loans',
                    spent: 286.00,
                    allowance: 286.00,
                    interval: '1 Month',
                    color: '#fa424a',
                    background: '#fff6f6'
                },
                {
                    name: 'Coffee',
                    spent: 20.00,
                    allowance: 40.00,
                    interval: '1 Month',
                    color: '#00a8ff',
                    background: '#e4f6fd'
                },
                {
                    name: 'Restaurants',
                    spent: 120.00,
                    allowance: 80.00,
                    interval: 'Two Weeks',
                    color: '#46c35f',
                    background: '#edf9ee'
                },
                {
                    name: 'Groceries',
                    spent: 80.00,
                    allowance: 100.00,
                    interval: 'Two Weeks',
                    color: '#f29824',
                    background: '#fdf4e6',
                },
                {
                    name: 'Student Loans',
                    spent: 286.00,
                    allowance: 286.00,
                    interval: '1 Month',
                    color: '#fa424a',
                    background: '#fff6f6'
                }
            ]
        },
        {
            name: 'Scenario 2',
            data: [
                {
                    name: 'Coffee',
                    spent: 20.00,
                    allowance: 40.00,
                    interval: '1 Month',
                    color: '#00a8ff',
                    background: '#e4f6fd'
                },
                {
                    name: 'Restaurants',
                    spent: 120.00,
                    allowance: 80.00,
                    interval: 'Two Weeks',
                    color: '#46c35f',
                    background: '#edf9ee'
                },
                {
                    name: 'Groceries',
                    spent: 80.00,
                    allowance: 100.00,
                    interval: 'Two Weeks',
                    color: '#f29824',
                    background: '#fdf4e6',
                },
                {
                    name: 'Student Loans',
                    spent: 286.00,
                    allowance: 286.00,
                    interval: '1 Month',
                    color: '#fa424a',
                    background: '#fff6f6'
                },
                {
                    name: 'Coffee',
                    spent: 20.00,
                    allowance: 40.00,
                    interval: '1 Month',
                    color: '#00a8ff',
                    background: '#e4f6fd'
                },
                {
                    name: 'Restaurants',
                    spent: 120.00,
                    allowance: 80.00,
                    interval: 'Two Weeks',
                    color: '#46c35f',
                    background: '#edf9ee'
                },
                {
                    name: 'Groceries',
                    spent: 80.00,
                    allowance: 100.00,
                    interval: 'Two Weeks',
                    color: '#f29824',
                    background: '#fdf4e6',
                },
                {
                    name: 'Student Loans',
                    spent: 286.00,
                    allowance: 286.00,
                    interval: '1 Month',
                    color: '#fa424a',
                    background: '#fff6f6'
                }
            ]
        }
    ];
}
