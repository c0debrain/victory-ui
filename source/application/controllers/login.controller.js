angular.module('app.controllers')
    .controller('controllers.login', LoginController);

LoginController.$inject = ['$scope', '$location', 'services.authentication', 'Flash'];

function LoginController($scope, $location, AuthenticationService, FlashService) {
    var vm = this
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
                $location.path('/app/overview');

            } else {
                FlashService.clear();
                FlashService.create('warning', response.message, 0);
                vm.dataLoading = false;
            }
        });
    }
}
