angular.module('app.controllers')
    .controller('controllers.login', LoginController)

LoginController.$inject = [
    '$cookieStore',
    '$rootScope',
    '$scope',
    '$state',
    '$http',
    'services.authentication',
    'services.notification'
]

function LoginController(
    $cookieStore,
    $rootScope,
    $scope,
    $state,
    $http,
    AuthenticationService,
    NotificationService
) {
    // Reset login status
    (function initController() {
        $cookieStore.remove('token')
        $cookieStore.remove('user')
        $rootScope.token = undefined
        $rootScope.user = undefined
    })()

    // Set default login values for development ease
    this.email = 'nlombardi@translations.com'
    this.password = 'password'

    this.login = function(email, password) {
        console.log('Logging in with: ', email, password)

        this.loading = true

        AuthenticationService.authenticate({
            email: email,
            password: password

        }).then(function(response) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token.auth_token
            $cookieStore.put('token', response.data.token.auth_token)
            $cookieStore.put('user', response.data.user)
            $rootScope.token = response.data.token.auth_token
            $rootScope.user = response.data.user
            $state.go('app.overview')

        }).catch(function(response) {
            console.log(response)
            NotificationService.clear()
            NotificationService.create('warning', 'Incorrect credentials provided.', 0)
            this.loading = false
        })
    }
}
