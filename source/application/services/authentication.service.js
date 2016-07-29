angular.module('app.services')
    .factory('services.authentication', AuthenticationService);

AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', '$base64'];

function AuthenticationService($http, $cookieStore, $rootScope, $timeout, $base64) {
    return {
        Login: Login,
        SetCredentials: SetCredentials,
        ClearCredentials: ClearCredentials
    }

    function Login(username, password, callback) {
        var authdata = $base64.encode(username.toLowerCase() + ':' + password);

        // $http({
        //     method: 'POST',
        //     url: $rootScope.api + '/v1/users/' + $rootScope.config.metadata.slug + '/authenticate',
        //     data: JSON.stringify({
        //         'user': authdata
        //     })
        // }).then(function successCallback(response) {
        //     callback(response.data);

        // }, function errorCallback(response) {
        //     callback(response.data);
        // });
    }

    function SetCredentials(username, password) {
        var authdata = $base64.encode(username + ':' + password);

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
