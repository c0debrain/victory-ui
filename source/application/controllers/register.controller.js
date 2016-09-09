angular.module('app.controllers')
    .controller('controllers.register', RegisterController);

RegisterController.$inject = ['$scope', '$state', 'services.notification'];

function RegisterController($scope, $state, $NotificationService) {
    this.register = function(email, password) {
        var userService = $feathers.service('users');

        // Create user Request
    };
}
