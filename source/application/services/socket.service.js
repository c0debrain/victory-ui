angular.module('app.services')
    .factory('services.socket', SocketFactory)

function SocketFactory(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('api.onelink.com')
    })
}
