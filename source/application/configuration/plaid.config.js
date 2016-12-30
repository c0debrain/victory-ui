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
            product: 'connect',
            longtail: true
        },

        function success(token) {
            Plaid.exchange({ public_token: token }, function(resPromise) {
                return resPromise.$promise.then(function(response) {
                    console.log('Plaid Connect Service Response: ', response.data)

                    if (response.data.length > 0) {
                        response.data.forEach(function(account) {
                            $rootScope.accounts.push(account)
                        })
                    }

                    // Plaid.getAccounts(function(response) {
                    //     console.log('Plaid Accounts Service Response: ', response.data)
                    //
                    //     // If an access token was returned
                    //     if (response.data.length > 0) {
                    //
                    //         // Let's not forget that the request returns an array
                    //         // of access tokens which each contain accounts
                    //         response.data.forEach(function(tokenResponse) {
                    //
                    //             // If any accounts were returned by the linked institution
                    //             if (tokenResponse.data.length > 0) {
                    //                 tokenResponse.data.forEach(function(account) {
                    //                     $rootScope.accounts.push(account)
                    //                 })
                    //             }
                    //         })
                    //
                    //         // Only bother with transactions if accounts were returned
                    //         Plaid.getTransactions(function(response) {
                    //             console.log('Plaid Transactions Service Response: ', response.data)
                    //
                    //             // If an access token was returned
                    //             if (response.data.length > 0) {
                    //
                    //                 // Let's not forget that the request returns an array
                    //                 // of access tokens which each contain transactions
                    //                 response.data.forEach(function(tokenResponse) {
                    //
                    //                     // Only bother if there are transactions
                    //                     if (tokenResponse.data.length > 0) {
                    //                         tokenResponse.data.forEach(function(transaction) {
                    //                             $rootScope.transactions.push(transaction)
                    //                         })
                    //                     }
                    //                 })
                    //             }
                    //         })
                    //     }
                    // })
                })
            })
        },

        // Callback for when user exits modal
        function exit(error) {
            console.log('Exited plaidLink modal: ', error)
        }
    )
}
