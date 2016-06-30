angular.module('app.services')
    .factory('services.authentication', AuthenticationService);

AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];

function AuthenticationService($http, $cookieStore, $rootScope, $timeout) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, password, callback) {

        // Validate Login Information via API Endpoint
        var authdata = Base64.encode(username.toLowerCase() + ':' + password);
        $http({
            method: 'POST',
            url: $rootScope.api + '/v1/users/' + $rootScope.config.metadata.slug + '/authenticate',
            data: JSON.stringify({
                "user": authdata
            })
        }).then(function successCallback(response) {
            callback(response.data);

        }, function errorCallback(response) {
            callback(response.data);
        });
    }

    function SetCredentials(username, password) {
        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);
    }

    function ClearCredentials() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
    }
}
