angular.module('app.services')
    .factory('services.notification', NotificationService);

NotificationService.$inject = ['Flash'];

function NotificationService($Flash) {
    return $Flash;
}
