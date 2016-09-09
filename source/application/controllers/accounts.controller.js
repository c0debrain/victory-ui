angular.module('app.controllers')
    .controller('controllers.account', AccountsController);

AccountsController.$inject = ['$scope', '$rootScope', 'services.account', 'services.notification'];

function AccountsController($scope, $rootScope, Account, $NotificationService) {
    this.accounts = [];

    // Retrieve User's accounts
    Account.all(function(response) {
        console.log('Account Service Response: ', response.data);
        this.accounts = response.data;
    }.bind(this));

    this.filterAccount = function(accountId) {
        this.accounts.map(function(account) {
            if (account.id === accountId) {
                account.filtered = !account.filtered;
            }
        });
    }
};
