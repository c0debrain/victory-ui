angular.module('app.controllers')
    .controller('controllers.register', RegisterController);

RegisterController.$inject = ['$scope', '$state', 'services.notification', 'services.user'];

function RegisterController($scope, $state, $NotificationService, $userService) {
    this.register = function(email, password) {


        // // Create user Request
        // $userService.create({
        //     email: email,
        //     password: password
        // }).then(function(user) {
        //
        // });
    };
}
