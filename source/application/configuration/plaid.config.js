angular.module('app')
    .run(PlaidConfiguration)

PlaidConfiguration.$inject = [
    '$rootScope',
    'plaidLink',
    'services.plaid',
    'managers.account'
]

function PlaidConfiguration(
    $rootScope,
    PlaidLink,
    PlaidService,
    AccountManager
) {
    // Exchange public token for access_token server-side
    PlaidLink.create(
        {
            clientName: 'Victory Finance',
            env: 'tartan',
            key: 'a1ec13246c76e782666e1bb0bf8c8d',
            product: 'connect',
            longtail: true
        },

        function success(token) {
            PlaidService.exchangeToken(token).then(function(response) {
                if (response.data.length > 0) {
                    console.log('Plaid Service exchangeToken response: ', response)
                    response.data.forEach(function(account) {
                        AccountManager.set(account)
                    })
                } else {
                    console.error('No accounts to retrieve from Plaid Link...', response)
                }
            })
        },

        // Callback for when user exits modal
        function exit(error) {
            console.log('Exited plaidLink modal: ', error)
        }
    )
}
