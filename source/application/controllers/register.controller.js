angular.module('app.controllers')
    .controller('controllers.register', RegisterController)

RegisterController.$inject = [
    '$rootScope',
    '$scope',
    '$cookieStore',
    '$state',
    'services.user',
    'services.authentication'
    'services.notification',
]

function RegisterController(
    $rootScope,
    $scope,
    $cookieStore,
    $state,
    UserService,
    AuthenticationService
    NotificationService,
) {

    // Trigger create new user process
    this.register = function(email, password) {
        // Clear all notifications first
        NotificationService.clear()

        // Make request to create new user
        UserService.create({
            email: email,
            password: password
        }, function success(response) {
            // Make sure new user was created
            AuthenticationService.authenticate({
                email: email,
                password: password

            // Retrieve auth_token for newly created user && log them in
            }, function success(response) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token.auth_token
                $cookieStore.put('token', response.data.token.auth_token)
                $cookieStore.put('user', response.data.user)
                $rootScope.token = response.data.token.auth_token
                $rootScope.user = response.data.user
                $state.go('app.overview')

            }, function error(response) {
                NotificationService.create('warning', 'Failed to authenticate with newly created credentials.', 0)
            })

        }, function error(response) {
            NotificationService.create('warning', 'User registered with that email already exists.', 0)
        })
    }
}
