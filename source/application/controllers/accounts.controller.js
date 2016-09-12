angular.module('app.controllers')
    .controller('controllers.account', AccountsController);

AccountsController.$inject = ['$scope', '$rootScope', 'services.account', 'services.notification', 'plaidLink'];

function AccountsController($scope, $rootScope, Account, $NotificationService, plaidLink) {
    $scope.accounts = [];

    // Retrieve User's accounts
    Account.all(function(response) {
        console.log('Account Service Response: ', response.data);
        $scope.accounts = response.data;
    });

    // Handle onClick for accounts
    $scope.filterAccount = function(accountId) {
        $scope.accounts.map(function(account) {
            if (account.id === accountId) {
                account.filtered = !account.filtered;
                $rootScope.broadcast('excludeAccount', account);
            }
        });
    };

    // Make connection to Plaid Servers
    plaidLink.create({},

        // Exchange public token for access_token server-side
        function success(token) {
            Account.exchange({ public_token: token, returning: false }, function(resPromise) {
                return resPromise.$promise.then(function(response) {
                    if (response.data.updated) {

                        // Just pull in all new accounts
                        Account.all(function(response) {
                            console.log('Account Service Response: ', response.data);
                            $scope.accounts = response.data;
                        });
                    }
                });
            });
        },

        // Callback for when user exits modal
        function exit() {
            console.log('Exited plaidLink modal');
        }
    );

    // Plaid connect modal
    this.linkAccount = function() {
        console.log('linkAccount()');
        if (plaidLink.isLoaded()) {
            plaidLink.open();
        }
    };
};
