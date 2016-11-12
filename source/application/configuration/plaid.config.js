angular.module('app')
    .run(PlaidConfiguration)

PlaidConfiguration.$inject = [
    '$rootScope',
    'plaidLink',
    'services.account',
    'services.plaid'
]

function PlaidConfiguration(
    $rootScope,
    plaidLink,
    Account,
    Plaid
) {
    // Exchange public token for access_token server-side
    plaidLink.create(
        {
            clientName: 'Victory Finance',
            env: 'tartan',
            key: 'a1ec13246c76e782666e1bb0bf8c8d',
            product: 'auth'
        },

        function success(token) {
            Plaid.exchange({ public_token: token }, function(resPromise) {
                return resPromise.$promise.then(function(response) {
                    if (response.status === 'success') {
                        $rootScope.$emit('plaidConnect')
                    }
                })
            })
        },

        // Callback for when user exits modal
        function exit() {
            console.log('Exited plaidLink modal')
        }
    )
}
