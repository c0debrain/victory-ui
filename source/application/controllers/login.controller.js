angular.module('app.controllers')
    .controller('controllers.login', LoginController);

LoginController.$inject = ['$scope', '$state', 'services.authentication', 'services.notification'];

function LoginController($scope, $state, $AuthenticationService, $NotificationService) {
    // Reset login status
    (function initController() {
        $AuthenticationService.clearCredentials();
    })();

    // Set default login values for development ease
    this.email = 'nkmlombardi@gmail.com';
    this.password = 'password';

    this.login = function(email, password) {
        console.log('Logging in with: ', email, password);

        if (email == '' || password == '') {
            $NotificationService.clear();
            $NotificationService.create('warning', 'No credentials provided.', 0);
            return;
        }

        this.loading = true;
        $AuthenticationService.login(email, password, function(response, error) {
            if (response) {
                console.log('Authenticate Response: ', response);
                $AuthenticationService.setCredentials(response.data);
                $state.go('app.overview')

            } else {
                console.log(error);

                $NotificationService.clear();
                $NotificationService.create('warning', 'Incorrect credentials provided.', 0);
                this.loading = false;
            }
        });
    };
}
