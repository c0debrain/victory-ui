angular.module('app.controllers')
    .controller('controllers.login', LoginController);

LoginController.$inject = ['$scope', '$location', 'services.authentication', 'services.notification'];

function LoginController($scope, $location, $AuthenticationService, $NotificationService) {

    // Reset login status
    (function initController() {
        $AuthenticationService.ClearCredentials();
    })();

    // Login Function
    this.authenticate = function() {
        console.log('Authenticating...');

        this.dataLoading = true;
        $AuthenticationService.Login(this.username, this.password, function(response) {
            if (response.success) {
                $AuthenticationService.SetCredentials(this.username, this.password);
                $location.path('/app/overview');

            } else {
                $NotificationService.clear();
                $NotificationService.create('warning', response.message, 0);
                this.dataLoading = false;
            }
        });
    };
}
