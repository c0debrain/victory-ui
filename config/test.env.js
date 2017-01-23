var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    API_LOCATION: '"http://api.onelink.com/v1"',
    SOCKET_LOCATION: '"http://api.onelink.com:80"'
})
