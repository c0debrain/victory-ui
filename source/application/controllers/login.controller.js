angular.module('app.controllers')
    .controller('controllers.login', LoginController)

LoginController.$inject = [
    '$scope',
    '$rootScope',
    '$http',
    '$state',
    'services.authentication',
    'services.notification',
    '$cookieStore'
]

function LoginController(
    $scope,
    $rootScope,
    $http,
    $state,
    Auth,
    Notification,
    $cookieStore
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
        Auth.authenticate({
            email: email,
            password: password

        }, function success(response) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token.auth_token
            $cookieStore.put('token', response.data.token.auth_token)
            $cookieStore.put('user', response.data.user)
            $rootScope.token = response.data.token.auth_token
            $rootScope.user = response.data.user
            $state.go('app.overview')

        }, function error(response) {
            console.log(response)
            Notification.clear()
            Notification.create('warning', 'Incorrect credentials provided.', 0)
            this.loading = false
        })
    }
}
