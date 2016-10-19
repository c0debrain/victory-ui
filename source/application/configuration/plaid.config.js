angular.module('app')
    .run(PlaidConfiguration);

PlaidConfiguration.$inject = [
    '$rootScope',
    'plaidLink',
    'services.account'
];

function PlaidConfiguration(
    $rootScope,
    plaidLink,
    Account
) {
    // Exchange public token for access_token server-side
    plaidLink.create({
            clientName: 'Victory Finance',
            env: 'tartan',
            key: 'test_key',
            product: 'auth'
        },

        function success(token) {
            Account.exchange({ public_token: token, returning: false }, function(resPromise) {
                return resPromise.$promise.then(function(response) {
                    if (response.data.updated) {

                        // Just pull in all new accounts
                        Account.all(function(response) {
                            console.log('Account Service Response: ', response.data);
                            // $rootScope.$broadcast('newAccounts', response.data);

                            $rootScope.accounts = response.data;
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

};
