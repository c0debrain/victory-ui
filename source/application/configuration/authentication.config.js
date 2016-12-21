angular.module('app')
    .run(AuthenticationConfiguration);

AuthenticationConfiguration.$inject = [
    '$rootScope',
    '$location',
    '$cookieStore',
    '$http',
    'PermPermissionStore'
];

function AuthenticationConfiguration(
    $rootScope,
    $location,
    $cookieStore,
    $http,
    Permissions
) {
    // Assign rootScope variables && Authorization header
    $rootScope.user = $cookieStore.get('user') || {};
    $rootScope.token = $cookieStore.get('token') || '';
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.token;

    // Restrict based on permissions
    Permissions.definePermission('isUser', function() {
        var restrictedPage = ['/login', '/register'].indexOf($location.path()) === -1;

        // If page is private, and no user or token exists, redirect to login
        if (restrictedPage && (!$rootScope.user || !$rootScope.token)) {
            console.log('Unauthenticated!')
            return false;
        }

        return true;
    });
};
