angular.module('app.controllers')
    .controller('controllers.login', LoginController);

LoginController.$inject = ['$scope', '$location', 'services.authentication', 'services.flash'];

function LoginController($scope, $location, AuthenticationService, FlashService) {
    var vm = this;
    vm.login = login;

    // Reset login status
    (function initController() {
        AuthenticationService.ClearCredentials();
    })();

    // Login Function
    function login() {
        vm.dataLoading = true;
        AuthenticationService.Login(vm.username, vm.password, function(response) {
            if (response.success) {
                AuthenticationService.SetCredentials(vm.username, vm.password);
                $location.path('/');

            } else {
                FlashService.Error(response.message);
                vm.dataLoading = false;
            }
        });
    }
}
