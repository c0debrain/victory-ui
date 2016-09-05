angular.module('app.services')
    .factory('services.authentication', AuthenticationService);

AuthenticationService.$inject = ['environment', '$rootScope', '$http', '$cookieStore'];

function AuthenticationService(Environment, $rootScope, $http, $cookieStore) {
    return {
        login: login,
        setCredentials: setCredentials,
        clearCredentials: clearCredentials
    }

    function login(email, password, callback) {
        if (!email || !password) {
            return callback(null, {
                message: "Insufficient parameters provided."
            });
        }

        $http({
            method: 'POST',
            url: Environment.api.path + '/authenticate/',
            data: JSON.stringify({
                email: email.toLowerCase(),
                password: password
            })
        }).then(function(response) {
            callback(response.data, null);

        }, function(error) {
            callback(null, error);
        });

    }

    function setCredentials(response) {
        $rootScope.token = response.token;
        $rootScope.user = response.user;

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.token.auth_token;
        $cookieStore.put('token', response.token);
        $cookieStore.put('user', response.user);
    }

    function clearCredentials() {
        $rootScope.token = undefined;
        $rootScope.user = undefined;
        $cookieStore.remove('token');
        $cookieStore.remove('user');
        $http.defaults.headers.common.Authorization = 'Bearer';
    }
}
