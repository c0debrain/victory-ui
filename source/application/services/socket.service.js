angular.module('app.services')
    .factory('services.socket', SocketFactory)

function SocketFactory(socketFactory) {
    var myIoSocket = io.connect('http://api.onelink.com:3000')

    mySocket = socketFactory({
        ioSocket: myIoSocket
    })

    return mySocket;
}
