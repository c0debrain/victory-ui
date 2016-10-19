angular.module('app.controllers')
    .controller('controllers.account', AccountsController);

AccountsController.$inject = ['$scope', '$rootScope', 'services.account', 'services.notification', 'plaidLink'];

function AccountsController($scope, $rootScope, Account, $NotificationService, plaidLink) {
    $scope.accounts = $rootScope.accounts;

    // Retrieve User's accounts
    // Account.all(function(response) {
    //     console.log('Account Service Response: ', response.data);
    //     $rootScope.accounts = response.data;
    //
    //     // Map through and add filtered status to accounts
    //     $rootScope.accounts.map(function(account) {
    //         account.filtered = false;
    //     });
    // });

    // Handle onClick for accounts
    $scope.filterAccount = function(accountId) {
        $rootScope.accounts.map(function(account) {
            if (account.id === accountId) {
                account.filtered = !account.filtered;
                $rootScope.$broadcast('toggleAccount', account);
            }
        });
    };

    // Plaid connect modal
    $scope.linkAccount = function() {
        if (plaidLink.isLoaded()) {
            plaidLink.open();
        } else {
            console.log('Plaid Link isn\'t loaded!');
        }
    };



    // function unionArrays(x, y) {
    //     var obj = {};
    //     for (var i = x.length - 1; i >= 0; --i)
    //         obj[x[i]] = x[i];
    //     for (var i = y.length - 1; i >= 0; --i)
    //         obj[y[i]] = y[i];
    //     var res = []
    //     for (var k in obj) {
    //         if (obj.hasOwnProperty(k)) // <-- optional
    //             res.push(obj[k]);
    //     }
    //     return res;
    // }

    // TODO: Need to figure out how to add newly linked accounts to application
    $scope.$on('newAccounts', function(accounts) {
        accounts.forEach(function(account) {
            $scope.accounts.push(account);
        });
    });
};
