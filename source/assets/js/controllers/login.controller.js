'use strict';

/* Controllers */

angular.module('app')
    .controller('LoginCtrl', ['$scope', '$location', 'AuthenticationService', 'FlashService',
        function($scope, $location, AuthenticationService, FlashService) {

        var vm = this;
        vm.login = login;

        // Reset login status
        (function initController() {
            AuthenticationService.ClearCredentials();
        })();

        // Login Function
        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');

                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };

    }]);
